/**
 * Example reel "सोने की लंका रावण की थी ही नहीं" (Lanka was Kubera's): 19 shots, the reference for the kit's style.
 * Painted-realism characters from ../kit/real + ../kit/realcast in lit 2.5D scenes; sets from ../kit/sets.
 * Storyboard reels/example-lanka-kuber/storyboard.json; timing public/mg/example-lanka-kuber/manifest.json (pipeline/timing.py).
 * Each shot gets shot-local `s`; word cues in comments are shot-local seconds. No subtitles, no on-screen text.
 * Arms: hanging arms use HP.hang with NO rBend/lBend (the default bends the elbows outward).
 */
import React from "react";
import { AbsoluteFill, Audio, Composition, Easing, staticFile, useCurrentFrame, type CalculateMetadataFunction } from "remotion";
import { At, C0, Cloud, Fire, Particles, Sky, rig, rnd, tw, type Words } from "../kit/scene";
import { Chakra } from "../kit/cast2";
import { LankaCity } from "../kit/cast3";
import { Amaravati, Throne } from "../kit/cast5";
import { Gada, Gem, HP, Hero, Lotus, RealDefs, RHead, RL, Sword, mixHand, type Look, type Outfit } from "../kit/real";
import { LOOK, OUT, Ravana10 } from "../kit/realcast";
import { Diya, FemBust, Kund, LankaNight, Leaf, Medal, Moon, Palace, Peaks, Pushpaka, Sea, Stars, Thread, Tree } from "../kit/sets";

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

const KUBERA: Look = { skin: "#d9a36a", line: "#6a3e1a", hair: "#140c06", crown: "kirita", stache: "thin", beard: "short", tilak: "urdhva", gem: RL.emer };
const KUBERA_O: Outfit = { dhoti: "#e8b628", border: "#b8401a", sash: "#2a7a4a", pearls: 3, hara: true, lower: "long" };
const VISH_O: Outfit = { ...OUT.rishiW, lower: "long", robe: undefined };
const DEVAV: Look = { ...LOOK.diti, skin: "#d8a878", line: "#6a3e1a", gem: RL.emer };
const VKARMA: Look = { skin: "#c08a5c", line: "#5a3418", hair: "#d8d4cc", beardC: "#ece8e0", crown: "mukuta", beard: "sage", stache: "sage", tilak: "urdhva", gem: RL.ruby };
const VKARMA_O: Outfit = { dhoti: "#c8862a", border: "#7a3a12", lower: "knee", pearls: 1, janeu: true, belt: true };
const BRAHMA: Look = { skin: "#e0a870", line: "#6a3e1a", hair: "#d8d4cc", beardC: "#f2eee6", crown: "mukuta", beard: "sage", stache: "sage", tilak: "urdhva", gem: RL.ruby };
const BRAHMA_O: Outfit = { dhoti: "#d84a2a", border: "#ffd34a", lower: "seated", robe: "#d84a2a", pearls: 2, hara: true, belt: false };
const RAMA: Look = { skin: "#4a76b8", line: "#16243e", hair: "#0e0806", crown: "mukuta", tilak: "urdhva", gem: RL.ruby };
const RAMA_O: Outfit = { dhoti: "#f2c23a", border: "#b8401a", sash: "#c8302a", pearls: 2, hara: true, lower: "long" };
const SITA: Look = { ...LOOK.diti, skin: "#e0b088", line: "#6a3e1a", gem: RL.ruby };

/** Kubera: lord of wealth, a little broader, gold, a treasure pot in the left hand */
const Kubera: React.FC<{ t: number; pot?: boolean; spill?: number; e?: object; rHand?: [number, number]; rPose?: typeof HP.hang; rWrist?: number; lHand?: [number, number]; lPose?: typeof HP.hang; headTilt?: number; glow?: number; rProp?: React.ReactNode; rBend?: number; lProp?: React.ReactNode; lWrist?: number; lBend?: number }> = ({
  t, pot = true, spill = 0, e, rHand = [-138, -400], rPose = HP.hang, rWrist = 0, lHand, lPose, headTilt = 0, glow = 0, rProp, rBend, lProp, lWrist, lBend,
}) => (
  <g>
    <Hero look={KUBERA} o={KUBERA_O} t={t} bulk={1.22} seed={3} glow={glow} aura="#ffd27a" headTilt={headTilt}
      rHand={rHand} rPose={rPose} rWrist={rWrist} rProp={rProp} rBend={rBend ?? 0}
      lHand={lHand ?? (pot ? [30, -548] : [138, -400])} lPose={lPose ?? (pot ? HP.relax : HP.hang)} lWrist={lWrist ?? (pot ? 25 : 0)} lBend={lBend ?? 0} lProp={lProp}
      e={e} />
    {/* the treasure pot sits on his left forearm, held against his belly */}
    {pot && <g transform="translate(118 -628)"><Pot t={t} spill={spill} /></g>}
  </g>
);

/** Brahma: four faces (three seen), seated on a lotus, a palm-leaf Veda in one hand, blessing with the other */
const Brahma: React.FC<{ t: number; bless?: number }> = ({ t, bless = 1 }) => (
  <g>
    <g transform="translate(0 40) scale(2.2)"><Lotus glow={1} /></g>
    <Hero look={BRAHMA} o={BRAHMA_O} t={t} seed={8} glow={1} aura="#ffe6a8"
      rHand={[-150 - 20 * bless, -560 - 200 * bless]} rPose={mixHand(HP.relax, HP.bless, bless)} rWrist={-90 * bless}
      lHand={[160, -470]} lPose={HP.grip} lProp={<g transform="rotate(-20) scale(0.5)"><Leaf seed={3} w={300} /></g>}
      extraHeads={<g>{[-1, 1].map((sx) => <g key={sx} transform={`translate(${sx * 92} -846) scale(0.86)`}><RHead look={BRAHMA} t={t} seed={sx > 0 ? 4 : 5} e={{ lookX: sx * 0.9, smile: 0.3 }} /></g>)}</g>}
      e={{ smile: 0.35 }} />
  </g>
);

// ---------------------------------------------------------------- props + sets

/** Kubera's treasure pot (origin = centre of the belly) with jewels heaped on top; `spill` rains coins and gems below */
const Pot: React.FC<{ t: number; spill?: number }> = ({ t, spill = 0 }) => (
  <g>
    <circle r={120} fill="#ffd27a" opacity={0.18 + 0.05 * Math.sin(t * 5)} />
    <ellipse cx={0} cy={6} rx={66} ry={58} fill={RL.gold} stroke={RL.goldD} strokeWidth={3} />
    <ellipse cx={0} cy={6} rx={66} ry={58} fill="url(#rl-cylA)" opacity={0.5} />
    <ellipse cx={-22} cy={-12} rx={18} ry={26} fill="#fff6d0" opacity={0.35} />
    <rect x={-34} y={-62} width={68} height={16} rx={6} fill={RL.goldH} stroke={RL.goldD} strokeWidth={2} />
    {[[-24, -74, RL.ruby], [0, -82, RL.emer], [24, -74, RL.saph], [-10, -92, RL.pearl], [12, -94, RL.ruby]].map(([x, y, c], i) => (
      <circle key={i} cx={x as number} cy={y as number} r={11} fill={c as string} stroke="#000" strokeOpacity={0.25} strokeWidth={1.5} />
    ))}
    <Gem x={0} y={10} r={10} c={RL.ruby} />
    <path d="M-62 30 Q0 50 62 30" stroke={RL.goldD} strokeWidth={3} fill="none" />
    {spill > 0 && [...Array(14)].map((_, i) => {
      const k = (t * 0.9 + i / 14) % 1;
      return <ellipse key={i} cx={40 + (rnd(i) - 0.3) * 60 + k * 30} cy={50 + k * 360} rx={8 * Math.abs(Math.cos(t * 6 + i))} ry={8} fill={i % 4 ? RL.goldH : RL.ruby} opacity={spill * (1 - k)} />;
    })}
  </g>
);

