import {
  showHelp,
  showBackground,
  copyCode,
  setupTabs,
  replaceText,
  generateQuestionNumber,
} from './utils.js';

import { ProgrammingPage } from './ProgrammingPage.js';

// Iteration while page questions
// 
// finalMessage vs finalMessagePlus:
// - finalMessage: Uses comma syntax for concatenation ("Text", {variable}, "more text")
// - finalMessagePlus: Uses plus syntax for concatenation ("Text " + {variable} + " more text")
// - finalMessagePlus is ONLY needed when the message contains variables for concatenation
// - Static text messages (no variables) can use just finalMessage for both modes
// - String variables don't need str() wrapping: {correctReply}
// - Numeric variables need str() wrapping in plus mode: str({answer1})
const questions = [
  {
    topic: 'repeatedly ask for the best Spongebob character while they don\'t say Patrick',
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
    topic: 'keep adding numbers input by the user while they enter 5 or less',
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
    finalMessagePlus: '"You entered " + str({answer2})',
    finalAction: 'print({finalMessage})',
    // followUpQuestion: 'int(input({originalQuestion}))',
  },
  {
    topic: 'count down from 5 to 1, then print "Blast off!"',
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
    topic: 'count up from 1 to 10, then print "Coming ready or not!"',
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
    topic: 'keep asking the number of planets in the solar system while they are incorrect',
    pattern: 'string',
    variable1: 'correct_count',
    variable2: 'guess',
    initialValue: '"8"',
    wrongReply: '9',
    correctReply: '8',
    originalQuestion: '"How many planets in our solar system? "',
    condition: '{variable2} != {variable1}',
    loopMessage: '"Nope, Pluto is not a planet."',
    loopAction: 'print({loopMessage})',
    finalMessage: '"Correct! There are", {correctReply}, "planets in our solar system."',
    finalMessagePlus: '"Correct! There are " + {correctReply} + " planets in our solar system."',
    finalAction: 'print({finalMessage})',
  },
  {
    topic: 'keep asking for the secret word while they are incorrect',
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
    topic: 'keep guessing the Hogwarts house while they are incorrect',
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
    topic: 'keep guessing the capital of France while they are incorrect',
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
    finalMessage: '"Correct!", {correctReply}, "is the capital of France."',
    finalMessagePlus: '"Correct! " + {correctReply} + " is the capital of France."',
    finalAction: 'print({finalMessage})',
  },

  {
    topic: 'keep asking for a password while the password is incorrect',
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
    topic: 'keep asking if it should continue while the user doesn\'t say no',
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
    topic: 'add numbers input by the user while they are not 0',
    pattern: 'int',
    variable1: 'total',
    variable2: 'number',
    initialValue: '0',
    wrongReply: '8',
    correctReply: '0',
    answer1: '12',
    originalQuestion: '"Enter a number (0 to stop) "',
    condition: '{variable2} != 0',
    loopAction: '{variable1} = {variable1} + {variable2}',
    finalMessage: '"The sum is", {answer1}',
    finalMessagePlus: '"The sum is " + str({answer1})',
    finalAction: 'print({finalMessage})',
    // followUpQuestion: 'int(input({originalQuestion}))',
  },
  {
    topic: 'have the user guess a number while their guess is incorrect',
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
    topic: 'ask for numbers while the sum of them all is below 100',
    pattern: 'int',
    variable1: 'total',
    variable2: 'number',
    initialValue: '0',
    wrongReply: '50',
    correctReply: '100',
    answer1: '150',
    originalQuestion: '"Enter a number to add: "',
    condition: '{variable1} < 100',
    loopAction: '{variable1} = {variable1} + {variable2}',
    finalMessage: '"The sum is", {answer1}',
    finalMessagePlus: '"The sum is " + str({answer1})',
    finalAction: 'print({finalMessage}, "Total:", {variable1})',
    // followUpQuestion: 'int(input({originalQuestion}))',
  },
  {
    topic: 'ask for numbers while their product is 1000 or below',
    pattern: 'int',
    variable1: 'product',
    variable2: 'number',
    initialValue: '1',
    wrongReply: '5',
    correctReply: '72',
    answer1: '2160',
    originalQuestion: '"Enter a number to multiply: "',
    condition: '{variable1} <= 1000',
    loopAction: '{variable1} = {variable1} * {variable2}',
    finalMessage: '"The product is", {answer1}',
    finalMessagePlus: '"The product is " + str({answer1})',
    finalAction: 'print({finalMessage})',
    // followUpQuestion: 'int(input({originalQuestion}))',
  },
];

/**
 * Iteration while page with while loop programming concepts
 */
