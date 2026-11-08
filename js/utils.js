export function showHelp() {
  document.querySelector('.code').classList.toggle('hidden');
}

export function showBackground() {
  document.querySelector('.background').classList.toggle('hidden');
}

function getCode(mode) {
  const commentCharacter = mode === 'ocr' ? '//' : '#';
  return document
    .querySelector('.code')
    .innerText
    .replace(/📋\n\n?([ \t]*)/, (_, indent) => `${indent}${commentCharacter} explain me\n${indent}`)
    .replace(/\n\n([ \t]*)/g, (_, indent) => `\n${indent}${commentCharacter} explain me\n${indent}`);
}

export function copyCode(mode='python') {
  const codeText = getCode(mode);
  navigator.clipboard.writeText(codeText);
  
  // Show toast message based on mode
  const toastMessage = mode === 'ocr' 
    ? 'Code copied.\nPaste into examreferencelanguage.co.uk to run it, then add comments to explain.'
    : 'Code copied.\nPaste into Thonny and run it, then add comments to explain.';
  showToast(toastMessage);
}

export function openCodeInERL() {
  const params = new URLSearchParams({
    code: JSON.stringify([{ name: 'code', content: getCode('ocr') }])
  });
  window.open(`https://www.examreferencelanguage.co.uk/index.php?${params}`, '_blank', 'noopener,noreferrer');
}

export function showToast(message) {
  // Remove any existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message.replace(/\n/g, '<br>');
  
  // Add to document
  document.body.appendChild(toast);
  
  // Show toast with animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  // Hide and remove toast after 4 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.remove();
      }
    }, 300);
  }, 4000);
}

export function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');

      tabButtons.forEach((btn) => btn.classList.remove('active'));
      tabContents.forEach((content) => content.classList.remove('active'));

      button.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

export function replaceText(text, question, code = true) {
  if (code) {
    return text
      .replaceAll('{finalMessage}', question?.finalMessage)
      .replaceAll('{loopMessage}', question?.loopMessage)
      .replaceAll('{variable1}', question?.variable1)
      .replaceAll('{variable2}', question?.variable2)
      .replaceAll('{variable3}', question?.variable3)
      .replaceAll('{result}', question?.variable3)
      .replaceAll('{answer}', question?.variable)
      .replaceAll('{answer1}', question?.variable1)
      .replaceAll('{answer2}', question?.variable2)
      .replaceAll('{correctReply}', question?.variable1)
      .replaceAll('{originalQuestion}', question?.originalQuestion);
  }
  return text
    .replaceAll('{answer1}', question?.answer1)
    .replaceAll('{answer2}', question?.answer2)
    .replaceAll('{correctReply}', question?.correctReply)
    .replaceAll('{result}', question?.result);
}

export function generateQuestionNumber(numOfQuestions) {
  return Math.ceil(Math.random() * numOfQuestions);
}
