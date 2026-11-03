/**
 * "असुर और राक्षस एक नहीं" — Hindi reel (2 Nov), painted-realism characters from ./real + ./realcast in lit 2.5D scenes.
 * Inputs: reels/example-asur-rakshas/ (script-hi.txt, storyboard.json, sfx.py). Generated: public/mg/example-asur-rakshas/.
 * Each shot gets shot-local `s`; word cues in comments are shot-local seconds. No subtitles, no on-screen text.
 */
import React from "react";
import { AbsoluteFill, Audio, Composition, Easing, staticFile, useCurrentFrame, type CalculateMetadataFunction } from "remotion";
import { At, Bolt, C0, Cloud, Fire, Particles, Pillar, Sky, rig, rnd, tw, type Words } from "../kit/scene";
import { Vajra } from "../kit/cast";
import { Amaravati } from "../kit/cast5";
import { LankaCity } from "../kit/cast3";
import { Gada, Gem, HP, Hero, Lotus, Pasha, RealDefs, RHead, RL, Sruva, Sword, mixHand, type Look, type Outfit } from "../kit/real";
import { LOOK, OUT, Ravana10 } from "../kit/realcast";

const FPS = 60;
const W = 1080;
const H = 1920;
const E = Easing.bezier(0.45, 0, 0.3, 1);
const OUTE = Easing.bezier(0.2, 0.8, 0.3, 1);
type SP = { t: number; s: number; dur: number };
type Manifest = { duration: number; scenes: { start: number; end: number }[]; words: Words };
const shake = (s: number, t0: number, amp: number, len = 0.7) => {
  const k = s - t0;
  return k < 0 || k > len ? 0 : Math.sin(k * 73) * amp * (1 - k / len) ** 2;
};
const pulse = (s: number, t0: number, len = 0.5) => (s < t0 || s > t0 + len ? 0 : Math.sin(((s - t0) / len) * Math.PI));

// ---------------------------------------------------------------- extra looks

const INDRA: Look = { skin: "#dcaa76", line: "#6a3e1a", hair: "#140c06", crown: "kirita", stache: "thin", tilak: "urdhva", gem: RL.saph };
const INDRA_O: Outfit = { dhoti: "#f2ecde", border: "#c8962e", sash: "#2a5ad8", pearls: 2, hara: true, lower: "long" };
const ASURA: Look = { skin: "#7a5636", line: "#2a160a", hair: "#0e0806", crown: "none", beard: "short", stache: "full", eye: "#4a1206" };
const ASURA_O: Outfit = { dhoti: "#3e1a4e", border: "#b8862e", lower: "knee", armour: "#4a3226", belt: true };
const DEVA: Look = { skin: "#d8a878", line: "#6a3e1a", hair: "#140c06", crown: "mukuta", stache: "thin", gem: RL.emer };
const DEVA_O: Outfit = { dhoti: "#efe4cc", border: "#c8962e", lower: "knee", pearls: 1 };
const MARICHA: Look = { ...LOOK.rakshasa, skin: "#4a3a52", horns: false };

// ---------------------------------------------------------------- props + sets

const Spear: React.FC<{ len?: number; c?: string }> = ({ len = 420, c = "#cfd6e2" }) => (
  <g>
    <rect x={-4} y={-len + 40} width={8} height={len} rx={3} fill="#5a3a1a" />
    <path d={`M0 ${-len - 30} L-12 ${-len + 30} L0 ${-len + 44} L12 ${-len + 30}Z`} fill={c} stroke="#5a6070" strokeWidth={1.2} />
    <rect x={-7} y={-len + 40} width={14} height={8} fill={RL.gold} />
  </g>
);

const Stars: React.FC<{ seed: number; n: number; t: number; y1?: number }> = ({ seed, n, t, y1 = 1100 }) => (
  <g>
    {[...Array(n)].map((_, i) => (
      <circle key={i} cx={-300 + rnd(seed + i) * 1700} cy={-400 + rnd(seed + i * 7) * (y1 + 400)} r={0.8 + rnd(i * 3 + seed) * 1.8} fill="#fff6e0" opacity={0.35 + 0.5 * Math.abs(Math.sin(t * (0.6 + rnd(i)) + i))} />
    ))}
  </g>
);

const Moon: React.FC<{ x: number; y: number; r: number; c?: string }> = ({ x, y, r, c = "#fff1d0" }) => (
  <g>
    <circle cx={x} cy={y} r={r * 3} fill={c} opacity={0.06} />
    <circle cx={x} cy={y} r={r * 1.7} fill={c} opacity={0.1} />
    <circle cx={x} cy={y} r={r} fill={c} />
    <circle cx={x - r * 0.3} cy={y - r * 0.2} r={r * 0.22} fill="#000" opacity={0.06} />
    <circle cx={x + r * 0.25} cy={y + r * 0.3} r={r * 0.14} fill="#000" opacity={0.06} />
  </g>
);

/** brick fire altar with flames */
const Kund: React.FC<{ t: number; x: number; y: number; s?: number; fire?: number }> = ({ t, x, y, s = 1, fire = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={0} rx={260 * (0.6 + 0.4 * fire)} ry={90} fill="#ff9a3a" opacity={0.22 * fire} />
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <path d={`M${-120 + i * 18} ${-i * 26} L${120 - i * 18} ${-i * 26} L${110 - i * 18} ${-26 - i * 26} L${-110 + i * 18} ${-26 - i * 26}Z`} fill={i % 2 ? "#a4502a" : "#b8603a"} stroke="#5a2410" strokeWidth={2} />
        {[...Array(6 - i)].map((__, j) => <line key={j} x1={-100 + i * 18 + j * 40} y1={-i * 26} x2={-100 + i * 18 + j * 40} y2={-26 - i * 26} stroke="#5a2410" strokeWidth={1.5} opacity={0.6} />)}
      </g>
    ))}
    <ellipse cx={0} cy={-78} rx={66} ry={14} fill="#2a1006" />
    <g transform={`translate(0 -80) scale(${0.25 + 0.95 * fire})`}><Fire t={t} x={0} y={0} s={1.2} /></g>
  </g>
);

const Tree: React.FC<{ x: number; y: number; s: number; c: string; seed: number }> = ({ x, y, s, c, seed }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-14 0 L-8 -260 L8 -260 L14 0Z" fill={c} />
    {[...Array(7)].map((_, i) => (
      <ellipse key={i} cx={(rnd(seed + i) - 0.5) * 260} cy={-300 - rnd(seed + i * 3) * 220} rx={110 + rnd(seed * 2 + i) * 60} ry={80 + rnd(seed + i * 5) * 40} fill={c} />
    ))}
  </g>
);

const Palace: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <rect x={-1500} y={-2000} width={4200} height={6000} fill="#3a2410" />
    <path d="M140 1400 L140 420 Q540 -60 940 420 L940 1400Z" fill="#1e1206" />
    <path d="M200 1400 L200 440 Q540 20 880 440 L880 1400Z" fill="#ffcf7a" opacity={0.16} />
    <circle cx={540} cy={560} r={260} fill="#ffe6a8" opacity={0.18 + 0.04 * Math.sin(t * 2)} />
    {[-150, 60, 1020, 1230].map((x) => <Pillar key={x} x={x} y={1700} h={1500} s={1.2} c="#e9c27a" c2="#a8762e" />)}
    <path d="M140 420 Q540 -60 940 420" fill="none" stroke="#f2bb4b" strokeWidth={26} />
    {[...Array(9)].map((_, i) => <circle key={i} cx={540 + Math.cos(Math.PI + (i / 8) * Math.PI) * 400} cy={420 + Math.sin(Math.PI + (i / 8) * Math.PI) * 480 * 0.98} r={9} fill="#d4263a" />)}
    <rect x={-1500} y={1700} width={4200} height={2000} fill="#5a3a18" />
    <rect x={-1500} y={1700} width={4200} height={10} fill="#e9c27a" opacity={0.6} />
  </g>
);

const LankaNight: React.FC<{ t: number; red?: number }> = ({ t, red = 0 }) => (
  <g>
    <Sky stops={[[-900, "#08040e"], [500, "#1c0a1c"], [1150, "#46121e"], [1600, "#7a2a18"]]} />
    <Stars seed={4} n={60} t={t} y1={900} />
    <Moon x={820} y={330} r={70} c="#ffd9b0" />
    {red > 0 && <rect x={-1500} y={-2000} width={4200} height={6000} fill="#ff3a1a" opacity={0.14 * red} />}
  </g>
);

