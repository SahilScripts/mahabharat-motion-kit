/**
 * "संजीवनी पर्वत कितना भारी था?" — Hindi reel (2 Nov), painted-realism cast (./real) in lit 2.5D scenes.
 * Inputs: reels/example-sanjeevani/ (script-hi.txt, storyboard.json, sfx.py). Generated: public/mg/example-sanjeevani/.
 * No subtitles, no text, no numbers: sizes are shown with lines and comparisons only.
 */
import React from "react";
import { AbsoluteFill, Audio, Composition, Easing, staticFile, useCurrentFrame, type CalculateMetadataFunction } from "remotion";
import { At, C0, Cloud, Particles, Sky, rig, rnd, tw, type Words } from "../kit/scene";
import { Gada, Gem, HP, Hero, RealDefs, RL, type Look, type Outfit } from "../kit/real";
import { LOOK, OUT } from "../kit/realcast";
import { INDIA, IndiaOutline, ringsPath } from "../kit/india";

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

// ---------------------------------------------------------------- cast

const HANUMAN: Look = { skin: "#c27838", line: "#4a220c", hair: "#9a5220", muzzle: "#eaa98a", vanara: true, crown: "mukuta", tilak: "urdhva", gem: RL.ruby, eye: "#3a1a06" };
const HANUMAN_O: Outfit = { dhoti: "#e8b020", border: "#c8302a", sash: "#c8302a", pearls: 3, hara: true, lower: "knee", tail: "#b0642a" };
const VANARA: Look = { skin: "#8a6a4a", line: "#3a2410", hair: "#6a4a2a", muzzle: "#d8a088", vanara: true, crown: "none", eye: "#3a1a06" };
const VANARA_O: Outfit = { dhoti: "#8a3a1a", border: "#c8962e", lower: "knee", tail: "#7a5a3a", belt: false, pearls: 0 };
const LAKSHMANA: Look = { skin: "#d8a070", line: "#6a3e1a", hair: "#140c06", crown: "mukuta", tilak: "urdhva", gem: RL.emer };
const LAKSHMANA_O: Outfit = { dhoti: "#e8c060", border: "#c8962e", sash: "#2a8a4a", pearls: 2, hara: true, lower: "long" };

// ---------------------------------------------------------------- the herb mountain (origin = underside tip; peak at y −780)

const Elephant: React.FC<{ s?: number; flip?: boolean; t: number }> = ({ s = 1, flip, t }) => (
  <g transform={`scale(${flip ? -s : s} ${s})`}>
    {[-34, -12, 18, 38].map((x, i) => <rect key={i} x={x - 8} y={-40} width={16} height={40} rx={5} fill={i % 2 ? "#6a6a72" : "#7a7a84"} />)}
    <path d="M-52 -40 Q-60 -88 -10 -94 Q40 -96 52 -60 Q54 -40 44 -34 L-46 -34Z" fill="#8a8a94" stroke="#3a3a44" strokeWidth={1.4} />
    <path d="M-52 -40 Q-60 -88 -10 -94 Q40 -96 52 -60 Q54 -40 44 -34 L-46 -34Z" fill="url(#rl-torso)" />
    <g transform={`translate(52 -66) rotate(${Math.sin(t * 2) * 4})`}>
      <ellipse cx={8} cy={0} rx={26} ry={24} fill="#8a8a94" stroke="#3a3a44" strokeWidth={1.2} />
      <path d="M-6 -16 Q-30 -10 -24 18 Q-10 26 2 12Z" fill="#7a7a84" stroke="#3a3a44" strokeWidth={1.2} />
      <path d={`M30 6 Q44 30 36 54 Q${30 + Math.sin(t * 2.4) * 6} 66 ${24 + Math.sin(t * 2.4) * 8} 60`} stroke="#8a8a94" strokeWidth={11} fill="none" strokeLinecap="round" />
      <path d="M26 14 Q40 22 46 16" stroke="#f4eee0" strokeWidth={4} fill="none" strokeLinecap="round" />
      <circle cx={18} cy={-4} r={2.6} fill="#1a1a1a" />
    </g>
    <path d="M-52 -60 Q-62 -50 -60 -30" stroke="#6a6a72" strokeWidth={4} fill="none" />
  </g>
);

const TreeR: React.FC<{ x: number; y: number; s: number; c?: string; pine?: boolean }> = ({ x, y, s, c = "#2e6a34", pine }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-4} y={-30} width={8} height={30} fill="#4a2e16" />
    {pine ? (
      <g>
        <path d="M0 -110 L-30 -30 L30 -30Z" fill="#1e4a2a" />
        <path d="M0 -110 L-30 -30 L0 -30Z" fill="#000" opacity={0.18} />
        <path d="M0 -130 L-22 -70 L22 -70Z" fill="#245a32" />
      </g>
    ) : (
      <g>
        <circle cx={0} cy={-60} r={34} fill={c} />
        <circle cx={-18} cy={-44} r={22} fill={c} />
        <circle cx={18} cy={-46} r={24} fill={c} />
        <circle cx={-8} cy={-72} r={16} fill="#5a9a4a" opacity={0.6} />
        <circle cx={14} cy={-40} r={20} fill="#000" opacity={0.15} />
      </g>
    )}
  </g>
);

