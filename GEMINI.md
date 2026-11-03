# Motion Reel Kit — instructions for the agent

This repository turns a **voice-over** (Hindi by default) into a finished **vertical motion-graphics reel**
(1080×1920, 60 fps, MP4) about Indian mythology: Mahabharata, Ramayana, Puranas. Every picture is drawn **in code** (React + SVG,
rendered with Remotion) in a painted-realism style after Raja Ravi Varma: shaded skin, five-finger hands, jewellery, silk,
lit 2.5D scenes with a camera moving through layers. Music and sound effects are synthesised in code.

Everything runs on this computer: Node (Remotion), Python (numpy + faster-whisper), ffmpeg.
**No cloud APIs, no Vertex AI, no image/video generators, no API keys, no accounts.**

**When the user gives you a voice-over, do the whole workflow below on your own**, start to finish, with a one-line progress
note after the storyboard, after the first stills, and at the end. Ask only if there is no usable voice-over.
The skill `motion-reel` (`.agents/skills/motion-reel/`) has the detailed references this file points to.

---

## Step 0 — make sure the kit is installed (every session)
```bash
./setup.sh
```
It installs whatever is missing (Node 20+, Python 3.10+, ffmpeg via Homebrew/apt; Remotion and its headless browser;
a Python venv with faster-whisper; the Whisper model), builds the two example reels' audio and renders a test frame.
It is quick when everything is already there. Continue only after it prints **READY**.
If it stops with a message (e.g. Homebrew missing, Windows), tell the user exactly what to do; never type passwords for them.
If your commands run in a sandbox without internet (errors like `ENOTFOUND`, `Could not resolve host`, pip/npm/model download
failures), don't retry in a loop: ask the user to run `./setup.sh` once in a normal Terminal window, then continue.
Commands can take minutes (setup, transcribe ≈ 1 min, render ≈ 5–10 min): run them and wait for them to finish.

Run every command from the repository root. Python is `.venv/bin/python`.

## Rules (never break these)
1. **No subtitles, captions or any on-screen text**: no kinetic typography, labels, numbers or names. Pictures alone tell the
   story. (The optional end card is the only exception and is already built.)
2. **Everything drawn in code** with the kit. Never use AI images, AI video, stock photos, clip art or web images.
3. **Characters look real**: `Hero` from `remotion/src/kit/real.tsx` with a `Look` + `Outfit` (ready ones in `kit/realcast.tsx`).
   Hands do the right gesture and hold props properly; ornaments on; iconography correct.
4. **Maps of India only from `kit/india.tsx`** (shows all of Jammu & Kashmir, Ladakh, Arunachal Pradesh and the islands).
   Never hand-draw India's outline: incorrect borders are illegal to publish in India.
5. **Respectful and non-graphic**: deities dignified; violence shown by impact and reaction, never blood.
6. **The first frame already moves** (the hook). No title card, no fade-in from black.
7. **One picture per spoken idea**, as cause and effect where possible; with the sound off the story still reads.
8. **Continuity**: what the story changes stays changed in later shots.
9. **Light on the machine**: one render at a time (scripts use 3 parallel frames).
10. **Never post or upload anything** and never log in anywhere. You only produce files.
11. Don't break `kit/` or `examples/`. You may add components; don't change existing component signatures.

## The workflow

Choose a reel name: lowercase letters, digits and `-` (e.g. `ram-setu`). Below it is `<reel>`.
Its composition id is `REEL-<reel>`.

### 1. Voice-over in place
Copy the user's file to `reels/<reel>/voiceover.mp3` (or `.wav`/`.m4a`; the extension can stay).
Language: `kit.config.json` → `"language"` (`hi` default; e.g. `en`). If the user says otherwise, follow them.

