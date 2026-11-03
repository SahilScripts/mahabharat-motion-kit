/**
 * CTA-workflow — optional 15.2 s end card as full motion graphics, timed to its own Hindi voice line (public/mg/cta/vo.mp3):
 * "comment WORKFLOW and I'll DM you the guide — follow first or the message won't arrive". To use your own call to action,
 * replace vo.mp3 and retime T below (word times of your line), or skip the end card.
 * Every beat is a picture of what the words say; no subtitles.
 *   A 0.0–2.6  "ऐसी एनिमेटेड रील"      the reel's last frame pulls back into a phone; past reels fan out behind it
 *   B 2.6–4.8  "आसान स्टेप्स में"        a staircase of tool steps (script, voice, character, animation, music); a gold dot climbs to the phone
 *   C 4.8–6.9  "कमेंट में लिखिए वर्कफ़्लो"   the comment bar types WORKFLOW and sends
 *   D 7.1–9.4  "DM कर दूँगा"            the comment flies as a paper plane into the inbox, which opens on the guide PDF
 *   E 9.7–11.9 "पहले फ़ॉलो ज़रूर करें"     a finger taps Follow
 *   F 11.9–14.1 "वरना… नहीं पहुँचेगा"      two lanes: the plane reaches the follower, hits a lock for the non-follower
 *   G 14.1–end  WORKFLOW + Follow together, glow, fade
 * Colour: gold = the action the viewer must take (comment, follow, the message that arrives); red = blocked.
 */
