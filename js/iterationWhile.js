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
const followUpQuestionEle = document.querySelector('#followUpQuestion');
const finalActionEle = document.querySelector('#finalAction');
const codeResponseEle = document.querySelector('#response');

inspireBtn.addEventListener('click', inspire);
helpBtn.addEventListener('click', showHelp);
copyBtn.addEventListener('click', copyCode);
backgroundBtn.addEventListener('click', showBackground);
forceSpongeBtn.addEventListener('click', () => inspire('bob'));

// https://www.convertcsv.com/csv-to-json.htm to create
const questions = [
  // {
  //   topic: 'count down from 10 to 1 and then prints "Blast off!"',
  //   pattern: 'noInput',
  //   variable1: 'countdown',
  //   variable2: '',
  //   initialValue: '10',
  //   condition: '{variable1} > 0',
  //   update: '{variable1} - 1',
  //   loopAction: 'print({variable1})',
  //   finalAction: 'print("Blast off!")',
  // },
  // // current = 10
  // // endAt = 0
  // // while current != endAt:
  // //    print(current)
  // //    current = current - 1
  // // print("Blast Off!")

  {
    topic: 'asks for a password until the correct one is entered',
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
  // correct_password = "secret123"
  // attempt = input("Enter the password: ")
  // while attempt != correct_password:
  //     print("Incorrect password.")
  //     attempt = input("Try again: ")
  // print("Access granted!")

  {
    topic: 'asks to repeat until told to stop',
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
  {
    topic: 'find the sum of numbers until reaching 100',
    pattern: 'int',
    variable1: 'total',
    variable2: 'number',
    initialValue: '0',
    wrongReply: '50',
    correctReply: '100',
    answer1: '120',
    originalQuestion: '"Enter a number to add (or 0 to finish): "',
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
  }
  //  else {
  //   console.log('two inputs');
  //   cartoon2Ele.classList.remove('hidden');
  //   cartoon1Ele.classList.add('hidden');

  //   exampleQuestion1Ele.innerText = question.question1;
  //   exampleQuestion2Ele.innerText = question.question2;
  //   exampleAnswer1Ele.innerText = question.answer1;
  //   exampleAnswer2Ele.innerText = question.answer2;
  //   exampleResponse2Ele.innerText = replaceText(
  //     question.response,
  //     question,
  //     false
  //   )
  //     .replaceAll('"', '')
  //     .replaceAll(',', '');
  // }
  // Fill in code block
  firstVariableEle.innerText = `${question.variable1} = ${question.initialValue}`;
  if (pattern === 'int') {
    secondVariableEle.innerText = `${question.variable2} = int(input(${replaceText(question.originalQuestion, question)}))`;
    followUpQuestionEle.innerText = `  ${question.variable2} = int(input(${replaceText(question.originalQuestion, question)}))`;
  } else {
    secondVariableEle.innerText = `${question.variable2} = input(${replaceText(question.originalQuestion, question)})`;
    followUpQuestionEle.innerText = `  ${question.variable2} = input(${replaceText(question.originalQuestion, question)})`;
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
