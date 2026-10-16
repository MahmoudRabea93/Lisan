// أدوات مشتركة: إنشاء عناصر، خلط، عرض شاشة، قائمة اختيارات، أيقونات، إعلانات قارئ الشاشة
function h(tag, attrs, ...kids) {
  const el = document.createElement(tag);
  let speak = null; // speak: true => اقرا النص اللي جوه العنصر، أو نص محدد
  for (const [k, v] of Object.entries(attrs || {})) {
    if (k === "speak") { speak = v; continue; }
    if (v === false || v == null) continue;
    if (k === "class") el.className = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? "" : v);
  }
  kids.flat().forEach(c => {
    if (c == null || c === false) return;
    el.append(c.nodeType ? c : document.createTextNode(typeof Language !== "undefined" ? Language.t(c) : c));
  });
  if (speak && typeof Speech !== "undefined" && Speech.supported) {
    const text = speak === true ? el.textContent : String(speak);
    el.append(speakWithSlow("play tiny", "نطق الجملة", slow => Speech.say(text, slow)));
  }
  return el;
}

// ترجمة عربي للكلمة (من data/words_ar.js): بتتعرض جنب الكلمة الإنجليزي
function wordArNode(en) {
  const t = (window.WORD_AR || {})[en];
  return t ? h("span", { class: "wi-tr", dir: "rtl", lang: "ar" }, document.createTextNode(t)) : null;
}

// ترجمة عربي لجملة المثال: بتظهر بس لما الواجهة تكون عربي
function exArNode(en) {
  if (typeof Language !== "undefined" && Language.get() !== "ar") return null;
  const t = (window.EX_AR || {})[en];
  return t ? h("p", { class: "wi-ex-ar", dir: "rtl", lang: "ar" }, document.createTextNode(t)) : null;
}

// زرار صوت + زرار "أبطأ" جنبه. play(slow) بتشغّل الصوت، slow=true يعني ببطء
function speakWithSlow(cls, label, play) {
  return h("span", { class: "speak-group" },
    h("button", { class: cls, type: "button", "aria-label": label, title: label, onclick: () => play(false) }, icon("speaker")),
    h("button", { class: "slow-btn", type: "button", "aria-label": label + " ببطء", title: "ببطء", onclick: () => play(true) }, "أبطأ"));
}

// نص إنجليزي: اتجاه ولغة صح عشان قارئ الشاشة ينطقه إنجليزي
// لو الجملة ليها ترجمة عربي وإحنا في الوضع العربي، بنضيفها جوه العنصر
// أسئلة بتتولّد تلقائي (معنى كلمة، أنهي كلمة معناها...، الجملة فيها كلمة...)
function autoAr(text) {
  const W = window.WORD_AR || {}, D = window.DEF_AR || {};
  let m;
  if ((m = text.match(/^What does "(.+)" mean\?$/))) return `معنى "${m[1]}" إيه؟`;
  if ((m = text.match(/^Which word means "(.+)"\?$/))) return `أنهي كلمة معناها "${D[m[1]] || m[1]}"؟`;
  if ((m = text.match(/^The sentence contains the word “(.+)” \((.+)\)$/))) return `الجملة فيها كلمة “${m[1]}” (${D[m[2]] || m[2]})`;
  if ((m = text.match(/^Write an English sentence using the word “(.+)” \((.+)\)$/))) return `اكتب جملة إنجليزي فيها كلمة “${m[1]}” (${D[m[2]] || m[2]})`;
  return null;
}

