"""Procedural SFX for batch D (original synthesis, no samples). Run: python3 tools/make_sfx_d.py"""
import numpy as np, wave, os
SR = 48000
rng = np.random.default_rng(11)
os.makedirs("public/sfx", exist_ok=True)

def save(name, x, gain=0.9):
    x = np.asarray(x, dtype=np.float64)
    x = x / (np.max(np.abs(x)) + 1e-9) * gain
    st = np.stack([x, x], 1)
    with wave.open(f"public/sfx/{name}.wav", "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((st * 32767).astype(np.int16).tobytes())

def t(d): return np.arange(int(SR * d)) / SR

def lp(x, a):
    y = np.zeros_like(x); acc = 0.0
    for i in range(len(x)):
        acc += a * (x[i] - acc); y[i] = acc
    return y

def hp(x, a):
    return x - lp(x, a)

def env_adsr(n, a=0.01, d=0.2, s=0.4, r=0.4):
    A = np.linspace(0, 1, max(1, int(SR * a)))
    D = np.linspace(1, s, max(1, int(SR * d)))
    S = np.full(max(1, n - len(A) - len(D) - int(SR * r)), s)
    R = np.linspace(s, 0, int(SR * r))
    e = np.concatenate([A, D, S, R])
    return e[:n] if len(e) >= n else np.pad(e, (0, n - len(e)))

# dig: shovel into sand + pour of loose dirt
d = t(1.5)
scrape = hp(rng.standard_normal(len(d)), 0.06) * np.exp(-((d - 0.18) ** 2) / 0.02) * 0.6
dig = lp(rng.standard_normal(len(d)), 0.09) * np.exp(-d * 2.2) * 1.1
crackle = np.zeros_like(d)
for k in range(70):
    st = int(SR * (0.05 + rng.random() * 1.1))
    L = int(SR * 0.03); seg = rng.standard_normal(L) * np.exp(-np.arange(L) / SR * 120) * 0.5
    crackle[st:st + L] += seg[: len(d) - st]
thud = np.sin(2 * np.pi * 62 * d) * np.exp(-d * 8)
save("d_dig", dig + scrape + crackle + thud * 0.7)

# latch click: barrel lid popping open
d = t(0.5)
clk = np.sin(2 * np.pi * 1250 * d) * np.exp(-d * 70)
clk2 = np.sin(2 * np.pi * 820 * d) * np.exp(-(d - 0.09).clip(0) * 60) * (d > 0.09)
save("d_latch", clk + 0.6 * clk2 + lp(rng.standard_normal(len(d)), 0.4) * np.exp(-d * 25) * 0.4)

# phone ring (two bursts, an old slab ringtone pattern, synthetic)
d = t(2.0)
ring = np.zeros_like(d)
for b in (0.0, 0.62):
    i0 = int(SR * b); n = int(SR * 0.34); tt = np.arange(n) / SR
    tone = np.sin(2 * np.pi * 940 * tt) * (0.5 + 0.5 * np.sign(np.sin(2 * np.pi * 28 * tt)))
    ring[i0:i0 + n] += tone * np.hanning(n)
save("d_phone_ring", ring, gain=0.75)

# fob beep + trunk latch
d = t(0.9)
beep = (np.sin(2 * np.pi * 2400 * d[: int(SR * 0.07)]) * np.linspace(1, 0, int(SR * 0.07)))
x = np.zeros_like(d); x[: len(beep)] += beep
s = int(SR * 0.26); n = len(d) - s; tt = np.arange(n) / SR
x[s:] += (np.sin(2 * np.pi * 300 * tt) * np.exp(-tt * 30) * 0.9 + lp(rng.standard_normal(n), 0.3) * np.exp(-tt * 18) * 0.7)
save("d_fob", x)

# gunfire volley: many sharp cracks with tail, low rumble bed (used at 0.10–0.15)
d = t(2.6)
x = np.zeros_like(d)
# rotating-sweep pacing: bursts of 4-6 cracks
times = []
tt0 = 0.12
for burst in range(4):
    for k in range(5):
        times.append(tt0); tt0 += 0.085 + rng.random() * 0.03
    tt0 += 0.16
for st in times:
    s = int(SR * st)
    n = len(d) - s
    if n <= 0: continue
    tt = np.arange(n) / SR
    crack = (rng.standard_normal(n) * np.exp(-tt * 90) * 1.2 + np.sin(2 * np.pi * (140 + rng.random() * 60) * tt) * np.exp(-tt * 30) * 0.9)
    x[s:] += crack * 0.8
x += lp(rng.standard_normal(len(d)), 0.02) * np.exp(-d * 1.2) * 0.5
save("d_gunfire", x)

# ricochet whine (single) + shell tinkle
d = t(1.2)
f = 2600 - 1500 * d
ph = 2 * np.pi * np.cumsum(np.clip(f, 600, 3000)) / SR
ric = np.sin(ph) * np.exp(-d * 3.4) * 0.5
tink = np.zeros_like(d)
for k in range(6):
    s = int(SR * (0.12 + rng.random() * 0.7)); n = len(d) - s; tt = np.arange(n) / SR
    tink[s:] += np.sin(2 * np.pi * (3200 + rng.random() * 2400) * tt) * np.exp(-tt * 40) * 0.2
save("d_ricochet", ric + tink)

# chain rattle (links dragged)
d = t(1.1)
x = np.zeros_like(d)
for k in range(46):
    st = int(SR * rng.random() * 0.9); n = len(d) - st
    if n <= 0: continue
    tt = np.arange(n) / SR
    x[st:] += np.sin(2 * np.pi * (2200 + rng.random() * 3000) * tt) * np.exp(-tt * 70) * 0.25
save("d_chain", x)

# door glide (compound door / trunk), low mechanical whir
d = t(1.6)
tt = t(2.4)[: len(t(1.6))]
fr = 70 + 22 * np.sin(np.pi * tt / 1.6)
ph = 2 * np.pi * np.cumsum(fr) / SR
x = (np.sin(ph) + 0.4 * np.sin(2 * ph)) * env_adsr(len(tt), 0.06, 0.2, 0.7, 0.5) * 0.6
x += lp(rng.standard_normal(len(tt)), 0.03) * env_adsr(len(tt), 0.1, 0.3, 0.5, 0.6) * 0.4
save("d_door", x)

# car approach/skid on dirt then engine idle fade
d = t(3.2)
fr = 40 + 60 * np.minimum(1, d * 0.7)
ph = 2 * np.pi * np.cumsum(fr) / SR
eng = sum(np.sin(ph * h) / h for h in (1, 2, 3, 5)) * 0.5
gravel = lp(hp(rng.standard_normal(len(d)), 0.2), 0.5) * np.exp(-((d - 1.3) ** 2) / 0.5) * 0.8
save("d_car_arrive", eng * np.exp(-((d - 0.9) ** 2) / 2.0) + gravel)

# phone-line tone bed for a call (low, barely audible under narration)
d = t(6.0)
x = lp(rng.standard_normal(len(d)), 0.01) * 0.5 + np.sin(2 * np.pi * 120 * d) * 0.1
save("d_line_bed", x, gain=0.5)

# motel room tone (AC hum)
d = t(5.0)
x = np.sin(2 * np.pi * 60 * d) * 0.25 + np.sin(2 * np.pi * 118 * d) * 0.08 + lp(rng.standard_normal(len(d)), 0.02) * 0.5
save("d_roomtone", x, gain=0.6)

# forest / cabin wind through pines (filtered noise with slow swells)
d = t(6.0)
n = lp(hp(rng.standard_normal(len(d)), 0.02), 0.06)
swell = 0.5 + 0.5 * np.sin(2 * np.pi * 0.11 * d)
save("d_forest_wind", n * swell, gain=0.55)

# wood stove crackle
d = t(4.0)
x = np.zeros_like(d)
for k in range(120):
    st = int(SR * rng.random() * 3.8); n = len(d) - st
    if n <= 0: continue
    tt = np.arange(n) / SR
    x[st:] += rng.standard_normal(n) * np.exp(-tt * 160) * (0.3 + rng.random() * 0.5)
save("d_stove", x + np.sin(2 * np.pi * 48 * d) * 0.06)

# bar ambience: low murmur (band-limited noise + a few glass clinks)
d = t(7.0)
murm = lp(hp(rng.standard_normal(len(d)), 0.04), 0.12) * 0.5
clinks = np.zeros_like(d)
for k in range(9):
    st = int(SR * (0.2 + rng.random() * 6.3)); n = len(d) - st
    if n <= 0: continue
    tt = np.arange(n) / SR
    clinks[st:] += np.sin(2 * np.pi * (2600 + rng.random() * 1800) * tt) * np.exp(-tt * 26) * 0.2
save("d_bar", murm + clinks)

# doctor's office / hospital corridor tone (HVAC + pager beep)
d = t(5.0)
x = lp(rng.standard_normal(len(d)), 0.05) * 0.5 + np.sin(2 * np.pi * 100 * d) * 0.05
for b in (1.2, 3.4):
    s = int(SR * b); n = int(SR * 0.09); tt = np.arange(n) / SR
    x[s:s + n] += np.sin(2 * np.pi * 1480 * tt) * 0.25
save("d_office", x, gain=0.6)

# printer / scanner servos
d = t(2.4)
x = np.zeros_like(d)
for k in range(26):
    s = int(SR * (0.05 + k * 0.085)); n = min(int(SR * 0.06), len(d) - s)
    if n <= 0: break
    tt = np.arange(n) / SR
    x[s:s + n] += (np.sin(2 * np.pi * (420 + (k % 3) * 90) * tt) + 0.4 * lp(rng.standard_normal(n), 0.3)) * 0.3
save("d_scanner", x)

# parking garage drips + echo
d = t(6.0)
x = np.zeros_like(d)
for k in range(7):
    s = int(SR * (0.4 + k * 0.78 + rng.random() * 0.2)); n = len(d) - s
    if n <= 0: continue
    tt = np.arange(n) / SR
    x[s:] += np.sin(2 * np.pi * (900 + rng.random() * 500) * tt) * np.exp(-tt * 18) * 0.4
    x[s + int(SR * 0.23):] += np.sin(2 * np.pi * 760 * tt[: n - int(SR * 0.23)]) * np.exp(-tt[: n - int(SR * 0.23)] * 14) * 0.12
x += lp(hp(rng.standard_normal(len(d)), 0.01), 0.1) * 0.18
save("d_garage", x, gain=0.6)

# high desert wind (dusk), with a low sand hiss
d = t(8.0)
n = lp(rng.standard_normal(len(d)), 0.02) * (0.5 + 0.5 * np.sin(2 * np.pi * 0.07 * d))
save("d_desert_wind", n, gain=0.55)

# ambulance siren far off (very soft, one swell)
d = t(4.0)
fr = 620 + 260 * np.sin(2 * np.pi * 0.55 * d)
ph = 2 * np.pi * np.cumsum(fr) / SR
sw = np.exp(-((d - 2.0) ** 2) / 1.6)
save("d_siren_far", (np.sin(ph) + 0.25 * np.sin(2 * ph)) * sw, gain=0.5)

# hospital monitor beep (steady, quiet)
d = t(4.0)
x = np.zeros_like(d)
for k in range(4):
    s = int(SR * (0.2 + k * 0.95)); n = int(SR * 0.07); tt = np.arange(n) / SR
    x[s:s + n] += np.sin(2 * np.pi * 1180 * tt) * 0.3
save("d_monitor", x, gain=0.6)

print("ok: wrote", len([f for f in os.listdir('public/sfx') if f.startswith('d_')]), "d_* files")

# chair scrape on concrete
d = t(0.9)
n = hp(rng.standard_normal(len(d)), 0.12)
sw = np.exp(-((d - 0.35) ** 2) / 0.05)
x = n * sw * 0.7 + np.sin(2 * np.pi * 180 * d) * sw * 0.15
save("d_chair", x, gain=0.7)

# paper slap / folder dropped on a table
d = t(0.7)
x = lp(rng.standard_normal(len(d)), 0.35) * np.exp(-d * 22) * 1.2
x += np.sin(2 * np.pi * 95 * d) * np.exp(-d * 26) * 0.6
save("d_paper", x, gain=0.8)

# thumb tap on glass
d = t(0.35)
x = np.sin(2 * np.pi * 1900 * d) * np.exp(-d * 90) * 0.5 + lp(rng.standard_normal(len(d)), 0.5) * np.exp(-d * 60) * 0.6
save("d_tap", x, gain=0.6)

# car door of an unmarked sedan shutting
d = t(0.9)
x = lp(rng.standard_normal(len(d)), 0.25) * np.exp(-d * 16) * 1.1 + np.sin(2 * np.pi * 78 * d) * np.exp(-d * 14) * 0.7
save("d_car_door", x, gain=0.8)

print("ok2")
