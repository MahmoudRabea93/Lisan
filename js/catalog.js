// فهرس المنهج: المستويات ← الوحدات ← الدروس، وحساب التقدم والفتح التدريجي
const Catalog = (function () {
  const ORDER = ["A1", "A2", "B1", "B2"];

  const INFO = {
    A1: {
      name: "مبتدئ", short: "تبدأ من الصفر",
      about: "أول خطوة: تعرّف بنفسك، أرقام وألوان وعائلة وأكل وأماكن ووقت. تقدر تعمل محادثة بسيطة جداً عن نفسك.",
      can: ["تحيّي وتعرّف بنفسك", "تسأل أسئلة بسيطة وترد عليها", "تتكلم عن عائلتك وبيتك ويومك"]
    },
    A2: {
      name: "أساسي", short: "تتعامل في المواقف اليومية",
      about: "تتكلم عن الماضي والمستقبل، تتسوّق وتسافر وتحكي عن خططك بجمل أطول.",
      can: ["تحكي عن حاجة حصلت امبارح", "تتكلم عن خططك الجاية", "تتعامل في المحل والمطعم والسفر"]
    },
    B1: {
      name: "متوسط", short: "تعبّر عن رأيك",
      about: "تربط أفكارك، تشرح أسباب، وتتكلم في الشغل والدراسة والأخبار بثقة أكبر.",
      can: ["تشرح رأيك وسببه", "تتعامل في معظم مواقف السفر", "تكتب رسالة أو إيميل بسيط"]
    },
    B2: {
      name: "فوق المتوسط", short: "تناقش وتجادل",
      about: "تفهم نصوص أطول وتناقش مواضيع مجرّدة، وتصحّح أخطاءك بنفسك.",
      can: ["تناقش وتدافع عن وجهة نظرك", "تفهم مقال أو فيديو طويل", "تكتب نص مترابط عن موضوع"]
    }
  };

  const lessons = [];   // الدروس الحقيقية بالترتيب (هي أساس الفتح التدريجي)
  const levels = [];
  const byLessonId = {};
  const byUnitId = {};

  const courses = (typeof COURSES !== "undefined" ? COURSES : []).slice();
  const sorted = ORDER.map(code => courses.find(c => c.level === code))
    .filter(Boolean)
    .concat(courses.filter(c => ORDER.indexOf(c.level) === -1));

  sorted.forEach(course => {
    const info = INFO[course.level] || {};
    const level = {
      code: course.level,
      name: info.name || course.level,
      short: info.short || "",
      about: course.about || info.about || "",
      can: info.can || [],
      planned: !!course.planned,
      units: []
    };
    (course.units || []).forEach(unitData => {
      const unit = {
        id: unitData.id,
        title: unitData.title,
        goal: unitData.goal || "",
        goals: unitData.goals || [],
        level: level.code,
        levelRef: level,
        planned: !!(unitData.planned || course.planned),
        lessons: []
      };
      (unitData.lessons || []).forEach(data => {
        const planned = !!(data.planned || unit.planned);
        const entry = Object.assign({}, data, {
          level: level.code,
          levelName: level.name,
          unitId: unit.id,
          unitTitle: unit.title,
          goals: unit.goals || [],
          unitRef: unit,
          planned,
          pos: unit.lessons.length + 1,
          index: planned ? -1 : lessons.length
        });
        if (!planned) lessons.push(entry);
        unit.lessons.push(entry);
        if (entry.id) byLessonId[entry.id] = entry;
      });
      byUnitId[unit.id] = unit;
      level.units.push(unit);
    });
    levels.push(level);
  });

  // ---------- الحالة ----------
  function passed(entry, state) {
    return !!entry && !entry.planned && (state.completed[entry.id] || 0) >= Store.PASS;
  }
  function tried(entry, state) {
    return !!entry && state.completed[entry.id] != null;
  }
  function unlocked(entry, state) {
    if (!entry || entry.planned) return false;
    if (entry.index === 0) return true;
    if ((state.skip || []).includes(entry.level)) return true;
    const prev = lessons[entry.index - 1];
    return (state.skip || []).includes(prev.level) || passed(prev, state);
  }
  // "done" خلّصه | "open" مفتوح | "locked" مقفول | "soon" لسه متكتبش
  function status(entry, state) {
    if (entry.planned) return "soon";
    if (passed(entry, state)) return "done";
    return unlocked(entry, state) ? "open" : "locked";
  }

  function nextLesson(state) {
    return lessons.find(l => !passed(l, state) && !(state.skip || []).includes(l.level)) || null;
  }
  function lessonAfter(entry) {
    return entry && entry.index >= 0 ? lessons[entry.index + 1] || null : null;
  }

  function count(list, state) {
    const real = list.filter(l => !l.planned);
    return {
      done: real.filter(l => passed(l, state)).length,
      total: real.length,
      planned: list.length - real.length,
      all: list.length,
      get pct() { return this.total ? Math.round((this.done / this.total) * 100) : 0; }
    };
  }
  function unitProgress(unit, state) { return count(unit.lessons, state); }
  function levelProgress(level, state) {
    return count(level.units.reduce((a, u) => a.concat(u.lessons), []), state);
  }
  function overall(state) { return count(lessons, state); }

  function levelStatus(level, state) {
    if (level.planned) return "soon";
    const p = levelProgress(level, state);
    if (p.total && p.done === p.total) return "done";
    const open = level.units.some(u => u.lessons.some(l => unlocked(l, state)));
    return open ? "open" : "locked";
  }
  function unitStatus(unit, state) {
    if (unit.planned) return "soon";
    const p = unitProgress(unit, state);
    if (p.total && p.done === p.total) return "done";
    return unit.lessons.some(l => unlocked(l, state)) ? "open" : "locked";
  }

  // الوحدات اللي بتخدم هدف معيّن (work / travel / talk)
  function unitsForGoal(goal) {
    const out = [];
    levels.forEach(l => l.units.forEach(u => { if ((u.goals || []).includes(goal)) out.push(u); }));
    return out;
  }
  function lessonServesGoal(entry, goal) {
    return !goal || goal === "general" || (entry.goals || []).includes(goal);
  }

  // الدروس اللي اتعملت وكان فيها ضعف في قسم معيّن (لاقتراح مراجعة)
  function weakLessons(section, state, limit) {
    const out = [];
    lessons.forEach(l => {
      const list = (state.attempts || {})[l.id] || [];
      const last = list[list.length - 1];
      const s = last && last.sections && last.sections[section];
      if (s && s.total && s.right / s.total < 0.7) out.push({ lesson: l, pct: Math.round((s.right / s.total) * 100) });
    });
    return out.sort((a, b) => a.pct - b.pct).slice(0, limit || 3);
  }

  // أقسام المهارات: مستخدمة في الدرس والنتيجة ولوحة التحكم
  const SECTIONS = {
    order: ["vocab", "listening", "conversation", "grammar", "reading", "writing", "speaking"],
    labels: {
      vocab: "المفردات", listening: "الاستماع", conversation: "المحادثة",
      grammar: "القواعد", reading: "القراءة", writing: "الكتابة", speaking: "النطق"
    },
    icons: {
      vocab: "book", listening: "speaker", conversation: "cards",
      grammar: "target", reading: "path", writing: "write", speaking: "speaker"
    },
    advice: {
      vocab: "راجع كلمات الدرس من صفحة المراجعة، والكلمات اللي غلطت فيها اتضافت لك تلقائياً.",
      listening: "اسمع الجملة أكتر من مرة واستعمل زرار «أبطأ»، وبعدين اقرأ النص وأنت بتسمع.",
      conversation: "اقرأ الحوار بصوت عالي، واحفظ الردود الجاهزة للمواقف المتكررة.",
      grammar: "ارجع لشرح القاعدة في أول الدرس، وأعد التمارين بعد ما تقراه.",
      reading: "اقرأ النص مرتين: مرة بسرعة للفكرة العامة، ومرة بالراحة وأنت بتدوّر على الإجابة.",
      writing: "اكتب جملتين بالكلمات الجديدة وقارنهم بجمل الأمثلة في الدرس.",
      speaking: "سجّل نفسك وأنت بتقرأ الجملة، واسمعها ورا النموذج مرتين قبل ما تعيد."
    }
  };

  return {
    ORDER, INFO, SECTIONS, levels, lessons,
    lesson: id => byLessonId[id] || null,
    unit: id => byUnitId[id] || null,
    level: code => levels.find(l => l.code === code) || null,
    passed, tried, unlocked, status, nextLesson, lessonAfter, unitsForGoal, lessonServesGoal,
    unitProgress, levelProgress, overall, levelStatus, unitStatus, weakLessons
  };
})();