class IterationWhilePage extends ProgrammingPage {
  constructor() {
    super({
      questions: questions,
      pageType: 'iteration-while',
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
    // Iteration while specific elements
    this.cartoon1Ele = document.querySelector('.cartoon1');
    this.cartoon2Ele = document.querySelector('.cartoon2');
    this.originalQuestionEle = document.querySelector('#originalQuestion');
    this.repeatedQuestionEle = document.querySelector('#repeatedQuestion');
    this.wrongReplyEle = document.querySelector('#wrongReply');
    this.correctReplyEle = document.querySelector('#correctReply');
    this.finalMessageEle = document.querySelector('#finalMessage');
    this.exampleQuestionEle = document.querySelector('#exampleQuestion');
    this.exampleAnswerEle = document.querySelector('#exampleAnswer');
    this.exampleResponseEle = document.querySelector('#exampleResponse');

    // Code section elements
    this.firstVariableEle = document.querySelector('#firstVariable');
    this.secondVariableEle = document.querySelector('#secondVariable');
    this.whileConditionEle = document.querySelector('#whileCondition');
    this.loopActionEle = document.querySelector('#loopAction');
    this.followUpQuestionEle = document.querySelector('#followUpQuestion');
    this.finalActionEle = document.querySelector('#finalAction');
    
  }

  setTopic(question) {
    if (this.topicEle && question.topic) {
      // Iteration while specific: topic without "ask someone"
      this.topicEle.innerText = `${question.topic}.`;
    }
  }

  setCaptions(question) {
    try {
      const { pattern } = question;

      if (pattern === 'int' || pattern === 'string') {
        // Show cartoon 1 for input-based loops
        if (this.cartoon1Ele) this.cartoon1Ele.classList.remove('hidden');
        if (this.cartoon2Ele) this.cartoon2Ele.classList.add('hidden');
        
        if (this.originalQuestionEle) {
          this.originalQuestionEle.innerText = question.originalQuestion.replaceAll('"', '');
        }
        if (this.wrongReplyEle) {
          this.wrongReplyEle.innerText = `❌ ${question.wrongReply}`;
          this.wrongReplyEle.style.color = '#f44336';
          this.wrongReplyEle.style.fontWeight = 'bold';

        }
        if (this.repeatedQuestionEle) {
          // Show the loopMessage before asking question again
          this.repeatedQuestionEle.innerText =
            `${question.loopMessage ? question.loopMessage + '\n' : ''}${question.originalQuestion}`.replaceAll('"', '');
        }
        if (this.correctReplyEle) {
          this.correctReplyEle.innerText = `✅ ${question.correctReply}`;
        this.correctReplyEle.style.color = '#4CAF50';
        this.correctReplyEle.style.fontWeight = 'bold';

        }
        if (this.finalMessageEle) {
          this.finalMessageEle.innerText = this.replaceText(question.finalMessage, question, false)
            .replaceAll('"', '')
            .replaceAll(',', '');
        }
      } else if (pattern === 'noInput') {
        // Show cartoon 2 for counting loops
        if (this.cartoon2Ele) this.cartoon2Ele.classList.remove('hidden');
        if (this.cartoon1Ele) this.cartoon1Ele.classList.add('hidden');

        if (this.originalQuestionEle) {
          this.originalQuestionEle.innerText = '';
        }
        if (this.exampleQuestionEle) {
          this.exampleQuestionEle.innerText = question.combinedMessage;
        }
        if (this.exampleAnswerEle) {
          this.exampleAnswerEle.innerText = '...';
        }
        if (this.exampleResponseEle) {
          this.exampleResponseEle.innerText = this.replaceText(question.finalMessage, question, false)
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
      const { pattern } = question;
      const INDENT = '    '; // 4 spaces

      // Fill in code block
      if (this.firstVariableEle) {
        this.firstVariableEle.innerText = `${question.variable1} = ${question.initialValue}`;
      }

      if (pattern === 'int') {
        if (this.secondVariableEle) {
          this.secondVariableEle.innerText = `${question.variable2} = int(input(${this.replaceText(question.originalQuestion, question)}))`;
        }
        if (this.followUpQuestionEle) {
          this.followUpQuestionEle.innerText = `${INDENT}${question.variable2} = int(input(${this.replaceText(question.originalQuestion, question)}))`;
        }
      } else if (pattern === 'string') {
        if (this.secondVariableEle) {
          this.secondVariableEle.innerText = `${question.variable2} = input(${this.replaceText(question.originalQuestion, question)})`;
        }
        if (this.followUpQuestionEle) {
          this.followUpQuestionEle.innerText = `${INDENT}${question.variable2} = input(${this.replaceText(question.originalQuestion, question)})`;
        }
      } else if (pattern === 'noInput') {
        // No input has a second loop action instead of a follow up question
        if (this.followUpQuestionEle) {
          this.followUpQuestionEle.innerText = `${INDENT}${this.replaceText(question.loopAction2, question)}`;
        }
        if (this.secondVariableEle) {
          this.secondVariableEle.innerText = '';
        }
      }

      if (this.whileConditionEle) {
        this.whileConditionEle.innerText = `while ${this.replaceText(question.condition, question)}:`;
      }
      if (this.loopActionEle) {
        this.loopActionEle.innerText = `${INDENT}${this.replaceText(question.loopAction, question)}`;
      }
      if (this.finalActionEle) {
        const finalActionText = this.usePlusMode ? (question.finalMessagePlus || question.finalMessage) : question.finalMessage;
        this.finalActionEle.innerText = `print(${this.replaceText(finalActionText, question)})`;
      }
    } catch (error) {
      console.error('Error in setCode function:', error);
    }
  }
}

// Initialize the page
const iterationWhilePage = new IterationWhilePage();