const FemBust: React.FC<{ look: Look; t: number; saree: string; border: string; e?: { smile?: number; lookX?: number; anger?: number }; veil?: boolean }> = ({ look, t, saree, border, e, veil }) => (
  <g>
    <path d="M-150 -640 Q-140 -720 -60 -740 L60 -740 Q140 -720 150 -640 L170 -500 L-170 -500Z" fill={saree} />
    <path d="M-150 -640 Q-140 -720 -60 -740 L60 -740 Q140 -720 150 -640 L170 -500 L-170 -500Z" fill="url(#rl-torso)" />
    <path d="M-60 -742 Q0 -700 60 -742" stroke={look.skin} strokeWidth={30} fill="none" />
    <path d="M-150 -650 Q-40 -600 110 -740" stroke={border} strokeWidth={14} fill="none" />
    <path d="M-150 -650 Q-40 -600 110 -740" stroke={RL.goldD} strokeWidth={14} strokeDasharray="2 5" strokeOpacity={0.5} fill="none" />
    <path d="M-44 -742 Q0 -690 44 -742" stroke={RL.goldH} strokeWidth={7} fill="none" />
    {[...Array(15)].map((_, i) => {
      const u = i / 14;
      return <circle key={i} cx={-48 + u * 96} cy={-742 + Math.sin(u * Math.PI) * 66} r={3.6} fill={RL.pearl} />;
    })}
    <g transform="translate(0 -850)">
      <RHead look={look} t={t} e={e} seed={11} />
      {veil && <path d="M-66 -40 Q-70 -78 0 -80 Q70 -78 66 -40 Q80 40 100 130 L60 130 Q50 40 50 -30 Q0 -62 -50 -30 Q-50 40 -60 130 L-100 130 Q-80 40 -66 -40Z" fill={saree} stroke={border} strokeWidth={5} />}
    </g>
  </g>
);

/** round gold-framed portrait; children are drawn in a 1:1 frame centred on the head */
const Medal: React.FC<{ x: number; y: number; r: number; k: number; rim?: string; glow?: number; id: string; bg?: string; children: React.ReactNode }> = ({ x, y, r, k, rim = "#ffd27a", glow = 0, id, bg = "#20141e", children }) => {
  if (k <= 0.001) return null;
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`} opacity={Math.min(1, k * 1.4)}>
      <circle r={r * 1.5} fill={rim} opacity={0.12 + 0.25 * glow} />
      <circle r={r * 1.2} fill={rim} opacity={0.1 + 0.2 * glow} />
      <defs>
        <clipPath id={id}><circle r={r} /></clipPath>
      </defs>
      <circle r={r} fill={bg} />
      <circle r={r} fill={rim} opacity={0.12} />
      <g clipPath={`url(#${id})`}>{children}</g>
      <circle r={r} fill="none" stroke={RL.goldH} strokeWidth={r * 0.09} />
      <circle r={r + r * 0.045} fill="none" stroke={RL.goldD} strokeWidth={1.5} />
      {[...Array(16)].map((_, i) => <circle key={i} cx={Math.cos((i / 16) * Math.PI * 2) * r} cy={Math.sin((i / 16) * Math.PI * 2) * r} r={r * 0.028} fill={i % 2 ? RL.pearl : RL.ruby} />)}
    </g>
  );
};

/** a golden (or red) thread drawn from a to b as k goes 0 → 1 */
const Thread: React.FC<{ a: [number, number]; b: [number, number]; k: number; c: string; bend?: number }> = ({ a, b, k, c, bend = 0 }) => {
  if (k <= 0) return null;
  const mx = (a[0] + b[0]) / 2 + bend;
  const my = (a[1] + b[1]) / 2;
  const d = `M${a[0]} ${a[1]} Q${mx} ${my} ${b[0]} ${b[1]}`;
  return (
    <g>
      <path d={d} stroke={c} strokeWidth={18} opacity={0.18} fill="none" pathLength={1} strokeDasharray={`${k} 1`} strokeLinecap="round" />
      <path d={d} stroke={c} strokeWidth={5} fill="none" pathLength={1} strokeDasharray={`${k} 1`} strokeLinecap="round" />
    </g>
  );
};

const Leaf: React.FC<{ w?: number; glow?: number; seed: number }> = ({ w = 520, glow = 0, seed }) => (
  <g>
    {glow > 0 && <rect x={-w / 2 - 30} y={-50} width={w + 60} height={100} rx={50} fill="#ffd27a" opacity={0.35 * glow} />}
    <rect x={-w / 2} y={-34} width={w} height={68} rx={30} fill="#e6c98a" stroke="#8a6a32" strokeWidth={2} />
    <rect x={-w / 2} y={-34} width={w} height={68} rx={30} fill="url(#rl-cylA)" opacity={0.4} />
    {[-14, 0, 14].map((y, r) => (
      <path key={y} d={[...Array(16)].map((_, i) => `M${-w / 2 + 40 + i * ((w - 80) / 16)} ${y} q${4 + rnd(seed + i + r * 20) * 6} ${-6} ${10 + rnd(seed * 3 + i + r) * 8} 0`).join(" ")} stroke="#4a2a10" strokeWidth={1.6} fill="none" opacity={0.7} />
    ))}
    <circle cx={-w / 2 + 70} cy={0} r={5} fill="#3a2010" />
    <circle cx={w / 2 - 70} cy={0} r={5} fill="#3a2010" />
  </g>
);

const Diya: React.FC<{ t: number; x: number; y: number; s?: number }> = ({ t, x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-40} r={190} fill="#ffb84a" opacity={0.1 + 0.03 * Math.sin(t * 9)} />
    <circle cx={0} cy={-40} r={80} fill="#ffcf6a" opacity={0.16} />
    <path d="M-48 0 Q-50 30 0 34 Q50 30 48 0 Q20 10 -48 0Z" fill="#a8582a" stroke="#5a2a10" strokeWidth={2} />
    <path d="M-48 0 Q0 -14 48 0 Q0 12 -48 0Z" fill="#6a3416" />
    <path d={`M-4 -4 Q${-14 + Math.sin(t * 11) * 3} -30 ${Math.sin(t * 7) * 5} -66 Q${12 + Math.sin(t * 9) * 3} -30 4 -4Z`} fill="#ffb02a" />
    <path d={`M-2 -6 Q${-6 + Math.sin(t * 11) * 2} -24 ${Math.sin(t * 7) * 3} -44 Q${6 + Math.sin(t * 9) * 2} -24 2 -6Z`} fill="#fff4c0" />
  </g>
);

const Deer: React.FC<{ t: number; glow?: number; run?: number }> = ({ t, glow = 1, run = 0 }) => {
  const g = (k: number) => Math.sin(t * 9 + k) * 18 * run;
  return (
    <g>
      <ellipse cx={0} cy={-200} rx={300} ry={200} fill="#ffd86a" opacity={0.18 * glow} />
      {[[-110, g(0)], [-80, g(2)], [90, g(1)], [120, g(3)]].map(([x, a], i) => (
        <g key={i} transform={`translate(${x} -150) rotate(${a})`}>
          <path d="M-9 0 L-6 70 L-10 140 L-2 146 L4 140 L6 70 L9 0Z" fill={i % 2 ? "#c8902a" : "#e8b440"} stroke="#7a5212" strokeWidth={1.4} />
          <path d="M-9 140 L5 140 L7 152 L-9 152Z" fill="#2a1a0a" />
        </g>
      ))}
      <path d="M-150 -180 Q-160 -250 -80 -262 Q40 -276 130 -250 Q170 -232 160 -180 Q130 -130 40 -136 Q-60 -128 -120 -140 Q-150 -150 -150 -180Z" fill={RL.gold} stroke="#7a5212" strokeWidth={2} />
      <path d="M-150 -180 Q-160 -250 -80 -262 Q40 -276 130 -250 Q170 -232 160 -180 Q130 -130 40 -136 Q-60 -128 -120 -140 Q-150 -150 -150 -180Z" fill="url(#rl-torso)" />
      {[...Array(14)].map((_, i) => <circle key={i} cx={-110 + rnd(i * 4) * 240} cy={-240 + rnd(i * 9) * 80} r={6 + rnd(i) * 4} fill={i % 3 ? "#f8f2e4" : RL.ruby} opacity={0.9} />)}
      <path d="M-158 -180 Q-176 -200 -170 -214 Q-156 -200 -148 -192Z" fill="#fff6e0" />
      <path d="M110 -240 Q140 -300 150 -350 L190 -350 Q180 -290 160 -220Z" fill={RL.gold} stroke="#7a5212" strokeWidth={2} />
      <g transform="translate(176 -366)">
        <path d="M-26 -10 Q0 -30 34 -8 Q64 6 62 18 Q30 22 0 18 Q-24 14 -26 -10Z" fill={RL.gold} stroke="#7a5212" strokeWidth={2} />
        <circle cx={22} cy={0} r={5} fill="#1a0a04" />
        <circle cx={20} cy={-2} r={1.6} fill="#fff" />
        <circle cx={60} cy={12} r={4} fill="#2a1a0a" />
        <path d="M-12 -14 Q-30 -40 -20 -50 Q-4 -34 -2 -18Z" fill="#e8b440" stroke="#7a5212" strokeWidth={1.2} />
        {[-1, 1].map((k) => (
          <path key={k} d={`M${4 + k * 6} -20 Q${-10 + k * 10} -80 ${-30 + k * 20} -110 M${-2 + k * 8} -58 Q${-30 + k * 6} -70 ${-44 + k * 4} -66 M${-16 + k * 12} -88 Q${0 + k * 10} -110 ${8 + k * 8} -128`} stroke="#ffe08a" strokeWidth={5} fill="none" strokeLinecap="round" />
        ))}
      </g>
      <Gem x={150} y={-300} r={6} c={RL.emer} />
    </g>
  );
};

