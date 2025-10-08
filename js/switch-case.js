import {
  showHelp,
  showBackground,
  copyCode,
  setupTabs,
  replaceText,
  generateQuestionNumber,
} from './utils.js';

import { ProgrammingPage } from './ProgrammingPage.js';

// Switch-case page questions (OCR ERL syntax)
const questions = [
  {
    topic: 'ask someone the best show',
    variable: 'best_show',
    question1: 'What is the best TV show?',
    case1: 'spongebob squarepants',
    case1Reply: '"Absolutely! Spongebob Squarepants is glorious"',
    case2: 'stranger things',
    case2Reply: '"Stranger Things is good, but not the best!"',
    case3: 'breaking bad',
    defaultReply: 'best_show + "?!?! No way - the best is Spongebob Squarepants"',
  },
  {
    topic: "ask someone's favourite colour",
    variable: 'colour',
    question1: 'What is your favourite colour?',
    case1: 'green',
    case1Reply: '"I love green too"',
    case2: 'blue',
    case2Reply: '"Blue is nice, but I prefer green"',
    case3: 'red',
    defaultReply: 'colour + "? I prefer green"',
  },
  {
    topic: 'ask someone about UK geography',
    variable: 'capital',
    question1: "What's the capital of England?",
    case1: 'london',
    case1Reply: '"Correct! London is the capital of England"',
    case2: 'manchester',
    case2Reply: '"Manchester is a great city, but not the capital"',
    case3: 'birmingham',
    defaultReply: 'capital + " is not the capital. It\'s London"',
  },
  {
    topic: 'ask someone about popular music',
    variable: 'artist',
    question1: "Who sang 'Shape of You'?",
    case1: 'ed sheeran',
    case1Reply: '"Right! Ed Sheeran sang Shape of You"',
    case2: 'harry styles',
    case2Reply: '"Harry Styles is great, but he didn\'t sing that one"',
    case3: 'taylor swift',
    defaultReply: 'artist + " didn\'t sing it. Ed Sheeran did"',
  },
  {
    topic: 'ask someone about UK sports',
    variable: 'sport',
    question1: 'What sport is played at Wimbledon?',
    case1: 'tennis',
    case1Reply: '"Correct! Tennis is played at Wimbledon"',
    case2: 'cricket',
    case2Reply: '"Cricket is played at Lord\'s, not Wimbledon"',
    case3: 'football',
    defaultReply: 'sport + " isn\'t played at Wimbledon. Tennis is"',
  },
  {
    topic: 'ask someone about UK TV shows',
    variable: 'show',
    question1: 'What show features the Daleks?',
    case1: 'doctor who',
    case1Reply: '"Right! Doctor Who features the Daleks"',
    case2: 'sherlock',
    case2Reply: '"Sherlock is brilliant, but no Daleks there"',
    case3: 'eastenders',
    defaultReply: 'show + " doesn\'t have Daleks. Doctor Who does"',
  },
  {
    topic: 'ask someone about UK history',
    variable: 'monarch',
    question1: 'Who was the longest-reigning UK monarch?',
    case1: 'elizabeth ii',
    case1Reply: '"Correct! Elizabeth II reigned the longest"',
    case2: 'victoria',
    case2Reply: '"Victoria reigned a long time, but not the longest"',
    case3: 'george iii',
    defaultReply: 'monarch + " didn\'t reign longest. Elizabeth II did"',
  },
  {
    topic: 'ask someone about UK food',
    variable: 'dish',
    question1: "What's in a chip butty?",
    case1: 'chips',
    case1Reply: '"Right! Chips are in a chip butty"',
    case2: 'crisps',
    case2Reply: '"Crisps? That would be a crisp butty!"',
    case3: 'fish',
    defaultReply: 'dish + " aren\'t in a chip butty. Chips are"',
  },
  {
    topic: 'ask someone about UK landmarks',
    variable: 'landmark',
    question1: "What's the clock tower at Parliament called?",
    case1: 'big ben',
    case1Reply: '"Correct! It\'s called Big Ben"',
    case2: 'london eye',
    case2Reply: '"The London Eye is nearby, but that\'s not it"',
    case3: 'tower bridge',
    defaultReply: 'landmark + " is not it. It\'s Big Ben"',
  },
  {
    topic: 'ask someone about UK literature',
    variable: 'author',
    question1: "Who wrote 'Harry Potter'?",
    case1: 'j.k. rowling',
    case1Reply: '"Right! J.K. Rowling wrote Harry Potter"',
    case2: 'roald dahl',
    case2Reply: '"Roald Dahl wrote amazing books, but not Harry Potter"',
    case3: 'charles dickens',
    defaultReply: 'author + " didn\'t write it. J.K. Rowling did"',
  },
  {
    topic: 'ask someone about UK currency',
    variable: 'currency',
    question1: "What's a quid in British currency?",
    case1: 'pound',
    case1Reply: '"Correct! A quid is a pound"',
    case2: 'penny',
    case2Reply: '"A penny is 1/100 of a quid"',
    case3: 'dollar',
    defaultReply: 'currency + " is not a quid. A quid is a pound"',
  },
  {
    topic: 'ask someone about UK weather',
    variable: 'season',
    question1: 'When is it warm in the UK?',
    case1: 'usually never',
    case1Reply: '"Right! It is warm usually never"',
    case2: 'august',
    case2Reply: '"August can be nice, but that\'s optimistic!"',
    case3: 'december',
    defaultReply: 'season + "? Ha! It\'s warm usually never"',
  },
  {
    topic: 'ask someone about UK politics',
    variable: 'residence',
    question1: "What's the UK Prime Minister's residence?",
    case1: '10 downing street',
    case1Reply: '"Correct! The PM lives at 10 Downing Street"',
    case2: 'buckingham palace',
    case2Reply: '"That\'s where the King lives, not the PM"',
    case3: 'westminster abbey',
    defaultReply: 'residence + " is not it. It\'s 10 Downing Street"',
  },
  {
    topic: 'ask someone about UK pop culture',
    variable: 'band',
    question1: "Which band sang 'Wonderwall'?",
    case1: 'oasis',
    case1Reply: '"Right! Oasis sang Wonderwall"',
    case2: 'blur',
    case2Reply: '"Blur was their rival, but didn\'t sing Wonderwall"',
    case3: 'coldplay',
    defaultReply: 'band + " didn\'t sing it. Oasis did"',
  },
  {
    topic: 'ask someone about UK geography',
    variable: 'city',
    question1: "What's the largest city in Scotland?",
    case1: 'glasgow',
    case1Reply: '"Correct! Glasgow is the largest Scottish city"',
    case2: 'edinburgh',
    case2Reply: '"Edinburgh is the capital, but not the largest"',
    case3: 'aberdeen',
    defaultReply: 'city + " is not the largest. It\'s Glasgow"',
  },
];


