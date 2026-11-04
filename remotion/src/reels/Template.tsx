/**
 * STARTER for a new reel. Copy this file to src/reels/<PascalName>.tsx, set REEL to the reel folder name (reels/<REEL>/),
 * rename the exports, register the composition in src/Root.tsx, then write one shot component per storyboard shot.
 *
 * How a reel works
 *  - public/mg/<REEL>/manifest.json (written by pipeline/timing.py) holds the duration and one {start, end} per shot.
 *  - The component picks the shot whose window contains the current time and renders it with
 *      t   = seconds since the reel began (use for idle motion: breathing, fire, particles)
 *      s   = seconds since this shot began (use for the shot's own animation and camera)
 *      dur = this shot's length in seconds
 *  - Each shot builds a camera function cam(s) → {x, y, z, r} and a layer binder L = rig(cam, s).
 *    L({ d, id, dof, children }) draws a flat layer at depth d: 0.05 sky, 0.3–0.6 far scenery, 1 the characters,
 *    1.3+ foreground. The camera then gives parallax, depth-of-field blur and motion blur for free.
 *  - Characters come from ../kit/real (Hero + Look + Outfit) and ../kit/realcast (ready looks: LOOK.ravana …).
 *    Held objects: rProp/lProp + rPropAngle/lPropAngle; bows: {...archer({ aim, draw })}; standing arms: {...ARMS.rest}.
 *    Put <RealDefs /> once inside every layer that holds a real-cast character.
 *  - Shot-local word cues: open public/mg/<REEL>/manifest.json, find the word, subtract the shot's start.
 *  - STYLE REFERENCE: src/examples/LankaKuber.tsx — build every reel the same way. Shared sets: ../kit/sets.
 *  - Arms hanging at the side: HP.hang, hands near [±150, -420], and NO rBend/lBend (the default bends elbows outward).
 */
import React from "react";
import { AbsoluteFill, Audio, Composition, Easing, staticFile, useCurrentFrame, type CalculateMetadataFunction } from "remotion";
import { At, C0, Cloud, Fire, Particles, Sky, rig, tw, FPS, W, H, type Words } from "../kit/scene";
import { ARMS, HP, Hero, RealDefs, Sword } from "../kit/real";
import { LOOK, OUT } from "../kit/realcast";

const REEL = "template"; // ← reels/<REEL>/ and public/mg/<REEL>/ — lowercase letters, digits and - only
const E = Easing.bezier(0.45, 0, 0.3, 1);
type SP = { t: number; s: number; dur: number };
type Manifest = { duration: number; scenes: { start: number; end: number }[]; words: Words };

// ---------------------------------------------------------------- shots (one per storyboard row)

/** Shot 0 — the hook: a character already in motion in the first frame, camera pushing in. */
const S0: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, z: tw(u, [0, dur], [1.0, 1.18], E), y: tw(u, [0, dur], [0, -60], E) }), s);
  const raise = tw(s, [0.2, 1.0], [0, 1]);
  return (
    <>
      {L({ d: 0.05, id: "a0", children: <Sky stops={[[0, "#120a1e"], [0.6, "#3a1424"], [1, "#7a2a1a"]]} /> })}
      {L({ d: 0.4, id: "a1", dof: 1, children: <g><Cloud x={200} y={500} s={1.4} fill="#2a1424" o={0.8} /><Cloud x={860} y={380} s={1.1} fill="#2a1424" o={0.7} /></g> })}
      {L({
        d: 1, id: "a2", children: (
          <g>
            <RealDefs />
            <At x={540} y={1760} s={1.05}>
              {/* held prop: rProp + rPropAngle (screen angle) — the sword swings from pointing down-left to straight up */}
              <Hero look={LOOK.ravana} o={OUT.ravana} t={t} {...ARMS.rest}
                rHand={[-150 - 100 * raise, -420 - 560 * raise]} rPose={HP.grip} rProp={<Sword />} rPropAngle={tw(raise, [0, 1], [150, -80])}
                e={{ anger: 0.3 + 0.5 * raise }} />
            </At>
          </g>
        ),
      })}
      {L({ d: 1.4, id: "a3", children: <Particles t={t} seed={3} n={40} color="#ffb04a" x0={0} x1={1080} y0={1200} y1={1920} speed={60} size={4} up /> })}
    </>
  );
};

/** Shot 1 — example of a second set: a fire ritual, camera craning up. */
const S1: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, z: 1.1, y: tw(u, [0, dur], [120, -80], E) }), s);
  return (
    <>
      {L({ d: 0.05, id: "b0", children: <Sky stops={[[0, "#0a0e1e"], [1, "#2a1a10"]]} /> })}
      {L({
        d: 1, id: "b1", children: (
          <g>
            <RealDefs />
            <Fire t={t} x={540} y={1500} s={1.6} />
            <At x={300} y={1700} s={0.8}><Hero look={LOOK.rishi} o={OUT.rishi} t={t} rHand={[-60, -560]} rPose={HP.bless} rWrist={-80} lHand={[110, -470]} lPose={HP.gyan} lWrist={-80} /></At>
            <At x={780} y={1700} s={0.8} flip><Hero look={LOOK.rishi2} o={OUT.rishiW} t={t} seed={4} rHand={[-60, -560]} rPose={HP.bless} rWrist={-80} lHand={[110, -470]} lPose={HP.gyan} lWrist={-80} /></At>
          </g>
        ),
      })}
    </>
  );
};

const SHOTS = [S0, S1];

// ---------------------------------------------------------------- reel shell (keep as is)

export const TemplateReel: React.FC<{ manifest?: Manifest }> = ({ manifest }) => {
  const t = useCurrentFrame() / FPS;
  if (!manifest) return null;
  const B = manifest.scenes.map((x) => x.start).concat(manifest.duration);
  const i = Math.max(0, Math.min(SHOTS.length - 1, B.findIndex((b, k) => t >= b && t < B[k + 1])));
  const Shot = SHOTS[i];
  const cutFlash = i > 0 ? Math.max(0, 1 - (t - B[i]) / 0.1) * 0.18 : 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0710", overflow: "hidden" }}>
      <Audio src={staticFile(`mg/${REEL}/mix.wav`)} />
      <Audio src={staticFile(`mg/${REEL}/sfx.wav`)} volume={0.55} />
      <Shot t={t} s={t - B[i]} dur={B[i + 1] - B[i]} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 42%, transparent 55%, rgba(0,0,0,0.55) 100%)" }} />
      {cutFlash > 0 && <AbsoluteFill style={{ background: "#fff3dc", opacity: cutFlash, mixBlendMode: "screen" }} />}
    </AbsoluteFill>
  );
};

const calculateMetadata: CalculateMetadataFunction<{ manifest?: Manifest }> = async ({ props }) => {
  const manifest: Manifest = await (await fetch(staticFile(`mg/${REEL}/manifest.json`))).json();
  return { durationInFrames: Math.ceil(manifest.duration * FPS), props: { ...props, manifest } };
};

export const TemplateReelComposition = () => (
  <Composition id={`REEL-${REEL}`} component={TemplateReel} calculateMetadata={calculateMetadata} defaultProps={{}} durationInFrames={60 * FPS} fps={FPS} width={W} height={H} />
);
