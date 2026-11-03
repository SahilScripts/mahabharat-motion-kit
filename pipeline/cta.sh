#!/bin/sh
# Step 10 — add the 15.2 s WORKFLOW end card (comment WORKFLOW → DM, follow first) after a finished reel:
#   pipeline/cta.sh <reel>      reads out/<reel>.mp4  ->  out/<reel>-final.mp4 (both parts at -14 LUFS)
# The card shows the reel's own last frame in a phone, with two earlier reels fanned behind it.
set -e
r=$1
K="$(cd "$(dirname "$0")/.." && pwd)"
O="$K/out"
ffmpeg -v error -y -sseof -0.1 -i "$O/$r.mp4" -frames:v 1 -update 1 "$K/remotion/public/mg/cta/last-$r.jpg"
(cd "$K/remotion" && npx remotion render CTA-workflow "$O/$r-cta-raw.mp4" --concurrency=3 --codec=h264 --pixel-format=yuv420p --audio-codec=aac \
  --audio-bitrate=256k --timeout=180000 --log=error \
  --props="{\"dur\":15.2,\"still\":\"mg/cta/last-$r.jpg\",\"others\":[\"mg/cta/ex-asur-rakshas.jpg\",\"mg/cta/ex-sanjeevani.jpg\"],\"audio\":true,\"sfx\":\"mg/cta/sfx.mp3\"}")
ffmpeg -v error -y -i "$O/$r-cta-raw.mp4" -c:v copy -af loudnorm=I=-14:TP=-1.5:LRA=11 -ar 48000 -c:a aac -b:a 256k "$O/$r-cta.mp4"
ffmpeg -v error -y -i "$O/$r.mp4" -af loudnorm=I=-14:TP=-1.5:LRA=11 -ar 48000 -c:v copy -c:a aac -b:a 256k "$O/$r-n.mp4"
ffmpeg -v error -y -i "$O/$r-n.mp4" -i "$O/$r-cta.mp4" -filter_complex "[0:v][0:a][1:v][1:a]concat=n=2:v=1:a=1[v][a]" -map "[v]" -map "[a]" \
  -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart "$O/$r-final.mp4"
rm -f "$O/$r-cta-raw.mp4" "$O/$r-n.mp4"
echo "$(date +%T) $r -> out/$r-final.mp4 $(ffprobe -v error -show_entries format=duration -of csv=p=0 "$O/$r-final.mp4")s"
