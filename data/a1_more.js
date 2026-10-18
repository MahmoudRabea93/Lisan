// A1 إضافات: حيوانات، طيور، فواكه، خضار، مواصلات، ضمائر، أدوات تعريف، حروف جر، أفعال، ظروف، أزمنة، أمر
(function () {
  const a1 = window.COURSES.find(c => c.level === "A1");
  a1.units.push(
    {
      id: "a1-u7", title: "Animals and nature", ar: "الحيوانات والطبيعة", goals: ["talk", "travel"],
      lessons: [
        {
          id: "a1-u7-l1", title: "Animals", ar: "الحيوانات",
          explanation: "Animals have simple names. We say It is a cat for one animal and They are cats for more than one. Add s to make most names plural.",
          vocab: V("cat|A small animal that says meow|The cat is under the table.", "dog|An animal that says woof|My dog is big.", "horse|A large animal that you can ride|The horse is brown.",
            "cow|A big farm animal that gives milk|The cow is in the field.", "lion|A big wild cat from Africa|The lion is strong.", "camel|An animal with one or two humps|The camel is in the desert."),
          talk: T("A|Look! What is that animal?", "B|It is a cat.|It is a horse.|It is a lion.",
            "A|Is it a dog?", "B|No, it is a cow.|No, it is a bird.|Yes, it is a dog.",
            "A|Is the cow big?", "B|Yes, it is very big.|No, it is very small.|Yes, it is a lion.",
            "Q|What is the animal in the field?|A cow|A camel|A dog"),
          reading: R("On the farm there is a cow, a horse and a dog. The cow gives milk. The horse runs fast. The dog is my friend.",
            "What gives milk?|The cow|The horse|The dog", "Which animal runs fast?|The horse|The cow|The dog", "What is the dog?|My friend|A cow|A horse"),
          exercises: [
            C("Which animal says meow?", ["cat", "dog", "horse"], "cat"),
            C("Which animal can you ride?", ["horse", "cow", "lion"], "horse"),
            L("The lion is strong.", ["The lion is big.", "The cat is small."]),
            C("Which animal lives in the desert?", ["camel", "cow", "dog"], "camel"),
            O("Put the words in order: The cat is small", "The cat is small"),
            C("Which word is a big wild cat?", ["lion", "camel", "horse"], "lion")
          ]
        },
        {
          id: "a1-u7-l2", title: "Birds", ar: "الطيور",
          explanation: "A bird has wings and can fly. Some birds cannot fly, like the penguin. We use a bird or birds for one or more birds.",
          vocab: V("bird|An animal with wings and feathers|The bird sings in the morning.", "duck|A bird that swims in water|The duck is in the lake.", "hen|A female chicken|The hen has three eggs.",
            "eagle|A large bird that flies high|The eagle is in the sky.", "owl|A bird that flies at night|The owl sleeps in the day.", "pigeon|A grey bird that lives in cities|The pigeon is on the roof."),
          talk: T("A|Do you see the birds?", "B|Yes, there is a duck on the lake.|Yes, there is a lion on the lake.|Yes, there is a cat on the lake.",
            "A|What is the bird in the sky?", "B|It is an eagle.|It is a camel.|It is a cow.",
            "A|Where is the duck now?", "B|It is on the lake.|It is in the sky.|It is in the kitchen.",
            "Q|Which bird flies at night?|An owl|A duck|A hen"),
          reading: R("In my village there are many birds. Ducks swim in the lake. A hen walks in the yard. At night, an owl sits on a tree.",
            "Where do ducks swim?|In the lake|In the yard|In the sky", "Which bird flies at night?|An owl|A hen|A duck", "Where does the hen walk?|In the yard|On the lake|In the sky"),
          exercises: [
            C("Which bird swims in water?", ["duck", "owl", "eagle"], "duck"),
            C("Which bird flies high in the sky?", ["eagle", "hen", "pigeon"], "eagle"),
            L("The owl sleeps in the day.", ["The owl sleeps at night.", "The duck flies high."]),
            C("Which bird is a female chicken?", ["hen", "owl", "pigeon"], "hen"),
            O("Put the words in order: The bird sings", "The bird sings"),
            C("Which bird lives in cities?", ["pigeon", "eagle", "duck"], "pigeon")
          ]
        },
        {
          id: "a1-u7-l3", title: "Fruits", ar: "الفاكهة",
          explanation: "We eat fruit every day. We say I like bananas (more than one) and I eat an orange (one). Use an before a word that starts with a vowel sound.",
          vocab: V("apple|A round fruit that is red or green|I eat an apple every day.", "banana|A long yellow fruit|The banana is sweet.", "orange|A round fruit that is orange in color|I drink orange juice.",
            "grape|A small round fruit that grows in bunches|The grapes are green.", "mango|A sweet yellow or orange fruit|Mango is my favorite fruit.", "lemon|A sour yellow fruit|I need a lemon for the tea."),
          talk: T("A|What fruit do you like?", "B|I like mangoes and grapes.|I like tomatoes and onions.|I like fish and rice.",
            "A|Do you have an apple?", "B|Yes, I have a red apple.|No, I have a lion.|Yes, I have a cow.",
            "A|Do you like lemon?", "B|Yes, I like lemon in tea.|No, I like a horse.|Yes, I like a bus.",
            "Q|What fruit is sour and yellow?|A lemon|A banana|A grape"),
          reading: R("Every morning, I eat a banana. In the afternoon, I drink orange juice. My mother buys apples and grapes at the market. Mango is my favorite fruit.",
            "What does the writer eat in the morning?|A banana|An apple|A mango", "What fruit is the favorite?|Mango|Grapes|Lemon", "Where does the mother buy apples?|At the market|At school|At the bank"),
          exercises: [
            C("Which fruit is long and yellow?", ["banana", "apple", "grape"], "banana"),
            C("Which fruit is sour?", ["lemon", "mango", "orange"], "lemon"),
            L("I eat an apple every day.", ["I eat a banana every day.", "I drink orange juice."]),
            C("Which word is a small round fruit in bunches?", ["grape", "lemon", "mango"], "grape"),
            O("Put the words in order: I like mangoes", "I like mangoes"),
            C("Which fruit is sweet and yellow?", ["mango", "tomato", "onion"], "mango")
          ]
        },
        {
          id: "a1-u7-l4", title: "Vegetables", ar: "الخضار",
          explanation: "Vegetables are good for health. We say a tomato and tomatoes. For more than one potato we say potatoes, and for more than one tomato we say tomatoes.",
          vocab: V("tomato|A red round vegetable used in salad|The tomato is red.", "potato|A brown vegetable that grows under the ground|I cook the potato.", "onion|A vegetable that makes you cry when you cut it|The onion is white inside.",
            "carrot|A long orange vegetable|The carrot is good for the eyes.", "cucumber|A long green vegetable used in salad|We eat cucumber with bread.", "garlic|A small white vegetable with a strong smell|I put garlic in the food."),
          talk: T("A|What do you need from the market?", "B|I need tomatoes and potatoes.|I need a bus and a train.|I need a car and a bike.",
            "A|Do you want carrots too?", "B|Yes, I want carrots and cucumbers.|Yes, I want a plane.|No, I want a taxi.",
            "A|Do you like onions?", "B|Yes, they are in the salad.|No, they fly in the sky.|Yes, they are a bus.",
            "Q|Which vegetable is orange and long?|A carrot|An onion|A tomato"),
          reading: R("My mother makes a big salad every day. She uses tomatoes, cucumbers and onions. She cooks potatoes in the evening. We put garlic in the food because it is tasty.",
            "What is in the salad?|Tomatoes and cucumbers|Oranges and grapes|Bananas and apples", "When does she cook potatoes?|In the evening|In the morning|At night", "Why do we put garlic in the food?|Because it is tasty|Because it is cold|Because it is sweet"),
          exercises: [
            C("Which vegetable makes you cry when you cut it?", ["onion", "carrot", "cucumber"], "onion"),
            C("Which vegetable is red and used in salad?", ["tomato", "potato", "garlic"], "tomato"),
            L("I cook the potato.", ["I cook the carrot.", "I eat the cucumber."]),
            C("Which vegetable is long and green?", ["cucumber", "garlic", "potato"], "cucumber"),
            O("Put the words in order: We eat tomatoes", "We eat tomatoes"),
            C("Which vegetable is brown and grows under the ground?", ["potato", "tomato", "carrot"], "potato")
          ]
        },
        {
          id: "a1-u7-l5", title: "Transport", ar: "المواصلات",
          explanation: "We use transport to go from place to place. We say by bus, by car, by taxi, and by train. We use on foot for walking.",
          vocab: V("car|A vehicle with four wheels|My car is new.", "bus|A big vehicle that carries many people|I take the bus to school.", "taxi|A car you pay to ride in|We take a taxi to the airport.",
            "train|A long vehicle that runs on tracks|The train is fast.", "bicycle|A vehicle with two wheels that you pull with your feet|I ride my bicycle in the park.", "plane|A vehicle that flies in the sky|The plane is at the airport."),
          talk: T("A|How do you go to work?", "B|I go by bus.|I go by lion.|I go by apple.",
            "A|Is it far?", "B|No, it is near. I go by bicycle.|Yes, I go by taxi.|No, I go by car.",
            "A|What do you use for a short trip?", "B|I use my bicycle.|I use a plane.|I use a lion.",
            "Q|How do you travel to the airport?|By plane|By bicycle|On foot"),
          reading: R("Ali goes to school by bus. His sister goes by bicycle. My father has a car, and he drives to work. When we travel far, we take a train or a plane.",
            "How does Ali go to school?|By bus|By train|By plane", "How does the sister go?|By bicycle|By car|By bus", "What do we take when we travel far?|A train or a plane|A bus or a bicycle|A car or a horse"),
          exercises: [
            C("Which vehicle flies in the sky?", ["plane", "bus", "bicycle"], "plane"),
            C("Which vehicle has two wheels?", ["bicycle", "car", "train"], "bicycle"),
            L("I take the bus to school.", ["I take the train to school.", "I ride my bicycle to school."]),
            C("How do you go to the airport? I go ___ taxi.", ["by", "on", "in"], "by"),
            O("Put the words in order: The train is fast", "The train is fast"),
            C("Which vehicle carries many people?", ["bus", "car", "bicycle"], "bus")
          ]
        }
      ]
    },
    {
      id: "a1-u8", title: "Grammar basics", ar: "أساسيات القواعد", goals: ["talk", "work"],
      lessons: [
        {
          id: "a1-u8-l1", title: "Pronouns", ar: "الضمائر",
          explanation: "Pronouns replace nouns. I, you, he, she, it, we, they are subject pronouns (they do the action). Me, you, him, her, it, us, them are object pronouns (they receive the action). Example: I see her. She sees me.",
          vocab: V("I|The person who speaks|I am a student.", "we|A group that includes the speaker|We are friends.", "they|More than one person or thing|They are my teachers.",
            "him|The object pronoun for a man or boy|I see him every day.", "her|The object pronoun for a woman or girl|I call her on Friday.", "us|The object pronoun for we|The teacher helps us."),
          talk: T("A|Do you know Sara?", "B|Yes, I know her well.|Yes, I know him well.|Yes, I know them well.",
            "A|Where is Omar?", "B|He is in the kitchen.|She is in the kitchen.|They are in the kitchen.",
            "A|Is Omar at school?", "B|No, he is at home.|No, she is at home.|No, we are at home.",
            "Q|Which pronoun is for a woman?|She|He|They"),
          reading: R("Omar is my brother. He is a doctor. Sara is my sister. She is a teacher. We live in Cairo. They visit us on Friday.",
            "Who is a doctor?|Omar|Sara|The writer", "Who is a teacher?|Sara|Omar|The brother", "Where do they live?|In Cairo|In Alexandria|In London"),
          exercises: [
            C("Complete: ___ am a student.", ["I", "Me", "Him"], "I"),
            C("Complete: The teacher helps ___.", ["us", "we", "they"], "us"),
            L("I see him every day.", ["I see her every day.", "We see them every day."]),
            C("Complete: ___ is my sister. (a woman)", ["She", "He", "It"], "She"),
            O("Put the words in order: They are my friends", "They are my friends"),
            C("Which pronoun is for a group of people with me?", ["we", "you", "it"], "we")
          ]
        },
        {
          id: "a1-u8-l2", title: "Articles: a, an, the", ar: "أدوات التعريف والتنكير",
          explanation: "Use a before a consonant sound: a book, a teacher. Use an before a vowel sound: an apple, an engineer. Use the for a specific thing that both people know: the book on the table. We do not use a or an with more than one thing.",
          vocab: V("a|Used before a word that starts with a consonant sound|I have a car.", "an|Used before a word that starts with a vowel sound|She is an engineer.", "the|Used for a specific thing|The door is open.",
            "book|Pages with words that you read|The book is on the table.", "engineer|A person who designs and builds things|My uncle is an engineer.", "door|The thing you open to enter a room|Close the door, please."),
          talk: T("A|Is that a car or a bus?", "B|It is a bus.|It is an apple.|It is the sun.",
            "A|Is there an apple on the table?", "B|Yes, there is an apple.|Yes, there is a orange.|No, there is a car.",
            "A|Is that a bus?", "B|Yes, it is a bus.|No, it is an egg.|No, it is the sun.",
            "Q|Which word comes before engineer?|An|A|The"),
          reading: R("I have a brother. He is an engineer. He has a car and an old bicycle. The car is in the garage. The bicycle is next to the door.",
            "What is the brother?|An engineer|A doctor|A driver", "Where is the car?|In the garage|In the kitchen|On the bus", "What is next to the door?|The bicycle|The car|The bus"),
          exercises: [
            C("Complete: I have ___ apple.", ["an", "a", "the"], "an"),
            C("Complete: She is ___ engineer.", ["an", "a", "the"], "an"),
            L("The door is open.", ["A door is open.", "An door is open."]),
            C("Complete: ___ book is on the table. (the specific book)", ["The", "A", "An"], "The"),
            O("Put the words in order: I have a car", "I have a car"),
            C("Which article do we use before a vowel sound?", ["an", "a", "the"], "an")
          ]
        },
        {
          id: "a1-u8-l3", title: "Prepositions: at, on, in, to, from", ar: "حروف الجر",
          explanation: "We use at with time: at six. We use on with days: on Monday. We use in with months, years and places: in June, in Cairo. We use to for direction: to school. We use from for the start: from Cairo.",
          vocab: V("at|Used with exact times|I wake up at six.", "on|Used with days|I work on Sunday.", "in|Used with months and places|My birthday is in June.",
            "to|Used to show direction|I go to school.", "from|Used to show the start|I am from Egypt.", "with|Together with someone|I go with my friend."),
          talk: T("A|When do you go to school?", "B|I go at eight.|I go on Sunday.|I go in June.",
            "A|When is your birthday?", "B|It is in June.|It is at six.|It is on Monday.",
            "A|Where do you live?", "B|I live in Cairo.|I live on Sunday.|I live at Sunday.",
            "Q|Which word is used with days?|On|At|In"),
          reading: R("I wake up at six. I go to school on Sunday. My school is in Cairo. I go with my friend. We walk from home to school.",
            "When does the writer wake up?|At six|On Sunday|In June", "Where is the school?|In Cairo|At home|In the market", "Who does the writer go with?|A friend|A teacher|The bus"),
          exercises: [
            C("Complete: I wake up ___ six.", ["at", "on", "in"], "at"),
            C("Complete: I work ___ Monday.", ["on", "at", "in"], "on"),
            L("My birthday is in June.", ["My birthday is on June.", "My birthday is at June."]),
            C("Complete: I go ___ school.", ["to", "from", "with"], "to"),
            O("Put the words in order: I am from Egypt", "I am from Egypt"),
            C("Complete: My school is ___ Cairo.", ["in", "on", "at"], "in")
          ]
        }
      ]
    },
    {
      id: "a1-u9", title: "Verbs and time", ar: "الأفعال والزمن", goals: ["talk", "work", "travel"],
      lessons: [
        {
          id: "a1-u9-l1", title: "Action verbs", ar: "أفعال الحركة والعمل",
          explanation: "Action verbs show what we do: go, eat, drink, read, write, play, study, work, sleep. With I, you, we, they use the base verb: I read. With he, she, it add s: she reads.",
          vocab: V("go|To move to a place|I go to school.", "read|To look at words and understand them|I read a book.", "write|To make words on paper|She writes a letter.",
            "play|To do a fun activity|The children play in the park.", "study|To learn about something|We study English.", "sleep|To rest at night with your eyes closed|I sleep at eleven."),
          talk: T("A|What do you do in the evening?", "B|I read a book.|I drive a plane.|I sell a horse.",
            "A|Do you play football?", "B|Yes, I play on Friday.|No, I sleep at six.|Yes, I write apples.",
            "A|Where do the children go after school?", "B|They go to the park.|They go to the bank.|They go to the hospital.",
            "Q|What does the child do in the park?|Play|Sleep|Cook"),
          reading: R("Sara studies English every day. She reads a book at night. On Friday, she plays football with her friends. She sleeps at eleven.",
            "What does Sara study?|English|Math|Music", "When does she play football?|On Friday|Every night|At six", "When does she sleep?|At eleven|At six|In June"),
          exercises: [
            C("Complete: She ___ a book every night.", ["reads", "read", "reading"], "reads"),
            C("Complete: I ___ to school every day.", ["go", "goes", "going"], "go"),
            L("We study English.", ["We study French.", "We write English."]),
            C("Which verb means to make words on paper?", ["write", "sleep", "play"], "write"),
            O("Put the words in order: She reads a book", "She reads a book"),
            C("Complete: They ___ in the park.", ["play", "plays", "playing"], "play")
          ]
        },
        {
          id: "a1-u9-l2", title: "Adverbs of time and place", ar: "ظروف الزمان والمكان",
          explanation: "Adverbs of time tell when: today, yesterday, tomorrow, now, always. Adverbs of place tell where: here, there, outside, inside. Example: I read a book today. The cat is inside.",
          vocab: V("today|This day|I work today.", "yesterday|The day before today|I went to school yesterday.", "tomorrow|The day after today|We travel tomorrow.",
            "now|At this moment|I am reading now.", "here|In this place|Come here, please.", "there|In that place|The bus is there."),
          talk: T("A|Where is the bank?", "B|It is there, next to the market.|It is yesterday.|It is tomorrow.",
            "A|When do you study?", "B|I study today.|I study here.|I study inside.",
            "A|Where is your bag?", "B|It is here.|It is yesterday.|It is tomorrow.",
            "Q|Which word is about time?|Tomorrow|There|Here"),
          reading: R("Yesterday I went to the market. Today I am at home. Tomorrow I will visit my grandmother. Now I am reading a book here in the living room.",
            "When did the writer go to the market?|Yesterday|Today|Tomorrow", "Where is the writer now?|At home|At the market|At school", "When will the writer visit the grandmother?|Tomorrow|Yesterday|Now"),
          exercises: [
            C("Which word means the day before today?", ["yesterday", "tomorrow", "now"], "yesterday"),
            C("Complete: I will travel ___.", ["tomorrow", "yesterday", "here"], "tomorrow"),
            L("Come here, please.", ["Come there, please.", "Go outside, please."]),
            C("Which word means at this moment?", ["now", "there", "yesterday"], "now"),
            O("Put the words in order: I am reading now", "I am reading now"),
            C("Which word is about place?", ["inside", "today", "now"], "inside")
          ]
        },
        {
          id: "a1-u9-l3", title: "Present, past and imperative", ar: "المضارع والماضي والأمر",
          explanation: "Present simple for habits: I work every day. Past simple for finished actions: I worked yesterday. Many past verbs add ed: work, worked. Some are irregular: go, went; eat, ate. Imperative gives an order or advice: Sit down. Open the door. Do not use a subject with the imperative.",
          vocab: V("work|To do your job|I work every day.", "worked|Past form of work|I worked yesterday.", "went|Past form of go|She went to the market.",
            "ate|Past form of eat|We ate rice last night.", "open|Make a door or window not closed|Open the window, please.", "close|Make a door or window not open|Close the door, please."),
          talk: T("A|Did you go to school yesterday?", "B|Yes, I went to school.|Yes, I go to school.|Yes, I will go to school.",
            "A|Please open the window.", "B|OK, I will open it.|OK, I opened the bus.|OK, I am a window.",
            "A|Did you work yesterday?", "B|Yes, I worked yesterday.|No, I work yesterday.|Yes, I works yesterday.",
            "Q|What is the past of go?|Went|Goes|Going"),
          reading: R("Last week, I worked in the shop. Yesterday, I ate lunch with my mother. Today I work at home. My teacher says: Read the lesson, please. Close the book now.",
            "When did the writer work in the shop?|Last week|Today|Tomorrow", "What did the writer eat yesterday?|Lunch|Breakfast|Dinner", "What does the teacher say?|Read the lesson|Go to the bank|Eat the orange"),
          exercises: [
            C("Complete the past: Yesterday I ___ to the market. (go)", ["went", "go", "goes"], "went"),
            C("Complete the past: We ___ rice last night. (eat)", ["ate", "eat", "eats"], "ate"),
            L("Open the window, please.", ["Close the window, please.", "Open the door, please."]),
            C("Complete the past: I ___ in the shop last week. (work)", ["worked", "work", "works"], "worked"),
            O("Put the words in order: Sit down, please", "Sit down, please"),
            C("Which sentence is an order?", ["Close the door.", "I close the door every day.", "She closed the door yesterday."], "Close the door.")
          ]
        }
      ]
    }
  );
})();
