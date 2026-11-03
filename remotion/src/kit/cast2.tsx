/**
 * Cast for reel "Ayyappa: son of Shiva and Vishnu". Same conventions as ./cast.tsx:
 * origin (0,0) between the feet on the ground, up is NEGATIVE y; an adult stands ~840 tall at scale 1 (head centre y≈-800).
 * Hands are targets in local coords ("r" = character's right = viewer's LEFT). Elbows bend outward automatically.
 * `t` drives blinks and breathing; mouths stay closed (narration). Extra arms (Brahma, Vishnu, Durga) sit on shoulders
 * slightly behind the main pair and are drawn first.
 */
import React from "react";
import { Arm, blinkAt, handOf, type P } from "./cast";

// ---------------------------------------------------------------- shared parts

type FaceProps = { t: number; seed: number; skin: string; shade: string; r?: number; y?: number; anger?: number; calm?: boolean; thirdEye?: boolean;
  tilak?: "u" | "line" | "dot" | "ash" | null; brow?: string; lookX?: number; earrings?: string; female?: boolean };

export const Face: React.FC<FaceProps> = ({ t, seed, skin, shade, r = 60, y = -800, anger = 0, calm = false, thirdEye = false, tilak = "dot", brow = "#1a1210", lookX = 0, earrings = "#f2bb4b", female = false }) => {
  const open = calm ? 0.25 : blinkAt(t, seed) * (1 - anger * 0.2);
  const ex = r * 0.4;
  return (
    <g transform={`translate(0 ${y})`}>
      <ellipse cx={0} cy={0} rx={r * 0.88} ry={r} fill={skin} stroke={shade} strokeWidth={3} />
      <path d={`M${r * 0.2} ${-r * 0.95} Q${r * 0.95} ${-r * 0.5} ${r * 0.85} ${r * 0.2} Q${r * 0.6} ${r * 0.85} ${r * 0.1} ${r * 0.98}Z`} fill={shade} opacity={0.22} />
      {[-1, 1].map((s) => (
        <g key={s}>
          <path d={`M${s * ex - r * 0.24} ${-r * 0.08} Q${s * ex} ${-r * 0.08 - r * 0.2 * open + anger * 5} ${s * ex + r * 0.24} ${-r * 0.08} Q${s * ex} ${-r * 0.08 + r * 0.12 * open} ${s * ex - r * 0.24} ${-r * 0.08}Z`} fill="#fff8ec" />
          {open > 0.3 && <circle cx={s * ex + lookX * r * 0.08} cy={-r * 0.09} r={r * 0.1 * open} fill="#2a1508" />}
          {calm && <path d={`M${s * ex - r * 0.22} ${-r * 0.06} Q${s * ex} ${r * 0.04} ${s * ex + r * 0.22} ${-r * 0.06}`} stroke="#2a1508" strokeWidth={r * 0.05} fill="none" strokeLinecap="round" />}
          {female && open > 0.3 && <path d={`M${s * ex + s * r * 0.24} ${-r * 0.1} l${s * r * 0.1} ${-r * 0.06}`} stroke="#1a1210" strokeWidth={r * 0.04} strokeLinecap="round" />}
          <path d={`M${s * r * 0.15} ${-r * 0.3 + anger * r * 0.1} Q${s * r * 0.4} ${-r * 0.4 + anger * r * 0.08} ${s * r * 0.66} ${-r * 0.32 - anger * r * 0.12}`} stroke={brow} strokeWidth={r * (female ? 0.07 : 0.12)} strokeLinecap="round" fill="none" />
        </g>
      ))}
      <path d={`M0 ${-r * 0.02} L${-r * 0.1} ${r * 0.32} Q0 ${r * 0.38} ${r * 0.1} ${r * 0.32}Z`} fill={shade} opacity={0.5} />
      <path d={`M${-r * 0.22} ${r * 0.58} Q0 ${r * (anger > 0.5 ? 0.5 : 0.7)} ${r * 0.22} ${r * 0.58}`} stroke={female ? "#b0283a" : "#6a2a1a"} strokeWidth={r * (female ? 0.09 : 0.06)} fill="none" strokeLinecap="round" />
      {tilak === "u" && <path d={`M${-r * 0.12} ${-r * 0.75} L${-r * 0.06} ${-r * 0.4} L${r * 0.06} ${-r * 0.4} L${r * 0.12} ${-r * 0.75}`} stroke="#fff8ec" strokeWidth={r * 0.06} fill="none" />}
      {tilak === "u" && <rect x={-r * 0.03} y={-r * 0.72} width={r * 0.06} height={r * 0.3} fill="#d4263a" />}
      {tilak === "line" && <rect x={-r * 0.05} y={-r * 0.78} width={r * 0.1} height={r * 0.36} rx={r * 0.05} fill="#d4263a" />}
      {tilak === "dot" && <circle cx={0} cy={-r * 0.52} r={r * 0.08} fill="#d4263a" />}
      {tilak === "ash" && [0, 1, 2].map((k) => <rect key={k} x={-r * 0.4} y={-r * (0.78 - k * 0.12)} width={r * 0.8} height={r * 0.06} rx={r * 0.03} fill="#f4f1ea" />)}
      {tilak === "ash" && <circle cx={0} cy={-r * 0.66} r={r * 0.07} fill="#d4263a" />}
      {thirdEye && <ellipse cx={0} cy={-r * 0.55} rx={r * 0.05} ry={r * 0.13} fill="#d4263a" stroke="#fff3c4" strokeWidth={2} />}
      {earrings && [-1, 1].map((s) => <circle key={s} cx={s * r * 0.9} cy={r * 0.25} r={r * 0.13} fill="none" stroke={earrings} strokeWidth={r * 0.07} />)}
    </g>
  );
};

