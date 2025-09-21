export function showHelp() {
  document.querySelector('.code').classList.toggle('hidden');
}

export function showBackground() {
  document.querySelector('.background').classList.toggle('hidden');
}

export function copyCode() {
  const codeText = document
    .querySelector('.code')
    .innerText.replace('📋\n', '# explain me').replaceAll('\n\n', '\n# explain me\n');
  navigator.clipboard.writeText(codeText);
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
      .replaceAll('{originalQuestion}', question?.originalQuestion);
  }
  return text
    .replaceAll('{answer1}', question?.answer1)
    .replaceAll('{answer2}', question?.answer2)
    .replaceAll('{result}', question?.result);
}

export function generateQuestionNumber(numOfQuestions) {
  return Math.ceil(Math.random() * numOfQuestions);
}