/**
 * Switch-case page with OCR ERL syntax programming concepts
 */
class SwitchCasePage extends ProgrammingPage {
  constructor() {
    super({
      questions: questions,
      pageType: 'switch-case',
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
    // Switch-case-specific elements for cartoon
    this.switchQuestionEle = document.querySelector('#switchQuestion');
    this.switchAnswer1Ele = document.querySelector('#switchAnswer1');
    this.switchReply1Ele = document.querySelector('#switchReply1');
    this.switchAnswer2Ele = document.querySelector('#switchAnswer2');
    this.switchReply2Ele = document.querySelector('#switchReply2');
    this.switchAnswer3Ele = document.querySelector('#switchAnswer3');
    this.switchDefaultReplyEle = document.querySelector('#switchDefaultReply');

    // Code section elements
    this.codeCorrectAnswerEle = document.querySelector('#codeCorrectAnswer');
    this.codeQuestionEle = document.querySelector('#codeQuestion');
    this.codeSwitch1Ele = document.querySelector('#codeSwitch1');
    this.codeSwitchReply1Ele = document.querySelector('#codeSwitchReply1');
    this.codeSwitch2Ele = document.querySelector('#codeSwitch2');
    this.codeSwitchReply2Ele = document.querySelector('#codeSwitchReply2');
    this.codeDefaultSwitchEle = document.querySelector('#codeDefaultSwitch');
    this.codeDefaultSwitchReplyEle = document.querySelector('#codeDefaultSwitchReply');
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
      // Switch-case specific: "ask someone [topic]."
      this.topicEle.innerText = `${question.topic}.`;
    }
  }

  setCaptions(question) {
    try {
      if (this.switchQuestionEle) {
        this.switchQuestionEle.innerText = question.question1;
      }
      if (this.switchAnswer1Ele) {
        this.switchAnswer1Ele.innerText = question.case1;
      }
      if (this.switchReply1Ele && question.case1Reply) {
        this.switchReply1Ele.innerText = question.case1Reply
          .replaceAll('"', '')
          .replace(/\s*\+\s*/g, ' ');
      }
      if (this.switchAnswer2Ele) {
        this.switchAnswer2Ele.innerText = question.case2;
      }
      if (this.switchReply2Ele && question.case2Reply) {
        this.switchReply2Ele.innerText = question.case2Reply
          .replaceAll('"', '')
          .replace(/\s*\+\s*/g, ' ');
      }
      if (this.switchAnswer3Ele) {
        this.switchAnswer3Ele.innerText = question.case3;
      }
      if (this.switchDefaultReplyEle && question.defaultReply) {
        // For default reply, we need to show what it would look like with the third answer
        const defaultText = question.defaultReply
          .replace(question.variable, question.case3)
          .replaceAll('"', '')
          .replace(/\s*\+\s*/g, ' ');
        this.switchDefaultReplyEle.innerText = defaultText;
      }
    } catch (error) {
      console.error('Error in setCaptions function:', error);
    }
  }

  setCode(question) {
    try {
      const INDENT = '    '; // 4 spaces
      const DOUBLE_INDENT = '        '; // 8 spaces
      
      // Comment line explaining this is OCR ERL
      if (this.codeCorrectAnswerEle) {
        this.codeCorrectAnswerEle.innerText = `// OCR ERL Switch-Case Syntax (NOT Python!)`;
      }
      
      // Input statement
      if (this.codeQuestionEle) {
        this.codeQuestionEle.innerText = `${question.variable} = input("${question.question1} ")`;
      }
      
      // Switch statement header with first case
      if (this.codeSwitch1Ele) {
        this.codeSwitch1Ele.innerText = `switch ${question.variable}:\n${INDENT}case "${question.case1}":`;
      }
      
      // First case reply
      if (this.codeSwitchReply1Ele) {
        this.codeSwitchReply1Ele.innerText = `${DOUBLE_INDENT}print(${question.case1Reply})`;
      }
      
      // Second case
      if (this.codeSwitch2Ele) {
        this.codeSwitch2Ele.innerText = `${INDENT}case "${question.case2}":`;
      }
      
      // Second case reply
      if (this.codeSwitchReply2Ele) {
        this.codeSwitchReply2Ele.innerText = `${DOUBLE_INDENT}print(${question.case2Reply})`;
      }
      
      // Default case
      if (this.codeDefaultSwitchEle) {
        this.codeDefaultSwitchEle.innerText = `${INDENT}default:`;
      }
      
      // Default case reply and endswitch
      if (this.codeDefaultSwitchReplyEle) {
        this.codeDefaultSwitchReplyEle.innerText = `${DOUBLE_INDENT}print(${question.defaultReply})\nendswitch`;
      }
    } catch (error) {
      console.error('Error in setCode function:', error);
    }
  }

}

// Initialize the page
const switchCasePage = new SwitchCasePage();