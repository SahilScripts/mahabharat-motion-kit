"""Sound-effect library (numpy only, synthesised — no samples, no downloads). Each function returns a mono numpy array at SR.
A reel's reels/<name>/sfx.py does `from sfxlib import *` and defines EVENTS = {shot_index: [(seconds_into_shot, lambda: sound), ...]}.

Primitives:  drum(f_hi, f_lo, decay, amp, click)  bell(freq, amp, decay)  pluck(f, length, amp, bright)
             sweep(f0, f1, dur, amp, atk, rel, curve)  noise_bp(dur, f0, q, amp, atk, rel)  rumble(dur, amp, fc, atk, rel)
             groan(f0, dur, amp, vib, drop)  creak(f0, dur, amp)  splash(dur, amp)  tick(f0, amp)  flip(amp)  creak_str(f, amp)
Presets:     boom() thunder() whoosh() clang() arrow() zap() conch() drone() magic() darkmagic() chord() hoof() step() crowd()
             neigh() trumpet() riser() impact()   — combine with mix(a, b, ...)
Typical uses: impact on a reveal = drum(1500,300,0.2,1.2,click=1.0) + drum(52,28,1.2,1.1) + rumble(2,0.9,fc=42);
             page/leaf = flip(0.5); divine = bell(784,0.3,2.5)+bell(1175,0.15,2); fire = noise_bp(2.6,300,0.7,0.45,0.3,1.2);
             tension = groan(55,3,0.45,drop=0.25); sparkle = [tick(1600+i*90,0.16) at 0.1 s steps].
"""

import math

import numpy as np

from dsp import SR, bandpass, bell, drum, env, onepole_lp, place, pluck, rng, write  # noqa: F401

def envn(n: int, atk: float, hold: float, rel: float) -> np.ndarray:
    """dsp.env pinned to start=0."""
    return env(n, 0.0, atk, max(0.0, hold), rel)  # noqa: E402


def sweep(f0: float, f1: float, dur: float, amp: float = 1.0, atk: float = 0.08, rel: float = 0.3, curve: float = 1.6) -> np.ndarray:
    """Rising/falling sine (riser, whoosh core): freq glides f0->f1 with an ease."""
    n = int(SR * dur)
    tt = np.arange(n) / SR
    p = (tt / max(dur, 1e-9)) ** curve
    fr = f0 + (f1 - f0) * p
    ph = 2 * np.pi * np.cumsum(fr) / SR
    return amp * np.sin(ph) * envn(n, 0.03, max(0.0, dur - atk - rel), rel)


def noise_bp(dur: float, f0: float, q: float, amp: float = 1.0, atk: float = 0.03, rel: float = 0.35) -> np.ndarray:
    """Bandpassed noise burst (whoosh air, creak, splash, thunder body)."""
    n = int(SR * dur)
    x = rng.standard_normal(n)
    return amp * bandpass(x, f0, q) * envn(n, atk, max(0.0, dur - atk - rel), rel)


def rumble(dur: float, amp: float = 1.0, fc: float = 46.0, atk: float = 0.04, rel: float = 0.9) -> np.ndarray:
    return amp * onepole_lp(bandpass(rng.standard_normal(int(SR * dur)), fc, 0.55), 120.0) * envn(int(SR * dur), atk,
        max(0.0, dur - atk - rel), rel)


def groan(f0: float, dur: float, amp: float = 1.0, vib: float = 7.0, drop: float = 0.7) -> np.ndarray:
    """Wobbling low tone (stone/plate under strain)."""
    n = int(SR * dur)
    tt = np.arange(n) / SR
    fr = f0 * (1.0 - (tt / max(dur, 1e-9)) * drop) * (1 + 0.03 * np.sin(2 * np.pi * vib * tt))
    return amp * np.sin(2 * np.pi * np.cumsum(fr) / SR) * envn(n, 0.12, max(0.0, dur - 0.4), 0.35)


def creak(f0: float = 900.0, dur: float = 0.4, amp: float = 1.0) -> np.ndarray:
    """Sticky metal/wood strain: bright noise bursts ducked by a slow tremolo."""
    n = int(SR * dur)
    tt = np.arange(n) / SR
    tr = 0.55 + 0.45 * np.sin(2 * np.pi * 23 * tt) * np.sign(np.sin(2 * np.pi * 5.5 * tt))
    return amp * bandpass(rng.standard_normal(n), f0, 7) * tr * envn(n, 0.05, dur - 0.35, 0.28)


def splash(dur: float = 0.5, amp: float = 1.0) -> np.ndarray:
    return amp * bandpass(rng.standard_normal(int(SR * dur)), 1500.0, 1.1) * envn(int(SR * dur), 0.02, dur * 0.25, dur * 0.6)