/** falling gold coins over a region; k fades them in */
const Coins: React.FC<{ t: number; k: number; x0: number; x1: number; y0: number; y1: number; n?: number; seed?: number }> = ({ t, k, x0, x1, y0, y1, n = 40, seed = 1 }) => {
  if (k <= 0) return null;
  return (
    <g>
      {[...Array(n)].map((_, i) => {
        const u = (t * (0.35 + rnd(seed + i) * 0.3) + rnd(seed * 7 + i)) % 1;
        const x = x0 + rnd(seed * 3 + i) * (x1 - x0);
        const y = y0 + u * (y1 - y0);
        const w = 14 * Math.abs(Math.cos(t * (4 + rnd(i) * 3) + i));
        return (
          <g key={i} opacity={k * Math.min(1, (1 - u) * 4)}>
            <ellipse cx={x} cy={y} rx={w + 1} ry={14} fill={RL.goldH} stroke={RL.goldD} strokeWidth={1.5} />
            <ellipse cx={x - w * 0.2} cy={y - 4} rx={w * 0.35} ry={5} fill="#fff6d0" opacity={0.6} />
          </g>
        );
      })}
    </g>
  );
};

/** Vishwakarma's hammer (grip at origin, head toward −y) */
const Hammer: React.FC = () => (
  <g>
    <rect x={-6} y={-150} width={12} height={170} rx={5} fill="#6a3e1a" stroke="#3a200c" strokeWidth={1.5} />
    <rect x={-46} y={-190} width={92} height={46} rx={8} fill="#c8a24a" stroke={RL.goldD} strokeWidth={2} />
    <rect x={-46} y={-190} width={92} height={46} rx={8} fill="url(#rl-cylA)" opacity={0.5} />
    <rect x={-8} y={-196} width={16} height={58} fill={RL.goldH} />
  </g>
);

/** golden Lanka on its island: the city grows with `rise` (0–1) and lights with `lit` */
const Island: React.FC<{ t: number; rise?: number; lit?: number; gold?: number; w?: number }> = ({ t, rise = 1, lit = 1, gold = 1, w = 1500 }) => {
  const c = gold > 0.5 ? "#e0aa44" : "#3a2414";
  const c2 = gold > 0.5 ? "#a8741a" : "#1e120a";
  return (
    <g>
      <ellipse cx={0} cy={-60} rx={w * 0.5} ry={260} fill="#ffcf6a" opacity={0.16 * lit * gold + 0.03 * Math.sin(t * 3)} />
      <path d={`M${-w * 0.6} 30 Q${-w * 0.3} -60 0 -70 Q${w * 0.3} -60 ${w * 0.6} 30Z`} fill="#2a1a10" />
      <g transform={`scale(1 ${Math.max(0.001, rise)})`}><LankaCity w={w} lit={lit} c={c} c2={c2} /></g>
    </g>
  );
};

/** simple ashram: thatched hut, a tree, a lamp */
const Ashram: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <Tree x={130} y={1520} s={1.1} c="#1e3a22" seed={4} />
    <Tree x={980} y={1500} s={0.9} c="#24402a" seed={9} />
    <g transform="translate(820 1560)">
      <rect x={-150} y={-170} width={300} height={170} fill="#8a6a3a" stroke="#4a3418" strokeWidth={3} />
      <path d="M-200 -160 L0 -300 L200 -160Z" fill="#c8a462" stroke="#6a4a22" strokeWidth={3} />
      {[...Array(9)].map((_, i) => <path key={i} d={`M${-180 + i * 45} -170 L${-10 + i * 4} -290`} stroke="#8a6a32" strokeWidth={2} opacity={0.6} />)}
      <rect x={-40} y={-110} width={80} height={110} fill="#2a1a0a" />
    </g>
    <rect x={-1500} y={1540} width={4200} height={2000} fill="#3a3018" />
    <rect x={-1500} y={1540} width={4200} height={8} fill="#6a5a2a" opacity={0.6} />
    <Diya t={t} x={640} y={1600} s={0.8} />
  </g>
);

/** night sky over the sea with a low island horizon */
const SeaNight: React.FC<{ t: number; y?: number }> = ({ t, y = 1360 }) => (
  <g>
    <Sky stops={[[-900, "#060a18"], [600, "#141a36"], [1200, "#2a2a4a"], [1500, "#4a3a5a"]]} />
    <Stars seed={31} n={70} t={t} y1={1100} />
    <Moon x={260} y={360} r={60} />
    <Sea t={t} y={y} c="#141e3a" c2="#0a1226" line="#3a5a8a" />
  </g>
);

const Board: React.FC<{ t: number; red: number }> = ({ t, red }) => (
  <g>
    <rect x={-1500} y={-1500} width={4200} height={5000} fill="#120a1c" />
    <rect x={540} y={-1500} width={2200} height={5000} fill="#2a0810" opacity={red} />
    <Stars seed={21} n={80} t={t} y1={2000} />
    <g opacity={0.16}>
      {[...Array(24)].map((_, j) => <line key={j} x1={540} y1={800} x2={540 + Math.cos((j / 24) * Math.PI * 2) * 1000} y2={800 + Math.sin((j / 24) * Math.PI * 2) * 1000} stroke="#ffd27a" strokeWidth={2} />)}
      <circle cx={540} cy={800} r={640} fill="none" stroke="#ffd27a" strokeWidth={3} />
    </g>
  </g>
);

/** the family board: Vishrava on top, the two mothers in the middle, Kubera and Ravana below */
const Lineage: React.FC<{ t: number; s3: number; s4: number }> = ({ t, s3, s4 }) => {
  const sons = tw(s3, [0, 0.4], [0, 1], OUTE);
  const fa = tw(s3, [0.45, 1.0], [0, 1], OUTE);
  const thF = tw(s3, [1.1, 2.0], [0, 1], E);
  const glowF = pulse(s3, 2.2, 0.8);
  const dev = tw(s4, [0.9, 1.4], [0, 1], OUTE);
  const thD = tw(s4, [1.2, 1.9], [0, 1], E);
  const kai = tw(s4, [3.0, 3.5], [0, 1], OUTE);
  const thK = tw(s4, [3.3, 4.2], [0, 1], E);
  const red = tw(s4, [3.1, 3.9], [0, 1], E);
  return (
    <g>
      <RealDefs />
      <Thread a={[540, 520]} b={[300, 1170]} k={thF} c="#ffd27a" bend={-120} />
      <Thread a={[540, 520]} b={[780, 1170]} k={thF} c="#ffd27a" bend={120} />
      <Thread a={[190, 810]} b={[270, 1160]} k={thD} c="#ffd27a" bend={-40} />
      <Thread a={[890, 810]} b={[810, 1160]} k={thK} c="#ff3a2a" bend={40} />
      <Medal id="lk-f" x={540} y={400} r={150} k={fa} rim="#ffd27a" glow={glowF}>
        <At x={0} y={1000} s={1.2}><Hero look={LOOK.rishi2} o={VISH_O} t={t} seed={6} rHand={[-138, -400]} rPose={HP.hang} lHand={[138, -400]} lPose={HP.hang} e={{ smile: 0.3 }} /></At>
      </Medal>
      <Medal id="lk-d" x={190} y={720} r={120} k={dev} rim="#ffd27a">
        <At x={0} y={930} s={1.05}><FemBust look={DEVAV} t={t} saree="#2a6a4a" border="#d9a336" e={{ smile: 0.3, lookX: 0.4 }} /></At>
      </Medal>
      <Medal id="lk-k" x={890} y={720} r={120} k={kai} rim="#ff3a2a" glow={red * 0.6} bg="#2a0a0e">
        <At x={0} y={930} s={1.05}><FemBust look={LOOK.kaikesi} t={t} saree="#6a0e1a" border="#d9a336" veil e={{ lookX: -0.5 }} /></At>
      </Medal>
      <Medal id="lk-ku" x={300} y={1300} r={190} k={sons} rim="#ffd27a" glow={dev * 0.4}>
        <At x={0} y={1330} s={1.45}><Kubera t={t} pot={false} e={{ smile: 0.3, lookX: 0.4 }} /></At>
      </Medal>
      <Medal id="lk-ra" x={780} y={1300} r={190} k={sons} rim={red > 0.5 ? "#ff3a2a" : "#ffd27a"} glow={red} bg={red > 0.5 ? "#2a0a0e" : "#20141e"}>
        <At x={0} y={1330} s={1.45}><Ravana10 t={t} spread={46} rHand={[-150, -420]} rPose={HP.hang} lHand={[150, -420]} lPose={HP.hang} e={{ anger: 0.2 + 0.4 * red, lookX: -0.4 }} /></At>
      </Medal>
    </g>
  );
};

