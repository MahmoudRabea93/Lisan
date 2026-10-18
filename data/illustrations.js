// رسومات بسيطة أصلية (SVG) للكلمات. مش مأخوذة من أي مصدر، فمفيش مشاكل حقوق نشر.
// لو الكلمة مش موجودة هنا بنرجع للإيموجي.
window.ILLUSTRATIONS = (function () {
  const s = (body) => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img">' + body + '</svg>';
  const face = (x, y) => `<circle cx="${x - 9}" cy="${y}" r="3" fill="#222"/><circle cx="${x + 9}" cy="${y}" r="3" fill="#222"/><path d="M${x - 7} ${y + 8} Q${x} ${y + 13} ${x + 7} ${y + 8}" stroke="#222" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
  return {
    apple: s('<path d="M50 32c-18-10-36 4-34 24 2 22 18 40 34 36 16 4 32-14 34-36 2-20-16-34-34-24z" fill="#E4572E"/><path d="M50 32c0-8 3-14 8-18" stroke="#5B3A29" stroke-width="3" fill="none"/><path d="M56 22c6-6 14-6 18-2-6 6-14 6-18 2z" fill="#4CAF50"/>'),
    banana: s('<path d="M18 62c10 24 52 30 66 2-18 8-40 4-54-12C24 44 30 30 40 24c-10 14-16 26-22 38z" fill="#FFD23F" stroke="#D9A400" stroke-width="2"/><path d="M76 62l6 2" stroke="#6B4F1D" stroke-width="3" stroke-linecap="round"/>'),
    orange: s('<circle cx="50" cy="54" r="32" fill="#FF8C1A"/><path d="M50 22c0-6 4-10 10-10" stroke="#3A7D2C" stroke-width="3" fill="none"/><path d="M52 18c6-8 14-6 16-2-6 4-12 4-16 2z" fill="#4CAF50"/>'),
    grape: s('<g fill="#7B3FBF"><circle cx="38" cy="42" r="9"/><circle cx="58" cy="42" r="9"/><circle cx="48" cy="56" r="9"/><circle cx="32" cy="62" r="9"/><circle cx="64" cy="62" r="9"/><circle cx="48" cy="72" r="9"/></g><path d="M50 30c0-8 4-12 10-14" stroke="#3A7D2C" stroke-width="3" fill="none"/>'),
    lemon: s('<ellipse cx="50" cy="52" rx="36" ry="26" fill="#FFE14D" stroke="#D9B400" stroke-width="2"/><circle cx="14" cy="52" r="3" fill="#D9B400"/><circle cx="86" cy="52" r="3" fill="#D9B400"/>'),
    strawberry: s('<path d="M50 88C26 70 20 48 30 36h40c10 12 4 34-20 52z" fill="#E63946"/><path d="M30 36l10-8 10 6 10-8 10 8 10-6 0 8z" fill="#4CAF50"/><g fill="#FFF3B0"><circle cx="40" cy="50" r="1.8"/><circle cx="56" cy="56" r="1.8"/><circle cx="48" cy="68" r="1.8"/></g>'),
    watermelon: s('<path d="M10 40a40 40 0 0 0 80 0z" fill="#2E8B57"/><path d="M16 44a34 34 0 0 0 68 0z" fill="#FF6B6B"/><g fill="#222"><circle cx="38" cy="54" r="2"/><circle cx="50" cy="60" r="2"/><circle cx="62" cy="54" r="2"/></g>'),
    tomato: s('<circle cx="50" cy="56" r="32" fill="#E63946"/><path d="M50 26l-14-6 8 8 6 0 6-8-8 6z" fill="#4CAF50"/><path d="M50 26c0-4 2-6 4-7" stroke="#3A7D2C" stroke-width="3" fill="none"/>'),
    potato: s('<ellipse cx="50" cy="54" rx="34" ry="24" fill="#C8965A" stroke="#8B5A2B" stroke-width="2"/><g fill="#8B5A2B"><circle cx="36" cy="50" r="2"/><circle cx="58" cy="60" r="2"/><circle cx="64" cy="46" r="1.6"/></g>'),
    onion: s('<path d="M50 90c-22 0-30-22-26-42 4-18 16-30 26-32 10 2 22 14 26 32 4 20-4 42-26 42z" fill="#C9A0DC" stroke="#7A4E92" stroke-width="2"/><path d="M50 16c-2-6 0-10 4-12" stroke="#3A7D2C" stroke-width="3" fill="none"/>'),
    carrot: s('<path d="M40 40l20 0 -10 50z" fill="#FF7A1A"/><path d="M44 58l10 0M45 68l8 0" stroke="#D65A00" stroke-width="2"/><path d="M50 40c-6-12-2-22 2-24-4 6 0 12 0 12l6-8c2 8-2 14-8 20z" fill="#4CAF50"/>'),
    cucumber: s('<rect x="18" y="42" width="64" height="20" rx="10" fill="#5FBF5A"/><g fill="#3E8E3A"><circle cx="30" cy="52" r="1.5"/><circle cx="45" cy="48" r="1.5"/><circle cx="60" cy="56" r="1.5"/><circle cx="72" cy="50" r="1.5"/></g>'),
    cat: s(`<path d="M22 40l6-22 16 14M78 40l-6-22-16 14" fill="#F4A261" stroke="#8B5A2B" stroke-width="2"/><circle cx="50" cy="56" r="30" fill="#F4A261" stroke="#8B5A2B" stroke-width="2"/>${face(50, 56)}<path d="M50 62l-3 2h6z" fill="#E76F51"/>`),
    dog: s(`<ellipse cx="24" cy="50" rx="10" ry="18" fill="#8B5A2B"/><ellipse cx="76" cy="50" rx="10" ry="18" fill="#8B5A2B"/><circle cx="50" cy="54" r="28" fill="#D9A066"/>${face(50, 54)}<ellipse cx="50" cy="66" rx="6" ry="4" fill="#222"/>`),
    house: s('<path d="M18 50L50 22l32 28v30H18z" fill="#F4A261"/><path d="M12 52L50 18l38 34" stroke="#8B3A2B" stroke-width="5" fill="none" stroke-linejoin="round"/><rect x="42" y="60" width="16" height="20" fill="#8B5A2B"/><rect x="26" y="52" width="10" height="10" fill="#BDE0FE"/><rect x="64" y="52" width="10" height="10" fill="#BDE0FE"/>'),
    car: s('<path d="M14 62h72v14H14z" fill="#E63946"/><path d="M28 62l8-16h28l10 16z" fill="#E63946"/><path d="M36 50h22l6 12H32z" fill="#BDE0FE"/><circle cx="30" cy="78" r="8" fill="#222"/><circle cx="72" cy="78" r="8" fill="#222"/>'),
    bus: s('<rect x="12" y="26" width="76" height="50" rx="8" fill="#FFB703"/><g fill="#BDE0FE"><rect x="20" y="34" width="16" height="14"/><rect x="42" y="34" width="16" height="14"/><rect x="64" y="34" width="16" height="14"/></g><circle cx="30" cy="80" r="7" fill="#222"/><circle cx="70" cy="80" r="7" fill="#222"/>'),
    bicycle: s('<circle cx="26" cy="64" r="17" fill="none" stroke="#222" stroke-width="4"/><circle cx="74" cy="64" r="17" fill="none" stroke="#222" stroke-width="4"/><path d="M26 64L44 44h18L74 64M44 44l10 20M62 44l-4-12h8" stroke="#E63946" stroke-width="4" fill="none" stroke-linejoin="round"/>'),
    train: s('<rect x="18" y="30" width="64" height="44" rx="10" fill="#3A86FF"/><g fill="#BDE0FE"><rect x="28" y="40" width="16" height="12"/><rect x="56" y="40" width="16" height="12"/></g><circle cx="32" cy="82" r="6" fill="#222"/><circle cx="68" cy="82" r="6" fill="#222"/>'),
    plane: s('<path d="M50 22l6 26 30 10v8l-30-4-4 18 10 6v6l-12-3-12 3v-6l10-6-4-18-30 4v-8l30-10z" fill="#8D99AE"/>'),
    boat: s('<path d="M14 58h72l-12 20H26z" fill="#8B5A2B"/><path d="M50 18v40" stroke="#222" stroke-width="3"/><path d="M52 20l22 32H52z" fill="#FFFFFF" stroke="#D0D0D0"/>'),
    book: s('<path d="M14 30c12-6 24-4 36 4 12-8 24-10 36-4v46c-12-6-24-4-36 4-12-8-24-10-36-4z" fill="#3A86FF"/><path d="M50 34v46" stroke="#fff" stroke-width="2"/>'),
    door: s('<rect x="26" y="20" width="48" height="66" fill="#8B5A2B"/><circle cx="66" cy="56" r="3" fill="#FFD23F"/><rect x="32" y="26" width="36" height="22" fill="none" stroke="#5B3A29" stroke-width="2"/>'),
    window: s('<rect x="18" y="18" width="64" height="64" fill="#BDE0FE" stroke="#5B3A29" stroke-width="5"/><path d="M50 18v64M18 50h64" stroke="#5B3A29" stroke-width="4"/>'),
    table: s('<rect x="14" y="44" width="72" height="8" rx="3" fill="#8B5A2B"/><path d="M22 52v34M78 52v34" stroke="#5B3A29" stroke-width="6"/>'),
    chair: s('<rect x="30" y="20" width="10" height="46" fill="#8B5A2B"/><rect x="30" y="54" width="40" height="8" fill="#8B5A2B"/><path d="M36 62v22M64 62v22" stroke="#5B3A29" stroke-width="6"/>'),
    bed: s('<rect x="12" y="50" width="76" height="14" rx="4" fill="#8B5A2B"/><rect x="18" y="38" width="26" height="14" rx="6" fill="#FFFFFF"/><rect x="48" y="46" width="38" height="10" fill="#3A86FF"/><path d="M18 64v16M82 64v16" stroke="#5B3A29" stroke-width="5"/>'),
    sun: s('<circle cx="50" cy="50" r="18" fill="#FFB703"/><g stroke="#FFB703" stroke-width="5" stroke-linecap="round"><path d="M50 14v10M50 76v10M14 50h10M76 50h10M24 24l7 7M69 69l7 7M76 24l-7 7M31 69l-7 7"/></g>'),
    moon: s('<path d="M60 18a34 34 0 1 0 22 56 28 28 0 1 1-22-56z" fill="#FFD23F"/>'),
    tree: s('<rect x="44" y="60" width="12" height="28" fill="#8B5A2B"/><circle cx="50" cy="42" r="26" fill="#4CAF50"/>'),
    water: s('<path d="M50 14C36 36 28 50 28 62a22 22 0 0 0 44 0c0-12-8-26-22-48z" fill="#3A86FF"/>'),
    milk: s('<path d="M32 30h36l-2 58H34z" fill="#FFFFFF" stroke="#BDBDBD" stroke-width="2"/><path d="M36 30l4-10h16l4 10" fill="#BDE0FE" stroke="#BDBDBD" stroke-width="2"/>'),
    bread: s('<path d="M14 62c0-22 16-34 36-34s36 12 36 34v10H14z" fill="#D9A066"/><path d="M30 46l8 4M50 40l0 8M66 46l-8 4" stroke="#8B5A2B" stroke-width="3" stroke-linecap="round"/>'),
    pen: s('<rect x="44" y="14" width="12" height="60" rx="3" fill="#E63946" transform="rotate(35 50 50)"/><path d="M44 78l6 10 6-10z" fill="#222" transform="rotate(35 50 50)"/>'),
    bag: s('<path d="M30 40c0-18 40-18 40 0" stroke="#5B3A29" stroke-width="4" fill="none"/><rect x="18" y="40" width="64" height="44" rx="6" fill="#FF8C42"/>'),
    phone: s('<rect x="32" y="12" width="36" height="76" rx="8" fill="#222"/><rect x="37" y="22" width="26" height="54" rx="3" fill="#BDE0FE"/><circle cx="50" cy="82" r="2.5" fill="#666"/>'),
    egg: s('<ellipse cx="50" cy="54" rx="26" ry="32" fill="#FFF8E7" stroke="#D9C9A0" stroke-width="2"/>'),
    chicken: s('<ellipse cx="50" cy="60" rx="30" ry="22" fill="#FFD23F"/><circle cx="34" cy="40" r="14" fill="#FFD23F"/><path d="M26 40l-10 3 10 3z" fill="#FF8C1A"/><circle cx="32" cy="36" r="2" fill="#222"/><path d="M34 26c-2-6 4-6 4 0" fill="#E63946"/>'),
    fish: s('<ellipse cx="46" cy="50" rx="28" ry="18" fill="#3A86FF"/><path d="M72 50l16-14v28z" fill="#3A86FF"/><circle cx="32" cy="46" r="3" fill="#222"/>'),
    duck: s('<ellipse cx="46" cy="60" rx="30" ry="18" fill="#FFD23F"/><circle cx="66" cy="42" r="12" fill="#FFD23F"/><path d="M76 42l12 4-12 4z" fill="#FF8C1A"/><circle cx="68" cy="38" r="2" fill="#222"/>'),
    horse: s('<path d="M30 80V56l-6-30c-2-6 8-14 16-10l10 8 22-2c6-2 14 6 12 12L80 60v20H72V60H60v20H52V58H40v22z" fill="#8B5A2B"/>'),
    lion: s('<circle cx="50" cy="50" r="36" fill="#E9A23B"/><circle cx="50" cy="52" r="22" fill="#F4C27A"/>' + face(50, 54)),
    cow: s('<rect x="18" y="34" width="64" height="40" rx="14" fill="#FFFFFF" stroke="#222" stroke-width="2"/><ellipse cx="34" cy="52" rx="8" ry="6" fill="#222"/><ellipse cx="66" cy="62" rx="10" ry="8" fill="#222"/>'),
    camel: s('<ellipse cx="50" cy="62" rx="32" ry="16" fill="#D9A066"/><path d="M40 52c-2-14 6-18 10-18 0 6-2 12-2 18zM60 50c0-14 8-16 10-14-2 6-2 12-2 18z" fill="#C88B4E"/><path d="M70 60v16M30 62v16" stroke="#8B5A2B" stroke-width="5"/>'),
    eagle: s('<path d="M10 56c16-22 30-14 40-6 10-8 24-16 40 6-14-2-22 6-40 16C32 62 24 54 10 56z" fill="#5B3A29"/><circle cx="50" cy="40" r="10" fill="#FFFFFF"/>'),
    owl: s('<ellipse cx="50" cy="56" rx="28" ry="32" fill="#8B5A2B"/><circle cx="38" cy="46" r="10" fill="#FFF8E7"/><circle cx="62" cy="46" r="10" fill="#FFF8E7"/><circle cx="38" cy="46" r="4" fill="#222"/><circle cx="62" cy="46" r="4" fill="#222"/><path d="M46 56l4 6 4-6z" fill="#FFB703"/>'),
    pigeon: s('<ellipse cx="50" cy="58" rx="28" ry="18" fill="#8D99AE"/><circle cx="72" cy="46" r="10" fill="#8D99AE"/><path d="M80 46l8 3-8 3z" fill="#FF8C1A"/><circle cx="74" cy="44" r="2" fill="#222"/>'),
    hen: s('<ellipse cx="46" cy="62" rx="26" ry="20" fill="#FFFFFF" stroke="#D0D0D0" stroke-width="2"/><circle cx="62" cy="42" r="12" fill="#FFFFFF" stroke="#D0D0D0" stroke-width="2"/><path d="M60 28c-2-6 4-6 4 0" fill="#E63946"/><path d="M74 42l8 3-8 3z" fill="#FF8C1A"/><circle cx="66" cy="40" r="2" fill="#222"/>'),
    bird: s('<ellipse cx="46" cy="58" rx="24" ry="18" fill="#3A86FF"/><circle cx="66" cy="42" r="12" fill="#3A86FF"/><path d="M76 42l8 3-8 3z" fill="#FF8C1A"/><circle cx="68" cy="40" r="2" fill="#222"/><path d="M34 52c8-12 18-10 22 0-8 4-16 4-22 0z" fill="#2563EB"/>'),
    monkey: s('<circle cx="50" cy="52" r="30" fill="#A0673B"/><circle cx="50" cy="60" r="16" fill="#F4C27A"/><circle cx="22" cy="46" r="8" fill="#A0673B"/><circle cx="78" cy="46" r="8" fill="#A0673B"/>' + face(50, 54)),
    sheep: s('<circle cx="34" cy="50" r="14" fill="#FFFFFF"/><circle cx="50" cy="44" r="16" fill="#FFFFFF"/><circle cx="66" cy="50" r="14" fill="#FFFFFF"/><rect x="34" y="56" width="32" height="18" rx="6" fill="#222"/>'),
    elephant: s('<ellipse cx="54" cy="52" rx="30" ry="24" fill="#9CA3AF"/><path d="M24 54c-10 4-10 22 2 20" stroke="#9CA3AF" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="66" cy="42" r="2.5" fill="#222"/><rect x="54" y="72" width="6" height="12" fill="#9CA3AF"/>'),
    friends: s('<circle cx="36" cy="40" r="10" fill="#FFB703"/><circle cx="64" cy="40" r="10" fill="#3A86FF"/><path d="M22 78c0-14 28-14 28 0zM50 78c0-14 28-14 28 0z" fill="#E63946"/>'),
  };
})();

// يرجّع رسمة الكلمة (SVG) أو null لو مش موجودة
window.illustrationFor = function (en) {
  if (!en || !window.ILLUSTRATIONS) return null;
  const k = String(en).toLowerCase().replace(/^["“”']+|["“”']+$/g, "").trim();
  return window.ILLUSTRATIONS[k] || null;
};
