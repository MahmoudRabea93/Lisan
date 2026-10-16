// Speaking practice: sets of sentences. Each sentence has its meaning and a pronunciation tip.
// Recording runs in the browser (no external server). Recordings are not stored or uploaded.
window.SPEAK = [
  {
    id: "sp-intro", title: "Introducing yourself", ar: "Introducing yourself", level: "A1", goal: "talk",
    lines: [
      { en: "Hello, my name is Omar.", ar: "Hello, my name is Omar.", tip: "The pitch goes down at the end of a statement." },
      { en: "I'm from Egypt, from Cairo.", ar: "I come from Egypt, from Cairo.", tip: "\"I'm\" is said quickly as one sound: aim." },
      { en: "I work as a software engineer.", ar: "I work as a software engineer.", tip: "Stress SOFT-ware and en-gi-NEER." },
      { en: "Nice to meet you.", ar: "A polite way to say you are happy to meet someone.", tip: "\"to\" is weak here: nice tuh meet you." },
      { en: "Sorry, could you repeat that?", ar: "Asking someone to say something again politely.", tip: "The pitch rises at the end of a question." },
      { en: "How do you spell your name?", ar: "Asking how to write a name letter by letter.", tip: "Say the s in \"spell\" clearly." }
    ]
  },
  {
    id: "sp-cafe", title: "At the restaurant", ar: "At the restaurant", level: "A1", goal: "travel",
    lines: [
      { en: "A table for two, please.", ar: "Asking for a table for two people.", tip: "\"table\" is TAY-bul, with a long a." },
      { en: "Could I see the menu, please?", ar: "Asking to see the list of food.", tip: "\"Could I\" runs together: kud-eye." },
      { en: "I'd like the chicken, please.", ar: "A polite way to order, more polite than I want.", tip: "\"I'd like\" sounds much politer than \"I want\"." },
      { en: "Does it have nuts in it?", ar: "Asking if a dish contains nuts.", tip: "\"Does it\" runs together: duz-it." },
      { en: "Could we have the bill, please?", ar: "Asking for the bill. In America people say \"check\".", tip: "In America people say \"check\" instead of \"bill\"." },
      { en: "It was delicious, thank you.", ar: "Saying the food was very tasty.", tip: "\"delicious\" is di-LISH-us, with stress on the middle." }
    ]
  },
  {
    id: "sp-travel", title: "At the airport", ar: "At the airport", level: "A2", goal: "travel",
    lines: [
      { en: "Where is the check-in desk?", ar: "Asking where you register for your flight.", tip: "\"Where is\" runs together: wair-iz." },
      { en: "I have one bag to check in.", ar: "Saying you have one bag to hand in.", tip: "\"bag\" has a short a, not \"beg\"." },
      { en: "Is the flight on time?", ar: "Asking if the flight is leaving at the planned time.", tip: "\"flight\" has a long i sound: flight." },
      { en: "Which gate is it, please?", ar: "Asking which gate to go to.", tip: "\"gate\" is gayt, not \"get\"." },
      { en: "I missed my connection.", ar: "Saying you missed the flight you were changing to.", tip: "\"missed\" ends with a t sound, not d." },
      { en: "Could you help me, please?", ar: "Asking for help politely.", tip: "Clear l in \"help\" before the p." }
    ]
  },
  {
    id: "sp-phone", title: "On the phone", ar: "On the phone", level: "A2", goal: "work",
    lines: [
      { en: "Hello, this is Mahmoud speaking.", ar: "Hello, it's Mahmoud.", tip: "On the phone we say \"this is ...\", not \"I am ...\"." },
      { en: "Could I speak to Mr. Hassan, please?", ar: "Asking to talk to Mr Hassan.", tip: "\"speak to\" runs together: speak-tuh." },
      { en: "Sorry, the line is bad. Could you repeat that?", ar: "Saying the connection is poor and asking for a repeat.", tip: "End the question with a rising tone." },
      { en: "Can I leave a message?", ar: "Asking if you can leave a message.", tip: "\"message\" is stressed on the first part: MES-ij." },
      { en: "I'll call you back in ten minutes.", ar: "Saying you will call again in ten minutes.", tip: "\"I'll\" is said quickly: ail." },
      { en: "Thanks for your time. Goodbye.", ar: "A polite way to end a phone call.", tip: "\"Thanks for\" runs together: thanks-fur." }
    ]
  },
  {
    id: "sp-interview", title: "In an interview", ar: "In an interview", level: "B1", goal: "work",
    lines: [
      { en: "I have four years of experience in web development.", ar: "Saying you have four years of work in building websites.", tip: "\"years of\" runs together: yeerz-of." },
      { en: "In my last role, I led a small team.", ar: "Saying you were in charge of a small group in your last job.", tip: "\"led\" is short, like \"bed\"." },
      { en: "I'm comfortable working under pressure.", ar: "Saying you can work well when things are stressful.", tip: "\"comfortable\" has three syllables: KUMF-ter-bul." },
      { en: "Could you tell me more about the team?", ar: "Asking for more information politely.", tip: "A polite question. The pitch rises at the end." },
      { en: "That's a good question.", ar: "A phrase that gives you time to think.", tip: "Use it calmly to buy yourself time before answering." },
      { en: "Thank you for your time today.", ar: "A polite way to close an interview.", tip: "Always finish an interview with this." }
    ]
  }
];
