/**
 * Shared sets and props for the reels (taken from the example reels so new reels can reuse them):
 *  night sky (Stars, Moon, LankaNight), Palace, Tree, Kund (fire altar), Diya, palm-leaf Leaf, Spear, golden Deer,
 *  FemBust (a woman, bust only: place it so its bottom, local y -500, reaches the frame bottom),
 *  Medal (round gold portrait frame) + Thread (lineage line), Peaks (snowy range), Sea, Pushpaka (flying vimana, rider slot).
 */
import React from "react";
import { Fire, Pillar, Sky, rnd } from "./scene";
import { Gem, RHead, RL, type Look } from "./real";

const W = 1920; // scenery is drawn wider than the frame so camera moves never show an edge

export const Spear: React.FC<{ len?: number; c?: string }> = ({ len = 420, c = "#cfd6e2" }) => (
  <g>
    <rect x={-4} y={-len + 40} width={8} height={len} rx={3} fill="#5a3a1a" />
    <path d={`M0 ${-len - 30} L-12 ${-len + 30} L0 ${-len + 44} L12 ${-len + 30}Z`} fill={c} stroke="#5a6070" strokeWidth={1.2} />
    <rect x={-7} y={-len + 40} width={14} height={8} fill={RL.gold} />
  </g>
);

export const Stars: React.FC<{ seed: number; n: number; t: number; y1?: number }> = ({ seed, n, t, y1 = 1100 }) => (
  <g>
    {[...Array(n)].map((_, i) => (
      <circle key={i} cx={-300 + rnd(seed + i) * 1700} cy={-400 + rnd(seed + i * 7) * (y1 + 400)} r={0.8 + rnd(i * 3 + seed) * 1.8} fill="#fff6e0" opacity={0.35 + 0.5 * Math.abs(Math.sin(t * (0.6 + rnd(i)) + i))} />
    ))}
  </g>
);

export const Moon: React.FC<{ x: number; y: number; r: number; c?: string }> = ({ x, y, r, c = "#fff1d0" }) => (
  <g>
    <circle cx={x} cy={y} r={r * 3} fill={c} opacity={0.06} />
    <circle cx={x} cy={y} r={r * 1.7} fill={c} opacity={0.1} />
    <circle cx={x} cy={y} r={r} fill={c} />
    <circle cx={x - r * 0.3} cy={y - r * 0.2} r={r * 0.22} fill="#000" opacity={0.06} />
    <circle cx={x + r * 0.25} cy={y + r * 0.3} r={r * 0.14} fill="#000" opacity={0.06} />
  </g>
);

