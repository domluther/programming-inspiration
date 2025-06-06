import {
  showHelp,
  showBackground,
  copyCode,
  setupTabs,
  replaceText,
  generateQuestionNumber,
} from './utils.js';

// Buttons
const inspireBtn = document.querySelector('#inspire');
const helpBtn = document.querySelector('#help');
const backgroundBtn = document.querySelector('#background');
const forceSpongeBtn = document.querySelector('#forceSpongebob');
const copyBtn = document.querySelector('#copyMe');

// Sections
const exampleEle = document.querySelector('.example');
const codeEle = document.querySelector('.code');
const cartoon1Ele = document.querySelector('.cartoon1');
const cartoon2Ele = document.querySelector('.cartoon2');

// Cartoon
const topicEle = document.querySelector('#topic');
const originalQuestionEle = document.querySelector('#originalQuestion');
const repeatedQuestionEle = document.querySelector('#repeatedQuestion');
const wrongReplyEle = document.querySelector('#wrongReply');
const correctReplyEle = document.querySelector('#correctReply');
const finalMessageEle = document.querySelector('#finalMessage');

// Code section
const firstVariableEle = document.querySelector('#firstVariable');
const secondVariableEle = document.querySelector('#secondVariable');
const whileConditionEle = document.querySelector('#whileCondition');
const loopActionEle = document.querySelector('#loopAction');
const followUpQuestionEle = document.querySelector('#followUpQuestion');
const finalActionEle = document.querySelector('#finalAction');

inspireBtn.addEventListener('click', inspire);
helpBtn.addEventListener('click', showHelp);
copyBtn.addEventListener('click', copyCode);
backgroundBtn.addEventListener('click', showBackground);
forceSpongeBtn.addEventListener('click', () => inspire('bob'));

// correct_password = "secret123"
// attempt = input("Enter the password: ")
// while attempt != correct_password:
//     print("Incorrect password.")
//     attempt = input("Try again: ")
// print("Access granted!")

