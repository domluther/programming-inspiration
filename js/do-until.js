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
    topic: 'ask which game has a battle royale island until correct',
    variable: 'game',
    question: 'Which game has a battle royale island? ',
    correctAnswer: 'fortnite',
    wrongAnswer: 'minecraft',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: "ask who voices Eleven in Stranger Things until correct",
    variable: 'actress',
    question: "Who plays Eleven in Stranger Things? ",
    correctAnswer: 'millie bobby brown',
    wrongAnswer: 'sadie sink',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: 'ask what app had a blue bird logo until correct',
    variable: 'app',
    question: 'What social media app had a blue bird logo? ',
    correctAnswer: 'twitter',
    wrongAnswer: 'instagram',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: 'ask who sang drivers license until correct',
    variable: 'artist',
    question: "Who sang 'drivers license'? ",
    correctAnswer: 'olivia rodrigo',
    wrongAnswer: 'billie eilish',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: 'ask what sport Mbappe plays until correct',
    variable: 'sport',
    question: 'What sport does Kylian Mbappe play? ',
    correctAnswer: 'football',
    wrongAnswer: 'basketball',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: 'ask what streaming service has Stranger Things until correct',
    variable: 'platform',
    question: 'What streaming service has Stranger Things? ',
    correctAnswer: 'netflix',
    wrongAnswer: 'disney plus',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: 'ask who created Minecraft until correct',
    variable: 'creator',
    question: 'Who created Minecraft? ',
    correctAnswer: 'notch',
    wrongAnswer: 'mr bashford',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: "ask what TikTok's original name was until correct",
    variable: 'app_name',
    question: "What was TikTok originally called? ",
    correctAnswer: 'musical.ly',
    wrongAnswer: 'vine',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: 'ask what the fire emoji on Snapchat means until correct',
    variable: 'feature',
    question: "What does the fire (🔥) emoji on Snapchat mean?",
    correctAnswer: 'streak',
    wrongAnswer: 'snap',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: 'ask which house Harry Potter is in until correct',
    variable: 'house',
    question: "Which Hogwarts house is Harry Potter in? ",
    correctAnswer: 'gryffindor',
    wrongAnswer: 'slytherin',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: "ask what YouTube's channel members are called until correct",
    variable: 'term',
    question: "What are YouTube's channel members called? ",
    correctAnswer: 'subscribers',
    wrongAnswer: 'followers',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: 'ask what Among Us crew do to win until correct',
    variable: 'objective',
    question: 'What must crewmates complete to win in Among Us? ',
    correctAnswer: 'tasks',
    wrongAnswer: 'vents',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: "ask what Roblox money is called until correct",
    variable: 'currency',
    question: "What's the currency in Roblox called? ",
    correctAnswer: 'robux',
    wrongAnswer: 'coins',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: 'ask who sings Anti-Hero until correct',
    variable: 'artist',
    question: "Who sings 'Anti-Hero'? ",
    correctAnswer: 'taylor swift',
    wrongAnswer: 'ariana grande',
    loopMessage: 'You guessed: ',
    finalMessage: 'Correct! You got it!',
  },
  {
    topic: 'ask what sport is in FIFA until correct',
    variable: 'sport',
    question: "What sport is FIFA the game about? ",
    correctAnswer: 'football',
    wrongAnswer: 'rugby',
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

  setupEventListeners() {
    // Call parent's setupEventListeners first
    super.setupEventListeners();
    
    // Override copy button to use OCR mode
    if (this.copyBtn) {
      // Remove the default listener and add OCR-specific one
      this.copyBtn.removeEventListener('click', this.utils.copyCode);
      this.copyBtn.addEventListener('click', () => copyCode('ocr'));
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