// ---------------------------------------------------------------- shots

/** S0 — रावण राक्षस था... : firelit Lanka, push in on ten-headed Ravana raising his sword */
const S0: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, y: tw(u, [0, dur], [60, 0]), z: tw(u, [0, dur], [1, 1.14], E) }), s);
  const up = tw(s, [0.1, 0.9], [0, 1], E);
  return (
    <>
      {L({ d: 0.05, id: "a0", children: <LankaNight t={t} red={0.4 + 0.3 * up} /> })}
      {L({ d: 0.3, id: "a1", dof: 1.2, children: <g transform="translate(540 1520)"><LankaCity w={2400} lit={1} c="#3a1a10" c2="#200c08" /></g> })}
      {L({
        d: 1, id: "a2", children: (
          <g>
            <RealDefs />
            <Fire t={t} x={-40} y={1500} s={1.6} />
            <Fire t={t + 0.4} x={1120} y={1500} s={1.6} />
            <At x={540} y={2080} s={1.42}>
              <Ravana10 t={t} rHand={[-200 - 60 * up, -500 - 480 * up]} rPose={mixHand(HP.hang, HP.grip, Math.min(1, up * 2))} rProp={<g transform={`rotate(${60 * up})`} opacity={Math.min(1, up * 3)}><Sword /></g>} lHand={[170, -470]} lPose={HP.relax} e={{ anger: 0.3 + 0.5 * up, lookX: 0 }} />
            </At>
          </g>
        ),
      })}
      {L({ d: 1.3, id: "a3", dof: 4, children: <Particles t={t} seed={3} n={26} color="#ff9a4a" x0={-100} x1={1200} y0={300} y1={2000} speed={70} size={4} /> })}
    </>
  );
};

/** S1 — लेकिन हिरण्यकशिपु असुर था: golden palace, tilt up to Hiranyakashipu with the gada on his shoulder */
const S1: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, y: tw(u, [0, dur * 0.8], [260, 0], E), z: tw(u, [0, dur], [1.06, 1.12]) }), s);
  const look = tw(s, [1.1, 1.5], [0.8, 0], E);
  return (
    <>
      {L({ d: 0.2, id: "b0", children: <Palace t={t} /> })}
      {L({
        d: 1, id: "b1", children: (
          <g>
            <RealDefs />
            <ellipse cx={540} cy={900} rx={520} ry={700} fill="#ffd27a" opacity={0.12} />
            <At x={560} y={2160} s={1.5}>
              <Hero look={LOOK.hiranya} o={OUT.hiranya} t={t} seed={2} rHand={[-196, -470]} rPose={HP.grip} rProp={<g transform="rotate(-90)"><Gada len={330} /></g>} lHand={[176, -470]} lPose={HP.relax} lWrist={-20} e={{ anger: 0.25, lookX: look, smile: tw(s, [1.3, 1.8], [0, 0.4]) }} />
            </At>
          </g>
        ),
      })}
      {L({ d: 1.4, id: "b2", dof: 4, children: <Particles t={t} seed={8} n={20} color="#ffe08a" x0={-100} x1={1200} y0={0} y1={2000} speed={30} size={4} /> })}
    </>
  );
};

/** S2 — दोनों एक नहीं थे: split frame, Ravana (red) vs Hiranyakashipu (gold); a gold crack on "नहीं" (2.58) */
const S2: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, z: tw(u, [0, dur], [1.08, 1.0], E) }), s);
  const crack = tw(s, [1.9, 2.6], [0, 1], E);
  const apart = tw(s, [2.5, 3.3], [0, 1], OUTE);
  const sh = shake(s, 2.58, 10);
  return (
    <>
      {L({
        d: 0.3, id: "c0", children: (
          <g transform={`translate(${sh} 0)`}>
            <rect x={-1500} y={-1500} width={2040 - apart * 40} height={5000} fill="#3a0c14" />
            <rect x={540 + apart * 40} y={-1500} width={2040} height={5000} fill="#4a3210" />
            <circle cx={240} cy={700} r={420} fill="#ff4a2a" opacity={0.14} />
            <circle cx={840} cy={700} r={420} fill="#ffd27a" opacity={0.16} />
          </g>
        ),
      })}
      {L({
        d: 1, id: "c1", children: (
          <g transform={`translate(${sh} 0)`}>
            <RealDefs />
            <g transform={`translate(${-apart * 60} 0)`}>
              <At x={270} y={1950} s={1.2}><Ravana10 t={t} spread={52} rHand={[-150, -420]} rPose={HP.hang} lHand={[120, -560]} lPose={HP.relax} lWrist={-40} e={{ anger: 0.5, lookX: 0.8 }} /></At>
            </g>
            <g transform={`translate(${apart * 60} 0)`}>
              <At x={810} y={1950} s={1.2}><Hero look={LOOK.hiranya} o={OUT.hiranya} t={t} seed={2} rHand={[-120, -560]} rPose={HP.relax} rWrist={40} lHand={[150, -420]} lPose={HP.hang} e={{ anger: 0.4, lookX: -0.8 }} /></At>
            </g>
          </g>
        ),
      })}
      {L({
        d: 1.1, id: "c2", children: crack > 0 ? (
          <g>
            <path d="M540 -200 L520 300 L566 520 L512 800 L560 1080 L518 1380 L556 1660 L536 2200" stroke="#ffe7a0" strokeWidth={10 + 20 * pulse(s, 2.5, 0.6)} fill="none" pathLength={1} strokeDasharray={`${crack} 1`} strokeLinejoin="bevel" />
            <path d="M540 -200 L520 300 L566 520 L512 800 L560 1080 L518 1380 L556 1660 L536 2200" stroke="#fff" strokeWidth={3} fill="none" pathLength={1} strokeDasharray={`${crack} 1`} />
            <rect x={-200} y={-200} width={1500} height={2400} fill="#fff4d0" opacity={0.35 * pulse(s, 2.55, 0.35)} />
          </g>
        ) : <g />,
      })}
    </>
  );
};

