import {
  showHelp,
  showBackground,
  copyCode,
  setupTabs,
  replaceText,
} from './utils.js';

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

// Cartoon captions
const topicEle = document.querySelector('#topic');
const exampleQuestionEle = document.querySelector('#exampleQuestion');
const exampleQuestion1Ele = document.querySelector('#exampleQuestion1');
const exampleQuestion2Ele = document.querySelector('#exampleQuestion2');
const exampleAnswerEle = document.querySelector('#exampleAnswer');
const exampleAnswer1Ele = document.querySelector('#exampleAnswer1');
const exampleAnswer2Ele = document.querySelector('#exampleAnswer2');
const exampleResponseEle = document.querySelector('#exampleResponse');
const exampleResponse2Ele = document.querySelector('#exampleResponse2');

// Code section
const codeQuestion1Ele = document.querySelector('#codeQuestion1');
const codeQuestion2Ele = document.querySelector('#codeQuestion2');
const codeCalculationEle = document.querySelector('#codeCalculation');
const codeResponseEle = document.querySelector('#response');

inspireBtn.addEventListener('click', inspire);
helpBtn.addEventListener('click', showHelp);
copyBtn.addEventListener('click', copyCode);
backgroundBtn.addEventListener('click', showBackground);
forceSpongeBtn.addEventListener('click', () => inspire('bob'));

