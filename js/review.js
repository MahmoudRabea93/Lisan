// المراجعة المتباعدة (ليتنر): كلمات جاهزة اليوم، 10 في الجلسة
const Review = (function () {
  const SESSION = 10;

  // صفحة المراجعة: بطاقات اليوم + أدوات التعلّم الذكي في مكان واحد
  function hub() {
    const due = Store.dueWords().length;
    const total = Store.wordCount();
    const errs = Store.errorCount();
    const repeated = Store.repeatedErrors().length;
    const last = Store.lastWeekly();

    function row(href, iconName, title, sub, state) {
      return h("li", {}, h("a", { class: "task-link", href: Router.href(href) },
        h("span", { class: "task-icon" }, icon(iconName)),
        h("span", { class: "task-main" }, h("strong", {}, title), h("small", {}, sub)),
        h("span", { class: "task-state" }, state)));
    }

    Shell.page({
      title: "المراجعة",
      subtitle: "كل حاجة بتثبّت اللي اتعلمته في مكان واحد.",
      body: h("div", {},
        h("section", { class: "card review-hub" },
          h("div", { class: "review-due" },
            due
              ? h("div", { class: "review-due-main" },
                  h("span", { class: "review-count" }, String(due)),
                  h("div", { class: "review-due-text" },
                    h("strong", {}, "بطاقات النهاردة"),
                    h("span", { class: "review-label" }, "كلمة جه ميعادها")))
              : h("div", { class: "review-due-text" },
                  h("strong", {}, "بطاقات النهاردة"),
                  h("span", { class: "muted" }, total
                    ? "خلّصت مراجعة النهاردة. الكلمات بترجع لك في وقتها."
                    : "الكلمات بتتضاف هنا بعد كل درس.")),
            due ? h("a", { class: "btn primary", href: Router.href("/review/session") }, "ابدأ المراجعة") : null),
          h("h2", { class: "card-title review-tools-title" }, "أدوات التثبيت"),
          h("ul", { class: "tasks" },
            row("/fix", "target", "مراجعة الضعف", "أخطاؤك المتكررة وكلماتك الضعيفة", errs ? `${errs} خطأ` : "نضيف"),
            row("/weekly", "trophy", "الاختبار الأسبوعي", last ? `آخر نتيجة ${last.score}%` : "لقياس تحسنك", Store.weeklyDue() ? "متاح" : "بعد شوية أيام"),
            row("/errors", "info", "سجل الأخطاء", "كل خطأ وسببه وعدد مرات تكراره", repeated ? `${repeated} متكرر` : "—"),
            row("/reports", "chart", "تقارير المهارات", "مستواك واتجاهك في كل مهارة", "شوف"),
            row("/words", "star", "كلماتي", "كل الكلمات المحفوظة ومستوى حفظها", total ? `${total}` : "—"))))
    });
  }

  function start(handlers) {
    const pool = Object.entries(Store.load().review).map(([word, v]) => ({ en: word, ar: v.ar }));
    const due = shuffle(Store.dueWords()).slice(0, SESSION);

    if (!due.length) {
      const total = Store.wordCount();
      Shell.page({
        title: "مفيش كلمات للمراجعة دلوقتي",
        subtitle: total
          ? "خلّصت مراجعة النهاردة. الكلمات بترجع لك في وقتها حسب مستوى حفظك لها."
          : "الكلمات بتتضاف بعد ما تخلّص كل درس.",
        body: h("div", { class: "card" },
          h("div", { class: "actions" },
            h("a", { class: "btn primary", href: Router.href("/") }, "لوحة التحكم"),
            total ? h("a", { class: "btn secondary", href: Router.href("/words") }, "كل كلماتي") : null))
      });
      return;
    }

    const queue = due.map(w => ({ ...w, retry: false }));
    const total = due.length;
    let graded = 0;
    let right = 0;

    show();

    function show() {
      if (!queue.length) return summary();
      const item = queue.shift();
      // الكلمات الجديدة: إنجليزي ← عربي. اللي اتثبتت: عربي ← إنجليزي
      const toArabic = item.box <= 2;
      const answer = toArabic ? item.ar : item.en;
      const wrong = [...new Set(shuffle(pool.filter(p => p.en !== item.en))
        .map(p => (toArabic ? p.ar : p.en)).filter(t => t !== answer))].slice(0, 3);

      const exText = h("span", {});
      const exBox = h("p", { class: "example", dir: "ltr", lang: "en", hidden: true }, exText, speakWithSlow("play tiny", "نطق الجملة", slow => Speech.say(exText.textContent, slow)));
      const feedback = h("div", { class: "feedback", role: "status", "aria-live": "polite" });
      const nextBtn = h("button", { class: "btn primary wide", type: "button", hidden: true }, "التالي");

      const list = optionList([answer, ...wrong], answer, ok => {
        if (!item.retry) {
          Store.gradeWord(item.en, ok);
          graded++;
          if (ok) right++;
        }
        if (!ok && !item.retry) queue.push({ ...item, retry: true });
        showFeedback(feedback, ok, answer);
        const example = (Vocab.find(item.en) || {}).ex;
        if (example) { exText.textContent = example; exBox.hidden = false; }
        if (!toArabic) Speech.say(item.en);
        nextBtn.hidden = false;
        nextBtn.focus();
      });
      nextBtn.addEventListener("click", show);
      onKey(e => {
        if (/^[1-9]$/.test(e.key)) list.pick(Number(e.key) - 1);
        else if (e.key === "Enter" && e.target.tagName !== "BUTTON" && !nextBtn.hidden) nextBtn.click();
      });

      const speak = Speech.supported
        ? speakWithSlow("play small", "شغّل النطق", slow => Speech.say(item.en, slow))
        : null;
      if (toArabic) setTimeout(() => Speech.say(item.en), 300);

      mount(h("main", { class: "screen" },
        h("div", { class: "topbar" },
          h("button", { class: "close", type: "button", "aria-label": "خروج", onclick: handlers.onExit }, icon("close")),
          h("div", { class: "topbar-main" },
            h("div", { class: "topbar-row" },
              h("strong", {}, "المراجعة"),
              h("span", {}, `${Math.min(graded + 1, total)} / ${total}`)),
            h("div", {
              class: "progress", role: "progressbar", "aria-label": "تقدمك في المراجعة",
              "aria-valuemin": "0", "aria-valuemax": String(total), "aria-valuenow": String(graded)
            }, h("span", { style: `width:${(graded / total) * 100}%` })))),
        h("p", { class: "prompt" }, toArabic ? "ما معنى الكلمة دي؟" : "اختار الكلمة بالإنجليزي"),
        toArabic
          ? h("div", { class: "word-row" }, en(item.en, "p", "word"), speak)
          : h("p", { class: "word" }, item.ar),
        list.node, exBox,
        h("div", { class: "step-bar" }, feedback, nextBtn)), { announce: false });
    }

    function summary() {
      Store.addXp(right * 2);
      Store.recordReview(total);
      const remaining = Store.dueWords().length;
      Shell.page({
        title: "خلّصت المراجعة",
        subtitle: `راجعت ${wordsLabel(total)}، ${right} منها صح من أول مرة.`,
        body: h("div", { class: "card" },
          h("p", { class: "muted" }, remaining
            ? `لسه ${wordsLabel(remaining)} جاهزة للمراجعة.`
            : "مفيش كلمات تانية للمراجعة النهاردة."),
          h("div", { class: "actions" },
            remaining
              ? h("button", { class: "btn primary", type: "button", onclick: () => start(handlers) }, "كمّل المراجعة")
              : null,
            h("a", { class: "btn " + (remaining ? "secondary" : "primary"), href: Router.href("/") }, "لوحة التحكم")))
      });
    }
  }

  return { start, hub };
})();
