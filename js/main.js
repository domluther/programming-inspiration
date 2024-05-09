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
    Variable: 'spongebob',
    Topic: 'their favourite Spongebob character',
    Question: 'Who is the best Spongebob character?',
    Answer: 'Sponge',
    Response: 'Absolutely. No-one is better than {answer}.',
  },
  {
    Variable: 'name',
    Topic: 'their name',
    Question: 'What is your full name?',
    Answer: 'Bob',
    Response: 'Nice to meet you {answer}.',
  },
  {
    Variable: 'age',
    Topic: 'their age',
    Question: 'How old are you?',
    Answer: '25',
    Response: 'Oh wow! I am {answer} too!',
  },
  {
    Variable: 'birthday',
    Topic: 'their birthday',
    Question: 'When is your birthday?',
    Answer: 'March 23rd',
    Response: 'I will add {answer} to my calendar!',
  },
  {
    Variable: 'born',
    Topic: 'where they were born',
    Question: 'Where were you born?',
    Answer: 'Crewe',
    Response: 'I really like {answer}.',
  },
  {
    Variable: 'hometown',
    Topic: 'their hometown',
    Question: 'What is your current hometown?',
    Answer: 'Manchester',
    Response: "I've never been to {answer}.",
  },
  {
    Variable: 'job',
    Topic: 'their job',
    Question: 'What is your occupation?',
    Answer: 'teacher',
    Response: 'I think being a {answer} sounds good.',
  },
  {
    Variable: 'hobby',
    Topic: 'their hobby',
    Question: 'What is your favourite hobby?',
    Answer: 'dancing',
    Response: "I've never tried {answer}.",
  },
  {
    Variable: 'siblings',
    Topic: 'about siblings',
    Question: 'How many siblings do you have?',
    Answer: '4',
    Response: 'Oh really? {answer}?',
  },
  {
    Variable: 'food',
    Topic: 'their favourite food',
    Question: 'What is your favourite food?',
    Answer: 'eggs',
    Response: '{answer} sounds yummy.',
  },
  {
    Variable: 'colour',
    Topic: 'their favourite colour',
    Question: 'What is your favourite colour?',
    Answer: 'orange',
    Response: 'I love {answer} too!',
  },
  {
    Variable: 'time',
    Topic: 'about mornings or evenings',
    Question: 'Are you a morning person or a night owl?',
    Answer: 'morning person',
    Response: 'I am also a {answer}.',
  },
  {
    Variable: 'pets',
    Topic: 'about pets',
    Question: 'Do you have any pets?',
    Answer: 'a dog',
    Response: 'I really want {answer}.',
  },
  {
    Variable: 'season',
    Topic: 'their favourite season',
    Question: 'What is your favourite season?',
    Answer: 'winter',
    Response: 'Yes! {answer} is the best.',
  },
  {
    Variable: 'film_genre',
    Topic: 'their favourite film genre',
    Question: 'What is your favourite film genre?',
    Answer: 'comedy',
    Response: 'I like {answer} films too.',
  },
  {
    Variable: 'drink',
    Topic: 'tea or coffee',
    Question: 'Do you prefer tea or coffee?',
    Answer: 'tea',
    Response: 'Me too! {answer} is the best.',
  },
  {
    Variable: 'music',
    Topic: 'their favourite type of music',
    Question: 'What is your favourite type of music?',
    Answer: 'rock',
    Response: '{answer} ? Cool!',
  },
  {
    Variable: 'film',
    Topic: 'their favourite film',
    Question: 'What is your favourite film?',
    Answer: 'The Lion King',
    Response: '{answer} is a great film.',
  },
  {
    Variable: 'book',
    Topic: 'their favourite book',
    Question: 'What is your favourite book?',
    Answer: 'The Lion King',
    Response: '{answer} is a great book.',
  },
  {
    Variable: 'allergies',
    Topic: 'if they have allergies',
    Question: 'Do you have any allergies?',
    Answer: 'hayfever',
    Response: 'Sorry to hear that. {answer} sounds hard.',
  },
  {
    Variable: 'holiday',
    Topic: 'their favourite holiday',
    Question: 'What is your favourite holiday?',
    Answer: 'Christmas',
    Response: 'Definitely! [answer} is the best.',
  },
  {
    Variable: 'food',
    Topic: 'sweet or savoury',
    Question: 'Do you prefer sweet or savoury foods?',
    Answer: 'sweet foods',
    Response: 'I also like {answer}.',
  },
  {
    Variable: 'sport',
    Topic: 'their favourite sport',
    Question: 'What is your favourite sport?',
    Answer: 'football',
    Response: 'Playing {answer} is great fun.',
  },
  {
    Variable: 'animal',
    Topic: 'cats or dogs',
    Question: 'What is the best Taylor Swift song?',
    Answer: 'Wildest Dreams',
    Response: "{answer} is Taylor's best song.",
  },
  {
    Variable: 'secret',
    Topic: 'for a secret',
    Question: 'What is a secret?',
    Answer: 'my middle name is gerald',
    Response: 'Oh wow! I never knew {answer}.',
  },
  {
    Variable: 'place',
    Topic: 'their favourite place',
    Question: "What is your favourite place you've ever visited?",
    Answer: 'Manchester',
    Response: 'I really want to go to {answer}.',
  },
  {
    Variable: 'bed',
    Topic: 'when they go to bed',
    Question: 'What time do you go to bed?',
    Answer: '10pm',
    Response: '{answer} is so late!',
  },
  {
    Variable: 'dessert',
    Topic: 'their favourite dessert',
    Question: 'What is your favourite type of dessert?',
    Answer: 'chocolate ice cream',
    Response: 'Now I want to eat {answer}.',
  },
  {
    Variable: 'wakeup',
    Topic: 'when they wake up',
    Question: 'What time do you wake up?',
    Answer: '6am',
    Response: '{answer} is so early!',
  },
  {
    Variable: 'memory',
    Topic: 'their favourite childhood memory',
    Question: 'What is your favourite childhood memory?',
    Answer: 'learning to ride a bicycle',
    Response: '{answer} sounds really fun.',
  },
  {
    Variable: 'lunch',
    Topic: 'what they do at lunch',
    Question: 'What do you do at lunch?',
    Answer: 'nap',
    Response: 'I want to {answer} too.',
  },
  {
    Variable: 'game',
    Topic: 'their favourite board game',
    Question: 'What is your favourite board game or card game?',
    Answer: 'snap',
    Response: 'I like playing {answer} too.',
  },
  {
    Variable: 'subject',
    Topic: 'their favourite subject',
    Question: 'What is your favourite subject?',
    Answer: 'computing',
    Response: '{answer} is good.',
  },
  {
    Variable: 'job',
    Topic: 'their dream job',
    Question: 'What is your dream job?',
    Answer: 'to be a football player',
    Response: 'I hope you can {answer}.',
  },
  {
    Variable: 'maccies',
    Topic: 'their favourite thing at Maccies',
    Question: 'What is the best food at Maccies?',
    Answer: 'chicken nuggets',
    Response: 'I love {answer} too!',
  },
  {
    Variable: 'outdoor',
    Topic: 'their favourite outdoor activity',
    Question: 'What is your favourite outdoor activity?',
    Answer: 'riding a bike',
    Response: '{answer} is really good.',
  },
  {
    Variable: 'nickname',
    Topic: 'their nickname',
    Question: 'What is your nickname?',
    Answer: 'bob bob',
    Response: '{answer} is a great nickname.',
  },
  {
    Variable: 'tv_show',
    Topic: 'their favourite TV show',
    Question: 'What is your favourite TV show?',
    Answer: 'Bluey',
    Response: 'I need to watch {answer}.',
  },
  {
    Variable: 'month',
    Topic: 'their favourite month',
    Question: 'What is your favourite month?',
    Answer: 'March',
    Response: 'Oh really? I wonder why you like {answer}.',
  },
  {
    Variable: 'fruit',
    Topic: 'their favourite fruit',
    Question: 'What is your favourite fruit?',
    Answer: 'bananas',
    Response: '{answer} ice cream sounds good.',
  },
  {
    Variable: 'skill',
    Topic: 'their special skill',
    Question: 'What is your special skill?',
    Answer: 'dancing',
    Response: 'You must be good at {answer}.',
  },
  {
    Variable: 'pixar',
    Topic: 'the best Pixar film',
    Question: 'What is the best Pixar film?',
    Answer: 'Coco',
    Response: '{answer} makes me cry.',
  },
  {
    Variable: 'name',
    Topic: 'their friends name',
    Question: 'What is your friends name?',
    Answer: 'Sally',
    Response: 'Lucky {answer}.',
  },
  {
    Variable: 'exercise',
    Topic: 'their favourite type of exercise',
    Question: 'What is your favourite type of exercise?',
    Answer: 'running',
    Response: '{answer} sounds tiring.',
  },
  {
    Variable: 'travel',
    Topic: 'if they like travelling',
    Question: 'Who is your favourite actor?',
    Answer: 'Dwayne Johnson',
    Response: '{answer} is THE BEST.',
  },
  {
    Variable: 'weather',
    Topic: 'their favourite type of weather',
    Question: 'What is your favourite type of weather?',
    Answer: 'sunny',
    Response: 'I love it when it is {answer}.',
  },
  {
    Variable: 'quote',
    Topic: 'their favourite quote',
    Question: 'What is your favourite quote?',
    Answer: 'Life is trying things to see if they work',
    Response: "I've never heard that. {answer}.",
  },
  {
    Variable: 'art',
    Topic: 'their favourite type of art',
    Question: 'What is your favourite type of art?',
    Answer: 'pop art',
    Response: 'I need to learn about {answer}.',
  },
  {
    Variable: 'superpower',
    Topic: 'about superpowers',
    Question: 'What superpower would you like?',
    Answer: 'fly',
    Response: 'I wish I could {answer}.',
  },
  {
    Variable: 'flower',
    Topic: 'their favourite type of flower',
    Question: 'What is your favourite type of flower?',
    Answer: 'daisy',
    Response: '{answer} is such a pretty flower.',
  },
  {
    Variable: 'future',
    Topic: 'their plan for the future',
    Question: 'What is your plan for the future?',
    Answer: 'learn to fly',
    Response: 'I hope you can {answer}.',
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
  topicEle.innerText = `ask someone ${question.Topic}.`;
  exampleQuestionEle.innerText = question.Question;
  exampleAnswerEle.innerText = question.Answer;
  exampleResponseEle.innerText = question.Response.replace(
    '{answer}',
    question.Answer
  );
  codeQuestionEle.innerText = `${question.Variable} = input("${question.Question} ")`;
  codeResponseEle.innerText = generatePrintStatement(
    question.Response,
    question.Variable
  );
}

function showHelp() {
  codeEle.classList.toggle('hidden');
}

function copyCode() {
  let codeText = `${codeQuestionEle.innerText}\n${codeResponseEle.innerText}`;
  navigator.clipboard.writeText(codeText);
}

function generatePrintStatement(response, variableName) {
  const splitResponse = response.split('{answer}');
  return `print(${splitResponse[0] ? `"${splitResponse[0]} + "` : ``}${variableName} ${splitResponse[1] ? `+ " ${splitResponse[1]}"` : ``})`;
}