### 2. Transcribe, then write the exact script
```bash
.venv/bin/python pipeline/transcribe.py <reel>
```
Writes `reels/<reel>/transcript.txt` (Whisper's draft, often misspelt) and `reels/<reel>/whisper.json` (word timings).
Now write `reels/<reel>/script-hi.txt` (same name for any language): the **exact words spoken**, nothing added or dropped.
- Fix spelling from your knowledge of the story (`शुर्वाद` → `शुरुआत`, `परवत` → `पर्वत`, `हिमाले` → `हिमालय`).
- End every sentence with `।` or `?` (English: `.` `?` `!`). Put a closing quote BEFORE the danda: `…"।`.
- Keep pauses as `,` or `...` — they let two shots split one sentence.
- Sentences are counted from 0; that number is the `s` of the storyboard.

### 3. Storyboard
Read `.agents/skills/motion-reel/references/storyboard.md`, then write `reels/<reel>/storyboard.json`
(one entry per shot: `s`, `title`, `pick` = what we see and what moves, `camera`, `sound`).
Every sentence gets ≥ 1 shot; long ones 2–3; aim for 1.5–4.5 s per shot (a 60–75 s reel ≈ 14–20 shots).
Progress note: one line per shot.

### 4. Timeline
```bash
.venv/bin/python pipeline/timing.py <reel>
```
Writes the voice + score mix and `remotion/public/mg/<reel>/manifest.json`, and saves `reels/<reel>/cues.txt`:
each shot's window and every word's time **inside that shot** (`word@seconds`). Animation beats and sounds come from these times.
A shot under ~1.2 s → merge or re-split shots in the storyboard and run it again.

### 5. Code the reel
1. Copy `remotion/src/reels/Template.tsx` to `remotion/src/reels/<PascalName>.tsx`.
2. In it: `const REEL = "<reel>"`; rename `TemplateReel` → `<PascalName>` and `TemplateReelComposition` → `<PascalName>Composition`.
   (Reels are registered automatically; no other file to edit.)
3. One shot component per storyboard row (`S0 … Sn`) and `const SHOTS = [S0, …, Sn]` — **same count as the storyboard**.
4. Use the kit — read `.agents/skills/motion-reel/references/kit.md` — and copy patterns/set pieces from
   `remotion/src/examples/AsurRakshas.tsx` and `Sanjeevani.tsx`.
5. Every shot: a camera move, ≥ 3 depth layers (far / subject at d=1 / foreground), idle life (fire, particles, glow), and one
   clear action timed to its key word from `cues.txt`. Comment each shot with its line and the cue times you used.
6. Type-check until clean: `(cd remotion && npx tsc --noEmit -p .)`

### 6. Look at stills — mandatory
```bash
pipeline/stills.sh REEL-<reel> <t1,t2,…>        # seconds; middle of every shot + key action moments
```
Writes `out/stills/REEL-<reel>/f*.jpg` and `sheet.jpg`. **Open and look at every image**, check it against
`.agents/skills/motion-reel/references/review.md`, fix, re-render the changed stills, look again — until nothing fails.
Action shots: `pipeline/frames.sh REEL-<reel> <start_seconds> 8 6` → a strip of 8 frames to judge the motion.

### 7. Sound effects
Write `reels/<reel>/sfx.py` (`.agents/skills/motion-reel/references/sound.md`; examples in `reels/example-*/sfx.py`), then
```bash
.venv/bin/python pipeline/sfx.py <reel>
```

### 8. Render and check
```bash
pipeline/render.sh <reel>                        # → out/<reel>.mp4 (several minutes)
```
Check duration ≈ manifest duration, then extract and look at 4 frames:
`ffmpeg -v error -y -ss <t> -i out/<reel>.mp4 -frames:v 1 out/check-<t>.jpg` (start, two middles, last second).

### 9. End card (only if `kit.config.json` has `"end_card": true` or the user asks)
```bash
pipeline/cta.sh <reel>                           # → out/<reel>-final.mp4 (reel + 15.2 s "comment WORKFLOW" end card)
```

### 10. Report
Give the user the full path of the video, its length, the shot list in one line each, and anything you could not check.
If asked for a caption: hook question first line, 2–3 lines of context, one call to action, 3–5 hashtags → `reels/<reel>/caption.txt`.

## Troubleshooting
- `Composition id can only contain a-z, A-Z, 0-9 …` → reel name has `_`/spaces; rename folder and `REEL`.
- `manifest.json` 404 → step 4 not run, or `REEL` ≠ folder name.
- A shot repeats or the end is missing → `SHOTS` length ≠ storyboard shots; re-run step 4 after storyboard edits.
- Words badly timed → check `script-hi.txt` matches the audio word for word; Whisper only anchors the times.
- Timeouts while rendering → close heavy apps and retry (180 s per frame allowed).
- Remotion's licence: free for individuals and small teams; companies may need a licence (remotion.dev/license).
