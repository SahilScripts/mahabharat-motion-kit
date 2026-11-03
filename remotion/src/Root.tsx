/**
 * Every composition the kit can render. Reels in src/reels/*.tsx are found automatically: each file exports a
 * `<Name>Composition` component (see src/reels/Template.tsx) — no need to edit this file.
 *   REEL-<name>          your reels (src/reels/<Name>.tsx)
 *   REEL-example-asur-rakshas   example: Asur vs Rakshas (18 shots)
 *   REEL-example-sanjeevani     example: Sanjeevani, Hanuman lifts the mountain (13 shots)
 *   CTA-workflow         optional WORKFLOW end card (props: still = the reel's last frame)
 *   KIT-sheet-0…4      model sheets of the realistic cast (QA)    KIT-india-map  official India outline (QA)
 */
import React from "react";
import { AbsoluteFill, Composition } from "remotion";
import { AsurRakshasComposition } from "./examples/AsurRakshas";
import { SanjeevaniComposition } from "./examples/Sanjeevani";
import { MgCta2 as CtaCard } from "./kit/CtaCard";
import { IndiaOutline } from "./kit/india";
import { RealSheet } from "./kit/realcast";

// every src/reels/*.tsx module; each exported function whose name ends in "Composition" is registered
declare const require: { context: (dir: string, sub: boolean, re: RegExp) => { keys(): string[]; (k: string): Record<string, unknown> } };
const reelCtx = require.context("./reels", false, /\.tsx$/);
const REELS = reelCtx.keys().flatMap((k) =>
  Object.entries(reelCtx(k)).filter(([n, v]) => n.endsWith("Composition") && typeof v === "function").map(([n, v]) => ({ key: `${k}:${n}`, C: v as React.FC })),
);

const IndiaCheck: React.FC = () => (
  <AbsoluteFill style={{ background: "#1a2a4a" }}>
    <svg width={1080} height={1920} viewBox="0 0 1080 1920"><g transform="translate(40 300)"><IndiaOutline /></g></svg>
  </AbsoluteFill>
);

export const RemotionRoot: React.FC = () => (
  <>
    {REELS.map(({ key, C }) => <C key={key} />)}
    <AsurRakshasComposition />
    <SanjeevaniComposition />
    <Composition id="CTA-workflow" component={CtaCard} fps={60} width={1080} height={1920}
      defaultProps={{ dur: 15.2, still: "mg/cta/ex-sanjeevani.jpg", others: ["mg/cta/ex-asur-rakshas.jpg", "mg/cta/ex-durga.jpg"], audio: true, sfx: "mg/cta/sfx.mp3" }}
      calculateMetadata={({ props }) => ({ durationInFrames: Math.ceil(props.dur * 60) })} durationInFrames={Math.ceil(15.2 * 60)} />
    {[0, 1, 2, 3, 4].map((p) => <Composition key={p} id={`KIT-sheet-${p}`} component={RealSheet} durationInFrames={1} fps={60} width={1080} height={1920} defaultProps={{ part: p }} />)}
    <Composition id="KIT-india-map" component={IndiaCheck} durationInFrames={1} fps={60} width={1080} height={1920} />
  </>
);