// بحث الترجمة: بالنص كما هو، وبعدين من غير فرق بين الحروف الكبيرة والصغيرة، وبعدين في قاموس الكلمات
function arLookup(text) {
  const maps = [window.SENT_AR, window.DEF_AR, window.EX_AR, window.WORD_AR];
  const key = text.trim();
  for (const m of maps) if (m && m[key]) return m[key];
  const bare = key.replace(/^["“”']+|["“”']+$/g, "");
  if (bare !== key && bare) { const t = arLookup(bare); if (t) return t; }
  const low = key.toLowerCase().replace(/[.?!]+$/, "");
  for (const m of maps) {
    if (!m) continue;
    for (const k in m) if (k.toLowerCase().replace(/[.?!]+$/, "") === low) return m[k];
  }
  return null;
}

// ترجمة عربي: من الجمل أو التعريفات أو الأمثلة أو الكلمات أو الأسئلة التلقائية. بتظهر بس في الوضع العربي
function withAr(el, text) {
  if (!text || typeof Language === "undefined" || Language.get() !== "ar") return el;
  const tr = arLookup(text) || autoAr(text);
  if (tr) {
    el.append(h("span", { class: "sen-ar", dir: "rtl", lang: "ar" }, document.createTextNode(tr)));
  }
  return el;
}

function en(text, tag, cls) {
  return withAr(h(tag || "span", { dir: "ltr", lang: "en", class: cls || null }, text), text);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
function pct(done, total) { return total ? Math.round((done / total) * 100) : 0; }

// اختصارات الكيبورد: الشاشة بتسجّل دالة، و mount بيركّبها بعد العرض
let pendingKey = null;
function onKey(fn) { pendingKey = fn; }

// منطقة إعلانات لقارئ الشاشة (تغيير الصفحة، النتيجة، الحفظ)
function announce(text) {
  const live = document.getElementById("live");
  if (!live) return;
  live.textContent = "";
  setTimeout(() => { live.textContent = text; }, 60);
}

function mount(node, opts) {
  const o = opts || {};
  const app = document.getElementById("app");
  // Keep the same global navigation on immersive/standalone screens too.
  if (typeof Shell !== "undefined" && node && !node.querySelector(".appbar") && !node.classList.contains("app")) {
    const frame = document.createElement("div");
    frame.className = "app standalone-page";
    frame.appendChild(Shell.sharedHeader());
    frame.appendChild(node);
    app.replaceChildren(frame);
  } else {
    app.replaceChildren(node);
  }
  document.onkeydown = pendingKey;
  pendingKey = null;
  if (!o.keepScroll) window.scrollTo(0, 0);
  const target = node.querySelector("[data-focus]");
  if (target) target.focus({ preventScroll: true });
  if (o.title) {
    document.title = o.title + " — تعلّم الإنجليزية";
    if (o.announce !== false) announce(o.title);
  }
}

const SVG_STROKE = (inner, w) =>
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (w || 2) +
  '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>';
const SVG_FILL = inner => '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + inner + '</svg>';

const ICONS = {
  speaker: SVG_STROKE('<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>'),
  flame: SVG_FILL('<path d="M12.5 2c.6 3.2 4.5 5.2 4.5 10a5 5 0 0 1-10 0c0-2 .9-3.4 2-4.5.2 1.6 1 2.6 2 3 .4-3.2-.3-5.6 1.5-8.5z"/>'),
  star: SVG_FILL('<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/>'),
  book: SVG_STROKE('<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20"/>'),
  lock: SVG_STROKE('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
  check: SVG_STROKE('<path d="M5 12.5l4.5 4.5L19 7.5"/>', 3),
  close: SVG_STROKE('<path d="M6 6l12 12M18 6L6 18"/>', 2.5),
  sun: SVG_STROKE('<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.5 1.5M17.9 17.9l1.5 1.5M2.5 12h2M19.5 12h2M4.6 19.4l1.5-1.5M17.9 6.1l1.5-1.5"/>'),
  moon: SVG_STROKE('<path d="M20.5 14.3A8.6 8.6 0 0 1 9.7 3.5a8.6 8.6 0 1 0 10.8 10.8z"/>'),
  home: SVG_STROKE('<path d="M4 10.5 12 4l8 6.5"/><path d="M6.5 9.8V20h11V9.8"/><path d="M10 20v-5h4v5"/>'),
  path: SVG_STROKE('<path d="M6.5 20v-5.5a3 3 0 0 1 3-3h5a3 3 0 0 0 3-3V4"/><circle cx="6.5" cy="20" r="1.6"/><circle cx="17.5" cy="4" r="1.6"/>'),
  cards: SVG_STROKE('<rect x="3" y="6" width="13" height="13" rx="3"/><path d="M8 3h9a4 4 0 0 1 4 4v9"/>'),
  back: SVG_STROKE('<path d="M9 5l-7 7 7 7"/><path d="M2 12h20"/>'),
  next: SVG_STROKE('<path d="M15 5l7 7-7 7"/><path d="M22 12H2"/>'),
  chart: SVG_STROKE('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
  target: SVG_STROKE('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" fill="currentColor"/>'),
  bulb: SVG_STROKE('<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 1 3.6 10.8c-.6.5-1 1.2-1.1 2H9.5c-.1-.8-.5-1.5-1.1-2A6 6 0 0 1 12 3z"/>'),
  trophy: SVG_STROKE('<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 5H5v2a3 3 0 0 0 3 3M16 5h3v2a3 3 0 0 1-3 3"/><path d="M10 13.5V17h4v-3.5M8 20h8"/>'),
  clock: SVG_STROKE('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
  write: SVG_STROKE('<path d="M4 20h16"/><path d="M14.5 4.5l4 4L8 19l-4.5.5L4 15z"/>'),
  play: SVG_FILL('<path d="M8 5.5v13l11-6.5z"/>'),
  settings: SVG_STROKE('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>'),
  info: SVG_STROKE('<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.4"/>')
};
function icon(name) {
  const s = document.createElement("span");
  s.className = "icon";
  s.innerHTML = ICONS[name] || "";
  return s;
}

// حلقة تقدم (نسبة مئوية) — SVG من غير صور خارجية
function ring(value, opts) {
  const o = opts || {};
  const size = o.size || 92;
  const r = (size - 10) / 2;
  const c = 2 * Math.PI * r;
  const v = clamp(value, 0, 100);
  const s = document.createElement("span");
  s.className = "ring " + (o.class || "");
  s.innerHTML =
    '<svg viewBox="0 0 ' + size + ' ' + size + '" aria-hidden="true">' +
    '<circle class="ring-bg" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke-width="7"/>' +
    '<circle class="ring-fg" cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke-width="7" ' +
    'stroke-linecap="round" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + (c * (1 - v / 100)).toFixed(1) + '" ' +
    'transform="rotate(-90 ' + size / 2 + ' ' + size / 2 + ')"/></svg>' +
    '<span class="ring-text"><b>' + v + '</b><i>%</i></span>';
  s.setAttribute("role", "img");
  s.setAttribute("aria-label", (o.label ? o.label + ": " : "") + v + " بالمئة");
  return s;
}

// شريط تقدم بنسبة
function meter(value, label, cls) {
  const v = clamp(value, 0, 100);
  return h("div", {
    class: "meter " + (cls || ""), role: "progressbar",
    "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": String(v),
    "aria-label": label || "التقدم"
  }, h("span", { style: `width:${v}%` }));
}

// قائمة اختيارات: بتلوّن الصح والغلط وبتنادي onAnswered(ok, chosen)
function optionList(opts, answer, onAnswered) {
  let answered = false;
  const items = shuffle(opts);
  const buttons = items.map((opt, idx) => {
    const b = h("button", {
      class: "option", type: "button", dir: "auto", "data-value": opt,
      "aria-keyshortcuts": String(idx + 1)
    },
      h("span", { class: "key", "aria-hidden": "true" }, String(idx + 1)),
      withAr(h("span", { class: "opt-text" }, opt), opt));
    b.addEventListener("click", () => {
      if (answered) return;
      answered = true;
      const ok = opt === answer;
      b.classList.add(ok ? "right" : "wrong");
      buttons.forEach(x => { x.setAttribute("aria-disabled", "true"); x.classList.add("done"); });
      if (!ok) {
        const right = buttons.find(x => x.dataset.value === answer);
        if (right) right.classList.add("right");
      }
      onAnswered(ok, opt);
    });
    return b;
  });
  return {
    node: h("div", { class: "options", role: "group" }, buttons),
    pick: n => { const b = buttons[n]; if (b) b.click(); }
  };
}

function showFeedback(el, ok, answer) {
  el.className = "feedback " + (ok ? "right" : "wrong");
  if (typeof Sound !== "undefined") Sound.play(!!ok);
  // replaceChildren turns null into the text "null", so drop empty parts first
  el.replaceChildren(...[
    h("span", { class: "fb-icon", "aria-hidden": "true" }, icon(ok ? "check" : "close")),
    h("span", {}, ok ? "صح، أحسنت" : "الإجابة الصحيحة: "),
    ok ? null : h("b", { dir: "auto" }, answer)
  ].filter(Boolean));
}

function wordsLabel(n) {
  if (n === 1) return "كلمة واحدة";
  if (n === 2) return "كلمتين";
  if (n >= 3 && n <= 10) return n + " كلمات";
  return n + " كلمة";
}
function lessonsLabel(n) {
  if (n === 1) return "درس واحد";
  if (n === 2) return "درسين";
  if (n >= 3 && n <= 10) return n + " دروس";
  return n + " درس";
}

// توحيد النص للمقارنة (إجابات الكتابة والإملاء)
function normText(s) {
  return String(s).toLowerCase().replace(/[\u2018\u2019]/g, "'").replace(/[^a-z0-9' ]/g, " ").replace(/\s+/g, " ").trim();
}

// الثيم: فاتح افتراضياً + لوحة ألوان مختارة، والاتنين محفوظين في المتصفح
const PALETTES = [
  { key: "indigo", label: "بنفسجي", colors: ["#5B5BD6", "#8B5CF6", "#3B82F6"] },
  { key: "mint", label: "أخضر", colors: ["#0EA47A", "#14B8A6", "#0EA5E9"] },
  { key: "sunset", label: "برتقالي", colors: ["#F0603E", "#F59E0B", "#EC4899"] }
];

const Theme = {
  get() {
    try { return localStorage.getItem("theme_v2") === "dark" ? "dark" : "light"; }
    catch (e) { return "light"; }
  },
  set(v) {
    try { localStorage.setItem("theme_v2", v); } catch (e) {}
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", v);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", v === "dark" ? "#0B0E14" : "#F5F6FA");
  },
  toggle() {
    const v = Theme.get() === "light" ? "dark" : "light";
    Theme.set(v);
    return v;
  },
  palette() {
    try {
      const p = localStorage.getItem("palette");
      return PALETTES.some(x => x.key === p) ? p : "mint";
    } catch (e) { return "mint"; }
  },
  setPalette(v) {
    try { localStorage.setItem("palette", v); } catch (e) {}
    if (typeof document !== "undefined") document.documentElement.setAttribute("data-palette", v);
  }
};
if (typeof document !== "undefined") { Theme.set(Theme.get()); Theme.setPalette(Theme.palette()); }
