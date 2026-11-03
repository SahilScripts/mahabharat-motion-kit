# Sound

Three layers, all made locally:
1. **Voice** — the user's voice-over (trimmed, EQ'd, loudness-normalised by `timing.py`).
2. **Score** — `timing.py` writes a tanpura drone + soft pad, a drum on every cut and a bell on the last line, ducked under
   the voice. `MUSIC=0.25 .venv/bin/python pipeline/timing.py <reel>` makes it quieter; `MUSIC=0` removes it.
3. **Effects** — `reels/<reel>/sfx.py`, rendered by `pipeline/sfx.py <reel>` and played at 55% under the mix.

## Writing sfx.py
```python
from sfxlib import *

EVENTS = {
    0: [(0.12, lambda: impact()), (0.0, lambda: noise_bp(1.8, 2600, 2.0, 0.07, 0.2, 0.4))],
    1: [(0.05, lambda: bell(196, 0.5, 3.0)), (0.06, lambda: bell(392, 0.25, 2.5))],
    4: [*[(0.3 + i * 0.1, (lambda f: (lambda: tick(f, 0.16)))(1600 + i * 90)) for i in range(12)]],   # sparkle run
}
```
- Key = shot index; times = seconds from that shot's start (read them from `reels/<reel>/cues.txt` or from the shot code).
- Every visual event gets a sound: hit/landing → `impact()` or `drum(…)`; big reveal → `rumble` + low `drum`; divine
  appearance → `chord()` / `bell` pairs; magic → `magic()` / tick runs; dark magic → `darkmagic()`; fire → `noise_bp(…, 300, 0.7, …)`;
  wind/flight → `whoosh()` / long `noise_bp` around 400–1100 Hz; leaves/pages → `flip()`; strain → `groan` / `creak`; army → `crowd()`,
  repeated `hoof()` for horses; conch → `conch()`; lightning → `thunder()`.
- Keep effects off the voice's important words: big hits on cuts and pauses.
- 4–10 events per shot is typical. The two example files (`reels/example-*/sfx.py`) have 120 events each — copy patterns.
- Full list of functions and presets: top of `pipeline/sfxlib.py`.
