/**
 * Scene helpers shared by every reel: easing/tween (tw), seeded random (rnd), the 2.5D camera (Cam, C0, Layer, rig),
 * placement (At) and stock scenery (Sky, Cloud, Bolt, Pillar, Fire, Particles, Hills). 1080×1920 at 60 fps.
 * 2.5D = flat SVG layers at depths d (0 = far sky, 1 = subject plane, >1 = foreground) and one camera moving through them,
 * which gives parallax, depth-of-field blur (dof) and motion blur from camera speed automatically.
 */
import React from "react";
import { Easing, interpolate } from "remotion";

export const FPS = 60;
export const W = 1080;
export const H = 1920;
export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const glide = Easing.bezier(0.25, 0.1, 0.25, 1);
export const tw = (t: number, ts: number[], vs: number[], e: (n: number) => number = glide) => interpolate(t, ts, vs, { ...clamp, easing: e });
export const rnd = (s: number) => {
  const x = Math.sin(s * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export type Words = { w: string; start: number; end: number; line: number }[];

// ---------------------------------------------------------------- 2.5D camera and layers

export type Cam = { x: number; y: number; z: number; r: number };
export const C0: Cam = { x: 0, y: 0, z: 1, r: 0 };

/** One flat plane at depth d (0 = infinitely far, 1 = subject plane, >1 = in front of the subject). */
export const Layer: React.FC<{ cam: Cam; prev: Cam; d: number; focus?: number; dof?: number; id: string; children: React.ReactNode; opacity?: number }> = ({
  cam, prev, d, focus = 1, dof = 0, id, children, opacity = 1,
}) => {
  const s = 1 + (cam.z - 1) * d;
  const vx = (cam.x - prev.x) * d * s;
  const vy = (cam.y - prev.y) * d * s + (cam.z - prev.z) * d * 700;
  const mbx = Math.min(Math.abs(vx) * 0.5, 26);
  const mby = Math.min(Math.abs(vy) * 0.5, 26);
  const def = Math.abs(d - focus) * dof;
  const blur = def + mbx + mby > 0.4;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0, overflow: "visible", opacity }}>
      <defs>
        <filter id={id} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation={`${(def + mbx).toFixed(2)} ${(def + mby).toFixed(2)}`} />
        </filter>
      </defs>
      <g
        transform={`translate(${W / 2} ${H / 2}) rotate(${cam.r * Math.min(d, 1.4)}) scale(${s}) translate(${-W / 2 - cam.x * d} ${-H / 2 - cam.y * d})`}
        filter={blur ? `url(#${id})` : undefined}
      >
        {children}
      </g>
    </svg>
  );
};

/** Binds a camera function (local scene time → Cam) to layers: L({d, ...}) */
export const rig = (camAt: (s: number) => Cam, s: number) => {
  const cam = camAt(s);
  const prev = camAt(s - 1 / FPS);
  return (p: { d: number; id: string; focus?: number; dof?: number; opacity?: number; children: React.ReactNode }) => <Layer cam={cam} prev={prev} {...p} />;
};

export const At: React.FC<{ x: number; y: number; s?: number; children: React.ReactNode; flip?: boolean }> = ({ x, y, s = 1, children, flip }) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}>{children}</g>
);

// ---------------------------------------------------------------- shared scenery

export const Sky: React.FC<{ stops: [number, string][]; flash?: number }> = ({ stops, flash = 0 }) => (
  <g>
    {stops.map(([y, c], i) => (
      <rect key={i} x={-1500} y={i === 0 ? -2500 : y} width={W + 3000} height={(stops[i + 1]?.[0] ?? 6000) - (i === 0 ? -2500 : y) + 2} fill={c} />
    ))}
    {flash > 0 && <rect x={-1500} y={-2500} width={W + 3000} height={9000} fill="#dfe8ff" opacity={flash} />}
  </g>
);

export const Cloud: React.FC<{ x: number; y: number; s: number; fill: string; o?: number }> = ({ x, y, s, fill, o = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill} opacity={o}>
    <ellipse cx={0} cy={0} rx={190} ry={60} />
    <ellipse cx={-120} cy={12} rx={115} ry={46} />
    <ellipse cx={128} cy={14} rx={136} ry={50} />
    <ellipse cx={30} cy={-44} rx={116} ry={64} />
  </g>
);