export const Shadow: React.FC<{ w?: number }> = ({ w = 180 }) => <ellipse cx={0} cy={4} rx={w} ry={24} fill="#000" opacity={0.32} />;

export const Torso: React.FC<{ skin: string; shade: string; b: number; wide?: number; female?: boolean }> = ({ skin, shade, b, wide = 1, female }) => (
  <g>
    <path d={`M${-84 * wide} -470 Q0 -455 ${84 * wide} -470 L${(female ? 104 : 126) * wide} ${-680 + b} Q0 ${-712 + b} ${-(female ? 104 : 126) * wide} ${-680 + b}Z`} fill={skin} stroke={shade} strokeWidth={4} />
    <path d={`M${12 * wide} ${-700 + b} Q${60 * wide} -600 ${84 * wide} -470 L${118 * wide} -470 L${126 * wide} ${-680 + b}Z`} fill={shade} opacity={0.3} />
  </g>
);

export const Necklace: React.FC<{ b: number; c?: string; jewel?: string; w?: number }> = ({ b, c = "#f2bb4b", jewel = "#d4263a", w = 70 }) => (
  <g>
    <path d={`M${-w} ${-688 + b} Q0 ${-605 + b} ${w} ${-688 + b}`} stroke={c} strokeWidth={11} fill="none" />
    <circle cx={0} cy={-624 + b} r={11} fill={jewel} stroke={c} strokeWidth={4} />
  </g>
);

export const Dhoti: React.FC<{ c: string; border: string; skin: string; shade: string }> = ({ c, border, skin, shade }) => (
  <g>
    <path d="M-58 -60 L-72 -8 L-20 -8 L-26 -60Z M58 -60 L72 -8 L20 -8 L26 -60Z" fill={skin} stroke={shade} strokeWidth={3} />
    <path d="M-100 -470 L100 -470 L128 -60 L20 -50 L0 -300 L-20 -50 L-128 -60Z" fill={c} />
    <path d="M-128 -60 L-20 -50 L-22 -80 L-124 -88Z M128 -60 L20 -50 L22 -80 L124 -88Z" fill={border} />
    <rect x={-98} y={-482} width={196} height={24} rx={8} fill={border} />
  </g>
);

// ---------------------------------------------------------------- props

export const Trishul: React.FC<{ len?: number }> = ({ len = 640 }) => (
  <g>
    <rect x={-6} y={-len} width={12} height={len + 120} rx={5} fill="#8a8f99" />
    <path d={`M0 ${-len - 120} L-14 ${-len - 40} L0 ${-len} L14 ${-len - 40}Z`} fill="#d9dee6" stroke="#6a707a" strokeWidth={3} />
    <path d={`M-14 ${-len} Q-70 ${-len - 10} -66 ${-len - 100} L-50 ${-len - 60} Q-46 ${-len + 6} 0 ${-len + 10}Z`} fill="#d9dee6" stroke="#6a707a" strokeWidth={3} />
    <path d={`M14 ${-len} Q70 ${-len - 10} 66 ${-len - 100} L50 ${-len - 60} Q46 ${-len + 6} 0 ${-len + 10}Z`} fill="#d9dee6" stroke="#6a707a" strokeWidth={3} />
    <g transform={`translate(0 ${-len + 60})`}>
      <path d="M-26 -22 L26 22 M-26 22 L26 -22" stroke="#a8652a" strokeWidth={6} />
      <path d="M-26 -22 Q0 0 -26 22Z M26 -22 Q0 0 26 22Z" fill="#c98a4a" stroke="#7a4a1a" strokeWidth={3} />
    </g>
  </g>
);

export const Chakra: React.FC<{ t: number; r?: number }> = ({ t, r = 46 }) => (
  <g transform={`rotate(${t * 220})`}>
    <circle r={r * 1.5} fill="#ffe9a8" opacity={0.25} />
    <circle r={r} fill="none" stroke="#f2bb4b" strokeWidth={r * 0.22} />
    {new Array(12).fill(0).map((_, i) => <path key={i} d={`M0 ${-r} L${r * 0.16} ${-r * 1.32} L${-r * 0.16} ${-r * 1.32}Z`} fill="#f2bb4b" transform={`rotate(${i * 30})`} />)}
    <circle r={r * 0.28} fill="#d4263a" />
    {new Array(8).fill(0).map((_, i) => <path key={i} d={`M0 0 L0 ${-r * 0.9}`} stroke="#f2bb4b" strokeWidth={4} transform={`rotate(${i * 45})`} />)}
  </g>
);

