/**
 * "Real" cast kit (2 Nov): painted-realism characters for the Asur-vs-Rakshas and Sanjeevani reels.
 * Look taken from Raja Ravi Varma's paintings (Jatayu Vadh 1895/1906, the Ravi Varma Press Hanuman): human proportions
 * (≈7.5 heads), shaded skin, five-finger hands that grip / point / bless, kadas, armlets, rings, layered pearl and gold
 * necklaces, zari-bordered silk, crowns with set stones.
 * Conventions: origin between the feet, up is negative y, ≈900 tall at scale 1 (head top −900, chin −776);
 * rHand = the character's right hand = viewer LEFT. Each limb is drawn in its own bone frame so a cylinder gradient
 * shades it across its width; the key light comes from the upper left.
 */
import React from "react";
import { limb, type P } from "./cast";

export const RL = {
  gold: "url(#rl-gold)", goldH: "url(#rl-goldH)", pearl: "url(#rl-pearl)", ruby: "url(#rl-ruby)", emer: "url(#rl-emer)", saph: "url(#rl-saph)",
  goldD: "#7a4c10", goldL: "#ffe9a0",
};

/** Shared gradients — render once per SVG layer that holds real-cast characters (ids are global, duplicates are harmless). */
export const RealDefs: React.FC = () => (
  <defs>
    <linearGradient id="rl-cylA" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#000" stopOpacity={0.34} />
      <stop offset="0.12" stopColor="#fff" stopOpacity={0.2} />
      <stop offset="0.32" stopColor="#fff" stopOpacity={0.07} />
      <stop offset="0.6" stopColor="#000" stopOpacity={0} />
      <stop offset="0.86" stopColor="#000" stopOpacity={0.3} />
      <stop offset="1" stopColor="#000" stopOpacity={0.5} />
    </linearGradient>
    <linearGradient id="rl-cylB" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stopColor="#000" stopOpacity={0.34} />
      <stop offset="0.12" stopColor="#fff" stopOpacity={0.2} />
      <stop offset="0.32" stopColor="#fff" stopOpacity={0.07} />
      <stop offset="0.6" stopColor="#000" stopOpacity={0} />
      <stop offset="0.86" stopColor="#000" stopOpacity={0.3} />
      <stop offset="1" stopColor="#000" stopOpacity={0.5} />
    </linearGradient>
    <radialGradient id="rl-torso" cx="0.4" cy="0.28" r="0.85">
      <stop offset="0" stopColor="#fff" stopOpacity={0.2} />
      <stop offset="0.4" stopColor="#fff" stopOpacity={0} />
      <stop offset="0.8" stopColor="#000" stopOpacity={0.28} />
      <stop offset="1" stopColor="#000" stopOpacity={0.5} />
    </radialGradient>
    <radialGradient id="rl-face" cx="0.4" cy="0.36" r="0.72">
      <stop offset="0" stopColor="#fff" stopOpacity={0.2} />
      <stop offset="0.45" stopColor="#fff" stopOpacity={0} />
      <stop offset="0.85" stopColor="#000" stopOpacity={0.26} />
      <stop offset="1" stopColor="#000" stopOpacity={0.45} />
    </radialGradient>
    <linearGradient id="rl-gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#fff4c2" />
      <stop offset="0.28" stopColor="#f3c44e" />
      <stop offset="0.55" stopColor="#a8701a" />
      <stop offset="0.74" stopColor="#ffdf86" />
      <stop offset="1" stopColor="#7a4c10" />
    </linearGradient>
    <linearGradient id="rl-goldH" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#7a4c10" />
      <stop offset="0.3" stopColor="#ffe08a" />
      <stop offset="0.5" stopColor="#f3c44e" />
      <stop offset="0.72" stopColor="#a8701a" />
      <stop offset="1" stopColor="#ffe9a0" />
    </linearGradient>
    <radialGradient id="rl-pearl" cx="0.35" cy="0.3" r="0.75">
      <stop offset="0" stopColor="#ffffff" />
      <stop offset="0.45" stopColor="#efe8d8" />
      <stop offset="1" stopColor="#9e9480" />
    </radialGradient>
    <radialGradient id="rl-ruby" cx="0.35" cy="0.3" r="0.75">
      <stop offset="0" stopColor="#ffc2ca" />
      <stop offset="0.35" stopColor="#e3203f" />
      <stop offset="1" stopColor="#5a0414" />
    </radialGradient>
    <radialGradient id="rl-emer" cx="0.35" cy="0.3" r="0.75">
      <stop offset="0" stopColor="#c6ffe2" />
      <stop offset="0.35" stopColor="#15a05e" />
      <stop offset="1" stopColor="#023a1c" />
    </radialGradient>
    <radialGradient id="rl-saph" cx="0.35" cy="0.3" r="0.75">
      <stop offset="0" stopColor="#d2e2ff" />
      <stop offset="0.35" stopColor="#2a5ad8" />
      <stop offset="1" stopColor="#07164e" />
    </radialGradient>
    <linearGradient id="rl-silk" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#000" stopOpacity={0.38} />
      <stop offset="0.18" stopColor="#fff" stopOpacity={0.1} />
      <stop offset="0.34" stopColor="#000" stopOpacity={0.12} />
      <stop offset="0.5" stopColor="#fff" stopOpacity={0.16} />
      <stop offset="0.68" stopColor="#000" stopOpacity={0.14} />
      <stop offset="0.84" stopColor="#fff" stopOpacity={0.08} />
      <stop offset="1" stopColor="#000" stopOpacity={0.42} />
    </linearGradient>
    <linearGradient id="rl-drape" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#000" stopOpacity={0.3} />
      <stop offset="0.3" stopColor="#000" stopOpacity={0} />
      <stop offset="1" stopColor="#000" stopOpacity={0.35} />
    </linearGradient>
    <radialGradient id="rl-glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stopColor="#fff2c0" stopOpacity={0.9} />
      <stop offset="0.4" stopColor="#ffc860" stopOpacity={0.35} />
      <stop offset="1" stopColor="#ff9a30" stopOpacity={0} />
    </radialGradient>
  </defs>
);

const deg = (r: number) => (r * 180) / Math.PI;
const ang = (a: P, b: P) => Math.atan2(b[1] - a[1], b[0] - a[0]);
/** cylinder shading that keeps the lit side toward the upper-left whatever way the bone points */
const cylFor = (rad: number) => (-0.6 * Math.sin(rad) + 0.8 * Math.cos(rad) >= 0 ? "url(#rl-cylA)" : "url(#rl-cylB)");

// ---------------------------------------------------------------- jewels

export const Gem: React.FC<{ x: number; y: number; r: number; c?: string }> = ({ x, y, r, c = RL.ruby }) => (
  <g>
    <circle cx={x} cy={y} r={r + Math.max(1.5, r * 0.35)} fill={RL.gold} stroke={RL.goldD} strokeWidth={0.8} />
    <circle cx={x} cy={y} r={r} fill={c} />
    <circle cx={x - r * 0.35} cy={y - r * 0.38} r={Math.max(0.8, r * 0.28)} fill="#fff" opacity={0.9} />
  </g>
);

const Pearl: React.FC<{ x: number; y: number; r: number }> = ({ x, y, r }) => <circle cx={x} cy={y} r={r} fill={RL.pearl} />;

/** n pearls along a quadratic curve a → (control c) → b */
export const PearlString: React.FC<{ a: P; c: P; b: P; n: number; r: number; every?: number }> = ({ a, c, b, n, r, every = 0 }) => (
  <g>
    {[...Array(n)].map((_, i) => {
      const u = i / (n - 1);
      const x = (1 - u) ** 2 * a[0] + 2 * (1 - u) * u * c[0] + u * u * b[0];
      const y = (1 - u) ** 2 * a[1] + 2 * (1 - u) * u * c[1] + u * u * b[1];
      return every && i % every === 0 ? <circle key={i} cx={x} cy={y} r={r * 0.9} fill={RL.gold} /> : <Pearl key={i} x={x} y={y} r={r} />;
    })}
  </g>
);

/** wrist bangles across a bone at local x (in that bone's frame) */
const Kada: React.FC<{ x: number; w: number; n?: number }> = ({ x, w, n = 2 }) => (
  <g>
    {[...Array(n)].map((_, i) => (
      <g key={i}>
        <rect x={x - i * 9 - 4} y={-w / 2 - 4} width={8} height={w + 8} rx={4} fill={RL.goldH} stroke={RL.goldD} strokeWidth={0.8} />
        {i === 0 && [-0.3, 0, 0.3].map((k) => <circle key={k} cx={x - i * 9} cy={k * w} r={2.1} fill={RL.ruby} />)}
        {i === 1 && [-0.36, -0.12, 0.12, 0.36].map((k) => <circle key={k} cx={x - i * 9} cy={k * w} r={1.8} fill={RL.pearl} />)}
      </g>
    ))}
  </g>
);

