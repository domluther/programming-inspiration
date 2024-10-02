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
const loopAction2Ele = document.querySelector('#loopAction2');
const followUpQuestionEle = document.querySelector('#followUpQuestion');
const finalActionEle = document.querySelector('#finalAction');
const codeResponseEle = document.querySelector('#response');

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
  }

  whileConditionEle.innerText = `while ${replaceText(question.condition, question)}:`;
  loopActionEle.innerText = `  ${replaceText(question.loopAction, question)}`;
  finalActionEle.innerText = replaceText(question.finalAction, question);
  // if (!oneQuestion) {
  //   codeQuestion2Ele.innerText = `${question.variable2} = int(input("${question.question2} "))`;
  // }
  // codeCalculationEle.innerText = `${question.variable3} = ${replaceText(question.calculation, question)}`;
  // codeResponseEle.innerText = `print(${replaceText(question.response, question, true)})`;
}

document.addEventListener('DOMContentLoaded', setupTabs);

const toTest = [
  {
    topic: 'keep doubling a number until it exceeds 1000',
    pattern: 'int',
    variable1: 'limit',
    variable2: 'number',
    initialValue: '1000',
    wrongReply: '64',
    correctReply: '1024',
    originalQuestion: '"Enter a starting number: "',
    condition: '{variable2} <= {variable1}',
    loopMessage: '"Current number: {variable2}"',
    loopAction: 'print({loopMessage})\n{variable2} *= 2',
    finalMessage: '"The number has exceeded 1000: {variable2}"',
    finalAction: 'print({finalMessage})',
  },

  {
    topic: 'keep adding prime numbers until sum exceeds 50',
    pattern: 'int',
    variable1: 'sum',
    variable2: 'prime',
    initialValue: '0',
    wrongReply: '4',
    correctReply: '53',
    originalQuestion: '"Enter a prime number: "',
    condition: '{variable1} <= 50',
    loopMessage: '"Current sum: {variable1}"',
    loopAction: 'print({loopMessage})\n{variable1} += {variable2}',
    finalMessage: '"The sum has exceeded 50: {variable1}"',
    finalAction: 'print({finalMessage})',
  },
  {
    topic: 'guess the chemical symbol for gold until correct',
    pattern: 'string',
    variable1: 'correct_symbol',
    variable2: 'guess',
    initialValue: '"Au"',
    wrongReply: 'Go',
    correctReply: 'Au',
    originalQuestion: '"What\'s the chemical symbol for gold? "',
    condition: '{variable2} != {variable1}',
    loopMessage: '"Incorrect. Hint: It comes from the Latin word \'aurum\'."',
    loopAction: 'print({loopMessage})',
    finalMessage: '"Correct! Au is the chemical symbol for gold."',
    finalAction: 'print({finalMessage})',
  },
  {
    topic: 'keep taking away until under 0',
    pattern: 'int',
    variable1: 'target',
    variable2: 'number',
    initialValue: '100',
    wrongReply: '7',
    correctReply: '-5',
    originalQuestion: '"How many to take away?"',
    condition: '{variable1} > 0',
    loopMessage: '"Current value: {variable1}"',
    loopAction: '{variable1} = {variable1} - {variable2}',
    finalMessage: '"The number is now below 0"',
    finalAction: 'print({finalMessage})',
  },
];