/** the gold crack that splits a frame, drawn as k goes 0 → 1 */
const Crack: React.FC<{ k: number; flash: number }> = ({ k, flash }) =>
  k > 0 ? (
    <g>
      <path d="M540 -200 L520 300 L566 520 L512 800 L560 1080 L518 1380 L556 1660 L536 2200" stroke="#ffe7a0" strokeWidth={10 + 20 * flash} fill="none" pathLength={1} strokeDasharray={`${k} 1`} strokeLinejoin="bevel" />
      <path d="M540 -200 L520 300 L566 520 L512 800 L560 1080 L518 1380 L556 1660 L536 2200" stroke="#fff" strokeWidth={3} fill="none" pathLength={1} strokeDasharray={`${k} 1`} />
      <rect x={-200} y={-200} width={1500} height={2400} fill="#fff4d0" opacity={0.35 * flash} />
    </g>
  ) : <g />;

/** Kubera's city Alaka in the Himalaya */
const Alaka: React.FC<{ t: number }> = ({ t }) => (
  <g>
    <Sky stops={[[-900, "#1a2a5a"], [500, "#4a6aa8"], [1100, "#a8b8e0"], [1500, "#e8e0f0"]]} />
    <Peaks y={1250} c="#5a6a9a" snow="#f4f4fa" seed={5} h={520} />
    <g transform="translate(540 1420)"><Amaravati w={1500} t={t} glow={0.8} /></g>
    <rect x={-1500} y={1500} width={4200} height={2000} fill="#e8eaf4" />
    <rect x={-1500} y={1500} width={4200} height={10} fill="#ffffff" opacity={0.8} />
  </g>
);

// ---------------------------------------------------------------- shots

/** S0 — सोने की लंका@0.15... रावण@1.27 की थी ही नहीं@3.01: golden Lanka, Ravana proud before it; on "नहीं" a crack and the gold drains */
const S0: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, y: tw(u, [0, dur], [80, 0]), z: tw(u, [0, dur], [1.0, 1.16], E), x: shake(u, 3.0, 8) }), s);
  const rav = tw(s, [0, 0.35], [0.6, 1], OUTE);
  const crack = tw(s, [2.6, 3.2], [0, 1], E);
  const drain = tw(s, [2.95, 3.35], [0, 1], E);
  return (
    <>
      {L({ d: 0.05, id: "a0", children: <LankaNight t={t} red={0.2 + 0.3 * drain} /> })}
      {L({
        d: 0.35, id: "a1", children: (
          <g transform="translate(540 1500)">
            <g opacity={1 - drain}><Island t={t} gold={1} lit={1} w={2000} /></g>
            <g opacity={drain}><Island t={t} gold={0} lit={0.15} w={2000} /></g>
          </g>
        ),
      })}
      {L({
        d: 1, id: "a2", children: (
          <g>
            <RealDefs />
            <ellipse cx={540} cy={1300} rx={520} ry={700} fill="#ffcf6a" opacity={0.14 * (1 - drain)} />
            <g opacity={rav} transform={`translate(0 ${(1 - rav) * 60})`}>
              <At x={540} y={2100} s={1.38}>
                <Ravana10 t={t} spread={52} rHand={[-150, -470]} rPose={HP.fist} lHand={[150, -470]} lPose={HP.fist} e={{ anger: 0.2 + 0.4 * drain, smile: 0.35 * (1 - drain), lookX: tw(s, [3.0, 3.3], [0, 0.7]) }} />
              </At>
            </g>
          </g>
        ),
      })}
      {L({ d: 1.1, id: "a3", children: <Crack k={crack} flash={pulse(s, 3.0, 0.4)} /> })}
      {L({ d: 1.3, id: "a4", dof: 4, children: <Particles t={t} seed={3} n={24} color="#ffcf6a" x0={-100} x1={1200} y0={300} y1={2000} speed={50} size={4} /> })}
    </>
  );
};

/** S1 — उसका असली राजा था कुबेर@2.01 — धन@2.85 के देवता@3.20: golden palace, tilt up to Kubera with his treasure pot; coins rain on "धन" */
const S1: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, y: tw(u, [0, 2.1], [380, 0], E), z: tw(u, [0, dur], [1.12, 1.04]) }), s);
  const coins = tw(s, [2.7, 3.1], [0, 1]);
  return (
    <>
      {L({ d: 0.2, id: "b0", children: <Palace t={t} /> })}
      {L({
        d: 1, id: "b1", children: (
          <g>
            <RealDefs />
            <ellipse cx={540} cy={1000} rx={520} ry={760} fill="#ffd27a" opacity={0.12 + 0.12 * pulse(s, 2.0, 1)} />
            {[...Array(9)].map((_, i) => <ellipse key={i} cx={220 + i * 80} cy={1920 + (i % 2) * 14} rx={36} ry={12} fill={i % 3 ? RL.goldH : RL.ruby} opacity={0.85} />)}
            <At x={540} y={2120} s={1.45}>
              <Kubera t={t} spill={coins} glow={0.4 + 0.6 * pulse(s, 2.0, 1.2)} rHand={[-170, -760]} rPose={HP.bless} rWrist={-90} e={{ smile: 0.45, lookX: 0 }} />
            </At>
            <Coins t={t} k={coins} x0={60} x1={1020} y0={-100} y1={1900} n={46} seed={5} />
          </g>
        ),
      })}
      {L({ d: 1.4, id: "b2", dof: 4, children: <Particles t={t} seed={8} n={22} color="#ffe08a" x0={-100} x1={1200} y0={0} y1={2000} speed={30} size={4} /> })}
    </>
  );
};

/** S2 — और रावण@0.66 का अपना बड़ा भाई@2.04: split frame, Kubera (gold) | Ravana (red); they turn to each other on "भाई" */
const S2: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, z: tw(u, [0, dur], [1.1, 1.0], E) }), s);
  const ravIn = tw(s, [0.4, 0.9], [0, 1], OUTE);
  const turn = tw(s, [1.8, 2.3], [0, 1], E);
  return (
    <>
      {L({
        d: 0.3, id: "c0", children: (
          <g>
            <rect x={-1500} y={-1500} width={2040} height={5000} fill="#4a3210" />
            <rect x={540} y={-1500} width={2040} height={5000} fill="#3a0c14" />
            <circle cx={260} cy={760} r={440} fill="#ffd27a" opacity={0.16} />
            <circle cx={820} cy={760} r={440} fill="#ff4a2a" opacity={0.14 * ravIn} />
            <rect x={536} y={-1500} width={8} height={5000} fill="#ffe7a0" opacity={0.6} />
          </g>
        ),
      })}
      {L({
        d: 1, id: "c1", children: (
          <g>
            <RealDefs />
            <At x={270} y={1960} s={1.15}><Kubera t={t} e={{ smile: 0.3, lookX: 0.8 * turn }} /></At>
            <g opacity={ravIn} transform={`translate(${(1 - ravIn) * 120} 0)`}>
              <At x={810} y={1960} s={1.15}><Ravana10 t={t} spread={46} rHand={[-150, -420]} rPose={HP.hang} lHand={[150, -470]} lPose={HP.fist} e={{ anger: 0.3, lookX: -0.8 * turn }} /></At>
            </g>
          </g>
        ),
      })}
    </>
  );
};