// https://www.convertcsv.com/csv-to-json.htm to create
const questions = [
  {
    topic: 'ask for the best Spongebob character until correct',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'character',
    initialValue: '"patrick"',
    wrongReply: 'mr krabs',
    correctReply: 'patrick',
    originalQuestion: '"Who is the best Spongebob character? "',
    condition: '{variable2} != {variable1}',
    loopMessage: '"Not a chance!"',
    loopAction: 'print({loopMessage})',
    finalMessage: '"Glad you agree!"',
    finalAction: 'print({finalMessage})',
    // followUpQuestion: 'input({originalQuestion})',
  },
  {
    topic: 'add numbers input by the user until they enter a number over 5',
    pattern: 'int',
    variable1: 'limit',
    variable2: 'value',
    initialValue: '5',
    wrongReply: '2',
    correctReply: '10',
    answer1: '12',
    answer2: '10',
    originalQuestion: '"Enter a number over 5 to stop: "',
    condition: '{variable2} <= {variable1}',
    loopAction: 'print({loopMessage})',
    loopMessage: '"Too small"',
    finalMessage: '"You entered", {answer2}',
    finalAction: 'print({finalMessage})',
    // followUpQuestion: 'int(input({originalQuestion}))',
  },
  {
    topic: 'count down from 5 to 1 and then prints "Blast off!"',
    pattern: 'noInput',
    variable1: 'count',
    initialValue: '5',
    combinedMessage: '5, 4, 3, 2, 1',
    condition: '{variable1} > 0',
    update: '{variable1} - 1',
    loopAction: 'print({variable1})',
    loopAction2: '{variable1} = {variable1} - 1',
    finalMessage: '"Blast off!"',
    finalAction: 'print({finalMessage})',
  },
    {
    topic: 'count up from 1 to 10 and then prints "Coming ready or not!"',
    pattern: 'noInput',
    variable1: 'count',
    initialValue: '1',
    combinedMessage: '1, 2, 3, 4, 5, 6, 7, 8, 9, 10',
    condition: '{variable1} <= 10',
    update: '{variable1} + 1',
    loopAction: 'print({variable1})',
    loopAction2: '{variable1} = {variable1} + 1',
    finalMessage: '"Coming ready or not!"',
    finalAction: 'print({finalMessage})',
  },
  {
    topic: 'guess the number of planets in the solar system',
    pattern: 'int',
    variable1: 'correct_count',
    variable2: 'guess',
    initialValue: '8',
    wrongReply: '9',
    correctReply: '8',
    originalQuestion: '"How many planets in our solar system? "',
    condition: '{variable2} != {variable1}',
    loopMessage: '"Nope, Pluto is not a planet."',
    loopAction: 'print({loopMessage})',
    finalMessage: '"Correct! There are 8 planets in our solar system."',
    finalAction: 'print({finalMessage})',
  },
  {
    topic: 'guess the secret word until correct',
    pattern: 'string',
    variable1: 'secret_word',
    variable2: 'guess',
    initialValue: '"python"',
    wrongReply: 'code',
    correctReply: 'python',
    originalQuestion: '"Guess the secret word: "',
    condition: '{variable2} != {variable1}',
    loopMessage: '"Incorrect. It\'s a type of snake."',
    loopAction: 'print({loopMessage})',
    finalMessage: '"Well done! Python is correct!"',
    finalAction: 'print({finalMessage})',
  },

  {
    topic: 'guess the Hogwarts house until correct',
    pattern: 'string',
    variable1: 'correct_house',
    variable2: 'guess',
    initialValue: '"gryffindor"',
    wrongReply: 'slytherin',
    correctReply: 'gryffindor',
    originalQuestion: '"Guess Harry Potter\'s Hogwarts house: "',
    condition: '{variable2} != {variable1}',
    loopMessage: '"Not quite! Try again."',
    loopAction: 'print({loopMessage})',
    finalMessage: '"Correct! 10 points to Gryffindor!"',
    finalAction: 'print({finalMessage})',
  },
  {
    topic: 'guess the capital of France until correct',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'guess',
    initialValue: '"paris"',
    wrongReply: 'london',
    correctReply: 'paris',
    originalQuestion: '"What is the capital of France? "',
    condition: '{variable2} != {variable1}',
    loopMessage: '"Nope. Starts with a p."',
    loopAction: 'print({loopMessage})',
    finalMessage: '"Correct! Paris is indeed the capital of France."',
    finalAction: 'print({finalMessage})',
  },

  {
    topic: 'ask for a password until the correct one is entered',
    pattern: 'string',
    variable1: 'correct_password',
    variable2: 'attempt',
    initialValue: '"secret123"',
    wrongReply: 'password',
    correctReply: 'secret123',
    originalQuestion: '"Enter the password: "',
    condition: '{variable2} != {variable1}',
    loopMessage: '"Incorrect password."',
    loopAction: 'print({loopMessage})',
    finalMessage: '"Access granted!"',
    finalAction: 'print({finalMessage})',
    // followUpQuestion: 'input({originalQuestion})',
  },

  {
    topic: 'ask to repeat until told to stop',
    pattern: 'string',
    variable1: 'stop',
    variable2: 'feedback',
    initialValue: '"no"',
    wrongReply: 'yes',
    correctReply: 'no',
    originalQuestion: '"Should I continue? "',
    condition: '{variable2} != {variable1}',
    loopMessage: '"OK! Blah blah blah!"',
    loopAction: 'print({loopMessage})',
    finalMessage: '"Bye!"',
    finalAction: 'print({finalMessage})',
    // followUpQuestion: 'input({originalQuestion})',
  },

  {
    topic: 'add numbers input by the user until they enter 0',
    pattern: 'int',
    variable1: 'total',
    variable2: 'number',
    initialValue: '0',
    wrongReply: '8',
    correctReply: '0',
    answer1: '12',
    originalQuestion: '"Enter a number (0 to stop)"',
    condition: '{variable2} != 0',
    loopAction: '{variable1} = {variable1} + {variable2}',
    finalMessage: '"The sum is", {answer1}',
    finalAction: 'print({finalMessage})',
    // followUpQuestion: 'int(input({originalQuestion}))',
  },
  {
    topic: 'ask to guess a number until they get it right',
    pattern: 'int',
    variable1: 'secret',
    variable2: 'guess',
    initialValue: '7',
    wrongReply: '8',
    correctReply: '7',
    answer1: '12',
    originalQuestion: '"Guess the number: "',
    condition: '{variable2} != {variable1}',
    loopMessage: '"Wrong guess!"',
    loopAction: 'print({loopMessage})',
    finalMessage: '"Correct! You guessed it!"',
    finalAction: 'print({finalMessage})',
    // followUpQuestion: 'int(input({originalQuestion}))',
  },
  // Checks v 100 before adding it so needs an extra check due to how loop + asking again are backwards
  {
    topic: 'find the sum of numbers until reaching 100',
    pattern: 'int',
    variable1: 'total',
    variable2: 'number',
    initialValue: '0',
    wrongReply: '50',
    correctReply: '100',
    answer1: '120',
    originalQuestion: '"Enter a number to add: "',
    condition: '{variable1} < 100',
    loopAction: '{variable1} = {variable1} + {variable2}',
    finalMessage: '"The sum is", {answer1}',
    finalAction: 'print({finalMessage}, "Total:", {variable1})',
    // followUpQuestion: 'int(input({originalQuestion}))',
  },
  {
    topic: 'enter numbers until their product exceeds 1000',
    pattern: 'int',
    variable1: 'product',
    variable2: 'number',
    initialValue: '1',
    wrongReply: '5',
    correctReply: '72',
    answer1: '2200',
    originalQuestion: '"Enter a number to multiply: "',
    condition: '{variable1} <= 1000',
    loopAction: '{variable1} = {variable1} * {variable2}',
    finalMessage: '"The product is", {answer1}',
    finalAction: 'print({finalMessage})',
    // followUpQuestion: 'int(input({originalQuestion}))',
  },
];

