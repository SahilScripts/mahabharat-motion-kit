/**
 * Cast 5: Ravana (ten heads), Meghnad, Airavata, thrones, Amaravati, a flying chariot and binding ropes — for the
 * "Indra almost defeated Ravana" reel. Indra himself comes from ./cast (the same rig as the Indra & Vishwaroop reel).
 * Conventions as in ./cast: origin between the feet on the ground, up is negative y, ~840 tall at scale 1,
 * rHand = the character's right hand = viewer's LEFT; `t` drives blinks and breathing; mouths stay closed.
 */
import React from "react";
import { Arm, blinkAt, handOf, type P } from "./cast";
import { Bow } from "./cast2";

const rnd = (s: number) => {
  const x = Math.sin(s * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// ---------------------------------------------------------------- Ravana

const RV = { skin: "#b07a52", shade: "#7a4e30", armour: "#7a1420", armourD: "#4e0c14", gold: "#f2bb4b", goldD: "#a8741a", hair: "#140c0c", eye: "#fff6e0" };

const RHead: React.FC<{ x: number; y: number; s: number; lookX: number; anger: number; open: number; fear: number }> = ({ x, y, s, lookX, anger, open, fear }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-64 -10 Q-80 60 -70 110 L-40 80 Q-46 30 -40 0Z M64 -10 Q80 60 70 110 L40 80 Q46 30 40 0Z" fill={RV.hair} />
    <ellipse cx={0} cy={0} rx={56} ry={64} fill={RV.skin} stroke={RV.shade} strokeWidth={4} />
    <path d="M18 -58 Q58 -30 54 20 Q48 50 22 60Z" fill={RV.shade} opacity={0.25} />
    {[-1, 1].map((k) => (
      <g key={k}>
        <path d={`M${k * 21 - 14} -4 Q${k * 21} ${-4 - 11 * open * (1 + fear * 0.4)} ${k * 21 + 14} -4 Q${k * 21} ${-4 + 8 * open} ${k * 21 - 14} -4Z`} fill={RV.eye} />
        <circle cx={k * 21 + lookX * 5} cy={-4} r={(fear > 0.5 ? 4 : 6) * open} fill="#2a0a06" />
        <path d={`M${k * 8} ${-22 + anger * 6 - fear * 6} L${k * 36} ${-28 - anger * 8 + fear * 8}`} stroke={RV.hair} strokeWidth={8} strokeLinecap="round" />
      </g>
    ))}
    <path d="M0 0 L-6 22 Q0 25 6 22Z" fill={RV.shade} />
    <path d="M-34 38 Q-16 26 0 32 Q16 26 34 38 Q40 30 44 22 Q42 44 28 42 Q14 36 0 40 Q-14 36 -28 42 Q-42 44 -44 22 Q-40 30 -34 38Z" fill={RV.hair} />
    <path d={fear > 0.5 ? "M-10 52 Q0 46 10 52" : "M-12 50 Q0 54 12 50"} stroke="#5a1a14" strokeWidth={4} fill="none" strokeLinecap="round" />
    <rect x={-4} y={-46} width={8} height={22} rx={4} fill="#d4263a" />
    <circle cx={-58} cy={14} r={10} fill={RV.gold} />
    <circle cx={58} cy={14} r={10} fill={RV.gold} />
    <path d="M-58 -50 L58 -50 L50 -86 L26 -76 L14 -112 L0 -84 L-14 -112 L-26 -76 L-50 -86Z" fill={RV.gold} stroke={RV.goldD} strokeWidth={4} />
    <circle cx={0} cy={-64} r={9} fill="#d4263a" />
  </g>
);

export type RavanaPose = {
  t: number;
  rHand?: P;
  lHand?: P;
  sword?: boolean;
  swordRot?: number;
  shield?: number; // 0 none, 1 whole, 0..1 shattering (values above 1 = broken)
  anger?: number;
  fear?: number;
  look?: number; // -1..1 overall; side heads add their own turns
  scatter?: number; // 0..1 heads look every which way (panic)
  glow?: number;
  seated?: boolean;
  bow?: number; // 0..1 bowing
};

export const Ravana: React.FC<RavanaPose> = ({ t, rHand = [-190, -400], lHand = [190, -400], sword = true, swordRot = -60, shield = 0, anger = 0.5, fear = 0, look = 0, scatter = 0, glow = 0, seated = false, bow = 0 }) => {
  const b = Math.sin(t * 1.8) * 3;
  const open = blinkAt(t, 7);
  const rS: P = [-128, -690 + b];
  const lS: P = [128, -690 + b];
  const rH = handOf(rS, rHand, 175, 165);
  const lH = handOf(lS, lHand, 175, 165);
  const heads: { x: number; y: number; s: number; i: number }[] = [];
  for (let i = 1; i <= 4; i++) {
    heads.push({ x: -i * 82, y: -830 + i * 14, s: 1 - i * 0.07, i: -i });
    heads.push({ x: i * 82, y: -830 + i * 14, s: 1 - i * 0.07, i });
  }
  heads.push({ x: 0, y: -968, s: 0.82, i: 9 });
  const lookOf = (i: number) => Math.max(-1, Math.min(1, look + scatter * Math.sin(t * 5 + i * 1.9) + (i < 0 ? -0.3 : i > 0 && i < 9 ? 0.3 : 0)));
  return (
    <g transform={`rotate(${bow * 12} 0 -400)`}>
      {glow > 0 && <ellipse cx={0} cy={-560} rx={520} ry={600} fill="#ff4a2a" opacity={0.14 * glow} />}
      <ellipse cx={0} cy={4} rx={200} ry={26} fill="#000" opacity={0.35} />
      {seated ? (
        <path d="M-150 -330 L150 -330 L200 -190 L130 -40 L-130 -40 L-200 -190Z" fill={RV.armour} />
      ) : (
        <g>
          <path d="M-70 -60 L-84 -6 L-24 -6 L-30 -60Z M70 -60 L84 -6 L24 -6 L30 -60Z" fill={RV.skin} stroke={RV.shade} strokeWidth={3} />
          <path d="M-110 -470 L110 -470 L140 -60 L24 -50 L0 -300 L-24 -50 L-140 -60Z" fill={RV.armour} />
          <path d="M-140 -60 L-24 -50 L-26 -80 L-136 -88Z M140 -60 L24 -50 L26 -80 L136 -88Z" fill={RV.gold} />
          {[-80, 0, 80].map((x) => <path key={x} d={`M${x} -460 L${x * 1.2} -100`} stroke={RV.armourD} strokeWidth={6} />)}
        </g>
      )}
      {/* torso armour */}
      <path d={`M-96 -470 Q0 -455 96 -470 L138 ${-700 + b} Q0 ${-734 + b} -138 ${-700 + b}Z`} fill={RV.armourD} />
      <path d={`M-80 -480 Q0 -470 80 -480 L112 ${-690 + b} Q0 ${-716 + b} -112 ${-690 + b}Z`} fill={RV.gold} stroke={RV.goldD} strokeWidth={4} />
      <circle cx={0} cy={-600 + b} r={34} fill={RV.armour} stroke={RV.goldD} strokeWidth={5} />
      <circle cx={0} cy={-600 + b} r={14} fill="#d4263a" />
      <rect x={-104} y={-492} width={208} height={28} rx={8} fill={RV.goldD} />
      {/* shoulder guards */}
      {[-1, 1].map((k) => <ellipse key={k} cx={k * 134} cy={-692 + b} rx={54} ry={34} fill={RV.gold} stroke={RV.goldD} strokeWidth={4} />)}
      <Arm s={rS} h={rHand} a={175} b={165} bend={0} skin={RV.skin} shade={RV.shade} w={50} band={RV.gold} />
      {sword && (
        <g transform={`translate(${rH[0]} ${rH[1]}) rotate(${swordRot})`}>
          <rect x={-20} y={-12} width={50} height={24} rx={6} fill={RV.goldD} />
          <path d="M30 -16 Q260 -60 380 30 Q250 -10 30 16Z" fill="#dfe6f0" stroke="#8a96a8" strokeWidth={3} />
          <rect x={22} y={-30} width={12} height={60} rx={4} fill={RV.gold} />
        </g>
      )}
      <Arm s={lS} h={lHand} a={175} b={165} bend={0} skin={RV.skin} shade={RV.shade} w={50} band={RV.gold} />
      {shield > 0 && (
        <g transform={`translate(${lH[0] + 30} ${lH[1]})`}>
          {shield <= 1 ? (
            <g>
              <circle r={120} fill="#5a3a2a" stroke={RV.gold} strokeWidth={10} />
              <circle r={40} fill={RV.gold} />
            </g>
          ) : (
            [...Array(6)].map((_, i) => {
              const a = (i / 6) * Math.PI * 2;
              const k = Math.min(1, shield - 1);
              return <path key={i} transform={`translate(${Math.cos(a) * 260 * k} ${Math.sin(a) * 200 * k + 300 * k * k}) rotate(${k * 200 * (i % 2 ? 1 : -1)})`} d={`M0 0 L${Math.cos(a - 0.5) * 120} ${Math.sin(a - 0.5) * 120} L${Math.cos(a + 0.5) * 120} ${Math.sin(a + 0.5) * 120}Z`} fill="#5a3a2a" stroke={RV.gold} strokeWidth={6} opacity={1 - k * 0.7} />;
            })
          )}
        </g>
      )}
      {/* neck + ten heads */}
      <rect x={-26} y={-760 + b} width={52} height={60} fill={RV.skin} />
      {heads.filter((h) => h.i !== 0 && h.i !== 9).sort((a, c) => Math.abs(c.i) - Math.abs(a.i)).map((h) => (
        <RHead key={h.i} x={h.x} y={h.y + b} s={h.s * 0.92} lookX={lookOf(h.i)} anger={anger} open={blinkAt(t, 7 + h.i)} fear={fear} />
      ))}
      <RHead x={0} y={-968 + b} s={0.78} lookX={lookOf(9)} anger={anger} open={blinkAt(t, 16)} fear={fear} />
      <RHead x={0} y={-830 + b} s={1.08} lookX={lookOf(0)} anger={anger} open={open} fear={fear} />
    </g>
  );
};

// ---------------------------------------------------------------- Meghnad

const MG = { skin: "#5a6878", shade: "#38424e", armour: "#6a1424", silver: "#c8ccd6", silverD: "#7a808e", gold: "#f2bb4b", hair: "#0e0a10" };

export type MeghnadPose = { t: number; drawn?: number; anger?: number; lookX?: number; glow?: number; rHand?: P; lHand?: P; chant?: number };

export const Meghnad: React.FC<MeghnadPose> = ({ t, drawn = 0, anger = 0.6, lookX = 0, glow = 0, rHand, lHand, chant = 0 }) => {
  const b = Math.sin(t * 2.1) * 3;
  const open = blinkAt(t, 13) * (1 - anger * 0.2);
  const rS: P = [-104, -666 + b];
  const lS: P = [104, -666 + b];
  // bow drawn: his left hand (viewer right) pushes the bow out, the right hand pulls the string to the chest
  const lh: P = lHand ?? (drawn > 0 ? [104 + 300 * drawn, -666 + b - 20 * drawn] : [150, -380]);
  const rh: P = rHand ?? (drawn > 0 ? [60 + 40 * (1 - drawn), -640 + b] : chant > 0 ? [-30, -640] : [-150, -380]);
  const lH = handOf(lS, lh, 160, 150);
  const rH = handOf(rS, rh, 160, 150);
  return (
    <g>
      {glow > 0 && <ellipse cx={0} cy={-520} rx={360} ry={540} fill="#c83a5a" opacity={0.16 * glow} />}
      <ellipse cx={0} cy={4} rx={170} ry={24} fill="#000" opacity={0.35} />
      {/* quiver on his back */}
      <g transform="translate(-60 -760) rotate(-24)">
        <rect x={-26} y={0} width={52} height={260} rx={12} fill="#5a3a22" />
        {[-12, 0, 12].map((x) => <path key={x} d={`M${x} 0 L${x} -50 M${x - 8} -40 L${x} -56 L${x + 8} -40`} stroke="#c8ccd6" strokeWidth={4} fill="none" />)}
      </g>
      <path d="M-56 -60 L-68 -6 L-18 -6 L-24 -60Z M56 -60 L68 -6 L18 -6 L24 -60Z" fill={MG.skin} stroke={MG.shade} strokeWidth={3} />
      <path d="M-92 -460 L92 -460 L122 -60 L20 -50 L0 -290 L-20 -50 L-122 -60Z" fill={MG.armour} />
      <path d="M-122 -60 L-20 -50 L-22 -78 L-118 -86Z M122 -60 L20 -50 L22 -78 L118 -86Z" fill={MG.silver} />
      <path d={`M-82 -460 Q0 -448 82 -460 L116 ${-676 + b} Q0 ${-706 + b} -116 ${-676 + b}Z`} fill={MG.silver} stroke={MG.silverD} strokeWidth={4} />
      <path d={`M-60 ${-640 + b} L60 ${-640 + b} M-50 -560 L50 -560`} stroke={MG.silverD} strokeWidth={6} />
      <circle cx={0} cy={-600 + b} r={22} fill={MG.armour} stroke={MG.gold} strokeWidth={5} />
      <rect x={-86} y={-480} width={172} height={24} rx={8} fill={MG.gold} />
      <Arm s={rS} h={rh} a={160} b={150} bend={0} skin={MG.skin} shade={MG.shade} w={40} band={MG.silver} />
      <Arm s={lS} h={lh} a={160} b={150} bend={0} skin={MG.skin} shade={MG.shade} w={40} band={MG.silver} />
      <g transform={`translate(${lH[0]} ${lH[1]}) scale(${drawn > 0 ? 0.62 : -0.55} 0.62)`}>
        <Bow />
      </g>
      {drawn > 0 && (
        <g>
          <path d={`M${lH[0]} ${lH[1] - 160} L${rH[0]} ${rH[1]} L${lH[0]} ${lH[1] + 160}`} stroke="#efe8d4" strokeWidth={3} fill="none" />
          <path d={`M${rH[0]} ${rH[1]} L${lH[0] + 80} ${lH[1]}`} stroke="#c8ccd6" strokeWidth={6} />
          <path d={`M${lH[0] + 80} ${lH[1]} l-22 -12 l0 24Z`} fill="#c8ccd6" />
        </g>
      )}
      <g>
        <rect x={-20} y={-720 + b} width={40} height={40} fill={MG.skin} />
        <path d="M-56 -800 Q-74 -700 -64 -640 L-40 -660 Q-44 -720 -40 -780Z M56 -800 Q74 -700 64 -640 L40 -660 Q44 -720 40 -780Z" fill={MG.hair} />
        <ellipse cx={0} cy={-770 + b} rx={52} ry={60} fill={MG.skin} stroke={MG.shade} strokeWidth={4} />
        {[-1, 1].map((k) => (
          <g key={k}>
            <path d={`M${k * 20 - 14} ${-774 + b} Q${k * 20} ${-774 + b - 10 * open} ${k * 20 + 14} ${-774 + b} Q${k * 20} ${-774 + b + 7 * open} ${k * 20 - 14} ${-774 + b}Z`} fill={chant > 0 ? "#ffd0e0" : "#fff2e8"} />
            <circle cx={k * 20 + lookX * 5} cy={-774 + b} r={5.5 * open} fill={chant > 0.5 ? "#e8306a" : "#1a0a10"} />
            <path d={`M${k * 8} ${-790 + b + anger * 5} L${k * 36} ${-798 + b - anger * 8}`} stroke={MG.hair} strokeWidth={7} strokeLinecap="round" />
          </g>
        ))}
        <path d={`M0 ${-770 + b} L-5 ${-752 + b} Q0 ${-750 + b} 5 ${-752 + b}Z`} fill={MG.shade} />
        <path d={`M-22 ${-736 + b} Q0 ${-744 + b} 22 ${-736 + b}`} stroke={MG.hair} strokeWidth={5} fill="none" />
        <path d={`M-10 ${-724 + b} Q0 ${-722 + b + (chant > 0 ? Math.abs(Math.sin(t * 14)) * 6 : 0)} 10 ${-724 + b}`} stroke="#3a0a14" strokeWidth={4} fill="none" strokeLinecap="round" />
        <path d={`M-54 ${-812 + b} L54 ${-812 + b} L44 ${-850 + b} L0 ${-878 + b} L-44 ${-850 + b}Z`} fill={MG.silver} stroke={MG.silverD} strokeWidth={3} />
        <circle cx={0} cy={-836 + b} r={8} fill="#c83a5a" />
        <circle cx={-56} cy={-752 + b} r={8} fill={MG.gold} />
        <circle cx={56} cy={-752 + b} r={8} fill={MG.gold} />
      </g>
    </g>
  );
};

/** Glowing mantra rings around a point (Meghnad's spell). */
export const MantraRings: React.FC<{ t: number; k: number; r?: number; c?: string }> = ({ t, k, r = 260, c = "#ff4a8a" }) =>
  k <= 0 ? null : (
    <g opacity={Math.min(1, k * 2)}>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`rotate(${t * (40 + i * 25) * (i % 2 ? -1 : 1)}) scale(1 ${0.35 + i * 0.05})`}>
          <circle r={r * (0.7 + i * 0.25) * (0.8 + 0.2 * k)} fill="none" stroke={c} strokeWidth={6} strokeDasharray="30 18 6 18" opacity={0.85} />
        </g>
      ))}
    </g>
  );

