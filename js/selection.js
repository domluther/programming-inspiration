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
  // String equality questions
  {
    topic: 'ask someone the best show',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'best_show',
    question1: 'What is the best TV show?',
    answer1: 'spongebob squarepants',
    answer2: 'stranger things',
    ifReply: '"Absolutely!", {answer1}, "is glorious"',
    ifReplyPlus: '"Absolutely! " + {answer1} + " is glorious"',
    elseReply: '{answer2}, "?!?! No way - it is", {answer1}',
    elseReplyPlus: '{answer2} + "?!?! No way - it is " + {answer1}',
  },
  {
    topic: "ask someone's favourite colour",
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'colour',
    question1: 'What is your favourite colour?',
    answer1: 'green',
    answer2: 'blue',
    ifReply: '"I love", {answer1}, "too"',
    ifReplyPlus: '"I love " + {answer1} + " too"',
    elseReply: '{answer2}, "? I prefer", {answer1}',
    elseReplyPlus: '{answer2} + "? I prefer " + {answer1}',
  },
  {
    topic: 'ask someone about UK geography',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'capital',
    question1: "What's the capital of England?",
    answer1: 'london',
    answer2: 'manchester',
    ifReply: '"Correct!", {answer1}, "is the capital of England"',
    ifReplyPlus: '"Correct! " + {answer1} + " is the capital of England"',
    elseReply:
      '"Not quite.", {answer2}, "is not the capital. It\'s", {answer1}',
    elseReplyPlus:
      '"Not quite. " + {answer2} + " is not the capital. It\'s " + {answer1}',
  },
  {
    topic: 'ask someone about popular music',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'artist',
    question1: "Who sang 'Shape of You'?",
    answer1: 'ed sheeran',
    answer2: 'harry styles',
    ifReply: '"Right!", {answer1}, "sang Shape of You"',
    ifReplyPlus: '"Right! " + {answer1} + " sang Shape of You"',
    elseReply: '"Actually,", {answer2}, "didn\'t sing it.", {answer1}, "did"',
    elseReplyPlus: '"Actually, " + {answer2} + " didn\'t sing it. " + {answer1} + " did"',
  },
  {
    topic: 'ask someone about UK sports',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'sport',
    question1: 'What sport is played at Wimbledon?',
    answer1: 'tennis',
    answer2: 'cricket',
    ifReply: '"Correct!", {answer1}, "is played at Wimbledon"',
    ifReplyPlus: '"Correct! " + {answer1} + " is played at Wimbledon"',
    elseReply:
      '"Sorry,", {answer2}, "isn\'t played at Wimbledon.", {answer1}, "is"',
    elseReplyPlus:
      '"Sorry, " + {answer2} + " isn\'t played at Wimbledon. " + {answer1} + " is"',
  },
  {
    topic: 'ask someone about UK TV shows',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'show',
    question1: 'What show features the Daleks?',
    answer1: 'doctor who',
    answer2: 'sherlock',
    ifReply: '"Right!", {answer1}, "features the Daleks"',
    ifReplyPlus: '"Right! " + {answer1} + " features the Daleks"',
    elseReply:
      '"Not quite.", {answer2}, "doesn\'t have Daleks.", {answer1}, "does"',
    elseReplyPlus:
      '"Not quite. " + {answer2} + " doesn\'t have Daleks. " + {answer1} + " does"',
  },
  {
    topic: 'ask someone about UK history',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'monarch',
    question1: 'Who was the longest-reigning UK monarch?',
    answer1: 'elizabeth ii',
    answer2: 'victoria',
    ifReply: '"Correct!", {answer1}, "reigned the longest"',
    ifReplyPlus: '"Correct! " + {answer1} + " reigned the longest"',
    elseReply:
      '"Actually,", {answer2}, "didn\'t reign longest.", {answer1}, "did"',
    elseReplyPlus:
      '"Actually, " + {answer2} + " didn\'t reign longest. " + {answer1} + " did"',
  },
  {
    topic: 'ask someone about UK literature',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'author',
    question1: "Who wrote 'Harry Potter'?",
    answer1: 'j.k. rowling',
    answer2: 'roald dahl',
    ifReply: '"Right!", {answer1}, "wrote Harry Potter"',
    ifReplyPlus: '"Right! " + {answer1} + " wrote Harry Potter"',
    elseReply: '"Actually,", {answer2}, "didn\'t write it.", {answer1}, "did"',
    elseReplyPlus: '"Actually, " + {answer2} + " didn\'t write it. " + {answer1} + " did"',
  },
  {
    topic: 'ask someone about UK politics',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'position',
    question1: "What's the UK Prime Minister's residence?",
    answer1: '10 downing street',
    answer2: 'buckingham palace',
    ifReply: '"Correct! The PM lives at", {answer1}',
    ifReplyPlus: '"Correct! The PM lives at " + {answer1}',
    elseReply: '"Not quite. It\'s", {answer1}, "not", {answer2}',
    elseReplyPlus: '"Not quite. It\'s " + {answer1} + " not " + {answer2}',
  },
  {
    topic: 'ask someone about UK pop culture',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'band',
    question1: "Which band sang 'Wonderwall'?",
    answer1: 'oasis',
    answer2: 'blur',
    ifReply: '"Right!", {answer1}, "sang Wonderwall"',
    ifReplyPlus: '"Right! " + {answer1} + " sang Wonderwall"',
    elseReply: '"Actually, it wasn\'t", {answer2}, "it was", {answer1}',
    elseReplyPlus: '"Actually, it wasn\'t " + {answer2} + " it was " + {answer1}',
  },
  {
    topic: 'ask someone about UK sports teams',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'team',
    question1: 'Which football team plays at Old Trafford?',
    answer1: 'manchester united',
    answer2: 'liverpool fc',
    ifReply: '"Right!", {answer1}, "plays at Old Trafford"',
    ifReplyPlus: '"Right! " + {answer1} + " plays at Old Trafford"',
    elseReply:
      '"Actually,", {answer2}, "don\'t play at Old Trafford.", {answer1}, "do"',
    elseReplyPlus:
      '"Actually, " + {answer2} + " don\'t play at Old Trafford. " + {answer1} + " do"',
  },
  {
    topic: 'ask someone about UK education',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'exam',
    question1: 'What exams do UK students take at 16?',
    answer1: 'gcses',
    answer2: 'a-levels',
    ifReply: '"Correct! Students take", {answer1}, "at 16"',
    ifReplyPlus: '"Correct! Students take " + {answer1} + " at 16"',
    elseReply:
      '"Not quite.", {answer2}, "are taken later.", {answer1}, "are at 16"',
    elseReplyPlus:
      '"Not quite. " + {answer2} + " are taken later. " + {answer1} + " are at 16"',
  },
  {
    topic: 'ask someone about UK animals',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'animal',
    question1: "What's the UK's national animal?",
    answer1: 'lion',
    answer2: 'bulldog',
    ifReply: '"Correct! The UK\'s national animal is the", {answer1}',
    ifReplyPlus: '"Correct! The UK\'s national animal is the " + {answer1}',
    elseReply: '"Not quite. It\'s not the", {answer2}, "it\'s the", {answer1}',
    elseReplyPlus: '"Not quite. It\'s not the " + {answer2} + " it\'s the " + {answer1}',
  },
  {
    topic: 'ask someone about UK celebrations',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'celebration',
    question1: 'What do we celebrate on Guy Fawkes Night?',
    answer1: 'bonfire night',
    answer2: "new year's eve",
    ifReply: '"Right! We celebrate", {answer1}',
    ifReplyPlus: '"Right! We celebrate " + {answer1}',
    elseReply: '"Actually, it\'s not", {answer2}, "it\'s", {answer1}',
    elseReplyPlus: '"Actually, it\'s not " + {answer2} + " it\'s " + {answer1}',
  },
  {
    topic: 'ask someone about UK science',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'scientist',
    question1: 'Who discovered penicillin?',
    answer1: 'alexander fleming',
    answer2: 'isaac newton',
    ifReply: '"Correct!", {answer1}, "discovered penicillin"',
    ifReplyPlus: '"Correct! " + {answer1} + " discovered penicillin"',
    elseReply:
      '"Not quite.", {answer2}, "didn\'t discover it.", {answer1}, "did"',
    elseReplyPlus:
      '"Not quite. " + {answer2} + " didn\'t discover it. " + {answer1} + " did"',
  },
  {
    topic: 'ask someone about UK monarchy',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'residence',
    question1: 'Where does the monarch live?',
    answer1: 'buckingham palace',
    answer2: 'windsor castle',
    ifReply: '"Right! The monarch lives in", {answer1}',
    ifReplyPlus: '"Right! The monarch lives in " + {answer1}',
    elseReply: '"Actually, it\'s not", {answer2}, "it\'s", {answer1}',
    elseReplyPlus: '"Actually, it\'s not " + {answer2} + " it\'s " + {answer1}',
  },
  {
    topic: 'ask someone about UK traditions',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'tradition',
    question1: "What's traditionally eaten on Pancake Day?",
    answer1: 'pancakes',
    answer2: 'fish and chips',
    ifReply: '"Correct! We eat", {answer1}, "on Pancake Day"',
    ifReplyPlus: '"Correct! We eat " + {answer1} + " on Pancake Day"',
    elseReply: '"Not quite. We don\'t eat", {answer2}, "we eat", {answer1}',
    elseReplyPlus: '"Not quite. We don\'t eat " + {answer2} + " we eat " + {answer1}',
  },
  {
    topic: 'ask someone about UK film',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'character',
    question1: 'Who is the famous British spy in films?',
    answer1: 'james bond',
    answer2: 'sherlock holmes',
    ifReply: '"Right! The famous British spy is", {answer1}',
    ifReplyPlus: '"Right! The famous British spy is " + {answer1}',
    elseReply: '"Actually, it\'s not", {answer2}, "it\'s", {answer1}',
    elseReplyPlus: '"Actually, it\'s not " + {answer2} + " it\'s " + {answer1}',
  },
  {
    topic: 'ask someone about ducks',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'duck_sound',
    question1: 'What sound does a duck make?',
    answer1: 'quack',
    answer2: 'moo',
    ifReply: '"Correct!", {answer1}, "is the sound ducks make"',
    ifReplyPlus: '"Correct! " + {answer1} + " is the sound ducks make"',
    elseReply: '"Not quite! Ducks go", {answer1}, "not", {answer2}',
    elseReplyPlus: '"Not quite! Ducks go " + {answer1} + " not " + {answer2}',
  },
  {
    topic: 'ask someone about social media',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'app',
    question1: 'Which app is known for short videos and dances?',
    answer1: 'tiktok',
    answer2: 'instagram',
    ifReply: '"Correct!", {answer1}, "is famous for short videos and dances"',
    ifReplyPlus: '"Correct! " + {answer1} + " is famous for short videos and dances"',
    elseReply:
      '"Not quite.", {answer2}, "isn\'t known for that, but", {answer1}, "is"',
    elseReplyPlus:
      '"Not quite. " + {answer2} + " isn\'t known for that, but " + {answer1} + " is"',
  },
  {
    topic: 'ask someone about favourite foods',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'food',
    question1: "What's your favourite fast food?",
    answer1: 'pizza',
    answer2: 'burgers',
    ifReply: '"Yum! I love", {answer1}, "too"',
    ifReplyPlus: '"Yum! I love " + {answer1} + " too"',
    elseReply:
      '"Nice choice! I prefer", {answer1}, "but", {answer2}, "are good too"',
    elseReplyPlus:
      '"Nice choice! I prefer " + {answer1} + " but " + {answer2} + " are good too"',
  },
  {
    topic: 'ask someone about video games',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'game',
    question1: "What's the name of the game where you build in a blocky world?",
    answer1: 'minecraft',
    answer2: 'fortnite',
    ifReply: '"Correct!", {answer1}, "is the blocky building game"',
    ifReplyPlus: '"Correct! " + {answer1} + " is the blocky building game"',
    elseReply: '"Actually, it\'s", {answer1}, "not", {answer2}',
    elseReplyPlus: '"Actually, it\'s " + {answer1} + " not " + {answer2}',
  },
  {
    topic: 'ask someone about music genres',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'genre',
    question1: "What's your favourite music genre?",
    answer1: 'pop',
    answer2: 'rock',
    ifReply: '"Cool! I enjoy", {answer1}, "too"',
    ifReplyPlus: '"Cool! I enjoy " + {answer1} + " too"',
    elseReply: '"Nice!", {answer2}, "is great, but I\'m more into", {answer1}',
    elseReplyPlus: '"Nice! " + {answer2} + " is great, but I\'m more into " + {answer1}',
  },
  {
    topic: 'ask someone about climate change',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'action',
    question1: "What's a good way to reduce your carbon footprint?",
    answer1: 'cycling',
    answer2: 'driving',
    ifReply: '"Agreed!", {answer1}, "is great for reducing carbon footprint"',
    ifReplyPlus: '"Agreed! " + {answer1} + " is great for reducing carbon footprint"',
    elseReply:
      '"Actually,", {answer1}, "is better than", {answer2}, "for the environment"',
    elseReplyPlus:
      '"Actually, " + {answer1} + " is better than " + {answer2} + " for the environment"',
  },
  {
    topic: 'ask someone about internet slang',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'acronym',
    question1: "What does 'TBH' stand for?",
    answer1: 'to be honest',
    answer2: 'to be happy',
    ifReply: '"Correct! TBH means", {answer1}',
    ifReplyPlus: '"Correct! TBH means " + {answer1}',
    elseReply: '"Not quite. TBH stands for", {answer1}, "not", {answer2}',
    elseReplyPlus: '"Not quite. TBH stands for " + {answer1} + " not " + {answer2}',
  },
  {
    topic: 'ask someone about technology',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'device',
    question1: 'What device do you use most for internet browsing?',
    answer1: 'smartphone',
    answer2: 'laptop',
    ifReply: '"Same here! I use my", {answer1}, "most too"',
    ifReplyPlus: '"Same here! I use my " + {answer1} + " most too"',
    elseReply: '"Interesting! I use my", {answer1}, "more than my", {answer2}',
    elseReplyPlus: '"Interesting! I use my " + {answer1} + " more than my " + {answer2}',
  },
  {
    topic: 'ask someone about school subjects',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'subject',
    question1: "What's your favourite school subject?",
    answer1: 'maths',
    answer2: 'english',
    ifReply: '"Cool! I enjoy", {answer1}, "too"',
    ifReplyPlus: '"Cool! I enjoy " + {answer1} + " too"',
    elseReply: '"Nice!", {answer2}, "is great, but I prefer", {answer1}',
    elseReplyPlus: '"Nice! " + {answer2} + " is great, but I prefer " + {answer1}',
  },
  {
    topic: 'ask someone about pets',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'pet',
    question1: "What's your favourite pet?",
    answer1: 'dog',
    answer2: 'cat',
    ifReply: '"Nice! I love", {answer1}, "s too"',
    ifReplyPlus: '"Nice! I love " + {answer1} + "s too"',
    elseReply:
      '"Cool!", {answer2}, "s are great, but I prefer", {answer1}, "s"',
    elseReplyPlus:
      '"Cool! " + {answer2} + "s are great, but I prefer " + {answer1} + "s"',
  },
  {
    topic: 'ask someone about future careers',
    pattern: 'string',
    variable1: 'correct_answer',
    variable2: 'career',
    question1: 'What career are you interested in?',
    answer1: 'doctor',
    answer2: 'teacher',
    ifReply: '"Interesting! Being a", {answer1}, "sounds great"',
    ifReplyPlus: '"Interesting! Being a " + {answer1} + " sounds great"',
    elseReply: '"Nice choice! Being a", {answer2}, "is great, and so is", {answer1}',
    elseReplyPlus: '"Nice choice! Being a " + {answer2} + " is great, and so is being a " + {answer1}',
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
    // Selection-specific elements for cartoon
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
      // Selection specific: "ask someone [topic]."
      this.topicEle.innerText = `${question.topic}.`;
    }
  }

  setCaptions(question) {
    try {
      const pattern = question.pattern || 'string'; // Default to string for backward compatibility
      
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
      const pattern = question.pattern || 'string'; // Default to string for backward compatibility
      
      if (this.codeCorrectAnswerEle) {
        if (pattern === 'int') {
          // For int pattern: age_limit = 18 (use limitValue)
          this.codeCorrectAnswerEle.innerText = `${question.variable1} = ${question.limitValue}`;
        } else {
          // For string pattern: correct_answer = "london"
          this.codeCorrectAnswerEle.innerText = `${question.variable1} = "${question.answer1}"`;
        }
      }
      
      if (this.codeQuestionEle) {
        if (pattern === 'int') {
          // For int pattern: age = int(input("How old are you? "))
          this.codeQuestionEle.innerText = `${question.variable2} = int(input("${question.question1} "))`;
        } else {
          // For string pattern: best_show = input("What is the best TV show? ")
          this.codeQuestionEle.innerText = `${question.variable2} = input("${question.question1} ")`;
        }
      }
      
      if (this.codeIfCheckEle) {
        if (pattern === 'int') {
          // For int pattern: if age < age_limit:
          this.codeIfCheckEle.innerText = `if ${question.variable2} ${question.operator} ${question.variable1}:`;
        } else {
          // For string pattern: if best_show == correct_answer:
          this.codeIfCheckEle.innerText = `if ${question.variable2} == ${question.variable1}:`;
        }
      }
      
      if (this.codeIfReplyEle) {
        // Choose the appropriate response based on concatenation mode
        const ifReplyText = this.usePlusMode ? 
          (question.ifReplyPlus || question.ifReply) : 
          question.ifReply;
        this.codeIfReplyEle.innerText = `${INDENT}print(${this.replaceText(ifReplyText, question, true)})`;
      }
      if (this.codeElseReplyEle) {
        // Choose the appropriate response based on concatenation mode
        const elseReplyText = this.usePlusMode ? 
          (question.elseReplyPlus || question.elseReply) : 
          question.elseReply;
        this.codeElseReplyEle.innerText = `${INDENT}print(${this.replaceText(elseReplyText, question, true)})`;
      }
    } catch (error) {
      console.error('Error in setCode function:', error);
    }
  }

}

// Initialize the page
const selectionPage = new SelectionPage();