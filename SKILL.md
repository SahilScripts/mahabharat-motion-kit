---
name: mahabharat-motion-kit
description: Make a vertical motion-graphics reel (1080x1920, 60 fps MP4) about Indian mythology (Mahabharata, Ramayana, Puranas) from a voice-over, in the @mahabharat.retold painted-realism style. Every picture is drawn in code (Remotion + SVG) and the music and sound effects are synthesised, all on this computer with no API keys. Use when the user gives a voice-over or audio file and wants a reel, short, animation or motion-graphics video, or asks to set up, check or fix this kit.
---

# Mahabharat Motion Kit

You turn a voice-over into a finished reel with the tools in this repository. Everything runs locally: Node (Remotion),
Python (numpy + faster-whisper) and ffmpeg. No cloud APIs, no image or video generators, no API keys, no logins.

If you got this kit as an uploaded zip (for example in a Gemini task), unzip it and work from its top folder: it is the
whole repository (code, examples, guides), not just these instructions.

## What to do

Follow `AGENTS.md` in the repository root step by step, from Step 0 (`./setup.sh` until it prints **READY**) to Step 10.
It has the rules and the exact commands. `GEMINI.md`, `CLAUDE.md` and `.github/copilot-instructions.md` are the same text.

When the user gives a voice-over, do the whole workflow on your own, with a one-line progress note after the storyboard,
after the first stills and at the end. Ask only if there is no usable voice-over.

The short version:

1. `./setup.sh` (wait for READY).
2. Copy the voice-over to `reels/<reel>/voiceover.mp3` (`<reel>` = lowercase letters, digits and `-`).
3. `.venv/bin/python pipeline/transcribe.py <reel>`, then write the exact spoken words to `reels/<reel>/script-hi.txt`.
4. Write `reels/<reel>/storyboard.json` (one picture per spoken idea, 1.5-4.5 s per shot).
5. `.venv/bin/python pipeline/timing.py <reel>` (writes `reels/<reel>/cues.txt` with word times per shot).
6. Copy `remotion/src/reels/Template.tsx` to `remotion/src/reels/<PascalName>.tsx` and code one shot per storyboard row,
   in the style of `remotion/src/examples/LankaKuber.tsx`. Type-check: `(cd remotion && npx tsc --noEmit -p .)`
7. `pipeline/stills.sh REEL-<reel> <times>`, then open and check every still; fix and repeat.
8. Write `reels/<reel>/sfx.py`, then `.venv/bin/python pipeline/sfx.py <reel>`.
9. `pipeline/render.sh <reel>` writes `out/<reel>.mp4`. Optional end card: `pipeline/cta.sh <reel>`.

## Rules that are easy to miss

- No subtitles, captions or any on-screen text. The pictures tell the story.
- Draw everything in code with the kit. Never use AI images, AI video, stock photos or web images.
- Characters: `Hero` from `remotion/src/kit/real.tsx`. Anything held goes through `rProp`/`lProp`; bows only via `archer()`.
  Hanging arms are `HP.hang` with no `rBend`/`lBend`. Never edit the hand drawing in `real.tsx` to fix a shot.
- Maps of India only from `remotion/src/kit/india.tsx`.
- Deities dignified; violence shown by impact, never blood.
- The first frame already moves. One render at a time.
- Never post, upload or log in anywhere. You only produce files.

## Detailed references

| file | read it when |
|---|---|
| `.agents/skills/motion-reel/references/storyboard.md` | writing `storyboard.json`: choosing a picture for every line, hook, pacing, accuracy |
| `.agents/skills/motion-reel/references/kit.md` | coding shots: camera, layers, characters, hand poses, props, maps, sets to copy |
| `.agents/skills/motion-reel/references/review.md` | checking stills and the finished video |
| `.agents/skills/motion-reel/references/sound.md` | writing `sfx.py` and setting the music level |

Worked examples: `reels/example-lanka-kuber/` + `remotion/src/examples/LankaKuber.tsx` (the style reference, 19 shots),
`reels/example-asur-rakshas/` + `remotion/src/examples/AsurRakshas.tsx` (18 shots),
`reels/example-sanjeevani/` + `remotion/src/examples/Sanjeevani.tsx` (13 shots).

To see the target look before you start, watch `docs/examples/*.mp4`: five finished reels made with this kit (360p
copies; the full 1080x1920 versions are on the repository's Releases page).

The deliverable is `out/<reel>.mp4` (or `out/<reel>-final.mp4` with the end card).
