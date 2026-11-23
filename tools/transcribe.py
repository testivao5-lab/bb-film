"""Transcribe narration.wav in memory-safe chunks with word-level timestamps.
Outputs timing/words.json and timing/segments.json (absolute seconds)."""
import json, sys, os, wave
import numpy as np
from faster_whisper import WhisperModel

src, out = sys.argv[1], sys.argv[2]
model_name = sys.argv[3] if len(sys.argv) > 3 else "base.en"
CHUNK = 90.0      # seconds per chunk
OVER = 0.0
os.makedirs(out, exist_ok=True)
model = WhisperModel(model_name, device="cpu", compute_type="int8", cpu_threads=2)

w = wave.open(src)
sr, nch, total = w.getframerate(), w.getnchannels(), w.getnframes()
words, segs = [], []
pos = 0
while pos < total:
    # find a quiet split point near the chunk end so we do not cut words
    want = int(CHUNK * sr)
    w.setpos(pos)
    raw = w.readframes(min(want + int(6 * sr), total - pos))
    a = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0
    if nch > 1:
        a = a.reshape(-1, nch).mean(1)
    if pos + len(a) < total:
        win = int(0.05 * sr)
        tail = a[want - int(4 * sr): want + int(5 * sr)]
        e = np.array([np.abs(tail[i:i + win]).mean() for i in range(0, len(tail) - win, win)])
        cut = want - int(4 * sr) + int(np.argmin(e)) * win + win // 2
        a = a[:cut]
    n = int(len(a) * 16000 / sr)
    audio = np.interp(np.linspace(0, len(a) - 1, n, dtype=np.float32),
                      np.arange(len(a), dtype=np.float32), a).astype(np.float32)
    off = pos / sr
    segments, _ = model.transcribe(audio, word_timestamps=True, beam_size=1, language="en",
                                   condition_on_previous_text=False)
    for s in segments:
        segs.append({"start": round(s.start + off, 3), "end": round(s.end + off, 3), "text": s.text.strip()})
        for x in (s.words or []):
            words.append({"w": x.word.strip(), "s": round(x.start + off, 3), "e": round(x.end + off, 3)})
        print(f"{s.start + off:8.2f} {s.end + off:8.2f} {s.text.strip()[:90]}", flush=True)
    pos += len(a)
    json.dump(words, open(f"{out}/words.json", "w"))
    json.dump(segs, open(f"{out}/segments.json", "w"), indent=0)
print("TRANSCRIBE_DONE", flush=True)
