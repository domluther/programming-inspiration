import {
  showHelp,
  showBackground,
  copyCode,
  setupTabs,
  replaceText,
  generateQuestionNumber,
} from './utils.js';

import { ProgrammingPage } from './ProgrammingPage.js';

// Selection page questions
const questions = [
      {
        topic: 'ask someone the best show',
        variable1: 'correct_answer',
        variable2: 'best_show',
        question1: 'What is the best TV show?',
        answer1: 'spongebob squarepants',
        answer2: 'stranger things',
        ifReply: '"Absolutely!", {answer1}, "is glorious"',
        elseReply: '{answer2}, "?!?! No way - it is", {answer1}',
      },
      {
        topic: "ask someone's favourite colour",
        variable1: 'correct_answer',
        variable2: 'colour',
        question1: 'What is your favourite colour?',
        answer1: 'green',
        answer2: 'blue',
        ifReply: '"I love", {answer1}, "too"',
        elseReply: '{answer2}, "? I prefer", {answer1}',
      },
      {
        topic: 'ask someone about UK geography',
        variable1: 'correct_answer',
        variable2: 'capital',
        question1: "What's the capital of England?",
        answer1: 'london',
        answer2: 'manchester',
        ifReply: '"Correct!", {answer1}, "is the capital of England"',
        elseReply:
          '"Not quite.", {answer2}, "is not the capital. It\'s", {answer1}',
      },
      {
        topic: 'ask someone about popular music',
        variable1: 'correct_answer',
        variable2: 'artist',
        question1: "Who sang 'Shape of You'?",
        answer1: 'ed sheeran',
        answer2: 'harry styles',
        ifReply: '"Right!", {answer1}, "sang Shape of You"',
        elseReply: '"Actually,", {answer2}, "didn\'t sing it.", {answer1}, "did"',
      },
      {
        topic: 'ask someone about UK sports',
        variable1: 'correct_answer',
        variable2: 'sport',
        question1: 'What sport is played at Wimbledon?',
        answer1: 'tennis',
        answer2: 'cricket',
        ifReply: '"Correct!", {answer1}, "is played at Wimbledon"',
        elseReply:
          '"Sorry,", {answer2}, "isn\'t played at Wimbledon.", {answer1}, "is"',
      },
      {
        topic: 'ask someone about UK TV shows',
        variable1: 'correct_answer',
        variable2: 'show',
        question1: 'What show features the Daleks?',
        answer1: 'doctor who',
        answer2: 'sherlock',
        ifReply: '"Right!", {answer1}, "features the Daleks"',
        elseReply:
          '"Not quite.", {answer2}, "doesn\'t have Daleks.", {answer1}, "does"',
      },
      {
        topic: 'ask someone about UK history',
        variable1: 'correct_answer',
        variable2: 'monarch',
        question1: 'Who was the longest-reigning UK monarch?',
        answer1: 'elizabeth ii',
        answer2: 'victoria',
        ifReply: '"Correct!", {answer1}, "reigned the longest"',
        elseReply:
          '"Actually,", {answer2}, "didn\'t reign longest.", {answer1}, "did"',
      },
      {
        topic: 'ask someone about UK food',
        variable1: 'correct_answer',
        variable2: 'dish',
        question1: "What's in a chip butty?",
        answer1: 'chips',
        answer2: 'crisps',
        ifReply: '"Right!", {answer1}, "are in a chip butty"',
        elseReply:
          '"Not quite.", {answer2}, "aren\'t in a chip butty.", {answer1}, "are"',
      },
      {
        topic: 'ask someone about UK landmarks',
        variable1: 'correct_answer',
        variable2: 'landmark',
        question1: "What's the clock tower at Parliament called?",
        answer1: 'big ben',
        answer2: 'london eye',
        ifReply: '"Correct! It\'s called", {answer1}',
        elseReply: '"Sorry, it\'s not", {answer2}, "it\'s", {answer1}',
      },
      {
        topic: 'ask someone about UK literature',
        variable1: 'correct_answer',
        variable2: 'author',
        question1: "Who wrote 'Harry Potter'?",
        answer1: 'j.k. rowling',
        answer2: 'roald dahl',
        ifReply: '"Right!", {answer1}, "wrote Harry Potter"',
        elseReply: '"Actually,", {answer2}, "didn\'t write it.", {answer1}, "did"',
      },
      {
        topic: 'ask someone about UK currency',
        variable1: 'correct_answer',
        variable2: 'currency',
        question1: "What's the UK currency called?",
        answer1: 'pound',
        answer2: 'euro',
        ifReply: '"Right! The UK uses the", {answer1}',
        elseReply: '"Actually, the UK uses the", {answer1}, "not the", {answer2}',
      },
      {
        topic: 'ask someone about science',
        variable1: 'correct_answer',
        variable2: 'planet',
        question1: "What's the closest planet to the Sun?",
        answer1: 'mercury',
        answer2: 'venus',
        ifReply: '"Correct!", {answer1}, "is closest to the Sun"',
        elseReply: '"Actually,", {answer1}, "is closest, not", {answer2}',
      },
      {
        topic: 'ask someone about maths',
        variable1: 'correct_answer',
        variable2: 'answer',
        question1: "What's 7 x 8?",
        answer1: '56',
        answer2: '48',
        ifReply: '"Right!", {answer1}, "is correct"',
        elseReply: '"Not quite.", {answer2}, "is wrong. The answer is", {answer1}',
      },
      {
        topic: 'ask someone about technology',
        variable1: 'correct_answer',
        variable2: 'device',
        question1: 'What device is used to make phone calls?',
        answer1: 'phone',
        answer2: 'computer',
        ifReply: '"Correct! A", {answer1}, "is used for calls"',
        elseReply: '"Well, a", {answer2}, "can call too, but most use a", {answer1}',
      },
      {
        topic: 'ask someone about animals',
        variable1: 'correct_answer',
        variable2: 'animal',
        question1: "What's the largest land animal?",
        answer1: 'elephant',
        answer2: 'giraffe',
        ifReply: '"Right! The", {answer1}, "is the largest land animal"',
        elseReply: '"Actually, the", {answer1}, "is larger than a", {answer2}',
      },
      {
        topic: 'ask someone about programming',
        variable1: 'correct_answer',
        variable2: 'language',
        question1: 'What programming language are we learning?',
        answer1: 'python',
        answer2: 'javascript',
        ifReply: '"Correct! We\'re learning", {answer1}',
        elseReply: '"Actually, we\'re learning", {answer1}, "not", {answer2}',
      },
      {
        topic: 'ask someone about UK politics',
        variable1: 'correct_answer',
        variable2: 'building',
        question1: 'Where does the UK Prime Minister live?',
        answer1: 'downing street',
        answer2: 'buckingham palace',
        ifReply: '"Right! The PM lives on", {answer1}',
        elseReply: '"Actually, the PM lives on", {answer1}, "not at", {answer2}',
      },
      {
        topic: 'ask someone about UK transport',
        variable1: 'correct_answer',
        variable2: 'transport',
        question1: "What's London's underground railway called?",
        answer1: 'the tube',
        answer2: 'the metro',
        ifReply: '"Correct! It\'s called", {answer1}',
        elseReply: '"Actually, it\'s called", {answer1}, "not", {answer2}',
      },
      {
        topic: 'ask someone about emotions',
        variable1: 'correct_answer',
        variable2: 'feeling',
        question1: 'How are you feeling today?',
        answer1: 'happy',
        answer2: 'sad',
        ifReply: '"Great! I\'m", {answer1}, "too"',
        elseReply: '"Oh no! I hope you feel", {answer1}, "soon instead of", {answer2}',
      },
      {
        topic: 'ask someone about seasons',
        variable1: 'correct_answer',
        variable2: 'season',
        question1: "What's your favourite season?",
        answer1: 'summer',
        answer2: 'winter',
        ifReply: '"Nice!", {answer1}, "is lovely"',
        elseReply: '{answer2}, "is okay, but I prefer", {answer1}',
      },
      {
        topic: 'ask someone about hobbies',
        variable1: 'correct_answer',
        variable2: 'hobby',
        question1: "What's your favourite hobby?",
        answer1: 'reading',
        answer2: 'gaming',
        ifReply: '"Cool! I love", {answer1}, "too"',
        elseReply: '{answer2}, "is fun, but I prefer", {answer1}',
      },
      {
        topic: 'ask someone about UK education',
        variable1: 'correct_answer',
        variable2: 'subject',
        question1: "What's your favourite school subject?",
        answer1: 'computer science',
        answer2: 'english',
        ifReply: '"Excellent choice!", {answer1}, "is brilliant"',
        elseReply: '{answer2}, "is good, but", {answer1}, "is more fun"',
      },
      {
        topic: 'ask someone about breakfast',
        variable1: 'correct_answer',
        variable2: 'breakfast',
        question1: "What's your favourite breakfast?",
        answer1: 'cereal',
        answer2: 'toast',
        ifReply: '"Yum! I love", {answer1}, "too"',
        elseReply: '{answer2}, "is nice, but I prefer", {answer1}',
      },
      {
        topic: 'ask someone about pets',
        variable1: 'correct_answer',
        variable2: 'pet',
        question1: "What's your favourite type of pet?",
        answer1: 'dog',
        answer2: 'cat',
        ifReply: '"Awesome! I love", {answer1}, "s too"',
        elseReply: '{answer2}, "s are nice, but I prefer", {answer1}, "s"',
      },
      {
        topic: 'ask someone about UK cities',
        variable1: 'correct_answer',
        variable2: 'city',
        question1: "What's the largest city in Scotland?",
        answer1: 'glasgow',
        answer2: 'edinburgh',
        ifReply: '"Correct!", {answer1}, "is the largest Scottish city"',
        elseReply: '"Actually,", {answer1}, "is larger than", {answer2}',
      },
      {
        topic: 'ask someone about fast food',
        variable1: 'correct_answer',
        variable2: 'food',
        question1: "What's your favourite fast food?",
        answer1: 'pizza',
        answer2: 'burgers',
        ifReply: '"Yum! I love", {answer1}, "too"',
        elseReply:
          '"Nice choice! I prefer", {answer1}, "but", {answer2}, "are good too"',
      },
      {
        topic: 'ask someone about bicycle parts',
        variable1: 'correct_answer',
        variable2: 'bike_part',
        question1: 'What part of a bicycle do you sit on?',
        answer1: 'saddle',
        answer2: 'handlebars',
        ifReply: '"Correct! You sit on the", {answer1}',
        elseReply: '"Actually, you sit on the", {answer1}, "not the", {answer2}',
      },
      {
        topic: 'ask someone about recent movies',
        variable1: 'correct_answer',
        variable2: 'movie',
        question1:
          "What's the name of the movie where Timothée Chalamet plays Willy Wonka?",
        answer1: 'wonka',
        answer2: 'charlie and the chocolate factory',
        ifReply: '"Right!", {answer1}, "is the recent Willy Wonka movie"',
        elseReply: '"Not quite. It\'s", {answer1}, "not", {answer2}',
      },
      {
        topic: 'ask someone about video games',
        variable1: 'correct_answer',
        variable2: 'game',
        question1: "What's the name of the game where you build in a blocky world?",
        answer1: 'minecraft',
        answer2: 'fortnite',
        ifReply: '"Correct!", {answer1}, "is the blocky building game"',
        elseReply: '"Actually, it\'s", {answer1}, "not", {answer2}',
      },
      {
        topic: 'ask someone about music genres',
        variable1: 'correct_answer',
        variable2: 'genre',
        question1: "What's your favourite music genre?",
        answer1: 'pop',
        answer2: 'rock',
        ifReply: '"Cool! I enjoy", {answer1}, "too"',
        elseReply: '"Nice!", {answer2}, "is great, but I\'m more into", {answer1}',
      },
      {
        topic: 'ask someone about sports',
        variable1: 'correct_answer',
        variable2: 'sport',
        question1: "What's your favourite sport?",
        answer1: 'football',
        answer2: 'basketball',
        ifReply: '"Great choice!", {answer1}, "is amazing"',
        elseReply: '"Nice choice!", {answer2}, "is great, and so is", {answer1}',
      },
      {
        topic: 'ask someone about UK weather',
        variable1: 'correct_answer',
        variable2: 'weather',
        question1: "What's typical UK weather?",
        answer1: 'rainy',
        answer2: 'sunny',
        ifReply: '"Right!", {answer1}, "weather is quite typical in the UK"',
        elseReply:
          '"Well,", {answer2}, "days happen, but", {answer1}, "is more typical"',
      },
];

