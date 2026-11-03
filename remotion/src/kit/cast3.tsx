/**
 * Cast 3: Kumbhakarna, Valmiki, vanara soldiers, and the scale props for the "how tall was Kumbhakarna" reel
 * (Burj Khalifa, Eiffel Tower, palm-leaf manuscript, balance, elephant, Lanka skyline, Earth).
 * Same conventions as ./cast: origin between the feet on the ground, up is negative y, an adult is ~840 tall at scale 1,
 * rHand = the character's right hand = viewer's LEFT. `t` drives blinks and breathing; mouths stay closed (narration).
 */
import React from "react";
import { Arm, blinkAt, handOf, type P } from "./cast";

const rnd = (s: number) => {
  const x = Math.sin(s * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// ---------------------------------------------------------------- Kumbhakarna

const KK = {
  skin: "#56677c", shade: "#36424f", dhoti: "#8e1b22", dhotiD: "#5e1016", gold: "#e0a83a", goldD: "#9a6a16",
  hair: "#120d10", eye: "#f3d36b", pupil: "#5a0d0d", tusk: "#f1e6cc", iron: "#3c3c48", ironD: "#22222a", ash: "#e8e2d6",
};

export const Gada: React.FC<{ len?: number }> = ({ len = 470 }) => (
  <g>
    <rect x={-60} y={-14} width={len + 60} height={28} rx={12} fill="#5a3a22" stroke="#3a2412" strokeWidth={4} />
    {[0.05, 0.45, 0.85].map((k) => <rect key={k} x={len * k - 10} y={-20} width={26} height={40} rx={6} fill={KK.gold} stroke={KK.goldD} strokeWidth={3} />)}
    <g transform={`translate(${len + 70} 0)`}>
      {[...Array(10)].map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return <path key={i} d={`M${Math.cos(a - 0.18) * 84} ${Math.sin(a - 0.18) * 84} L${Math.cos(a) * 128} ${Math.sin(a) * 128} L${Math.cos(a + 0.18) * 84} ${Math.sin(a + 0.18) * 84}Z`} fill={KK.ironD} />;
      })}
      <circle r={95} fill={KK.iron} stroke={KK.ironD} strokeWidth={6} />
      <path d="M-60 -50 Q0 -88 60 -50" stroke="#6a6a78" strokeWidth={10} fill="none" strokeLinecap="round" />
      <circle r={30} fill={KK.gold} stroke={KK.goldD} strokeWidth={4} />
    </g>
  </g>
);

export type KumbhaPose = {
  t: number;
  rHand?: P;
  lHand?: P;
  gadaIn?: "r" | "l" | null;
  propRot?: number;
  anger?: number;
  sleepy?: number; // 0 awake .. 1 eyes almost shut
  lookX?: number;
  lookY?: number;
  headTilt?: number; // degrees, + = chin down toward his left
  glow?: number;
  stepR?: number; // lifts his right foot (viewer left) 0..1
  smirk?: number;
};

