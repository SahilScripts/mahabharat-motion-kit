"""Small synthesis helpers shared by the reel scores (numpy only)."""

import math
import wave
from pathlib import Path

import numpy as np

SR = 48000
rng = np.random.default_rng(7)


def onepole_lp(x, fc):
    a = math.exp(-2 * math.pi * fc / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i, v in enumerate(x):
        acc = (1 - a) * v + a * acc
        y[i] = acc
    return y


def bandpass(x, f0, q):
    w0 = 2 * math.pi * f0 / SR
    alpha = math.sin(w0) / (2 * q)
    a0 = 1 + alpha
    b0, b2, a1, a2 = alpha / a0, -alpha / a0, -2 * math.cos(w0) / a0, (1 - alpha) / a0
    y = np.zeros_like(x)
    x1 = x2 = y1 = y2 = 0.0
    for i, v in enumerate(x):
        out = b0 * v + b2 * x2 - a1 * y1 - a2 * y2
        x2, x1, y2, y1 = x1, v, y1, out
        y[i] = out
    return y


def env(n_total, start, attack, hold, release):
    e = np.zeros(n_total)
    s = int(start * SR)
    seg = np.concatenate([np.linspace(0, 1, max(int(attack * SR), 1)), np.ones(int(hold * SR)), np.linspace(1, 0, max(int(release * SR), 1)) ** 2])
    end = min(n_total, s + len(seg))
    if 0 <= s < n_total:
        e[s:end] = seg[: end - s]
    return e


def place(buf, sound, start):
    s = int(start * SR)
    if s < 0:
        sound, s = sound[-s:], 0
    end = min(len(buf), s + len(sound))
    if s < len(buf):
        buf[s:end] += sound[: end - s]


def drum(f_hi=110.0, f_lo=48.0, decay=0.55, amp=1.0, click=0.25):
    n = int(SR * (decay + 0.2))
    tt = np.arange(n) / SR
    freq = f_lo + (f_hi - f_lo) * np.exp(-tt * 18)
    body = np.sin(2 * np.pi * np.cumsum(freq) / SR) * np.exp(-tt / (decay / 3))
    noise = rng.standard_normal(n) * np.exp(-tt * 60) * click
    return amp * np.tanh(1.6 * (body + noise))


def bell(f0, amp=1.0, decay=3.2):
    n = int(SR * decay)
    tt = np.arange(n) / SR
    out = np.zeros(n)
    for ratio, a, d in [(0.5, 0.35, 1.0), (1.0, 1.0, 1.0), (2.0, 0.45, 0.7), (2.76, 0.5, 0.55), (5.4, 0.22, 0.3), (8.93, 0.12, 0.18)]:
        out += a * np.sin(2 * np.pi * f0 * ratio * tt) * np.exp(-tt / (decay * d / 2.5)) * (1 + 0.15 * np.sin(2 * np.pi * 3.1 * tt))
    return amp * (out / 2.0 + rng.standard_normal(n) * np.exp(-tt * 200) * 0.3)


def tanpura(n_total, f, start, stop, amp, every=1.2):
    out = np.zeros(n_total)
    pluck = start
    while pluck < stop:
        n = int(SR * 2.4)
        tt = np.arange(n) / SR
        tone = np.zeros(n)
        for h in range(1, 14):
            shimmer = 1 + 0.5 * np.sin(2 * np.pi * (0.3 + 0.07 * h) * tt + h)
            tone += np.sin(2 * np.pi * f * h * tt * (1 + 0.0004 * h)) * (0.6 ** (h - 1)) * shimmer * np.exp(-tt * (0.6 + 0.12 * h))
        place(out, tone * amp, pluck)
        pluck += every
    return out * env(n_total, start, 0.4, max(0.0, stop - start - 0.6), 0.6)


def pluck(f, length=0.9, amp=1.0, bright=0.5):
    """Karplus-Strong string (santoor/sitar-ish)."""
    n = int(SR * length)
    period = max(2, int(SR / f))
    buf = rng.uniform(-1, 1, period)
    out = np.zeros(n)
    for i in range(n):
        v = buf[i % period]
        out[i] = v
        buf[i % period] = (bright * v + (1 - bright) * buf[(i + 1) % period]) * 0.996
    return amp * out


def square(f, length, amp=1.0, duty=0.5):
    tt = np.arange(int(SR * length)) / SR
    return amp * np.where((tt * f) % 1.0 < duty, 1.0, -1.0) * np.exp(-tt * 3)


def triangle(f, length, amp=1.0):
    tt = np.arange(int(SR * length)) / SR
    return amp * (2 * np.abs(2 * ((tt * f) % 1.0) - 1) - 1)


def write(path: Path, x):
    path.parent.mkdir(parents=True, exist_ok=True)
    x = x / max(1e-9, np.abs(x).max()) * 0.89
    stereo = np.stack([x, x], axis=1)
    with wave.open(str(path), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((stereo * 32767).astype(np.int16).tobytes())
