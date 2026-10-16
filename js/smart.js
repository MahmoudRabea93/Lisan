// نظام التعلّم الذكي: سجل الأخطاء، مراجعة الضعف، الاختبار الأسبوعي، تقارير المهارات، واقتراح الخطوة التالية
const Smart = (function () {
  const LABELS = Catalog.SECTIONS.labels;
  const ORDER = Catalog.SECTIONS.order;
  const WEEKLY_Q = 12;
  const FIX_ERRORS = 8;
  const FIX_WORDS = 6;
  const MIN_LESSONS_FOR_TEST = 3;

  // ---------- أدوات ----------
  function skillPct(section, stats) {
    const s = (stats || Store.skillStats(5))[section];
    return s && s.total ? s.pct : null;
  }
  function weakSections(limit) {
    const stats = Store.skillStats(5);
    return ORDER
      .filter(k => stats[k] && stats[k].total >= 3 && stats[k].pct < 70)
      .sort((a, b) => stats[a].pct - stats[b].pct)
      .slice(0, limit || 6);
  }

  // ---------- اقتراح الخطوة التالية حسب النتائج ----------
  function recommend(state) {
    const s = state || Store.load();
    const next = Catalog.nextLesson(s);
    const due = Store.dueWords().length;
    const repeated = Store.repeatedErrors().length;
    const done = Catalog.overall(s).done;

    if (done >= MIN_LESSONS_FOR_TEST && Store.weeklyDue()) {
      const last = Store.lastWeekly();
      return {
        kind: "weekly", label: "الاختبار الأسبوعي", href: "/weekly",
        sub: `${WEEKLY_Q} سؤال من دروسك`,
        reason: last ? `عدّى ${Store.daysSinceWeekly()} يوم على آخر اختبار — نقيس تحسنك` : "خلّصت دروس تكفي لأول اختبار قياس"
      };
    }
    if (repeated >= 4) {
      return {
        kind: "fix", label: "مراجعة الضعف", href: "/fix",
        sub: `${repeated} خطأ اتكرر معاك`,
        reason: "الأخطاء دي اتكررت أكتر من مرة، فمراجعتها أهم من درس جديد"
      };
    }
    if (due >= 15) {
      return {
        kind: "review", label: "المراجعة المتباعدة", href: "/review/session",
        sub: `${wordsLabel(due)} مستحقة`,
        reason: "الكلمات اتجمعت، لو اتأخرت عليها هتنساها"
      };
    }
    if (next) {
      const best = s.completed[next.id];
      if (best != null && best < Store.PASS) {
        return {
          kind: "retry", lesson: next, label: "أعد درس: " + next.title, href: "/lesson/" + next.id + "/run",
          sub: `${next.level} · ${next.unitTitle}`,
          reason: `نتيجتك فيه ${best}% ومحتاج ${Store.PASS}% عشان تكمّل`
        };
      }
      const weak = weakSections(1)[0];
      return {
        kind: "lesson", lesson: next, label: "درس: " + next.title, href: "/lesson/" + next.id + "/run",
        sub: `${next.level} · ${next.unitTitle}`,
        reason: weak
          ? `الدرس التالي في مسارك، وفيه ${LABELS[weak]} اللي عندك فيها ${skillPct(weak)}%`
          : "الدرس التالي في مسارك"
      };
    }
    return {
      kind: "review", label: "المراجعة المتباعدة", href: "/review/session",
      sub: "ثبّت اللي خدته", reason: "خلّصت كل الدروس المتاحة"
    };
  }

  // ---------- سجل الأخطاء المتكررة ----------
  function errorCard(e, opts) {
    return h("li", { class: "err-item" },
      h("div", { class: "err-head" },
        h("span", { class: "mk-tag" }, LABELS[e.section] || e.section),
        h("span", { class: "err-count" + (e.count >= 3 ? " hot" : "") }, `repeated ${e.count === 1 ? "once" : e.count === 2 ? "twice" : e.count + " times"}`),
        e.lessonId && Catalog.lesson(e.lessonId)
          ? h("a", { class: "link small", href: Router.href("/lesson/" + e.lessonId) }, e.lessonTitle || "الدرس")
          : null),
      h("p", { class: "mk-q", dir: "auto" }, e.question),
      h("p", { class: "mk-line right" }, h("span", { class: "mk-label" }, "الصح: "), h("span", { dir: "auto" }, e.answer)),
      e.why ? h("p", { class: "mk-why" }, h("span", { class: "mk-icon", "aria-hidden": "true" }, icon("bulb")), h("span", { dir: "auto" }, e.why)) : null,
      opts && opts.onForget
        ? h("button", { class: "link small", type: "button", onclick: () => opts.onForget(e) }, "شيله من السجل")
        : null);
  }

  function showErrors(params) {
    const section = params && params.section;
    const all = Store.errors(section ? { section } : null);
    const repeated = all.filter(e => e.count >= 2);
    const bySection = {};
    Store.errors().forEach(e => { bySection[e.section] = (bySection[e.section] || 0) + 1; });

    Shell.page({
      title: "سجل الأخطاء",
      eyebrow: section ? LABELS[section] : "كل الأقسام",
      subtitle: all.length
        ? `${all.length} خطأ مسجّل، منهم ${repeated.length} اتكرر أكتر من مرة. الخطأ بيخرج من السجل لما تجاوبه صح مرتين.`
        : "مفيش أخطاء مسجّلة. الأخطاء بتتسجل تلقائياً بعد كل درس واختبار.",
      back: "/reports",
      body: h("div", {},
        all.length
          ? h("div", { class: "card" },
              h("div", { class: "filters" },
                h("a", { class: "filter" + (!section ? " on" : ""), href: Router.href("/errors") }, `الكل (${Store.errorCount()})`),
                ORDER.filter(k => bySection[k]).map(k =>
                  h("a", { class: "filter" + (section === k ? " on" : ""), href: Router.href("/errors/" + k) },
                    `${LABELS[k]} (${bySection[k]})`))),
              h("div", { class: "actions" },
                h("a", { class: "btn primary", href: Router.href("/fix" + (section ? "/" + section : "")) }, "راجع الأخطاء دي"),
                h("button", {
                  class: "btn danger", type: "button",
                  onclick: () => { if (confirm("تمسح السجل ده؟")) { Store.clearErrors(section); Router.render(); } }
                }, "امسح السجل")))
          : h("div", { class: "card" },
              h("a", { class: "btn primary", href: Router.href("/") }, "لوحة التحكم")),
        all.length
          ? h("ul", { class: "err-list" }, all.map(e => errorCard(e, {
              onForget: x => { Store.forgetError(x.key); Router.render(); }
            })))
          : null)
    });
  }

  // ---------- مراجعة الضعف (قواعد + كلمات) ----------
  function buildFix(section) {
    const items = [];
    Store.errors(section ? { section } : null).slice(0, FIX_ERRORS).forEach(e => {
      if (e.options && e.options.length >= 3 && e.options.includes(e.answer)) {
        items.push({ kind: "q", err: e, section: e.section, question: e.question, options: e.options, answer: e.answer, why: e.why });
      } else {
        items.push({ kind: "card", err: e, section: e.section, question: e.question, answer: e.answer, why: e.why });
      }
    });
    if (!section || section === "vocab") {
      const state = Store.load();
      const weakWords = Object.entries(state.review)
        .filter(([, v]) => v.box <= 2)
        .sort((a, b) => a[1].box - b[1].box)
        .slice(0, FIX_WORDS)
        .map(([word, v]) => ({ en: word, ar: v.ar }));
      const pool = Object.entries(state.review).map(([word, v]) => ({ en: word, ar: v.ar }));
      weakWords.forEach(w => {
        const wrong = [...new Set(shuffle(pool.filter(p => p.en !== w.en)).map(p => p.ar).filter(a => a !== w.ar))].slice(0, 3);
        if (wrong.length < 2) return;
        const ex = (Vocab.find(w.en) || {}).ex;
        items.push({
          kind: "word", word: w, section: "vocab",
          question: w.en, options: [w.ar, ...wrong], answer: w.ar,
          why: ex ? "مثال: " + ex : null
        });
      });
    }
    return shuffle(items);
  }

  function fix(params) {
    const section = params && params.section;
    const items = buildFix(section);
    if (!items.length) {
      Shell.page({
        title: "مفيش نقاط ضعف مسجّلة",
        subtitle: "سجل الأخطاء فاضي والكلمات كلها ثابتة. كمّل دروسك وهنرصد لك أي ضعف تلقائياً.",
        body: h("div", { class: "card" },
          h("div", { class: "actions" },
            h("a", { class: "btn primary", href: Router.href("/") }, "لوحة التحكم"),
            h("a", { class: "btn secondary", href: Router.href("/reports") }, "تقارير المهارات")))
      });
      return;
    }

    let i = 0, right = 0, fixedCount = 0;

    function head() {
      return h("div", { class: "topbar" },
        h("button", { class: "close", type: "button", "aria-label": "خروج", onclick: () => Router.go("/") }, icon("close")),
        h("div", { class: "topbar-main" },
          h("div", { class: "topbar-row" },
            h("strong", {}, "مراجعة الضعف" + (section ? " · " + LABELS[section] : "")),
            h("span", {}, `${Math.min(i + 1, items.length)} / ${items.length}`)),
          h("div", {
            class: "progress", role: "progressbar", "aria-label": "تقدمك في المراجعة",
            "aria-valuemin": "0", "aria-valuemax": String(items.length), "aria-valuenow": String(i)
          }, h("span", { style: `width:${(i / items.length) * 100}%` }))));
    }

    function grade(item, ok) {
      if (ok) right++;
      if (item.err) {
        if (ok) { if (Store.markFixed(item.err.key)) fixedCount++; }
        else Store.logError(item.err);
      }
      if (item.word) Store.gradeWord(item.word.en, ok);
      i++;
      step();
    }

    function step() {
      if (i >= items.length) return summary();
      const item = items[i];
      const feedback = h("div", { class: "feedback", role: "status", "aria-live": "polite" });
      const why = item.why ? h("p", { class: "example", dir: "auto", hidden: true }, item.why) : null;

      if (item.kind === "card") {
        // سؤال مش اختياري (كتابة/ترتيب): نعرض الإجابة ونسأل عن نفسك
        const answerBox = h("p", { class: "reveal", dir: "auto", hidden: true },
          h("span", { class: "mk-label" }, "الإجابة: "), item.answer);
        const showBtn = h("button", { class: "btn primary wide", type: "button" }, "اعرض الإجابة");
        const rate = h("div", { class: "actions", hidden: true },
          h("button", { class: "btn secondary", type: "button", onclick: () => grade(item, true) }, "كنت عارفها"),
          h("button", { class: "btn primary", type: "button", onclick: () => grade(item, false) }, "لسه محتاجها"));
        showBtn.addEventListener("click", () => {
          answerBox.hidden = false;
          if (why) why.hidden = false;
          showBtn.hidden = true;
          rate.hidden = false;
        });
        return mount(h("main", { class: "screen" }, head(),
          h("p", { class: "section-tag" }, LABELS[item.section] || "مراجعة"),
          h("p", { class: "question", dir: "auto" }, item.question),
          answerBox, why,
          h("div", { class: "step-bar" }, showBtn, rate)), { announce: false });
      }

      const next = h("button", { class: "btn primary wide", type: "button", hidden: true }, "التالي");
      let answered = false;
      const list = optionList(item.options, item.answer, ok => {
        answered = ok;
        showFeedback(feedback, ok, item.answer);
        if (why) why.hidden = false;
        if (item.kind === "word" && Speech.supported) Speech.say(item.word.en);
        next.hidden = false;
        next.focus();
      });
      next.addEventListener("click", () => grade(item, answered));
      onKey(e => {
        if (/^[1-9]$/.test(e.key)) list.pick(Number(e.key) - 1);
        else if (e.key === "Enter" && e.target.tagName !== "BUTTON" && !next.hidden) next.click();
      });

      mount(h("main", { class: "screen" }, head(),
        h("p", { class: "section-tag" }, LABELS[item.section] || "مراجعة"),
        item.kind === "word"
          ? h("div", { class: "word-row" }, en(item.question, "p", "word"),
              Speech.supported
                ? speakWithSlow("play small", "نطق الكلمة", slow => Speech.say(item.word.en, slow))
                : null)
          : h("p", { class: "question", dir: "auto" }, item.question),
        list.node, why,
        h("div", { class: "step-bar" }, feedback, next)), { announce: false });
    }

    function summary() {
      Store.recordFix(items.length);
      Store.addXp(right * 2);
      const left = Store.errors().length;
      Shell.page({
        title: "خلّصت مراجعة الضعف",
        subtitle: `${right} من ${items.length} صح${fixedCount ? ` · ${fixedCount} خطأ قرب يخرج من السجل` : ""}.`,
        body: h("div", { class: "card" },
          h("p", { class: "muted" }, left
            ? `لسه ${left} خطأ في السجل. الخطأ بيتشال بعد ما تجاوبه صح مرتين.`
            : "السجل بقى فاضي. شغل ممتاز."),
          h("div", { class: "actions" },
            h("a", { class: "btn primary", href: Router.href("/") }, "لوحة التحكم"),
            h("a", { class: "btn secondary", href: Router.href("/errors") }, "سجل الأخطاء"),
            h("a", { class: "btn secondary", href: Router.href("/reports") }, "تقارير المهارات")))
      });
    }

    step();
  }

  // ---------- الاختبار الأسبوعي ----------
  function buildWeekly(state) {
    const s = state || Store.load();
    const passed = Catalog.lessons.filter(l => Catalog.passed(l, s));
    if (passed.length < 2) return [];
    const weak = weakSections();
    const pool = [];
    shuffle(passed).slice(0, 10).forEach(l => {
      const plan = Builder.build(l, Speech.supported);
      plan.steps.forEach(it => {
        if (it.phase !== "final") return;
        if (!["choice", "listen", "listenQ"].includes(it.type)) return;
        if (!it.options || it.options.length < 3) return;
        pool.push(Object.assign({}, it, { lessonId: l.id, lessonTitle: l.title }));
      });
    });
    // أسئلة من سجل الأخطاء (قياس إن كانت اتصلحت فعلاً)
    Store.repeatedErrors().slice(0, 3).forEach(e => {
      if (e.options && e.options.length >= 3 && e.options.includes(e.answer)) {
        pool.push({
          section: e.section, type: "choice", question: e.question, options: e.options,
          answer: e.answer, why: e.why, lessonId: e.lessonId, lessonTitle: e.lessonTitle, fromError: e.key
        });
      }
    });
    if (!pool.length) return [];
    // ترجيح: المهارات الضعيفة الأول، مع تنويع الأقسام
    const bySection = {};
    shuffle(pool).forEach(it => { (bySection[it.section] = bySection[it.section] || []).push(it); });
    const picked = [];
    const sections = Object.keys(bySection).sort((a, b) => (weak.indexOf(b) !== -1) - (weak.indexOf(a) !== -1));
    let guard = 0;
    while (picked.length < WEEKLY_Q && guard++ < 200) {
      let added = false;
      sections.forEach(sec => {
        if (picked.length >= WEEKLY_Q) return;
        const take = weak.includes(sec) ? 2 : 1;
        for (let k = 0; k < take; k++) {
          const it = bySection[sec].shift();
          if (it) { picked.push(it); added = true; }
        }
      });
      if (!added) break;
    }
    return picked.slice(0, WEEKLY_Q);
  }

  function weekly() {
    const state = Store.load();
    const items = buildWeekly(state);
    const last = Store.lastWeekly();

    if (items.length < 5) {
      Shell.page({
        title: "الاختبار الأسبوعي لسه مش متاح",
        subtitle: `محتاج تخلّص ${MIN_LESSONS_FOR_TEST} دروس على الأقل عشان نقدر نبني اختبار من محتواك.`,
        body: h("div", { class: "card" },
          h("div", { class: "actions" }, h("a", { class: "btn primary", href: Router.href("/") }, "كمّل دروسك")))
      });
      return;
    }

    let i = 0;
    const answers = [];
    const stats = {};

    function intro() {
      Shell.page({
        title: "الاختبار الأسبوعي",
        subtitle: `${items.length} سؤال من الدروس اللي خلّصتها. من غير تصحيح فوري — الشرح كله في الآخر.`,
        body: h("div", { class: "card" },
          last
            ? h("p", {}, `Your last test was ${Store.daysSinceWeekly()} days ago, and your score was `, h("strong", {}, last.score + "%"), ". Let's see the improvement.")
            : h("p", {}, "ده أول اختبار قياس ليك. نتيجته هتبقى نقطة البداية اللي نقارن عليها."),
          h("p", { class: "muted small" }, "الأسئلة بتركّز على مهاراتك الضعيفة والأخطاء اللي اتكررت معاك."),
          h("div", { class: "actions" },
            h("button", { class: "btn primary", type: "button", onclick: ask }, "ابدأ الاختبار"),
            h("a", { class: "btn secondary", href: Router.href("/") }, "مش دلوقتي")))
      });
    }

    function ask() {
      if (i >= items.length) return finish();
      const it = items[i];
      const buttons = shuffle(it.options).map((opt, idx) => {
        const b = h("button", { class: "option", type: "button", dir: "auto", "aria-keyshortcuts": String(idx + 1) },
          h("span", { class: "key", "aria-hidden": "true" }, String(idx + 1)),
          h("span", { class: "opt-text" }, opt));
        b.addEventListener("click", () => answer(opt));
        return b;
      });
      onKey(e => { if (/^[1-9]$/.test(e.key) && buttons[Number(e.key) - 1]) buttons[Number(e.key) - 1].click(); });

      const play = it.type === "listenQ"
        ? slow => Speech.sayLines(it.lines, slow)
        : it.type === "listen" ? slow => Speech.say(it.say, slow) : null;
      if (play) setTimeout(() => play(false), 350);

      mount(h("main", { class: "screen" },
        h("div", { class: "topbar" },
          h("button", { class: "close", type: "button", "aria-label": "خروج", onclick: () => Router.go("/") }, icon("close")),
          h("div", { class: "topbar-main" },
            h("div", { class: "topbar-row" },
              h("strong", {}, "الاختبار الأسبوعي"),
              h("span", {}, `${i + 1} / ${items.length}`)),
            h("div", {
              class: "progress", role: "progressbar", "aria-label": "تقدمك في الاختبار",
              "aria-valuemin": "0", "aria-valuemax": String(items.length), "aria-valuenow": String(i)
            }, h("span", { style: `width:${(i / items.length) * 100}%` })))),
        h("p", { class: "section-tag" }, LABELS[it.section] || ""),
        play
          ? h("div", { class: "listen" },
              h("button", { class: "play", type: "button", "aria-label": "شغّل الصوت", onclick: () => play(false) }, icon("speaker")),
              h("button", { class: "btn secondary small", type: "button", onclick: () => play(true) }, "أبطأ"))
          : null,
        it.passage ? en(it.passage, "blockquote", "passage") : null,
        h("p", { class: "question", dir: "auto" }, it.question || "اختار اللي سمعته"),
        h("div", { class: "options" }, buttons)), { announce: false });
    }

    function answer(choice) {
      const it = items[i];
      const ok = choice === it.answer;
      answers.push({ it, choice, ok });
      const st = (stats[it.section] = stats[it.section] || { right: 0, total: 0 });
      st.total++;
      if (ok) st.right++;
      if (it.fromError) {
        if (ok) Store.markFixed(it.fromError);
      } else if (!ok) {
        Store.logError({
          section: it.section, lessonId: it.lessonId, lessonTitle: it.lessonTitle,
          type: "choice", question: it.question || "سؤال استماع", answer: it.answer,
          options: it.options, why: it.why || null
        });
      }
      i++;
      ask();
    }

    function finish() {
      const right = answers.filter(a => a.ok).length;
      const score = Math.round((right / answers.length) * 100);
      const prev = Store.lastWeekly();
      Store.recordWeekly({ score, right, total: answers.length, sections: stats });
      const diff = prev ? score - prev.score : null;
      const wrong = answers.filter(a => !a.ok);

      Shell.page({
        title: "نتيجة الاختبار الأسبوعي",
        body: h("div", {},
          h("section", { class: "card" },
            h("div", { class: "plan-top" },
              ring(score, { label: "نتيجة الاختبار", size: 100 }),
              h("div", {},
                h("p", {}, h("strong", {}, `${right} من ${answers.length}`), " إجابة صح"),
                diff === null
                  ? h("p", { class: "muted" }, "ده خط الأساس بتاعك. الاختبار الجاي هيقارن بيه.")
                  : h("p", { class: diff >= 0 ? "delta up" : "delta down" },
                      diff > 0 ? `+${diff}% عن آخر اختبار` : diff === 0 ? "نفس نتيجة آخر اختبار" : `${diff}% عن آخر اختبار`)))),

          h("section", { class: "card" },
            h("h2", { class: "card-title" }, "النتيجة بالتفصيل"),
            h("ul", { class: "result-rows" }, ORDER.filter(k => stats[k]).map(k => {
              const p = Math.round((stats[k].right / stats[k].total) * 100);
              const old = prev && prev.sections && prev.sections[k];
              const oldPct = old && old.total ? Math.round((old.right / old.total) * 100) : null;
              return h("li", {},
                h("span", {}, LABELS[k]),
                meter(p, LABELS[k], p < 70 ? "low" : ""),
                h("strong", {}, p + "%"),
                oldPct != null
                  ? h("span", { class: "delta small " + (p >= oldPct ? "up" : "down") }, (p - oldPct >= 0 ? "+" : "") + (p - oldPct))
                  : null);
            }))),

          wrong.length
            ? h("section", { class: "card" },
                h("h2", { class: "card-title" }, `مراجعة أخطاء الاختبار (${wrong.length})`),
                h("ol", { class: "mistake-list" }, wrong.map((a, n) => h("li", { class: "mistake" },
                  h("div", { class: "mk-head" },
                    h("span", { class: "mk-n", "aria-hidden": "true" }, String(n + 1)),
                    h("span", { class: "mk-tag" }, LABELS[a.it.section] || "")),
                  h("p", { class: "mk-q", dir: "auto" }, a.it.question || "سؤال استماع"),
                  h("p", { class: "mk-line wrong" }, h("span", { class: "mk-label" }, "إجابتك: "), h("span", { dir: "auto" }, a.choice)),
                  h("p", { class: "mk-line right" }, h("span", { class: "mk-label" }, "الصح: "), h("span", { dir: "auto" }, a.it.answer)),
                  a.it.lessonId && Catalog.lesson(a.it.lessonId)
                    ? h("a", { class: "link small", href: Router.href("/lesson/" + a.it.lessonId) }, "راجع درس: " + a.it.lessonTitle)
                    : null))))
            : h("p", { class: "all-right" }, "مفيش خطأ واحد في الاختبار. ممتاز."),

          h("div", { class: "actions" },
            h("a", { class: "btn primary", href: Router.href("/reports") }, "تقارير مهاراتي"),
            h("a", { class: "btn secondary", href: Router.href("/fix") }, "مراجعة الضعف"),
            h("a", { class: "btn secondary", href: Router.href("/") }, "لوحة التحكم")))
      });
      announce(`نتيجة الاختبار ${score} بالمئة`);
    }

    intro();
  }

  // ---------- تقارير المهارات ----------
  function trendBars(history) {
    return h("ul", { class: "trend" }, history.map((b, idx) => {
      const val = b.pct == null ? 0 : b.pct;
      const label = idx === history.length - 1 ? "الأسبوع ده" : `قبل ${history.length - 1 - idx} أسبوع`;
      return h("li", {},
        h("span", {
          class: "trend-bar" + (b.pct == null ? " empty" : b.pct < 70 ? " low" : ""),
          style: `height:${b.pct == null ? 6 : Math.max(10, val)}%`,
          role: "img", "aria-label": `${label}: ${b.pct == null ? "مفيش نشاط" : b.pct + "%"}`
        }),
        h("small", { "aria-hidden": "true" }, b.pct == null ? "—" : b.pct));
    }));
  }

  function sectionReport(section, state) {
    const stats = Store.skillStats(5)[section];
    const history = Store.sectionHistory(section, 4);
    const withData = history.filter(b => b.pct != null);
    const delta = withData.length >= 2 ? withData[withData.length - 1].pct - withData[withData.length - 2].pct : null;
    const errs = Store.errorCount(section);
    const weakLesson = Catalog.weakLessons(section, state, 1)[0];
    const current = stats && stats.total ? stats.pct : null;

    return h("section", { class: "card report" },
      h("div", { class: "report-head" },
        h("span", { class: "report-icon" }, icon(Catalog.SECTIONS.icons[section])),
        h("div", {},
          h("h2", {}, LABELS[section]),
          h("p", { class: "muted small" }, stats && stats.total
            ? `${stats.right} من ${stats.total} إجابة صح في آخر محاولاتك`
            : "لسه مفيش بيانات كفاية")),
        current != null
          ? h("span", { class: "report-pct " + (current < 70 ? "low" : "ok") }, current + "%")
          : h("span", { class: "report-pct" }, "—")),
      current != null ? meter(current, LABELS[section], current < 70 ? "low" : "") : null,
      h("div", { class: "report-body" },
        trendBars(history),
        h("div", { class: "report-notes" },
          delta != null
            ? h("p", { class: "delta " + (delta >= 0 ? "up" : "down") }, (delta > 0 ? "+" : "") + delta + "% عن الفترة اللي قبلها")
            : h("p", { class: "muted small" }, "محتاجين أسبوعين نشاط عشان نقارن."),
          h("p", { class: "muted small" }, errs ? `${errs} خطأ مسجّل في القسم ده` : "مفيش أخطاء مسجّلة هنا"),
          current != null && current < 70
            ? h("p", { class: "small" }, Catalog.SECTIONS.advice[section])
            : null)),
      h("div", { class: "actions" },
        errs ? h("a", { class: "btn secondary small", href: Router.href("/fix/" + section) }, "مراجعة الضعف") : null,
        errs ? h("a", { class: "btn secondary small", href: Router.href("/errors/" + section) }, "شوف الأخطاء") : null,
        weakLesson ? h("a", { class: "btn secondary small", href: Router.href("/lesson/" + weakLesson.lesson.id) }, "أعد: " + weakLesson.lesson.title) : null));
  }

  function reports() {
    const state = Store.load();
    const hist = Store.weeklyHistory().slice(-5).reverse();
    const rec = recommend(state);

    Shell.page({
      title: "تقارير المهارات",
      subtitle: "كل مهارة لوحدها: مستواك الحالي، اتجاهك آخر 4 أسابيع، وأخطاؤك المسجّلة.",
      body: h("div", {},
        h("section", { class: "card panel-box" },
          h("h2", { class: "card-title" }, "الخطوة المقترحة حسب نتايجك"),
          h("p", {}, h("strong", {}, rec.label), rec.sub ? h("span", { class: "muted" }, " · " + rec.sub) : null),
          h("p", { class: "muted small" }, rec.reason),
          h("a", { class: "btn primary", href: Router.href(rec.href) }, "ابدأ")),

        h("section", { class: "card" },
          h("div", { class: "card-head" },
            h("h2", { class: "card-title" }, "الاختبار الأسبوعي"),
            h("a", { class: "link", href: Router.href("/weekly") }, Store.weeklyDue() ? "ابدأ الاختبار" : "اختبار إضافي")),
          hist.length
            ? h("ul", { class: "weekly-list" }, hist.map((w, idx) => {
                const prev = hist[idx + 1];
                const d = prev ? w.score - prev.score : null;
                return h("li", {},
                  h("span", { class: "att-date" }, new Date(w.date).toLocaleDateString("ar-EG", { day: "numeric", month: "long" })),
                  meter(w.score, "نتيجة الاختبار", w.score < 70 ? "low" : ""),
                  h("strong", {}, w.score + "%"),
                  d != null ? h("span", { class: "delta small " + (d >= 0 ? "up" : "down") }, (d >= 0 ? "+" : "") + d) : null);
              }))
            : h("p", { class: "muted" }, Store.weeklyDue()
                ? "لسه مخدتش أول اختبار قياس. 25 سؤال وهيبقى عندك خط أساس."
                : "هيبقى متاح تاني بعد أسبوع من آخر اختبار.")),

        ORDER.map(k => sectionReport(k, state)),

        h("section", { class: "card" },
          h("div", { class: "card-head" },
            h("h2", { class: "card-title" }, "سجل الأخطاء المتكررة"),
            h("a", { class: "link", href: Router.href("/errors") }, "السجل كامل")),
          h("p", { class: "muted" }, Store.errorCount()
            ? `${Store.errorCount()} خطأ مسجّل، منهم ${Store.repeatedErrors().length} اتكرر أكتر من مرة.`
            : "مفيش أخطاء مسجّلة دلوقتي.")))
    });
  }

  return { recommend, showErrors, fix, weekly, reports, buildFix, buildWeekly, weakSections };
})();