/** S3 — शास्त्रों में असुर और राक्षस, दो बिल्कुल अलग पहचान: palm-leaf scripture by a lamp; two medallions rise and part */
const S3: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, z: tw(u, [0, dur], [1, 1.1], E), y: tw(u, [0, dur], [0, -40]) }), s);
  const open = tw(s, [0, 0.8], [0, 1], OUTE);
  const a = tw(s, [0.8, 1.4], [0, 1], OUTE);
  const r = tw(s, [1.6, 2.2], [0, 1], OUTE);
  const part = tw(s, [2.9, 3.8], [0, 1], E);
  return (
    <>
      {L({ d: 0.3, id: "d0", children: <g><rect x={-1500} y={-1500} width={4200} height={5000} fill="#1a0e08" /><circle cx={540} cy={1300} r={700} fill="#ffb84a" opacity={0.1} /></g> })}
      {L({
        d: 1, id: "d1", children: (
          <g>
            <RealDefs />
            <path d="M-200 1350 L1280 1350 L1400 2300 L-320 2300Z" fill="#3a1e0e" />
            <path d="M-200 1350 L1280 1350 L1290 1370 L-210 1370Z" fill="#6a3a1a" />
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={i} transform={`translate(540 ${1560 - i * 10}) rotate(${(i - 2) * 9 * open})`}><Leaf seed={i * 11} w={600} /></g>
            ))}
            <Diya t={t} x={930} y={1500} s={1.3} />
            <Medal id="m3a" x={540 - 70 * part - 215 * a} y={900 - 380 * a} r={190} k={a} rim="#ffd27a" glow={pulse(s, 0.88, 0.8)}>
              <At x={0} y={1150} s={1.3}><Hero look={LOOK.hiranya} o={OUT.hiranya} t={t} seed={2} rHand={[-150, -420]} lHand={[150, -420]} e={{ anger: 0.2 }} /></At>
            </Medal>
            <Medal id="m3b" x={540 + 70 * part + 215 * r} y={900 - 380 * r} r={190} k={r} rim="#ff4a3a" glow={pulse(s, 1.68, 0.8)}>
              <At x={0} y={1150} s={1.3}><Ravana10 t={t} spread={46} rHand={[-150, -420]} lHand={[150, -420]} e={{ anger: 0.4 }} /></At>
            </Medal>
          </g>
        ),
      })}
      {L({ d: 1.4, id: "d2", dof: 4, children: <Particles t={t} seed={13} n={18} color="#ffcf6a" x0={0} x1={1080} y0={400} y1={1900} speed={30} size={4} /> })}
    </>
  );
};

/** S4–S6: one lineage board (Hiranyakashipu's family at x 0..1080, Ravana's at 1080..2160); the camera pans across */
const Lineage: React.FC<{ t: number; s4: number; s5: number; s6: number }> = ({ t, s4, s5, s6 }) => {
  // s4 = shot-4 time (−1 before), s5/s6 likewise; values persist across the three shots
  const kash = tw(s4, [0.5, 1.1], [0, 1], OUTE);
  const diti = tw(s4, [2.2, 2.8], [0, 1], OUTE);
  const thA = tw(s4, [2.6, 3.4], [0, 1], E);
  const hir = tw(s4, [2.9, 3.5], [0, 1], OUTE);
  const daitya = pulse(s4, 3.9, 1.2) + pulse(s4, 5.1, 0.7);
  const rav = tw(s5, [0.1, 0.6], [0, 1], OUTE);
  const vish = tw(s6, [0.1, 0.7], [0, 1], OUTE);
  const kai = tw(s6, [2.2, 2.8], [0, 1], OUTE);
  const thB = tw(s6, [0.6, 1.4], [0, 1], E);
  const thR = tw(s6, [2.5, 3.3], [0, 1], E);
  const red = tw(s6, [2.9, 3.6], [0, 1], E);
  return (
    <g>
      <RealDefs />
      <Thread a={[290, 640]} b={[540, 1160]} k={thA} c="#ffd27a" bend={-80} />
      <Thread a={[790, 640]} b={[540, 1160]} k={thA} c="#ffd27a" bend={80} />
      <Medal id="mk" x={290} y={520} r={170} k={kash} rim="#ffd27a">
        <At x={0} y={1110} s={1.3}><Hero look={LOOK.rishi} o={{ ...OUT.rishi, lower: "long", robe: undefined, dhoti: "#d8742a" }} t={t} seed={5} rHand={[-150, -420]} lHand={[150, -420]} e={{ smile: 0.3 }} /></At>
      </Medal>
      <Medal id="md" x={790} y={520} r={170} k={diti} rim="#ffd27a">
        <At x={0} y={1110} s={1.3}><FemBust look={LOOK.diti} t={t} saree="#5a2a7a" border="#d9a336" e={{ smile: 0.2, lookX: -0.4 }} /></At>
      </Medal>
      <Medal id="mh" x={540} y={1300} r={230 + 30 * daitya} k={hir} rim={daitya > 0 ? "#c890ff" : "#ffd27a"} glow={daitya}>
        <At x={0} y={1360} s={1.55}><Hero look={LOOK.hiranya} o={OUT.hiranya} t={t} seed={2} rHand={[-150, -420]} lHand={[150, -420]} e={{ anger: 0.3 + 0.3 * daitya }} /></At>
      </Medal>
      {/* Ravana's side */}
      <Thread a={[1080 + 290, 640]} b={[1080 + 540, 1160]} k={thB} c="#ffd27a" bend={-80} />
      <Thread a={[1080 + 790, 640]} b={[1080 + 540, 1160]} k={thR} c="#ff3a2a" bend={80} />
      <Medal id="mv" x={1080 + 290} y={520} r={170} k={vish} rim="#ffd27a">
        <At x={0} y={1110} s={1.3}><Hero look={LOOK.rishi2} o={{ ...OUT.rishiW, lower: "long", robe: undefined }} t={t} seed={6} rHand={[-150, -420]} lHand={[150, -420]} e={{}} /></At>
      </Medal>
      <Medal id="mkk" x={1080 + 790} y={520} r={170} k={kai} rim="#ff3a2a" glow={red * 0.6} bg="#2a0a0e">
        <At x={0} y={1110} s={1.3}><FemBust look={LOOK.kaikesi} t={t} saree="#6a0e1a" border="#d9a336" veil e={{ lookX: -0.5 }} /></At>
      </Medal>
      <Medal id="mr" x={1080 + 540} y={1300} r={230} k={rav} rim={red > 0.5 ? "#ff3a2a" : "#ffd27a"} glow={red} bg={red > 0.5 ? "#2a0a0e" : "#20141e"}>
        <At x={0} y={1360} s={1.55}><Ravana10 t={t} spread={48} rHand={[-150, -420]} lHand={[150, -420]} e={{ anger: 0.3 + 0.3 * red, lookX: tw(s5, [0.2, 0.7], [-1, 0]) }} /></At>
      </Medal>
    </g>
  );
};

const BoardBG: React.FC<{ t: number; red: number }> = ({ t, red }) => (
  <g>
    <rect x={-1500} y={-1500} width={5200} height={5000} fill="#120a1c" />
    <rect x={1080} y={-1500} width={3000} height={5000} fill="#2a0810" opacity={red} />
    <Stars seed={21} n={80} t={t} y1={2000} />
    {[540, 1620].map((cx, i) => (
      <g key={cx} opacity={0.18}>
        {[...Array(24)].map((_, j) => <line key={j} x1={cx} y1={900} x2={cx + Math.cos((j / 24) * Math.PI * 2) * 900} y2={900 + Math.sin((j / 24) * Math.PI * 2) * 900} stroke={i && red > 0.5 ? "#ff6a4a" : "#ffd27a"} strokeWidth={2} />)}
        <circle cx={cx} cy={900} r={600} fill="none" stroke={i && red > 0.5 ? "#ff6a4a" : "#ffd27a"} strokeWidth={3} />
      </g>
    ))}
  </g>
);

const S4: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, y: tw(u, [0, 1.2, 3, dur], [-300, -300, 120, 160], E), z: tw(u, [0, dur], [1.15, 1.0], E) }), s);
  return (
    <>
      {L({ d: 0.3, id: "e0", children: <BoardBG t={t} red={0} /> })}
      {L({ d: 1, id: "e1", children: <Lineage t={t} s4={s} s5={-1} s6={-1} /> })}
      {L({ d: 1.4, id: "e2", dof: 4, children: <Particles t={t} seed={23} n={18} color="#ffe08a" x0={0} x1={1080} y0={0} y1={1900} speed={30} size={4} /> })}
    </>
  );
};
const S5: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, x: tw(u, [0, dur], [0, 1080], E), y: tw(u, [0, dur], [160, 260], E), z: 1.0 }), s);
  return (
    <>
      {L({ d: 0.3, id: "e0", children: <BoardBG t={t} red={0} /> })}
      {L({ d: 1, id: "e1", children: <Lineage t={t} s4={99} s5={s} s6={-1} /> })}
    </>
  );
};
const S6: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, x: 1080, y: tw(u, [0, 0.4, 2.8, dur], [260, -280, -280, 140], E), z: tw(u, [0, dur], [1.12, 1.04]) }), s);
  const red = tw(s, [2.9, 3.6], [0, 1], E);
  return (
    <>
      {L({ d: 0.3, id: "e0", children: <BoardBG t={t} red={red} /> })}
      {L({ d: 1, id: "e1", children: <Lineage t={t} s4={99} s5={99} s6={s} /> })}
      {L({ d: 1.4, id: "e2", dof: 4, children: <Particles t={t} seed={29} n={18} color={red > 0.5 ? "#ff5a3a" : "#ffe08a"} x0={1080} x1={2160} y0={0} y1={1900} speed={30} size={4} /> })}
    </>
  );
};

