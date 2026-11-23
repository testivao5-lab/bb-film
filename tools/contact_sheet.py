# usage: python3 tools/contact_sheet.py <dir with f_*.jpg> <out.jpg>  — labels each tile with its frame/second
import sys, glob, os
from PIL import Image, ImageDraw
src, out = sys.argv[1], sys.argv[2]
files = sorted(glob.glob(os.path.join(src, "f_*.jpg")))
cols = 3 if len(files) > 4 else 2 if len(files) > 1 else 1
rows = (len(files) + cols - 1) // cols
tw, th = 640, 360
sheet = Image.new("RGB", (cols * tw, rows * th), "black")
for i, f in enumerate(files):
    im = Image.open(f).convert("RGB").resize((tw, th))
    fr = int(os.path.basename(f)[2:8])
    d = ImageDraw.Draw(im); d.rectangle([0, 0, 190, 22], fill=(0, 0, 0)); d.text((6, 5), f"frame {fr}  {fr/30:.2f}s", fill=(255, 255, 0))
    sheet.paste(im, ((i % cols) * tw, (i // cols) * th))
sheet.save(out, quality=85)
print(out, len(files))
