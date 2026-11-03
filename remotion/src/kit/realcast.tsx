/**
 * Characters for the "real" reels, built on ./real (Ravi Varma-style detail). Looks: Ravana from Ravi Varma's Jatayu Vadh
 * (dark skin, handlebar moustache, long hair, pearl ropes, red-gold silk, green uttariya, tripundra of a Shiva devotee);
 * Hiranyakashipu as a daitya emperor (bronze skin, full beard, purple silk, gada); Mitra golden (sun), Varuna blue
 * (waters, pasha); rishis with jata, rudraksha and white beards; a rakshasa of the night (fangs, wild hair, horns);
 * Agni red with flame hair; Diti and Kaikesi as portrait busts.
 */
import React from "react";
import { AbsoluteFill, Composition } from "remotion";
import { ARMS, archer, Gada, Hand, HP, Hero, Lotus, Pasha, RealDefs, RHead, RL, Sruva, Sword, type Char, type Look, type Outfit } from "./real";

export const LOOK: Record<string, Look> = {
  ravana: { skin: "#6a4530", line: "#2a160c", hair: "#0e0806", crown: "kirita", stache: "handle", tilak: "tripundra", gem: RL.ruby },
  hiranya: { skin: "#9a6a3c", line: "#3a220e", hair: "#120a06", crown: "kirita", beard: "full", stache: "full", tilak: "dot", gem: RL.emer, eye: "#4a1a08" },
  mitra: { skin: "#d6a064", line: "#6a3e16", hair: "#1a0e06", crown: "mukuta", tilak: "urdhva", gem: RL.ruby },
  varuna: { skin: "#4a6a9a", line: "#16243e", hair: "#0a1020", crown: "kirita", stache: "thin", tilak: "urdhva", gem: RL.saph },
  rishi: { skin: "#b47c52", line: "#4a2a14", hair: "#d8d4cc", beardC: "#ece8e0", crown: "jata", beard: "sage", stache: "sage", tilak: "tripundra" },
  rishi2: { skin: "#a06a44", line: "#40220e", hair: "#bdb6aa", beardC: "#d6d0c4", crown: "jata", beard: "sage", stache: "sage", tilak: "urdhva" },
  rakshasa: { skin: "#3c4256", line: "#10121c", hair: "#0a0a10", crown: "wild", fangs: true, horns: true, eye: "#ff3a1a", stache: "thin", gem: RL.ruby },
  agni: { skin: "#c8482a", line: "#5a160a", hair: "#ff6a1a", crown: "flame", tilak: "dot", gem: RL.ruby, eye: "#5a1a04" },
  diti: { skin: "#c08a5c", line: "#5a3418", hair: "#0e0806", fem: true, tilak: "dot", gem: RL.emer },
  kaikesi: { skin: "#7a5038", line: "#2e180c", hair: "#0a0606", fem: true, tilak: "dot", gem: RL.ruby },
  indra: { skin: "#dcaa76", line: "#6a3e1a", hair: "#140c06", crown: "kirita", stache: "thin", tilak: "urdhva", gem: RL.saph },
  asura: { skin: "#7a5636", line: "#2a160a", hair: "#0e0806", crown: "none", beard: "short", stache: "full", eye: "#4a1206" },
  deva: { skin: "#d8a878", line: "#6a3e1a", hair: "#140c06", crown: "mukuta", stache: "thin", gem: RL.emer },
  maricha: { skin: "#4a3a52", line: "#10121c", hair: "#0a0a10", crown: "wild", fangs: true, eye: "#ff3a1a", stache: "thin", gem: RL.ruby },
  hanuman: { skin: "#c27838", line: "#4a220c", hair: "#9a5220", muzzle: "#eaa98a", vanara: true, crown: "mukuta", tilak: "urdhva", gem: RL.ruby, eye: "#3a1a06" },
  vanara: { skin: "#8a6a4a", line: "#3a2410", hair: "#6a4a2a", muzzle: "#d8a088", vanara: true, crown: "none", eye: "#3a1a06" },
  lakshmana: { skin: "#d8a070", line: "#6a3e1a", hair: "#140c06", crown: "mukuta", tilak: "urdhva", gem: RL.emer },
  rama: { skin: "#4f6f96", line: "#18263e", hair: "#0e0a08", crown: "mukuta", tilak: "urdhva", gem: RL.ruby },
  /** head/portrait only — Body has no female torso yet; use RHead or the FemBust pattern in examples/AsurRakshas.tsx */
  // sita: head/portrait only — Body has no female torso yet; use RHead or the FemBust pattern in examples/AsurRakshas.tsx
  sita: { skin: "#e0aa7a", line: "#6a3e1a", hair: "#0e0806", fem: true, tilak: "dot", gem: RL.ruby },
  krishna: { skin: "#3e5f8e", line: "#141f36", hair: "#0a0806", crown: "mukuta", tilak: "urdhva", gem: RL.emer },
};

