// Level A2: 5 units
window.COURSES = window.COURSES || [];
window.COURSES.push({
  level: "A2",
  units: [
    {
      id: "a2-u1", title: "Past simple", goals: ["talk"],
      lessons: [
        {
          id: "a2-u1-l1", title: "Was and were", ar: "Was and were",
          explanation: "The past of to be: use was with I / he / she / it, and were with you / we / they. Examples: I was tired yesterday. They were at home.",
          vocab: V("yesterday|The day before today|I was at home yesterday.", "tired|Feeling that you need rest|He was tired.", "happy|Feeling good and pleased|They were happy.",
            "last year|The year before this year|We were in Alexandria last year.", "at home|In your house|She was at home.", "school|A place where children learn|We were at school."),
          talk: T("A|Were you at home yesterday?", "B|Yes, I was at home all day.|Yes, I were at home.|No, I am at home.",
            "A|Was your brother at home too?", "B|No, he was at school.|No, he were at school.|No, he is at school.",
            "A|And your parents? Were they tired?", "B|Yes, they were tired.|Yes, they was tired.|Yes, they are tired yesterday.",
            "Q|Where was B's brother yesterday?|At school|At home|At work"),
          reading: R("Last year, my family was in Alexandria for the summer. The weather was hot and sunny. My parents were happy. I was tired after the long trip, but my brother was not.",
            "Where was the family last year?|In Alexandria|In Cairo|In Giza", "How was the weather?|Hot and sunny|Cold|Rainy", "Who was not tired?|The brother|The writer|The parents"),
          exercises: [
            C("I ___ at home yesterday.", ["was", "were", "is"], "was"),
            C("They ___ happy.", ["was", "were", "are"], "were"),
            L("I was tired yesterday", ["I am tired today", "We were tired yesterday"]),
            C("She ___ in Cairo last year.", ["was", "were", "be"], "was"),
            O("Put the words in order: We were at school", "We were at school"),
            C("___ you at work yesterday?", ["Were", "Was", "Are"], "Were")
          ]
        },
        {
          id: "a2-u1-l2", title: "Regular past verbs", ar: "Regular past verbs",
          explanation: "For regular verbs, we add -ed to make the past: work becomes worked, play becomes played, watch becomes watched.",
          vocab: V("worked|Did a job|She worked in a bank.", "played|Took part in a game or sport|We played football.", "watched|Looked at something on a screen|I watched a movie.",
            "walked|Moved on foot|He walked to school.", "listened|Paid attention to sound|They listened to music.", "movie|A film you watch at the cinema or at home|It was a good movie."),
          talk: T("A|What did you do yesterday?", "B|I played football with my friends.|I play football with my friends.|I playing football yesterday.",
            "A|Did you watch the match last night?", "B|Yes, I watched it with my brother.|Yes, I watch it last night.|Yes, I watching it.",
            "A|Sounds fun! Did you walk home?", "B|Yes, I walked home at ten.|Yes, I walk home yesterday.|No, I am walked home.",
            "Q|Who did B play football with?|His friends|His brother|His teacher"),
          reading: R("Yesterday I worked at the bank until five. Then I walked to the park and listened to music. In the evening, I watched a movie with my sister.",
            "Where did the writer work?|At a bank|At a hospital|At a school", "What did the writer listen to?|Music|A story|The news",
            "Who watched the movie with the writer?|The writer's sister|The writer's friend|The writer's mother"),
          exercises: [
            C("I ___ football yesterday.", ["played", "play", "playing"], "played"),
            C("She ___ in a bank last year.", ["worked", "work", "works"], "worked"),
            L("She worked yesterday", ["She walks yesterday", "She watched yesterday"]),
            C("We ___ a movie last night.", ["watched", "watch", "watching"], "watched"),
            O("Put the words in order: I walked to work", "I walked to work"),
            C('What is the past of "listen"?', ["listened", "listenned", "listen"], "listened")
          ]
        },
        {
          id: "a2-u1-l3", title: "Spelling of -ed verbs", ar: "Spelling of -ed verbs",
          explanation: "Spelling rules: if a verb ends in e, add only d (live becomes lived). If it ends in a consonant plus y, change y to ied (study becomes studied). If it is a short verb ending in one vowel and one consonant, double the last letter (stop becomes stopped).",
          vocab: V("lived|Had your home in a place|He lived in Alexandria.", "studied|Learned by reading and practicing|I studied all night.", "stopped|Came to an end or did not move any more|The bus stopped.",
            "tried|Made an effort to do something|She tried again.", "visited|Went to see a person or place|We visited our grandmother.", "arrived|Got to a place|They arrived at nine."),
          talk: T("A|Did you visit your grandmother last week?", "B|Yes, I visited her on Friday.|Yes, I visitted her on Friday.|Yes, I visit her last week.",
            "A|Did she live in the same house?", "B|Yes, she lived in the same house.|Yes, she livd in the same house.|Yes, she living in the same house.",
            "A|Did you stay long?", "B|No, I stopped by for an hour.|No, I stoped by for an hour.|No, I stop by for an hour.",
            "Q|Who did B visit?|His grandmother|His uncle|His cousin"),
          reading: R("Last month I studied English every night. I tried hard and I never stopped. My teacher visited our class and she was happy. Now I speak better English.",
            "What did the writer study?|English|Math|History", "When did the writer study?|Every night|Every morning|Every Friday", "What did the teacher do?|Visited the class|Studied English|Stopped the class"),
          exercises: [
            C('What is the past of "live"?', ["lived", "livd", "liveed"], "lived"),
            C('What is the past of "study"?', ["studied", "studyed", "studdied"], "studied"),
            L("They arrived at nine", ["They arrive at nine", "They stopped at nine"]),
            C('What is the past of "stop"?', ["stopped", "stoped", "stopt"], "stopped"),
            O("Put the words in order: We visited our grandmother yesterday", "We visited our grandmother yesterday"),
            C("She ___ again, but it didn't work.", ["tried", "trid", "tryed"], "tried")
          ]
        },
        {
          id: "a2-u1-l4", title: "Time expressions", ar: "Time expressions",
          explanation: "With the past we use: yesterday, last night, last week, last month, and ago after a period: two days ago (two days before now). Example: I met him two days ago.",
          vocab: V("ago|Before now, after a period of time|I called him two days ago.", "last night|The night before today|I slept early last night.", "last week|The week before this week|We traveled last week.",
            "last month|The month before this month|She started work last month.", "the day before yesterday|Two days ago|I saw him the day before yesterday."),
          talk: T("A|When did you arrive in Cairo?", "B|I arrived two days ago.|I arrive two days ago.|I will arrive two days ago.",
            "A|Did you go to the museum last week?", "B|No, I went there the day before yesterday.|No, I go there tomorrow.|No, I will go the day before yesterday.",
            "A|How was it?", "B|It was great.|It will be great.|It is great last night.",
            "Q|When did B arrive in Cairo?|Two days ago|Last week|Last month"),
          reading: R("I started my new job last month. Two days ago, I met my new manager. Last night, I slept early because I was tired. Today is my first big meeting.",
            "When did the writer start the job?|Last month|Last week|Two days ago", "When did the writer meet the manager?|Two days ago|Last night|Last month",
            "Why did the writer sleep early?|The writer was tired|The writer was happy|The writer was late"),
          exercises: [
            C("I saw him two days ___.", ["ago", "before", "last"], "ago"),
            C("It is Tuesday. Sunday was two days ___.", ["ago", "later", "next"], "ago"),
            L("We traveled last week", ["We travel next week", "We traveled last month"]),
            C('What does "last night" mean?', ["The night before today", "The night after today", "Two days before today"], "The night before today"),
            O("Put the words in order: I started work last month", "I started work last month"),
            C("I didn't sleep well ___ night.", ["last", "ago", "next"], "last")
          ]
        },
        {
          id: "a2-u1-l5", title: "Telling a story", ar: "Telling a story",
          explanation: "To order events we use: first, then, after that, finally, suddenly. Example: First, I woke up. Then, I ate breakfast.",
          vocab: V("first|Before anything else|First, I woke up.", "then|After that|Then, I took a shower.", "after that|Following that event|After that, I left home.",
            "finally|At the end|Finally, I arrived at work.", "suddenly|All at once and unexpectedly|Suddenly, it started to rain."),
          talk: T("A|Tell me about your day.", "B|First, I woke up late.|First, I will wake up late.|First, I wake up late tomorrow.",
            "A|And then?", "B|Then I took a taxi to work.|Then I take a taxi yesterday.|Then I will took a taxi.",
            "A|What happened at the end?", "B|Finally, I arrived on time.|Finally, I arrive on time yesterday.|Finally, I arriving on time.",
            "Q|How did B go to work?|By taxi|By bus|By train"),
          reading: R("First, I woke up at seven. Then I had breakfast and left home. After that, I took the bus. Suddenly, it started to rain. Finally, I arrived at work, and I was late.",
            "How did the writer go to work?|By bus|By taxi|By train", "What happened suddenly?|It started to rain|The bus stopped|The writer slept", "How was the writer at the end?|Late|Happy|Tired"),
          exercises: [
            C("___, I woke up. Then I had breakfast.", ["First", "Finally", "Suddenly"], "First"),
            C("I waited for hours. ___, the bus came.", ["Finally", "First", "Before"], "Finally"),
            L("Suddenly it started to rain", ["Finally it started to rain", "Suddenly it stopped to rain"]),
            C('What does "suddenly" mean?', ["All at once and unexpectedly", "At the end", "After that"], "All at once and unexpectedly"),
            O("Put the words in order: After that I left home", "After that I left home"),
            C("I washed my face. ___, I brushed my teeth.", ["Then", "Suddenly", "First"], "Then")
          ]
        }
      ]
    },
    {
      id: "a2-u2", title: "Past: irregular verbs", goals: ["talk"],
      lessons: [
        {
          id: "a2-u2-l1", title: "Irregular verbs", ar: "Irregular verbs",
          explanation: "Some verbs have special past forms: go becomes went, eat becomes ate, see becomes saw, buy becomes bought, have becomes had, make becomes made. You need to memorize them.",
          vocab: V("went|Past of go|I went to the market.", "ate|Past of eat|We ate dinner at eight.", "saw|Past of see|She saw a movie.",
            "bought|Past of buy|He bought a new phone.", "had|Past of have|They had a big party.", "made|Past of make|My mother made a cake."),
          talk: T("A|Where did you go yesterday?", "B|I went to the market.|I go to the market.|I goed to the market.",
            "A|What did you buy there?", "B|I bought some fruit.|I buyed some fruit.|I buy some fruit.",
            "A|Did you eat there?", "B|Yes, we ate lunch at a small restaurant.|Yes, we eated lunch at a small restaurant.|Yes, we eat lunch yesterday.",
            "Q|What did B buy?|Fruit|Bread|A phone"),
          reading: R("Last Friday we went to my uncle's house. We ate a big lunch and my aunt made a cake. My uncle bought a new phone and he saw a movie with us. We had a great day.",
            "Where did they go?|To the uncle's house|To the market|To a restaurant", "Who made the cake?|The aunt|The uncle|The writer", "What did the uncle buy?|A new phone|A new car|A cake"),
          exercises: [
            C("Yesterday I ___ to the cinema.", ["went", "go", "goed"], "went"),
            C("She ___ a new dress last week.", ["bought", "buyed", "buy"], "bought"),
            L("We ate dinner at eight", ["We eat dinner at eight", "We made dinner at eight"]),
            C('What is the past of "see"?', ["saw", "seed", "seen"], "saw"),
            O("Put the words in order: He bought a new car", "He bought a new car"),
            C("They ___ a big lunch yesterday.", ["had", "have", "haved"], "had")
          ]
        },
        {
          id: "a2-u2-l2", title: "Did and didn't", ar: "Did and didn't",
          explanation: "To make a negative in the past, use didn't plus the base verb: I didn't go. For questions: Did you go? Notice the verb goes back to its base form after did.",
          vocab: V("did|Helping verb for the past|Did you like the movie?", "didn't|Did not (past negative)|I didn't sleep well.", "sleep|To rest with your eyes closed at night|I sleep eight hours.",
            "slept|Past of sleep|He slept late.", "early|Before the usual time|We woke up early.", "late|After the expected time|She came late."),
          talk: T("A|Did you go to work yesterday?", "B|No, I didn't go to work.|No, I didn't went to work.|No, I don't go to work yesterday.",
            "A|Did you sleep well last night?", "B|No, I didn't sleep well.|No, I didn't slept well.|No, I wasn't sleep well.",
            "A|Oh no. Did you call the doctor?", "B|Yes, I did.|Yes, I do.|Yes, I was.",
            "Q|Did B go to work yesterday?|No|Yes|Only in the morning"),
          reading: R("Yesterday was a bad day. I didn't sleep well, so I woke up late. I didn't have breakfast and I didn't take the bus. Did I go to work? No, I didn't. I stayed home and slept.",
            "Did the writer sleep well?|No|Yes|Yes, a lot", "What didn't the writer have?|Breakfast|Lunch|Dinner", "What did the writer do at the end?|Stayed home and slept|Went to work|Called a friend"),
          exercises: [
            C("I ___ go to work yesterday.", ["didn't", "don't", "wasn't"], "didn't"),
            C("___ you see the match last night?", ["Did", "Do", "Were"], "Did"),
            L("Did you like the movie", ["Do you like the movie", "Did you see the movie"]),
            C("She didn't ___ the news.", ["watch", "watched", "watching"], "watch"),
            O("Put the words in order: Did you go to school yesterday?", "Did you go to school yesterday?"),
            C("They ___ come to the party.", ["didn't", "wasn't", "not"], "didn't")
          ]
        },
        {
          id: "a2-u2-l3", title: "More irregular verbs", ar: "More irregular verbs",
          explanation: "More irregular verbs: take becomes took, come becomes came, give becomes gave, get becomes got, write becomes wrote, run becomes ran.",
          vocab: V("took|Past of take|She took a taxi.", "came|Past of come|He came late.", "gave|Past of give|My father gave me a gift.",
            "got|Past of get|I got a new phone.", "wrote|Past of write|She wrote a letter.", "ran|Past of run|The boy ran fast."),
          talk: T("A|How did you get to the airport?", "B|I took a taxi.|I taked a taxi.|I take a taxi.",
            "A|Who gave you the ticket?", "B|My brother gave it to me.|My brother give it to me.|My brother gived it to me.",
            "A|And did you write to him?", "B|Yes, I wrote him a letter.|Yes, I writed him a letter.|Yes, I write him yesterday.",
            "Q|How did B get to the airport?|By taxi|By bus|By train"),
          reading: R("My friend came to my house yesterday. He gave me a gift and I got a new book. I wrote him a thank-you letter. Then he ran to take the bus.",
            "Who came to the house?|The writer's friend|The writer's uncle|The teacher", "What did the writer get?|A new book|A new phone|A cake", "What did the writer write?|A letter|A book|A story"),
          exercises: [
            C("Yesterday she ___ a taxi.", ["took", "taked", "take"], "took"),
            C("He ___ to my house last night.", ["came", "comed", "come"], "came"),
            L("She wrote a letter", ["She read a letter", "She wrote a message"]),
            C('What is the past of "give"?', ["gave", "gived", "given"], "gave"),
            O("Put the words in order: He ran very fast", "He ran very fast"),
            C("I ___ a new phone last week.", ["got", "get", "getted"], "got")
          ]
        },
        {
          id: "a2-u2-l4", title: "Irregular verbs 3", ar: "Irregular verbs 3",
          explanation: "Keep practicing: say becomes said, tell becomes told, find becomes found, leave becomes left, meet becomes met, know becomes knew.",
          vocab: V("said|Past of say|He said hello.", "told|Past of tell|She told me a story.", "found|Past of find|I found my keys.",
            "left|Past of leave|They left at six.", "met|Past of meet|We met at the cafe.", "knew|Past of know|I knew the answer."),
          talk: T("A|Did you meet Sara yesterday?", "B|Yes, I met her at the cafe.|Yes, I meet her at the cafe.|Yes, I meeted her at the cafe.",
            "A|What did she say?", "B|She said hello and told me a story.|She say hello and tell me a story.|She sayed hello and telled me a story.",
            "A|And did she find her keys?", "B|Yes, she found them at home.|Yes, she finded them at home.|Yes, she find them yesterday.",
            "Q|Where did B meet Sara?|At the cafe|At home|At the market"),
          reading: R("I knew the answer, but I said nothing. The teacher told us to speak. My friend found a pen and left the room. After class, I met the teacher and told her the answer.",
            "Did the writer know the answer?|Yes|No|Not sure", "Who left the room?|The friend|The teacher|The writer", "What did the writer do after class?|Told the teacher the answer|Left the room|Found a pen"),
          exercises: [
            C("He ___ goodbye and left.", ["said", "sayed", "say"], "said"),
            C("I ___ my keys under the chair.", ["found", "finded", "find"], "found"),
            L("We met at the cafe", ["We meet at the cafe", "We left at the cafe"]),
            C('What is the past of "leave"?', ["left", "leaved", "leaft"], "left"),
            O("Put the words in order: She told me a story", "She told me a story"),
            C("I ___ the answer, but I didn't speak.", ["knew", "knowed", "know"], "knew")
          ]
        },
        {
          id: "a2-u2-l5", title: "Past questions", ar: "Past questions",
          explanation: "For past questions: question word + did + subject + base verb. Examples: Where did you go? What did you eat? Answer in the past: I went to the market.",
          vocab: V("Where did you go?|A question asking about a place|I went to the cinema.", "What did you eat?|A question asking about food|I ate rice.", "When did you arrive?|A question asking about time|I arrived at six.",
            "Who did you meet?|A question asking about a person|I met my uncle.", "How did you travel?|A question asking about the way|I traveled by train."),
          talk: T("A|Where did you go on vacation?", "B|I went to Aswan.|I go to Aswan.|I will go to Aswan.",
            "A|How did you travel?", "B|We traveled by train.|We travel by train yesterday.|We will travel by train.",
            "A|And who did you meet there?", "B|I met my old friend.|I meet my old friend.|I will meet my old friend.",
            "Q|How did B travel?|By train|By plane|By bus"),
          reading: R("Hana went to Luxor last month. She traveled by plane and arrived at six in the evening. She met her cousin at the hotel. They ate dinner at a small restaurant and talked all night.",
            "How did Hana travel?|By plane|By train|By bus", "Who did she meet?|Her cousin|Her teacher|Her uncle", "What did they do at night?|Ate dinner and talked|Slept early|Watched a movie"),
          exercises: [
            C("___ did you go? To the market.", ["Where", "Who", "Why"], "Where"),
            C("What did you ___ for lunch?", ["eat", "ate", "eating"], "eat"),
            L("When did you arrive", ["When do you arrive", "Where did you arrive"]),
            C("Who did you ___ yesterday?", ["meet", "met", "meeting"], "meet"),
            O("Put the words in order: How did you travel?", "How did you travel?"),
            C("When did you arrive?", ["I arrived at six.", "I arrive at six.", "I will arrive at six."], "I arrived at six.")
          ]
        }
      ]
    },
    {
      id: "a2-u3", title: "The future", goals: ["work", "talk"],
      lessons: [
        {
          id: "a2-u3-l1", title: "Going to", ar: "Going to",
          explanation: "To talk about plans we have decided on, use am / is / are + going to + the base verb: I am going to travel next week. She is going to study tonight.",
          vocab: V("going to|Planning to do something|I am going to study tonight.", "tomorrow|The day after today|I'm busy tomorrow.", "next week|The week after this one|We are going to travel next week.",
            "plan|An idea of what you will do|What is your plan?", "travel|To go from one place to another|I want to travel.", "study|To learn by reading and practicing|He studies English."),
          talk: T("A|What are you going to do tomorrow?", "B|I am going to study English.|I going to study English.|I am going study English.",
            "A|And your brother?", "B|He is going to visit our uncle.|He going to visit our uncle.|He are going to visit our uncle.",
            "A|Are you going to travel next week?", "B|Yes, we are going to travel to Dubai.|Yes, we going to travel to Dubai.|Yes, we are going travel to Dubai.",
            "Q|What is B going to do tomorrow?|Study English|Visit his uncle|Travel to Dubai"),
          reading: R("Next week is a big week. I am going to start a new job on Sunday. My sister is going to travel to Alexandria. My parents are going to visit my uncle. We are going to meet on Friday.",
            "What is the writer going to do on Sunday?|Start a new job|Travel|Visit an uncle", "Where is the sister going to travel?|To Alexandria|To Cairo|To Dubai", "When are they going to meet?|On Friday|On Sunday|On Saturday"),
          exercises: [
            C("I ___ going to visit my uncle.", ["am", "is", "are"], "am"),
            C("She is going to ___ tomorrow.", ["travel", "travels", "traveled"], "travel"),
            L("We are going to travel next week", ["We traveled last week", "We are going to study next week"]),
            C("They ___ going to play football.", ["are", "is", "am"], "are"),
            O("Put the words in order: I am going to study tonight", "I am going to study tonight"),
            C("What are you going to do ___?", ["tomorrow", "yesterday", "last night"], "tomorrow")
          ]
        },
        {
          id: "a2-u3-l2", title: "Will", ar: "Will",
          explanation: "We use will for decisions made on the spot and for predictions: I'll help you. I think it will rain tomorrow. The negative is won't: I won't be late.",
          vocab: V("will|Used for future actions and predictions|I will call you later.", "won't|Will not|I won't be late.", "help|To make something easier for someone|Can you help me?",
            "call|To speak to someone on the phone|I will call you tonight.", "rain|Water falling from clouds|I think it will rain.", "later|After some time|See you later."),
          talk: T("A|The phone is ringing and my hands are full!", "B|Don't worry, I will answer it.|Don't worry, I answered yesterday.|Don't worry, I am answer it.",
            "A|Thank you! I will call you tonight.", "B|OK, I will wait for your call.|OK, I did wait for your call.|OK, I'm waited.",
            "A|Maybe I will be late.", "B|That's fine. I won't be angry.|That's fine. I don't will be angry.|That's fine. I willn't be angry.",
            "Q|What will A do tonight?|Call B|Visit B|Wait for B"),
          reading: R("It is hot today. I think it will rain tomorrow. I will stay at home and study. My friend will call me at six. I won't go out because I will be tired.",
            "What does the writer think about tomorrow?|It will rain|It will be hot|It will be sunny", "What will the writer do tomorrow?|Stay at home|Go out|Travel", "Who will call at six?|A friend|The teacher|The sister"),
          exercises: [
            C("It's hot. I ___ open the window.", ["will", "did", "was"], "will"),
            C("I ___ be late. I promise.", ["won't", "didn't", "don't"], "won't"),
            L("I will call you later", ["I called you later", "I will help you later"]),
            C("I think it ___ rain tomorrow.", ["will", "is", "does"], "will"),
            O("Put the words in order: I will help you", "I will help you"),
            C("Will you ___ me?", ["help", "helps", "helped"], "help")
          ]
        },
        {
          id: "a2-u3-l3", title: "Future time", ar: "Future time",
          explanation: "Useful future time expressions: soon, tonight, next month, next year, in two days. Example: I will travel next month.",
          vocab: V("soon|In a short time|See you soon.", "tonight|This evening or night|I will study tonight.", "next month|The month after this one|She will start work next month.",
            "next year|The year after this one|We will move next year.", "in two days|Two days from now|The exam is in two days."),
          talk: T("A|When will you start the new project?", "B|I will start it next month.|I started it next month.|I will start it ago.",
            "A|And when is the exam?", "B|The exam is in two days.|The exam was in two days.|The exam is two days ago.",
            "A|Are you free tonight?", "B|Yes, see you soon!|Yes, see you ago!|Yes, I saw you soon!",
            "Q|When is the exam?|In two days|Next month|Tonight"),
          reading: R("Big news! Next year we will move to a new house. Next month my father will start a new job. In two days, I will visit my school for the last time. Soon I will have new friends.",
            "When will they move?|Next year|Next month|In two days", "When will the father start a new job?|Next month|Next year|Soon", "What will the writer do in two days?|Visit the school|Start a job|Move house"),
          exercises: [
            C("See you ___!", ["soon", "ago", "last"], "soon"),
            C("The exam is ___ two days.", ["in", "ago", "last"], "in"),
            L("We will move next year", ["We moved last year", "We will move next month"]),
            C('What does "tonight" mean?', ["This evening or night", "Yesterday", "Tomorrow"], "This evening or night"),
            O("Put the words in order: I will travel next month", "I will travel next month"),
            C("This year is 2026. 2027 is ___ year.", ["next", "last", "ago"], "next")
          ]
        },
        {
          id: "a2-u3-l4", title: "Invitations", ar: "Invitations",
          explanation: "To suggest, say Let's + base verb: Let's go. Or Shall we + base verb?: Shall we meet at six? To invite: Would you like to come? To accept: Yes, I'd love to.",
          vocab: V("let's|Used to suggest doing something together|Let's go to the park.", "shall we|Used to make a suggestion|Shall we meet at six?", "invite|To ask someone to come to an event|I want to invite you.",
            "maybe|Possibly|Maybe we can go tomorrow.", "I'd love to|A polite way to say yes|Would you like to come? I'd love to."),
          talk: T("A|Let's go to the cinema tonight!", "B|Great idea! What time?|No, it is a cinema.|Yes, I went yesterday.",
            "A|Shall we meet at six?", "B|Six is fine. See you there!|Yes, we shall six.|Let's meet at yesterday.",
            "A|Would you like to invite Sara too?", "B|Yes, I'd love to invite her.|Yes, I invite yesterday.|No, I'd love to.",
            "Q|What does A suggest?|Going to the cinema|Going to the park|Going to a restaurant"),
          reading: R("Hi Mona! Let's have dinner at my house on Friday. Shall we meet at seven? I will invite Sara and Ali too. Would you like to come? I will cook your favorite food. Maybe we can watch a movie after dinner.",
            "Where is the dinner?|At the writer's house|At a restaurant|At the cinema", "What time is the dinner?|Seven|Six|Eight", "What can they do after dinner?|Watch a movie|Go to the park|Play football"),
          exercises: [
            C("___ go to the cinema!", ["Let's", "Shall", "Will"], "Let's"),
            C("___ we meet at six?", ["Shall", "Let's", "Do"], "Shall"),
            L("Let's go to the park", ["Let's go to the party", "Shall we go to the park"]),
            C("Would you like to come?", ["Yes, I'd love to.", "Yes, I am.", "Yes, I was."], "Yes, I'd love to."),
            O("Put the words in order: Let's go to the restaurant", "Let's go to the restaurant"),
            C('What does "invite" mean?', ["To ask someone to come to an event", "To accept a gift", "To give something"], "To ask someone to come to an event")
          ]
        },
        {
          id: "a2-u3-l5", title: "Might and probably", ar: "Might and probably",
          explanation: "To express possibility use might + base verb: It might rain. To show how sure you are: probably (likely), definitely (certainly), perhaps (maybe).",
          vocab: V("might|Used for a possibility|It might rain tomorrow.", "probably|Most likely|I will probably stay home.", "definitely|Without any doubt|I will definitely come.",
            "perhaps|Maybe|Perhaps he is busy.", "sure|Certain about something|I'm not sure."),
          talk: T("A|Are you coming to the party tomorrow?", "B|I might come, but I'm not sure.|I might to come, I'm sure.|I mights come.",
            "A|What about Ali?", "B|He will probably come.|He probably comes yesterday.|He might to come.",
            "A|I will definitely be there!", "B|Great! See you tomorrow.|Great! See you yesterday.|Great! I'm sure not.",
            "Q|Is B sure about coming?|No, he might come|Yes, he will definitely come|No, he will never come"),
          reading: R("The weather is strange today. It might rain this afternoon, but I'm not sure. My brother will probably stay home. I will definitely take my umbrella. Perhaps we will play football tomorrow instead.",
            "What might happen this afternoon?|It might rain|It will be sunny|It will be cold", "What will the writer definitely do?|Take an umbrella|Stay home|Play football", "What does \"probably\" mean?|Most likely|Certainly|Never"),
          exercises: [
            C("I'm not sure, but it ___ rain.", ["might", "does", "did"], "might"),
            C("I am 100% sure. I will ___ come.", ["definitely", "perhaps", "might"], "definitely"),
            L("I will probably stay home", ["I will definitely stay home", "I will probably stay here"]),
            C('What does "perhaps" mean?', ["Maybe", "Certainly", "Never"], "Maybe"),
            O("Put the words in order: Perhaps he is busy", "Perhaps he is busy"),
            C("She might ___ late.", ["be", "is", "was"], "be")
          ]
        }
      ]
    },
    {
      id: "a2-u4", title: "Comparison", goals: ["work"],
      lessons: [
        {
          id: "a2-u4-l1", title: "Comparatives", ar: "Comparatives",
          explanation: "To compare two things: add -er to short adjectives: tall becomes taller, big becomes bigger. For long adjectives use more: more expensive. Use than after the comparison: Ali is taller than Omar.",
          vocab: V("taller|Higher in height|I'm taller than my brother.", "bigger|Larger in size|Cairo is bigger than Alexandria.", "faster|Moving at a higher speed|A car is faster than a bike.",
            "cheaper|Costing less money|This phone is cheaper.", "more expensive|Costing more money|That car is more expensive.", "than|Used to compare two things|He is older than me."),
          talk: T("A|Which phone is better?", "B|This one is cheaper, but that one is faster.|This one is cheap than that.|That one is more fast.",
            "A|And which one is bigger?", "B|The black one is bigger than the white one.|The black one is more big than the white.|The black one is biggest.",
            "A|I will take the cheaper one.", "B|Good choice!|Good choosing!|Good cheaper!",
            "Q|Which phone is faster?|That one|This one|The cheaper one"),
          reading: R("Cairo is bigger than Alexandria. The train is faster than the bus, but it is more expensive. I am taller than my brother, but he is older than me.",
            "Which is bigger?|Cairo|Alexandria|Both", "Why do some people take the bus?|It is cheaper|It is faster|It is bigger", "Who is older?|The brother|The writer|Both"),
          exercises: [
            C("My brother is ___ than me.", ["taller", "tallest", "more tall"], "taller"),
            C("A car is ___ than a bike.", ["faster", "fastest", "more fast"], "faster"),
            L("This phone is cheaper", ["This phone is cleaner", "This phone is bigger"]),
            C("This bag is ___ than that bag.", ["more expensive", "expensiver", "most expensive"], "more expensive"),
            O("Put the words in order: Cairo is bigger than Alexandria", "Cairo is bigger than Alexandria"),
            C("He is older ___ me.", ["than", "then", "that"], "than")
          ]
        },
        {
          id: "a2-u4-l2", title: "Superlatives", ar: "Superlatives",
          explanation: "For the highest degree: the + -est, such as the tallest, the biggest. For long adjectives use the most: the most expensive. Exceptions: good becomes the best, bad becomes the worst.",
          vocab: V("tallest|The highest in height|He is the tallest in the class.", "biggest|The largest in size|This is the biggest city.", "best|The most excellent|She is the best student.",
            "worst|The most bad|That was the worst day.", "most expensive|Costing the most money|It is the most expensive hotel.", "in the world|Across the whole planet|It is the longest river in the world."),
          talk: T("A|Who is the tallest student in your class?", "B|Omar is the tallest.|Omar is taller of all.|Omar is the most tall.",
            "A|And who is the best student?", "B|Mona is the best student.|Mona is the goodest student.|Mona is the most good.",
            "A|And what is the worst thing about school?", "B|The exams are the worst!|The exams are the baddest!|The exams are most bad!",
            "Q|Who is the tallest?|Omar|Mona|The teacher"),
          reading: R("My city has the biggest park in the country and the best restaurants. But the traffic is the worst. The hotel near the park is the most expensive in the city.",
            "What is the biggest in the country?|The park|The hotel|The market", "How is the traffic?|The worst|The best|The biggest", "Which hotel is the most expensive?|The one near the park|The one near the market|The one near the station"),
          exercises: [
            C("He is the ___ boy in the class.", ["tallest", "taller", "most tall"], "tallest"),
            C("This is the ___ movie in the cinema.", ["best", "goodest", "most good"], "best"),
            L("She is the best student", ["She is the worst student", "She is the first student"]),
            C("It is the ___ expensive hotel in the city.", ["most", "more", "much"], "most"),
            O("Put the words in order: This is the biggest house in the city", "This is the biggest house in the city"),
            C("Today is the ___ day of my life!", ["worst", "bad", "baddest"], "worst")
          ]
        },
        {
          id: "a2-u4-l3", title: "As ... as", ar: "As ... as",
          explanation: "To say two things are equal, use as + adjective + as: He is as tall as me. For the negative, use not as ... as: A car is not as fast as a plane. Use the same for identical things and different for things that are not alike.",
          vocab: V("same|Identical|We have the same phone.", "different|Not the same|My phone is different.", "similar|Almost the same|The two bags are similar.",
            "both|The two of them|Both bags are red.", "as tall as|Equal in height|He is as tall as me."),
          talk: T("A|Is your phone the same as mine?", "B|No, mine is different, but it is as fast as yours.|No, mine is different, but it is as faster as yours.|No, mine is same, but it is as fast than yours.",
            "A|Is it as expensive as mine?", "B|No, it is not as expensive as yours.|No, it is not as expensive than yours.|No, it is not expensive as as yours.",
            "A|Oh, then mine is more expensive!", "B|Yes, but both phones are similar.|Yes, but both phones is similar.|Yes, but both phone are similar.",
            "Q|Which phone is more expensive?|A's phone|B's phone|They cost the same"),
          reading: R("Ali and Omar are brothers. Ali is as tall as Omar, but Omar is not as old as Ali. They have the same phone, but different bags. Both bags are black, but Ali's bag is bigger.",
            "Who is older?|Ali|Omar|They are the same age", "What is the same?|Their phone|Their bag|Their age", "Whose bag is bigger?|Ali's|Omar's|Both are the same"),
          exercises: [
            C("He is as tall ___ me.", ["as", "than", "like"], "as"),
            C("A car is ___ as fast as a plane.", ["not", "more", "very"], "not"),
            L("We have the same phone", ["We have a different phone", "We have the same name"]),
            C("My bag and your bag are red. ___ bags are red.", ["Both", "Same", "Different"], "Both"),
            O("Put the words in order: My phone is different", "My phone is different"),
            C('What does "similar" mean?', ["Almost the same", "Not the same", "The two of them"], "Almost the same")
          ]
        },
        {
          id: "a2-u4-l4", title: "Opposites", ar: "Opposites",
          explanation: "Learn adjectives and their opposites: easy and difficult, clean and dirty, heavy and light, noisy and quiet. Example: The test is easy. The room is clean.",
          vocab: V("easy|Not difficult|The test is easy.", "difficult|Hard to do|English is not difficult.", "clean|Free from dirt|My room is clean.",
            "dirty|Covered in dirt|The car is dirty.", "heavy|Having a lot of weight|This bag is heavy.", "quiet|Making little or no noise|The library is quiet."),
          talk: T("A|How was the test?", "B|It was easy, not difficult.|It was easy than difficult.|It was the most easy.",
            "A|Was the room quiet?", "B|Yes, it was very quiet.|Yes, it was very dirty.|Yes, it was too heavy.",
            "A|Good. My bag was heavy today.", "B|Oh, that is not nice! Put it down.|Oh, that is not nice! It is quiet.|Oh, that is not nice! It is easy.",
            "Q|How was the test?|Easy|Difficult|Dirty"),
          reading: R("My old apartment was dirty and noisy. My new apartment is clean and quiet. The old kitchen was small and dirty. The new kitchen is big and clean. The moving boxes were heavy, but the work was easy with friends.",
            "How is the new apartment?|Clean and quiet|Dirty and noisy|Small and dirty", "How was the old kitchen?|Small and dirty|Big and clean|Quiet", "How was the work with friends?|Easy|Difficult|Dirty"),
          exercises: [
            C('What is the opposite of "easy"?', ["difficult", "clean", "heavy"], "difficult"),
            C('What is the opposite of "clean"?', ["dirty", "quiet", "easy"], "dirty"),
            L("The library is quiet", ["The library is dirty", "The library is clean"]),
            C("I can't carry this bag. It is very ___.", ["heavy", "quiet", "easy"], "heavy"),
            O("Put the words in order: My room is clean", "My room is clean"),
            C("The classroom is ___ during the exam.", ["quiet", "dirty", "heavy"], "quiet")
          ]
        },
        {
          id: "a2-u4-l5", title: "Too and enough", ar: "Too and enough",
          explanation: "Too means more than necessary: This bag is too heavy. Enough means as much as needed: I have enough money. Enough comes after an adjective: The room is big enough. Very only means a lot.",
          vocab: V("too|More than necessary|It is too hot today.", "enough|As much as needed|I have enough money.", "very|To a high degree|She is very kind.",
            "quite|Fairly or to some degree|The movie is quite good.", "a little|A small amount|I speak a little English."),
          talk: T("A|Do you want to buy this car?", "B|No, it is too expensive.|No, it is enough expensive.|No, it is very enough expensive.",
            "A|What about this one? It is cheaper.", "B|It is not big enough for my family.|It is not enough big for my family.|It is too enough for my family.",
            "A|Hmm. Then maybe a bus is a better idea!", "B|Ha! Maybe!|Ha! It is too small enough!|Ha, very too funny.",
            "Q|Why doesn't B buy the first car?|It is too expensive|It is too small|It is too old"),
          reading: R("I want to buy a new phone. This one is too expensive. That one is cheap, but the screen is not big enough. This one is quite good and I have enough money. I will buy it today.",
            "Why not the first phone?|Too expensive|Too small|Too heavy", "What is wrong with the cheap phone?|The screen is not big enough|It is too expensive|It is too heavy", "What will the writer do today?|Buy the third phone|Buy the first phone|Buy the second phone"),
          exercises: [
            C("I can't buy it. It is ___ expensive.", ["too", "enough", "a little"], "too"),
            C("I have ___ money to buy it.", ["enough", "too", "very"], "enough"),
            L("It is too hot today", ["It is very hot today", "It is too cold today"]),
            C("The room is big ___. We can all sit.", ["enough", "too", "very"], "enough"),
            O("Put the words in order: I speak a little English", "I speak a little English"),
            C('What does "quite" mean?', ["Fairly or to some degree", "More than necessary", "As much as needed"], "Fairly or to some degree")
          ]
        }
      ]
    },
    {
      id: "a2-u5", title: "Travel and shopping", goals: ["travel"],
      lessons: [
        {
          id: "a2-u5-l1", title: "Travel", ar: "Travel",
          explanation: "Travel words: ticket, passport, luggage, flight, hotel, reservation. A useful sentence: I have a reservation.",
          vocab: V("ticket|A paper or digital pass that lets you travel or enter|I need a ticket to Dubai.", "passport|An official document for travel abroad|Show your passport, please.", "luggage|The bags you take on a trip|Where is my luggage?",
            "flight|A trip by plane|The flight is at ten.", "hotel|A place to stay for money when travelling|We stayed in a nice hotel.", "reservation|An arrangement to keep a room or seat|I have a reservation."),
          talk: T("A|Good morning. Passport and ticket, please.", "B|Here you are.|I am a passport.|Goodbye, ticket.",
            "A|Do you have any luggage?", "B|Yes, I have one bag.|Yes, I have a hotel.|No, it is a ticket.",
            "A|Your flight is at ten. Have a nice trip!", "B|Thank you very much!|You're welcome!|Excuse me, goodbye.",
            "Q|What time is B's flight?|Ten|Nine|Eleven"),
          reading: R("My flight to Dubai leaves at ten in the morning. I have a passport, a ticket and one bag. After the flight, I will stay in a small hotel near the airport. I have a reservation for three nights.",
            "When does the flight leave?|At ten|At nine|At six", "Where will the writer stay?|In a small hotel|At a friend's house|In a big apartment", "How many nights?|Three|Two|Five"),
          exercises: [
            C("You show your ___ at the airport.", ["passport", "pencil", "pillow"], "passport"),
            C('What is "luggage"?', ["The bags you take on a trip", "A paper pass to travel", "A place to stay"], "The bags you take on a trip"),
            L("I have a reservation", ["I have a question", "I have a vacation"]),
            C("I need a ___ to travel by plane.", ["ticket", "menu", "recipe"], "ticket"),
            O("Put the words in order: I have a reservation at the hotel", "I have a reservation at the hotel"),
            C("The ___ to London is at nine.", ["flight", "luggage", "passport"], "flight")
          ]
        },
        {
          id: "a2-u5-l2", title: "Shopping", ar: "Shopping",
          explanation: "When shopping: How much is it? It's twenty pounds. I'd like this one, please. Can I pay by card?",
          vocab: V("how much|Asking about the price|How much is this shirt?", "cheap|Low in price|This bag is cheap.", "expensive|High in price|That watch is expensive.",
            "size|How big or small clothes are|What size do you wear?", "pay|To give money for something|Can I pay by card?", "discount|A reduction in price|Is there a discount?"),
          talk: T("A|Good afternoon. Can I help you?", "B|Yes, how much is this shirt?|Yes, how many is this shirt?|Yes, how old is this shirt?",
            "A|It is two hundred pounds. We have a discount today.", "B|That's nice! Can I pay by card?|That's nice! Can I pay for card?|That's nice! Can I pay at card?",
            "A|Of course. What size do you wear?", "B|I wear a medium size.|I wear a cheap size.|I wear a discount.",
            "Q|What is the price of the shirt?|Two hundred pounds|Twenty pounds|Two thousand pounds"),
          reading: R("There is a big discount at the market this week. Shirts are cheap, but shoes are expensive. I need a large size. I paid by card and I bought two shirts.",
            "What is cheap?|Shirts|Shoes|Bags", "What size does the writer need?|Large|Small|Medium", "How did the writer pay?|By card|By cash|By phone"),
          exercises: [
            C("___ is this shirt?", ["How much", "How many", "How old"], "How much"),
            C("This watch costs a lot. It's ___.", ["expensive", "cheap", "small"], "expensive"),
            L("Can I pay by card", ["Can I pay by cash", "Can I stay by car"]),
            C("I'd ___ this one, please.", ["like", "likes", "liking"], "like"),
            O("Put the words in order: Is there a discount?", "Is there a discount?"),
            C("What ___ do you wear?", ["size", "sign", "side"], "size")
          ]
        },
        {
          id: "a2-u5-l3", title: "At the hotel", ar: "At the hotel",
          explanation: "At a hotel: I'd like a single room or a double room. When you arrive you check in, and when you leave you check out. The key opens your room.",
          vocab: V("single room|A room for one person|I'd like a single room.", "double room|A room for two people|We need a double room.", "key|The thing that opens a door|Here is your key.",
            "check in|To register when you arrive at a hotel|I want to check in.", "check out|To leave a hotel and pay|We check out at noon.", "receptionist|The person who works at the front desk|The receptionist is kind."),
          talk: T("A|Good evening. Can I help you?", "B|I have a reservation. I'd like to check in.|I have a reservation. I'd like to check out.|I have a key. I'd like a menu.",
            "A|Do you want a single room or a double room?", "B|A double room, please.|A double key, please.|A single menu, please.",
            "A|Here is your key. Breakfast is at seven.", "B|Thank you. What time is check out?|Thank you. Check out now.|Thank you. Check in is the key.",
            "Q|What kind of room does B want?|A double room|A single room|A big suite"),
          reading: R("We arrived at the hotel at eight in the evening. The receptionist was kind. We booked a double room for two nights. Check out is at noon, so we will leave after breakfast.",
            "When did they arrive?|At eight in the evening|At noon|At six in the morning", "How many nights is the stay?|Two|One|Three", "When is check out?|At noon|At eight|At night"),
          exercises: [
            C("You are alone. You want a ___ room.", ["single", "double", "dirty"], "single"),
            C("You open the door with a ___.", ["key", "menu", "bill"], "key"),
            L("We need a double room", ["We need a single room", "We need a double bed"]),
            C("When you arrive at the hotel, you ___.", ["check in", "check out", "pay"], "check in"),
            O("Put the words in order: We check out at noon", "We check out at noon"),
            C('What does "receptionist" describe?', ["The person who works at the front desk", "A waiter in a restaurant", "A thing that opens a door"], "The person who works at the front desk")
          ]
        },
        {
          id: "a2-u5-l4", title: "Asking for help", ar: "Asking for help",
          explanation: "To ask for help politely, say: Could you help me? Could you tell me the way to the station? If you get lost, say: Excuse me, I'm lost.",
          vocab: V("lost|Not knowing where you are|Excuse me, I'm lost.", "map|A drawing of an area|Look at the map.", "address|The place where someone lives or works|What is your address?",
            "nearest|Closest|Where is the nearest bank?", "ask|To say something to get information|Ask the receptionist.", "could|A polite way to ask for something|Could you help me?"),
          talk: T("A|Excuse me, I'm lost. Could you help me?", "B|Of course. Where do you want to go?|Of course. I am lost too yesterday.|Sorry, I could help you to the map.",
            "A|I'm looking for the nearest station.", "B|Go straight and turn left at the bank.|It is a station.|The nearest is a good address.",
            "A|Thank you. Could you show me on the map?", "B|Sure, here you are.|Sure, I'm lost.|Sure, it is the address.",
            "Q|What does A look for?|The nearest station|The nearest bank|A hotel"),
          reading: R("Sara was lost in a new city. She didn't have a map, so she asked a woman. The woman said to go straight, then turn right. The station is next to the bank. Sara said thank you and found the nearest station.",
            "Why did Sara ask a woman?|She was lost|She was late|She was hungry", "What is next to the station?|The bank|The park|The hotel", "What did Sara find?|The nearest station|A map|A hotel"),
          exercises: [
            C("I don't know where I am. I'm ___.", ["lost", "late", "tired"], "lost"),
            C("___ you help me, please?", ["Could", "Did", "Were"], "Could"),
            L("Where is the nearest bank", ["Where is the nearest park", "Where is the biggest bank"]),
            C("You look at a ___ to find the way.", ["map", "key", "ticket"], "map"),
            O("Put the words in order: Could you help me?", "Could you help me?"),
            C('What does "address" mean?', ["The place where someone lives or works", "A drawing of an area", "The closest place"], "The place where someone lives or works")
          ]
        },
        {
          id: "a2-u5-l5", title: "Transport", ar: "Transport",
          explanation: "Ways to travel: bus, train, taxi. We say by bus, by train, by taxi. Places: station (where trains stop) and platform (where you wait for the train).",
          vocab: V("bus|A large vehicle that carries passengers on roads|I go to work by bus.", "train|A vehicle that runs on rails|The train is fast.", "taxi|A car you pay to take you somewhere|Let's take a taxi.",
            "station|A place where trains or buses stop|The station is near.", "platform|The raised area where you wait for a train|The train is on platform two.", "delayed|Later than planned|The flight is delayed."),
          talk: T("A|How do you go to work?", "B|I go by bus.|I go on bus yesterday.|I go by the station.",
            "A|And how do you travel to Alexandria?", "B|I take the train.|I take the platform.|I take the delayed.",
            "A|Is the train fast?", "B|Yes, but sometimes it is delayed.|Yes, but sometimes it is a taxi.|Yes, but sometimes it is platform.",
            "Q|How does B go to work?|By bus|By taxi|By train"),
          reading: R("There are many ways to travel in my city. I go to work by bus because it is cheap. To visit my family, I take the train. The train station has five platforms. Last week the train was delayed, so I took a taxi.",
            "Why does the writer take the bus to work?|It is cheap|It is fast|It is quiet", "How many platforms are there?|Five|Three|Two", "What did the writer do when the train was delayed?|Took a taxi|Waited|Went home"),
          exercises: [
            C("I travel to Alexandria ___ train.", ["by", "on", "at"], "by"),
            C("You wait for the train at the ___.", ["station", "hotel", "market"], "station"),
            L("The train is on platform two", ["The train is on platform five", "The bus is on platform two"]),
            C("The train is late. It is ___.", ["delayed", "early", "quiet"], "delayed"),
            O("Put the words in order: Let's take a taxi", "Let's take a taxi"),
            C('What is a "bus"?', ["A large vehicle that carries passengers on roads", "A vehicle that runs on rails", "A place where trains stop"], "A large vehicle that carries passengers on roads")
          ]
        }
      ]
    }
  ]
});
