#!/usr/bin/env bash
# Pre-bake blurred foreground props to public/bake/*.png (commit these to the repo).
set -e
cd "$(dirname "$0")/.."
npx remotion bundle src/index.ts --out-dir /tmp/bakebundle --log=error >/dev/null
node -e '
require("esbuild");' 2>/dev/null || true
for spec in $(node -e "
const s=require('fs').readFileSync('src/bake/registry.tsx','utf8');
const re=/(\w+): \{ box:[^}]*levels: \[([^\]]*)\]/g; let m;
while((m=re.exec(s))) m[2].split(',').forEach((_,i)=>console.log(m[1]+':'+i));
"); do
  id=${spec%%:*}; li=${spec##*:}
  echo "bake $id level $li"
  npx remotion still /tmp/bakebundle Bake "public/bake/${id}_${li}.png" --image-format=png --props="{\"id\":\"$id\",\"level\":$li}" --log=error
done