/** S7 — the asura host against the devas before Amaravati; clash on "युद्ध" (7.79) */
const S7: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, x: tw(u, [0, 2.6, 4.6, dur], [-260, -200, 260, 0], E), y: tw(u, [0, 4.8, 6.2, dur], [80, 80, -420, 40], E), z: tw(u, [0, 6.6, dur], [1.12, 1.0, 0.92], E), r: shake(u, 7.79, 1.2, 0.8) }), s);
  const chargeA = tw(s, [5.6, dur], [0, 1], E);
  const raise = tw(s, [0.2, 1.2], [0, 1], E);
  const bolt = (k: number) => Math.max(0, 1 - Math.abs(s - k) / 0.12);
  const flash = bolt(5.4) * 0.5 + bolt(7.79) * 0.8;
  return (
    <>
      {L({ d: 0.04, id: "f0", children: <Sky stops={[[-900, "#120c2a"], [400, "#2a1e4a"], [1000, "#6a4a6a"], [1500, "#c88a6a"]]} flash={flash * 0.4} /> })}
      {L({ d: 0.25, id: "f1", dof: 1.5, children: <g transform="translate(540 700) scale(0.7)"><Amaravati t={t} w={1700} /></g> })}
      {L({ d: 0.4, id: "f2", children: <g>{bolt(5.4) > 0 && <Bolt x={300} y={-200} len={900} seed={3} k={1} w={10} />}{bolt(7.79) > 0 && <Bolt x={700} y={-200} len={1000} seed={7} k={1} w={12} />}</g> })}
      {L({
        d: 0.7, id: "f3", children: (
          <g>
            <RealDefs />
            {[...Array(10)].map((_, i) => <Cloud key={i} x={-600 + i * 260} y={1480 + (i % 2) * 40} s={1.6} fill={i % 2 ? "#e8dcec" : "#d2c4dc"} />)}
            {[0, 1, 2, 3].map((i) => (
              <At key={`a${i}`} x={-260 + i * 120 + chargeA * 200} y={1500} s={0.42}><g opacity={0.85}><Hero look={ASURA} o={ASURA_O} t={t + i} seed={i} rHand={[-200, -760]} rPose={HP.grip} rProp={<Spear />} lHand={[160, -440]} e={{ anger: 0.8 }} /></g></At>
            ))}
            {[0, 1, 2, 3].map((i) => (
              <At key={`d${i}`} x={880 + i * 120 - chargeA * 200} y={1500} s={0.42} flip><g opacity={0.85}><Hero look={DEVA} o={DEVA_O} t={t + i} seed={i + 4} rHand={[-200, -760]} rPose={HP.grip} rProp={<Spear c="#ffe08a" />} lHand={[160, -440]} e={{ anger: 0.4 }} /></g></At>
            ))}
          </g>
        ),
      })}
      {L({
        d: 1, id: "f4", children: (
          <g>
            <RealDefs />
            {[...Array(8)].map((_, i) => <Cloud key={i} x={-900 + i * 420} y={1800 + (i % 2) * 50} s={2.4} fill={i % 2 ? "#f2eaf4" : "#ddd0e4"} />)}
            <At x={60 + chargeA * 220} y={1820} s={0.95}>
              <Hero look={LOOK.hiranya} o={OUT.hiranya} t={t} seed={2} rHand={[-230, -620 - 360 * raise]} rPose={HP.grip} rProp={<g transform={`rotate(${-40 + 60 * raise})`}><Gada /></g>} lHand={[200, -560]} lPose={HP.claw} e={{ anger: 0.9, open: pulse(s, 7.7, 0.9) * 0.8, lookX: 0.8 }} />
            </At>
            <At x={1020 - chargeA * 220} y={1820} s={0.95} flip>
              <Hero look={INDRA} o={INDRA_O} t={t} seed={9} rHand={[-220, -900]} rPose={HP.grip} rProp={<g transform="rotate(30)"><Vajra glow={0.6 + bolt(7.79)} /></g>} lHand={[180, -520]} lPose={HP.open} lWrist={-70} e={{ anger: 0.6, lookX: 0.8 }} />
            </At>
          </g>
        ),
      })}
      {L({ d: 1.4, id: "f5", dof: 4, children: <Particles t={t} seed={31} n={24} color="#ffe6c8" x0={-200} x1={1300} y0={0} y1={1900} speed={60} size={5} /> })}
      {flash > 0 && L({ d: 1, id: "f6", children: <rect x={-1500} y={-1500} width={4200} height={5000} fill="#f4f0ff" opacity={flash * 0.6} /> })}
    </>
  );
};

/** S8 — लेकिन यहाँ एक दिलचस्प बात है: one lamp, a tied bundle of palm leaves (the Rig Veda) */
const S8: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, z: tw(u, [0, dur], [1.0, 1.18], E) }), s);
  const g = tw(s, [1.0, 1.6], [0, 1], E);
  return (
    <>
      {L({ d: 0.2, id: "g0", children: <g><rect x={-1500} y={-1500} width={4200} height={5000} fill="#0c0806" /><circle cx={540} cy={1100} r={600} fill="#ff9a3a" opacity={0.08} /></g> })}
      {L({
        d: 1, id: "g1", children: (
          <g>
            <RealDefs />
            <path d="M-300 1260 L1380 1260 L1500 2400 L-420 2400Z" fill="#2a160a" />
            {[0, 1, 2, 3, 4, 5].map((i) => <g key={i} transform={`translate(540 ${1180 - i * 14})`}><Leaf seed={i * 7} w={640} glow={i === 5 ? g : 0} /></g>)}
            <path d="M380 1090 L380 1200 M700 1090 L700 1200" stroke="#c8302a" strokeWidth={8} />
            <path d="M380 1090 L380 1200 M700 1090 L700 1200" stroke="#ffd27a" strokeWidth={8} opacity={g * 0.8} />
            <path d="M380 1200 Q360 1250 330 1270 M700 1200 Q730 1250 760 1262" stroke="#c8302a" strokeWidth={6} fill="none" />
            <Diya t={t} x={890} y={1330} s={1.4} />
          </g>
        ),
      })}
      {L({ d: 1.4, id: "g2", dof: 4, children: <Particles t={t} seed={41} n={12} color="#ffcf6a" x0={200} x1={900} y0={400} y1={1500} speed={20} size={3} /> })}
    </>
  );
};

/** S9 — सबसे पुराने ऋग्वेद में 'असुर' कोई बुरा शब्द था ही नहीं: a rishi reads a leaf; it glows on 'असुर' (2.11); he shakes his head (3.4–4.2) */
const S9: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, y: tw(u, [0, dur], [-40, 40]), z: tw(u, [0, dur], [1.12, 1.2]) }), s);
  const glow = tw(s, [2.0, 2.5], [0, 1], E);
  const nod = Math.sin(Math.max(0, s - 3.4) * 9) * 7 * (s > 3.4 && s < 4.4 ? 1 : 0);
  return (
    <>
      {L({ d: 0.2, id: "h0", children: <g><rect x={-1500} y={-1500} width={4200} height={5000} fill="#140c08" /><circle cx={300} cy={900} r={700} fill="#ff9a3a" opacity={0.1} /></g> })}
      {L({
        d: 1, id: "h1", children: (
          <g>
            <RealDefs />
            <Diya t={t} x={150} y={1500} s={1.4} />
            <At x={600} y={1820} s={1.9}>
              <Hero look={LOOK.rishi} o={OUT.rishi} t={t} seed={5} rHand={[-120, -600]} rPose={HP.hold} rWrist={-80} lHand={[120, -600]} lPose={HP.hold} lWrist={80} headTilt={nod - 6} e={{ smile: tw(s, [3.2, 3.8], [0, 0.6]), lookY: 1, lookX: -0.2 }} />
              <g transform="translate(0 -300)"><Leaf seed={77} w={330} glow={glow} /></g>
            </At>
          </g>
        ),
      })}
      {L({ d: 1.4, id: "h2", dof: 4, children: <Particles t={t} seed={43} n={14} color="#ffcf6a" x0={0} x1={1080} y0={300} y1={1800} speed={20} size={3} /> })}
    </>
  );
};

