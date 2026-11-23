# AGENT BRIEF: Breaking Bad animated recap (Remotion)

You are one of several agents building scenes **in parallel** for a single film. Read this whole file before writing any code. The goal is one consistent film, so follow the rules exactly.

---

## 0. The project in one paragraph
This is a 27:24 narrated recap, 1920×1080 at 30 fps, written as **pure code in Remotion (React + SVG)**. The narration track `public/narration.wav` is fixed, and every scene is cut to the narration timestamps. The lead agent built the cold open (scene 1, 0–37.71 s), which the client approved as the **quality bar**. Your job is to build **your batch of scenes** at that same quality.

## 1. Setup (sandbox)
```bash
git clone https://github.com/testivao5-lab/bb-film.git bb && cd bb
npm ci
# Chrome for Remotion (Debian/Ubuntu sandbox):
sudo apt-get install -y libnss3 libnspr4 libatk1.0-0t64 libatk-bridge2.0-0t64 libatspi2.0-0t64 libxdamage1 libxkbcommon0 libasound2t64 libgbm1 fonts-dejavu-core
npx remotion browser ensure
pip install gdown && gdown 1Sj3hZAk7Z7TkplEKAaY1nbWkNzIhl_wd -O public/narration.wav   # narration (needed for audio only)
git config user.name "agent-<BATCH>" && git config user.email "agent-<BATCH>@users.noreply.github.com"
git remote set-url origin https://x-access-token:<TOKEN>@github.com/testivao5-lab/bb-film.git
```
The client gives you `<TOKEN>` and `<BATCH>` in the chat. **Never** print the token in files, commits, or logs.

## 2. What you own (no merge conflicts)
- You own **only** your scene files: `src/film/scenes/sNNN_*.tsx`, for the scene numbers in your batch (see `docs/BATCHES.md`).
- Each stub already contains:
  - the scene's narration text;
  - every word's timestamp;
  - `META` (cut-in/cut-out);
  - `beat(sec)`, which converts a narration second into a local frame.
- **Replace the `Placeholder`** with the real scene. Keep `export const META`, `beat` and `export const Scene`.
- If you need new reusable kits (environments, props, vehicles), create **new files** with your batch prefix:
  - `src/env/<batch>_<name>.tsx`, e.g. `src/env/a_desert.tsx`;
  - `src/props/<batch>_<name>.tsx`.
- **Do NOT edit shared files:** `src/rig/*`, `src/lib/*`, `src/fx/*`, `src/env/Lab*.tsx`, `src/scenes/*`, `src/film/registry.ts`, `src/film/Film.tsx`, `Root.tsx`, workflows, `package.json`. No new npm packages either.
  - If you need a rig feature (new pose ability, hairstyle, outfit), put it in a local helper inside your batch files, **or** write the request in `docs/requests/<batch>.md` and push it. The lead agent merges shared changes.

## 3. Git workflow
```bash
git pull --rebase origin main      # before starting and before every push
npx tsc --noEmit -p .              # MUST pass — a type error breaks everyone's render
git add src/film/scenes/s0NN_* src/env/<batch>_* docs/requests/<batch>.md
git commit -m "batch <BATCH>: scene NNN <id>"
git push origin HEAD:main
```
- Push **after every finished scene**, not at the end.
- If the push is rejected, run `git pull --rebase` and push again. Your files never overlap with other agents' files.

## 4. Non-negotiable content rules (from the client)
1. **ORIGINAL characters only.**
   - Use the cast in `src/rig/cast.ts`:
     - `TEACHER` (lead, "Walt" role);
     - `PARTNER` ("Jesse" role);
     - `BROTHER` (DEA brother-in-law role);
     - `RESTAURATEUR` (distributor role);
     - `WIFE`.
   - These are new designs. **Never** draw likenesses of the TV actors, their exact costumes (no copied iconic hats, glasses, or outfits), show logos, title cards, or real brand logos.
   - Extras: build generic original people by varying palettes, hair and height on the same rig.
   - Render `CastSheet` to see the cast (`npx remotion still src/index.ts CastSheet out/cast.png`).