// ---------------------------------------------------------------- Airavata (white elephant, four tusks), side view facing right

export const Airavata: React.FC<{ t: number }> = ({ t }) => {
  const step = Math.sin(t * 2.4) * 8;
  return (
    <g>
      <ellipse cx={0} cy={6} rx={360} ry={30} fill="#000" opacity={0.25} />
      {[[-230, step], [-120, -step], [130, -step], [240, step]].map(([x, d], i) => <rect key={i} x={x - 42} y={-300 + d * 0.3} width={84} height={300} rx={26} fill={i % 2 ? "#e6e2ea" : "#f4f2f6"} stroke="#c0bcc8" strokeWidth={3} />)}
      <ellipse cx={0} cy={-430} rx={360} ry={210} fill="#f4f2f6" stroke="#c0bcc8" strokeWidth={4} />
      <path d="M-260 -560 Q0 -650 260 -560 L280 -330 Q0 -270 -280 -330Z" fill="#c7272f" />
      <path d="M-280 -330 Q0 -270 280 -330 L276 -300 Q0 -240 -276 -300Z" fill="#f2bb4b" />
      {[...Array(9)].map((_, i) => <circle key={i} cx={-240 + i * 60} cy={-300 + Math.abs(i - 4) * -4} r={10} fill="#f2bb4b" />)}
      <g transform={`rotate(${Math.sin(t * 1.3) * 3} 300 -520)`}>
        <ellipse cx={360} cy={-520} rx={150} ry={150} fill="#f4f2f6" stroke="#c0bcc8" strokeWidth={4} />
        <ellipse cx={300} cy={-520} rx={110} ry={140} fill="#e6e2ea" stroke="#c0bcc8" strokeWidth={3} />
        <path d={`M460 -470 Q520 -330 ${470 + Math.sin(t * 1.8) * 20} -170 L430 -170 Q470 -330 410 -440Z`} fill="#f4f2f6" stroke="#c0bcc8" strokeWidth={3} />
        {[0, 1].map((k) => <path key={k} d={`M${430 + k * 16} -430 Q${520 + k * 20} -400 ${560 + k * 10} ${-460 - k * 30}`} stroke="#fff8e6" strokeWidth={14 - k * 3} fill="none" strokeLinecap="round" />)}
        <circle cx={400} cy={-560} r={9} fill="#1a1a20" />
        <path d="M300 -660 L420 -660 L410 -610 L310 -610Z" fill="#f2bb4b" />
        <circle cx={360} cy={-636} r={12} fill="#d4263a" />
      </g>
      <path d={`M-360 -440 Q-400 -380 ${-390 + Math.sin(t * 3) * 10} -300`} stroke="#e6e2ea" strokeWidth={10} fill="none" />
    </g>
  );
};

