/**
 * Base class for Programming Practice pages
 * Handles common functionality while allowing page-specific customization
 */
export class ProgrammingPage {
  constructor(config) {
    this.questions = config.questions;
    this.pageType = config.pageType;
    
    // Store imported utility functions
    this.utils = config.utils || {};
    
    // Navigation state
    this.currentQuestionIndex = 0;
    
    // Concatenation mode state (false = comma, true = plus)
    this.usePlusMode = false;
    
    // Initialize common elements that exist on all pages
    this.initializeCommonElements();
    
    // Initialize page-specific elements
    this.initializePageElements(config.elementSelectors || {});
    
    // Set up common event listeners
    this.setupEventListeners();
    
    // Initialize concatenation toggle
    this.initializeConcatenationToggle();
    
    // Set up tabs on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
      if (this.utils.setupTabs) {
        this.utils.setupTabs();
      }
    });
  }

  /**
   * Initialize elements that exist on all pages
   */
  initializeCommonElements() {
    // Buttons (common to all pages)
    this.inspireBtn = document.querySelector('#inspire');
    this.helpBtn = document.querySelector('#help');
    this.backgroundBtn = document.querySelector('#background');
    this.forceSpongeBtn = document.querySelector('#forceSpongebob');
    this.copyBtn = document.querySelector('#copyMe');

    // Navigation buttons
    this.prevBtn = document.querySelector('#prevQuestion');
    this.nextBtn = document.querySelector('#nextQuestion');

    // Common sections
    this.exampleEle = document.querySelector('.example');
    this.codeEle = document.querySelector('.code');
    this.topicEle = document.querySelector('#topic');
  }

  /**
   * Initialize page-specific elements
   * Override this method in subclasses for page-specific elements
   */
  initializePageElements(selectors) {
    // Base implementation - can be overridden
    this.pageElements = {};
    
    // Store selectors for later use
    this.elementSelectors = selectors;
  }

  /**
   * Set up common event listeners
   */
  setupEventListeners() {
    if (this.inspireBtn) {
      this.inspireBtn.addEventListener('click', () => this.inspire());
    }
    
    if (this.helpBtn && this.utils.showHelp) {
      this.helpBtn.addEventListener('click', this.utils.showHelp);
    }
    
    if (this.copyBtn && this.utils.copyCode) {
      this.copyBtn.addEventListener('click', this.utils.copyCode);
    }
    
    if (this.backgroundBtn && this.utils.showBackground) {
      this.backgroundBtn.addEventListener('click', this.utils.showBackground);
    }
    
    if (this.forceSpongeBtn) {
      this.forceSpongeBtn.addEventListener('click', () => this.inspire('bob'));
    }

    // Navigation event listeners
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.navigateQuestion(-1));
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.navigateQuestion(1));
    }

    // Keyboard navigation
    this.setupKeyboardNavigation();
  }

  /**
   * Set up keyboard navigation
   */
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
      // Only handle navigation if the example section is visible
        switch (event.key){
            case 'b':
                event.preventDefault();
                this.utils.showBackground();
                break;
            case 'i':
                event.preventDefault();
                this.inspire();
                break;
        }
      if (this.exampleEle && !this.exampleEle.classList.contains('hidden')) {
        switch (event.key) {
          case 'ArrowLeft':
            event.preventDefault();
            this.navigateQuestion(-1);
            break;
          case 'ArrowRight':
            event.preventDefault();
            this.navigateQuestion(1);
            break;
        case '?':
            event.preventDefault();
            this.utils.showHelp();
            break;
        case 'c':
            if (this.codeEle && this.codeEle.classList.contains('hidden')) break;
            event.preventDefault();
            this.utils.copyCode();
            break;
        }
      }
    });
  }

  /**
   * Main inspire function - common pattern with hooks for customization
   */
  inspire(override) {
    try {
      // Common setup
      if (this.exampleEle) {
        this.exampleEle.classList.remove('hidden');
      }
      if (this.codeEle) {
        this.codeEle.classList.add('hidden');
      }

      // Pick question
      const numOfQuestions = this.questions.length;
      const questionToPick = override === 'bob' ? 1 : this.generateQuestionNumber(numOfQuestions);
      
      // Update current question index
      this.currentQuestionIndex = questionToPick - 1;
      
      const question = this.questions[this.currentQuestionIndex];
      
      // Display the question
      this.displayQuestion(question);
      
      // Update navigation button states
      this.updateNavigationButtons();
      
    } catch (error) {
      console.error(`Error in inspire function for ${this.pageType}:`, error);
    }
  }

  /**
   * Display a specific question
   */
  displayQuestion(question) {
    // Set topic (common pattern but slightly different text formatting)
    this.setTopic(question);
    
    // Page-specific caption and code setting
    this.setCaptions(question);
    this.setCode(question);
  }

  /**
   * Navigate to previous/next question
   */
  navigateQuestion(direction) {
    try {
      const newIndex = this.currentQuestionIndex + direction;
      
      // Check bounds
      if (newIndex < 0 || newIndex >= this.questions.length) {
        return;
      }
      
      // Update index and display question
      this.currentQuestionIndex = newIndex;
      const question = this.questions[this.currentQuestionIndex];
      
      // Show example section if hidden
      if (this.exampleEle) {
        this.exampleEle.classList.remove('hidden');
      }
      if (this.codeEle) {
        this.codeEle.classList.add('hidden');
      }
      
      this.displayQuestion(question);
      this.updateNavigationButtons();
      
    } catch (error) {
      console.error(`Error in navigateQuestion for ${this.pageType}:`, error);
    }
  }

  /**
   * Update navigation button states
   */
  updateNavigationButtons() {
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentQuestionIndex === 0;
    }
    
    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentQuestionIndex === this.questions.length - 1;
    }
  }

  /**
   * Set topic text - slight variations per page
   */
  setTopic(question) {
    if (this.topicEle && question.topic) {
      // Default implementation - can be overridden
      this.topicEle.innerText = `${question.topic}.`;
    }
  }

  /**
   * Generate random question number
   */
  generateQuestionNumber(numOfQuestions) {
    if (this.utils.generateQuestionNumber) {
      return this.utils.generateQuestionNumber(numOfQuestions);
    }
    return Math.ceil(Math.random() * numOfQuestions);
  }

  /**
   * Replace text using utility function
   */
  replaceText(text, question, code = true) {
    if (this.utils.replaceText) {
      return this.utils.replaceText(text, question, code);
    }
    // Fallback implementation
    return text;
  }

  /**
   * Initialize concatenation toggle (common to all pages)
   */
  initializeConcatenationToggle() {
    this.concatToggle = document.querySelector('#concatToggle');
    if (this.concatToggle) {
      // Load saved state from cookie
      this.loadToggleState();
      
      this.concatToggle.addEventListener('change', (e) => {
        this.usePlusMode = e.target.checked;
        // Save state to cookie
        this.saveToggleState();
        // Update background content visibility
        this.updateBackgroundContent();
        // Refresh the current question display
        this.updateCurrentQuestion();
      });
    }
    
    // Initialize background content on page load
    this.updateBackgroundContent();
  }

  /**
   * Save toggle state to cookie
   */
  saveToggleState() {
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1); // Expire in 1 year
    document.cookie = `concatenationMode=${this.usePlusMode}; expires=${expiryDate.toUTCString()}; path=/`;
  }

  /**
   * Load toggle state from cookie
   */
  loadToggleState() {
    const cookies = document.cookie.split(';');
    const modeCookie = cookies.find(cookie => cookie.trim().startsWith('concatenationMode='));
    
    if (modeCookie) {
      const savedState = modeCookie.split('=')[1].trim();
      this.usePlusMode = savedState === 'true';
    } else {
      // Default to comma mode if no cookie exists
      this.usePlusMode = false;
    }
    
    // Update the toggle UI to match the loaded state
    if (this.concatToggle) {
      this.concatToggle.checked = this.usePlusMode;
    }
  }

  /**
   * Update background content visibility based on concatenation mode
   */
  updateBackgroundContent() {
    // Show/hide comma mode elements
    const commaElements = document.querySelectorAll('.background-comma');
    const plusElements = document.querySelectorAll('.background-plus');
    
    commaElements.forEach(element => {
      if (this.usePlusMode) {
        element.classList.add('hidden');
      } else {
        element.classList.remove('hidden');
      }
    });
    
    plusElements.forEach(element => {
      if (this.usePlusMode) {
        element.classList.remove('hidden');
      } else {
        element.classList.add('hidden');
      }
    });
  }

  /**
   * Update current question display (useful when toggling modes)
   */
  updateCurrentQuestion() {
    if (this.questions && this.questions[this.currentQuestionIndex]) {
      const question = this.questions[this.currentQuestionIndex];
      this.displayQuestion(question);
    }
  }

  /**
   * Page-specific methods to be implemented by subclasses
   */
  setCaptions(question) {
    throw new Error(`setCaptions must be implemented by ${this.constructor.name}`);
  }

  setCode(question) {
    throw new Error(`setCode must be implemented by ${this.constructor.name}`);
  }
}