// https://www.convertcsv.com/csv-to-json.htm to create
const questions = [
  {
    topic: 'work out how many hours Squidward has practiced',
    variable1: 'hours',
    variable2: 'days',
    variable3: 'hours_practiced',
    question1: 'How many hours a day has Squidward practiced?',
    question2: 'How many days?',
    answer1: '4',
    answer2: '9',
    calculation: '{variable1} * {variable2}',
    result: 36,
    response: '"Squidward has practiced", {result}, "hours"',
  },
  {
    topic: 'add two numbers together',
    variable1: 'num1',
    variable2: 'num2',
    variable3: 'total',
    question1: 'Give me a number',
    question2: 'Give me another number',
    answer1: '4',
    answer2: '9',
    calculation: '{variable1} + {variable2}',
    result: 13,
    response: '{answer1}, "+", {answer2}, "is", {result}',
  },
  {
    topic: 'times two numbers together',
    variable1: 'num1',
    variable2: 'num2',
    variable3: 'total',
    question1: 'Give me a number',
    question2: 'Give me another number',
    answer1: '4',
    answer2: '9',
    calculation: '{variable1} * {variable2}',
    result: 36,
    response: '{answer1}, "*", {answer2}, "is", {result}',
  },
  {
    topic: 'divide one number by another',
    variable1: 'num1',
    variable2: 'num2',
    variable3: 'total',
    question1: 'Give me a number',
    question2: 'Give me another number',
    answer1: '5',
    answer2: '10',
    calculation: '{variable1}  / {variable2}',
    result: 0.5,
    response: '{answer1}, "/", {answer2}, "is", {result}',
  },
  {
    topic: 'take one number from the other',
    variable1: 'num1',
    variable2: 'num2',
    variable3: 'total',
    question1: 'Give me a number',
    question2: 'Give me another number',
    answer1: '10',
    answer2: '4',
    calculation: '{variable1}  - {variable2}',
    result: 6,
    response: '{answer1}, "-", {answer2}, "is", {result}',
  },
  {
    topic: "tell you how old you'll be in ten years",
    variable1: 'age',
    variable2: '',
    variable3: 'age_in_ten',
    question1: 'How old are you now?',
    question2: '',
    answer1: '15',
    answer2: '',
    calculation: '{variable1} + 10',
    result: 25,
    response: '"In 10 years, you will be", {result}',
  },
  {
    topic: "tell you how old you'll be next year",
    variable1: 'age',
    variable2: '',
    variable3: 'age_next_year',
    question1: 'How old are you now?',
    question2: '',
    answer1: '15',
    answer2: '',
    calculation: '{variable1} + 1',
    result: 16,
    response: '"Next year, you\'ll be", {result}',
  },
  {
    topic: 'tell you how old you were last year',
    variable1: 'age',
    variable2: '',
    variable3: 'age_last_year',
    question1: 'How old are you now?',
    question2: '',
    answer1: '15',
    answer2: '',
    calculation: '{variable1} - 1',
    result: 14,
    response: '"Last year, you were", {result}',
  },
  {
    topic: 'work out how many pizza slices there are left',
    variable1: 'slices_start',
    variable2: 'slices_eaten',
    variable3: 'slices_left',
    question1: 'How many slices did you have?',
    question2: 'How many slices did you eat?',
    answer1: '8',
    answer2: '2',
    calculation: '{variable1}  - {variable2}',
    result: 6,
    response: '"You have", {result}, "slices left"',
  },
  {
    topic: 'work out how much each person owes',
    variable1: 'total_bill',
    variable2: 'diners',
    variable3: 'each_owe',
    question1: 'How much is the bill?',
    question2: 'How many people are there?',
    answer1: '10',
    answer2: '2',
    calculation: '{variable1}  / {variable2}',
    result: '£5',
    response: '"You each owe", {result}',
  },
  {
    topic: 'convert someones weight to kilograms',
    variable1: 'weight_pounds',
    variable2: '',
    variable3: 'weight_kg',
    question1: 'How heavy is it in pounds?',
    question2: '',
    answer1: '10',
    answer2: '',
    calculation: '{variable1} / 2.2',
    result: 4.5,
    response: '{answer1}, "lbs is", {result}, "kg"',
  },
  {
    topic: 'tell them how many times a number fits in',
    variable1: 'num1',
    variable2: 'num2',
    variable3: 'fits_in',
    question1: 'Give me a number',
    question2: 'Give me another number',
    answer1: '20',
    answer2: '3',
    calculation: '{variable1} // {variable2}',
    result: 6,
    response: '"There are", {result}, {answer2},"s in", {answer1}',
  },
  {
    topic: 'tell them the remainder when dividing',
    variable1: 'num1',
    variable2: 'num2',
    variable3: 'remainder',
    question1: 'Give me a number',
    question2: 'Give me another number',
    answer1: '20',
    answer2: '3',
    calculation: '{variable1} % {variable2}',
    result: 2,
    response:
      '"There are", {result}, "left over after dividing", {answer1}, "by", {answer2}',
  },
  {
    topic: 'tell them how many hours there are in that many days',
    variable1: 'days',
    variable2: '',
    variable3: 'hours',
    question1: 'Give me a number of hours',
    question2: '',
    answer1: '5',
    answer2: '',
    calculation: '{variable1} * 24',
    result: 120,
    response: '"There are", {result}, "hours in", {answer1}, "days"',
  },
  {
    topic: 'tell someone how long it will take to save their pocket money',
    variable1: 'pocket_money',
    variable2: 'goal',
    variable3: 'months_to_save',
    question1: 'How much is your pocket money?',
    question2: 'How much do you want to save?',
    answer1: '£30 ',
    answer2: '£150 ',
    calculation: '{variable2} / {variable1}',
    result: 5,
    response: '"It will take", {result}, "weeks to save ", {answer2}',
  },
  {
    topic: 'work out how much someone spends on chocolate',
    variable1: 'chocolate_bars',
    variable2: 'price',
    variable3: 'total_spend',
    question1: 'How many chocolate bars are you buying?',
    question2: 'How much is one bar?',
    answer1: '5',
    answer2: '£2 ',
    calculation: '{variable1} * {variable2}',
    result: 10,
    response: '{answer1}, "chocolate bars is", {result}',
  },
  {
    topic: 'work out how much you can spend every day on holiday',
    variable1: 'holiday_money',
    variable2: 'days',
    variable3: 'daily_spend',
    question1: 'How much money do you have?',
    question2: 'How many days is your holiday?',
    answer1: '£50 ',
    answer2: '5',
    calculation: '{variable1}  / {variable2}',
    result: 10,
    response: '"You will have £", {result}, "a day"',
  },
  {
    topic: 'calculate the area of a rectangle',
    variable1: 'length',
    variable2: 'width',
    variable3: 'area',
    question1: "What's the length of the rectangle?",
    question2: "What's the width of the rectangle?",
    answer1: '25',
    answer2: '5',
    calculation: '{variable1} * {variable2}',
    result: 125,
    response: '"The area of the rectangle is", {result}',
  },
  {
    topic: 'calculate the perimeter of a rectangle',
    variable1: 'length',
    variable2: 'width',
    variable3: 'perimeter',
    question1: "What's the length of the rectangle?",
    question2: "What's the width of the recatangle?",
    answer1: '25',
    answer2: '5',
    calculation: '{variable1} + {variable1} + {variable2} + {variable2}',
    result: 60,
    response: '"The perimeter of the rectangle is", {result}',
  },
  {
    topic: 'tell them how many seconds there are in that many minutes',
    variable1: 'minutes',
    variable2: '',
    variable3: 'seconds',
    question1: 'Give me a number of minutes',
    question2: '',
    answer1: '10',
    answer2: '',
    calculation: '{variable1} * 60',
    result: 600,
    response: '"There are", {result}, "seconds in", {answer1}, "minutes"',
  },
  {
    topic: 'calculate the average of two numbers',
    variable1: 'num1',
    variable2: 'num2',
    variable3: 'average',
    question1: 'Give me a number',
    question2: 'Give me another number',
    answer1: '8',
    answer2: '4',
    calculation: '({variable1} + {variable2}) / 2',
    result: 6,
    response: '"The average is", {result}',
  },
  {
    topic: 'work out the difference in ages',
    variable1: 'age1',
    variable2: 'age2',
    variable3: 'difference',
    question1: 'How old is the first person?',
    question2: 'How old is the second person?',
    answer1: '15',
    answer2: '13',
    calculation: '{variable1}  - {variable2}',
    result: 2,
    response: '"Person 1 is", {result}, "years older"',
  },
  {
    topic: 'work out how many boxes you need',
    variable1: 'cookies',
    variable2: 'cookies_per_box',
    variable3: 'cookie_boxes',
    question1: 'How many cookies are there?',
    question2: 'How many fit in a box?',
    answer1: '40',
    answer2: '5',
    calculation: '{variable1} // {variable2}',
    result: 8,
    response: '{answer1}, "cookies needs", {result}, "boxes"',
  },
  {
    topic: 'say how far you have cycled',
    variable1: 'distance',
    variable2: 'days',
    variable3: 'total_cycled',
    question1: 'How far did you cycle in a day?',
    question2: 'How many days did you cycle for?',
    answer1: '50',
    answer2: '3',
    calculation: '{variable1} * {variable2}',
    result: 150,
    response: '"You cycled", {result}, "km in", {answer2}, "days"',
  },
  {
    topic: 'the square of a number',
    variable1: 'num1',
    variable2: '',
    variable3: 'square',
    question1: 'Give me a number',
    question2: '',
    answer1: '10',
    answer2: '',
    calculation: '{variable1} ** 2',
    result: 100,
    response: '{answer1}, "squared is", {result}',
  },
  {
    topic: 'half a number',
    variable1: 'num1',
    variable2: '',
    variable3: 'half',
    question1: 'Give me a number',
    question2: '',
    answer1: '20',
    answer2: '',
    calculation: '{variable1} / 2',
    result: 10,
    response: '"Half of", {answer1}, "is", {result}',
  },
  {
    topic: 'double a number',
    variable1: 'num1',
    variable2: '',
    variable3: 'double',
    question1: 'Give me a number',
    question2: '',
    answer1: '20',
    answer2: '',
    calculation: '{variable1} * 2',
    result: 40,
    response: '"Double", {answer1}, "is", {result}',
  },
  {
    topic: 'area of a square',
    variable1: 'length',
    variable2: '',
    variable3: 'area',
    question1: 'How long is the square?',
    question2: '',
    answer1: '5',
    answer2: '',
    calculation: '{variable1} * {variable1}',
    result: 25,
    response: '"The square is", {result}, "cm2"',
  },
  {
    topic: 'perimeter of a square',
    variable1: 'length',
    variable2: '',
    variable3: 'perimeter',
    question1: 'How long is the square?',
    question2: '',
    answer1: '4',
    answer2: '',
    calculation: '{variable1} * 4',
    result: 16,
    response: '"The square is", {result}, "cm2"',
  },
  {
    topic: 'triple a number',
    variable1: 'num1',
    variable2: '',
    variable3: 'triple',
    question1: 'Give me a number',
    question2: '',
    answer1: '20',
    answer2: '',
    calculation: '{variable1} * 3',
    result: 60,
    response: '"Triple", {answer1}, "is", {result}',
  },
  {
    topic: 'convert from celsius to fahrenheit',
    variable1: 'celsius',
    variable2: '',
    variable3: 'fahrenheit',
    question1: 'How many celsius',
    question2: '',
    answer1: '30',
    answer2: '',
    calculation: '({variable1} * 9/5) + 32',
    result: 86,
    response: '{answer1}, "celsius is", {result}, "fahrenheit"',
  },
  {
    topic: 'age in months',
    variable1: 'age_years',
    variable2: '',
    variable3: 'age_months',
    question1: 'How many years old are you?',
    question2: '',
    answer1: '15',
    answer2: '',
    calculation: '{variable1} * 12',
    result: 180,
    response: '"You are", {result}, "months old"',
  },
  {
    topic: 'area of a cricle',
    variable1: 'radius',
    variable2: '',
    variable3: 'area',
    question1: "What's the radius of the circle?",
    question2: '',
    answer1: '5',
    answer2: '',
    calculation: '3.14 * {variable1} * {variable1}',
    result: 78.5,
    response: '"The circle has an area of", {result}',
  },
];