export const Peak: React.FC<{ t: number; trees?: number; ele?: number; gold?: number; gems?: number; herbs?: number; wire?: number; glow?: number; solid?: number; torn?: number }> = ({
  t, trees = 1, ele = 1, gold = 0.4, gems = 0.4, herbs = 0.3, wire = 0, glow = 0, solid = 1, torn = 1,
}) => {
  const T: [number, number, number, boolean][] = [[-250, -300, 0.9, false], [-190, -380, 0.8, true], [-120, -470, 0.75, false], [-60, -560, 0.6, true], [70, -540, 0.7, false], [140, -450, 0.8, true],
    [210, -370, 0.85, false], [280, -300, 0.9, false], [-300, -280, 0.7, true], [0, -320, 0.9, false], [-140, -330, 0.85, true], [120, -330, 0.85, false]];
  return (
    <g>
      {glow > 0 && <ellipse cx={0} cy={-380} rx={560} ry={520} fill="#ffd27a" opacity={0.18 * glow} />}
      <g opacity={solid}>
        {/* torn underside */}
        <path d="M-360 -270 L-300 -200 L-310 -150 L-220 -110 L-200 -60 L-120 -40 L-60 0 L20 -20 L90 -10 L150 -60 L230 -90 L260 -150 L330 -190 L370 -270Z" fill="#5a3e2a" stroke="#2a1a10" strokeWidth={2} />
        <path d="M-360 -270 L-300 -200 L-310 -150 L-220 -110 L-200 -60 L-120 -40 L-60 0 L20 -20 L90 -10 L150 -60 L230 -90 L260 -150 L330 -190 L370 -270Z" fill="url(#rl-drape)" />
        {[-230, -170, -110].map((y, i) => <path key={y} d={`M${-330 + i * 50} ${y} Q0 ${y + 20} ${330 - i * 40} ${y - 6}`} stroke="#3a2618" strokeWidth={4} fill="none" opacity={0.7} />)}
        {gold > 0 && [[-280, -200, -150, -150, -60, -110, 40, -70], [-200, -250, -80, -210, 60, -230, 220, -170], [-140, -90, -40, -60, 80, -40]].map((p, i) => (
          <g key={i}>
            <polyline points={p.join(" ")} stroke="#ffd34a" strokeWidth={10} opacity={0.25 * gold} fill="none" />
            <polyline points={p.join(" ")} stroke="#ffe48a" strokeWidth={3.5} opacity={gold} fill="none" />
          </g>
        ))}
        {gems > 0 && [[-190, -150, RL.saph], [-40, -110, RL.emer], [110, -150, RL.ruby], [210, -210, RL.saph], [-110, -230, RL.ruby], [40, -200, RL.emer]].map(([x, y, c], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${gems})`}>
            <path d="M0 -18 L10 -4 L6 14 L-6 14 L-10 -4Z" fill={c as string} stroke="#fff" strokeOpacity={0.5} strokeWidth={1} />
            <path d="M0 -18 L4 -4 L0 14" stroke="#fff" strokeOpacity={0.6} strokeWidth={1.2} fill="none" />
            <circle r={26} fill="#fff" opacity={0.12 * Math.abs(Math.sin(t * 3 + i))} />
          </g>
        ))}
        {torn > 0 && [...Array(10)].map((_, i) => <path key={i} d={`M${-300 + i * 64} ${-200 + (i % 3) * 40} q${6} ${30 + rnd(i) * 30} ${-4} ${50 + rnd(i * 3) * 40}`} stroke="#6a4a30" strokeWidth={3} opacity={0.8 * torn} fill="none" />)}
        {/* slopes and the rock peak */}
        <path d="M-370 -272 Q-300 -330 -220 -380 Q-120 -520 -40 -660 Q0 -790 20 -780 Q70 -700 120 -560 Q220 -420 300 -340 Q350 -300 372 -270Z" fill="#3e7a3a" stroke="#1e3a1a" strokeWidth={2} />
        <path d="M20 -780 Q70 -700 120 -560 Q220 -420 300 -340 Q350 -300 372 -270 L40 -270Z" fill="#000" opacity={0.18} />
        <path d="M-120 -540 Q-60 -700 -30 -720 Q0 -800 20 -780 Q50 -720 80 -620 Q30 -600 0 -620 Q-40 -560 -120 -540Z" fill="#8a8078" stroke="#4a4038" strokeWidth={2} />
        <path d="M-30 -720 Q0 -800 20 -780 Q30 -760 34 -730 Q10 -740 -30 -720Z" fill="#f4f4fa" />
        <path d="M20 -780 Q50 -720 80 -620 Q50 -640 30 -680Z" fill="#000" opacity={0.2} />
        <path d="M-370 -272 L372 -270" stroke="#2a4a20" strokeWidth={6} />
        {trees > 0 && T.map(([x, y, sc, pine], i) => <g key={i} opacity={Math.min(1, trees * 2 - i * 0.08)}><TreeR x={x} y={y} s={sc * Math.min(1, trees * 1.5)} pine={pine} /></g>)}
        {ele > 0 && (
          <g opacity={Math.min(1, ele)}>
            <g transform="translate(-170 -300)"><Elephant s={0.55 * ele} t={t} /></g>
            <g transform="translate(150 -310)"><Elephant s={0.5 * ele} t={t + 1} flip /></g>
            <g transform="translate(40 -420)"><Elephant s={0.4 * ele} t={t + 2} /></g>
          </g>
        )}
        {herbs > 0 && [...Array(22)].map((_, i) => {
          const x = -300 + rnd(i * 7) * 600;
          const y = -290 - rnd(i * 11) * (360 - Math.abs(x) * 0.6);
          return (
            <g key={i} opacity={herbs}>
              <circle cx={x} cy={y} r={18} fill="#b8ffd0" opacity={0.25 * (0.6 + 0.4 * Math.sin(t * 4 + i))} />
              <path d={`M${x} ${y + 6} l-5 -12 M${x} ${y + 6} l5 -12 M${x} ${y + 6} l0 -14`} stroke="#d8ffe4" strokeWidth={2.4} />
            </g>
          );
        })}
      </g>
      {wire > 0 && (
        <g opacity={wire}>
          <ellipse cx={0} cy={-270} rx={370} ry={60} fill="none" stroke="#9adfff" strokeWidth={4} />
          {[...Array(13)].map((_, i) => {
            const a = (i / 12) * Math.PI;
            return <line key={i} x1={Math.cos(a) * 370} y1={-270 + Math.sin(a) * 60} x2={0} y2={-780} stroke="#9adfff" strokeWidth={2.4} />;
          })}
          <line x1={-370} y1={-270} x2={0} y2={-780} stroke="#cdf2ff" strokeWidth={5} />
          <line x1={370} y1={-270} x2={0} y2={-780} stroke="#cdf2ff" strokeWidth={5} />
          <path d="M-370 -270 L370 -270 L0 -780Z" fill="#9adfff" opacity={0.12} />
        </g>
      )}
    </g>
  );
};

/** Hanuman carrying the peak in his raised right hand (peak drawn in the same frame, behind the hand) */
const HanumanLift: React.FC<{ t: number; lift?: number; lean?: number; e?: object; peak?: React.ComponentProps<typeof Peak>; pk?: number; gadaUp?: boolean }> = ({ t, lift = 1, lean = 0, e, peak, pk = 0.62, gadaUp }) => {
  const hand: [number, number] = [-110, -760 - 330 * lift];
  return (
    <g transform={`rotate(${lean} 0 -400)`}>
      <g transform={`translate(${hand[0] + 20} ${hand[1] + 6}) scale(${pk})`}><Peak t={t} {...peak} /></g>
      <Hero look={HANUMAN} o={HANUMAN_O} t={t} seed={3} rHand={hand} rPose={HP.hold} rWrist={-90} lHand={gadaUp ? [200, -820] : [196, -470]} lPose={HP.grip} lProp={<g transform={gadaUp ? "rotate(-120)" : "rotate(-90)"}><Gada len={310} /></g>} e={{ anger: 0.1, ...e }} />
    </g>
  );
};

// ---------------------------------------------------------------- sets

const NightSky: React.FC<{ t: number; warm?: number }> = ({ t, warm = 0 }) => (
  <g>
    <Sky stops={[[-900, "#060a1c"], [500, "#121a3a"], [1100, "#2a2a52"], [1600, "#4a3a5a"]]} />
    {warm > 0 && <rect x={-1500} y={-2000} width={4200} height={6000} fill="#ff9a4a" opacity={0.12 * warm} />}
    {[...Array(70)].map((_, i) => <circle key={i} cx={-300 + rnd(i) * 1700} cy={-500 + rnd(i * 7) * 1700} r={0.8 + rnd(i * 3) * 1.8} fill="#fff6e0" opacity={0.3 + 0.5 * Math.abs(Math.sin(t * (0.5 + rnd(i)) + i))} />)}
    <circle cx={820} cy={320} r={64} fill="#f4f0e0" />
    <circle cx={820} cy={320} r={150} fill="#f4f0e0" opacity={0.08} />
  </g>
);

const CloudSea: React.FC<{ y: number; t: number; c?: string; c2?: string; n?: number }> = ({ y, t, c = "#5a5a86", c2 = "#3e3e6a", n = 12 }) => (
  <g>
    <rect x={-2000} y={y + 50} width={5200} height={4000} fill={c2} />
    {[...Array(n)].map((_, i) => <Cloud key={i} x={-900 + i * 260 + Math.sin(t * 0.3 + i) * 20} y={y + (i % 2) * 40} s={1.8} fill={i % 2 ? c : c2} />)}
  </g>
);

const Snowy: React.FC<{ y: number; c?: string; snow?: string; seed: number; amp: number; dawn?: number }> = ({ y, c = "#5a5a8a", snow = "#f4f4fa", seed, amp, dawn = 0 }) => {
  const tops: [number, number][] = [];
  for (let i = 0; i <= 12; i++) tops.push([-1500 + i * 360 + rnd(seed + i) * 120, y - amp * (0.4 + rnd(seed * 3 + i) * 0.6)]);
  let d = `M-1600 ${y + 3000} L-1600 ${y}`;
  tops.forEach(([x, ty], i) => { d += ` L${x - 140} ${y - (i % 2) * 40} L${x} ${ty}`; });
  d += ` L3200 ${y} L3200 ${y + 3000}Z`;
  return (
    <g>
      <path d={d} fill={c} />
      {tops.map(([x, ty], i) => <path key={i} d={`M${x} ${ty} L${x - 60} ${ty + 110} L${x - 20} ${ty + 90} L${x + 10} ${ty + 130} L${x + 70} ${ty + 100}Z`} fill={snow} opacity={0.95} />)}
      {dawn > 0 && tops.map(([x, ty], i) => <path key={`d${i}`} d={`M${x} ${ty} L${x + 70} ${ty + 100} L${x + 140} ${y}`} fill="#ffb07a" opacity={0.25 * dawn} />)}
    </g>
  );
};

const Crane: React.FC<{ t: number; lift: number }> = ({ t, lift }) => (
  <g>
    {/* crawler base */}
    <rect x={-180} y={-60} width={360} height={60} rx={26} fill="#2a2a30" />
    {[...Array(8)].map((_, i) => <circle key={i} cx={-150 + i * 43} cy={-30} r={14} fill="#4a4a54" />)}
    <rect x={-120} y={-150} width={240} height={90} fill="#e8b020" stroke="#7a5a10" strokeWidth={2} />
    <rect x={40} y={-140} width={60} height={40} fill="#9ad0ff" opacity={0.6} />
    {/* boom: lattice from (−60,−150) up to (300,−1300) */}
    {[0, 1].map((k) => <line key={k} x1={-80 + k * 50} y1={-150} x2={290 + k * 30} y2={-1300} stroke="#e8b020" strokeWidth={8} />)}
    {[...Array(22)].map((_, i) => {
      const u = i / 22;
      const u2 = (i + 1) / 22;
      const ax = -80 + 370 * u, ay = -150 - 1150 * u, bx = -30 + 350 * u2, by = -150 - 1150 * u2;
      return <line key={i} x1={ax} y1={ay} x2={bx} y2={by} stroke="#c8961a" strokeWidth={3} />;
    })}
    <line x1={305} y1={-1300} x2={305} y2={-560 + 300 * (1 - lift)} stroke="#2a2a2a" strokeWidth={3} />
    <path d={`M290 ${-560 + 300 * (1 - lift)} l30 0 l-6 24 l-18 0Z`} fill="#3a3a3a" />
    <g transform={`translate(305 ${-500 + 300 * (1 - lift)})`}>
      <rect x={-90} y={0} width={180} height={150} fill="#7a7a86" stroke="#3a3a44" strokeWidth={2} />
      <rect x={-90} y={0} width={180} height={150} fill="url(#rl-cylA)" opacity={0.4} transform="rotate(90 0 75)" />
      {[0, 1, 2].map((i) => <line key={i} x1={-90} y1={40 + i * 40} x2={90} y2={40 + i * 40} stroke="#4a4a54" strokeWidth={2} />)}
      <line x1={-90} y1={0} x2={0} y2={-36} stroke="#2a2a2a" strokeWidth={2} />
      <line x1={90} y1={0} x2={0} y2={-36} stroke="#2a2a2a" strokeWidth={2} />
    </g>
    <line x1={-60} y1={-150} x2={-200} y2={-400} stroke="#c8961a" strokeWidth={6} />
    <line x1={-200} y1={-400} x2={300} y2={-1300} stroke="#555" strokeWidth={2} />
  </g>
);

const Balance: React.FC<{ tilt: number; t: number }> = ({ tilt, t }) => {
  const a = tilt * 22;
  const lx = -340 * Math.cos((a * Math.PI) / 180);
  const ly = -340 * Math.sin((a * Math.PI) / 180) * -1;
  return (
    <g>
      <rect x={-22} y={-900} width={44} height={900} rx={8} fill={RL.goldH} stroke={RL.goldD} strokeWidth={2} />
      <path d="M-140 0 L140 0 L100 -60 L-100 -60Z" fill={RL.gold} stroke={RL.goldD} strokeWidth={2} />
      <circle cx={0} cy={-920} r={30} fill={RL.gold} stroke={RL.goldD} strokeWidth={2} />
      <Gem x={0} y={-920} r={12} c={RL.ruby} />
      <g transform={`translate(0 -900) rotate(${-a})`}>
        <rect x={-360} y={-10} width={720} height={20} rx={8} fill={RL.goldH} stroke={RL.goldD} strokeWidth={2} />
      </g>
      {[-1, 1].map((k) => {
        const px = k * 340 * Math.cos((a * Math.PI) / 180);
        const py = -900 + k * 340 * Math.sin((a * Math.PI) / 180);
        return (
          <g key={k} transform={`translate(${px} ${py})`}>
            <line x1={0} y1={0} x2={-110} y2={300} stroke={RL.goldD} strokeWidth={3} />
            <line x1={0} y1={0} x2={110} y2={300} stroke={RL.goldD} strokeWidth={3} />
            <path d="M-130 300 Q0 360 130 300Z" fill={RL.gold} stroke={RL.goldD} strokeWidth={2} />
          </g>
        );
      })}
      <g opacity={0}>{lx + ly + t}</g>
    </g>
  );
};

/** India's official outline from ../kit/india (never hand-draw India's borders) */
const K = 34;
const proj = ([lo, la]: [number, number]): [number, number] => [(lo - 68) * K, (37 - la) * K * 1.04];

const IndiaMap: React.FC<{ trail: number; t: number }> = ({ trail, t }) => {
  const a = proj([79.6, 30.6]);
  const b = proj([80.6, 7.9]);
  const mid: [number, number] = [(a[0] + b[0]) / 2 - 150, (a[1] + b[1]) / 2];
  const path = `M${a[0]} ${a[1]} Q${mid[0]} ${mid[1]} ${b[0]} ${b[1]}`;
  const u = trail;
  const hx = (1 - u) ** 2 * a[0] + 2 * (1 - u) * u * mid[0] + u * u * b[0];
  const hy = (1 - u) ** 2 * a[1] + 2 * (1 - u) * u * mid[1] + u * u * b[1];
  return (
    <g>
      <IndiaOutline proj={proj} />
      <path d={ringsPath(INDIA, proj)} fill="url(#rl-torso)" opacity={0.5} />
      {[...Array(9)].map((_, i) => <path key={i} d={`M${proj([74 + i * 2.6, 34.4 - Math.abs(i - 4) * 0.4])[0]} ${proj([74 + i * 2.6, 34.4 - Math.abs(i - 4) * 0.4])[1]} l22 -40 l22 40Z`} fill="#f4f4fa" opacity={i < 5 ? 0.9 : 0.6} />)}
      <circle cx={a[0]} cy={a[1]} r={14} fill="#ffffff" />
      <circle cx={b[0]} cy={b[1]} r={14} fill="#ff6a3a" />
      <path d={path} stroke="#ffd27a" strokeWidth={22} opacity={0.25} fill="none" pathLength={1} strokeDasharray={`${u} 1`} strokeLinecap="round" />
      <path d={path} stroke="#fff4c0" strokeWidth={7} fill="none" pathLength={1} strokeDasharray={`${u} 1`} strokeLinecap="round" />
      {u > 0 && u < 1 && (
        <g transform={`translate(${hx} ${hy})`}>
          <circle r={40} fill="#ffd27a" opacity={0.35 + 0.15 * Math.sin(t * 20)} />
          <circle r={16} fill="#fff4c0" />
        </g>
      )}
    </g>
  );
};

const Leaf: React.FC<{ w?: number; glow?: number; seed: number }> = ({ w = 520, glow = 0, seed }) => (
  <g>
    {glow > 0 && <rect x={-w / 2 - 30} y={-50} width={w + 60} height={100} rx={50} fill="#ffd27a" opacity={0.35 * glow} />}
    <rect x={-w / 2} y={-34} width={w} height={68} rx={30} fill="#e6c98a" stroke="#8a6a32" strokeWidth={2} />
    {[-14, 0, 14].map((y, r) => (
      <path key={y} d={[...Array(16)].map((_, i) => `M${-w / 2 + 40 + i * ((w - 80) / 16)} ${y} q${4 + rnd(seed + i + r * 20) * 6} ${-6} ${10 + rnd(seed * 3 + i + r) * 8} 0`).join(" ")} stroke="#4a2a10" strokeWidth={1.6} fill="none" opacity={0.7} />
    ))}
  </g>
);

const Diya: React.FC<{ t: number; x: number; y: number; s?: number }> = ({ t, x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx={0} cy={-40} r={190} fill="#ffb84a" opacity={0.1 + 0.03 * Math.sin(t * 9)} />
    <path d="M-48 0 Q-50 30 0 34 Q50 30 48 0 Q20 10 -48 0Z" fill="#a8582a" stroke="#5a2a10" strokeWidth={2} />
    <path d={`M-4 -4 Q${-14 + Math.sin(t * 11) * 3} -30 ${Math.sin(t * 7) * 5} -66 Q${12 + Math.sin(t * 9) * 3} -30 4 -4Z`} fill="#ffb02a" />
    <path d={`M-2 -6 Q${-6 + Math.sin(t * 11) * 2} -24 ${Math.sin(t * 7) * 3} -44 Q${6 + Math.sin(t * 9) * 2} -24 2 -6Z`} fill="#fff4c0" />
  </g>
);

const Stylus: React.FC = () => (
  <g>
    <rect x={-3} y={-110} width={6} height={130} rx={2} fill="#c8a868" stroke="#6a4a1a" strokeWidth={1} />
    <path d="M-3 -110 L0 -128 L3 -110Z" fill="#8a8a94" />
  </g>
);

const Rings: React.FC<{ k: number; x: number; y: number; c?: string; n?: number }> = ({ k, x, y, c = "#e8f4ff", n = 3 }) => (
  <g>
    {[...Array(n)].map((_, i) => {
      const u = Math.max(0, Math.min(1, k * 1.4 - i * 0.2));
      return u > 0 && u < 1 ? <ellipse key={i} cx={x} cy={y} rx={60 + u * 900} ry={20 + u * 280} fill="none" stroke={c} strokeWidth={14 * (1 - u)} opacity={1 - u} /> : null;
    })}
  </g>
);

// ---------------------------------------------------------------- shots

/** S0 — हनुमान जी ने ... पर्वत उठा लिया — पेड़ों और हाथियों समेत: crane up to Hanuman flying with the peak overhead */
const S0: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, y: tw(u, [0, 3, dur], [520, 0, -60], E), z: tw(u, [0, 3.4, dur], [1.0, 1.0, 1.22], E) }), s);
  const bob = Math.sin(t * 1.4) * 14;
  return (
    <>
      {L({ d: 0.05, id: "a0", children: <NightSky t={t} /> })}
      {L({ d: 0.3, id: "a1", children: <CloudSea y={1650} t={t} /> })}
      {L({
        d: 1, id: "a2", children: (
          <g>
            <RealDefs />
            <At x={600} y={2120 + bob} s={1.05}><HanumanLift t={t} lean={-6} pk={0.95} peak={{ t, herbs: 0.5, gold: 0.2, gems: 0.2 }} /></At>
          </g>
        ),
      })}
      {L({ d: 1.4, id: "a3", dof: 4, children: <g>{[...Array(6)].map((_, i) => <Cloud key={i} x={-300 + i * 340} y={2050 + (i % 2) * 60} s={2.2} fill="#7a7aa6" o={0.8} />)}</g> })}
    </>
  );
};

/** S1 — उस पर्वत का वज़न कितना: under the peak, Hanuman looks up; it creaks and sways */
const S1: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, y: tw(u, [0, dur], [-200, 120], E), z: tw(u, [0, dur], [1.2, 1.1]) }), s);
  const sway = Math.sin(s * 2.4) * 2.2 * tw(s, [1.2, 2.2], [0, 1]);
  return (
    <>
      {L({ d: 0.05, id: "b0", children: <NightSky t={t} /> })}
      {L({ d: 0.3, id: "b1", children: <CloudSea y={1700} t={t} /> })}
      {L({
        d: 1, id: "b2", children: (
          <g>
            <RealDefs />
            <g transform={`rotate(${sway} 540 900)`}>
              <At x={560} y={2260} s={1.25}><HanumanLift t={t} pk={0.95} e={{ lookY: -1, lookX: 0.2 }} peak={{ t, herbs: 0.5 }} /></At>
            </g>
          </g>
        ),
      })}
      {L({ d: 1.4, id: "b3", dof: 4, children: <Particles t={t} seed={4} n={18} color="#c8b8a0" x0={0} x1={1080} y0={0} y1={1900} speed={60} size={4} up={false} /> })}
    </>
  );
};

/** S2 — महर्षि वाल्मीकि की रामायण ... "स तस्य शृङ्गं ..." (5.4–10.6): Valmiki writes; the verse's pictures rise from the leaf, word by word */
const S2: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, y: tw(u, [0, 4.6, dur], [60, 0, -340], E), z: tw(u, [0, 4.6, dur], [1.0, 1.12, 1.0], E) }), s);
  const glow = tw(s, [4.7, 5.4], [0, 1], E);
  const v = (t0: number) => tw(s, [t0, t0 + 0.5], [0, 1], OUTE);
  const write = s < 4.6 ? Math.sin(t * 9) * 8 : 0;
  return (
    <>
      {L({ d: 0.1, id: "c0", children: <g><rect x={-1500} y={-1500} width={4200} height={5000} fill="#140c08" /><circle cx={540} cy={900} r={700} fill="#ffb84a" opacity={0.08 + 0.1 * glow} /></g> })}
      {L({
        d: 0.6, id: "c1", children: glow > 0 ? (
          <g opacity={glow}>
            <RealDefs />
            <g transform={`translate(540 ${560}) scale(${0.45 * v(5.4)})`}><Peak t={t} trees={v(6.3)} ele={v(6.84)} gold={v(7.8)} gems={v(9.0)} herbs={v(9.0)} glow={1} /></g>
          </g>
        ) : <g />,
      })}
      {L({
        d: 1, id: "c2", children: (
          <g>
            <RealDefs />
            <Diya t={t} x={170} y={1620} s={1.3} />
            <At x={600} y={1980} s={1.75}>
              <Hero look={LOOK.rishi} o={OUT.rishiW} t={t} seed={5} rHand={[-20 + write, -560]} rPose={HP.grip} rProp={<g transform="rotate(-30)"><Stylus /></g>} lHand={[150, -560]} lPose={HP.hold} lWrist={-100} e={{ lookY: 1, lookX: -0.2, smile: glow * 0.4 }} headTilt={-6} />
              <g transform="translate(60 -250)"><Leaf seed={81} w={360} glow={glow} /></g>
            </At>
          </g>
        ),
      })}
      {L({ d: 1.4, id: "c3", dof: 4, children: <Particles t={t} seed={8} n={18} color="#ffcf6a" x0={0} x1={1080} y0={200} y1={1800} speed={25} size={3} /> })}
    </>
  );
};

/** S3 — Hanuman tears the peak free (2.8 उखाड़); then trees (4.0), elephants (4.9), gold (6.0), minerals (7.6) light up */
const S3: React.FC<SP> = ({ t, s, dur }) => {
  const tear = tw(s, [2.6, 3.4], [0, 1], E);
  const L = rig((u) => ({ ...C0, x: tw(u, [3.4, 4.0, 4.9, 6.0, 7.5, dur], [0, -80, 60, -60, 40, 0], E), y: tw(u, [0, 3.4, 4.0, 4.9, 6.0, 7.5, dur], [200, 120, -80, -20, 190, 160, 120], E), z: tw(u, [0, 3.4, 4.0, 7.5, dur], [0.9, 0.95, 1.85, 1.7, 1.45], E), r: shake(u, 2.85, 1.4, 0.9) }), s);
  const tr = tw(s, [3.9, 4.4], [0, 1], OUTE);
  const el = tw(s, [4.85, 5.4], [0, 1], OUTE);
  const go = tw(s, [5.9, 6.5], [0, 1], OUTE);
  const ge = tw(s, [7.5, 8.0], [0, 1], OUTE);
  return (
    <>
      {L({ d: 0.05, id: "d0", children: <NightSky t={t} /> })}
      {L({ d: 0.3, id: "d1", children: <Snowy y={1500} seed={3} amp={600} c="#3a3a66" snow="#d8d8ea" /> })}
      {L({
        d: 1, id: "d2", children: (
          <g>
            <RealDefs />
            <path d="M-600 1700 Q200 1500 540 1520 Q900 1500 1700 1700 L1700 3000 L-600 3000Z" fill="#2a3a2a" />
            <g transform={`translate(540 ${1660 - 380 * tear}) scale(0.95)`}>
              <Peak t={t} trees={0.25 + 0.75 * tr} ele={0.2 + 0.8 * el} gold={go} gems={ge} herbs={0.3 + 0.7 * ge} torn={tear} glow={pulse(s, 3.9, 0.6) + pulse(s, 4.85, 0.6) + pulse(s, 5.9, 0.6) + pulse(s, 7.5, 0.6)} />
            </g>
            <At x={540} y={2380} s={1.1}>
              <Hero look={HANUMAN} o={HANUMAN_O} t={t} seed={3} rHand={[-150, -1000 - 200 * tear]} rPose={HP.hold} rWrist={-90} lHand={[150, -1000 - 200 * tear]} lPose={HP.hold} lWrist={90} e={{ anger: 0.6 * (1 - tear), open: 0.5 * pulse(s, 2.6, 0.8), lookY: -1 }} />
            </At>
            {tear > 0 && tear < 1 && [...Array(24)].map((_, i) => <circle key={i} cx={240 + rnd(i) * 600} cy={1650 + rnd(i * 3) * 100 - tear * 200 * rnd(i * 5)} r={6 + rnd(i * 7) * 10} fill="#6a5a4a" opacity={1 - tear} />)}
          </g>
        ),
      })}
    </>
  );
};

/** S4 — तीन किलोमीटर चौड़ी (1.7–2.6) ... एक किलोमीटर ऊँची (3.4–4.6): lines measure the cone, no numbers */
const S4: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, z: tw(u, [0, dur], [1.08, 0.98], E) }), s);
  const wl = tw(s, [1.6, 2.6], [0, 1], E);
  const hl = tw(s, [3.4, 4.5], [0, 1], E);
  return (
    <>
      {L({ d: 0.05, id: "e0", children: <NightSky t={t} /> })}
      {L({
        d: 1, id: "e1", children: (
          <g>
            <RealDefs />
            <g transform="translate(540 1380)"><Peak t={t} glow={0.4} herbs={0.5} /></g>
            <g transform="translate(540 1380)">
              <line x1={-370 * wl} y1={-200} x2={370 * wl} y2={-200} stroke="#fff4c0" strokeWidth={6} />
              {wl > 0 && [-1, 1].map((k) => <path key={k} d={`M${k * 370 * wl} -224 L${k * 370 * wl} -176`} stroke="#fff4c0" strokeWidth={6} />)}
              {wl > 0 && [-1, 1].map((k) => <path key={`a${k}`} d={`M${k * 370 * wl - k * 24} -214 L${k * 370 * wl} -200 L${k * 370 * wl - k * 24} -186`} stroke="#fff4c0" strokeWidth={5} fill="none" />)}
              <line x1={460} y1={-270} x2={460} y2={-270 - 510 * hl} stroke="#9adfff" strokeWidth={6} />
              {hl > 0 && <path d={`M436 -270 L484 -270 M436 ${-270 - 510 * hl} L484 ${-270 - 510 * hl}`} stroke="#9adfff" strokeWidth={6} />}
              {hl > 0 && <line x1={20} y1={-780} x2={460} y2={-780} stroke="#9adfff" strokeWidth={2} strokeDasharray="10 10" opacity={hl} />}
            </g>
          </g>
        ),
      })}
    </>
  );
};

/** S5 — शंकु मानें (0.96) the peak turns to a wireframe cone; वज़न (2.4) it drops on a golden balance; अरब टन (4.3) slam */
const S5: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, y: tw(u, [0, 2.2, dur], [-300, 120, 120], E), z: tw(u, [0, 2.2, dur], [1.15, 0.92, 0.92], E), r: shake(u, 4.3, 1.6, 0.8) }), s);
  const wire = tw(s, [0.9, 1.5], [0, 1], E);
  const drop = tw(s, [2.2, 2.9], [0, 1], Easing.in(Easing.cubic));
  const tilt = tw(s, [2.85, 3.2, 4.25, 4.5], [0, 0.6, 0.6, 1], E);
  const pan = -900 + 340 * Math.sin((tilt * 22 * Math.PI) / 180) + 300;
  return (
    <>
      {L({ d: 0.05, id: "f0", children: <g><rect x={-1500} y={-1500} width={4200} height={5000} fill="#0e0c1a" /><circle cx={540} cy={900} r={800} fill="#ffd27a" opacity={0.08} /></g> })}
      {L({
        d: 1, id: "f1", children: (
          <g>
            <RealDefs />
            <g transform="translate(540 1900)"><Balance tilt={tilt} t={t} /></g>
            <g transform={`translate(${540 - 340 * Math.cos((tilt * 22 * Math.PI) / 180)} ${tw(drop, [0, 1], [500, 1900 + pan - 30])}) scale(0.42)`}>
              <Peak t={t} solid={1 - 0.75 * wire} wire={wire} />
            </g>
            <g transform={`translate(${540 + 340 * Math.cos((tilt * 22 * Math.PI) / 180)} ${1900 - 900 - 340 * Math.sin((tilt * 22 * Math.PI) / 180) + 270})`}>
              <rect x={-20} y={-30} width={40} height={30} rx={4} fill="#8a8a94" />
            </g>
            {pulse(s, 4.3, 0.4) > 0 && <rect x={-1500} y={-1500} width={4200} height={5000} fill="#fff4d0" opacity={0.3 * pulse(s, 4.3, 0.4)} />}
          </g>
        ),
      })}
      {L({ d: 1.4, id: "f2", dof: 4, children: <Particles t={t} seed={13} n={16} color="#ffe08a" x0={0} x1={1080} y0={0} y1={1900} speed={30} size={4} /> })}
    </>
  );
};

/** S6 — क्रेन (1.1): the biggest crane lifts its load; करीब तीन लाख गुना (3.8–5.8): pull back, the mountain's shape fills with countless loads */
const S6: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, z: tw(u, [0, 3.4, 5.6], [1.15, 1.0, 0.34], E), y: tw(u, [0, 3.4, 5.6], [0, 0, -640], E) }), s);
  const lift = tw(s, [0.8, 2.6], [0, 1], E);
  const fill = tw(s, [4.2, 6.0], [0, 1], E);
  return (
    <>
      {L({ d: 0.05, id: "g0", children: <Sky stops={[[-3000, "#0e1a3a"], [0, "#2a3a6a"], [1200, "#d89a6a"], [1700, "#ffcf8a"]]} /> })}
      {L({
        d: 1, id: "g1", children: (
          <g>
            <RealDefs />
            <g transform="translate(540 3158) scale(5.4)">
              <Peak t={t} solid={0.95} herbs={0.3} />
              {fill > 0 && (
                <g opacity={0.85}>
                  {[...Array(120)].map((_, i) => {
                    const row = Math.floor(i / 12);
                    const col = i % 12;
                    const y = -290 - row * 46;
                    const half = 370 * (1 - (row * 46) / 500);
                    const x = -half + (col + 0.5) * ((2 * half) / 12);
                    return i / 120 < fill && half > 20 ? <rect key={i} x={x - 12} y={y - 16} width={24} height={20} fill="#9a9aa6" stroke="#4a4a54" strokeWidth={1} /> : null;
                  })}
                </g>
              )}
            </g>
            <rect x={-6000} y={1700} width={13000} height={6000} fill="#3a3024" />
            <g transform="translate(250 1700) scale(1.0)"><Crane t={t} lift={lift} /></g>
          </g>
        ),
      })}
    </>
  );
};

/** S7 — लेकिन उठाना तो बस शुरुआत थी: Hanuman crouches, launches (1.5) with a shockwave */
const S7: React.FC<SP> = ({ t, s, dur }) => {
  const go = tw(s, [1.45, 2.4], [0, 1], Easing.in(Easing.quad));
  const L = rig((u) => ({ ...C0, y: tw(u, [0, 1.4, dur], [0, 60, -500], E), z: 1.0, r: shake(u, 1.5, 2) }), s);
  const crouch = tw(s, [0.4, 1.4], [0, 1], E) * (1 - tw(s, [1.45, 1.7], [0, 1]));
  return (
    <>
      {L({ d: 0.05, id: "h0", children: <NightSky t={t} /> })}
      {L({ d: 0.3, id: "h1", children: <Snowy y={1600} seed={7} amp={500} c="#2a2a52" snow="#c8c8e0" /> })}
      {L({
        d: 1, id: "h2", children: (
          <g>
            <RealDefs />
            <path d="M-600 1760 Q540 1640 1700 1760 L1700 3000 L-600 3000Z" fill="#202a20" />
            <Rings k={tw(s, [1.5, 2.6], [0, 1])} x={540} y={1760} c="#e8f0ff" />
            <At x={540} y={1760 - go * 1500} s={1.0}>
              <g transform={`translate(0 ${crouch * 60}) scale(1 ${1 - crouch * 0.07})`}><HanumanLift t={t} pk={0.9} lift={1 - crouch * 0.2} e={{ anger: 0.5 }} peak={{ t, herbs: 0.6 }} /></g>
            </At>
            {[...Array(16)].map((_, i) => <circle key={i} cx={540 + (rnd(i) - 0.5) * 600 * (0.3 + go)} cy={1740 - rnd(i * 3) * 200 * go} r={10 + rnd(i * 5) * 16} fill="#8a8aa0" opacity={go > 0 ? 0.6 * (1 - go) : 0} />)}
          </g>
        ),
      })}
    </>
  );
};

/** S8 — सत्ताईस सौ किलोमीटर, एक घंटे में: the India map, a trail from the Himalaya to Lanka (1.3–4.0), then again faster (5.5–7.8) */
const S8: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, x: tw(u, [0, dur], [-20, 20]), z: tw(u, [0, 4.4, dur], [1.0, 1.0, 1.08], E) }), s);
  const trail = s < 4.4 ? tw(s, [1.2, 4.0], [0, 1], E) : tw(s, [5.5, 7.6], [0, 1], E);
  const sweepBg = tw(s, [4.4, 5.4], [0, 1]);
  return (
    <>
      {L({ d: 0.05, id: "i0", children: <g><rect x={-1500} y={-1500} width={4200} height={5000} fill="#1a3a5a" />{[...Array(12)].map((_, i) => <path key={i} d={`M-200 ${200 + i * 160} q300 -20 600 0 t600 0 t600 0`} stroke="#2a5a7a" strokeWidth={3} fill="none" opacity={0.6} />)}</g> })}
      {L({
        d: 1, id: "i1", children: (
          <g>
            <RealDefs />
            <g transform="translate(40 220)" opacity={1 - 0.25 * pulse(s, 4.4, 1)}><IndiaMap trail={trail} t={t} /></g>
            {sweepBg > 0 && sweepBg < 1 && <rect x={-1500} y={-1500} width={4200} height={5000} fill="#fff4d0" opacity={0.15 * Math.sin(sweepBg * Math.PI)} />}
          </g>
        ),
      })}
      {L({ d: 1.3, id: "i2", dof: 3, children: <g>{[...Array(10)].map((_, i) => <Cloud key={i} x={-200 + i * 160} y={1820 + (i % 2) * 40} s={1.4} fill="#e8eef6" o={0.6} />)}</g> })}
    </>
  );
};

/** S9 — आवाज़ की रफ़्तार से भी दोगुनी (1.0, 1.76): Hanuman bursts through a vapour cone, two shock rings */
const S9: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, x: tw(u, [0, dur], [-60, 60]), z: tw(u, [0, dur], [1.0, 1.1]), r: shake(u, 1.0, 1.4, 0.5) + shake(u, 1.76, 1.6, 0.6) }), s);
  const sp = (t * 3200) % 2400;
  return (
    <>
      {L({ d: 0.05, id: "j0", children: <NightSky t={t} /> })}
      {L({ d: 0.4, id: "j1", children: <g>{[...Array(9)].map((_, i) => <Cloud key={i} x={((i * 300 + sp * (0.5 + (i % 3) * 0.2)) % 2400) - 600} y={300 + i * 180} s={1.6} fill="#4a4a7a" o={0.7} />)}</g> })}
      {L({
        d: 1, id: "j2", children: (
          <g>
            <RealDefs />
            {[...Array(20)].map((_, i) => <line key={i} x1={((i * 173 + t * 5000) % 2000) - 500} y1={200 + i * 90} x2={((i * 173 + t * 5000) % 2000) - 900} y2={200 + i * 90} stroke="#e8f0ff" strokeWidth={3} opacity={0.4} />)}
            {[1.0, 1.76].map((k) => <ellipse key={`f${k}`} cx={560} cy={1200} rx={420} ry={300} fill="#ffffff" opacity={0.5 * pulse(s, k - 0.05, 0.3)} />)}
            {[1.0, 1.76].map((k) => <Rings key={k} k={tw(s, [k, k + 0.7], [0, 1])} x={560} y={1150} n={2} />)}
            <At x={560} y={1650} s={0.62}><g transform="rotate(16 0 -400)"><HanumanLift t={t} pk={0.95} peak={{ t, herbs: 0.5 }} e={{ anger: 0.4 }} /></g></At>
          </g>
        ),
      })}
    </>
  );
};

/** S10 — ऊर्जा (1.8) ... चार सौ मेगाटन (3.3–4.4): the flying peak blazes; rings of force roll over the clouds */
const S10: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, y: tw(u, [0, dur], [100, -60]), z: tw(u, [0, 1.8, dur], [1.0, 1.06, 0.9], E), r: shake(u, 3.3, 1.2, 1.2) }), s);
  const en = tw(s, [1.6, 2.4], [0, 1], E);
  return (
    <>
      {L({ d: 0.05, id: "k0", children: <NightSky t={t} warm={en} /> })}
      {L({ d: 0.35, id: "k1", children: <g><CloudSea y={1500} t={t} c="#5a4a76" c2="#3a305a" /><Rings k={tw(s, [3.2, 4.8], [0, 1])} x={540} y={1520} c="#ffd27a" n={4} /></g> })}
      {L({
        d: 1, id: "k2", children: (
          <g>
            <RealDefs />
            <circle cx={480} cy={700} r={420 + 120 * en + 40 * Math.sin(t * 9)} fill="#ffb84a" opacity={0.18 * en} />
            <circle cx={480} cy={700} r={260 + 60 * en} fill="#fff0c0" opacity={0.16 * en} />
            {en > 0 && [...Array(14)].map((_, i) => {
              const a = (i / 14) * Math.PI * 2 + t * 0.6;
              return <line key={i} x1={480 + Math.cos(a) * 300} y1={700 + Math.sin(a) * 300} x2={480 + Math.cos(a) * (480 + 60 * Math.sin(t * 7 + i))} y2={700 + Math.sin(a) * (480 + 60 * Math.sin(t * 7 + i))} stroke="#ffe08a" strokeWidth={5} opacity={0.5 * en} />;
            })}
            <At x={560} y={1640} s={0.8}><g transform="rotate(10 0 -400)"><HanumanLift t={t} pk={0.95} peak={{ t, herbs: 0.6, glow: en }} e={{ anger: 0.3 }} /></g></At>
          </g>
        ),
      })}
      {L({ d: 1.4, id: "k3", dof: 4, children: <Particles t={t} seed={23} n={30} color="#ffd27a" x0={-100} x1={1200} y0={0} y1={1900} speed={120} size={5} /> })}
    </>
  );
};

const Lying: React.FC<{ t: number; look: Look; o: Outfit; rise: number; seed: number; dir: number }> = ({ t, look, o, rise, seed, dir }) => (
  <g transform={`rotate(${dir * 90 * (1 - rise)} 0 -40)`}>
    <Hero look={look} o={o} t={t} seed={seed} rHand={[-150, -420 - 300 * rise * (seed % 2)]} rPose={HP.hang} lHand={[150, -420]} lPose={HP.hang} e={{ blink: rise > 0.2 ? 1 : 0.05, smile: rise * 0.5 }} />
  </g>
);

const Battlefield: React.FC<{ t: number; rise: number; herbs: number }> = ({ t, rise, herbs }) => {
  const W8: [Look, Outfit, number, number, number, number, number][] = [
    [LAKSHMANA, LAKSHMANA_O, 140, 260, 1420, 0.6, 1],
    [VANARA, VANARA_O, 1000, 560, 1590, 0.56, -1],
    [{ ...VANARA, skin: "#9a7a52" }, VANARA_O, 160, 820, 1770, 0.6, 1],
  ];
  return (
    <g>
      <RealDefs />
      <path d="M-800 1360 Q540 1290 1900 1360 L1900 3000 L-800 3000Z" fill="#2a2418" />
      <ellipse cx={540} cy={1520} rx={700} ry={160} fill="#b8ffd0" opacity={0.12 * herbs} />
      {W8.map(([lk, o, x0, x1, y, sc, dir], i) => (
        <At key={i} x={x0 + (x1 - x0) * rise} y={y} s={sc}><Lying t={t} look={lk} o={o} rise={rise} seed={i + 1} dir={dir} /></At>
      ))}
      {herbs > 0 && [...Array(30)].map((_, i) => <circle key={i} cx={100 + rnd(i) * 900} cy={1500 + rnd(i * 3) * 400 - ((t * 60 + i * 40) % 400)} r={3 + rnd(i * 7) * 4} fill="#d8ffe4" opacity={herbs * 0.7} />)}
    </g>
  );
};

/** S11 — लेकिन इससे भी अद्भुत बात सुनिए: night battlefield, the wounded lie still; the herbs on the peak above begin to glow */
const S11: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, y: tw(u, [0, dur], [-40, 60], E), z: tw(u, [0, dur], [1.0, 1.06]) }), s);
  const herbs = tw(s, [0.9, 1.9], [0, 1], E);
  return (
    <>
      {L({ d: 0.05, id: "l0", children: <NightSky t={t} /> })}
      {L({
        d: 0.6, id: "l1", children: (
          <g>
            <RealDefs />
            <g transform={`translate(560 ${760 + Math.sin(t * 1.2) * 8}) scale(0.62)`}><Peak t={t} herbs={0.3 + 0.7 * herbs} glow={herbs} /></g>
          </g>
        ),
      })}
      {L({ d: 1, id: "l2", children: <Battlefield t={t} rise={0} herbs={herbs} /> })}
    </>
  );
};

/** S12 — घायल योद्धा ठीक हो गए (0.4–1.9): they rise; हनुमान जी ... वापस हिमालय में रख आए (2.3–6.3): the peak goes back on the snowy Himalaya at dawn */
const S12: React.FC<SP> = ({ t, s, dur }) => {
  const back = s >= 2.25;
  const rise = tw(s, [0.4, 1.8], [0, 1], E);
  const L = rig((u) => (u < 2.25 ? { ...C0, z: tw(u, [0, 2.2], [1.08, 1.0]) } : { ...C0, y: tw(u, [2.25, dur], [-200, 60], E), z: tw(u, [2.25, dur], [1.12, 0.94], E) }), s);
  const fly = tw(s, [2.3, 5.6], [0, 1], E);
  const set = tw(s, [5.4, 6.2], [0, 1], E);
  return back ? (
    <>
      {L({ d: 0.05, id: "n0", children: <Sky stops={[[-900, "#2a2a5a"], [500, "#6a5a8a"], [1100, "#e8a07a"], [1500, "#ffd8a0"]]} /> })}
      {L({ d: 0.25, id: "n1", children: <Snowy y={1450} seed={11} amp={700} c="#6a6a9a" snow="#ffffff" dawn={1} /> })}
      {L({
        d: 1, id: "n2", children: (
          <g>
            <RealDefs />
            <Snowy y={1800} seed={17} amp={420} c="#8a86b0" snow="#ffffff" dawn={1} />
            <g transform={`translate(${540} ${tw(set, [0, 1], [1080, 1500])}) scale(${0.62})`} opacity={1}>
              <Peak t={t} herbs={0.6} glow={set} />
            </g>
            <At x={tw(fly, [0, 1], [1300, 700])} y={tw(fly, [0, 1], [1600, 1880]) + set * 120} s={0.62}>
              <g transform={`rotate(${-10 + 10 * set} 0 -400)`}>
                <Hero look={HANUMAN} o={HANUMAN_O} t={t} seed={3} rHand={set > 0.5 ? [-200, -700] : [-150, -1060]} rPose={set > 0.5 ? HP.bless : HP.hold} rWrist={-90} lHand={[196, -470]} lPose={HP.grip} lProp={<g transform="rotate(-90)"><Gada len={310} /></g>} e={{ smile: set * 0.6 }} />
              </g>
            </At>
            {set > 0 && set < 1 && <Rings k={set} x={540} y={1500} c="#ffffff" n={2} />}
          </g>
        ),
      })}
      {L({ d: 1.4, id: "n3", dof: 4, children: <Particles t={t} seed={31} n={24} color="#fff0d0" x0={0} x1={1080} y0={0} y1={1900} speed={30} size={4} /> })}
    </>
  ) : (
    <>
      {L({ d: 0.05, id: "m0", children: <NightSky t={t} /> })}
      {L({
        d: 0.6, id: "m1", children: (
          <g>
            <RealDefs />
            <g transform={`translate(560 ${760 + Math.sin(t * 1.2) * 8}) scale(0.62)`}><Peak t={t} herbs={1} glow={1} /></g>
          </g>
        ),
      })}
      {L({ d: 1, id: "m2", children: <Battlefield t={t} rise={rise} herbs={1 - rise * 0.5} /> })}
    </>
  );
};

const SHOTS = [S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12];

export const Sanjeevani: React.FC<{ manifest?: Manifest }> = ({ manifest }) => {
  const t = useCurrentFrame() / FPS;
  if (!manifest) return null;
  const B = manifest.scenes.map((x) => x.start).concat(manifest.duration);
  const i = Math.max(0, Math.min(SHOTS.length - 1, B.findIndex((b, k) => t >= b && t < B[k + 1])));
  const Shot = SHOTS[i];
  const cutFlash = i > 0 ? Math.max(0, 1 - (t - B[i]) / 0.1) * 0.18 : 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0710", overflow: "hidden" }}>
      <Audio src={staticFile("mg/example-sanjeevani/mix.wav")} />
      <Audio src={staticFile("mg/example-sanjeevani/sfx.wav")} volume={0.55} />
      <Shot t={t} s={t - B[i]} dur={B[i + 1] - B[i]} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 42%, transparent 55%, rgba(0,0,0,0.55) 100%)" }} />
      {cutFlash > 0 && <AbsoluteFill style={{ background: "#fff3dc", opacity: cutFlash, mixBlendMode: "screen" }} />}
    </AbsoluteFill>
  );
};

const calculateMetadata: CalculateMetadataFunction<{ manifest?: Manifest }> = async ({ props }) => {
  const manifest: Manifest = await (await fetch(staticFile("mg/example-sanjeevani/manifest.json"))).json();
  return { durationInFrames: Math.ceil(manifest.duration * FPS), props: { ...props, manifest } };
};

export const SanjeevaniComposition = () => (
  <Composition id="REEL-example-sanjeevani" component={Sanjeevani} calculateMetadata={calculateMetadata} defaultProps={{}} durationInFrames={75 * FPS} fps={FPS} width={W} height={H} />
);
