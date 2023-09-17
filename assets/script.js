var startButton = document.querySelector("#start-btn")
var nextButton = document.querySelector("#next-btn")
var answersContainerEl = document.querySelector('#answer-buttons')
var questionEl = document.querySelector('#question')
var answerButtonsEl = document.querySelector('#answer-buttons')
var correctAlert = document.querySelector('#correct-alert')
var incorrectAlert = document.querySelector('#incorrect-alert')
var restartQuizButton = document.querySelector('#restart-quiz')
var finalScore = document.querySelector('#final-score')
var highScoreInput = document.querySelector('#highscore-input')
var progressBarContainer = document.querySelector('#progressbar-container')

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
  resetAlerts(correctAlert, incorrectAlert);
  clearPreviousAnswers();
  currentQuestionIndex++;
  setNextQuetion();
})

let shuffledQuestions, currentQuestionIndex

function startQuiz() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  answersContainerEl.classList.add('d-grid');
  answersContainerEl.classList.remove('hide');
  restartQuizButton.classList.remove('hide');
  progressBarContainer.classList.remove('hide');
  setNextQuetion();
  startTimer();
}

const timerElement = document.getElementById('timer');
let timeLeft = 60;
let timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      startHighScoreInput();
    } else {
      timerElement.textContent = `${timeLeft} seconds left`;
      timeLeft--;
      updateProgressBar();
    }
  }, 1000);
}

function updateProgressBar() {
  const progress = (timeLeft / 60) * 100;
  timerElement.style.setProperty('width', progress + '%');
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
  if (shuffledQuestions.length > currentQuestionIndex + 1){
    nextButton.classList.remove('hide');
  } else {
    nextButton.classList.add('hide')
    startHighScoreInput();
  }
}

function clearPreviousAnswers() {
  var answerButtons = document.querySelectorAll('.list-group-item', '.list-group-item-action');
  answerButtons.forEach(button => {
    button.classList.add('hide');
  });
}

function startHighScoreInput() {
  var answerButtons = document.querySelectorAll('.list-group-item', '.list-group-item-action');
  answerButtons.forEach(button => {
    button.classList.add('hide')
  })
  finalScore.classList.remove('hide')
  resetAlerts(correctAlert, incorrectAlert);
  highScoreInput.classList.remove('hide')
  highScoreInput.classList.add('d-flex')
  questionEl.innerText = "Add your high score!"
  if (!nextButton.classList.contains('hide')) {
    nextButton.classList.add('hide');
  }
}

function disableAnswerButtons () {
  var answerButtons = document.querySelectorAll('.list-group-item', '.list-group-item-action');
  answerButtons.forEach(button => {
    button.disabled = true;
  });
}

function resetAlerts (correctAlert, incorrectAlert) {
  var answerButtons = document.querySelectorAll('.list-group-item', '.list-group-item-action');
  answerButtons.forEach(button => {
    button.disabled = false;
  });
  if (!correctAlert.classList.contains('hide')) {
    correctAlert.classList.add('hide');
  } else if (!incorrectAlert.classList.contains('hide')) {
    incorrectAlert.classList.add('hide');
  } else {};
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
  },

  {
    question: 'How do you create a function in JavaScript?',
    answers: [
      {text: 'function = myFunction()', correct: false},
      {text: 'function: myFuction()', correct: false},
      {text: 'function === myFunction()', correct: false},
      {text: 'function myFunction()', correct: true}
    ]
  },

  {
    question: 'How do you call a function named "myFunction"?',
    answers: [
      {text: 'call myFunction()', correct: false},
      {text: 'myFuction()', correct: true},
      {text: 'open myFunction()', correct: false},
      {text: 'run function myFunction()', correct: false}
    ]
  },

  {
    question: 'How to write an IF statement in JavaScript?',
    answers: [
      {text: 'if i is 5 then', correct: false},
      {text: 'if i = 5', correct: false},
      {text: 'if (i === 5)', correct: true},
      {text: 'if i == 5 then', correct: false}
    ]
  },

  {
    question: 'How can you add a comment in a JavaScript?',
    answers: [
      {text: '"this is a comment', correct: false},
      {text: '//this is a comment', correct: true},
      {text: '"this is a comment"', correct: false},
      {text: '<!--this is a comment-->', correct: false}
    ]
  }
]





function refreshPage() {
  location.reload();
}