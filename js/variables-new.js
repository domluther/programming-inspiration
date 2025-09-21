import {
  showHelp,
  showBackground,
  copyCode,
  setupTabs,
  replaceText,
  generateQuestionNumber,
} from './utils.js';

import { ProgrammingPage } from './ProgrammingPage.js';

// Variables page questions
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

/**
 * Variables page implementation
 */
class VariablesPage extends ProgrammingPage {
  constructor() {
    super({
      questions: questions,
      pageType: 'variables',
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
    // Variables-specific elements for different cartoon layouts
    this.cartoon1Ele = document.querySelector('.cartoon1');
    this.cartoon2Ele = document.querySelector('.cartoon2');
    
    // Single question format elements
    this.exampleQuestionEle = document.querySelector('#exampleQuestion');
    this.exampleAnswerEle = document.querySelector('#exampleAnswer');
    this.exampleResponseEle = document.querySelector('#exampleResponse');
    
    // Two question format elements
    this.exampleQuestion1Ele = document.querySelector('#exampleQuestion1');
    this.exampleQuestion2Ele = document.querySelector('#exampleQuestion2');
    this.exampleAnswer1Ele = document.querySelector('#exampleAnswer1');
    this.exampleAnswer2Ele = document.querySelector('#exampleAnswer2');
    this.exampleResponse2Ele = document.querySelector('#exampleResponse2');
    
    // Code section elements
    this.codeQuestion1Ele = document.querySelector('#codeQuestion1');
    this.codeQuestion2Ele = document.querySelector('#codeQuestion2');
    this.codeCalculationEle = document.querySelector('#codeCalculation');
    this.codeResponseEle = document.querySelector('#response');
  }

  setTopic(question) {
    if (this.topicEle && question.topic) {
      // Variables specific: topic with period at the end
      this.topicEle.innerText = `${question.topic}.`;
    }
  }

  setCaptions(question) {
    try {
      // Determine if this is a one-question or two-question format
      const isTwoQuestion = question.question2 && question.question2.trim() !== '';
      
      if (isTwoQuestion) {
        // Show two-question cartoon, hide single-question
        if (this.cartoon1Ele) this.cartoon1Ele.classList.add('hidden');
        if (this.cartoon2Ele) this.cartoon2Ele.classList.remove('hidden');
        
        // Set two-question elements
        if (this.exampleQuestion1Ele) {
          this.exampleQuestion1Ele.innerText = question.question1;
        }
        if (this.exampleQuestion2Ele) {
          this.exampleQuestion2Ele.innerText = question.question2;
        }
        if (this.exampleAnswer1Ele) {
          this.exampleAnswer1Ele.innerText = question.answer1;
        }
        if (this.exampleAnswer2Ele) {
          this.exampleAnswer2Ele.innerText = question.answer2;
        }
        if (this.exampleResponse2Ele && question.response) {
          this.exampleResponse2Ele.innerText = this.replaceText(question.response, question, false)
            .replaceAll('"', '')
            .replaceAll(',', '');
        }
      } else {
        // Show single-question cartoon, hide two-question
        if (this.cartoon1Ele) this.cartoon1Ele.classList.remove('hidden');
        if (this.cartoon2Ele) this.cartoon2Ele.classList.add('hidden');
        
        // Set single-question elements
        if (this.exampleQuestionEle) {
          this.exampleQuestionEle.innerText = question.question1;
        }
        if (this.exampleAnswerEle) {
          this.exampleAnswerEle.innerText = question.answer1;
        }
        if (this.exampleResponseEle && question.response) {
          this.exampleResponseEle.innerText = this.replaceText(question.response, question, false)
            .replaceAll('"', '')
            .replaceAll(',', '');
        }
      }
    } catch (error) {
      console.error('Error in setCaptions function:', error);
    }
  }

  setCode(question) {
    try {
      // Set input questions with int() casting
      if (this.codeQuestion1Ele && question.variable1) {
        this.codeQuestion1Ele.innerText = `${question.variable1} = int(input("${question.question1} "))`;
      }
      
      // Check if it's a one-question or two-question format
      const oneQuestion = question.variable2 === '';
      if (this.codeQuestion2Ele) {
        this.codeQuestion2Ele.innerText = oneQuestion 
          ? '' 
          : `${question.variable2} = int(input("${question.question2} "))`;
      }
      
      // Set calculation using replaceText utility
      if (this.codeCalculationEle && question.calculation) {
        this.codeCalculationEle.innerText = `${question.variable3} = ${this.replaceText(question.calculation, question)}`;
      }
      
      // Set response
      if (this.codeResponseEle && question.response) {
        this.codeResponseEle.innerText = `print(${this.replaceText(question.response, question, true)})`;
      }
    } catch (error) {
      console.error('Error in setCode function:', error);
    }
  }
}

// Initialize the page
const variablesPage = new VariablesPage();