/** armlet (bajuband) with a crest pointing to the shoulder and pearl drops, in the upper-arm frame */
const Armlet: React.FC<{ x: number; w: number; t: number }> = ({ x, w, t }) => (
  <g>
    <rect x={x - 6} y={-w / 2 - 3} width={12} height={w + 6} rx={5} fill={RL.goldH} stroke={RL.goldD} strokeWidth={0.8} />
    <path d={`M${x - 4} ${-12} L${x - 26} 0 L${x - 4} ${12} Q${x + 4} 0 ${x - 4} ${-12}Z`} fill={RL.gold} stroke={RL.goldD} strokeWidth={0.8} />
    <Gem x={x - 10} y={0} r={4.2} c={RL.emer} />
    {[-0.3, 0, 0.3].map((k, i) => (
      <g key={k}>
        <line x1={x + 6} y1={k * w} x2={x + 16 + Math.sin(t * 3 + i) * 1.5} y2={k * w} stroke={RL.goldD} strokeWidth={0.8} />
        <Pearl x={x + 18 + Math.sin(t * 3 + i) * 1.5} y={k * w} r={2.6} />
      </g>
    ))}
  </g>
);

// ---------------------------------------------------------------- limbs

/** one tapered, muscled bone segment from local 0 to L along +x */
const Seg: React.FC<{ L: number; w0: number; wm: number; w1: number; fill: string; line: string; rad: number; bulge?: number }> = ({ L, w0, wm, w1, fill, line, rad, bulge = 0.36 }) => {
  const d = `M0 ${-w0 / 2} C${L * bulge} ${-wm / 2 - 3} ${L * 0.72} ${-wm / 2 + 1} ${L} ${-w1 / 2} L${L} ${w1 / 2} C${L * 0.72} ${wm / 2} ${L * bulge} ${wm / 2 + 2} 0 ${w0 / 2}Z`;
  return (
    <g>
      <path d={d} fill={fill} stroke={line} strokeWidth={1.6} />
      <circle cx={0} cy={0} r={w0 / 2} fill={fill} />
      <circle cx={L} cy={0} r={w1 / 2} fill={fill} />
      <path d={d} fill={cylFor(rad)} />
    </g>
  );
};

export type HandPose = { curl: number[]; spread?: number; view?: "back" | "palm" | "side"; thumb?: number };
export const HP: Record<string, HandPose> = {
  relax: { curl: [0.2, 0.22, 0.3, 0.36, 0.42], spread: 0.3, view: "back" },
  hang: { curl: [0.15, 0.3, 0.38, 0.45, 0.5], spread: 0.2, view: "side" },
  fist: { curl: [0.9, 1, 1, 1, 1], view: "side", thumb: 0.9 },
  grip: { curl: [0.8, 0.86, 0.92, 0.96, 1], view: "side", thumb: 0.85 },
  open: { curl: [0.05, 0, 0, 0.02, 0.06], spread: 1, view: "palm" },
  bless: { curl: [0.1, 0.02, 0, 0.03, 0.08], spread: 0.5, view: "palm" },
  point: { curl: [0.7, 0, 0.95, 1, 1], spread: 0.2, view: "back" },
  claw: { curl: [0.4, 0.45, 0.5, 0.5, 0.55], spread: 1.3, view: "back" },
  gyan: { curl: [0.62, 0.66, 0.06, 0.12, 0.18], spread: 0.6, view: "palm" },
  hold: { curl: [0.35, 0.18, 0.2, 0.26, 0.32], spread: 0.9, view: "palm" },
};
export const mixHand = (a: HandPose, b: HandPose, k: number): HandPose => (k <= 0 ? a : k >= 1 ? b : {
  curl: a.curl.map((c, i) => c + (b.curl[i] - c) * k), spread: (a.spread ?? 0.3) + ((b.spread ?? 0.3) - (a.spread ?? 0.3)) * k, view: k < 0.5 ? a.view : b.view,
  thumb: (a.thumb ?? 0) + ((b.thumb ?? 0) - (a.thumb ?? 0)) * k,
});

const capsule = (x0: number, y0: number, x1: number, y1: number) => `M${x0} ${y0} L${x1} ${y1}`;

/**
 * A hand in the forearm frame: wrist at 0, fingers toward +x, thumb on the −y side (pass flip to mirror).
 * `prop` is drawn after the palm and before the fingers, so the fingers close over a grip at (60, 4).
 */
export const Hand: React.FC<{ pose: HandPose; skin: string; line: string; rings?: boolean; prop?: React.ReactNode; size?: number }> = ({ pose, skin, line, rings = true, prop, size = 1 }) => {
  const view = pose.view ?? "back";
  const cu = pose.curl;
  const sp = pose.spread ?? 0.3;
  const th = pose.thumb ?? cu[0];
  const LEN = [0, 40, 44, 41, 33];
  const WID = [11.5, 10, 10.4, 9.6, 8.4];
  const nail = "#f0d0bc";
  const fingerEls: React.ReactNode[] = [];
  let palmEl: React.ReactNode;
  let thumbEl: React.ReactNode;
  const seg = (k: string, a0: number, b0: number, a1: number, b1: number, w: number, dark = 0) => (
    <g key={k}>
      <path d={capsule(a0, b0, a1, b1)} stroke={line} strokeWidth={w + 2} strokeLinecap="round" />
      <path d={capsule(a0, b0, a1, b1)} stroke={skin} strokeWidth={w} strokeLinecap="round" />
      <path d={capsule(a0, b0, a1, b1)} stroke="#fff" strokeOpacity={0.1} strokeWidth={w * 0.3} strokeLinecap="round" transform={`translate(0 ${-w * 0.22})`} />
      {dark > 0 && <path d={capsule(a0, b0, a1, b1)} stroke="#000" strokeOpacity={dark} strokeWidth={w} strokeLinecap="round" />}
    </g>
  );
  if (view === "side") {
    const palm = "M0 -14 C16 -17 34 -18 50 -14 C55 -5 55 7 50 14 C38 19 18 20 3 15Z";
    palmEl = (
      <g key="palm">
        <path d={palm} fill={skin} stroke={line} strokeWidth={1.3} />
        <path d={palm} fill="url(#rl-cylA)" />
      </g>
    );
    // four fingers stacked in depth: pinky farthest (drawn first, darkest), index nearest
    for (let f = 4; f >= 1; f--) {
      const c = cu[f];
      let x = 50 - (f - 1) * 1.5;
      let y = -11 + (f - 1) * 5.6;
      let a = 0.05 * (f - 2);
      const pts: P[] = [[x, y]];
      [0.46, 0.3, 0.24].forEach((r, j) => {
        a += c * [1.3, 1.6, 1.05][j];
        x += Math.cos(a) * LEN[f] * r;
        y += Math.sin(a) * LEN[f] * r;
        pts.push([x, y]);
      });
      const dark = (f - 1) * 0.07;
      fingerEls.push(
        <g key={`f${f}`}>
          {[0, 1, 2].map((j) => seg(`s${j}`, pts[j][0], pts[j][1], pts[j + 1][0], pts[j + 1][1], WID[f] - j * 0.7, dark))}
          {c < 0.75 && f === 1 && <ellipse cx={(pts[2][0] + pts[3][0]) / 2} cy={(pts[2][1] + pts[3][1]) / 2 - 3} rx={4} ry={2.2} fill={nail} opacity={0.8} />}
          {rings && f === 3 && <circle cx={(pts[0][0] + pts[1][0]) / 2} cy={(pts[0][1] + pts[1][1]) / 2} r={WID[f] / 2 + 1.3} fill="none" stroke={RL.gold} strokeWidth={3} />}
        </g>,
      );
    }
    const a0 = 0.55 - th * 0.85;
    const p0: P = [12, -8];
    const p1: P = [p0[0] + Math.cos(a0) * 22, p0[1] + Math.sin(a0) * 22 - 6];
    const a1 = a0 + 0.15 + th * 0.5;
    const p2: P = [p1[0] + Math.cos(a1) * 18, p1[1] + Math.sin(a1) * 18];
    thumbEl = (
      <g key="thumb">
        <path d={`M2 -12 C${p0[0]} ${p0[1] - 10} ${p1[0] - 8} ${p1[1] - 9} ${p1[0]} ${p1[1]} C${p1[0] - 2} ${p1[1] + 8} ${p0[0] + 12} 6 ${p0[0] + 4} 6Z`} fill={skin} />
        {seg("t1", p1[0], p1[1], p2[0], p2[1], WID[0])}
        {seg("t0", p0[0] + 6, p0[1] - 1, p1[0], p1[1], WID[0] + 1.5)}
        <ellipse cx={p2[0] - Math.cos(a1) * 2} cy={p2[1] - Math.sin(a1) * 2 - 2.5} rx={4.4} ry={2.6} fill={nail} opacity={0.85} transform={`rotate(${deg(a1)} ${p2[0]} ${p2[1] - 2.5})`} />
      </g>
    );
    return (
      <g transform={`scale(${size})`}>
        {palmEl}
        {prop && <g transform="translate(60 4)">{prop}</g>}
        {fingerEls}
        {thumbEl}
      </g>
    );
  }
  // back or palm toward the viewer: fingers fan and foreshorten as they curl; thumb on −y from the back, +y for a palm
  const palmView = view === "palm";
  const palm = "M0 -15 C18 -18 38 -21 50 -20 Q56 0 50 20 C36 21 18 18 0 15Z";
  palmEl = (
    <g key="palm">
      <path d={palm} fill={skin} stroke={line} strokeWidth={1.3} />
      <path d={palm} fill="url(#rl-cylA)" opacity={0.6} />
      {palmView && <path d={palm} fill="#ffe2c8" opacity={0.16} />}
      {!palmView && [-13.5, -4.5, 4.8, 13.8].map((y, i) => <path key={i} d={`M8 ${y * 0.4} L46 ${y}`} stroke="#000" strokeOpacity={0.09} strokeWidth={2} strokeLinecap="round" />)}
      {palmView && <path d="M10 9 Q26 3 46 -11 M14 13 Q30 12 48 6 M30 -17 Q36 -2 33 17" stroke="#000" strokeOpacity={0.17} strokeWidth={1.3} fill="none" />}
    </g>
  );
  const KY = [0, -14, -4.6, 4.8, 14];
  const FAN = [0, -0.16, -0.04, 0.07, 0.19];
  const flipY = palmView ? -1 : 1; // palm view mirrors finger order so the thumb sits beside the index
  for (let f = 1; f <= 4; f++) {
    const c = cu[f];
    let x = 50 - (f === 4 ? 2.5 : 0);
    let y = KY[f] * flipY;
    const a = FAN[f] * sp * flipY;
    let acc = 0;
    const pts: [number, number, number][] = [[x, y, 0]];
    [0.46, 0.3, 0.24].forEach((r, j) => {
      acc += c * [1.3, 1.6, 1.05][j];
      const k = Math.max(0.12, Math.cos(Math.min(acc, Math.PI / 2)));
      x += Math.cos(a) * LEN[f] * r * k;
      y += Math.sin(a) * LEN[f] * r * k;
      pts.push([x, y, acc]);
    });
    fingerEls.push(
      <g key={`f${f}`}>
        {[0, 1, 2].map((j) => seg(`s${j}`, pts[j][0], pts[j][1], pts[j + 1][0], pts[j + 1][1], WID[f] - j * 0.7, pts[j + 1][2] > 1 ? Math.min(0.28, (pts[j + 1][2] - 1) * 0.3) : 0))}
        {[1, 2].map((j) => (
          <path key={j} d={`M${pts[j][0]} ${pts[j][1] - WID[f] * 0.38} L${pts[j][0]} ${pts[j][1] + WID[f] * 0.38}`} stroke="#000" strokeOpacity={0.16} strokeWidth={1} transform={`rotate(${deg(a)} ${pts[j][0]} ${pts[j][1]})`} />
        ))}
        {!palmView && pts[3][2] < 1.2 && <ellipse cx={pts[3][0] - Math.cos(a) * 3.6} cy={pts[3][1] - Math.sin(a) * 3.6} rx={4} ry={3.4} fill={nail} opacity={0.8} />}
        {!palmView && <circle cx={pts[0][0] + 1} cy={pts[0][1]} r={4.6} fill="#fff" opacity={0.1} />}
        {rings && (f === 1 || f === 3) && (
          <g>
            <path d={`M${pts[0][0] + (pts[1][0] - pts[0][0]) * 0.55} ${pts[0][1] + (pts[1][1] - pts[0][1]) * 0.55 - WID[f] / 2 - 1} l0 ${WID[f] + 2}`} stroke={RL.gold} strokeWidth={3.4} strokeLinecap="round" />
            {f === 3 && <Gem x={pts[0][0] + (pts[1][0] - pts[0][0]) * 0.55} y={pts[0][1] + (pts[1][1] - pts[0][1]) * 0.55} r={2.2} c={RL.ruby} />}
          </g>
        )}
      </g>,
    );
  }
  const side = palmView ? 1 : -1;
  const base: P = [6, side * 11];
  const a0 = side * (0.5 - th * 0.75);
  const p1: P = [base[0] + 10 + Math.cos(a0) * 20, base[1] + side * 4 + Math.sin(a0) * 20];
  const a1 = a0 - side * th * 0.7;
  const p2: P = [p1[0] + Math.cos(a1) * 17, p1[1] + Math.sin(a1) * 17];
  thumbEl = (
    <g key="thumb">
      <path d={`M2 ${side * 4} C${base[0] + 4} ${side * 20} ${p1[0] - 8} ${p1[1] + side * 6} ${p1[0]} ${p1[1]} C${p1[0] - 4} ${side * 8} ${p1[0] - 12} ${side * 4} ${p1[0] - 16} ${side * 3}Z`} fill={skin} />
      {seg("t0", base[0] + 8, base[1] + side * 3, p1[0], p1[1], WID[0] + 2)}
      {seg("t1", p1[0], p1[1], p2[0], p2[1], WID[0])}
      {!palmView && <ellipse cx={p2[0] - Math.cos(a1) * 3} cy={p2[1] - Math.sin(a1) * 3} rx={4.2} ry={3.2} fill={nail} opacity={0.85} />}
      <path d={`M${base[0] + 4} ${side * 8} Q${base[0] + 16} ${side * 14} ${p1[0] - 2} ${p1[1] - side * 2}`} stroke="#000" strokeOpacity={0.12} strokeWidth={2} fill="none" />
    </g>
  );
  return (
    <g transform={`scale(${size})`}>
      {!palmView && thumbEl}
      {palmEl}
      {prop && <g transform="translate(60 4)">{prop}</g>}
      {fingerEls}
      {palmView && thumbEl}
    </g>
  );
};