def tick(f0: float = 1900.0, amp: float = 0.5) -> np.ndarray:
    return bell(f0, amp, decay=0.28)


def flip(amp: float = 1.0) -> np.ndarray:
    """Palm-leaf page flip: two quick airy swishes."""
    a = noise_bp(0.18, 2300, 1.0, amp * 0.7, 0.02, 0.1)
    b = noise_bp(0.3, 1200, 0.8, amp, 0.03, 0.2)
    out = np.zeros(len(b) + int(SR * 0.09))
    place(out, a, 0.0)
    place(out, b, 0.09)
    return out


def creak_str(f: float, amp: float = 1.0) -> np.ndarray:
    """Bowed-string creak: slow, dull Karplus-Strong plucks with a steady sustain."""
    return pluck(f, 1.35, amp, 0.22) * envn(int(SR * 1.35), 0.02, 1.1, 0.25)


def mix(*xs: np.ndarray) -> np.ndarray:
    n = max(len(x) for x in xs)
    out = np.zeros(n)
    for x in xs:
        out[: len(x)] += x
    return out


_mix = mix
whoosh = lambda d=0.6, a=0.5, f=900: _mix(noise_bp(d, f, 1.2, a, d * 0.45, d * 0.45), sweep(f * 0.3, f * 0.12, d, a * 0.25, d * 0.4, d * 0.4))
boom = lambda a=0.9: _mix(drum(90, 38, 0.7, a), rumble(1.6, a * 0.8, 44, 0.02, 1.3))
thunder = lambda a=0.8: _mix(noise_bp(2.4, 170, 0.7, a, 0.02, 2.0), rumble(2.6, a, 38, 0.02, 2.2), noise_bp(0.25, 2600, 1.5, a * 0.5, 0.005, 0.2))
clang = lambda a=0.4: _mix(bell(1320, a, 0.7), noise_bp(0.22, 3200, 3, a * 0.8, 0.002, 0.18))
arrow = lambda a=0.3: _mix(noise_bp(0.28, 2400, 4, a, 0.02, 0.22), sweep(1900, 800, 0.28, a * 0.4, 0.02, 0.2))
zap = lambda d=0.4, a=0.35: noise_bp(d, 3800, 2, a, 0.005, d * 0.6)
conch = lambda a=0.32: _mix(sweep(228, 236, 2.0, a, 0.35, 0.7, 1.0), sweep(456, 472, 2.0, a * 0.45, 0.35, 0.7, 1.0), sweep(684, 708, 2.0, a * 0.2, 0.35, 0.7, 1.0))
drone = lambda d=3.0, a=0.3, f=62: _mix(sweep(f, f * 0.9, d, a, d * 0.3, d * 0.4, 1.0), noise_bp(d, 260, 1.0, a * 0.5, d * 0.3, d * 0.5))
magic = lambda d=1.0, a=0.25: _mix(sweep(300, 1400, d, a, 0.1, d * 0.4), *[bell(f, a * 0.5, 1.4) for f in (1568, 2093)])
darkmagic = lambda d=1.2, a=0.3: _mix(sweep(520, 120, d, a, 0.05, d * 0.5), noise_bp(d, 400, 1.2, a * 0.6, 0.2, d * 0.5))
chord = lambda a=0.35: _mix(bell(523, a, 2.8), bell(659, a * 0.7, 2.6), bell(784, a * 0.7, 2.6))
hoof = lambda a=0.22: drum(150, 70, 0.07, a)
step = lambda a=0.25: drum(80, 50, 0.12, a)
crowd = lambda d=1.6, a=0.3: _mix(noise_bp(d, 650, 1.4, a, d * 0.3, d * 0.5), noise_bp(d, 1200, 2.0, a * 0.5, d * 0.3, d * 0.5))
neigh = lambda a=0.25: _mix(groan(820, 0.9, a, 9.0, 0.6), noise_bp(0.9, 1600, 2, a * 0.4, 0.05, 0.5))
trumpet = lambda a=0.3: _mix(sweep(380, 760, 1.2, a, 0.1, 0.5, 0.8), noise_bp(1.2, 900, 2, a * 0.5, 0.1, 0.5))
riser = lambda d=1.2, a=0.25: mix(sweep(120, 900, d, a, d * 0.6, 0.15), noise_bp(d, 1500, 1.0, a * 0.5, d * 0.7, 0.1))
impact = lambda a=1.0: mix(drum(1500, 300, 0.2, 1.2 * a, click=1.0), drum(52, 28, 1.2, 1.1 * a), rumble(2.0, 0.9 * a, fc=42))
