/**
 * Cast for the Hindi mythology motion-graphics reels. One rig per character, used in every shot.
 *
 * Conventions (read before animating):
 * - Local units are frame pixels at scale 1. Origin (0,0) is between the feet on the ground; up is NEGATIVE y.
 * - A standing adult is ~840 tall at scale 1 (Indra: crown top at about y = -980).
 * - Arms: `rHand` / `lHand` are hand targets in local coords. "r" is the character's right hand = viewer's LEFT (x < 0).
 *   Elbows are solved with 2-bone IK (`limb`); bend = +1 bends the elbow downward/outward.
 * - Props attach at the hand point and are rotated with `propRot` (degrees, 0 = pointing right / +x).
 * - `t` (seconds) drives automatic life: blinks (per-character seed) and a breathing bob. Mouths stay closed (narration).
 * - Expression values are 0..1 (anger, glow, bow).
 */
import React from "react";

export type P = [number, number];

/** 2-bone IK: elbow position for shoulder s, hand target h, bone lengths a/b. */
export const limb = (s: P, h: P, a: number, b: number, bend = 1): { e: P; h: P } => {
  const dx = h[0] - s[0];
  const dy = h[1] - s[1];
  const d = Math.min(Math.max(Math.hypot(dx, dy), Math.abs(a - b) + 1), a + b - 1);
  const th = Math.atan2(dy, dx);
  const A = Math.acos((a * a + d * d - b * b) / (2 * a * d));
  const e: P = [s[0] + a * Math.cos(th + bend * A), s[1] + a * Math.sin(th + bend * A)];
  const hh: P = [s[0] + d * Math.cos(th), s[1] + d * Math.sin(th)];
  return { e, h: hh };
};

export const blinkAt = (t: number, seed: number) => {
  const period = 3.1 + (seed % 7) * 0.37;
  const p = ((t + seed * 0.71) % period) / period;
  return p > 0.965 ? 0.1 : 1; // eye open fraction
};

