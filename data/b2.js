// Level B2 (upper-intermediate): 5 units x 5 lessons.
window.COURSES = window.COURSES || [];
window.COURSES.push({
  level: "B2",
  about: "Discuss abstract topics, understand longer texts, and tell apart formal and informal language.",
  units: [
    {
      id: "b2-u1", title: "Advanced structures", goals: ["work"], goal: "Use longer and more precise structures in speaking and writing",
      lessons: [
        {
          id: "b2-u1-l1", title: "Second conditional", ar: "Second conditional",
          explanation: "To talk about an imaginary or unlikely situation in the present: If + past simple, would + base verb. Example: If I had more money, I would travel the world. With I / he / she we can also say were: If I were you, I would accept.",
          vocab: V("imagine|To form a picture in your mind of something not real|Imagine you won a prize.", "lottery|A game where you win money by chance|If I won the lottery, I would buy a house.", "if I were you|A way to give advice|If I were you, I would apply.",
            "unlikely|Not probable|Rain is unlikely today.", "afford|To have enough money for something|I can't afford a new car.", "hypothetical|Based on an imagined situation|It's only a hypothetical question."),
          talk: T("A|What would you do if you won the lottery?", "B|I would buy a house and travel.|I will buy a house and travel.|I would to buy a house and travel.",
            "A|Really? Wouldn't you quit your job?", "B|No, I would keep working part-time.|No, I will keeping working part-time.|No, I would kept working part-time.",
            "A|If you were the boss, what would you change?", "B|I would give everyone more holidays.|I will give everyone more holidays.|I would gave everyone more holidays.",
            "Q|What would B do after winning?|Buy a house and travel|Quit work immediately|Open a shop"),
          reading: R("If I were a millionaire, I would not stop working. I would open a small bookshop and hire students. I would also travel twice a year, but I would never buy a yacht. It would be too expensive to keep.",
            "What would the writer open?|A bookshop|A restaurant|A school", "Who would the writer hire?|Students|Chefs|Drivers", "What would he never buy?|A yacht|A house|A car"),
          exercises: [
            C("If I ___ more time, I would learn Spanish.", ["had", "have", "will have"], "had"),
            C("If she ___ rich, she would buy a big house.", ["were", "is", "will be"], "were"),
            L("If I were you I would wait", ["If I am you I will wait", "If I were you I would waited"]),
            C("What ___ you do if you lost your job?", ["would", "will", "did"], "would"),
            O("Put the words in order: If I had time I would travel", "If I had time I would travel"),
            C("If I won the lottery, I ___ a house.", ["would buy", "will buy", "bought"], "would buy")
          ]
        },
        {
          id: "b2-u1-l2", title: "Third conditional", ar: "Third conditional",
          explanation: "To talk about a past situation that could have been different: If + past perfect, would have + past participle. Example: If I had left earlier, I would have caught the train. (But I did not leave early.)",
          vocab: V("regret|To feel sorry about something you did or did not do|I regret not studying harder.", "overslept|Slept longer than you meant to|I overslept and missed the bus.", "missed the deadline|Did not finish by the due date|We missed the deadline by a day.",
            "in hindsight|Looking back on past events|In hindsight, I should have asked.", "outcome|The result of something|The outcome would have been different.", "turn out|To end up being|It turned out well."),
          talk: T("A|Why did you miss the meeting?", "B|I overslept. If I had set an alarm, I would have arrived on time.|I overslept. If I set an alarm, I would arrive on time.|I overslept. If I had set an alarm, I would arrived on time.",
            "A|That's a shame. Did the manager notice?", "B|Yes, and if I had called him, he would have understood.|Yes, and if I called him, he would have understood.|Yes, and if I had called him, he will understand.",
            "A|Next time, send him a message early.", "B|You're right. I regret not calling him.|You're right. I regret to not calling him.|You're right. I regretting not calling him.",
            "Q|Why was B late?|He overslept|He missed the train|He forgot the date"),
          reading: R("Last year I missed a great job offer because I didn't reply on time. If I had checked my email, I would have seen it. In hindsight, I should have been more careful. Now I read my messages every morning.",
            "Why did the writer lose the job offer?|He didn't reply on time|He refused it|He was ill", "What would have happened if he had checked his email?|He would have seen the offer|He would have missed the bus|He would have quit", "What does he do now?|Reads his messages every morning|Ignores emails|Changes jobs"),
          exercises: [
            C("If I ___ harder, I would have passed.", ["had studied", "studied", "would study"], "had studied"),
            C("She would have come if she ___ about it.", ["had known", "knew", "has known"], "had known"),
            L("If I had known I would have helped", ["If I knew I would help", "If I had known I would have helping"]),
            C("If they ___ the bus, they would have been late.", ["had missed", "missed", "would miss"], "had missed"),
            O("Put the words in order: If you had listened you would have succeeded", "If you had listened you would have succeeded"),
            C("We ___ the match if we had played better.", ["would have won", "would win", "will have won"], "would have won")
          ]
        },
        {
          id: "b2-u1-l3", title: "I wish", ar: "I wish",
          explanation: "We use wish to express a desire: wish + past simple for a present situation you would like to be different (I wish I had a car). wish + past perfect for a regret about the past (I wish I had studied). wish + would for something that annoys you about someone (I wish he would stop talking). If only has the same meaning and is stronger.",
          vocab: V("wish|To want something that is not true or not possible|I wish I had more free time.", "if only|A stronger way to say I wish|If only I knew the answer.", "complain|To say you are unhappy about something|He always complains about the noise.",
            "stuck|Unable to move or leave|I'm stuck in traffic.", "dream of|To imagine something you want very much|She dreams of living abroad.", "annoying|Making you feel irritated|It's annoying when he interrupts."),
          talk: T("A|I wish I lived closer to work.", "B|I know. I wish the commute were shorter too.|I know. I wish the commute is shorter too.|I know. I wish the commute will be shorter too.",
            "A|And I wish the bus would arrive on time!", "B|Yes, it's annoying. Why don't we cycle?|Yes, it's annoying. Why we don't cycle?|Yes, it annoying. Why don't we cycling?",
            "A|I wish I had bought a bike last year.", "B|It's not too late. You can buy one now.|It's not too late. You can bought one now.|It not too late. You can buying one now.",
            "Q|What does A wish about the bus?|It would arrive on time|It would be cheaper|It would stop near work"),
          reading: R("Sara lives far from her office and spends two hours in traffic every day. She wishes she lived closer. Last month she visited a flat near her office. She wishes she had taken it, but she waited and someone else rented it.",
            "How long does Sara spend in traffic?|Two hours a day|Ten minutes|Five hours", "What does she wish?|That she lived closer|That she worked at home|That she had a car",
            "Why didn't she get the flat?|Someone else rented it|It was too small|She didn't like it"),
          exercises: [
            C("I wish I ___ a bigger flat.", ["had", "have", "would have"], "had"),
            C("I wish I ___ harder last year.", ["had studied", "studied", "would study"], "had studied"),
            L("I wish I could speak French", ["I wish I can speak French", "I wish I could spoke French"]),
            C("I wish he ___ making so much noise.", ["would stop", "stops", "stopped to"], "would stop"),
            O("Put the words in order: I wish I had more time", "I wish I had more time"),
            C("___ I knew the answer!", ["If only", "Only if", "Even"], "If only")
          ]
        },
        {
          id: "b2-u1-l4", title: "The passive", ar: "The passive",
          explanation: "The passive is formed with be + past participle. We use it when the doer is unimportant or unknown: The bridge was built in 1990. We add by to mention the doer: The report was written by Sara. It works with many tenses: is made, was made, has been made, will be made, is being made.",
          vocab: V("was built|Was constructed|The castle was built in 1200.", "was invented|Was created for the first time|The telephone was invented in 1876.", "is made of|Consists of|This table is made of wood.",
            "has been delivered|Has arrived at its destination|The package has been delivered.", "is being repaired|Is in the process of being fixed|The road is being repaired.", "will be announced|Will be made public|The winner will be announced tomorrow."),
          talk: T("A|Is the new bridge finished?", "B|Not yet. It is still being built.|Not yet. It is still building.|Not yet. It still being built.",
            "A|When was it started?", "B|It was started two years ago.|It started by two years ago.|It was start two years ago.",
            "A|And when will it be opened?", "B|It will be opened next spring.|It will opened next spring.|It will be open next spring by.",
            "Q|When will the bridge be opened?|Next spring|Next month|Next year"),
          reading: R("The old library in our town was built in 1920. Last year it was damaged by a storm, so it is being repaired now. The books have been moved to a temporary building. The library will be reopened in June.",
            "When was the library built?|1920|1950|2020", "Why is it being repaired?|It was damaged by a storm|It is too small|It is very dirty", "Where have the books been moved?|To a temporary building|To a school|To the town hall"),
          exercises: [
            C("The bridge ___ in 1990.", ["was built", "built", "is building"], "was built"),
            C("English ___ all over the world.", ["is spoken", "speaks", "is speaking"], "is spoken"),
            L("The report has been finished", ["The report has finished", "The report was finishing"]),
            C("The room ___ at the moment.", ["is being cleaned", "is cleaning", "cleans"], "is being cleaned"),
            O("Put the words in order: The letter was sent yesterday", "The letter was sent yesterday"),
            C("The results ___ next week.", ["will be announced", "will announce", "are announcing"], "will be announced")
          ]
        },
        {
          id: "b2-u1-l5", title: "Relative clauses", ar: "Relative clauses",
          explanation: "Relative clauses describe a noun: who for people (the man who called), which for things (the book which I read), that for both, whose for possession (the girl whose bag was stolen), where for places (the city where I was born). You can drop who, which, or that when they are the object: the book I read.",
          vocab: V("whose|Belonging to whom|That is the man whose car was stolen.", "neighbourhood|A local area of a town|It's a quiet neighbourhood.", "colleague|A person you work with|A colleague who sits next to me helped.",
            "responsible for|In charge of|She is responsible for training.", "someone who|A person who|I need someone who can drive.", "the place where|The location in which|This is the place where we met."),
          talk: T("A|Who is that woman over there?", "B|She's the colleague who joined us last week.|She's the colleague which joined us last week.|She's the colleague whose joined us last week.",
            "A|And the man next to her?", "B|He's the manager whose office is on the third floor.|He's the manager who his office is on the third floor.|He's the manager which office is on the third floor.",
            "A|Do you like the neighbourhood where we work?", "B|Yes, it's the quietest place that I know.|Yes, it's the quietest place who I know.|Yes, it's the quietest place whose I know.",
            "Q|Who joined last week?|A new colleague|The manager|A neighbour"),
          reading: R("I live in a neighbourhood where everybody knows each other. My neighbour, whose daughter is my friend, invited us to dinner. She cooked a dish that I had never tried before. It was the best meal which I have had this year.",
            "Where does the writer live?|In a friendly neighbourhood|In a big city|Abroad", "Whose daughter is the writer's friend?|The neighbour's|The teacher's|The manager's", "What did the neighbour cook?|A new dish for the writer|A cake|Nothing"),
          exercises: [
            C("The man ___ called is my boss.", ["who", "which", "where"], "who"),
            C("This is the book ___ I told you about.", ["that", "who", "whose"], "that"),
            L("She is the woman whose bag was stolen", ["She is the woman who bag was stolen", "She is the woman whose bag stole"]),
            C("That is the city ___ I was born.", ["where", "who", "whose"], "where"),
            O("Put the words in order: This is the man who called", "This is the man who called"),
            C("I met a girl ___ father is a doctor.", ["whose", "who", "which"], "whose")
          ]
        }
      ]
    },
    {
      id: "b2-u2", title: "Argument and persuasion", goals: ["work", "talk"], goal: "Build a complete opinion and defend it with examples",
      lessons: [
        {
          id: "b2-u2-l1", title: "Structuring an argument", ar: "Structuring an argument",
          explanation: "To build a strong argument: start with your idea (Firstly, I believe...), support it with a reason (This is because...), add evidence or an example (For instance...), add another point (Moreover / In addition), and finish (In conclusion).",
          vocab: V("firstly|First of all|Firstly, it saves time.", "moreover|In addition to that|Moreover, it is cheaper.", "in addition|As well as that|In addition, it is safer.",
            "for instance|As an example|For instance, many companies work remotely.", "in conclusion|To finish|In conclusion, I support the idea.", "on the one hand|Looking at one side|On the one hand, it is fast."),
          talk: T("A|Do you think students should wear uniforms?", "B|Yes. Firstly, it makes everyone equal.|Yes. Firstly, it make everyone equal.|Yes. First of, it makes everyone equal.",
            "A|Is that your only reason?", "B|No. Moreover, it saves parents money.|No. Moreover of, it saves parents money.|No. Moreover that, it saved parents money.",
            "A|You make a good point. Can you give an example?", "B|For instance, nobody competes over fashion.|For instance of, nobody competes over fashion.|For instance, nobody compete over fashion.",
            "Q|What is B's second reason?|It saves parents money|It looks smart|It is comfortable"),
          reading: R("Many people think remote work is the future. Firstly, employees save time because they don't travel. Moreover, companies spend less on offices. However, some workers feel lonely at home. In conclusion, remote work is best when it is combined with some office days.",
            "What is the first benefit?|Employees save travel time|Higher salaries|Longer holidays", "What do companies save on?|Offices|Salaries|Computers", "What is the writer's conclusion?|A mix of home and office is best|Everyone should work at home|Offices are better"),
          exercises: [
            C("___, I believe it saves time.", ["Firstly", "Despite", "Whereas"], "Firstly"),
            C("It is cheap. ___, it is very fast.", ["Moreover", "Although", "Despite"], "Moreover"),
            L("In conclusion I support this idea", ["In conclusion I supported this idea", "In addition I support this idea"]),
            C("___, the course is expensive. On the other hand, it is useful.", ["On the one hand", "In conclusion", "Moreover"], "On the one hand"),
            O("Put the words in order: In conclusion I agree", "In conclusion I agree"),
            C("Which phrase gives an example?", ["For instance", "In conclusion", "Moreover"], "For instance")
          ]
        },
        {
          id: "b2-u2-l2", title: "Concession: however, despite", ar: "Concession: however, despite",
          explanation: "To show contrast: however and nevertheless start a new sentence and are followed by a comma. Although / even though are followed by a full clause (Although it was raining, we went out). Despite and in spite of are followed by a noun or -ing (Despite the rain, Despite being tired). Whereas compares two contrasting facts (He likes tea whereas I like coffee).",
          vocab: V("however|But, on the other hand|It was cheap. However, it broke quickly.", "nevertheless|Even so|It was hard. Nevertheless, we finished.", "although|Even though|Although he was tired, he kept working.",
            "despite|In spite of|Despite the rain, we went out.", "whereas|While, in contrast|I like tea whereas he likes coffee.", "in spite of|Despite|In spite of the cost, she bought it."),
          talk: T("A|Did you enjoy the trip?", "B|Yes, although the weather was bad.|Yes, despite the weather was bad.|Yes, however the weather was bad.",
            "A|Was the hotel good?", "B|It was small. Nevertheless, it was very clean.|It was small. Although, it was very clean.|It was small. Despite, it was very clean.",
            "A|Would you go again?", "B|Yes, despite the high prices.|Yes, although the high prices.|Yes, whereas the high prices.",
            "Q|What was bad on the trip?|The weather|The food|The service"),
          reading: R("Although Omar studied hard, he failed the first exam. Despite feeling upset, he decided to try again. His sister passed easily, whereas he needed three attempts. Nevertheless, he never gave up.",
            "What happened in the first exam?|Omar failed|Omar passed|Omar missed it", "Who passed easily?|His sister|His brother|His friend", "How many attempts did Omar need?|Three|Two|Five"),
          exercises: [
            C("___ it was raining, we went out.", ["Although", "Despite", "However"], "Although"),
            C("___ the rain, we went out.", ["Despite", "Although", "Whereas"], "Despite"),
            L("Although he was tired he kept working", ["Despite he was tired he kept working", "Although he tired he kept working"]),
            C("I love summer ___ my brother prefers winter.", ["whereas", "despite", "however"], "whereas"),
            O("Put the words in order: Despite being tired we kept working", "Despite being tired we kept working"),
            C("It was expensive. ___, I bought it.", ["Nevertheless", "Although", "Despite"], "Nevertheless")
          ]
        },
        {
          id: "b2-u2-l3", title: "Softening your language", ar: "Softening your language",
          explanation: "To be polite when criticising or refusing, use softening phrases such as I'm afraid, It might be better to, I tend to think, Would you mind, Perhaps we could. Instead of saying: That's wrong. Say: I'm afraid I see it differently.",
          vocab: V("I'm afraid|Unfortunately|I'm afraid I can't come.", "it might be better to|It would be wiser to|It might be better to wait a day.", "would you mind|Do you object to|Would you mind closing the window?",
            "tend to|Often do something|I tend to think it's too risky.", "to be honest|Frankly speaking|To be honest, I'm not sure.", "it seems to me|In my view|It seems to me that the plan is risky."),
          talk: T("A|What do you think of my presentation?", "B|To be honest, it seems a little long.|To be honest, it is wrong and long.|To be honestly, it seem a little long.",
            "A|Really? Which part?", "B|Perhaps we could shorten the introduction.|Perhaps we can to shorten the introduction.|Perhaps we shorten the introduction now.",
            "A|Good idea. Would you mind helping me?", "B|Not at all. I'd be happy to help.|Not at all. I'd to be happy to help.|Not at all. I'm be happy to help.",
            "Q|What does B suggest?|Shortening the introduction|Adding more slides|Changing the title"),
          reading: R("My manager never says 'No' directly. Instead, he says, 'I'm afraid we can't do that right now,' or 'Perhaps we could try next month.' At first I found it confusing. Now I understand that he is being polite, and that the answer is usually no.",
            "How does the manager refuse?|Politely and indirectly|Angrily|By email only", "How did the writer feel at first?|Confused|Angry|Happy", "What does the writer understand now?|The answer is usually no|The manager is rude|The plan is approved"),
          exercises: [
            C("___ I can't come tomorrow.", ["I'm afraid", "Afraid of", "I fear for"], "I'm afraid"),
            C("___ closing the door, please?", ["Would you mind", "Would you like", "Would you must"], "Would you mind"),
            L("Perhaps we could try again next week", ["Perhaps we can tried again next week", "Perhaps we could trying again next week"]),
            C("Which sentence is more polite?", ["I'm afraid I disagree.", "You are wrong.", "No, that's bad."], "I'm afraid I disagree."),
            O("Put the words in order: To be honest I'm not sure", "To be honest I'm not sure"),
            C("It ___ to me that the plan is risky.", ["seems", "looks like", "thinks"], "seems")
          ]
        },
        {
          id: "b2-u2-l4", title: "Formal and informal", ar: "Formal and informal",
          explanation: "Use formal language at work and in emails: longer verbs (purchase instead of buy, assist instead of help), and no contractions (I would like instead of I'd like). Use informal language with friends: contractions and slang (mate, gonna, wanna). Choose based on who you are talking to.",
          vocab: V("purchase|To buy (formal)|We would like to purchase ten laptops.", "assist|To help (formal)|How may I assist you?", "regarding|About|I am writing regarding your order.",
            "enquire|To ask for information (formal)|I would like to enquire about the price.", "mate|A friend (informal)|Thanks, mate!", "gonna|Going to (informal)|I'm gonna call him later."),
          talk: T("A|Hello, I'd like to speak to the manager.", "B|Certainly. How may I assist you?|Sure, mate. What's up?|Certainly. What you want?",
            "A|I'm writing regarding my order. It hasn't arrived.", "B|I apologise for the delay. I will check it now.|Sorry, mate. I'm gonna check it now.|I apologise for the delay. I checking it now.",
            "A|Thank you. When will I hear back?", "B|You will receive an update within two hours.|You gonna get an update in two hours.|You will receiving an update within two hours.",
            "Q|Why is A calling?|His order hasn't arrived|He wants a refund|He wants a new job"),
          reading: R("Last week I wrote two messages. One was to my friend: 'Hey mate, I'm gonna be late, sorry!' The other was to my client: 'Dear Mr Hassan, I am writing to inform you that the meeting will be delayed. I apologise for any inconvenience.' The same idea, but a very different style.",
            "Who was the first message to?|A friend|A client|A teacher", "What does the second message say?|The meeting will be delayed|The client is late|The order arrived", "How are the two messages different?|In style|In topic|In the date"),
          exercises: [
            C("Which word is formal?", ["purchase", "buy", "get"], "purchase"),
            C("Which is informal?", ["mate", "colleague", "assistant"], "mate"),
            L("I would like to enquire about the price", ["I would like to enquiry about the price", "I like to inquire about the prices"]),
            C("I am writing ___ your order.", ["regarding", "about of", "for regard"], "regarding"),
            O("Put the words in order: How may I assist you", "How may I assist you"),
            C("Hey mate, I'm ___ be late.", ["gonna", "going", "will to"], "gonna")
          ]
        },
        {
          id: "b2-u2-l5", title: "Discourse markers", ar: "Discourse markers",
          explanation: "Discourse markers make your speech organised and natural: by the way to change the topic, anyway to return to the main topic or end a discussion, actually to correct or add a surprising fact, speaking of to link to a related topic, as I was saying to return to your point, to sum up to conclude.",
          vocab: V("by the way|A phrase used to add a side point|By the way, did you see Ali?", "anyway|In any case, to return to the topic|Anyway, let's get back to work.", "actually|In fact|Actually, I disagree.",
            "speaking of|About|Speaking of films, have you seen it?", "as I was saying|A way to return to your point|As I was saying, the plan is risky.", "to sum up|In short|To sum up, we need more time."),
          talk: T("A|We should finish the report by Friday.", "B|Agreed. By the way, did you speak to Omar?|Agreed. By the way of, did you speak to Omar?|Agreed. By way, did you speak to Omar?",
            "A|Not yet. Actually, he is on holiday this week.", "B|Oh, I see. Anyway, let's finish the report first.|Oh, I see. Anyways of, let's finish the report first.|Oh, I see. Any way, let's finish the report first.",
            "A|Good idea. Let's start now.", "B|Perfect. I'll open the file.|Perfect. I'll opening the file.|Perfect. I open the file by.",
            "Q|When should they finish the report?|By Friday|By Monday|By tomorrow"),
          reading: R("In meetings, I try to stay organised. First I say my main point. Then, if someone interrupts, I say 'As I was saying' and continue. By the way, I always finish with 'To sum up' so everyone remembers the key idea.",
            "What does the writer say after an interruption?|As I was saying|Anyway, goodbye|Actually, no", "How does the writer finish?|With 'To sum up'|With a joke|With a question", "Why finish like this?|So everyone remembers the key idea|To end quickly|To be polite"),
          exercises: [
            C("___, did you finish the report?", ["By the way", "To sum up", "As I was saying"], "By the way"),
            C("We talked for hours. ___, let's start the work.", ["Anyway", "Speaking of", "Actually"], "Anyway"),
            L("Speaking of films have you seen it", ["Speaking about films have you seen it", "Speaking of film has you seen it"]),
            C("I thought it was cheap. ___, it was expensive.", ["Actually", "By the way", "Speaking of"], "Actually"),
            O("Put the words in order: As I was saying the plan is risky", "As I was saying the plan is risky"),
            C("Which phrase changes the topic?", ["By the way", "To sum up", "As I was saying"], "By the way")
          ]
        }
      ]
    },
    {
      id: "b2-u3", title: "News and media", goals: ["work"], goal: "Understand the news and summarise it in your own words",
      lessons: [
        {
          id: "b2-u3-l1", title: "Understanding headlines", ar: "Understanding headlines",
          explanation: "Headlines are short: they drop linking words, use the present for the past (PM quits means the prime minister resigned), use to for the future (Minister to resign), and use short strong words (soar, plunge, slam, bid). You need to turn a headline into a full sentence.",
          vocab: V("headline|The title of a news story|The headline caught my eye.", "soar|To rise sharply|Prices soar in the summer.", "plunge|To fall sharply|Shares plunge after the news.",
            "slam|To criticise strongly|Critics slam the new law.", "bid|An attempt to achieve something|A bid to save the old theatre.", "hit the headlines|To become big news|The story hit the headlines."),
          talk: T("A|Did you see this headline? 'Prices soar again'.", "B|Yes, it means prices rose very quickly.|Yes, it means prices will fall slowly.|Yes, it means prices stayed the same.",
            "A|And 'Minister to resign'?", "B|That means the minister will leave his job.|That means the minister left his job last year.|That means the minister got a new job.",
            "A|Why are headlines so short?", "B|They save space and grab attention.|They are always written by children.|They contain every detail.",
            "Q|What does 'soar' mean?|Rise very quickly|Fall slowly|Stay stable"),
          reading: R("Newspaper editors use short, strong words in headlines. 'Shares plunge' means share prices fell sharply. 'Critics slam film' means critics strongly criticised it. Readers must often guess the full meaning from only a few words.",
            "What does 'Shares plunge' mean?|Prices fell sharply|Prices rose|Prices stayed", "Who uses short words?|Newspaper editors|Teachers|Doctors", "What must readers do?|Guess the full meaning|Read slowly|Skip headlines"),
          exercises: [
            C("'Prices soar' means prices ___.", ["rise sharply", "fall slowly", "stay low"], "rise sharply"),
            C("'Shares plunge' means shares ___.", ["fall sharply", "rise", "stay stable"], "fall sharply"),
            L("Critics slam the new law", ["Critics slammed the new laws", "Critic slam the new law"]),
            C("'Minister to resign' talks about the ___.", ["future", "past", "present perfect"], "future"),
            O("Put the words in order: The headline caught my eye", "The headline caught my eye"),
            C("'A bid to save the theatre' means an ___ to save it.", ["attempt", "order", "offer"], "attempt")
          ]
        },
        {
          id: "b2-u3-l2", title: "Summarising a story", ar: "Summarising a story",
          explanation: "To summarise: read the story and identify who, what, when, where, and why. Write the main points in your own words instead of copying. Useful phrases: The article is about..., The main point is..., and leave out small details.",
          vocab: V("summarise|To give the main points briefly|Can you summarise the story?", "main point|The most important idea|The main point is safety.", "briefly|In a few words|Briefly, the company lost money.",
            "key detail|An important fact|The date is a key detail.", "overall|In general|Overall, the news was positive.", "in your own words|Using your own language|Explain it in your own words."),
          talk: T("A|Can you summarise the article for me?", "B|Sure. It's about a new metro line opening in Cairo.|Sure. It about a new metro line open in Cairo.|Sure. It's about a new metro line opened in Cairo.",
            "A|What is the main point?", "B|The main point is that journeys will be much shorter.|The main point is that journeys will be much more long.|The main point that is journeys will shorter.",
            "A|Thanks. Overall, is it good news?", "B|Yes, overall it's very positive for commuters.|Yes, overall it positive for commuters.|Yes, overall it's very positively for commuters.",
            "Q|What is the article about?|A new metro line|A new airport|A new bridge"),
          reading: R("A small café in town became famous after a video of its owner went viral. Within a week, hundreds of customers came. The owner said he was surprised but happy. Overall, the story shows how social media can change a small business quickly.",
            "What made the café famous?|A viral video|A prize|A new menu", "How did the owner feel?|Surprised but happy|Angry|Worried", "What does the story show?|Social media can change a business quickly|Cafés are cheap|Videos are boring"),
          exercises: [
            C("Which phrase starts a summary?", ["The article is about", "By the way", "Whereas"], "The article is about"),
            C("A summary should include the ___.", ["main points", "every detail", "your opinion only"], "main points"),
            L("Briefly the company lost a lot of money", ["Briefly the company loses a lot of money", "Brief the company lost a lot of money"]),
            C("___, the news was positive.", ["Overall", "Despite", "Whereas"], "Overall"),
            O("Put the words in order: Summarise the story in your own words", "Summarise the story in your own words"),
            C("The date is a ___ detail.", ["key", "keys", "keyed"], "key")
          ]
        },
        {
          id: "b2-u3-l3", title: "Fact and opinion", ar: "Fact and opinion",
          explanation: "A fact can be proven with evidence: The city has two million people. An opinion is a personal view: It is the best city. Words that signal opinion: I think, in my view, best, worst, should. To check a claim, look for evidence, statistics, and a reliable source, and be careful with biased articles.",
          vocab: V("claim|To state something as true|He claims the product is safe.", "evidence|Facts that support an idea|There is no evidence of this.", "biased|Unfairly favouring one side|The article seems biased.",
            "according to|As stated by|According to the report, sales rose.", "statistics|Numbers collected to show a pattern|The statistics show a rise.", "reliable|Trustworthy|This website is reliable."),
          talk: T("A|This article says coffee is the healthiest drink.", "B|That's an opinion. Where is the evidence?|That's a fact. Where is the evidence?|That's an opinion. Where evidence is?",
            "A|It says, according to one survey, 60% of people agree.", "B|That's a statistic, but one survey isn't enough.|That's a opinion, but one survey isn't enough.|That's a statistic, but one survey aren't enough.",
            "A|So should I trust it?", "B|Check whether the source is reliable first.|Check whether the source reliable is first.|Check whether the source is reliably first.",
            "Q|What does B ask for?|Evidence|A summary|A photo"),
          reading: R("A website claims that a new phone is the best ever made. It gives no evidence, only opinions like 'amazing' and 'perfect'. Another site, which is more reliable, shows test results and statistics. According to those tests, the phone is good, but not the best.",
            "What does the first website give?|Only opinions|Test results|Prices", "Which site is more reliable?|The one with test results|The first one|Neither", "What do the tests show?|The phone is good but not the best|It is the worst|It is the best"),
          exercises: [
            C("'It is the best city' is a(n) ___.", ["opinion", "fact", "statistic"], "opinion"),
            C("'The city has two million people' is a ___.", ["fact", "opinion", "feeling"], "fact"),
            L("According to the report sales rose", ["According the report sales rose", "According to the reports sale rose"]),
            C("A ___ article shows only one side.", ["biased", "reliable", "factual"], "biased"),
            O("Put the words in order: What is the evidence", "What is the evidence"),
            C("Numbers that show a trend are ___.", ["statistics", "opinions", "headlines"], "statistics")
          ]
        },
        {
          id: "b2-u3-l4", title: "Reporting verbs", ar: "Reporting verbs",
          explanation: "Reporting verbs describe what someone said: admit + -ing (He admitted breaking it), deny + -ing, suggest + -ing (She suggested going), warn + someone + not to (He warned us not to go), insist on + -ing or that, promise + to. Notice that the tense moves one step back in reported speech.",
          vocab: V("admit|To accept that something is true|He admitted making a mistake.", "deny|To say something is not true|She denied taking the money.", "warn|To tell someone about a danger|They warned us about the storm.",
            "suggest|To propose an idea|I suggest leaving early.", "insist|To demand something firmly|He insisted on paying.", "announce|To make something public|The company announced new prices."),
          talk: T("A|Did Ali break the window?", "B|He admitted breaking it, but he apologised.|He admitted to broke it, but he apologised.|He admitted break it, but he apologised.",
            "A|And his brother?", "B|He denied being there at all.|He denied to be there at all.|He denied was there at all.",
            "A|What did their father say?", "B|He warned them not to play near the house.|He warned them to not played near the house.|He warned that them not play near the house.",
            "Q|What did Ali do?|Admitted breaking the window|Denied everything|Fixed the window"),
          reading: R("The mayor announced a new plan to reduce traffic. He suggested building more bus lanes. Some drivers warned that the plan would cause delays, but the mayor insisted that it would work. A few weeks later, he admitted that the first results were mixed.",
            "What did the mayor suggest?|Building more bus lanes|Closing roads|Raising taxes", "What did drivers warn about?|Delays|Higher prices|Accidents", "What did the mayor admit later?|The results were mixed|The plan failed completely|He made no plan"),
          exercises: [
            C("He ___ stealing the bike.", ["denied", "announced to", "suggested to"], "denied"),
            C("She suggested ___ early.", ["leaving", "to leave to", "leave"], "leaving"),
            L("He admitted making a mistake", ["He admitted make a mistake", "He admit making a mistakes"]),
            C("They ___ us not to swim there.", ["warned", "suggested", "admitted"], "warned"),
            O("Put the words in order: He insisted on paying", "He insisted on paying"),
            C("The company ___ new prices yesterday.", ["announced", "admitted", "denied"], "announced")
          ]
        },
        {
          id: "b2-u3-l5", title: "News idioms", ar: "News idioms",
          explanation: "Common expressions in the news: break the news (to tell someone bad news), in the spotlight (receiving a lot of attention), go viral (spread very quickly online), make headlines (become big news), behind closed doors (in private), the tip of the iceberg (a small visible part of a much larger problem).",
          vocab: V("break the news|To tell someone something important or sad|Who will break the news to him?", "in the spotlight|Receiving a lot of public attention|The singer is in the spotlight.", "go viral|To spread very quickly online|The video went viral.",
            "make headlines|To become big news|The story made headlines.", "behind closed doors|In private, away from the public|They met behind closed doors.", "tip of the iceberg|A small visible part of a much bigger problem|This problem is the tip of the iceberg."),
          talk: T("A|Have you seen the video of the dancing teacher?", "B|Yes, it went viral in just two days.|Yes, it went viral since two days.|Yes, it goes viral in just two days ago.",
            "A|Now she is in the spotlight.", "B|True. She even made headlines on TV.|True. She even make headlines on TV.|True. She even made headline on TV.",
            "A|Do you think this is the tip of the iceberg?", "B|Maybe. There may be more good news soon.|Maybe. There maybe more good news soon.|Maybe. There may been more good news soon.",
            "Q|What happened to the video?|It went viral|It was deleted|It was banned"),
          reading: R("When the company lost its biggest client, nobody wanted to break the news to the boss. The decision had been made behind closed doors, and the story soon made headlines. Experts said the problem was only the tip of the iceberg.",
            "What did nobody want to do?|Break the news to the boss|Meet the client|Leave the company", "Where was the decision made?|Behind closed doors|In public|On TV", "What did experts say?|It was the tip of the iceberg|It was nothing|It was solved"),
          exercises: [
            C("The video ___ viral last week.", ["went", "made", "broke"], "went"),
            C("Who will ___ the news to her?", ["break", "make", "hit"], "break"),
            L("The story made headlines in every newspaper", ["The story make headlines in every newspaper", "The story made headline in every newspapers"]),
            C("They met ___ closed doors.", ["behind", "under", "beside"], "behind"),
            O("Put the words in order: This is the tip of the iceberg", "This is the tip of the iceberg"),
            C("The singer is always in the ___.", ["spotlight", "headline", "iceberg"], "spotlight")
          ]
        }
      ]
    },
    {
      id: "b2-u4", title: "Professional work", goals: ["work"], goal: "Lead a meeting, present an idea, and negotiate",
      lessons: [
        {
          id: "b2-u4-l1", title: "Giving a presentation", ar: "Giving a presentation",
          explanation: "A good presentation: start with a welcome and the topic (Today I'd like to talk about...), outline the plan (I'll start with... then... finally), move between parts (Let's turn to...), and close with a summary and an invitation for questions (Any questions?).",
          vocab: V("agenda|A list of topics to discuss|Here is today's agenda.", "slide|One page of a presentation|Let's look at the next slide.", "audience|The people listening to a talk|The audience asked many questions.",
            "outline|To give the main points|I'll outline the main steps.", "turn to|To move on to|Let's turn to the results.", "wrap up|To finish|Let me wrap up with three points."),
          talk: T("A|Good morning everyone. Today I'd like to talk about our new app.", "B|Great. Could you outline the agenda first?|Great. Could you outlining the agenda first?|Great. Could you outline agenda the first?",
            "A|Of course. First, features, then costs, and finally the timeline.", "B|Sounds clear. Will you share the slides afterwards?|Sounds clear. Will you sharing the slides afterwards?|Sounds clear. Will you share the slide afterwards?",
            "A|Yes, I'll send them to everyone. Let's turn to the features.", "B|Excellent. We're ready to listen.|Excellent. We're ready for listening to.|Excellent. We ready to listen.",
            "Q|What is the last item on the agenda?|The timeline|The features|The costs"),
          reading: R("Before every presentation, Laila checks her slides and practises out loud. She starts by welcoming the audience and outlining the agenda. During the talk, she turns to each point clearly. At the end she wraps up with three key ideas and asks, 'Any questions?'",
            "What does Laila do before presenting?|Practises out loud|Cancels slides|Reads emails", "How does she begin?|By welcoming the audience|By asking questions|By showing prices", "How many key ideas does she finish with?|Three|Two|Five"),
          exercises: [
            C("Today I'd like to ___ about our plan.", ["talk", "say", "speak to"], "talk"),
            C("Let's ___ to the next point.", ["turn", "turned", "turning"], "turn"),
            L("Let me outline the main steps", ["Let me outlined the main step", "Let me outline the main stepping"]),
            C("The ___ asked three questions.", ["audience", "agenda", "slide"], "audience"),
            O("Put the words in order: Let me wrap up with three points", "Let me wrap up with three points"),
            C("The ___ shows what we will discuss.", ["agenda", "audience", "slide"], "agenda")
          ]
        },
        {
          id: "b2-u4-l2", title: "In a meeting", ar: "In a meeting",
          explanation: "In a meeting, the chair says Let's get started and Moving on to..., and a participant says Can I raise a point? or I'd like to propose... At the end, someone records the minutes (the written notes), and action items are agreed: who will do what.",
          vocab: V("chair a meeting|To lead a meeting|Sara will chair a meeting today.", "minutes|The written record of a meeting|Omar will take the minutes.", "propose|To suggest a plan for others to consider|I'd like to propose a new schedule.",
            "raise a point|To mention an issue in a meeting|Can I raise a point, please?", "action item|A task agreed in a meeting|Each action item has an owner.", "adjourn|To end a meeting temporarily|Let's adjourn until Monday."),
          talk: T("A|Let's get started. Today we need to decide on the new schedule.", "B|Can I raise a point before we begin?|Can I raising a point before we begin?|Can I raise point before we begin?",
            "A|Of course. Go ahead.", "B|I'd like to propose starting at nine instead of eight.|I'd like to proposing starting at nine instead of eight.|I like propose to start at nine instead of eight.",
            "A|Interesting. Let's vote. Who agrees?", "B|I agree. Omar can take the minutes.|I agree. Omar can taking the minutes.|I agreed. Omar can take the minute.",
            "Q|What does B propose?|Starting at nine|Starting at eight|Finishing earlier"),
          reading: R("Our weekly meeting was long and unfocused until Hana started to chair it. She sends the agenda in advance, keeps to the time, and asks someone to take the minutes. At the end she lists each action item and its owner. Now our meetings finish in thirty minutes.",
            "What did Hana change?|She chairs the meeting with a plan|She cancelled meetings|She works alone", "What does she list at the end?|Action items and owners|Jokes|Prices", "How long are meetings now?|Thirty minutes|Two hours|One day"),
          exercises: [
            C("Who will ___ the meeting?", ["chair", "chairing", "chaired"], "chair"),
            C("Can I ___ a point?", ["raise", "rise", "arise"], "raise"),
            L("I would like to propose a new schedule", ["I would like to proposing a new schedule", "I would like propose a new schedules"]),
            C("Someone must take the ___.", ["minutes", "hours", "seconds"], "minutes"),
            O("Put the words in order: Can I raise a point", "Can I raise a point"),
            C("Let's ___ until Monday.", ["adjourn", "propose", "chair"], "adjourn")
          ]
        },
        {
          id: "b2-u4-l3", title: "Negotiating", ar: "Negotiating",
          explanation: "In a negotiation: start with an offer (We can offer...), ask for a concession (Could you lower the price?), make a counteroffer (We could do that if...), reach a compromise (Let's meet in the middle), and close the deal (We have a deal). Use if + present, will for a clear condition.",
          vocab: V("offer|A proposal to give or do something|We offer a ten percent discount.", "counteroffer|A new offer in reply to an offer|They made a counteroffer.", "compromise|An agreement where each side gives something|We reached a compromise.",
            "deal|An agreement between people or companies|Great, we have a deal!", "terms|The conditions of an agreement|Let's discuss the terms.", "meet in the middle|To agree on something between both positions|Let's meet in the middle."),
          talk: T("A|We can offer you ten thousand pounds for the project.", "B|That's a little low. Could you increase it?|That's a little low. Could you increasing it?|That's a little lower. Could you increase it?",
            "A|We could go to eleven if you finish in June.", "B|If we finish in June, we will need extra staff.|If we will finish in June, we need extra staff.|If we finished in June, we will to need extra staff.",
            "A|Then let's meet in the middle at eleven and a half.", "B|That sounds fair. We have a deal.|That sounds fairly. We having a deal.|That sound fair. We have deal.",
            "Q|What price do they agree on?|Eleven and a half thousand|Ten thousand|Eleven thousand"),
          reading: R("Negotiating is not about winning every point. A good negotiator listens first, then makes a clear offer. If the other side makes a counteroffer, she looks for a compromise. The best deals are the ones where both sides are happy with the terms.",
            "What does a good negotiator do first?|Listens|Makes a final demand|Leaves", "What happens after a counteroffer?|She looks for a compromise|She ends the talks|She raises the price", "What are the best deals?|Both sides are happy|Only one side wins|The cheapest"),
          exercises: [
            C("They made a ___ to our first offer.", ["counteroffer", "terms", "minutes"], "counteroffer"),
            C("Let's ___ in the middle.", ["meet", "find", "stay"], "meet"),
            L("We reached a compromise at last", ["We reach a compromise at last", "We reached a compromises at last"]),
            C("If you lower the price, we ___ the deal.", ["will accept", "would accepted", "accepted"], "will accept"),
            O("Put the words in order: We have a deal", "We have a deal"),
            C("Both sides discussed the ___ of the contract.", ["terms", "agenda", "slides"], "terms")
          ]
        },
        {
          id: "b2-u4-l4", title: "Formal emails", ar: "Formal emails",
          explanation: "A formal email: Dear Mr / Ms + name (or Dear Sir or Madam), I am writing to + verb for the purpose, Please find attached for attachments, I would be grateful if you could for a request, I look forward to hearing from you. End with Yours sincerely (if you know the name) or Yours faithfully (if you do not).",
          vocab: V("I am writing to|I am contacting you in order to|I am writing to ask about the job.", "attached|Included with this email|Please find my CV attached.", "I would be grateful if|A polite way to make a request|I would be grateful if you could reply.",
            "look forward to|To expect with pleasure|I look forward to hearing from you.", "yours faithfully|A sign-off when you do not know the name|Dear Sir or Madam... Yours faithfully.", "yours sincerely|A sign-off when you know the name|Dear Mr Hassan... Yours sincerely."),
          talk: T("A|I need to email the hotel about my booking. How should I start?", "B|Start with 'Dear Sir or Madam,' if you don't know the name.|Start with 'Hi guys,' if you don't know the name.|Start with 'Dear Sir or Madam' if you don't knowing the name.",
            "A|And how do I explain why I'm writing?", "B|Say, 'I am writing to change my booking.'|Say, 'I am write to change my booking.'|Say, 'I writing for change my booking.'",
            "A|And the ending?", "B|Use 'Yours faithfully' with that opening.|Use 'Yours sincerely' with that opening.|Use 'See you' with that opening.",
            "Q|Which ending suits 'Dear Sir or Madam'?|Yours faithfully|Yours sincerely|See you soon"),
          reading: R("Dear Ms Adel, I am writing to apply for the position of marketing assistant. Please find my CV attached. I would be grateful if you could confirm that you have received it. I look forward to hearing from you. Yours sincerely, Karim Samir.",
            "What job does Karim apply for?|Marketing assistant|Manager|Designer", "What is attached?|His CV|A photo|A contract", "Why 'Yours sincerely'?|Because he knows her name|Because it is informal|Because it is short"),
          exercises: [
            C("If you don't know the name, end with ___.", ["Yours faithfully", "Yours sincerely", "See you"], "Yours faithfully"),
            C("Please find my CV ___.", ["attached", "attaching", "attach"], "attached"),
            L("I look forward to hearing from you", ["I look forward to hear from you", "I looked forward hearing from you"]),
            C("I ___ to ask about the job.", ["am writing", "write for", "wrote"], "am writing"),
            O("Put the words in order: I would be grateful if you replied", "I would be grateful if you replied"),
            C("Which opening is formal?", ["Dear Mr Hassan,", "Hey Hassan!", "Yo,"], "Dear Mr Hassan,")
          ]
        },
        {
          id: "b2-u4-l5", title: "Writing a CV", ar: "Writing a CV",
          explanation: "A strong CV is short (one or two pages) and includes personal details, an objective or summary, experience in reverse order (newest first), qualifications, skills, and references. Use strong past-tense verbs for achievements (managed, increased, led) and numbers where possible.",
          vocab: V("experience|Time spent doing a job|I have five years of experience.", "qualification|A degree or certificate|A degree is a qualification.", "reference|A person who can recommend you|My manager is my reference.",
            "achievement|Something you accomplished|Her biggest achievement was the award.", "objective|Your career goal|My objective is to join a strong team.", "managed|Was in charge of|I managed a team of five."),
          talk: T("A|I'm updating my CV. What should I put first?", "B|Start with your contact details and a short objective.|Start with your hobbies and a long story.|Start with your salary and a short objective.",
            "A|And what about my experience?", "B|List it from the most recent job, with numbers.|List it from the oldest job, without numbers.|List it from the most boring job, with jokes.",
            "A|Should I add a reference?", "B|Yes, give one person who can recommend you.|Yes, give all your friends to recommend you.|No, a reference is never needed.",
            "Q|What comes first on the CV?|Contact details and objective|Hobbies|Salary"),
          reading: R("Nour's CV was two pages long and full of small details. After advice from a friend, she cut it to one page. She wrote clear achievements, such as 'managed a team of five' and 'increased sales by twenty percent'. Two weeks later, she got three interview offers.",
            "How long was the new CV?|One page|Two pages|Five pages", "What did she add?|Clear achievements with numbers|Photos|Hobbies", "What happened after two weeks?|She got three interview offers|She changed jobs|She lost her CV"),
          exercises: [
            C("I ___ a team of five.", ["managed", "manage to", "managing"], "managed"),
            C("A degree is a ___.", ["qualification", "reference", "objective"], "qualification"),
            L("I have five years of experience", ["I had five year of experience", "I have five years experiences"]),
            C("List jobs from the ___ one first.", ["most recent", "oldest", "longest"], "most recent"),
            O("Put the words in order: My biggest achievement was the award", "My biggest achievement was the award"),
            C("Her ___ is to join a strong team.", ["objective", "reference", "minutes"], "objective")
          ]
        }
      ]
    },
    {
      id: "b2-u5", title: "Living language", goals: ["talk"], goal: "Speak naturally using idioms, phrasal verbs, and the right tone",
      lessons: [
        {
          id: "b2-u5-l1", title: "Phrasal verbs", ar: "Phrasal verbs",
          explanation: "A phrasal verb is a verb plus a particle, and its meaning is often different from the verb alone: give up (to stop trying), carry on (to continue), put off (to delay), figure out (to understand), run out of (to have none left), look into (to investigate). Some can be separated (put it off) and some cannot (look into the problem).",
          vocab: V("give up|To stop trying|Never give up on your dreams.", "carry on|To continue|Please carry on working.", "put off|To delay|Don't put off the meeting again.",
            "figure out|To understand or solve|I can't figure out this problem.", "run out of|To have none left|We ran out of milk.", "look into|To investigate|The police will look into it."),
          talk: T("A|I can't figure out this exercise.", "B|Don't give up. Let's look into it together.|Don't give up it. Let's look it into together.|Don't up give. Let's look into it together.",
            "A|Thanks. I keep putting it off every week.", "B|Then stop putting it off and start now.|Then stop putting off it and start now.|Then stop to putting it off and start now.",
            "A|OK. And if I run out of time?", "B|Then we'll carry on tomorrow.|Then we'll carrying on tomorrow.|Then we'll carry in tomorrow.",
            "Q|What does A keep doing?|Putting the work off|Giving up the course|Looking into the problem"),
          reading: R("I wanted to learn the guitar, but I kept putting it off. When I finally started, I couldn't figure out the chords and nearly gave up. A friend told me to carry on practising every day. A month later, I can play three songs!",
            "What did the writer keep doing?|Putting it off|Practising daily|Selling it", "What couldn't he figure out?|The chords|The songs|The price", "How many songs can he play?|Three|Ten|One"),
          exercises: [
            C("Don't ___ on your dreams.", ["give up", "give out", "give in"], "give up"),
            C("We ___ of coffee this morning.", ["ran out", "run on", "ran off"], "ran out"),
            L("Please carry on with your work", ["Please carried on with your work", "Please carry in with your work"]),
            C("I can't ___ the answer.", ["figure out", "figure in", "figure over"], "figure out"),
            O("Put the words in order: Don't put off the meeting", "Don't put off the meeting"),
            C("The police will ___ the problem.", ["look into", "look on", "look up on"], "look into")
          ]
        },
        {
          id: "b2-u5-l2", title: "Collocations", ar: "Collocations",
          explanation: "Collocations are words that naturally go together. We say make a decision, not do a decision; take a risk, not make a risk; heavy traffic, not strong traffic; strong coffee, not heavy coffee; pay attention, not give attention; catch a cold. Learn them as one unit.",
          vocab: V("make a decision|To choose something|It's time to make a decision.", "take a risk|To do something that might fail|Sometimes you have to take a risk.", "heavy traffic|A large number of cars on the road|We were stuck in heavy traffic.",
            "strong coffee|Coffee with a powerful taste|I need a strong coffee.", "pay attention|To watch or listen carefully|Please pay attention to the instructions.", "catch a cold|To get a mild illness|I caught a cold last week."),
          talk: T("A|Why were you late this morning?", "B|I was stuck in heavy traffic.|I was stuck in strong traffic.|I was stuck in big traffic.",
            "A|You look tired. Do you want some coffee?", "B|Yes, please. A strong coffee would be great.|Yes, please. A heavy coffee would be great.|Yes, please. A hard coffee would be great.",
            "A|You should rest. Don't catch a cold again.", "B|Good idea. I need to make a decision about my schedule.|Good idea. I need to do a decision about my schedule.|Good idea. I need to give a decision about my schedule.",
            "Q|Why was B late?|Heavy traffic|A cold|A strong coffee"),
          reading: R("Starting my own business meant I had to take a risk. Every day I had to make difficult decisions and pay attention to small details. Last winter I caught a cold but kept working with a strong coffee in my hand. Today the business is growing well.",
            "What did starting the business mean?|Taking a risk|Taking a holiday|Finding a partner", "What did the writer drink?|Strong coffee|Tea|Water", "How is the business today?|Growing well|Closed|Very small"),
          exercises: [
            C("We were stuck in ___ traffic.", ["heavy", "strong", "big"], "heavy"),
            C("You have to ___ a decision soon.", ["make", "do", "give"], "make"),
            L("Please pay attention to the instructions", ["Please give attention to the instructions", "Please pay attentions to the instruction"]),
            C("I need a ___ coffee.", ["strong", "heavy", "big"], "strong"),
            O("Put the words in order: Sometimes you have to take a risk", "Sometimes you have to take a risk"),
            C("She ___ a cold last week.", ["caught", "made", "took"], "caught")
          ]
        },
        {
          id: "b2-u5-l3", title: "Common idioms", ar: "Common idioms",
          explanation: "Idioms have meanings that are not literal: break the ice (make people feel comfortable), a piece of cake (very easy), under the weather (slightly ill), once in a blue moon (very rarely), hit the books (study hard), a blessing in disguise (something bad that turns out good).",
          vocab: V("break the ice|To make people feel comfortable|A joke can break the ice.", "a piece of cake|Very easy|The exam was a piece of cake.", "under the weather|Slightly ill|I'm feeling under the weather.",
            "once in a blue moon|Very rarely|We meet once in a blue moon.", "hit the books|To study hard|I need to hit the books tonight.", "a blessing in disguise|Something bad that turns out to be good|Losing that job was a blessing in disguise."),
          talk: T("A|How was your exam?", "B|It was a piece of cake. I studied hard.|It was a cake of piece. I studied hard.|It was a piece of cake. I studying hard.",
            "A|Great! I'm feeling under the weather today.", "B|Oh no. Go home and rest.|Oh no. Go home and breaking the ice.|Oh no. Go home and hit the cake.",
            "A|Thanks. I see you only once in a blue moon.", "B|True. Let's meet more often.|True. Let's meet more blue.|True. Let's meet once in blue.",
            "Q|How was B's exam?|Very easy|Very difficult|Cancelled"),
          reading: R("At the party, I didn't know anyone. A woman told a joke to break the ice, and soon we were chatting. She said she had lost her job last year, but it was a blessing in disguise because she found a better one. We now meet once in a blue moon, but we always have fun.",
            "How did the woman break the ice?|With a joke|With a gift|With a song", "Why was losing the job good?|She found a better one|She got paid|She travelled", "How often do they meet?|Very rarely|Every day|Every week"),
          exercises: [
            C("The test was a piece of ___.", ["cake", "bread", "ice"], "cake"),
            C("A joke can ___ the ice.", ["break", "cut", "melt"], "break"),
            L("I am feeling under the weather", ["I am feeling over the weather", "I felt under the weathers"]),
            C("We see each other once in a ___ moon.", ["blue", "green", "full"], "blue"),
            O("Put the words in order: I need to hit the books tonight", "I need to hit the books tonight"),
            C("'A blessing in disguise' is something bad that has a ___ result.", ["good", "slow", "boring"], "good")
          ]
        },
        {
          id: "b2-u5-l4", title: "Humour and tone", ar: "Humour and tone",
          explanation: "Tone changes meaning: sarcasm says the opposite of what you mean, mockingly (Oh great, another meeting!). Irony is a gap between what is expected and what happens. Dry humour is funny but delivered with a serious face. A pun is wordplay. Banter is light, friendly teasing. Tone and context show what is meant.",
          vocab: V("sarcasm|Saying the opposite of what you mean to mock|His sarcasm hurt her feelings.", "irony|A gap between what is expected and what happens|The irony is that he missed his own party.", "dry humour|Funny comments said with a serious face|She has a dry humour.",
            "pun|A joke using a word with two meanings|That was a terrible pun.", "banter|Light, friendly teasing|They enjoy friendly banter.", "tongue-in-cheek|Meant as a joke|It was a tongue-in-cheek comment."),
          talk: T("A|Oh great, another meeting at eight a.m.!", "B|You sound sarcastic. Do you really mean that?|You sound sarcasm. Do you really mean that?|You sound sarcastic. You really mean that?",
            "A|Of course not. I hate early meetings.", "B|Then say it directly. Humour can confuse people.|Then say it direct. Humour can confusing people.|Then say it directly. Humour can confuse people's.",
            "A|You're right. I was only joking.", "B|Fair enough. A bit of banter is fine.|Fair enough. A bit of banters is fine.|Fair enough. A bit banter fine.",
            "Q|How does A feel about early meetings?|He dislikes them|He loves them|He doesn't care"),
          reading: R("My uncle has a very dry sense of humour. When it rained during our picnic, he said, 'What a lovely day for swimming.' Strangers thought he was serious, but we knew it was sarcasm. He also loves a good pun, so conversations with him are never boring.",
            "What did the uncle say about the rain?|It was a lovely day for swimming|It was a terrible storm|He stayed home", "What was his remark?|Sarcasm|Anger|A question", "What does he love?|Puns|Long speeches|Silence"),
          exercises: [
            C("'Oh great, it's raining again' is ___.", ["sarcasm", "a headline", "a summary"], "sarcasm"),
            C("A joke with a double meaning is a ___.", ["pun", "claim", "deal"], "pun"),
            L("They enjoy friendly banter", ["They enjoy friend banter", "They enjoyed friendly banters"]),
            C("Dry humour is said with a ___ face.", ["serious", "wide", "noisy"], "serious"),
            O("Put the words in order: It was a tongue-in-cheek comment", "It was a tongue-in-cheek comment"),
            C("The ___ is that he forgot his own birthday.", ["irony", "banter", "pun"], "irony")
          ]
        },
        {
          id: "b2-u5-l5", title: "Sounding natural", ar: "Sounding natural",
          explanation: "Natural speech uses contractions (I'm, don't, gonna), filler phrases (you know, I mean, kind of), and short responses (fair enough, no worries). Use come to think of it when you remember something. Do not overuse them, or you will sound exaggerated.",
          vocab: V("you know|A filler to share something known|It's, you know, a bit tricky.", "I mean|A phrase to clarify what you said|I mean, it's not bad.", "kind of|Somewhat|It's kind of expensive.",
            "no worries|It's fine, do not worry|No worries, take your time.", "fair enough|I accept that|Fair enough, I see your point.", "come to think of it|As I remember now|Come to think of it, I saw him yesterday."),
          talk: T("A|Sorry I'm late. The traffic was terrible.", "B|No worries. We've only just started.|No worry. We've only just start.|No worries. We only just started of.",
            "A|It's kind of annoying. I leave early every day.", "B|I mean, can't you take the metro instead?|I mean, can't you taking the metro instead?|I mean, you can't take metro instead?",
            "A|Come to think of it, that's a great idea.", "B|Fair enough. Try it tomorrow.|Fair enough. Try it tomorrows.|Fair enoughly. Try it tomorrow.",
            "Q|What does B suggest?|Taking the metro|Leaving earlier|Working from home"),
          reading: R("When I moved abroad, my English was correct but sounded stiff. A friend told me to use words like 'you know', 'I mean' and 'kind of' and to answer with 'fair enough' or 'no worries'. After a few weeks, people said I sounded much more natural.",
            "What was the problem?|His English sounded stiff|He didn't speak English|He spoke too fast", "What did the friend suggest?|Using everyday phrases|Speaking slower|Using only formal words", "What did people say later?|He sounded more natural|He was rude|He was too loud"),
          exercises: [
            C("No ___, take your time.", ["worries", "worry", "worried"], "worries"),
            C("It's ___ of expensive.", ["kind", "kinds", "kinded"], "kind"),
            L("Come to think of it I saw him yesterday", ["Come to think it I saw him yesterday", "Came to think of it I see him yesterday"]),
            C("A: 'I think we should leave.' B: '___, it's late.'", ["Fair enough", "Come to think by", "Kind of for"], "Fair enough"),
            O("Put the words in order: I mean it's not bad", "I mean it's not bad"),
            C("Which sounds more natural?", ["I'm gonna call him.", "I am going to call him formally.", "I shall call him."], "I'm gonna call him.")
          ]
        }
      ]
    }
  ]
});
