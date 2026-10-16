// Level B1 (intermediate): 5 units x 5 lessons.
window.COURSES = window.COURSES || [];
window.COURSES.push({
  level: "B1",
  about: "Connect your ideas, explain your reasons, and handle work, travel, and unexpected situations.",
  units: [
    {
      id: "b1-u1", title: "Past and experience", goals: ["talk"], goal: "Talk about your experience and about things that started in the past and still continue",
      lessons: [
        {
          id: "b1-u1-l1", title: "Present perfect", ar: "Present perfect",
          explanation: "Present perfect: have / has + past participle. We use it for experiences with no time mentioned (I have visited Rome), and for something that happened with a result now (I have lost my keys). Do not use it with a finished time like yesterday. Common words with it: ever, never, just, already, yet.",
          vocab: V("have you ever|Used to ask about any time in your life|Have you ever been to Italy?", "just finished|Finished a moment ago|I have just finished my work.", "so far|Until now|I have read three books so far.",
            "lost my keys|Cannot find your keys now|I have lost my keys again.", "first time|The earliest time you do something|It's the first time I have flown.", "many times|A large number of times|I have seen this film many times."),
          talk: T("A|Have you ever been to Italy?", "B|Yes, I have visited Rome twice.|Yes, I has visited Rome twice.|Yes, I have visit Rome two times ago.",
            "A|Did you like it?", "B|I loved it. I have never eaten better pizza.|I loved it. I have never ate better pizza.|I loved it. I haven't never eaten better pizza.",
            "A|Have you booked another trip?", "B|Not yet. I haven't decided where to go.|Not yet. I hasn't decided where to go.|Not yet. I don't decided where to go.",
            "Q|How many times has B visited Rome?|Twice|Once|Three times"),
          reading: R("Tarek has worked as a driver for six years. He has already visited ten cities for work, but he has never travelled abroad. He has just got his passport, and this summer he is going to visit Turkey.",
            "How long has Tarek been a driver?|Six years|Two years|Ten years", "What has he never done?|Travelled abroad|Driven a bus|Visited a city", "What has he just got?|His passport|A new job|A car"),
          exercises: [
            C("I ___ to London twice.", ["have been", "was been", "am being"], "have been"),
            C("She ___ her homework yet.", ["hasn't finished", "didn't finished", "hasn't finish"], "hasn't finished"),
            L("I have just finished my work", ["I just finishing my work", "I have just finish my work"]),
            C("Have you ___ eaten sushi?", ["ever", "yesterday", "ago"], "ever"),
            O("Put the words in order: I haven't finished the work yet", "I haven't finished the work yet"),
            C("He has ___ left the office.", ["just", "last week", "ago"], "just")
          ]
        },
        {
          id: "b1-u1-l2", title: "Since and for", ar: "Since and for",
          explanation: "We use for with a length of time (for two years, for a week), and since with a starting point (since 2020, since Monday). The question is: How long have you...? and the tense is usually the present perfect.",
          vocab: V("for years|For a long period|I have lived here for years.", "since last year|From last year until now|She has worked here since last year.", "how long|The length of time|How long have you studied English?",
            "all my life|Throughout my whole life|I have lived here all my life.", "for ages|For a very long time|I haven't seen him for ages.", "ever since|From that time until now|I have loved music ever since."),
          talk: T("A|How long have you lived in this city?", "B|I have lived here for ten years.|I live here for ten years.|I have lived here since ten years.",
            "A|And how long have you worked at the bank?", "B|I have worked there since 2019.|I have worked there for 2019.|I work there since 2019.",
            "A|That's a long time!", "B|Yes, I haven't changed jobs for ages.|Yes, I didn't change jobs since ages.|Yes, I haven't changed jobs from ages.",
            "Q|When did B start at the bank?|In 2019|In 2010|Ten years ago"),
          reading: R("Mona has studied English for three years. She started in September 2023 and she has attended classes every weekend since then. She hasn't missed a single lesson for ages. Now she has a good job because of her English.",
            "How long has Mona studied English?|For three years|For one year|Since 2020", "When does she attend classes?|Every weekend|Every night|Every morning", "Why does she have a good job?|Because of her English|Because of her car|Because of luck"),
          exercises: [
            C("I have lived here ___ 2018.", ["since", "for", "ago"], "since"),
            C("She has worked here ___ five years.", ["for", "since", "from"], "for"),
            L("I haven't seen him for ages", ["I haven't see him for ages", "I didn't seen him since ages"]),
            C("___ have you studied English?", ["How long", "How much long", "When long"], "How long"),
            O("Put the words in order: I have lived here all my life", "I have lived here all my life"),
            C("He has been ill ___ Monday.", ["since", "for", "during"], "since")
          ]
        },
        {
          id: "b1-u1-l3", title: "Been and gone", ar: "Been and gone",
          explanation: "has been to means went and came back (the visit is finished): She has been to Spain. has gone to means went and is still there or on the way: He has gone to Spain (he is not here now). We use been with ever and never.",
          vocab: V("has been to|Went somewhere and came back|She has been to Spain.", "has gone to|Went somewhere and is not back yet|He has gone to Spain.", "away on business|Travelling for work|My boss is away on business.",
            "back soon|Returning in a short time|She will be back soon.", "out of the office|Not in the office right now|He is out of the office.", "never been|Has not been somewhere at any time|I have never been to Japan."),
          talk: T("A|Is Sara in the office?", "B|No, she has gone to a meeting. She'll be back at three.|No, she has been to a meeting. She'll be back at three.|No, she is gone to a meeting. She'll be back at three.",
            "A|Has she ever been to Dubai?", "B|Yes, she has been there three times.|Yes, she has gone there three times.|Yes, she is been there three times.",
            "A|Wow! And you?", "B|I have never been abroad.|I have never be abroad.|I have never went abroad.",
            "Q|Where is Sara now?|At a meeting|In Dubai|At home"),
          reading: R("My brother has gone to Canada for a year, so he isn't home now. He has been there since August. My sister has been to Canada twice, so she gave him advice. My parents have never been abroad, but they are planning to visit him next summer.",
            "Where is the brother now?|In Canada|At home|In Dubai", "Who gave advice?|The sister|The parents|A friend", "What are the parents planning?|To visit him|To move|To sell the house"),
          exercises: [
            C("Ali isn't here. He has ___ to the bank.", ["gone", "been", "went"], "gone"),
            C("I have ___ to Paris twice. It's lovely.", ["been", "gone", "going"], "been"),
            L("She has been to Spain twice", ["She has gone to Spain twice ago", "She has be to Spain twice"]),
            C("Where's Omar? He has ___ out.", ["gone", "been going", "went"], "gone"),
            O("Put the words in order: He has gone to America", "He has gone to America"),
            C("Have you ever ___ to Egypt?", ["been", "gone to", "went"], "been")
          ]
        },
        {
          id: "b1-u1-l4", title: "Used to", ar: "Used to",
          explanation: "used to + base verb describes a habit or state from the past that no longer exists: I used to play football. Negative: didn't use to. Question: Did you use to...? Note: there is no d on use after did.",
          vocab: V("used to|Did regularly in the past|I used to live in Alexandria.", "didn't use to|Did not do regularly in the past|I didn't use to like coffee.", "these days|Nowadays|These days I work from home.",
            "back then|At that time in the past|Back then, we had no phones.", "grow up|To change from a child into an adult|I grew up in a small village.", "change a lot|To become very different|The city has changed a lot."),
          talk: T("A|Did you use to play football?", "B|Yes, I used to play every Friday.|Yes, I use to play every Friday.|Yes, I used play every Friday.",
            "A|Do you still play?", "B|No, these days I only watch matches.|No, these days I only watching matches.|No, this days I only watch matches.",
            "A|What else did you use to do?", "B|I used to swim, but I didn't use to enjoy it.|I used to swim, but I didn't used to enjoy it.|I use to swim, but I didn't use to enjoying it.",
            "Q|When did B use to play?|Every Friday|Every Sunday|Every day"),
          reading: R("I grew up in a small village. Back then, we didn't use to have a TV, so we used to play outside all day. These days, children spend hours on their phones. Life has changed a lot, but I still miss those days.",
            "Where did the writer grow up?|In a small village|In a big city|Abroad", "What did they use to do?|Play outside all day|Watch TV|Study", "How do children spend time these days?|On their phones|Outside|Reading"),
          exercises: [
            C("I ___ to live in Alexandria.", ["used", "use", "was use"], "used"),
            C("She didn't ___ to like tea.", ["use", "used", "using"], "use"),
            L("We used to play outside", ["We use to played outside", "We used play outside"]),
            C("___ I work from home.", ["These days", "Back then", "Used to"], "These days"),
            O("Put the words in order: I used to live in a small village", "I used to live in a small village"),
            C("Did you ___ to have a car?", ["use", "used", "using"], "use")
          ]
        },
        {
          id: "b1-u1-l5", title: "Past continuous", ar: "Past continuous",
          explanation: "Past continuous: was / were + verb-ing. We use it for something that was in progress at a certain time in the past (I was cooking at eight), or when something interrupted another action (I was walking when it started to rain). Use while with the continuous, and when with a short action.",
          vocab: V("was raining|Was falling from the sky at that time|It was raining when I left.", "while|During the time that|I was cooking while he was studying.", "at that moment|At this exact time|At that moment, the phone rang.",
            "all of a sudden|Unexpectedly|All of a sudden, the lights went out.", "meanwhile|During the same time|Meanwhile, she was waiting outside.", "was waiting|Stayed somewhere until something happened|I was waiting for the bus."),
          talk: T("A|What were you doing at eight last night?", "B|I was cooking dinner.|I was cook dinner.|I were cooking dinner.",
            "A|Were you alone?", "B|No, my sister was helping me.|No, my sister were helping me.|No, my sister was help me.",
            "A|And then what happened?", "B|Suddenly, the lights went out while we were eating.|Suddenly, the lights went out when we were eat.|Suddenly, the lights was going out while we were eating.",
            "Q|What was B doing at eight?|Cooking dinner|Eating|Watching TV"),
          reading: R("Last night I was walking home when it started to rain. I wasn't carrying an umbrella, so I ran into a café. While I was drinking tea, I met an old friend. We were talking for an hour, and then the rain stopped.",
            "What was the writer doing when it rained?|Walking home|Driving|Sleeping", "Where did he go?|Into a café|Into a shop|Home", "Who did he meet?|An old friend|His boss|A neighbour"),
          exercises: [
            C("I ___ TV when you called.", ["was watching", "watched", "am watching"], "was watching"),
            C("They ___ football while it rained.", ["were playing", "was playing", "played to"], "were playing"),
            L("She was waiting for the bus", ["She was wait for the bus", "She were waiting for the bus"]),
            C("___, the phone rang.", ["Suddenly", "While", "Used to"], "Suddenly"),
            O("Put the words in order: I was waiting for the bus", "I was waiting for the bus"),
            C("I was cooking ___ he was studying.", ["while", "because", "so"], "while")
          ]
        }
      ]
    },
    {
      id: "b1-u2", title: "Plans and predictions", goals: ["work", "talk"], goal: "Talk about the future and tell apart a decision, a plan, and a prediction",
      lessons: [
        {
          id: "b1-u2-l1", title: "Will and going to", ar: "Will and going to",
          explanation: "Use will for a decision made at the moment of speaking (The phone is ringing. I'll answer it) and for promises. Use going to for a plan made before (I'm going to study medicine) and for a prediction with evidence (Look at those clouds! It's going to rain).",
          vocab: V("on the spot|At that very moment|He decided on the spot.", "be going to|Planning to do something|I'm going to study medicine.", "I'll|Short form of I will|It's hot. I'll open the window.",
            "plan to|To intend to do something|We plan to move next year.", "I've decided|I have made a choice|I've decided to change my job.", "I promise I'll|I give my word that I will|I promise I'll call you."),
          talk: T("A|The phone is ringing.", "B|I'll answer it.|I'm going to answer it.|I answer it.",
            "A|By the way, what are you doing this weekend?", "B|I'm going to visit my grandparents.|I'll going to visit my grandparents.|I will to visit my grandparents.",
            "A|Great. Look at those clouds!", "B|It's going to rain. Let's take umbrellas.|It will rains. Let's take umbrellas.|It's going rain. Let's take umbrellas.",
            "Q|What will B do about the phone?|Answer it|Ignore it|Switch it off"),
          reading: R("Next year I'm going to study medicine. I've already chosen the university and I plan to move to Cairo. I don't know if it will be easy, but I'll work hard. My father said, 'Don't worry, I'll help you with the rent.'",
            "What is the writer going to study?|Medicine|Law|Art", "Where does he plan to move?|To Cairo|To Aswan|Abroad", "What did his father promise?|To help with the rent|To buy a car|To find a job"),
          exercises: [
            C("The phone is ringing! ___", ["I'll get it.", "I'm going to get it.", "I get it."], "I'll get it."),
            C("Look at the sky! It ___ rain.", ["is going to", "will to", "goes to"], "is going to"),
            L("We are going to move next year", ["We will going to move next year", "We are go to move next year"]),
            C("I've decided. I ___ study law.", ["am going to", "will to", "go to"], "am going to"),
            O("Put the words in order: I am going to study medicine", "I am going to study medicine"),
            C("I promise I ___ call you.", ["will", "am going to calling", "would to"], "will")
          ]
        },
        {
          id: "b1-u2-l2", title: "Present continuous for future", ar: "Present continuous for future",
          explanation: "We use the present continuous (am / is / are + -ing) for fixed future arrangements that involve a time or a person: I'm meeting Sara tomorrow at ten. We're flying to Aswan on Friday. The difference from going to is that the arrangement is already fixed.",
          vocab: V("arrangement|A plan agreed with someone|I have an arrangement with him.", "appointment|A meeting set for a time|I have a dentist appointment.", "tomorrow morning|The morning of the next day|I'm flying tomorrow morning.",
            "this evening|Today in the evening|I'm meeting Sara this evening.", "on Friday evening|Friday night|I'm leaving on Friday evening.", "fixed|Decided and not changing|The date is fixed."),
          talk: T("A|What are you doing tomorrow?", "B|I'm meeting a client at ten.|I'm meet a client at ten.|I meeting a client at ten.",
            "A|And in the evening?", "B|I'm having dinner with my cousins.|I having dinner with my cousins.|I'm have dinner with my cousins.",
            "A|Busy day! Are you travelling this weekend?", "B|Yes, we're flying to Aswan on Friday.|Yes, we flying to Aswan on Friday.|Yes, we're fly to Aswan on Friday.",
            "Q|Who is B meeting at ten?|A client|His cousins|A doctor"),
          reading: R("Next week is very busy for Hala. On Sunday she is meeting her new manager. On Tuesday she is taking her car to the garage. On Thursday she is flying to Alexandria for a conference, and she is staying there for two nights.",
            "Who is Hala meeting on Sunday?|Her new manager|A friend|A client", "What is she doing on Tuesday?|Taking her car to the garage|Flying|Visiting a doctor", "How long is she staying in Alexandria?|Two nights|One week|Five days"),
          exercises: [
            C("I ___ the dentist tomorrow at four.", ["am seeing", "see to", "will seeing"], "am seeing"),
            C("We ___ to Aswan on Friday.", ["are flying", "flying", "fly to"], "are flying"),
            L("I am meeting Sara this evening", ["I meeting Sara this evening", "I am meet Sara this evening"]),
            C("What ___ you doing tonight?", ["are", "do", "will"], "are"),
            O("Put the words in order: I am meeting my manager tomorrow", "I am meeting my manager tomorrow"),
            C("She ___ dinner with us on Saturday.", ["is having", "having", "have to"], "is having")
          ]
        },
        {
          id: "b1-u2-l3", title: "First conditional", ar: "First conditional",
          explanation: "The first conditional describes a possible future situation: If + present simple, will + base verb. Example: If it rains, we will stay home. We can also use unless (except if), as long as (provided that), and in case (as a precaution).",
          vocab: V("unless|Except if|I'll go unless it rains.", "as long as|Provided that|You can go as long as you are back by ten.", "in case|As a precaution|Take an umbrella in case it rains.",
            "otherwise|If not|Hurry up, otherwise we'll be late.", "if necessary|If it is needed|I'll stay late if necessary.", "if I can|If it is possible|I'll help if I can."),
          talk: T("A|Are we going to the beach tomorrow?", "B|Yes, if the weather is good.|Yes, if the weather will be good.|Yes, if the weather would be good.",
            "A|What if it rains?", "B|If it rains, we will stay at home.|If it will rain, we stay at home.|If it rains, we would stayed at home.",
            "A|OK. Should I bring anything?", "B|Bring a hat in case it's sunny.|Bring a hat in case it will sunny.|Bring a hat unless it's sunny.",
            "Q|When will they go to the beach?|If the weather is good|If it rains|If it is cold"),
          reading: R("If I pass my driving test next week, my father will give me his old car. I'll drive to work as long as the roads aren't busy. Unless I fail, I'll start next Monday. If I fail, I will practise more and try again.",
            "What will the father give him?|His old car|Money|A phone", "When will he drive to work?|When the roads aren't busy|Every night|Never", "What will he do if he fails?|Practise more and try again|Quit|Buy a car"),
          exercises: [
            C("If it ___ tomorrow, we'll stay home.", ["rains", "will rain", "rained"], "rains"),
            C("If you study, you ___ the exam.", ["will pass", "would passed", "pass to"], "will pass"),
            L("If I have time I will help you", ["If I will have time I help you", "If I had time I will help you"]),
            C("Take a coat ___ it gets cold.", ["in case", "unless of", "even"], "in case"),
            O("Put the words in order: If it rains we will stay home", "If it rains we will stay home"),
            C("I'll come ___ I'm ill.", ["unless", "in case of", "as long"], "unless")
          ]
        },
        {
          id: "b1-u2-l4", title: "Time clauses", ar: "Time clauses: when, as soon as",
          explanation: "After when, as soon as, before, after, and until, we use the present simple even when talking about the future: I'll call you as soon as I arrive (not as soon as I will arrive). The main clause uses will.",
          vocab: V("as soon as|Immediately when|Call me as soon as you arrive.", "until|Up to the time that|Wait here until he comes.", "once|As soon as|Once I finish, I'll call you.",
            "the moment|At the exact time that|I'll tell you the moment I know.", "before long|Soon|We will be there before long.", "afterwards|After that|Afterwards, we'll have lunch."),
          talk: T("A|When will you call me?", "B|I'll call you as soon as I arrive.|I'll call you as soon as I will arrive.|I call you as soon as I'll arrive.",
            "A|And what will you do after that?", "B|I'll have lunch when I get to the hotel.|I'll have lunch when I will get to the hotel.|I have lunch when I'll get to the hotel.",
            "A|Great. Will you wait for me at the station?", "B|Yes, I'll wait until you come.|Yes, I'll wait until you will come.|Yes, I wait until you'll come.",
            "Q|When will B call?|When he arrives|Tomorrow morning|After lunch"),
          reading: R("Tomorrow I'm going to visit my grandmother. I'll leave as soon as I finish work. When I arrive, I'll help her in the garden. We'll have dinner together once the sun goes down, and I'll stay until it gets late.",
            "When will the writer leave?|As soon as he finishes work|At night|In the morning", "What will he do when he arrives?|Help in the garden|Cook lunch|Watch TV", "How long will he stay?|Until it gets late|One week|One hour"),
          exercises: [
            C("I'll call you as soon as I ___.", ["arrive", "will arrive", "arrived"], "arrive"),
            C("We'll wait until he ___.", ["comes", "will come", "came"], "comes"),
            L("I'll tell you the moment I know", ["I'll tell you the moment I will know", "I tell you the moment I'll know"]),
            C("When she ___ home, she'll cook.", ["gets", "will get", "got to"], "gets"),
            O("Put the words in order: I will call you as soon as I arrive", "I will call you as soon as I arrive"),
            C("___ I finish, I'll call you.", ["Once", "Used", "Ago"], "Once")
          ]
        },
        {
          id: "b1-u2-l5", title: "Making predictions", ar: "Making predictions",
          explanation: "For predictions: use will for your opinion (I think it will rain), and going to for a prediction with evidence. Add certainty with definitely (certainly), probably (likely), might (possibly). For the negative: definitely won't, probably won't. The adverb comes after will and before won't.",
          vocab: V("most likely|Probably|It will most likely rain.", "for sure|Certainly|He will win for sure.", "I doubt|I don't think|I doubt it will work.",
            "likely|Probable|It's likely to be cold.", "in the future|At a later time|In the future, cars will drive themselves.", "by 2050|Before the year 2050|Cities will be much bigger by 2050."),
          talk: T("A|Do you think robots will take our jobs?", "B|Some jobs, probably. But new jobs will appear.|Some jobs, probably will. But new jobs appear.|Some jobs, probably. But new jobs will appearing.",
            "A|Will people still go to offices in the future?", "B|I think many people will work from home.|I think many people will to work from home.|I think many people working from home.",
            "A|And cars?", "B|They will definitely be electric by 2050.|They definitely will be electric by 2050 ago.|They will be definitely electric for 2050.",
            "Q|What does B think about jobs?|New jobs will appear|All jobs will disappear|Nothing will change"),
          reading: R("Experts say that by 2050 most cars will be electric. Cities will probably be bigger, and many people will work from home. Some jobs will disappear, but new jobs will definitely appear. I doubt that life will be simpler, but it will be different.",
            "What will cars be like by 2050?|Mostly electric|Flying|Smaller", "What will many people do?|Work from home|Move abroad|Stop working", "What does the writer doubt?|That life will be simpler|That cities will grow|That jobs will appear"),
          exercises: [
            C("It ___ rain tomorrow, I think.", ["will", "going", "is"], "will"),
            C("She will ___ win. She's the best.", ["definitely", "doubt", "likely to"], "definitely"),
            L("I doubt it will work", ["I doubt it works will", "I doubting it will work"]),
            C("It will ___ be cold tonight.", ["probably", "possible", "maybe of"], "probably"),
            O("Put the words in order: Cars will be electric", "Cars will be electric"),
            C("It is ___ to snow in the mountains.", ["likely", "probably", "definitely"], "likely")
          ]
        }
      ]
    },
    {
      id: "b1-u3", title: "Opinions and discussion", goals: ["talk", "work"], goal: "Give your opinion, explain why, and agree or disagree politely",
      lessons: [
        {
          id: "b1-u3-l1", title: "Giving opinions", ar: "Giving opinions",
          explanation: "To give your opinion: I think..., In my opinion..., I believe..., Personally, I..., From my point of view..., As far as I'm concerned.... Then give a reason with because. Opinion is a noun, so we say in my opinion, not on my opinion.",
          vocab: V("in my opinion|This is what I think|In my opinion, the film is too long.", "personally|Speaking for myself|Personally, I prefer the old design.", "from my point of view|Looking at it from my side|From my point of view, it's a good idea.",
            "as far as I'm concerned|In my own view|As far as I'm concerned, it's fine.", "I strongly believe|I am very sure|I strongly believe we should start now.", "I feel that|I have the impression that|I feel that we need more time."),
          talk: T("A|What do you think about working from home?", "B|In my opinion, it saves a lot of time.|On my opinion, it saves a lot of time.|In my opinion, it save a lot of time.",
            "A|Do you think it's good for everyone?", "B|Personally, I believe it depends on the job.|Personal, I believe it depends on the job.|Personally, I believing it depends on the job.",
            "A|Why do you say that?", "B|Because some jobs need teamwork in person.|Because of some jobs need teamwork in person.|Because some jobs needs teamwork in person.",
            "Q|What does B think?|It depends on the job|It is always good|It is always bad"),
          reading: R("Many people ask me if online learning is better than classes. In my opinion, it depends on the student. Personally, I learn better with a teacher because I can ask questions. However, I strongly believe that online lessons are useful for busy people.",
            "What does the writer think?|It depends on the student|Online is always better|Classes are useless", "Why does he prefer a teacher?|He can ask questions|It's cheaper|It's faster", "Who are online lessons useful for?|Busy people|Children only|Teachers"),
          exercises: [
            C("___ my opinion, it's a good plan.", ["In", "On", "At"], "In"),
            C("___, I prefer coffee to tea.", ["Personally", "Personal", "Person"], "Personally"),
            L("I strongly believe we should start now", ["I strong believe we should start now", "I strongly believing we should start now"]),
            C("From my point ___, it's a mistake.", ["of view", "of look", "to view"], "of view"),
            O("Put the words in order: In my opinion the film is long", "In my opinion the film is long"),
            C("I ___ that we need more time.", ["feel", "feeling", "feels"], "feel")
          ]
        },
        {
          id: "b1-u3-l2", title: "Agreeing and disagreeing", ar: "Agreeing and disagreeing",
          explanation: "To agree: I agree, Exactly, I couldn't agree more. To disagree politely: I see what you mean, but..., That's true, but..., I'm not so sure. Avoid saying You're wrong directly. In negatives say I don't agree, not I'm not agree.",
          vocab: V("I couldn't agree more|I completely agree|I couldn't agree more with you.", "exactly|Precisely, that is right|Exactly! That's what I think.", "I see what you mean|I understand your point|I see what you mean, but I disagree.",
            "that's true, but|I accept that, however|That's true, but it's expensive.", "I'm not so sure|I have doubts|I'm not so sure about that.", "up to a point|Partly, but not completely|I agree with you up to a point."),
          talk: T("A|I think the new office is too noisy.", "B|I couldn't agree more. I can't concentrate.|I couldn't agree more. I can't concentrating.|I can't agree more. I can't concentrate.",
            "A|We should ask the manager for a quiet room.", "B|That's true, but he is very busy.|That's true, but he is being very busy.|That true, but he is very busy.",
            "A|Well, I think it's worth trying.", "B|I'm not so sure, but let's ask anyway.|I'm not so sure, but let's asking anyway.|I'm not sure so, but let's ask anyway.",
            "Q|What problem do they have?|The office is noisy|The office is cold|The manager is rude"),
          reading: R("Last week, my friends and I discussed whether children should have phones. Omar said, 'I couldn't agree more, they need them for safety.' Lina said, 'I see what you mean, but they spend too much time on them.' I agreed with both of them up to a point.",
            "What did the friends discuss?|Whether children should have phones|A holiday|A film", "Why does Omar agree?|For safety|For games|For homework", "How did the writer feel?|Agreed with both up to a point|Totally disagreed|Said nothing"),
          exercises: [
            C("A: 'It's a great idea.' B: 'I couldn't ___ more.'", ["agree", "agreed", "agreeing"], "agree"),
            C("I don't ___ with you.", ["agree", "am agree", "agreed"], "agree"),
            L("I see what you mean but I disagree", ["I seeing what you mean but I disagree", "I see what you mean but I am disagree"]),
            C("That's true, ___ it's too expensive.", ["but", "because", "so"], "but"),
            O("Put the words in order: I am not so sure about that", "I am not so sure about that"),
            C("I agree with you ___ to a point.", ["up", "on", "in"], "up")
          ]
        },
        {
          id: "b1-u3-l3", title: "Because, so, although", ar: "Because, so, although",
          explanation: "Because gives a reason (I stayed home because I was ill). So gives a result (I was ill, so I stayed home). Although means even though (Although it was cold, we went out). Also use because of + noun (because of the rain), and that's why for as a result.",
          vocab: V("because of|Caused by|We stayed home because of the rain.", "as a result|Because of that|He didn't study. As a result, he failed.", "therefore|For that reason|It was late. Therefore, we left.",
            "that's why|For that reason|That's why I'm so tired.", "so that|In order that|I left early so that I could catch the train.", "even though|In spite of the fact that|Even though he was tired, he went."),
          talk: T("A|Why were you absent yesterday?", "B|I was ill, so I stayed in bed.|I was ill, because I stayed in bed.|I was ill, although I stayed in bed.",
            "A|Did you go to the doctor?", "B|Yes, because I had a high temperature.|Yes, so I had a high temperature.|Yes, because of I had a high temperature.",
            "A|Are you better now?", "B|Yes, although I still feel a bit weak.|Yes, because I still feel a bit weak.|Yes, so I still feel a bit weak.",
            "Q|Why was B absent?|He was ill|He was late|He was on holiday"),
          reading: R("Last Friday it rained heavily. Because of the rain, the match was cancelled. The players were disappointed, so they decided to play indoors. Although the hall was small, everyone enjoyed it, and that's why we want to play there again.",
            "Why was the match cancelled?|Because of the rain|Because of the referee|Because of a strike", "What did the players do?|Played indoors|Went home|Waited outside", "Why do they want to play there again?|Everyone enjoyed it|It was big|It was free"),
          exercises: [
            C("I was tired ___ I went to bed early.", ["so", "because", "although"], "so"),
            C("We stayed home ___ the rain.", ["because of", "because", "although"], "because of"),
            L("Although it was cold we went out", ["Although it was cold but we went out", "Because it was cold we went out"]),
            C("He was ill, ___ he stayed home.", ["so", "because", "although"], "so"),
            O("Put the words in order: Although he was tired he went to work", "Although he was tired he went to work"),
            C("I left early ___ I could catch the train.", ["so that", "because of", "although"], "so that")
          ]
        },
        {
          id: "b1-u3-l4", title: "Modals of possibility", ar: "Modals of possibility: may, might, could",
          explanation: "May, might, and could show possibility now or in the future: It might rain. She could be at home. Must be shows a strong conclusion (He must be tired). Can't be shows that something is impossible (That can't be true). After these modals we use the base verb without to.",
          vocab: V("might be|Possibly is|He might be in a meeting.", "could be|Possibly is|She could be at home.", "must be|Is almost certainly|He must be tired.",
            "can't be|Is impossible|That can't be true.", "it's possible that|There is a chance that|It's possible that he forgot.", "no idea|Not knowing at all|I have no idea where she is."),
          talk: T("A|Where is Hassan? He's not answering.", "B|He might be in a meeting.|He might to be in a meeting.|He might being in a meeting.",
            "A|But the meeting finished an hour ago.", "B|Then he could be having lunch.|Then he could to be having lunch.|Then he could has lunch.",
            "A|He must be hungry then!", "B|Probably. Anyway, he can't be far away.|Probably. Anyway, he can't to be far away.|Probably. Anyway, he can't being far away.",
            "Q|Why can't A reach Hassan?|He isn't answering|He is on holiday|He is abroad"),
          reading: R("Someone left a bag in our office. We don't know whose it is. It might belong to Nadia, because she wears blue. It could be Khaled's, but he's on holiday. It can't be the manager's, because he has a black bag. We have no idea, so we'll ask everyone.",
            "What was left in the office?|A bag|A phone|A key", "Why can't it be the manager's?|He has a black bag|He is away|He lost his bag", "What will they do?|Ask everyone|Throw it away|Call the police"),
          exercises: [
            C("It ___ rain later, so take an umbrella.", ["might", "might to", "musts"], "might"),
            C("He's been working all day. He ___ be tired.", ["must", "can't", "may to"], "must"),
            L("That can't be true", ["That can't to be true", "That can't being true"]),
            C("She ___ be at home, but I'm not sure.", ["could", "could to", "coulds"], "could"),
            O("Put the words in order: He might be in a meeting", "He might be in a meeting"),
            C("It's 3 a.m. She ___ be asleep.", ["must", "mustn't", "may not to"], "must")
          ]
        },
        {
          id: "b1-u3-l5", title: "Advice with should", ar: "Giving advice",
          explanation: "To give advice: should / shouldn't + base verb (You should rest), ought to (You ought to see a doctor), had better (You'd better hurry), Why don't you...? and If I were you, I'd.... After should we use the base verb without to.",
          vocab: V("ought to|Should|You ought to see a doctor.", "had better|It is wise to|You had better hurry.", "why don't you|Used to suggest something|Why don't you ask your teacher?",
            "my advice is|What I suggest is|My advice is to wait.", "take my advice|Follow what I suggest|Take my advice and rest.", "I'd suggest|I would recommend|I'd suggest taking a taxi."),
          talk: T("A|I have a terrible headache.", "B|You should drink some water and rest.|You should to drink some water and rest.|You should drinking some water and rest.",
            "A|I have an exam tomorrow, though.", "B|You'd better go to bed early tonight.|You'd better to go to bed early tonight.|You'd better going to bed early tonight.",
            "A|Good point. Should I take medicine?", "B|If I were you, I'd ask the pharmacist.|If I am you, I'd ask the pharmacist.|If I were you, I ask the pharmacist.",
            "Q|What does B advise first?|Drink water and rest|Study all night|Skip the exam"),
          reading: R("My friend Rania wants to improve her English. My advice is to practise every day, even for ten minutes. She should watch films with subtitles and she ought to read short stories. If I were her, I'd also find a speaking partner. She had better start soon, because her exam is next month.",
            "What does Rania want to do?|Improve her English|Change her job|Move abroad", "What is the writer's main advice?|Practise every day|Study all night|Take a break", "Why should she start soon?|Her exam is next month|She is bored|She is travelling"),
          exercises: [
            C("You ___ see a doctor.", ["should", "should to", "shoulds"], "should"),
            C("You ___ better hurry!", ["had", "have", "are"], "had"),
            L("If I were you I would wait", ["If I am you I would wait", "If I were you I will waiting"]),
            C("Why ___ you ask your teacher?", ["don't", "doesn't", "not"], "don't"),
            O("Put the words in order: You should go to bed early tonight", "You should go to bed early tonight"),
            C("You ___ to rest more.", ["ought", "should", "must"], "ought")
          ]
        }
      ]
    },
    {
      id: "b1-u4", title: "Work and study", goals: ["work"], goal: "Handle the workplace: an email, a phone call, and an interview",
      lessons: [
        {
          id: "b1-u4-l1", title: "Talking about your job", ar: "Talking about your job",
          explanation: "To talk about your job: I work as + job (I work as an engineer), I'm in charge of + thing (I'm in charge of the team), I work full-time or part-time. Questions: What do you do? Who do you work for? How long have you worked there?",
          vocab: V("work as|Have a job as|I work as an accountant.", "in charge of|Responsible for|I'm in charge of ten people.", "full-time|For the full working week|She works full-time.",
            "part-time|For fewer hours than full-time|He studies and works part-time.", "deadline|The last date something must be finished|The deadline is on Friday.", "shift|A fixed period of work|I work the night shift."),
          talk: T("A|What do you do for a living?", "B|I work as a software developer.|I work like a software developer.|I working as a software developer.",
            "A|Do you work full-time?", "B|Yes, and I'm in charge of a small team.|Yes, and I'm in charge for a small team.|Yes, and I in charge of a small team.",
            "A|Sounds busy. Do you have deadlines?", "B|Yes, we always have a deadline on Fridays.|Yes, we always has a deadline on Fridays.|Yes, we always have a deadline in Fridays.",
            "Q|What does B do?|Software developer|Teacher|Accountant"),
          reading: R("Dina works as a nurse at a large hospital. She works the night shift three days a week. She is in charge of five new nurses, so she is always busy. Her best friend works part-time in a bank and studies in the evenings.",
            "What is Dina's job?|Nurse|Doctor|Teacher", "When does she work?|The night shift three days a week|Every morning|Weekends only", "What does her friend do?|Works part-time and studies|Works full-time|Doesn't work"),
          exercises: [
            C("I ___ as a teacher.", ["work", "am work", "working"], "work"),
            C("She is in ___ of the sales team.", ["charge", "control of", "manage"], "charge"),
            L("The deadline is on Friday", ["The deadline are on Friday", "The deadline is in Friday"]),
            C("He works ___, only four hours a day.", ["part-time", "full-time", "overtime"], "part-time"),
            O("Put the words in order: I work the night shift", "I work the night shift"),
            C("Do you work ___ or part-time?", ["full-time", "full time of", "all time"], "full-time")
          ]
        },
        {
          id: "b1-u4-l2", title: "A job interview", ar: "A job interview",
          explanation: "In an interview, speak confidently and in full sentences. Common questions: Tell me about yourself. What are your strengths? What is your biggest weakness? Why do you want this job? Answer with examples: I'm good at... For example, I... End with: Thank you for your time.",
          vocab: V("interview|A meeting to check if someone suits a job|I have a job interview tomorrow.", "strengths|Things you do well|My strengths are teamwork and patience.", "weakness|Something you could improve|My weakness is that I work too much.",
            "apply for|To ask formally for a job|I'd like to apply for this position.", "hire|To give someone a job|They want to hire two people.", "candidate|A person applying for a job|She is the best candidate."),
          talk: T("A|Good morning. Please tell me about yourself.", "B|I'm an engineer with four years of experience.|I'm a engineer with four years of experiences.|I'm engineer with four year of experience.",
            "A|What are your main strengths?", "B|I'm organised, and I work well in a team.|I'm organise, and I work good in a team.|I organised, and I work well in team.",
            "A|And your biggest weakness?", "B|Sometimes I work too much, but I'm learning to relax.|Sometimes I working too much, but I'm learning to relax.|Sometimes I work too much, but I'm learn to relax.",
            "Q|How much experience does B have?|Four years|Two years|Ten years"),
          reading: R("Before my interview, I practised answers to common questions. I prepared two examples of my strengths and I read about the company. During the interview, I spoke slowly and I smiled. At the end I said, 'Thank you for your time.' Two days later, they offered me the job.",
            "What did he do before the interview?|Practised answers|Slept late|Called the manager", "How did he speak?|Slowly and with a smile|Very fast|Very quietly", "What happened two days later?|They offered him the job|He was rejected|He quit"),
          exercises: [
            C("I'd like to ___ for this position.", ["apply", "ask", "request to"], "apply"),
            C("What are your ___?", ["strengths", "strongs", "strongest"], "strengths"),
            L("Thank you for your time", ["Thanks you for your time", "Thank you for times"]),
            C("They want to ___ two new people.", ["hire", "hiring", "hired"], "hire"),
            O("Put the words in order: I have a job interview tomorrow", "I have a job interview tomorrow"),
            C("She is the best ___ for the job.", ["candidate", "interview", "weakness"], "candidate")
          ]
        },
        {
          id: "b1-u4-l3", title: "Writing a short email", ar: "Writing a short email",
          explanation: "A short email has: a greeting (Hi Sara,), the reason for writing (I'm writing to... / Thanks for your message), the request (Could you please...?), and a sign-off (Best regards,). Keep it clear and short, one idea per line. Use let me know and get back to you to ask for a reply.",
          vocab: V("get back to you|Reply to you later|I'll get back to you tomorrow.", "let me know|Tell me|Please let me know if you can come.", "best regards|A polite way to end an email|Best regards, Ahmed",
            "thanks for your message|A polite way to start a reply|Thanks for your message.", "quick question|A short question|I have a quick question.", "as soon as possible|As quickly as you can|Please reply as soon as possible."),
          talk: T("A|I need to email my manager about tomorrow's meeting.", "B|Start with a greeting, like 'Hi Mr Salem,'.|Start with a greeting, like 'Hey you,'.|Start a greeting, like 'Hi Mr Salem,'.",
            "A|And how do I ask him to confirm?", "B|Write, 'Please let me know if you can come.'|Write, 'Please let me to know if you can come.'|Write, 'Please letting me know if you can come.'",
            "A|OK, and how should I finish?", "B|With 'Best regards,' and your name.|With 'Bye bye,' and your name.|With 'Best regard,' and your name.",
            "Q|What does A want to do?|Email his manager|Call a client|Book a flight"),
          reading: R("Hi Nadia, Thanks for your message. I have a quick question about the report. Could you please send me the final numbers as soon as possible? I'll get back to you once I have them. Please let me know if anything changes. Best regards, Hany.",
            "Who wrote the email?|Hany|Nadia|The manager", "What does he ask for?|The final numbers|A meeting|A holiday", "How does the email end?|With 'Best regards'|With 'Goodbye'|With a question"),
          exercises: [
            C("Please let me ___ if you can come.", ["know", "to know", "knowing"], "know"),
            C("I'll get ___ to you tomorrow.", ["back", "out", "up"], "back"),
            L("I have a quick question", ["I have quick a question", "I has a quick question"]),
            C("Please reply as soon as ___.", ["possible", "possibly", "possibility"], "possible"),
            O("Put the words in order: Thanks for your message", "Thanks for your message"),
            C("A polite ending is ___ regards.", ["Best", "Good", "Nice"], "Best")
          ]
        },
        {
          id: "b1-u4-l4", title: "On the phone", ar: "On the phone",
          explanation: "Phone phrases: This is... speaking. Could I speak to...? Hold on / One moment. I'll put you through (I'll connect you). Can I leave a message? I'll call back later. If the line is bad: Sorry, it's a bad line. Could you repeat that?",
          vocab: V("speaking|Used to say who is on the phone|Hello, this is Sara speaking.", "hold on|Wait a moment|Hold on, please. I'll check.", "put you through|Connect you to someone|I'll put you through to the manager.",
            "leave a message|Say something for someone to get later|Can I leave a message?", "call back|Phone again later|I'll call back in an hour.", "bad line|A poor phone connection|Sorry, it's a bad line."),
          talk: T("A|Hello, Nile Bank. How can I help you?", "B|Hello, could I speak to Mr Fathy, please?|Hello, could I speaking to Mr Fathy, please?|Hello, can I speak with Mr Fathy, please?",
            "A|One moment. I'll put you through.", "B|Thank you.|Thank you for to put me.|Thanks you.",
            "A|I'm sorry, he's not at his desk. Can I take a message?", "B|Yes, please. Could you ask him to call me back?|Yes, please. Could you ask him calling me back?|Yes, please. Could you ask him to calling me back?",
            "Q|What does B want?|To speak to Mr Fathy|To open an account|To apply for a loan"),
          reading: R("Yesterday I called a hotel to book a room. The line was bad, so I asked the receptionist to repeat the dates. She said, 'Hold on, please,' and checked the system. Then she put me through to the manager, who confirmed my booking.",
            "Why did he call?|To book a room|To complain|To cancel", "What was the problem?|A bad line|A wrong number|No answer", "Who confirmed the booking?|The manager|The receptionist|A friend"),
          exercises: [
            C("Hello, this is Mona ___.", ["speaking", "talking", "calling"], "speaking"),
            C("Hold ___, please. I'll check.", ["on", "in", "up on"], "on"),
            L("I'll put you through to the manager", ["I'll put you thru to the manager", "I put you through the manager"]),
            C("Can I ___ a message?", ["leave", "leaves", "left"], "leave"),
            O("Put the words in order: I will call you back in an hour", "I will call you back in an hour"),
            C("Sorry, it's a bad ___.", ["line", "phone", "voice"], "line")
          ]
        },
        {
          id: "b1-u4-l5", title: "Describing skills", ar: "Describing skills",
          explanation: "To describe your skills: I'm good at + -ing (I'm good at solving problems), I'm experienced in + noun, I'm fluent in + language, I'm a quick learner, I'm a team player, I'm organised. Support each skill with an example: For example, I...",
          vocab: V("good at|Skilled at|I'm good at solving problems.", "experienced in|Having practice in|She is experienced in marketing.", "fluent in|Speaking a language very well|He is fluent in three languages.",
            "team player|Someone who works well with others|I'm a real team player.", "quick learner|Someone who learns fast|I'm a quick learner.", "organised|Good at planning and arranging things|She is very organised."),
          talk: T("A|What skills do you have?", "B|I'm good at solving problems.|I'm good in solve problems.|I'm good at solve problems.",
            "A|Can you give me an example?", "B|Yes. Last year, I fixed a serious delay in our project.|Yes. Last year, I fix a serious delay in our project.|Yes. Last year, I fixed a serious delaying in our project.",
            "A|Impressive. Do you speak any languages?", "B|Yes, I'm fluent in English and French.|Yes, I'm fluently in English and French.|Yes, I fluent in English and French.",
            "Q|What is B good at?|Solving problems|Selling|Driving"),
          reading: R("Salma is a quick learner. She started her job with no experience, but now she is experienced in customer service. She is fluent in English, and she is a real team player. Her manager says she is very organised and always meets deadlines.",
            "How did Salma start her job?|With no experience|As a manager|As a driver", "What is she fluent in?|English|French|German", "What does her manager say?|She is very organised|She is slow|She is shy"),
          exercises: [
            C("I'm good ___ solving problems.", ["at", "in", "on"], "at"),
            C("He is ___ in three languages.", ["fluent", "fluently", "fluency"], "fluent"),
            L("I'm a quick learner", ["I'm a quickly learner", "I'm quick learner a"]),
            C("She is ___ in marketing.", ["experienced", "experience", "experiencing"], "experienced"),
            O("Put the words in order: I am a team player", "I am a team player"),
            C("He is very ___. His desk is always tidy.", ["organised", "organise", "organising"], "organised")
          ]
        }
      ]
    },
    {
      id: "b1-u5", title: "Travel and problems", goals: ["travel"], goal: "Deal with things that go wrong while travelling or at a hotel",
      lessons: [
        {
          id: "b1-u5-l1", title: "At the airport", ar: "At the airport",
          explanation: "At the airport: you check in and get a boarding pass, find your departure gate, and ask about the flight if it is delayed. At customs, you may be asked: Do you have anything to declare? For luggage: I have one suitcase and a carry-on bag.",
          vocab: V("check-in desk|Where you register for your flight|Go to the check-in desk.", "boarding pass|The ticket that lets you board the plane|Please show your boarding pass.", "departure gate|The place where you board the plane|Go to departure gate twelve.",
            "delayed flight|A flight that leaves later than planned|Our delayed flight leaves at nine.", "carry-on bag|A small bag you keep with you on the plane|I have one carry-on bag.", "customs|The place where officers check travellers' bags|We went through customs quickly."),
          talk: T("A|Good morning. May I see your passport, please?", "B|Here you are. I'd like a window seat if possible.|Here you are. I'd like a window seat if it possible.|Here you are. I like a window seat if possible.",
            "A|Of course. Do you have any luggage to check in?", "B|Yes, one suitcase and one carry-on bag.|Yes, one suitcase and one carry-on bags.|Yes, one suitcases and one carry-on bag.",
            "A|Here is your boarding pass. Your flight leaves from gate twelve.", "B|Thank you. Is the flight on time?|Thank you. Is the flight on times?|Thank you. The flight is on time?",
            "Q|Which gate does the flight leave from?|Gate twelve|Gate two|Gate twenty"),
          reading: R("We arrived at the airport three hours early. First we checked in and got our boarding passes. Then we went through customs. When we reached the departure gate, we saw that our flight was delayed by two hours, so we had coffee and waited.",
            "When did they arrive?|Three hours early|One hour late|At night", "What did they do first?|Checked in|Went through customs|Had coffee", "How long was the delay?|Two hours|Thirty minutes|One day"),
          exercises: [
            C("Where do I ___ in?", ["check", "look", "put"], "check"),
            C("Please show your ___ pass.", ["boarding", "boarded", "board"], "boarding"),
            L("Our flight is delayed by an hour", ["Our flight is delaying by an hour", "Our flights are delayed by a hour"]),
            C("I have one ___ bag.", ["carry-on", "carried-on", "carrying-on"], "carry-on"),
            O("Put the words in order: The departure gate is number twelve", "The departure gate is number twelve"),
            C("We went through ___ and showed our bags.", ["customs", "custom", "costume"], "customs")
          ]
        },
        {
          id: "b1-u5-l2", title: "Hotel problems", ar: "Hotel problems",
          explanation: "When there is a problem at a hotel, describe it calmly and clearly: The air conditioning doesn't work. The shower is leaking. The room is too noisy. Then ask for a solution: Could you change my room? Could you send someone to fix it? If the room is not what you booked, ask for a refund.",
          vocab: V("front desk|The reception area of a hotel|Please call the front desk.", "leaking|Letting water escape through a hole|The shower is leaking.", "air conditioning|A system that cools a room|The air conditioning doesn't work.",
            "change rooms|Move to a different room|Can we change rooms, please?", "refund|Money given back to you|I'd like a refund for tonight.", "fully booked|Has no free rooms left|The hotel is fully booked."),
          talk: T("A|Front desk. How can I help you?", "B|Hello. The air conditioning in my room doesn't work.|Hello. The air conditioning in my room don't work.|Hello. The air conditioning in my room isn't work.",
            "A|I'm very sorry. I'll send someone to fix it.", "B|Thank you. Also, the room is very noisy.|Thank you. Also, the room are very noisy.|Thank you. Also, the room is very noise.",
            "A|Would you like to change rooms?", "B|Yes, please. Do you have a quiet one?|Yes, please. Have you a quiet one?|Yes, please. Do you have quiet one a?",
            "Q|What is wrong with the room?|The air conditioning and noise|The bed|The window"),
          reading: R("When we arrived at the hotel, our room was dirty and the shower was leaking. We called the front desk, and a manager came immediately. He apologised and offered us another room. The next morning, he also gave us a free breakfast, so we left a good review.",
            "What was wrong with the room?|It was dirty and the shower leaked|It was too small|It was too hot", "Who came to help?|A manager|A guest|A taxi driver", "What did they get the next morning?|A free breakfast|A refund|A taxi"),
          exercises: [
            C("The shower ___ and water is on the floor.", ["is leaking", "leaks to", "leaked of"], "is leaking"),
            C("Please call the front ___.", ["desk", "table", "door"], "desk"),
            L("The air conditioning doesn't work", ["The air conditioning don't work", "The air conditioning isn't working it"]),
            C("Can we ___ rooms, please?", ["change", "changing", "changed"], "change"),
            O("Put the words in order: I would like a refund for tonight", "I would like a refund for tonight"),
            C("Sorry, the hotel is ___ booked tonight.", ["fully", "full", "filling"], "fully")
          ]
        },
        {
          id: "b1-u5-l3", title: "Asking for help", ar: "Asking for help",
          explanation: "To ask for help politely: Excuse me, could you help me? Can you give me a hand? Could you point me to...? If you are lost: I'm lost. In an emergency: It's an emergency! Please call an ambulance. After getting help, say Thanks a lot, that's very kind.",
          vocab: V("I'm lost|I don't know where I am|Excuse me, I'm lost.", "give me a hand|Help me|Could you give me a hand?", "point me to|Show me the way to|Could you point me to the station?",
            "nearby|Close to here|Is there a pharmacy nearby?", "emergency|A serious and urgent situation|It's an emergency!", "lost property|An office where lost things are kept|I'll go to the lost property office."),
          talk: T("A|Excuse me, I'm lost. Could you help me?", "B|Of course. Where do you want to go?|Of course. Where you want to go?|Of course. Where do you wanting to go?",
            "A|I'm looking for the nearest metro station.", "B|It's just two streets away. Go straight and turn left.|It's just two streets away. Go straight and turned left.|It's just two street away. Go straight and turn left.",
            "A|Thank you so much. That's very kind.", "B|You're welcome. Have a nice day!|You're welcomed. Have a nice day!|You welcome. Have nice day!",
            "Q|What is A looking for?|The metro station|A hotel|A restaurant"),
          reading: R("On the first day of our trip, I lost my bag on a bus. I was very worried because my passport was inside. I asked a police officer for help, and he pointed me to the lost property office. Luckily, the bus driver had found it, and I got it back within an hour.",
            "Where did the writer lose the bag?|On a bus|In a hotel|At the airport", "Who pointed him to the office?|A police officer|A taxi driver|A friend", "How long did it take to get the bag back?|Within an hour|Two days|A week"),
          exercises: [
            C("Excuse me, I'm ___.", ["lost", "loss", "losing"], "lost"),
            C("Could you give me a ___?", ["hand", "arm", "finger"], "hand"),
            L("Is there a pharmacy nearby", ["Is there a pharmacy near by it", "Are there a pharmacy nearby"]),
            C("Could you ___ me to the station?", ["point", "show at", "tell on"], "point"),
            O("Put the words in order: Could you help me please", "Could you help me please"),
            C("Call an ambulance! It's an ___!", ["emergency", "emergence", "urgency"], "emergency")
          ]
        },
        {
          id: "b1-u5-l4", title: "Comparisons", ar: "Comparisons",
          explanation: "For comparisons: a short adjective + -er + than (cheaper than), more + long adjective + than (more expensive than), the + -est or the most for the highest degree. Use as + adjective + as for equal, and not as ... as for less. Add far or slightly to adjust the difference: far better, slightly cheaper.",
          vocab: V("far better|Much better|This hotel is far better.", "not as good as|Less good than|It's not as good as the old one.", "the most expensive|Costing the most|It's the most expensive hotel here.",
            "slightly cheaper|A little cheaper|The train is slightly cheaper.", "twice as fast|Two times as fast|The plane is twice as fast.", "would rather|Prefers to|I would rather travel by train."),
          talk: T("A|Which is faster, the bus or the train?", "B|The train is faster than the bus.|The train is more fast than the bus.|The train is faster that the bus.",
            "A|And which is cheaper?", "B|The bus is slightly cheaper, but it's not as comfortable.|The bus is slightly cheaper, but it's not as comfortable than.|The bus is slightly cheapest, but it's not as comfortable.",
            "A|So which one would you choose?", "B|I would rather take the train. It's the best option.|I would rather to take the train. It's the best option.|I would rather take the train. It's the most good option.",
            "Q|Which is cheaper?|The bus|The train|The plane"),
          reading: R("We compared three hotels for our trip. Hotel A was the cheapest, but it was far from the beach. Hotel B was slightly more expensive, and it was much closer. Hotel C was the most expensive, and it was not as quiet as the others. In the end, we chose Hotel B.",
            "Which hotel was the cheapest?|Hotel A|Hotel B|Hotel C", "Which hotel was not as quiet?|Hotel C|Hotel A|Hotel B", "Which hotel did they choose?|Hotel B|Hotel A|Hotel C"),
          exercises: [
            C("The train is ___ than the bus.", ["faster", "more fast", "fastest"], "faster"),
            C("This is the ___ expensive hotel in town.", ["most", "more", "very"], "most"),
            L("It's not as good as the old one", ["It's not so good than the old one", "It's not as good that the old one"]),
            C("The plane is ___ as fast as the train.", ["twice", "two", "second"], "twice"),
            O("Put the words in order: I would rather travel by train", "I would rather travel by train"),
            C("This room is ___ better than the last one.", ["far", "very", "most"], "far")
          ]
        },
        {
          id: "b1-u5-l5", title: "Reported speech", ar: "Reported speech",
          explanation: "In reported speech, we move the tense one step back: 'I am tired' becomes He said that he was tired. 'I will call' becomes She said she would call. For questions: He asked if I was ready. Use told with an object (He told me), and said without one (He said that). We also change pronouns and time words: tomorrow becomes the next day.",
          vocab: V("said that|Reported a statement|He said that he was busy.", "told me|Reported to me|She told me to wait.", "asked if|Reported a yes or no question|He asked if I was ready.",
            "wanted to know|Was curious about|She wanted to know where I lived.", "added that|Said something more|He added that it was free.", "the next day|The day after|She said she would come the next day."),
          talk: T("A|What did the manager say?", "B|He said that the meeting was cancelled.|He said that the meeting is cancelled yesterday.|He said me that the meeting was cancelled.",
            "A|Did he say when the new one would be?", "B|He told me it would be the next day.|He said me it would be the next day.|He told me it will be the next day.",
            "A|And did he ask about the report?", "B|Yes, he asked if I had finished it.|Yes, he asked if did I finish it.|Yes, he asked if I have finished it yesterday.",
            "Q|What did the manager say about the meeting?|It was cancelled|It was longer|It was online"),
          reading: R("Yesterday my boss called me. He said that he was very pleased with my work. He told me that the company would give me a bonus. Then he asked if I could stay late on Friday. I said that I could, and he thanked me.",
            "What did the boss say about the work?|He was very pleased|He was angry|He was surprised", "What would the company give?|A bonus|A holiday|A car", "What did he ask?|If the writer could stay late|If he was ill|If he was leaving"),
          exercises: [
            C("'I am tired,' he said. → He said he ___ tired.", ["was", "is", "were"], "was"),
            C("She ___ me to wait.", ["told", "said", "asked that"], "told"),
            L("He asked if I was ready", ["He asked if was I ready", "He asked if I am ready then"]),
            C("'I will call you,' she said. → She said she ___ call me.", ["would", "will", "can"], "would"),
            O("Put the words in order: He told me that he was busy", "He told me that he was busy"),
            C("He said he would come ___ day.", ["the next", "tomorrow", "next of"], "the next")
          ]
        }
      ]
    }
  ]
});
