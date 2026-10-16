// Level A1: 6 units
// Helpers C / O / L / V are defined in helpers.js
window.COURSES = window.COURSES || [];
window.COURSES.push({
  level: "A1",
  units: [
    {
      id: "a1-u1", title: "Introductions", goals: ["talk", "work", "travel"],
      lessons: [
        {
          id: "a1-u1-l1", title: "Greetings", ar: "Greetings",
          explanation: "Use Hello in any situation, and Hi with friends. Good morning is for the morning, Good evening is for the evening, and Goodbye is for leaving. To ask how someone is, say: How are you? The usual answer is: I'm fine, thank you.",
          vocab: V("Hello|A common greeting|Hello, how are you?", "Hi|An informal greeting, used with friends|Hi, Sara!", "Good morning|A greeting used before noon|Good morning, teacher.",
            "Good evening|A greeting used after sunset|Good evening, everyone.", "Goodbye|A word used when leaving|Goodbye, see you tomorrow.",
            "fine|In good health or good condition|I'm fine, thank you.", "Thank you|Words you say to show gratitude|Thank you for your help."),
          talk: T("A|Good morning! How are you?", "B|I'm fine, thank you. And you?|My name is Omar.|It is six o'clock.",
            "A|I'm fine too. What is your name?", "B|My name is Sara.|I'm fine, thanks.|Goodbye, Sara.",
            "A|Nice to meet you, Sara.", "B|Nice to meet you too.|You're welcome.|I am twenty.",
            "Q|What does A ask first?|How are you?|What time is it?|Where is the bank?"),
          reading: R("Sara meets Omar in the morning. She says hello and asks how he is. Omar is fine. At the end, they say goodbye and go to work.",
            "When do they meet?|In the morning|In the evening|At night", "How is Omar?|He is fine|He is late|He is hungry",
            "What do they do at the end?|They say goodbye|They eat lunch|They study"),
          exercises: [
            C("Which greeting is best for the morning?", ["Good morning", "Good night", "Goodbye"], "Good morning"),
            C("You meet a friend. What do you say?", ["Hi", "Goodbye", "Thank you"], "Hi"),
            L("Good morning", ["Good evening", "Good night"]),
            C('What is a good meaning of "Goodbye"?', ["Leaving, saying farewell", "Greeting someone in the morning", "Saying thank you"], "Leaving, saying farewell"),
            O("Put the words in order: How are you?", "How are you?"),
            C("How are you?", ["I'm fine, thank you.", "My name is Sara.", "Goodbye."], "I'm fine, thank you.")
          ]
        },
        {
          id: "a1-u1-l2", title: "Introducing yourself", ar: "Introducing yourself",
          explanation: "To say your name, use My name is ... To say where you are from, use I am from ... You can shorten I am to I'm.",
          vocab: V("name|The word you are called by|My name is Omar.", "from|Showing the place someone comes from|I am from Egypt.", "Egypt|A country in North Africa|I live in Egypt.",
            "Cairo|The capital city of Egypt|Cairo is a big city.", "I'm|Short form of I am|I'm a student."),
          talk: T("A|Hello! What is your name?", "B|My name is Omar.|I am from Cairo.|I'm fine, thank you.",
            "A|Nice to meet you, Omar. Where are you from?", "B|I am from Egypt.|My name is Egypt.|I am twenty.",
            "A|Oh, I'm from Egypt too! I am from Cairo.", "B|I am from Alexandria.|My name is Cairo.|Thank you, goodbye.",
            "Q|Where is A from?|Cairo|Alexandria|London"),
          reading: R("My name is Mona. I am from Cairo. I am a student. My brother Ali is twenty years old. He is a doctor.",
            "Where is Mona from?|Cairo|Alexandria|London", "What is Ali's job?|Doctor|Student|Teacher", "How old is Ali?|Twenty|Ten|Thirty"),
          exercises: [
            C("Complete: My ___ is Omar.", ["name", "from", "old"], "name"),
            C("Complete: I am ___ Egypt. (I come from Egypt)", ["from", "on", "to"], "from"),
            L("I am from Cairo", ["I am a doctor", "I am twenty"]),
            O("Put the words in order: My name is Mona", "My name is Mona"),
            O("Put the words in order: I am from Cairo", "I am from Cairo"),
            C('What is the short form of "I am"?', ["I'm", "Im", "I'am"], "I'm")
          ]
        },
        {
          id: "a1-u1-l3", title: "The verb to be", ar: "The verb to be",
          explanation: "Use am with I, is with he / she / it, and are with you / we / they. Examples: I am a student. She is a doctor. They are friends.",
          vocab: V("student|A person who studies at a school or university|She is a student.", "teacher|A person who teaches|My teacher is kind.", "doctor|A person who treats sick people|He is a doctor.",
            "sister|A female sibling|She is my sister.", "friends|People you like and spend time with|They are my friends."),
          talk: T("A|Are you a student?", "B|Yes, I am.|Yes, he is.|Yes, they are.",
            "A|Is your sister a student too?", "B|No, she is a doctor.|No, I am a doctor.|No, they are doctors.",
            "A|Are your parents doctors too?", "B|No, they are teachers.|No, he is a teacher.|Yes, I am a teacher.",
            "Q|What is B's sister?|A doctor|A student|A teacher"),
          reading: R("Ahmed and Sara are friends. Ahmed is a teacher. Sara is a doctor. They are from Egypt. They are in Cairo today.",
            "What is Ahmed?|A teacher|A doctor|A student", "Where are they from?|Egypt|England|France", "Who is a doctor?|Sara|Ahmed|Both of them"),
          exercises: [
            C("I ___ a teacher.", ["am", "is", "are"], "am"),
            C("She ___ my sister.", ["am", "is", "are"], "is"),
            L("They are students", ["She is a student", "We are students"]),
            C("They ___ students.", ["am", "is", "are"], "are"),
            O("Put the words in order: He is a doctor", "He is a doctor"),
            C("We ___ from Egypt.", ["am", "is", "are"], "are")
          ]
        },
        {
          id: "a1-u1-l4", title: "Polite phrases", ar: "Polite phrases",
          explanation: "Polite phrases we use every day: Please (used to ask politely), Sorry (to apologize), Excuse me (to get attention or pass someone), Welcome (to greet a guest), Nice to meet you (said when meeting someone). The usual reply to Thank you is You're welcome.",
          vocab: V("please|A polite word used when asking for something|Sit down, please.", "sorry|Used to apologize|Sorry, I'm late.", "excuse me|Used to get someone's attention politely|Excuse me, where is the bank?",
            "welcome|Used to greet a guest|Welcome to Cairo.", "nice to meet you|Said when you meet someone for the first time|Nice to meet you, Sara.", "you're welcome|The reply to thank you|You're welcome!"),
          talk: T("A|Excuse me, can I sit here?", "B|Yes, please sit down.|No, thank you, goodbye.|Yes, I'm twenty.",
            "A|Thank you very much!", "B|You're welcome.|Excuse me.|Good morning.",
            "A|My name is Ali. Nice to meet you.", "B|Nice to meet you too, Ali.|Sorry, I'm fine.|Welcome to the bank.",
            "Q|What does A want?|To sit down|To buy a ticket|To open the window"),
          reading: R("Welcome to our school! Please sit down. Sorry, we are late today. Thank you for your help. Nice to meet you all.",
            "Where are the people?|At school|At a bank|At a market", "What do they say about today?|They are late|They are hungry|They are young",
            "What does \"Welcome\" mean?|Greeting a guest|Saying goodbye|Apologizing"),
          exercises: [
            C('Someone says "Thank you". You say: ___.', ["You're welcome", "Excuse me", "Goodbye"], "You're welcome"),
            C("You step on someone's foot. You say: ___.", ["Sorry", "Welcome", "Please"], "Sorry"),
            L("Nice to meet you", ["Nice to see you", "Thank you very much"]),
            C("You want to ask a stranger a question. You say: ___.", ["Excuse me", "You're welcome", "Good night"], "Excuse me"),
            O("Put the words in order: Sit down, please", "Sit down, please"),
            C('What does "please" mean?', ["A polite word for asking", "An apology", "A thank you"], "A polite word for asking")
          ]
        },
        {
          id: "a1-u1-l5", title: "Question words", ar: "Question words",
          explanation: "Question words: What (what), Where (where), Who (who), When (when), Why (why). Examples: What is your name? Where are you from? Who is he?",
          vocab: V("what|Used to ask about things|What is this?", "where|Used to ask about a place|Where are you from?", "who|Used to ask about a person|Who is he?",
            "when|Used to ask about time|When is the class?", "why|Used to ask for a reason|Why are you late?"),
          talk: T("A|Where are you from?", "B|I am from Egypt.|My name is Ali.|It is six o'clock.",
            "A|What is your job?", "B|I am a teacher.|I am from Cairo.|Yes, I am.",
            "A|When is your class?", "B|It is on Sunday.|It is in the kitchen.|I am fine.",
            "Q|What is B's job?|A teacher|A doctor|A student"),
          reading: R("Who is Mr. Hassan? He is my English teacher. Where is he from? He is from Cairo. When is his class? His class is on Monday. I like him because he is kind.",
            "Who is Mr. Hassan?|An English teacher|A doctor|A driver", "When is his class?|On Monday|On Friday|On Sunday", "Where is Mr. Hassan from?|Cairo|London|Giza"),
          exercises: [
            C("___ is your name?", ["What", "Where", "When"], "What"),
            C("___ are you from? I'm from Egypt.", ["Where", "Who", "Why"], "Where"),
            L("Where are you from", ["Where are you going", "Who are you with"]),
            C("___ is that man? He is my teacher.", ["Who", "When", "Where"], "Who"),
            O("Put the words in order: When is the class?", "When is the class?"),
            C('What does "why" ask about?', ["The reason", "The time", "The place"], "The reason")
          ]
        }
      ]
    },
    {
      id: "a1-u2", title: "Daily life", goals: ["talk", "travel"],
      lessons: [
        {
          id: "a1-u2-l1", title: "Numbers 1-10", ar: "Numbers 1-10",
          explanation: "Numbers 1 to 10: one, two, three, four, five, six, seven, eight, nine, ten.",
          vocab: V("one|The number 1|I have one brother.", "two|The number 2|I have two sisters.", "three|The number 3|There are three chairs.",
            "four|The number 4|He has four books.", "five|The number 5|I wait five minutes.", "six|The number 6|It is six o'clock.",
            "seven|The number 7|A week has seven days.", "eight|The number 8|I sleep eight hours.", "nine|The number 9|She is nine years old.", "ten|The number 10|I have ten pens."),
          talk: T("A|How many books do you have?", "B|I have five books.|I am five years old.|It is five o'clock.",
            "A|And how many pens?", "B|I have two pens.|I have two years.|Yes, two.",
            "A|Great! I have ten pens.", "B|Ten? That's a lot!|Ten is a day.|I'm twelve.",
            "Q|How many pens does B have?|Two|Five|Ten"),
          reading: R("I have a small family. There are four people: my father, my mother, my brother and me. I have two pens and three books in my bag.",
            "How many people are in the family?|Four|Three|Five", "How many pens are in the bag?|Two|Three|Four", "How many books are in the bag?|Three|Two|Four"),
          exercises: [
            C("What is the number 3?", ["three", "two", "five"], "three"),
            C('What is "seven" in numbers?', ["7", "6", "9"], "7"),
            L("seven", ["six", "ten"]),
            C('Which number comes after "nine"?', ["ten", "eight", "six"], "ten"),
            C("How do you write 5 in words?", ["five", "four", "nine"], "five"),
            O("Put the words in order: I have two brothers", "I have two brothers")
          ]
        },
        {
          id: "a1-u2-l2", title: "Age", ar: "Age",
          explanation: "To ask about age, say How old are you? The answer is: I am 25 years old. We write years old after the number.",
          vocab: V("age|How old someone is|What is your age?", "year|A period of twelve months|I am twenty years old.", "twenty|The number 20|He is twenty.",
            "brother|A male sibling|My brother is ten.", "How old are you?|A question asking about age|How old are you, Ahmed?"),
          talk: T("A|How old are you?", "B|I am twenty years old.|I am from Cairo.|I'm fine, thank you.",
            "A|And how old is your brother?", "B|He is ten years old.|He is a student.|He is in Cairo.",
            "A|He is young! Is he in school?", "B|Yes, he is.|Yes, I am twenty.|No, it is ten.",
            "Q|How old is B?|Twenty|Ten|Thirty"),
          reading: R("Mona is eighteen years old. Her sister Dina is twenty. Her brother Karim is only nine. They are all students.",
            "How old is Karim?|Nine|Eighteen|Twenty", "Who is twenty?|Dina|Mona|Karim", "What are they?|Students|Doctors|Teachers"),
          exercises: [
            C("How ___ are you?", ["old", "many", "much"], "old"),
            O("Put the words in order: I am twenty years old", "I am twenty years old"),
            L("I am twenty years old", ["I am twelve years old", "I am thirty years old"]),
            C("I am ten ___ old.", ["years", "year", "ages"], "years"),
            C('What does "How old are you?" ask about?', ["Your age", "Your name", "Your country"], "Your age"),
            O("Put the words in order: How old are you?", "How old are you?")
          ]
        },
        {
          id: "a1-u2-l3", title: "Numbers 11-20", ar: "Numbers 11-20",
          explanation: "Numbers: eleven (11), twelve (12), thirteen (13), fourteen (14), fifteen (15), sixteen (16), seventeen (17), eighteen (18), nineteen (19), twenty (20). Numbers from 13 to 19 end with teen.",
          vocab: V("eleven|The number 11|I have eleven books.", "twelve|The number 12|There are twelve months in a year.", "thirteen|The number 13|He is thirteen years old.",
            "fifteen|The number 15|I need fifteen minutes.", "seventeen|The number 17|She is seventeen.", "eighteen|The number 18|My sister is eighteen."),
          talk: T("A|How many students are in your class?", "B|There are fifteen students.|I am fifteen years old.|It is in the class.",
            "A|And how many teachers?", "B|Only two teachers.|Only two minutes.|I am a teacher.",
            "A|That's a good class! How old are the students?", "B|They are seventeen or eighteen.|They are seven o'clock.|They are in Cairo.",
            "Q|How many students are in the class?|Fifteen|Fifty|Five"),
          reading: R("My school has twelve classes. Each class has about nineteen students. My class is number thirteen. My brother is in class eleven.",
            "How many classes does the school have?|Twelve|Thirteen|Eleven", "What is the number of the writer's class?|Thirteen|Twelve|Nineteen",
            "Which class is the brother in?|Eleven|Twelve|Nineteen"),
          exercises: [
            C("What is the number 12 in words?", ["twelve", "twenty", "two"], "twelve"),
            C("Which is fifteen in numbers?", ["15", "50", "5"], "15"),
            L("I am seventeen", ["I am seventy", "I am eleven"]),
            C('Which number ends with "teen"?', ["thirteen", "twelve", "eleven"], "thirteen"),
            O("Put the words in order: He is eighteen years old", "He is eighteen years old"),
            C("There are ___ months in a year.", ["twelve", "eleven", "ten"], "twelve")
          ]
        },
        {
          id: "a1-u2-l4", title: "Colors", ar: "Colors",
          explanation: "Colors: red, blue, green, yellow, black, white. We put the color before the noun: a red car, a blue pen.",
          vocab: V("red|The color of blood or a tomato|I have a red car.", "blue|The color of the sky on a clear day|The sky is blue.", "green|The color of grass|Grass is green.",
            "yellow|The color of the sun or a banana|A banana is yellow.", "black|The darkest color|She has a black bag.", "white|The color of snow or milk|My shirt is white."),
          talk: T("A|What color is your new car?", "B|It is red.|It is a car.|It is five.",
            "A|I like red! And what color is your bag?", "B|My bag is black.|My bag is on the table.|It is in Cairo.",
            "A|Black is nice too. Is your shirt white?", "B|Yes, it is white.|Yes, I am tall.|No, I have two.",
            "Q|What color is B's car?|Red|Blue|Green"),
          reading: R("Ali has a red car and a blue bag. His sister has a green bag and a yellow shirt. They like colors. The sky is blue today.",
            "What color is Ali's car?|Red|Blue|Green", "What color is the sister's bag?|Green|Yellow|Red", "What color is the sky?|Blue|Yellow|Black"),
          exercises: [
            C("The sky is ___.", ["blue", "red", "black"], "blue"),
            C("What color is grass?", ["green", "white", "yellow"], "green"),
            L("I have a red car", ["I have a blue car", "I have a black car"]),
            C('Which color is a banana?', ["yellow", "green", "red"], "yellow"),
            O("Put the words in order: She has a black bag", "She has a black bag"),
            C("a ___ shirt (the color of milk)", ["white", "wait", "write"], "white")
          ]
        },
        {
          id: "a1-u2-l5", title: "Daily routine", ar: "Daily routine",
          explanation: "We use the simple present for daily habits with I / you / we / they: I wake up at six. I go to work at eight. We use at before the time.",
          vocab: V("wake up|To stop sleeping in the morning|I wake up at six.", "go to work|To travel to your job|I go to work by bus.", "come home|To return to your house|We come home at five.",
            "take a shower|To wash your body with water|I take a shower every morning.", "go to bed|To go to sleep at night|They go to bed at eleven.", "every day|On each day|I study every day."),
          talk: T("A|What time do you wake up?", "B|I wake up at six.|I wake up in Cairo.|I'm twenty.",
            "A|And when do you go to work?", "B|I go to work at eight.|It is eight years old.|I am fine.",
            "A|When do you come home?", "B|I come home at five.|I go to bed at five in the morning.|I am a student.",
            "Q|When does B come home?|At five|At six|At eight"),
          reading: R("I wake up at six every day. First, I take a shower. Then I go to work by bus at eight. I come home at five and go to bed at eleven.",
            "When does the writer wake up?|At six|At eight|At eleven", "How does the writer go to work?|By bus|By car|By taxi", "When does the writer go to bed?|At eleven|At five|At six"),
          exercises: [
            C("I ___ at six in the morning.", ["wake up", "wakes up", "woke up"], "wake up"),
            C("We ___ at five.", ["come home", "comes home", "came home"], "come home"),
            L("I go to bed at eleven", ["I go to work at eleven", "I go to bed at seven"]),
            C('What does "go to work" mean?', ["To travel to your job", "To wake up", "To take a shower"], "To travel to your job"),
            O("Put the words in order: I go to work by bus", "I go to work by bus"),
            C("I take a shower ___ day.", ["every", "all", "each one"], "every")
          ]
        }
      ]
    },
    {
      id: "a1-u3", title: "Family", goals: ["talk"],
      lessons: [
        {
          id: "a1-u3-l1", title: "My family", ar: "My family",
          explanation: "Family words: mother, father, parents (both parents), brother, sister, family. Example: This is my family. I have one brother and two sisters.",
          vocab: V("mother|Your female parent|My mother is a teacher.", "father|Your male parent|My father works in a bank.", "parents|Your mother and father|My parents live in Cairo.",
            "family|The people you are related to|I love my family.", "son|A male child|He has one son.", "daughter|A female child|She has a daughter."),
          talk: T("A|Do you have a big family?", "B|Yes, I have two sisters and one brother.|Yes, I am a big family.|No, I am twenty.",
            "A|And what do your parents do?", "B|My father is a doctor and my mother is a teacher.|My father is in the kitchen.|My parents are twenty years old.",
            "A|That's nice. Where do they live?", "B|They live in Cairo.|They are my sisters.|They like tea.",
            "Q|What is B's mother?|A teacher|A doctor|A nurse"),
          reading: R("This is my family. My father is Hassan and my mother is Laila. I have one brother and two sisters. My brother is a student. My sisters are small.",
            "How many sisters does the writer have?|Two|One|Three", "What is the brother?|A student|A doctor|A teacher", "Who is Laila?|The mother|The sister|The father"),
          exercises: [
            C("My mother's husband is my ___.", ["father", "brother", "son"], "father"),
            C('Which word means "your mother and father together"?', ["parents", "friends", "children"], "parents"),
            L("I have two sisters", ["I have two brothers", "I have three sisters"]),
            C("Your mother and father are your ___.", ["parents", "friends", "children"], "parents"),
            O("Put the words in order: This is my family", "This is my family"),
            C("She is my mother's daughter. She is my ___.", ["sister", "aunt", "cousin"], "sister")
          ]
        },
        {
          id: "a1-u3-l2", title: "My, your, his, her", ar: "My, your, his, her",
          explanation: "my (mine), your (yours), his (for a man), her (for a woman), our (ours), their (theirs). We put them before the noun: my book, her name.",
          vocab: V("my|Belonging to me|This is my book.", "your|Belonging to you|What is your name?", "his|Belonging to a man or boy|His name is Ali.",
            "her|Belonging to a woman or girl|Her name is Mona.", "our|Belonging to us|Our house is big.", "their|Belonging to them|Their car is new."),
          talk: T("A|Is this your phone?", "B|Yes, it is my phone.|Yes, they are my phones.|It is her phone.",
            "A|And who is this man? Is it your father?", "B|Yes, he is my father. His name is Hassan.|Yes, she is my father.|His name is my father.",
            "A|And this woman? What is her name?", "B|Her name is Laila. She is my mother.|His name is Laila.|Our name is Laila.",
            "Q|What is the mother's name?|Laila|Hassan|Mona"),
          reading: R("Ali has a brother and a sister. His brother is Omar. His sister is Mona. Omar's car is red. Mona's bag is blue. Their house is big.",
            "What is Ali's brother's name?|Omar|Mona|Hassan", "What color is Mona's bag?|Blue|Red|Green", "How is their house?|Big|Small|Blue"),
          exercises: [
            C("Ahmed is my brother. ___ name is Ahmed.", ["His", "Her", "Their"], "His"),
            C("Mona is my sister. ___ name is Mona.", ["Her", "His", "My"], "Her"),
            C("I have a car. ___ car is red.", ["My", "Your", "His"], "My"),
            L("This is her book", ["This is his book", "This is our book"]),
            O("Put the words in order: What is your name?", "What is your name?"),
            C("We have a house. ___ house is big.", ["Our", "Their", "Her"], "Our")
          ]
        },
        {
          id: "a1-u3-l3", title: "Relatives", ar: "Relatives",
          explanation: "Relatives: grandfather, grandmother, uncle (your father's or mother's brother), aunt (your father's or mother's sister), cousin (your uncle's or aunt's child). Example: My grandmother is kind.",
          vocab: V("grandfather|Your father's or mother's father|My grandfather is seventy.", "grandmother|Your father's or mother's mother|My grandmother cooks well.", "uncle|Your father's or mother's brother|My uncle lives in Giza.",
            "aunt|Your father's or mother's sister|My aunt is a nurse.", "cousin|The child of your uncle or aunt|My cousin is my friend."),
          talk: T("A|Do you visit your grandmother?", "B|Yes, I visit her on Friday.|Yes, she is my cousin.|No, he is a grandfather.",
            "A|And your uncle? Where does he live?", "B|He lives in Giza.|He is my aunt.|It lives in Giza.",
            "A|Do you have cousins?", "B|Yes, I have three cousins.|Yes, my cousin is my mother.|No, I am twenty.",
            "Q|Where does B's uncle live?|In Giza|In Cairo|In Alexandria"),
          reading: R("My grandfather is seventy. My grandmother is seventy too. They live in Alexandria. My uncle Samir lives in Giza. His son Adam is my cousin. We visit them every summer.",
            "Where do the grandparents live?|In Alexandria|In Giza|In Cairo", "Who is Adam?|The writer's cousin|The writer's brother|The writer's uncle",
            "When do they visit?|Every summer|Every winter|Every Friday"),
          exercises: [
            C("Your father's father is your ___.", ["grandfather", "uncle", "cousin"], "grandfather"),
            C("Your mother's sister is your ___.", ["aunt", "cousin", "grandmother"], "aunt"),
            L("My uncle lives in Giza", ["My aunt lives in Giza", "My uncle lives in Cairo"]),
            C('Which word is the child of your uncle or aunt?', ["cousin", "grandfather", "aunt"], "cousin"),
            O("Put the words in order: My grandmother likes tea", "My grandmother likes tea"),
            C("Your uncle's son is your ___.", ["cousin", "brother", "father"], "cousin")
          ]
        },
        {
          id: "a1-u3-l4", title: "Describing people", ar: "Describing people",
          explanation: "We describe people with to be + adjective: He is tall. She is kind. Adjectives do not change for singular and plural: They are tall.",
          vocab: V("tall|Having a large height|My brother is tall.", "short|Not tall|She is short.", "young|Not old|He is a young man.",
            "old|Having lived for many years|My grandfather is old.", "kind|Friendly and caring|She is a kind woman.", "funny|Making people laugh|He is very funny."),
          talk: T("A|Who is that tall man?", "B|He is my uncle.|It is a tall bag.|She is my aunt.",
            "A|He is very kind, right?", "B|Yes, he is. He is very funny too.|Yes, she is kind.|No, we are tall.",
            "A|And who is the short woman next to him?", "B|She is my aunt.|He is my aunt.|They are my uncle.",
            "Q|Who is the tall man?|B's uncle|B's father|B's brother"),
          reading: R("My grandfather is old but he is very funny. My uncle is tall and kind. My aunt is short and young. We are a happy family.",
            "Who is funny?|The grandfather|The uncle|The aunt", "How is the uncle?|Tall and kind|Short and young|Old and funny", "How is the aunt?|Short and young|Tall and kind|Old and funny"),
          exercises: [
            C("My grandfather is 80. He is ___.", ["old", "young", "short"], "old"),
            C("She is very ___. She helps everyone.", ["kind", "tall", "funny"], "kind"),
            L("He is tall and young", ["He is tall and old", "He is short and young"]),
            C('What is the opposite of "tall"?', ["short", "old", "kind"], "short"),
            O("Put the words in order: She is very kind", "She is very kind"),
            C("They ___ tall.", ["are", "is", "am"], "are")
          ]
        },
        {
          id: "a1-u3-l5", title: "Jobs", ar: "Jobs (a / an)",
          explanation: "We put a before a job: a teacher. Before a vowel sound (a, e, i, o, u) we use an: an engineer, an actor. Example: He is an engineer. She is a nurse.",
          vocab: V("engineer|A person who designs and builds things|My father is an engineer.", "nurse|A person who cares for patients|She is a nurse.", "driver|A person who drives a vehicle for work|He is a taxi driver.",
            "farmer|A person who works on a farm|The farmer has a farm.", "cook|A person who prepares food|My uncle is a cook.", "job|The work you do to earn money|What is your job?"),
          talk: T("A|What do you do?", "B|I am an engineer.|I am from Egypt.|I am twenty.",
            "A|That's great! My brother is a nurse.", "B|Nice! Where does he work?|Yes, I work at six.|He is an engineer.",
            "A|He works in a hospital in Cairo.", "B|That is a good job.|He is a good farmer.|I'm fine, thank you.",
            "Q|What is B's job?|Engineer|Nurse|Driver"),
          reading: R("My family has different jobs. My father is a farmer. My mother is a cook. My brother is a driver. My sister is an engineer. I am a student.",
            "What is the father's job?|Farmer|Cook|Driver", "Who is an engineer?|The sister|The mother|The brother", "What is the writer?|A student|A cook|A driver"),
          exercises: [
            C("He is ___ engineer.", ["an", "a", "the"], "an"),
            C("She is ___ nurse.", ["a", "an", "two"], "a"),
            L("He is a taxi driver", ["He is a teacher", "She is a taxi driver"]),
            C("What is your ___? I'm a farmer.", ["job", "name", "age"], "job"),
            O("Put the words in order: He is a cook", "He is a cook"),
            C('What does "engineer" describe?', ["A person who designs and builds things", "A person who works on a farm", "A person who drives"], "A person who designs and builds things")
          ]
        }
      ]
    },
    {
      id: "a1-u4", title: "Food and drink", goals: ["travel", "talk"],
      lessons: [
        {
          id: "a1-u4-l1", title: "Food and drink", ar: "Food and drink",
          explanation: "Basic words: water, bread, rice, chicken, apple, tea, coffee, milk. We say I eat bread and I drink water.",
          vocab: V("water|A clear drink|I drink water every day.", "bread|A food made from flour and baked|I eat bread for breakfast.", "rice|A small white grain we cook|We eat rice and chicken.",
            "chicken|A meat from a bird|She cooks chicken.", "apple|A round red or green fruit|I eat an apple.", "tea|A hot drink made from leaves|I drink tea in the morning.",
            "coffee|A hot drink with caffeine|He likes coffee.", "milk|A white drink from cows|The baby drinks milk."),
          talk: T("A|What do you want to drink?", "B|I want water, please.|I want rice, please.|I want a chair, please.",
            "A|And what do you want to eat?", "B|I want chicken and rice.|I want milk and tea.|I want a window.",
            "A|Do you want bread too?", "B|Yes, please.|Yes, it is.|No, I do.",
            "Q|What does B want to drink?|Water|Tea|Milk"),
          reading: R("For breakfast, I eat bread and drink tea. For lunch, I eat rice and chicken. I drink water all day. My sister likes milk and apples.",
            "What does the writer drink for breakfast?|Tea|Milk|Coffee", "What does the writer eat for lunch?|Rice and chicken|Bread and apples|Fish and rice",
            "What does the sister like?|Milk and apples|Tea and bread|Rice and chicken"),
          exercises: [
            C("You ___ water.", ["drink", "eat", "wear"], "drink"),
            C("You ___ bread.", ["eat", "drink", "read"], "eat"),
            L("I drink tea", ["I drink milk", "I drink coffee"]),
            C('Which food is "chicken"?', ["A meat from a bird", "A small white grain", "A round fruit"], "A meat from a bird"),
            O("Put the words in order: I drink coffee every morning", "I drink coffee every morning"),
            C("Which one is a drink?", ["milk", "rice", "bread"], "milk")
          ]
        },
        {
          id: "a1-u4-l2", title: "Like and don't like", ar: "Like and don't like",
          explanation: "To say you like something: I like ... To make it negative, add don't: I don't like fish. For a question: Do you like tea? The answer: Yes, I do. Or No, I don't.",
          vocab: V("like|To enjoy something|I like tea.", "don't like|To not enjoy something|I don't like coffee.", "love|To like something very much|I love pizza.",
            "fish|An animal that lives in water and is eaten|Do you like fish?", "pizza|A flat bread with cheese and toppings|We eat pizza on Fridays.", "favorite|The one you like most|Pizza is my favorite food."),
          talk: T("A|Do you like coffee?", "B|No, I don't like coffee. I like tea.|Yes, I does.|No, I like not.",
            "A|Do you like pizza?", "B|Yes, I love pizza!|Yes, I am pizza.|No, I do love.",
            "A|Pizza is my favorite food too!", "B|Great! Let's eat pizza.|Great! I don't like pizza.|Great! It is Monday.",
            "Q|What does B like?|Tea and pizza|Coffee and fish|Fish and tea"),
          reading: R("I like fish and rice. I don't like chicken. My brother loves pizza but he doesn't like fish. Our favorite drink is tea.",
            "What does the writer like?|Fish and rice|Chicken and pizza|Pizza and fish", "What does the brother love?|Pizza|Fish|Chicken", "What is their favorite drink?|Tea|Coffee|Milk"),
          exercises: [
            C("I ___ like fish.", ["don't", "doesn't", "not"], "don't"),
            C("Do you like tea?", ["Yes, I do.", "Yes, I like.", "Yes, I am."], "Yes, I do."),
            L("I like pizza", ["I love pizza", "I don't like pizza"]),
            O("Put the words in order: I don't like coffee", "I don't like coffee"),
            C("What is your ___ food?", ["favorite", "favor", "favorites"], "favorite"),
            C("We ___ rice.", ["like", "likes", "liking"], "like")
          ]
        },
        {
          id: "a1-u4-l3", title: "Fruit and vegetables", ar: "Fruit and vegetables",
          explanation: "Fruit: banana, orange. Vegetables: tomato, potato, onion. We say I like bananas (plural) and I eat a banana (singular). Juice means a drink made from fruit.",
          vocab: V("banana|A long yellow fruit|I like bananas.", "orange|A round orange fruit|She eats an orange.", "tomato|A red fruit used as a vegetable|I need a tomato.",
            "potato|A brown vegetable that grows underground|We cook potatoes.", "onion|A round vegetable that makes you cry when cut|She cuts an onion.", "juice|A drink made from fruit|I like apple juice."),
          talk: T("A|What do you need from the market?", "B|I need tomatoes and potatoes.|I need a hospital.|I need a bank.",
            "A|Do you want fruit too?", "B|Yes, I want bananas and oranges.|Yes, I want potatoes and onions.|Yes, I am a banana.",
            "A|Great. Do you want orange juice?", "B|Yes, I love orange juice.|Yes, I eat juice.|No, I drink orange.",
            "Q|What vegetables does B need?|Tomatoes and potatoes|Bananas and oranges|Onions and apples"),
          reading: R("My mother is at the market. She buys tomatoes, potatoes and onions. She also buys bananas and oranges. At home, we make orange juice every Friday.",
            "What fruit does she buy?|Bananas and oranges|Tomatoes and onions|Potatoes and bananas", "When do they make juice?|Every Friday|Every Monday|Every night",
            "What is an onion?|A vegetable|A fruit|A drink"),
          exercises: [
            C("A banana is a ___.", ["fruit", "drink", "vegetable"], "fruit"),
            C("A potato is a ___.", ["vegetable", "fruit", "drink"], "vegetable"),
            L("I like bananas", ["I like tomatoes", "I like onions"]),
            C('Which one is a vegetable?', ["onion", "orange", "banana"], "onion"),
            O("Put the words in order: I like orange juice", "I like orange juice"),
            C("I eat ___ orange every day.", ["an", "a", "two"], "an")
          ]
        },
        {
          id: "a1-u4-l4", title: "Meals", ar: "Meals",
          explanation: "Meals: breakfast, lunch, dinner. We say: I have breakfast at seven. For hunger and thirst: I'm hungry. I'm thirsty.",
          vocab: V("breakfast|The first meal of the day|I have breakfast at seven.", "lunch|The meal in the middle of the day|We have lunch at two.", "dinner|The main meal in the evening|Dinner is ready.",
            "hungry|Wanting to eat|I'm hungry.", "thirsty|Wanting to drink|I'm thirsty. I want water.", "snack|A small amount of food between meals|I eat a snack."),
          talk: T("A|What time do you have breakfast?", "B|I have breakfast at seven.|I am seven years old.|I have lunch at night.",
            "A|And when do you have lunch?", "B|At two o'clock.|In the kitchen.|Yes, I do.",
            "A|You must be hungry now. Let's eat dinner!", "B|Good idea, I'm hungry!|No, I'm breakfast.|Good idea, I'm a snack.",
            "Q|What time does B have lunch?|At two|At seven|At ten"),
          reading: R("In my house, breakfast is at seven. We have lunch at two and dinner at eight. In the afternoon, I eat a small snack. At night, I am always hungry!",
            "When is lunch?|At two|At seven|At eight", "What does the writer eat in the afternoon?|A snack|Dinner|Breakfast", "How is the writer at night?|Hungry|Thirsty|Tired"),
          exercises: [
            C("You eat ___ in the morning.", ["breakfast", "dinner", "lunch"], "breakfast"),
            C("I want water. I'm ___.", ["thirsty", "hungry", "tired"], "thirsty"),
            L("I have lunch at two", ["I have dinner at two", "I have lunch at ten"]),
            C("I want food. I'm ___.", ["hungry", "thirsty", "happy"], "hungry"),
            O("Put the words in order: I have dinner at eight", "I have dinner at eight"),
            C('What is a "snack"?', ["A small amount of food between meals", "A morning meal", "A drink made from fruit"], "A small amount of food between meals")
          ]
        },
        {
          id: "a1-u4-l5", title: "At the restaurant", ar: "At the restaurant",
          explanation: "At a restaurant we say: Can I have the menu, please? (the list of food) or Can I have a coffee, please? At the end: The bill, please.",
          vocab: V("menu|The list of food and drinks|Can I have the menu, please?", "waiter|A person who serves food in a restaurant|The waiter is kind.", "bill|The money you pay for your meal|The bill, please.",
            "order|To ask for food or drink|I want to order.", "delicious|Very tasty|The food is delicious.", "restaurant|A place where you buy and eat food|We eat in a restaurant."),
          talk: T("A|Good evening. Here is the menu.", "B|Thank you. Can I have a coffee, please?|Sorry, I am the waiter.|Welcome! This is my house.",
            "A|Of course. Do you want something to eat?", "B|Yes, I want chicken and rice, please.|Yes, I am the menu.|Yes, I want a table.",
            "A|Here is your food. Is it okay?", "B|Yes, it is delicious!|Yes, it is the bill.|No, I am the restaurant.",
            "Q|What does B order to drink?|Coffee|Tea|Water"),
          reading: R("Ali and Mona are at a restaurant. The waiter gives them the menu. Ali orders chicken and rice. Mona orders fish. The food is delicious. Ali asks for the bill.",
            "Who gives them the menu?|The waiter|The doctor|The driver", "What does Mona order?|Fish|Chicken|Pizza", "What does Ali ask for at the end?|The bill|The menu|A coffee"),
          exercises: [
            C("You ask for the ___ to see the food list.", ["menu", "bill", "waiter"], "menu"),
            C("The food is very good. It is ___.", ["delicious", "cold", "small"], "delicious"),
            L("Can I have the bill please", ["Can I have the menu please", "Can I have the bus please"]),
            C("You pay at the end. You ask for the ___.", ["bill", "menu", "order"], "bill"),
            O("Put the words in order: Can I have a coffee, please?", "Can I have a coffee, please?"),
            C('Who is a "waiter"?', ["A person who serves food", "A person who cooks at home", "A person who sells food"], "A person who serves food")
          ]
        }
      ]
    },
    {
      id: "a1-u5", title: "Home and places", goals: ["travel"],
      lessons: [
        {
          id: "a1-u5-l1", title: "Around the house", ar: "Around the house",
          explanation: "Rooms and things: kitchen, bedroom, bathroom, door, window, table, chair. We ask: Where is ...? And answer: It is in the kitchen.",
          vocab: V("kitchen|The room where you cook|My mother is in the kitchen.", "bedroom|The room where you sleep|I sleep in my bedroom.", "bathroom|The room with a toilet and a shower|The bathroom is small.",
            "door|The thing you open to enter a room|Close the door, please.", "window|An opening in a wall for light and air|Open the window.", "table|Furniture with a flat top and legs|The book is on the table.", "chair|Furniture you sit on|Sit on the chair."),
          talk: T("A|Where is your mother?", "B|She is in the kitchen.|She is at six o'clock.|She is a doctor.",
            "A|And where is your brother?", "B|He is in the bedroom.|He is twenty.|He is my brother.",
            "A|Where do you study?", "B|I study at the table.|I study at nine o'clock.|I study a chair.",
            "Q|Where is B's brother?|In the bedroom|In the kitchen|In the bathroom"),
          reading: R("Our house is not big. It has a kitchen, two bedrooms and one bathroom. There is a table and four chairs in the kitchen. The windows are big.",
            "How many bedrooms are there?|Two|One|Four", "What is in the kitchen?|A table and four chairs|A bed|A bathroom", "How are the windows?|Big|Small|Red"),
          exercises: [
            C("You cook in the ___.", ["kitchen", "bedroom", "bathroom"], "kitchen"),
            C("You sleep in the ___.", ["bedroom", "kitchen", "garden"], "bedroom"),
            L("The book is on the table", ["The book is on the chair", "The cat is on the table"]),
            C('What is a "window"?', ["An opening in a wall for light and air", "A thing you sit on", "A thing you open to enter"], "An opening in a wall for light and air"),
            O("Put the words in order: My mother is in the kitchen", "My mother is in the kitchen"),
            C("Where is Ali? He ___ in the bathroom.", ["is", "are", "am"], "is")
          ]
        },
        {
          id: "a1-u5-l2", title: "There is and there are", ar: "There is and there are",
          explanation: "We use There is with a singular noun, and There are with a plural noun: There is a table. There are two chairs. For questions: Is there a ...?",
          vocab: V("there is|Used for one thing|There is a bed in the room.", "there are|Used for more than one thing|There are two windows.", "bed|Furniture for sleeping|The bed is big.",
            "room|A part of a building with walls|This room is clean.", "big|Large in size|We have a big house.", "small|Not large in size|It is a small kitchen."),
          talk: T("A|Is there a bank near here?", "B|Yes, there is one.|Yes, there are one.|No, there is two.",
            "A|Are there any restaurants?", "B|Yes, there are two restaurants.|Yes, there is two restaurants.|No, they is a restaurant.",
            "A|Is there a park too?", "B|Yes, there is a big park.|Yes, there are a big park.|No, there is rooms.",
            "Q|How many restaurants are there?|Two|One|Five"),
          reading: R("There is a small room in my house. There is a bed, a table and two chairs in the room. There are three windows. There is a big door.",
            "How many chairs are there?|Two|Three|One", "How many windows are there?|Three|Two|One", "What is big?|The door|The bed|The table"),
          exercises: [
            C("There ___ a table in the room.", ["is", "are", "am"], "is"),
            C("There ___ three chairs.", ["are", "is", "be"], "are"),
            L("There are two windows", ["There is one window", "There are three windows"]),
            C("___ there a bed in the room?", ["Is", "Are", "Do"], "Is"),
            O("Put the words in order: There is a bed in the room", "There is a bed in the room"),
            C("There ___ two doors in the house.", ["are", "is", "has"], "are")
          ]
        },
        {
          id: "a1-u5-l3", title: "Prepositions of place", ar: "Prepositions of place",
          explanation: "To say where something is: in (inside), on (on top of), under (below), behind (at the back of), next to (beside), in front of (facing). Example: The cat is under the table.",
          vocab: V("under|Below something|The cat is under the chair.", "behind|At the back of something|The ball is behind the door.", "next to|Beside something|The bank is next to the market.",
            "in front of|Facing something, before it|The car is in front of the house.", "between|In the middle of two things|The bed is between two windows.", "cat|A small animal that says meow|The cat is under the table."),
          talk: T("A|Where is my book?", "B|It is on the table.|It is a book.|Yes, on.",
            "A|I can't see it. Is it behind the chair?", "B|No, it is next to the chair.|No, it is a chair.|Yes, it is chair behind.",
            "A|Oh, I see it! Thank you.", "B|You're welcome.|Please sit.|Good morning.",
            "Q|Where is the book?|On the table|Behind the chair|Under the bed"),
          reading: R("The cat is in my room. It is under the bed in the morning. In the afternoon, it is on the chair. At night, it is next to me on the bed.",
            "Where is the cat in the morning?|Under the bed|On the chair|Behind the door", "Where is the cat at night?|Next to the writer|Under the bed|On the table",
            "Where is the cat in the afternoon?|On the chair|In the kitchen|Next to the door"),
          exercises: [
            C("The pen is ___ the table. (on top of it)", ["on", "under", "behind"], "on"),
            C("The cat is ___ the chair. (below it)", ["under", "on", "in front of"], "under"),
            L("The cat is under the table", ["The cat is on the table", "The cat is behind the table"]),
            C('What does "behind" describe?', ["At the back of something", "Facing something", "Beside something"], "At the back of something"),
            O("Put the words in order: The ball is behind the door", "The ball is behind the door"),
            C("The school is ___ the bank. (beside it)", ["next to", "between", "under"], "next to")
          ]
        },
        {
          id: "a1-u5-l4", title: "Places in the city", ar: "Places in the city",
          explanation: "Places in the city: hospital, bank, market, pharmacy, park, mosque. We ask: Where is the bank? And answer: It's next to the market.",
          vocab: V("hospital|A place where sick people are treated|The hospital is near my house.", "bank|A place where you keep and borrow money|The bank opens at nine.", "market|A place where you buy food and things|I buy fruit at the market.",
            "pharmacy|A shop where you buy medicine|The pharmacy is open.", "park|An outdoor area with grass and trees|The children play in the park.", "mosque|A building where Muslims pray|The mosque is next to the school."),
          talk: T("A|Excuse me, where is the pharmacy?", "B|It is next to the bank.|It is a pharmacy.|It is nine o'clock.",
            "A|Is it far from here?", "B|No, it is near.|Yes, I am far.|No, it is hungry.",
            "A|Thank you very much!", "B|You're welcome.|Excuse me.|Good night.",
            "Q|Where is the pharmacy?|Next to the bank|Next to the park|Next to the market"),
          reading: R("My street is very nice. There is a market, a pharmacy and a bank. There is also a park for children. The mosque is next to my house, and the hospital is near the park.",
            "What is next to the writer's house?|The mosque|The bank|The hospital", "Where is the hospital?|Near the park|Next to the bank|In the market", "What is the park for?|Children|Doctors|Cars"),
          exercises: [
            C("You buy medicine at the ___.", ["pharmacy", "park", "bank"], "pharmacy"),
            C("Doctors work in the ___.", ["hospital", "market", "mosque"], "hospital"),
            L("I buy fruit at the market", ["I buy fruit at the park", "I buy food at the market"]),
            C("Children play in the ___.", ["park", "bank", "hospital"], "park"),
            O("Put the words in order: Where is the bank?", "Where is the bank?"),
            C('What is a "market"?', ["A place where you buy food and things", "A building where Muslims pray", "A shop where you buy medicine"], "A place where you buy food and things")
          ]
        },
        {
          id: "a1-u5-l5", title: "Directions", ar: "Directions",
          explanation: "For directions: Turn left, Turn right, Go straight. For distance: near (close), far (not close).",
          vocab: V("turn left|Change direction to the left|Turn left at the bank.", "turn right|Change direction to the right|Turn right at the park.", "go straight|Keep moving forward|Go straight for two minutes.",
            "near|Close to a place|The market is near.", "far|Not close to a place|The airport is far.", "street|A road in a town with houses or shops|The school is in this street."),
          talk: T("A|Excuse me, where is the hospital?", "B|Go straight and turn left.|It is five o'clock.|Turn the hospital.",
            "A|Is it far?", "B|No, it is near. It is next to the park.|Yes, it is a street.|No, it is left.",
            "A|Thank you!", "B|You're welcome.|Good morning.|Excuse me.",
            "Q|How is the hospital?|It is near|It is far|It is small"),
          reading: R("To get to my house from the station, go straight for two minutes. Then turn right at the bank. My house is the big green one. It is not far.",
            "What do you do first?|Go straight|Turn right|Turn left", "Where do you turn right?|At the bank|At the park|At the market", "What color is the house?|Green|Blue|Red"),
          exercises: [
            C('What does "turn right" mean?', ["Change direction to the right", "Change direction to the left", "Keep moving forward"], "Change direction to the right"),
            C("The market is two minutes from here. It is ___.", ["near", "far", "left"], "near"),
            L("Turn left at the bank", ["Turn right at the bank", "Turn left at the park"]),
            C("The airport is 50 kilometers away. It is ___.", ["far", "near", "small"], "far"),
            O("Put the words in order: Go straight and turn right", "Go straight and turn right"),
            C('What is a "street"?', ["A road in a town with houses or shops", "An outdoor area with grass", "A building for sick people"], "A road in a town with houses or shops")
          ]
        }
      ]
    },
    {
      id: "a1-u6", title: "Time and weather", goals: ["work", "travel"],
      lessons: [
        {
          id: "a1-u6-l1", title: "Days of the week", ar: "Days of the week",
          explanation: "Days of the week: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday. We always write them with a capital letter. We say on before the day: I work on Sunday.",
          vocab: V("Monday|The first working day of the week|I work on Monday.", "Tuesday|The day after Monday|I have class on Tuesday.", "Wednesday|The day in the middle of the week|We have a meeting on Wednesday.",
            "Thursday|The day before Friday|I play football on Thursday.", "Friday|The day before Saturday|We visit my uncle on Friday.", "Saturday|The day after Friday|I rest on Saturday.",
            "Sunday|The first day of the week|I go to work on Sunday.", "day|A period of 24 hours|It is a beautiful day.", "week|A period of seven days|There are seven days in a week."),
          talk: T("A|What day is it today?", "B|It is Tuesday.|It is June.|It is two o'clock.",
            "A|Do you work on Wednesday?", "B|Yes, I work on Wednesday.|No, it is Tuesday.|Yes, it is two o'clock.",
            "A|And what do you do on Friday?", "B|I visit my family on Friday.|I am Friday.|It is Friday today.",
            "Q|What day is it today?|Tuesday|Wednesday|Friday"),
          reading: R("My week is busy. I work from Sunday to Thursday. On Friday, I visit my family. On Saturday, I rest at home and watch a movie.",
            "What does the writer do on Friday?|Visits family|Works|Rests at home", "When does the writer rest?|On Saturday|On Sunday|On Friday", "How many days does the writer work?|Five|Seven|Two"),
          exercises: [
            C("The day after Monday is ___.", ["Tuesday", "Sunday", "Friday"], "Tuesday"),
            C('Which day comes right before Saturday?', ["Friday", "Thursday", "Sunday"], "Friday"),
            L("I work on Sunday", ["I work on Saturday", "I walk on Sunday"]),
            C("There are seven days in a ___.", ["week", "month", "year"], "week"),
            O("Put the words in order: I play football on Thursday", "I play football on Thursday"),
            C("I go to school ___ Monday.", ["on", "in", "at"], "on")
          ]
        },
        {
          id: "a1-u6-l2", title: "What time is it?", ar: "What time is it?",
          explanation: "To ask about the time: What time is it? Answers: It's three o'clock (exactly 3:00), It's half past three (3:30), It's quarter past three (3:15).",
          vocab: V("time|The hour shown on a clock|What time is it?", "o'clock|Used for exact hours|It's six o'clock.", "half past|Thirty minutes after the hour|It's half past two.",
            "quarter past|Fifteen minutes after the hour|It's quarter past five.", "morning|The part of the day from sunrise until noon|I wake up in the morning.", "night|The dark part of the day|I sleep at night."),
          talk: T("A|What time is it?", "B|It is half past three.|It is Monday.|It is three years.",
            "A|Oh no, I am late! The class is at four o'clock.", "B|Don't worry. You are not late.|Yes, it is half past.|Goodbye, it's Friday.",
            "A|Thank you. See you at four!", "B|See you at four!|Welcome to the class.|It is half past.",
            "Q|What time is the class?|Four o'clock|Three o'clock|Half past three"),
          reading: R("My day starts at six o'clock. I have breakfast at half past six. I go to work at quarter past seven. I come home at five. I go to bed at eleven.",
            "When does the writer have breakfast?|At half past six|At six|At quarter past seven", "When does the writer go to work?|At quarter past seven|At half past six|At five",
            "When does the writer come home?|At five|At eleven|At six"),
          exercises: [
            C("What ___ is it?", ["time", "hour", "clock"], "time"),
            C("3:30 is ___ three.", ["half past", "quarter past", "o'clock"], "half past"),
            L("It is six o'clock", ["It is five o'clock", "It is half past six"]),
            C("It's seven ___. (exactly 7:00)", ["o'clock", "half", "past"], "o'clock"),
            O("Put the words in order: It is two o'clock", "It is two o'clock"),
            C("5:15 is ___ five.", ["quarter past", "half past", "o'clock"], "quarter past")
          ]
        },
        {
          id: "a1-u6-l3", title: "Months of the year", ar: "Months of the year",
          explanation: "Months: January, February, March, April, May, June, July, August, September, October, November, December. We write them with a capital letter and use in before the month: My birthday is in June.",
          vocab: V("month|One of the twelve parts of a year|There are twelve months in a year.", "January|The first month of the year|January is cold.", "March|The third month of the year|Spring starts in March.",
            "June|The sixth month of the year|My birthday is in June.", "September|The ninth month of the year|School starts in September.", "December|The last month of the year|December is the last month."),
          talk: T("A|When is your birthday?", "B|It is in June.|It is at six o'clock.|It is a gift.",
            "A|Mine is in September! Is your school in September too?", "B|Yes, school starts in September.|Yes, school is Friday.|No, it is a school.",
            "A|Great, summer is almost over then.", "B|Yes, December is cold.|Yes, I am summer.|No, it is Monday.",
            "Q|When is B's birthday?|June|September|December"),
          reading: R("There are twelve months in a year. The first month is January and the last month is December. My birthday is in March. My school starts in September and ends in June.",
            "Which month is the first?|January|March|December", "When does school start?|September|June|March", "When is the writer's birthday?|March|June|December"),
          exercises: [
            C("The month after January is ___.", ["February", "March", "December"], "February"),
            C("My birthday is ___ June.", ["in", "on", "at"], "in"),
            L("My birthday is in June", ["My birthday is in July", "My birthday is in January"]),
            C("December is the ___ month of the year.", ["last", "first", "third"], "last"),
            O("Put the words in order: My school starts in September", "My school starts in September"),
            C("Which month comes third?", ["March", "May", "June"], "March")
          ]
        },
        {
          id: "a1-u6-l4", title: "Seasons and weather", ar: "Seasons and weather",
          explanation: "Seasons: summer and winter. Weather: It's hot, It's cold, It's sunny. We ask: What's the weather like?",
          vocab: V("summer|The hot season of the year|It is hot in summer.", "winter|The cold season of the year|It is cold in winter.", "hot|Having a high temperature|It is very hot today.",
            "cold|Having a low temperature|The water is cold.", "sunny|With a lot of sunshine|It is sunny today.", "weather|What the sky and air are like|What's the weather like?"),
          talk: T("A|What's the weather like today?", "B|It is sunny and hot.|It is six o'clock.|It is a weather.",
            "A|I love summer! Do you like winter?", "B|No, I don't. It is very cold.|Yes, I am cold.|No, it is sunny.",
            "A|Me too. I like hot weather.", "B|Yes, let's go to the park!|Yes, I am hot.|Yes, it is winter weather.",
            "Q|What is the weather like today?|Sunny and hot|Cold|Sunny and cold"),
          reading: R("In Egypt, summer is very hot and sunny. Winter is not very cold. People like to go to the park in the evening. In winter, we drink hot tea.",
            "How is summer in Egypt?|Hot and sunny|Cold|Rainy", "How is winter?|Not very cold|Very hot|Always sunny", "What do people drink in winter?|Hot tea|Cold water|Orange juice"),
          exercises: [
            C("In summer, the weather is ___.", ["hot", "cold", "winter"], "hot"),
            C("In winter, the weather is ___.", ["cold", "hot", "sunny"], "cold"),
            L("It is sunny today", ["It is cold today", "It is sunny tomorrow"]),
            C('What is the opposite of "hot"?', ["cold", "sunny", "summer"], "cold"),
            O("Put the words in order: What's the weather like?", "What's the weather like?"),
            C('What does "sunny" describe?', ["Weather with a lot of sunshine", "Weather that is cold", "Weather that is very hot"], "Weather with a lot of sunshine")
          ]
        },
        {
          id: "a1-u6-l5", title: "How often?", ar: "How often?",
          explanation: "To say how often: always (every time), usually (most of the time), often (many times), sometimes (now and then), never (not at all). We put them before the verb: I always drink tea. She never eats fish.",
          vocab: V("always|Every time|I always drink tea.", "usually|Most of the time|I usually wake up at six.", "often|Many times|We often eat rice.",
            "sometimes|Now and then|He sometimes plays football.", "never|Not at any time|She never eats fish."),
          talk: T("A|Do you drink coffee every day?", "B|Yes, I always drink coffee in the morning.|No, I always never drink.|Yes, I am coffee.",
            "A|Do you eat fish?", "B|Sometimes. I usually eat chicken.|Never, I always eat fish.|Yes, I am fish.",
            "A|And do you go to the park?", "B|Often, on Friday.|I park often.|It is often.",
            "Q|How often does B drink coffee?|Every day|Never|Sometimes"),
          reading: R("I always wake up at six. I usually have tea for breakfast. I often walk to work, but sometimes I take a bus. I never drink coffee at night.",
            "What does the writer always do?|Wake up at six|Take a bus|Drink coffee", "How does the writer go to work?|Often walks|Always takes a bus|Never goes",
            "When does the writer never drink coffee?|At night|In the morning|At breakfast"),
          exercises: [
            C("I ___ drink coffee at night.", ["never", "always", "often"], "never"),
            C("She ___ goes to school.", ["always", "never", "sometimes"], "always"),
            L("I usually wake up at six", ["I always wake up at six", "I usually go to bed at six"]),
            C("If something happens 100% of the time, use the word ___.", ["always", "never", "sometimes"], "always"),
            O("Put the words in order: He sometimes plays football", "He sometimes plays football"),
            C('What does "often" mean?', ["Many times", "Not at any time", "Every time"], "Many times")
          ]
        }
      ]
    }
  ]
});
