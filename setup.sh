#!/usr/bin/env bash
# One-time setup. Safe to re-run; it only does what is missing. Ends with "READY" when the kit works.
#   ./setup.sh
# Installs: system tools (node 20+, python 3.10+, ffmpeg) via Homebrew (macOS) or apt (Debian/Ubuntu) when missing,
# Remotion + its headless browser, a Python venv with numpy + faster-whisper, the Whisper "small" model, and builds the
# audio/timing of the two example reels as a self-test. No accounts or API keys are needed.
set -euo pipefail
K="$(cd "$(dirname "$0")" && pwd)"
cd "$K"
# keep the speech model inside the kit, so it works for sandboxed agents with their own HOME and no network
export HF_HOME="$K/.models"
say() { printf '\n==> %s\n' "$*"; }
have() { command -v "$1" >/dev/null 2>&1; }

# ---------------------------------------------------------------- 1. system tools
need=()
have ffmpeg || need+=(ffmpeg)
if have node; then
  [ "$(node -p 'process.versions.node.split(".")[0]')" -ge 20 ] || need+=(node)
else need+=(node); fi
PY=""
for p in python3.13 python3.12 python3.11 python3.10 python3 python3.14; do
  if have "$p" && "$p" -c 'import sys; sys.exit(0 if sys.version_info >= (3, 10) else 1)' 2>/dev/null; then PY="$p"; break; fi
done
[ -n "$PY" ] || need+=(python)

if [ ${#need[@]} -gt 0 ]; then
  say "installing missing tools: ${need[*]}"
  case "$(uname -s)" in
    Darwin)
      if ! have brew; then
        echo "Homebrew is needed to install ${need[*]}. Install it from https://brew.sh (one command, asks for the Mac password), then run ./setup.sh again."
        exit 1
      fi
      pk=(); for n in "${need[@]}"; do case $n in python) pk+=(python@3.12);; *) pk+=("$n");; esac; done
      brew install "${pk[@]}" ;;
    Linux)
      pk=(); for n in "${need[@]}"; do case $n in python) pk+=(python3 python3-venv python3-pip);; node) pk+=(nodejs npm);; *) pk+=("$n");; esac; done
      if have apt-get; then
        SUDO=""; [ "$(id -u)" -eq 0 ] || SUDO="sudo"
        $SUDO apt-get update -y && $SUDO apt-get install -y "${pk[@]}"
        if have node && [ "$(node -p 'process.versions.node.split(".")[0]')" -lt 20 ]; then
          echo "Node $(node -v) is too old (need 20+). Install Node 20+ from https://nodejs.org or with nvm, then run ./setup.sh again."; exit 1
        fi
      else
        echo "Install these with your package manager, then run ./setup.sh again: ${pk[*]}"; exit 1
      fi ;;
    *)
      echo "Windows: run this kit inside WSL (Ubuntu) and run ./setup.sh there."; exit 1 ;;
  esac
  for p in python3.12 python3.13 python3.11 python3.10 python3; do have "$p" && PY="$p" && break; done
fi
echo "node $(node -v) · $($PY --version) · $(ffmpeg -version | head -1 | cut -d' ' -f1-3)"

# ---------------------------------------------------------------- 2. Remotion
say "installing Remotion (remotion/node_modules) — needs internet the first time"
(cd remotion && { [ -d node_modules/remotion ] || npm ci --no-audit --no-fund || npm install --no-audit --no-fund; })
say "making sure Remotion's headless browser is downloaded"
(cd remotion && npx remotion browser ensure >/dev/null)

# ---------------------------------------------------------------- 3. Python
say "Python environment (.venv) with numpy + faster-whisper"
[ -x .venv/bin/python ] || "$PY" -m venv .venv
if ! .venv/bin/python -c "import numpy, faster_whisper" 2>/dev/null; then
  .venv/bin/python -m pip install -q --upgrade pip
  .venv/bin/python -m pip install -q -r requirements.txt
fi
say "Whisper speech model (downloads ~460 MB into .models/ the first time)"
.venv/bin/python -c "
from faster_whisper import WhisperModel
try:
    WhisperModel('small', device='cpu', compute_type='int8', local_files_only=True)
except Exception:
    WhisperModel('small', device='cpu', compute_type='int8')
" >/dev/null || { echo "Could not download the Whisper model (no internet?). Run ./setup.sh once in a normal Terminal window, then try again."; exit 1; }

# ---------------------------------------------------------------- 4. generated assets + self-test
chmod +x pipeline/*.sh
say "building the example reels' audio and timing (self-test)"
mkdir -p remotion/public/mg/template out
[ -f remotion/public/mg/template/mix.wav ] || ffmpeg -v error -y -f lavfi -i anullsrc=r=48000:cl=stereo -t 8 remotion/public/mg/template/mix.wav
cp -n remotion/public/mg/template/mix.wav remotion/public/mg/template/sfx.wav 2>/dev/null || true
[ -f remotion/public/mg/template/manifest.json ] || echo '{"duration": 8, "audio": "mg/template/mix.wav", "scenes": [{"start": 0, "end": 4}, {"start": 4, "end": 8}], "words": []}' > remotion/public/mg/template/manifest.json
for r in example-asur-rakshas example-sanjeevani example-lanka-kuber; do
  [ -f "remotion/public/mg/$r/sfx.wav" ] || { .venv/bin/python pipeline/timing.py "$r" >/dev/null && .venv/bin/python pipeline/sfx.py "$r"; }
done
say "type-checking the drawing code"
(cd remotion && npx tsc --noEmit -p .)
say "rendering one test frame"
pipeline/stills.sh KIT-india-map 0 0.25 >/dev/null
[ -s out/stills/KIT-india-map/f00000.jpg ]
echo
echo "READY — put a voice-over in reels/<name>/voiceover.mp3 and ask the agent to make the reel."
