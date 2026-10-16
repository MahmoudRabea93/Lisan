// يبني أسئلة الدرس من بياناته: 6 أقسام تدريب + اختبار نهائي (10 أسئلة)
//   المفردات 5 | الاستماع 3 | المحادثة 4 | القواعد 5 | القراءة 3 | الكتابة 2
const Builder = (function () {
  const FINAL = 10;

  function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  // مكان الكلمة داخل الجملة (كلمة كاملة، من غير حساسية لحالة الحروف)
  function locate(ex, en) {
    const m = new RegExp("(^|[^A-Za-z'])(" + esc(en) + ")(?![A-Za-z'])", "i").exec(ex);
    if (!m) return null;
    const start = m.index + m[1].length;
    return { start, end: start + m[2].length };
  }
  function blank(ex, en) {
    const loc = locate(ex, en);
    return loc ? ex.slice(0, loc.start) + "___" + ex.slice(loc.end) : null;
  }
  function similar(a, b) { return a === b || a.includes(b) || b.includes(a); }

  // اختيارات خاطئة: من كلمات الدرس أولاً ثم من باقي الكلمات، من غير ما تتشابه مع الصح
  function distract(lesson, w, field, n) {
    const out = [];
    for (const pool of [lesson.vocab, Vocab.all()]) {
      for (const o of shuffle(pool)) {
        if (out.length >= n) return out;
        if (o.en === w.en || similar(o.ar, w.ar) || similar(o.en.toLowerCase(), w.en.toLowerCase())) continue;
        if (out.some(x => similar(x, o[field]))) continue;
        out.push(o[field]);
      }
    }
    return out;
  }

  // ---------- المفردات ----------
  function vocabItem(kind, w, lesson) {
    const base = { section: "vocab", type: "choice", word: { en: w.en, ar: w.ar } };
    if (kind === "cloze" && w.ex) {
      const q = blank(w.ex, w.en);
      const d = distract(lesson, w, "en", 2);
      if (q && d.length === 2) {
        return { ...base, prompt: "أكمل الجملة بالكلمة المناسبة", question: `${q}  (${w.ar})`, options: [w.en, ...d], answer: w.en };
      }
    }
    if (kind === "use" && w.ex && locate(w.ex, w.en)) {
      const others = shuffle(lesson.vocab.filter(o => o.en !== w.en && o.ex && !locate(o.ex, w.en))).slice(0, 2);
      if (others.length === 2) {
        return { ...base, prompt: "أي جملة بتستخدم الكلمة دي؟", question: `"${w.en}"`, options: [w.ex, ...others.map(o => o.ex)], answer: w.ex };
      }
    }
    if (kind === "reverse") {
      const d = distract(lesson, w, "en", 2);
      if (d.length === 2) return { ...base, question: `Which word means "${w.ar}"?`, options: [w.en, ...d], answer: w.en };
    }
    return { ...base, question: `What does "${w.en}" mean?`, options: [w.ar, ...distract(lesson, w, "ar", 2)], answer: w.ar };
  }

  // ---------- الاستماع ----------
  function withSentence(lesson, avoid, min) {
    return shuffle(lesson.vocab.filter(w => w.ex && w.ex.split(" ").length >= (min || 4) && locate(w.ex, w.en) && !avoid.includes(w.en)));
  }
  function dictation(lesson, avoid) {
    const w = withSentence(lesson, avoid)[0];
    if (!w) return null;
    return { section: "listening", type: "dictation", say: w.ex, shown: blank(w.ex, w.en), answer: w.en, full: w.ex };
  }
  function listenEx(lesson, avoid, notSay) {
    const w = shuffle(lesson.vocab.filter(o => o.ex && o.ex.split(" ").length >= 3 && !(avoid || []).includes(o.en) && o.ex !== notSay))[0];
    if (!w) return null;
    const others = shuffle(lesson.vocab.filter(o => o.en !== w.en && o.ex && o.ex !== w.ex)).slice(0, 2).map(o => o.ex);
    if (others.length < 2) return null;
    return { section: "listening", type: "listen", say: w.ex, options: [w.ex, ...others], answer: w.ex, used: w.en };
  }
  function listenQ(t) {
    return {
      section: "listening", type: "listenQ", lines: t.lines.map(l => ({ who: l.who, text: l.text })),
      question: t.q.question, options: t.q.options, answer: t.q.answer
    };
  }

  // ---------- المحادثة ----------
  function convItems(t) {
    const ts = [];
    for (let k = 0; k + 1 < t.lines.length; k += 2) ts.push({ a: t.lines[k].text, b: t.lines[k + 1].text, wrong: t.lines[k + 1].wrong });
    const reply = k => ({
      section: "conversation", type: "choice", prompt: "اختر الرد الطبيعي المناسب",
      question: ts[k].a, options: [ts[k].b, ...ts[k].wrong], answer: ts[k].b
    });
    const complete = {
      section: "conversation", type: "choice", prompt: "أكمل الحوار بالجملة المناسبة", question: "ما الجملة الناقصة؟",
      dialogue: t.lines.map((l, j) => ({ who: l.who, text: j === 3 ? null : l.text })),
      options: [ts[1].b, ...ts[1].wrong], answer: ts[1].b
    };
    const lines = t.lines.map(l => `${l.who}: ${l.text}`);
    const seq = { section: "conversation", type: "order", vertical: true, prompt: "رتّب جمل الحوار", words: lines, answer: lines.join(" "), answerShow: lines.join("  ⟵  ") };
    const role = {
      section: "conversation", type: "roleplay", prompt: "مثّل الحوار: أنت الشخص B",
      steps: ts.map(x => ({ say: x.a, options: [x.b, ...x.wrong], answer: x.b }))
    };
    return { practice: [reply(0), complete, seq, role], final: reply(2) };
  }

  // ---------- القراءة ----------
  function readingItems(r) {
    return r.questions.map(q => ({ section: "reading", type: "choice", passage: r.text, question: q.question, options: q.options, answer: q.answer }));
  }

  // ---------- الكتابة ----------
  function orderItem(lesson, avoid) {
    const w = shuffle(lesson.vocab.filter(o => o.ex && o.ex.split(" ").length >= 3 && o.ex.split(" ").length <= 8 && !avoid.includes(o.en)))[0];
    if (!w) return null;
    return { section: "writing", type: "order", hint: `The sentence contains the word “${w.en}” (${w.ar})`, words: w.ex.split(" "), answer: w.ex, used: w.en };
  }
  function writeItem(lesson, avoid) {
    const w = shuffle(lesson.vocab.filter(o => !avoid.includes(o.en)))[0];
    return { section: "writing", type: "write", prompt: `Write an English sentence using the word “${w.en}” (${w.ar})`, must: w.en, model: w.ex || "" };
  }

  // ---------- التجميع ----------
  function build(lesson, audioOK) {
    const words = shuffle(lesson.vocab);
    const n = words.length;
    const pk = ["meaning", "cloze", "reverse", "cloze", "use"];
    const fk = ["reverse", "use", "meaning", "reverse", "cloze"];
    const vocab = pk.map((k, i) => vocabItem(k, words[i % n], lesson));
    const finalVocab = Array.from({ length: 7 }, (_, i) => {
      const j = (i + 2) % n;
      return vocabItem(fk[j % 5], words[j], lesson);
    });

    let listening = [];
    const own = lesson.exercises.find(e => e.type === "listen");
    if (own) listening.push({ ...own });
    const d1 = dictation(lesson, []);
    if (d1) listening.push(d1);
    if (lesson.talk && lesson.talk.q) listening.push(listenQ(lesson.talk));
    else {
      const d2 = dictation(lesson, d1 ? [d1.answer] : []);
      if (d2) listening.push(d2);
    }
    if (audioOK && listening.length < 3) {
      const extra = listenEx(lesson, [], own ? own.say : "");
      if (extra) listening.push(extra);
    }
    if (!audioOK) listening = [];

    const conv = lesson.talk ? convItems(lesson.talk) : null;
    const grammar = lesson.exercises.filter(e => e.type !== "listen").slice(0, 5).map(e => ({ ...e, section: "grammar" }));
    const reading = lesson.reading ? readingItems(lesson.reading) : [];
    const o1 = orderItem(lesson, []);
    const writing = [o1, writeItem(lesson, o1 ? [o1.used] : [])].filter(Boolean);

    const sections = [
      ["vocab", vocab], ["listening", listening], ["conversation", conv ? conv.practice : []],
      ["grammar", grammar], ["reading", reading], ["writing", writing]
    ];

    // الاختبار النهائي: مزيج من كل الأقسام
    const final = finalVocab.slice(0, 3);
    if (audioOK) {
      const e1 = listenEx(lesson, own ? [] : []);
      if (e1) final.push(e1);
      const d = dictation(lesson, d1 ? [d1.answer] : []);
      const e2 = d || listenEx(lesson, e1 ? [e1.used] : []);
      if (e2) final.push(e2);
    }
    if (conv) final.push(conv.final);
    final.push(...shuffle(grammar).slice(0, 2));
    if (reading.length) final.push(shuffle(reading)[0]);
    const o2 = orderItem(lesson, o1 ? [o1.used] : []);
    if (o2) final.push(o2);
    const extras = finalVocab.slice(3).concat(shuffle(grammar));
    while (final.length < FINAL && extras.length) final.push(extras.shift());

    const steps = [];
    sections.forEach(([key, items]) => items.forEach((it, k) =>
      steps.push({ ...it, section: key, phase: "practice", idx: k, total: items.length })));
    const finalStart = steps.length;
    const finalItems = shuffle(final).slice(0, FINAL);
    finalItems.forEach((it, k) => steps.push({ ...it, phase: "final", idx: k, total: finalItems.length }));
    return { steps, finalStart };
  }

  return { build, FINAL };
})();
