// شاشات التصفح: المسار كامل ← المستوى ← الوحدة ← تفاصيل الدرس
const Browse = (function () {
  const STATE_LABEL = { done: "مكتمل", open: "جارٍ", locked: "مقفول", soon: "قريباً" };

  function fmtDate(iso) {
    try { return new Date(iso).toLocaleDateString("ar-EG", { day: "numeric", month: "long" }); }
    catch (e) { return String(iso).slice(0, 10); }
  }

  function statusChip(st) {
    return h("span", { class: "chip-state " + st }, STATE_LABEL[st]);
  }

  // ---------- صف درس داخل قائمة ----------
  function lessonRow(entry, state) {
    const st = Catalog.status(entry, state);
    const best = state.completed[entry.id];
    const tile = st === "done" ? icon("check") : st === "open" ? String(entry.pos) : icon("lock");
    const note = st === "done" ? h("span", { class: "score-tag" }, best + "%")
      : st === "open" ? h("span", { class: "go" }, best != null ? "جرّب تاني" : "ابدأ")
      : st === "soon" ? h("span", { class: "muted small" }, "قريباً")
      : h("span", { class: "sr-only" }, "مقفول");

    const inner = [
      h("span", { class: "tile" }, tile),
      h("span", { class: "lesson-name" },
        h("strong", { dir: "auto" }, entry.title),
        entry.ar ? h("small", {}, entry.ar) : null),
      note
    ];

    if (st === "soon") {
      return h("li", { class: "soon" }, h("div", { class: "lesson-row soon" }, inner));
    }
    return h("li", {},
      h("a", {
        class: "lesson-row " + st,
        href: Router.href("/lesson/" + entry.id),
        "aria-label": `${entry.title}${entry.ar ? ", " + entry.ar : ""}, ${STATE_LABEL[st]}${best != null ? ", best score " + best + " percent" : ""}`
      }, inner));
  }

  function unitCard(unit, state, opts) {
    const p = Catalog.unitProgress(unit, state);
    const st = Catalog.unitStatus(unit, state);
    return h("section", { class: "unit" },
      h("div", { class: "unit-head" },
        h("div", { class: "unit-top" },
          h("h3", {},
            (opts && opts.link)
              ? h("a", { href: Router.href("/unit/" + unit.id) }, unit.title)
              : unit.title),
          statusChip(st)),
        h("div", { class: "unit-meta" },
          h("span", {}, st === "soon" ? `${lessonsLabel(unit.lessons.length)} مخططة` : `${p.done} من ${p.total}`),
          unit.goal ? h("span", { class: "muted" }, unit.goal) : null),
        meter(p.pct, "تقدمك في وحدة " + unit.title)),
      h("ul", { class: "lessons" }, unit.lessons.map(l => lessonRow(l, state))));
  }

  // ---------- المسار كامل ----------
  function showPath() {
    const state = Store.load();
    const all = Catalog.overall(state);
    const body = h("div", {},
      h("ol", { class: "road" }, Catalog.levels.map(level => {
        const p = Catalog.levelProgress(level, state);
        const st = Catalog.levelStatus(level, state);
        return h("li", { class: "road-step " + st },
          h("a", { class: "road-card", href: Router.href("/level/" + level.code) },
            h("span", { class: "road-code", dir: "ltr", lang: "en" }, level.code),
            h("span", { class: "road-main" },
              h("span", { class: "road-title" }, level.name, statusChip(st)),
              h("small", {}, level.short),
              meter(p.pct, `تقدم ${level.code}`),
              h("small", { class: "muted" }, st === "soon"
                ? `${lessonsLabel(level.units.reduce((n, u) => n + u.lessons.length, 0))} مخططة`
                : `${p.done} من ${p.total} درس · ${p.pct}%`))));
      })),
      h("p", { class: "muted" }, `Lessons unlock in order: you need ${Store.PASS}% on the final test to unlock the next one.`),
      Catalog.levels.map(level => {
        const st = Catalog.levelStatus(level, state);
        return h("section", { class: "level" },
          h("h2", { class: "level-title" },
            h("a", { class: "level-code", href: Router.href("/level/" + level.code), dir: "ltr", lang: "en" }, level.code),
            h("span", { class: "level-name" }, level.name),
            statusChip(st)),
          level.units.map(u => unitCard(u, state, { link: true })));
      }));

    Shell.page({
      title: "مسار التعلّم",
      subtitle: `من A1 لحد B2 · خلّصت ${all.done} من ${all.total} درس متاح`,
      body
    });
  }

  // ---------- صفحة مستوى ----------
  function showLevel(params) {
    const level = Catalog.level(String(params.code).toUpperCase());
    if (!level) return notFound();
    const state = Store.load();
    const p = Catalog.levelProgress(level, state);
    const st = Catalog.levelStatus(level, state);
    const next = level.units.reduce((acc, u) => acc || u.lessons.find(l => Catalog.status(l, state) === "open"), null);

    const body = h("div", {},
      h("section", { class: "card level-hero" },
        h("div", { class: "level-hero-main" },
          h("p", {}, level.about),
          level.can.length
            ? h("ul", { class: "can-do" }, level.can.map(c => h("li", {}, h("span", { class: "ck", "aria-hidden": "true" }, icon("check")), c)))
            : null,
          next ? h("a", { class: "btn primary", href: Router.href("/lesson/" + next.id) }, "كمّل: " + next.title) : null),
        h("div", { class: "level-hero-side" },
          ring(p.pct, { label: `تقدمك في ${level.code}`, size: 96 }),
          h("p", { class: "muted small" }, st === "soon" ? "قيد الإعداد" : `${p.done} من ${p.total} درس`))),
      level.units.map(u => unitCard(u, state, { link: true })));

    Shell.page({
      title: `${level.code} — ${level.name}`,
      eyebrow: "مستوى",
      subtitle: level.short,
      back: "/path",
      backLabel: "رجوع للمسار",
      body
    });
  }

  // ---------- صفحة وحدة ----------
  function showUnit(params) {
    const unit = Catalog.unit(params.id);
    if (!unit) return notFound();
    const state = Store.load();
    const p = Catalog.unitProgress(unit, state);
    const words = unit.lessons.reduce((n, l) => n + ((l.vocab || []).length), 0);

    const body = h("div", {},
      h("section", { class: "card unit-hero" },
        h("div", {},
          h("p", { class: "muted" }, unit.goal || `${unit.lessons.length} lessons in this unit${words ? ` and ${words} new words` : ""}.`),
          meter(p.pct, "تقدمك في الوحدة"),
          h("p", { class: "muted small" }, `${p.done} من ${p.total} درس مكتمل`))),
      h("ul", { class: "lessons big" }, unit.lessons.map(l => lessonRow(l, state))));

    Shell.page({
      title: unit.title,
      eyebrow: `وحدة · المستوى ${unit.level}`,
      back: "/level/" + unit.level,
      backLabel: "رجوع للمستوى",
      body
    });
  }

  // ---------- تفاصيل درس ----------
  function attemptsBlock(entry) {
    const list = Store.attempts(entry.id).slice().reverse();
    if (!list.length) return null;
    return h("section", { class: "card" },
      h("h2", { class: "card-title" }, "محاولاتك"),
      h("ul", { class: "attempts" }, list.map((a, i) => h("li", {},
        h("span", { class: "att-date" }, fmtDate(a.date)),
        meter(a.score, "نتيجة المحاولة", a.score >= Store.PASS ? "" : "low"),
        h("strong", { class: a.score >= Store.PASS ? "ok" : "no" }, a.score + "%"),
        i === 0 && a.mistakes ? h("span", { class: "muted small" }, `${a.mistakes} خطأ`) : null))));
  }

  function showLesson(params) {
    const entry = Catalog.lesson(params.id);
    if (!entry) return notFound();
    const state = Store.load();
    const st = Catalog.status(entry, state);
    const best = state.completed[entry.id];
    const blocker = entry.index > 0 ? Catalog.lessons[entry.index - 1] : null;

    const plan = [
      ["vocab", "5 أسئلة مفردات"],
      ["listening", "3 تمارين استماع"],
      ["conversation", "4 تمارين محادثة"],
      ["grammar", "5 أسئلة قواعد"],
      ["reading", "3 أسئلة فهم مقروء"],
      ["writing", "تمرينين كتابة"]
    ];

    const body = h("div", {},
      h("section", { class: "card lesson-hero" },
        h("div", { class: "lesson-hero-main" },
          withAr(h("p", { class: "explain" }, entry.explanation || "المحتوى قيد الإعداد."), entry.explanation),
          st === "open" || st === "done"
            ? h("div", { class: "actions" },
                h("a", { class: "btn primary", href: Router.href("/lesson/" + entry.id + "/run") },
                  st === "done" ? "أعد الدرس" : best != null ? "جرّب تاني" : "ابدأ الدرس"),
                h("a", { class: "btn secondary", href: Router.href("/lesson/" + entry.id + "/exam") }, "امتحان الدرس"),
                Catalog.lessonAfter(entry) && st === "done"
                  ? h("a", { class: "btn secondary", href: Router.href("/lesson/" + Catalog.lessonAfter(entry).id) }, "الدرس التالي")
                  : null)
            : st === "soon"
              ? h("div", { class: "callout info" }, icon("info"), h("p", {}, "الدرس ده مخطط ولسه المحتوى بتاعه بيتكتب."))
              : h("div", { class: "callout lock" }, icon("lock"),
                  h("p", {},
                    "الدرس مقفول. لازم تاخد ", Store.PASS + "% ",
                    blocker ? h("a", { href: Router.href("/lesson/" + blocker.id) }, "في درس " + blocker.title) : "في الدرس السابق",
                    " الأول."))),
        h("div", { class: "lesson-hero-side" },
          h("div", { class: "kv" }, h("span", {}, "المستوى"), h("strong", { dir: "ltr", lang: "en" }, entry.level)),
          h("div", { class: "kv" }, h("span", {}, "الوحدة"), h("a", { href: Router.href("/unit/" + entry.unitId) }, entry.unitTitle)),
          h("div", { class: "kv" }, h("span", {}, "كلمات جديدة"), h("strong", {}, String((entry.vocab || []).length))),
          h("div", { class: "kv" }, h("span", {}, "أعلى نتيجة"), h("strong", {}, best != null ? best + "%" : "—")))),

      (entry.vocab || []).length
        ? h("section", { class: "card" },
            h("h2", { class: "card-title" }, "كلمات الدرس"),
            h("ul", { class: "word-list" }, entry.vocab.map(w => h("li", { class: "word-item" },
              h("div", { class: "wi-main" },
                h("div", { class: "wi-en" },
                  en(w.en, "strong"),
                  Speech.supported
                    ? speakWithSlow("play tiny", "نطق " + w.en, slow => Speech.say(w.en, slow))
                    : null,
                  wordArNode(w.en)),
                h("div", { class: "wi-ar" }, w.ar),
                w.ex ? en(w.ex, "p", "wi-ex") : null, w.ex ? exArNode(w.ex) : null)))))
        : null,

      st !== "soon"
        ? h("section", { class: "card" },
            h("h2", { class: "card-title" }, "مكوّنات الدرس"),
            h("ul", { class: "plan" }, plan.map(([k, text]) => h("li", {},
              h("span", { class: "plan-icon", "aria-hidden": "true" }, icon(Catalog.SECTIONS.icons[k])),
              h("span", {}, h("strong", {}, Catalog.SECTIONS.labels[k] + ": "), text)))),
            h("p", { class: "muted small" }, `الامتحان بيتعمل في صفحة منفصلة: 10 أسئلة، ولازم ${Store.PASS}% عشان تعدّي.`))
        : null,

      attemptsBlock(entry));

    Shell.page({
      title: entry.title,
      eyebrow: `${entry.level} · ${entry.unitTitle} · الدرس ${entry.pos}`,
      subtitle: entry.ar || "",
      back: "/unit/" + entry.unitId,
      backLabel: "رجوع للوحدة",
      body
    });
  }

  function notFound() {
    Shell.page({
      title: "الصفحة مش موجودة",
      body: h("div", { class: "card" },
        h("p", {}, "الرابط ده مش موجود في التطبيق."),
        h("a", { class: "btn primary", href: Router.href("/") }, "الرجوع للوحة التحكم"))
    });
  }

  return { showPath, showLevel, showUnit, showLesson, notFound };
})();
