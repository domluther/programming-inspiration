import {
  showHelp,
  showBackground,
  copyCode,
  setupTabs,
  replaceText,
  generateQuestionNumber,
} from './utils.js';

import { ProgrammingPage } from './ProgrammingPage.js';

// Selection page questions
const questions = [
  // String equality questions
  {
    topic: 'ask someone the best show',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'best_show',
    question1: 'What is the best TV show?',
    answer1: 'spongebob squarepants',
    answer2: 'stranger things',
    ifReply: '"Absolutely!", {answer1}, "is glorious"',
    ifReplyPlus: '"Absolutely! " + {answer1} + " is glorious"',
    elseReply: '{answer2}, "?!?! No way - it is", {answer1}',
    elseReplyPlus: '{answer2} + "?!?! No way - it is " + {answer1}',
  },
  {
    topic: "ask someone's favourite colour",
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'colour',
    question1: 'What is your favourite colour?',
    answer1: 'green',
    answer2: 'blue',
    ifReply: '"I love", {answer1}, "too"',
    ifReplyPlus: '"I love " + {answer1} + " too"',
    elseReply: '{answer2}, "? I prefer", {answer1}',
    elseReplyPlus: '{answer2} + "? I prefer " + {answer1}',
  },
  {
    topic: 'ask someone about UK geography',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'capital',
    question1: "What's the capital of England?",
    answer1: 'london',
    answer2: 'manchester',
    ifReply: '"Correct!", {answer1}, "is the capital of England"',
    ifReplyPlus: '"Correct! " + {answer1} + " is the capital of England"',
    elseReply:
      '"Not quite.", {answer2}, "is not the capital. It\'s", {answer1}',
    elseReplyPlus:
      '"Not quite. " + {answer2} + " is not the capital. It\'s " + {answer1}',
  },
  {
    topic: 'ask someone about popular music',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'artist',
    question1: "Who sang 'Shape of You'?",
    answer1: 'ed sheeran',
    answer2: 'harry styles',
    ifReply: '"Right!", {answer1}, "sang Shape of You"',
    ifReplyPlus: '"Right! " + {answer1} + " sang Shape of You"',
    elseReply: '"Actually,", {answer2}, "didn\'t sing it.", {answer1}, "did"',
    elseReplyPlus: '"Actually, " + {answer2} + " didn\'t sing it. " + {answer1} + " did"',
  },
  {
    topic: 'ask someone about UK sports',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'sport',
    question1: 'What sport is played at Wimbledon?',
    answer1: 'tennis',
    answer2: 'cricket',
    ifReply: '"Correct!", {answer1}, "is played at Wimbledon"',
    ifReplyPlus: '"Correct! " + {answer1} + " is played at Wimbledon"',
    elseReply:
      '"Sorry,", {answer2}, "isn\'t played at Wimbledon.", {answer1}, "is"',
    elseReplyPlus:
      '"Sorry, " + {answer2} + " isn\'t played at Wimbledon. " + {answer1} + " is"',
  },
  {
    topic: 'ask someone about UK TV shows',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'show',
    question1: 'What show features the Daleks?',
    answer1: 'doctor who',
    answer2: 'sherlock',
    ifReply: '"Right!", {answer1}, "features the Daleks"',
    ifReplyPlus: '"Right! " + {answer1} + " features the Daleks"',
    elseReply:
      '"Not quite.", {answer2}, "doesn\'t have Daleks.", {answer1}, "does"',
    elseReplyPlus:
      '"Not quite. " + {answer2} + " doesn\'t have Daleks. " + {answer1} + " does"',
  },
  {
    topic: 'ask someone about UK history',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'monarch',
    question1: 'Who was the longest-reigning UK monarch?',
    answer1: 'elizabeth ii',
    answer2: 'victoria',
    ifReply: '"Correct!", {answer1}, "reigned the longest"',
    ifReplyPlus: '"Correct! " + {answer1} + " reigned the longest"',
    elseReply:
      '"Actually,", {answer2}, "didn\'t reign longest.", {answer1}, "did"',
    elseReplyPlus:
      '"Actually, " + {answer2} + " didn\'t reign longest. " + {answer1} + " did"',
  },
  {
    topic: 'ask someone about UK literature',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'author',
    question1: "Who wrote 'Harry Potter'?",
    answer1: 'j.k. rowling',
    answer2: 'roald dahl',
    ifReply: '"Right!", {answer1}, "wrote Harry Potter"',
    ifReplyPlus: '"Right! " + {answer1} + " wrote Harry Potter"',
    elseReply: '"Actually,", {answer2}, "didn\'t write it.", {answer1}, "did"',
    elseReplyPlus: '"Actually, " + {answer2} + " didn\'t write it. " + {answer1} + " did"',
  },
  {
    topic: 'ask someone about UK politics',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'position',
    question1: "What's the UK Prime Minister's residence?",
    answer1: '10 downing street',
    answer2: 'buckingham palace',
    ifReply: '"Correct! The PM lives at", {answer1}',
    ifReplyPlus: '"Correct! The PM lives at " + {answer1}',
    elseReply: '"Not quite. It\'s", {answer1}, "not", {answer2}',
    elseReplyPlus: '"Not quite. It\'s " + {answer1} + " not " + {answer2}',
  },
  {
    topic: 'ask someone about UK pop culture',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'band',
    question1: "Which band sang 'Wonderwall'?",
    answer1: 'oasis',
    answer2: 'blur',
    ifReply: '"Right!", {answer1}, "sang Wonderwall"',
    ifReplyPlus: '"Right! " + {answer1} + " sang Wonderwall"',
    elseReply: '"Actually, it wasn\'t", {answer2}, "it was", {answer1}',
    elseReplyPlus: '"Actually, it wasn\'t " + {answer2} + " it was " + {answer1}',
  },
  {
    topic: 'ask someone about UK sports teams',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'team',
    question1: 'Which football team plays at Old Trafford?',
    answer1: 'manchester united',
    answer2: 'liverpool fc',
    ifReply: '"Right!", {answer1}, "plays at Old Trafford"',
    ifReplyPlus: '"Right! " + {answer1} + " plays at Old Trafford"',
    elseReply:
      '"Actually,", {answer2}, "don\'t play at Old Trafford.", {answer1}, "do"',
    elseReplyPlus:
      '"Actually, " + {answer2} + " don\'t play at Old Trafford. " + {answer1} + " do"',
  },
  {
    topic: 'ask someone about UK education',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'exam',
    question1: 'What exams do UK students take at 16?',
    answer1: 'gcses',
    answer2: 'a-levels',
    ifReply: '"Correct! Students take", {answer1}, "at 16"',
    ifReplyPlus: '"Correct! Students take " + {answer1} + " at 16"',
    elseReply:
      '"Not quite.", {answer2}, "are taken later.", {answer1}, "are at 16"',
    elseReplyPlus:
      '"Not quite. " + {answer2} + " are taken later. " + {answer1} + " are at 16"',
  },
  {
    topic: 'ask someone about UK animals',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'animal',
    question1: "What's the UK's national animal?",
    answer1: 'lion',
    answer2: 'bulldog',
    ifReply: '"Correct! The UK\'s national animal is the", {answer1}',
    ifReplyPlus: '"Correct! The UK\'s national animal is the " + {answer1}',
    elseReply: '"Not quite. It\'s not the", {answer2}, "it\'s the", {answer1}',
    elseReplyPlus: '"Not quite. It\'s not the " + {answer2} + " it\'s the " + {answer1}',
  },
  {
    topic: 'ask someone about UK celebrations',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'celebration',
    question1: 'What do we celebrate on Guy Fawkes Night?',
    answer1: 'bonfire night',
    answer2: "new year's eve",
    ifReply: '"Right! We celebrate", {answer1}',
    ifReplyPlus: '"Right! We celebrate " + {answer1}',
    elseReply: '"Actually, it\'s not", {answer2}, "it\'s", {answer1}',
    elseReplyPlus: '"Actually, it\'s not " + {answer2} + " it\'s " + {answer1}',
  },
  {
    topic: 'ask someone about UK science',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'scientist',
    question1: 'Who discovered penicillin?',
    answer1: 'alexander fleming',
    answer2: 'isaac newton',
    ifReply: '"Correct!", {answer1}, "discovered penicillin"',
    ifReplyPlus: '"Correct! " + {answer1} + " discovered penicillin"',
    elseReply:
      '"Not quite.", {answer2}, "didn\'t discover it.", {answer1}, "did"',
    elseReplyPlus:
      '"Not quite. " + {answer2} + " didn\'t discover it. " + {answer1} + " did"',
  },
  {
    topic: 'ask someone about UK monarchy',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'residence',
    question1: 'Where does the monarch live?',
    answer1: 'buckingham palace',
    answer2: 'windsor castle',
    ifReply: '"Right! The monarch lives in", {answer1}',
    ifReplyPlus: '"Right! The monarch lives in " + {answer1}',
    elseReply: '"Actually, it\'s not", {answer2}, "it\'s", {answer1}',
    elseReplyPlus: '"Actually, it\'s not " + {answer2} + " it\'s " + {answer1}',
  },
  {
    topic: 'ask someone about UK traditions',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'tradition',
    question1: "What's traditionally eaten on Pancake Day?",
    answer1: 'pancakes',
    answer2: 'fish and chips',
    ifReply: '"Correct! We eat", {answer1}, "on Pancake Day"',
    ifReplyPlus: '"Correct! We eat " + {answer1} + " on Pancake Day"',
    elseReply: '"Not quite. We don\'t eat", {answer2}, "we eat", {answer1}',
    elseReplyPlus: '"Not quite. We don\'t eat " + {answer2} + " we eat " + {answer1}',
  },
  {
    topic: 'ask someone about UK film',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'character',
    question1: 'Who is the famous British spy in films?',
    answer1: 'james bond',
    answer2: 'sherlock holmes',
    ifReply: '"Right! The famous British spy is", {answer1}',
    ifReplyPlus: '"Right! The famous British spy is " + {answer1}',
    elseReply: '"Actually, it\'s not", {answer2}, "it\'s", {answer1}',
    elseReplyPlus: '"Actually, it\'s not " + {answer2} + " it\'s " + {answer1}',
  },
  {
    topic: 'ask someone about ducks',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'duck_sound',
    question1: 'What sound does a duck make?',
    answer1: 'quack',
    answer2: 'moo',
    ifReply: '"Correct!", {answer1}, "is the sound ducks make"',
    ifReplyPlus: '"Correct! " + {answer1} + " is the sound ducks make"',
    elseReply: '"Not quite! Ducks go", {answer1}, "not", {answer2}',
    elseReplyPlus: '"Not quite! Ducks go " + {answer1} + " not " + {answer2}',
  },
  {
    topic: 'ask someone about social media',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'app',
    question1: 'Which app is known for short videos and dances?',
    answer1: 'tiktok',
    answer2: 'instagram',
    ifReply: '"Correct!", {answer1}, "is famous for short videos and dances"',
    ifReplyPlus: '"Correct! " + {answer1} + " is famous for short videos and dances"',
    elseReply:
      '"Not quite.", {answer2}, "isn\'t known for that, but", {answer1}, "is"',
    elseReplyPlus:
      '"Not quite. " + {answer2} + " isn\'t known for that, but " + {answer1} + " is"',
  },
  {
    topic: 'ask someone about favourite foods',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'food',
    question1: "What's your favourite fast food?",
    answer1: 'pizza',
    answer2: 'burgers',
    ifReply: '"Yum! I love", {answer1}, "too"',
    ifReplyPlus: '"Yum! I love " + {answer1} + " too"',
    elseReply:
      '"Nice choice! I prefer", {answer1}, "but", {answer2}, "are good too"',
    elseReplyPlus:
      '"Nice choice! I prefer " + {answer1} + " but " + {answer2} + " are good too"',
  },
  {
    topic: 'ask someone about video games',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'game',
    question1: "What's the name of the game where you build in a blocky world?",
    answer1: 'minecraft',
    answer2: 'fortnite',
    ifReply: '"Correct!", {answer1}, "is the blocky building game"',
    ifReplyPlus: '"Correct! " + {answer1} + " is the blocky building game"',
    elseReply: '"Actually, it\'s", {answer1}, "not", {answer2}',
    elseReplyPlus: '"Actually, it\'s " + {answer1} + " not " + {answer2}',
  },
  {
    topic: 'ask someone about music genres',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'genre',
    question1: "What's your favourite music genre?",
    answer1: 'pop',
    answer2: 'rock',
    ifReply: '"Cool! I enjoy", {answer1}, "too"',
    ifReplyPlus: '"Cool! I enjoy " + {answer1} + " too"',
    elseReply: '"Nice!", {answer2}, "is great, but I\'m more into", {answer1}',
    elseReplyPlus: '"Nice! " + {answer2} + " is great, but I\'m more into " + {answer1}',
  },
  {
    topic: 'ask someone about climate change',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'action',
    question1: "What's a good way to reduce your carbon footprint?",
    answer1: 'cycling',
    answer2: 'driving',
    ifReply: '"Agreed!", {answer1}, "is great for reducing carbon footprint"',
    ifReplyPlus: '"Agreed! " + {answer1} + " is great for reducing carbon footprint"',
    elseReply:
      '"Actually,", {answer1}, "is better than", {answer2}, "for the environment"',
    elseReplyPlus:
      '"Actually, " + {answer1} + " is better than " + {answer2} + " for the environment"',
  },
  {
    topic: 'ask someone about internet slang',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'acronym',
    question1: "What does 'TBH' stand for?",
    answer1: 'to be honest',
    answer2: 'to be happy',
    ifReply: '"Correct! TBH means", {answer1}',
    ifReplyPlus: '"Correct! TBH means " + {answer1}',
    elseReply: '"Not quite. TBH stands for", {answer1}, "not", {answer2}',
    elseReplyPlus: '"Not quite. TBH stands for " + {answer1} + " not " + {answer2}',
  },
  {
    topic: 'ask someone about technology',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'device',
    question1: 'What device do you use most for internet browsing?',
    answer1: 'smartphone',
    answer2: 'laptop',
    ifReply: '"Same here! I use my", {answer1}, "most too"',
    ifReplyPlus: '"Same here! I use my " + {answer1} + " most too"',
    elseReply: '"Interesting! I use my", {answer1}, "more than my", {answer2}',
    elseReplyPlus: '"Interesting! I use my " + {answer1} + " more than my " + {answer2}',
  },
  {
    topic: 'ask someone about school subjects',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'subject',
    question1: "What's your favourite school subject?",
    answer1: 'maths',
    answer2: 'english',
    ifReply: '"Cool! I enjoy", {answer1}, "too"',
    ifReplyPlus: '"Cool! I enjoy " + {answer1} + " too"',
    elseReply: '"Nice!", {answer2}, "is great, but I prefer", {answer1}',
    elseReplyPlus: '"Nice! " + {answer2} + " is great, but I prefer " + {answer1}',
  },
  {
    topic: 'ask someone about pets',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'pet',
    question1: "What's your favourite pet?",
    answer1: 'dog',
    answer2: 'cat',
    ifReply: '"Nice! I love", {answer1}, "s too"',
    ifReplyPlus: '"Nice! I love " + {answer1} + "s too"',
    elseReply:
      '"Cool!", {answer2}, "s are great, but I prefer", {answer1}, "s"',
    elseReplyPlus:
      '"Cool! " + {answer2} + "s are great, but I prefer " + {answer1} + "s"',
  },
  {
    topic: 'ask someone about future careers',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'career',
    question1: 'What career are you interested in?',
    answer1: 'doctor',
    answer2: 'teacher',
    ifReply: '"Interesting! Being a", {answer1}, "sounds great"',
    ifReplyPlus: '"Interesting! Being a " + {answer1} + " sounds great"',
    elseReply: '"Nice choice! Being a", {answer2}, "is great, and so is", {answer1}',
    elseReplyPlus: '"Nice choice! Being a " + {answer2} + " is great, and so is being a " + {answer1}',
  },
  // Integer comparison questions
  {
    topic: 'ask someone how old they are',
    pattern: 'int',
    variable1: 'age_limit',
    variable2: 'age',
    question1: 'How old are you?',
    limitValue: '18',
    answer1: '15',
    answer2: '20',
    operator: '<',
    ifReply: '"You are young"',
    ifReplyPlus: '"You are young"',
    elseReply: '"You are old"',
    elseReplyPlus: '"You are old"',
  },
  {
    topic: 'ask someone the temperature outside',
    pattern: 'int',
    variable1: 'temp_limit',
    variable2: 'temperature',
    question1: 'What is the temperature outside in Celsius?',
    limitValue: '20',
    answer1: '25',
    answer2: '15',
    operator: '>',
    ifReply: '"It is warm today"',
    ifReplyPlus: '"It is warm today"',
    elseReply: '"It is cold today"',
    elseReplyPlus: '"It is cold today"',
  },
  {
    topic: 'ask someone their exam score',
    pattern: 'int',
    variable1: 'pass_mark',
    variable2: 'score',
    question1: 'What was your exam score out of 100?',
    limitValue: '50',
    answer1: '65',
    answer2: '40',
    operator: '>=',
    ifReply: '"Well done! You passed"',
    ifReplyPlus: '"Well done! You passed"',
    elseReply: '"Sorry, you failed"',
    elseReplyPlus: '"Sorry, you failed"',
  },
  {
    topic: 'ask someone their height in cm',
    pattern: 'int',
    variable1: 'height_limit',
    variable2: 'height',
    question1: 'How tall are you in cm?',
    limitValue: '140',
    answer1: '120',
    answer2: '150',
    operator: '<',
    ifReply: '"You are too short for this ride"',
    ifReplyPlus: '"You are too short for this ride"',
    elseReply: '"You can go on the ride"',
    elseReplyPlus: '"You can go on the ride"',
  },
  {
    topic: 'ask someone how fast they were driving',
    pattern: 'int',
    variable1: 'speed_limit',
    variable2: 'speed',
    question1: 'How fast were you driving in mph?',
    limitValue: '30',
    answer1: '45',
    answer2: '25',
    operator: '>',
    ifReply: '"You were speeding!"',
    ifReplyPlus: '"You were speeding!"',
    elseReply: '"You were within the speed limit"',
    elseReplyPlus: '"You were within the speed limit"',
  },
  {
    topic: 'ask someone their bank balance',
    pattern: 'int',
    variable1: 'overdraft_limit',
    variable2: 'balance',
    question1: 'What is your bank balance in pounds?',
    limitValue: '0',
    answer1: '50',
    answer2: '-10',
    operator: '>=',
    ifReply: '"You have money"',
    ifReplyPlus: '"You have money"',
    elseReply: '"You are overdrawn"',
    elseReplyPlus: '"You are overdrawn"',
  },
  {
    topic: 'ask someone the number of hours they studied',
    pattern: 'int',
    variable1: 'min_hours',
    variable2: 'hours',
    question1: 'How many hours did you study?',
    limitValue: '5',
    answer1: '3',
    answer2: '6',
    operator: '<',
    ifReply: '"You need to study more"',
    ifReplyPlus: '"You need to study more"',
    elseReply: '"Good job studying!"',
    elseReplyPlus: '"Good job studying!"',
  },
  {
    topic: 'ask someone their screen time in hours',
    pattern: 'int',
    variable1: 'max_screen_time',
    variable2: 'screen_time',
    question1: 'How many hours of screen time today?',
    limitValue: '3',
    answer1: '2',
    answer2: '5',
    operator: '<=',
    ifReply: '"That is a reasonable amount"',
    ifReplyPlus: '"That is a reasonable amount"',
    elseReply: '"That is too much screen time"',
    elseReplyPlus: '"That is too much screen time"',
  },
  {
    topic: 'ask someone how many steps they walked',
    pattern: 'int',
    variable1: 'step_goal',
    variable2: 'steps',
    question1: 'How many steps did you walk today?',
    limitValue: '10000',
    answer1: '8500',
    answer2: '12000',
    operator: '<',
    ifReply: '"You did not reach your goal"',
    ifReplyPlus: '"You did not reach your goal"',
    elseReply: '"Great job! You reached your goal"',
    elseReplyPlus: '"Great job! You reached your goal"',
  },
  {
    topic: 'ask someone the price of an item',
    pattern: 'int',
    variable1: 'budget',
    variable2: 'price',
    question1: 'How much does the item cost in pounds?',
    limitValue: '100',
    answer1: '80',
    answer2: '150',
    operator: '<=',
    ifReply: '"You can afford it"',
    ifReplyPlus: '"You can afford it"',
    elseReply: '"It is too expensive"',
    elseReplyPlus: '"It is too expensive"',
  },
  {
    topic: 'ask someone their gaming hours this week',
    pattern: 'int',
    variable1: 'max_gaming_hours',
    variable2: 'hours_played',
    question1: 'How many hours did you game this week?',
    limitValue: '20',
    answer1: '25',
    answer2: '15',
    operator: '>',
    ifReply: '"That is too much gaming"',
    ifReplyPlus: '"That is too much gaming"',
    elseReply: '"That is a good amount"',
    elseReplyPlus: '"That is a good amount"',
  },
  {
    topic: 'ask someone their distance from home in km',
    pattern: 'int',
    variable1: 'safe_distance',
    variable2: 'distance',
    question1: 'How far are you from home in km?',
    limitValue: '5',
    answer1: '3',
    answer2: '8',
    operator: '<',
    ifReply: '"You are close to home"',
    ifReplyPlus: '"You are close to home"',
    elseReply: '"You are far from home"',
    elseReplyPlus: '"You are far from home"',
  },
  {
    topic: 'ask someone their quiz score',
    pattern: 'int',
    variable1: 'minimum_score',
    variable2: 'quiz_score',
    question1: 'What score did you get on the quiz?',
    limitValue: '70',
    answer1: '75',
    answer2: '60',
    operator: '>=',
    ifReply: '"Great score!"',
    ifReplyPlus: '"Great score!"',
    elseReply: '"You need more practice"',
    elseReplyPlus: '"You need more practice"',
  },
  {
    topic: 'ask someone the number of books they read',
    pattern: 'int',
    variable1: 'reading_goal',
    variable2: 'books_read',
    question1: 'How many books did you read this year?',
    limitValue: '12',
    answer1: '15',
    answer2: '8',
    operator: '>=',
    ifReply: '"Excellent reading!"',
    ifReplyPlus: '"Excellent reading!"',
    elseReply: '"Keep reading more"',
    elseReplyPlus: '"Keep reading more"',
  },
  {
    topic: 'ask someone their water intake in litres',
    pattern: 'int',
    variable1: 'recommended_water',
    variable2: 'water_intake',
    question1: 'How many litres of water did you drink today?',
    limitValue: '2',
    answer1: '1',
    answer2: '3',
    operator: '<',
    ifReply: '"You need to drink more water"',
    ifReplyPlus: '"You need to drink more water"',
    elseReply: '"Well done staying hydrated!"',
    elseReplyPlus: '"Well done staying hydrated!"',
  },
  {
    topic: 'ask someone their sleep hours',
    pattern: 'int',
    variable1: 'min_sleep',
    variable2: 'hours_slept',
    question1: 'How many hours did you sleep last night?',
    limitValue: '7',
    answer1: '9',
    answer2: '5',
    operator: '>=',
    ifReply: '"Great! You got enough sleep"',
    ifReplyPlus: '"Great! You got enough sleep"',
    elseReply: '"You need more sleep"',
    elseReplyPlus: '"You need more sleep"',
  },
  {
    topic: 'ask someone their phone battery percentage',
    pattern: 'int',
    variable1: 'low_battery',
    variable2: 'battery',
    question1: 'What is your phone battery percentage?',
    limitValue: '20',
    answer1: '15',
    answer2: '50',
    operator: '<=',
    ifReply: '"Your battery is low!"',
    ifReplyPlus: '"Your battery is low!"',
    elseReply: '"Your battery is fine"',
    elseReplyPlus: '"Your battery is fine"',
  },
  {
    topic: 'ask someone the number of homework assignments done',
    pattern: 'int',
    variable1: 'total_assignments',
    variable2: 'completed',
    question1: 'How many homework assignments have you completed?',
    limitValue: '10',
    answer1: '12',
    answer2: '7',
    operator: '>=',
    ifReply: '"You are ahead!"',
    ifReplyPlus: '"You are ahead!"',
    elseReply: '"You are behind"',
    elseReplyPlus: '"You are behind"',
  },
  {
    topic: 'ask someone their typing speed in words per minute',
    pattern: 'int',
    variable1: 'average_speed',
    variable2: 'typing_speed',
    question1: 'What is your typing speed in words per minute?',
    limitValue: '40',
    answer1: '55',
    answer2: '30',
    operator: '>',
    ifReply: '"You are a fast typer!"',
    ifReplyPlus: '"You are a fast typer!"',
    elseReply: '"Keep practising typing"',
    elseReplyPlus: '"Keep practising typing"',
  },
  {
    topic: 'ask someone the number of friends at their party',
    pattern: 'int',
    variable1: 'party_capacity',
    variable2: 'guests',
    question1: 'How many friends are coming to your party?',
    limitValue: '15',
    answer1: '12',
    answer2: '20',
    operator: '<=',
    ifReply: '"Perfect number of guests"',
    ifReplyPlus: '"Perfect number of guests"',
    elseReply: '"That is too many people!"',
    elseReplyPlus: '"That is too many people!"',
  },
];


