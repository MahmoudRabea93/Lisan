// حفظ التقدم في localStorage: الدروس، النقاط، المراجعة، المحاولات، النشاط اليومي
const Store = (function () {
  const KEY = "english-app-v2";
  const OLD_KEY = "english-app-v1";
  const PASS = 80;                    // النسبة المطلوبة لفتح الدرس التالي
  const KEEP_ATTEMPTS = 5;            // آخر كام محاولة بنحتفظ بيها لكل درس
  const KEEP_DAYS = 120;              // مدة سجل النشاط اليومي
  const INTERVALS = { 1: 1, 2: 3, 3: 7, 4: 14, 5: 30 };  // ليتنر

  function fmt(d) { return d.toLocaleDateString("en-CA"); } // yyyy-mm-dd
  function today() { return fmt(new Date()); }
  function addDays(n, from) { const d = from ? new Date(from) : new Date(); d.setDate(d.getDate() + n); return fmt(d); }

  function base() {
    return {
      v: 2, xp: 0, streak: 0, best: 0, lastActive: null,
      completed: {},     // lessonId -> أعلى نسبة
      attempts: {},      // lessonId -> [{date, score, xp, sections, mistakes}]
      review: {},        // word -> {ar, box, due}
      daily: {},         // yyyy-mm-dd -> {xp, lessons, words}
      skip: [], placement: null, lastLesson: null,
      sessions: [],      // جلسات التواصل (استماع، محادثة، نطق، كتابة)
      comm: { listening: {}, scenarios: {}, speaking: {}, writing: {} },
      errors: {},        // سجل الأخطاء المتكررة
      weekly: [],        // نتائج الاختبار الأسبوعي
      plan: null,        // {goal, minutes, since}
      resume: {},        // lessonId -> نقطة الرجوع: الخطة + السؤال الحالي + النتايج لحد دلوقتي
      planDay: null,     // {date, tasks:[...]} — خطة النهاردة
      profile: { name: "", photo: "" }   // الاسم والصورة (الصورة مصغّرة dataURL)

    };
  }

  function load() {
    const s = base();
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "null");
      if (raw) return Object.assign(s, raw);
      const old = JSON.parse(localStorage.getItem(OLD_KEY) || "null");   // ترقية من النسخة القديمة
      if (old) { Object.assign(s, old, { v: 2 }); save(s); }
    } catch (e) {}
    return s;
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

  function trimDaily(s) {
    const limit = addDays(-KEEP_DAYS);
    Object.keys(s.daily).forEach(d => { if (d < limit) delete s.daily[d]; });
  }

  function touch(s, xp, kind) {
    const t = today();
    if (s.lastActive !== t) {
      s.streak = s.lastActive === addDays(-1) ? s.streak + 1 : 1;
      s.lastActive = t;
    }
    s.best = Math.max(s.best || 0, s.streak);
    const day = (s.daily[t] = s.daily[t] || { xp: 0, lessons: 0, words: 0 });
    day.xp += xp || 0;
    if (kind === "lesson") day.lessons++;
    if (kind === "words") day.words += xp ? 1 : 0;
    trimDaily(s);
  }

  // ---------- الدروس ----------
  function recordLesson(lessonId, score, xp, detail) {
    const s = load();
    s.completed[lessonId] = Math.max(s.completed[lessonId] || 0, score);
    s.xp += xp;
    s.lastLesson = lessonId;
    const list = (s.attempts[lessonId] = s.attempts[lessonId] || []);
    list.push({
      date: new Date().toISOString(),
      score,
      xp,
      sections: (detail && detail.sections) || {},
      mistakes: (detail && detail.mistakes) || 0
    });
    if (list.length > KEEP_ATTEMPTS) list.splice(0, list.length - KEEP_ATTEMPTS);
    touch(s, xp, "lesson");
    save(s);
    return s;
  }

  function attempts(lessonId) { return load().attempts[lessonId] || []; }
  function bestScore(lessonId) { return load().completed[lessonId]; }

  function addXp(xp) {
    const s = load();
    s.xp += xp;
    touch(s, xp, "review");
    save(s);
  }

  // ---------- المراجعة ----------
  function addWords(list) {
    const s = load();
    let added = 0;
    (list || []).forEach(w => {
      if (!s.review[w.en]) {
        s.review[w.en] = { ar: w.ar, box: 1, due: today() };
        added++;
      }
    });
    save(s);
    return added;
  }

  function dueWords() {
    const t = today();
    return Object.entries(load().review)
      .filter(([, v]) => v.due <= t)
      .map(([en, v]) => ({ en, ar: v.ar, box: v.box }));
  }

  function wordCount() { return Object.keys(load().review).length; }
  function masteredCount() { return Object.values(load().review).filter(w => w.box === 5).length; }

  function gradeWord(en, ok) {
    const s = load();
    const w = s.review[en];
    if (!w) return;
    if (ok) {
      w.box = Math.min(5, w.box + 1);
      w.due = addDays(INTERVALS[w.box]);
    } else {
      w.box = 1;
      w.due = today();
    }
    save(s);
  }

  // ---------- تحديد المستوى ----------
  function setPlacement(level, skip) {
    const s = load();
    s.placement = { level, date: today() };
    s.skip = skip;
    save(s);
  }

  function liveStreak(s) {
    const st = s || load();
    return st.lastActive === today() || st.lastActive === addDays(-1) ? st.streak : 0;
  }

  // ---------- تحليلات للوحة التحكم ----------
  // نشاط آخر n يوم (الأحدث في الآخر)
  function dailySeries(n) {
    const s = load();
    const out = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = addDays(-i);
      const v = s.daily[d] || { xp: 0, lessons: 0 };
      out.push({ date: d, xp: v.xp, lessons: v.lessons, active: v.xp > 0 || v.lessons > 0 });
    }
    return out;
  }

  // متوسط الأداء لكل قسم من آخر المحاولات (لتحديد نقاط الضعف)
  function skillStats(limit) {
    const s = load();
    const all = [];
    Object.values(s.attempts).forEach(list => list.slice(-(limit || 3)).forEach(a => all.push(a)));
    s.sessions.slice(-30).forEach(a => all.push(a));
    s.weekly.slice(-3).forEach(a => all.push(a));
    const out = {};
    all.forEach(a => Object.entries(a.sections || {}).forEach(([k, v]) => {
      const o = (out[k] = out[k] || { right: 0, total: 0 });
      o.right += v.right || 0;
      o.total += v.total || 0;
    }));
    Object.values(out).forEach(o => { o.pct = o.total ? Math.round((o.right / o.total) * 100) : 0; });
    return out;
  }

  function totals() {
    const s = load();
    const attemptCount = Object.values(s.attempts).reduce((n, l) => n + l.length, 0);
    const scores = Object.values(s.completed);
    return {
      xp: s.xp,
      attempts: attemptCount,
      lessonsPassed: scores.filter(v => v >= PASS).length,
      avgScore: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
    };
  }

  // ---------- مهارات التواصل: جلسات الاستماع والمحادثة والنطق والكتابة ----------
  const MAX_SESSIONS = 120;
  function recordSession(rec) {
    const s = load();
    s.sessions.push(Object.assign({ date: new Date().toISOString() }, rec));
    if (s.sessions.length > MAX_SESSIONS) s.sessions.splice(0, s.sessions.length - MAX_SESSIONS);
    const xp = rec.xp || 0;
    s.xp += xp;
    touch(s, xp, "session");
    const d = (s.daily[today()] = s.daily[today()] || { xp: 0, lessons: 0, words: 0 });
    d.comm = (d.comm || 0) + 1;
    save(s);
  }
  function sessions(kind) {
    const list = load().sessions;
    return kind ? list.filter(x => x.kind === kind) : list.slice();
  }
  function commToday(kind) {
    const t = today();
    return load().sessions.filter(x => String(x.date).slice(0, 10) === t && (!kind || x.kind === kind)).length;
  }
  function setComm(kind, id, data) {
    const s = load();
    s.comm[kind] = s.comm[kind] || {};
    s.comm[kind][id] = Object.assign({}, s.comm[kind][id] || {}, data, { last: today() });
    save(s);
    return s.comm[kind][id];
  }
  function getComm(kind, id) {
    const c = load().comm[kind] || {};
    return id ? c[id] || null : c;
  }

  // ---------- سجل الأخطاء المتكررة ----------
  const MAX_ERRORS = 150;
  function norm(x) {
    return String(x == null ? "" : x).toLowerCase().replace(/\s+/g, " ").trim();
  }
  function errorKey(rec) {
    return [rec.lessonId || "-", rec.section || "-", norm(rec.question).slice(0, 70), norm(rec.answer).slice(0, 40)].join("|");
  }

  function logError(rec) {
    const s = load();
    const key = errorKey(rec);
    const old = s.errors[key];
    s.errors[key] = Object.assign({}, old || {}, rec, {
      key,
      count: (old ? old.count : 0) + 1,
      fixed: 0,
      last: today(),
      created: (old && old.created) || today()
    });
    // لو السجل كبر: نشيل الأقدم اللي اتصلح
    const all = Object.values(s.errors);
    if (all.length > MAX_ERRORS) {
      all.sort((a, b) => (b.count - a.count) || (b.last < a.last ? 1 : -1));
      s.errors = {};
      all.slice(0, MAX_ERRORS).forEach(e => { s.errors[e.key] = e; });
    }
    save(s);
  }

  // إجابة صح على سؤال كان غلط قبل كده: مرتين صح = اتصلح ويخرج من السجل
  function markFixed(rec) {
    const s = load();
    const key = typeof rec === "string" ? rec : errorKey(rec);
    const e = s.errors[key];
    if (!e) return false;
    e.fixed = (e.fixed || 0) + 1;
    e.lastFix = today();
    if (e.fixed >= 2) delete s.errors[key];
    save(s);
    return true;
  }

  function errors(filter) {
    const list = Object.values(load().errors);
    const f = filter || {};
    return list
      .filter(e => (!f.section || e.section === f.section) && (!f.minCount || e.count >= f.minCount))
      .sort((a, b) => (b.count - a.count) || (a.last < b.last ? 1 : -1));
  }
  function errorCount(section) { return errors(section ? { section } : null).length; }
  function repeatedErrors() { return errors({ minCount: 2 }); }
  function clearErrors(section) {
    const s = load();
    if (!section) s.errors = {};
    else Object.values(s.errors).forEach(e => { if (e.section === section) delete s.errors[e.key]; });
    save(s);
  }
  function forgetError(key) {
    const s = load();
    delete s.errors[key];
    save(s);
  }

  // ---------- الاختبار الأسبوعي ----------
  function recordWeekly(result) {
    const s = load();
    s.weekly.push(Object.assign({ date: new Date().toISOString() }, result));
    if (s.weekly.length > 20) s.weekly.splice(0, s.weekly.length - 20);
    s.xp += Math.round((result.score || 0) / 5);
    touch(s, Math.round((result.score || 0) / 5), "weekly");
    save(s);
    return s.weekly;
  }
  function weeklyHistory() { return load().weekly.slice(); }
  function lastWeekly() { const w = load().weekly; return w[w.length - 1] || null; }
  function daysSinceWeekly() {
    const w = lastWeekly();
    if (!w) return null;
    return Math.floor((Date.now() - new Date(w.date).getTime()) / 86400000);
  }
  function weeklyDue() {
    const d = daysSinceWeekly();
    return d === null || d >= 7;
  }

  // أداء مهارة على مدى أسابيع: 4 فترات، كل فترة 7 أيام
  function sectionHistory(section, buckets) {
    const n = buckets || 4;
    const s = load();
    const out = [];
    for (let b = n - 1; b >= 0; b--) {
      const from = addDays(-((b + 1) * 7) + 1);
      const to = addDays(-b * 7);
      let right = 0, total = 0;
      const take = (date, sections) => {
        const d = String(date).slice(0, 10);
        if (d < from || d > to) return;
        const v = (sections || {})[section];
        if (v) { right += v.right || 0; total += v.total || 0; }
      };
      Object.values(s.attempts).forEach(list => list.forEach(a => take(a.date, a.sections)));
      s.weekly.forEach(w => take(w.date, w.sections));
      s.sessions.forEach(x => take(x.date, x.sections));
      out.push({ from, to, right, total, pct: total ? Math.round((right / total) * 100) : null });
    }
    return out;
  }

  // ---------- الخطة الشخصية ----------
  function setPlan(goal, minutes) {
    const s = load();
    s.plan = { goal, minutes, since: (s.plan && s.plan.since) || today() };
    s.planDay = null;           // الخطة بتتولد من أول
    save(s);
    return s.plan;
  }
  function clearPlan() {
    const s = load();
    s.plan = null;
    s.planDay = null;
    save(s);
  }
  function savePlanDay(day) {
    const s = load();
    s.planDay = day;
    save(s);
  }
  // تسجيل إنجاز اليوم عشان نقيس الالتزام
  function logPlan(done, total) {
    const s = load();
    const d = (s.daily[today()] = s.daily[today()] || { xp: 0, lessons: 0, words: 0 });
    d.planDone = done;
    d.planTotal = total;
    save(s);
  }
  function planAdherence(n) {
    const s = load();
    const days = dailySeries(n || 7).map(x => s.daily[x.date] || {});
    const planned = days.filter(d => d.planTotal);
    return {
      days: planned.length,
      full: planned.filter(d => d.planDone >= d.planTotal).length,
      partial: planned.filter(d => d.planDone > 0 && d.planDone < d.planTotal).length,
      none: planned.filter(d => !d.planDone).length
    };
  }

  // عدد محاولات درس في يوم معيّن (افتراضياً النهاردة)
  function attemptsOn(lessonId, date) {
    const d = date || today();
    return (load().attempts[lessonId] || []).filter(a => String(a.date).slice(0, 10) === d);
  }
  // تسجيل جلسة مراجعة (عدد الكلمات اللي اتراجعت النهاردة)
  function recordReview(count) {
    const s = load();
    const d = (s.daily[today()] = s.daily[today()] || { xp: 0, lessons: 0, words: 0 });
    d.reviews = (d.reviews || 0) + count;
    save(s);
  }
  function reviewedToday() { return (load().daily[today()] || {}).reviews || 0; }
  // جلسات مراجعة الضعف
  function recordFix(count) {
    const s = load();
    const d = (s.daily[today()] = s.daily[today()] || { xp: 0, lessons: 0, words: 0 });
    d.fixes = (d.fixes || 0) + 1;
    d.fixItems = (d.fixItems || 0) + (count || 0);
    save(s);
  }
  function fixesToday() { return (load().daily[today()] || {}).fixes || 0; }
  function weeklyToday() {
    const w = lastWeekly();
    return !!w && String(w.date).slice(0, 10) === today();
  }

  // الاسم والصورة
  function getProfile() {
    const p = load().profile || {};
    return { name: String(p.name || ""), photo: String(p.photo || "") };
  }
  function setProfile(patch) {
    const s = load();
    s.profile = Object.assign({ name: "", photo: "" }, s.profile, patch);
    save(s);
  }

  function reset() {
    const keep = getProfile();    // مسح التقدم ما يمسحش اسمك وصورتك
    try { localStorage.removeItem(KEY); localStorage.removeItem(OLD_KEY); } catch (e) {}
    if (keep.name || keep.photo) setProfile(keep);
  }

  // نقطة الرجوع للدرس: عشان الطالب يكمّل من نفس السؤال حتى لو خرج
  function getResume(lessonId) {
    const r = load().resume || {};
    return r[lessonId] || null;
  }
  function saveResume(lessonId, data) {
    const s = load();
    s.resume = s.resume || {};
    s.resume[lessonId] = { ...data, savedAt: new Date().toISOString() };
    save(s);
  }
  function clearResume(lessonId) {
    const s = load();
    if (!s.resume || !s.resume[lessonId]) return;
    delete s.resume[lessonId];
    save(s);
  }

  function exportJson() { return JSON.stringify(load(), null, 2); }

  return {
    PASS, load, save, today, addDays,
    errorKey, logError, markFixed, errors, errorCount, repeatedErrors, clearErrors, forgetError,
    recordWeekly, weeklyHistory, lastWeekly, daysSinceWeekly, weeklyDue, sectionHistory,
    setPlan, clearPlan, savePlanDay, logPlan, planAdherence, attemptsOn, recordReview, reviewedToday,
    recordFix, fixesToday, weeklyToday,
    recordSession, sessions, commToday, setComm, getComm,
    recordLesson, attempts, bestScore, addXp,
    addWords, dueWords, wordCount, masteredCount, gradeWord,
    setPlacement, liveStreak, dailySeries, skillStats, totals, reset, exportJson,
    getProfile, setProfile,
    getResume, saveResume, clearResume
  };
})();