export const Kumbhakarna: React.FC<KumbhaPose> = ({
  t, rHand = [-300, -470], lHand = [300, -470], gadaIn = "l", propRot = -78, anger = 0.3, sleepy = 0, lookX = 0, lookY = 0,
  headTilt = 0, glow = 0, stepR = 0, smirk = 0,
}) => {
  const b = Math.sin(t * 1.3) * 5;
  const open = Math.min(blinkAt(t, 5), 1 - sleepy * 0.85);
  const rS: P = [-212, -786 + b];
  const lS: P = [212, -786 + b];
  const rH = handOf(rS, rHand, 230, 215);
  const lH = handOf(lS, lHand, 230, 215);
  const lift = stepR * 130;
  const gada = gadaIn && (
    <g transform={`translate(${(gadaIn === "r" ? rH : lH)[0]} ${(gadaIn === "r" ? rH : lH)[1]}) rotate(${propRot})`}>
      <Gada />
    </g>
  );
  return (
    <g>
      {glow > 0 && (
        <g opacity={glow}>
          <ellipse cx={0} cy={-560} rx={430} ry={640} fill="#ff5a2a" opacity={0.14} />
          <ellipse cx={0} cy={-560} rx={320} ry={520} fill="#ffb25a" opacity={0.12} />
        </g>
      )}
      <ellipse cx={0} cy={6} rx={300} ry={34} fill="#000" opacity={0.35} />
      {/* legs: shins below the dhoti, then feet; the right leg can lift for a step */}
      <g transform={`translate(0 ${-lift})`}>
        <path d="M-160 -280 L-66 -280 L-62 -44 L-146 -44Z" fill={KK.skin} stroke={KK.shade} strokeWidth={5} />
        <path d="M-112 -270 L-104 -60" stroke={KK.shade} strokeWidth={5} opacity={0.35} />
        <rect x={-152} y={-80} width={94} height={20} rx={9} fill={KK.gold} stroke={KK.goldD} strokeWidth={3} />
        <path d="M-166 -48 L-48 -48 Q-24 -14 -36 0 L-196 0 Q-208 -28 -166 -48Z" fill={KK.skin} stroke={KK.shade} strokeWidth={5} />
        {[-176, -150, -124, -98].map((x) => <path key={x} d={`M${x} -6 L${x} 0`} stroke={KK.shade} strokeWidth={4} />)}
      </g>
      <path d="M160 -280 L66 -280 L62 -44 L146 -44Z" fill={KK.skin} stroke={KK.shade} strokeWidth={5} />
      <path d="M112 -270 L104 -60" stroke={KK.shade} strokeWidth={5} opacity={0.35} />
      <rect x={58} y={-80} width={94} height={20} rx={9} fill={KK.gold} stroke={KK.goldD} strokeWidth={3} />
      <path d="M166 -48 L48 -48 Q24 -14 36 0 L196 0 Q208 -28 166 -48Z" fill={KK.skin} stroke={KK.shade} strokeWidth={5} />
      {[176, 150, 124, 98].map((x) => <path key={x} d={`M${x} -6 L${x} 0`} stroke={KK.shade} strokeWidth={4} />)}
      {/* dhoti */}
      <path d="M-212 -548 L212 -548 L258 -268 L62 -256 L0 -390 L-62 -256 L-258 -268Z" fill={KK.dhoti} />
      <path d="M-258 -268 L-62 -256 L-60 -288 L-252 -300Z M258 -268 L62 -256 L60 -288 L252 -300Z" fill={KK.gold} />
      <path d="M-120 -540 L-170 -290 M-40 -540 L-30 -400 M60 -540 L120 -290 M150 -540 L210 -300" stroke={KK.dhotiD} strokeWidth={8} opacity={0.6} />
      {gadaIn === "r" && propRot > 0 && gada}
      {/* torso + belly */}
      <path d={`M-232 ${-786 + b} Q0 ${-832 + b} 232 ${-786 + b} L214 -610 L-214 -610Z`} fill={KK.skin} stroke={KK.shade} strokeWidth={5} />
      <ellipse cx={0} cy={-600 + b * 0.5} rx={232} ry={176} fill={KK.skin} stroke={KK.shade} strokeWidth={5} />
      <path d={`M70 ${-770 + b} Q240 -690 214 -530 Q190 -460 130 -440 Q206 -560 70 ${-770 + b}Z`} fill={KK.shade} opacity={0.35} />
      <path d={`M-150 ${-744 + b} Q-84 ${-700 + b} -18 ${-736 + b} M150 ${-744 + b} Q84 ${-700 + b} 18 ${-736 + b}`} stroke={KK.shade} strokeWidth={6} fill="none" opacity={0.55} />
      <path d="M-12 -588 Q0 -576 12 -588" stroke={KK.shade} strokeWidth={6} fill="none" />
      <path d="M-226 -470 Q0 -424 226 -470 L222 -438 Q0 -392 -222 -438Z" fill={KK.gold} stroke={KK.goldD} strokeWidth={3} />
      {/* necklace */}
      <path d={`M-118 ${-800 + b} Q0 ${-690 + b} 118 ${-800 + b}`} stroke={KK.gold} strokeWidth={14} fill="none" />
      {[...Array(9)].map((_, i) => {
        const k = (i + 1) / 10;
        const x = -118 + 236 * k;
        const y = -800 + b + 4 * (1 - (2 * k - 1) ** 2) * 27.5;
        return <circle key={i} cx={x} cy={y} r={9} fill="#7a2a1a" stroke={KK.goldD} strokeWidth={2} />;
      })}
      <circle cx={0} cy={-722 + b} r={20} fill="#d4263a" stroke={KK.gold} strokeWidth={6} />
      {/* arms */}
      <Arm s={rS} h={rHand} a={230} b={215} bend={0} skin={KK.skin} shade={KK.shade} w={82} />
      {!(gadaIn === "r" && propRot > 0) && gadaIn === "r" && gada}
      <Arm s={lS} h={lHand} a={230} b={215} bend={0} skin={KK.skin} shade={KK.shade} w={82} />
      {gadaIn === "l" && gada}
      {/* head */}
      <g transform={`rotate(${headTilt} 0 -840)`}>
        <rect x={-56} y={-870} width={112} height={80} fill={KK.skin} />
        {[-1, 1].map((s) => (
          <path key={s} transform={`scale(${s} 1)`} d="M-80 -960 L-150 -930 L-120 -905 L-176 -870 L-126 -858 L-160 -812 L-100 -826 L-118 -780 L-70 -810Z" fill={KK.hair} />
        ))}
        {[-1, 1].map((s) => (
          <g key={s}>
            <ellipse cx={s * 100} cy={-905} rx={22} ry={38} fill={KK.skin} stroke={KK.shade} strokeWidth={4} />
            <circle cx={s * 106} cy={-858} r={22} fill="none" stroke={KK.gold} strokeWidth={9} />
          </g>
        ))}
        <path d="M-96 -962 Q-104 -862 -62 -818 Q0 -786 62 -818 Q104 -862 96 -962 Q0 -1012 -96 -962Z" fill={KK.skin} stroke={KK.shade} strokeWidth={5} />
        <path d="M30 -1000 Q100 -960 90 -880 Q80 -830 50 -816 Q80 -900 30 -1000Z" fill={KK.shade} opacity={0.3} />
        {/* tripundra (three ash lines) + red dot */}
        {[0, 1, 2].map((k) => <path key={k} d={`M-44 ${-962 + k * 11} Q0 ${-968 + k * 11} 44 ${-962 + k * 11}`} stroke={KK.ash} strokeWidth={5} fill="none" opacity={0.9} strokeLinecap="round" />)}
        <circle cx={0} cy={-950} r={6} fill="#d4263a" />
        {/* eyes: heavy lids */}
        {[-1, 1].map((s) => {
          const cx = s * 38;
          return (
            <g key={s}>
              <path d={`M${cx - 26} -912 Q${cx} ${-912 - 20 * open} ${cx + 26} -912 Q${cx} ${-912 + 12 * open} ${cx - 26} -912Z`} fill={KK.eye} />
              {open > 0.15 && <circle cx={cx + lookX * 8} cy={-912 + lookY * 5} r={8.5 * Math.min(1, open + 0.2)} fill={KK.pupil} />}
              <path d={`M${cx - 30} -914 Q${cx} ${-916 - 22 * open} ${cx + 30} -914`} stroke={KK.shade} strokeWidth={7} fill="none" strokeLinecap="round" />
              <path d={`M${s * 12} ${-944 + anger * 8} L${s * 70} ${-956 - anger * 12}`} stroke={KK.hair} strokeWidth={16} strokeLinecap="round" />
            </g>
          );
        })}
        <path d="M0 -910 L-28 -864 Q0 -852 28 -864Z" fill={KK.shade} opacity={0.6} />
        <path d="M-72 -836 Q-40 -860 0 -846 Q40 -860 72 -836 Q84 -850 92 -864 Q88 -828 62 -830 Q30 -844 0 -836 Q-30 -844 -62 -830 Q-88 -828 -92 -864 Q-84 -850 -72 -836Z" fill={KK.hair} />
        <path d={`M-30 -820 Q0 ${-814 - smirk * 6} 30 ${-822 - smirk * 8}`} stroke="#2a0d10" strokeWidth={6} fill="none" strokeLinecap="round" />
        {[-1, 1].map((s) => <path key={s} d={`M${s * 24} -820 L${s * 18} -796 L${s * 11} -819Z`} fill={KK.tusk} stroke="#b8a888" strokeWidth={2} />)}
        {/* crown */}
        <path d="M-94 -972 L94 -972 L88 -1006 L-88 -1006Z" fill={KK.gold} stroke={KK.goldD} strokeWidth={4} />
        {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${i * 26 - 13} -1004 L${i * 26} ${-1004 - (i === 0 ? 86 : Math.abs(i) % 2 ? 48 : 64)} L${i * 26 + 13} -1004Z`} fill={KK.gold} stroke={KK.goldD} strokeWidth={3} />
        ))}
        <circle cx={0} cy={-989} r={12} fill="#d4263a" stroke={KK.goldD} strokeWidth={3} />
        {[-60, 60].map((x) => <circle key={x} cx={x} cy={-989} r={7} fill="#1d6a4a" />)}
      </g>
    </g>
  );
};

/** X-ray view of his right shin (viewer left) in Kumbhakarna's local coords: blue flesh, bone, cracks drawn in by `crack`. */
export const KumbhaShinXray: React.FC<{ on: number; crack: number; lift?: number }> = ({ on, crack, lift = 0 }) => {
  const zig = "M-110 -230 L-96 -205 L-118 -180 L-94 -150 L-114 -128 L-100 -100";
  const zig2 = "M-108 -140 L-130 -120 M-100 -170 L-80 -160";
  return (
    <g transform={`translate(0 ${-lift * 130})`} opacity={on}>
      <path d="M-160 -280 L-66 -280 L-62 -44 L-146 -44Z" fill="#0c2846" opacity={0.85} />
      <path d="M-166 -48 L-48 -48 Q-24 -14 -36 0 L-196 0 Q-208 -28 -166 -48Z" fill="#0c2846" opacity={0.85} />
      <rect x={-122} y={-276} width={26} height={226} rx={12} fill="#e8f4ff" />
      <ellipse cx={-109} cy={-270} rx={26} ry={14} fill="#e8f4ff" />
      <ellipse cx={-109} cy={-54} rx={24} ry={12} fill="#e8f4ff" />
      <rect x={-140} y={-262} width={10} height={200} rx={5} fill="#cfe4f8" />
      <path d={zig} stroke="#ff3a2a" strokeWidth={7} fill="none" strokeLinejoin="round" strokeDasharray={240} strokeDashoffset={240 * (1 - crack)} />
      <path d={zig} stroke="#ffd0a0" strokeWidth={2.5} fill="none" strokeDasharray={240} strokeDashoffset={240 * (1 - crack)} />
      <path d={zig2} stroke="#ff3a2a" strokeWidth={5} fill="none" opacity={crack > 0.6 ? (crack - 0.6) / 0.4 : 0} />
      {crack > 0.2 && <ellipse cx={-109} cy={-165} rx={60} ry={80} fill="#ff4a2a" opacity={0.25 * crack} />}
    </g>
  );
};

/** The outline of his body as a column (feet to crown), for the "like a pillar" shot. */
export const KUMBHA_COLUMN = "M-262 0 L-262 -300 Q-262 -560 -236 -790 Q-120 -840 -100 -1000 L100 -1000 Q120 -840 236 -790 Q262 -560 262 -300 L262 0Z";

// ---------------------------------------------------------------- Valmiki (seated, writing)

const VA = { skin: "#c98d5e", shade: "#8e5b33", robe: "#e58a28", robeD: "#b0621a", beard: "#f3efe6", hair: "#e6dfd2", leaf: "#d9b46a", leafD: "#9a7a3a" };

export const PalmLeaf: React.FC<{ w?: number; lines?: number; glow?: number }> = ({ w = 300, lines = 0, glow = 0 }) => (
  <g>
    {glow > 0 && <rect x={-w / 2 - 20} y={-46} width={w + 40} height={92} rx={40} fill="#ffd27a" opacity={0.35 * glow} />}
    <rect x={-w / 2} y={-26} width={w} height={52} rx={22} fill={VA.leaf} stroke={VA.leafD} strokeWidth={3} />
    <circle cx={-w / 2 + 40} cy={0} r={5} fill={VA.leafD} />
    <circle cx={w / 2 - 40} cy={0} r={5} fill={VA.leafD} />
    {[0, 1, 2].map((r) => {
      const k = Math.max(0, Math.min(1, lines * 3 - r));
      if (k <= 0) return null;
      const x0 = -w / 2 + 56;
      const len = (w - 112) * k;
      let d = `M${x0} ${-12 + r * 12}`;
      for (let x = 10; x <= len; x += 10) d += ` L${x0 + x} ${-12 + r * 12 + (rnd(r * 40 + x) - 0.5) * 6}`;
      return <path key={r} d={d} stroke={glow > 0 ? "#7a3a08" : "#5a3a12"} strokeWidth={3} fill="none" strokeLinecap="round" />;
    })}
  </g>
);

export const Valmiki: React.FC<{ t: number; write?: number; lines?: number; glow?: number; lookUp?: number }> = ({ t, write = 1, lines = 0.5, glow = 0, lookUp = 0 }) => {
  const b = Math.sin(t * 1.6) * 2;
  const wob = write * Math.sin(t * 9) * 8;
  const rS: P = [-104, -360 + b];
  const lS: P = [104, -360 + b];
  const leafAt: P = [70, -205];
  const penAt: P = [-10 + wob, -222 + Math.abs(wob) * 0.3];
  return (
    <g>
      {glow > 0 && <ellipse cx={0} cy={-300} rx={330} ry={360} fill="#ffcf7a" opacity={0.18 * glow} />}
      <ellipse cx={0} cy={6} rx={260} ry={26} fill="#000" opacity={0.3} />
      {/* crossed legs */}
      <path d="M-240 -6 Q-250 -100 -120 -118 L120 -118 Q250 -100 240 -6 Q0 22 -240 -6Z" fill={VA.robe} />
      <path d="M-200 -40 Q-60 -90 60 -40 M200 -40 Q60 -90 -60 -40" stroke={VA.robeD} strokeWidth={8} fill="none" opacity={0.6} />
      <ellipse cx={-150} cy={-24} rx={46} ry={18} fill={VA.skin} stroke={VA.shade} strokeWidth={3} />
      <ellipse cx={150} cy={-24} rx={46} ry={18} fill={VA.skin} stroke={VA.shade} strokeWidth={3} />
      {/* torso: robe over his left shoulder, right shoulder bare */}
      <path d={`M-126 -118 L126 -118 L112 ${-380 + b} Q0 ${-400 + b} -112 ${-380 + b}Z`} fill={VA.skin} stroke={VA.shade} strokeWidth={3} />
      <path d={`M-40 -118 L126 -118 L112 ${-380 + b} Q60 ${-396 + b} 10 ${-392 + b} L-80 ${-260 + b} Q-70 -180 -40 -118Z`} fill={VA.robe} />
      <path d={`M10 ${-392 + b} L-80 ${-260 + b}`} stroke={VA.robeD} strokeWidth={10} />
      {/* mala */}
      {[...Array(11)].map((_, i) => {
        const k = i / 10;
        return <circle key={i} cx={-60 + 120 * k} cy={-384 + b + 70 * (1 - (2 * k - 1) ** 2)} r={7} fill="#6a2a12" />;
      })}
      {/* arms: left hand holds the leaf, right hand writes */}
      <Arm s={lS} h={[leafAt[0] + 70, leafAt[1] + 10]} a={140} b={130} bend={0} skin={VA.skin} shade={VA.shade} w={40} />
      <g transform={`translate(${leafAt[0]} ${leafAt[1]}) rotate(-6)`}>
        <PalmLeaf w={300} lines={lines} glow={glow} />
      </g>
      <Arm s={rS} h={penAt} a={140} b={130} bend={0} skin={VA.skin} shade={VA.shade} w={40} />
      <path d={`M${penAt[0] - 6} ${penAt[1] - 6} L${penAt[0] + 34} ${penAt[1] + 22}`} stroke="#3a2a1a" strokeWidth={6} strokeLinecap="round" />
      {/* head, looking down at the leaf */}
      <g transform={`rotate(${-lookUp * 10} 0 -400)`}>
        <rect x={-22} y={-420} width={44} height={40} fill={VA.skin} />
        <path d="M-58 -470 Q-70 -380 -66 -330 L-46 -360 Q-50 -420 -44 -460Z M58 -470 Q70 -380 66 -330 L46 -360 Q50 -420 44 -460Z" fill={VA.hair} />
        <ellipse cx={0} cy={-462} rx={50} ry={58} fill={VA.skin} stroke={VA.shade} strokeWidth={3} />
        <ellipse cx={0} cy={-532} rx={42} ry={32} fill={VA.hair} />
        <path d="M-38 -514 Q0 -500 38 -514" stroke={VA.robeD} strokeWidth={6} fill="none" />
        <path d="M-50 -470 Q-40 -508 0 -510 Q40 -508 50 -470 Q30 -496 0 -494 Q-30 -496 -50 -470Z" fill={VA.hair} />
        {[-1, 1].map((s) => (
          <path key={s} d={`M${s * 20 - 11} ${-460 - lookUp * 6} Q${s * 20} ${-454 - lookUp * 10} ${s * 20 + 11} ${-460 - lookUp * 6}`} stroke="#2a1508" strokeWidth={4} fill="none" strokeLinecap="round" />
        ))}
        <path d="M-6 -486 L6 -486 M-12 -494 L12 -494" stroke="#f3efe6" strokeWidth={3} />
        <circle cx={0} cy={-479} r={4} fill="#d4263a" />
        <path d="M-46 -444 Q-56 -360 0 -318 Q56 -360 46 -444 Q24 -426 0 -432 Q-24 -426 -46 -444Z" fill={VA.beard} />
        <path d="M-24 -440 Q0 -448 24 -440 Q0 -434 -24 -440Z" fill={VA.beard} stroke="#d8d2c6" strokeWidth={2} />
      </g>
    </g>
  );
};

// ---------------------------------------------------------------- vanara soldier

const VN = { fur: "#8a5a32", furD: "#5e3a1e", face: "#e6bc8e", faceD: "#b88a5e", cloth: "#b8322a" };

export const Vanara: React.FC<{ t: number; seed?: number; lookUp?: number; awe?: number; rHand?: P; lHand?: P; club?: boolean }> = ({
  t, seed = 0, lookUp = 0, awe = 0, rHand, lHand, club = true,
}) => {
  const b = Math.sin(t * 2.4 + seed) * 3;
  const open = blinkAt(t, seed + 2);
  const rS: P = [-62, -330 + b];
  const lS: P = [62, -330 + b];
  const rh: P = rHand ?? [-110, -200];
  const lh: P = lHand ?? [96, -230];
  const lH = handOf(lS, lh, 110, 100);
  return (
    <g>
      <ellipse cx={0} cy={4} rx={110} ry={16} fill="#000" opacity={0.3} />
      <path d={`M-40 -190 Q-170 -200 -160 -320 Q-150 -400 -100 ${-380 + Math.sin(t * 2 + seed) * 10}`} stroke={VN.furD} strokeWidth={18} fill="none" strokeLinecap="round" />
      <path d="M-60 -170 L-90 -10 L-36 -10 L-20 -150Z M60 -170 L90 -10 L36 -10 L20 -150Z" fill={VN.fur} stroke={VN.furD} strokeWidth={3} />
      <path d="M-96 -12 L-30 -12 L-26 0 L-104 0Z M96 -12 L30 -12 L26 0 L104 0Z" fill={VN.face} />
      <ellipse cx={0} cy={-260 + b} rx={82} ry={110} fill={VN.fur} stroke={VN.furD} strokeWidth={3} />
      <ellipse cx={0} cy={-250 + b} rx={48} ry={74} fill={VN.face} opacity={0.85} />
      <path d="M-80 -180 L80 -180 L70 -140 L-70 -140Z" fill={VN.cloth} />
      <Arm s={rS} h={rh} a={110} b={100} bend={0} skin={VN.fur} shade={VN.furD} w={30} />
      <Arm s={lS} h={lh} a={110} b={100} bend={0} skin={VN.fur} shade={VN.furD} w={30} />
      {club && (
        <g transform={`translate(${lH[0]} ${lH[1]}) rotate(-70)`}>
          <path d="M-20 -8 L150 -16 Q180 0 150 16 L-20 8Z" fill="#6a4424" stroke="#3a2412" strokeWidth={3} />
        </g>
      )}
      <g transform={`translate(0 ${-lookUp * 10}) rotate(${-lookUp * 6} 0 -370)`}>
        <circle cx={-58} cy={-430} r={20} fill={VN.face} stroke={VN.faceD} strokeWidth={3} />
        <circle cx={58} cy={-430} r={20} fill={VN.face} stroke={VN.faceD} strokeWidth={3} />
        <circle cx={0} cy={-432} r={62} fill={VN.fur} stroke={VN.furD} strokeWidth={3} />
        <path d="M-20 -494 L-8 -520 L4 -496 L18 -516 L22 -490Z" fill={VN.furD} />
        <path d="M-46 -440 Q-40 -470 0 -466 Q40 -470 46 -440 Q50 -400 30 -384 Q0 -372 -30 -384 Q-50 -400 -46 -440Z" fill={VN.face} />
        {[-1, 1].map((s) => (
          <g key={s}>
            <ellipse cx={s * 18} cy={-444} rx={9} ry={10 * open} fill="#fff8ec" />
            <circle cx={s * 18} cy={-444 - lookUp * 5} r={5 * open} fill="#1a0d06" />
          </g>
        ))}
        <path d="M-6 -420 L6 -420" stroke={VN.faceD} strokeWidth={4} strokeLinecap="round" />
        {awe > 0.05 ? <ellipse cx={0} cy={-398} rx={9 * awe + 3} ry={12 * awe + 2} fill="#3a0d0a" /> : <path d="M-12 -400 Q0 -394 12 -400" stroke="#5a2a1a" strokeWidth={4} fill="none" strokeLinecap="round" />}
      </g>
    </g>
  );
};

// ---------------------------------------------------------------- scale props (origin at the base, up is negative y)

export const BurjKhalifa: React.FC<{ h: number }> = ({ h }) => {
  const tiers: [number, number, number][] = [[0, 0.2, 0.085], [0.2, 0.38, 0.07], [0.38, 0.54, 0.056], [0.54, 0.68, 0.042], [0.68, 0.79, 0.029], [0.79, 0.87, 0.017]];
  return (
    <g>
      {tiers.map(([a, c, w], i) => (
        <g key={i}>
          <rect x={-w * h} y={-h * c} width={w * h * 2} height={h * (c - a) + 1} fill="#7f9fc4" />
          <rect x={0} y={-h * c} width={w * h} height={h * (c - a) + 1} fill="#55759a" />
          <rect x={-w * h} y={-h * c} width={w * h * 2} height={Math.max(2, h * 0.004)} fill="#c8daf0" />
        </g>
      ))}
      {[...Array(34)].map((_, i) => {
        const y = -h * (0.02 + i * 0.024);
        const w = tiers.find(([a, c]) => -y / h >= a && -y / h < c)?.[2] ?? 0;
        return w ? <rect key={i} x={-w * h + 3} y={y} width={w * h * 2 - 6} height={Math.max(1.5, h * 0.003)} fill="#ffe6a0" opacity={0.55} /> : null;
      })}
      <path d={`M${-0.012 * h} ${-h * 0.87} L0 ${-h} L${0.012 * h} ${-h * 0.87}Z`} fill="#a9c0dc" />
    </g>
  );
};

export const Eiffel: React.FC<{ h: number; c?: string; c2?: string }> = ({ h, c = "#8a6a44", c2 = "#5e4628" }) => {
  const w = h * 0.19;
  const outer = `M${-w} 0 Q${-w * 0.5} ${-h * 0.2} ${-w * 0.36} ${-h * 0.32} L${-w * 0.12} ${-h * 0.76} L${-w * 0.05} ${-h * 0.93} L0 ${-h} L${w * 0.05} ${-h * 0.93} L${w * 0.12} ${-h * 0.76} L${w * 0.36} ${-h * 0.32} Q${w * 0.5} ${-h * 0.2} ${w} 0 L${w * 0.58} 0 Q0 ${-h * 0.24} ${-w * 0.58} 0Z`;
  return (
    <g>
      <path d={outer} fill={c} />
      <path d={`M0 ${-h * 0.98} L${w * 0.05} ${-h * 0.93} L${w * 0.12} ${-h * 0.76} L${w * 0.36} ${-h * 0.32} Q${w * 0.5} ${-h * 0.2} ${w} 0 L${w * 0.58} 0 Q${w * 0.3} ${-h * 0.14} 0 ${-h * 0.2}Z`} fill={c2} opacity={0.55} />
      {[...Array(9)].map((_, i) => {
        const y0 = -h * (0.04 + i * 0.08);
        const y1 = y0 - h * 0.08;
        const xw = (y: number) => (y > -h * 0.32 ? w * (0.36 + 0.64 * (1 + y / (h * 0.32)) ** 1.5) : w * (0.12 + (0.24 * (h * 0.76 + y)) / (h * 0.44)));
        return (
          <g key={i} stroke={c2} strokeWidth={Math.max(1.2, h * 0.004)} opacity={0.75}>
            <path d={`M${-xw(y0)} ${y0} L${-xw(y1) * 0.55} ${y1} M${-xw(y0) * 0.55} ${y0} L${-xw(y1)} ${y1}`} />
            <path d={`M${xw(y0)} ${y0} L${xw(y1) * 0.55} ${y1} M${xw(y0) * 0.55} ${y0} L${xw(y1)} ${y1}`} />
          </g>
        );
      })}
      <rect x={-w * 0.46} y={-h * 0.3} width={w * 0.92} height={h * 0.025} fill={c2} />
      <rect x={-w * 0.2} y={-h * 0.58} width={w * 0.4} height={h * 0.02} fill={c2} />
      <rect x={-w * 0.08} y={-h * 0.91} width={w * 0.16} height={h * 0.025} fill={c2} />
    </g>
  );
};

export const Elephant: React.FC<{ s?: number; c?: string }> = ({ s = 1, c = "#7d7f8c" }) => (
  <g transform={`scale(${s})`}>
    <ellipse cx={0} cy={-70} rx={78} ry={52} fill={c} />
    <rect x={-62} y={-40} width={22} height={40} rx={6} fill={c} />
    <rect x={-22} y={-40} width={22} height={40} rx={6} fill={c} />
    <rect x={18} y={-40} width={22} height={40} rx={6} fill={c} />
    <rect x={48} y={-40} width={22} height={40} rx={6} fill={c} />
    <circle cx={86} cy={-92} r={38} fill={c} />
    <path d="M110 -84 Q140 -40 120 0 L108 0 Q122 -40 98 -70Z" fill={c} />
    <ellipse cx={70} cy={-90} rx={24} ry={32} fill="#5f6170" />
    <path d="M100 -70 L122 -62" stroke="#f1e6cc" strokeWidth={5} strokeLinecap="round" />
    <circle cx={96} cy={-100} r={4} fill="#1a1a20" />
  </g>
);

/** A great golden balance: beam pivot at (0,0); pans hang `drop` below the beam ends; `tilt` in degrees (+ = right pan down). */
export const Balance: React.FC<{ span: number; drop: number; tilt: number; left?: React.ReactNode; right?: React.ReactNode }> = ({ span, drop, tilt, left, right }) => {
  const a = (tilt * Math.PI) / 180;
  const L: P = [-span * Math.cos(a), -span * Math.sin(a)];
  const R: P = [span * Math.cos(a), span * Math.sin(a)];
  const pan = (p: P, kids: React.ReactNode, k: string) => (
    <g key={k}>
      <path d={`M${p[0]} ${p[1]} L${p[0] - 150} ${p[1] + drop} M${p[0]} ${p[1]} L${p[0] + 150} ${p[1] + drop}`} stroke="#c99a3a" strokeWidth={6} />
      <g transform={`translate(${p[0]} ${p[1] + drop})`}>
        {kids}
        <path d="M-190 0 L190 0 Q170 46 0 52 Q-170 46 -190 0Z" fill="#e0a83a" stroke="#9a6a16" strokeWidth={5} />
      </g>
    </g>
  );
  return (
    <g>
      <path d="M-30 0 L30 0 L60 900 L-60 900Z" fill="#b8862e" stroke="#7a521a" strokeWidth={5} />
      <path d={`M${L[0]} ${L[1]} L${R[0]} ${R[1]}`} stroke="#e0a83a" strokeWidth={34} strokeLinecap="round" />
      <path d={`M${L[0]} ${L[1]} L${R[0]} ${R[1]}`} stroke="#9a6a16" strokeWidth={8} strokeLinecap="round" opacity={0.6} />
      <circle r={46} fill="#e0a83a" stroke="#9a6a16" strokeWidth={6} />
      <circle r={18} fill="#d4263a" />
      <path d="M-40 -40 L0 -130 L40 -40Z" fill="#e0a83a" stroke="#9a6a16" strokeWidth={5} />
      {pan(L, left, "l")}
      {pan(R, right, "r")}
    </g>
  );
};

/** Lanka's golden city on its hill (origin = middle of the ground line). */
export const LankaCity: React.FC<{ w?: number; lit?: number; c?: string; c2?: string }> = ({ w = 1400, lit = 0.8, c = "#7a5a2a", c2 = "#5a3e1a" }) => (
  <g>
    <path d={`M${-w / 2} 0 Q${-w / 4} -140 0 -170 Q${w / 4} -140 ${w / 2} 0Z`} fill={c2} />
    {[...Array(14)].map((_, i) => {
      const x = -w / 2 + 80 + (i * (w - 160)) / 13;
      const base = -170 * (1 - ((2 * x) / w) ** 2) + 10;
      const hh = 120 + rnd(i * 3) * 200;
      const ww = 50 + rnd(i * 5) * 50;
      return (
        <g key={i}>
          <rect x={x - ww / 2} y={base - hh} width={ww} height={hh} fill={c} />
          <path d={`M${x - ww / 2 - 6} ${base - hh} Q${x} ${base - hh - ww * 1.1} ${x + ww / 2 + 6} ${base - hh}Z`} fill={c} />
          <path d={`M${x} ${base - hh - ww * 0.8} L${x} ${base - hh - ww * 1.4}`} stroke={c} strokeWidth={5} />
          {[0, 1, 2].map((k) => <rect key={k} x={x - 8} y={base - hh + 26 + k * 38} width={16} height={18} rx={8} fill="#ffcf6a" opacity={lit * (0.4 + 0.6 * rnd(i * 7 + k))} />)}
        </g>
      );
    })}
  </g>
);

/** Earth seen from orbit (centre at 0,0), India and Lanka toward the top. */
export const Earth: React.FC<{ r: number; wave?: number }> = ({ r, wave = 0 }) => (
  <g>
    <circle r={r * 1.06} fill="#5aa8ff" opacity={0.18} />
    <circle r={r} fill="#1d4f8e" />
    <clipPath id="earth-clip">
      <circle r={r} />
    </clipPath>
    <g clipPath="url(#earth-clip)">
      <path d={`M${-r * 0.2} ${-r * 0.95} Q${r * 0.05} ${-r * 0.7} ${r * 0.02} ${-r * 0.42} Q${-r * 0.02} ${-r * 0.3} ${-r * 0.06} ${-r * 0.36} Q${-r * 0.2} ${-r * 0.55} ${-r * 0.32} ${-r * 0.62} Q${-r * 0.5} ${-r * 0.8} ${-r * 0.2} ${-r * 0.95}Z`} fill="#4f8a3e" />
      <path d={`M${r * 0.06} ${-r * 0.34} Q${r * 0.1} ${-r * 0.3} ${r * 0.07} ${-r * 0.26} Q${r * 0.03} ${-r * 0.29} ${r * 0.06} ${-r * 0.34}Z`} fill="#5f9a46" />
      <path d={`M${-r * 0.95} ${-r * 0.5} Q${-r * 0.6} ${-r * 0.6} ${-r * 0.5} ${-r * 0.2} Q${-r * 0.7} ${r * 0.2} ${-r * 0.95} ${r * 0.1}Z`} fill="#6a8a3e" />
      <path d={`M${r * 0.4} ${-r * 0.7} Q${r * 0.9} ${-r * 0.6} ${r * 0.95} ${-r * 0.2} Q${r * 0.6} ${-r * 0.3} ${r * 0.4} ${-r * 0.7}Z`} fill="#5a8a3a" />
      {[0, 1, 2, 3, 4].map((i) => <ellipse key={i} cx={(rnd(i) - 0.5) * r * 1.6} cy={(rnd(i + 9) - 0.5) * r * 1.4} rx={r * 0.25} ry={r * 0.05} fill="#fff" opacity={0.35} />)}
      {wave > 0 && [0, 0.18, 0.36].map((d, i) => {
        const k = Math.max(0, Math.min(1, wave - d));
        return k > 0 && k < 1 ? (
          <ellipse key={i} cx={r * 0.07} cy={-r * 0.3} rx={r * 1.9 * k} ry={r * 1.3 * k} fill="none" stroke="#ffd9a0" strokeWidth={r * 0.03 * (1 - k) + 2} opacity={1 - k} />
        ) : null;
      })}
      <circle r={r} fill="url(#earth-shade)" />
    </g>
    <defs>
      <radialGradient id="earth-shade" cx="35%" cy="30%" r="75%">
        <stop offset="0.55" stopColor="#000" stopOpacity={0} />
        <stop offset="1" stopColor="#000" stopOpacity={0.55} />
      </radialGradient>
    </defs>
  </g>
);
