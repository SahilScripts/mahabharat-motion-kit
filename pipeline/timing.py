"""Step 4 — timeline from the voice-over. Word times, one cut per storyboard shot, background score, VO + score mix.

  .venv/bin/python pipeline/timing.py <reel>

Reads  reels/<reel>/script-hi.txt     the exact spoken words; sentences end with । ? ! or .  (sentence k = "s": k in the storyboard)
       reels/<reel>/storyboard.json   {"shots": [{"s": sentence index, "title", "pick", "camera", "sound"}, ...]}
       reels/<reel>/voiceover.*       the voice-over;  reels/<reel>/whisper.json (from transcribe.py) anchors word times
Writes remotion/public/mg/<reel>/{vo.wav, music.wav, mix.wav, manifest.json}
       reels/<reel>/cues.txt          every shot's window and each word's time INSIDE its shot (use these for animation cues)

Shots sharing a sentence split it by word count (or at the nearest "," / "..." inside it).
Env: TAIL=1.2 (seconds of picture after the last word), MUSIC=0.4 (score level under the voice; 0 = no score).
"""

import difflib
import json
import os
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from align import PUNCT, align, score  # noqa: E402
from dsp import SR, write  # noqa: E402
from transcribe import TRIM, voiceover  # noqa: E402

KIT = Path(__file__).resolve().parent.parent
VO_START, TAIL, MUSIC = 0.15, float(os.environ.get("TAIL", "1.2")), float(os.environ.get("MUSIC", "0.4"))

reel = sys.argv[1]
RD = KIT / "reels" / reel
board = json.loads((RD / "storyboard.json").read_text(encoding="utf-8"))
shots = board["shots"]
text = (RD / "script-hi.txt").read_text(encoding="utf-8").strip()
out = KIT / "remotion" / "public" / "mg" / reel
out.mkdir(parents=True, exist_ok=True)

clean = out / "vo.wav"
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(voiceover(reel)), "-af", TRIM, "-ar", "48000", "-ac", "1", str(clean)], check=True)
vo_len = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(clean)],
                              capture_output=True, text=True).stdout)
words = text.split()
dur = VO_START + vo_len + TAIL

def ends_sentence(w: str) -> bool:
    """A sentence ends at । | ? ! or a single full stop (not "..."), ignoring closing quotes/brackets."""
    w = w.rstrip("\"'”’)»")
    return bool(w) and (w[-1] in "।|?!" or (w.endswith(".") and not w.endswith("..")))


sent_first = [0] + [i + 1 for i, w in enumerate(words[:-1]) if ends_sentence(w)]
n_sent = len(sent_first)
sent_first.append(len(words))
bad = [sh for sh in shots if not (0 <= sh["s"] < n_sent)]
if bad:
    raise SystemExit(f"storyboard shot(s) {[b.get('title') for b in bad]} point at a sentence that does not exist (script has {n_sent} sentences, s = 0..{n_sent - 1})")
if [sh["s"] for sh in shots] != sorted(sh["s"] for sh in shots):
    raise SystemExit("storyboard shots must be in sentence order")
missing = sorted(set(range(n_sent)) - {sh["s"] for sh in shots})
if missing:
    print(f"note: sentences {missing} have no shot of their own; they stay on the previous shot")


def _skeleton(w: str) -> str:
    """Devanagari consonants and independent vowels only, for fuzzy matching against Whisper's spelling."""
    return "".join(ch for ch in w if ("अ" <= ch <= "औ") or ("क" <= ch <= "ह") or ch.isascii() and ch.isalnum())


def whisper_times(words: list[str], heard: list[dict], vo_len: float) -> list[tuple[float, float]]:
    """Script word times anchored to Whisper's timed words (character match of consonant skeletons; unmatched words are
    interpolated between matched neighbours)."""
    a_chars, a_word = [], []
    for i, w in enumerate(words):
        for ch in _skeleton(w):
            a_chars.append(ch); a_word.append(i)
    b_chars, b_time = [], []
    for h in heard:
        sk = _skeleton(h["word"]) or "?"
        for k, ch in enumerate(sk):
            b_chars.append(ch); b_time.append(h["start"] + (h["end"] - h["start"]) * k / len(sk))
    sm = difflib.SequenceMatcher(None, "".join(a_chars), "".join(b_chars), autojunk=False)
    first: dict[int, float] = {}
    for blk in sm.get_matching_blocks():
        if blk.size < 2:
            continue
        for k in range(blk.size):
            first.setdefault(a_word[blk.a + k], b_time[blk.b + k])
    known = sorted(first.items())
    starts = []
    for i in range(len(words)):
        if i in first:
            starts.append(first[i]); continue
        lo = max([(j, t) for j, t in known if j < i], default=(-1, 0.0))
        hi = min([(j, t) for j, t in known if j > i], default=(len(words), vo_len))
        starts.append(lo[1] + (hi[1] - lo[1]) * (i - lo[0]) / (hi[0] - lo[0]))
    for i in range(1, len(starts)):
        starts[i] = max(starts[i], starts[i - 1] + 0.05)
    return [(st, (starts[i + 1] if i + 1 < len(starts) else vo_len) - 0.02) for i, st in enumerate(starts)]


