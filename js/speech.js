// النطق عن طريق المتصفح (Web Speech API)
const Speech = (function () {
  const supported = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  let voices = [];

  // ترتيب الأصوات: الأصوات "الطبيعية" (Natural / Online) الأول، وبعدها أصوات جوجل وويندوز المعروفة،
  // والأصوات الآلية (espeak وغيرها) في الآخر
  function score(v) {
    const n = v.name || "";
    let sc = 0;
    if (/natural/i.test(n)) sc += 100;
    if (/online/i.test(n)) sc += 80;
    if (/google/i.test(n)) sc += 60;
    if (/aria|jenny|guy|davis|jason|sara|michelle|ana|emma|brian|ryan|christopher|eric|zira|david|mark|samantha/i.test(n)) sc += 40;
    if (/^en-US/i.test(v.lang)) sc += 20;
    else if (/^en-GB/i.test(v.lang)) sc += 10;
    if (/espeak|compact|robot/i.test(n)) sc -= 60;
    if (v.localService === false) sc += 5;
    return sc;
  }

  function loadVoices() {
    if (!supported) return;
    voices = speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang));
    voices.sort((a, b) => score(b) - score(a));
  }
    if (supported) {
    loadVoices();
    if (speechSynthesis.addEventListener) speechSynthesis.addEventListener("voiceschanged", loadVoices);
  }

  // صوت لكل شخص: بنختار صوت ست أو راجل لو المتصفح فيه، وإلا بنفرّق بين صوتين مختلفين
  function voiceFor(person, index) {
    if (!voices.length) return null;
    const pv = prefs().voice;
    if (pv) {
      const chosen = voices.find(v => v.name === pv);
      if (chosen) return index === 1 ? (voices.find(v => v !== chosen) || chosen) : chosen;
    }
    const female = voices.filter(v => /female|samantha|zira|aria|jenny|hazel|susan|karen|moira|woman/i.test(v.name));
    const male = voices.filter(v => /male|david|mark|guy|daniel|james|alex|fred|george|ryan|tom/i.test(v.name) && !/female/i.test(v.name));
    if (person && person.gender === "f" && female.length) return female[0];
    if (person && person.gender === "m" && male.length) return male[0];
    return voices[index % voices.length];
  }

  // الكلام بيتشغّل بعد cancel بمهلة صغيرة، لأن بعض المتصفحات بتلغي الكلام الجديد لو جه فوراً
  // في الوضع البطيء: بنقسم الجملة كلمة كلمة ونسيب فاصل بين كل كلمة.
  // كده الصوت بيبان بطيء حتى لو المتصفح/الصوت مابيحترمش خاصية السرعة (زي أصوات جوجل في Chrome)
  const SLOW_GAP = 800; // ملي ثانية بين كل كلمة
  let slowTimers = [];

  // إعدادات المستخدم للنطق: السرعة والصوت (بتتحفظ في المتصفح)
  const PREF_KEY = "speechPrefs";
  function prefs() {
    try { return { rate: 0.95, voice: "", autoplay: true, ...JSON.parse(localStorage.getItem(PREF_KEY) || "{}") }; }
    catch (e) { return { rate: 0.95, voice: "", autoplay: true }; }
  }
  function savePrefs(p) {
    try { localStorage.setItem(PREF_KEY, JSON.stringify({ ...prefs(), ...p })); } catch (e) {}
  }

  function speakQueue(items, slow) {
    if (!supported) return;
    speechSynthesis.cancel();
    slowTimers.forEach(clearTimeout);
    slowTimers = [];
    if (speechSynthesis.paused) speechSynthesis.resume();
    setTimeout(() => {
      let step = 0;
      items.forEach((it, idx) => {
        const pieces = slow ? String(it.text).split(/\s+/).filter(Boolean) : [it.text];
        const speakPiece = piece => {
          const u = new SpeechSynthesisUtterance(piece);
          u.lang = "en-US";
          if (it.voice) u.voice = it.voice;
          u.rate = slow ? 0.7 : prefs().rate;
          u.pitch = it.pitch || 1;
          speechSynthesis.speak(u);
        };
        pieces.forEach(piece => {
          if (slow) {
            slowTimers.push(setTimeout(() => speakPiece(piece), step * SLOW_GAP));
            step++;
          } else {
            speakPiece(piece);
          }
        });
        if (slow && idx < items.length - 1) step++; // فاصل أطول بين سطور الحوار
      });
    }, 60);
  }

  function say(text, slow) {
    speakQueue([{ text: String(text), voice: voiceFor(null, 0) }], slow);
  }

  // حوار: كل شخص بصوته ونبرته
  function sayLines(lines, slow) {
    const pair = People.pairFor(lines);
    const items = (lines || []).filter(l => l && l.text).map(l => {
      const person = pair[l.who] || pair.A;
      const idx = l.who === "B" ? 1 : 0;
      return {
        text: l.text,
        voice: voiceFor(person, idx),
        pitch: person.gender === "f" ? 1.1 : 0.9
      };
    });
    speakQueue(items, slow);
  }

  return {
    supported, say, sayLines,
    getVoices: () => voices.slice(),
    getRate: () => prefs().rate,
    getVoiceName: () => prefs().voice,
    setRate: r => savePrefs({ rate: Number(r) }),
    setVoice: name => savePrefs({ voice: name || "" }),
    getAutoplay: () => prefs().autoplay !== false,
    setAutoplay: v => savePrefs({ autoplay: !!v })
  };
})();
