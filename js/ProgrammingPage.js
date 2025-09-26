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
    this.usePlusMode = true; // Default to plus mode
    
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
    this.keyboardBtn = document.querySelector('#keyboardShortcuts');

    // Navigation buttons
    this.prevBtn = document.querySelector('#prevQuestion');
    this.nextBtn = document.querySelector('#nextQuestion');

    // Modal elements
    this.shortcutsModal = document.querySelector('#shortcutsModal');
    this.modalCloseBtn = document.querySelector('.modal-close');

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

    // Keyboard shortcuts modal event listeners
    if (this.keyboardBtn) {
      this.keyboardBtn.addEventListener('click', () => this.showKeyboardShortcuts());
    }
    
    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => this.hideKeyboardShortcuts());
    }
    
    // Close modal when clicking outside or pressing Escape
    if (this.shortcutsModal) {
      this.shortcutsModal.addEventListener('click', (e) => {
        if (e.target === this.shortcutsModal) {
          this.hideKeyboardShortcuts();
        }
      });
    }

    // Inspire links event listeners
    const inspireLinks = document.querySelectorAll('.inspire-link');
    inspireLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.inspire();
      });
    });

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
            case 't':
                event.preventDefault();
                this.toggleConcatenationMode();
                break;
            case 'k':
                event.preventDefault();
                this.showKeyboardShortcuts();
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
        case 'h':
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
      // Load saved state from localStorage
      this.loadToggleState();
      
      this.concatToggle.addEventListener('change', (e) => {
        this.usePlusMode = e.target.checked;
        // Save state to localStorage
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
   * Toggle concatenation mode (useful for keyboard shortcut)
   */
  toggleConcatenationMode() {
    if (this.concatToggle) {
      // Toggle the checkbox
      this.concatToggle.checked = !this.concatToggle.checked;
      
      // Update the mode state
      this.usePlusMode = this.concatToggle.checked;
      
      // Save state to cookie
      this.saveToggleState();
      
      // Update background content visibility
      this.updateBackgroundContent();
      
      // Refresh the current question display
      this.updateCurrentQuestion();
    }
  }

  /**
   * Save toggle state to localStorage
   */
  saveToggleState() {
    localStorage.setItem('concatenationMode', this.usePlusMode.toString());
  }

  /**
   * Load toggle state from localStorage
   */
  loadToggleState() {
    const savedState = localStorage.getItem('concatenationMode');
    
    if (savedState !== null) {
      this.usePlusMode = savedState === 'true';
    } else {
      // Default to plus mode if no saved state exists
      this.usePlusMode = true;
      // Save the default value to localStorage
      localStorage.setItem('concatenationMode', this.usePlusMode.toString());
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
    
    // Update toggle label styling
    this.updateToggleLabels();
  }

  /**
   * Update toggle label styling based on current mode
   */
  updateToggleLabels() {
    const modeComma = document.querySelector('.mode-comma');
    const modePlus = document.querySelector('.mode-plus');
    
    if (modeComma && modePlus) {
      if (this.usePlusMode) {
        // Plus mode active
        modeComma.style.color = '#666';
        modeComma.style.fontWeight = 'normal';
        modePlus.style.color = '#4CAF50';
        modePlus.style.fontWeight = '500';
      } else {
        // Comma mode active
        modeComma.style.color = '#ff8c00';
        modeComma.style.fontWeight = '500';
        modePlus.style.color = '#666';
        modePlus.style.fontWeight = 'normal';
      }
    }
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
   * Show keyboard shortcuts modal
   */
  showKeyboardShortcuts() {
    if (this.shortcutsModal) {
      this.shortcutsModal.showModal();
    }
  }

  /**
   * Hide keyboard shortcuts modal
   */
  hideKeyboardShortcuts() {
    if (this.shortcutsModal) {
      this.shortcutsModal.close();
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