/** full arm: shoulder s → hand target h, elbow solved with 2-bone IK, armlet + kada + hand */
export const RArm: React.FC<{
  s: P; h: P; bend: number; skin: string; line: string; t: number; pose: HandPose; wrist?: number; flip?: boolean;
  prop?: React.ReactNode; bulk?: number; armlet?: boolean; kada?: number; rings?: boolean; a?: number; b?: number; sleeve?: string;
}> = ({ s, h, bend, skin, line, t, pose, wrist = 0, flip = false, prop, bulk = 1, armlet = true, kada = 2, rings = true, a = 176, b = 160, sleeve }) => {
  const k = limb(s, h, a, b, bend);
  const r1 = ang(s, k.e);
  const r2 = ang(k.e, k.h);
  const L1 = Math.hypot(k.e[0] - s[0], k.e[1] - s[1]);
  const L2 = Math.hypot(k.h[0] - k.e[0], k.h[1] - k.e[1]);
  return (
    <g>
      <g transform={`translate(${s[0]} ${s[1]}) rotate(${deg(r1)})`}>
        <Seg L={L1} w0={60 * bulk} wm={58 * bulk} w1={40 * bulk} fill={sleeve ?? skin} line={line} rad={r1} bulge={0.3} />
        {!sleeve && <path d={`M${L1 * 0.25} ${-14 * bulk} Q${L1 * 0.55} ${-24 * bulk} ${L1 * 0.85} ${-12 * bulk}`} stroke="#fff" strokeOpacity={0.12} strokeWidth={5} fill="none" strokeLinecap="round" />}
        {armlet && <Armlet x={L1 * 0.3} w={56 * bulk} t={t} />}
      </g>
      <g transform={`translate(${k.e[0]} ${k.e[1]}) rotate(${deg(r2)})`}>
        <Seg L={L2} w0={42 * bulk} wm={46 * bulk} w1={30 * bulk} fill={skin} line={line} rad={r2} bulge={0.25} />
        <g transform={`translate(${L2 - 2} 0) rotate(${wrist}) scale(1 ${flip ? -1 : 1})`}>
          <Hand pose={pose} skin={skin} line={line} rings={rings} prop={prop} size={bulk * 1.02} />
        </g>
        {kada > 0 && <Kada x={L2 - 4} w={30 * bulk} n={kada} />}
      </g>
    </g>
  );
};

// ---------------------------------------------------------------- heads

export type Look = {
  skin: string; line: string; hair: string; eye?: string;
  crown?: "kirita" | "mukuta" | "jata" | "none" | "wild" | "flame";
  beard?: "none" | "short" | "full" | "sage";
  stache?: "none" | "handle" | "thin" | "sage" | "full";
  tilak?: "tripundra" | "urdhva" | "dot" | "none";
  fangs?: boolean; fem?: boolean; gem?: string; hairLong?: boolean; horns?: boolean; beardC?: string; vanara?: boolean; muzzle?: string;
};

export type Expr = { anger?: number; smile?: number; open?: number; lookX?: number; lookY?: number; blink?: number; fear?: number };

