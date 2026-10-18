// نقطة البداية: تعريف المسارات وتشغيل التطبيق
(function () {
  const home = () => Router.go("/");
  let settingsTab = "profile"; // يفضل محفوظ لما الصفحة تتعاد (تغيير اللون/الوضع)

  function settings() {
    const state = Store.load();
    const t = Store.totals();
    const light = Theme.get() === "light";

    function resetAll() {
      if (!confirm("هيتمسح كل التقدم والكلمات والنقاط. أكيد؟")) return;
      Store.reset();
      announce("تم مسح التقدم");
      Router.go("/");
    }

    function exportData() {
      try {
        const blob = new Blob([Store.exportJson()], { type: "application/json" });
        const a = h("a", { href: URL.createObjectURL(blob), download: "english-app-progress.json" });
        document.body.append(a);
        a.click();
        a.remove();
      } catch (e) {
        alert("المتصفح ده مش بيسمح بالتحميل. افتح التطبيق من سيرفر بسيط وجرّب تاني.");
      }
    }

    // تصغير الصورة لمربع 192px عشان تتحفظ في المتصفح من غير ما تكبّر البيانات
    function pickPhoto(file) {
      if (!file) return;
      if (!/^image\//.test(file.type)) { alert("اختار ملف صورة (JPG أو PNG)."); return; }
      const reader = new FileReader();
      reader.onerror = () => alert("ماقدرتش أقرا الصورة، جرّب صورة تانية.");
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => alert("الصورة دي مش مدعومة، جرّب صورة تانية.");
        img.onload = () => {
          const size = 192, c = document.createElement("canvas");
          c.width = c.height = size;
          const side = Math.min(img.width, img.height);
          c.getContext("2d").drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, size, size);
          Store.setProfile({ photo: c.toDataURL("image/jpeg", 0.85) });
          announce("اتحفظت الصورة");
          Router.render();
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }

    const profile = Store.getProfile();
    const nameInput = h("input", {
      class: "input", type: "text", maxlength: "30", autocomplete: "name",
      placeholder: "اكتب اسمك", value: profile.name, "aria-label": "اسمك"
    });
    const fileInput = h("input", {
      type: "file", accept: "image/*", class: "sr-only", tabindex: "-1",
      onchange: e => pickPhoto(e.target.files && e.target.files[0])
    });
    function saveName() {
      Store.setProfile({ name: nameInput.value.trim().slice(0, 30) });
      announce("اتحفظ الاسم");
      Router.render();
    }
    nameInput.addEventListener("keydown", e => { if (e.key === "Enter") saveName(); });

    const isEn = Language.get() === "en";
    const L = (en, ar) => (isEn ? en : ar);
    const seg = (items) => h("div", { class: "segmented", role: "group" },
      items.map(it => h("button", {
        class: "seg-btn" + (it.on ? " on" : ""), type: "button",
        "aria-pressed": it.on ? "true" : "false", onclick: it.fn
      }, it.label)));
    const goal = state.plan ? Plan.goalInfo(state.plan.goal) : null;
    const planLine = state.plan
      ? L(`Goal: ${goal.label} · ${state.plan.minutes} min a day`, `هدفك: ${goal.label} · ${state.plan.minutes} دقيقة في اليوم`)
      : L("No active plan right now.", "مفيش خطة شغالة دلوقتي.");

    // ---------- helpers ----------
    const userIcon = () => {
      const sp = h("span", { class: "icon" });
      sp.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>';
      return sp;
    };
    const group = (title, desc, content) => h("div", { class: "st-group" },
      h("div", { class: "st-group-head" },
        h("h3", {}, title),
        desc ? h("p", {}, desc) : null),
      content);
    const opt = (o) => h("button", {
      class: "st-opt" + (o.on ? " on" : ""), type: "button",
      "aria-pressed": o.on ? "true" : "false", onclick: o.fn
    }, o.visual, h("span", { class: "st-opt-label" }, o.label),
      h("span", { class: "st-opt-check", "aria-hidden": "true" }, icon("check")));
    const stat = (value, label) => h("div", { class: "st-stat" },
      h("strong", {}, String(value)), h("span", {}, label));

    // ---------- panels ----------
    const panelProfile = h("div", { class: "st-card" },
      h("div", { class: "st-hero" },
        Shell.avatar(profile, "lg"),
        h("div", { class: "st-hero-text" },
          h("strong", { dir: "auto" }, profile.name.trim() || L("Your name", "اسمك")),
          h("span", {}, L(`${t.lessonsPassed} lessons passed · ${state.xp} points`, `${t.lessonsPassed} درس ناجح · ${state.xp} نقطة`)))),
      group(L("Display name", "الاسم الظاهر"), L("Shown in the top bar and on your progress.", "بيظهر في الشريط العلوي وفي تقدمك."),
        h("div", { class: "st-field" },
          nameInput,
          h("button", { class: "btn primary small", type: "button", onclick: saveName }, L("Save name", "حفظ الاسم")))),
      group(L("Profile picture", "الصورة الشخصية"), L("Stored only in this browser.", "محفوظة في المتصفح ده بس."),
        h("div", { class: "st-actions" },
          h("button", { class: "btn secondary small", type: "button", onclick: () => fileInput.click() },
            profile.photo ? L("Change image", "غيّر الصورة") : L("Choose image", "اختار صورة")),
          profile.photo
            ? h("button", { class: "btn secondary small", type: "button", onclick: () => { Store.setProfile({ photo: "" }); Router.render(); } }, L("Remove image", "شيل الصورة"))
            : null,
          fileInput)));

    const panelAppearance = h("div", { class: "st-card" },
      group(L("Color", "اللون"), L("Pick the accent color used across the app.", "اختار لون التطبيق الأساسي."),
        h("div", { class: "st-opts three", role: "group", "aria-label": L("Color palette", "لوحة الألوان") },
          PALETTES.map(pal => opt({
            on: Theme.palette() === pal.key, label: pal.label,
            fn: () => { Theme.setPalette(pal.key); Router.render(); },
            visual: h("span", { class: "st-swatch", "aria-hidden": "true" },
              pal.colors.map(c => h("i", { style: `background:${c}` })))
          })))),
      group(L("Theme", "الوضع"), L("Light is easier in daylight, dark is easier at night.", "الفاتح أريح بالنهار والداكن أريح بالليل."),
        h("div", { class: "st-opts two", role: "group", "aria-label": L("Theme", "الوضع") },
          opt({ on: light, label: L("Light", "فاتح"), fn: () => { Theme.set("light"); Router.render(); },
            visual: h("span", { class: "st-mode light", "aria-hidden": "true" }, icon("sun")) }),
          opt({ on: !light, label: L("Dark", "داكن"), fn: () => { Theme.set("dark"); Router.render(); },
            visual: h("span", { class: "st-mode dark", "aria-hidden": "true" }, icon("moon")) }))),
      group(L("Language", "اللغة"), L("Language of the app interface.", "لغة واجهة التطبيق."),
        h("div", { class: "st-opts two", role: "group", "aria-label": L("Language", "اللغة") },
          opt({ on: isEn, label: "English", fn: () => { Language.set("en"); Router.render(); },
            visual: h("span", { class: "st-lang", lang: "en", dir: "ltr" }, "Aa") }),
          opt({ on: !isEn, label: "العربية", fn: () => { Language.set("ar"); Router.render(); },
            visual: h("span", { class: "st-lang", lang: "ar" }, "أب") }))));

    const kbd = (keys, text) => h("li", {}, h("span", { class: "st-keys" }, keys), h("span", {}, text));
    const panelLearning = h("div", { class: "st-card" },
      group(L("Personal plan", "الخطة الشخصية"), planLine,
        h("div", { class: "st-actions" },
          h("a", { class: "btn secondary small", href: Router.href("/plan/setup") },
            state.plan ? L("Edit plan", "عدّل الخطة") : L("Create a plan", "اعمل خطة")))),
      group(L("Sound", "الصوت"), null,
        h("div", { class: "st-status " + (Speech.supported ? "ok" : "no") },
          h("span", { class: "st-dot", "aria-hidden": "true" }),
          h("span", {}, Speech.supported
            ? L("Your browser supports speech, so listening exercises work.", "متصفحك بيدعم النطق، فتمارين الاستماع شغالة.")
            : L("Your browser doesn't support speech, so listening exercises are skipped. Try Chrome, Edge, or Safari.", "متصفحك مش بيدعم النطق، فتمارين الاستماع بتتخطى تلقائياً. جرّب Chrome أو Edge أو Safari.")))),
      group(L("Pronunciation", "النطق"), null,
        h("div", { class: "st-speech" },
          h("label", { class: "st-field" },
            h("span", {}, L("Speaking speed", "سرعة الكلام") + ": "),
            h("input", { type: "range", min: "0.6", max: "1.3", step: "0.05", value: String(Speech.getRate()), "aria-label": L("Speaking speed", "سرعة الكلام"),
              oninput: e => Speech.setRate(e.target.value) })),
          h("label", { class: "st-field" },
            h("span", {}, L("Voice", "الصوت") + ": "),
            h("select", { class: "st-select", onchange: e => Speech.setVoice(e.target.value) },
              h("option", { value: "", selected: !Speech.getVoiceName() }, L("Automatic (best available)", "تلقائي (أفضل صوت متاح)")),
              Speech.getVoices().map(v => h("option", { value: v.name, selected: v.name === Speech.getVoiceName() }, v.name + " (" + v.lang + ")")))),
          h("label", { class: "st-check" },
            h("input", { type: "checkbox", checked: Speech.getAutoplay(), onchange: e => Speech.setAutoplay(e.target.checked) }),
            h("span", {}, L("Read questions automatically", "اقرا الأسئلة لوحدها أول ما تظهر"))),
          h("button", { class: "btn secondary small", type: "button", onclick: () => Speech.say("Hello, how are you?", false) }, L("Test voice", "جرّب الصوت")),
          Speech.getVoices().length ? null : h("p", { class: "muted small" }, L("No English voices found yet. Try again in a moment.", "مفيش أصوات إنجليزي متاحة دلوقتي. جرّب تاني بعد شوية.")))),
      group(L("Keyboard shortcuts", "اختصارات الكيبورد"), null,
        h("ul", { class: "st-shortcuts" },
          kbd([h("kbd", {}, "1"), " – ", h("kbd", {}, "4")], L("Choose an answer", "اختيار إجابة")),
          kbd([h("kbd", {}, "Enter")], L("Check or next", "تحقق أو التالي")),
          kbd([h("kbd", {}, "Tab")], L("Move between elements", "التنقل بين العناصر")))));

    const panelData = h("div", { class: "st-card" },
      group(L("Your progress", "تقدمك"), L("Everything is saved only in this browser.", "كل حاجة محفوظة في المتصفح ده بس."),
        h("div", { class: "st-stats" },
          stat(t.lessonsPassed, L("Lessons passed", "دروس ناجحة")),
          stat(state.xp, L("Points", "نقاط")),
          stat(Store.wordCount(), L("Words", "كلمات")))),
      group(L("Backup", "نسخة احتياطية"), L("Download your progress as a file you can keep.", "نزّل تقدمك كملف تحتفظ بيه."),
        h("div", { class: "st-actions" },
          h("button", { class: "btn secondary small", type: "button", onclick: exportData }, L("Download my progress", "تنزيل نسخة من تقدمي")))),
      h("div", { class: "st-danger" },
        h("div", {},
          h("h3", {}, L("Reset all progress", "مسح كل التقدم")),
          h("p", {}, L("Deletes lessons, words and points. This can't be undone.", "بيمسح الدروس والكلمات والنقاط. مش ممكن ترجّعهم."))),
        h("button", { class: "btn danger small", type: "button", onclick: resetAll }, L("Reset", "مسح"))));

    const TABS = [
      { key: "profile", label: L("Profile", "الملف الشخصي"), icon: userIcon(), panel: panelProfile },
      { key: "appearance", label: L("Appearance", "المظهر"), icon: icon("sun"), panel: panelAppearance },
      { key: "learning", label: L("Learning", "التعلّم"), icon: icon("target"), panel: panelLearning },
      { key: "data", label: L("Data", "البيانات"), icon: icon("chart"), panel: panelData }
    ];
    if (!TABS.some(x => x.key === settingsTab)) settingsTab = "profile";

    const tabBtns = [];
    function selectTab(key, focus) {
      settingsTab = key;
      TABS.forEach((x, i) => {
        const on = x.key === key;
        tabBtns[i].classList.toggle("on", on);
        tabBtns[i].setAttribute("aria-selected", on ? "true" : "false");
        tabBtns[i].tabIndex = on ? 0 : -1;
        x.panel.hidden = !on;
        if (on && focus) tabBtns[i].focus();
      });
    }
    const tablist = h("div", { class: "st-tabs", role: "tablist", "aria-orientation": "vertical", "aria-label": L("Settings sections", "أقسام الإعدادات") },
      TABS.map((x, i) => {
        const b = h("button", {
          class: "st-tab", type: "button", role: "tab", id: "st-tab-" + x.key, "aria-controls": "st-panel-" + x.key,
          onclick: () => selectTab(x.key),
          onkeydown: e => {
            const k = e.key;
            if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"].includes(k)) return;
            e.preventDefault();
            let n = i;
            if (k === "Home") n = 0;
            else if (k === "End") n = TABS.length - 1;
            else if (k === "ArrowDown" || k === "ArrowRight" || k === "ArrowLeft" || k === "ArrowUp") {
              const rtl = document.documentElement.dir === "rtl";
              const fwd = k === "ArrowDown" || (k === (rtl ? "ArrowLeft" : "ArrowRight"));
              n = (i + (fwd ? 1 : -1) + TABS.length) % TABS.length;
            }
            selectTab(TABS[n].key, true);
          }
        }, x.icon, h("span", {}, x.label));
        tabBtns.push(b);
        return b;
      }));
    TABS.forEach(x => { x.panel.setAttribute("role", "tabpanel"); x.panel.id = "st-panel-" + x.key; x.panel.setAttribute("aria-labelledby", "st-tab-" + x.key); });
    const panels = h("div", { class: "st-panels" }, TABS.map(x => x.panel));
    selectTab(settingsTab, false);

    Shell.page({
      title: L("Settings", "الإعدادات"),
      hideHead: true,
      back: "/",
      body: h("div", { class: "st" },
        h("h1", { class: "settings-title st-title", tabindex: "-1", "data-focus": "" }, L("Settings", "الإعدادات")),
        h("div", { class: "st-layout" }, tablist, panels))
    });
  }

  function runLesson(params, mode) {
    const entry = Catalog.lesson(params.id);
    if (!entry) return Browse.notFound();
    const state = Store.load();
    const status = Catalog.status(entry, state);
    if (status === "locked" || status === "soon") return Router.go("/lesson/" + entry.id, true);
    Lesson.run(entry, {
      onExit: () => Router.go("/lesson/" + entry.id),
      detail: () => Router.go("/lesson/" + entry.id)
    }, mode || "learn");
  }

  Router
    .add("/", () => Dashboard.show())
    .add("/comm", () => Comm.hub())
    .add("/listen", () => Comm.listenList())
    .add("/listen/:id", p => Comm.listenItem(p))
    .add("/scenario", () => Comm.scenarioList())
    .add("/scenario/:id", p => Comm.scenarioRun(p))
    .add("/speak", () => Comm.speakList())
    .add("/speak/:id", p => Comm.speakRun(p))
    .add("/write", () => Comm.writeList())
    .add("/write/:id", p => Comm.writeTask(p))
    .add("/reports", () => Smart.reports())
    .add("/errors", () => Smart.showErrors({}))
    .add("/errors/:section", p => Smart.showErrors(p))
    .add("/fix", () => Smart.fix({}))
    .add("/fix/:section", p => Smart.fix(p))
    .add("/weekly", () => Smart.weekly())
    .add("/plan", () => Plan.show())
    .add("/plan/setup", () => Plan.setup())
    .add("/path", () => Browse.showPath())
    .add("/level/:code", p => Browse.showLevel(p))
    .add("/unit/:id", p => Browse.showUnit(p))
    .add("/lesson/:id", p => Browse.showLesson(p))
    .add("/lesson/:id/run", p => runLesson(p))
    .add("/lesson/:id/exam", p => runLesson(p, "exam"))
    .add("/review", () => Review.hub())
    .add("/review/session", () => Review.start({ onExit: () => Router.go("/review") }))
    .add("/words", () => Words.show())
    .add("/placement", () => Placement.start({ onExit: home }))
    .add("/settings", () => settings())
    .notFound(() => Browse.notFound());

  // رابط "تخطَّ إلى المحتوى" لمستخدمي الكيبورد وقارئ الشاشة
  const skip = document.getElementById("skip");
  if (skip) skip.addEventListener("click", () => {
    const main = document.getElementById("main") || document.querySelector("main");
    if (main) { main.setAttribute("tabindex", "-1"); main.focus(); main.scrollIntoView(); }
  });

  Router.start();
})();