/** S3 — दोनों के पिता@0.52 एक थे, ऋषि@1.67 विश्रवा@2.23: the family board; tilt up from the two sons to their father */
const S3: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, y: tw(u, [0, 0.5, 1.4, dur], [380, 380, -120, -80], E), z: tw(u, [0, dur], [1.12, 1.04], E) }), s);
  return (
    <>
      {L({ d: 0.3, id: "e0", children: <Board t={t} red={0} /> })}
      {L({ d: 1, id: "e1", children: <Lineage t={t} s3={s} s4={-1} /> })}
      {L({ d: 1.4, id: "e2", dof: 4, children: <Particles t={t} seed={23} n={18} color="#ffe08a" x0={0} x1={1080} y0={0} y1={1900} speed={30} size={4} /> })}
    </>
  );
};

/** S4 — कुबेर की माँ थीं देववर्णिनी@1.06... और रावण@2.48 की माँ, राक्षस@3.12 कुल की कैकसी@4.32: the mothers join; Ravana's side turns red */
const S4: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, x: tw(u, [0, 0.6, 2.4, 3.2], [-120, -120, -120, 120], E), y: tw(u, [0, 0.6], [-80, 140], E), z: tw(u, [0, dur], [1.0, 1.04]) }), s);
  const red = tw(s, [3.1, 3.9], [0, 1], E);
  return (
    <>
      {L({ d: 0.3, id: "e0", children: <Board t={t} red={red} /> })}
      {L({ d: 1, id: "e1", children: <Lineage t={t} s3={99} s4={s} /> })}
      {L({ d: 1.4, id: "e2", dof: 4, children: <Particles t={t} seed={29} n={18} color={red > 0.5 ? "#ff5a3a" : "#ffe08a"} x0={0} x1={1080} y0={0} y1={1900} speed={30} size={4} /> })}
    </>
  );
};

/** S5 — लंका बनाई थी देव-शिल्पी विश्वकर्मा@2.32 ने, राक्षसों@3.12 के लिए: Vishwakarma strikes; the golden towers rise from the island */
const S5: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, x: tw(u, [0, dur], [-60, 60]), z: tw(u, [0, dur], [1.0, 1.1], E) }), s);
  const strike = (k: number) => pulse(s, k, 0.35);
  const hammer = Math.max(strike(0.5), strike(1.4), strike(2.3), strike(3.2));
  const rise = tw(s, [0.4, 3.6], [0, 1], E);
  return (
    <>
      {L({ d: 0.05, id: "f0", children: <SeaNight t={t} y={1380} /> })}
      {L({ d: 0.4, id: "f1", children: <g transform="translate(700 1400)"><Island t={t} rise={rise} lit={rise} gold={1} w={1300} /></g> })}
      {L({
        d: 1, id: "f2", children: (
          <g>
            <RealDefs />
            <rect x={-1500} y={1700} width={1600} height={2000} fill="#2a2016" />
            <At x={230} y={2050} s={1.2}>
              <Hero look={VKARMA} o={VKARMA_O} t={t} seed={9} glow={0.4} aura="#ffcf6a"
                rHand={[-60 + 260 * hammer, -1000 + 260 * hammer]} rPose={HP.grip} rProp={<g transform={`rotate(${-10 + 70 * hammer})`}><Hammer /></g>}
                lHand={[138, -400]} lPose={HP.hang} e={{ smile: 0.3, lookX: 0.8 }} />
            </At>
            {[0.6, 1.5, 2.4, 3.3].map((k, i) => s > k && s < k + 0.8 ? (
              [...Array(10)].map((_, j) => {
                const u = (s - k) / 0.8;
                const a = -Math.PI / 2 + (rnd(i * 10 + j) - 0.5) * 2.2;
                return <circle key={`${i}${j}`} cx={620 + Math.cos(a) * 260 * u} cy={1280 + Math.sin(a) * 260 * u + 200 * u * u} r={5} fill="#ffe08a" opacity={1 - u} />;
              })
            ) : null)}
          </g>
        ),
      })}
    </>
  );
};

/** S6 — पर भगवान विष्णु@1.10 से हारकर राक्षस@2.12 पाताल@2.82 भाग गए... और लंका@4.28 सूनी@4.70 पड़ी रही: chakra; rakshasas flee into the dark; Lanka goes dark */
const S6: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, y: tw(u, [0, 3.6, 4.4], [-120, -120, 60], E), z: tw(u, [0, 3.6, 4.4, dur], [1.05, 1.1, 1.0, 1.06], E) }), s);
  const ch = tw(s, [0.9, 1.5], [0, 1], OUTE);
  const flee = tw(s, [1.9, 3.6], [0, 1], E);
  const dark = tw(s, [3.8, 4.8], [0, 1], E);
  return (
    <>
      {L({ d: 0.05, id: "g0", children: <SeaNight t={t} y={1440} /> })}
      {L({ d: 0.3, id: "g1", children: <g transform="translate(540 1460)"><Island t={t} gold={dark > 0.5 ? 0 : 1} lit={1 - dark} w={1500} /></g> })}
      {L({
        d: 0.6, id: "g2", children: (
          <g opacity={ch * (1 - dark)}>
            <circle cx={540} cy={420} r={260} fill="#ffe9a8" opacity={0.18} />
            <g transform={`translate(540 420) scale(${2.4 * ch})`}><Chakra t={t} r={60} /></g>
          </g>
        ),
      })}
      {L({
        d: 1, id: "g3", children: (
          <g>
            <RealDefs />
            <path d="M120 1900 Q540 1760 960 1900 L960 2400 L120 2400Z" fill="#05030a" opacity={0.9 * tw(s, [1.8, 2.4], [0, 1])} />
            {[[150, 1560, 0.5, 0], [400, 1640, 0.62, 0.15], [700, 1580, 0.52, 0.05], [930, 1660, 0.6, 0.22]].map(([x0, y0, sc, d], i) => {
              const k = Math.max(0, Math.min(1, (flee - d) / 0.75));
              const bob = Math.abs(Math.sin(t * 9 + i * 1.7)) * 26 * (k > 0 && k < 1 ? 1 : 0);
              return (
                <g key={i} opacity={(1 - dark) * (k < 0.8 ? 1 : (1 - k) / 0.2)} transform={`translate(${x0 + (540 - x0) * k * 0.55} ${y0 + k * 520 - bob}) scale(${sc * (1 - 0.45 * k)})`}>
                  <g transform={x0 > 540 ? "scale(-1 1)" : undefined}>
                    <Hero look={LOOK.rakshasa} o={OUT.rakshasa} t={t + i} seed={i + 2} lean={16 * Math.min(1, k * 4)} stance={0.8}
                      rHand={[-240, -820]} rPose={HP.claw} lHand={[200, -700]} lPose={HP.claw} e={{ fear: 1, open: 0.7, lookX: 0.8 }} />
                  </g>
                </g>
              );
            })}
          </g>
        ),
      })}
      {L({ d: 1.4, id: "g4", dof: 4, children: <Particles t={t} seed={41} n={22} color={dark > 0.5 ? "#8a8aa8" : "#ffcf6a"} x0={-100} x1={1200} y0={300} y1={2000} speed={40} size={4} /> })}
    </>
  );
};