export const Conch: React.FC = () => (
  <g><path d="M-30 20 Q-40 -30 0 -48 Q40 -40 34 0 Q26 30 -30 20Z" fill="#fbf6ec" stroke="#b9ab95" strokeWidth={3} /><path d="M-14 -30 Q10 -24 14 4" stroke="#d9cdb8" strokeWidth={4} fill="none" /></g>
);

export const Lotus: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}>
    {[-2, -1, 0, 1, 2].map((k) => <path key={k} d="M0 0 Q-16 -30 0 -60 Q16 -30 0 0Z" fill={k % 2 ? "#f28bb0" : "#f6a8c6"} stroke="#c45a86" strokeWidth={2} transform={`rotate(${k * 26})`} />)}
  </g>
);

export const Bow: React.FC = () => (
  <g>
    <path d="M0 -260 Q90 0 0 260" stroke="#7a4a1a" strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d="M0 -260 L0 260" stroke="#e9e2d0" strokeWidth={3} />
  </g>
);

export const Bell: React.FC<{ s?: number }> = ({ s = 1 }) => (
  <g transform={`scale(${s})`}>
    <path d="M-14 0 Q-16 -26 0 -28 Q16 -26 14 0Z" fill="#f2bb4b" stroke="#a8761c" strokeWidth={2} />
    <circle cx={0} cy={3} r={4} fill="#a8761c" />
  </g>
);

// ---------------------------------------------------------------- Ayyappa (young warrior) and Manikandan (baby)

const AY = { skin: "#9a6236", shade: "#6a3e1e", dhoti: "#1c1a22", border: "#f2bb4b", hair: "#120c0a" };

export const Ayyappa: React.FC<{ t: number; rHand?: P; lHand?: P; bow?: boolean; anger?: number; lookX?: number; glow?: number }> = ({ t, rHand = [-170, -390], lHand = [170, -390], bow = true, anger = 0, lookX = 0, glow = 0 }) => {
  const b = Math.sin(t * 2.2) * 3;
  const rS: P = [-116, -672 + b];
  const lS: P = [116, -672 + b];
  const lH = handOf(lS, lHand, 160, 150);
  return (
    <g>
      {glow > 0 && <ellipse cx={0} cy={-520} rx={300} ry={500} fill="#ffd27a" opacity={0.18 * glow} />}
      <Shadow />
      <Dhoti c={AY.dhoti} border={AY.border} skin={AY.skin} shade={AY.shade} />
      <Torso skin={AY.skin} shade={AY.shade} b={b} />
      {/* sandal paste lines and the sacred bell (mani) that gives him the name Manikandan */}
      {[0, 1, 2].map((k) => <rect key={k} x={-40} y={-600 + k * 18 + b} width={80} height={6} rx={3} fill="#f1e2c0" opacity={0.85} />)}
      <Necklace b={b} />
      <g transform={`translate(0 ${-640 + b})`}><Bell s={1.4} /></g>
      <Arm s={rS} h={rHand} a={160} b={150} bend={0} skin={AY.skin} shade={AY.shade} w={42} band={AY.border} />
      <Arm s={lS} h={lHand} a={160} b={150} bend={0} skin={AY.skin} shade={AY.shade} w={42} band={AY.border} />
      {bow && <g transform={`translate(${lH[0]} ${lH[1]})`}><Bow /></g>}
      <rect x={-24} y={-740} width={48} height={50} fill={AY.skin} />
      <Face t={t} seed={11} skin={AY.skin} shade={AY.shade} anger={anger} lookX={lookX} tilak="line" />
      {/* hair tied in a topknot with a gold band */}
      <path d="M-60 -830 Q-56 -880 0 -878 Q56 -880 60 -830 Q40 -858 0 -856 Q-40 -858 -60 -830Z" fill={AY.hair} />
      <ellipse cx={0} cy={-900} rx={34} ry={30} fill={AY.hair} />
      <rect x={-30} y={-884} width={60} height={12} rx={5} fill={AY.border} />
    </g>
  );
};

export const Manikandan: React.FC<{ t: number; glow?: number }> = ({ t, glow = 1 }) => (
  <g>
    {glow > 0 && <circle cx={0} cy={-120} r={190} fill="#ffe7a8" opacity={0.3 * glow} />}
    {/* swaddled baby lying in a basket of leaves */}
    <ellipse cx={0} cy={-30} rx={160} ry={40} fill="#5a8a3a" />
    <path d="M-150 -30 Q0 30 150 -30 L130 -60 Q0 -10 -130 -60Z" fill="#7aa64a" />
    <path d="M-90 -60 Q0 -110 90 -60 Q60 -30 0 -36 Q-60 -30 -90 -60Z" fill="#f4ecd8" stroke="#c9b894" strokeWidth={3} />
    <g transform="translate(-60 -90)"><Face t={t} seed={13} skin={AY.skin} shade={AY.shade} r={38} y={0} calm tilak="dot" earrings="" /></g>
    <path d="M-92 -122 Q-60 -150 -28 -122" fill={AY.hair} />
    <g transform="translate(-60 -40)"><Bell s={1.1} /></g>
  </g>
);