const Crown: React.FC<{ kind: Look["crown"]; gem: string; t: number; hair: string }> = ({ kind, gem, t, hair }) => {
  if (kind === "kirita" || kind === "mukuta") {
    const k = kind === "kirita" ? 1 : 0.62;
    const top = -56 - 64 * k;
    return (
      <g>
        {[-1, 1].map((sx) => (
          <g key={sx} transform={`scale(${sx} 1)`}>
            <path d="M44 -42 C64 -48 76 -66 70 -90 C62 -74 54 -68 40 -64Z" fill={RL.gold} stroke={RL.goldD} strokeWidth={1.2} />
            <Gem x={60} y={-66} r={3} c={gem} />
          </g>
        ))}
        {/* dome body with ribs */}
        <path d={`M-50 -56 C-50 ${top + 10} -36 ${top} 0 ${top - 4} C36 ${top} 50 ${top + 10} 50 -56Z`} fill={RL.goldH} stroke={RL.goldD} strokeWidth={1.2} />
        <path d={`M-50 -56 C-50 ${top + 10} -36 ${top} 0 ${top - 4} C36 ${top} 50 ${top + 10} 50 -56Z`} fill="url(#rl-face)" opacity={0.5} />
        {[-36, -18, 18, 36].map((x) => <path key={x} d={`M${x} -58 Q${x * 0.92} ${(top - 58) / 2} ${x * 0.6} ${top + 4}`} stroke={RL.goldD} strokeWidth={1.4} fill="none" opacity={0.7} />)}
        {[-27, 27].map((x) => [0.3, 0.6].map((u) => <Gem key={`${x}${u}`} x={x * (1 - u * 0.3)} y={-58 + (top + 2 + 58) * u} r={2.6} c={u > 0.5 ? RL.pearl : RL.emer} />))}
        {/* front crest */}
        <path d={`M-30 -56 C-34 ${top + 20} -14 ${top - 6} 0 ${top - 30 * k} C14 ${top - 6} 34 ${top + 20} 30 -56Z`} fill={RL.gold} stroke={RL.goldD} strokeWidth={1.4} />
        <path d={`M-22 -58 C-24 ${top + 26} -10 ${top + 6} 0 ${top - 16 * k} C10 ${top + 6} 24 ${top + 26} 22 -58`} stroke={RL.goldD} strokeWidth={1} fill="none" />
        {[...Array(9)].map((_, i) => {
          const u = i / 8;
          const y = -58 + (top - 20 * k + 58) * Math.sin(u * Math.PI * 0.5);
          return [-1, 1].map((sx) => <Pearl key={`${i}${sx}`} x={sx * (28 - u * 24)} y={y} r={1.9} />);
        })}
        <Gem x={0} y={(top - 56) / 2 + 4} r={8 * (0.8 + 0.2 * k)} c={gem} />
        <Gem x={0} y={(top - 56) / 2 - 16 * k} r={3.4} c={RL.emer} />
        {k > 0.8 && (
          <g>
            <path d={`M-12 ${top - 26} L0 ${top - 62} L12 ${top - 26}Z`} fill={RL.goldH} stroke={RL.goldD} strokeWidth={1} />
            <circle cx={0} cy={top - 64} r={5} fill={RL.gold} stroke={RL.goldD} />
            <Gem x={0} y={top - 40} r={2.8} c={RL.ruby} />
          </g>
        )}
        <rect x={-54} y={-58} width={108} height={17} rx={4} fill={RL.goldH} stroke={RL.goldD} strokeWidth={1.2} />
        {[...Array(9)].map((_, i) => <Gem key={i} x={-44 + i * 11} y={-49.5} r={i === 4 ? 4.6 : 2.6} c={i === 4 ? gem : i % 2 ? RL.pearl : RL.ruby} />)}
        {[-1, 1].map((sx) => (
          <g key={sx}>
            <line x1={sx * 52} y1={-42} x2={sx * 56 + Math.sin(t * 2.2) * 1.5} y2={-22} stroke={RL.goldD} strokeWidth={1} />
            <Pearl x={sx * 56 + Math.sin(t * 2.2) * 1.5} y={-20} r={3.2} />
          </g>
        ))}
      </g>
    );
  }
  if (kind === "jata") {
    return (
      <g>
        <path d="M-46 -38 Q-50 -66 -30 -76 Q-34 -112 0 -128 Q34 -112 30 -76 Q50 -66 46 -38 Q0 -58 -46 -38Z" fill={hair} />
        {[...Array(6)].map((_, i) => <path key={i} d={`M${-26 + i * 10} -70 Q${-20 + i * 9} -100 ${-6 + i * 4} -122`} stroke="#fff" strokeOpacity={0.14} strokeWidth={2} fill="none" />)}
        <path d="M-32 -78 Q0 -66 32 -78" stroke="#000" strokeOpacity={0.3} strokeWidth={3} fill="none" />
        {[...Array(9)].map((_, i) => <circle key={i} cx={-30 + i * 7.5} cy={-77 + Math.abs(i - 4) * -0.8 + 4} r={3.4} fill="#6a3416" stroke="#3a1a08" strokeWidth={0.8} />)}
      </g>
    );
  }
  if (kind === "wild") {
    return (
      <g>
        {[...Array(13)].map((_, i) => {
          const a = -Math.PI + (i / 12) * Math.PI;
          const r = 70 + (i % 3) * 14 + Math.sin(t * 3 + i) * 3;
          return <path key={i} d={`M${Math.cos(a) * 30} ${-20 + Math.sin(a) * 40} Q${Math.cos(a - 0.2) * r} ${-30 + Math.sin(a - 0.2) * r} ${Math.cos(a + 0.12) * (r + 18)} ${-34 + Math.sin(a + 0.12) * (r + 18)} Q${Math.cos(a + 0.2) * r * 0.8} ${-20 + Math.sin(a + 0.2) * r * 0.8} ${Math.cos(a + 0.25) * 30} ${-20 + Math.sin(a + 0.25) * 40}Z`} fill={hair} />;
        })}
      </g>
    );
  }
  if (kind === "flame") {
    return (
      <g>
        {[...Array(9)].map((_, i) => {
          const x = -48 + i * 12;
          const h = 70 + Math.sin(t * 7 + i * 1.7) * 14 + (4 - Math.abs(i - 4)) * 16;
          return (
            <g key={i}>
              <path d={`M${x - 12} -40 Q${x - 14} ${-40 - h * 0.6} ${x + Math.sin(t * 5 + i) * 8} ${-40 - h} Q${x + 14} ${-40 - h * 0.5} ${x + 12} -40Z`} fill="#ff6a1a" />
              <path d={`M${x - 6} -40 Q${x - 6} ${-40 - h * 0.4} ${x + Math.sin(t * 5 + i) * 5} ${-40 - h * 0.7} Q${x + 7} ${-40 - h * 0.35} ${x + 6} -40Z`} fill="#ffd34a" />
            </g>
          );
        })}
      </g>
    );
  }
  return null;
};

