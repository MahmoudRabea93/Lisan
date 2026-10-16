// اختبار تحديد المستوى: بنك 40 سؤال (10 لكل مستوى)، والاختبار بيسحب 5 عشوائي من كل مستوى
const Placement = (function () {
  const LABELS = { A1: "مبتدئ (A1)", A2: "أساسي (A2)", B1: "متوسط (B1)", B2: "فوق المتوسط (B2)" };
  const BANDS = ["A1", "A2", "B1", "B2"];
  const PLAN = { A1: 6, A2: 6, B1: 6, B2: 7 }; // عدد الأسئلة لكل مستوى (المجموع 25)
  const NEED = { A1: 5, A2: 5, B1: 5, B2: 6 }; // لازم كام إجابة صح عشان تعدّي كل مستوى (حوالي 80%)

  const BANK = {
    A1: [
      { q: "She ___ a student.", options: ["is", "am", "are"], answer: "is" },
      { q: "I ___ from Egypt.", options: ["am", "is", "are"], answer: "am" },
      { q: "How ___ are you? I'm 20.", options: ["old", "many", "much"], answer: "old" },
      { q: "What is the opposite of \"big\"?", options: ["small", "tall", "long"], answer: "small" },
      { q: "___ is your name?", options: ["What", "Where", "Who"], answer: "What" },
      { q: "They ___ at home now.", options: ["are", "is", "am"], answer: "are" },
      { q: "We ___ to school every day.", options: ["go", "goes", "going"], answer: "go" },
      { q: "He ___ coffee in the morning.", options: ["drinks", "drink", "drinking"], answer: "drinks" },
      { q: "___ do you live?", options: ["Where", "When", "What"], answer: "Where" },
      { q: "There ___ a cat under the bed.", options: ["is", "are", "am"], answer: "is" }
    ],
    A2: [
      { q: "Yesterday I ___ to the market.", options: ["went", "go", "going"], answer: "went" },
      { q: "There ___ two books on the table.", options: ["are", "is", "am"], answer: "are" },
      { q: "I'm ___ than my brother.", options: ["taller", "more tall", "tallest"], answer: "taller" },
      { q: "She ___ TV at the moment.", options: ["is watching", "watches", "watched"], answer: "is watching" },
      { q: "We ___ visit my uncle tomorrow.", options: ["will", "did", "are"], answer: "will" },
      { q: "I've never ___ to Japan.", options: ["been", "gone", "went"], answer: "been" },
      { q: "He ___ working here since 2019.", options: ["has been", "is", "was"], answer: "has been" },
      { q: "Could you ___ the window, please?", options: ["open", "opened", "opening"], answer: "open" },
      { q: "The film was ___ than I expected.", options: ["better", "good", "more good"], answer: "better" },
      { q: "I usually ___ breakfast at 7.", options: ["have", "has", "having"], answer: "have" }
    ],
    B1: [
      { q: "If it rains, we ___ at home.", options: ["will stay", "would stay", "stayed"], answer: "will stay" },
      { q: "I have lived here ___ 2015.", options: ["since", "for", "from"], answer: "since" },
      { q: "This house ___ in 1990.", options: ["was built", "built", "has built"], answer: "was built" },
      { q: "He asked me where ___.", options: ["I lived", "did I live", "do I live"], answer: "I lived" },
      { q: "She is interested ___ music.", options: ["in", "on", "at"], answer: "in" },
      { q: "If I had more time, I ___ learn guitar.", options: ["would", "will", "am"], answer: "would" },
      { q: "I wish I ___ speak French.", options: ["could", "can", "will"], answer: "could" },
      { q: "She suggested ___ to the cinema.", options: ["going", "to go", "go"], answer: "going" },
      { q: "The package ___ yesterday.", options: ["was delivered", "delivered", "has delivered"], answer: "was delivered" },
      { q: "I'm looking forward to ___ you.", options: ["seeing", "see", "to see"], answer: "seeing" }
    ],
    B2: [
      { q: "By the time we arrived, the film ___.", options: ["had already started", "already started", "has already started"], answer: "had already started" },
      { q: "I'd rather you ___ tell him.", options: ["didn't", "don't", "won't"], answer: "didn't" },
      { q: "The report ___ by the end of the week.", options: ["should be finished", "should finish", "is finishing"], answer: "should be finished" },
      { q: "Not only ___ late, but he also forgot the tickets.", options: ["was he", "he was", "did he was"], answer: "was he" },
      { q: "The meeting, ___ was postponed, has been rescheduled.", options: ["which", "who", "what"], answer: "which" },
      { q: "I'd have called you, but my phone ___.", options: ["had died", "died", "was dying"], answer: "had died" },
      { q: "He's ___ to make a decision by Friday.", options: ["supposed", "supposing", "suppose"], answer: "supposed" },
      { q: "Despite ___ tired, she finished the race.", options: ["being", "to be", "be"], answer: "being" },
      { q: "The more you practise, ___ you get.", options: ["the better", "better", "the best"], answer: "the better" },
      { q: "The results were ___ than we expected.", options: ["disappointing", "disappointed", "disappoint"], answer: "disappointing" }
    ]
  };

  // يسحب أسئلة مختلفة في كل مرة، بترتيب من الأسهل للأصعب
  function pickTest() {
    const picked = [];
    BANDS.forEach(band => {
      shuffle(BANK[band]).slice(0, PLAN[band]).forEach(item => picked.push({ ...item, band }));
    });
    return picked;
  }

  function start(handlers) {
    const T = pickTest();
    const scores = { A1: 0, A2: 0, B1: 0, B2: 0 };
    let i = 0;

    Shell.page({
      title: "اختبار تحديد المستوى",
      subtitle: `${T.length} سؤال، حوالي 6 دقايق.`,
      body: h("div", { class: "card" },
        h("p", { class: "explain" }, "من غير تلميحات. لو مش عارف الإجابة اختار «مش عارف» بدل التخمين، عشان النتيجة تطلع دقيقة وتبدأ من المكان الصح."),
        h("div", { class: "actions" },
          h("button", { class: "btn primary", type: "button", onclick: ask }, "ابدأ الاختبار"),
          h("a", { class: "btn secondary", href: Router.href("/") }, "مش دلوقتي")))
    });

    function ask() {
      const item = T[i];
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
              h("span", {}, `${i + 1} / ${T.length}`)),
            h("div", {
              class: "progress", role: "progressbar", "aria-label": "تقدمك في الاختبار",
              "aria-valuemin": "0", "aria-valuemax": String(T.length), "aria-valuenow": String(i)
            }, h("span", { style: `width:${(i / T.length) * 100}%` })))),
        h("p", { class: "question", dir: "ltr", lang: "en", speak: item.q.replace(/_+/g, "blank") }, item.q),
        h("div", { class: "options" }, buttons),
        h("div", { class: "step-bar" }, unsure)), { announce: false });
    }

    function answer(ok) {
      if (ok) scores[T[i].band]++;
      i++;
      if (i < T.length) ask(); else result();
    }

    function result() {
      const passA1 = scores.A1 >= NEED.A1;
      const passA2 = passA1 && scores.A2 >= NEED.A2;
      const passB1 = passA2 && scores.B1 >= NEED.B1;
      const passB2 = passB1 && scores.B2 >= NEED.B2;
      // مكان البداية = أول مستوى ما اتعداش، والـ B2 لو اتعدى بيتقفل كمان
      const startLevel = !passA1 ? "A1" : !passA2 ? "A2" : !passB1 ? "B1" : "B2";
      const passed = { A1: passA1, A2: passA2, B1: passB1, B2: passB2 };
      const skip = BANDS.filter(b => passed[b]);
      Store.setPlacement(startLevel, skip);

      const note = skip.length
        ? `فتحنا لك كل دروس ${skip.join(" و ")} وتقدر تتخطاها أو ترجع لها وقت ما تحب.`
        : "هتبدأ من أول الدروس، وكل درس بيفتح اللي بعده.";

      Shell.page({
        title: "مستواك: " + LABELS[startLevel],
        body: h("div", { class: "card" },
          h("p", { class: "explain" }, note),
          h("ul", { class: "scores" }, BANDS.map(b =>
            h("li", {}, h("span", {}, "المستوى " + b), h("strong", {}, `${scores[b]} من ${PLAN[b]}`)))),
          h("div", { class: "actions" },
            h("a", { class: "btn primary", href: Router.href("/") }, "ابدأ التعلّم"),
            h("a", { class: "btn secondary", href: Router.href("/path") }, "شوف المسار")))
      });
    }
  }

  return { start, LABELS };
})();
