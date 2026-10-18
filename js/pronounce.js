// تحدي النطق: بيسمع الطالب من الميكروفون ويقارن كلامه بالجملة الصح (Web Speech Recognition)
const Pronounce = (function () {
  const Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const supported = !!Rec;

  function norm(s) {
    return String(s || "").toLowerCase().replace(/[’`]/g, "'").replace(/[^a-z' ]+/g, " ").replace(/\s+/g, " ").trim();
  }
  function words(s) { return norm(s).split(" ").filter(Boolean); }

  // مسافة التعديل بين كلمتين (عشان الغلطة الصغيرة في حرف ما تتحسبش غلط كبير)
  function lev(a, b) {
    const m = a.length, n = b.length;
    const d = [];
    for (let i = 0; i <= m; i++) { d[i] = [i]; }
    for (let j = 0; j <= n; j++) { d[0][j] = j; }
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
    }
    return d[m][n];
  }
  function sameWord(a, b) {
    if (a === b) return true;
    const dist = lev(a, b);
    return Math.max(a.length, b.length) >= 4 && dist <= 1;
  }

  // نسبة الكلمات الصح اللي اتقالت (من 0 لـ 1)
  function score(target, heard) {
    const t = words(target), h = words(heard);
    if (!t.length) return 0;
    const used = new Array(h.length).fill(false);
    let matched = 0;
    for (const w of t) {
      const i = h.findIndex((x, k) => !used[k] && sameWord(w, x));
      if (i >= 0) { used[i] = true; matched++; }
    }
    return matched / t.length;
  }
  function bestScore(target, alternatives) {
    return Math.max(0, ...alternatives.map(a => score(target, a)));
  }

  // بيسمع مرة واحدة ويرجع البدائل اللي فهمها
  function listen() {
    return new Promise((resolve, reject) => {
      if (!supported) return reject(new Error("unsupported"));
      const r = new Rec();
      r.lang = "en-US";
      r.interimResults = false;
      r.maxAlternatives = 3;
      let got = false;
      r.onresult = e => {
        got = true;
        const alts = [];
        for (let i = 0; i < e.results[0].length; i++) alts.push(e.results[0][i].transcript);
        resolve({ alts });
      };
      r.onerror = e => reject(e);
      r.onend = () => { if (!got) reject(new Error("noresult")); };
      try { r.start(); } catch (e) { reject(e); }
    });
  }

  return { supported, listen, score, bestScore };
})();