/** realistic head; centre at 0, top of skull −62, chin +64; crowns sit on −40 */
export const RHead: React.FC<{ look: Look; e?: Expr; t: number; seed?: number }> = ({ look, e = {}, t, seed = 0 }) => {
  const { skin, line, hair, eye = "#2e1a0c", crown = "none", beard = "none", stache = "none", tilak = "none", fangs = false, fem = false, gem = RL.ruby, horns = false } = look;
  const anger = e.anger ?? 0;
  const smile = e.smile ?? 0;
  const open = e.open ?? 0;
  const lx = (e.lookX ?? 0) * 3.4;
  const ly = (e.lookY ?? 0) * 2.4;
  const fear = e.fear ?? 0;
  const period = 3.4 + (seed % 5) * 0.41;
  const ph = ((t + seed * 0.77) % period) / period;
  const blink = Math.min(e.blink ?? 1, ph > 0.962 ? 0.08 : 1);
  const jaw = fem ? 0.9 : 1;
  const face = `M0 -62 C30 -62 ${48 * jaw} -42 ${48 * jaw} -8 C${48 * jaw} 18 ${42 * jaw} 36 ${28 * jaw} 50 C${18 * jaw} 60 8 ${64 + open * 6} 0 ${64 + open * 6} C-8 ${64 + open * 6} ${-18 * jaw} 60 ${-28 * jaw} 50 C${-42 * jaw} 36 ${-48 * jaw} 18 ${-48 * jaw} -8 C${-48 * jaw} -42 -30 -62 0 -62Z`;
  const sway = Math.sin(t * 2.1 + seed) * 2;
  const beardC = look.beardC ?? hair;
  return (
    <g>
      {/* hair behind */}
      {crown !== "jata" && crown !== "flame" && (
        <path d={`M-50 -30 Q-62 ${fem ? 40 : 20} -58 ${fem ? 70 : 60} Q-40 ${fem ? 66 : 56} -36 30 L36 30 Q40 ${fem ? 66 : 56} 58 ${fem ? 70 : 60} Q62 ${fem ? 40 : 20} 50 -30 Q30 -70 0 -70 Q-30 -70 -50 -30Z`} fill={hair} />
      )}
      {horns && [-1, 1].map((sx) => <path key={sx} transform={`scale(${sx} 1)`} d="M26 -52 Q50 -96 34 -130 Q66 -100 44 -48Z" fill="#d8cdb4" stroke="#6a5a40" strokeWidth={1.5} />)}
      {/* ears + kundalas */}
      {[-1, 1].map((sx) => (
        <g key={sx} transform={`scale(${sx} 1)`}>
          <path d={`M${46 * jaw} -14 Q${58 * jaw} -18 ${58 * jaw} 0 Q${57 * jaw} 16 ${44 * jaw} 18Z`} fill={skin} stroke={line} strokeWidth={1.4} />
          <path d={`M${49 * jaw} -8 Q${54 * jaw} -4 ${50 * jaw} 8`} stroke={line} strokeOpacity={0.5} strokeWidth={1.4} fill="none" />
          <g transform={`translate(${52 * jaw} 18) rotate(${sway * sx})`}>
            {fem ? (
              <g>
                <Gem x={0} y={4} r={3} c={RL.ruby} />
                <path d="M-9 10 Q0 30 9 10Z" fill={RL.gold} stroke={RL.goldD} strokeWidth={0.8} />
                {[-6, 0, 6].map((x) => <Pearl key={x} x={x} y={24 + Math.abs(x) * -0.4} r={2.2} />)}
              </g>
            ) : (
              <g>
                <circle cx={0} cy={16} r={13} fill="none" stroke={RL.gold} strokeWidth={5} />
                <circle cx={0} cy={16} r={13} fill="none" stroke={RL.goldD} strokeWidth={0.8} />
                <Gem x={0} y={29} r={3.4} c={gem} />
              </g>
            )}
          </g>
        </g>
      ))}
      {look.vanara && [...Array(11)].map((_, i) => {
        const a = Math.PI * (0.05 + (i / 10) * 0.9);
        return <path key={i} d={`M${Math.cos(a) * 40} ${Math.sin(a) * 40 + 4} L${Math.cos(a) * 66} ${Math.sin(a) * 62 + 6} L${Math.cos(a + 0.12) * 42} ${Math.sin(a + 0.12) * 42 + 4}Z`} fill={hair} />;
      })}
      {look.vanara && [-1, 1].map((sx) => <path key={sx} transform={`scale(${sx} 1)`} d="M40 -20 L66 -6 L46 2 L70 14 L44 18Z" fill={hair} />)}
      <rect x={-22} y={44} width={44} height={44} fill={skin} />
      <path d="M-22 44 L22 44 L22 88 L-22 88Z" fill="url(#rl-cylB)" opacity={0.6} transform="rotate(90 0 66)" />
      <path d={face} fill={skin} stroke={line} strokeWidth={1.8} />
      <path d={face} fill="url(#rl-face)" />
      {/* cheekbones + jaw shadow */}
      <path d={`M${-40 * jaw} 8 Q${-30 * jaw} 30 ${-16} 40`} stroke="#000" strokeOpacity={0.1} strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d={`M${40 * jaw} 8 Q${30 * jaw} 30 16 40`} stroke="#000" strokeOpacity={0.16} strokeWidth={6} fill="none" strokeLinecap="round" />
      {/* hairline for uncrowned heads */}
      {(crown === "none" || crown === "wild" || crown === "jata") && (
        <path d={`M-49 -14 Q-50 -56 0 -64 Q50 -56 49 -14 Q44 -40 24 -44 Q0 -36 -24 -44 Q-44 -40 -49 -14Z`} fill={hair} />
      )}
      {fem && <path d="M-49 -10 Q-48 -58 0 -64 Q48 -58 49 -10 Q40 -42 4 -44 L0 -50 L-4 -44 Q-40 -42 -49 -10Z" fill={hair} />}
      {/* brows */}
      {[-1, 1].map((sx) => (
        <path key={sx} transform={`scale(${sx} 1)`}
          d={`M6 ${-20 + anger * 6 - fear * 5} Q18 ${-27 - smile * 1 + fear * -2} 34 ${-23 - anger * 2 + fear * 2} Q20 ${-23 - smile * 1} 6 ${-16 + anger * 6 - fear * 5}Z`}
          fill={fem ? "#1a0c06" : hair === "#e8e4dc" || hair === "#d8d4cc" ? "#cfc8bb" : "#1a0c06"} />
      ))}
      {/* eyes */}
      {[-1, 1].map((sx) => {
        const ex = sx * 18;
        const ey = -6;
        const h = 6.2 * blink * (1 + fear * 0.3);
        return (
          <g key={sx}>
            <path d={`M${ex - 12} ${ey} Q${ex} ${ey - h * 1.5} ${ex + 12} ${ey} Q${ex} ${ey + h * 0.95} ${ex - 12} ${ey}Z`} fill={look.eye === "#ff3a1a" ? "#ffd0b0" : "#f6efe2"} />
            {blink > 0.3 && (
              <g>
                <circle cx={ex + lx} cy={ey + ly - 0.6} r={5.2} fill={eye} />
                <circle cx={ex + lx} cy={ey + ly - 0.6} r={2.6} fill="#050302" />
                <circle cx={ex + lx - 1.8} cy={ey + ly - 2.6} r={1.4} fill="#fff" />
              </g>
            )}
            <path d={`M${ex - 13} ${ey + 0.5} Q${ex} ${ey - h * 1.55 - 0.5} ${ex + 13} ${ey - 0.5}`} stroke="#140a04" strokeWidth={fem ? 3.2 : 2.6} fill="none" strokeLinecap="round" />
            <path d={`M${ex - 10} ${ey - h * 1.5 - 3.5} Q${ex} ${ey - h * 1.5 - 7} ${ex + 11} ${ey - h * 1.1 - 4}`} stroke={line} strokeOpacity={0.45} strokeWidth={1.2} fill="none" />
            <path d={`M${ex - 10} ${ey + 2} Q${ex} ${ey + h * 0.95 + 1.5} ${ex + 11} ${ey + 1}`} stroke={line} strokeOpacity={0.4} strokeWidth={1} fill="none" />
            {fem && [...Array(4)].map((_, i) => <line key={i} x1={ex + sx * (6 + i * 2)} y1={ey - h * 1.2 + i} x2={ex + sx * (9 + i * 2.6)} y2={ey - h * 1.2 - 4 + i * 1.4} stroke="#140a04" strokeWidth={1} />)}
          </g>
        );
      })}
      {look.vanara && (
        <g>
          <path d="M-34 -14 Q-18 -24 0 -16 Q18 -24 34 -14" stroke="#000" strokeOpacity={0.22} strokeWidth={5} fill="none" strokeLinecap="round" />
          <path d={`M-30 8 Q-36 40 -18 ${58 + open * 8} Q0 ${68 + open * 8} 18 ${58 + open * 8} Q36 40 30 8 Q16 -4 0 0 Q-16 -4 -30 8Z`} fill={look.muzzle ?? "#e8a888"} stroke={line} strokeWidth={1.4} />
          <path d={`M-30 8 Q-36 40 -18 ${58 + open * 8} Q0 ${68 + open * 8} 18 ${58 + open * 8} Q36 40 30 8 Q16 -4 0 0 Q-16 -4 -30 8Z`} fill="url(#rl-face)" opacity={0.6} />
          <ellipse cx={-6} cy={14} rx={4} ry={2.6} fill="#2a1208" />
          <ellipse cx={6} cy={14} rx={4} ry={2.6} fill="#2a1208" />
          <path d="M-10 6 Q0 2 10 6" stroke={line} strokeWidth={1.4} fill="none" />
          {open > 0.05 ? (
            <g>
              <path d={`M-20 36 Q0 30 20 36 Q0 ${44 + open * 20} -20 36Z`} fill="#3a0a08" />
              <path d="M-16 35 Q0 31 16 35 L15 38 Q0 35 -15 38Z" fill="#f2ead8" />
            </g>
          ) : (
            <path d={`M-20 ${36 - smile * 2} Q0 ${40 + smile * 4} 20 ${36 - smile * 2}`} stroke="#5a1a10" strokeWidth={2.6} fill="none" strokeLinecap="round" />
          )}
        </g>
      )}
      {!look.vanara && <g>
      {/* nose */}
      <path d="M-5 -8 Q-7 10 -10 18" stroke="#000" strokeOpacity={0.14} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d={`M-9 20 Q-12 26 -6 28 Q0 31 6 28 Q12 26 9 20`} stroke={line} strokeWidth={1.6} fill="none" />
      <ellipse cx={-4.5} cy={26.5} rx={2.6} ry={1.4} fill="#2a1208" opacity={0.75} />
      <ellipse cx={4.5} cy={26.5} rx={2.6} ry={1.4} fill="#2a1208" opacity={0.75} />
      <ellipse cx={-1} cy={18} rx={3.4} ry={2.4} fill="#fff" opacity={0.16} />
      {fem && (
        <g>
          <circle cx={-8} cy={26} r={6} fill="none" stroke={RL.gold} strokeWidth={1.6} />
          <Pearl x={-12} y={30} r={1.8} />
          <path d={`M-12 30 Q-30 30 -46 18`} stroke={RL.pearl} strokeWidth={1.2} strokeDasharray="1.5 2" fill="none" />
        </g>
      )}
      {/* mouth */}
      {open > 0.05 ? (
        <g>
          <path d={`M-15 ${41 - smile * 2} Q0 ${36} 15 ${41 - smile * 2} Q0 ${44 + open * 16} -15 ${41 - smile * 2}Z`} fill="#3a0a08" />
          <path d={`M-12 ${40} Q0 ${38} 12 ${40} L11 ${43} Q0 ${41} -11 ${43}Z`} fill="#f2ead8" />
          {fangs && [-1, 1].map((sx) => <path key={sx} d={`M${sx * 9} 41 L${sx * 6} 51 L${sx * 4} 41Z`} fill="#f2ead8" />)}
        </g>
      ) : (
        <g>
          <path d={`M-15 ${41 - smile * 3} Q-6 ${38} 0 ${39.5} Q6 ${38} 15 ${41 - smile * 3} Q0 ${42 + smile * 2} -15 ${41 - smile * 3}Z`} fill={fem ? "#9a2a2a" : "#6a2a1a"} />
          <path d={`M-12 ${42} Q0 ${50 + smile} 12 ${42} Q0 ${44 + smile} -12 ${42}Z`} fill={fem ? "#b84040" : "#8a3e2a"} />
          <ellipse cx={0} cy={45.5} rx={5} ry={1.2} fill="#fff" opacity={0.2} />
          {fangs && [-1, 1].map((sx) => <path key={sx} d={`M${sx * 10} 41 L${sx * 7.5} 50 L${sx * 5.5} 41.5Z`} fill="#f2ead8" stroke="#6a5a40" strokeWidth={0.5} />)}
        </g>
      )}
      </g>}
      {/* beard + moustache */}
      {beard === "short" && <path d={`M-44 6 Q-42 52 -22 64 Q0 80 22 64 Q42 52 44 6 Q36 40 22 50 Q14 46 0 47 Q-14 46 -22 50 Q-36 40 -44 6Z`} fill={beardC} />}
      {beard === "full" && <path d={`M-46 0 Q-50 70 -18 92 Q0 104 18 92 Q50 70 46 0 Q38 44 22 50 Q12 47 0 48 Q-12 47 -22 50 Q-38 44 -46 0Z`} fill={beardC} />}
      {beard === "sage" && (
        <g>
          <path d={`M-46 -2 Q-56 90 -20 150 Q0 176 20 150 Q56 90 46 -2 Q38 44 22 52 Q12 48 0 49 Q-12 48 -22 52 Q-38 44 -46 -2Z`} fill={beardC} />
          {[...Array(9)].map((_, i) => <path key={i} d={`M${-30 + i * 7.5} 56 Q${-34 + i * 8.5} 100 ${-16 + i * 4} ${146 - Math.abs(i - 4) * 6}`} stroke="#000" strokeOpacity={0.12} strokeWidth={1.4} fill="none" />)}
        </g>
      )}
      {(beard === "full" || beard === "short") && [...Array(7)].map((_, i) => <path key={i} d={`M${-28 + i * 9} 52 q${-2} 14 ${i % 2 ? 2 : -2} 26`} stroke="#fff" strokeOpacity={0.1} strokeWidth={1.4} fill="none" />)}
      {stache === "handle" && (
        <path d={`M0 33 Q-12 28 -24 34 Q-34 40 -40 30 Q-44 20 -36 18 Q-40 26 -34 30 Q-26 28 -16 30 Q-6 31 0 33Z M0 33 Q12 28 24 34 Q34 40 40 30 Q44 20 36 18 Q40 26 34 30 Q26 28 16 30 Q6 31 0 33Z`} fill={hair} />
      )}
      {stache === "full" && <path d="M0 32 Q-16 27 -27 36 Q-22 44 -12 39 Q-4 36 0 37 Q4 36 12 39 Q22 44 27 36 Q16 27 0 32Z" fill={beardC} />}
      {stache === "thin" && <path d="M0 33 Q-10 30 -18 36 Q-10 35 0 35.5 Q10 35 18 36 Q10 30 0 33Z" fill={hair} />}
      {stache === "sage" && <path d="M0 31 Q-18 26 -30 44 Q-20 40 -10 40 Q-4 37 0 38 Q4 37 10 40 Q20 40 30 44 Q18 26 0 31Z" fill={beardC} />}
      {/* tilak */}
      {tilak === "tripundra" && (
        <g>
          {[-36, -31, -26].map((y) => <path key={y} d={`M-24 ${y} Q0 ${y - 3} 24 ${y}`} stroke="#f4efe4" strokeWidth={2.6} strokeLinecap="round" fill="none" opacity={0.92} />)}
          <circle cx={0} cy={-31} r={3} fill="#c8102a" />
        </g>
      )}
      {tilak === "urdhva" && (
        <g>
          <path d="M-7 -26 L-5 -50 M7 -26 L5 -50" stroke="#f4efe4" strokeWidth={2.6} strokeLinecap="round" />
          <path d="M0 -24 L0 -48" stroke="#d4142a" strokeWidth={3} strokeLinecap="round" />
        </g>
      )}
      {tilak === "dot" && <circle cx={0} cy={-26} r={fem ? 3.6 : 4} fill="#c8102a" />}
      {fem && (
        <g>
          <path d="M0 -50 L0 -36" stroke={RL.gold} strokeWidth={1.4} />
          <Gem x={0} y={-34} r={3.6} c={RL.ruby} />
          <Pearl x={0} y={-28} r={1.8} />
        </g>
      )}
      <Crown kind={crown} gem={gem} t={t} hair={hair} />
    </g>
  );
};

