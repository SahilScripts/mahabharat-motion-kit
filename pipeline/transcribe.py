"""Step 1 — hear the voice-over. Runs Whisper on this Mac (faster-whisper "small", offline after the first download).

  .venv/bin/python pipeline/transcribe.py <reel> [language]     (default: "language" in kit.config.json, else hi)

Reads  reels/<reel>/voiceover.(mp3|wav|m4a|aac|ogg)
Writes reels/<reel>/whisper.json      timed words [{word, start, end}]   (used by timing.py to place every script word)
       reels/<reel>/transcript.txt    what Whisper heard, as plain text  (a DRAFT — Whisper misspells Hindi; the agent
                                       writes the clean script-hi.txt from it, see GEMINI.md step 2)
"""

import json
import os
import subprocess
import sys
from pathlib import Path

import numpy as np

KIT = Path(__file__).resolve().parent.parent
os.environ.setdefault("HF_HOME", str(KIT / ".models"))  # the model lives inside the kit (see setup.sh)


def voiceover(reel: str) -> Path:
    d = KIT / "reels" / reel
    for ext in ("mp3", "wav", "m4a", "aac", "ogg", "flac", "mp4"):
        if (d / f"voiceover.{ext}").exists():
            return d / f"voiceover.{ext}"
    raise SystemExit(f"put the voice-over at reels/{reel}/voiceover.mp3 (or .wav/.m4a)")


# same trim as timing.py's vo.wav, so Whisper's times line up with the reel's voice track
TRIM = "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse"


def main() -> None:
    reel = sys.argv[1]
    cfg = KIT / "kit.config.json"
    lang = sys.argv[2] if len(sys.argv) > 2 else (json.loads(cfg.read_text()).get("language", "hi") if cfg.exists() else "hi")
    src = voiceover(reel)
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(src), "-af", TRIM, "-ac", "1", "-ar", "16000", "-f", "s16le", "-"], capture_output=True, check=True).stdout
    samples = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0
    from faster_whisper import WhisperModel

    try:
        model = WhisperModel("small", device="cpu", compute_type="int8", local_files_only=True)
    except Exception:
        model = WhisperModel("small", device="cpu", compute_type="int8")
    segments, _ = model.transcribe(samples, word_timestamps=True, language=lang)
    words, lines = [], []
    for seg in segments:
        lines.append(seg.text.strip())
        for w in seg.words or []:
            t = w.word.strip()
            if t:
                words.append({"word": t, "start": round(float(w.start), 3), "end": round(float(w.end), 3)})
    d = src.parent
    (d / "whisper.json").write_text(json.dumps(words, ensure_ascii=False, indent=0), encoding="utf-8")
    (d / "transcript.txt").write_text("\n".join(lines) + "\n", encoding="utf-8")
    dur = len(samples) / 16000
    print(f"{reel}: {len(words)} words heard in {dur:.1f}s -> reels/{reel}/whisper.json, transcript.txt")
    print("\n".join(lines))


if __name__ == "__main__":
    main()