2. **No subtitles, no captions, no on-screen text overlays.** Small diegetic text (a sign, a chalkboard) is OK but keep it minimal.
3. **Show, don't tell.** The action on screen matches the narration **literally, at the word's timestamp**. Example: "he coughs into a handkerchief" means he coughs at that word.
4. **Full choreography.** Walk, run, sit, kneel, point, grab, throw, react, collapse, climb. Faces show emotion.
   - **No idle-only shots and no hand-waving.**
   - Two characters in one shot never idle identically. Offset their timing and give them different actions.
5. **12 principles of animation:**
   - anticipation before big moves;
   - ease-in/out (`src/lib/anim.ts`);
   - arcs;
   - follow-through (hair, cloth, suspension bounce);
   - squash and stretch on impacts;
   - secondary action;
   - staging (one clear read per shot);
   - moving holds (breathing, blinking: `breath()`, `blink()`).
6. **Strict real-world scale (1 unit = 1 m).**
   - Human 1.62–1.85 m. Car ~4.5–4.8 m long. Pickup 5.3 m. RV ~7.5 m. Door 2.0 m. House ceiling 2.7 m.
   - Use the 2.5D camera (`src/lib/camera.tsx`: `Cam`, `Card`, `project`, `planePts`), so scale stays correct automatically.
7. **Every environment has 3 depth layers (far/mid/near)**, textured, lit and shaded, plus **ambient life** (clouds, birds, dust, distant cars, reflections, sun rays, moving shadows) and **storytelling props**.
8. **Editing:**
   - **Hard cuts** by default, cut on sentence ends or key words.
   - Fades or dissolves **only for big time jumps**.
   - Camera moves must be motivated and varied (push, truck, crane, rack focus, overheads, inserts).
   - No cheap pop-up or bubble effects, no bouncing text.
9. **Research first.** Before designing a scene, web-search what really happens in that moment of the show (location, time of day, props, blocking). Then design it **originally**, using the facts, never copying shots or frames.
10. **SFX** only at key narrative moments, at volume 0.10–0.15. Ambient beds go at 0.03–0.04.
    - Narration plays globally (in `Film.tsx`), so do **not** add narration audio inside scenes.
    - Synthesize SFX procedurally (see `tools/make_sfx2.py`) into `public/sfx/<batch>_*.wav`.

## 5. Art direction: match the approved cold open
- **Style:** elevated South-Park-inspired flat vector, with rich shading (shade band plus light band plus rim light), soft gradients, dark outlines on characters, and parallax depth.
- **Characters** fill 1/3 to 2/3 of frame height in dialogue and close shots.
- **Study first:** `src/scenes/ColdOpen.tsx` and `src/scenes/ColdOpenB.tsx` (shot structure, camera, lighting, finishing) and the approved reference sheets in `docs/ref/` (cold open contact sheets + cast sheet). The test clip is on the client's Drive.
- **Always finish every shot** with `<Finish f={...} vig grain shadow gradeO />` from `src/fx/Post.tsx`, plus `Motes` where there's light in air.
- **Palette anchors** (keep sets consistent between batches):

| Set | Sky / key | Ground / walls | Grade |
|---|---|---|---|
| desert (day) | sky `#7fb4e0`→`#e9d8b4` haze; sun warm `#fff1c9` | sand `#d9b98a`, shadow `#a8875f`, scrub `#6f7d4f`, rock `#b07a52` | warm, `shadow="#3a2a10" gradeO≈0.12` |
| desertDusk | `#2b2f5a`→`#e0785a`→`#f6c27a` | sand `#8f6a5a`, shadows `#3d2f45` | `shadow="#2a1838"` |
| suburb / house day | sky `#9cc6ea` | stucco `#e6d3b3`, roof `#9b6b4f`, lawn `#8aa65a` | neutral warm |
| night interiors | lamp `#ffd9a0`, TV `#9fc4ff` | walls `#3a3530` | `shadow="#0a1a30"` |
| superlab | white-steel `#dfe8ee`, steel `#8ea4b6`, safety yellow `#e8c23a` | floor `#bfc9cf` | cool clean |

