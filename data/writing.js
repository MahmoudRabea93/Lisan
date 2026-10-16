// Writing practice: real-life emails and messages.
// checks: each item has any = words or phrases. If one of them is written, the item is marked as done.
window.WRITING = [
  {
    id: "wr-leave", title: "Asking for a day off", ar: "Email asking for a day off", level: "A2", goal: "work", kind: "email",
    brief: "Write an email to your manager (Mr. Hassan) asking for a day off next Thursday because of a family matter. Explain that your work will be handed over before then.",
    minWords: 40,
    checks: [
      { label: "A suitable greeting", any: ["dear", "hello", "hi "] },
      { label: "Names the day you want", any: ["thursday"] },
      { label: "Asks clearly", any: ["day off", "annual leave", "take leave", "request leave", "a day of leave"] },
      { label: "Reassures him about your work", any: ["before", "finish", "complete", "hand over", "cover"] },
      { label: "A polite ending", any: ["regards", "best wishes", "sincerely", "thank you"] }
    ],
    phrases: ["I would like to request …", "I will make sure …", "Please let me know if …", "Kind regards,"],
    model: "Dear Mr. Hassan,\n\nI would like to request a day off next Thursday for a family matter.\n\nI will finish the monthly report before Wednesday evening, and Ahmed has agreed to cover any urgent requests on the day.\n\nPlease let me know if that works for you.\n\nKind regards,\nMahmoud"
  },
  {
    id: "wr-late", title: "Apologising for a delay", ar: "Email apologising for a delay", level: "B1", goal: "work", kind: "email",
    brief: "Delivery to the client was a week late. Write an email with an apology, a short reason, the new date, and how you will prevent it from happening again.",
    minWords: 50,
    checks: [
      { label: "A clear apology", any: ["sorry", "apologise", "apologize", "apology"] },
      { label: "A short reason", any: ["because", "due to", "caused", "issue", "problem"] },
      { label: "A specific new date", any: ["monday", "tuesday", "wednesday", "thursday", "friday", "by ", "on the"] },
      { label: "A plan to prevent it happening again", any: ["avoid", "prevent", "make sure", "in future", "going forward", "weekly"] },
      { label: "A professional ending", any: ["regards", "sincerely", "thank you for your patience"] }
    ],
    phrases: ["I'm sorry for the delay in …", "The reason was …", "We will deliver it by …", "To avoid this in future, we will …"],
    model: "Dear Ms. Noor,\n\nI'm sorry for the delay in delivering the update. We found a problem during testing and we did not want to release it before fixing it.\n\nThe new version will be ready by Thursday, and I will send you a short status note on Tuesday.\n\nTo avoid this in future, we have added an extra testing step and we will share a weekly update with you.\n\nThank you for your patience.\n\nBest regards,\nMahmoud"
  },
  {
    id: "wr-booking", title: "A hotel enquiry", ar: "Email asking about a hotel booking", level: "A2", goal: "travel", kind: "email",
    brief: "Write an email to a hotel asking about a double room for two people from 3 to 6 July. Ask about the price, breakfast, and airport transfer.",
    minWords: 45,
    checks: [
      { label: "Room type and length of stay", any: ["double room", "two people", "for two", "three nights", "3 nights"] },
      { label: "Specific dates", any: ["july", "3 ", "6 "] },
      { label: "Asks about the price", any: ["price", "cost", "how much", "rate"] },
      { label: "Asks about breakfast or a service", any: ["breakfast", "included", "airport", "transfer", "wifi"] },
      { label: "A polite ending", any: ["regards", "looking forward", "thank you"] }
    ],
    phrases: ["I would like to book …", "from … to …", "Could you tell me …?", "Is breakfast included?"],
    model: "Dear Sir or Madam,\n\nI would like to book a double room for two people from 3 to 6 July (three nights).\n\nCould you tell me the price per night, and whether breakfast is included? I would also like to know if you offer transfer from the airport.\n\nThank you in advance.\n\nKind regards,\nMahmoud Rabea"
  },
  {
    id: "wr-intro", title: "Introducing yourself to a new team", ar: "Email introducing yourself", level: "A2", goal: "work", kind: "email",
    brief: "Your first day at a new job. Write a short email to the team: your name, your role, a brief summary of your experience, and that you are ready to help.",
    minWords: 40,
    checks: [
      { label: "Your name and role", any: ["my name is", "i'm ", "i am ", "joining", "developer", "engineer"] },
      { label: "Your experience or background", any: ["experience", "worked", "years", "background"] },
      { label: "What you will be working on", any: ["working on", "responsible", "team", "project"] },
      { label: "An invitation to get in touch", any: ["feel free", "reach out", "let me know", "happy to"] },
      { label: "An ending", any: ["regards", "thanks", "looking forward"] }
    ],
    phrases: ["I've just joined … as …", "Before that, I worked …", "Feel free to reach out …", "Looking forward to working with you."],
    model: "Hi everyone,\n\nMy name is Mahmoud and I've just joined the backend team as a software engineer.\n\nBefore that, I worked for four years on web applications, mostly in C# and .NET. For the next few weeks I'll be working on the payments service with Sara.\n\nFeel free to reach out if you need anything from my side.\n\nLooking forward to working with you all,\nMahmoud"
  },
  {
    id: "wr-complaint", title: "A complaint about an order", ar: "Complaint message about an order", level: "B1", goal: "general", kind: "email",
    brief: "You ordered a product online. It arrived late and it is damaged. Write a polite complaint with the details, the problem, and what you want (a replacement or a refund).",
    minWords: 55,
    checks: [
      { label: "Order number or details", any: ["order", "number", "#", "reference"] },
      { label: "Description of the problem", any: ["damaged", "broken", "late", "delay", "not working", "wrong"] },
      { label: "A clear request", any: ["refund", "replace", "replacement", "return", "exchange"] },
      { label: "A polite tone", any: ["please", "could you", "i would", "kindly"] },
      { label: "A deadline or follow-up", any: ["within", "by ", "look forward", "hear from you"] }
    ],
    phrases: ["I am writing about order number …", "Unfortunately, …", "I would like a refund / replacement.", "I look forward to hearing from you."],
    model: "Dear Customer Service,\n\nI am writing about order number 48213, which I received on 12 May, five days later than the promised date.\n\nUnfortunately, the screen arrived with a crack in the corner, so I cannot use it. I have attached two photos.\n\nI would like a replacement, or a full refund if a replacement is not possible. Could you let me know what you can do within the next few days?\n\nI look forward to hearing from you.\n\nKind regards,\nMahmoud Rabea"
  },
  {
    id: "wr-reschedule", title: "Moving a meeting", ar: "Short message to postpone a meeting", level: "A2", goal: "work", kind: "message",
    brief: "Write a short message (chat or WhatsApp) to your colleague postponing today's 2 pm meeting and suggesting an alternative tomorrow morning.",
    minWords: 20,
    checks: [
      { label: "Asks to postpone", any: ["move", "reschedule", "postpone", "push"] },
      { label: "A short reason", any: ["because", "i have", "something came up", "conflict", "urgent"] },
      { label: "A specific alternative", any: ["tomorrow", "morning", "10", "11", "9"] },
      { label: "Asks if it works for them", any: ["does that work", "is that ok", "let me know", "would that suit"] }
    ],
    phrases: ["Sorry, something came up.", "Could we move our 2 pm to …?", "Does that work for you?"],
    model: "Hi Sara, sorry — something urgent came up and I can't make our 2 pm today. Could we move it to tomorrow at 10? Does that work for you?"
  }
];
