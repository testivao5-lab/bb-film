# Batch B procedural SFX (original synthesis, no samples). Generated once into public/sfx/b_*.wav
# Volumes are set per-use inside the scenes (0.10-0.15 for moments, 0.03-0.04 for beds).
import numpy as np, wave, os

SR = 48000
rng = np.random.default_rng(11)
OUT = "public/sfx"
os.makedirs(OUT, exist_ok=True)


def save(name, x):
    x = x / (np.max(np.abs(x)) + 1e-9) * 0.9
    st = np.stack([x, x], 1)
    with wave.open(f"{OUT}/{name}.wav", "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((st * 32767).astype(np.int16).tobytes())
    print("wrote", name, f"{len(x)/SR:.2f}s")


def t(d):
    return np.arange(int(SR * d)) / SR


def lp(x, a):
    y = np.zeros_like(x); acc = 0.0
    for i in range(len(x)):
        acc += a * (x[i] - acc); y[i] = acc
    return y


def hp(x, a):
    return x - lp(x, a)


# ── basement room tone: concrete room, faint water in pipes, distant traffic ──
d = t(6.0)
n = rng.standard_normal(len(d))
bed = lp(n, 0.02) * 1.6 + lp(n, 0.002) * 2.2
hiss = hp(rng.standard_normal(len(d)), 0.35) * 0.02
hum = 0.05 * np.sin(2 * np.pi * 60 * d) + 0.02 * np.sin(2 * np.pi * 120 * d)
drip = np.zeros_like(d)
for st in (1.1, 2.6, 4.3):
    s = int(SR * st); L = len(d) - s; tt = np.arange(L) / SR
    f0 = 900 + rng.random() * 500
    drip[s:] += np.sin(2 * np.pi * f0 * tt) * np.exp(-tt * 26) * 0.25
save("b_room_basement", bed * 0.8 + hiss + hum + drip)

# ── stairs / house upstairs tone (kitchen at night) ──
d = t(6.0)
n = rng.standard_normal(len(d))
fridge = 0.045 * np.sin(2 * np.pi * 100 * d) * (1 + 0.1 * np.sin(2 * np.pi * 0.7 * d))
save("b_room_house", lp(n, 0.012) * 2.0 + fridge + lp(n, 0.002) * 1.2)

# ── body hits the slab + crockery breaking ──
d = t(2.0)
thud = np.sin(2 * np.pi * 48 * d) * np.exp(-d * 11) + lp(rng.standard_normal(len(d)), 0.06) * np.exp(-d * 8) * 2.2
shards = np.zeros_like(d)
for k in range(26):
    st = 0.06 + rng.random() * 1.1
    s = int(SR * st)
    if s >= len(d):
        continue
    L = min(int(SR * 0.09), len(d) - s)
    tt = np.arange(L) / SR
    f0 = 2600 + rng.random() * 4200
    shards[s:s + L] += (np.sin(2 * np.pi * f0 * tt) + 0.4 * np.sin(2 * np.pi * f0 * 2.6 * tt)) * np.exp(-tt * 70) * 0.5 * (1 - st / 1.4)
save("b_faint_crash", thud + shards)

# ── chain rattle against a steel post ──
d = t(1.6)
rattle = np.zeros_like(d)
for k in range(38):
    st = rng.random() * 1.2
    s = int(SR * st); L = min(int(SR * 0.07), len(d) - s)
    tt = np.arange(L) / SR
    f0 = 1500 + rng.random() * 2800
    rattle[s:s + L] += np.sin(2 * np.pi * f0 * tt) * np.exp(-tt * 55) * 0.5 * (1 - st / 1.8)
save("b_chain", rattle)

# ── bike-lock click + metal ratchet ──
d = t(0.9)
x = np.zeros_like(d)
for st, f0 in ((0.05, 3200), (0.22, 2100), (0.34, 2700)):
    s = int(SR * st); L = len(d) - s; tt = np.arange(L) / SR
    x[s:] += np.sin(2 * np.pi * f0 * tt) * np.exp(-tt * 90) * 0.7
save("b_lock_click", x)

# ── crystal thrown to a wooden floor: sharp glass tinkle on impact ──
d = t(1.2)
x = np.zeros_like(d)
s = int(SR * 0.02); L = len(d) - s; tt = np.arange(L) / SR
x[s:] += np.sin(2 * np.pi * 3400 * tt) * np.exp(-tt * 40) * 0.5
for k in range(14):
    st = 0.03 + rng.random() * 0.5
    s = int(SR * st); L = min(int(SR * 0.05), len(d) - s)
    tt = np.arange(L) / SR
    f0 = 4000 + rng.random() * 5000
    x[s:s + L] += np.sin(2 * np.pi * f0 * tt) * np.exp(-tt * 120) * 0.35
save("b_crystal_tink", x)

# ── explosion: sub boom + noise burst + glass + falling debris ──
d = t(3.6)
nz = rng.standard_normal(len(d))
boom = np.sin(2 * np.pi * (34 + 40 * np.exp(-d * 9)) * d) * np.exp(-d * 1.9)
blast = lp(nz, 0.28) * np.exp(-d * 3.2) * 2.4 + hp(nz, 0.5) * np.exp(-d * 5) * 0.9
glass = np.zeros_like(d)
for k in range(70):
    st = 0.05 + rng.random() * 1.6
    s = int(SR * st); L = min(int(SR * 0.12), len(d) - s)
    tt = np.arange(L) / SR
    f0 = 2400 + rng.random() * 6000
    glass[s:s + L] += (np.sin(2 * np.pi * f0 * tt)) * np.exp(-tt * 45) * 0.3 * (1 - st / 2.2)
rumble = lp(nz, 0.01) * np.exp(-d * 0.9) * 3.0
save("b_explosion", boom * 1.6 + blast + glass + rumble)

# ── car alarms down the street (a small chorus, doppler-ish) ──
d = t(4.2)
x = np.zeros_like(d)
for k, (f0, off) in enumerate(((880, 0.0), (1040, 0.15), (720, 0.4))):
    ph = 2 * np.pi * np.cumsum(np.where((d * 1.6 + off) % 1 < 0.5, f0, f0 * 1.18)) / SR
    x += np.sin(ph) * 0.18 * (0.35 + 0.65 * (d < 2.6)) * (0.4 + 0.6 * np.exp(-((d - 0.9) ** 2) / 2))
save("b_car_alarms", x + lp(rng.standard_normal(len(d)), 0.03) * 0.5)

# ── desert wind bed (dusk) ──
d = t(6.0)
n = rng.standard_normal(len(d))
w = lp(n, 0.004) * 3.0 * (0.7 + 0.3 * np.sin(2 * np.pi * 0.13 * d)) + lp(n, 0.0015) * 3.4
save("b_wind_desert", w)

# ── shot + whine/ricochet (one gunshot, clean) ──
d = t(1.8)
n = rng.standard_normal(len(d))
crack = hp(n, 0.55) * np.exp(-d * 55) * 3.0
body = lp(n, 0.22) * np.exp(-d * 7) * 2.2
tail = lp(n, 0.005) * np.exp(-d * 1.2) * 1.5
save("b_gunshot", crack + body + tail)

# ── a small brass bell (the wheelchair bell) ──
d = t(1.6)
x = np.zeros_like(d)
for st in (0.0, 0.34, 0.66):
    s = int(SR * st); L = len(d) - s; tt = np.arange(L) / SR
    x[s:] += (np.sin(2 * np.pi * 2350 * tt) + 0.6 * np.sin(2 * np.pi * 3170 * tt) + 0.35 * np.sin(2 * np.pi * 4720 * tt)) * np.exp(-tt * 9) * 0.4
save("b_bell", x)

# ── ricin packet rustle / paper ──
d = t(1.0)
n = rng.standard_normal(len(d))
x = hp(n, 0.4) * (0.5 + 0.5 * np.sin(2 * np.pi * 7 * d)) * np.exp(-d * 3) * 0.7
save("b_paper", x)

# ── car door / seat belt / trunk lid thunk ──
d = t(1.4)
n = rng.standard_normal(len(d))
x = np.sin(2 * np.pi * 62 * d) * np.exp(-d * 14) * 0.9 + lp(n, 0.12) * np.exp(-d * 20) * 1.4
save("b_thunk", x)

# ── clock ticking for the waiting-in-the-car beat (subtle) ──
d = t(6.0)
x = np.zeros_like(d)
for k in range(12):
    s = int(SR * k * 0.5); L = min(int(SR * 0.02), len(d) - s)
    tt = np.arange(L) / SR
    x[s:s + L] += np.sin(2 * np.pi * (2200 if k % 2 else 1700) * tt) * np.exp(-tt * 240) * 0.25
save("b_clock", x)

print("batch B sfx ok")
