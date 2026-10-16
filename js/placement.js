// اختبار تحديد المستوى: 15 سؤال (5 لكل مستوى)، من غير تلميحات
const Placement = (function () {
  const LABELS = { A1: "مبتدئ (A1)", A2: "أساسي (A2)", B1: "متوسط (B1)", B2: "فوق المتوسط (B2)" };
  const NEED = 4; // لازم 4 من 5 عشان تعدّي المستوى

  const Q = [
    { band: "A1", q: "She ___ a student.", options: ["is", "am", "are"], answer: "is" },
    { band: "A1", q: "I ___ from Egypt.", options: ["am", "is", "are"], answer: "am" },
    { band: "A1", q: "How ___ are you? I'm 20.", options: ["old", "many", "much"], answer: "old" },
    { band: "A1", q: "What is the opposite of \"big\"?", options: ["small", "tall", "long"], answer: "small" },
    { band: "A1", q: "___ is your name?", options: ["What", "Where", "Who"], answer: "What" },
    { band: "A2", q: "Yesterday I ___ to the market.", options: ["went", "go", "going"], answer: "went" },
    { band: "A2", q: "There ___ two books on the table.", options: ["are", "is", "am"], answer: "are" },
    { band: "A2", q: "I'm ___ than my brother.", options: ["taller", "more tall", "tallest"], answer: "taller" },
    { band: "A2", q: "She ___ TV at the moment.", options: ["is watching", "watches", "watched"], answer: "is watching" },
    { band: "A2", q: "We ___ visit my uncle tomorrow.", options: ["will", "did", "are"], answer: "will" },
    { band: "B1", q: "If it rains, we ___ at home.", options: ["will stay", "would stay", "stayed"], answer: "will stay" },
    { band: "B1", q: "I have lived here ___ 2015.", options: ["since", "for", "from"], answer: "since" },
    { band: "B1", q: "This house ___ in 1990.", options: ["was built", "built", "has built"], answer: "was built" },
    { band: "B1", q: "He asked me where ___.", options: ["I lived", "did I live", "do I live"], answer: "I lived" },
    { band: "B1", q: "She is interested ___ music.", options: ["in", "on", "at"], answer: "in" }
  ];

  function start(handlers) {
    const scores = { A1: 0, A2: 0, B1: 0 };
    let i = 0;

    Shell.page({
      title: "اختبار تحديد المستوى",
      subtitle: "15 سؤال، حوالي 3 دقايق.",
      body: h("div", { class: "card" },
        h("p", { class: "explain" }, "من غير تلميحات. لو مش عارف الإجابة اختار «مش عارف» بدل التخمين، عشان النتيجة تطلع دقيقة وتبدأ من المكان الصح."),
        h("div", { class: "actions" },
          h("button", { class: "btn primary", type: "button", onclick: ask }, "ابدأ الاختبار"),
          h("a", { class: "btn secondary", href: Router.href("/") }, "مش دلوقتي")))
    });

    function ask() {
      const item = Q[i];
      const buttons = shuffle(item.options).map((opt, idx) => {
        const b = h("button", { class: "option", type: "button", dir: "ltr", lang: "en", "aria-keyshortcuts": String(idx + 1) },
          h("span", { class: "key", "aria-hidden": "true" }, String(idx + 1)),
          h("span", { class: "opt-text" }, opt));
        b.addEventListener("click", () => answer(opt === item.answer));
        return b;
      });
      const unsure = h("button", { class: "btn secondary wide", type: "button", onclick: () => answer(false) }, "مش عارف");
      onKey(e => { if (/^[1-9]$/.test(e.key) && buttons[Number(e.key) - 1]) buttons[Number(e.key) - 1].click(); });

      mount(h("main", { class: "screen" },
        h("div", { class: "topbar" },
          h("button", { class: "close", type: "button", "aria-label": "خروج", onclick: handlers.onExit }, icon("close")),
          h("div", { class: "topbar-main" },
            h("div", { class: "topbar-row" },
              h("strong", {}, "اختبار تحديد المستوى"),
              h("span", {}, `${i + 1} / ${Q.length}`)),
            h("div", {
              class: "progress", role: "progressbar", "aria-label": "تقدمك في الاختبار",
              "aria-valuemin": "0", "aria-valuemax": String(Q.length), "aria-valuenow": String(i)
            }, h("span", { style: `width:${(i / Q.length) * 100}%` })))),
        h("p", { class: "question", dir: "ltr", lang: "en" }, item.q),
        h("div", { class: "options" }, buttons),
        h("div", { class: "step-bar" }, unsure)), { announce: false });
    }

    function answer(ok) {
      if (ok) scores[Q[i].band]++;
      i++;
      if (i < Q.length) ask(); else result();
    }

    function result() {
      const passA1 = scores.A1 >= NEED;
      const passA2 = passA1 && scores.A2 >= NEED;
      const passB1 = passA2 && scores.B1 >= NEED;
      const startLevel = !passA1 ? "A1" : !passA2 ? "A2" : !passB1 ? "B1" : "B2";
      const skip = [passA1 ? "A1" : null, passA2 ? "A2" : null, passB1 ? "B1" : null].filter(Boolean);
      Store.setPlacement(startLevel, skip);

      const note = skip.length
        ? `فتحنا لك كل دروس ${skip.join(" و ")} وتقدر تتخطاها أو ترجع لها وقت ما تحب.`
        : "هتبدأ من أول الدروس، وكل درس بيفتح اللي بعده.";

      Shell.page({
        title: "مستواك: " + LABELS[startLevel],
        body: h("div", { class: "card" },
          h("p", { class: "explain" }, note),
          h("ul", { class: "scores" }, ["A1", "A2", "B1"].map(b =>
            h("li", {}, h("span", {}, "المستوى " + b), h("strong", {}, `${scores[b]} من 5`)))),
          h("div", { class: "actions" },
            h("a", { class: "btn primary", href: Router.href("/") }, "ابدأ التعلّم"),
            h("a", { class: "btn secondary", href: Router.href("/path") }, "شوف المسار")))
      });
    }
  }

  return { start, LABELS };
})();