// ---------------------------------------------------------------- Mahishi (buffalo-headed demoness)

const MH = { skin: "#4a3a52", shade: "#2a1e30", robe: "#5a1424", gold: "#c99a3a" };

export const Mahishi: React.FC<{ t: number; rHand?: P; lHand?: P; anger?: number; glow?: number; fallen?: number }> = ({ t, rHand = [-180, -400], lHand = [180, -400], anger = 0.6, glow = 0, fallen = 0 }) => {
  const b = Math.sin(t * 1.8) * 4;
  const rS: P = [-120, -672 + b];
  const lS: P = [120, -672 + b];
  return (
    <g transform={`rotate(${fallen * -78} -60 0)`}>
      {glow > 0 && <ellipse cx={0} cy={-520} rx={320} ry={520} fill="#b33a5a" opacity={0.22 * glow} />}
      <Shadow />
      <path d="M-130 0 L130 0 L100 -470 L-100 -470Z" fill={MH.robe} />
      <path d="M-130 0 L130 0 L126 -30 L-126 -30Z" fill={MH.gold} />
      <Torso skin={MH.skin} shade={MH.shade} b={b} female />
      <path d={`M-104 ${-680 + b} Q0 -600 104 ${-680 + b} L96 -560 Q0 -520 -96 -560Z`} fill={MH.robe} />
      <Necklace b={b} c={MH.gold} jewel="#ff3a2a" w={60} />
      <Arm s={rS} h={rHand} a={160} b={150} bend={0} skin={MH.skin} shade={MH.shade} w={40} band={MH.gold} />
      <Arm s={lS} h={lHand} a={160} b={150} bend={0} skin={MH.skin} shade={MH.shade} w={40} band={MH.gold} />
      {/* buffalo head: broad muzzle, nose ring, wide curved horns, wild hair */}
      <g transform={`translate(0 ${-790 + b})`}>
        <path d="M-120 -40 Q-200 -60 -230 -150 Q-170 -110 -110 -90Z M120 -40 Q200 -60 230 -150 Q170 -110 110 -90Z" fill="#e8dcc4" stroke="#8a7a5a" strokeWidth={3} />
        <path d="M-110 -70 Q-150 0 -96 80 L96 80 Q150 0 110 -70 Q0 -110 -110 -70Z" fill="#1c141e" />
        <ellipse cx={0} cy={0} rx={80} ry={86} fill={MH.skin} stroke={MH.shade} strokeWidth={3} />
        <ellipse cx={0} cy={56} rx={56} ry={36} fill="#5a4a60" />
        <circle cx={-18} cy={58} r={8} fill="#1a1010" /><circle cx={18} cy={58} r={8} fill="#1a1010" />
        <path d="M-16 74 Q0 96 16 74" stroke={MH.gold} strokeWidth={6} fill="none" />
        {[-1, 1].map((s) => (
          <g key={s}>
            <ellipse cx={s * 34} cy={-14} rx={16} ry={10} fill="#ff3a2a" />
            <ellipse cx={s * 34} cy={-14} rx={30} ry={20} fill="#ff3a2a" opacity={0.2 + 0.3 * anger} />
            <path d={`M${s * 12} ${-40 + anger * 6} L${s * 56} ${-30 - anger * 10}`} stroke="#140c12" strokeWidth={9} strokeLinecap="round" />
            <path d={`M${s * 80} ${-30} q${s * 30} -6 ${s * 34} 16 q${s * -16} 10 ${s * -30} -4Z`} fill={MH.skin} stroke={MH.shade} strokeWidth={2} />
          </g>
        ))}
        <path d="M-50 -76 L50 -76 L40 -104 L20 -92 L0 -116 L-20 -92 L-40 -104Z" fill={MH.gold} />
      </g>
    </g>
  );
};

// ---------------------------------------------------------------- Durga and Mahishasura

const DG = { skin: "#e8b07a", shade: "#b07a46", saree: "#c41e2e", border: "#f2bb4b" };

/** strike: trishul thrust; plant (when set): trishul held upright and slammed into the ground (0 raised, 1 planted);
 *  raise: other front hand lifts one finger; anger / roar: face only. */