export const OUT: Record<string, Outfit> = {
  ravana: { dhoti: "#9a1426", border: "#d9a336", sash: "#1d6a3a", pearls: 3, hara: true, lower: "long" },
  hiranya: { dhoti: "#4a1a64", border: "#d9a336", sash: "#b8862e", pearls: 2, hara: true, lower: "long", armour: undefined },
  mitra: { dhoti: "#e0a020", border: "#b8401a", sash: "#c8302a", pearls: 2, hara: true, lower: "long" },
  varuna: { dhoti: "#e8eef6", border: "#2a4a9a", sash: "#2a5ad8", pearls: 2, hara: true, lower: "long" },
  rishi: { dhoti: "#d8742a", border: "#a04a12", rudraksha: true, janeu: true, lower: "seated", belt: false, anklets: false, robe: "#d8742a" },
  rishiW: { dhoti: "#ece4d0", border: "#b89a5a", rudraksha: true, janeu: true, lower: "seated", belt: false, anklets: false, robe: "#ece4d0" },
  rakshasa: { dhoti: "#2a1a1a", border: "#6a1a1a", lower: "knee", belt: false, pearls: 0 },
  agni: { dhoti: "#e05a1a", border: "#ffd34a", sash: "#ffb02a", pearls: 1, hara: true, lower: "long" },
  indra: { dhoti: "#f2ecde", border: "#c8962e", sash: "#2a5ad8", pearls: 2, hara: true, lower: "long" },
  asura: { dhoti: "#3e1a4e", border: "#b8862e", lower: "knee", armour: "#4a3226", belt: true },
  deva: { dhoti: "#efe4cc", border: "#c8962e", lower: "knee", pearls: 1 },
  hanuman: { dhoti: "#e8b020", border: "#c8302a", sash: "#c8302a", pearls: 3, hara: true, lower: "knee", tail: "#b0642a" },
  vanara: { dhoti: "#8a3a1a", border: "#c8962e", lower: "knee", tail: "#7a5a3a", belt: false, pearls: 0 },
  lakshmana: { dhoti: "#e8c060", border: "#c8962e", sash: "#2a8a4a", pearls: 2, hara: true, lower: "long" },
  rama: { dhoti: "#e8b828", border: "#b8302a", sash: "#c8302a", pearls: 2, hara: true, lower: "long" },
  krishna: { dhoti: "#f0c020", border: "#2a6a4a", sash: "#2a8a5a", pearls: 2, hara: true, lower: "long" },
};

/** Ravana with nine more heads in a row behind the main one (Ravi Varma Press "Angad Shishtai" arrangement). */
export const Ravana10: React.FC<Omit<Char, "look" | "o"> & { scatter?: number; heads?: number; spread?: number }> = (p) => {
  const { t, e = {}, scatter = 0, heads = 1, spread = 96 } = p;
  const extra: React.ReactNode[] = [];
  for (let i = 4; i >= 1; i--) {
    for (const sx of [-1, 1]) {
      const k = Math.min(1, Math.max(0, heads * 5 - (i - 1)));
      if (k <= 0) continue;
      const look = Math.max(-1, Math.min(1, (e.lookX ?? 0) + sx * 0.35 + scatter * Math.sin(t * 4 + i * 2.1 + sx)));
      extra.push(
        <g key={`${i}${sx}`} transform={`translate(${sx * i * spread * k} ${-850 + i * 4}) scale(${0.9 - i * 0.025})`} opacity={k}>
          <RHead look={LOOK.ravana} t={t} seed={i * 3 + (sx > 0 ? 1 : 0)} e={{ ...e, lookX: look, anger: (e.anger ?? 0) * (0.8 + 0.1 * i) }} />
        </g>,
      );
    }
  }
  return <Hero {...p} look={LOOK.ravana} o={OUT.ravana} extraHeads={<g>{extra}</g>} />;
};

