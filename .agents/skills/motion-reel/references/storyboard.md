# From script to shots

The storyboard decides what the viewer SEES for every line. It is the most important creative step: a reel with average drawing
but clear, surprising pictures beats a beautiful reel of characters standing still.

## The test for every shot
**With the sound off, can a viewer tell what this line is saying?** If not, the picture is wrong, not the viewer.
- Show the **event**, not the topic: "Hanuman lifts the whole mountain" → the mountain tears free, rocks fall, he rises — not
  "Hanuman stands near a mountain".
- Show **cause and effect**: the rakshasa stamps → the yajna fire gutters → the rishis recoil.
- A **comparison** is shown side by side or on a balance (`Balance`), a **lineage** as medallions joined by threads, a **journey**
  on the India map, a **number** as a size comparison (mountain vs. Burj Khalifa, speed vs. a jet) — never as written digits.
- A "**but / actually**" line gets a visual turn: a crack splits the frame, light changes colour, the camera whips.
- Each new person is introduced with a clear look at their face (push in / tilt up), then can appear smaller later.
- Prefer the most surprising picture that still makes the idea click; the literal picture is the fallback.

## The hook (first 1.5–3 s)
The first frame is already in motion and shows the most striking image of the story (a ten-headed Ravana raising his sword,
a mountain in the sky). The camera is moving from frame 0. No title, no slow fade from black, no establishing landscape.

## Pacing
- One shot per sentence; split a long sentence into 2–3 shots at its `,` / `...` pauses.
- 1.5–4.5 s per shot. Under 1.2 s feels like a glitch; over 6 s needs a second action inside the shot.
- Alternate scale: wide (place) → medium (people) → close (face/hand/object) → wide. Alternate light: night/fire, gold/day, blue/divine.
- Something changes inside every shot (an action, a light change, a reveal), timed to its key word from `cues.txt`.

## Colour meaning (keep it for the whole reel)
- Gold/warm = divine, dharma, the thing the viewer should follow.
- Red/dark = danger, demons, anger. Blue = gods of sky/water, calm, night.
- The subject is the brightest, most saturated thing in the frame; backgrounds are darker and less saturated.

## Continuity
Once the story changes something (mountain lifted, Lakshmana wounded, fire out), later shots keep it changed.
The same character keeps the same look, outfit and side of the frame within a scene.

## Accuracy
- Iconography from scripture and classic art (Raja Ravi Varma, temple sculpture). Hanuman: vanara face, mukuta, tail, gada.
  Rama: blue skin, bow. Shiva: jata, crescent, trishul, snake. Ravana: ten heads. Vishnu: four arms (flat cast), conch + chakra.
- Places: Lanka is an island south of India; Kailash in the Himalaya; Ayodhya on the Sarayu; Kurukshetra a plain north of Delhi.
- Maps of India only with `kit/india.tsx`.
- Violence implied, never graphic: impact flash, a weapon stopping, a character falling back — no blood.

## storyboard.json format
```json
{
  "title": "हनुमान जी ने जो पर्वत उठाया, उसका वज़न कितना था?",
  "style": "Painted-realism vector characters, lit 2.5D scenes, no text.",
  "shots": [
    {"s": 0, "title": "Hook", "pick": "Night sky; Hanuman flies straight at camera holding a glowing mountain; clouds rush past.", "camera": "push in, shake", "sound": "wind, rumble"},
    {"s": 0, "title": "Weight?", "pick": "The mountain on a giant balance; the other pan shoots up.", "camera": "tilt", "sound": "creak, thud"},
    {"s": 1, "title": "Dronagiri", "pick": "Snowy Himalaya at dawn; one peak glows with herbs.", "camera": "crane down", "sound": "wind, chime"}
  ]
}
```
`s` is the sentence index (0-based). Shots must be in order; every sentence needs at least one shot.