export const Durga: React.FC<{ t: number; strike?: number; glow?: number; plant?: number; raise?: number; anger?: number; roar?: number; glowC?: string }> = ({ t, strike = 0, glow = 1, plant, raise = 0, anger = 0, roar = 0, glowC = "#ffe08a" }) => {
  const b = Math.sin(t * 2) * 3;
  const fh: [number, number] = plant !== undefined ? [-210, -430] : [-250 + strike * 170, -600 + strike * 260];
  const rh: [number, number] = [170 + 30 * raise, -480 - 400 * raise];
  return (
    <g>
      {glow > 0 && <circle cx={0} cy={-780} r={190} fill={glowC} opacity={0.35 * glow} />}
      <Shadow />
      {/* back arms: sword and chakra */}
      <Arm s={[-100, -660 + b]} h={[-300, -820]} a={150} b={140} bend={0} skin={DG.skin} shade={DG.shade} w={34} band={DG.border} />
      <Arm s={[100, -660 + b]} h={[300, -820]} a={150} b={140} bend={0} skin={DG.skin} shade={DG.shade} w={34} band={DG.border} />
      <g transform="translate(-300 -820) rotate(-30)"><rect x={-6} y={-200} width={12} height={200} fill="#d9dee6" /><rect x={-24} y={-6} width={48} height={12} fill={DG.border} /></g>
      <g transform="translate(300 -840)"><Chakra t={t} r={38} /></g>
      <path d="M-130 0 L130 0 L104 -470 L-104 -470Z" fill={DG.saree} />
      <path d="M-130 0 L130 0 L126 -30 L-126 -30Z M-20 -470 L20 -470 L40 0 L0 0Z" fill={DG.border} />
      <Torso skin={DG.skin} shade={DG.shade} b={b} female />
      <path d={`M-104 ${-680 + b} L-30 ${-700 + b} L104 -480 L60 -470Z`} fill={DG.saree} />
      <path d={`M-30 ${-700 + b} L104 -480 L110 -494 L-14 ${-712 + b}Z`} fill={DG.border} />
      <Necklace b={b} />
      {/* front arms: trishul thrusting down (strike 0..1) and lotus */}
      <Arm s={[-116, -672 + b]} h={fh} a={160} b={150} bend={0} skin={DG.skin} shade={DG.shade} w={38} band={DG.border} />
      <g transform={plant !== undefined ? `translate(-210 ${-300 + plant * 180})` : `translate(${fh[0]} ${fh[1]}) rotate(${-8 + strike * 36})`}><Trishul len={420} /></g>
      <Arm s={[116, -672 + b]} h={rh} a={160} b={150} bend={0} skin={DG.skin} shade={DG.shade} w={38} band={DG.border} />
      {raise > 0.5 && <path d={`M${handOf([116, -672 + b], rh, 160, 150)[0]} ${handOf([116, -672 + b], rh, 160, 150)[1] - 16} l0 -52`} stroke={DG.skin} strokeWidth={13} strokeLinecap="round" />}
      <rect x={-24} y={-740} width={48} height={50} fill={DG.skin} />
      <path d="M-74 -820 Q-96 -700 -110 -560 L-60 -600 Q-66 -720 -54 -800Z M74 -820 Q96 -700 110 -560 L60 -600 Q66 -720 54 -800Z" fill="#14100e" />
      <Face t={t} seed={17} skin={DG.skin} shade={DG.shade} thirdEye female tilak={null} anger={Math.max(strike * 0.6, anger)} />
      {roar > 0.05 && <ellipse cx={0} cy={-764} rx={15} ry={4 + 13 * roar} fill="#5a0a14" />}
      <path d="M-62 -846 L62 -846 L50 -910 L26 -890 L0 -950 L-26 -890 L-50 -910Z" fill={DG.border} stroke="#a8761c" strokeWidth={3} />
      <circle cx={0} cy={-880} r={10} fill="#d4263a" />
    </g>
  );
};

export const Mahishasura: React.FC<{ fallen?: number }> = ({ fallen = 1 }) => (
  <g transform={`rotate(${-90 * fallen} 0 0)`} opacity={0.95}>
    <path d="M-110 0 L110 0 L96 -460 L-96 -460Z" fill="#2a2030" />
    <path d="M-120 -460 L120 -460 L130 -680 Q0 -710 -130 -680Z" fill="#3a2e44" />
    <g transform="translate(0 -790)">
      <path d="M-100 -30 Q-190 -40 -210 -130 Q-150 -100 -96 -80Z M100 -30 Q190 -40 210 -130 Q150 -100 96 -80Z" fill="#d8ccb4" />
      <ellipse rx={84} ry={92} fill="#2c2234" />
      <ellipse cy={56} rx={56} ry={36} fill="#3c3046" />
    </g>
  </g>
);

// ---------------------------------------------------------------- Brahma (four heads, four arms, seated on a lotus)

const BR = { skin: "#e6a868", shade: "#a8703c", robe: "#c0392b", border: "#f2bb4b", beard: "#f1ece2" };

