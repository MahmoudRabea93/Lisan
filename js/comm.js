// مهارات التواصل: مكتبة الاستماع، المحادثات التفاعلية، تدريب النطق والتسجيل، تدريبات الكتابة
const Comm = (function () {
  const LISTEN = (typeof LISTENING !== "undefined" ? LISTENING : []);
  const SCN = (typeof SCENARIOS !== "undefined" ? SCENARIOS : []);
  const SPK = (typeof SPEAK !== "undefined" ? SPEAK : []);
  const WRT = (typeof WRITING !== "undefined" ? WRITING : []);

  const byId = (list, id) => list.find(x => x.id === id) || null;

  // ---------- مشغّل الصوت: ملف حقيقي لو موجود، وإلا صوت المتصفح ----------
  function makePlayer(item, lines) {
    let audio = null;
    let ready = false;
    const note = h("p", { class: "muted small audio-note" },
      (item.src ? `مفيش تسجيل في ${item.src} لسه — ` : "") +
      (Speech.supported
        ? "الصوت دلوقتي بصوت المتصفح. حط ملف صوت حقيقي بالاسم ده وهيشتغل تلقائي."
        : "ومتصفحك مش بيدعم النطق، فاقرأ النص بنفسك أو حط ملف صوت بالاسم ده."));

    if (item.src && typeof Audio !== "undefined") {
      try {
        audio = new Audio(item.src);
        audio.preload = "auto";
        audio.addEventListener("canplaythrough", () => {
          ready = true;
          note.textContent = "تسجيل صوتي: " + item.src;
        });
        audio.addEventListener("error", () => { ready = false; });
      } catch (e) { audio = null; }
    }

    function play(slow) {
      if (ready && audio) {
        try {
          audio.pause();
          audio.currentTime = 0;
          audio.playbackRate = slow ? 0.75 : 1;
          const p = audio.play();
          if (p && p.catch) p.catch(() => speak(slow));
          return;
        } catch (e) { /* يكمل على صوت المتصفح */ }
      }
      speak(slow);
    }
    function speak(slow) {
      const ls = lines || item.lines || [];
      if (ls.length > 1) Speech.sayLines(ls, slow);
      else if (ls.length) Speech.say(ls[0].text, slow);
    }
    function stop() { if (audio) { try { audio.pause(); } catch (e) {} } if (window.speechSynthesis) speechSynthesis.cancel(); }

    const controls = h("div", { class: "listen" },
      h("button", { class: "play", type: "button", "aria-label": "تشغيل الصوت", onclick: () => play(false) }, icon("speaker")),
      h("button", { class: "btn secondary small", type: "button", onclick: () => play(true) }, "أبطأ"),
      h("button", { class: "btn secondary small", type: "button", onclick: stop }, "إيقاف"));

    return { play, stop, node: h("div", {}, controls, note) };
  }

  function dialogue(lines) {
    return People.dialogueNode(lines);
  }

  // ---------- صفحة التواصل ----------
  function hub() {
    const lDone = Object.keys(Store.getComm("listening")).length;
    const sDone = Object.keys(Store.getComm("scenarios")).length;
    const pDone = Object.keys(Store.getComm("speaking")).length;
    const wDone = Object.keys(Store.getComm("writing")).length;

    function tile(href, iconName, title, sub, done, total) {
      return h("li", {},
        h("a", { class: "comm-tile", href: Router.href(href) },
          h("span", { class: "comm-icon" }, icon(iconName)),
          h("span", { class: "comm-main" },
            h("strong", {}, title),
            h("small", {}, sub),
            meter(pct(done, total), title),
            h("small", { class: "muted" }, `${done} من ${total}`))));
    }

    Shell.page({
      title: "مهارات التواصل",
      subtitle: "استماع، محادثات واقعية، نطق وتسجيل، وكتابة إيميلات ورسائل.",
      body: h("div", {},
        h("ul", { class: "comm-grid" },
          tile("/listen", "speaker", "مكتبة الاستماع", "حوارات وإعلانات بأسئلة فهم", lDone, LISTEN.length),
          tile("/scenario", "cards", "محادثات تفاعلية", "مواقف حياة وشغل، وأنت بتختار ردك", sDone, SCN.length),
          tile("/speak", "write", "النطق والتسجيل", "سجّل صوتك وقارنه بالنموذج", pDone, SPK.length),
          tile("/write", "book", "كتابة إيميلات ورسائل", "مهام عملية مع تصحيح تلقائي", wDone, WRT.length)))
    });
  }

  // ---------- مكتبة الاستماع ----------
  function listenList() {
    const done = Store.getComm("listening");
    Shell.page({
      title: "مكتبة الاستماع",
      back: "/comm",
      subtitle: "اسمع الأول من غير نص، وبعدين اتأكد من الفهم بالأسئلة.",
      body: h("ul", { class: "card-list" }, LISTEN.map(item => {
        const st = done[item.id];
        return h("li", {},
          h("a", { class: "row-card", href: Router.href("/listen/" + item.id) },
            h("span", { class: "row-icon" }, icon("speaker")),
            h("span", { class: "row-main" },
              h("strong", { dir: "auto" }, item.title),
              h("small", {}, item.ar + " · " + item.topic)),
            h("span", { class: "row-end" },
              h("span", { class: "chip-state " + (st ? "done" : "open") }, item.level),
              st ? h("span", { class: "score-tag" }, st.score + "%") : null)));
      }))
    });
  }

  function listenItem(params) {
    const item = byId(LISTEN, params.id);
    if (!item) return Browse.notFound();
    const player = makePlayer(item);
    const past = Store.getComm("listening", item.id);

    const transcript = h("details", { class: "transcript" },
      h("summary", {}, "اعرض النص (جرّب تسمع الأول من غيره)"),
      dialogue(item.lines));

    Shell.page({
      title: item.title,
      eyebrow: `استماع · ${item.level} · ${item.topic}`,
      subtitle: item.ar,
      back: "/listen",
      body: h("div", {},
        h("section", { class: "card" },
          h("p", {}, item.intro),
          player.node,
          transcript,
          h("div", { class: "actions" },
            h("button", { class: "btn primary", type: "button", onclick: () => questions(item, player) }, "ابدأ أسئلة الفهم")),
          past ? h("p", { class: "muted small" }, `آخر نتيجة ليك: ${past.score}%`) : null),
        item.words && item.words.length
          ? h("section", { class: "card" },
              h("h2", { class: "card-title" }, "كلمات وتعبيرات"),
              h("ul", { class: "word-list" }, item.words.map(w => h("li", { class: "word-item" },
                h("div", { class: "wi-main" },
                  h("div", { class: "wi-en" }, en(w.en, "strong"),
                    Speech.supported
                      ? h("button", { class: "play tiny", type: "button", "aria-label": "نطق " + w.en, onclick: () => Speech.say(w.en) }, icon("speaker"))
                      : null),
                  h("div", { class: "wi-ar" }, w.ar))))))
          : null)
    });
  }

  function questions(item, player) {
    let i = 0, right = 0;
    const wrong = [];

    function step() {
      if (i >= item.questions.length) return result();
      const q = item.questions[i];
      const feedback = h("div", { class: "feedback", role: "status", "aria-live": "polite" });
      const next = h("button", { class: "btn primary wide", type: "button", hidden: true }, "التالي");
      const list = optionList(q.options, q.answer, (ok, chosen) => {
        if (ok) right++; else wrong.push({ q, chosen });
        showFeedback(feedback, ok, q.answer);
        next.hidden = false;
        next.focus();
      });
      next.addEventListener("click", () => { i++; step(); });
      onKey(e => {
        if (/^[1-9]$/.test(e.key)) list.pick(Number(e.key) - 1);
        else if (e.key === "Enter" && e.target.tagName !== "BUTTON" && !next.hidden) next.click();
      });

      mount(h("main", { class: "screen" },
        h("div", { class: "topbar" },
          h("button", { class: "close", type: "button", "aria-label": "خروج", onclick: () => Router.go("/listen/" + item.id) }, icon("close")),
          h("div", { class: "topbar-main" },
            h("div", { class: "topbar-row" },
              h("strong", { dir: "auto" }, item.title),
              h("span", {}, `${i + 1} / ${item.questions.length}`)),
            h("div", {
              class: "progress", role: "progressbar", "aria-label": "تقدمك",
              "aria-valuemin": "0", "aria-valuemax": String(item.questions.length), "aria-valuenow": String(i)
            }, h("span", { style: `width:${(i / item.questions.length) * 100}%` })))),
        h("p", { class: "section-tag" }, "استماع"),
        h("div", { class: "listen mini" },
          h("button", { class: "play small", type: "button", "aria-label": "إعادة التشغيل", onclick: () => player.play(false) }, icon("speaker")),
          h("button", { class: "btn secondary small", type: "button", onclick: () => player.play(true) }, "أبطأ")),
        en(q.q, "p", "question"),
        list.node,
        h("div", { class: "step-bar" }, feedback, next)), { announce: false });
    }

    function result() {
      const score = Math.round((right / item.questions.length) * 100);
      Store.recordSession({
        kind: "listening", id: item.id, title: item.title, score, xp: right * 3,
        sections: { listening: { right, total: item.questions.length } }
      });
      Store.setComm("listening", item.id, { score, runs: ((Store.getComm("listening", item.id) || {}).runs || 0) + 1 });
      wrong.forEach(w => Store.logError({
        section: "listening", lessonId: null, lessonTitle: item.title,
        type: "choice", question: w.q.q, answer: w.q.answer, options: w.q.options,
        why: "من النص: " + item.lines.map(l => l.text).join(" ")
      }));

      Shell.page({
        title: `${right} من ${item.questions.length} صح`,
        eyebrow: "نتيجة الاستماع",
        back: "/listen",
        body: h("div", {},
          h("section", { class: "card" },
            h("div", { class: "plan-top" }, ring(score, { label: "نتيجة الاستماع", size: 92 }),
              h("div", {}, h("p", {}, score >= 70 ? "فهمك للحوار كويس." : "اسمع تاني مع النص، ده بيثبّت الأذن."))),
            h("details", { class: "transcript", open: true }, h("summary", {}, "النص كامل"), dialogue(item.lines)),
            h("div", { class: "actions" },
              h("a", { class: "btn primary", href: Router.href("/listen") }, "تسجيل تاني"),
              h("a", { class: "btn secondary", href: Router.href("/listen/" + item.id) }, "أعد السماع"),
              h("a", { class: "btn secondary", href: Router.href("/comm") }, "مهارات التواصل"))))
      });
    }

    step();
  }

  // ---------- المحادثات التفاعلية ----------
  function scenarioList() {
    const done = Store.getComm("scenarios");
    Shell.page({
      title: "محادثات تفاعلية",
      back: "/comm",
      subtitle: "أنت الشخص B. كل رد بيغيّر مسار الكلام، وفي الآخر هتعرف ردودك كانت طبيعية قد إيه.",
      body: h("ul", { class: "card-list" }, SCN.map(sc => {
        const st = done[sc.id];
        return h("li", {},
          h("a", { class: "row-card", href: Router.href("/scenario/" + sc.id) },
            h("span", { class: "row-icon" }, icon("cards")),
            h("span", { class: "row-main" },
              h("strong", { dir: "auto" }, sc.title),
              h("small", {}, sc.ar + " · " + sc.setting)),
            h("span", { class: "row-end" },
              h("span", { class: "chip-state " + (st ? "done" : "open") }, sc.level),
              st ? h("span", { class: "score-tag" }, st.best + "%") : null)));
      }))
    });
  }

  function scenarioRun(params) {
    const sc = byId(SCN, params.id);
    if (!sc) return Browse.notFound();
    let i = 0, points = 0;
    const log = [];
    const chat = h("div", { class: "chat", dir: "ltr", lang: "en" });

    function intro() {
      Shell.page({
        title: sc.title,
        eyebrow: `محادثة · ${sc.level}`,
        subtitle: sc.ar,
        back: "/scenario",
        body: h("div", { class: "card" },
          h("p", { class: "explain" }, sc.setting),
          h("p", { class: "muted small" }, "كل جولة فيها 3 ردود: واحد طبيعي، وواحد مفهوم بس فيه مشكلة، وواحد مش مناسب. هتشوف نتيجة كل اختيار على طول."),
          h("div", { class: "actions" },
            h("button", { class: "btn primary", type: "button", onclick: turn }, "ابدأ المحادثة"),
            h("a", { class: "btn secondary", href: Router.href("/scenario") }, "رجوع")))
      });
    }

    function bubble(who, text) {
      return h("div", { class: "msg " + who }, withAr(h("span", { class: "bub" }, text), text));
    }

    function turn() {
      if (i >= sc.turns.length) return finish();
      const t = sc.turns[i];
      chat.append(bubble("a", t.say));
      if (Speech.supported) Speech.say(t.say);

      const stage = h("div", {});
      const buttons = shuffle(t.options.slice()).map((opt, idx) => {
        const b = h("button", { class: "option", type: "button", dir: "ltr", lang: "en", "aria-keyshortcuts": String(idx + 1) },
          h("span", { class: "key", "aria-hidden": "true" }, String(idx + 1)),
          h("span", { class: "opt-text" }, opt.text));
        b.addEventListener("click", () => choose(opt, b, buttons, stage));
        return b;
      });
      onKey(e => { if (/^[1-9]$/.test(e.key) && buttons[Number(e.key) - 1]) buttons[Number(e.key) - 1].click(); });
      stage.append(h("div", { class: "options" }, buttons));

      mount(h("main", { class: "screen" },
        h("div", { class: "topbar" },
          h("button", { class: "close", type: "button", "aria-label": "خروج", onclick: () => Router.go("/scenario") }, icon("close")),
          h("div", { class: "topbar-main" },
            h("div", { class: "topbar-row" },
              h("strong", { dir: "auto" }, sc.title),
              h("span", {}, `${i + 1} / ${sc.turns.length}`)),
            h("div", {
              class: "progress", role: "progressbar", "aria-label": "تقدمك في المحادثة",
              "aria-valuemin": "0", "aria-valuemax": String(sc.turns.length), "aria-valuenow": String(i)
            }, h("span", { style: `width:${(i / sc.turns.length) * 100}%` })))),
        h("p", { class: "section-tag" }, "محادثة"),
        chat, stage), { announce: false });
    }

    function choose(opt, btn, buttons, stage) {
      buttons.forEach(b => b.setAttribute("aria-disabled", "true"));
      btn.classList.add(opt.score === 2 ? "right" : opt.score === 1 ? "part" : "wrong");
      points += opt.score;
      const best = sc.turns[i].options.reduce((a, b) => (b.score > a.score ? b : a));
      log.push({ say: sc.turns[i].say, chosen: opt, best });
      chat.append(bubble("b", opt.text));
      chat.append(bubble("a", opt.reply));
      if (Speech.supported) Speech.say(opt.reply);
      if (opt.score === 0) {
        Store.logError({
          section: "conversation", lessonId: null, lessonTitle: sc.title,
          type: "choice", question: sc.turns[i].say, answer: best.text,
          options: sc.turns[i].options.map(o => o.text), why: best.note
        });
      }

      const fb = h("div", { class: "feedback " + (opt.score === 2 ? "right" : "wrong") },
        h("span", { class: "fb-icon", "aria-hidden": "true" }, icon(opt.score === 2 ? "check" : "info")),
        h("span", {}, opt.note));
      const next = h("button", { class: "btn primary wide", type: "button", onclick: () => { i++; turn(); } },
        i + 1 >= sc.turns.length ? "إنهاء المحادثة" : "كمّل");
      stage.append(h("div", { class: "step-bar" }, fb, next));
      next.focus();
    }

    function finish() {
      const max = sc.turns.length * 2;
      const score = Math.round((points / max) * 100);
      const natural = log.filter(l => l.chosen.score === 2).length;
      const prev = Store.getComm("scenarios", sc.id);
      Store.recordSession({
        kind: "scenario", id: sc.id, title: sc.title, score, xp: natural * 4,
        sections: { conversation: { right: natural, total: sc.turns.length } }
      });
      Store.setComm("scenarios", sc.id, { best: Math.max(score, (prev && prev.best) || 0), lastScore: score, runs: ((prev && prev.runs) || 0) + 1 });

      const verdict = score >= 85 ? "ردودك كانت طبيعية ومهذبة." : score >= 60 ? "مفهوم، بس فيه ردود تقدر تحسّنها." : "ركّز على صيغ الأدب والطلب، وأعد المحادثة.";

      Shell.page({
        title: "نتيجة المحادثة",
        eyebrow: sc.title,
        back: "/scenario",
        body: h("div", {},
          h("section", { class: "card" },
            h("div", { class: "plan-top" },
              ring(score, { label: "تقييم ردودك", size: 96 }),
              h("div", {},
                h("p", {}, h("strong", {}, `${natural} من ${sc.turns.length}`), " رد طبيعي"),
                h("p", { class: "muted" }, verdict)))),
          h("section", { class: "card" },
            h("h2", { class: "card-title" }, "مراجعة ردودك"),
            h("ol", { class: "mistake-list" }, log.map((l, n) => h("li", { class: "mistake" + (l.chosen.score === 2 ? " ok" : "") },
              h("div", { class: "mk-head" },
                h("span", { class: "mk-n", "aria-hidden": "true" }, String(n + 1)),
                h("span", { class: "mk-tag" }, l.chosen.score === 2 ? "رد طبيعي" : l.chosen.score === 1 ? "مفهوم بس أحسن منه موجود" : "رد غير مناسب")),
              en(l.say, "p", "mk-q"),
              h("p", { class: "mk-line " + (l.chosen.score === 2 ? "right" : "wrong") },
                h("span", { class: "mk-label" }, "ردك: "), en(l.chosen.text)),
              l.chosen.score !== 2
                ? h("p", { class: "mk-line right" }, h("span", { class: "mk-label" }, "الأفضل: "), en(l.best.text))
                : null,
              h("p", { class: "mk-why" }, h("span", { class: "mk-icon", "aria-hidden": "true" }, icon("bulb")), h("span", {}, l.chosen.note)))))),
          sc.phrases && sc.phrases.length
            ? h("section", { class: "card" },
                h("h2", { class: "card-title" }, "جمل احفظها من الموقف ده"),
                h("ul", { class: "phrase-list" }, sc.phrases.map(p => h("li", {}, en(p),
                  Speech.supported
                    ? h("button", { class: "play tiny", type: "button", "aria-label": "نطق الجملة", onclick: () => Speech.say(p) }, icon("speaker"))
                    : null))))
            : null,
          h("div", { class: "actions" },
            h("button", { class: "btn primary", type: "button", onclick: () => scenarioRun(params) }, "أعد المحادثة"),
            h("a", { class: "btn secondary", href: Router.href("/scenario") }, "محادثة تانية"),
            h("a", { class: "btn secondary", href: Router.href("/comm") }, "مهارات التواصل")))
      });
    }

    intro();
  }

  // ---------- النطق والتسجيل ----------
  const Rec = (function () {
    const supported = typeof navigator !== "undefined" && navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia && typeof window.MediaRecorder !== "undefined";
    let recorder = null, chunks = [], stream = null, url = null;

    async function start() {
      if (!supported) throw new Error("unsupported");
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorder = new MediaRecorder(stream);
      chunks = [];
      recorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
      recorder.start();
    }
    function stop() {
      return new Promise(resolve => {
        if (!recorder) return resolve(null);
        recorder.onstop = () => {
          if (url) URL.revokeObjectURL(url);
          const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
          url = URL.createObjectURL(blob);
          if (stream) stream.getTracks().forEach(t => t.stop());
          recorder = null;
          resolve(url);
        };
        recorder.stop();
      });
    }
    function release() {
      if (recorder) { try { recorder.stop(); } catch (e) {} recorder = null; }
      if (stream) stream.getTracks().forEach(t => t.stop());
      if (url) { URL.revokeObjectURL(url); url = null; }
    }
    return { supported, start, stop, release };
  })();

  function speakList() {
    const done = Store.getComm("speaking");
    Shell.page({
      title: "النطق والتسجيل",
      back: "/comm",
      subtitle: Rec.supported
        ? "اسمع النموذج، سجّل نفسك، وقارن. التسجيل بيفضل على جهازك ومش بيترفع لأي حتة."
        : "متصفحك مش بيدعم التسجيل، فهتقدر تسمع النموذج وتكرر وراه (التسجيل محتاج https أو localhost).",
      body: h("ul", { class: "card-list" }, SPK.map(pack => {
        const st = done[pack.id];
        return h("li", {},
          h("a", { class: "row-card", href: Router.href("/speak/" + pack.id) },
            h("span", { class: "row-icon" }, icon("speaker")),
            h("span", { class: "row-main" },
              h("strong", { dir: "auto" }, pack.title),
              h("small", {}, pack.ar + " · " + pack.lines.length + " جمل")),
            h("span", { class: "row-end" },
              h("span", { class: "chip-state " + (st ? "done" : "open") }, pack.level),
              st ? h("span", { class: "score-tag" }, st.score + "%") : null)));
      }))
    });
  }

  function speakRun(params) {
    const pack = byId(SPK, params.id);
    if (!pack) return Browse.notFound();
    let i = 0, good = 0;

    function step() {
      if (i >= pack.lines.length) return finish();
      const line = pack.lines[i];
      const player = makePlayer({ src: `audio/speak/${pack.id}-${i + 1}.mp3` }, [{ who: "A", text: line.en }]);
      // الشخصية اللي بتقول الجملة (زي الفيديو في Busuu): صورة مرسومة + جملة تحتها + ترجمة اختيارية
      const speaker = People.pairFor([{ text: line.en }]).A;
      const trans = h("p", { class: "speak-ar", hidden: true }, line.ar);
      const transBtn = h("button", { class: "btn secondary small", type: "button",
        onclick: () => { trans.hidden = !trans.hidden; } }, "الترجمة");
      const replayBtn = h("button", { class: "speak-round", type: "button", "aria-label": "إعادة التشغيل",
        onclick: () => player.play(false) }, icon("speaker"));
      const slowBtn = h("button", { class: "btn secondary small", type: "button",
        onclick: () => player.play(true) }, "أبطأ");
      setTimeout(() => player.play(false), 400);
      const playback = h("audio", { controls: true, class: "playback", hidden: true });
      const status = h("p", { class: "muted small", role: "status", "aria-live": "polite" },
        Rec.supported ? "اسمع النموذج الأول، وبعدين سجّل نفسك." : "متصفحك مش بيدعم التسجيل — كرر ورا النموذج بصوت عالي.");
      let recording = false;

      const recBtn = h("button", { class: "mic-btn" + (Rec.supported ? "" : " off"), type: "button", disabled: !Rec.supported,
        "aria-label": "ابدأ التسجيل" }, icon("write"));
      recBtn.addEventListener("click", async () => {
        if (!Rec.supported) return;
        if (!recording) {
          try {
            await Rec.start();
            recording = true;
            recBtn.setAttribute("aria-label", "أوقف التسجيل");
            recBtn.classList.add("recording");
            status.textContent = "بيسجّل… اقرأ الجملة بصوت واضح.";
          } catch (e) {
            status.textContent = "مقدرناش نفتح المايك. اسمح بالإذن، ولو فاتح الملف من file:// شغّل سيرفر محلي.";
          }
          return;
        }
        const url = await Rec.stop();
        recording = false;
        recBtn.setAttribute("aria-label", "سجّل تاني");
        recBtn.classList.remove("recording");
        if (url) {
          playback.src = url;
          playback.hidden = false;
          status.textContent = "اسمع تسجيلك وقارنه بالنموذج، وبعدين قيّم نفسك.";
        }
      });

      const rate = ok => () => { if (ok) good++; i++; Rec.release(); step(); };

      mount(h("main", { class: "screen" },
        h("div", { class: "topbar" },
          h("button", { class: "close", type: "button", "aria-label": "خروج", onclick: () => { Rec.release(); Router.go("/speak"); } }, icon("close")),
          h("div", { class: "topbar-main" },
            h("div", { class: "topbar-row" },
              h("strong", { dir: "auto" }, pack.title),
              h("span", {}, `${i + 1} / ${pack.lines.length}`)),
            h("div", {
              class: "progress", role: "progressbar", "aria-label": "تقدمك",
              "aria-valuemin": "0", "aria-valuemax": String(pack.lines.length), "aria-valuenow": String(i)
            }, h("span", { style: `width:${(i / pack.lines.length) * 100}%` })))),
        h("p", { class: "section-tag" }, "نطق"),
        h("div", { class: "speak-stage" },
          h("div", { class: "speak-person" }, People.avatar(speaker)),
          h("div", { class: "speak-sub", dir: "ltr", lang: "en" }, line.en),
          trans),
        h("div", { class: "speak-controls" }, replayBtn, slowBtn, transBtn),
        h("p", { class: "muted small speak-hint" }, "اضغط وكرّر ما سمعته"),
        recBtn,
        player.node,
        line.tip ? h("div", { class: "tip" }, h("span", { class: "tip-icon", "aria-hidden": "true" }, icon("bulb")), h("p", {}, line.tip)) : null,
        h("div", { class: "rec-box" }, playback, status),
        h("div", { class: "step-bar" },
          h("div", { class: "actions" },
            h("button", { class: "btn primary", type: "button", onclick: rate(true) }, "نطقتها صح"),
            h("button", { class: "btn secondary", type: "button", onclick: rate(false) }, "محتاج تكرار")))), { announce: false });
    }

    function finish() {
      const score = Math.round((good / pack.lines.length) * 100);
      const prev = Store.getComm("speaking", pack.id);
      Store.recordSession({
        kind: "speaking", id: pack.id, title: pack.title, score, xp: good * 2,
        sections: { speaking: { right: good, total: pack.lines.length } }
      });
      Store.setComm("speaking", pack.id, { score, runs: ((prev && prev.runs) || 0) + 1 });
      Shell.page({
        title: "خلّصت تدريب النطق",
        eyebrow: pack.title,
        back: "/speak",
        body: h("div", { class: "card" },
          h("p", {}, `قيّمت ${good} من ${pack.lines.length} جملة إنك نطقتها صح.`),
          h("p", { class: "muted small" }, "التقييم هنا ذاتي — الأدق إنك تسجّل نفسك وتسمع الفرق بينك وبين النموذج مرتين."),
          h("div", { class: "actions" },
            h("button", { class: "btn primary", type: "button", onclick: () => speakRun(params) }, "أعد التدريب"),
            h("a", { class: "btn secondary", href: Router.href("/speak") }, "مجموعة تانية"),
            h("a", { class: "btn secondary", href: Router.href("/comm") }, "مهارات التواصل")))
      });
    }

    step();
  }

  // ---------- تدريبات الكتابة ----------
  function writeList() {
    const done = Store.getComm("writing");
    Shell.page({
      title: "كتابة إيميلات ورسائل",
      back: "/comm",
      subtitle: "اكتب المهمة بنفسك، والتطبيق بيراجع العناصر المطلوبة ويوريك نموذج للمقارنة.",
      body: h("ul", { class: "card-list" }, WRT.map(task => {
        const st = done[task.id];
        return h("li", {},
          h("a", { class: "row-card", href: Router.href("/write/" + task.id) },
            h("span", { class: "row-icon" }, icon("write")),
            h("span", { class: "row-main" },
              h("strong", { dir: "auto" }, task.title),
              h("small", {}, task.ar + " · " + (task.kind === "email" ? "إيميل" : "رسالة قصيرة"))),
            h("span", { class: "row-end" },
              h("span", { class: "chip-state " + (st ? "done" : "open") }, task.level),
              st ? h("span", { class: "score-tag" }, st.score + "%") : null)));
      }))
    });
  }

  function checkWriting(task, text) {
    const t = " " + text.toLowerCase().replace(/\s+/g, " ") + " ";
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const items = task.checks.map(c => ({
      label: c.label,
      ok: c.any.some(k => t.includes(k.toLowerCase()))
    }));
    const extras = [];
    extras.push({ label: `الطول (${task.minWords} كلمة على الأقل)`, ok: words >= task.minWords, value: words + " كلمة" });
    if (task.kind === "email") {
      extras.push({ label: "فقرات (سطر فاضي بين الأفكار)", ok: /\n\s*\n/.test(text) });
    }
    extras.push({ label: "ضمير المتكلم I بحرف كبير", ok: !/\bi\b/.test(text) || /\bI\b/.test(text) });
    const all = items.concat(extras);
    const okCount = all.filter(x => x.ok).length;
    return { items: all, score: Math.round((okCount / all.length) * 100), words, okCount, total: all.length };
  }

  function writeTask(params) {
    const task = byId(WRT, params.id);
    if (!task) return Browse.notFound();
    const saved = Store.getComm("writing", task.id) || {};
    const area = h("textarea", {
      class: "write-area", rows: "12", dir: "ltr", lang: "en", spellcheck: "true",
      placeholder: task.kind === "email" ? "Dear …" : "Hi …",
      "aria-label": "اكتب إجابتك بالإنجليزي"
    });
    area.value = saved.draft || "";

    const counter = h("p", { class: "muted small", role: "status", "aria-live": "polite" });
    function count() {
      const n = area.value.trim().split(/\s+/).filter(Boolean).length;
      counter.textContent = `${n} كلمة (المطلوب ${task.minWords} على الأقل)`;
    }
    area.addEventListener("input", () => {
      count();
      Store.setComm("writing", task.id, { draft: area.value.slice(0, 2000) });
    });
    count();

    const resultBox = h("div", {});

    function review() {
      if (!area.value.trim()) return;
      const r = checkWriting(task, area.value);
      const prev = Store.getComm("writing", task.id) || {};
      Store.recordSession({
        kind: "writing", id: task.id, title: task.title, score: r.score, xp: Math.round(r.score / 10),
        sections: { writing: { right: r.okCount, total: r.total } }
      });
      Store.setComm("writing", task.id, {
        score: Math.max(r.score, prev.score || 0), lastScore: r.score, draft: area.value.slice(0, 2000),
        runs: (prev.runs || 0) + 1
      });

      resultBox.replaceChildren(
        h("section", { class: "card" },
          h("div", { class: "plan-top" },
            ring(r.score, { label: "تقييم الكتابة", size: 92 }),
            h("div", {},
              h("p", {}, h("strong", {}, `${r.okCount} من ${r.total}`), " عنصر مطلوب موجود"),
              h("p", { class: "muted small" }, "التصحيح الآلي بيشوف العناصر والتعبيرات المطلوبة، مش جمال الأسلوب — قارن بالنموذج تحت."))),
          h("ul", { class: "check-list" }, r.items.map(x => h("li", { class: x.ok ? "ok" : "no" },
            h("span", { class: "ck-icon", "aria-hidden": "true" }, icon(x.ok ? "check" : "close")),
            h("span", {}, x.label, x.value ? h("small", { class: "muted" }, " — " + x.value) : null)))),
          h("details", { class: "transcript" },
            h("summary", {}, "شوف النموذج وقارن"),
            h("pre", { class: "model", dir: "ltr", lang: "en" }, task.model))));
      resultBox.scrollIntoView({ block: "start" });
      announce(`التقييم ${r.score} بالمئة`);
    }

    Shell.page({
      title: task.title,
      eyebrow: `كتابة · ${task.level} · ${task.kind === "email" ? "إيميل" : "رسالة"}`,
      subtitle: task.ar,
      back: "/write",
      body: h("div", {},
        h("section", { class: "card" },
          h("p", { class: "explain" }, task.brief),
          h("h2", { class: "card-title" }, "المطلوب في النص"),
          h("ul", { class: "req-list" }, task.checks.map(c => h("li", {}, c.label))),
          task.phrases && task.phrases.length
            ? h("div", {},
                h("h2", { class: "card-title" }, "تعبيرات تساعدك"),
                h("ul", { class: "phrase-list" }, task.phrases.map(p => h("li", {}, en(p)))))
            : null),
        h("section", { class: "card" },
          area, counter,
          h("div", { class: "actions" },
            h("button", { class: "btn primary", type: "button", onclick: review }, "راجع نصّي"),
            h("button", {
              class: "btn secondary", type: "button",
              onclick: () => { area.value = ""; count(); Store.setComm("writing", task.id, { draft: "" }); area.focus(); }
            }, "امسح وابدأ من جديد"))),
        resultBox)
    });
  }

  return {
    hub, listenList, listenItem, scenarioList, scenarioRun,
    speakList, speakRun, writeList, writeTask, checkWriting,
    counts: () => ({ listening: LISTEN.length, scenarios: SCN.length, speaking: SPK.length, writing: WRT.length })
  };
})();