// ---------------------------------------------------------------- body

export type Outfit = {
  dhoti: string; border: string; sash?: string; lower?: "long" | "knee" | "seated" | "shorts"; janeu?: boolean; rudraksha?: boolean;
  pearls?: number; hara?: boolean; belt?: boolean; anklets?: boolean; armour?: string; robe?: string; tail?: string;
};

const Necklaces: React.FC<{ o: Outfit; t: number; bulk: number }> = ({ o, t, bulk }) => {
  const sw = Math.sin(t * 1.7) * 2;
  return (
    <g>
      {o.rudraksha && (
        <g>
          <PearlString a={[-30, -760]} c={[sw, -600]} b={[30, -760]} n={28} r={4.6} />
          {[...Array(26)].map((_, i) => {
            const u = i / 25;
            const x = (1 - u) ** 2 * -32 + 2 * (1 - u) * u * sw + u * u * 32;
            const y = (1 - u) ** 2 * -760 + 2 * (1 - u) * u * -592 + u * u * -760;
            return <circle key={i} cx={x} cy={y} r={4.4} fill="#6a3416" stroke="#2e1406" strokeWidth={0.8} />;
          })}
        </g>
      )}
      {[...Array(o.pearls ?? 0)].map((_, i) => (
        <PearlString key={i} a={[-36 - i * 10, -758 + i * 4]} c={[sw * (1 + i * 0.3), -690 + i * 34]} b={[36 + i * 10, -758 + i * 4]} n={22 + i * 6} r={3.6 + i * 0.3} every={i === 1 ? 5 : 0} />
      ))}
      {o.hara && (
        <g>
          <path d={`M-40 -756 Q${sw} ${-700} 40 -756`} stroke={RL.goldH} strokeWidth={9 * bulk} fill="none" />
          <path d={`M-40 -756 Q${sw} ${-700} 40 -756`} stroke={RL.goldD} strokeWidth={9 * bulk} strokeDasharray="2 5" strokeOpacity={0.5} fill="none" />
          <g transform={`translate(${sw * 0.5} -726)`}>
            <path d="M-14 0 Q0 -8 14 0 L8 20 Q0 28 -8 20Z" fill={RL.gold} stroke={RL.goldD} strokeWidth={1} />
            <Gem x={0} y={9} r={6} c={RL.emer} />
            <Pearl x={0} y={30} r={4} />
          </g>
        </g>
      )}
    </g>
  );
};

/**
 * Standing / seated body (no head, no arms) — the torso, garments, belt, legs and feet.
 * Returns shoulder points so arms can be attached by the caller.
 */
export const SH = { r: [-116, -716] as P, l: [116, -716] as P, neck: -800 };