/** S7 — तब पिता@0.68 के कहने पर कुबेर@1.74 ने लंका@2.16 बसाई@2.68: Vishrava blesses; Kubera turns to Lanka and the city lights up */
const S7: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, z: tw(u, [0, dur], [1.0, 1.12], E), x: tw(u, [0, dur], [-40, 40]) }), s);
  const bless = tw(s, [0.5, 1.0], [0, 1], E);
  const lit = tw(s, [2.0, 2.9], [0, 1], E);
  return (
    <>
      {L({ d: 0.05, id: "h0", children: <SeaNight t={t} y={1300} /> })}
      {L({ d: 0.3, id: "h1", children: <g transform="translate(560 1310)"><Island t={t} gold={1} lit={0.1 + 0.9 * lit} w={1400} /></g> })}
      {L({
        d: 1, id: "h2", children: (
          <g>
            <RealDefs />
            <rect x={-1500} y={1640} width={4200} height={2000} fill="#2a2416" />
            <At x={330} y={2040} s={1.0}>
              <Hero look={LOOK.rishi2} o={VISH_O} t={t} seed={6} rHand={[-150 - 30 * bless, -430 - 360 * bless]} rPose={mixHand(HP.hang, HP.bless, bless)} rWrist={-90 * bless}
                lHand={[138, -400]} lPose={HP.hang} e={{ smile: 0.35, lookX: 0.6 }} />
            </At>
            <At x={790} y={2060} s={1.05}><Kubera t={t} e={{ smile: 0.3 + 0.3 * lit, lookX: tw(s, [1.5, 2.0], [-0.6, 0.2]), lookY: -0.2 * lit }} /></At>
          </g>
        ),
      })}
    </>
  );
};

/** S8 — ब्रह्मा@0.08 जी ने उन्हें धन का स्वामी@1.94 बनाया, और दिया एक उड़ने वाला विमान@4.52 — पुष्पक@4.94 */
const S8: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, y: tw(u, [0, 2.6, 3.6], [-260, -260, 160], E), z: tw(u, [0, dur], [1.08, 1.0], E) }), s);
  const bless = tw(s, [0.4, 1.1], [0, 1], E);
  const coins = tw(s, [1.8, 2.3], [0, 1]) * (1 - tw(s, [3.4, 4.0], [0, 1]));
  const vim = tw(s, [3.9, 5.2], [0, 1], OUTE);
  return (
    <>
      {L({
        d: 0.05, id: "i0", children: (
          <g>
            <Sky stops={[[-900, "#3a2a6a"], [400, "#8a6ab8"], [1100, "#e8b8a8"], [1600, "#ffe0b8"]]} />
            <circle cx={540} cy={260} r={520} fill="#fff1c8" opacity={0.25} />
          </g>
        ),
      })}
      {L({ d: 0.4, id: "i1", children: <g>{[...Array(7)].map((_, i) => <Cloud key={i} x={-200 + i * 260} y={760 + (i % 2) * 60} s={1.6} fill="#f6eef8" o={0.9} />)}</g> })}
      {L({
        d: 1, id: "i2", children: (
          <g>
            <RealDefs />
            <At x={540} y={820} s={0.72}><Brahma t={t} bless={bless} /></At>
            <Coins t={t} k={coins} x0={240} x1={840} y0={700} y1={1800} n={36} seed={9} />
            {[...Array(5)].map((_, i) => <Cloud key={i} x={-120 + i * 320} y={2000 + (i % 2) * 40} s={1.8} fill="#efe6f4" />)}
            <At x={380} y={2000} s={1.0}><Kubera t={t} spill={coins} e={{ smile: 0.5, lookY: -0.8 * (1 - vim), lookX: 0.6 * vim }} glow={coins * 0.6} /></At>
            <g opacity={Math.min(1, vim * 2)} transform={`translate(${1600 - 760 * vim} ${880 + 520 * vim}) scale(0.58)`}><Pushpaka t={t} glow={1} /></g>
          </g>
        ),
      })}
      {L({ d: 1.4, id: "i3", dof: 4, children: <Particles t={t} seed={51} n={24} color="#fff0c0" x0={-100} x1={1200} y0={0} y1={2000} speed={26} size={4} /> })}
    </>
  );
};

/** S9 — एक दिन कुबेर@0.52 पुष्पक@0.98 में बैठकर पिता@2.00 से मिलने आए: the Pushpaka with Kubera flies over the sea toward the ashram */
const S9: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, x: tw(u, [0, dur], [-200, 160]), z: 1.0 }), s);
  const fly = tw(s, [0, dur], [0, 1]);
  return (
    <>
      {L({
        d: 0.05, id: "j0", children: (
          <g>
            <Sky stops={[[-900, "#2a4a8a"], [600, "#6a8ac8"], [1200, "#f0c8a0"], [1500, "#ffd8a8"]]} />
            <circle cx={820} cy={1290} r={170} fill="#ffcf8a" opacity={0.85} /><circle cx={820} cy={1290} r={300} fill="#ffcf8a" opacity={0.18} />
            <Sea t={t} y={1320} c="#2a4a7a" c2="#1a2e52" line="#7a9ac8" />
          </g>
        ),
      })}
      {L({ d: 0.3, id: "j1", children: <g>{[...Array(6)].map((_, i) => <Cloud key={i} x={-300 + i * 340} y={500 + (i % 2) * 80} s={1.2} fill="#fff4ec" o={0.7} />)}</g> })}
      {L({ d: 0.5, id: "j2", children: <g transform="translate(1260 1320)"><Tree x={0} y={0} s={0.9} c="#1e3a22" seed={4} /><Tree x={180} y={10} s={0.7} c="#24402a" seed={7} /><rect x={-200} y={0} width={900} height={60} fill="#3a3018" /></g> })}
      {L({
        d: 1, id: "j3", children: (
          <g transform={`translate(${-60 + 760 * fly} ${980 + Math.sin(t * 2) * 14})`}>
            <RealDefs />
            <g transform="scale(0.78)"><Pushpaka t={t} rider={<Kubera t={t} pot={false} e={{ smile: 0.5, lookX: 0.6 }} />} riderS={0.36} /></g>
          </g>
        ),
      })}
    </>
  );
};

/** S10 — उनका वैभव@0.84 देखकर कैकसी@1.80 ने रावण@2.62 से कहा — "तू@3.26 भी ऐसा बन@4.36": the Pushpaka glows overhead; Kaikesi turns to Ravana */
const S10: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, z: tw(u, [0, dur], [1.0, 1.14], E), y: tw(u, [0, dur], [-60, 40]) }), s);
  const pass = tw(s, [0, 2.4], [0, 1]);
  const turn = tw(s, [2.4, 3.0], [0, 1], E);
  const hard = tw(s, [3.2, 3.8], [0, 1], E);
  return (
    <>
      {L({ d: 0.05, id: "k0", children: <LankaNight t={t} red={0.15 + 0.3 * hard} /> })}
      {L({
        d: 0.3, id: "k1", children: (
          <g opacity={1 - tw(s, [2.6, 3.4], [0, 1])}>
            <g transform={`translate(${-300 + 1500 * pass} ${360 - 120 * pass}) scale(0.34)`}><Pushpaka t={t} glow={1.4} /></g>
          </g>
        ),
      })}
      {L({ d: 0.5, id: "k2", dof: 1, children: <g>{[...Array(6)].map((_, i) => <Tree key={i} x={-100 + i * 240} y={1500} s={1.0} c="#1a1420" seed={i * 7} />)}<rect x={-1500} y={1500} width={4200} height={2000} fill="#16101a" /></g> })}
      {L({
        d: 1, id: "k3", children: (
          <g>
            <RealDefs />
            <ellipse cx={540} cy={1300} rx={540} ry={620} fill="#ff6a3a" opacity={0.1 + 0.12 * hard} />
            <At x={780} y={2080} s={1.25}><Ravana10 t={t} spread={46} heads={1} rHand={[-150, -470]} rPose={HP.fist} lHand={[150, -470]} lPose={HP.fist} e={{ anger: 0.2 + 0.5 * hard, lookX: tw(s, [2.6, 3.2], [0, -0.6]), lookY: -0.7 * (1 - turn) }} /></At>
            <At x={260} y={2800} s={1.7}><FemBust look={LOOK.kaikesi} t={t} saree="#6a0e1a" border="#d9a336" veil e={{ lookX: tw(s, [2.4, 3.0], [-0.2, 0.8]), anger: 0.4 * hard, smile: 0.2 * (1 - hard) }} /></At>
          </g>
        ),
      })}
    </>
  );
};

