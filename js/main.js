const inspireBtn = document.querySelector('#inspire');
const helpBtn = document.querySelector('#help');
const exampleEle = document.querySelector('.example');
const topicEle = document.querySelector('#topic');
const exampleQuestionEle = document.querySelector('#exampleQuestion');
const exampleAnswerEle = document.querySelector('#exampleAnswer');
const exampleResponseEle = document.querySelector('#exampleResponse');
const codeEle = document.querySelector('.code');
const copyBtn = document.querySelector('#copyMe');
const codeQuestionEle = document.querySelector('#question');
const codeResponseEle = document.querySelector('#response');
const forceSpongeBtn = document.querySelector('#forceSpongebob');

inspireBtn.addEventListener('click', inspire);
helpBtn.addEventListener('click', showHelp);
copyBtn.addEventListener('click', copyCode);
forceSpongeBtn.addEventListener('click', () => inspire('bob'));

// https://www.convertcsv.com/csv-to-json.htm to create
const questions = [
  {
    variable: 'spongebob',
    topic: 'their favourite Spongebob character',
    question: 'Who is the best Spongebob character?',
    answer: 'Mr Krabs',
    response: '"Absolutely. No-one is better than", {answer}.',
  },
  {
    variable: 'name',
    topic: 'their name',
    question: 'What is your full name?',
    answer: 'Bob Smith Frederick',
    response: '"Nice to meet you", {answer}.',
  },
  {
    variable: 'age',
    topic: 'their age',
    question: 'How old are you?',
    answer: '25',
    response: '"Oh wow! I am", {answer}, "too!"',
  },
  {
    variable: 'birthday',
    topic: 'their birthday',
    question: 'When is your birthday?',
    answer: 'March 23rd',
    response: '"I will add", {answer}, "to my calendar!"',
  },
  {
    variable: 'born',
    topic: 'where they were born',
    question: 'Where were you born?',
    answer: 'Crewe',
    response: '"I really like", {answer}, "."',
  },
  {
    variable: 'hometown',
    topic: 'their hometown',
    question: 'What is your current hometown?',
    answer: 'Manchester',
    response: '"I\'ve never been to", {answer}, "."',
  },
  {
    variable: 'job',
    topic: 'their job',
    question: 'What is your occupation?',
    answer: 'teacher',
    response: '"I think being a", {answer}, "sounds good."',
  },
  {
    variable: 'hobby',
    topic: 'their hobby',
    question: 'What is your favourite hobby?',
    answer: 'dancing',
    response: '"I\'ve never tried", {answer}, "."',
  },
  {
    variable: 'siblings',
    topic: 'about siblings',
    question: 'How many siblings do you have?',
    answer: '4',
    response: '"Oh really?", {answer}, "?"',
  },
  {
    variable: 'food',
    topic: 'their favourite food',
    question: 'What is your favourite food?',
    answer: 'eggs',
    response: '{answer}, "sounds yummy."',
  },
  {
    variable: 'colour',
    topic: 'their favourite colour',
    question: 'What is your favourite colour?',
    answer: 'orange',
    response: '"I love", {answer}, "too!"',
  },
  {
    variable: 'time',
    topic: 'about mornings or evenings',
    question: 'Are you a morning person or a night owl?',
    answer: 'morning person',
    response: '"I am also a", {answer}, "."',
  },
  {
    variable: 'pets',
    topic: 'about pets',
    question: 'Do you have any pets?',
    answer: 'a dog',
    response: '"I really want", {answer}, "."',
  },
  {
    variable: 'season',
    topic: 'their favourite season',
    question: 'What is your favourite season?',
    answer: 'winter',
    response: '"Yes!", {answer}, "is the best."',
  },
  {
    variable: 'film_genre',
    topic: 'their favourite film genre',
    question: 'What is your favourite film genre?',
    answer: 'comedy',
    response: '"I like", {answer}, "films too."',
  },
  {
    variable: 'drink',
    topic: 'tea or coffee',
    question: 'Do you prefer tea or coffee?',
    answer: 'tea',
    response: '"Me too!", {answer}, "is the best."',
  },
  {
    variable: 'music',
    topic: 'their favourite type of music',
    question: 'What is your favourite type of music?',
    answer: 'rock',
    response: '{answer}, "? Cool!"',
  },
  {
    variable: 'film',
    topic: 'their favourite film',
    question: 'What is your favourite film?',
    answer: 'The Lion King',
    response: '{answer}, "is a great film."',
  },
  {
    variable: 'book',
    topic: 'their favourite book',
    question: 'What is your favourite book?',
    answer: 'The Lion King',
    response: '{answer}, "is a great book."',
  },
  {
    variable: 'allergies',
    topic: 'if they have allergies',
    question: 'Do you have any allergies?',
    answer: 'hayfever',
    response: '"Sorry to hear that.", {answer}, "sounds hard."',
  },
  {
    variable: 'holiday',
    topic: 'their favourite holiday',
    question: 'What is your favourite holiday?',
    answer: 'Christmas',
    response: '"Definitely!", [answer}, "is the best."',
  },
  {
    variable: 'food',
    topic: 'sweet or savoury',
    question: 'Do you prefer sweet or savoury foods?',
    answer: 'sweet foods',
    response: '"I also like", {answer}, "."',
  },
  {
    variable: 'sport',
    topic: 'their favourite sport',
    question: 'What is your favourite sport?',
    answer: 'football',
    response: '"Playing", {answer}, "is great fun."',
  },
  {
    variable: 'animal',
    topic: 'cats or dogs',
    question: 'What is the best Taylor Swift song?',
    answer: 'Wildest Dreams',
    response: '{answer}, "is Taylor\'s best song."',
  },
  {
    variable: 'secret',
    topic: 'for a secret',
    question: 'What is a secret?',
    answer: 'Mr Luther doesn't like ducks',
    response: '"Oh wow! I never knew", {answer}, "."',
  },
  {
    variable: 'place',
    topic: 'their favourite place',
    question: "What is your favourite place you've ever visited?",
    answer: 'Manchester',
    response: '"I really want to go to", {answer}, "."',
  },
  {
    variable: 'bed',
    topic: 'when they go to bed',
    question: 'What time do you go to bed?',
    answer: '10pm',
    response: '{answer}, "is so late!"',
  },
  {
    variable: 'dessert',
    topic: 'their favourite dessert',
    question: 'What is your favourite type of dessert?',
    answer: 'chocolate ice cream',
    response: '"Now I want to eat", {answer}, "."',
  },
  {
    variable: 'wakeup',
    topic: 'when they wake up',
    question: 'What time do you wake up?',
    answer: '6am',
    response: '{answer}, "is so early!"',
  },
  {
    variable: 'memory',
    topic: 'their favourite childhood memory',
    question: 'What is your favourite childhood memory?',
    answer: 'learning to ride a bicycle',
    response: '{answer}, "sounds really fun."',
  },
  {
    variable: 'lunch',
    topic: 'what they do at lunch',
    question: 'What do you do at lunch?',
    answer: 'nap',
    response: '"I want to", {answer}, "too."',
  },
  {
    variable: 'game',
    topic: 'their favourite board game',
    question: 'What is your favourite board game or card game?',
    answer: 'snap',
    response: '"I like playing", {answer}, "too."',
  },
  {
    variable: 'subject',
    topic: 'their favourite subject',
    question: 'What is your favourite subject?',
    answer: 'computing',
    response: '{answer}, "is good."',
  },
  {
    variable: 'job',
    topic: 'their dream job',
    question: 'What is your dream job?',
    answer: 'to be a football player',
    response: '"I hope you can", {answer}, "."',
  },
  {
    variable: 'maccies',
    topic: 'their favourite thing at Maccies',
    question: 'What is the best food at Maccies?',
    answer: 'chicken nuggets',
    response: '"I love", {answer}, "too!"',
  },
  {
    variable: 'outdoor',
    topic: 'their favourite outdoor activity',
    question: 'What is your favourite outdoor activity?',
    answer: 'riding a bike',
    response: '{answer}, "is really good."',
  },
  {
    variable: 'nickname',
    topic: 'their nickname',
    question: 'What is your nickname?',
    answer: 'bob bob',
    response: '{answer}, "is a great nickname."',
  },
  {
    variable: 'tv_show',
    topic: 'their favourite TV show',
    question: 'What is your favourite TV show?',
    answer: 'Bluey',
    response: '"I need to watch", {answer}, "."',
  },
  {
    variable: 'month',
    topic: 'their favourite month',
    question: 'What is your favourite month?',
    answer: 'March',
    response: '"Oh really? I wonder why you like", {answer}, "."',
  },
  {
    variable: 'fruit',
    topic: 'their favourite fruit',
    question: 'What is your favourite fruit?',
    answer: 'banana',
    response: '{answer}, "ice cream sounds good."',
  },
  {
    variable: 'skill',
    topic: 'their special skill',
    question: 'What is your special skill?',
    answer: 'dancing',
    response: '"You must be good at", {answer}, "."',
  },
  {
    variable: 'food',
    topic: 'their favourite type of food',
    question: 'What is the best Pixar film?',
    answer: 'Coco',
    response: '{answer}, "makes me cry."',
  },
  {
    variable: 'name',
    topic: 'their friends name',
    question: 'What is your friends name?',
    answer: 'Sally',
    response: '"Lucky", {answer}, "."',
  },
  {
    variable: 'exercise',
    topic: 'their favourite type of exercise',
    question: 'What is your favourite type of exercise?',
    answer: 'running',
    response: '{answer}, "sounds tiring."',
  },
  {
    variable: 'travel',
    topic: 'if they like travelling',
    question: 'Who is your favourite actor?',
    answer: 'Dwayne Johnson',
    response: '{answer}, "is THE BEST."',
  },
  {
    variable: 'weather',
    topic: 'their favourite type of weather',
    question: 'What is your favourite type of weather?',
    answer: 'sunny',
    response: '"I love it when it is", {answer}, "."',
  },
  {
    variable: 'quote',
    topic: 'their favourite quote',
    question: 'What is your favourite quote?',
    answer: 'Life is trying things to see if they work',
    response: '"I\'ve never heard that.", {answer}, "."',
  },
  {
    variable: 'art',
    topic: 'their favourite type of art',
    question: 'What is your favourite type of art?',
    answer: 'pop art',
    response: '"I need to learn about", {answer}, "."',
  },
  {
    variable: 'superpower',
    topic: 'about superpowers',
    question: 'What superpower would you like?',
    answer: 'fly',
    response: '"I wish I could", {answer}, "."',
  },
  {
    variable: 'flower',
    topic: 'their favourite type of flower',
    question: 'What is your favourite type of flower?',
    answer: 'daisy',
    response: '{answer}, "is such a pretty flower."',
  },
  {
    variable: 'future',
    topic: 'their plan for the future',
    question: 'What is your plan for the future?',
    answer: 'learn to fly',
    response: '"I hope you can", {answer}, "."',
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
  topicEle.innerText = `ask someone ${question.topic}.`;
  exampleQuestionEle.innerText = question.question;
  exampleAnswerEle.innerText = question.answer;
  exampleResponseEle.innerText = question.response
    .replace('{answer}', question.answer)
    .replaceAll('"', '')
    .replaceAll(',', '');
  codeQuestionEle.innerText = `${question.variable} = input("${question.question} ")`;
  codeResponseEle.innerText = `print(${replaceText(question.response, question, true)})`;
}

// fills in variable names in template literals
function replaceText(text, question, code = true) {
  return text.replaceAll('{answer}', question.variable);
}

function showHelp() {
  codeEle.classList.toggle('hidden');
}

function copyCode() {
  const codeText = document
    .querySelector('.code')
    .innerText.replace('📋\n\n', '');
  navigator.clipboard.writeText(codeText);
}

// function generatePrintStatement(response, variableName) {
//   const splitResponse = response.split('{answer}');
//   return `print(${splitResponse[0] ? `"${splitResponse[0]} ", ` : ``}${variableName} ${splitResponse[1] ? `, " ${splitResponse[1]}"` : ``})`;
// }
