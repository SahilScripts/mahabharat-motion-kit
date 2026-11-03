# Drawing kit reference

All drawing is SVG inside Remotion components. Canvas 1080×1920, 60 fps. Files live in `remotion/src/kit/`.
Import paths from a reel in `remotion/src/reels/`: `"../kit/real"`, `"../kit/realcast"`, `"../kit/scene"`, `"../kit/india"`, `"../kit/cast3"` …

## 1. Scene and camera — `kit/scene.tsx`

| export | what it is |
|---|---|
| `FPS, W, H` | 60, 1080, 1920 |
| `tw(t, [t0, t1, …], [v0, v1, …], ease?)` | clamped tween; the workhorse for every animation |
| `glide`, `clamp` | default easing, interpolate options |
| `rnd(seed)` | deterministic random 0..1 (never use `Math.random()` — frames must render the same every time) |
| `Cam {x, y, z, r}`, `C0` | camera: pan x/y in px at depth 1, zoom z (1 = default framing), roll r in degrees |
| `rig(camAt, s)` | returns `L`; `L({ d, id, dof?, focus?, opacity?, children })` draws one flat layer at depth `d` |
| `At {x, y, s?, flip?}` | translate + scale (+ mirror) a group; use it to place characters |
| `Sky {stops: [offset, color][], flash?}` | full-frame vertical gradient sky (flash 0..1 = lightning) |
| `Cloud {x, y, s, fill, o?}` | soft cloud |
| `Bolt {x, y, len, seed, k, w?, angle?}` | lightning bolt, `k` 0..1 draws it |
| `Pillar {x, y, h, s?, c?, c2?}` | palace pillar |
| `Fire {t, x, y, s?, tint?}` | animated fire (yajna, torches, battle) |
| `Particles {t, seed, n, color, x0, x1, y0, y1, speed, size, up?}` | embers, dust, sparks, petals (drifting; `up` = rising) |
| `Hills {y, fill, seed, amp}` | rolling horizon band |

**Depth guide** for `d`: 0.03–0.1 sky / stars / far mountains · 0.3–0.6 far scenery (city, trees) · 1 the characters ·
1.2–1.6 foreground (particles, branches, smoke). Give far layers `dof` 1–2 so they soften; foreground `dof` 3–4.
Each layer needs a unique `id` within the shot.

**Camera recipes** (`E = Easing.bezier(0.45, 0, 0.3, 1)`):
```tsx
const L = rig((u) => ({ ...C0, z: tw(u, [0, dur], [1, 1.14], E) }), s);                         // slow push in
const L = rig((u) => ({ ...C0, y: tw(u, [0, dur * 0.8], [260, 0], E), z: 1.08 }), s);           // tilt up to a face
const L = rig((u) => ({ ...C0, x: tw(u, [0, dur], [0, 1080], E), z: 1.0 }), s);                 // pan across a board
const L = rig((u) => ({ ...C0, z: tw(u, [0, dur], [1.15, 1.0], E), r: tw(u, [0, dur], [-2, 0]) }), s); // pull back + settle
```
Shake on an impact: add `x: shake(s, t0, 18)` where
`const shake = (s, t0, amp, len = 0.7) => { const k = s - t0; return k < 0 || k > len ? 0 : Math.sin(k * 73) * amp * (1 - k / len) ** 2; };`
(both example reels define `shake` and `pulse` at the top — copy them).

## 2. Realistic characters — `kit/real.tsx` + `kit/realcast.tsx`

### Hero (one full character)
Origin = between the feet; up is −y; about 900 px tall at scale 1 (head top −900, chin −776, shoulders y −716 at x ±116).
**rHand = the character's RIGHT hand = viewer's LEFT.** Hand targets are relative to the origin; each arm reaches ~330 px.

