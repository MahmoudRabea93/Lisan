// ترجمة عربي لمحتوى A1 الجديد (حيوانات، طيور، فواكه، خضار، مواصلات، ضمائر، أدوات، حروف جر، أفعال، ظروف، أزمنة، أمر)
(function () {
  const words = [
    [`dog`, `كلب`], [`horse`, `حصان`], [`camel`, `جمل`], [`lion`, `أسد`], [`cow`, `بقرة`], [`eagle`, `نسر`], [`bird`, `طائر`],
    [`duck`, `بطة`], [`pigeon`, `حمامة`], [`hen`, `دجاجة`], [`owl`, `بومة`], [`lemon`, `ليمونة`], [`mango`, `مانجو`], [`grape`, `عنبة`],
    [`carrot`, `جزرة`], [`cucumber`, `خيار`], [`garlic`, `ثوم`], [`bicycle`, `عجلة`], [`car`, `عربية`], [`plane`, `طيارة`],
    [`book`, `كتاب`], [`door`, `باب`], [`engineer`, `مهندس`], [`him`, `هو (مفعول به)`], [`us`, `إحنا (مفعول به)`], [`with`, `مع`],
    [`open`, `يفتح`], [`close`, `يقفل`], [`work`, `يشتغل`], [`go`, `يروح`], [`play`, `يلعب`], [`here`, `هنا`], [`there`, `هناك`],
    [`now`, `دلوقتي`], [`today`, `النهارده`], [`inside`, `جوه`], [`tomorrow`, `بكرة`], [`yesterday`, `امبارح`], [`eat`, `يأكل`],
    [`read`, `يقرأ`], [`write`, `يكتب`], [`study`, `يذاكر`], [`sleep`, `ينام`], [`ate`, `أكل (ماضي)`], [`went`, `راح (ماضي)`],
    [`worked`, `اشتغل (ماضي)`], [`reads`, `بيقرأ`], [`goes`, `بيروح`], [`camel`, `جمل`], [`cat`, `قطة`], [`pigeon`, `حمامة`],
    [`by`, `بـ (بوسيلة)`], [`on`, `على`], [`in`, `في`], [`at`, `في (الساعة)`], [`to`, `إلى`], [`from`, `من`],
    [`sun`, `شمس`], [`shoe`, `جزمة`], [`pen`, `قلم`], [`bike`, `عجلة`], [`pepper`, `فلفل`], [`sheep`, `خروف`],
    [`phone`, `موبايل`], [`egg`, `بيضة`], [`snow`, `تلج`], [`watermelon`, `بطيخ`], [`strawberry`, `فراولة`], [`hat`, `قبعة`],
    [`elephant`, `فيل`], [`metro`, `مترو`], [`flower`, `زهرة`], [`cup`, `كوباية`], [`monkey`, `قرد`], [`moon`, `قمر`],
    [`tree`, `شجرة`], [`ball`, `كورة`], [`baby`, `بيبي`], [`house`, `بيت`], [`boat`, `مركب`], [`bag`, `شنطة`], [`lettuce`, `خس`],
  ];

  const sents = [
    [`I'm`, `أنا`],
  ];

  window.WORD_AR = window.WORD_AR || {};
  words.forEach(([en, ar]) => { if (!window.WORD_AR[en]) window.WORD_AR[en] = ar; });
  window.SENT_AR = window.SENT_AR || {};
  sents.forEach(([en, ar]) => { if (!window.SENT_AR[en]) window.SENT_AR[en] = ar; });
})();