export const Brahma: React.FC<{ t: number; bless?: number }> = ({ t, bless = 0 }) => {
  const b = Math.sin(t * 1.6) * 3;
  const head = (x: number, s: number, seed: number) => (
    <g transform={`translate(${x} ${-790 + b}) scale(${s}) translate(0 790)`}>
      <Face t={t} seed={seed} skin={BR.skin} shade={BR.shade} calm tilak="u" earrings={BR.border} />
      <path d="M-50 -770 Q-40 -650 0 -630 Q40 -650 50 -770 Q20 -740 0 -742 Q-20 -740 -50 -770Z" fill={BR.beard} />
      <path d="M-48 -846 L48 -846 L36 -920 L0 -950 L-36 -920Z" fill={BR.border} stroke="#a8761c" strokeWidth={3} />
    </g>
  );
  return (
    <g>
      {/* lotus seat */}
      {[-3, -2, -1, 0, 1, 2, 3].map((k) => <path key={k} d="M0 0 Q-60 -80 0 -170 Q60 -80 0 0Z" fill={k % 2 ? "#f28bb0" : "#f6a8c6"} stroke="#c45a86" strokeWidth={3} transform={`translate(${k * 60} 0) rotate(${k * 8})`} />)}
      <ellipse cx={0} cy={-150} rx={230} ry={70} fill={BR.robe} />
      <path d="M-200 -150 Q0 -100 200 -150 L180 -190 Q0 -150 -180 -190Z" fill={BR.border} />
      {/* back arms: palm-leaf Vedas and rosary */}
      <Arm s={[-100, -560 + b]} h={[-280, -720]} a={150} b={140} bend={0} skin={BR.skin} shade={BR.shade} w={34} band={BR.border} />
      <Arm s={[100, -560 + b]} h={[280, -720]} a={150} b={140} bend={0} skin={BR.skin} shade={BR.shade} w={34} band={BR.border} />
      <g transform="translate(-280 -740)"><rect x={-50} y={-14} width={100} height={28} rx={8} fill="#e9cb86" stroke="#8a5a2a" strokeWidth={3} /></g>
      <g transform="translate(280 -720)">{new Array(10).fill(0).map((_, i) => <circle key={i} cx={Math.cos(i * 0.63) * 30} cy={Math.sin(i * 0.63) * 30} r={7} fill="#7a3a1a" />)}</g>
      <path d="M-120 -160 L120 -160 L110 -560 Q0 -590 -110 -560Z" fill={BR.skin} stroke={BR.shade} strokeWidth={4} />
      <path d="M-110 -560 L-20 -580 L120 -200 L60 -160Z" fill={BR.robe} />
      <Necklace b={b - 120} />
      {/* front arms: blessing hand (raises with `bless`) and water pot */}
      <Arm s={[-112, -560 + b]} h={[-150 - bless * 40, -330 - bless * 260]} a={150} b={140} bend={0} skin={BR.skin} shade={BR.shade} w={36} band={BR.border} />
      <Arm s={[112, -560 + b]} h={[150, -280]} a={150} b={140} bend={0} skin={BR.skin} shade={BR.shade} w={36} band={BR.border} />
      <g transform="translate(160 -250)"><path d="M-30 0 Q-40 50 0 60 Q40 50 30 0 Q20 -20 0 -24 Q-20 -20 -30 0Z" fill="#b8862e" stroke="#7a521a" strokeWidth={3} /></g>
      {bless > 0 && <circle cx={-150 - bless * 40} cy={-330 - bless * 260} r={60 * bless} fill="#ffe9a8" opacity={0.5} />}
      {/* four heads: three visible (the fourth faces away) */}
      {head(-110, 0.82, 21)}
      {head(110, 0.82, 23)}
      <g transform="translate(0 110)">{head(0, 1, 19)}</g>
    </g>
  );
};

// ---------------------------------------------------------------- Shiva

const SH = { skin: "#8ea6c4", shade: "#5a6f8e", tiger: "#e08a2a", hair: "#2a1e18" };

export const Shiva: React.FC<{ t: number; rHand?: P; lHand?: P; glow?: number; calm?: boolean }> = ({ t, rHand = [-170, -390], lHand = [190, -560], glow = 0, calm = false }) => {
  const b = Math.sin(t * 1.8) * 3;
  const lH = handOf([116, -672 + b], lHand, 160, 150);
  return (
    <g>
      {glow > 0 && <ellipse cx={0} cy={-520} rx={300} ry={520} fill="#bfe0ff" opacity={0.22 * glow} />}
      <Shadow />
      <g transform={`translate(${lH[0]} ${lH[1] + 440})`}><Trishul len={700} /></g>
      {/* tiger-skin loincloth */}
      <path d="M-58 -60 L-72 -8 L-20 -8 L-26 -60Z M58 -60 L72 -8 L20 -8 L26 -60Z" fill={SH.skin} stroke={SH.shade} strokeWidth={3} />
      <path d="M-100 -470 L100 -470 L120 -150 L-120 -150Z" fill={SH.tiger} />
      {[[-60, -400], [10, -330], [60, -420], [-30, -250], [50, -220]].map(([x, y], i) => <path key={i} d={`M${x - 16} ${y} q16 -10 32 0`} stroke="#3a1e0a" strokeWidth={8} fill="none" />)}
      <path d="M-120 -150 L120 -150 L100 -100 L-100 -100Z" fill={SH.skin} />
      <path d="M-100 -100 L-20 -100 L-26 -60 L-58 -60Z M100 -100 L20 -100 L26 -60 L58 -60Z" fill={SH.skin} />
      <Torso skin={SH.skin} shade={SH.shade} b={b} />
      {/* rudraksha mala and the serpent around the neck */}
      {new Array(13).fill(0).map((_, i) => { const k = i / 12; return <circle key={i} cx={-70 + k * 140} cy={-690 + b + Math.sin(k * Math.PI) * 110} r={9} fill="#5a2a14" />; })}
      <path d={`M-80 ${-700 + b} Q0 ${-640 + b} 80 ${-700 + b} Q100 ${-740 + b} 120 ${-720 + b}`} stroke="#3f7a3a" strokeWidth={16} fill="none" strokeLinecap="round" />
      <circle cx={122} cy={-722 + b} r={13} fill="#3f7a3a" />
      <Arm s={[-116, -672 + b]} h={rHand} a={160} b={150} bend={0} skin={SH.skin} shade={SH.shade} w={42} band="#5a2a14" />
      <Arm s={[116, -672 + b]} h={lHand} a={160} b={150} bend={0} skin={SH.skin} shade={SH.shade} w={42} band="#5a2a14" />
      <rect x={-24} y={-740} width={48} height={50} fill={SH.skin} />
      <path d="M-78 -820 Q-110 -680 -100 -560 L-60 -620 Q-66 -720 -56 -800Z M78 -820 Q110 -680 100 -560 L60 -620 Q66 -720 56 -800Z" fill={SH.hair} />
      <Face t={t} seed={29} skin={SH.skin} shade={SH.shade} thirdEye tilak="ash" calm={calm} earrings="#c9a46a" />
      {/* matted hair piled high, crescent moon, Ganga's spray */}
      <path d="M-60 -840 Q-70 -940 -20 -980 Q0 -1010 20 -980 Q70 -940 60 -840 Q0 -870 -60 -840Z" fill={SH.hair} />
      <path d="M30 -960 Q70 -950 64 -910 Q50 -940 24 -940Z" fill="#f4f1ea" />
      <path d="M0 -1000 Q-20 -1060 10 -1100" stroke="#bfe6ff" strokeWidth={8} fill="none" opacity={0.8} />
    </g>
  );
};