/** S10 — Mitra and Varuna; gold halos on 'देव' (2.48), deep-blue aura on 'असुर' (4.74) — both at once */
const MitraVaruna: React.FC<{ t: number; halo: number; aura: number; m: number; v: number; bless?: number; scale?: number }> = ({ t, halo, aura, m, v, bless = 0, scale = 1.1 }) => (
  <g>
    <RealDefs />
    {[[300, m, "mitra"], [790, v, "varuna"]].map(([x, k, who]) => (
      <g key={who as string} opacity={Math.min(1, (k as number) * 1.4)}>
        <g transform={`translate(${x} ${1860 - 850 * scale - 20})`}>
          {aura > 0 && [0, 1, 2].map((i) => <ellipse key={i} cx={0} cy={300} rx={(260 + i * 70) * scale * (0.9 + 0.1 * Math.sin(t * 2 + i))} ry={(560 + i * 80) * scale} fill="none" stroke="#3a4aff" strokeWidth={10 - i * 2} opacity={aura * (0.5 - i * 0.12)} />)}
          {aura > 0 && <ellipse cx={0} cy={300} rx={300 * scale} ry={620 * scale} fill="#2a2a9a" opacity={0.22 * aura} />}
          {halo > 0 && (
            <g>
              <circle cx={0} cy={0} r={130 * scale * (0.6 + 0.4 * halo)} fill="#ffe7a0" opacity={0.28 * halo} />
              <circle cx={0} cy={0} r={115 * scale * (0.6 + 0.4 * halo)} fill="none" stroke="#ffd27a" strokeWidth={6} opacity={halo} />
              {[...Array(16)].map((_, i) => <line key={i} x1={Math.cos((i / 16) * Math.PI * 2) * 120 * scale} y1={Math.sin((i / 16) * Math.PI * 2) * 120 * scale} x2={Math.cos((i / 16) * Math.PI * 2) * 150 * scale} y2={Math.sin((i / 16) * Math.PI * 2) * 150 * scale} stroke="#ffd27a" strokeWidth={4} opacity={halo * 0.8} />)}
            </g>
          )}
        </g>
        <At x={x as number} y={1860} s={scale}>
          {who === "mitra" ? (
            <Hero look={LOOK.mitra} o={OUT.mitra} t={t} seed={7} rHand={[-120 - 40 * bless, -620 - 120 * bless]} rPose={HP.bless} rWrist={-90} lHand={[150, -470]} lPose={HP.grip} lProp={<Lotus glow={halo} />} e={{ smile: 0.45 }} glow={0.6} />
          ) : (
            <Hero look={LOOK.varuna} o={OUT.varuna} t={t} seed={8} rHand={[-210, -520]} rPose={HP.grip} rProp={<g transform="rotate(-20)"><Pasha t={t} glow={aura} /></g>} lHand={[120 + 40 * bless, -620 - 120 * bless]} lPose={HP.bless} lWrist={90} e={{ smile: 0.25 }} glow={0.5} aura="#6ab8ff" />
          )}
        </At>
      </g>
    ))}
  </g>
);

const DawnSea: React.FC<{ t: number; sun: number }> = ({ t, sun }) => (
  <g>
    <Sky stops={[[-900, "#1a2a5a"], [500, "#4a5a9a"], [1100, "#d89a7a"], [1450, "#ffcf8a"]]} />
    <circle cx={300} cy={1520 - 260 * sun} r={150} fill="#fff0c0" />
    <circle cx={300} cy={1520 - 260 * sun} r={300} fill="#ffd27a" opacity={0.3} />
    <rect x={-1500} y={1500} width={4200} height={3000} fill="#1e3a6a" />
    {[...Array(14)].map((_, i) => <path key={i} d={`M${-200 + ((i * 97) % 1400)} ${1540 + i * 26} q30 -8 60 0`} stroke="#ffe0b0" strokeWidth={3} opacity={0.5} fill="none" transform={`translate(${Math.sin(t + i) * 10} 0)`} />)}
    <rect x={-1500} y={1500} width={4200} height={3000} fill="url(#rl-drape)" opacity={0.5} />
  </g>
);

const S10: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, z: tw(u, [0, dur], [1.0, 1.08], E), y: tw(u, [0, dur], [40, -20]) }), s);
  const m = tw(s, [0.3, 0.9], [0, 1], OUTE);
  const v = tw(s, [1.1, 1.7], [0, 1], OUTE);
  const halo = tw(s, [2.4, 3.0], [0, 1], OUTE);
  const aura = tw(s, [4.6, 5.3], [0, 1], OUTE);
  return (
    <>
      {L({ d: 0.1, id: "i0", children: <DawnSea t={t} sun={0.5} /> })}
      {L({ d: 1, id: "i1", children: <MitraVaruna t={t} halo={halo} aura={aura} m={m} v={v} /> })}
      {L({ d: 1.4, id: "i2", dof: 4, children: <Particles t={t} seed={47} n={20} color={aura > 0.5 ? "#8a9aff" : "#ffe08a"} x0={0} x1={1080} y0={0} y1={1900} speed={30} size={4} /> })}
    </>
  );
};

const ChantRishis: React.FC<{ t: number; fire?: number; chant?: boolean; lean?: number[]; fear?: number }> = ({ t, fire = 1, chant = true, lean = [0, 0, 0], fear = 0 }) => {
  const mo = (k: number) => (chant ? Math.max(0, Math.sin(t * 8 + k)) * 0.35 : 0);
  return (
    <g>
      <RealDefs />
      <At x={540} y={1280} s={0.62}><Hero look={LOOK.rishi2} o={OUT.rishiW} t={t} seed={4} rHand={[-60, -560]} rPose={HP.gyan} rWrist={-90} lHand={[60, -560]} lPose={HP.gyan} lWrist={90} lean={lean[1]} e={{ open: mo(1), blink: chant ? 0.15 : 1, fear }} /></At>
      <Kund t={t} x={540} y={1560} s={1.1} fire={fire} />
      <At x={150} y={1820} s={0.95}><Hero look={LOOK.rishi} o={OUT.rishi} t={t} seed={5} rHand={[-40 - 160 * fear, -560 - 260 * fear]} rPose={fear > 0.5 ? HP.open : HP.grip} rWrist={fear > 0.5 ? -80 : 0} rProp={fear > 0.5 ? undefined : <Sruva />} lHand={[120 + 60 * fear, -470 - 300 * fear]} lPose={fear > 0.5 ? HP.open : HP.gyan} lWrist={-80} lean={lean[0]} e={{ open: mo(2), lookX: 0.8, fear }} /></At>
      <At x={930} y={1820} s={0.95} flip><Hero look={LOOK.rishi2} o={OUT.rishi} t={t} seed={6} rHand={[-40 - 160 * fear, -560 - 260 * fear]} rPose={fear > 0.5 ? HP.open : HP.grip} rWrist={fear > 0.5 ? -80 : 0} rProp={fear > 0.5 ? undefined : <Sruva />} lHand={[120 + 60 * fear, -470 - 300 * fear]} lPose={fear > 0.5 ? HP.open : HP.gyan} lWrist={-80} lean={lean[2]} e={{ open: mo(3), lookX: 0.8, fear }} /></At>
    </g>
  );
};

/** S11 — verse line 1: rishis chant at a dawn fire; rings of light rise toward Mitra and Varuna in the sky */
const S11: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, y: tw(u, [0, dur], [200, -100], E), z: tw(u, [0, dur], [1.06, 1.0]) }), s);
  return (
    <>
      {L({ d: 0.1, id: "j0", children: <DawnSea t={t} sun={0.2} /> })}
      {L({ d: 0.35, id: "j1", children: <g opacity={0.5}><MitraVaruna t={t} halo={1} aura={1} m={1} v={1} scale={0.7} /></g> })}
      {L({ d: 0.6, id: "j2", children: <g>{[0, 1, 2, 3].map((i) => { const k = ((s * 0.6 + i * 0.25) % 1); return <ellipse key={i} cx={540} cy={1400 - k * 900} rx={120 + k * 400} ry={30 + k * 90} fill="none" stroke="#ffe7a0" strokeWidth={5} opacity={(1 - k) * 0.7} />; })}</g> })}
      {L({ d: 1, id: "j3", children: <g><rect x={-1500} y={1720} width={4200} height={2000} fill="#4a3a2a" /><ChantRishis t={t} /></g> })}
    </>
  );
};

