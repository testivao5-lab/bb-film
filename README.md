# Breaking Bad — animated recap (Remotion)

1920×1080 · 30 fps · narration-synced · hard-cut editing · no subtitles.

## Status
| Step | State |
|---|---|
| 1. Setup: Remotion 4.0.300, Headless Chrome, MP4 (H.264 + AAC), `narration.wav` loaded | ✅ |
| 2. Pre-production: word-level transcript, 98 narrated scenes force-aligned to real timestamps, storyboard | ✅ `storyboard.md`, `timing/` |
| 3. Test clip (cold open, 0:00–0:22.4) | ✅ `out/test_clip_cold_open.mp4` |
| 4. Iterative production of the remaining 97 scenes | ⏳ waiting for test-clip sign-off |

## Layout
```
src/lib/anim.ts        keyframes, easing (slow-in/out, overshoot), noise, blink, breathing
src/lib/camera.tsx     2.5D pinhole camera in METRES (1 unit = 1 m), depth-of-field blur, plane projection
src/rig/Figure.tsx     FK skeleton rig, ground-contact solver (fixes floating / sunk lying & falling poses)
src/rig/Head.tsx       parametric head: features on a sphere → real yaw turns, lids, brows, mouths
src/rig/cast.ts        ORIGINAL character designs (palettes, hair, outfits)
src/env/Lab.tsx        lab interior kit: vessels, fluorescents, light cones, glass walls, hoses, blood pool, handprint
src/env/LabExterior.tsx night compound: sky, ridge + highway traffic, building, pickup, fence, gravel lot
src/fx/Post.tsx        grain, vignette, grade, dust motes, light streaks
src/scenes/ColdOpen.tsx scene 01, six shots, cut list + SFX cues
public/sfx/*.wav       procedurally synthesised SFX / ambience (no third-party audio)
timing/                words.json, segments.json, scenes.json, scene_cuts.json
tools/transcribe.py    memory-safe chunked faster-whisper transcription
```

## Commands
```
npm install
npx remotion studio src/index.ts                 # preview
npx remotion render src/index.ts TestClip out/test_clip_cold_open.mp4
```
On a machine with a GPU, add `--concurrency=4 --gl=angle` (this sandbox renders ~3 s/frame on 2 CPU cores).

## Mix levels
Narration 1.0 · key SFX 0.10–0.12 · ambient beds 0.035–0.04.

## Scale reference (metres)
Teacher 1.80 · lab vessel 1.77 (incl. legs) · roll-up door 3.4 · man-door 2.0 · pickup 5.3 · building 14 × 6.2 · fence 1.9.

## Fast / cloud rendering
- Live blur of big near-lens props is pre-baked: `src/bake/registry.tsx` + `<BakedCard>`; rebuild PNGs with `bash tools/bake.sh`.
- One chunk: `node tools/chunk.mjs --comp TestClip --index 0 --of 1` → out/chunks/; audio: `--audio`; join: `bash tools/assemble.sh`.
- GitHub Actions farm: `.github/workflows/render.yml` (20 parallel jobs → concat → mux). Bangla guide: RENDER_GITHUB_BN.md.
- Measured: TestClip 672 frames in 202 s on 2 vCPU (0.30 s/frame, was ~1.8 s/frame).
