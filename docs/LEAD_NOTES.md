# Lead QA notes — read before every new scene (git pull first)

## Round 1 (lead-qa-round1: scenes 30–35, 55–57, 73–74)

### All batches
- **No readable on-screen text naming show characters/places** (e.g. a card reading a character's full name). Use an illegible scribble or a symbol; the narration carries names. Fix s035.
- Close-up hands holding props must read as hands (4 fingers + thumb, wrist, sleeve) — the s035 card-holding hand reads as a blob.

### Batch B (30–35) — on target ✅
Basement/kitchen sets, lighting, figure scale and staging match the cold open. Keep going exactly like this.

### Batch C (55–57) — below the bar, please raise ⚠️
- **Characters too small**: hero characters must fill 1/3–2/3 of frame height in most shots. Use medium shots and close-ups, not only wide shots.
- **Sets too empty/flat**: add the 3 depth layers (far/mid/near), foreground silhouettes, set dressing, light pools, ambient life — compare with docs/ref/ and Batch B's basement.
- s056: the figure on the car hood floats — contact points must touch surfaces; check car/person scale (car 4.5 m, person 1.7 m).
- s057 superlab: flat lighting; needs the cold-open lab treatment (overhead light cones, steel highlights, haze, reflections).
- Revise 55–57 to this standard before moving on, then continue with 58+.

### Batch D (73–74) — good ✅
Garage and car interior read well. Watch extras so they stay clearly original (palette/hair variation).

### Batch A — no commits seen yet.

## Round 2 (lead-qa-round2: scenes 36–38, 58)

### All batches — choreography is slipping ⚠️
- **No "standing with arms hanging" poses.** In most frames characters stand stiffly with both arms down. Every shot needs an action that matches the narration (gesturing, leaning on the desk, pointing, pacing, handling a prop, reacting). Two characters in one shot must never hold the same idle pose.
- **Framing:** no accidental crops. s037/s038 have shots showing only a giant leg + arm cut by the frame edge — if it is a deliberate low angle, show the face/upper body or the object being looked at; otherwise reframe.
- **Speed is not the goal; the cold-open quality bar is.** Better 1 excellent scene than 3 thin ones.

### Batch B (36–38) — office set too bare ⚠️
- Tuco-office set: add depth (foreground desk clutter/shelves/silhouette, mid props, back wall detail), motivated light (window shafts, lamp pool), wear and grime, ambient motes. Compare with your own basement in s030–s035, which is on target.
- Revise 36–38 before moving on.

### Batch C (58) — same issues as round 1 ⚠️
- Superlab still flat: needs the cold-open lab treatment (light cones, steel highlights, reflections, haze, near-layer foreground pipes/equipment).
- Characters small and static; push the camera in, give each character a distinct action.
- Revise 55–58 before continuing to 59.

## Round 3 (lead-qa-round4: scenes 36–38 rev2, 55 rev, 76–82)

### Batch B — 36–38 rev2 approved ✅
Big improvement: office now has depth, motivated light, props, and active poses; the ledger and crystal close-ups work. This is the standard. **Still open:** s035 renders the readable text "TUCO SALAMANCA" (`<text>` at line ~166) — replace it with an illegible scribble. Then continue 40+.

### Batch C — 55 rev improved ✅ (keep pushing)
Street has depth now and the over-the-shoulder gun shot reads well. Characters could still be bigger in frame. Finish revising 56–58 the same way, then 59+.

### Batch D — 76–82: pace is high, but some scenes are thin ⚠️
- ✅ 76/77 desert, 78 cabin, 82 dusk desert: OK.
- ⚠️ **s080 (DEA call):** the room is a blank grey wall with one frame and one window. Add depth: desk, files, blinds with light shafts, a background figure, foreground silhouette.
- ⚠️ **s079/s081 bar:** three frames ~20 s apart are almost identical (same camera, same seated pose). Each narration beat needs a new shot or a new action: cut to the TV close-up, the drink, a reaction close-up, a camera push-in.
- ⚠️ s081 office: flat, all three people at identical desks; vary the poses and add depth.
- Revise 79–81 before continuing. Slow down: one strong scene beats three thin ones.

## Rule added (all batches) — no generic scene templates ❌
A handoff was rejected because 14 scenes all rendered one shared generic "stage" component (same wide shot, a centred actor, a parameterised prop). That is a placeholder, not a scene.
- Every scene must be **individually designed**: its own shot list and camera cuts, its own set dressing, and character actions synced to the narration word timestamps.
- Shared *kits* (a set, a prop, a pose helper) are fine and encouraged; a shared *scene* that only swaps colours/props is not.
- Reference level: `src/scenes/ColdOpen.tsx`, `ColdOpenB.tsx`, batch B s036–s038 rev2.

## Round 4 (lead-qa-round5: A 002–003, B 040–052, C 056 rev, D 079–081 rev, 084–085)

### Batch A — 002–003 approved ✅
Highway, school exterior, a full classroom with varied original students, breakfast kitchen: rich, staged, on target. Keep this level for 004–015.

### Batch B — 030–052 complete 🎉 (mostly ✅)
- ✅ 040–048: close-ups, dusk desert, cars, gunfight aftermath and the night bedroom all read well.
- ⚠️ 049–051: three shots in a row of one character against a plain dark background (no set, no depth). Add a location (room/airfield/house exterior), far/mid/near layers and motivated light.
- ⚠️ 052: keep the restaurant branding fully original (own name/colours/logo, no copied fast-food chain branding).
- **Agent B: you are now also assigned scenes 016–029 (former batch E).** Fix 049–052 first, then build 016–029 in order.

### Batch C — 056 rev approved ✅
Continue: revise 057–058 per round 1–2, then 053–054 and 059–072.

### Batch D — 084–085 ✅; 079–081 bar still static ⚠️
The bar scenes still repeat one wide shot. Add at least: a TV close-up, a hand/drink insert, a face close-up, a slow push-in. **Agent D: after finishing 086–087, you are also assigned 088–098 (former batch F).**

## Reassignment (round 5) — 6 agents, see docs/BATCHES.md
A 2–12 · **G 13–15 + 23–29 (new)** · B 16–22 (+ fixes 049–052) · C 53–65 · **H 66–72 (new)** · D 73–98.
Only build scenes in your own range. If you already started a scene that is now someone else's, stop, discard it, and tell the client.