/** S12 — verse line 2: pull back; the sun rises over the sea and the two bless */
const S12: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, y: tw(u, [0, dur], [-60, 40], E), z: tw(u, [0, dur], [1.12, 1.0], E) }), s);
  const bless = tw(s, [0.4, 1.2], [0, 1], E);
  return (
    <>
      {L({ d: 0.1, id: "k0", children: <DawnSea t={t} sun={0.4 + 0.6 * tw(s, [0, dur], [0, 1])} /> })}
      {L({ d: 1, id: "k1", children: <MitraVaruna t={t} halo={1} aura={1} m={1} v={1} bless={bless} /> })}
      {L({ d: 1.4, id: "k2", dof: 4, children: <Particles t={t} seed={53} n={22} color="#ffe08a" x0={0} x1={1080} y0={0} y1={1900} speed={30} size={4} /> })}
    </>
  );
};

/** S13 — राक्षसों का वर्णन बिल्कुल अलग: night forest, red eyes open; a rakshasa face on 'अलग' (2.99) */
const NightForest: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <Sky stops={[[-900, "#04040a"], [600, "#0a0c18"], [1300, "#141a24"]]} />
    <Stars seed={61} n={50} t={t} y1={700} />
    <Moon x={260} y={300} r={50} c="#dfe6ff" />
  </g>
);

const S13: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, z: tw(u, [0, dur], [1.0, 1.22], E) }), s);
  const face = tw(s, [2.9, 3.6], [0, 1], E);
  return (
    <>
      {L({ d: 0.05, id: "l0", children: <NightForest t={t} /> })}
      {L({ d: 0.4, id: "l1", dof: 1, children: <g>{[...Array(7)].map((_, i) => <Tree key={i} x={-200 + i * 230} y={1500} s={1.2} c="#0c1018" seed={i * 5} />)}</g> })}
      {L({
        d: 0.8, id: "l2", children: (
          <g>
            {[...Array(9)].map((_, i) => {
              const k = tw(s, [0.2 + i * 0.25, 0.4 + i * 0.25], [0, 1]);
              const x = 120 + ((i * 263) % 860);
              const y = 700 + ((i * 181) % 700);
              const bl = Math.sin(t * 1.3 + i * 2) > 0.97 ? 0.1 : 1;
              return (
                <g key={i} opacity={k * (1 - face * 0.6)}>
                  {[-14, 14].map((dx) => <ellipse key={dx} cx={x + dx} cy={y} rx={8} ry={4 * bl} fill="#ff3a1a" />)}
                  <ellipse cx={x} cy={y} rx={40} ry={20} fill="#ff2a0a" opacity={0.12} />
                </g>
              );
            })}
            <rect x={-1500} y={1500} width={4200} height={2000} fill="#06080e" />
          </g>
        ),
      })}
      {L({
        d: 1, id: "l3", children: face > 0 ? (
          <g opacity={face}>
            <RealDefs />
            <ellipse cx={540} cy={1060} rx={500} ry={540} fill="#000" opacity={0.6} />
            <At x={540} y={1060} s={3.6 - 0.2 * face}><RHead look={LOOK.rakshasa} t={t} e={{ anger: 1, open: 0.4 * face }} /></At>
            <rect x={-1500} y={-1500} width={4200} height={5000} fill="#0a1020" opacity={0.25} />
          </g>
        ) : <g />,
      })}
    </>
  );
};

/** S14 — the night yajna; a rakshasa looms from the dark (1.4) and stamps on 'भंग' (5.28); the fire gutters, rishis recoil */
const S14: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, x: tw(u, [0, dur], [-40, 120], E), z: tw(u, [0, dur], [1.04, 1.0]), r: shake(u, 5.28, 1.6, 0.8) }), s);
  const loom = tw(s, [1.2, 3.0], [0, 1], E);
  const hit = tw(s, [5.0, 5.4], [0, 1], E);
  const fire = 1 - 0.75 * tw(s, [5.25, 5.7], [0, 1], E);
  const fear = tw(s, [5.2, 5.6], [0, 1], E);
  return (
    <>
      {L({ d: 0.05, id: "m0", children: <NightForest t={t} /> })}
      {L({ d: 0.4, id: "m1", dof: 1, children: <g>{[...Array(7)].map((_, i) => <Tree key={i} x={-200 + i * 240} y={1380} s={1.0} c="#0e1420" seed={i * 7} />)}</g> })}
      {L({
        d: 0.75, id: "m2", children: (
          <g>
            <RealDefs />
            <At x={1060 - 240 * loom} y={1700} s={1.15}>
              <g opacity={0.25 + 0.75 * loom}>
                <Hero look={LOOK.rakshasa} o={OUT.rakshasa} t={t} seed={3} bulk={1.18} rHand={[-260 - 60 * hit, -760 - 240 * hit]} rPose={HP.claw} rWrist={-30} lHand={[230, -600 - 200 * hit]} lPose={HP.claw} lWrist={30} e={{ anger: 1, open: 0.3 + 0.5 * hit }} lean={-6 * hit} />
              </g>
            </At>
            <rect x={-1500} y={-1500} width={4200} height={5000} fill="#0a1020" opacity={0.25 * (1 - fire)} />
          </g>
        ),
      })}
      {L({ d: 1, id: "m3", children: <g><rect x={-1500} y={1720} width={4200} height={2000} fill="#1a1410" /><ChantRishis t={t} fire={fire} chant={s < 5.2} fear={fear} lean={[-10 * fear, -6 * fear, 10 * fear]} /></g> })}
      {L({ d: 1.3, id: "m4", dof: 4, children: <Particles t={t} seed={67} n={30} color={hit > 0.5 ? "#a89a8a" : "#ff9a4a"} x0={-100} x1={1200} y0={800} y1={2000} speed={hit > 0.5 ? 200 : 40} size={5} up={hit < 0.5} /> })}
    </>
  );
};

/** S15 — इसीलिए अग्नि देव को 'रक्षोहा': Agni rises (0.68), pushes his palms (1.6) and a flame wall drives the rakshasa off (3.2–4.6) */
const S15: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, y: tw(u, [0, dur], [80, -40], E), z: tw(u, [0, 1.4, dur], [1.0, 1.08, 1.0], E), r: shake(u, 1.6, 1.2) }), s);
  const rise = tw(s, [0.5, 1.5], [0, 1], OUTE);
  const push = tw(s, [1.5, 2.1], [0, 1], E);
  const wave = tw(s, [1.7, 3.6], [0, 1], E);
  const gone = tw(s, [3.2, 4.6], [0, 1], E);
  return (
    <>
      {L({ d: 0.05, id: "n0", children: <g><NightForest t={t} /><rect x={-1500} y={-1500} width={4200} height={5000} fill="#ff6a1a" opacity={0.2 * rise} /></g> })}
      {L({ d: 0.4, id: "n1", dof: 1, children: <g>{[...Array(7)].map((_, i) => <Tree key={i} x={-200 + i * 240} y={1380} s={1.0} c="#1a1210" seed={i * 7} />)}</g> })}
      {L({
        d: 0.8, id: "n2", children: (
          <g>
            <RealDefs />
            <At x={900 + 500 * gone} y={1700} s={1.0}>
              <g opacity={1 - gone}><Hero look={LOOK.rakshasa} o={OUT.rakshasa} t={t} seed={3} bulk={1.18} rHand={[-230, -900]} rPose={HP.open} rWrist={-60} lHand={[160, -900]} lPose={HP.open} lWrist={60} lean={14 * wave} e={{ fear: 1, open: 0.5 }} /></g>
            </At>
          </g>
        ),
      })}
      {L({
        d: 1, id: "n3", children: (
          <g>
            <RealDefs />
            <rect x={-1500} y={1720} width={4200} height={2000} fill="#2a1a10" />
            <ellipse cx={420} cy={1100} rx={460 + 160 * rise} ry={760} fill="#ff8a2a" opacity={0.2 * rise} />
            <Kund t={t} x={420} y={1880} s={0.9} fire={0.8 + 0.6 * (1 - rise)} />
            <At x={420} y={1640 + (1 - rise) * 1000} s={1.0}>
              <Hero look={LOOK.agni} o={OUT.agni} t={t} seed={12} glow={1.4 * rise} aura="#ff7a2a" rHand={[-250, -880]} rPose={HP.open} rWrist={-80} lHand={[250 + 90 * push, -860 + 120 * push]} lPose={HP.open} lWrist={80 - 60 * push} e={{ anger: 0.5 * push, open: 0.3 * push }} />
            </At>
            {wave > 0 && wave < 1 && (
              <g opacity={(1 - wave) * 0.9}>
                {[...Array(4)].map((_, i) => <g key={i} transform={`translate(${640 + wave * 620} ${900 + i * 170}) scale(${0.7 + 0.6 * wave})`}><Fire t={t + i} x={0} y={0} s={1} /></g>)}
                <ellipse cx={640 + wave * 620} cy={1150} rx={160} ry={420} fill="#ffb04a" opacity={0.25} />
              </g>
            )}
          </g>
        ),
      })}
      {L({ d: 1.4, id: "n4", dof: 4, children: <Particles t={t} seed={71} n={30} color="#ffb04a" x0={0} x1={1200} y0={200} y1={2000} speed={90} size={5} /> })}
    </>
  );
};

