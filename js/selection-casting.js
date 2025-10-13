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
  // Integer comparison questions
  {
    topic: 'ask someone how old they are',
    pattern: 'int',
    variable1: 'age_limit',
    variable2: 'age',
    question1: 'How old are you?',
    limitValue: '18',
    answer1: '15',
    answer2: '20',
    operator: '<',
    ifReply: '"You are young"',
    ifReplyPlus: '"You are young"',
    elseReply: '"You are old"',
    elseReplyPlus: '"You are old"',
  },
  {
    topic: 'ask someone the temperature outside',
    pattern: 'int',
    variable1: 'temp_limit',
    variable2: 'temperature',
    question1: 'What is the temperature outside in Celsius?',
    limitValue: '20',
    answer1: '25',
    answer2: '15',
    operator: '>',
    ifReply: '"It is warm today"',
    ifReplyPlus: '"It is warm today"',
    elseReply: '"It is cold today"',
    elseReplyPlus: '"It is cold today"',
  },
  {
    topic: 'ask someone their exam score',
    pattern: 'int',
    variable1: 'pass_mark',
    variable2: 'score',
    question1: 'What was your exam score out of 100?',
    limitValue: '50',
    answer1: '65',
    answer2: '40',
    operator: '>=',
    ifReply: '"Well done! You passed"',
    ifReplyPlus: '"Well done! You passed"',
    elseReply: '"Sorry, you failed"',
    elseReplyPlus: '"Sorry, you failed"',
  },
  {
    topic: 'ask someone their height in cm',
    pattern: 'int',
    variable1: 'height_limit',
    variable2: 'height',
    question1: 'How tall are you in cm?',
    limitValue: '140',
    answer1: '120',
    answer2: '150',
    operator: '<',
    ifReply: '"You are too short for this ride"',
    ifReplyPlus: '"You are too short for this ride"',
    elseReply: '"You can go on the ride"',
    elseReplyPlus: '"You can go on the ride"',
  },
  {
    topic: 'ask someone how fast they were driving',
    pattern: 'int',
    variable1: 'speed_limit',
    variable2: 'speed',
    question1: 'How fast were you driving in mph?',
    limitValue: '30',
    answer1: '45',
    answer2: '25',
    operator: '>',
    ifReply: '"You were speeding!"',
    ifReplyPlus: '"You were speeding!"',
    elseReply: '"You were within the speed limit"',
    elseReplyPlus: '"You were within the speed limit"',
  },
  {
    topic: 'ask someone their bank balance',
    pattern: 'int',
    variable1: 'overdraft_limit',
    variable2: 'balance',
    question1: 'What is your bank balance in pounds?',
    limitValue: '0',
    answer1: '50',
    answer2: '-10',
    operator: '>=',
    ifReply: '"You have money"',
    ifReplyPlus: '"You have money"',
    elseReply: '"You are overdrawn"',
    elseReplyPlus: '"You are overdrawn"',
  },
  {
    topic: 'ask someone the number of hours they studied',
    pattern: 'int',
    variable1: 'min_hours',
    variable2: 'hours',
    question1: 'How many hours did you study?',
    limitValue: '5',
    answer1: '3',
    answer2: '6',
    operator: '<',
    ifReply: '"You need to study more"',
    ifReplyPlus: '"You need to study more"',
    elseReply: '"Good job studying!"',
    elseReplyPlus: '"Good job studying!"',
  },
  {
    topic: 'ask someone their screen time in hours',
    pattern: 'int',
    variable1: 'max_screen_time',
    variable2: 'screen_time',
    question1: 'How many hours of screen time today?',
    limitValue: '3',
    answer1: '2',
    answer2: '5',
    operator: '<=',
    ifReply: '"That is a reasonable amount"',
    ifReplyPlus: '"That is a reasonable amount"',
    elseReply: '"That is too much screen time"',
    elseReplyPlus: '"That is too much screen time"',
  },
  {
    topic: 'ask someone how many steps they walked',
    pattern: 'int',
    variable1: 'step_goal',
    variable2: 'steps',
    question1: 'How many steps did you walk today?',
    limitValue: '10000',
    answer1: '8500',
    answer2: '12000',
    operator: '<',
    ifReply: '"You did not reach your goal"',
    ifReplyPlus: '"You did not reach your goal"',
    elseReply: '"Great job! You reached your goal"',
    elseReplyPlus: '"Great job! You reached your goal"',
  },
  {
    topic: 'ask someone the price of an item',
    pattern: 'int',
    variable1: 'budget',
    variable2: 'price',
    question1: 'How much does the item cost in pounds?',
    limitValue: '100',
    answer1: '80',
    answer2: '150',
    operator: '<=',
    ifReply: '"You can afford it"',
    ifReplyPlus: '"You can afford it"',
    elseReply: '"It is too expensive"',
    elseReplyPlus: '"It is too expensive"',
  },
  {
    topic: 'ask someone their gaming hours this week',
    pattern: 'int',
    variable1: 'max_gaming_hours',
    variable2: 'hours_played',
    question1: 'How many hours did you game this week?',
    limitValue: '20',
    answer1: '25',
    answer2: '15',
    operator: '>',
    ifReply: '"That is too much gaming"',
    ifReplyPlus: '"That is too much gaming"',
    elseReply: '"That is a good amount"',
    elseReplyPlus: '"That is a good amount"',
  },
  {
    topic: 'ask someone their distance from home in km',
    pattern: 'int',
    variable1: 'safe_distance',
    variable2: 'distance',
    question1: 'How far are you from home in km?',
    limitValue: '5',
    answer1: '3',
    answer2: '8',
    operator: '<',
    ifReply: '"You are close to home"',
    ifReplyPlus: '"You are close to home"',
    elseReply: '"You are far from home"',
    elseReplyPlus: '"You are far from home"',
  },
  {
    topic: 'ask someone their quiz score',
    pattern: 'int',
    variable1: 'minimum_score',
    variable2: 'quiz_score',
    question1: 'What score did you get on the quiz?',
    limitValue: '70',
    answer1: '75',
    answer2: '60',
    operator: '>=',
    ifReply: '"Great score!"',
    ifReplyPlus: '"Great score!"',
    elseReply: '"You need more practice"',
    elseReplyPlus: '"You need more practice"',
  },
  {
    topic: 'ask someone the number of books they read',
    pattern: 'int',
    variable1: 'reading_goal',
    variable2: 'books_read',
    question1: 'How many books did you read this year?',
    limitValue: '12',
    answer1: '15',
    answer2: '8',
    operator: '>=',
    ifReply: '"Excellent reading!"',
    ifReplyPlus: '"Excellent reading!"',
    elseReply: '"Keep reading more"',
    elseReplyPlus: '"Keep reading more"',
  },
  {
    topic: 'ask someone their water intake in litres',
    pattern: 'int',
    variable1: 'recommended_water',
    variable2: 'water_intake',
    question1: 'How many litres of water did you drink today?',
    limitValue: '2',
    answer1: '1',
    answer2: '3',
    operator: '<',
    ifReply: '"You need to drink more water"',
    ifReplyPlus: '"You need to drink more water"',
    elseReply: '"Well done staying hydrated!"',
    elseReplyPlus: '"Well done staying hydrated!"',
  },
  {
    topic: 'ask someone their sleep hours',
    pattern: 'int',
    variable1: 'min_sleep',
    variable2: 'hours_slept',
    question1: 'How many hours did you sleep last night?',
    limitValue: '7',
    answer1: '9',
    answer2: '5',
    operator: '>=',
    ifReply: '"Great! You got enough sleep"',
    ifReplyPlus: '"Great! You got enough sleep"',
    elseReply: '"You need more sleep"',
    elseReplyPlus: '"You need more sleep"',
  },
  {
    topic: 'ask someone their phone battery percentage',
    pattern: 'int',
    variable1: 'low_battery',
    variable2: 'battery',
    question1: 'What is your phone battery percentage?',
    limitValue: '20',
    answer1: '15',
    answer2: '50',
    operator: '<=',
    ifReply: '"Your battery is low!"',
    ifReplyPlus: '"Your battery is low!"',
    elseReply: '"Your battery is fine"',
    elseReplyPlus: '"Your battery is fine"',
  },
  {
    topic: 'ask someone the number of homework assignments done',
    pattern: 'int',
    variable1: 'total_assignments',
    variable2: 'completed',
    question1: 'How many homework assignments have you completed?',
    limitValue: '10',
    answer1: '12',
    answer2: '7',
    operator: '>=',
    ifReply: '"You are ahead!"',
    ifReplyPlus: '"You are ahead!"',
    elseReply: '"You are behind"',
    elseReplyPlus: '"You are behind"',
  },
  {
    topic: 'ask someone their typing speed in words per minute',
    pattern: 'int',
    variable1: 'average_speed',
    variable2: 'typing_speed',
    question1: 'What is your typing speed in words per minute?',
    limitValue: '40',
    answer1: '55',
    answer2: '30',
    operator: '>',
    ifReply: '"You are a fast typer!"',
    ifReplyPlus: '"You are a fast typer!"',
    elseReply: '"Keep practising typing"',
    elseReplyPlus: '"Keep practising typing"',
  },
  {
    topic: 'ask someone the number of friends at their party',
    pattern: 'int',
    variable1: 'party_capacity',
    variable2: 'guests',
    question1: 'How many friends are coming to your party?',
    limitValue: '15',
    answer1: '12',
    answer2: '20',
    operator: '<=',
    ifReply: '"Perfect number of guests"',
    ifReplyPlus: '"Perfect number of guests"',
    elseReply: '"That is too many people!"',
    elseReplyPlus: '"That is too many people!"',
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

        // Variables in uppercase to show they are constants
      question.variable1 = question.variable1.toUpperCase()
      if (this.codeCorrectAnswerEle) {
          // AGE_LIMIT = 18 (use limitValue)
          this.codeCorrectAnswerEle.innerText = `${question.variable1} = ${question.limitValue}`;
      }
      
      if (this.codeQuestionEle) {
          // age = int(input("How old are you? "))
          this.codeQuestionEle.innerText = `${question.variable2} = int(input("${question.question1} "))`;
      }
      
      if (this.codeIfCheckEle) {
          // if age < AGE_LIMIT:
          this.codeIfCheckEle.innerText = `if ${question.variable2} ${question.operator} ${question.variable1}:`;
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