// ---------------------------------------------------------------- model sheet (QA)

const SheetCell: React.FC<{ x: number; y: number; s: number; children: React.ReactNode }> = ({ x, y, s, children }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>{children}</g>
);

export const RealSheet: React.FC<{ part: number }> = ({ part }) => {
  const t = 1.3;
  return (
    <AbsoluteFill style={{ background: "#2a2430" }}>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920">
        <RealDefs />
        {part === 0 && (
          <g>
            <SheetCell x={300} y={1000} s={0.82}>
              <Ravana10 t={t} rHand={[-250, -980]} rPose={HP.grip} rProp={<Sword />} lHand={[170, -470]} lPose={HP.relax} e={{ anger: 0.6 }} />
            </SheetCell>
            <SheetCell x={800} y={1000} s={0.82}>
              <Hero look={LOOK.hiranya} o={OUT.hiranya} t={t} rHand={[-120, -560]} rPose={HP.grip} rProp={<Gada />} lHand={[200, -420]} lPose={HP.relax} e={{ anger: 0.3 }} />
            </SheetCell>
            <SheetCell x={260} y={1900} s={0.82}>
              <Hero look={LOOK.mitra} o={OUT.mitra} t={t} rHand={[-110, -620]} rPose={HP.bless} rWrist={-90} lHand={[150, -480]} lPose={HP.grip} lProp={<Lotus />} e={{ smile: 0.5 }} glow={1} />
            </SheetCell>
            <SheetCell x={800} y={1900} s={0.82}>
              <Hero look={LOOK.varuna} o={OUT.varuna} t={t} rHand={[-200, -560]} rPose={HP.grip} rProp={<Pasha t={t} />} lHand={[120, -620]} lPose={HP.bless} lWrist={90} e={{ smile: 0.2 }} />
            </SheetCell>
          </g>
        )}
        {part === 1 && (
          <g>
            <SheetCell x={270} y={760} s={0.8}>
              <Hero look={LOOK.rishi} o={OUT.rishi} t={t} rHand={[-60, -560]} rPose={HP.grip} rProp={<Sruva />} lHand={[110, -470]} lPose={HP.gyan} lWrist={-80} />
            </SheetCell>
            <SheetCell x={800} y={1000} s={0.8}>
              <Hero look={LOOK.rakshasa} o={OUT.rakshasa} t={t} bulk={1.15} rHand={[-260, -760]} rPose={HP.claw} lHand={[230, -620]} lPose={HP.claw} e={{ anger: 1, open: 0.6 }} />
            </SheetCell>
            <SheetCell x={300} y={1880} s={0.8}>
              <Hero look={LOOK.agni} o={OUT.agni} t={t} rHand={[-220, -900]} rPose={HP.open} rWrist={-80} lHand={[220, -900]} lPose={HP.open} lWrist={80} glow={1.4} aura="#ff7a2a" e={{ anger: 0.3, open: 0.3 }} />
            </SheetCell>
            <SheetCell x={760} y={1350} s={1.5}>
              <RHead look={LOOK.diti} t={t} e={{ smile: 0.3 }} />
            </SheetCell>
            <SheetCell x={760} y={1700} s={1.5}>
              <RHead look={LOOK.kaikesi} t={t} e={{ lookX: -0.5 }} />
            </SheetCell>
          </g>
        )}
        {part === 4 && (
          <g>
            {/* row 1: archer at rest on the string, half draw, full draw; row 2: aiming up, aiming down, mirrored */}
            <SheetCell x={180} y={900} s={0.55}><Hero look={LOOK.rama} o={OUT.rama} t={t} {...archer({ aim: 0, draw: 0 })} /></SheetCell>
            <SheetCell x={540} y={900} s={0.55}><Hero look={LOOK.rama} o={OUT.rama} t={t} {...archer({ aim: 0, draw: 0.5 })} /></SheetCell>
            <SheetCell x={880} y={900} s={0.55}><Hero look={LOOK.lakshmana} o={OUT.lakshmana} t={t} {...archer({ aim: 0, draw: 1 })} /></SheetCell>
            <SheetCell x={180} y={1450} s={0.55}><Hero look={LOOK.rama} o={OUT.rama} t={t} {...archer({ aim: -30, draw: 1 })} /></SheetCell>
            <SheetCell x={540} y={1450} s={0.55}><Hero look={LOOK.rama} o={OUT.rama} t={t} {...archer({ aim: 15, draw: 1 })} /></SheetCell>
            <g transform="translate(900 1450) scale(-0.55 0.55)"><Hero look={LOOK.vanara} o={OUT.vanara} t={t} {...archer({ aim: -10, draw: 1, bow: { wood: "#4a3020" } })} /></g>
            {/* row 3: arm presets */}
            <SheetCell x={120} y={1890} s={0.4}><Hero look={LOOK.indra} o={OUT.indra} t={t} {...ARMS.rest} /></SheetCell>
            <SheetCell x={300} y={1890} s={0.4}><Hero look={LOOK.indra} o={OUT.indra} t={t} {...ARMS.akimbo} /></SheetCell>
            <SheetCell x={480} y={1890} s={0.4}><Hero look={LOOK.indra} o={OUT.indra} t={t} {...ARMS.bless} /></SheetCell>
            <SheetCell x={660} y={1890} s={0.4}><Hero look={LOOK.indra} o={OUT.indra} t={t} {...ARMS.namaste} /></SheetCell>
            <SheetCell x={830} y={1890} s={0.4}><Hero look={LOOK.hanuman} o={OUT.hanuman} t={t} {...ARMS.holdUpright} rProp={<Gada />} /></SheetCell>
            <SheetCell x={990} y={1890} s={0.4}><Hero look={LOOK.rama} o={OUT.rama} t={t} {...ARMS.bowAtSide} /></SheetCell>
          </g>
        )}
        {part === 3 && (
          <g>
            {(["rama", "lakshmana", "hanuman", "krishna", "indra", "asura", "deva", "vanara"] as const).map((k, i) => (
              <SheetCell key={k} x={150 + (i % 4) * 260} y={i < 4 ? 930 : 1880} s={0.5}>
                <Hero look={LOOK[k]} o={OUT[k]} t={t} rHand={[-150, -420]} rPose={HP.relax} lHand={[150, -560]} lPose={HP.bless} lWrist={90} />
              </SheetCell>
            ))}
          </g>
        )}
        {part === 2 && (
          <g>
            <SheetCell x={300} y={330} s={2.4}><RHead look={LOOK.ravana} t={t} e={{ anger: 0.5 }} /></SheetCell>
            <SheetCell x={800} y={330} s={2.4}><RHead look={LOOK.hiranya} t={t} e={{ anger: 0.2 }} /></SheetCell>
            <SheetCell x={300} y={820} s={2.4}><RHead look={LOOK.rishi} t={t} e={{ smile: 0.3 }} /></SheetCell>
            <SheetCell x={800} y={820} s={2.4}><RHead look={LOOK.rakshasa} t={t} e={{ anger: 1, open: 0.7 }} /></SheetCell>
            {/* hands at 4x in arm frames pointing down */}
            {[HP.grip, HP.open, HP.point, HP.relax, HP.fist, HP.gyan].map((p, i) => (
              <g key={i} transform={`translate(${110 + i * 175} 1280) rotate(90) scale(3)`}>
                <Hand pose={p} skin={LOOK.ravana.skin} line={LOOK.ravana.line} prop={i === 0 ? <g transform="rotate(-90)"><Sword len={60} /></g> : undefined} />
              </g>
            ))}
            {[HP.grip, HP.bless, HP.claw].map((p, i) => (
              <g key={i} transform={`translate(${200 + i * 330} 1620) rotate(${i === 1 ? -90 : 90}) scale(3)`}>
                <Hand pose={p} skin={LOOK.mitra.skin} line={LOOK.mitra.line} />
              </g>
            ))}
          </g>
        )}
      </svg>
    </AbsoluteFill>
  );
};

export const RealSheetComposition = () => (
  <>
    <Composition id="MG-real-sheet" component={RealSheet} durationInFrames={1} fps={60} width={1080} height={1920} defaultProps={{ part: 0 }} />
    <Composition id="MG-real-sheet1" component={RealSheet} durationInFrames={1} fps={60} width={1080} height={1920} defaultProps={{ part: 1 }} />
    <Composition id="MG-real-sheet2" component={RealSheet} durationInFrames={1} fps={60} width={1080} height={1920} defaultProps={{ part: 2 }} />
  </>
);