/**
 * Selection page with if/else programming concepts
 */
class SelectionPage extends ProgrammingPage {
  constructor() {
    super({
      questions: questions,
      pageType: 'selection',
      utils: {
        showHelp,
        showBackground,
        copyCode,
        setupTabs,
        replaceText,
        generateQuestionNumber
      }
    });
  }

  initializePageElements() {
    // Selection-specific elements for cartoon
    this.selectionQuestionEle = document.querySelector('#selectionQuestion');
    this.selectionAnswer1Ele = document.querySelector('#selectionAnswer1');
    this.selectionAnswer2Ele = document.querySelector('#selectionAnswer2');
    this.ifReplyEle = document.querySelector('#ifReply');
    this.elseReplyEle = document.querySelector('#elseReply');

    // Code section elements
    this.codeQuestionEle = document.querySelector('#codeQuestion');
    this.codeCorrectAnswerEle = document.querySelector('#codeCorrectAnswer');
    this.codeIfCheckEle = document.querySelector('#codeIfCheck');
    this.codeIfReplyEle = document.querySelector('#codeIfReply');
    this.codeElseReplyEle = document.querySelector('#codeElseReply');
      }

  setTopic(question) {
    if (this.topicEle && question.topic) {
      // Selection specific: "ask someone [topic]."
      this.topicEle.innerText = `${question.topic}.`;
    }
  }

