// Buttons
const inspireBtn = document.querySelector('#inspire');
const helpBtn = document.querySelector('#help');
const backgroundBtn = document.querySelector('#background');
const forceSpongeBtn = document.querySelector('#forceSpongebob');
const copyBtn = document.querySelector('#copyMe');

const cartoon1Ele = document.querySelector('.cartoon1');
const cartoon2Ele = document.querySelector('.cartoon2');

// Sections
const backgroundEle = document.querySelector('.background');
const exampleEle = document.querySelector('.example');
const codeEle = document.querySelector('.code');

// Cartoon

const topicEle = document.querySelector('#topic');
const selectionQuestionEle = document.querySelector('#selectionQuestion');
const selectionAnswer1Ele = document.querySelector('#selectionAnswer1');
const selectionAnswer2Ele = document.querySelector('#selectionAnswer2');
const ifReplyEle = document.querySelector('#ifReply');
const elseReplyEle = document.querySelector('#elseReply');
const exampleAnswer2Ele = document.querySelector('#exampleAnswer2');
const exampleResponseEle = document.querySelector('#exampleResponse');
const exampleResponse2Ele = document.querySelector('#exampleResponse2');

// Code section
const codeQuestionEle = document.querySelector('#codeQuestion');
const codeCorrectAnswerEle = document.querySelector('#codeCorrectAnswer');
const codeIfCheckEle = document.querySelector('#codeIfCheck');
const codeIfReplyEle = document.querySelector('#codeIfReply');
const codeElseReplyEle = document.querySelector('#codeElseReply');

inspireBtn.addEventListener('click', inspire);
helpBtn.addEventListener('click', showHelp);
copyBtn.addEventListener('click', copyCode);
backgroundBtn.addEventListener('click', showBackground);
forceSpongeBtn.addEventListener('click', () => inspire('bob'));

