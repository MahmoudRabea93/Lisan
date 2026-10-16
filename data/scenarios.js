// Interactive conversations: you are person B. Each round has 3 replies, and each reply has a different score and result.
// score: 2 = natural and appropriate | 1 = understandable but with a problem | 0 = wrong or inappropriate
window.SCENARIOS = [
  {
    id: "sc-cafe", title: "Ordering in a café", ar: "Ordering in a café", level: "A1", goal: "travel",
    setting: "You are in a café in London and want to order breakfast.",
    turns: [
      {
        say: "Hi there! What can I get you?",
        options: [
          { text: "Could I have a cappuccino, please?", score: 2, reply: "Sure. Anything to eat?", note: "\"Could I have …, please\" is polite and a common way to order." },
          { text: "I want cappuccino.", score: 1, reply: "Okay… one cappuccino. Anything else?", note: "Understandable but blunt. \"I'd like\" or \"Could I have\" sounds better." },
          { text: "Give me cappuccino now.", score: 0, reply: "…Right. Coming up.", note: "This sounds like an order, not a request, and comes across as rude." }
        ]
      },
      {
        say: "Anything to eat with that?",
        options: [
          { text: "Yes, a croissant please. How much is it?", score: 2, reply: "Three fifty for the croissant, so seven pounds in total.", note: "\"How much is it?\" is a very natural way to ask about the price." },
          { text: "No thanks, just the coffee.", score: 2, reply: "No problem. That's three fifty.", note: "A polite and clear refusal." },
          { text: "What is the food?", score: 1, reply: "We have croissants, muffins and sandwiches.", note: "A clearer question is \"What do you have?\" or \"What food do you have?\"." }
        ]
      },
      {
        say: "That's seven pounds, please. Card or cash?",
        options: [
          { text: "Card, please. Can I have the receipt?", score: 2, reply: "Of course. Here you are.", note: "\"Receipt\" means the proof of payment. It is said REE-seet, and the p is silent." },
          { text: "By the card.", score: 1, reply: "Sure, tap here.", note: "The natural phrases are \"By card\" or \"Card, please\", without the." },
          { text: "I don't have money.", score: 0, reply: "Oh. Then I'll cancel the order.", note: "If you want to pay in cash, say \"Cash, please\"." }
        ]
      },
      {
        say: "Here's your cappuccino. Have a nice day!",
        options: [
          { text: "Thanks a lot. You too!", score: 2, reply: "Cheers!", note: "\"You too\" is the natural reply to a wish like this." },
          { text: "Thank you. Goodbye.", score: 2, reply: "Bye!", note: "A correct and polite reply." },
          { text: "Yes.", score: 0, reply: "…Okay.", note: "An incomplete reply. At least say thank you." }
        ]
      }
    ],
    phrases: ["Could I have …, please?", "Anything else?", "How much is it?", "Card or cash?", "You too!"]
  },
  {
    id: "sc-hotel", title: "A problem at the hotel", ar: "A problem at the hotel", level: "A2", goal: "travel",
    setting: "You have reached your hotel room and the air conditioning is not working.",
    turns: [
      {
        say: "Reception, good evening. How can I help?",
        options: [
          { text: "Hello, this is room 304. The air conditioning isn't working.", score: 2, reply: "I'm sorry about that. Since when?", note: "Start with the room number, then the problem. This is the expected order." },
          { text: "My room is hot.", score: 1, reply: "Sorry, which room is it?", note: "The information is incomplete, so they will ask again." },
          { text: "Your hotel is very bad.", score: 0, reply: "I'm sorry you feel that way. What is the problem exactly?", note: "Attacking delays the solution. Explain the problem first." }
        ]
      },
      {
        say: "I'm sorry about that. Since when has it been like this?",
        options: [
          { text: "Since I arrived, about an hour ago.", score: 2, reply: "I'll send someone up in ten minutes.", note: "\"Since\" is used for the time when the situation started." },
          { text: "From one hour.", score: 1, reply: "Sorry, you mean an hour ago?", note: "The correct form is \"an hour ago\" or \"for an hour\", not \"from one hour\"." },
          { text: "I don't know.", score: 1, reply: "No problem, we'll check it.", note: "An acceptable reply, but knowing the time helps them fix it faster." }
        ]
      },
      {
        say: "I'll send a technician in ten minutes. Is that okay?",
        options: [
          { text: "That's fine, thank you. I'll be in the room.", score: 2, reply: "Perfect, thank you for your patience.", note: "A clear agreement and a useful piece of information." },
          { text: "Ten minutes is too much.", score: 1, reply: "I understand. I'll ask him to come sooner.", note: "A fair objection, but more polite: \"Could he come sooner, please?\"." },
          { text: "No.", score: 0, reply: "…So how would you like us to help?", note: "A refusal with no alternative stops the conversation." }
        ]
      },
      {
        say: "The technician says he needs an hour. Would you like to change rooms?",
        options: [
          { text: "Yes, please. Could I have a quiet room if possible?", score: 2, reply: "Certainly. Room 512 is free and it's quiet.", note: "\"If possible\" makes the extra request polite." },
          { text: "Okay change.", score: 1, reply: "Sure, I'll prepare another room.", note: "Understandable but very short. \"Yes, please\" is enough and more polite." },
          { text: "I want my money back.", score: 0, reply: "I'll have to call the manager for that.", note: "Escalating too early complicates a situation that has a simple solution." }
        ]
      }
    ],
    phrases: ["This is room …", "It isn't working", "Since I arrived", "Could I have …, if possible?", "Thank you for your patience"]
  },
  {
    id: "sc-interview", title: "A job interview", ar: "A job interview", level: "B1", goal: "work",
    setting: "An interview for a job at a software company. The interviewer asks common questions.",
    turns: [
      {
        say: "Tell me about yourself.",
        options: [
          { text: "I'm a developer with four years of experience, mostly in web applications.", score: 2, reply: "Great. What are you working on now?", note: "One clear sentence: your role, your time in the job, and your field." },
          { text: "I am 29 years old and I live with my family.", score: 1, reply: "Okay… and what about your work?", note: "This question is about your work experience, not your personal life." },
          { text: "Everything is in my CV.", score: 0, reply: "I'd still like to hear it from you.", note: "This reply suggests you are not interested." }
        ]
      },
      {
        say: "What is your biggest weakness?",
        options: [
          { text: "I used to take on too much work, so now I agree priorities with my manager.", score: 2, reply: "That's a good approach.", note: "Mention a real weakness and how you deal with it." },
          { text: "I don't have any weakness.", score: 0, reply: "Everyone has something to improve.", note: "This answer sounds dishonest." },
          { text: "I am very slow and I forget things.", score: 1, reply: "I see. How do you manage that?", note: "Honest, but without a solution it leaves a negative impression." }
        ]
      },
      {
        say: "Why do you want to leave your current job?",
        options: [
          { text: "I'm looking for bigger projects and more responsibility.", score: 2, reply: "We can definitely offer that.", note: "Talk about where you want to go, not what you are running away from." },
          { text: "My manager is terrible and the team is a mess.", score: 0, reply: "…I see.", note: "Criticising your current employer worries the interviewer." },
          { text: "I need more money.", score: 1, reply: "Understandable. Anything else?", note: "Honest, but on its own it is weak. Connect it with your growth." }
        ]
      },
      {
        say: "Do you have any questions for us?",
        options: [
          { text: "Yes — how does the team measure success in the first six months?", score: 2, reply: "Good question. We set clear goals in the first week.", note: "A question about the work itself shows real interest." },
          { text: "No, I think everything is clear.", score: 1, reply: "Okay, thanks for coming.", note: "Not wrong, but you have missed an opportunity." },
          { text: "How many days off do I get and when do I get a raise?", score: 1, reply: "We can discuss that if we move forward.", note: "These are fair questions, but they are better asked after a job offer, not in the first interview." }
        ]
      }
    ],
    phrases: ["Tell me about yourself", "I have … years of experience", "I'm looking for …", "How does the team measure success?"]
  },
  {
    id: "sc-client", title: "A call with a client", ar: "A call with a client", level: "B1", goal: "work",
    setting: "A client is upset because the delivery was a week late.",
    turns: [
      {
        say: "We were supposed to receive the update last week. What happened?",
        options: [
          { text: "You're right, and I'm sorry. We found a problem in testing and fixed it this week.", score: 2, reply: "Okay. So when can we expect it?", note: "An admission and a short reason, without long excuses." },
          { text: "It's not my fault, the other team was late.", score: 0, reply: "That's not really my concern.", note: "Blaming others damages the relationship with the client." },
          { text: "Sorry for the delay.", score: 1, reply: "Fine, but what caused it?", note: "An apology without a reason leaves the client worried." }
        ]
      },
      {
        say: "So when exactly can we expect it?",
        options: [
          { text: "We'll send it on Thursday, and I'll update you on Tuesday either way.", score: 2, reply: "That works. Thanks for being clear.", note: "A specific date plus an update in between builds trust." },
          { text: "Soon, I hope.", score: 0, reply: "That's not good enough, I'm afraid.", note: "\"Soon\" without a date increases the tension." },
          { text: "Maybe next week.", score: 1, reply: "Can you confirm a day?", note: "Too vague. Name a specific day." }
        ]
      },
      {
        say: "And how do we avoid this next time?",
        options: [
          { text: "We've added an extra test step, and I'll share a weekly status with you.", score: 2, reply: "Good. Let's do that.", note: "A concrete action plus ongoing transparency." },
          { text: "We will try to be faster.", score: 1, reply: "Okay…", note: "A general promise without a plan." },
          { text: "These things happen in software.", score: 0, reply: "I expect better than that.", note: "A general justification sounds careless." }
        ]
      }
    ],
    phrases: ["You're right, and I'm sorry", "I'll update you on …", "either way", "Let's avoid this by …"]
  },
  {
    id: "sc-newjob", title: "First day at work", ar: "First day at work", level: "A2", goal: "work",
    setting: "It is your first day, and a colleague is introducing you to the team.",
    turns: [
      {
        say: "Welcome! I'm Sara, I work on the design team.",
        options: [
          { text: "Nice to meet you, Sara. I'm Mahmoud, I'm joining the backend team.", score: 2, reply: "Great to have you. Have you met the others?", note: "Your name and your team: the expected way to introduce yourself." },
          { text: "Hello. I am new.", score: 1, reply: "Yes… what's your name?", note: "Your name is missing, so they will ask again." },
          { text: "Okay.", score: 0, reply: "…Okay.", note: "A closed reply that does not open the conversation." }
        ]
      },
      {
        say: "Have you met the rest of the team yet?",
        options: [
          { text: "Not yet. Could you introduce me?", score: 2, reply: "Sure, come with me.", note: "\"Could you introduce me?\" is a polite and natural request." },
          { text: "No.", score: 1, reply: "I'll take you around then.", note: "Understandable but dry. Add a sentence." },
          { text: "I know everything already.", score: 0, reply: "…Alright.", note: "This sounds arrogant on your first day." }
        ]
      },
      {
        say: "We have a short stand-up at ten every day. Does that work for you?",
        options: [
          { text: "Yes, that works. Where do you usually meet?", score: 2, reply: "In the small room next to the kitchen.", note: "Agreement plus a practical question." },
          { text: "What is stand-up?", score: 2, reply: "A ten-minute meeting where everyone says what they're working on.", note: "Asking about a term you do not know is a good thing, not a weakness." },
          { text: "I don't like meetings.", score: 0, reply: "…It's only ten minutes.", note: "The first day is not the time to object to the team's system." }
        ]
      }
    ],
    phrases: ["Nice to meet you", "I'm joining the … team", "Could you introduce me?", "Does that work for you?"]
  }
];
