// توجيه بسيط بالـ hash: كل شاشة لها عنوان، وزرار الرجوع في المتصفح والموبايل يشتغل
const Router = (function () {
  const routes = [];
  let fallback = null;
  let last = "/";

  function add(pattern, handler) {
    routes.push({ parts: pattern.split("/").filter(Boolean), handler });
    return Router;
  }
  function notFound(fn) { fallback = fn; return Router; }

  function match(path) {
    const parts = path.split("/").filter(Boolean);
    for (const r of routes) {
      if (r.parts.length !== parts.length) continue;
      const params = {};
      let ok = true;
      for (let i = 0; i < r.parts.length; i++) {
        const p = r.parts[i];
        if (p.startsWith(":")) params[p.slice(1)] = decodeURIComponent(parts[i]);
        else if (p !== parts[i]) { ok = false; break; }
      }
      if (ok) return { handler: r.handler, params };
    }
    return null;
  }

  function path() {
    const hash = String(location.hash || "").replace(/^#/, "");
    return hash.startsWith("/") ? hash : "/";
  }

  function render() {
    const p = path();
    last = p;
    const m = match(p);
    if (m) m.handler(m.params, p);
    else if (fallback) fallback(p);
  }

  function go(to, replace) {
    const target = "#" + to;
    if (location.hash === target) return render();
    if (replace) {
      // على file:// المتصفح بيمنع location.replace بالرابط الكامل، فنستخدم الـ hash بس
      try { location.replace(target); } catch (e) { location.hash = to; }
    } else location.hash = to;
  }

  function start() {
    window.addEventListener("hashchange", render);
    if (!location.hash || !path().startsWith("/")) go("/", true);
    render();
  }

  return { add, notFound, go, start, render, current: path, previous: () => last, href: to => "#" + to };
})();
