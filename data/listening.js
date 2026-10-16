// Listening library.
// Each item has lines (the dialogue) and comprehension questions. If you add a real audio file to audio/
// named after the id (for example audio/ls-1.mp3), it will play automatically. Otherwise the app reads
// the text aloud with the browser voice. Change src if the file name is different.
window.LISTENING = [
  {
    id: "ls-1", title: "At the café", ar: "Ordering at a café", level: "A1", topic: "Daily life",
    src: "audio/ls-1.mp3",
    intro: "Mohamed orders breakfast at a café.",
    lines: [
      { who: "A", text: "Good morning. What would you like?" },
      { who: "B", text: "Good morning. A small coffee, please." },
      { who: "A", text: "With milk or black?" },
      { who: "B", text: "With milk, please. And one cheese sandwich." },
      { who: "A", text: "That's four pounds fifty." },
      { who: "B", text: "Here you are. Thank you." }
    ],
    questions: [
      { q: "What does the man order to drink?", options: ["A small coffee", "A large tea", "Orange juice"], answer: "A small coffee" },
      { q: "How does he want his coffee?", options: ["With milk", "Black", "With sugar only"], answer: "With milk" },
      { q: "How much does he pay?", options: ["£4.50", "£5.40", "£14.50"], answer: "£4.50" }
    ],
    words: [
      { en: "would like", ar: "want, a polite way to ask for something" },
      { en: "black coffee", ar: "coffee without milk" },
      { en: "Here you are", ar: "said when giving something to someone" }
    ]
  },
  {
    id: "ls-2", title: "Asking for directions", ar: "Asking for directions", level: "A1", topic: "Travel",
    src: "audio/ls-2.mp3",
    intro: "A tourist asks where the metro station is.",
    lines: [
      { who: "A", text: "Excuse me, how do I get to the metro station?" },
      { who: "B", text: "Go straight, then turn left at the bank." },
      { who: "A", text: "Is it far?" },
      { who: "B", text: "No, about five minutes on foot." },
      { who: "A", text: "Thank you very much." },
      { who: "B", text: "You're welcome. Have a nice day." }
    ],
    questions: [
      { q: "Where does she want to go?", options: ["The metro station", "The bank", "The hotel"], answer: "The metro station" },
      { q: "Where does she turn left?", options: ["At the bank", "At the station", "At the café"], answer: "At the bank" },
      { q: "How long is the walk?", options: ["About five minutes", "About fifteen minutes", "About an hour"], answer: "About five minutes" }
    ],
    words: [
      { en: "go straight", ar: "keep walking forward" },
      { en: "turn left", ar: "change direction to the left" },
      { en: "on foot", ar: "walking" }
    ]
  },
  {
    id: "ls-3", title: "Hotel check-in", ar: "Checking in at a hotel", level: "A2", topic: "Travel",
    src: "audio/ls-3.mp3",
    intro: "A guest checks in with a booking in his name.",
    lines: [
      { who: "A", text: "Good evening. Do you have a reservation?" },
      { who: "B", text: "Yes, I booked a single room for three nights. My name is Omar Saleh." },
      { who: "A", text: "Let me check. Yes, room 304 on the third floor." },
      { who: "B", text: "Is breakfast included?" },
      { who: "A", text: "Yes, from seven to ten in the restaurant downstairs." },
      { who: "B", text: "Great. Could I have a room away from the lift?" }
    ],
    questions: [
      { q: "How long is his stay?", options: ["Three nights", "One night", "A week"], answer: "Three nights" },
      { q: "What is included in the price?", options: ["Breakfast", "Dinner", "Airport transfer"], answer: "Breakfast" },
      { q: "What does he ask for at the end?", options: ["A room away from the lift", "A bigger bed", "A late check-out"], answer: "A room away from the lift" }
    ],
    words: [
      { en: "reservation", ar: "a booking made in advance" },
      { en: "included", ar: "part of the price, no extra cost" },
      { en: "lift", ar: "elevator (British English)" }
    ]
  },
  {
    id: "ls-4", title: "A phone call to the office", ar: "A phone call to the office", level: "A2", topic: "Work",
    src: "audio/ls-4.mp3",
    intro: "Someone calls a colleague, but he is not available.",
    lines: [
      { who: "A", text: "Good morning, Delta Systems. How can I help you?" },
      { who: "B", text: "Hello, this is Khaled. Could I speak to Mrs. Nader, please?" },
      { who: "A", text: "I'm afraid she's in a meeting until twelve." },
      { who: "B", text: "Can I leave a message?" },
      { who: "A", text: "Of course. Go ahead." },
      { who: "B", text: "Please tell her the report is ready and I will send it today." }
    ],
    questions: [
      { q: "Why can't he speak to Mrs. Nader?", options: ["She is in a meeting", "She is on holiday", "She left the company"], answer: "She is in a meeting" },
      { q: "What does he decide to do?", options: ["Leave a message", "Call tomorrow", "Visit the office"], answer: "Leave a message" },
      { q: "What is the message about?", options: ["The report is ready", "The meeting is cancelled", "He needs a day off"], answer: "The report is ready" }
    ],
    words: [
      { en: "I'm afraid", ar: "a polite way to say unfortunately" },
      { en: "leave a message", ar: "say something for someone to get later" },
      { en: "Go ahead", ar: "please continue, say what you want to say" }
    ]
  },
  {
    id: "ls-5", title: "Airport announcement", ar: "An airport announcement", level: "A2", topic: "Travel",
    src: "audio/ls-5.mp3",
    intro: "An announcement about a delayed flight.",
    lines: [
      { who: "A", text: "Attention please. Flight MS two one five to Dubai is delayed by forty minutes." },
      { who: "A", text: "The new boarding time is nine fifteen from gate twelve." },
      { who: "A", text: "Passengers with small children can board first." },
      { who: "A", text: "We are sorry for the delay. Thank you for your patience." }
    ],
    questions: [
      { q: "What is the problem?", options: ["The flight is delayed", "The flight is cancelled", "The gate is closed"], answer: "The flight is delayed" },
      { q: "What is the new boarding time?", options: ["9:15", "9:50", "12:00"], answer: "9:15" },
      { q: "Who can board first?", options: ["Passengers with small children", "Business class only", "Everyone together"], answer: "Passengers with small children" }
    ],
    words: [
      { en: "delayed", ar: "later than planned" },
      { en: "boarding", ar: "getting on the plane" },
      { en: "gate", ar: "the place where you board the plane" }
    ]
  },
  {
    id: "ls-6", title: "A job interview", ar: "A job interview", level: "B1", topic: "Work",
    src: "audio/ls-6.mp3",
    intro: "A short interview for a job in a technical support team.",
    lines: [
      { who: "A", text: "Thanks for coming. Tell me a little about your experience." },
      { who: "B", text: "I have worked in customer support for three years, mostly with software teams." },
      { who: "A", text: "What do you find most difficult in that job?" },
      { who: "B", text: "Explaining technical problems in simple words, but I have become much better at it." },
      { who: "A", text: "Why do you want to join us?" },
      { who: "B", text: "Because your team works closely with developers, and I want to grow in that direction." }
    ],
    questions: [
      { q: "How long has she worked in customer support?", options: ["Three years", "Three months", "Thirteen years"], answer: "Three years" },
      { q: "What does she find difficult?", options: ["Explaining technical problems simply", "Working early hours", "Travelling for work"], answer: "Explaining technical problems simply" },
      { q: "Why does she want the job?", options: ["To work closely with developers", "Because it pays more", "Because it is near her home"], answer: "To work closely with developers" }
    ],
    words: [
      { en: "experience", ar: "work you have done before" },
      { en: "customer support", ar: "helping customers with their problems" },
      { en: "grow", ar: "develop in your career" }
    ]
  }
];
