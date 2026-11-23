# Procedural SFX for cold-open part B (original synthesis, no samples).
import numpy as np, wave
SR = 48000
rng = np.random.default_rng(7)
def save(name, x):
    x = x / (np.max(np.abs(x)) + 1e-9) * 0.9
    st = np.stack([x, x], 1)
    with wave.open(f"public/sfx/{name}.wav", "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((st * 32767).astype(np.int16).tobytes())
def t(d): return np.arange(int(SR * d)) / SR
def lp(x, a):  # one-pole low-pass
    y = np.zeros_like(x); acc = 0.0
    for i in range(len(x)): acc += a * (x[i] - acc); y[i] = acc
    return y
# gate crash: low thud + rattling chain-link (many short metallic pings) + scrape
d = t(1.4); n = rng.standard_normal(len(d))
thud = np.sin(2 * np.pi * 55 * d) * np.exp(-d * 9) + lp(n, 0.05) * np.exp(-d * 6) * 2
rattle = np.zeros_like(d)
for k in range(60):
    st = int(SR * (0.01 + rng.random() * 0.9)); f0 = 1800 + rng.random() * 3500
    L = int(SR * 0.05); seg = np.sin(2 * np.pi * f0 * np.arange(L) / SR) * np.exp(-np.arange(L) / SR * 80) * (1 - st / len(d))
    rattle[st:st + L] += seg[: len(d) - st] * 0.35
save("gate_crash", thud + rattle + lp(n, 0.3) * np.exp(-d * 3) * 0.3)
# engine: rising sawtooth-ish rumble with harmonics
d = t(4.2); f = 38 + 70 * (1 - np.exp(-d * 0.9)); ph = 2 * np.pi * np.cumsum(f) / SR
eng = sum(np.sin(ph * h) / h for h in range(1, 7)) * (0.6 + 0.4 * np.sin(ph * 0.5)) + lp(rng.standard_normal(len(d)), 0.08) * 0.6
save("engine", lp(eng, 0.25) * np.minimum(1, d * 8))
# car interior: low road rumble bed
d = t(4.6); save("car_interior", lp(lp(rng.standard_normal(len(d)), 0.02), 0.05) + 0.2 * np.sin(2 * np.pi * 45 * d))
# siren pass: wail with doppler drop + amplitude swell
d = t(1.9); swell = np.exp(-((d - 0.8) ** 2) / 0.18); dop = np.where(d < 0.8, 1.05, 0.93)
fr = (700 + 400 * np.sin(2 * np.pi * 1.6 * d)) * dop; ph = 2 * np.pi * np.cumsum(fr) / SR
save("siren_pass", (np.sin(ph) + 0.3 * np.sin(2 * ph)) * swell)
# coins: a few metallic clinks + one wobble settle
d = t(1.0); x = np.zeros_like(d)
for k, (st, f0) in enumerate([(0.0, 3900), (0.1, 4400), (0.19, 3600), (0.27, 5100)]):
    s = int(SR * st); L = len(d) - s; tt = np.arange(L) / SR
    x[s:] += (np.sin(2 * np.pi * f0 * tt) + 0.5 * np.sin(2 * np.pi * f0 * 2.7 * tt)) * np.exp(-tt * 25)
s = int(SR * 0.35); tt = np.arange(len(d) - s) / SR
x[s:] += np.sin(2 * np.pi * 3000 * tt) * np.exp(-tt * 4) * (0.5 + 0.5 * np.sign(np.sin(2 * np.pi * (6 + 30 * tt) * tt))) * 0.3
save("coins", x)
print("ok")