  setCaptions(question) {
    try {
      const pattern = question.pattern || 'string'; // Default to string for backward compatibility
      
      if (this.selectionQuestionEle) {
        this.selectionQuestionEle.innerText = question.question1;
      }
      if (this.selectionAnswer1Ele) {
        this.selectionAnswer1Ele.innerText = question.answer1;
      }
      if (this.ifReplyEle && question.ifReply) {
        this.ifReplyEle.innerText = this.replaceText(question.ifReply, question, false)
          .replaceAll('"', '')
          .replaceAll(',', '');
      }
      if (this.selectionAnswer2Ele) {
        this.selectionAnswer2Ele.innerText = question.answer2;
      }
      if (this.elseReplyEle && question.elseReply) {
        this.elseReplyEle.innerText = this.replaceText(question.elseReply, question, false)
          .replaceAll('"', '')
          .replaceAll(',', '');
      }
    } catch (error) {
      console.error('Error in setCaptions function:', error);
    }
  }

  setCode(question) {
    try {
      const INDENT = '    '; // 4 spaces
      const pattern = question.pattern || 'string'; // Default to string for backward compatibility
      
      if (this.codeCorrectAnswerEle) {
        if (pattern === 'int') {
          // For int pattern: age_limit = 18 (use limitValue)
          this.codeCorrectAnswerEle.innerText = `${question.variable1} = ${question.limitValue}`;
        } else {
          // For string pattern: correct_answer = "london"
          this.codeCorrectAnswerEle.innerText = `${question.variable1} = "${question.answer1}"`;
        }
      }
      
      if (this.codeQuestionEle) {
        if (pattern === 'int') {
          // For int pattern: age = int(input("How old are you? "))
          this.codeQuestionEle.innerText = `${question.variable2} = int(input("${question.question1} "))`;
        } else {
          // For string pattern: best_show = input("What is the best TV show? ")
          this.codeQuestionEle.innerText = `${question.variable2} = input("${question.question1} ")`;
        }
      }
      
      if (this.codeIfCheckEle) {
        if (pattern === 'int') {
          // For int pattern: if age < age_limit:
          this.codeIfCheckEle.innerText = `if ${question.variable2} ${question.operator} ${question.variable1}:`;
        } else {
          // For string pattern: if best_show == correct_answer:
          this.codeIfCheckEle.innerText = `if ${question.variable2} == ${question.variable1}:`;
        }
      }
      
      if (this.codeIfReplyEle) {
        // Choose the appropriate response based on concatenation mode
        const ifReplyText = this.usePlusMode ? 
          (question.ifReplyPlus || question.ifReply) : 
          question.ifReply;
        this.codeIfReplyEle.innerText = `${INDENT}print(${this.replaceText(ifReplyText, question, true)})`;
      }
      if (this.codeElseReplyEle) {
        // Choose the appropriate response based on concatenation mode
        const elseReplyText = this.usePlusMode ? 
          (question.elseReplyPlus || question.elseReply) : 
          question.elseReply;
        this.codeElseReplyEle.innerText = `${INDENT}print(${this.replaceText(elseReplyText, question, true)})`;
      }
    } catch (error) {
      console.error('Error in setCode function:', error);
    }
  }

}

// Initialize the page
const selectionPage = new SelectionPage();