/** S16 — रावण जैसे राक्षस... अपनी माया: Ravana in golden Lanka smiles; illusion copies shimmer out on 'माया' (3.24) */
const S16: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, z: tw(u, [0, dur], [1.0, 1.1], E), y: tw(u, [0, dur], [40, 0]) }), s);
  const maya = tw(s, [2.9, dur], [0, 1], E);
  const body = (op: number, dx: number, key: string) => (
    <g key={key} opacity={op} transform={`translate(${dx} 0)`}>
      <At x={540} y={2120} s={1.45}><Ravana10 t={t} rHand={[-176, -450]} rPose={HP.hang} lHand={[110, -520]} lPose={HP.relax} lWrist={-150} lBend={-1} e={{ smile: 0.6, lookX: Math.sin(t) * 0.2 }} /></At>
    </g>
  );
  return (
    <>
      {L({ d: 0.05, id: "o0", children: <LankaNight t={t} /> })}
      {L({ d: 0.3, id: "o1", dof: 1.2, children: <g transform="translate(540 1500)"><LankaCity w={2600} lit={1} c="#8a5a1a" c2="#5a3a10" /></g> })}
      {L({
        d: 1, id: "o2", children: (
          <g>
            <RealDefs />
            {maya > 0 && [-1, 1].map((k) => body(0.32 * maya, k * 260 * maya + Math.sin(t * 12 + k) * 6 * maya, `g${k}`))}
            {body(1 - 0.25 * maya * (0.5 + 0.5 * Math.sin(t * 20)), 0, "main")}
          </g>
        ),
      })}
      {L({ d: 1.4, id: "o3", dof: 4, children: <Particles t={t} seed={73} n={24} color={maya > 0.2 ? "#d8a0ff" : "#ff9a4a"} x0={-100} x1={1200} y0={200} y1={2000} speed={50} size={4} /> })}
    </>
  );
};

/** S17 — रूप बदलने की शक्ति: a rakshasa melts into the golden deer (0.2–1.6); भीषण युद्धों (2.0): Ravana roars, sword high */
const S17: React.FC<SP> = ({ t, s, dur }) => {
  const war = s >= 1.95;
  const L = rig((u) => (u < 1.95 ? { ...C0, z: tw(u, [0, 1.9], [1.0, 1.1]) } : { ...C0, z: tw(u, [1.95, dur], [1.18, 1.0], OUTE), r: shake(u, 2.0, 1.4, 1) }), s);
  const morph = tw(s, [0.3, 1.5], [0, 1], E);
  const roar = tw(s, [2.1, 2.6], [0, 1], OUTE);
  return war ? (
    <>
      {L({ d: 0.05, id: "q0", children: <LankaNight t={t} red={1} /> })}
      {L({ d: 0.4, id: "q1", children: <g>{[...Array(5)].map((_, i) => <Fire key={i} t={t + i} x={-100 + i * 320} y={1600} s={2.2} />)}</g> })}
      {L({
        d: 1, id: "q2", children: (
          <g>
            <RealDefs />
            <At x={540} y={2120} s={1.4}>
              <Ravana10 t={t} scatter={0.3} rHand={[-260, -1000]} rPose={HP.grip} rProp={<g transform="rotate(60)"><Sword /></g>} lHand={[240, -760]} lPose={HP.claw} lWrist={-40} e={{ anger: 1, open: 0.8 * roar }} />
            </At>
          </g>
        ),
      })}
      {L({ d: 1.4, id: "q3", dof: 4, children: <Particles t={t} seed={79} n={40} color="#ff7a3a" x0={-100} x1={1200} y0={0} y1={2000} speed={160} size={5} /> })}
    </>
  ) : (
    <>
      {L({ d: 0.05, id: "p0", children: <NightForest t={t} /> })}
      {L({ d: 0.4, id: "p1", dof: 1, children: <g>{[...Array(7)].map((_, i) => <Tree key={i} x={-200 + i * 240} y={1420} s={1.0} c="#16202a" seed={i * 9} />)}<rect x={-1500} y={1420} width={4200} height={2000} fill="#141e1a" /></g> })}
      {L({
        d: 1, id: "p2", children: (
          <g>
            <RealDefs />
            <ellipse cx={540} cy={1300} rx={420 * morph} ry={500 * morph} fill="#ffd86a" opacity={0.25 * Math.sin(morph * Math.PI)} />
            <g opacity={1 - morph} transform={`translate(540 1780) scale(${1 - 0.35 * morph} ${1 - 0.5 * morph})`}>
              <Hero look={MARICHA} o={OUT.rakshasa} t={t} seed={14} rHand={[-200, -500]} rPose={HP.claw} lHand={[200, -500]} lPose={HP.claw} e={{ smile: 0.6 }} />
            </g>
            <g opacity={morph} transform={`translate(560 1780) scale(${1.0 + 0.6 * morph})`}><Deer t={t} glow={morph} /></g>
            {[...Array(30)].map((_, i) => {
              const a = rnd(i) * Math.PI * 2;
              const r = 80 + morph * 360 * rnd(i * 3);
              return <circle key={i} cx={540 + Math.cos(a) * r} cy={1450 + Math.sin(a) * r * 1.3} r={3 + rnd(i * 5) * 4} fill="#fff0b0" opacity={Math.sin(morph * Math.PI)} />;
            })}
          </g>
        ),
      })}
    </>
  );
};

const SHOTS = [S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16, S17];

export const AsurRakshas: React.FC<{ manifest?: Manifest }> = ({ manifest }) => {
  const t = useCurrentFrame() / FPS;
  if (!manifest) return null;
  const B = manifest.scenes.map((x) => x.start).concat(manifest.duration);
  const i = Math.max(0, Math.min(SHOTS.length - 1, B.findIndex((b, k) => t >= b && t < B[k + 1])));
  const Shot = SHOTS[i];
  const cutFlash = i > 0 ? Math.max(0, 1 - (t - B[i]) / 0.1) * 0.18 : 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0710", overflow: "hidden" }}>
      <Audio src={staticFile("mg/example-asur-rakshas/mix.wav")} />
      <Audio src={staticFile("mg/example-asur-rakshas/sfx.wav")} volume={0.55} />
      <Shot t={t} s={t - B[i]} dur={B[i + 1] - B[i]} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 42%, transparent 55%, rgba(0,0,0,0.55) 100%)" }} />
      {cutFlash > 0 && <AbsoluteFill style={{ background: "#fff3dc", opacity: cutFlash, mixBlendMode: "screen" }} />}
    </AbsoluteFill>
  );
};

const calculateMetadata: CalculateMetadataFunction<{ manifest?: Manifest }> = async ({ props }) => {
  const manifest: Manifest = await (await fetch(staticFile("mg/example-asur-rakshas/manifest.json"))).json();
  return { durationInFrames: Math.ceil(manifest.duration * FPS), props: { ...props, manifest } };
};

export const AsurRakshasComposition = () => (
  <Composition id="REEL-example-asur-rakshas" component={AsurRakshas} calculateMetadata={calculateMetadata} defaultProps={{}} durationInFrames={75 * FPS} fps={FPS} width={W} height={H} />
);