/** brick fire altar with flames */
export const Kund: React.FC<{ t: number; x: number; y: number; s?: number; fire?: number }> = ({ t, x, y, s = 1, fire = 1 }) => (
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

export const Tree: React.FC<{ x: number; y: number; s: number; c: string; seed: number }> = ({ x, y, s, c, seed }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-14 0 L-8 -260 L8 -260 L14 0Z" fill={c} />
    {[...Array(7)].map((_, i) => (
      <ellipse key={i} cx={(rnd(seed + i) - 0.5) * 260} cy={-300 - rnd(seed + i * 3) * 220} rx={110 + rnd(seed * 2 + i) * 60} ry={80 + rnd(seed + i * 5) * 40} fill={c} />
    ))}
  </g>
);

export const Palace: React.FC<{ t: number }> = ({ t }) => (
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

export const LankaNight: React.FC<{ t: number; red?: number }> = ({ t, red = 0 }) => (
  <g>
    <Sky stops={[[-900, "#08040e"], [500, "#1c0a1c"], [1150, "#46121e"], [1600, "#7a2a18"]]} />
    <Stars seed={4} n={60} t={t} y1={900} />
    <Moon x={820} y={330} r={70} c="#ffd9b0" />
    {red > 0 && <rect x={-1500} y={-2000} width={4200} height={6000} fill="#ff3a1a" opacity={0.14 * red} />}
  </g>
);

export const FemBust: React.FC<{ look: Look; t: number; saree: string; border: string; e?: { smile?: number; lookX?: number; anger?: number }; veil?: boolean }> = ({ look, t, saree, border, e, veil }) => (
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
export const Medal: React.FC<{ x: number; y: number; r: number; k: number; rim?: string; glow?: number; id: string; bg?: string; children: React.ReactNode }> = ({ x, y, r, k, rim = "#ffd27a", glow = 0, id, bg = "#20141e", children }) => {
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
export const Thread: React.FC<{ a: [number, number]; b: [number, number]; k: number; c: string; bend?: number }> = ({ a, b, k, c, bend = 0 }) => {
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

export const Leaf: React.FC<{ w?: number; glow?: number; seed: number }> = ({ w = 520, glow = 0, seed }) => (
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

export const Diya: React.FC<{ t: number; x: number; y: number; s?: number }> = ({ t, x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-40} r={190} fill="#ffb84a" opacity={0.1 + 0.03 * Math.sin(t * 9)} />
    <circle cx={0} cy={-40} r={80} fill="#ffcf6a" opacity={0.16} />
    <path d="M-48 0 Q-50 30 0 34 Q50 30 48 0 Q20 10 -48 0Z" fill="#a8582a" stroke="#5a2a10" strokeWidth={2} />
    <path d="M-48 0 Q0 -14 48 0 Q0 12 -48 0Z" fill="#6a3416" />
    <path d={`M-4 -4 Q${-14 + Math.sin(t * 11) * 3} -30 ${Math.sin(t * 7) * 5} -66 Q${12 + Math.sin(t * 9) * 3} -30 4 -4Z`} fill="#ffb02a" />
    <path d={`M-2 -6 Q${-6 + Math.sin(t * 11) * 2} -24 ${Math.sin(t * 7) * 3} -44 Q${6 + Math.sin(t * 9) * 2} -24 2 -6Z`} fill="#fff4c0" />
  </g>
);

export const Deer: React.FC<{ t: number; glow?: number; run?: number }> = ({ t, glow = 1, run = 0 }) => {
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


// ---------------------------------------------------------------- landscape

export const Peaks: React.FC<{ y: number; c: string; snow?: string; seed: number; h: number; p?: number }> = ({ y, c, snow = "#e8e4f4", seed, h, p = 420 }) => {
  const n = Math.ceil((W + 6000) / p);
  return (
    <g>
      {[...Array(n)].map((_, i) => {
        const x = -3000 + i * p + (rnd(seed + i) - 0.5) * p * 0.4;
        const hh = h * (0.55 + rnd(seed + i * 3) * 0.6);
        const w = p * (0.8 + rnd(seed + i * 7) * 0.5);
        return (
          <g key={i}>
            <path d={`M${x - w} ${y} L${x} ${y - hh} L${x + w} ${y}Z`} fill={c} />
            <path d={`M${x} ${y - hh} L${x + w} ${y} L${x + w * 0.3} ${y}Z`} fill="#000" opacity={0.12} />
            <path d={`M${x - w * 0.24} ${y - hh * 0.76} L${x} ${y - hh} L${x + w * 0.24} ${y - hh * 0.76} L${x + w * 0.1} ${y - hh * 0.7} L${x} ${y - hh * 0.8} L${x - w * 0.1} ${y - hh * 0.7}Z`} fill={snow} />
          </g>
        );
      })}
      <rect x={-3000} y={y} width={W + 6000} height={4000} fill={c} />
    </g>
  );
};

export const Sea: React.FC<{ t: number; y: number; c?: string; c2?: string; line?: string }> = ({ t, y, c = "#1a2a4a", c2 = "#0e1830", line = "#4a6a9a" }) => (
  <g>
    <rect x={-3000} y={y} width={W + 6000} height={4000} fill={c} />
    <rect x={-3000} y={y + 260} width={W + 6000} height={4000} fill={c2} />
    {[...Array(9)].map((_, r) => {
      const yy = y + 20 + r * r * 9 + r * 14;
      let d = `M-3000 ${yy}`;
      for (let i = 0; i < 70; i++) d += ` q60 ${-10 - r * 2} 120 0`;
      return <path key={r} d={d} transform={`translate(${((t * (30 + r * 12)) % 120) - 60} 0)`} stroke={line} strokeWidth={3 + r * 0.8} fill="none" opacity={0.5 + r * 0.04} />;
    })}
  </g>
);

// ---------------------------------------------------------------- the Pushpaka vimana

/** The flying Pushpaka vimana facing right (origin = centre of its cloud base); `rider` is drawn on its deck. */
export const Pushpaka: React.FC<{ t: number; glow?: number; rider?: React.ReactNode; riderS?: number }> = ({ t, glow = 1, rider, riderS = 0.32 }) => (
  <g>
    <ellipse cx={0} cy={40} rx={520} ry={70} fill="#ffd27a" opacity={(0.25 + 0.06 * Math.sin(t * 6)) * glow} />
    {[-360, -180, 0, 180, 360].map((x, i) => <ellipse key={i} cx={x} cy={30 + (i % 2) * 14} rx={170} ry={46} fill="#f4f0ff" opacity={0.9} />)}
    <path d="M-460 0 L460 0 L420 -60 L-420 -60Z" fill="#c8902a" stroke="#8a5a1a" strokeWidth={5} />
    <path d="M-440 -60 L440 -60 L440 -84 L-440 -84Z" fill="#f2bb4b" />
    {[...Array(12)].map((_, i) => <rect key={i} x={-420 + i * 72} y={-130} width={14} height={50} fill="#f2bb4b" />)}
    <path d="M-440 -130 L440 -130" stroke="#f2bb4b" strokeWidth={10} />
    {/* tiers */}
    <path d="M-300 -84 L-260 -280 L60 -280 L100 -84Z" fill="#e8b04a" stroke="#a8741a" strokeWidth={4} />
    <path d="M-250 -280 L-210 -420 L10 -420 L50 -280Z" fill="#f2c25a" stroke="#a8741a" strokeWidth={4} />
    <path d="M-200 -420 Q-100 -640 0 -420Z" fill="#ffd36b" stroke="#a8741a" strokeWidth={4} />
    <path d="M-100 -600 L-100 -700" stroke="#f2bb4b" strokeWidth={6} />
    <path d="M-100 -700 L-40 -680 L-100 -660Z" fill="#c8282e" />
    {[-230, -150, -70, 10].map((x) => <rect key={x} x={x} y={-250} width={34} height={60} rx={16} fill="#fff4d0" opacity={0.7 + 0.2 * Math.sin(t * 2 + x)} />)}
    {[-300, 100].map((x) => <g key={x}><path d={`M${x} -84 L${x} -200`} stroke="#a8741a" strokeWidth={6} /><path d={`M${x - 30} -200 Q${x} -260 ${x + 30} -200Z`} fill="#ffd36b" /></g>)}
    {/* a swan prow */}
    <path d="M440 -60 Q520 -70 540 -150 Q560 -220 510 -240 Q540 -200 520 -160 Q500 -100 440 -84Z" fill="#fbf6ec" stroke="#c8bca8" strokeWidth={3} />
    <path d="M510 -240 L540 -230 L515 -225Z" fill="#f2a01a" />
    {rider && <g transform={`translate(260 -84) scale(${riderS})`}>{rider}</g>}
  </g>
);
