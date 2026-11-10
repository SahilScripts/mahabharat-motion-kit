#!/usr/bin/env bash
# Pack the whole kit into one zip for agents that take an uploaded skill file (the Gemini app's tasks, for example).
# SKILL.md sits at the top of the zip; the code, examples and guides sit beside it, exactly as in this repository.
# Usage: pipeline/pack.sh            → dist/mahabharat-motion-kit.zip
set -euo pipefail
cd "$(dirname "$0")/.."
out=dist/mahabharat-motion-kit.zip
mkdir -p dist && rm -f "$out"
# every file git would ship (tracked or new, not ignored), minus the zip folder itself
git ls-files -co --exclude-standard | grep -v '^dist/' | zip -q -X "$out" -@
size=$(wc -c < "$out")
limit=$((100 * 1024 * 1024))
printf '%s: %d files, %.1f MB\n' "$out" "$(unzip -Z1 "$out" | wc -l)" "$(echo "$size / 1048576" | bc -l)"
if [ "$size" -ge "$limit" ]; then echo "TOO BIG: over 100 MB; remove large media before packing" >&2; exit 1; fi
