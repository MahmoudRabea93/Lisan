// أصوات الصح والغلط: نغمتين قصيرين مولّدين من المتصفح (من غير ملفات صوت)
const Sound = (function () {
  let ctx = null;
  let enabled = true;
  try { enabled = localStorage.getItem("sound") !== "off"; } catch (e) {}

  function audio() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  // نغمة واحدة: تردد وبداية ومدة
  function tone(ac, freq, start, dur, type) {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = type || "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, ac.currentTime + start);
    gain.gain.exponentialRampToValueAtTime(0.18, ac.currentTime + start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + start + dur);
    osc.connect(gain).connect(ac.destination);
    osc.start(ac.currentTime + start);
    osc.stop(ac.currentTime + start + dur + 0.02);
  }

  // صح: نغمتين صاعدتين مبهجين
  // غلط: نغمتين نازلتين أخف وأقصر
  function play(ok) {
    if (!enabled) return;
    const ac = audio();
    if (!ac) return;
    if (ok) {
      tone(ac, 660, 0, 0.12, "sine");
      tone(ac, 880, 0.12, 0.18, "sine");
    } else {
      tone(ac, 330, 0, 0.14, "triangle");
      tone(ac, 247, 0.14, 0.22, "triangle");
    }
  }

  function setEnabled(v) {
    enabled = !!v;
    try { localStorage.setItem("sound", enabled ? "on" : "off"); } catch (e) {}
  }

  return { play, setEnabled, isEnabled: () => enabled };
})();
