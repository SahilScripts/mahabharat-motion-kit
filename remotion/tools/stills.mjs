// Render many stills of one composition with a single bundle: node tools/stills.mjs <compId> <outDir> <scale> <t1,t2,...> (seconds)
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";
import fs from "node:fs";

const [id, outDir, scale, times] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const chromiumOptions = { gl: "angle" }; // same as remotion.config.ts (the Node API ignores it)
const composition = await selectComposition({ serveUrl, id, chromiumOptions });
for (const ts of times.split(",")) {
  const frame = Math.min(composition.durationInFrames - 1, Math.round(Number(ts) * composition.fps));
  const output = path.join(outDir, `f${String(frame).padStart(5, "0")}.jpg`);
  await renderStill({ composition, serveUrl, frame, output, imageFormat: "jpeg", jpegQuality: 80, scale: Number(scale), chromiumOptions, timeoutInMilliseconds: 180000 });
  console.log(output);
}
