#!/usr/bin/env bash
# Concatenate out/chunks/chunk_*.mp4 losslessly and mux out/chunks/audio.wav → out/film.mp4
set -euo pipefail
cd "$(dirname "$0")/.."
D=out/chunks; OUT=${1:-out/film.mp4}
ls $D/chunk_*.mp4 | sort | sed "s#^$D/#file '#; s#\$#'#" > $D/list.txt
cat $D/list.txt
npx remotion ffmpeg -hide_banner -loglevel error -y -f concat -safe 0 -i $D/list.txt -i $D/audio.wav \
  -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 -movflags +faststart -shortest "$OUT"
npx remotion ffprobe -v error -show_entries format=duration:stream=codec_name,width,height,nb_frames -of compact "$OUT"
echo "ASSEMBLED $OUT"