export const Body: React.FC<{ look: Look; o: Outfit; t: number; bulk?: number; breathe?: number; stance?: number }> = ({ look, o, t, bulk = 1, breathe = 1, stance = 0 }) => {
  const { skin, line } = look;
  const b = Math.sin(t * 1.6) * 2.4 * breathe;
  const W = (x: number) => x * bulk;
  const torso = `M-24 -790 L24 -790 Q30 -746 ${W(72)} -738 Q${W(122)} -732 ${W(134)} -708 Q${W(140)} -676 ${W(112)} -640 Q${W(98)} -590 ${W(84)} -540 Q${W(82)} -508 ${W(94)} -476 L${W(-94)} -476 Q${W(-82)} -508 ${W(-84)} -540 Q${W(-98)} -590 ${W(-112)} -640 Q${W(-140)} -676 ${W(-134)} -708 Q${W(-122)} -732 ${W(-72)} -738 Q-30 -746 -24 -790Z`;
  const lower = o.lower ?? "long";
  const sway = Math.sin(t * 1.3) * 3;
  return (
    <g>
      {/* legs + feet */}
      {lower !== "seated" && [-1, 1].map((sx) => (
        <g key={sx}>
          {(lower === "knee" || lower === "shorts") && (
            <g transform={`translate(${sx * (52 + stance * 20)} -300) rotate(${90 - sx * stance * 6})`}>
              <Seg L={250} w0={W(58)} wm={W(54)} w1={W(34)} fill={skin} line={line} rad={Math.PI / 2} bulge={0.25} />
            </g>
          )}
          <g transform={`translate(${sx * (58 + stance * 34)} -42) scale(${sx} 1)`}>
            <path d="M-16 -16 Q-20 2 -14 12 L34 14 Q44 12 42 4 Q30 -6 14 -12 Q4 -20 -16 -16Z" fill={skin} stroke={line} strokeWidth={1.6} />
            {[12, 20, 27, 33, 38].map((x, i) => <ellipse key={i} cx={x + 2} cy={11 - i * 0.6} rx={3.6 - i * 0.3} ry={3} fill={skin} stroke={line} strokeWidth={0.9} />)}
            <path d="M-16 -16 Q-20 2 -14 12 L34 14 Q44 12 42 4 Q30 -6 14 -12 Q4 -20 -16 -16Z" fill="url(#rl-cylA)" opacity={0.6} />
            {o.anklets !== false && (
              <g>
                <path d="M-20 -22 Q2 -14 20 -22" stroke={RL.goldH} strokeWidth={6} fill="none" />
                {[-14, -6, 2, 10, 18].map((x) => <circle key={x} cx={x} cy={-15 + Math.abs(x - 2) * 0.05} r={2.3} fill={RL.gold} />)}
              </g>
            )}
          </g>
        </g>
      ))}
      {/* tail (vanara) */}
      {o.tail && (
        <path d={`M40 -470 C 160 -420 ${200 + sway * 4} -620 ${170 + sway * 6} -820 C ${150 + sway * 6} -900 ${110} -930 ${92 + sway * 3} -900`} stroke={o.tail} strokeWidth={22} fill="none" strokeLinecap="round" />
      )}
      {/* garment */}
      {lower === "long" && (
        <g>
          <path d={`M${W(-96)} -500 Q${W(-118)} -260 ${W(-128) - 4} -60 Q${-30} -40 0 -70 Q30 -40 ${W(128) + 4} -60 Q${W(118)} -260 ${W(96)} -500Z`} fill={o.dhoti} stroke="#000" strokeOpacity={0.3} strokeWidth={1.5} />
          <path d={`M${W(-96)} -500 Q${W(-118)} -260 ${W(-128) - 4} -60 Q${-30} -40 0 -70 Q30 -40 ${W(128) + 4} -60 Q${W(118)} -260 ${W(96)} -500Z`} fill="url(#rl-silk)" />
          {[-70, -36, 36, 70].map((x, i) => <path key={i} d={`M${x * 0.8} -470 Q${x * 1.05 + Math.sin(t * 1.2 + i) * 4} -280 ${x * 1.25} -80`} stroke="#000" strokeOpacity={0.16} strokeWidth={5} fill="none" strokeLinecap="round" />)}
          {[-50, 50].map((x, i) => <path key={i} d={`M${x * 0.9} -460 Q${x * 1.1} -300 ${x * 1.3} -90`} stroke="#fff" strokeOpacity={0.1} strokeWidth={4} fill="none" />)}
          {/* front pleats (kachha) with zari border */}
          <path d={`M-18 -488 Q-26 -260 -36 -66 L36 -66 Q26 -260 18 -488Z`} fill={o.dhoti} />
          <path d={`M-18 -488 Q-26 -260 -36 -66 L36 -66 Q26 -260 18 -488Z`} fill="url(#rl-silk)" />
          {[-24, -8, 8, 24].map((x) => <path key={x} d={`M${x * 0.6} -480 Q${x * 0.9} -260 ${x * 1.3} -70`} stroke="#000" strokeOpacity={0.22} strokeWidth={2} fill="none" />)}
          <path d={`M-36 -66 L36 -66 L34 -88 L-34 -88Z`} fill={o.border} />
          <path d={`M${W(-128) - 4} -60 Q-30 -40 0 -70 Q30 -40 ${W(128) + 4} -60`} stroke={o.border} strokeWidth={16} fill="none" />
          <path d={`M${W(-128) - 4} -60 Q-30 -40 0 -70 Q30 -40 ${W(128) + 4} -60`} stroke={RL.goldD} strokeWidth={16} strokeDasharray="3 6" strokeOpacity={0.45} fill="none" />
          {[-30, -18, -6, 6, 18, 30].map((x) => <path key={x} d={`M${x - 3} -82 l3 -5 l3 5 l-3 5Z`} fill={RL.goldL} opacity={0.85} />)}
        </g>
      )}
      {lower === "knee" && (
        <g>
          <path d={`M${W(-96)} -500 Q${W(-122)} -400 ${W(-118)} -276 Q-60 -262 -8 -300 L0 -330 L8 -300 Q60 -262 ${W(118)} -276 Q${W(122)} -400 ${W(96)} -500Z`} fill={o.dhoti} stroke="#000" strokeOpacity={0.3} strokeWidth={1.5} />
          <path d={`M${W(-96)} -500 Q${W(-122)} -400 ${W(-118)} -276 Q-60 -262 -8 -300 L0 -330 L8 -300 Q60 -262 ${W(118)} -276 Q${W(122)} -400 ${W(96)} -500Z`} fill="url(#rl-silk)" />
          <path d={`M${W(-118)} -276 Q-60 -262 -8 -300 L0 -330 L8 -300 Q60 -262 ${W(118)} -276`} stroke={o.border} strokeWidth={12} fill="none" />
          <path d="M-14 -488 Q-18 -400 -10 -310 L10 -310 Q18 -400 14 -488Z" fill={o.border} opacity={0.85} />
          {[-1, 1].map((sx) => <path key={sx} d={`M${sx * 30} -480 Q${sx * 60} -390 ${sx * 90} -300`} stroke="#000" strokeOpacity={0.18} strokeWidth={4} fill="none" />)}
        </g>
      )}
      {lower === "shorts" && (
        <g>
          <path d={`M${W(-96)} -500 Q${W(-118)} -420 ${W(-104)} -350 L-10 -360 L0 -400 L10 -360 L${W(104)} -350 Q${W(118)} -420 ${W(96)} -500Z`} fill={o.dhoti} stroke="#000" strokeOpacity={0.3} strokeWidth={1.5} />
          <path d={`M${W(-96)} -500 Q${W(-118)} -420 ${W(-104)} -350 L-10 -360 L0 -400 L10 -360 L${W(104)} -350 Q${W(118)} -420 ${W(96)} -500Z`} fill="url(#rl-silk)" />
          <path d={`M${W(-104)} -350 L-10 -360 M10 -360 L${W(104)} -350`} stroke={o.border} strokeWidth={10} />
        </g>
      )}
      {lower === "seated" && (
        <g>
          <path d="M-210 -40 Q-230 -140 -110 -170 L110 -170 Q230 -140 210 -40 Q0 -10 -210 -40Z" fill={o.robe ?? o.dhoti} stroke="#000" strokeOpacity={0.3} strokeWidth={1.5} />
          <path d="M-210 -40 Q-230 -140 -110 -170 L110 -170 Q230 -140 210 -40 Q0 -10 -210 -40Z" fill="url(#rl-drape)" />
          {[-1, 1].map((sx) => <path key={sx} d={`M${sx * 20} -160 Q${sx * 110} -110 ${sx * 190} -60`} stroke="#000" strokeOpacity={0.2} strokeWidth={4} fill="none" />)}
          {[-1, 1].map((sx) => (
            <g key={sx} transform={`translate(${sx * 60} -84) scale(${-sx} 1) rotate(-18)`}>
              <path d="M-26 -10 Q-28 8 -18 14 L32 12 Q40 8 36 0 Q20 -10 0 -14Z" fill={skin} stroke={line} strokeWidth={1.4} />
              {[10, 18, 25, 31].map((x, i) => <ellipse key={i} cx={x} cy={11 - i * 0.6} rx={3.2} ry={2.6} fill={skin} stroke={line} strokeWidth={0.8} />)}
              <path d="M-26 -10 Q-28 8 -18 14 L32 12 Q40 8 36 0 Q20 -10 0 -14Z" fill="#ffe2c8" opacity={0.12} />
            </g>
          ))}
          <path d="M-104 -186 Q0 -150 104 -186 L120 -150 Q0 -120 -120 -150Z" fill={o.robe ?? o.dhoti} />
        </g>
      )}
      {/* torso (shifted down onto the crossed legs when seated) */}
      <g transform={`translate(0 ${lower === "seated" ? 300 : 0})`}>
      <g transform={`translate(0 ${-b * 0.3}) scale(1 ${1 + b * 0.002})`}>
        <path d={torso} fill={o.armour ?? skin} stroke={line} strokeWidth={1.8} />
        <path d={torso} fill="url(#rl-torso)" />
        {!o.armour && !o.robe && (
          <g>
            <path d={`M-6 -716 Q${W(-50)} -730 ${W(-104)} -694 Q${W(-104)} -650 ${W(-62)} -638 Q-26 -638 -6 -660`} stroke="#000" strokeOpacity={0.2} strokeWidth={5} fill="none" strokeLinecap="round" />
            <path d={`M6 -716 Q${W(50)} -730 ${W(104)} -694 Q${W(104)} -650 ${W(62)} -638 Q26 -638 6 -660`} stroke="#000" strokeOpacity={0.28} strokeWidth={5} fill="none" strokeLinecap="round" />
            <path d={`M${W(-90)} -700 Q${W(-60)} -716 -20 -700`} stroke="#fff" strokeOpacity={0.14} strokeWidth={10} fill="none" strokeLinecap="round" />
            <path d="M0 -650 L0 -560" stroke="#000" strokeOpacity={0.16} strokeWidth={3} />
            {[-622, -592].map((y) => <path key={y} d={`M-34 ${y} Q-18 ${y + 5} 0 ${y + 1} Q18 ${y + 5} 34 ${y}`} stroke="#000" strokeOpacity={0.12} strokeWidth={3} fill="none" />)}
            <ellipse cx={0} cy={-546} rx={4.5} ry={6} fill="#000" opacity={0.3} />
            {[-1, 1].map((sx) => <circle key={sx} cx={sx * W(58)} cy={-664} r={3.2} fill="#000" opacity={0.25} />)}
          </g>
        )}
        {o.robe && <path d={`M${W(-120)} -716 Q-40 -640 -6 -476 L-30 -476 Q-70 -620 ${W(-120)} -700Z`} fill={o.robe} opacity={0.95} />}
        {o.armour && (
          <g>
            <path d="M-80 -700 Q0 -672 80 -700 M-86 -640 Q0 -610 86 -640 M-84 -580 Q0 -556 84 -580" stroke={RL.goldD} strokeWidth={3} fill="none" opacity={0.7} />
            <circle cx={0} cy={-660} r={22} fill={RL.gold} stroke={RL.goldD} strokeWidth={1.4} />
            <Gem x={0} y={-660} r={10} c={RL.ruby} />
          </g>
        )}
        {o.janeu && <path d={`M${W(-88)} -728 Q-10 -620 ${W(76)} -500`} stroke="#f6f0e0" strokeWidth={3} fill="none" />}
        {o.sash && (
          <g>
            <path d={`M${W(-110)} -740 Q${W(-60)} -690 ${W(86)} -500 L${W(56)} -490 Q${W(-60)} -660 ${W(-128)} -712Z`} fill={o.sash} stroke="#000" strokeOpacity={0.25} strokeWidth={1.2} />
            <path d={`M${W(-110)} -740 Q${W(-60)} -690 ${W(86)} -500 L${W(56)} -490 Q${W(-60)} -660 ${W(-128)} -712Z`} fill="url(#rl-silk)" />
            <path d={`M${W(-110)} -740 Q${W(-60)} -690 ${W(86)} -500`} stroke={o.border} strokeWidth={5} fill="none" />
          </g>
        )}
        <Necklaces o={o} t={t} bulk={bulk} />
      </g>
      {/* belt (kamarbandh) */}
      {o.belt !== false && (
        <g>
          <path d={`M${W(-98)} -508 Q0 -482 ${W(98)} -508 L${W(98)} -486 Q0 -460 ${W(-98)} -486Z`} fill={RL.gold} stroke={RL.goldD} strokeWidth={1.2} />
          {[...Array(11)].map((_, i) => <Gem key={i} x={W(-84 + i * 16.8)} y={-494 + Math.abs(i - 5) * -0.9 + 4} r={i === 5 ? 9 : 2.6} c={i === 5 ? RL.ruby : i % 2 ? RL.pearl : RL.emer} />)}
          {[-1, 0, 1].map((k) => (
            <g key={k} transform={`translate(${k * 26} -470) rotate(${Math.sin(t * 1.9 + k) * 4})`}>
              <path d={`M0 0 L0 ${50 - Math.abs(k) * 14}`} stroke={RL.goldH} strokeWidth={2.4} strokeDasharray="4 2" />
              <Pearl x={0} y={54 - Math.abs(k) * 14} r={3.4} />
            </g>
          ))}
        </g>
      )}
      </g>
    </g>
  );
};