// https://www.convertcsv.com/csv-to-json.htm to create
const questions = [
  {
    topic: 'ask someone the best show',
    variable1: 'best_show',
    variable2: 'correct_answer',
    question1: 'What is the best TV show?',
    answer1: 'spongebob squarepants',
    answer2: 'stranger things',
    ifReply: '"Absolutely!", {answer1}, "is glorious"',
    elseReply: '{answer2}, "?!?! No way - it is", {answer1}',
  },
  {
    topic: "ask someone's favourite colour",
    variable1: 'colour',
    variable2: 'correct_answer',
    question1: 'What is your favourite colour?',
    answer1: 'green',
    answer2: 'blue',
    ifReply: '"I love", {answer1}, "too"',
    elseReply: '{answer2}, "? I prefer", {answer1}',
  },
  {
    topic: 'ask someone about UK geography',
    variable1: 'capital',
    variable2: 'correct_answer',
    question1: "What's the capital of England?",
    answer1: 'london',
    answer2: 'manchester',
    ifReply: '"Correct!", {answer1}, "is the capital of England"',
    elseReply:
      '"Not quite.", {answer2}, "is not the capital. It\'s", {answer1}',
  },
  {
    topic: 'ask someone about popular music',
    variable1: 'artist',
    variable2: 'correct_answer',
    question1: "Who sang 'Shape of You'?",
    answer1: 'ed sheeran',
    answer2: 'harry styles',
    ifReply: '"Right!", {answer1}, "sang Shape of You"',
    elseReply: '"Actually,", {answer2}, "didn\'t sing it.", {answer1}, "did"',
  },
  {
    topic: 'ask someone about UK sports',
    variable1: 'sport',
    variable2: 'correct_answer',
    question1: 'What sport is played at Wimbledon?',
    answer1: 'tennis',
    answer2: 'cricket',
    ifReply: '"Correct!", {answer1}, "is played at Wimbledon"',
    elseReply:
      '"Sorry,", {answer2}, "isn\'t played at Wimbledon.", {answer1}, "is"',
  },
  {
    topic: 'ask someone about UK TV shows',
    variable1: 'show',
    variable2: 'correct_answer',
    question1: 'What show features the Daleks?',
    answer1: 'doctor who',
    answer2: 'sherlock',
    ifReply: '"Right!", {answer1}, "features the Daleks"',
    elseReply:
      '"Not quite.", {answer2}, "doesn\'t have Daleks.", {answer1}, "does"',
  },
  {
    topic: 'ask someone about UK history',
    variable1: 'monarch',
    variable2: 'correct_answer',
    question1: 'Who was the longest-reigning UK monarch?',
    answer1: 'elizabeth ii',
    answer2: 'victoria',
    ifReply: '"Correct!", {answer1}, "reigned the longest"',
    elseReply:
      '"Actually,", {answer2}, "didn\'t reign longest.", {answer1}, "did"',
  },
  {
    topic: 'ask someone about UK food',
    variable1: 'dish',
    variable2: 'correct_answer',
    question1: "What's in a chip butty?",
    answer1: 'chips',
    answer2: 'crisps',
    ifReply: '"Right!", {answer1}, "are in a chip butty"',
    elseReply:
      '"Not quite.", {answer2}, "aren\'t in a chip butty.", {answer1}, "are"',
  },
  {
    topic: 'ask someone about UK landmarks',
    variable1: 'landmark',
    variable2: 'correct_answer',
    question1: "What's the clock tower at Parliament called?",
    answer1: 'big ben',
    answer2: 'london eye',
    ifReply: '"Correct! It\'s called", {answer1}',
    elseReply: '"Sorry, it\'s not", {answer2}, "it\'s", {answer1}',
  },
  {
    topic: 'ask someone about UK literature',
    variable1: 'author',
    variable2: 'correct_answer',
    question1: "Who wrote 'Harry Potter'?",
    answer1: 'j.k. rowling',
    answer2: 'roald dahl',
    ifReply: '"Right!", {answer1}, "wrote Harry Potter"',
    elseReply: '"Actually,", {answer2}, "didn\'t write it.", {answer1}, "did"',
  },
  {
    topic: 'ask someone about UK currency',
    variable1: 'currency',
    variable2: 'correct_answer',
    question1: "What's a quid in British currency?",
    answer1: 'pound',
    answer2: 'penny',
    ifReply: '"Correct! A quid is a", {answer1}',
    elseReply: '"Not quite. A quid isn\'t a", {answer2}, "it\'s a", {answer1}',
  },
  {
    topic: 'ask someone about UK weather',
    variable1: 'season',
    variable2: 'correct_answer',
    question1: 'When is it warm in the UK?',
    answer1: 'usually never',
    answer2: 'august',
    ifReply: '"Right! It is warm", {answer1}',
    elseReply: '"Actually, it isn\'t warm in", {answer2}, "it\'s", {answer1}',
  },
  {
    topic: 'ask someone about UK politics',
    variable1: 'position',
    variable2: 'correct_answer',
    question1: "What's the UK Prime Minister's residence?",
    answer1: '10 downing street',
    answer2: 'buckingham palace',
    ifReply: '"Correct! The PM lives at", {answer1}',
    elseReply: '"Not quite. It\'s", {answer1}, "not", {answer2}',
  },
  {
    topic: 'ask someone about UK pop culture',
    variable1: 'band',
    variable2: 'correct_answer',
    question1: "Which band sang 'Wonderwall'?",
    answer1: 'oasis',
    answer2: 'blur',
    ifReply: '"Right!", {answer1}, "sang Wonderwall"',
    elseReply: '"Actually, it wasn\'t", {answer2}, "it was", {answer1}',
  },
  {
    topic: 'ask someone about UK geography',
    variable1: 'city',
    variable2: 'correct_answer',
    question1: "What's the largest city in Scotland?",
    answer1: 'glasgow',
    answer2: 'edinburgh',
    ifReply: '"Correct!", {answer1}, "is the largest Scottish city"',
    elseReply:
      '"Not quite.", {answer2}, "isn\'t the largest. It\'s", {answer1}',
  },
  {
    topic: 'ask someone about UK sports teams',
    variable1: 'team',
    variable2: 'correct_answer',
    question1: 'Which football team is from Liverpool?',
    answer1: 'liverpool fc',
    answer2: 'manchester united',
    ifReply: '"Right!", {answer1}, "is from Liverpool"',
    elseReply:
      '"Actually,", {answer2}, "isn\'t from Liverpool.", {answer1}, "is"',
  },
  {
    topic: 'ask someone about UK education',
    variable1: 'exam',
    variable2: 'correct_answer',
    question1: 'What exams do UK students take at 16?',
    answer1: 'gcses',
    answer2: 'a-levels',
    ifReply: '"Correct! Students take", {answer1}, "at 16"',
    elseReply:
      '"Not quite.", {answer2}, "are taken later.", {answer1}, "are at 16"',
  },
  {
    topic: 'ask someone about UK technology',
    variable1: 'inventor',
    variable2: 'correct_answer',
    question1: 'Who invented the World Wide Web?',
    answer1: 'tim berners-lee',
    answer2: 'alan turing',
    ifReply: '"Right!", {answer1}, "invented the World Wide Web"',
    elseReply: '"Actually, it wasn\'t", {answer2}, "it was", {answer1}',
  },
  {
    topic: 'ask someone about UK animals',
    variable1: 'animal',
    variable2: 'correct_answer',
    question1: "What's the UK's national animal?",
    answer1: 'lion',
    answer2: 'bulldog',
    ifReply: '"Correct! The UK\'s national animal is the", {answer1}',
    elseReply: '"Not quite. It\'s not the", {answer2}, "it\'s the", {answer1}',
  },
  {
    topic: 'ask someone about UK transport',
    variable1: 'network',
    variable2: 'correct_answer',
    question1: "What's London's underground called?",
    answer1: 'the tube',
    answer2: 'the metro',
    ifReply: '"Right! It\'s called", {answer1}',
    elseReply: '"Actually, it\'s not", {answer2}, "it\'s", {answer1}',
  },
  {
    topic: 'ask someone about UK inventions',
    variable1: 'invention',
    variable2: 'correct_answer',
    question1: 'What did James Dyson invent?',
    answer1: 'vacuum cleaner',
    answer2: 'washing machine',
    ifReply: '"Correct! Dyson invented the", {answer1}',
    elseReply:
      '"Not quite. He didn\'t invent the", {answer2}, "but the", {answer1}',
  },
  {
    topic: 'ask someone about UK celebrations',
    variable1: 'celebration',
    variable2: 'correct_answer',
    question1: 'What do we celebrate on Guy Fawkes Night?',
    answer1: 'bonfire night',
    answer2: "new year's eve",
    ifReply: '"Right! We celebrate", {answer1}',
    elseReply: '"Actually, it\'s not", {answer2}, "it\'s", {answer1}',
  },
  {
    topic: 'ask someone about UK science',
    variable1: 'scientist',
    variable2: 'correct_answer',
    question1: 'Who discovered penicillin?',
    answer1: 'alexander fleming',
    answer2: 'isaac newton',
    ifReply: '"Correct!", {answer1}, "discovered penicillin"',
    elseReply:
      '"Not quite.", {answer2}, "didn\'t discover it.", {answer1}, "did"',
  },
  {
    topic: 'ask someone about UK monarchy',
    variable1: 'residence',
    variable2: 'correct_answer',
    question1: 'Where does the monarch live?',
    answer1: 'buckingham palace',
    answer2: 'windsor castle',
    ifReply: '"Right! The monarch lives in", {answer1}',
    elseReply: '"Actually, it\'s not", {answer2}, "it\'s", {answer1}',
  },
  {
    topic: 'ask someone about UK traditions',
    variable1: 'tradition',
    variable2: 'correct_answer',
    question1: "What's traditionally eaten on Pancake Day?",
    answer1: 'pancakes',
    answer2: 'fish and chips',
    ifReply: '"Correct! We eat", {answer1}, "on Pancake Day"',
    elseReply: '"Not quite. We don\'t eat", {answer2}, "we eat", {answer1}',
  },
  {
    topic: 'ask someone about UK film',
    variable1: 'character',
    variable2: 'correct_answer',
    question1: 'Who is the famous British spy in films?',
    answer1: 'james bond',
    answer2: 'sherlock holmes',
    ifReply: '"Right! The famous British spy is", {answer1}',
    elseReply: '"Actually, it\'s not", {answer2}, "it\'s", {answer1}',
  },
  {
    topic: 'ask someone about UK geography',
    variable1: 'country',
    variable2: 'correct_answer',
    question1: 'What country is not part of the UK?',
    answer1: 'ireland',
    answer2: 'wales',
    ifReply: '"Correct!", {answer1}, "is not part of the UK"',
    elseReply:
      '"Not quite.", {answer2}, "is part of the UK.", {answer1}, "isn\'t"',
  },
  {
    topic: 'ask someone about ducks',
    variable1: 'duck_sound',
    variable2: 'correct_answer',
    question1: 'What sound does a duck make?',
    answer1: 'quack',
    answer2: 'moo',
    ifReply: '"Correct!", {answer1}, "is the sound ducks make"',
    elseReply: '"Not quite! Ducks go", {answer1}, "not", {answer2}',
  },
  {
    topic: 'ask someone about social media',
    variable1: 'app',
    variable2: 'correct_answer',
    question1: 'Which app is known for short videos and dances?',
    answer1: 'tiktok',
    answer2: 'instagram',
    ifReply: '"Correct!", {answer1}, "is famous for short videos and dances"',
    elseReply:
      '"Not quite.", {answer2}, "isn\'t known for that, but", {answer1}, "is"',
  },
  {
    topic: 'ask someone about favourite foods',
    variable1: 'food',
    variable2: 'correct_answer',
    question1: "What's your favourite fast food?",
    answer1: 'pizza',
    answer2: 'burgers',
    ifReply: '"Yum! I love", {answer1}, "too"',
    elseReply:
      '"Nice choice! I prefer", {answer1}, "but", {answer2}, "are good too"',
  },
  {
    topic: 'ask someone about bicycle parts',
    variable1: 'bike_part',
    variable2: 'correct_answer',
    question1: 'What part of a bicycle do you sit on?',
    answer1: 'saddle',
    answer2: 'handlebars',
    ifReply: '"Correct! You sit on the", {answer1}',
    elseReply: '"Actually, you sit on the", {answer1}, "not the", {answer2}',
  },
  {
    topic: 'ask someone about recent movies',
    variable1: 'movie',
    variable2: 'correct_answer',
    question1:
      "What's the name of the movie where Timothée Chalamet plays Willy Wonka?",
    answer1: 'wonka',
    answer2: 'charlie and the chocolate factory',
    ifReply: '"Right!", {answer1}, "is the recent Willy Wonka movie"',
    elseReply: '"Not quite. It\'s", {answer1}, "not", {answer2}',
  },
  {
    topic: 'ask someone about video games',
    variable1: 'game',
    variable2: 'correct_answer',
    question1: "What's the name of the game where you build in a blocky world?",
    answer1: 'minecraft',
    answer2: 'fortnite',
    ifReply: '"Correct!", {answer1}, "is the blocky building game"',
    elseReply: '"Actually, it\'s", {answer1}, "not", {answer2}',
  },
  {
    topic: 'ask someone about music genres',
    variable1: 'genre',
    variable2: 'correct_answer',
    question1: "What's your favourite music genre?",
    answer1: 'pop',
    answer2: 'rock',
    ifReply: '"Cool! I enjoy", {answer1}, "too"',
    elseReply: '"Nice!", {answer2}, "is great, but I\'m more into", {answer1}',
  },
  {
    topic: 'ask someone about sports',
    variable1: 'sport',
    variable2: 'correct_answer',
    question1: 'What sport does Emma Raducanu play?',
    answer1: 'tennis',
    answer2: 'football',
    ifReply: '"Correct! Emma Raducanu plays", {answer1}',
    elseReply: '"Actually, she plays", {answer1}, "not", {answer2}',
  },
  {
    topic: 'ask someone about climate change',
    variable1: 'action',
    variable2: 'correct_answer',
    question1: "What's a good way to reduce your carbon footprint?",
    answer1: 'cycling',
    answer2: 'driving',
    ifReply: '"Agreed!", {answer1}, "is great for reducing carbon footprint"',
    elseReply:
      '"Actually,", {answer1}, "is better than", {answer2}, "for the environment"',
  },
  {
    topic: 'ask someone about internet slang',
    variable1: 'acronym',
    variable2: 'correct_answer',
    question1: "What does 'TBH' stand for?",
    answer1: 'to be honest',
    answer2: 'to be happy',
    ifReply: '"Correct! TBH means", {answer1}',
    elseReply: '"Not quite. TBH stands for", {answer1}, "not", {answer2}',
  },
  {
    topic: 'ask someone about superhero movies',
    variable1: 'hero',
    variable2: 'correct_answer',
    question1: 'Who plays Spider-Man in the recent Marvel movies?',
    answer1: 'tom holland',
    answer2: 'andrew garfield',
    ifReply: '"Right!", {answer1}, "plays Spider-Man in recent Marvel films"',
    elseReply:
      '"Actually, it\'s", {answer1}, "not", {answer2}, "in the recent movies"',
  },
  {
    topic: 'ask someone about streaming services',
    variable1: 'service',
    variable2: 'correct_answer',
    question1: "Which streaming service has 'Stranger Things'?",
    answer1: 'netflix',
    answer2: 'disney+',
    ifReply: '"Right!", {answer1}, "has Stranger Things"',
    elseReply: '"Actually, it\'s on", {answer1}, "not", {answer2}',
  },

  {
    topic: 'ask someone about technology',
    variable1: 'device',
    variable2: 'correct_answer',
    question1: 'What device do you use most for internet browsing?',
    answer1: 'smartphone',
    answer2: 'laptop',
    ifReply: '"Same here! I use my", {answer1}, "most too"',
    elseReply: '"Interesting! I use my", {answer1}, "more than my", {answer2}',
  },
  {
    topic: 'ask someone about school subjects',
    variable1: 'subject',
    variable2: 'correct_answer',
    question1: "What's your favourite school subject?",
    answer1: 'maths',
    answer2: 'english',
    ifReply: '"Cool! I enjoy", {answer1}, "too"',
    elseReply: '"Nice!", {answer2}, "is great, but I prefer", {answer1}',
  },
  {
    topic: 'ask someone about UK landmarks',
    variable1: 'landmark',
    variable2: 'correct_answer',
    question1: "What's the name of the large Ferris wheel in London?",
    answer1: 'london eye',
    answer2: 'big ben',
    ifReply: '"Correct! It\'s called the", {answer1}',
    elseReply: '"Actually, it\'s the", {answer1}, "not", {answer2}',
  },
  {
    topic: 'ask someone about pets',
    variable1: 'pet',
    variable2: 'correct_answer',
    question1: "What's your favourite pet?",
    answer1: 'dog',
    answer2: 'cat',
    ifReply: '"Nice! I love", {answer1}, "s too"',
    elseReply:
      '"Cool!", {answer2}, "s are great, but I prefer", {answer1}, "s"',
  },
  {
    topic: 'ask someone about future careers',
    variable1: 'career',
    variable2: 'correct_answer',
    question1: 'What career are you interested in?',
    answer1: 'doctor',
    answer2: 'teacher',
    ifReply: '"Interesting! Being a", {answer1}, "sounds great"',
    elseReply: '"Nice choice!", {answer2}, "is great, and so is", {answer1}',
  },
  {
    topic: 'ask someone about UK weather',
    variable1: 'weather',
    variable2: 'correct_answer',
    question1: "What's typical UK weather?",
    answer1: 'rainy',
    answer2: 'sunny',
    ifReply: '"Right!", {answer1}, "weather is quite typical in the UK"',
    elseReply:
      '"Well,", {answer2}, "days happen, but", {answer1}, "is more typical"',
  },
];

