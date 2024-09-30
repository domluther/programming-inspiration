const inspireBtn = document.querySelector('#inspire');
const helpBtn = document.querySelector('#help');
const cartoon1Ele = document.querySelector('.cartoon1');
const cartoon2Ele = document.querySelector('.cartoon2');
const exampleEle = document.querySelector('.example');
const topicEle = document.querySelector('#topic');
const originalQuestionEle = document.querySelector('#originalQuestion');
const repeatedQuestionEle = document.querySelector('#repeatedQuestion');
const wrongReplyEle = document.querySelector('#wrongReply');
const correctReplyEle = document.querySelector('#correctReply');
const finalMessageEle = document.querySelector('#finalMessage');
const codeEle = document.querySelector('.code');
const copyBtn = document.querySelector('#copyMe');
const firstVariableEle = document.querySelector('#firstVariable');
const secondVariableEle = document.querySelector('#secondVariable');
const whileConditionEle = document.querySelector('#whileCondition');
const loopActionEle = document.querySelector('#loopAction');
const followUpQuestionEle = document.querySelector('#followUpQuestion');
const finalActionEle = document.querySelector('#finalAction');
const codeResponseEle = document.querySelector('#response');
const forceSpongeBtn = document.querySelector('#forceSpongebob');

inspireBtn.addEventListener('click', inspire);
helpBtn.addEventListener('click', showHelp);
copyBtn.addEventListener('click', copyCode);
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

  // {
  //   topic: 'asks for a password until the correct one is entered',
  //   pattern: 'string',
  //   variable1: 'correct_password',
  //   variable2: 'attempt',
  //   initialValue: '"secret123"',
  //   originalQuestion: 'Enter the password: ',
  //   condition: '{variable2} != {variable1}',
  //   followUpQuestion: 'input({originalQuestion})',
  //   loopAction: 'print("Incorrect password.")',
  //   finalAction: 'print("Access granted!")',
  // },
  // // correct_password = "secret123"
  // // attempt = input("Enter the password: ")
  // // while attempt != correct_password:
  // //     print("Incorrect password.")
  // //     attempt = input("Try again: ")
  // // print("Access granted!")

  // {
  //   topic: 'asks to repeat until told to stop',
  //   pattern: 'string',
  //   variable1: 'stop',
  //   variable2: 'feedback',
  //   initialValue: '"no"',
  //   originalQuestion: 'Should I continue? ',
  //   condition: '{variable2} != {variable1}',
  //   followUpQuestion: 'input({originalQuestion})',
  //   loopAction: 'print("OK! Blah blah blah.")',
  //   finalAction: 'print("Bye!")',
  // },
  // // stop = "no"
  // // feedback = input("Should I continue: ")
  // // while feedback != stop:
  // //     print("OK! Blah blah blah..")
  // //     feedback = input("Should I continue? ")
  // // print("Bye!")

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
    followUpQuestion: 'int(input({originalQuestion}))',
    loopAction: '{variable1} = {variable1} + {variable2}',
    finalMessage: '"The sum is", {answer1}',
    finalAction: 'print({finalMessage})',
  },
  // total = 0
  // number = int(input("Enter a number (0 to stop): "))
  // while number != 0:
  //   total = total + number
  //   number = int(input("Enter a number (0 to stop): "))
  // print("The sum is", total)
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
    followUpQuestion: 'int(input({originalQuestion}))',
    loopAction: 'print("Wrong guess!")',
    finalMessage: '"Correct! You guessed it!"',
    finalAction: 'print({finalMessage})',
  },
  // secret = 7
  // guess = int(input("Guess the number: "))
  // while guess != secret:
  //     print("Wrong guess!")
  //     attempt = int(input("Try again: "))
  // print("Correct! You guessed it!")
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
  if (pattern === 'int') {
    // Fill in blanks on cartoon
    cartoon1Ele.classList.remove('hidden');
    originalQuestionEle.innerText = question.originalQuestion.replaceAll(
      '"',
      ''
    );
    wrongReplyEle.innerText = question.wrongReply;
    repeatedQuestionEle.innerText = question.originalQuestion.replaceAll(
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
  secondVariableEle.innerText = `${question.variable2} = int(input(${replaceText(question.originalQuestion, question)}))`;
  whileConditionEle.innerText = `while ${replaceText(question.condition, question)}:`;
  loopActionEle.innerText = `  ${replaceText(question.loopAction, question)}`;
  followUpQuestionEle.innerText = `  ${question.variable2} = int(input(${replaceText(question.originalQuestion, question)}))`;
  finalActionEle.innerText = replaceText(question.finalAction, question);
  // if (!oneQuestion) {
  //   codeQuestion2Ele.innerText = `${question.variable2} = int(input("${question.question2} "))`;
  // }
  // codeCalculationEle.innerText = `${question.variable3} = ${replaceText(question.calculation, question)}`;
  // codeResponseEle.innerText = `print(${replaceText(question.response, question, true)})`;
}

// fills in variable names in template literals
function replaceText(text, question, code = true) {
  if (code) {
    return text
      .replaceAll('{finalMessage}', question.finalMessage)
      .replaceAll('{variable1}', question.variable1)
      .replaceAll('{variable2}', question.variable2)
      .replaceAll('{variable3}', question.variable3)
      .replaceAll('{result}', question.variable3)
      .replaceAll('{answer1}', question.variable1)
      .replaceAll('{answer2}', question.variable2)
      .replaceAll('{originalQuestion}', question.originalQuestion);
  }
  return text
    .replaceAll('{answer1}', question.answer1)
    .replaceAll('{answer2}', question.answer2)
    .replaceAll('{result}', question.result);
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
