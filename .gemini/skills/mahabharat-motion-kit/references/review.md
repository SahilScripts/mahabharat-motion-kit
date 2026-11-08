# Review checklist (look at stills before rendering)

Render the middle of every shot (and the key action moment) with `pipeline/stills.sh REEL-<reel> t1,t2,…`, open each image,
and check every line below. Fix, re-render those stills, and look again. Most first drafts fail 3–6 of these.

## Framing
- [ ] The subject is fully in frame where it should be (no crown cut off at the top, no hand off the side) and big enough to
      read on a phone — a face is at least ~120 px wide in a close shot.
- [ ] Nothing important sits in the bottom 300 px or the right 140 px (Instagram's caption and buttons cover them).
- [ ] Characters do not overlap each other confusingly; two characters in a shot have space between them.
- [ ] No empty frame: the shot has a background, a subject and a foreground layer.

## Characters (zoom in: `pipeline/closeup.sh REEL-<reel> <t> <x> <y>` — at contact-sheet size hands are a few pixels)
- [ ] Faces are visible: not hidden by fire, props, an arm or another character.
- [ ] Each hand does a readable gesture for the moment: gripping (with a prop), blessing, pointing, clawing. Hands together in
      front of the chest read as namaste — only use that on purpose.
- [ ] Props sit in the grip (a sword handle in the fist, not floating beside it), at a believable angle. Every held object
      is an `rProp`/`lProp` with a `PropAngle` — never a separate shape drawn near the hand.
- [ ] Archers: bow upright in the bow hand, string hand ON the string, arrow on the string pointing at the target
      (use `archer()`); after the release the arrow is gone from the string.
- [ ] Nobody stands with hands on hips unless the moment calls for it; default arms hang (`ARMS.rest`).
- [ ] Iconography right (crown type, skin colour, tail, number of heads, weapon).
- [ ] Seated figures look seated (legs crossed on the ground), not standing pillars.
- [ ] Characters face whom they speak to (use `flip` and `lookX`).

## Story
- [ ] Sound off: does the still say what its line says? (event, not topic)
- [ ] Continuity with the previous shot: same looks, same changed state, same side of the frame.
- [ ] No text, numbers, labels or captions anywhere.
- [ ] Map of India (if any) drawn with `kit/india.tsx`.
- [ ] Nothing graphic or disrespectful.

## Light and colour
- [ ] The subject is the brightest, most saturated thing; the background is darker.
- [ ] Colour meanings stay consistent (gold divine, red danger…).
- [ ] Glows and fire don't wash the whole frame out.

## Motion (use `pipeline/frames.sh REEL-<reel> <start> 8 6` on action shots)
- [ ] The action happens and is readable across the strip (arm rises, mountain lifts) — not a jump between two poses.
- [ ] The camera moves in every shot, smoothly, without jumping at the cut.
- [ ] The first frame of the reel is already moving.

## After rendering
- [ ] `ffprobe` duration ≈ manifest duration; audio present.
- [ ] Extract 4 frames from the mp4 (start, two middles, last second) and look at them.
- [ ] Voice clear over music and effects (effects never cover words); no clipping.