const numOfQuestions = questions.length;

function inspire(override) {
  exampleEle.classList.remove('hidden');
  // Help should be hidden at start
  codeEle.classList.add('hidden');

  // Randomly pick a question number then set the text values
  let questionToPick = Math.ceil(Math.random() * numOfQuestions);
  if (override === 'bob') questionToPick = 1;
  const question = questions[questionToPick - 1];
  console.table(question);
  topicEle.innerText = `${question.topic}.`;
  // One input or two inputs?
  cartoon1Ele.classList.remove('hidden');
  selectionQuestionEle.innerText = question.question1;
  selectionAnswer1Ele.innerText = question.answer1;
  ifReplyEle.innerText = replaceText(question.ifReply, question, false)
    .replaceAll('"', '')
    .replaceAll(',', '');
  selectionAnswer2Ele.innerText = question.answer2;
  elseReplyEle.innerText = replaceText(question.elseReply, question, false)
    .replaceAll('"', '')
    .replaceAll(',', '');
  const INDENT = '    '; // 4 spaces

  codeCorrectAnswerEle.innerText = `${question.variable2} = "${question.answer1}"`;
  codeQuestionEle.innerText = `${question.variable1} = input("${question.question1} ")`;
  codeIfCheckEle.innerText = `if ${question.variable1} == ${question.variable2}:`;
  codeIfReplyEle.innerText = `${INDENT}print(${replaceText(question.ifReply, question, true)})`;
  codeElseReplyEle.innerText = `${INDENT}print(${replaceText(question.elseReply, question, true)})`;
}

// fills in variable names in template literals
function replaceText(text, question, code = true) {
  console.log(text, question, code);
  if (code) {
    return text
      .replaceAll('{answer1}', question.variable2)
      .replaceAll('{answer2}', question.variable1);
  }
  return text
    .replaceAll('{answer1}', question.answer1)
    .replaceAll('{answer2}', question.answer2);
}

function showHelp() {
  codeEle.classList.toggle('hidden');
}

function showBackground() {
  backgroundEle.classList.toggle('hidden');
}

function copyCode() {
  const codeText = document
    .querySelector('.code')
    .innerText.replace('📋\n\n', '');
  navigator.clipboard.writeText(codeText);
}

document.addEventListener('DOMContentLoaded', function () {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');

      tabButtons.forEach((btn) => btn.classList.remove('active'));
      tabContents.forEach((content) => content.classList.remove('active'));

      button.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
});
