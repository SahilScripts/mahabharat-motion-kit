"""Step 7 — sound effects. Places every event of reels/<reel>/sfx.py on the reel's timeline.

  .venv/bin/python pipeline/sfx.py <reel>          # writes remotion/public/mg/<reel>/sfx.wav

reels/<reel>/sfx.py looks like:
    from sfxlib import *
    EVENTS = {
        0: [(0.12, lambda: impact()), (0.0, lambda: noise_bp(1.8, 2600, 2.0, 0.07, 0.2, 0.4))],   # shot 0
        3: [(0.05, lambda: flip(0.6)), (0.88, lambda: bell(659, 0.35, 2.0))],                      # shot 3
    }
Times are seconds from the START OF THAT SHOT (take them from reels/<reel>/cues.txt). Shots can be left out.
With no sfx.py, a silent sfx.wav is written so the reel still renders.
"""

import importlib.util
import json
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
from dsp import SR, place, write  # noqa: E402

KIT = Path(__file__).resolve().parent.parent


def main() -> None:
    reel = sys.argv[1]
    pub = KIT / "remotion" / "public" / "mg" / reel
    man = json.loads((pub / "manifest.json").read_text())
    scenes, dur = man["scenes"], float(man["duration"])
    buf = np.zeros(int(SR * (dur + 0.4)))
    f = KIT / "reels" / reel / "sfx.py"
    n = 0
    if f.exists():
        spec = importlib.util.spec_from_file_location(f"sfx_{reel.replace('-', '_')}", f)
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        for idx, evs in mod.EVENTS.items():
            if idx >= len(scenes):
                raise SystemExit(f"sfx.py has shot {idx}, the manifest has only {len(scenes)} shots (0..{len(scenes) - 1})")
            st = float(scenes[idx]["start"])
            for t_rel, fn in evs:
                place(buf, fn(), st + t_rel)
                n += 1
    write(pub / "sfx.wav", buf)  # normalised to peak 0.89; the reel plays it at volume 0.55 under the voice
    print(f"{reel}: {n} sound events -> remotion/public/mg/{reel}/sfx.wav ({dur:.1f}s)")


if __name__ == "__main__":
    main()