```tsx
<RealDefs />   {/* once in every layer that contains real-cast characters */}
<At x={540} y={1800} s={1.1}>
  <Hero look={LOOK.hanuman} o={OUT.hanuman} t={t}
        rHand={[-180, -520]} rPose={HP.grip} rProp={<Gada />}
        lHand={[160, -560]} lPose={HP.bless} lWrist={90}
        e={{ smile: 0.4, lookX: 0.3 }} />
</At>
```
| prop | meaning |
|---|---|
| `look`, `o` | face/skin/crown (`Look`) and clothes/ornaments (`Outfit`) |
| `t` | reel time (drives breathing, blinking, cloth) — always pass `t`, not `s` |
| `rHand`, `lHand` | hand targets `[x, y]`; elbows solve automatically (`rBend`/`lBend` ±1 to flip an elbow) |
| `rPose`, `lPose` | hand shape from `HP` (below); blend two with `mixHand(a, b, k)` |
| `rWrist`, `lWrist` | wrist rotation in degrees (−90 / 90 turns a palm to face the viewer for blessing) |
| `rProp`, `lProp` | object held in that hand (sword, gada, lotus…); wrap in `<g transform="rotate(…)">` to angle it |
| `e` | expression `{anger, smile, open, lookX, lookY, blink, fear}` (0..1, look −1..1) |
| `bulk` | body width (1.15 = heavier, demons/warriors) · `stance` leg spread · `lean` degrees · `headTilt` degrees |
| `glow`, `aura` | divine glow strength and colour behind the figure |
| `rFront`, `lFront` | false = that arm goes behind the body |
| `seed` | varies breathing/blinks between characters |

Typical framing: full figure `s` 0.9–1.2 at `y` ≈ 1750–1950; waist-up `s` 1.4–1.6 at `y` ≈ 2100–2400 (feet below frame);
a crowd/background figure `s` 0.5–0.7. Two characters facing each other: put one at x≈270, the other at x≈810 with `flip`.

### Hand poses `HP`
`relax` (soft, hanging) · `hang` (side view, by the thigh) · `fist` · `grip` (closes around a prop) · `open` (palm out, fingers spread) ·
`bless` (abhaya mudra — raise the hand, set wrist ±90) · `point` · `claw` (demon threat) · `gyan` (meditation, thumb + index) · `hold` (cupped, carrying).
Use `grip` with every held prop. Never put two hands together in front of the chest unless you mean namaste.

### Ready looks (`LOOK.x` + `OUT.x`)
| key | who |
|---|---|
| `ravana` (+ `Ravana10` component with nine more heads: props `heads` 0..1 animates them in, `spread`, `scatter`) | Ravana |
| `hiranya` | Hiranyakashipu (daitya emperor) |
| `rama`, `lakshmana`, `hanuman`, `vanara` | Ramayana heroes and the vanara army |
| `krishna`, `indra`, `deva`, `mitra`, `varuna`, `agni` | gods (agni: use `glow` + `aura="#ff7a2a"`) |
| `asura`, `rakshasa`, `maricha` | demons (`bulk={1.15}`, `HP.claw`, `e={{anger: 1, open: 0.6}}`) |
| `rishi`, `rishi2` + OUT `rishi` / `rishiW` | seated sages (`lower: "seated"`), saffron / white |
| `diti`, `kaikesi`, `sita` (LOOK only) | women: **head/portrait only** — the body has no female torso; draw them as busts (`RHead` with a draped shape, see `FemBust` in `examples/AsurRakshas.tsx`) |

New character = new `Look` + `Outfit` objects in your reel file:
- `Look`: `skin, line` (outline, darker skin tone), `hair`, `eye?`, `crown?: kirita | mukuta | jata | wild | flame | none`,
  `beard?: short | full | sage`, `stache?: handle | full | thin | sage`, `tilak?: tripundra | urdhva | dot`,
  `fangs?, horns?, fem?, vanara?, muzzle?, beardC?, gem?` (`RL.ruby | RL.emer | RL.saph`)
- `Outfit`: `dhoti, border, sash?, lower?: long | knee | shorts | seated`, `janeu?, rudraksha?, pearls?: 0–3, hara?, belt?, anklets?, armour?, robe?, tail?`
Colour by role (Shiva ash-blue + tiger skin feel, Vishnu/Krishna/Rama blue, Hanuman orange-red, demons dark with red eyes).

