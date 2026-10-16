// الإطار العام: شريط علوي + تبويبات (أسفل الشاشة في الموبايل) + غلاف الصفحة
const Shell = (function () {
  const TABS = [
    { to: "/", label: "الرئيسية", icon: "home" },
    { to: "/plan", label: "خطتي", icon: "target" },
    { to: "/path", label: "الدروس", icon: "book" },
    { to: "/comm", label: "التواصل", icon: "speaker" },
    { to: "/review", label: "المراجعة", icon: "cards" },
    { to: "/words", label: "كلماتي", icon: "star" },
    { to: "/settings", label: "الإعدادات", icon: "settings" }
  ];

  function logo() {
    const s = document.createElement("span");
    s.className = "logo";
    s.innerHTML = '<svg viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="12" fill="#5B6CFF"/>' +
      '<path d="M12 11H28A4 4 0 0 1 32 15V22A4 4 0 0 1 28 26H21L14 31V26H12A4 4 0 0 1 8 22V15A4 4 0 0 1 12 11Z" fill="#FFFFFF"/>' +
      '<circle cx="15" cy="18.5" r="1.7" fill="#5B6CFF"/><circle cx="20" cy="18.5" r="1.7" fill="#5B6CFF"/><circle cx="25" cy="18.5" r="1.7" fill="#F5B33C"/></svg>';
    return s;
  }

  function languageToggle() {
    const english = Language.get() === "en";
    return h("button", {
      class: "iconbtn language-toggle", type: "button",
      title: english ? "Switch to Arabic" : "Switch to English",
      "aria-label": english ? "Switch to Arabic" : "Switch to English",
      onclick: () => { Language.toggle(); Router.render(); }
    }, english ? "عربي" : "EN");
  }

  // صورة الملف الشخصي: الصورة لو موجودة، وإلا أول حرف من الاسم، وإلا أيقونة شخص
  function avatar(profile, size) {
    const p = profile || Store.getProfile();
    const box = h("span", { class: "avatar avatar-" + (size || "sm"), "aria-hidden": "true" });
    if (p.photo) box.append(h("img", { src: p.photo, alt: "" }));
    else if (p.name.trim()) box.append(document.createTextNode(Array.from(p.name.trim())[0].toUpperCase()));
    else box.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>';
    return box;
  }

  function profileChip() {
    const p = Store.getProfile();
    const label = p.name.trim() || "ضيف اسمك";
    return h("a", { class: "profile-chip", href: Router.href("/settings"), title: label, "aria-label": "الملف الشخصي: " + label },
      avatar(p, "sm"), h("span", { class: "profile-name" }, label));
  }

  function settingsButton() {
    return h("a", { class: "iconbtn settings-btn", href: Router.href("/settings"), title: "الإعدادات", "aria-label": "الإعدادات" }, icon("settings"));
  }

  function themeToggle() {
    const light = Theme.get() === "light";
    return h("button", {
      class: "iconbtn", type: "button",
      title: light ? "الوضع الداكن" : "الوضع الفاتح",
      "aria-label": light ? "تحويل للوضع الداكن" : "تحويل للوضع الفاتح",
      onclick: () => { Theme.toggle(); Router.render(); }
    }, icon(light ? "moon" : "sun"));
  }

  function isActive(tab, here) {
    if (tab.to === "/") return here === "/";
    return here === tab.to || here.startsWith(tab.to + "/");
  }

  function tabLink(tab, here, withBadge) {
    const active = isActive(tab, here);
    const due = tab.to === "/review" ? Store.dueWords().length : 0;
    return h("a", {
      class: "tab" + (active ? " active" : ""),
      href: Router.href(tab.to),
      "aria-current": active ? "page" : null
    },
      h("span", { class: "tab-icon" }, icon(tab.icon),
        withBadge && due ? h("span", { class: "badge", "aria-hidden": "true" }, due > 9 ? "9+" : String(due)) : null),
      h("span", { class: "tab-label" }, tab.label),
      due ? h("span", { class: "sr-only" }, `${wordsLabel(due)} جاهزة` ) : null);
  }

  // صفحة كاملة: شريط علوي + عنوان + محتوى + تبويبات
  function page(opts) {
    const here = Router.current();
    const head = h("div", { class: "page-head" },
      opts.eyebrow ? h("p", { class: "eyebrow" }, opts.eyebrow) : null,
      h("h1", { tabindex: "-1", "data-focus": "", dir: "auto" }, opts.title),
      opts.subtitle ? h("p", { class: "page-sub" }, opts.subtitle) : null,
      opts.headExtra || null);

    const node = h("div", { class: "app" },
      h("header", { class: "appbar" },
        h("div", { class: "appbar-in" },
          h("span", { class: "brand" }, logo(), h("span", { class: "brand-name" }, "تعلّم الإنجليزية")),
          h("nav", { class: "tabs", "aria-label": "أقسام التطبيق" }, TABS.map(t => tabLink(t, here, false))),
          h("div", { class: "appbar-end" }, profileChip(), languageToggle(), themeToggle(), settingsButton()))),
      h("main", { class: "page" + (opts.wide ? " wide" : ""), id: "main", tabindex: "-1" },
        opts.back
          ? h("a", { class: "backlink", href: Router.href(opts.back), "aria-label": opts.backLabel || "رجوع" },
              icon("back"), h("span", {}, opts.backLabel || "رجوع"))
          : null,
        opts.hideHead ? null : head,
        opts.body),
      h("nav", { class: "tabbar", "aria-label": "التنقل السريع" }, TABS.map(t => tabLink(t, here, true))));

    mount(node, { title: opts.title });
  }

  function sharedHeader() {
    const here = Router.current();
    return h("header", { class: "appbar shared-page-header" },
      h("div", { class: "appbar-in" },
        h("span", { class: "brand" }, logo(), h("span", { class: "brand-name" }, "تعلّم الإنجليزية")),
        h("nav", { class: "tabs", "aria-label": "أقسام التطبيق" }, TABS.map(t => tabLink(t, here, false))),
        h("div", { class: "appbar-end" }, profileChip(), languageToggle(), themeToggle(), settingsButton())));
  }

  return { page, logo, themeToggle, sharedHeader, avatar, TABS };
})();