// ---------------------------------------------------------------- furniture and places

export const Throne: React.FC<{ s?: number; c?: string; c2?: string }> = ({ s = 1, c = "#f2bb4b", c2 = "#a8741a" }) => (
  <g transform={`scale(${s})`}>
    <path d="M-200 0 L200 0 L190 -340 L-190 -340Z" fill={c2} />
    <path d="M-170 -340 L170 -340 Q190 -760 0 -860 Q-190 -760 -170 -340Z" fill={c} stroke={c2} strokeWidth={8} />
    <path d="M-110 -380 L110 -380 Q120 -680 0 -760 Q-120 -680 -110 -380Z" fill="#7a1420" />
    <circle cx={0} cy={-800} r={30} fill="#d4263a" stroke={c2} strokeWidth={6} />
    <rect x={-230} y={-360} width={460} height={60} rx={20} fill={c} stroke={c2} strokeWidth={6} />
    {[-210, 210].map((x) => <circle key={x} cx={x} cy={-380} r={34} fill={c} stroke={c2} strokeWidth={6} />)}
  </g>
);

/** Amaravati: golden domes and spires floating on clouds (origin = middle of the cloud bank). */
export const Amaravati: React.FC<{ w?: number; t: number; glow?: number }> = ({ w = 1400, t, glow = 1 }) => (
  <g>
    <ellipse cx={0} cy={-200} rx={w * 0.6} ry={300} fill="#ffe7a0" opacity={0.18 * glow} />
    {[...Array(11)].map((_, i) => {
      const x = -w / 2 + 70 + (i * (w - 140)) / 10;
      const hh = 160 + rnd(i * 5) * 260 + (i === 5 ? 200 : 0);
      const ww = 60 + rnd(i * 3) * 60 + (i === 5 ? 50 : 0);
      return (
        <g key={i}>
          <rect x={x - ww / 2} y={-hh} width={ww} height={hh} fill={i % 2 ? "#f2c25a" : "#e8b04a"} />
          <rect x={x} y={-hh} width={ww / 2} height={hh} fill="#c8902a" opacity={0.5} />
          <path d={`M${x - ww / 2 - 8} ${-hh} Q${x} ${-hh - ww * 1.2} ${x + ww / 2 + 8} ${-hh}Z`} fill="#ffd36b" />
          <path d={`M${x} ${-hh - ww * 0.9} L${x} ${-hh - ww * 1.6}`} stroke="#ffd36b" strokeWidth={5} />
          {[0, 1, 2].map((k) => <rect key={k} x={x - 8} y={-hh + 30 + k * 44} width={16} height={22} rx={8} fill="#fff6d8" opacity={0.6 + 0.3 * Math.sin(t * 2 + i + k)} />)}
        </g>
      );
    })}
    {[...Array(9)].map((_, i) => <ellipse key={`c${i}`} cx={-w / 2 + i * (w / 8)} cy={20 + (i % 2) * 20} rx={200} ry={70} fill="#f6f2ff" opacity={0.95} />)}
  </g>
);