/** S11 — रावण ने ब्रह्मा जी की घोर तपस्या@1.80 की: Ravana in tapasya, eyes shut, among rising fires */
const S11: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, z: tw(u, [0, dur], [1.0, 1.15], E), y: tw(u, [0, dur], [40, -20]) }), s);
  const fire = tw(s, [0, 1.8], [0.4, 1.2], E);
  return (
    <>
      {L({ d: 0.05, id: "l0", children: <g><rect x={-1500} y={-1500} width={4200} height={5000} fill="#120806" /><Stars seed={61} n={50} t={t} y1={900} /></g> })}
      {L({
        d: 1, id: "l1", children: (
          <g>
            <RealDefs />
            <ellipse cx={540} cy={1200} rx={560} ry={720} fill="#ff7a2a" opacity={0.16 * fire} />
            <rect x={-1500} y={1760} width={4200} height={2000} fill="#2a1408" />
            <At x={540} y={1900} s={1.3}><Ravana10 t={t} spread={46} o={{ ...OUT.ravana, lower: "seated", robe: "#9a1426" }} rHand={[-172, -425]} rPose={HP.gyan} rWrist={-20} lHand={[172, -425]} lPose={HP.gyan} lWrist={20} e={{ blink: 1, anger: 0.1 }} /></At>
            <Kund t={t} x={120} y={1820} s={0.9} fire={fire} />
            <Kund t={t + 0.5} x={960} y={1820} s={0.9} fire={fire} />
            <Fire t={t + 0.2} x={290} y={1880} s={0.8 * fire} />
            <Fire t={t + 0.7} x={790} y={1880} s={0.8 * fire} />
          </g>
        ),
      })}
      {L({ d: 1.4, id: "l2", dof: 4, children: <Particles t={t} seed={67} n={30} color="#ff9a4a" x0={-100} x1={1200} y0={300} y1={2000} speed={90} size={5} /> })}
    </>
  );
};

/** S12 — वरदान@0.08 पाकर लौटा, तो सीधे भाई को संदेश@2.88 भेजा@3.42 — "लंका@3.58 मेरी है, ख़ाली@5.53 करो": Ravana, glowing with the boon, points at Lanka; a burning message flies */
const S12: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, x: tw(u, [0, 3.2, 4.4], [-160, -160, 200], E), z: tw(u, [0, dur], [1.05, 1.0]), r: shake(u, 5.55, 1.2, 0.7) }), s);
  const boon = tw(s, [0, 1.0], [1, 0.4]);
  const point = tw(s, [2.6, 3.2], [0, 1], E);
  const fly = tw(s, [3.3, 4.6], [0, 1], E);
  const flash = pulse(s, 4.6, 0.5) + pulse(s, 5.55, 0.5);
  return (
    <>
      {L({ d: 0.05, id: "m0", children: <LankaNight t={t} red={0.25 + 0.4 * tw(s, [4.6, 5.6], [0, 1])} /> })}
      {L({ d: 0.35, id: "m1", children: <g transform="translate(1200 1500)"><Island t={t} gold={1} lit={1} w={1400} /><rect x={-700} y={-500} width={1400} height={700} fill="#ff3a1a" opacity={0.3 * flash} /></g> })}
      {L({
        d: 1, id: "m2", children: (
          <g>
            <RealDefs />
            <rect x={-1500} y={1720} width={3200} height={2000} fill="#1e0e0a" />
            <At x={420} y={2060} s={1.3}>
              <Ravana10 t={t} spread={48} glow={boon} aura="#ffd27a"
                rHand={[-150, -470]} rPose={HP.fist} lHand={[150 + 160 * point, -470 - 300 * point]} lPose={mixHand(HP.fist, HP.point, point)} lWrist={-10 * point}
                e={{ anger: 0.4 + 0.5 * point, open: 0.5 * pulse(s, 3.6, 0.6) + 0.6 * pulse(s, 5.5, 0.5), lookX: 0.8 * point }} />
            </At>
            {fly > 0 && fly < 1 && (
              <g transform={`translate(${720 + 900 * fly} ${1180 + 160 * fly - 220 * Math.sin(fly * Math.PI)}) rotate(${-10 + 30 * fly})`}>
                {[...Array(8)].map((_, i) => <circle key={i} cx={-40 - i * 34} cy={Math.sin(t * 20 + i) * 6} r={22 - i * 2.4} fill={i % 2 ? "#ff7a2a" : "#ffcf6a"} opacity={0.8 - i * 0.09} />)}
                <g transform="scale(0.4)"><Leaf seed={7} w={300} glow={1} /></g>
              </g>
            )}
          </g>
        ),
      })}
      {L({ d: 1.4, id: "m3", dof: 4, children: <Particles t={t} seed={71} n={24} color="#ffb05a" x0={-100} x1={1200} y0={300} y1={2000} speed={70} size={4} /> })}
    </>
  );
};

/** S13 — पिता@0.08 ने कुबेर को समझाया@1.42, रावण@2.46 से मत उलझो: Vishrava counsels; Kubera bows his head */
const S13: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, z: tw(u, [0, dur], [1.04, 1.12], E) }), s);
  const talk = tw(s, [0.2, 0.8], [0, 1], E);
  const bow = tw(s, [2.4, 3.2], [0, 1], E);
  return (
    <>
      {L({ d: 0.05, id: "n0", children: <g><Sky stops={[[-900, "#1a1030"], [600, "#3a2a4a"], [1300, "#7a4a3a"]]} /><Stars seed={73} n={40} t={t} y1={800} /></g> })}
      {L({ d: 0.4, id: "n1", children: <Ashram t={t} /> })}
      {L({
        d: 1, id: "n2", children: (
          <g>
            <RealDefs />
            <At x={300} y={1900} s={1.0}>
              <Hero look={LOOK.rishi2} o={OUT.rishiW} t={t} seed={6} rHand={[-110 - 40 * talk, -560 - 160 * talk]} rPose={mixHand(HP.relax, HP.bless, talk)} rWrist={-90 * talk}
                lHand={[160, -420]} lPose={HP.gyan} lWrist={20} e={{ lookX: 0.6, open: 0.3 * Math.abs(Math.sin(s * 9)) * (s < 3.3 ? 1 : 0) }} />
            </At>
            <At x={790} y={2020} s={1.05}><Kubera t={t} headTilt={-10 * bow} e={{ lookX: -0.6, lookY: 0.5 * bow, smile: 0.1 }} /></At>
          </g>
        ),
      })}
    </>
  );
};

