// تشغيل الدرس: شرح وكلمات ← 6 أقسام تدريب ← اختبار نهائي ← نتيجة مفصّلة بشرح كل خطأ
const Lesson = (function () {
  const LABELS = Catalog.SECTIONS.labels;
  const ORDER = Catalog.SECTIONS.order;
  const ADVICE = Catalog.SECTIONS.advice;
  const XP_PRACTICE = 2;
  const XP_FINAL = 10;

  // mode: "learn" = التمارين بس، "exam" = امتحان الدرس لوحده
  // opts.resume: كمّل من نفس السؤال. opts.fresh: ابدأ من الأول
  function run(lesson, handlers, mode, opts) {
    opts = opts || {};
    const exam = mode === "exam";
    const saved = exam ? null : Store.getResume(lesson.id);
    if (saved && !opts.resume && !opts.fresh) return showResumeChoice(saved);

    const resuming = !!(saved && opts.resume && !exam);
    if (!exam && !resuming) Store.clearResume(lesson.id);
    const plan = resuming ? saved.plan : Builder.build(lesson, Speech.supported, Pronounce.supported);
    const steps = plan.steps;
    const startAt = exam ? plan.finalStart : 0;
    const endAt = exam ? steps.length : plan.finalStart;
    let i = resuming ? saved.i : startAt;
    let finalIntroShown = resuming ? !!saved.finalIntroShown : false;
    const stats = resuming ? saved.stats : {};
    let finalRight = resuming ? saved.finalRight : 0, finalTotal = resuming ? saved.finalTotal : 0;
    let practiceRight = resuming ? saved.practiceRight : 0, practiceTotal = resuming ? saved.practiceTotal : 0;
    const missed = new Map(resuming ? saved.missed : []);
    const mistakes = resuming ? saved.mistakes : [];

    // نحفظ مكان الطالب بعد كل إجابة، عشان يرجع له لو خرج
    function persist() {
      if (exam || i >= steps.length) return;
      Store.saveResume(lesson.id, {
        plan, i, finalIntroShown, stats, finalRight, finalTotal, practiceRight, practiceTotal,
        missed: [...missed.entries()], mistakes
      });
    }

    // شاشة الاختيار: كمّل ولا ابدأ من الأول
    function showResumeChoice(r) {
      const all = Math.max(1, r.plan.steps.length);
      const at = Math.min(Math.max(r.i + 1, 1), all);
      mount(h("main", { class: "screen" },
        h("div", { class: "topbar" },
          h("button", { class: "close", type: "button", "aria-label": "رجوع", onclick: handlers.onExit }, icon("close")),
          h("div", { class: "topbar-main" }, h("strong", { dir: "auto" }, lesson.title))),
        h("h1", { tabindex: "-1", "data-focus": "" }, "عندك درس واقف في النص"),
        h("p", { class: "muted" }, `وقفت عند خطوة ${at} من ${all}. تحب تكمل من نفس المكان ولا تبدأ من الأول؟`),
        bar(
          button("كمّل من حيث وقفت", "primary wide", () => run(lesson, handlers, mode, { resume: true })),
          button("ابدأ من الأول", "secondary wide", () => run(lesson, handlers, mode, { fresh: true })))),
        { title: lesson.title });
    }

    if (exam) { finalIntroShown = true; showFinalIntro(); }
    else if (resuming) showStep();
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
      if (step.type === "spell") return "اكتب الكلمة اللي سمعتها";
      if (step.type === "say") return "قول الجملة اللي سمعتها: " + step.say;
      if (step.type === "pic") return "اختار الصورة اللي معناها «" + step.question + "»";
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
      if (i > startAt && i < endAt && !confirm("تخرج من الدرس؟ تقدر ترجع لنفس السؤال بعدين.")) return;
      handlers.onExit();
    }

    function topBar() {
      return h("div", { class: "topbar" },
        h("button", { class: "close", type: "button", "aria-label": "خروج من الدرس", onclick: exit }, icon("close")),
        h("div", { class: "topbar-main" },
          h("div", { class: "topbar-row" },
            h("strong", { dir: "auto" }, lesson.title),
            h("span", { class: "step-count" }, (() => {
          // العداد: خطوة من إجمالي الدرس كله، ومعاها اسم المرحلة (تمارين أو امتحان)
          const all = Math.max(1, steps.length);
          const cur = Math.min(Math.max(i + 1, 1), all);
          const phase = i >= plan.finalStart ? "الامتحان" : "التمارين";
          return `${phase} · ${cur} من ${all}`;
        })())),
          h("div", {
            class: "progress", role: "progressbar", "aria-label": "تقدمك في الدرس",
            "aria-valuemin": "0", "aria-valuemax": String(steps.length), "aria-valuenow": String(Math.min(i, steps.length))
          }, h("span", { style: `width:${Math.min(100, (i / Math.max(1, steps.length)) * 100)}%` }))));
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

    // نصيحة الدرس: أخطاء شائعة مع مثال صح وغلط
    function tipNode() {
      const t = (window.LESSON_TIPS || {})[lesson.id];
      if (!t) return null;
      return h("aside", { class: "lesson-tip", role: "note" },
        h("p", { class: "tip-text" }, "💡 " + t.tip),
        h("div", { class: "tip-pair" },
          h("span", { class: "tip-no", "aria-label": "غلط" }, "✗"), en(t.wrong, "span", "tip-en"),
          h("span", { class: "tip-yes", "aria-label": "صح" }, "✓"), en(t.right, "span", "tip-en")));
    }

    // ملخص الدرس: الكلمات الجديدة والشرح والنصيحة، وزرار طباعة
    function summaryNode() {
      return h("section", { class: "lesson-summary" },
        h("h2", { class: "sub" }, "ملخص الدرس"),
        withAr(h("p", { class: "explain" }, lesson.explanation), lesson.explanation),
        h("ul", { class: "sum-words" }, lesson.vocab.map(w => h("li", {},
          en(w.en, "strong"), wordArNode(w.en)))),
        tipNode(),
        h("button", { class: "btn secondary small no-print", type: "button", onclick: () => window.print() }, "اطبع الملخص"));
    }

    function dialogueBox(lines) {
      return People.dialogueNode(lines);
    }

    function wordList(words) {
      return h("ul", { class: "word-list" }, words.map(w => h("li", { class: "word-item" },
        h("div", { class: "wi-main" },
          h("div", { class: "wi-en" },
            wordVisual(w.en, "wi-emoji"),
            en(w.en, "strong"),
            Speech.supported
              ? speakWithSlow("play tiny", "نطق " + w.en, slow => Speech.say(w.en, slow))
              : null,
            wordArNode(w.en)),
          h("div", { class: "wi-ar" }, w.ar),
          w.ex ? h("div", { class: "wi-exrow" }, en(w.ex, "p", "wi-ex"),
            Speech.supported ? h("button", { class: "play tiny", type: "button", "aria-label": "اسمع المثال", title: "اسمع المثال", onclick: () => Speech.say(w.ex, false) }, icon("speaker")) : null) : null,
          w.ex ? exArNode(w.ex) : null))));
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
        tipNode(),
        Pronounce.supported ? null : h("p", { class: "note" }, "تمارين النطق مش شغالة في المتصفح ده. جرّب Chrome أو Edge عشان تستخدمها."),
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

    // سطر الشرح الفوري: معنى الكلمة، أو تلميح القاعدة، أو إشارة للشرح فوق
    function instantWhy(s) {
      if (s.word && (window.WORD_AR || {})[s.word.en]) {
        return h("span", { class: "fb-why-text" }, en("«" + s.word.en + "»", "span"), " معناها «" + (window.WORD_AR || {})[s.word.en] + "»");
      }
      if (s.why) return withAr(h("span", { class: "fb-why-text" }, s.why), s.why);
      if (s.section === "grammar" || s.section === "writing") return h("span", { class: "fb-why-text" }, "راجع القاعدة في شرح الدرس فوق.");
      return null;
    }

    function showStep() {
      if (i >= endAt) return exam ? showResult() : showPracticeDone();
      if (i === plan.finalStart && !finalIntroShown) {
        finalIntroShown = true;
        return showFinalIntro();
      }
      const s = steps[i];
      const views = { order: orderView, listen: listenView, listenQ: listenQView, dictation: dictationView, write: writeView, roleplay: roleplayView, pic: picView, spell: spellView, match: matchView, say: sayView };
      window.instantWhy = () => instantWhy(s);
      const view = (views[s.type] || choiceView)(s, record);
      mount(h("main", { class: "screen" }, topBar(), tag(s), view), { announce: false });
    }

    function record(ok, chosen, skipMistake) {
      window.instantWhy = null;
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
      persist();
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
      return h("section", {}, head, list.node, tail,
        h("p", { class: "kbd-hint muted small" }, "اختصارات: اضغط 1 لـ 4 للاختيار، وEnter للتالي"),
        bar(feedback, nextBtn));
    }

    // الجزء الإنجليزي بس من النص عشان يتنطق (الفراغ ___ بيتقرا "blank")
    function speakText(text) {
      return String(text || "").replace(/_{2,}/g, " blank ").replace(/[\u0600-\u06FF]+/g, " ").replace(/\s+/g, " ").trim();
    }

    function speakBtn(text, label) {
      return speakWithSlow("play tiny", label, slow => Speech.say(text, slow));
    }

    // سطر السؤال + أيقونة صوت تقرا الجملة المكتوبة
    function questionRow(text) {
      const q = withAr(h("p", { class: "question", dir: "auto" }, text), text);
      const say = speakText(text);
      if (!Speech.supported || !/[A-Za-z]/.test(say)) return q;
      const english = !/[\u0600-\u06FF]/.test(String(text));
      // الصوت بيبدأ لوحده أول ما السؤال يظهر (لو مفعّل من الإعدادات)
      if (Speech.getAutoplay()) setTimeout(() => Speech.say(say, false), 350);
      return h("div", { class: "question-row", dir: english ? "ltr" : "rtl" }, q, speakBtn(say, "اسمع السؤال"));
    }

    function choiceView(ex, done) {
      const passageSay = ex.passage && Speech.supported ? speakText(ex.passage) : "";
      if (passageSay && Speech.getAutoplay()) setTimeout(() => Speech.say(passageSay, false), 350);
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
      // الحوار مكتوب فوق ظاهر على طول، والسؤال تحته
      return choiceLike(ex, done, h("div", {},
        h("p", { class: "prompt" }, "اسمع الحوار القصير وجاوب"),
        listenControls(play),
        dialogueBox(ex.lines),
        withAr(h("p", { class: "question", dir: "auto" }, ex.question), ex.question)));
    }

    // ---------- تمارين الصورة والاستماع والربط ----------
    function picView(ex, done) {
      const feedback = feedbackBox();
      let ok = false, picked = null, answered = false;
      const nextBtn = button("التالي", "primary wide", () => done(ok, picked), true);
      const buttons = shuffle(ex.options).map((opt, idx) => {
        const b = h("button", { class: "pic-opt", type: "button", "aria-label": opt, "aria-keyshortcuts": String(idx + 1), "data-value": opt },
          wordVisual(opt, "pic-ill") || "❔");
        b.addEventListener("click", () => {
          if (answered) return;
          answered = true;
          ok = opt === ex.answer;
          picked = opt;
          b.classList.add(ok ? "right" : "wrong");
          buttons.forEach(x => { x.disabled = true; });
          if (!ok) { const right = buttons.find(x => x.dataset.value === ex.answer); if (right) right.classList.add("right"); }
          showFeedback(feedback, ok, ex.answer);
          nextBtn.hidden = false;
          nextBtn.focus();
        });
        return b;
      });
      onKey(e => {
        if (/^[1-9]$/.test(e.key) && buttons[Number(e.key) - 1]) buttons[Number(e.key) - 1].click();
        else if (e.key === "Enter" && e.target.tagName !== "BUTTON" && !nextBtn.hidden) nextBtn.click();
      });
      return h("section", {},
        withAr(h("p", { class: "prompt" }, ex.prompt), ex.prompt),
        questionRow(ex.question),
        h("div", { class: "pic-grid", role: "group" }, buttons),
        bar(feedback, nextBtn));
    }

    function spellView(ex, done) {
      const play = slow => Speech.say(ex.say, slow);
      setTimeout(() => play(false), 350);
      const arWord = ex.word ? (window.WORD_AR || {})[ex.word.en] : null;
      const arMeaning = arWord ? " (معناها «" + arWord + "»)" : "";
      return typedView(ex, done, h("div", {},
        h("p", { class: "prompt" }, "اسمع واكتب الكلمة اللي سمعتها" + arMeaning),
        listenControls(play)),
        v => normText(v) === normText(ex.answer),
        ok => ok ? "صح، أحسنت" : "الكلمة الصحيحة: " + ex.answer);
    }

    function matchView(ex, done) {
      const feedback = feedbackBox();
      let selected = null, wrong = 0, matched = 0;
      const total = ex.pairs.length;
      const nextBtn = button("التالي", "primary wide", () => done(wrong === 0, wrong ? "أخطاء: " + wrong : "وصّلت كله"), true);
      const mk = (cls, label, pair, side) => ({ side, pair, btn: h("button", { class: "match-btn " + cls, type: "button", dir: "ltr", lang: "en", "aria-label": label }, label) });
      const lefts = shuffle(ex.pairs).map(p => mk("", p.en, p, "L"));
      const rights = shuffle(ex.pairs).map(p => {
        const x = mk("match-emoji", p.en, p, "R");
        const v = wordVisual(p.en, "match-ill");
        if (v) { x.btn.textContent = ""; x.btn.append(v); }
        else x.btn.textContent = p.emoji;
        return x;
      });
      function pick(item) {
        if (item.btn.disabled) return;
        if (!selected || selected.side === item.side) {
          if (selected) selected.btn.classList.remove("selected");
          selected = item;
          item.btn.classList.add("selected");
          return;
        }
        const first = selected;
        first.btn.classList.remove("selected");
        selected = null;
        const a = item.side === "L" ? item : first;
        const b = item.side === "L" ? first : item;
        const ok = a.pair.en === b.pair.en;
        if (typeof Sound !== "undefined") Sound.play(ok);
        if (ok) {
          [a, b].forEach(x => { x.btn.classList.add("right"); x.btn.disabled = true; });
          matched++;
          if (matched === total) {
            feedback.className = "feedback " + (wrong ? "wrong" : "right");
            feedback.textContent = wrong ? "خلصت، بس فيه " + wrong + " غلطة" : "صح، أحسنت، وصّلت كله";
            nextBtn.hidden = false;
            nextBtn.focus();
          }
        } else {
          wrong++;
          [a, b].forEach(x => x.btn.classList.add("wrong"));
          setTimeout(() => [a, b].forEach(x => x.btn.classList.remove("wrong")), 700);
        }
      }
      [...lefts, ...rights].forEach(x => x.btn.addEventListener("click", () => pick(x)));
      return h("section", {},
        withAr(h("p", { class: "prompt" }, ex.prompt), ex.prompt),
        h("div", { class: "match-grid" },
          h("div", { class: "match-col" }, lefts.map(x => x.btn)),
          h("div", { class: "match-col" }, rights.map(x => x.btn))),
        bar(feedback, nextBtn));
    }

    // رسالة واضحة بسبب مشكلة الميكروفون
    function micErrorText(err) {
      const code = err && err.error;
      if (code === "not-allowed" || code === "service-not-allowed") return "الميكروفون متقفل. افتح إعدادات الموقع في المتصفح وفعّل الميكروفون، وبعدين جرّب تاني.";
      if (code === "no-speech" || err && err.message === "noresult") return "مسمعتش حاجة. قرّب من الميكروفون وقول الجملة بصوت واضح.";
      if (code === "audio-capture") return "مفيش ميكروفون متوصل بالجهاز. وصّل ميكروفون أو جرّب جهاز تاني.";
      if (code === "network") return "التعرف على الكلام محتاج إنترنت. اتأكد من الاتصال وجرّب تاني.";
      if (err && err.message === "unsupported") return "المتصفح ده مش بيدعم التعرف على الكلام. جرّب Chrome أو Edge.";
      return "حصلت مشكلة في الميكروفون. جرّب تاني بعد شوية.";
    }

    // تحدي النطق: الطالب يسمع الجملة، يسجّل صوته، يسمع تسجيله، وبعدين يبعته للتقييم (3 محاولات)
    function sayView(ex, done) {
      const feedback = feedbackBox();
      const play = slow => Speech.say(ex.say, slow);
      setTimeout(() => play(false), 350);
      let attempts = 0, passed = false, lastHeard = "";
      let recorder = null, chunks = [], stream = null, listenP = null, blobUrl = null;
      const nextBtn = button("التالي", "primary wide", () => done(passed, lastHeard), true);

      const statusEl = h("p", { class: "rec-status muted small", "aria-live": "polite" }, "");
      const micIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-2.08A7 7 0 0 0 19 12z"/></svg>';
      const micBtn = h("button", { class: "mic-main", type: "button", "aria-label": "ابدأ التسجيل", title: "ابدأ التسجيل" });
      micBtn.innerHTML = micIcon;
      const endBtn = h("button", { class: "btn secondary small rec-end", type: "button", hidden: true }, "⏹ إنهاء التسجيل");
      const audio = h("audio", { controls: true, preload: "auto", class: "rec-audio" });
      const playerWrap = h("div", { class: "rec-player", hidden: true },
        h("span", { class: "muted small" }, "اسمع تسجيلك"), audio);
      const sendBtn = h("button", { class: "btn primary small", type: "button", hidden: true }, "ابعت التسجيل");
      const redoBtn = h("button", { class: "btn secondary small", type: "button", hidden: true }, "سجّل تاني");
      const heardEl = h("p", { class: "heard muted", dir: "ltr", lang: "en" }, "");

      function setFeedback(ok, text) {
        feedback.className = "feedback " + (ok ? "right" : "wrong");
        feedback.textContent = text;
      }

      async function startRec() {
        feedback.className = "feedback"; feedback.textContent = "";
        chunks = [];
        stream = null;
        try {
          if (navigator.mediaDevices && window.MediaRecorder) {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            recorder = new MediaRecorder(stream);
            recorder.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
            recorder.start();
          }
        } catch (err) {
          stream = null; recorder = null;
          statusEl.textContent = "مش هقدر أسجّل صوتك، بس هقيّم نطقك.";
        }
        listenP = Pronounce.listen().then(r => ({ alts: r.alts })).catch(err => ({ err }));
        micBtn.hidden = true;
        endBtn.hidden = false;
        statusEl.textContent = "بسمعك... اضغط إنهاء لما تخلص";
      }

      function stopRec() {
        endBtn.hidden = true;
        const release = () => { if (stream) { stream.getTracks().forEach(t => t.stop()); stream = null; } };
        const showPlayer = () => {
          if (blobUrl) audio.src = blobUrl;
          playerWrap.hidden = !blobUrl;
          sendBtn.hidden = false;
          redoBtn.hidden = false;
          statusEl.textContent = "اسمع تسجيلك، وبعدين ابعته للتقييم أو سجّل تاني";
        };
        if (recorder && recorder.state !== "inactive") {
          recorder.onstop = () => {
            blobUrl = URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType || "audio/webm" }));
            release();
            showPlayer();
          };
          recorder.stop();
        } else {
          release();
          showPlayer();
        }
      }

      async function send() {
        sendBtn.disabled = true;
        statusEl.textContent = "بقيّم نطقك...";
        const r = listenP ? await listenP : { err: new Error("noresult") };
        attempts++;
        sendBtn.disabled = false;
        if (r.err) {
          setFeedback(false, micErrorText(r.err));
        } else {
          lastHeard = r.alts[0] || "";
          heardEl.textContent = "سمعتك بتقول: " + lastHeard;
          const s = Pronounce.bestScore(ex.answer, r.alts);
          if (s >= 0.8) passed = true;
          else if (attempts < 3) setFeedback(false, s >= 0.6 ? "قريب! حاول تاني ببطء وبوضوح" : "لسه بعيد عن النطق الصح. اسمع تاني وحاول");
        }
        if (passed || attempts >= 3) {
          showFeedback(feedback, passed, ex.answer);
          sendBtn.hidden = true;
          redoBtn.hidden = true;
          micBtn.hidden = true;
          nextBtn.hidden = false;
          nextBtn.focus();
        } else {
          sendBtn.hidden = true;
          redoBtn.hidden = false;
          micBtn.hidden = false;
          statusEl.textContent = "جرّب تاني. تقدر تسجّل من جديد.";
        }
      }

      micBtn.addEventListener("click", () => startRec());
      endBtn.addEventListener("click", () => stopRec());
      sendBtn.addEventListener("click", () => send());
      redoBtn.addEventListener("click", () => {
        blobUrl = null; audio.removeAttribute("src");
        playerWrap.hidden = true; sendBtn.hidden = true; redoBtn.hidden = true;
        heardEl.textContent = "";
        micBtn.hidden = false;
        statusEl.textContent = "";
      });

      return h("section", { class: "say-view" },
        h("p", { class: "prompt" }, "اسمع الجملة وقولها بصوتك"),
        withAr(h("p", { class: "question", dir: "ltr", lang: "en" }, ex.say), ex.say),
        listenControls(play),
        h("div", { class: "say-controls" },
          micBtn,
          endBtn,
          statusEl),
        playerWrap,
        h("div", { class: "say-actions" }, sendBtn, redoBtn),
        heardEl,
        bar(feedback, nextBtn));
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
        if (typeof Sound !== "undefined") Sound.play(!!ok);
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
      Store.clearResume(lesson.id);
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
        h("div", { class: "result-head " + (passed ? "ok celebrate" : "no") },
          passed ? h("span", { class: "result-badge", "aria-hidden": "true" }, "🎉") : null,
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

        passed ? summaryNode() : null,

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