/** One full character. Arm targets are relative to the body origin; heads can be replaced (Ravana adds nine more). */
export type Char = {
  look: Look; o: Outfit; t: number; e?: Expr; bulk?: number; seed?: number;
  rHand?: P; lHand?: P; rPose?: HandPose; lPose?: HandPose; rWrist?: number; lWrist?: number; rProp?: React.ReactNode; lProp?: React.ReactNode;
  headTilt?: number; extraHeads?: React.ReactNode; glow?: number; aura?: string; rBend?: number; lBend?: number; stance?: number; lean?: number;
  lFront?: boolean; rFront?: boolean; sleeve?: string;
};

export const Hero: React.FC<Char> = ({
  look, o, t, e, bulk = 1, seed = 0, rHand = [-150, -400], lHand = [150, -400], rPose = HP.hang, lPose = HP.hang, rWrist = 0, lWrist = 0, rProp, lProp,
  headTilt = 0, extraHeads, glow = 0, aura = "#ffd27a", rBend = 0, lBend = 0, stance = 0, lean = 0, rFront = true, lFront = true, sleeve,
}) => {
  const br = Math.sin(t * 1.6 + seed) * 2.4;
  const rS: P = [SH.r[0] * bulk, SH.r[1] - br * 0.4];
  const lS: P = [SH.l[0] * bulk, SH.l[1] - br * 0.4];
  // elbows out by default: right arm (viewer left) bends with +1 when the hand is below the shoulder
  const rb = rBend || (rHand[1] > rS[1] ? 1 : -1);
  const lb = lBend || (lHand[1] > lS[1] ? -1 : 1);
  const armR = <RArm s={rS} h={rHand} bend={rb} skin={look.skin} line={look.line} t={t} pose={rPose} wrist={rWrist} flip={false} prop={rProp} bulk={bulk} sleeve={sleeve} />;
  const armL = <RArm s={lS} h={lHand} bend={lb} skin={look.skin} line={look.line} t={t} pose={lPose} wrist={lWrist} flip prop={lProp} bulk={bulk} sleeve={sleeve} />;
  const up = o.lower === "seated" ? 300 : 0;
  return (
    <g transform={`rotate(${lean} 0 ${up ? -200 : -400})`}>
      {glow > 0 && <ellipse cx={0} cy={-520 + up * 0.6} rx={420} ry={620 - up * 0.6} fill={aura} opacity={0.16 * glow} />}
      <ellipse cx={0} cy={0} rx={up ? 230 : 190} ry={24} fill="#000" opacity={0.32} />
      <g transform={`translate(0 ${up})`}>
        {!rFront && armR}
        {!lFront && armL}
      </g>
      <Body look={look} o={o} t={t} bulk={bulk} stance={stance} />
      <g transform={`translate(0 ${up})`}>
        {extraHeads}
        <g transform={`translate(0 ${-850 - br * 0.3}) rotate(${headTilt})`}>
          <RHead look={look} e={e} t={t} seed={seed} />
        </g>
        {rFront && armR}
        {lFront && armL}
      </g>
    </g>
  );
};

// ---------------------------------------------------------------- props (grip at the origin, blade / shaft toward −y)

export const Sword: React.FC<{ len?: number }> = ({ len = 330 }) => (
  <g>
    <path d={`M-9 -26 Q-14 ${-len * 0.6} 10 ${-len} Q8 ${-len * 0.6} 9 -26Z`} fill="#d8dee8" stroke="#6a7484" strokeWidth={1.4} />
    <path d={`M2 -30 Q0 ${-len * 0.6} 9 ${-len + 10}`} stroke="#fff" strokeWidth={2.4} opacity={0.8} fill="none" />
    <path d="M-30 -26 Q0 -40 30 -26 Q0 -18 -30 -26Z" fill={RL.gold} stroke={RL.goldD} strokeWidth={1} />
    <Gem x={0} y={-28} r={4} c={RL.ruby} />
    <rect x={-7} y={-22} width={14} height={50} rx={5} fill="#5a1a14" />
    {[-14, -4, 6, 16].map((y) => <rect key={y} x={-8} y={y} width={16} height={3} fill={RL.gold} />)}
    <ellipse cx={0} cy={32} rx={12} ry={7} fill={RL.gold} stroke={RL.goldD} strokeWidth={1} />
  </g>
);

export const Gada: React.FC<{ len?: number }> = ({ len = 300 }) => (
  <g>
    <rect x={-6} y={-len + 60} width={12} height={len - 20} rx={5} fill={RL.goldH} stroke={RL.goldD} strokeWidth={1} />
    {[...Array(6)].map((_, i) => <rect key={i} x={-8} y={-len + 90 + i * 34} width={16} height={6} rx={2} fill={RL.gold} />)}
    <g transform={`translate(0 ${-len + 10})`}>
      <ellipse cx={0} cy={0} rx={52} ry={62} fill={RL.goldH} stroke={RL.goldD} strokeWidth={1.6} />
      <ellipse cx={0} cy={0} rx={52} ry={62} fill="url(#rl-cylA)" opacity={0.5} transform="rotate(90)" />
      {[-30, -10, 10, 30].map((x) => <path key={x} d={`M${x} -58 Q${x * 1.3} 0 ${x} 58`} stroke={RL.goldD} strokeWidth={1.4} fill="none" />)}
      <Gem x={0} y={0} r={9} c={RL.ruby} />
      {[-1, 1].map((sx) => <Gem key={sx} x={sx * 30} y={-20} r={4} c={RL.emer} />)}
      <path d="M-8 -60 Q0 -90 8 -60Z" fill={RL.gold} stroke={RL.goldD} />
      <Gem x={0} y={-76} r={3.4} c={RL.ruby} />
    </g>
    <ellipse cx={0} cy={30} rx={10} ry={8} fill={RL.gold} stroke={RL.goldD} />
  </g>
);

export const Pasha: React.FC<{ t: number; glow?: number }> = ({ t, glow = 0 }) => (
  <g>
    {glow > 0 && <circle cx={0} cy={-120} r={110} fill="#6ab8ff" opacity={0.25 * glow} />}
    <path d={`M0 -20 C-20 -80 -90 -110 -80 -170 C-70 -230 70 -230 80 -170 C90 -110 20 -80 0 -20`} stroke="#c8a464" strokeWidth={7} fill="none" />
    <path d={`M0 -20 C-20 -80 -90 -110 -80 -170 C-70 -230 70 -230 80 -170 C90 -110 20 -80 0 -20`} stroke="#6a4a1a" strokeWidth={7} strokeDasharray="3 5" fill="none" />
    <path d={`M0 20 Q${Math.sin(t * 2) * 10} 60 -6 100`} stroke="#c8a464" strokeWidth={6} fill="none" />
  </g>
);

export const Lotus: React.FC<{ glow?: number }> = ({ glow = 0 }) => (
  <g>
    {glow > 0 && <circle cx={0} cy={-70} r={70} fill="#ffd8e8" opacity={0.3 * glow} />}
    <path d="M0 30 L0 -40" stroke="#3a7a3a" strokeWidth={6} />
    {[-2, -1, 0, 1, 2].map((k) => (
      <path key={k} transform={`translate(0 -50) rotate(${k * 26})`} d="M0 0 Q-16 -30 0 -62 Q16 -30 0 0Z" fill="#f4a6c0" stroke="#c2507a" strokeWidth={1.2} />
    ))}
    <ellipse cx={0} cy={-52} rx={14} ry={7} fill="#ffd34a" />
  </g>
);

export const Sruva: React.FC = () => (
  <g>
    <rect x={-4} y={-150} width={8} height={170} rx={3} fill="#8a5a2a" stroke="#4a2a10" strokeWidth={1} />
    <ellipse cx={0} cy={-156} rx={14} ry={9} fill="#b8862e" stroke="#6a4a14" strokeWidth={1.2} />
    <ellipse cx={0} cy={-158} rx={9} ry={4} fill="#ffcf6a" />
  </g>
);
