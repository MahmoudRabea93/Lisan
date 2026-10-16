// الخطة الشخصية: هدفك + وقتك اليومي ← مهام يومية بتتولد وبتتعدّل حسب أدائك
const Plan = (function () {
  const GOALS = {
    work:    { label: "الشغل", short: "إيميلات ومكالمات ومقابلات", icon: "write",   skills: ["writing", "conversation"] },
    travel:  { label: "السفر", short: "مطار وفندق واتجاهات وتسوّق", icon: "path",   skills: ["listening", "conversation"] },
    talk:    { label: "المحادثة", short: "تتكلم مع الناس بثقة", icon: "cards",      skills: ["conversation", "listening"] },
    general: { label: "الإنجليزي العام", short: "مستوى متوازن في كل المهارات", icon: "book", skills: [] }
  };
  const MINUTES = [
    { v: 10, label: "10 دقايق", note: "مهمة واحدة في اليوم" },
    { v: 20, label: "20 دقيقة", note: "مراجعة + درس" },
    { v: 30, label: "30 دقيقة", note: "مراجعة + درس + تدريب مركّز" }
  ];
  const WORD_MIN = 0.4;          // تقدير: كلمة مراجعة ≈ 24 ثانية

  function cfg(state) { return (state || Store.load()).plan; }
  function goalInfo(key) { return GOALS[key] || GOALS.general; }

  // ---------- توليد مهام اليوم ----------
  function reviewTask(due, cap) {
    const count = Math.max(1, Math.min(due, cap));
    return {
      kind: "review", id: "review", count,
      label: `مراجعة ${wordsLabel(count)}`,
      sub: "كلمات جه ميعادها النهاردة",
      minutes: Math.max(2, Math.round(count * WORD_MIN)),
      href: "/review/session", icon: "cards"
    };
  }
  function lessonTask(entry, state, kind) {
    const best = state.completed[entry.id];
    const retry = kind === "retry";
    return {
      kind: retry ? "retry" : "lesson", id: (retry ? "retry:" : "lesson:") + entry.id, lessonId: entry.id,
      label: (retry ? "أعد درس: " : "درس: ") + entry.title,
      sub: retry
        ? `أعلى نتيجة ليك ${best}% — محتاج ${Store.PASS}%`
        : `${entry.level} · ${entry.unitTitle}`,
      minutes: retry ? 10 : 12,
      href: "/lesson/" + entry.id + "/run", icon: "book"
    };
  }
  function drillTask(section, entry) {
    return {
      kind: "drill", id: "drill:" + section + ":" + entry.id, lessonId: entry.id, section,
      label: "تدريب مركّز: " + Catalog.SECTIONS.labels[section],
      sub: "أضعف مهارة عندك — أعد درس «" + entry.title + "»",
      minutes: 7,
      href: "/lesson/" + entry.id + "/run", icon: Catalog.SECTIONS.icons[section] || "target"
    };
  }
  function weeklyTask() {
    return {
      kind: "weekly", id: "weekly",
      label: "الاختبار الأسبوعي",
      sub: "12 سؤال من دروسك لقياس تحسنك",
      minutes: 8, href: "/weekly", icon: "trophy"
    };
  }
  function fixTask(count) {
    return {
      kind: "fix", id: "fix",
      label: "مراجعة الضعف",
      sub: `${count} خطأ اتكرر معاك + كلماتك الضعيفة`,
      minutes: 6, href: "/fix", icon: "target"
    };
  }
  // مهمة تواصل (استماع / محادثة / نطق / كتابة) حسب هدفك
  const COMM_ORDER = {
    work: ["writing", "scenario", "listening", "speaking"],
    travel: ["listening", "scenario", "speaking", "writing"],
    talk: ["scenario", "speaking", "listening", "writing"],
    general: ["listening", "scenario", "writing", "speaking"]
  };
  const COMM_META = {
    listening: { data: () => (typeof LISTENING !== "undefined" ? LISTENING : []), store: "listening", href: "/listen/", label: "استماع", icon: "speaker", minutes: 6 },
    scenario: { data: () => (typeof SCENARIOS !== "undefined" ? SCENARIOS : []), store: "scenarios", href: "/scenario/", label: "محادثة", icon: "cards", minutes: 7 },
    speaking: { data: () => (typeof SPEAK !== "undefined" ? SPEAK : []), store: "speaking", href: "/speak/", label: "نطق", icon: "speaker", minutes: 6 },
    writing: { data: () => (typeof WRITING !== "undefined" ? WRITING : []), store: "writing", href: "/write/", label: "كتابة", icon: "write", minutes: 9 }
  };
  function commTask(goal) {
    const order = COMM_ORDER[goal] || COMM_ORDER.general;
    for (const kind of order) {
      const meta = COMM_META[kind];
      const done = Store.getComm(meta.store);
      const list = meta.data();
      const pick = list.find(x => !done[x.id] && (!x.goal || x.goal === goal || goal === "general"))
        || list.find(x => !done[x.id]);
      if (pick) {
        return {
          kind: "comm", commKind: kind, id: "comm:" + kind + ":" + pick.id, itemId: pick.id,
          label: meta.label + ": " + pick.title,
          sub: (pick.ar || "") + " · مهارات التواصل",
          minutes: meta.minutes, href: meta.href + pick.id, icon: meta.icon
        };
      }
    }
    return null;
  }

  function goalTask(entry, goal) {
    return {
      kind: "goal", id: "goal:" + entry.id, lessonId: entry.id,
      label: "يخص هدفك: " + entry.title,
      sub: goalInfo(goal).label + " · " + entry.unitTitle,
      minutes: 8,
      href: "/lesson/" + entry.id + "/run", icon: goalInfo(goal).icon
    };
  }

  // أضعف مهارة، مع تفضيل مهارات هدفك
  function weakestSkill(state, goal) {
    const stats = Store.skillStats(3);
    const keys = Object.keys(stats).filter(k => stats[k].total >= 3 && stats[k].pct < 70);
    if (!keys.length) return null;
    const pref = goalInfo(goal).skills;
    keys.sort((a, b) => (pref.includes(b) - pref.includes(a)) || (stats[a].pct - stats[b].pct));
    return keys[0];
  }

  // درس متعدّي ويخص هدفك، للمراجعة
  function goalLesson(state, goal) {
    const done = Catalog.lessons.filter(l => Catalog.passed(l, state) && Catalog.lessonServesGoal(l, goal));
    if (!done.length) return null;
    // الأقدم مراجعةً: اللي أقل درجة الأول
    return done.sort((a, b) => (state.completed[a.id] || 0) - (state.completed[b.id] || 0))[0];
  }

  function build(state) {
    const plan = cfg(state);
    const minutes = plan.minutes;
    const goal = plan.goal;
    const tasks = [];
    const notes = [];
    const due = Store.dueWords().length;
    const next = Catalog.nextLesson(state);
    const failing = next && state.completed[next.id] != null && state.completed[next.id] < Store.PASS;
    const weak = weakestSkill(state, goal);
    const adh = Store.planAdherence(3);
    const light = adh.days >= 2 && adh.full === 0;      // مكمّلتش من يومين ← نخفف

    // 0) الاختبار الأسبوعي: مرة كل 7 أيام وله الأولوية
    const canTest = Catalog.overall(state).done >= 3;
    if (canTest && Store.weeklyDue()) {
      tasks.push(weeklyTask());
      notes.push("عدّى أسبوع (أو أكتر) على آخر اختبار قياس، فحطّيناه في خطة النهاردة.");
    }

    // 1) الدرس أو إعادته (الأولوية لو راسب فيه)
    const lessonFirst = failing;
    const lesson = next ? lessonTask(next, state, failing ? "retry" : "lesson") : null;
    if (failing) notes.push(`نتيجتك في «${next.title}» كانت ${state.completed[next.id]}%، فحطّيناه أول مهمة النهاردة.`);

    if (lessonFirst && lesson) tasks.push(lesson);

    // 2) المراجعة المتباعدة
    if (due) {
      const cap = minutes >= 30 ? 20 : minutes >= 20 ? 12 : 8;
      tasks.push(reviewTask(due, cap));
      if (due > cap) notes.push(`عندك ${wordsLabel(due)} مستحقة، قسّمناها على أكتر من يوم عشان تناسب وقتك.`);
    }

    // 3) الدرس (لو مادخلش أول)
    if (!lessonFirst && lesson) {
      if (minutes >= 20 || !tasks.length) tasks.push(lesson);
    }

    // 3.5) مراجعة الضعف: الأخطاء المتكررة أهم من درس جديد
    const repeated = Store.repeatedErrors().length;
    if (repeated >= 3 && minutes >= 20) {
      tasks.push(fixTask(repeated));
      notes.push(`فيه ${repeated} خطأ اتكرر معاك أكتر من مرة، فضفنا جلسة مراجعة ليهم وللكلمات الضعيفة.`);
    }

    // 4) تدريب مركّز على أضعف مهارة
    if (weak) {
      const target = Catalog.weakLessons(weak, state, 1)[0];
      if (target && !tasks.some(t => t.kind === "fix") && (minutes >= 30 || (minutes >= 20 && !due))) {
        tasks.push(drillTask(weak, target.lesson));
        notes.push(`أداؤك في ${Catalog.SECTIONS.labels[weak]} أقل من 70%، فضفنا تدريب مركّز عليه.`);
      }
    }

    // 5) مهمة تواصل تخدم هدفك (استماع أو محادثة أو نطق أو كتابة)
    if (minutes >= 20 && tasks.length < (minutes >= 30 ? 4 : 3)) {
      const c = commTask(goal);
      if (c) tasks.push(c);
    }

    // 6) درس متعدّي يخص هدفك (وقت طويل، ولسه فيه مساحة)
    if (minutes >= 30 && tasks.length < 3 && goal !== "general") {
      const g = goalLesson(state, goal);
      if (g) tasks.push(goalTask(g, goal));
    }

    // تخفيف لو الالتزام واقع
    if (light && tasks.length > 1) {
      tasks.length = 1;
      notes.push("خفّفنا خطة النهاردة لمهمة واحدة عشان ترجع تمسك الخيط. كمّل بزرار «زوّد مهمة» لو عندك وقت.");
    }

    if (!tasks.length) {
      notes.push("خلّصت كل الدروس المتاحة ومفيش كلمات مستحقة النهاردة. استريح أو راجع كلماتك.");
    }
    if (adh.days >= 5 && adh.full >= 5 && minutes < 30) {
      notes.push("ملتزم في كل الأيام تقريباً — تقدر تزوّد وقتك اليومي من إعدادات الخطة.");
    }

    return { date: Store.today(), goal, minutes, tasks, notes };
  }

  // خطة النهاردة (بتتولد مرة واحدة في اليوم وتتخزن)
  function today(state) {
    const s = state || Store.load();
    if (!s.plan) return null;
    if (s.planDay && s.planDay.date === Store.today() && s.planDay.minutes === s.plan.minutes && s.planDay.goal === s.plan.goal) {
      return s.planDay;
    }
    const day = build(s);
    Store.savePlanDay(day);
    return day;
  }

  // مهمة إضافية بعد ما تخلص (مش بتتولد تلقائي)
  function addExtra() {
    const s = Store.load();
    const day = today(s);
    if (!day) return;
    const existing = new Set(day.tasks.map(t => t.id));
    const candidates = [];
    const due = Store.dueWords().length;
    const next = Catalog.nextLesson(s);
    const c = commTask(day.goal);
    if (c) candidates.push(c);
    if (next) candidates.push(lessonTask(next, s, s.completed[next.id] != null && s.completed[next.id] < Store.PASS ? "retry" : "lesson"));
    if (due) candidates.push(reviewTask(due, 10));
    const weak = weakestSkill(s, day.goal);
    if (weak) {
      const t = Catalog.weakLessons(weak, s, 1)[0];
      if (t) candidates.push(drillTask(weak, t.lesson));
    }
    const g = goalLesson(s, day.goal);
    if (g) candidates.push(goalTask(g, day.goal));
    const pick = candidates.find(c => !existing.has(c.id) && !isDone(c, s).done);
    if (!pick) return false;
    day.tasks.push(pick);
    Store.savePlanDay(day);
    return true;
  }

  // ---------- حالة الإنجاز (بتتحسب من تقدمك الحقيقي، من غير علامات يدوية) ----------
  function isDone(task, state) {
    const s = state || Store.load();
    if (task.kind === "weekly") return { done: Store.weeklyToday(), score: Store.weeklyToday() ? Store.lastWeekly().score : null };
    if (task.kind === "fix") return { done: Store.fixesToday() > 0 };
    if (task.kind === "comm") {
      const t = Store.today();
      const hit = Store.sessions().find(x => x.id === task.itemId && String(x.date).slice(0, 10) === t);
      return { done: !!hit, score: hit ? hit.score : null };
    }
    if (task.kind === "review") {
      const n = Store.reviewedToday();
      return { done: n >= task.count, progress: Math.min(n, task.count), of: task.count };
    }
    const tries = Store.attemptsOn(task.lessonId);
    if (!tries.length) return { done: false };
    const best = Math.max(...tries.map(a => a.score));
    if (task.kind === "lesson" || task.kind === "retry") {
      return { done: best >= Store.PASS, score: best, partial: best < Store.PASS };
    }
    return { done: true, score: best };
  }

  function progress(day, state) {
    const s = state || Store.load();
    const done = day.tasks.filter(t => isDone(t, s).done).length;
    return { done, total: day.tasks.length, pct: pct(done, day.tasks.length) };
  }

  // ---------- عرض ----------
  function taskRow(task, state, compact) {
    const st = isDone(task, state);
    const cls = st.done ? "done" : st.partial || st.progress ? "part" : "todo";
    const mark = st.done ? icon("check") : icon(task.icon || "book");
    const status = st.done
      ? h("span", { class: "task-state ok" }, st.score != null ? `تمام · ${st.score}%` : "تمام")
      : st.progress
        ? h("span", { class: "task-state" }, `${st.progress} من ${st.of}`)
        : st.partial
          ? h("span", { class: "task-state" }, `${st.score}% — محتاج ${Store.PASS}%`)
          : h("span", { class: "task-state" }, `${task.minutes} دقيقة`);

    return h("li", { class: "task " + cls },
      h("a", { class: "task-link", href: Router.href(task.href) },
        h("span", { class: "task-icon" }, mark),
        h("span", { class: "task-main" },
          h("strong", { dir: "auto" }, task.label),
          compact ? null : h("small", {}, task.sub)),
        status));
  }

  // كارت مختصر في لوحة التحكم
  function card(state) {
    const s = state || Store.load();
    if (!s.plan) {
      return h("section", { class: "card plan-card empty" },
        h("h2", { class: "card-title" }, "خطتك الشخصية"),
        h("p", {}, "حدّد هدفك ووقتك اليومي، والتطبيق هيعمل لك خطة يومية من الدروس والمراجعات وبيعدّلها حسب أدائك."),
        h("a", { class: "btn primary", href: Router.href("/plan/setup") }, "اعمل خطتي"));
    }
    const day = today(s);
    const p = progress(day, s);
    Store.logPlan(p.done, p.total);
    const g = goalInfo(day.goal);
    return h("section", { class: "card plan-card" },
      h("div", { class: "card-head" },
        h("h2", { class: "card-title" }, "خطة النهاردة"),
        h("a", { class: "link", href: Router.href("/plan") }, "الخطة بالتفصيل")),
      h("p", { class: "plan-meta" },
        h("span", { class: "goal-pill" }, icon(g.icon), g.label),
        h("span", { class: "muted" }, `${day.minutes} دقيقة في اليوم`),
        h("span", { class: "muted small plan-count" }, p.total
          ? `${p.done} من ${p.total} ${p.total === 2 ? "مهمتين" : "مهام"} خلصت`
          : "مفيش مهام مطلوبة النهاردة.")),
      meter(p.pct, "تقدمك في خطة النهاردة"),
      h("ul", { class: "tasks" }, day.tasks.map(t => taskRow(t, s, true))),
      p.total && p.done === p.total
        ? h("p", { class: "all-done" }, "خلّصت خطة النهاردة. شغل حلو.")
        : null);
  }

  // ---------- شاشة الخطة ----------
  function show() {
    const s = Store.load();
    if (!s.plan) return setup();
    const day = today(s);
    const p = progress(day, s);
    Store.logPlan(p.done, p.total);
    const g = goalInfo(day.goal);
    const adh = Store.planAdherence(7);
    // وحدات الهدف: اللي لسه مخلصتهاش الأول
    const units = Catalog.unitsForGoal(day.goal)
      .map(u => ({ u, p: Catalog.unitProgress(u, s) }))
      .sort((a, b) => (a.p.pct === 100) - (b.p.pct === 100))
      .slice(0, 5)
      .map(x => x.u);
    const remaining = day.tasks.filter(t => !isDone(t, s).done);

    Shell.page({
      title: "خطتي اليومية",
      eyebrow: "خطة شخصية",
      subtitle: `${g.label} · ${day.minutes} دقيقة في اليوم`,
      body: h("div", {},
        h("section", { class: "card" },
          h("div", { class: "plan-top" },
            ring(p.pct, { label: "إنجاز خطة النهاردة", size: 92 }),
            h("div", {},
              h("p", {}, h("strong", {}, `${p.done} من ${p.total}`), " مهمة خلصت النهاردة"),
              h("p", { class: "muted small" }, remaining.length
                ? `باقي ${remaining.length === 1 ? "مهمة واحدة" : remaining.length + " مهام"} ≈ ${remaining.reduce((n, t) => n + t.minutes, 0)} دقيقة`
                : "خلّصت كل المهام. تقدر تزوّد مهمة لو عندك وقت."))),
          h("ul", { class: "tasks big" }, day.tasks.map(t => taskRow(t, s))),
          h("div", { class: "actions" },
            h("button", {
              class: "btn secondary", type: "button",
              onclick: () => { Plan.addExtra() ? Router.render() : announce("مفيش مهام إضافية متاحة دلوقتي"); }
            }, "زوّد مهمة"),
            h("a", { class: "btn secondary", href: Router.href("/plan/setup") }, "عدّل الهدف والوقت"))),

        day.notes.length
          ? h("section", { class: "card" },
              h("h2", { class: "card-title" }, "ليه الخطة دي؟"),
              h("ul", { class: "why-list" }, day.notes.map(n => h("li", {},
                h("span", { class: "tip-icon", "aria-hidden": "true" }, icon("bulb")), h("span", {}, n)))))
          : null,

        h("section", { class: "card" },
          h("h2", { class: "card-title" }, "التزامك آخر 7 أيام"),
          adh.days
            ? h("div", {},
                h("ul", { class: "adh" },
                  h("li", {}, h("strong", {}, String(adh.full)), h("span", {}, "يوم كامل")),
                  h("li", {}, h("strong", {}, String(adh.partial)), h("span", {}, "يوم جزئي")),
                  h("li", {}, h("strong", {}, String(adh.none)), h("span", {}, "يوم فايت"))),
                h("p", { class: "muted small" }, adh.full >= 5
                  ? "التزام ممتاز. تقدر تزوّد وقتك اليومي."
                  : "المهم الاستمرار: يوم ناقص أحسن من يوم فايت."))
            : h("p", { class: "muted" }, "لسه بدري. ابدأ خطة النهاردة وهتشوف التزامك هنا.")),

        units.length
          ? h("section", { class: "card" },
              h("h2", { class: "card-title" }, "وحدات تخدم هدفك"),
              h("ul", { class: "goal-units" }, units.map(u => {
                const up = Catalog.unitProgress(u, s);
                return h("li", {},
                  h("a", { href: Router.href("/unit/" + u.id) }, u.title),
                  h("span", { class: "muted small" }, `${u.level} · ${up.done} من ${up.total}`));
              })))
          : null)
    });
  }

  // ---------- شاشة الإعداد ----------
  function setup() {
    const s = Store.load();
    let goal = (s.plan && s.plan.goal) || "general";
    let minutes = (s.plan && s.plan.minutes) || 20;

    function radio(name, value, checked, title, note, iconName) {
      const input = h("input", { type: "radio", name, value, id: name + "-" + value, checked: checked || null, class: "sr-only" });
      input.addEventListener("change", () => {
        if (name === "goal") goal = value; else minutes = Number(value);
        // تحديد بصري من غير الاعتماد على :has
        document.querySelectorAll(`input[name="${name}"]`).forEach(x => {
          if (x.closest(".pick")) x.closest(".pick").classList.toggle("on", x.checked);
        });
      });
      return h("label", { class: "pick" + (checked ? " on" : ""), for: name + "-" + value },
        input,
        h("span", { class: "pick-icon", "aria-hidden": "true" }, icon(iconName)),
        h("span", { class: "pick-main" },
          h("strong", {}, title),
          h("small", {}, note)));
    }

    function save() {
      Store.setPlan(goal, minutes);
      announce("اتحفظت الخطة");
      Router.go("/plan");
    }

    Shell.page({
      title: s.plan ? "عدّل خطتك" : "خطتك الشخصية",
      back: s.plan ? "/plan" : "/",
      subtitle: "سؤالين بس، وتقدر تغيّرهم في أي وقت.",
      body: h("div", {},
        h("section", { class: "card" },
          h("fieldset", { class: "pick-set" },
            h("legend", { class: "card-title" }, "إيه هدفك من الإنجليزي؟"),
            h("div", { class: "pick-grid" },
              Object.entries(GOALS).map(([key, g]) => radio("goal", key, key === goal, g.label, g.short, g.icon))))),
        h("section", { class: "card" },
          h("fieldset", { class: "pick-set" },
            h("legend", { class: "card-title" }, "هتذاكر كام دقيقة في اليوم؟"),
            h("div", { class: "pick-grid" },
              MINUTES.map(m => radio("minutes", String(m.v), m.v === minutes, m.label, m.note, "clock"))))),
        h("div", { class: "actions" },
          h("button", { class: "btn primary", type: "button", onclick: save }, s.plan ? "احفظ التعديل" : "ابدأ الخطة"),
          s.plan
            ? h("button", {
                class: "btn danger", type: "button",
                onclick: () => { if (confirm("توقف الخطة الشخصية؟")) { Store.clearPlan(); Router.go("/"); } }
              }, "إيقاف الخطة")
            : h("a", { class: "btn secondary", href: Router.href("/") }, "مش دلوقتي")))
    });
  }

  return { GOALS, MINUTES, show, setup, card, today, build, addExtra, isDone, progress, goalInfo };
})();
