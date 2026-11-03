#!/bin/sh
# Step 9 — render the full reel:  pipeline/render.sh <reel> <CompositionId>   ->  out/<reel>.mp4
# (CompositionId is REEL-<reel> for reels made from the template.) Uses 3 parallel frames to stay light on an 8 GB Mac.
set -e
r=$1; id=${2:-REEL-$1}
K="$(cd "$(dirname "$0")/.." && pwd)"
cd "$K/remotion"
npx remotion render "$id" "$K/out/$r.mp4" --concurrency=3 --timeout=180000 --codec=h264 --pixel-format=yuv420p \
  --audio-codec=aac --audio-bitrate=256k --log=error
echo "$(date +%T) $r -> out/$r.mp4 $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$K/out/$r.mp4")s"