// ---------------------------------------------------------------- Vishnu (four arms: chakra, conch, gada, lotus)

const VI = { skin: "#2f62c8", shade: "#1d3f8a", silk: "#f2b81d", border: "#d4263a" };

export const Vishnu: React.FC<{ t: number; glow?: number; bless?: number }> = ({ t, glow = 0, bless = 0 }) => {
  const b = Math.sin(t * 1.8) * 3;
  return (
    <g>
      {glow > 0 && <ellipse cx={0} cy={-560} rx={330} ry={540} fill="#ffe9a8" opacity={0.22 * glow} />}
      <Shadow />
      <Arm s={[-100, -660 + b]} h={[-280, -860]} a={150} b={140} bend={0} skin={VI.skin} shade={VI.shade} w={34} band={VI.silk} />
      <Arm s={[100, -660 + b]} h={[280, -860]} a={150} b={140} bend={0} skin={VI.skin} shade={VI.shade} w={34} band={VI.silk} />
      <g transform="translate(-280 -900)"><Chakra t={t} r={40} /></g>
      <g transform="translate(280 -890)"><Conch /></g>
      <Dhoti c={VI.silk} border={VI.border} skin={VI.skin} shade={VI.shade} />
      <Torso skin={VI.skin} shade={VI.shade} b={b} />
      <path d={`M-126 ${-680 + b} L-50 ${-702 + b} L100 -500 L60 -470Z`} fill={VI.silk} />
      <Necklace b={b} />
      {/* vanamala garland to the knees */}
      <path d={`M-90 ${-690 + b} Q-110 -300 0 -260 Q110 -300 90 ${-690 + b}`} stroke="#3f8f3a" strokeWidth={10} fill="none" strokeDasharray="4 12" strokeLinecap="round" />
      <Arm s={[-116, -672 + b]} h={[-180, -360]} a={160} b={150} bend={0} skin={VI.skin} shade={VI.shade} w={40} band={VI.silk} />
      <g transform="translate(-186 -360)"><rect x={-8} y={-30} width={16} height={330} rx={6} fill="#c99a3a" /><circle cx={0} cy={-40} r={42} fill="#f2bb4b" stroke="#a8761c" strokeWidth={4} /></g>
      <Arm s={[116, -672 + b]} h={[160 + bless * 20, -460 - bless * 200]} a={160} b={150} bend={0} skin={VI.skin} shade={VI.shade} w={40} band={VI.silk} />
      <g transform={`translate(${160 + bless * 20} ${-500 - bless * 200})`}><Lotus s={1.1} /></g>
      <rect x={-24} y={-740} width={48} height={50} fill={VI.skin} />
      <path d="M-72 -820 Q-92 -700 -96 -620 L-60 -640 Q-64 -720 -54 -800Z M72 -820 Q92 -700 96 -620 L60 -640 Q64 -720 54 -800Z" fill="#14100e" />
      <Face t={t} seed={31} skin={VI.skin} shade={VI.shade} tilak="u" earrings="#f2bb4b" />
      {/* tall kirita crown */}
      <path d="M-58 -846 L58 -846 L50 -900 L40 -1000 L0 -1050 L-40 -1000 L-50 -900Z" fill="#f2bb4b" stroke="#a8761c" strokeWidth={3} />
      <circle cx={0} cy={-880} r={12} fill={VI.border} /><circle cx={0} cy={-950} r={9} fill="#2f8f5a" />
    </g>
  );
};