export const Bolt: React.FC<{ x: number; y: number; len: number; seed: number; k: number; w?: number; angle?: number }> = ({ x, y, len, seed, k, w = 8, angle = 90 }) => {
  if (k <= 0 || k >= 1) return null;
  const n = 10;
  let d = "M0 0";
  for (let i = 1; i <= n; i++) d += ` L${(i / n) * len} ${(rnd(seed + i) - 0.5) * 90 * (i < n ? 1 : 0)}`;
  const vis = Math.min(1, k * 4);
  const fade = k < 0.5 ? 1 : 1 - (k - 0.5) * 2;
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`} opacity={fade}>
      <path d={d} stroke="#8fb8ff" strokeWidth={w * 4} fill="none" opacity={0.35} strokeDasharray={`${len * 1.3}`} strokeDashoffset={len * 1.3 * (1 - vis)} />
      <path d={d} stroke="#f4f8ff" strokeWidth={w} fill="none" strokeLinejoin="round" strokeDasharray={`${len * 1.3}`} strokeDashoffset={len * 1.3 * (1 - vis)} />
    </g>
  );
};

export const Pillar: React.FC<{ x: number; y: number; h: number; s?: number; c?: string; c2?: string }> = ({ x, y, h, s = 1, c = "#e9c27a", c2 = "#b8863e" }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-60} y={-h} width={120} height={h} fill={c} />
    <rect x={20} y={-h} width={40} height={h} fill={c2} opacity={0.5} />
    <rect x={-80} y={-h - 40} width={160} height={40} fill={c2} />
    <rect x={-80} y={-30} width={160} height={30} fill={c2} />
    {[-30, 0, 30].map((dx) => <rect key={dx} x={dx - 4} y={-h + 20} width={8} height={h - 70} fill={c2} opacity={0.35} />)}
  </g>
);

export const Fire: React.FC<{ t: number; x: number; y: number; s?: number; tint?: string }> = ({ t, x, y, s = 1, tint }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx={0} cy={-120} rx={260} ry={200} fill={tint ?? "#ff9a3c"} opacity={0.18 + 0.04 * Math.sin(t * 17)} />
    <path d="M-220 0 L220 0 L190 90 L-190 90Z" fill="#7a3a1e" />
    <path d="M-220 0 L220 0 L210 -30 L-210 -30Z" fill="#9a4a24" />
    {[...Array(7)].map((_, i) => {
      const fx = -150 + i * 50;
      const h = 150 + 70 * Math.sin(t * (9 + i) + i * 2) + (i === 3 ? 90 : 0);
      return (
        <g key={i}>
          <path d={`M${fx - 34} -26 Q${fx - 30} ${-h * 0.6} ${fx + 6 * Math.sin(t * 13 + i)} ${-h} Q${fx + 30} ${-h * 0.5} ${fx + 34} -26Z`} fill={tint ?? "#ff6a14"} />
          <path d={`M${fx - 18} -26 Q${fx - 14} ${-h * 0.4} ${fx + 4 * Math.sin(t * 15 + i)} ${-h * 0.65} Q${fx + 16} ${-h * 0.35} ${fx + 18} -26Z`} fill="#ffd36b" />
        </g>
      );
    })}
  </g>
);

export const Particles: React.FC<{ t: number; seed: number; n: number; color: string; x0: number; x1: number; y0: number; y1: number; speed: number; size: number; up?: boolean }> = ({
  t, seed, n, color, x0, x1, y0, y1, speed, size, up = true,
}) => (
  <g>
    {[...Array(n)].map((_, i) => {
      const span = y1 - y0;
      const p = (rnd(seed + i) * span + t * speed * (0.6 + rnd(seed + i + 50))) % span;
      const y = up ? y1 - p : y0 + p;
      const x = x0 + rnd(seed + i + 9) * (x1 - x0) + Math.sin(t * 1.4 + i) * 16;
      const r = size * (0.5 + rnd(seed + i + 3)) * (0.6 + 0.4 * Math.abs(Math.sin(t * 3 + i)));
      return (
        <g key={i}>
          <circle cx={x} cy={y} r={r * 2.6} fill={color} opacity={0.18} />
          <circle cx={x} cy={y} r={r} fill={color} />
        </g>
      );
    })}
  </g>
);

export const Hills: React.FC<{ y: number; fill: string; seed: number; amp: number }> = ({ y, fill, seed, amp }) => {
  let d = `M-1500 ${y + 4000} L-1500 ${y}`;
  for (let i = 0; i <= 16; i++) d += ` Q${-1500 + (i - 0.5) * 255} ${y - amp * (0.5 + rnd(seed + i))} ${-1500 + i * 255} ${y}`;
  return <path d={d + ` L${W + 1500} ${y + 4000}Z`} fill={fill} />;
};