import React from "react";
import { AbsoluteFill, Audio, Composition, Easing, Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";

const FPS = 60, W = 1080, H = 1920;
type P = { dur: number; still: string; others: string[]; audio?: boolean; sfx?: string };
const DEF: P = { dur: 15.2, still: "mg/cta/ex-sanjeevani.jpg", others: ["mg/cta/ex-asur-rakshas.jpg", "mg/cta/ex-durga.jpg"], audio: true, sfx: "mg/cta/sfx.mp3" };

// word times (s) of the voice line in public/mg/cta/vo.mp3
const T = { reel: 1.74, steps: 2.6, comment: 4.8, keyStart: 5.86, sent: 6.76, dm: 7.2, dmDone: 8.84, but: 9.72, follow: 10.6, tap: 11.34, varna: 11.92, nahi: 13.4, end: 14.1 };
const GOLD = "#ffd27a", GOLD2 = "#e7a93a", CREAM = "#fffaf0", INK = "#2a1a14", MAROON = "#6e1423", DEEP = "#1a0609", RED = "#e2574c", MUTED = "#8a7468";
const DEV = "Kohinoor Devanagari, Noto Sans Devanagari, sans-serif";
const LAT = "Helvetica Neue, Arial, sans-serif";
const cl = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.bezier(0.33, 1, 0.68, 1);
const io = Easing.bezier(0.65, 0, 0.35, 1);
const lerp = (t: number, a: number, b: number, from: number, to: number, e = ease) => interpolate(t, [a, b], [from, to], { ...cl, easing: e });

const useSpring = (f: number, at: number, damping = 13, stiffness = 170) => spring({ frame: f - at * FPS, fps: FPS, config: { damping, stiffness } });

/* ---------- small vector pieces ---------- */
const Plane: React.FC<{ size: number; color?: string }> = ({ size, color = GOLD }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"><path d="M2.5 11.2 21.5 3l-7 18-3.2-7.4L2.5 11.2z" fill={color} /><path d="M11.3 13.6 21.5 3" stroke={DEEP} strokeWidth={0.9} opacity={0.5} /></svg>
);
const Icon: React.FC<{ k: string; s: number; c: string }> = ({ k, s, c }) => {
  const p = { fill: "none", stroke: c, strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24">
      {k === "script" && <><rect x={5} y={3} width={14} height={18} rx={2} {...p} /><path d="M8 8h8M8 12h8M8 16h5" {...p} /></>}
      {k === "voice" && <><rect x={9} y={3} width={6} height={11} rx={3} {...p} /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" {...p} /></>}
      {k === "char" && <><circle cx={12} cy={8} r={4} {...p} /><path d="M4.5 21c.8-4.4 3.8-6.6 7.5-6.6s6.7 2.2 7.5 6.6" {...p} /></>}
      {k === "anim" && <><rect x={3} y={6} width={18} height={13} rx={2} {...p} /><path d="M3 10h18M7 6l-2 4M12 6l-2 4M17 6l-2 4" {...p} /></>}
      {k === "music" && <><path d="M9 18V5l11-2v13" {...p} /><circle cx={6.5} cy={18} r={2.5} {...p} /><circle cx={17.5} cy={16} r={2.5} {...p} /></>}
    </svg>
  );
};
const Avatar: React.FC<{ s: number; c: string; ring?: string }> = ({ s, c, ring }) => (
  <svg width={s} height={s} viewBox="0 0 24 24">
    <circle cx={12} cy={12} r={11} fill={DEEP} stroke={ring || c} strokeWidth={1.4} />
    <circle cx={12} cy={9.5} r={3.6} fill={c} /><path d="M5.5 19.5c1-3.3 3.6-4.9 6.5-4.9s5.5 1.6 6.5 4.9" fill={c} />
  </svg>
);
const Lock: React.FC<{ s: number }> = ({ s }) => (
  <svg width={s} height={s} viewBox="0 0 24 24"><rect x={4.5} y={10.5} width={15} height={11} rx={2.4} fill={RED} /><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" fill="none" stroke={RED} strokeWidth={2.4} /><circle cx={12} cy={15.5} r={1.6} fill={DEEP} /></svg>
);
const Finger: React.FC<{ s: number }> = ({ s }) => (
  <svg width={s} height={s} viewBox="0 0 24 24"><path d="M9 11V4.8a1.6 1.6 0 0 1 3.2 0V10l.1-1.2a1.5 1.5 0 0 1 3 .2v1.4a1.5 1.5 0 0 1 3 .3v1.2a1.4 1.4 0 0 1 2.7.4v3.4c0 3.6-2.6 6.3-6.3 6.3h-1.5c-2 0-3.3-.8-4.5-2.3l-3.3-4.4a1.6 1.6 0 0 1 2.4-2.1L9 13.5z" fill={CREAM} stroke={INK} strokeWidth={1} strokeLinejoin="round" /></svg>
);

const FollowBtn: React.FC<{ followed: boolean; scale?: number; dim?: boolean }> = ({ followed, scale = 1, dim }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 22 * scale, padding: `${30 * scale}px ${70 * scale}px`, borderRadius: 70 * scale, background: dim ? "#4a3a34" : followed ? "#3a2a24" : `linear-gradient(180deg,${GOLD},${GOLD2})`, boxShadow: "0 20px 50px rgba(0,0,0,0.45)" }}>
    <svg width={60 * scale} height={60 * scale} viewBox="0 0 24 24">
      {followed
        ? <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke={GOLD} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        : <><circle cx={10} cy={8} r={4} fill={dim ? MUTED : "#4a0e18"} /><path d="M2.5 20c.8-4 3.8-6 7.5-6s6.7 2 7.5 6z" fill={dim ? MUTED : "#4a0e18"} /><path d="M19 6v6M16 9h6" stroke={dim ? MUTED : "#4a0e18"} strokeWidth={2.4} strokeLinecap="round" /></>}
    </svg>
    <span style={{ fontFamily: DEV, fontWeight: 800, fontSize: 74 * scale, color: dim ? MUTED : followed ? GOLD : "#4a0e18", whiteSpace: "nowrap" }}>{followed ? "फ़ॉलो किया" : "फ़ॉलो करें"}</span>
  </div>
);