## 6. Performance rules (the film must render fast)
- **Never** put a big live `feGaussianBlur` or CSS `filter: blur` on large or full-frame layers. That was the #1 render cost.
  - For defocused near-lens props, use a **pre-baked PNG**: add an entry in a new `src/bake/<batch>_registry.tsx` (copy the pattern of `src/bake/registry.tsx`), then ask the lead to wire it in, **or** use haze polygons and soft radial-gradient shapes.
- No `mixBlendMode` on big layers. Use opacity overlays.
- Soft particles (dust, steam, smoke): use **one shared `radialGradient`** per colour (see `PuffDefs` in `ColdOpenB.tsx`), never one gradient per particle.
- Aim for **< 0.4 s/frame**. Measure with `node tools/chunk.mjs --comp BreakingFilm --from A --to B`.
- Animate only from `useCurrentFrame()`. No `Math.random()` (use `rand(i, salt)`), no timers, no CSS animations.

## 7. QA before every push (be honest)
1. `npx tsc --noEmit -p .` passes.
2. Render **stills** at 4–6 key beats of the scene and look at them:
   ```bash
   npx remotion still src/index.ts BreakingFilm out/s.jpg --frame=<GLOBAL frame>
   ```
   Global frame = (narration second × 30).
   - Check: scale, depth layers, poses (no broken or floating limbs, feet on the floor), faces readable, action matches the word at that time, no text overlays.
3. Your sandbox may be small and can crash on long renders. Render **short ranges** only (`--from/--to` ≤ 150 frames), or use the GitHub **Preview stills** workflow (Actions tab), which renders the frames you list into a contact sheet.

### Type check on push
Every push runs the **Type check** workflow. If it goes red after your push, fix it immediately (`git pull --rebase`, fix, push) — a broken main blocks all four batches.

### Preview stills via API (recommended QA — ~75 s for 20 frames, no local crash risk)
Push first, then:
```bash
T=<TOKEN>; R=testivao5-lab/bb-film
curl -s -X POST -H "Authorization: Bearer $T" https://api.github.com/repos/$R/actions/workflows/preview.yml/dispatches \
  -d '{"ref":"main","inputs":{"composition":"BreakingFilm","frames":"1140,1200,1300","tag":"batchA-s002-v1"}}'
# wait ~2 min, then find the run + download the artifact:
RUN=$(curl -s -H "Authorization: Bearer $T" "https://api.github.com/repos/$R/actions/workflows/preview.yml/runs?per_page=1" | python3 -c "import sys,json;print(json.load(sys.stdin)['workflow_runs'][0]['id'])")
URL=$(curl -s -H "Authorization: Bearer $T" https://api.github.com/repos/$R/actions/runs/$RUN/artifacts | python3 -c "import sys,json;print(json.load(sys.stdin)['artifacts'][0]['archive_download_url'])")
curl -sL -H "Authorization: Bearer $T" "$URL" -o qa.zip && unzip -o qa.zip -d out/gh_qa   # then view out/gh_qa/contact_sheet.jpg
```
Frames are GLOBAL film frames (scene cut_in seconds × 30, see docs/BATCHES.md). Use a unique `tag` each time.

4. Fix anything wrong, then push. In your chat report, say exactly which checks you did and which you did not.

## 8. Definition of done (per scene)
- [ ] Every narrated beat has a matching visual action at its timestamp.
- [ ] 2–5 shots, with hard cuts on sentence ends and varied, motivated camera.
- [ ] Original cast, correct scale, 3 depth layers, ambient life, storytelling props.
- [ ] No subtitles or text overlays. SFX only at key moments.
- [ ] Type check passes, stills reviewed, < 0.4 s/frame, pushed to `main`.
