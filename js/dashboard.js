// الشاشة الرئيسية: خطوة واحدة واضحة فوق، وخطة النهاردة، والتفاصيل بتظهر لما يبقى فيها بيانات
const Dashboard = (function () {
  const DAY_SHORT = ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];

  // ---------- الخطوة المقترحة ----------
  function mainCard(state) {
    const rec = Smart.recommend(state);
    const next = rec.lesson || Catalog.nextLesson(state);
    const isLesson = rec.kind === "lesson" || rec.kind === "retry";

    return h("section", { class: "hero", "aria-labelledby": "hero-t" },
      h("div", { class: "hero-text" },
        h("p", { class: "hero-meta" },
          isLesson ? (Object.keys(state.completed).length ? "كمّل من حيث وقفت" : "ابدأ من هنا") : "الخطوة المقترحة",
          isLesson && next ? h("span", { class: "level-pill" }, next.level) : null,
          isLesson && next ? h("span", { class: "hero-unit" }, next.unitTitle) : null),
        h("h2", { class: "hero-title", id: "hero-t", dir: "auto" }, isLesson && next ? next.title : rec.label),
        h("p", { class: "hero-sub" }, rec.reason)),
      h("div", { class: "hero-actions" },
        h("a", { class: "btn sun", href: Router.href(rec.href) }, isLesson ? "ابدأ الدرس" : "ابدأ"),
        isLesson && next
          ? h("a", { class: "link on-sun", href: Router.href("/lesson/" + next.id) }, "تفاصيل الدرس")
          : next ? h("a", { class: "link on-sun", href: Router.href("/lesson/" + next.id) }, "أو كمّل درس: " + next.title) : null));
  }

  // ---------- سطر الإحصائيات ----------
  function statsStrip(state) {
    const t = Store.totals();
    const items = [
      [Store.liveStreak(state), "يوم متتالي"],
      [state.xp, "نقطة"],
      [t.lessonsPassed, "درس ناجح"],
      [Store.wordCount(), "كلمة"]
    ];
    return h("section", { class: "stats-strip" }, items.map(([v, label]) =>
      h("span", { class: "stat-mini" }, h("strong", {}, String(v)), h("span", {}, label))));
  }

  // ---------- تقدمك ----------
  function progressCard(state) {
    const all = Catalog.overall(state);
    const t = Store.totals();
    return h("section", { class: "card" },
      h("h2", { class: "card-title" }, "تقدمك"),
      h("div", { class: "progress-main" },
        ring(all.pct, { label: "نسبة إنجاز الدروس", size: 92 }),
        h("div", { class: "progress-facts" },
          h("p", {}, h("strong", {}, `${all.done} من ${all.total}`), " درس خلّصته"),
          h("p", { class: "muted small" }, `متوسط درجاتك ${t.avgScore}%`))));
  }

  function levelStrip(state) {
    return h("section", { class: "card" },
      h("div", { class: "card-head" },
        h("h2", { class: "card-title" }, "مسارك"),
        h("a", { class: "link", href: Router.href("/path") }, "كل الدروس")),
      h("ol", { class: "level-strip" }, Catalog.levels.map(level => {
        const p = Catalog.levelProgress(level, state);
        const st = Catalog.levelStatus(level, state);
        const label = { done: "مكتمل", open: "جارٍ", locked: "مقفول", soon: "قريباً" }[st];
        return h("li", {},
          h("a", { class: "level-chip " + st, href: Router.href("/level/" + level.code) },
            h("span", { class: "lc-top" },
              h("b", { dir: "ltr", lang: "en" }, level.code),
              h("span", { class: "lc-state" }, label)),
            h("span", { class: "lc-name" }, level.name),
            meter(p.pct, `تقدم المستوى ${level.code}`),
            h("small", {}, st === "soon" ? "قيد الإعداد" : `${p.done} من ${p.total}`)));
      })));
  }

  function activityCard() {
    const series = Store.dailySeries(7);
    if (!series.some(d => d.active)) return null;
    const max = Math.max(20, ...series.map(d => d.xp));
    return h("section", { class: "card" },
      h("h2", { class: "card-title" }, "نشاط الأسبوع"),
      h("ul", { class: "spark", role: "list" }, series.map(d => {
        const day = DAY_SHORT[new Date(d.date + "T00:00:00").getDay()];
        const height = d.xp ? Math.max(8, Math.round((d.xp / max) * 100)) : 4;
        return h("li", { class: "spark-col" },
          h("span", {
            class: "spark-bar" + (d.active ? " on" : ""), style: `height:${height}%`,
            role: "img", "aria-label": `${day}: ${d.xp} نقطة`
          }),
          h("small", { "aria-hidden": "true" }, Language.t(day).slice(0, 3)));
      })));
  }

  function skillsCard(state) {
    const stats = Store.skillStats(3);
    const keys = Catalog.SECTIONS.order.filter(k => stats[k] && stats[k].total >= 3);
    if (!keys.length) return null;
    const weak = keys.filter(k => stats[k].pct < 70).sort((a, b) => stats[a].pct - stats[b].pct)[0];
    return h("section", { class: "card" },
      h("div", { class: "card-head" },
        h("h2", { class: "card-title" }, "مهاراتك"),
        h("a", { class: "link", href: Router.href("/reports") }, "التقارير")),
      h("ul", { class: "skill-rows" }, keys.map(k => h("li", {},
        h("span", { class: "skill-name" }, icon(Catalog.SECTIONS.icons[k]), Catalog.SECTIONS.labels[k]),
        meter(stats[k].pct, Catalog.SECTIONS.labels[k], stats[k].pct < 70 ? "low" : ""),
        h("strong", {}, stats[k].pct + "%")))),
      weak
        ? h("div", { class: "tip" },
            h("span", { class: "tip-icon", "aria-hidden": "true" }, icon("bulb")),
            h("div", {},
              h("p", {}, h("strong", {}, "ركّز على " + Catalog.SECTIONS.labels[weak] + ": "), Catalog.SECTIONS.advice[weak]),
              h("a", { class: "link", href: Router.href("/fix") }, "ابدأ مراجعة الضعف")))
        : null);
  }

  function reviewCard() {
    const due = Store.dueWords().length;
    const total = Store.wordCount();
    if (!total) return null;
    return h("section", { class: "card" },
      h("div", { class: "card-head" },
        h("h2", { class: "card-title" }, "المراجعة"),
        h("a", { class: "link", href: Router.href("/review") }, "كل الأدوات")),
      due
        ? [h("p", { class: "review-count" }, String(due)),
           h("p", { class: "review-label" }, "كلمة جه ميعادها النهاردة"),
           h("a", { class: "btn primary", href: Router.href("/review/session") }, "ابدأ المراجعة")]
        : h("p", { class: "muted" }, `خلّصت مراجعة النهاردة. عندك ${wordsLabel(total)} محفوظة.`));
  }

  // كارت صغير للمستخدم الجديد بس
  function startHereCard(state) {
    if (state.placement) return null;
    return h("section", { class: "card" },
      h("h2", { class: "card-title" }, "مش متأكد من مستواك؟"),
      h("p", { class: "muted" }, "اختبار قصير (25 سؤال) بيحدد نقطة البداية ويفتح لك اللي أنت عارفه."),
      h("a", { class: "btn secondary", href: Router.href("/placement") }, "اختبار تحديد المستوى"));
  }

  function planPrompt() {
    return h("section", { class: "card plan-card empty" },
      h("h2", { class: "card-title" }, "خطتك اليومية"),
      h("p", {}, "حدّد هدفك ووقتك، والتطبيق هيرتّب لك مهام كل يوم ويعدّلها حسب أدائك."),
      h("a", { class: "btn secondary", href: Router.href("/plan/setup") }, "اعمل خطتي"));
  }

  function show() {
    const state = Store.load();
    const started = Object.keys(state.completed).length > 0 || state.xp > 0;

    const details = started
      ? h("div", { class: "grid-2" },
          h("div", { class: "col" }, progressCard(state), levelStrip(state), skillsCard(state)),
          h("div", { class: "col" }, reviewCard(), activityCard(), startHereCard(state)))
      : startHereCard(state);

    Shell.page({
      title: "الرئيسية",
      hideHead: true,
      body: h("div", { class: "dash" },
        h("h1", { class: "sr-only", tabindex: "-1", "data-focus": "" }, "الرئيسية"),
        mainCard(state),
        state.plan ? Plan.card(state) : planPrompt(),
        started ? statsStrip(state) : null,
        details,
        h("footer", { class: "dash-foot" },
          started ? h("a", { class: "link", href: Router.href("/reports") }, "تقارير المهارات") : null))
    });
  }

  return { show };
})();