// ---------------------------------------------------------------- Mohini (Vishnu's enchanting form: same blue tint, same crown jewel)

const MO = { skin: "#9fb3ea", shade: "#6a7ec0", saree: "#2f8f6a", border: "#f2bb4b" };

export const Mohini: React.FC<{ t: number; glow?: number }> = ({ t, glow = 0.6 }) => {
  const b = Math.sin(t * 2) * 3;
  return (
    <g>
      {glow > 0 && <ellipse cx={0} cy={-560} rx={300} ry={520} fill="#ffd6f0" opacity={0.25 * glow} />}
      <Shadow w={150} />
      <path d="M-120 0 L120 0 L96 -470 L-96 -470Z" fill={MO.saree} />
      <path d="M-120 0 L120 0 L116 -30 L-116 -30Z M-20 -470 L20 -470 L40 0 L0 0Z" fill={MO.border} />
      <Torso skin={MO.skin} shade={MO.shade} b={b} wide={0.85} female />
      <path d={`M-88 ${-680 + b} L-24 ${-700 + b} L90 -480 L52 -470Z`} fill={MO.saree} />
      <path d={`M-24 ${-700 + b} L90 -480 L96 -494 L-8 ${-712 + b}Z`} fill={MO.border} />
      <Necklace b={b} w={56} />
      <Arm s={[-98, -672 + b]} h={[-150, -400]} a={160} b={150} bend={0} skin={MO.skin} shade={MO.shade} w={30} band={MO.border} />
      <Arm s={[98, -672 + b]} h={[120, -620]} a={150} b={140} bend={0} skin={MO.skin} shade={MO.shade} w={30} band={MO.border} />
      <g transform="translate(118 -640)"><Lotus s={0.8} /></g>
      <rect x={-20} y={-740} width={40} height={50} fill={MO.skin} />
      <path d="M-70 -830 Q-110 -660 -80 -470 L-40 -520 Q-60 -700 -50 -800Z M70 -830 Q110 -660 80 -470 L40 -520 Q60 -700 50 -800Z" fill="#14100e" />
      <Face t={t} seed={37} skin={MO.skin} shade={MO.shade} female r={56} tilak="dot" earrings="#f2bb4b" />
      <path d="M-56 -850 Q0 -900 56 -850 L46 -880 Q0 -912 -46 -880Z" fill="#14100e" />
      {/* the same green jewel as Vishnu's crown: the visual clue that Mohini is Vishnu */}
      <path d="M-44 -858 Q0 -890 44 -858" stroke="#f2bb4b" strokeWidth={8} fill="none" />
      <circle cx={0} cy={-878} r={11} fill="#2f8f5a" stroke="#f2bb4b" strokeWidth={3} />
    </g>
  );
};

// ---------------------------------------------------------------- the king of Pandalam

const KG = { skin: "#d39a64", shade: "#9a6838", robe: "#f2ece0", border: "#c99a3a" };

export const PandalamKing: React.FC<{ t: number; rHand?: P; lHand?: P }> = ({ t, rHand = [-120, -420], lHand = [120, -420] }) => {
  const b = Math.sin(t * 2) * 3;
  return (
    <g>
      <Shadow />
      <Dhoti c={KG.robe} border={KG.border} skin={KG.skin} shade={KG.shade} />
      <Torso skin={KG.skin} shade={KG.shade} b={b} />
      <path d={`M-126 ${-680 + b} L-50 ${-702 + b} L100 -500 L60 -470Z`} fill={KG.robe} />
      <path d={`M-50 ${-702 + b} L100 -500 L108 -514 L-34 ${-714 + b}Z`} fill={KG.border} />
      <Necklace b={b} c={KG.border} />
      <Arm s={[-116, -672 + b]} h={rHand} a={160} b={150} bend={0} skin={KG.skin} shade={KG.shade} w={40} band={KG.border} />
      <Arm s={[116, -672 + b]} h={lHand} a={160} b={150} bend={0} skin={KG.skin} shade={KG.shade} w={40} band={KG.border} />
      <rect x={-24} y={-740} width={48} height={50} fill={KG.skin} />
      <Face t={t} seed={41} skin={KG.skin} shade={KG.shade} tilak="ash" earrings={KG.border} />
      <path d="M-34 -742 Q-16 -756 0 -748 Q16 -756 34 -742 Q16 -736 0 -742 Q-16 -736 -34 -742Z" fill="#cfc8bc" />
      {/* Kerala-style royal head cloth with a gold band */}
      <path d="M-62 -840 Q-66 -900 0 -910 Q66 -900 62 -840 Q0 -860 -62 -840Z" fill="#f2ece0" stroke={KG.border} strokeWidth={3} />
      <rect x={-62} y={-852} width={124} height={14} rx={6} fill={KG.border} />
      <circle cx={0} cy={-880} r={10} fill="#d4263a" />
    </g>
  );
};
