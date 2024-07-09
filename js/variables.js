const inspireBtn = document.querySelector('#inspire');
const helpBtn = document.querySelector('#help');
const cartoon1Ele = document.querySelector('.cartoon1');
const cartoon2Ele = document.querySelector('.cartoon2');
const exampleEle = document.querySelector('.example');
const topicEle = document.querySelector('#topic');
const exampleQuestionEle = document.querySelector('#exampleQuestion');
const exampleQuestion1Ele = document.querySelector('#exampleQuestion1');
const exampleQuestion2Ele = document.querySelector('#exampleQuestion2');
const exampleAnswerEle = document.querySelector('#exampleAnswer');
const exampleAnswer1Ele = document.querySelector('#exampleAnswer1');
const exampleAnswer2Ele = document.querySelector('#exampleAnswer2');
const exampleResponseEle = document.querySelector('#exampleResponse');
const exampleResponse2Ele = document.querySelector('#exampleResponse2');
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
    Topic: 'work out how many hours Squidward has practiced',
    Variable1: 'hours',
    Variable2: 'days',
    Variable3: 'result',
    Question1: 'How many hours a day?',
    Question2: 'For how many days?',
    Answer1: '4',
    Answer2: '9',
    Calculation: '{variable1} * {variable2}',
    Result: 36,
    Response: 'Squidward has practiced {result} hours',
  },
  {
    Topic: 'add two numbers together',
    Variable1: 'num1',
    Variable2: 'num2',
    Variable3: 'result',
    Question1: 'Give me a number',
    Question2: 'Give me another number',
    Answer1: '4',
    Answer2: '9',
    Calculation: '{variable1} + {variable2}',
    Result: 13,
    Response: '{answer1} + {answer2} is {result}',
  },
  {
    Topic: 'times two numbers together',
    Variable1: 'num1',
    Variable2: 'num2',
    Variable3: 'result',
    Question1: 'Give me a number',
    Question2: 'Give me another number',
    Answer1: '4',
    Answer2: '9',
    Calculation: '{variable1} * {variable2}',
    Result: 36,
    Response: '{answer1} * {answer2} is {result}',
  },
  {
    Topic: 'divide one number by another',
    Variable1: 'num1',
    Variable2: 'num2',
    Variable3: 'result',
    Question1: 'Give me a number',
    Question2: 'Give me another number',
    Answer1: '5',
    Answer2: '10',
    Calculation: '{variable1}  / {variable2}',
    Result: 0.5,
    Response: '{answer1} / {answer2} is {result}',
  },
  {
    Topic: 'take one number from the other',
    Variable1: 'num1',
    Variable2: 'num2',
    Variable3: 'result',
    Question1: 'Give me a number',
    Question2: 'Give me another number',
    Answer1: '10',
    Answer2: '4',
    Calculation: '{variable1}  - {variable2}',
    Result: 6,
    Response: '{answer1} - {answer2} is {result}',
  },
  {
    Topic: "tell you how old you'll be in ten years",
    Variable1: 'age',
    Variable2: '',
    Variable3: 'result',
    Question1: 'How old are you now?',
    Question2: '',
    Answer1: '15',
    Answer2: '',
    Calculation: '{variable1} + 10',
    Result: 25,
    Response: 'In 10 years, you will be {result}',
  },
  {
    Topic: "tell you how old you'll be next year",
    Variable1: 'age',
    Variable2: '',
    Variable3: 'result',
    Question1: 'How old are you now?',
    Question2: '',
    Answer1: '15',
    Answer2: '',
    Calculation: '{variable1} + 1',
    Result: 16,
    Response: "Next year, you'll be {result}",
  },
  {
    Topic: 'tell you how old you were last year',
    Variable1: 'age',
    Variable2: '',
    Variable3: 'result',
    Question1: 'How old are you now?',
    Question2: '',
    Answer1: '15',
    Answer2: '',
    Calculation: '{variable1} - 1',
    Result: 14,
    Response: 'Last year, you were {result}',
  },
  {
    Topic: 'work out how many pizza slices there are left',
    Variable1: 'slices_start',
    Variable2: 'slices_eaten',
    Variable3: 'result',
    Question1: 'How many slices did you have?',
    Question2: 'How many slices did you eat?',
    Answer1: '8',
    Answer2: '2',
    Calculation: '{variable1}  - {variable2}',
    Result: 6,
    Response: 'You have {result} slices left',
  },
  {
    Topic: 'work out how much each person owes',
    Variable1: 'total_bill',
    Variable2: 'diners',
    Variable3: 'result',
    Question1: 'How much is the bill?',
    Question2: 'How many people are there?',
    Answer1: '10',
    Answer2: '2',
    Calculation: '{variable1}  / {variable2}',
    Result: 5,
    Response: 'You each owe £{result}',
  },
  {
    Topic: 'convert someones weight to kilograms',
    Variable1: 'weight_pounds',
    Variable2: '',
    Variable3: 'result',
    Question1: 'How heavy is it in pounds?',
    Question2: '',
    Answer1: '10',
    Answer2: '',
    Calculation: '{variable1} / 2.2',
    Result: 4.5,
    Response: '{answer1} lbs is {result} kg',
  },
  {
    Topic: 'tell them how many times a number fits in',
    Variable1: 'num1',
    Variable2: 'num2',
    Variable3: 'result',
    Question1: 'Give me a number',
    Question2: 'Give me another number',
    Answer1: '20',
    Answer2: '3',
    Calculation: '{variable1} // {variable2}',
    Result: 6,
    Response: 'There are {result} {answer2}s in {answer1}',
  },
  {
    Topic: 'tell them the remainder when dividing',
    Variable1: 'num1',
    Variable2: 'num2',
    Variable3: 'result',
    Question1: 'Give me a number',
    Question2: 'Give me another number',
    Answer1: '20',
    Answer2: '3',
    Calculation: '{variable1} % {variable2}',
    Result: 2,
    Response:
      'There are {result} left over after dividing {answer1} by {answer2}',
  },
  {
    Topic: 'tell them how many hours there are in that many days',
    Variable1: 'days',
    Variable2: '',
    Variable3: 'result',
    Question1: 'Give me a number of hours',
    Question2: '',
    Answer1: '5',
    Answer2: '',
    Calculation: '{variable1} * 24',
    Result: 120,
    Response: 'There are {result} hours in {answer1} days',
  },
  {
    Topic: 'tell someone how long it will take to save their pocket money',
    Variable1: 'pocket_money',
    Variable2: 'goal',
    Variable3: 'result',
    Question1: 'How much is your pocket money?',
    Question2: 'How much do you want to save?',
    Answer1: '£30 ',
    Answer2: '£150 ',
    Calculation: '{variable2} / {variable1}',
    Result: 5,
    Response: 'It will take {result} weeks to save £{answer1}',
  },
  {
    Topic: 'work out how much someone spends on chocolate',
    Variable1: 'chocolate_bars',
    Variable2: 'price',
    Variable3: 'result',
    Question1: 'How many chocolate bars are you buying?',
    Question2: 'How much is one bar?',
    Answer1: '5',
    Answer2: '£2 ',
    Calculation: '{variable1} * {variable2}',
    Result: 10,
    Response: '{answer1} chocolate bars is {result}',
  },
  {
    Topic: 'work out how much you can spend every day on holiday',
    Variable1: 'holiday_money',
    Variable2: 'days',
    Variable3: 'result',
    Question1: 'How much money do you have?',
    Question2: 'How many days is your holiday?',
    Answer1: '£50 ',
    Answer2: '5',
    Calculation: '{variable1}  / {variable2}',
    Result: 10,
    Response: 'You will have £{result} a day',
  },
  {
    Topic: 'calculate the area of a rectangle',
    Variable1: 'length',
    Variable2: 'width',
    Variable3: 'result',
    Question1: "What's the length of the rectangle?",
    Question2: "What's the width of the recatangle?",
    Answer1: '25',
    Answer2: '5',
    Calculation: '{variable1} * {variable2}',
    Result: 125,
    Response: 'The area of the rectangle is {result}',
  },
  {
    Topic: 'calculate the perimeter of a rectangle',
    Variable1: 'length',
    Variable2: 'width',
    Variable3: 'result',
    Question1: "What's the length of the rectangle?",
    Question2: "What's the width of the recatangle?",
    Answer1: '25',
    Answer2: '5',
    Calculation: '{variable1} + {variable1} + {variable2} + {variable2}',
    Result: 60,
    Response: 'The perimeter of the rectangle is {result}',
  },
  {
    Topic: 'tell them how many seconds there are in that many minutes',
    Variable1: 'minutes',
    Variable2: '',
    Variable3: 'result',
    Question1: 'Give me a number of minutes',
    Question2: '',
    Answer1: '10',
    Answer2: '',
    Calculation: '{variable1} * 60',
    Result: 600,
    Response: 'There are {result} seconds in {answer1} minutes',
  },
  {
    Topic: 'calculate the average of two numbers',
    Variable1: 'num1',
    Variable2: 'num2',
    Variable3: 'result',
    Question1: 'Give me a number',
    Question2: 'Give me another number',
    Answer1: '8',
    Answer2: '4',
    Calculation: '({variable1} + {variable2}) / 2',
    Result: 6,
    Response: 'The average is {result}',
  },
  {
    Topic: 'work out the difference in ages',
    Variable1: 'age1',
    Variable2: 'age2',
    Variable3: 'result',
    Question1: 'How old is the first person?',
    Question2: 'How old is the second person?',
    Answer1: '15',
    Answer2: '13',
    Calculation: '{variable1}  - {variable2}',
    Result: 2,
    Response: 'Person 1 is {result} years older',
  },
  {
    Topic: 'work out how many boxes you need',
    Variable1: 'cookies',
    Variable2: 'cookies_per_box',
    Variable3: 'result',
    Question1: 'How many cookies are there?',
    Question2: 'How many fit in a box?',
    Answer1: '40',
    Answer2: '5',
    Calculation: '{variable1} // {variable2}',
    Result: 8,
    Response: '{answer1} needs {result} boxes',
  },
  {
    Topic: 'say how far you have cycled',
    Variable1: 'distance',
    Variable2: 'days',
    Variable3: 'result',
    Question1: 'How far did you cycle in a day?',
    Question2: 'How many days did you cycle for?',
    Answer1: '50',
    Answer2: '3',
    Calculation: '{variable1} * {variable2}',
    Result: 150,
    Response: 'You cycled {result}km in {answer2} days',
  },
  {
    Topic: 'the square of a number',
    Variable1: 'num1',
    Variable2: '',
    Variable3: 'result',
    Question1: 'Give me a number',
    Question2: '',
    Answer1: '10',
    Answer2: '',
    Calculation: '{variable1} ** 2',
    Result: 100,
    Response: '{answer1} squared is {result}',
  },
  {
    Topic: 'half a number',
    Variable1: 'num1',
    Variable2: '',
    Variable3: 'result',
    Question1: 'Give me a number',
    Question2: '',
    Answer1: '20',
    Answer2: '',
    Calculation: '{variable1} / 2',
    Result: 10,
    Response: 'Half of {answer1} is {result}',
  },
  {
    Topic: 'double a number',
    Variable1: 'num1',
    Variable2: '',
    Variable3: 'result',
    Question1: 'Give me a number',
    Question2: '',
    Answer1: '20',
    Answer2: '',
    Calculation: '{variable1} * 2',
    Result: 40,
    Response: 'Double {answer1} is {result}',
  },
  {
    Topic: 'area of a square',
    Variable1: 'length',
    Variable2: '',
    Variable3: 'result',
    Question1: 'How long is the square?',
    Question2: '',
    Answer1: '5',
    Answer2: '',
    Calculation: '{variable1} * {variable1}',
    Result: 25,
    Response: 'The square is {result} cm2',
  },
  {
    Topic: 'perimeter of a square',
    Variable1: 'length',
    Variable2: '',
    Variable3: 'result',
    Question1: 'How long is the square?',
    Question2: '',
    Answer1: '4',
    Answer2: '',
    Calculation: '{variable1} * 4',
    Result: 16,
    Response: 'The square is {result} cm2',
  },
  {
    Topic: 'triple a number',
    Variable1: 'num1',
    Variable2: '',
    Variable3: 'result',
    Question1: 'Give me a number',
    Question2: '',
    Answer1: '20',
    Answer2: '',
    Calculation: '{variable1} * 3',
    Result: 60,
    Response: 'Triple {answer1} is {result}',
  },
  {
    Topic: 'convert from celsius to fahrenheit',
    Variable1: 'celsius',
    Variable2: '',
    Variable3: 'result',
    Question1: 'How many celsius',
    Question2: '',
    Answer1: '30',
    Answer2: '',
    Calculation: '({variable1} * 9/5) + 32',
    Result: 86,
    Response: '{answer1} celsius is {result} fahrenheit',
  },
  {
    Topic: 'age in months',
    Variable1: 'age',
    Variable2: '',
    Variable3: 'result',
    Question1: 'How many years old are you?',
    Question2: '',
    Answer1: '15',
    Answer2: '',
    Calculation: '{variable1} * 12',
    Result: 180,
    Response: 'You are {result} months old',
  },
  {
    Topic: 'area of a cricle',
    Variable1: 'radius',
    Variable2: '',
    Variable3: 'result',
    Question1: "What's the radius of the circle?",
    Question2: '',
    Answer1: '5',
    Answer2: '',
    Calculation: '3.14 * {variable1} * {variable1}',
    Result: 78.5,
    Response: 'The circle has an area of {result}',
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
  topicEle.innerText = `ask someone ${question.Topic}.`;
  // One input or two inputs?
  if (question.Variable2 === '') {
    console.log('one input');
    cartoon1Ele.classList.remove('hidden');
    cartoon2Ele.classList.add('hidden');
    exampleQuestionEle.innerText = question.Question1;
    exampleAnswerEle.innerText = question.Answer1;
    exampleResponseEle.innerText = question.Response.replace(
      '{result}',
      question.Result
    ).replace('{answer1}', question.Answer1);
  } else {
    console.log('two inputs');
    cartoon2Ele.classList.remove('hidden');
    cartoon1Ele.classList.add('hidden');

    exampleQuestion1Ele.innerText = question.Question1;
    exampleQuestion2Ele.innerText = question.Question2;
    exampleAnswer1Ele.innerText = question.Answer1;
    exampleAnswer2Ele.innerText = question.Answer2;
    exampleResponse2Ele.innerText = question.Response.replace(
      '{result}',
      question.Result
    )
      .replace('{answer1}', question.Answer1)
      .replace('{answer2}', question.Answer2);
  }
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
  return `print(${splitResponse[0] ? `"${splitResponse[0]} ", ` : ``}${variableName} ${splitResponse[1] ? `, " ${splitResponse[1]}"` : ``})`;
}
