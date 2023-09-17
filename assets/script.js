var startButton = document.querySelector("#start-btn")
var nextButton = document.querySelector("#next-btn")
var answersContainerEl = document.querySelector('#answer-buttons')
var questionEl = document.querySelector('#question')
var answerButtonsEl = document.querySelector('#answer-buttons')
var correctAlert = document.querySelector('#correct-alert')
var incorrectAlert = document.querySelector('#incorrect-alert')
var restartQuizButton = document.querySelector('#restart-quiz')

startButton.addEventListener('click', startQuiz)

let shuffledQuestions, currentQuestionIndex

function startQuiz() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  answersContainerEl.classList.add('d-grid');
  answersContainerEl.classList.remove('hide');
  restartQuizButton.classList.remove('hide');
  setNextQuetion();
}

function setNextQuetion() {
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionEl.innerText = question.question;
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('list-group-item', 'list-group-item-action')
    button.setAttribute('type', 'button')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsEl.appendChild(button)
  })
}

function selectAnswer(event) {
  const selectedButton = event.target;
  if (selectedButton.dataset.correct) {
    selectedButton.classList.add('active');
    correctAlert.classList.remove('hide');
    disableAnswerButtons();
  } else {
    selectedButton.classList.add('active');
    incorrectAlert.classList.remove('hide');
    disableAnswerButtons();
  }
  nextButton.classList.remove('hide');
}

function disableAnswerButtons () {
  var answerButtons = document.querySelectorAll('.list-group-item', '.list-group-item-action');
  answerButtons.forEach(button => {
    button.disabled = true;
  });
}

const questions = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    answers: [
      {text: '<script>', correct: true},
      {text: '<js>', correct: false},
      {text: '<HTML>', correct: false},
      {text: '<h1>', correct: false}
    ]
  }
]

function refreshPage() {
  location.reload();
}