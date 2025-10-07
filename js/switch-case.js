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
    this.selectionQuestionEle = document.querySelector('#selectionQuestion');
    this.selectionAnswer1Ele = document.querySelector('#selectionAnswer1');
    this.selectionAnswer2Ele = document.querySelector('#selectionAnswer2');
    this.ifReplyEle = document.querySelector('#ifReply');
    this.elseReplyEle = document.querySelector('#elseReply');

    // Code section elements
    this.codeQuestionEle = document.querySelector('#codeQuestion');
    this.codeCorrectAnswerEle = document.querySelector('#codeCorrectAnswer');
    this.codeIfCheckEle = document.querySelector('#codeIfCheck');
    this.codeIfReplyEle = document.querySelector('#codeIfReply');
    this.codeElseReplyEle = document.querySelector('#codeElseReply');
  }

  setTopic(question) {
    if (this.topicEle && question.topic) {
      // Switch-case specific: "ask someone [topic]."
      this.topicEle.innerText = `${question.topic}.`;
    }
  }

  setCaptions(question) {
    try {
      if (this.selectionQuestionEle) {
        this.selectionQuestionEle.innerText = question.question1;
      }
      if (this.selectionAnswer1Ele) {
        this.selectionAnswer1Ele.innerText = question.case1;
      }
      if (this.ifReplyEle && question.case1Reply) {
        this.ifReplyEle.innerText = question.case1Reply
          .replaceAll('"', '')
          .replace(/\s*\+\s*/g, ' ');
      }
      if (this.selectionAnswer2Ele) {
        this.selectionAnswer2Ele.innerText = question.case2;
      }
      if (this.elseReplyEle && question.case2Reply) {
        this.elseReplyEle.innerText = question.case2Reply
          .replaceAll('"', '')
          .replace(/\s*\+\s*/g, ' ');
      }
    } catch (error) {
      console.error('Error in setCaptions function:', error);
    }
  }

  setCode(question) {
    try {
      const INDENT = '    '; // 4 spaces
      const DOUBLE_INDENT = '        '; // 8 spaces
      
      // In OCR ERL, we don't need the correct_answer variable since we test directly
      if (this.codeCorrectAnswerEle) {
        this.codeCorrectAnswerEle.innerText = `# OCR ERL Switch-Case Syntax (NOT Python!)`;
      }
      
      if (this.codeQuestionEle) {
        this.codeQuestionEle.innerText = `${question.variable} = input("${question.question1} ")`;
      }
      
      // Switch statement header
      if (this.codeIfCheckEle) {
        this.codeIfCheckEle.innerText = `switch ${question.variable} :`;
      }
      
      // Case 1
      if (this.codeIfReplyEle) {
        this.codeIfReplyEle.innerText = `${INDENT}case "${question.case1}":\n${DOUBLE_INDENT}print(${question.case1Reply})`;
      }
      
      // Case 2 and default
      if (this.codeElseReplyEle) {
        this.codeElseReplyEle.innerText = `${INDENT}case "${question.case2}":\n${DOUBLE_INDENT}print(${question.case2Reply})\n${INDENT}default:\n${DOUBLE_INDENT}print(${question.defaultReply})\nendswitch`;
      }
    } catch (error) {
      console.error('Error in setCode function:', error);
    }
  }

}

// Initialize the page
const switchCasePage = new SwitchCasePage();