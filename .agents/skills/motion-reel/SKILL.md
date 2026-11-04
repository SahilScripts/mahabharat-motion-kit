---
name: motion-reel
description: Make a vertical motion-graphics reel (1080x1920, 60 fps) from a voice-over, with realistic painted-style mythology characters drawn in code (Remotion + SVG) and synthesised sound. Use when the user gives or mentions a voice-over / audio file and wants a reel, short, animation or motion-graphics video, or asks to set up, check or fix this kit.
---

# Motion reel

You turn a voice-over into a finished reel with the tools in this repository. Everything runs locally: no cloud APIs,
no image or video generators, no API keys.

Follow `AGENTS.md` (repository root; `GEMINI.md`, `CLAUDE.md` and `.github/copilot-instructions.md` are the same text) step by step: it holds the rules and the exact commands. The details live here:

| file | read it when |
|---|---|
| `references/storyboard.md` | writing `storyboard.json` (step 3): how to choose a picture for every line, hook, pacing, colour, accuracy |
| `references/kit.md` | coding shots (step 5): camera, layers, characters, hand poses, props, maps, set pieces to copy |
| `references/review.md` | looking at stills (step 6) and the finished video (step 8) |
| `references/sound.md` | writing `sfx.py` (step 7) and adjusting the music level |

Worked examples (read before coding your first reel):
- `reels/example-lanka-kuber/` + `remotion/src/examples/LankaKuber.tsx` — 19 shots, **the style reference**: palace, lineage board with medallions, sea and island city, Brahma on a lotus, the Pushpaka in flight, a duel, a seated tapasya.
- `reels/example-asur-rakshas/` + `remotion/src/examples/AsurRakshas.tsx` — 18 shots: lineage board, medallions, war in heaven, fire ritual, shape-shifting.
- `reels/example-sanjeevani/` + `remotion/src/examples/Sanjeevani.tsx` — 13 shots: flight across the India map, mountain lift, size comparison, battlefield.

Work through the whole pipeline without waiting for approval between steps; send short progress notes. The deliverable is
`out/<reel>.mp4` (or `out/<reel>-final.mp4` with the end card).
