#!/bin/sh
# Motion check — consecutive frames of one moment, to see if a move reads (stills can't show motion):
#   pipeline/frames.sh <CompositionId> <start_seconds> [count=8] [step_frames=6]  ->  out/stills/<id>/strip.jpg
set -e
id=$1; t0=$2; n=${3:-8}; step=${4:-6}
ts=$(python3 -c "print(','.join(str(round($t0 + i * $step / 60, 3)) for i in range($n)))")
K="$(cd "$(dirname "$0")/.." && pwd)"
d="$K/out/stills/$id"; rm -rf "$d"; mkdir -p "$d"
(cd "$K/remotion" && node tools/stills.mjs "$id" "$d" 0.35 "$ts")
ffmpeg -v error -y -pattern_type glob -i "$d/f*.jpg" -vf "tile=${n}x1" -frames:v 1 "$d/strip.jpg" && echo "$d/strip.jpg"
