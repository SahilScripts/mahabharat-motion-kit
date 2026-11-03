# Motion Reel Kit

Turn a **voice-over** into a finished **vertical motion-graphics reel** (1080×1920, 60 fps) about Indian mythology —
with painted, realistic-looking characters, a moving 2.5D camera, music and sound effects — by asking **Gemini**.

![Frames from the two example reels](docs/preview.jpg)

Everything is drawn in code (React + SVG with [Remotion](https://www.remotion.dev)) and runs on your computer:
no image or video AI, no cloud APIs, no API keys. Gemini does the creative work — writes the script from your audio, plans the
shots, codes the animation, checks the frames and renders the video — using the instructions and skill in this repository.

## Quick start

1. **Clone**
   ```bash
   git clone <this-repo-url> motion-reel-kit && cd motion-reel-kit
   ```
2. **Open it with Gemini** — either
   - **Gemini CLI**: `npm install -g @google/gemini-cli`, then run `gemini` inside the folder and choose **Trust folder**.
     Sign in with a **Gemini API key** (free from [aistudio.google.com](https://aistudio.google.com/apikey); put
     `GEMINI_API_KEY=...` in `~/.gemini/.env`) or **Vertex AI** (`GOOGLE_GENAI_USE_VERTEXAI=true`, `GOOGLE_CLOUD_PROJECT`,
     `GOOGLE_CLOUD_LOCATION=global`, and `GOOGLE_APPLICATION_CREDENTIALS=<key.json>` in `~/.gemini/.env`) — Gemini CLI no
     longer accepts plain personal Google sign-in. Never put that file in this repository. Or
   - **Google Antigravity**: *File → Open Folder* and pick the folder; use the Agent panel.

   Gemini reads `GEMINI.md` automatically, and the `motion-reel` skill in `.agents/skills/`.
3. **Ask for a reel**
   - Gemini CLI: `/reel ~/Downloads/my-voiceover.mp3`
   - Antigravity: `/reel` workflow, or just say *"Make a reel from ~/Downloads/my-voiceover.mp3"*.

The first run installs what's missing (`./setup.sh`: Node, Python, ffmpeg, Remotion, Whisper — a few minutes and ~1.5 GB),
then the agent works through: transcribe → script → storyboard → timing → animation code → still-frame review → sound effects →
render. The video lands in `out/<reel>.mp4`.

Voice-over tips: clear narration, 45–90 s, one speaker; Hindi by default (set `"language"` in `kit.config.json`, e.g. `"en"`).

## Requirements
- macOS (Apple Silicon or Intel) or Linux (Debian/Ubuntu). Windows: use WSL.
- 8 GB RAM is enough (renders use 3 parallel frames). ~2 GB free disk.
- On macOS, [Homebrew](https://brew.sh) if Node/Python/ffmpeg aren't installed yet (setup tells you).

## What's inside
| path | |
|---|---|
| `GEMINI.md` / `AGENTS.md` | the agent's instructions: rules + the 10-step workflow (same text; Gemini CLI and Antigravity both read them) |
| `.agents/skills/motion-reel/` | the skill: storyboard craft, drawing-kit reference, review checklist, sound guide |
| `.gemini/commands/`, `.agents/workflows/` | `/reel` and `/setup` shortcuts for Gemini CLI and Antigravity |
| `setup.sh` | installs everything and self-tests; safe to re-run |
| `pipeline/` | `transcribe.py` (local Whisper) · `timing.py` (cuts, music, mix) · `sfx.py` + `sfxlib.py` (synthesised effects) · `stills.sh`, `frames.sh` (review) · `render.sh` · `cta.sh` (optional end card) |
| `remotion/src/kit/` | the drawing kit: realistic characters (`real.tsx`, `realcast.tsx`), camera and scenery (`scene.tsx`), India map (`india.tsx`), older flat cast and props (`cast*.tsx`), end card |
| `remotion/src/examples/` + `reels/example-*` | two complete reels (Asur vs Rakshas, Sanjeevani) with script, storyboard and sound |
| `remotion/src/reels/` | new reels go here (from `Template.tsx`; picked up automatically) |

## Doing it by hand
```bash
./setup.sh
mkdir -p reels/my-reel && cp ~/my-voiceover.mp3 reels/my-reel/voiceover.mp3
.venv/bin/python pipeline/transcribe.py my-reel        # then write reels/my-reel/script-hi.txt and storyboard.json
.venv/bin/python pipeline/timing.py my-reel             # → reels/my-reel/cues.txt
# code remotion/src/reels/MyReel.tsx from Template.tsx (REEL = "my-reel")
pipeline/stills.sh REEL-my-reel 1,4,8                   # look at frames
.venv/bin/python pipeline/sfx.py my-reel
pipeline/render.sh my-reel                              # → out/my-reel.mp4
```
Preview interactively with `cd remotion && npx remotion studio`.

## Customising
- **Characters**: add a `Look` + `Outfit` (see `.agents/skills/motion-reel/references/kit.md`); look at them with
  `pipeline/stills.sh KIT-sheet-3 0`.
- **End card**: `pipeline/cta.sh <reel>` appends a 15 s Hindi "comment WORKFLOW" call to action. Replace
  `remotion/public/mg/cta/vo.mp3` with your own line and retime `T` in `remotion/src/kit/CtaCard.tsx`, and set
  `"end_card": true` in `kit.config.json` to have the agent add it every time.
- **Music level**: `MUSIC=0.25 .venv/bin/python pipeline/timing.py <reel>` (0 = no score).

## Notes
- No subtitles or on-screen text by design — the pictures tell the story.
- Maps of India use Natural Earth's India-viewpoint boundaries (public domain), the only outline the kit allows.
- Remotion is free for individuals and small teams; larger companies need a [Remotion licence](https://www.remotion.dev/license).
- The example voice-overs and stills are the author's and are included for demonstration.
