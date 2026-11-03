#!/bin/sh
# Zoom check — render one frame at full size and crop a region 2× bigger, to judge hands, grips, faces and props
# (in normal stills hands are only a few pixels wide). Coordinates are in the 1080×1920 frame.
#   pipeline/closeup.sh <CompositionId> <seconds> <x> <y> [w=360] [h=360]   ->  out/stills/<id>/closeup-<t>-<x>-<y>.jpg
set -e
id=$1; t=$2; x=$3; y=$4; w=${5:-360}; h=${6:-360}
K="$(cd "$(dirname "$0")/.." && pwd)"
d="$K/out/stills/$id/full"; mkdir -p "$d"
(cd "$K/remotion" && node tools/stills.mjs "$id" "$d" 1 "$t" >/dev/null)
f=$(ls -t "$d"/f*.jpg | head -1)
o="$K/out/stills/$id/closeup-$t-$x-$y.jpg"
ffmpeg -v error -y -i "$f" -vf "crop=$w:$h:$x:$y,scale=$((w * 2)):-1" "$o" && echo "$o"
