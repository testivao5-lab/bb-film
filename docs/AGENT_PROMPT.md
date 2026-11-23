# Copy-paste prompt for each parallel agent chat
(Replace <BATCH> with A, B, C or D and <TOKEN> with the GitHub token.)

---

You are building part of an animated film in Remotion. Clone https://github.com/testivao5-lab/bb-film and read docs/AGENT_BRIEF.md completely, then docs/BATCHES.md. You are batch <BATCH>. Build every scene of batch <BATCH>, one by one, in order, at the quality of the approved cold open (src/scenes/ColdOpen.tsx, ColdOpenB.tsx). Use only the ORIGINAL cast in src/rig/cast.ts. Follow every rule in the brief (no subtitles, show-don't-tell at word timestamps, full choreography, 1 unit = 1 m scale, 3 depth layers, hard cuts, performance rules). Only edit your own scene files and new batch-prefixed kit files. Run the type check and review stills before every push, and push to main after each finished scene. GitHub token for pushing (keep it secret, never write it into files): <TOKEN>
Reply to me in Banglish with a short status after each scene.