heard_f = RD / "whisper.json"
if heard_f.exists():
    times = whisper_times(words, json.loads(heard_f.read_text(encoding="utf-8")), vo_len)
    print("word times anchored to whisper.json")
else:
    times = align(words, clean, vo_len)
    print("no whisper.json: word times from the voice's pauses (run transcribe.py for exact times)")


by_sentence: dict[int, list[int]] = {}
for i, sh in enumerate(shots):
    by_sentence.setdefault(sh["s"], []).append(i)
starts = [0.0] * len(shots)
for s, idxs in by_sentence.items():
    w0, w1 = sent_first[s], sent_first[s + 1]
    for k, i in enumerate(idxs):
        wi = w0 + (w1 - w0) * k // len(idxs)
        if k and any(words[j].endswith(("...", ",")) for j in range(w0, w1)):
            breaks = [j + 1 for j in range(w0, w1 - 1) if words[j].endswith(("...", ","))]
            wi = min(breaks, key=lambda j: abs(j - wi))
        starts[i] = VO_START + times[wi][0] - 0.08
starts[0] = 0.0

scenes = [{"start": round(starts[i], 3), "end": round(starts[i + 1] if i + 1 < len(starts) else dur, 3)} for i in range(len(starts))]

caps, line, count, chars = [], 0, 0, 0
for w, (s, e) in zip(words, times):
    if count >= 5 or chars + len(w) > 26:
        line, count, chars = line + 1, 0, 0
    caps.append({"w": w, "start": round(VO_START + s, 3), "end": round(VO_START + e, 3), "line": line})
    count, chars = count + 1, chars + len(w) + 1
    if w[-1] in PUNCT:
        line, count, chars = line + 1, 0, 0

n = int(SR * dur)
write(out / "music.wav", score(n, starts[1:], VO_START + times[sent_first[-2]][0], dur))
graph = (f"[1:a]adelay={int(VO_START * 1000)}|{int(VO_START * 1000)},aformat=channel_layouts=stereo,apad=whole_dur={dur},"
         "equalizer=f=3000:t=q:w=1.2:g=2,volume=1.2,asplit=2[vo][k];"
         f"[0:a]volume={MUSIC},equalizer=f=2200:t=q:w=1.5:g=-6[m];[m][k]sidechaincompress=threshold=0.03:ratio=6:attack=10:release=220[md];"
         "[md][vo]amix=inputs=2:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5:LRA=9,aresample=48000[o]")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(out / "music.wav"), "-i", str(clean), "-filter_complex", graph,
                "-map", "[o]", "-t", f"{dur:.3f}", "-ac", "2", str(out / "mix.wav")], check=True)
json.dump({"duration": round(dur, 3), "audio": f"mg/{reel}/mix.wav", "scenes": scenes, "words": caps}, open(out / "manifest.json", "w"),
          ensure_ascii=False, indent=1)

# cue sheet: each shot's window and every word's time relative to that shot's start (what the shot code and sfx.py use)
cue = [f"{reel}: voice {vo_len:.1f}s, video {dur:.1f}s, {len(shots)} shots (times in seconds)", ""]
for i, sc in enumerate(scenes):
    cue.append(f"S{i}  {sc['start']:6.2f} – {sc['end']:6.2f}  ({sc['end'] - sc['start']:.2f}s)  {shots[i].get('title', '')}")
    ws = [c for c in caps if sc["start"] <= c["start"] < sc["end"]]
    cue.append("     " + "  ".join(f"{c['w']}@{c['start'] - sc['start']:.2f}" for c in ws))
(RD / "cues.txt").write_text("\n".join(cue) + "\n", encoding="utf-8")
print("\n".join(cue))
