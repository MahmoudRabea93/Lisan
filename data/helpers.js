// دوال مساعدة لكتابة المحتوى بشكل مختصر
// C: اختيار من متعدد  | C("سؤال", ["خيار1","خيار2","خيار3"], "الإجابة الصح")
// O: ترتيب كلمات      | O("المعنى بالعربي", "The correct sentence")  (الكلمات بتتقسم تلقائي)
// L: استماع           | L("الجملة المنطوقة", ["جملة مشابهة 1", "جملة مشابهة 2"])
// V: كلمات الدرس      | V("word|المعنى|جملة مثال", ...)
// T: حوار (3 جولات) + سؤال استماع:
//    "A|جملة" ، "B|الرد الصح|رد غلط 1|رد غلط 2" ، "Q|السؤال|الإجابة|خطأ 1|خطأ 2"
// R: نص قراءة + 3 أسئلة:  R("النص", "السؤال|الصح|خطأ 1|خطأ 2", ...)
window.C = (question, options, answer) => ({ type: "choice", question, options, answer });
window.O = (hint, answer) => ({ type: "order", hint, words: answer.split(" "), answer });
window.L = (say, others) => ({ type: "listen", say, options: [say, ...others], answer: say });
window.V = (...items) => items.map(s => {
  const [en, ar, ex] = s.split("|");
  return ex ? { en, ar, ex } : { en, ar };
});

window.T = (...rows) => {
  const t = { lines: [] };
  rows.forEach(r => {
    const p = r.split("|");
    if (p[0] === "A") t.lines.push({ who: "A", text: p[1] });
    else if (p[0] === "B") t.lines.push({ who: "B", text: p[1], wrong: p.slice(2) });
    else if (p[0] === "Q") t.q = { question: p[1], answer: p[2], options: p.slice(2) };
  });
  return t;
};
window.R = (text, ...qs) => ({
  text,
  questions: qs.map(s => { const p = s.split("|"); return { question: p[0], answer: p[1], options: p.slice(1) }; })
});
