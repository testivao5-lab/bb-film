// Render ONE chunk of a composition (used by GitHub Actions matrix jobs, also works locally).
//   node tools/chunk.mjs --comp BreakingFilm --index 3 --of 20 [--concurrency 3] [--crf 18] [--from 0 --to 999]
//   node tools/chunk.mjs --comp BreakingFilm --audio            (renders the full mixed audio track as WAV)
import path from "node:path";
import fs from "node:fs";
import { bundle } from "@remotion/bundler";
import { selectComposition, renderMedia } from "@remotion/renderer";

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const flag = (k) => process.argv.includes(`--${k}`);
const comp = arg("comp", "BreakingFilm");
const outDir = path.resolve(arg("out", "out/chunks"));
fs.mkdirSync(outDir, { recursive: true });

const t0 = Date.now();
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const composition = await selectComposition({ serveUrl, id: comp, inputProps: {} });
const total = composition.durationInFrames;
const from = Number(arg("from", 0));
const to = Math.min(total - 1, Number(arg("to", total - 1)));

if (flag("audio")) {
  const out = path.join(outDir, "audio.wav");
  await renderMedia({ composition, serveUrl, codec: "wav", outputLocation: out, frameRange: [from, to], concurrency: 1 });
  console.log(`AUDIO ${out} (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
} else {
  const n = Number(arg("of", 1)), i = Number(arg("index", 0));
  const span = to - from + 1, size = Math.ceil(span / n);
  const a = from + i * size, b = Math.min(to, a + size - 1);
  if (a > to) { console.log("empty chunk"); process.exit(0); }
  const out = path.join(outDir, `chunk_${String(i).padStart(3, "0")}.mp4`);
  console.log(`${comp}: ${total} frames total, chunk ${i + 1}/${n} → frames ${a}-${b}`);
  let last = 0;
  await renderMedia({
    composition, serveUrl, codec: "h264", crf: Number(arg("crf", 18)), pixelFormat: "yuv420p",
    outputLocation: out, frameRange: [a, b], muted: true,
    concurrency: Number(arg("concurrency", 2)),
    onProgress: ({ progress }) => { const p = Math.floor(progress * 20); if (p > last) { last = p; console.log(`  ${p * 5}%  (${((Date.now() - t0) / 1000).toFixed(0)} s)`); } },
  });
  const secs = (Date.now() - t0) / 1000;
  console.log(`DONE ${out}: ${b - a + 1} frames in ${secs.toFixed(0)} s (${(secs / (b - a + 1)).toFixed(2)} s/frame)`);
}