/**
 * Selection page with if/else programming concepts
 */
class SelectionPage extends ProgrammingPage {
  constructor() {
    super({
      questions: questions,
      pageType: 'selection',
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
    // Selection specific elements
    this.selectionQuestionEle = document.querySelector('#selectionQuestion');
    this.selectionAnswer1Ele = document.querySelector('#selectionAnswer1');
    this.selectionAnswer2Ele = document.querySelector('#selectionAnswer2');
    this.ifReplyEle = document.querySelector('#ifReply');
    this.elseReplyEle = document.querySelector('#elseReply');
    this.codeQuestionEle = document.querySelector('#codeQuestion');
    this.codeCorrectAnswerEle = document.querySelector('#codeCorrectAnswer');
    this.codeIfCheckEle = document.querySelector('#codeIfCheck');
    this.codeIfReplyEle = document.querySelector('#codeIfReply');
    this.codeElseReplyEle = document.querySelector('#codeElseReply');
      }

  setTopic(question) {
    if (this.topicEle && question.topic) {
      // Selection specific: "ask someone [topic]."
      this.topicEle.innerText = `${question.topic}.`;
    }
  }

  setCaptions(question) {
    try {
      if (this.selectionQuestionEle) {
        this.selectionQuestionEle.innerText = question.question1;
      }
      if (this.selectionAnswer1Ele) {
        this.selectionAnswer1Ele.innerText = question.answer1;
      }
      if (this.ifReplyEle && question.ifReply) {
        this.ifReplyEle.innerText = this.replaceText(question.ifReply, question, false)
          .replaceAll('"', '')
          .replaceAll(',', '');
      }
      if (this.selectionAnswer2Ele) {
        this.selectionAnswer2Ele.innerText = question.answer2;
      }
      if (this.elseReplyEle && question.elseReply) {
        this.elseReplyEle.innerText = this.replaceText(question.elseReply, question, false)
          .replaceAll('"', '')
          .replaceAll(',', '');
      }
    } catch (error) {
      console.error('Error in setCaptions function:', error);
    }
  }

  setCode(question) {
    try {
      const INDENT = '    '; // 4 spaces
      
      if (this.codeCorrectAnswerEle) {
        this.codeCorrectAnswerEle.innerText = `${question.variable1} = "${question.answer1}"`;
      }
      if (this.codeQuestionEle) {
        this.codeQuestionEle.innerText = `${question.variable2} = input("${question.question1} ")`;
      }
      if (this.codeIfCheckEle) {
        this.codeIfCheckEle.innerText = `if ${question.variable2} == ${question.variable1}:`;
      }
      if (this.codeIfReplyEle && question.ifReply) {
        this.codeIfReplyEle.innerText = `${INDENT}print(${this.replaceText(question.ifReply, question, true)})`;
      }
      if (this.codeElseReplyEle && question.elseReply) {
        this.codeElseReplyEle.innerText = `${INDENT}print(${this.replaceText(question.elseReply, question, true)})`;
      }
    } catch (error) {
      console.error('Error in setCode function:', error);
    }
  }

}

// Initialize the page
const selectionPage = new SelectionPage();