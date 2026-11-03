#!/bin/sh
# Step 6/8 — look at the picture without rendering the whole video:
#   pipeline/stills.sh <CompositionId> <t1,t2,...seconds> [scale=0.5]   ->  out/stills/<CompositionId>/fNNNNN.jpg + sheet.jpg
# Always look at the images (open them / read them) before saying a shot is done.
set -e
id=$1; times=$2; scale=${3:-0.5}
K="$(cd "$(dirname "$0")/.." && pwd)"
d="$K/out/stills/$id"
rm -rf "$d"; mkdir -p "$d"
(cd "$K/remotion" && node tools/stills.mjs "$id" "$d" "$scale" "$times")
n=$(ls "$d"/f*.jpg | wc -l | tr -d ' ')
if [ "$n" -gt 1 ]; then
  cols=$(( n < 4 ? n : 4 ))
  ffmpeg -v error -y -pattern_type glob -i "$d/f*.jpg" -vf "scale=360:-1,tile=${cols}x$(( (n + cols - 1) / cols ))" -frames:v 1 "$d/sheet.jpg" && echo "$d/sheet.jpg"
fi