/** S14 — और कुबेर@0.72 लंका@1.16 छोड़कर कैलाश@2.28 चले गए: the Pushpaka leaves Lanka (left) for the snows of Kailash (right) */
const S14: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, x: tw(u, [0, dur], [-260, 260], E), z: 1.0 }), s);
  const fly = tw(s, [0, dur], [0, 1], E);
  return (
    <>
      {L({ d: 0.05, id: "o0", children: <g><Sky stops={[[-900, "#101830"], [600, "#2a3a6a"], [1200, "#6a7aa8"], [1500, "#a8b0d0"]]} /><Stars seed={79} n={40} t={t} y1={800} /></g> })}
      {L({ d: 0.25, id: "o1", children: <g><Peaks y={1300} c="#4a5a8a" snow="#f0f2fa" seed={11} h={620} /></g> })}
      {L({ d: 0.4, id: "o2", children: <g><Sea t={t} y={1460} c="#141e3a" c2="#0a1226" line="#3a5a8a" /><g transform="translate(-140 1470)"><Island t={t} gold={1} lit={0.7} w={1100} /></g></g> })}
      {L({
        d: 1, id: "o3", children: (
          <g transform={`translate(${60 + 960 * fly} ${1080 - 260 * fly + Math.sin(t * 2) * 12})`}>
            <RealDefs />
            <g transform={`scale(${0.6 - 0.12 * fly})`}><Pushpaka t={t} rider={<Kubera t={t} pot={false} headTilt={-6} e={{ lookX: -0.7, smile: 0 }} />} riderS={0.36} /></g>
          </g>
        ),
      })}
    </>
  );
};

/** S15 — पर रावण@0.70 यहीं नहीं@1.44 रुका@1.60: Ravana roars, sword raised, fire behind */
const S15: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, z: tw(u, [0, 0.6, dur], [1.2, 1.05, 1.0], OUTE), r: shake(u, 1.45, 1.6, 0.6) }), s);
  const up = tw(s, [0.1, 0.8], [0, 1], E);
  const roar = tw(s, [1.2, 1.6], [0, 1], OUTE);
  return (
    <>
      {L({ d: 0.05, id: "p0", children: <LankaNight t={t} red={1} /> })}
      {L({ d: 0.4, id: "p1", children: <g>{[...Array(5)].map((_, i) => <Fire key={i} t={t + i} x={-100 + i * 320} y={1620} s={2.0} />)}</g> })}
      {L({
        d: 1, id: "p2", children: (
          <g>
            <RealDefs />
            <At x={540} y={2120} s={1.42}>
              <Ravana10 t={t} scatter={0.25} spread={50}
                rHand={[-200 - 60 * up, -500 - 480 * up]} rPose={mixHand(HP.fist, HP.grip, Math.min(1, up * 2))} rProp={<g transform={`rotate(${60 * up})`} opacity={Math.min(1, up * 3)}><Sword /></g>}
                lHand={[150, -470]} lPose={HP.fist} e={{ anger: 0.6 + 0.4 * roar, open: 0.8 * roar }} />
            </At>
          </g>
        ),
      })}
      {L({ d: 1.4, id: "p3", dof: 4, children: <Particles t={t} seed={83} n={36} color="#ff7a3a" x0={-100} x1={1200} y0={0} y1={2000} speed={150} size={5} /> })}
    </>
  );
};

/** S16 — उसने कुबेर@0.80 की नगरी@1.32 पर चढ़ाई की, अपने ही भाई@3.43 को युद्ध@3.70 में हराया@4.20... और पुष्पक@4.98 विमान भी छीन@6.02 लिया */
const SWA = 80, SWB = -35, GDA = 5, GDB = 90; // weapon angles in the hand frame: ~90 = along the forearm
const S16: React.FC<SP> = ({ t, s, dur }) => {
  const takeAt = 4.5;
  const take = s >= takeAt;
  const L = rig((u) => (u < takeAt
    ? { ...C0, x: tw(u, [0, 3.5], [-120, 0], E), z: tw(u, [0, 3.5, 3.9], [1.0, 1.06, 1.14], E), r: shake(u, 3.72, 1.6, 0.8) }
    : { ...C0, y: tw(u, [takeAt, dur], [120, -60], E), z: tw(u, [takeAt, dur], [1.08, 1.0], E) }), s);
  const charge = tw(s, [1.2, 3.4], [0, 1], E);
  const swing = tw(s, [3.2, 3.72], [0, 1], E);
  const block = tw(s, [2.6, 3.4], [0, 1], E);
  const fall = tw(s, [3.8, 4.4], [0, 1], E);
  const flash = pulse(s, 3.72, 0.35);
  const rise = tw(s, [takeAt, dur], [0, 1], E);
  return take ? (
    <>
      {L({ d: 0.05, id: "q4", children: <Alaka t={t} /> })}
      {L({ d: 0.4, id: "q5", children: <g>{[...Array(4)].map((_, i) => <Fire key={i} t={t + i} x={-60 + i * 380} y={1520} s={1.3} />)}</g> })}
      {L({
        d: 1, id: "q6", children: (
          <g transform={`translate(560 ${1240 - 260 * rise + Math.sin(t * 2) * 10})`}>
            <RealDefs />
            <g transform="scale(0.8)"><Pushpaka t={t} glow={1.2} rider={<Ravana10 t={t} spread={44} rHand={[-200, -980]} rPose={HP.grip} rProp={<g transform="rotate(50)"><Sword /></g>} lHand={[150, -470]} lPose={HP.fist} e={{ anger: 0.5, smile: 0.6 }} />} riderS={0.4} /></g>
          </g>
        ),
      })}
    </>
  ) : (
    <>
      {L({ d: 0.05, id: "q0", children: <Alaka t={t} /> })}
      {L({
        d: 1, id: "q1", children: (
          <g>
            <RealDefs />
            <g transform={`translate(${-200 + 200 * charge} 0)`}>
              <At x={300} y={2040} s={1.15}>
                <Ravana10 t={t} spread={46} scatter={0.2 * charge} rHand={[-150, -470]} rPose={HP.fist}
                  lHand={[200 + 50 * swing, -980 + 90 * swing]} lPose={HP.grip} lProp={<g transform={`rotate(${SWA + SWB * swing})`}><Sword /></g>}
                  e={{ anger: 0.8, open: 0.5 * charge, lookX: 0.8 }} />
              </At>
            </g>
            <g transform={`rotate(${22 * fall} 820 2040) translate(${80 * fall} 0)`} opacity={1 - 0.3 * fall}>
              <At x={800} y={2040} s={1.12} flip>
                <Kubera t={t} pot={false} rHand={[-138, -400]} rPose={HP.hang}
                  lHand={[170 + 90 * block, -520 - 260 * block]} lPose={HP.grip} lWrist={0} lProp={<g transform={`rotate(${GDA + GDB * block})`}><Gada len={300} /></g>}
                  e={{ anger: 0.5 * (1 - fall), fear: fall, lookX: 0.8 }} />
              </At>
            </g>
            {flash > 0 && <g><circle cx={560} cy={900} r={180 * flash} fill="#fff6d0" opacity={flash} />{[...Array(10)].map((_, i) => <path key={i} d={`M560 900 L${560 + Math.cos(i * 0.63) * 300 * flash} ${900 + Math.sin(i * 0.63) * 300 * flash}`} stroke="#ffe08a" strokeWidth={6} opacity={flash} />)}</g>}
          </g>
        ),
      })}
      {L({ d: 1.4, id: "q2", dof: 4, children: <Particles t={t} seed={89} n={30} color="#ffffff" x0={-100} x1={1200} y0={0} y1={2000} speed={-60} size={5} up={false} /> })}
    </>
  );
};