export const Arm: React.FC<{ s: P; h: P; a: number; b: number; bend: number; skin: string; shade: string; w: number; band?: string }> = ({
  s, h, a, b, bend, skin, shade, w, band,
}) => {
  // elbows go to the outside of the body (away from x = 0) unless a bend is forced
  const out = Math.sign(s[0]) || 1;
  const k1 = limb(s, h, a, b, 1);
  const k2 = limb(s, h, a, b, -1);
  const k = bend === 0 ? (k1.e[0] * out >= k2.e[0] * out ? k1 : k2) : limb(s, h, a, b, bend);
  const d = `M${s[0]} ${s[1]} L${k.e[0]} ${k.e[1]} L${k.h[0]} ${k.h[1]}`;
  return (
    <g>
      <path d={d} stroke={shade} strokeWidth={w + 6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={d} stroke={skin} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {band && <circle cx={(s[0] + k.e[0]) / 2} cy={(s[1] + k.e[1]) / 2} r={w * 0.55} fill={band} />}
      <circle cx={k.h[0]} cy={k.h[1]} r={w * 0.55} fill={skin} stroke={shade} strokeWidth={3} />
    </g>
  );
};

export const handOf = (s: P, h: P, a: number, b: number) => limb(s, h, a, b).h;

// ---------------------------------------------------------------- props

export const Vajra: React.FC<{ glow?: number }> = ({ glow = 0 }) => (
  <g>
    {glow > 0 && <ellipse cx={0} cy={0} rx={150} ry={70} fill="#ffe9a8" opacity={0.35 * glow} />}
    {[-1, 1].map((s) => (
      <g key={s} transform={`scale(${s} 1)`}>
        <path d="M18 0 Q40 -10 60 0 Q40 10 18 0Z" fill="#c88a1e" />
        <path d="M58 0 C80 -34 110 -36 128 -10 L112 0 L128 10 C110 36 80 34 58 0Z" fill="#f2bb4b" stroke="#a86c12" strokeWidth={3} />
        <path d="M60 0 L140 0" stroke="#fff3c4" strokeWidth={6} strokeLinecap="round" />
      </g>
    ))}
    <rect x={-20} y={-11} width={40} height={22} rx={8} fill="#a86c12" />
    <circle cx={0} cy={0} r={9} fill="#d4263a" />
  </g>
);

export const Ladle: React.FC = () => (
  <g>
    <rect x={0} y={-6} width={190} height={12} rx={6} fill="#8a5a2a" />
    <path d="M186 -26 Q236 -26 236 6 Q212 30 186 8Z" fill="#b8862e" stroke="#7a521a" strokeWidth={3} />
  </g>
);

export const Bowl: React.FC<{ glow?: number }> = ({ glow = 0 }) => (
  <g>
    {glow > 0 && <ellipse cx={0} cy={-18} rx={60} ry={34} fill="#b46cff" opacity={0.4 * glow} />}
    <path d="M-38 -12 Q0 -14 38 -12 Q34 22 0 24 Q-34 22 -38 -12Z" fill="#b8862e" stroke="#7a521a" strokeWidth={3} />
    <ellipse cx={0} cy={-12} rx={38} ry={8} fill="#ffcf6a" />
  </g>
);

// ---------------------------------------------------------------- Indra

export type IndraPose = {
  t: number;
  rHand?: P; // character's right hand (viewer left)
  lHand?: P;
  vajraIn?: "r" | "l" | null;
  propRot?: number;
  anger?: number;
  glow?: number; // aura
  lookX?: number; // -1..1
  bowHead?: number; // weariness 0..1
  seated?: boolean;
};

const I = { skin: "#e3a55e", shade: "#a8692f", blue: "#1d4fa6", blueD: "#123671", gold: "#f2bb4b", goldD: "#b07a1c", white: "#efe7d8", hair: "#14100f" };

export const Indra: React.FC<IndraPose> = ({ t, rHand = [-172, -380], lHand = [172, -380], vajraIn = "r", propRot = -60, anger = 0, glow = 0, lookX = 0, bowHead = 0, seated = false }) => {
  const breathe = Math.sin(t * 2.2) * 3;
  const open = blinkAt(t, 3) * (1 - anger * 0.25);
  const rS: P = [-118, -672 + breathe];
  const lS: P = [118, -672 + breathe];
  const rH = handOf(rS, rHand, 160, 150);
  const lH = handOf(lS, lHand, 160, 150);
  const headTilt = bowHead * 14;
  return (
    <g>
      {glow > 0 && (
        <g opacity={glow}>
          <ellipse cx={0} cy={-560} rx={330} ry={520} fill="#7fb6ff" opacity={0.18} />
          <ellipse cx={0} cy={-560} rx={240} ry={430} fill="#cfe4ff" opacity={0.18} />
        </g>
      )}
      <ellipse cx={0} cy={4} rx={190} ry={26} fill="#000" opacity={0.35} />
      {/* legs + dhoti */}
      {seated ? (
        <g>
          <path d="M-150 -330 L150 -330 L190 -200 L120 -40 L-120 -40 L-190 -200Z" fill={I.white} />
          <path d="M-190 -200 L-120 -40 L120 -40 L190 -200 L170 -200 L105 -62 L-105 -62 L-170 -200Z" fill={I.gold} />
          <path d="M-100 -40 L-60 0 L-10 0 L-40 -40Z M100 -40 L60 0 L10 0 L40 -40Z" fill={I.skin} />
        </g>
      ) : (
        <g>
          <path d="M-60 -60 L-74 -8 L-20 -8 L-26 -60Z M60 -60 L74 -8 L20 -8 L26 -60Z" fill={I.skin} stroke={I.shade} strokeWidth={3} />
          <path d="M-100 -470 L100 -470 L130 -60 L20 -50 L0 -300 L-20 -50 L-130 -60Z" fill={I.white} />
          <path d="M-130 -60 L-20 -50 L-22 -78 L-126 -86Z M130 -60 L20 -50 L22 -78 L126 -86Z" fill={I.gold} />
          <path d="M-40 -460 L-10 -60 M40 -460 L80 -70" stroke="#d6cbb6" strokeWidth={6} />
        </g>
      )}
      {/* torso */}
      <path d={`M-84 -470 Q0 -455 84 -470 L128 ${-680 + breathe} Q0 ${-712 + breathe} -128 ${-680 + breathe}Z`} fill={I.skin} stroke={I.shade} strokeWidth={4} />
      <path d={`M10 ${-700 + breathe} Q60 -600 84 -470 L120 -470 L128 ${-680 + breathe}Z`} fill={I.shade} opacity={0.35} />
      {/* blue angavastram across the chest */}
      <path d={`M-128 ${-680 + breathe} L-60 ${-700 + breathe} L96 -500 L60 -470Z`} fill={I.blue} />
      <path d={`M-60 ${-700 + breathe} L96 -500 L104 -514 L-44 ${-712 + breathe}Z`} fill={I.gold} />
      <rect x={-96} y={-482} width={192} height={24} rx={8} fill={I.gold} />
      {/* necklace */}
      <path d={`M-70 ${-688 + breathe} Q0 ${-610 + breathe} 70 ${-688 + breathe}`} stroke={I.gold} strokeWidth={12} fill="none" />
      <circle cx={0} cy={-628 + breathe} r={12} fill="#d4263a" stroke={I.gold} strokeWidth={4} />
      {/* arms */}
      <Arm s={rS} h={rHand} a={160} b={150} bend={0} skin={I.skin} shade={I.shade} w={44} band={I.gold} />
      <Arm s={lS} h={lHand} a={160} b={150} bend={0} skin={I.skin} shade={I.shade} w={44} band={I.gold} />
      {vajraIn && (
        <g transform={`translate(${(vajraIn === "r" ? rH : lH)[0]} ${(vajraIn === "r" ? rH : lH)[1]}) rotate(${propRot})`}>
          <Vajra glow={glow} />
        </g>
      )}
      {/* head */}
      <g transform={`rotate(${headTilt} 0 -720)`}>
        <rect x={-24} y={-740} width={48} height={50} fill={I.skin} />
        <path d="M-74 -800 Q-86 -700 -96 -640 L-60 -650 Q-60 -720 -50 -790Z M74 -800 Q86 -700 96 -640 L60 -650 Q60 -720 50 -790Z" fill={I.hair} />
        <ellipse cx={0} cy={-800} rx={60} ry={72} fill={I.skin} stroke={I.shade} strokeWidth={4} />
        <path d="M14 -870 Q62 -840 58 -780 Q50 -740 22 -728Z" fill={I.shade} opacity={0.3} />
        {/* eyes */}
        {[-1, 1].map((s) => (
          <g key={s}>
            <path d={`M${s * 24 - 16} -806 Q${s * 24} ${-806 - 12 * open + anger * 4} ${s * 24 + 16} -806 Q${s * 24} ${-806 + 8 * open} ${s * 24 - 16} -806Z`} fill="#fff8ec" />
            <circle cx={s * 24 + lookX * 5} cy={-806} r={6.5 * open} fill={anger > 0.6 ? "#3a1a08" : "#2a1508"} />
            {anger > 0.3 && <circle cx={s * 24 + lookX * 5} cy={-806} r={10} fill="#9fd1ff" opacity={(anger - 0.3) * 0.6} />}
            <path
              d={`M${s * 10} ${-824 + anger * 6} L${s * 44} ${-830 - anger * 10 + (1 - anger) * 2}`}
              stroke={I.hair}
              strokeWidth={9}
              strokeLinecap="round"
            />
          </g>
        ))}
        <path d="M0 -800 L-8 -772 Q0 -768 8 -772Z" fill={I.shade} />
        {/* moustache + mouth */}
        <path d={`M-30 -758 Q-14 ${-768 + anger * 3} 0 -762 Q14 ${-768 + anger * 3} 30 -758 Q14 -754 0 -757 Q-14 -754 -30 -758Z`} fill={I.hair} />
        <path d={`M-14 -744 Q0 ${-740 + (anger > 0.5 ? -4 : 3)} 14 -744`} stroke="#7a3a24" strokeWidth={4} fill="none" strokeLinecap="round" />
        <rect x={-4} y={-852} width={8} height={30} rx={4} fill="#d4263a" />
        {/* crown: three tiers */}
        <path d="M-62 -846 L62 -846 L54 -880 L-54 -880Z" fill={I.gold} stroke={I.goldD} strokeWidth={3} />
        <path d="M-50 -880 L50 -880 L38 -930 L-38 -930Z" fill={I.gold} stroke={I.goldD} strokeWidth={3} />
        <path d="M-34 -930 L34 -930 L0 -990Z" fill={I.gold} stroke={I.goldD} strokeWidth={3} />
        <circle cx={0} cy={-866} r={11} fill="#d4263a" />
        <circle cx={0} cy={-912} r={8} fill="#1d4fa6" />
        <circle cx={-58} cy={-794} r={9} fill={I.gold} />
        <circle cx={58} cy={-794} r={9} fill={I.gold} />
      </g>
    </g>
  );
};

// ---------------------------------------------------------------- Vishwaroop (three heads)

export type VishwaroopPose = { t: number; rHand?: P; lHand?: P; prop?: "ladle" | "bowl" | null; bowlIn?: "l"; bow?: number; heads?: number; lookX?: number };
const V = { skin: "#c98d5e", shade: "#8e5b33", robe: "#e0761c", robeD: "#a9520f", beard: "#f1ece2", hair: "#d8d2c6" };

const VHead: React.FC<{ x: number; y: number; r: number; turn: number; open: number; lookX: number }> = ({ x, y, r, turn, open, lookX }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx={0} cy={0} rx={r * 0.92} ry={r} fill={V.skin} stroke={V.shade} strokeWidth={3} />
    <ellipse cx={turn * r * 0.3} cy={-r * 1.02} rx={r * 0.42} ry={r * 0.3} fill={V.hair} />
    <path d={`M${-r * 0.9} ${-r * 0.2} Q${-r * 0.95} ${-r * 0.95} 0 ${-r * 0.92} Q${r * 0.95} ${-r * 0.95} ${r * 0.9} ${-r * 0.2} Q${r * 0.5} ${-r * 0.62} 0 ${-r * 0.6} Q${-r * 0.5} ${-r * 0.62} ${-r * 0.9} ${-r * 0.2}Z`} fill={V.hair} />
    {[-1, 1].map((s) => (
      <g key={s}>
        <ellipse cx={s * r * 0.36 + turn * r * 0.15} cy={-r * 0.1} rx={r * 0.15} ry={r * 0.09 * open} fill="#fff8ec" />
        <circle cx={s * r * 0.36 + turn * r * 0.15 + lookX * 3} cy={-r * 0.1} r={r * 0.07 * open} fill="#2a1508" />
        <path d={`M${s * r * 0.18 + turn * r * 0.15} ${-r * 0.3} L${s * r * 0.55 + turn * r * 0.15} ${-r * 0.32}`} stroke="#e8e2d6" strokeWidth={r * 0.1} strokeLinecap="round" />
      </g>
    ))}
    <rect x={-r * 0.06 + turn * r * 0.15} y={-r * 0.82} width={r * 0.12} height={r * 0.4} rx={r * 0.06} fill="#d4263a" />
    <path d={`M${-r * 0.82} ${r * 0.1} Q${-r * 0.7} ${r * 1.5} ${turn * r * 0.2} ${r * 1.75} Q${r * 0.7} ${r * 1.5} ${r * 0.82} ${r * 0.1} Q${r * 0.4} ${r * 0.5} 0 ${r * 0.42} Q${-r * 0.4} ${r * 0.5} ${-r * 0.82} ${r * 0.1}Z`} fill={V.beard} />
    <path d={`M${-r * 0.28} ${r * 0.24} Q0 ${r * 0.38} ${r * 0.28} ${r * 0.24}`} stroke="#dcd5c8" strokeWidth={r * 0.1} fill="none" strokeLinecap="round" />
  </g>
);

export const Vishwaroop: React.FC<VishwaroopPose> = ({ t, rHand = [-150, -365], lHand = [150, -365], prop = null, bow = 0, heads = 1, lookX = 0 }) => {
  const breathe = Math.sin(t * 2) * 3;
  const open = blinkAt(t, 5);
  const rS: P = [-112, -640 + breathe];
  const lS: P = [112, -640 + breathe];
  const rH = handOf(rS, rHand, 150, 140);
  const lH = handOf(lS, lHand, 150, 140);
  const side = (k: number) => Math.min(1, Math.max(0, heads * 3 - k)); // heads 0..1 → centre, then left, then right rise
  return (
    <g>
      <ellipse cx={0} cy={4} rx={180} ry={24} fill="#000" opacity={0.35} />
      {/* robe */}
      <path d="M-130 -10 L130 -10 L110 -470 L-110 -470Z" fill={V.robe} />
      <path d="M20 -470 L110 -470 L130 -10 L60 -10Z" fill={V.robeD} opacity={0.6} />
      <path d="M-60 -20 L-40 -460 M30 -20 L40 -460" stroke={V.robeD} strokeWidth={5} opacity={0.6} />
      <g transform={`rotate(${bow * 22} 0 -470)`}>
        {/* chest */}
        <path d={`M-104 -470 L104 -470 L118 ${-650 + breathe} Q0 ${-680 + breathe} -118 ${-650 + breathe}Z`} fill={V.skin} stroke={V.shade} strokeWidth={4} />
        <path d={`M-118 ${-650 + breathe} L-40 ${-668 + breathe} L104 -470 L50 -470Z`} fill={V.robe} />
        <path d={`M-80 ${-660 + breathe} L80 -480`} stroke="#fffaf0" strokeWidth={5} />
        {new Array(11).fill(0).map((_, i) => {
          const k = i / 10;
          return <circle key={i} cx={-70 + k * 140} cy={-650 + breathe + Math.sin(k * Math.PI) * 70} r={8} fill="#5a2a14" />;
        })}
        <Arm s={rS} h={rHand} a={150} b={140} bend={0} skin={V.skin} shade={V.shade} w={40} />
        <Arm s={lS} h={lHand} a={150} b={140} bend={0} skin={V.skin} shade={V.shade} w={40} />
        {prop === "ladle" && (
          <g transform={`translate(${rH[0]} ${rH[1]}) rotate(${-150 + Math.sin(t) * 2})`}>
            <Ladle />
          </g>
        )}
        {prop === "bowl" && (
          <g transform={`translate(${lH[0]} ${lH[1] - 14})`}>
            <Bowl glow={1} />
          </g>
        )}
        {/* three heads: side heads rise from behind the shoulders */}
        <rect x={-30} y={-700} width={60} height={50} fill={V.skin} />
        <g opacity={side(1)} transform={`translate(0 ${(1 - side(1)) * 80})`}>
          <rect x={-120} y={-690} width={40} height={40} fill={V.skin} transform="rotate(-20 -100 -670)" />
          <VHead x={-112} y={-748} r={50} turn={-0.6} open={open} lookX={lookX} />
        </g>
        <g opacity={side(2)} transform={`translate(0 ${(1 - side(2)) * 80})`}>
          <rect x={80} y={-690} width={40} height={40} fill={V.skin} transform="rotate(20 100 -670)" />
          <VHead x={112} y={-748} r={50} turn={0.6} open={blinkAt(t, 9)} lookX={lookX} />
        </g>
        <VHead x={0} y={-772} r={60} turn={0} open={blinkAt(t, 7)} lookX={lookX} />
      </g>
    </g>
  );
};

// ---------------------------------------------------------------- Deva and Asura

export const Deva: React.FC<{ t: number; seed?: number; glow?: number }> = ({ t, seed = 0, glow = 1 }) => {
  const b = Math.sin(t * 2 + seed) * 3;
  return (
    <g>
      <circle cx={0} cy={-560 + b} r={120} fill="none" stroke="#ffe6a0" strokeWidth={10} opacity={0.5 + 0.4 * glow} />
      <ellipse cx={0} cy={-300} rx={260} ry={420} fill="#ffe6a0" opacity={0.12 * glow} />
      <path d="M-110 0 L110 0 L90 -330 L-90 -330Z" fill="#f6efe0" />
      <path d="M-90 -330 L90 -330 L104 -470 Q0 -496 -104 -470Z" fill="#f0c070" stroke="#b8862e" strokeWidth={3} />
      <path d="M-104 -470 L-30 -490 L90 -330 L40 -330Z" fill="#e8a31c" />
      <path d="M-26 -380 Q0 -350 26 -380" stroke="#f0c070" strokeWidth={34} strokeLinecap="round" fill="none" />
      <ellipse cx={0} cy={-560 + b} rx={50} ry={60} fill="#f0c070" stroke="#b8862e" strokeWidth={3} />
      <path d={`M-42 ${-596 + b} L42 ${-596 + b} L28 ${-660 + b} L0 ${-690 + b} L-28 ${-660 + b}Z`} fill="#f2bb4b" stroke="#b07a1c" strokeWidth={3} />
      <path d={`M-22 ${-560 + b} Q-14 ${-554 + b} -6 ${-560 + b} M6 ${-560 + b} Q14 ${-554 + b} 22 ${-560 + b}`} stroke="#3a2010" strokeWidth={4} fill="none" />
      <path d={`M-10 ${-530 + b} Q0 ${-524 + b} 10 ${-530 + b}`} stroke="#8a4a2a" strokeWidth={3} fill="none" />
    </g>
  );
};

export const Asura: React.FC<{ t: number; seed?: number; glow?: number; eyes?: number }> = ({ t, seed = 0, glow = 0, eyes = 1 }) => {
  const b = Math.sin(t * 1.6 + seed) * 4;
  return (
    <g>
      {glow > 0 && <ellipse cx={0} cy={-360} rx={320} ry={480} fill="#9a4dff" opacity={0.25 * glow} />}
      <path d="M-130 0 L130 0 L120 -260 L-120 -260Z" fill="#3a1030" />
      <path d={`M-180 ${-460 + b} Q0 ${-520 + b} 180 ${-460 + b} L130 -250 L-130 -250Z`} fill="#5d2f86" stroke="#2a1040" strokeWidth={4} />
      <path d={`M-180 ${-460 + b} L-230 -300 L-190 -280 L-150 -420Z M180 ${-460 + b} L230 -300 L190 -280 L150 -420Z`} fill="#5d2f86" stroke="#2a1040" strokeWidth={4} />
      <ellipse cx={0} cy={-580 + b} rx={74} ry={80} fill="#6a3c8a" stroke="#2a1040" strokeWidth={4} />
      <path d={`M-50 ${-640 + b} Q-110 ${-700 + b} -96 ${-780 + b} Q-74 ${-700 + b} -30 ${-650 + b}Z M50 ${-640 + b} Q110 ${-700 + b} 96 ${-780 + b} Q74 ${-700 + b} 30 ${-650 + b}Z`} fill="#e8dcc4" />
      {[-1, 1].map((s) => (
        <g key={s}>
          <ellipse cx={s * 28} cy={-590 + b} rx={15} ry={9 * eyes} fill="#ff2a2a" />
          <ellipse cx={s * 28} cy={-590 + b} rx={34} ry={22} fill="#ff2a2a" opacity={0.25 * eyes} />
          <path d={`M${s * 8} ${-612 + b} L${s * 50} ${-604 + b}`} stroke="#1a0820" strokeWidth={8} strokeLinecap="round" />
        </g>
      ))}
      <path d={`M-26 ${-540 + b} L-14 ${-524 + b} L-6 ${-540 + b} M26 ${-540 + b} L14 ${-524 + b} L6 ${-540 + b}`} fill="#fff" stroke="#fff" strokeWidth={2} />
    </g>
  );
};

// ---------------------------------------------------------------- Brahmahatya: the sin as a smoky shadow

const R = (s: number) => {
  const x = Math.sin(s * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

export const Sin: React.FC<{ t: number; form?: number; eyes?: number; split?: number }> = ({ t, form = 1, eyes = 1, split = 0 }) => (
  <g>
    {new Array(46).fill(0).map((_, i) => {
      const a = R(i) * Math.PI * 2;
      const rr = (0.2 + R(i + 9) * 0.8) * 230;
      const hx = Math.cos(a) * rr * 0.7;
      const hy = -520 + Math.sin(a) * rr - (i % 5) * 60 * form;
      const drift = Math.sin(t * (0.6 + R(i + 3)) + i) * 18;
      const quarter = i % 4; // which of the four parts this blob goes to when it splits
      const sx = [-1, 1, -1, 1][quarter] * split * 260;
      const sy = [-1, -1, 1, 1][quarter] * split * 220;
      const r = (40 + R(i + 5) * 70) * (0.3 + 0.7 * form);
      return <circle key={i} cx={hx * form + drift + sx} cy={hy * form + (1 - form) * -300 + sy} r={r * (1 - split * 0.3)} fill={i % 3 ? "#0d0a12" : "#241a2e"} opacity={0.85} />;
    })}
    {split < 0.2 && (
      <g opacity={eyes * (1 - split * 5)}>
        {[-1, 1].map((s) => (
          <g key={s}>
            <ellipse cx={s * 50} cy={-640} rx={34} ry={20} fill="#ff2020" opacity={0.3} />
            <path d={`M${s * 50 - 22} -644 L${s * 50 + 22} -644 L${s * 50 + s * 6} -630Z`} fill="#ff3a2a" />
          </g>
        ))}
      </g>
    )}
  </g>
);