function inspire(override) {
  exampleEle.classList.remove('hidden');
  // Help should be hidden at start
  codeEle.classList.add('hidden');

  // Randomly pick a question number then set the text values
  const numOfQuestions = questions.length;
  const questionToPick =
    override === 'bob' ? 1 : generateQuestionNumber(numOfQuestions);
  const question = questions[questionToPick - 1];
  topicEle.innerText = `${question.topic}.`;

  setCaptions(question);
  setCode(question);
}

document.addEventListener('DOMContentLoaded', setupTabs);

function setCaptions(question) {
  // What pattern is it?
  const { pattern } = question;

  if (pattern === 'int' || pattern === 'string') {
    cartoon1Ele.classList.remove('hidden');
    cartoon2Ele.classList.add('hidden');
    // Fill in blanks on cartoon
    cartoon1Ele.classList.remove('hidden');
    originalQuestionEle.innerText = question.originalQuestion.replaceAll(
      '"',
      ''
    );
    wrongReplyEle.innerText = question.wrongReply;
    // show the loopMessage before asking question again
    repeatedQuestionEle.innerText =
      `${question.loopMessage || ''}\n${question.originalQuestion}`.replaceAll(
        '"',
        ''
      );
    correctReplyEle.innerText = question.correctReply;
    finalMessageEle.innerText = replaceText(
      question.finalMessage,
      question,
      false
    )
      .replaceAll('"', '')
      .replaceAll(',', '');
  } else if (pattern === 'noInput') {
    console.log('no inputs');
    cartoon2Ele.classList.remove('hidden');
    cartoon1Ele.classList.add('hidden');

    const exampleQuestionEle = document.querySelector('#exampleQuestion');
    const exampleAnswerEle = document.querySelector('#exampleAnswer');
    const exampleResponseEle = document.querySelector('#exampleResponse');

    originalQuestionEle.innerText = ''
    exampleQuestionEle.innerText = question.combinedMessage;
    exampleAnswerEle.innerText = '...';
    exampleResponseEle.innerText = replaceText(
      question.finalMessage,
      question,
      false
    )
      .replaceAll('"', '')
      .replaceAll(',', '');
  }
}

function setCode(question) {
  console.log(question)
  // What pattern is it?
  const { pattern } = question;

  // Fill in code block
  firstVariableEle.innerText = `${question.variable1} = ${question.initialValue}`;
  if (pattern === 'int') {
    secondVariableEle.innerText = `${question.variable2} = int(input(${replaceText(question.originalQuestion, question)}))`;
    followUpQuestionEle.innerText = `  ${question.variable2} = int(input(${replaceText(question.originalQuestion, question)}))`;
  } else if (pattern === 'string') {
    secondVariableEle.innerText = `${question.variable2} = input(${replaceText(question.originalQuestion, question)})`;
    followUpQuestionEle.innerText = `  ${question.variable2} = input(${replaceText(question.originalQuestion, question)})`;
  } else if (pattern === 'noInput') {
    // No input has a second loop action instead of a follow up question
    followUpQuestionEle.innerText = `  ${replaceText(question.loopAction2, question)}`;
    secondVariableEle.innerText = ''
  }

  whileConditionEle.innerText = `while ${replaceText(question.condition, question)}:`;
  loopActionEle.innerText = `  ${replaceText(question.loopAction, question)}`;
  finalActionEle.innerText = replaceText(question.finalAction, question);
}