/** S17 — सालों बाद... श्रीराम@2.49 उसी पुष्पक@3.71 में अयोध्या@4.67 लौटे... और फिर@5.67 विमान उसके असली मालिक, कुबेर@7.79 को लौटा@8.41 दिया */
const S17: React.FC<SP> = ({ t, s, dur }) => {
  const back = s >= 5.5;
  const L = rig((u) => (u < 5.5 ? { ...C0, x: tw(u, [0, 5.5], [-160, 160]), z: 1.0 } : { ...C0, z: tw(u, [5.5, dur], [1.1, 1.0], E) }), s);
  const fly = tw(s, [0, 5.5], [0, 1], E);
  const glide = tw(s, [5.6, 7.9], [0, 1], E);
  const greet = tw(s, [7.6, 8.4], [0, 1], E);
  return back ? (
    <>
      {L({ d: 0.05, id: "r3", children: <Alaka t={t} /> })}
      {L({
        d: 1, id: "r4", children: (
          <g>
            <RealDefs />
            <ellipse cx={540} cy={1400} rx={540} ry={500} fill="#ffe6a8" opacity={0.15 + 0.15 * greet} />
            <g transform={`translate(${1600 - 820 * glide} ${880 + 420 * glide + Math.sin(t * 2) * 10}) scale(0.5)`}><Pushpaka t={t} glow={1.2} /></g>
            <At x={270} y={2060} s={1.05}><Kubera t={t} pot={false} rHand={[-150 - 30 * greet, -430 - 340 * greet]} rPose={mixHand(HP.hang, HP.bless, greet)} rWrist={-90 * greet} e={{ smile: 0.3 + 0.4 * greet, lookX: 0.7, lookY: -0.4 * (1 - greet) }} /></At>
          </g>
        ),
      })}
      {L({ d: 1.4, id: "r5", dof: 4, children: <Particles t={t} seed={97} n={20} color="#fff0c0" x0={-100} x1={1200} y0={0} y1={2000} speed={26} size={4} /> })}
    </>
  ) : (
    <>
      {L({
        d: 0.05, id: "r0", children: (
          <g>
            <Sky stops={[[-900, "#3a5a9a"], [600, "#8ab0d8"], [1100, "#f4d0a0"], [1500, "#ffe2b0"]]} />
            <circle cx={900} cy={1120} r={180} fill="#fff4d0" opacity={0.7} />
          </g>
        ),
      })}
      {L({
        d: 0.3, id: "r1", children: (
          <g>
            <g transform={`translate(1100 1420) scale(${0.8 + 0.4 * fly})`}><LankaCity w={1100} lit={0.9} c="#f4e6c4" c2="#c8a46a" /></g>
            <rect x={-1500} y={1420} width={4200} height={2000} fill="#7a8a4a" />
          </g>
        ),
      })}
      {L({
        d: 1, id: "r2", children: (
          <g transform={`translate(${200 + 640 * fly} ${980 + 160 * fly + Math.sin(t * 2) * 12})`}>
            <RealDefs />
            <g transform={`scale(${0.9 - 0.25 * fly})`}>
              <Pushpaka t={t} glow={1.2} riderS={0.4} rider={
                <g>
                  <g transform="translate(-260 0)"><FemBust look={SITA} t={t} saree="#c8282e" border="#d9a336" e={{ smile: 0.5, lookX: 0.5 }} /></g>
                  <Hero look={RAMA} o={RAMA_O} t={t} seed={2} rHand={[-138, -400]} rPose={HP.hang} lHand={[138, -400]} lPose={HP.hang} e={{ smile: 0.5, lookX: 0.6 }} />
                </g>
              } />
            </g>
          </g>
        ),
      })}
    </>
  );
};

/** S18 — यानी रावण@0.70 की लंका@1.30 भी छीनी@1.88 हुई थी... और उसका विमान@3.24 भी@3.68: Ravana's empty throne before golden Lanka; the Pushpaka glides away */
const S18: React.FC<SP> = ({ t, s, dur }) => {
  const L = rig((u) => ({ ...C0, z: tw(u, [0, dur], [1.12, 0.98], E), y: tw(u, [0, dur], [40, -40]) }), s);
  const crack = tw(s, [1.6, 2.2], [0, 1], E);
  const away = tw(s, [2.6, dur], [0, 1], E);
  return (
    <>
      {L({ d: 0.05, id: "s0", children: <LankaNight t={t} red={0.2} /> })}
      {L({ d: 0.3, id: "s1", children: <g transform="translate(540 1440)"><Island t={t} gold={1} lit={1 - 0.6 * crack} w={1900} /></g> })}
      {L({
        d: 0.55, id: "s2", children: (
          <g opacity={1 - Math.max(0, away - 0.85) / 0.15}>
            <g transform={`translate(${500 + 900 * away} ${560 - 380 * away + Math.sin(t * 2) * 10}) scale(${0.4 - 0.2 * away})`}><Pushpaka t={t} glow={1.3} /></g>
          </g>
        ),
      })}
      {L({
        d: 1, id: "s3", children: (
          <g>
            <RealDefs />
            <ellipse cx={540} cy={1500} rx={460} ry={380} fill="#ffcf6a" opacity={0.18 * (1 - crack * 0.6)} />
            <rect x={-1500} y={1860} width={4200} height={2000} fill="#2a140a" />
            <rect x={-1500} y={1860} width={4200} height={10} fill="#e9c27a" opacity={0.5} />
            <g transform="translate(540 1880)"><Throne s={0.95} /></g>
            <path d="M400 1500 L420 1560 L400 1620 L430 1690 L410 1760" stroke="#2a1006" strokeWidth={5} fill="none" opacity={crack} pathLength={1} strokeDasharray={`${crack} 1`} />
          </g>
        ),
      })}
      {L({ d: 1.1, id: "s4", children: <Crack k={crack} flash={pulse(s, 1.9, 0.4)} /> })}
      {L({ d: 1.4, id: "s5", dof: 4, children: <Particles t={t} seed={101} n={24} color="#ffcf6a" x0={-100} x1={1200} y0={300} y1={2000} speed={40} size={4} /> })}
    </>
  );
};

const SHOTS = [S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16, S17, S18];

export const LankaKuber: React.FC<{ manifest?: Manifest }> = ({ manifest }) => {
  const t = useCurrentFrame() / FPS;
  if (!manifest) return null;
  const B = manifest.scenes.map((x) => x.start).concat(manifest.duration);
  const i = Math.max(0, Math.min(SHOTS.length - 1, B.findIndex((b, k) => t >= b && t < B[k + 1])));
  const Shot = SHOTS[i];
  const cutFlash = i > 0 ? Math.max(0, 1 - (t - B[i]) / 0.1) * 0.18 : 0;
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0710", overflow: "hidden" }}>
      <Audio src={staticFile("mg/example-lanka-kuber/mix.wav")} />
      <Audio src={staticFile("mg/example-lanka-kuber/sfx.wav")} volume={0.55} />
      <Shot t={t} s={t - B[i]} dur={B[i + 1] - B[i]} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 42%, transparent 55%, rgba(0,0,0,0.55) 100%)" }} />
      {cutFlash > 0 && <AbsoluteFill style={{ background: "#fff3dc", opacity: cutFlash, mixBlendMode: "screen" }} />}
    </AbsoluteFill>
  );
};

const calculateMetadata: CalculateMetadataFunction<{ manifest?: Manifest }> = async ({ props }) => {
  const manifest: Manifest = await (await fetch(staticFile("mg/example-lanka-kuber/manifest.json"))).json();
  return { durationInFrames: Math.ceil(manifest.duration * FPS), props: { ...props, manifest } };
};

export const LankaKuberComposition = () => (
  <Composition id="REEL-example-lanka-kuber" component={LankaKuber} calculateMetadata={calculateMetadata} defaultProps={{}} durationInFrames={82 * FPS} fps={FPS} width={W} height={H} />
);
