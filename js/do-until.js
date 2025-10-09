import {
  showHelp,
  showBackground,
  copyCode,
  setupTabs,
  replaceText,
  generateQuestionNumber,
} from './utils.js';

import { ProgrammingPage } from './ProgrammingPage.js';

// Do-until page questions (OCR ERL syntax)
const questions = [
  {
    topic: 'ask for the best TV show until correct',
    variable: 'tv_show',
    question: 'What is the best TV show? ',
    correctAnswer: 'spongebob',
    wrongAnswer: 'stranger things',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: "ask for someone's favourite colour until correct",
    variable: 'colour',
    question: 'What is your favourite colour? ',
    correctAnswer: 'green',
    wrongAnswer: 'blue',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: 'ask for the capital of England until correct',
    variable: 'capital',
    question: 'What is the capital of England? ',
    correctAnswer: 'london',
    wrongAnswer: 'manchester',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: 'ask who sang Shape of You until correct',
    variable: 'artist',
    question: "Who sang 'Shape of You'? ",
    correctAnswer: 'ed sheeran',
    wrongAnswer: 'taylor swift',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: 'ask what sport is played at Wimbledon until correct',
    variable: 'sport',
    question: 'What sport is played at Wimbledon? ',
    correctAnswer: 'tennis',
    wrongAnswer: 'cricket',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: 'ask what show features the Daleks until correct',
    variable: 'show',
    question: 'What show features the Daleks? ',
    correctAnswer: 'doctor who',
    wrongAnswer: 'sherlock',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: 'ask for the longest-reigning UK monarch until correct',
    variable: 'monarch',
    question: 'Who was the longest-reigning UK monarch? ',
    correctAnswer: 'elizabeth ii',
    wrongAnswer: 'victoria',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: "ask what's in a chip butty until correct",
    variable: 'dish',
    question: "What's in a chip butty? ",
    correctAnswer: 'chips',
    wrongAnswer: 'crisps',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: 'ask for the clock tower at Parliament until correct',
    variable: 'landmark',
    question: "What's the clock tower at Parliament called? ",
    correctAnswer: 'big ben',
    wrongAnswer: 'london eye',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: 'ask who wrote Harry Potter until correct',
    variable: 'author',
    question: "Who wrote 'Harry Potter'? ",
    correctAnswer: 'j.k. rowling',
    wrongAnswer: 'roald dahl',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: "ask what a quid is until correct",
    variable: 'currency',
    question: "What's a quid in British currency? ",
    correctAnswer: 'pound',
    wrongAnswer: 'penny',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: 'ask when it is warm in the UK until correct',
    variable: 'season',
    question: 'When is it warm in the UK? ',
    correctAnswer: 'usually never',
    wrongAnswer: 'august',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: "ask for the UK Prime Minister's residence until correct",
    variable: 'residence',
    question: "What's the UK Prime Minister's residence? ",
    correctAnswer: '10 downing street',
    wrongAnswer: 'buckingham palace',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: 'ask which band sang Wonderwall until correct',
    variable: 'band',
    question: "Which band sang 'Wonderwall'? ",
    correctAnswer: 'oasis',
    wrongAnswer: 'blur',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: 'ask for the largest city in Scotland until correct',
    variable: 'city',
    question: "What's the largest city in Scotland? ",
    correctAnswer: 'glasgow',
    wrongAnswer: 'edinburgh',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
];

/**
 * Iteration while page with while loop programming concepts
 */
// Class to handle do-until loop questions (OCR ERL syntax)
class DoUntilPage extends ProgrammingPage {
  constructor() {
    super({
      questions: questions,
      pageType: 'do-until',
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
    // Cartoon section elements
    this.questionTextEle = document.getElementById('questionText');
    this.repeatedQuestionEle = document.getElementById('repeatedQuestion');
    this.correctAnswerEle = document.getElementById('correctAnswer');
    this.wrongAnswerEle = document.getElementById('wrongAnswer');
    this.finalMessageEle = document.getElementById('finalMessage');

    // Code section elements
    this.codeDoEle = document.getElementById('codeDo');
    this.codeInputEle = document.getElementById('codeInput');
    this.codePrintEle = document.getElementById('codePrint');
    this.codeUntilEle = document.getElementById('codeUntil');
    this.codeFinalEle = document.getElementById('codeFinal');

    // Override copy button to use OCR mode
    const copyButton = document.getElementById('copyMe');
    if (copyButton) {
      copyButton.onclick = () => copyCode('ocr');
    }
  }

  setTopic(question) {
    if (this.topicEle && question.topic) {
      this.topicEle.innerText = `${question.topic}.`;
    }
  }

  setCaptions(question) {
    try {
      // Display question and answers in cartoon section
      if (this.questionTextEle) {
        this.questionTextEle.innerText = question.question;
        this.repeatedQuestionEle.innerText = question.question;
      }

      if (this.correctAnswerEle) {
        this.correctAnswerEle.innerText = `✅ ${question.correctAnswer}`;
        this.correctAnswerEle.style.color = '#4CAF50';
        this.correctAnswerEle.style.fontWeight = 'bold';
      }

      if (this.wrongAnswerEle) {
        this.wrongAnswerEle.innerText = `❌ ${question.wrongAnswer}`;
        this.wrongAnswerEle.style.color = '#f44336';
        this.wrongAnswerEle.style.fontWeight = 'bold';
      }

      if (this.finalMessageEle) {
        this.finalMessageEle.innerText = question.finalMessage;
      }
    } catch (error) {
      console.error('Error in setCaptions function:', error);
    }
  }

  setCode(question) {
    try {
      const INDENT = '    '; // 4 spaces for OCR ERL indentation

      // do
      if (this.codeDoEle) {
        this.codeDoEle.innerText = 'do';
      }

      // variable = input("question")
      if (this.codeInputEle) {
        this.codeInputEle.innerText = `${INDENT}${question.variable} = input("${question.question}")`;
      }

      // print(loopMessage + variable)
      if (this.codePrintEle) {
        this.codePrintEle.innerText = `${INDENT}print("${question.loopMessage}" + ${question.variable})`;
      }

      // until variable == "correctAnswer"
      if (this.codeUntilEle) {
        this.codeUntilEle.innerText = `until ${question.variable} == "${question.correctAnswer}"`;
      }

      // print(finalMessage)
      if (this.codeFinalEle) {
        this.codeFinalEle.innerText = `print("${question.finalMessage}")`;
      }
    } catch (error) {
      console.error('Error in setCode function:', error);
    }
  }
}

// Initialize the page
const doUntilPage = new DoUntilPage();