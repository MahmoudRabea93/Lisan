// تشغيل الدرس: شرح وكلمات ← 6 أقسام تدريب ← اختبار نهائي ← نتيجة مفصّلة بشرح كل خطأ
const Lesson = (function () {
  const LABELS = Catalog.SECTIONS.labels;
  const ORDER = Catalog.SECTIONS.order;
  const ADVICE = Catalog.SECTIONS.advice;
  const XP_PRACTICE = 2;
  const XP_FINAL = 10;

  // mode: "learn" = التمارين بس، "exam" = امتحان الدرس لوحده
  function run(lesson, handlers, mode) {
    const plan = Builder.build(lesson, Speech.supported);
    const steps = plan.steps;
    const exam = mode === "exam";
    const startAt = exam ? plan.finalStart : 0;
    const endAt = exam ? steps.length : plan.finalStart;
    let i = startAt;
    let finalIntroShown = false;
    const stats = {};
    let finalRight = 0, finalTotal = 0, practiceRight = 0, practiceTotal = 0;
    const missed = new Map();
    const mistakes = [];

    if (exam) { finalIntroShown = true; showFinalIntro(); }
    else showIntro();

    // ---------- شرح الخطأ ----------
    function sentenceFor(passage, answer) {
      const parts = String(passage).split(/(?<=[.!?])\s+/);
      const key = normText(answer).split(" ").filter(w => w.length > 2);
      let best = null, bestHits = 0;
      parts.forEach(p => {
        const t = normText(p);
        const hits = key.filter(w => t.includes(w)).length;
        if (hits > bestHits) { bestHits = hits; best = p; }
      });
      return bestHits ? best.trim() : null;
    }

    function whyOf(step) {
      if (step.why) return step.why;
      switch (step.section) {
        case "vocab": {
          const w = step.word;
          if (!w) return lesson.explanation;
          const full = Vocab.find(w.en) || w;
          return `«${w.en}» معناها «${w.ar}»` + (full.ex ? ` — مثال: ${full.ex}` : "");
        }
        case "listening":
          if (step.type === "dictation") return "الجملة كاملة: " + step.full;
          if (step.type === "listenQ") return "من الحوار: " + (step.lines || []).map(l => l.who + ": " + l.text).join(" / ");
          return "الجملة اللي اتقالت: " + (step.say || step.answer);
        case "conversation":
          if (step.type === "order") return "ترتيب الحوار الصحيح: " + (step.answerShow || step.answer);
          return `الرد الطبيعي هنا: "${step.answer}"`;
        case "reading": {
          const s = step.passage ? sentenceFor(step.passage, step.answer) : null;
          return s ? "الإجابة من النص: " + s : "ارجع للنص وركّز على الجملة اللي فيها كلمات السؤال.";
        }
        case "writing":
          if (step.type === "order") return "الجملة الصحيحة: " + step.answer;
          return `الجملة لازم تحتوي «${step.must}» وتكون 3 كلمات على الأقل` + (step.model ? ` — مثال: ${step.model}` : "");
        default:
          return lesson.explanation;
      }
    }

    // الإجابة المتوقّعة للعرض والتسجيل (أسئلة الكتابة مالهاش إجابة واحدة)
    function expectedOf(step) {
      if (step.answer != null) return step.answer;
      if (step.type === "write") return step.model || `جملة تستخدم «${step.must}»`;
      return "—";
    }

    function questionOf(step) {
      if (step.type === "dictation") return "إملاء: " + step.shown;
      if (step.type === "listen") return "اسمع واختار الجملة اللي سمعتها";
      if (step.type === "order") return step.prompt || step.hint || "رتّب الكلمات لتكوّن جملة صحيحة";
      if (step.type === "write") return step.prompt;
      return step.question || step.prompt || "";
    }

    function addMistake(step, your, correct, extra) {
      correct = correct != null ? correct : expectedOf(step);
      mistakes.push(Object.assign({
        section: step.section,
        phase: step.phase,
        type: step.type || "choice",
        options: step.options ? step.options.slice() : null,
        word: step.word || null,
        question: questionOf(step),
        your: your && String(your).trim() ? String(your) : "(من غير إجابة)",
        correct: correct != null ? correct : step.answer,
        why: whyOf(step),
        speak: typeof (correct != null ? correct : step.answer) === "string" && /[A-Za-z]/.test(correct != null ? correct : step.answer)
      }, extra || {}));
    }

    // ---------- عناصر مشتركة ----------
    function exit() {
      if (i > startAt && i < endAt && !confirm("تخرج من الدرس؟ تقدمك في التمارين دي هيضيع.")) return;
      handlers.onExit();
    }

    function topBar() {
      return h("div", { class: "topbar" },
        h("button", { class: "close", type: "button", "aria-label": "خروج من الدرس", onclick: exit }, icon("close")),
        h("div", { class: "topbar-main" },
          h("div", { class: "topbar-row" },
            h("strong", { dir: "auto" }, lesson.title),
            h("span", {}, `${Math.min(i - startAt + 1, endAt - startAt)} / ${endAt - startAt}`)),
          h("div", {
            class: "progress", role: "progressbar", "aria-label": "تقدمك في الدرس",
            "aria-valuemin": "0", "aria-valuemax": String(endAt - startAt), "aria-valuenow": String(i - startAt)
          }, h("span", { style: `width:${((i - startAt) / (endAt - startAt)) * 100}%` }))));
    }

    function tag(s) {
      return h("p", { class: "section-tag" }, s.phase === "final"
        ? `الاختبار النهائي ${s.idx + 1} من ${s.total}`
        : `${LABELS[s.section]} ${s.idx + 1} من ${s.total}`);
    }

    function feedbackBox() { return h("div", { class: "feedback", role: "status", "aria-live": "polite" }); }
    function button(text, cls, fn, hidden) {
      return h("button", { class: "btn " + cls, type: "button", hidden: !!hidden, onclick: fn }, text);
    }
    function bar(...kids) { return h("div", { class: "step-bar" }, kids.filter(Boolean)); }

    function dialogueBox(lines) {
      return People.dialogueNode(lines);
    }

    function wordList(words) {
      return h("ul", { class: "word-list" }, words.map(w => h("li", { class: "word-item" },
        h("div", { class: "wi-main" },
          h("div", { class: "wi-en" },
            en(w.en, "strong"),
            Speech.supported
              ? h("button", { class: "play tiny", type: "button", "aria-label": "نطق " + w.en, onclick: () => Speech.say(w.en) }, icon("speaker"))
              : null,
            wordArNode(w.en)),
          h("div", { class: "wi-ar" }, w.ar),
          w.ex ? en(w.ex, "p", "wi-ex") : null, w.ex ? exArNode(w.ex) : null))));
    }

    // ---------- شاشات الدرس ----------
    function showIntro() {
      mount(h("main", { class: "screen" },
        h("div", { class: "topbar" },
          h("button", { class: "close", type: "button", "aria-label": "رجوع", onclick: handlers.onExit }, icon("close")),
          h("div", { class: "topbar-main" },
            h("div", { class: "topbar-row" },
              h("strong", {}, `${lesson.level} · ${lesson.unitTitle || "درس"}`),
              h("span", {}, "الدرس " + (lesson.pos || ""))))),
        h("h1", { tabindex: "-1", "data-focus": "", dir: "auto" }, lesson.title),
        lesson.ar ? h("p", { class: "muted" }, lesson.ar) : null,
        withAr(h("p", { class: "explain" }, lesson.explanation), lesson.explanation),
        h("h2", { class: "sub" }, "كلمات الدرس"),
        wordList(lesson.vocab),
        h("p", { class: "muted" }, "بعد كده: المفردات، الاستماع، المحادثة، القواعد، القراءة، الكتابة. وبعدها امتحان الدرس في صفحة منفصلة."),
        bar(button("ابدأ التمارين", "primary wide", showStep))),
        { title: lesson.title });
    }

    function showFinalIntro() {
      mount(h("main", { class: "screen" },
        topBar(),
        h("h1", { tabindex: "-1", "data-focus": "" }, "امتحان الدرس"),
        h("p", { class: "explain" }, "10 أسئلة مختلطة من الدرس: كلمات وقواعد واستماع وفهم. درجتك هنا هي نتيجة الدرس، وبعدها هتشوف شرح لكل خطأ."),
        bar(button("ابدأ الاختبار", "primary wide", showStep))),
        { title: "امتحان الدرس" });
    }

    function showStep() {
      if (i >= endAt) return exam ? showResult() : showPracticeDone();
      if (i === plan.finalStart && !finalIntroShown) {
        finalIntroShown = true;
        return showFinalIntro();
      }
      const s = steps[i];
      const views = { order: orderView, listen: listenView, listenQ: listenQView, dictation: dictationView, write: writeView, roleplay: roleplayView };
      const view = (views[s.type] || choiceView)(s, record);
      mount(h("main", { class: "screen" }, topBar(), tag(s), view), { announce: false });
    }

    function record(ok, chosen, skipMistake) {
      const s = steps[i];
      const st = (stats[s.section] = stats[s.section] || { right: 0, total: 0 });
      st.total++;
      if (ok) st.right++;
      if (s.phase === "final") { finalTotal++; if (ok) finalRight++; }
      else { practiceTotal++; if (ok) practiceRight++; }
      if (!ok) {
        if (s.word) missed.set(s.word.en, s.word);
        if (!skipMistake) addMistake(s, chosen, expectedOf(s));
      } else if (s.section) {
        // إجابة صح على سؤال كان غلط قبل كده: بيتحسب تصحيح في سجل الأخطاء
        Store.markFixed({ lessonId: lesson.id, section: s.section, question: questionOf(s), answer: expectedOf(s) });
      }
      i++;
      showStep();
    }

    // ---------- أنواع الأسئلة ----------
    function choiceLike(ex, done, head, after, tail) {
      const feedback = feedbackBox();
      let ok = false, picked = null;
      const nextBtn = button("التالي", "primary wide", () => done(ok, picked), true);
      const list = optionList(ex.options, ex.answer, (result, chosen) => {
        ok = result;
        picked = chosen;
        showFeedback(feedback, ok, ex.answer);
        if (after) after();
        nextBtn.hidden = false;
        nextBtn.focus();
      });
      onKey(e => {
        if (/^[1-9]$/.test(e.key)) list.pick(Number(e.key) - 1);
        else if (e.key === "Enter" && e.target.tagName !== "BUTTON" && !nextBtn.hidden) nextBtn.click();
      });
      return h("section", {}, head, list.node, tail, bar(feedback, nextBtn));
    }

    // الجزء الإنجليزي بس من النص عشان يتنطق (الفراغ ___ بيتقرا "blank")
    function speakText(text) {
      return String(text || "").replace(/_{2,}/g, " blank ").replace(/[\u0600-\u06FF]+/g, " ").replace(/\s+/g, " ").trim();
    }

    function speakBtn(text, label) {
      return h("button", {
        class: "play tiny", type: "button", title: label, "aria-label": label,
        onclick: () => Speech.say(text)
      }, icon("speaker"));
    }

    // سطر السؤال + أيقونة صوت تقرا الجملة المكتوبة
    function questionRow(text) {
      const q = withAr(h("p", { class: "question", dir: "auto" }, text), text);
      const say = speakText(text);
      if (!Speech.supported || !/[A-Za-z]/.test(say)) return q;
      const english = !/[\u0600-\u06FF]/.test(String(text));
      return h("div", { class: "question-row", dir: english ? "ltr" : "rtl" }, q, speakBtn(say, "اسمع السؤال"));
    }

    function choiceView(ex, done) {
      const passageSay = ex.passage && Speech.supported ? speakText(ex.passage) : "";
      return choiceLike(ex, done, h("div", {},
        ex.prompt ? withAr(h("p", { class: "prompt" }, ex.prompt), ex.prompt) : null,
        ex.passage ? en(ex.passage, "blockquote", "passage") : null,
        passageSay ? h("div", { class: "passage-audio" }, speakBtn(passageSay, "اسمع النص"), h("span", { class: "muted small" }, "اسمع النص")) : null,
        ex.dialogue ? dialogueBox(ex.dialogue) : null,
        questionRow(ex.question)));
    }

    function listenControls(play) {
      return h("div", { class: "listen" },
        h("button", { class: "play", type: "button", "aria-label": "شغّل الصوت", onclick: () => play(false) }, icon("speaker")),
        h("button", { class: "btn secondary small", type: "button", onclick: () => play(true) }, "أبطأ"));
    }

    function listenView(ex, done) {
      const play = slow => Speech.say(ex.say, slow);
      setTimeout(() => play(false), 350);
      return choiceLike(ex, done, h("div", {},
        h("p", { class: "question" }, "اسمع واختار اللي سمعته"),
        listenControls(play)));
    }

    function listenQView(ex, done) {
      const play = slow => Speech.sayLines(ex.lines, slow);
      setTimeout(() => play(false), 350);
      const transcript = h("details", { class: "transcript" },
        h("summary", {}, "اعرض نص الحوار"),
        dialogueBox(ex.lines));
      return choiceLike(ex, done, h("div", {},
        h("p", { class: "prompt" }, "اسمع الحوار القصير وجاوب"),
        listenControls(play),
        withAr(h("p", { class: "question", dir: "auto" }, ex.question), ex.question)),
        () => { transcript.open = true; }, transcript);
    }

    function typedView(ex, done, head, grade, explain) {
      const input = h("input", {
        class: "text-input", type: "text", dir: "ltr", lang: "en", autocomplete: "off", autocapitalize: "off",
        autocorrect: "off", spellcheck: "false", enterkeyhint: "done", "aria-label": "اكتب إجابتك"
      });
      const feedback = feedbackBox();
      let ok = false;
      const checkBtn = button("تحقق", "primary wide", check);
      const nextBtn = button("التالي", "primary wide", () => done(ok, input.value), true);
      function check() {
        if (!input.value.trim()) return;
        ok = grade(input.value);
        input.disabled = true;
        checkBtn.hidden = true;
        feedback.className = "feedback " + (ok ? "right" : "wrong");
        feedback.textContent = explain(ok);
        nextBtn.hidden = false;
        nextBtn.focus();
      }
      input.addEventListener("keydown", e => { if (e.key === "Enter") check(); });
      setTimeout(() => input.focus(), 60);
      return h("section", {}, head, input, bar(feedback, checkBtn, nextBtn));
    }

    function dictationView(ex, done) {
      const play = slow => Speech.say(ex.say, slow);
      setTimeout(() => play(false), 350);
      return typedView(ex, done, h("div", {},
        h("p", { class: "prompt" }, "اسمع واكتب الكلمة الناقصة"),
        listenControls(play),
        en(ex.shown, "p", "cloze")),
        v => normText(v) === normText(ex.answer) || normText(v) === normText(ex.full),
        ok => ok ? "صح، أحسنت" : "الجملة الصحيحة: " + ex.full);
    }

    function writeView(ex, done) {
      return typedView(ex, done, h("div", {},
        h("p", { class: "prompt" }, "اكتب جملة"),
        withAr(h("p", { class: "question" }, ex.prompt), ex.prompt)),
        v => {
          const t = normText(v);
          return t.split(" ").length >= 3 && (" " + t + " ").includes(" " + normText(ex.must) + " ");
        },
        ok => (ok ? "صح، أحسنت. " : `لازم الجملة تحتوي «${ex.must}» وتكون 3 كلمات على الأقل. `) + (ex.model ? "مثال: " + ex.model : ""));
    }

    function orderView(ex, done) {
      let chosen = [];
      let locked = false;
      let ok = false;
      const words = shuffle(ex.words.map(w => ({ w })));
      const cls = ex.vertical ? " vertical" : "";
      const row = h("div", { class: "answer-row" + cls, dir: "ltr", lang: "en", "aria-label": "إجابتك" });
      const bank = h("div", { class: "bank" + cls, dir: "ltr", lang: "en", "aria-label": "العناصر المتاحة" });
      const feedback = feedbackBox();
      const checkBtn = button("تحقق", "primary wide", null);
      checkBtn.disabled = true;
      const nextBtn = button("التالي", "primary wide", () => done(ok, chosen.map(c => c.w).join(" ")), true);

      function chip(c, inRow) {
        return h("button", {
          class: "chip", type: "button",
          "aria-label": (inRow ? "احذف " : "أضف ") + c.w,
          onclick: () => {
            if (locked) return;
            chosen = chosen.includes(c) ? chosen.filter(x => x !== c) : [...chosen, c];
            draw();
          }
        }, c.w);
      }
      function draw() {
        row.replaceChildren(...chosen.map(c => chip(c, true)));
        bank.replaceChildren(...words.filter(c => !chosen.includes(c)).map(c => chip(c, false)));
        checkBtn.disabled = chosen.length !== words.length;
      }
      checkBtn.addEventListener("click", () => {
        locked = true;
        ok = chosen.map(c => c.w).join(" ") === ex.answer;
        row.classList.add(ok ? "right" : "wrong");
        showFeedback(feedback, ok, ex.answerShow || ex.answer);
        checkBtn.hidden = true;
        nextBtn.hidden = false;
        nextBtn.focus();
      });
      onKey(e => {
        if (e.key !== "Enter" || e.target.tagName === "BUTTON") return;
        if (!checkBtn.hidden && !checkBtn.disabled) checkBtn.click();
        else if (!nextBtn.hidden) nextBtn.click();
      });

      draw();
      return h("section", {},
        h("p", { class: "question" }, ex.prompt || "رتّب الكلمات لتكوّن جملة صحيحة"),
        ex.hint ? h("p", { class: "muted" }, ex.hint) : null,
        row, bank, bar(feedback, checkBtn, nextBtn));
    }

    function roleplayView(ex, done) {
      let k = 0;
      let allOk = true;
      let first = true;
      const chat = h("div", { class: "chat", dir: "ltr", lang: "en" });
      const stage = h("div", {});
      const msg = (who, text) => h("div", { class: "msg " + who.toLowerCase() }, h("span", { class: "bub" }, text));

      function turn() {
        const st = ex.steps[k];
        chat.append(msg("A", st.say));
        Speech.say(st.say);
        const feedback = feedbackBox();
        const nextBtn = button(k === ex.steps.length - 1 ? "إنهاء" : "التالي", "primary wide", () => {
          k++;
          if (k < ex.steps.length) turn(); else done(allOk, null, true);
        }, true);
        const list = optionList(st.options, st.answer, (ok, chosen) => {
          allOk = allOk && ok;
          if (!ok) {
            addMistake(ex, chosen, st.answer, {
              question: `في الحوار: "${st.say}"`,
              why: `الرد الطبيعي هنا: "${st.answer}"`
            });
          }
          chat.append(msg("B", st.answer));
          showFeedback(feedback, ok, st.answer);
          nextBtn.hidden = false;
          nextBtn.focus();
        });
        const keys = e => {
          if (/^[1-9]$/.test(e.key)) list.pick(Number(e.key) - 1);
          else if (e.key === "Enter" && e.target.tagName !== "BUTTON" && !nextBtn.hidden) nextBtn.click();
        };
        if (first) { onKey(keys); first = false; } else document.onkeydown = keys;
        stage.replaceChildren(list.node, bar(feedback, nextBtn));
      }

      turn();
      return h("section", {},
        h("p", { class: "prompt" }, ex.prompt),
        h("p", { class: "muted" }, "اختار ردك في كل جولة. السؤال بيتحسب صح لو كل الردود صح."),
        chat, stage);
    }

    // ---------- النتيجة ----------
    function mistakeCard(m, n) {
      return h("li", { class: "mistake" },
        h("div", { class: "mk-head" },
          h("span", { class: "mk-n", "aria-hidden": "true" }, String(n)),
          h("span", { class: "mk-tag" }, LABELS[m.section] + (m.phase === "final" ? " · الاختبار" : "")),
          ),
        h("p", { class: "mk-q", dir: "auto", speak: m.speak ? String(m.question).replace(/_+/g, "blank") : null }, m.question),
        h("p", { class: "mk-line wrong" }, h("span", { class: "mk-label" }, "إجابتك: "), h("span", { dir: "auto" }, m.your)),
        h("p", { class: "mk-line right", speak: m.speak ? String(m.correct) : null }, h("span", { class: "mk-label" }, "الصح: "), h("span", { dir: "auto" }, m.correct)),
        h("p", { class: "mk-why" }, h("span", { class: "mk-icon", "aria-hidden": "true" }, icon("bulb")), h("span", { dir: "auto" }, m.why)));
    }

    // نهاية التمارين: الامتحان بيتعمل من صفحة مستقلة
    function showPracticeDone() {
      const xp = practiceRight * XP_PRACTICE;
      const pct = practiceTotal ? Math.round((practiceRight / practiceTotal) * 100) : 0;
      if (xp) Store.addXp(xp);
      mistakes.forEach(m => Store.logError({
        section: m.section, lessonId: lesson.id, lessonTitle: lesson.title,
        type: m.type, question: m.question, answer: m.correct,
        options: m.options, why: m.why, word: m.word
      }));
      if (missed.size) {
        Store.addWords([...missed.values()]);
        missed.forEach(w => Store.gradeWord(w.en, false));
      }
      mount(h("main", { class: "screen result" },
        h("div", { class: "result-head ok" },
          ring(pct, { label: "نتيجة التمارين", size: 108 }),
          h("div", {},
            h("h1", { tabindex: "-1", "data-focus": "" }, "خلصت تمارين الدرس"),
            h("p", { class: "muted" }, `${practiceRight} من ${practiceTotal} في التمارين · كسبت ${xp} نقطة`),
            h("p", { class: "note" }, `دلوقتي امتحان الدرس. لازم ${Store.PASS}% عشان تعدّي الدرس وتفتح اللي بعده.`))),
        mistakes.length
          ? h("section", { class: "mistakes" },
              h("h2", { class: "sub" }, `أخطاؤك في التمارين (${mistakes.length})`),
              h("p", { class: "muted small" }, "راجعها قبل الامتحان، والكلمات اللي غلطت فيها دخلت المراجعة تلقائياً."),
              h("ol", { class: "mistake-list" }, mistakes.map((m, n) => mistakeCard(m, n + 1))))
          : h("p", { class: "all-right" }, "مفيش أي خطأ في التمارين. ممتاز."),
        bar(
          h("a", { class: "btn primary", href: Router.href("/lesson/" + lesson.id + "/exam") }, "ابدأ امتحان الدرس"),
          h("a", { class: "btn secondary", href: Router.href("/lesson/" + lesson.id) }, "تفاصيل الدرس"))),
        { title: "خلصت تمارين الدرس", announce: false });
    }

    function showResult() {
      const pctScore = finalTotal ? Math.round((finalRight / finalTotal) * 100) : 0;
      const xp = finalRight * XP_FINAL;
      const passed = pctScore >= Store.PASS;
      const prevBest = Store.bestScore(lesson.id);
      const sections = {};
      ORDER.forEach(k => { if (stats[k] && stats[k].total) sections[k] = { right: stats[k].right, total: stats[k].total }; });

      Store.recordLesson(lesson.id, pctScore, xp, { sections, mistakes: mistakes.length, kind: "exam" });
      // سجل الأخطاء المتكررة
      mistakes.forEach(m => Store.logError({
        section: m.section, lessonId: lesson.id, lessonTitle: lesson.title,
        type: m.type, question: m.question, answer: m.correct,
        options: m.options, why: m.why, word: m.word
      }));
      const added = passed ? Store.addWords(lesson.vocab) : 0;
      if (missed.size) {
        Store.addWords([...missed.values()]);
        missed.forEach(w => Store.gradeWord(w.en, false));
      }

      const keys = ORDER.filter(k => stats[k] && stats[k].total);
      const weak = keys.filter(k => stats[k].right / stats[k].total < 0.7);
      const nextEntry = Catalog.lessonAfter(lesson);

      mount(h("main", { class: "screen result" },
        h("div", { class: "result-head " + (passed ? "ok" : "no") },
          ring(pctScore, { label: "نتيجة امتحان الدرس", size: 108 }),
          h("div", {},
            h("h1", { tabindex: "-1", "data-focus": "" }, passed ? "أحسنت، عدّيت الدرس" : "قريب، جرّب تاني"),
            h("p", { class: "muted" }, `${finalRight} من ${finalTotal} في امتحان الدرس · كسبت ${xp} نقطة`),
            prevBest != null
              ? h("p", { class: "muted small" }, pctScore > prevBest
                  ? `أحسن من محاولتك السابقة (${prevBest}%)`
                  : pctScore === prevBest ? `زي محاولتك السابقة (${prevBest}%)` : `أعلى نتيجة ليك لسه ${prevBest}%`)
              : null,
            !passed ? h("p", { class: "note" }, `محتاج ${Store.PASS}% عشان تفتح الدرس اللي بعده.`) : null,
            added ? h("p", { class: "muted small" }, `أضفنا ${wordsLabel(added)} لمراجعتك.`) : null)),

        h("h2", { class: "sub" }, "أداؤك في كل قسم"),
        h("ul", { class: "result-rows" }, keys.map(k => {
          const p = Math.round((stats[k].right / stats[k].total) * 100);
          return h("li", {},
            h("span", {}, LABELS[k]),
            meter(p, LABELS[k], p < 70 ? "low" : ""),
            h("strong", {}, `${stats[k].right}/${stats[k].total}`));
        })),

        mistakes.length
          ? h("section", { class: "mistakes" },
              h("h2", { class: "sub" }, `أخطاؤك وشرحها (${mistakes.length})`),
              h("p", { class: "muted small" }, "راجعها دلوقتي، والكلمات اللي غلطت فيها دخلت المراجعة تلقائياً."),
              h("ol", { class: "mistake-list" }, mistakes.map((m, n) => mistakeCard(m, n + 1))))
          : h("p", { class: "all-right" }, "مفيش أي خطأ في الدرس ده. ممتاز."),

        weak.length
          ? h("div", { class: "weak" },
              h("h2", {}, "ركّز على"),
              h("ul", {}, weak.map(k => h("li", {}, h("strong", {}, LABELS[k] + ": "), ADVICE[k]))))
          : null,

        bar(
          passed && nextEntry ? h("a", { class: "btn primary", href: Router.href("/lesson/" + nextEntry.id + "/run") }, "الدرس التالي") : null,
          button("إعادة الامتحان", passed ? "secondary" : "primary", () => run(lesson, handlers, "exam")),
          h("a", { class: "btn secondary", href: Router.href("/lesson/" + lesson.id) }, "تفاصيل الدرس"),
          h("a", { class: "btn secondary", href: Router.href("/") }, "لوحة التحكم"))),
        { title: "نتيجة الدرس", announce: false });

      announce(`${passed ? "نجحت" : "لم تنجح"}. النتيجة ${pctScore} بالمئة، و${mistakes.length} خطأ.`);
    }
  }

  return { run };
})();