### Other parts
`RHead {look, e, t, seed}` (head alone — portraits, medallions, extra heads) · `Hand {pose, skin, line, rings?, prop?, size?}` ·
`Gem {x, y, r, c}` · `PearlString {a, c, b, n, r}` · props `Sword {len}`, `Gada {len}`, `Pasha {t, glow}`, `Lotus {glow}`, `Sruva` (ghee ladle).
Model sheets to look at the cast: compositions `KIT-sheet-0` … `KIT-sheet-3` (`pipeline/stills.sh KIT-sheet-3 0`).

## 3. Older flat cast and props — `kit/cast.tsx`, `cast2.tsx`, `cast3.tsx`, `cast5.tsx`
Simpler 2D figures (use for distant crowds or when a character has no realistic version yet) and many useful props/sets:
- cast: `Vajra`, `Ladle`, `Bowl`, `Indra`, `Vishwaroop` (three heads), `Deva`, `Asura`, `Sin`, `limb`, `Arm`
- cast2: `Trishul`, `Chakra`, `Conch`, `Lotus`, `Bow`, `Bell`, `Shiva`, `Vishnu`, `Brahma`, `Durga`, `Mohini`, `Ayyappa`, `Mahishasura`
- cast3: `Gada`, `Kumbhakarna`, `PalmLeaf`, `Valmiki`, `Vanara`, `Elephant`, `Balance` (scales), `LankaCity`, `Earth`, `BurjKhalifa`, `Eiffel` (size comparisons)
- cast5: `Ravana` (flat), `Meghnad`, `MantraRings`, `Airavata`, `Throne`, `Amaravati` (city of the devas), `Chariot`, `Bonds`
Open the file to see each component's props (one line each, at the `export const`).

## 4. Maps — `kit/india.tsx`
`<IndiaOutline proj={indiaProj(34)} fill stroke sw lanka />`, data `INDIA`, `LANKA` (`[lon, lat]` rings), `ringsPath(rings, proj)`.
Place a city: `const [x, y] = indiaProj(34)([lon, lat])` (Ayodhya 82.2, 26.8 · Lanka 80.6, 7.9 · Kurukshetra 76.8, 29.97 ·
Dwarka 68.97, 22.24 · Kailash is outside India: 81.3, 31.07 · Rameswaram 79.3, 9.29 · Himalaya/Dronagiri ≈ 79.6, 30.6).
**This is the only allowed outline of India.** See the flight across the map in `examples/Sanjeevani.tsx` (`IndiaMap`).

## 5. Set pieces inside the examples (copy what you need into your reel file)
- `examples/AsurRakshas.tsx`: `Spear`, `Stars`, `Moon`, `Kund` (fire altar), `Tree`, `Palace`, `LankaNight`, `FemBust`, `Medal`
  (portrait medallion), `Thread` (lineage line), `Leaf` (palm-leaf manuscript), `Diya`, `Deer` (golden deer), `Lineage` board,
  `MitraVaruna`, `DawnSea`, `ChantRishis`, `NightForest`.
- `examples/Sanjeevani.tsx`: `Elephant`, `TreeR`, `Peak` (mountain with herbs, can be torn off), `HanumanLift`, `NightSky`,
  `CloudSea`, `Snowy`, `Crane`, `Balance`, `IndiaMap` (route animation), `Leaf`, `Diya`, `Stylus`, `Rings`, `Lying` (fallen warrior), `Battlefield`.

## 6. Reel shell
Start from `remotion/src/reels/Template.tsx` (explained in its header). Keep the shell at the bottom as is: it loads
`public/mg/<REEL>/manifest.json`, picks the shot for the current time, plays `mix.wav` + `sfx.wav`, adds the vignette and a
tiny white flash on each cut. New files in `src/reels/` are registered automatically (export a `…Composition`).
