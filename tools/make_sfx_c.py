# Procedural SFX for batch C (original synthesis, no samples). Writes public/sfx/c_*.wav
import numpy as np, wave
SR = 48000
rng = np.random.default_rng(55056059)
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

# c_night_bed: night street ambience — low traffic wash, faint insects, soft air
d = t(12.0); n = rng.standard_normal(len(d))
wash = lp(n, 0.012) * (0.6 + 0.25 * np.sin(2 * np.pi * 0.07 * d))
insects = np.zeros_like(d)
for k in range(220):
    st = int(SR * rng.random() * (len(d) / SR - 0.05))
    L = int(SR * 0.028); f0 = 3800 + rng.random() * 1800
    seg = np.sin(2 * np.pi * f0 * np.arange(L) / SR) * np.exp(-np.arange(L) / SR * 60) * 0.16
    insects[st:st + L] += seg[: len(d) - st]
air = lp(n, 0.004) * 0.5
save("c_night_bed", wash * 0.8 + air + insects)

# c_gun_click: pistol slide racking — two crisp metallic clicks + spring
d = t(0.5); x = np.zeros_like(d)
for st, f0, amp in [(0.02, 2400, 1.0), (0.11, 3100, 0.85), (0.16, 1750, 0.5)]:
    s = int(SR * st); tt = np.arange(len(d) - s) / SR
    x[s:] += (np.sin(2 * np.pi * f0 * tt) + 0.6 * np.sin(2 * np.pi * f0 * 1.61 * tt)) * np.exp(-tt * 90) * amp
    x[s:] += lp(rng.standard_normal(len(d) - s), 0.35) * np.exp(-tt * 160) * amp * 0.5
save("c_gun_click", x)

# c_engine_stop: car engine dying + door (scene 56)
d = t(2.6); f = 74 - 22 * np.clip((d - 0.7) / 1.2, 0, 1) ** 2
ph = 2 * np.pi * np.cumsum(f) / SR
eng = sum(np.sin(ph * h) / h for h in range(1, 8)) * np.clip(1.25 - d * 0.32, 0, 1)
eng += lp(rng.standard_normal(len(d)), 0.06) * 0.35 * np.clip(1.3 - d * 0.42, 0, 1)
save("c_engine_stop", eng)

# c_impact_thud: body-on-car / body-on-pavement thuds with a short scrape (scene 56)
d = t(1.2); x = np.zeros_like(d)
for st, f0, amp in [(0.0, 62, 1.0), (0.34, 48, 0.8)]:
    s = int(SR * st); tt = np.arange(len(d) - s) / SR
    x[s:] += np.sin(2 * np.pi * f0 * tt) * np.exp(-tt * 11) * amp
    x[s:] += lp(rng.standard_normal(len(d) - s), 0.08) * np.exp(-tt * 17) * amp * 0.8
sc = int(SR * 0.02); tt = np.arange(len(d) - sc) / SR
x[sc:] += lp(rng.standard_normal(len(d) - sc), 0.28) * np.exp(-tt * 7) * 0.3
save("c_impact_thud", x)

# c_gunshot: short dry crack with low tail (scene 56)
d = t(1.0); n = rng.standard_normal(len(d))
shot = lp(n, 0.45) * np.exp(-d * 55) + np.sin(2 * np.pi * 90 * d) * np.exp(-d * 16) * 0.9
shot += lp(n, 0.1) * np.exp(-d * 6) * 0.25
save("c_gunshot", shot)

# c_lab_bed: superlab room tone — clean air, faint electrical hum (scenes 57, 59)
d = t(12.0); n = rng.standard_normal(len(d))
hum = 0.16 * np.sin(2 * np.pi * 120 * d) + 0.09 * np.sin(2 * np.pi * 239.5 * d)
hum *= 1 + 0.06 * np.sin(2 * np.pi * 0.11 * d)
air = lp(n, 0.006) * 0.42
save("c_lab_bed", hum + air)

# c_boxclick: small box-cutter blade snap (scene 59)
d = t(0.4); x = np.zeros_like(d)
for st, f0, amp in [(0.0, 3400, 1.0), (0.045, 2600, 0.6)]:
    s = int(SR * st); tt = np.arange(len(d) - s) / SR
    x[s:] += (np.sin(2 * np.pi * f0 * tt) + 0.5 * np.sin(2 * np.pi * f0 * 2.2 * tt)) * np.exp(-tt * 130) * amp
save("c_boxclick", x)

# c_body_fall: heavy soft collapse — low thud + fabric scuff (scene 59)
d = t(1.4); x = np.zeros_like(d)
tt = d
x += np.sin(2 * np.pi * 52 * tt) * np.exp(-tt * 9) * 0.9
x += lp(rng.standard_normal(len(d)), 0.12) * np.exp(-tt * 8) * 0.55
sc = int(SR * 0.12); tt2 = np.arange(len(d) - sc) / SR
x[sc:] += lp(rng.standard_normal(len(d) - sc), 0.2) * np.exp(-tt2 * 12) * 0.3
save("c_body_fall", x)

print("ok")
