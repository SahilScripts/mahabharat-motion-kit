"""Word timing from the voice's own pauses (align), and the background score (score): tanpura drone + pad, a drum on
every cut, a bell on the last line. numpy + ffmpeg only."""

import re
import subprocess
from pathlib import Path

import numpy as np

from dsp import SR, bell, drum, env, onepole_lp, place, rng, tanpura  # noqa: F401

PUNCT = "।?,!.…\"'"

def norm(w: str) -> str:
    return re.sub(r"[।?,!.…\"'\s]", "", w).replace("़", "")


def pauses(path: Path) -> list[tuple[float, float]]:
    """Silences in the voice-over (start, end)."""
    err = subprocess.run(["ffmpeg", "-v", "info", "-i", str(path), "-af", "silencedetect=n=-38dB:d=0.12", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", err)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", err)]
    return list(zip(starts, ends))


def align(script_words: list[str], vo: Path, vo_len: float) -> list[tuple[float, float]]:
    """Word times from the voice's own pauses: every clause (ending in , । ? …) starts where the speaker resumes after
    the pause nearest its expected position (by character count); words inside a clause are spread by length."""
    clauses, cur = [], []
    for i, w in enumerate(script_words):
        cur.append(i)
        if w[-1] in "।?,…!" or w.endswith("..."):
            clauses.append(cur)
            cur = []
    if cur:
        clauses.append(cur)
    weight = [sum(len(norm(script_words[i])) + 1 for i in c) for c in clauses]
    total = sum(weight)
    gaps = [g for g in pauses(vo) if 0.05 < g[0] < vo_len - 0.05]
    bounds = [0.0]  # speech start of each clause
    ends = []       # speech end of each clause
    used = -1
    for k in range(1, len(clauses)):
        expect = vo_len * sum(weight[:k]) / total
        cands = [(abs((g[0] + g[1]) / 2 - expect), j) for j, g in enumerate(gaps) if j > used and g[1] > bounds[-1] + 0.25]
        best = min(cands, default=None)
        if best and best[0] < 2.5:
            used = best[1]
            ends.append(gaps[used][0])
            bounds.append(gaps[used][1])
        else:
            ends.append(expect - 0.1)
            bounds.append(expect)
    ends.append(vo_len)
    times: list[tuple[float, float]] = [(0.0, 0.0)] * len(script_words)
    for c, t0, t1 in zip(clauses, bounds, ends):
        ws = [max(1, len(norm(script_words[i]))) + 1 for i in c]
        acc = t0
        for i, wgt in zip(c, ws):
            d = (t1 - t0) * wgt / sum(ws)
            times[i] = (acc, acc + d)
            acc += d
    return times


def score(n_total: int, cuts: list[float], last_line: float, dur: float) -> np.ndarray:
    t = np.arange(n_total) / SR
    D2, A2, D3 = 73.42, 110.0, 146.83
    m = tanpura(n_total, D2, 0.0, dur, 0.16) + tanpura(n_total, A2, 0.6, dur, 0.1)
    pad = sum(np.sin(2 * np.pi * (f + d) * t + k) for k, f in enumerate([D3, 174.61, 220.0, 293.66]) for d in (-0.5, 0.5))
    m += onepole_lp(pad, 1500) * env(n_total, 0.0, 1.5, dur - 3.0, 1.5) * 0.035
    for i, c in enumerate(cuts):
        if i % 2 == 0:
            place(m, drum(amp=0.55), c)
        else:
            place(m, drum(f_hi=160, f_lo=90, decay=0.25, amp=0.3, click=0.4), c)
        n = int(SR * 0.45)  # soft whoosh into each cut
        place(m, onepole_lp(rng.standard_normal(n), 1800) * np.sin(np.linspace(0, np.pi, n)) ** 2 * 0.25, c - 0.3)
    place(m, drum(f_hi=140, f_lo=40, decay=1.2, amp=0.8, click=0.3), last_line)
    place(m, bell(523.25, 0.3, 3.0), last_line)
    return m * np.clip((dur - t) / 0.8, 0, 1)


