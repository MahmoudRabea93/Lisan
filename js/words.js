// فهرس الكلمات (من ملفات المحتوى) وشاشة "كلماتي"
const Vocab = (function () {
  const map = {};
  COURSES.forEach(c => (c.units || []).forEach(u => (u.lessons || []).forEach(l =>
    (l.vocab || []).forEach(w => { map[w.en] = w; }))));
  return { find: en => map[en] || null, all: () => Object.values(map) };
})();

const Words = (function () {
  const FILTERS = [
    { key: "all", label: "الكل", test: () => true },
    { key: "due", label: "جاهزة اليوم", test: e => e.due <= Store.today() },
    { key: "new", label: "قيد التثبيت", test: e => e.box <= 2 },
    { key: "mastered", label: "متقنة", test: e => e.box === 5 }
  ];

  function dots(box) {
    const d = h("span", { class: "dots", role: "img", "aria-label": `مستوى الحفظ ${box} من 5` });
    for (let i = 1; i <= 5; i++) d.append(h("i", { class: i <= box ? "on" : "" }));
    return d;
  }

  function show() {
    const state = Store.load();
    const entries = Object.entries(state.review)
      .map(([word, v]) => ({ en: word, ar: v.ar, box: v.box, due: v.due, ex: (Vocab.find(word) || {}).ex }))
      .sort((a, b) => a.box - b.box || a.en.localeCompare(b.en));
    const mastered = entries.filter(e => e.box === 5).length;
    const due = entries.filter(e => e.due <= Store.today()).length;

    const list = h("ul", { class: "word-list", id: "wlist" });
    let filter = "all";
    let term = "";

    function draw() {
      const f = FILTERS.find(x => x.key === filter);
      const q = term.trim().toLowerCase();
      const shown = entries.filter(e => f.test(e) && (!q || e.en.toLowerCase().includes(q) || e.ar.includes(q)));
      list.replaceChildren(...(shown.length
        ? shown.map(e => h("li", { class: "word-item" },
            h("div", { class: "wi-main" },
              h("div", { class: "wi-en" },
                en(e.en, "strong"),
                Speech.supported
                  ? speakWithSlow("play tiny", "نطق " + e.en, slow => Speech.say(e.en, slow))
                  : null,
                e.due <= Store.today() ? h("span", { class: "due-tag" }, "للمراجعة") : null),
              h("div", { class: "wi-ar" }, e.ar),
              e.ex ? en(e.ex, "p", "wi-ex") : null),
            dots(e.box)))
        : [h("li", { class: "muted" }, "مفيش كلمات مطابقة.")]));
      announce(`${shown.length} نتيجة`);
    }

    const search = h("input", {
      class: "search", type: "search", placeholder: "ابحث بالعربي أو الإنجليزي",
      "aria-label": "ابحث عن كلمة", "aria-controls": "wlist"
    });
    search.addEventListener("input", () => { term = search.value; draw(); });

    const chips = h("div", { class: "filters", role: "group", "aria-label": "تصفية الكلمات" },
      FILTERS.map(f => {
        const b = h("button", {
          class: "filter" + (f.key === filter ? " on" : ""), type: "button",
          "aria-pressed": f.key === filter ? "true" : "false"
        }, f.label);
        b.addEventListener("click", () => {
          filter = f.key;
          [...chips.children].forEach(c => { c.classList.remove("on"); c.setAttribute("aria-pressed", "false"); });
          b.classList.add("on");
          b.setAttribute("aria-pressed", "true");
          draw();
        });
        return b;
      }));

    draw();

    Shell.page({
      title: "كلماتي",
      subtitle: entries.length
        ? `${wordsLabel(entries.length)} محفوظة، ثبّتّ منها ${mastered}${due ? `، و${due} جاهزة للمراجعة` : ""}.`
        : "الكلمات بتتضاف هنا بعد كل درس.",
      body: h("div", {},
        due ? h("a", { class: "btn primary", href: Router.href("/review/session") }, "ابدأ مراجعة اليوم") : null,
        entries.length ? h("div", { class: "card" }, search, chips) : null,
        h("div", { class: "card" }, list))
    });
  }

  return { show };
})();
