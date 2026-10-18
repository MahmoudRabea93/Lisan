// كلمة اليوم: كلمة جديدة كل يوم بصورتها ومثالها وزرار يسمعها (نفس الكلمة طول اليوم لكل الناس)
const DailyWord = (function () {
  function pool() {
    const seen = new Set();
    const out = [];
    (typeof COURSES !== "undefined" ? COURSES : []).forEach(c => {
      if (c.level !== "A1") return;   // المفردات اللي ليها ترجمة عربي كاملة
      (c.units || []).forEach(u => (u.lessons || []).forEach(l => (l.vocab || []).forEach(w => {
        if (!w.ex || seen.has(w.en.toLowerCase())) return;
        seen.add(w.en.toLowerCase());
        out.push(w);
      })));
    });
    return out;
  }

  // اليوم بيتحسب بالتوقيت المحلي عشان الكلمة تتغير عند نص الليل
  function dayIndex() {
    const d = new Date();
    const local = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000;
    return Math.floor(local);
  }

  function card() {
    const words = pool();
    if (!words.length) return null;
    const w = words[dayIndex() % words.length];
    const em = emojiFor(w.en);
    return h("section", { class: "card daily-word", "aria-labelledby": "dw-title" },
      h("h2", { class: "card-title", id: "dw-title" }, "كلمة اليوم"),
      h("div", { class: "dw-main" },
        wordVisual(w.en, "dw-emoji"),
        h("div", { class: "dw-word" },
          en(w.en, "strong", "dw-en"),
          Speech.supported
            ? h("button", { class: "play tiny", type: "button", "aria-label": "اسمع الكلمة", title: "اسمع الكلمة", onclick: () => Speech.say(w.en, false) }, icon("speaker"))
            : null,
          wordArNode(w.en))),
      en(w.ex, "p", "dw-ex"),
      exArNode(w.ex));
  }

  return { card };
})();