/** A flying golden chariot facing right (origin = middle of the floor). */
export const Chariot: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <ellipse cx={0} cy={40} rx={360} ry={50} fill="#ffb84a" opacity={0.2 + 0.05 * Math.sin(t * 8)} />
    <path d="M-300 0 L300 0 L260 70 L-260 70Z" fill="#c8902a" stroke="#8a5a1a" strokeWidth={5} />
    <path d="M-300 0 L-300 -220 Q-300 -260 -260 -260 L-230 -260 L-230 0Z" fill="#e8b04a" stroke="#8a5a1a" strokeWidth={5} />
    <path d="M-320 -260 Q0 -420 320 -260" stroke="#e8b04a" strokeWidth={16} fill="none" />
    <path d="M300 0 Q360 -60 340 -140" stroke="#e8b04a" strokeWidth={14} fill="none" strokeLinecap="round" />
    {[-180, 160].map((x) => (
      <g key={x} transform={`translate(${x} 70) rotate(${t * 200})`}>
        <circle r={70} fill="none" stroke="#e8b04a" strokeWidth={12} />
        {[0, 1, 2, 3].map((k) => <path key={k} d={`M0 0 L${Math.cos((k * Math.PI) / 4) * 70} ${Math.sin((k * Math.PI) / 4) * 70} M0 0 L${-Math.cos((k * Math.PI) / 4) * 70} ${-Math.sin((k * Math.PI) / 4) * 70}`} stroke="#e8b04a" strokeWidth={6} />)}
      </g>
    ))}
  </g>
);