const numOfQuestions = questions.length;

function inspire(override) {
  exampleEle.classList.remove('hidden');
  codeEle.classList.add('hidden');

  let questionToPick =
    override === 'bob' ? 1 : Math.ceil(Math.random() * questions.length);
  const question = questions[questionToPick - 1];
  topicEle.innerText = `${question.topic}.`;

  setCaptions(question);
  setCode(question);
}

function setCaptions(question) {
  const oneQuestion = question.variable2 === '';
  if (oneQuestion) {
    cartoon1Ele.classList.remove('hidden');
    cartoon2Ele.classList.add('hidden');
    exampleQuestionEle.innerText = question.question1;
    exampleAnswerEle.innerText = question.answer1;
    exampleResponseEle.innerText = replaceText(
      question.response,
      question,
      false
    )
      .replaceAll('"', '')
      .replaceAll(',', '');
  } else {
    cartoon2Ele.classList.remove('hidden');
    cartoon1Ele.classList.add('hidden');

    exampleQuestion1Ele.innerText = question.question1;
    exampleQuestion2Ele.innerText = question.question2;
    exampleAnswer1Ele.innerText = question.answer1;
    exampleAnswer2Ele.innerText = question.answer2;
    exampleResponse2Ele.innerText = replaceText(
      question.response,
      question,
      false
    )
      .replaceAll('"', '')
      .replaceAll(',', '');
  }
}

function setCode(question) {
  const oneQuestion = question.variable2 === '';
  codeQuestion1Ele.innerText = `${question.variable1} = int(input("${question.question1} "))`;
  // If there is only one question, the second line is blank
  codeQuestion2Ele.innerText = oneQuestion
    ? ''
    : `${question.variable2} = int(input("${question.question2} "))`;
  codeCalculationEle.innerText = `${question.variable3} = ${replaceText(question.calculation, question)}`;
  codeResponseEle.innerText = `print(${replaceText(question.response, question, true)})`;
}

document.addEventListener('DOMContentLoaded', setupTabs);