/* ---------- the film ---------- */
export const MgCta2: React.FC<P> = ({ dur, still, others, audio = true, sfx }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const fadeOut = lerp(t, dur - 0.35, dur, 1, 0);

  // background: the reel's frame, blurred and dimmed once the phone has pulled out of it
  const bgSoft = lerp(t, 0.2, 1.2, 0, 1);
  const glow = 0.5 + 0.5 * Math.sin(t * 2.2);

  /* A + B: phone. Full screen -> phone (0.1-1.1) -> small, top (B) -> off (C) */
  const pull = lerp(t, 0.1, 1.15, 0, 1, io);
  const toTop = lerp(t, T.steps - 0.1, T.steps + 0.5, 0, 1, io);
  const phoneOut = lerp(t, T.comment - 0.15, T.comment + 0.35, 0, 1, io);
  const phW = interpolate(pull, [0, 1], [W, 520]) * interpolate(toTop, [0, 1], [1, 0.62]);
  const phH = phW * (H / W);
  const phCx = interpolate(toTop, [0, 1], [540, 760]);
  const phCy = interpolate(pull, [0, 1], [960, 900]) + interpolate(toTop, [0, 1], [0, -330]) - phoneOut * 1200;
  const bezel = pull * 22 * (phW / 520);

  // fanned reels behind the phone ("ऐसी एनिमेटेड रील")
  const fan = useSpring(f, T.reel - 0.4, 12, 120) * (1 - toTop);

  // B: staircase
  const steps = ["script", "voice", "char", "anim", "music"];
  const stepX = (i: number) => 120 + i * 165, stepY = (i: number) => 1560 - i * 130;
  const stepsOut = lerp(t, T.comment - 0.2, T.comment + 0.3, 0, 1, io);
  const hopT = (t - (T.steps + 0.35)) / 0.36; // one step every 0.36 s
  const hopI = Math.max(-1, Math.min(steps.length, Math.floor(hopT)));
  const hopFrac = hopT - Math.floor(hopT);
  let dotX = stepX(0) - 110, dotY = stepY(0) + 30;
  if (hopT >= 0) {
    const i = Math.min(hopI, steps.length);
    const fromX = i === 0 ? stepX(0) - 110 : stepX(i - 1), fromY = i === 0 ? stepY(0) + 30 : stepY(i - 1) - 70;
    const toX = i >= steps.length ? phCx - 40 : stepX(i), toY = i >= steps.length ? phCy + phH / 2 - 30 : stepY(i) - 70;
    const k = i >= steps.length ? Math.min(1, hopFrac * 1.4 + (hopI > steps.length ? 1 : 0)) : Math.min(1, hopFrac * 1.6);
    dotX = fromX + (toX - fromX) * ease(k);
    dotY = fromY + (toY - fromY) * ease(k) - Math.sin(Math.PI * k) * 90;
  }
  const dotIn = lerp(t, T.steps + 0.1, T.steps + 0.35, 0, 1) * (1 - stepsOut);
  const reached = t > T.steps + 0.35 + 0.36 * steps.length + 0.3;

  /* C: comment bar */
  const inC = useSpring(f, T.comment, 13, 160);
  const KEY = "WORKFLOW";
  const typed = Math.max(0, Math.min(KEY.length, Math.floor((t - T.keyStart) / 0.075)));
  const sent = t > T.sent;
  const barY = 860 + (1 - inC) * 80 - lerp(t, T.dm + 1.1, T.dm + 1.6, 0, 1, io) * 330; // lifts above the DM card
  const barOut = lerp(t, T.but - 0.2, T.but + 0.2, 0, 1);

  /* D: paper plane to the inbox, inbox opens on the PDF */
  const fly = lerp(t, T.dm - 0.1, T.dm + 0.95, 0, 1, io);
  const inbox = useSpring(f, T.dm - 0.3, 12, 160) * (1 - lerp(t, T.but - 0.2, T.but + 0.2, 0, 1));
  const inboxX = 860, inboxY = 330;
  const sx = 930, sy = barY + 60; // send button
  const px = sx + (inboxX - sx) * fly + Math.sin(Math.PI * fly) * -260;
  const py = sy + (inboxY - sy) * fly - Math.sin(Math.PI * fly) * 220;
  const pAng = Math.atan2((inboxY - sy) - Math.cos(Math.PI * fly) * 220 * Math.PI, (inboxX - sx) - Math.cos(Math.PI * fly) * 260 * Math.PI) * 180 / Math.PI;
  const arrived = t > T.dm + 0.95;
  const shake = arrived ? Math.sin((t - T.dm - 0.95) * 50) * Math.max(0, 1 - (t - T.dm - 0.95) * 3) * 10 : 0;
  const card = useSpring(f, T.dm + 1.15, 13, 150);
  const cardOut = lerp(t, T.but - 0.2, T.but + 0.3, 0, 1, io);

  /* E: follow */
  const inF = useSpring(f, T.but, 11, 170);
  const warn = lerp(t, T.but, T.but + 0.7, 0, 1);
  const fingerIn = lerp(t, T.follow - 0.1, T.tap - 0.05, 0, 1, io);
  const tapD = t - T.tap;
  const press = tapD > 0 && tapD < 0.16 ? 0.92 : 1;
  const followed = tapD > 0.1;
  const ring = lerp(tapD, 0, 0.6, 0, 1);
  const followOut = lerp(t, T.varna - 0.15, T.varna + 0.3, 0, 1, io);
  const fingerOut = lerp(t, T.tap + 0.25, T.tap + 0.55, 0, 1);

  /* F: two lanes */
  const lanes = lerp(t, T.varna - 0.05, T.varna + 0.35, 0, 1) * (1 - lerp(t, T.end, T.end + 0.35, 0, 1));
  const laneA = lerp(t, T.varna + 0.25, T.varna + 1.05, 0, 1, io); // reaches
  const laneB = lerp(t, T.varna + 0.55, T.nahi, 0, 1, Easing.in(Easing.quad)); // hits the lock
  const crash = t - T.nahi;
  const okPop = useSpring(f, T.varna + 1.05, 10, 200);
  const lockPop = useSpring(f, T.varna + 0.3, 12, 180);

  /* G: final pair */
  const fin = useSpring(f, T.end, 13, 140);

  return (
    <AbsoluteFill style={{ background: DEEP, opacity: fadeOut, overflow: "hidden" }}>
      {audio && <Audio src={staticFile("mg/cta/vo.mp3")} />}
      {audio && sfx && <Audio src={staticFile(sfx)} volume={0.3} />}

      {/* backdrop */}
      <AbsoluteFill style={{ opacity: bgSoft }}>
        <Img src={staticFile(still)} style={{ width: W, height: H, filter: "blur(26px) brightness(0.32) saturate(1.2)", transform: "scale(1.1)" }} />
        <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 45%, rgba(110,20,35,${0.25 + 0.1 * glow}) 0%, rgba(26,6,9,0.85) 70%)` }} />
      </AbsoluteFill>

      {/* A: fanned past reels */}
      {fan > 0.01 && others.map((src, i) => {
        const side = i === 0 ? -1 : 1;
        return (
          <div key={src} style={{ position: "absolute", left: phCx - 210, top: phCy - 370, width: 420, height: 747, borderRadius: 34, overflow: "hidden", border: `10px solid #2b1418`, boxShadow: "0 30px 60px rgba(0,0,0,0.5)", opacity: Math.min(1, fan * 1.5) * 0.92,
            transform: `translateX(${side * 300 * fan}px) translateY(${60 * fan}px) rotate(${side * 13 * fan}deg) scale(${0.8 + 0.1 * fan})` }}>
            <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        );
      })}

      {/* A/B: the phone */}
      {phoneOut < 1 && (
        <div style={{ position: "absolute", left: phCx - phW / 2 - bezel, top: phCy - phH / 2 - bezel, width: phW + 2 * bezel, height: phH + 2 * bezel, borderRadius: pull * 60 * (phW / 520), background: "#120507", boxShadow: pull > 0.05 ? `0 40px 90px rgba(0,0,0,0.6), 0 0 ${80 * (reached ? 1 : 0)}px ${GOLD}` : "none", padding: bezel }}>
          <div style={{ width: phW, height: phH, borderRadius: pull * 44 * (phW / 520), overflow: "hidden", position: "relative" }}>
            <Img src={staticFile(still)} style={{ width: "100%", height: "100%" }} />
            {/* reel UI: progress bar + heart */}
            <div style={{ position: "absolute", left: 0, bottom: 0, height: 8 * (phW / 520), width: `${100 * lerp(t, 0.6, 4.5, 0.15, 1, Easing.linear)}%`, background: GOLD, opacity: pull }} />
            <svg style={{ position: "absolute", right: 22 * (phW / 520), bottom: 120 * (phW / 520), opacity: pull }} width={58 * (phW / 520)} height={58 * (phW / 520)} viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.8a4.3 4.3 0 0 1 7.5 2.7c0 5.4-7.5 10-7.5 10z" fill={reached ? RED : "none"} stroke={CREAM} strokeWidth={1.6} /></svg>
          </div>
          {/* notch */}
          <div style={{ position: "absolute", left: "50%", top: bezel + 14 * (phW / 520), width: 120 * (phW / 520), height: 26 * (phW / 520), marginLeft: -60 * (phW / 520), borderRadius: 20, background: "#120507", opacity: pull }} />
        </div>
      )}

      {/* B: staircase of steps */}
      {t > T.steps - 0.2 && stepsOut < 1 && steps.map((k, i) => {
        const s = useSpringPure(f, T.steps + 0.05 + i * 0.12);
        const lit = hopI >= i && hopT >= 0;
        return (
          <div key={k} style={{ position: "absolute", left: stepX(i) - 82, top: stepY(i), width: 165, opacity: Math.min(1, s * 1.5) * (1 - stepsOut), transform: `translateY(${(1 - s) * 120 + stepsOut * 300}px)` }}>
            <div style={{ height: 22, borderRadius: 8, background: lit ? GOLD : "#5a3a34", boxShadow: lit ? `0 0 30px ${GOLD}` : "none" }} />
            <div style={{ height: 1560 - stepY(i) + 400, background: "linear-gradient(180deg, rgba(90,58,52,0.55), rgba(26,6,9,0))" }} />
            <div style={{ position: "absolute", left: 14, top: -190, width: 136, height: 136, borderRadius: 38, background: lit ? CREAM : "rgba(255,250,240,0.12)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${lit ? 1 + 0.12 * Math.max(0, 1 - (hopT - i) * 3) : 0.9})` }}>
              <Icon k={k} s={88} c={lit ? MAROON : "#cdbba8"} />
            </div>
          </div>
        );
      })}
      {dotIn > 0.01 && !reached && (
        <div style={{ position: "absolute", left: dotX - 32, top: dotY - 32, width: 64, height: 64, borderRadius: 32, background: GOLD, boxShadow: `0 0 40px ${GOLD}`, opacity: dotIn }} />
      )}

      {/* C: comment bar */}
      {t > T.comment - 0.1 && barOut < 1 && (
        <div style={{ position: "absolute", left: 80, right: 80, top: barY, opacity: Math.min(1, inC * 1.4) * (1 - barOut), transform: `scale(${(0.85 + 0.15 * inC) * (1 - 0.15 * barOut)})` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 28, background: CREAM, borderRadius: 60, padding: "34px 40px", boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}>
            <svg width={88} height={88} viewBox="0 0 24 24" style={{ flex: "none" }}><path d="M12 3C6.5 3 2.5 6.6 2.5 11c0 2.2 1 4.2 2.7 5.6L4.5 21l4.6-2.4c.9.2 1.9.4 2.9.4 5.5 0 9.5-3.6 9.5-8S17.5 3 12 3z" fill="none" stroke={MAROON} strokeWidth={1.8} strokeLinejoin="round" /></svg>
            <div style={{ flex: 1, fontFamily: LAT, fontWeight: 800, fontSize: 84, letterSpacing: 1, color: INK, whiteSpace: "nowrap" }}>
              {KEY.slice(0, typed)}<span style={{ opacity: !sent && Math.floor(t * 2.4) % 2 === 0 ? 1 : 0, color: GOLD2 }}>|</span>
            </div>
            <div style={{ width: 96, height: 96, borderRadius: 48, flex: "none", display: "flex", alignItems: "center", justifyContent: "center", background: sent ? MAROON : "#e8dccb", transform: `scale(${sent ? 1 + 0.15 * Math.max(0, 1 - (t - T.sent) * 4) : 0.9})` }}>
              {(!sent || fly >= 1) && <Plane size={52} color={sent ? GOLD : "#b9a993"} />}
            </div>
          </div>
        </div>
      )}

      {/* D: inbox + flying plane + DM card */}
      {inbox > 0.01 && (
        <div style={{ position: "absolute", left: inboxX - 75, top: inboxY - 75 + shake * 0.3, width: 150, height: 150, borderRadius: 44, background: arrived ? `linear-gradient(135deg,${GOLD},${GOLD2})` : "rgba(255,250,240,0.14)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${inbox}) rotate(${shake}deg)`, boxShadow: arrived ? `0 0 60px ${GOLD}` : "none" }}>
          <svg width={92} height={92} viewBox="0 0 24 24"><path d="M12 2.8c-5.2 0-9.2 3.8-9.2 8.6 0 2.6 1.2 4.9 3.1 6.5v3.3l3.1-1.7c.9.3 1.9.4 3 .4 5.2 0 9.2-3.8 9.2-8.5S17.2 2.8 12 2.8z" fill="none" stroke={arrived ? MAROON : CREAM} strokeWidth={1.7} /><path d="m6.8 13.6 3.6-3.8 2.4 2 3.9-3.6-3.6 3.8-2.4-2z" fill={arrived ? MAROON : CREAM} /></svg>
          {arrived && <div style={{ position: "absolute", right: -14, top: -14, width: 56, height: 56, borderRadius: 28, background: RED, color: CREAM, fontFamily: LAT, fontWeight: 800, fontSize: 34, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${useSpringPure(f, T.dm + 0.95)})` }}>1</div>}
        </div>
      )}
      {t > T.dm - 0.1 && fly < 1 && (
        <div style={{ position: "absolute", left: px - 75, top: py - 75, transform: `rotate(${pAng + 25}deg) scale(${1 - 0.35 * fly})`, filter: `drop-shadow(0 0 20px ${GOLD})` }}><Plane size={150} /></div>
      )}
      {t > T.dm - 0.1 && fly < 1 && [0.06, 0.12, 0.18].map((d, i) => {
        const ft = Math.max(0, fly - d);
        const tx = sx + (inboxX - sx) * ft + Math.sin(Math.PI * ft) * -260, ty = sy + (inboxY - sy) * ft - Math.sin(Math.PI * ft) * 220;
        return <div key={i} style={{ position: "absolute", left: tx - 8 + i, top: ty - 8, width: 16 - i * 4, height: 16 - i * 4, borderRadius: 10, background: GOLD, opacity: 0.6 - i * 0.18 }} />;
      })}
      {card > 0.01 && cardOut < 1 && (
        <div style={{ position: "absolute", left: 120, right: 120, top: 980, opacity: Math.min(1, card * 1.4) * (1 - cardOut), transform: `translateY(${(1 - card) * 80 - cardOut * 120}px) scale(${0.9 + 0.1 * card})` }}>
          <div style={{ background: "#2b1418", borderRadius: 44, padding: 36, border: `3px solid rgba(255,210,122,0.35)`, boxShadow: "0 30px 70px rgba(0,0,0,0.55)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
              <Avatar s={70} c={GOLD} />
              <div style={{ height: 18, width: 260, borderRadius: 9, background: "rgba(255,250,240,0.25)" }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 30, background: CREAM, borderRadius: 30, padding: "30px 34px" }}>
              <svg width={110} height={130} viewBox="0 0 22 26"><path d="M2 2h12l6 6v16H2z" fill="#fff" stroke={MAROON} strokeWidth={1.4} strokeLinejoin="round" /><path d="M14 2v6h6" fill="none" stroke={MAROON} strokeWidth={1.4} /><rect x={4.5} y={15} width={13} height={6} rx={1.2} fill={MAROON} /><text x={11} y={19.8} textAnchor="middle" fontSize={4.6} fontWeight={800} fill={GOLD} fontFamily={LAT}>PDF</text><path d="M5 10h8M5 12.5h10" stroke="#cdbba8" strokeWidth={1} /></svg>
              <div style={{ flex: 1 }}>
                {[0, 1, 2].map((i) => <div key={i} style={{ height: 20, borderRadius: 10, marginBottom: 16, width: `${[92, 78, 55][i] * lerp(t, T.dm + 1.35 + i * 0.12, T.dm + 1.75 + i * 0.12, 0, 1)}%`, background: i === 0 ? MAROON : "#d9c9b4" }} />)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* E: follow button + finger */}
      {t > T.but - 0.1 && followOut < 1 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 880, display: "flex", justifyContent: "center", opacity: Math.min(1, inF * 1.4) * (1 - followOut), transform: `scale(${(0.7 + 0.45 * inF) * press * (1 - 0.3 * followOut)}) translateY(${-followOut * 200}px)` }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: -30, borderRadius: 100, border: `6px solid ${GOLD}`, opacity: (1 - warn) * 0.9, transform: `scale(${1 + warn * 0.5})` }} />
            <div style={{ position: "absolute", inset: -20, borderRadius: 90, border: `6px solid ${GOLD}`, opacity: (1 - ring) * (tapD > 0 ? 1 : 0), transform: `scale(${1 + ring * 0.4})` }} />
            <FollowBtn followed={followed} scale={1.15} />
          </div>
        </div>
      )}
      {t > T.follow - 0.2 && fingerOut < 1 && (
        <div style={{ position: "absolute", left: 640 + (1 - fingerIn) * 380, top: 990 + (1 - fingerIn) * 500, opacity: (1 - fingerOut) * Math.min(1, fingerIn * 2), transform: `scale(${press < 1 ? 0.9 : 1}) rotate(-12deg)` }}><Finger s={210} /></div>
      )}

      {/* F: two lanes — follower gets it, non-follower is blocked */}
      {lanes > 0.01 && (
        <AbsoluteFill style={{ opacity: lanes }}>
          {/* lane A */}
          <div style={{ position: "absolute", left: 90, right: 90, top: 640, height: 260, borderRadius: 50, background: "rgba(255,210,122,0.08)", border: `3px solid rgba(255,210,122,0.35)` }} />
          <div style={{ position: "absolute", left: 140 + laneA * 600, top: 720, transform: `rotate(20deg) scale(${1 - 0.3 * laneA})`, opacity: laneA < 1 ? 1 : 0, filter: `drop-shadow(0 0 18px ${GOLD})` }}><Plane size={100} /></div>
          <div style={{ position: "absolute", left: 760, top: 660, transform: `scale(${1 + 0.12 * okPop * Math.max(0, 1 - (t - T.varna - 1.05) * 2)})` }}>
            <Avatar s={200} c={GOLD} ring={GOLD} />
            <div style={{ position: "absolute", right: -16, bottom: -6, width: 82, height: 82, borderRadius: 41, background: "#3a2a24", border: `4px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width={52} height={52} viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke={GOLD} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            {laneA >= 1 && <div style={{ position: "absolute", left: -40, top: -60, width: 280, height: 280, borderRadius: 140, border: `5px solid ${GOLD}`, opacity: Math.max(0, 1 - (t - T.varna - 1.05) * 1.6), transform: `scale(${0.8 + (t - T.varna - 1.05) * 0.8})` }} />}
          </div>

          {/* lane B */}
          <div style={{ position: "absolute", left: 90, right: 90, top: 1060, height: 260, borderRadius: 50, background: "rgba(226,87,76,0.07)", border: `3px solid rgba(226,87,76,0.35)` }} />
          <div style={{ position: "absolute", left: 140 + laneB * 440, top: 1140 + (crash > 0 ? crash * crash * 1400 : 0), transform: `rotate(${crash > 0 ? 20 + crash * 400 : 20}deg) scale(${0.95})`, opacity: crash > 0.6 ? 0 : crash > 0 ? 1 - crash * 1.6 : 1 }}>
            <Plane size={100} color={crash > 0 ? MUTED : GOLD} />
          </div>
          <div style={{ position: "absolute", left: 610, top: 1100 + (crash > 0 && crash < 0.25 ? Math.sin(crash * 80) * 8 : 0), transform: `scale(${lockPop})` }}>
            <div style={{ width: 16, height: 220, borderRadius: 8, background: RED, position: "absolute", left: 40, top: -10, opacity: 0.85 }} />
            <div style={{ position: "relative", left: 0, top: 40 }}><Lock s={96} /></div>
          </div>
          {crash > 0 && [0, 1, 2, 3, 4, 5].map((i) => {
            const a = (i / 6) * Math.PI * 2 + 0.4, r = Math.min(1, crash * 3) * 110;
            return <div key={i} style={{ position: "absolute", left: 620 + Math.cos(a) * r, top: 1185 + Math.sin(a) * r, width: 14, height: 14, borderRadius: 7, background: RED, opacity: Math.max(0, 1 - crash * 2) }} />;
          })}
          <div style={{ position: "absolute", left: 760, top: 1090, opacity: 0.85 }}>
            <Avatar s={200} c={MUTED} ring={MUTED} />
            <div style={{ position: "absolute", right: -16, bottom: -6, width: 82, height: 82, borderRadius: 41, background: "#3a2a24", border: `4px solid ${MUTED}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width={48} height={48} viewBox="0 0 24 24"><path d="M12 6v12M6 12h12" stroke={MUTED} strokeWidth={3} strokeLinecap="round" /></svg>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* G: final pair */}
      {fin > 0.01 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 760, display: "flex", flexDirection: "column", alignItems: "center", gap: 70, opacity: Math.min(1, fin * 1.4), transform: `scale(${0.85 + 0.15 * fin})` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24, background: CREAM, borderRadius: 60, padding: "28px 50px", boxShadow: `0 0 ${50 + 30 * glow}px rgba(255,210,122,0.55)` }}>
            <svg width={76} height={76} viewBox="0 0 24 24"><path d="M12 3C6.5 3 2.5 6.6 2.5 11c0 2.2 1 4.2 2.7 5.6L4.5 21l4.6-2.4c.9.2 1.9.4 2.9.4 5.5 0 9.5-3.6 9.5-8S17.5 3 12 3z" fill="none" stroke={MAROON} strokeWidth={1.8} /></svg>
            <span style={{ fontFamily: LAT, fontWeight: 800, fontSize: 80, color: INK }}>WORKFLOW</span>
          </div>
          <FollowBtn followed={false} scale={1.05} />
        </div>
      )}
    </AbsoluteFill>
  );
};

// spring without hooks naming confusion (spring() is pure in Remotion)
function useSpringPure(f: number, at: number) { return spring({ frame: f - at * FPS, fps: FPS, config: { damping: 12, stiffness: 180 } }); }

export const MgCta2Composition = () => (
  <Composition id="MG-cta2" component={MgCta2} fps={FPS} width={W} height={H} defaultProps={DEF}
    calculateMetadata={({ props }) => ({ durationInFrames: Math.ceil(props.dur * FPS) })} durationInFrames={Math.ceil(15.2 * FPS)} />
);