/** Glowing ropes binding a standing figure of height h (drawn over it; origin = its feet). */
export const Bonds: React.FC<{ h: number; w: number; k: number; t: number; c?: string; dissolve?: number }> = ({ h, w, k, t, c = "#7affd8", dissolve = 0 }) =>
  k <= 0 ? null : (
    <g opacity={1 - dissolve}>
      {[0.42, 0.52, 0.62, 0.72].map((y, i) => {
        const len = w * 2.4;
        return (
          <g key={i}>
            <ellipse cx={0} cy={-h * y} rx={w * (1 + dissolve * 1.5)} ry={w * 0.22} fill="none" stroke={c} strokeWidth={14} opacity={0.3} strokeDasharray={len * 3} strokeDashoffset={len * 3 * (1 - Math.min(1, k * 1.4 - i * 0.1))} />
            <ellipse cx={0} cy={-h * y} rx={w * (1 + dissolve * 1.5)} ry={w * 0.22} fill="none" stroke="#e8fff8" strokeWidth={5} strokeDasharray={len * 3} strokeDashoffset={len * 3 * (1 - Math.min(1, k * 1.4 - i * 0.1))} />
          </g>
        );
      })}
      {dissolve > 0 && [...Array(14)].map((_, i) => <circle key={i} cx={(rnd(i) - 0.5) * w * 3} cy={-h * (0.4 + rnd(i + 5) * 0.35) - dissolve * 300 * rnd(i + 2)} r={6} fill="#e8fff8" opacity={1 - dissolve} />)}
      <circle cx={0} cy={-h * 0.6} r={4 + Math.abs(Math.sin(t * 6)) * 2} fill="#e8fff8" opacity={0.6} />
    </g>
  );
