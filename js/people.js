// الشخصيات في الحوارات: كل شخص ليه اسم ولون وصورة (أفاتار) وصوت ثابت
const People = (function () {
  const PAIRS = [
    { A: { name: "Omar", gender: "m", color: "#f59e0b" }, B: { name: "Ahmed", gender: "m", color: "#14b8a6" } },
    { A: { name: "Sara", gender: "f", color: "#ec4899" }, B: { name: "Mona", gender: "f", color: "#8b5cf6" } },
    { A: { name: "Omar", gender: "m", color: "#f59e0b" }, B: { name: "Mona", gender: "f", color: "#8b5cf6" } },
    { A: { name: "Sara", gender: "f", color: "#ec4899" }, B: { name: "Ahmed", gender: "m", color: "#14b8a6" } }
  ];

  // نفس الحوار دايماً يأخد نفس الشخصيات (عشان الصوت والصورة يفضلوا ثابتين)
  function hash(s) {
    let x = 0;
    for (const c of String(s)) x = (x * 31 + c.charCodeAt(0)) | 0;
    return Math.abs(x);
  }
  // الأسماء المعروفة وألوانها وجنسها (عشان لو الحوار عرّف شخص باسمه يتعرض بنفس الشكل)
  const KNOWN = {};
  PAIRS.forEach(p => { KNOWN[p.A.name] = p.A; KNOWN[p.B.name] = p.B; });

  // لو الحوار بيقول "My name is X" على لسان شخص، الاسم ده هو اسمه في الحوار
  function introducedNames(lines) {
    const out = {};
    (lines || []).forEach(l => {
      const m = l && l.text && /^My name is ([A-Z][a-z]+)\.?$/.exec(l.text);
      if (m && !out[l.who]) out[l.who] = m[1];
    });
    return out;
  }

  function pairFor(lines) {
    const seed = (lines || []).map(l => (l && l.text) || "").join("|");
    const base = PAIRS[hash(seed) % PAIRS.length];
    const intro = introducedNames(lines);
    const pair = { A: { ...base.A }, B: { ...base.B } };
    ["A", "B"].forEach(who => {
      const name = intro[who];
      if (!name) return;
      const other = who === "A" ? "B" : "A";
      if (pair[other].name === name) return;
      pair[who] = { ...(KNOWN[name] || { gender: base[who].gender, color: base[who].color }), name };
    });
    return pair;
  }

  // أفاتار بسيط بالـ SVG: لون خلفية، شعر حسب الجنس، ولبس بلون الشخص
  function avatar(p) {
    const skin = p.gender === "f" ? "#f1c7a3" : "#d9a77a";
    const hair = p.gender === "f"
      ? `<path d="M11 17 Q11 6 20 6 Q29 6 29 17 L29 26 Q26 22 20 22 Q14 22 11 26 Z" fill="#2b1d16"/>`
      : `<path d="M13 14 Q13 7 20 7 Q27 7 27 14 Q24 11 20 11 Q16 11 13 14 Z" fill="#2b1d16"/>`;
    const svg = `<svg viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <rect width="40" height="40" fill="${p.color}" opacity="0.18"/>
      <path d="M6 40 C6 30 12 27 20 27 C28 27 34 30 34 40 Z" fill="${p.color}"/>
      ${hair}
      <circle cx="20" cy="17" r="7" fill="${skin}"/>
    </svg>`;
    const el = document.createElement("span");
    el.className = "avatar";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = svg;
    return el;
  }

  // حوار كامل: كل سطر بصورة الشخص واسمه
  function dialogueNode(lines) {
    const pair = pairFor(lines);
    return h("div", { class: "dialogue dialogue-people", dir: "ltr", lang: "en" },
      (lines || []).map(l => {
        const p = pair[l.who] || pair.A;
        return h("div", { class: "dline " + String(l.who).toLowerCase() },
          avatar(p),
          h("div", { class: "dline-body" },
            h("b", {}, p.name),
            withAr(h("span", {}, l.text === null ? h("span", { class: "gap" }, "______") : l.text), l.text),
            (l.text && Speech.supported) ? h("button", { class: "play tiny dline-play", type: "button", "aria-label": "اسمع السطر", title: "اسمع السطر", onclick: () => Speech.say(l.text, false) }, icon("speaker")) : null));
      }));
  }

  return { pairFor, avatar, dialogueNode };
})();
