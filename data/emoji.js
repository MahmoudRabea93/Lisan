// رموز (إيموجي) للكلمات: بتظهر مع الكلمة وفي تمارين الصورة وتمارين الربط. مفيش صور خارجية فمفيش مشاكل حقوق نشر
window.EMOJI = {
  cat: "🐱", dog: "🐶", horse: "🐴", cow: "🐮", lion: "🦁", camel: "🐫", monkey: "🐵", sheep: "🐑", fish: "🐟", elephant: "🐘",
  bird: "🐦", duck: "🦆", hen: "🐔", eagle: "🦅", owl: "🦉", pigeon: "🕊️", chicken: "🍗",
  apple: "🍎", banana: "🍌", orange: "🍊", grape: "🍇", mango: "🥭", lemon: "🍋", strawberry: "🍓", watermelon: "🍉",
  tomato: "🍅", potato: "🥔", onion: "🧅", carrot: "🥕", cucumber: "🥒", garlic: "🧄", pepper: "🫑", lettuce: "🥬",
  car: "🚗", bus: "🚌", taxi: "🚕", train: "🚆", bicycle: "🚲", bike: "🚲", plane: "✈️", boat: "⛵", metro: "🚇",
  book: "📖", door: "🚪", window: "🪟", table: "🪑", chair: "🪑", bed: "🛏️", pen: "🖊️", bag: "👜", phone: "📱",
  cup: "☕", tea: "🍵", coffee: "☕", milk: "🥛", bread: "🍞", rice: "🍚", water: "💧", pizza: "🍕", egg: "🥚",
  sun: "☀️", moon: "🌙", house: "🏠", tree: "🌳", flower: "🌸", ball: "⚽", hat: "🎩", shoe: "👟", clock: "🕰️", key: "🔑",
  mother: "👩", father: "👨", sister: "👧", brother: "👦", baby: "👶", doctor: "🧑‍⚕️", teacher: "🧑‍🏫", student: "🧑‍🎓",
  rain: "🌧️", snow: "❄️", hot: "🥵", cold: "🥶", bank: "🏦", hospital: "🏥", school: "🏫", mosque: "🕌"
};
window.emojiFor = function (en) {
  if (!en) return null;
  const k = String(en).toLowerCase().replace(/^["“”']+|["“”']+$/g, "").trim();
  return window.EMOJI[k] || null;
};
