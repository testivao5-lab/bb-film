# Batch A procedural SFX (original synthesis, no samples). Generated once into public/sfx/a_*.wav
# Volumes are set per-use inside the scenes (0.10-0.15 for moments, 0.03-0.04 for beds).
import numpy as np, wave, os

SR = 48000
rng = np.random.default_rng(7)
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


# ── desert wind bed (day, warm): slow gusts over open ground ──
d = t(7.0)
n = rng.standard_normal(len(d))
w = lp(n, 0.004) * 2.6 * (0.65 + 0.35 * np.sin(2 * np.pi * 0.11 * d + 1.2)) \
    + lp(n, 0.0015) * 3.0 * (0.7 + 0.3 * np.sin(2 * np.pi * 0.06 * d))
grass = hp(rng.standard_normal(len(d)), 0.45) * 0.03 * (0.5 + 0.5 * np.sin(2 * np.pi * 0.2 * d))
save("a_wind", w + grass)

# ── highway pass-by: doppler whoosh of a car at speed (peak ≈ 0.85 s) ──
d = t(2.4)
n = rng.standard_normal(len(d))
env = np.exp(-((d - 0.85) ** 2) / (2 * 0.16 ** 2))
# band-swept noise: opens up as it approaches
cut = 0.10 + 0.55 * env
y = np.zeros_like(d); acc1 = 0.0; acc2 = 0.0
for i in range(len(d)):
    acc1 += cut[i] * (n[i] - acc1)
    y[i] = acc1
whoosh = y * env * 2.4 + lp(n, 0.02) * env * 1.2
f0 = 150 * (1.0 - 0.55 * np.clip((d - 0.4) / 0.9, 0, 1))  # engine/tire hum drops past
ph = 2 * np.pi * np.cumsum(f0) / SR
hum = np.sin(ph) * env * 0.35
save("a_carpass", whoosh + hum)

# ── classroom room tone: HVAC hum + air, dry and empty ──
d = t(5.0)
n = rng.standard_normal(len(d))
air = lp(n, 0.010) * 1.8
hiss = hp(n, 0.4) * 0.02
hum = 0.05 * np.sin(2 * np.pi * 120 * d) + 0.03 * np.sin(2 * np.pi * 240 * d) \
    + 0.02 * np.sin(2 * np.pi * 60 * d)
save("a_room", air + hiss + hum * (0.9 + 0.1 * np.sin(2 * np.pi * 0.4 * d)))

# ── chalk taps on a slate board (double strike + a drag) ──
d = t(1.0)
x = np.zeros_like(d)
for st, amp in ((0.05, 1.0), (0.17, 0.85)):
    s = int(SR * st); L = min(int(SR * 0.06), len(d) - s)
    tt = np.arange(L) / SR
    nz = rng.standard_normal(L)
    tap = hp(nz, 0.5) * np.exp(-tt * 160) * amp
    x[s:s + L] += tap
# quick chalk drag
s = int(SR * 0.42); L = min(int(SR * 0.34), len(d) - s)
tt = np.arange(L) / SR
nz = rng.standard_normal(L)
x[s:s + L] += hp(nz, 0.42) * np.exp(-tt * 6) * 0.5 * (0.4 + 0.6 * np.sin(2 * np.pi * 9 * tt) ** 2)
save("a_chalk", x)

# ── fluorescent tube flicker: buzz that stutters, then holds ──
d = t(2.0)
buzz = (np.sin(2 * np.pi * 120 * d) * 0.6 + np.sin(2 * np.pi * 240 * d) * 0.3
        + np.sin(2 * np.pi * 360 * d) * 0.15)
# stutter gate: on/off pattern in the first 1.1 s, then steady
gate = np.ones_like(d)
pattern = [(0.00, 0.14, 1), (0.14, 0.24, 0), (0.24, 0.46, 1), (0.46, 0.54, 0),
           (0.54, 0.78, 1), (0.78, 0.86, 0), (0.86, 1.08, 1), (1.08, 1.14, 0)]
for a, b, v in pattern:
    gate[int(SR * a):int(SR * b)] = v
gate = lp(gate, 0.004)
crack = np.zeros_like(d)
for st in (0.14, 0.46, 0.78, 1.14):
    s = int(SR * st); L = min(int(SR * 0.05), len(d) - s)
    tt = np.arange(L) / SR
    crack[s:s + L] += hp(rng.standard_normal(L), 0.6) * np.exp(-tt * 90) * 0.8
save("a_flicker", buzz * gate * 0.5 + crack)

print("batch A sfx ok")
