/**
 * KIT-arm-test (12 s): one character moving through every arm preset in ARMS plus a few free poses, large, so the
 * hands and shoulders can be checked in motion. Render it after any change to real.tsx:
 *   cd remotion && npx remotion render KIT-arm-test ../out/arm-test.mp4
 */
import React from "react";
import { AbsoluteFill, Composition, Easing, useCurrentFrame } from "remotion";
import { ARMS, Gada, HP, Hero, RealDefs, Sword, mixHand, type Char, type HandPose } from "./real";
import { LOOK, OUT } from "./realcast";

const FPS = 60;
const E = Easing.bezier(0.45, 0, 0.3, 1);
type P = [number, number];
type Pose = Partial<Char> & { label: string };

const POSES: Pose[] = [
  { label: "rest", ...ARMS.rest },
  { label: "bless", ...ARMS.bless },
  { label: "both arms raised", rHand: [-230, -1080], lHand: [230, -1080], rPose: HP.open, lPose: HP.open, rWrist: -90, lWrist: 90 },
  { label: "akimbo", ...ARMS.akimbo },
  { label: "namaste", ...ARMS.namaste },
  { label: "holdUpright + gada", ...ARMS.holdUpright, rProp: <Gada /> },
  { label: "bowAtSide", ...ARMS.bowAtSide },
  { label: "offering", rHand: [-110, -620], lHand: [110, -620], rPose: HP.open, lPose: HP.open, rWrist: -60, lWrist: 60 },
  { label: "sword raised", rHand: [-250, -930], rPose: HP.grip, rProp: <Sword />, rPropAngle: -80, lHand: [150, -470], lPose: HP.fist },
  { label: "rest", ...ARMS.rest },
];
const HOLD = 1.2; // seconds per pose; each blends into the next over its last 0.45 s

const num = (a: number | undefined, b: number | undefined, k: number) =>
  a !== undefined && b !== undefined ? a + (b - a) * k : k < 0.5 ? a : b;
const pt = (a: P | undefined, b: P | undefined, k: number, d: P): P => {
  const A = a ?? d, B = b ?? d;
  return [A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k];
};
const hand = (a: HandPose | undefined, b: HandPose | undefined, k: number) => mixHand(a ?? HP.hang, b ?? HP.hang, k);

const ArmTest: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  const i = Math.min(POSES.length - 1, Math.floor(t / HOLD));
  const a = POSES[i];
  const b = POSES[Math.min(POSES.length - 1, i + 1)];
  const k = E(Math.max(0, Math.min(1, (t - i * HOLD - (HOLD - 0.45)) / 0.45)));
  const pick = <T,>(x: T, y: T) => (k < 0.5 ? x : y);
  return (
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 40%, #6a4a24, #1e140c)" }}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <RealDefs />
        <g transform="translate(540 2200) scale(1.6)">
          <Hero look={LOOK.indra} o={OUT.indra} t={t} seed={3}
            rHand={pt(a.rHand, b.rHand, k, [-150, -420])} rPose={hand(a.rPose, b.rPose, k)} rWrist={num(a.rWrist, b.rWrist, k) ?? 0}
            rHandAngle={pick(a.rHandAngle, b.rHandAngle)} rBend={pick(a.rBend, b.rBend)} rProp={pick(a.rProp, b.rProp)} rPropAngle={pick(a.rPropAngle, b.rPropAngle)}
            lHand={pt(a.lHand, b.lHand, k, [150, -420])} lPose={hand(a.lPose, b.lPose, k)} lWrist={num(a.lWrist, b.lWrist, k) ?? 0}
            lHandAngle={pick(a.lHandAngle, b.lHandAngle)} lBend={pick(a.lBend, b.lBend)} lProp={pick(a.lProp, b.lProp)} lPropAngle={pick(a.lPropAngle, b.lPropAngle)}
            e={{ smile: 0.35 }} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};

export const ArmTestComposition = () => (
  <Composition id="KIT-arm-test" component={ArmTest} durationInFrames={Math.round(POSES.length * HOLD * FPS)} fps={FPS} width={1080} height={1920} />
);
