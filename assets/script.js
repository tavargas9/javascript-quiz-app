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
var initialsInput = document.querySelector('#initals')
var highscoresList = document.querySelector('#highscores-list')
var clearHighscoresBtn = document.querySelector('#clear-btn')
var restartBtn = document.querySelector('#restart-btn')
var viewHighscoresBtn = document.querySelector('#view-highscores-btn');

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
  resetAlerts(correctAlert, incorrectAlert);
  clearPreviousAnswers();
  currentQuestionIndex++;
  setNextQuetion();
})

let shuffledQuestions, currentQuestionIndex

function startQuiz() {
  clearPreviousAnswers();
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  answersContainerEl.classList.add('d-grid');
  answersContainerEl.classList.remove('hide');
  restartQuizButton.classList.remove('hide');
  progressBarContainer.classList.remove('hide');
  viewHighscoresBtn.classList.add('hide');
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
  if (!nextButton.classList.contains('hide')) {
    nextButton.classList.add('hide');
  };
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
    incrementScore();
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

let score = 0;
localStorage.setItem('quizScore', score.toString());

function incrementScore() {
  score += 1;
  localStorage.setItem('quizScore', score.toString());
};

function displayFinalScore() {
  var storedScore = localStorage.getItem('quizScore');
  if (storedScore !== null) {
    var finalScoreNumber = parseInt(storedScore, 10);
    finalScore.innerText = "Your score is: " + finalScoreNumber + " out of 5";
  };
};

function startHighScoreInput() {
  answersContainerEl.classList.remove('d-grid')
  answersContainerEl.classList.add('hide')
  finalScore.classList.remove('hide')
  displayFinalScore();
  resetAlerts(correctAlert, incorrectAlert);
  highScoreInput.classList.remove('hide')
  highScoreInput.classList.add('d-flex')
  questionEl.innerText = "Add your high score!"
  if (!nextButton.classList.contains('hide')) {
    nextButton.classList.add('hide');
  }
  progressBarContainer.classList.add('hide');
  highscoresList.classList.remove('hide');
  updateHighscores();
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

var highScoreInput = document.querySelector('#highscore-input')
var initialsInput = document.getElementById('initials')
var highscoresList = document.querySelector('#highscores-list')
let highscores = JSON.parse(localStorage.getItem('highscores')) || [];

function updateHighscores() {
  highscoresList.innerHTML = '';

  highscores.sort((a, b) => b.score - a.score);

  highscores.forEach((entry, index) => {
    var listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${entry.initials}: ${entry.score}`;
    highscoresList.appendChild(listItem);
  });
}

highScoreInput.addEventListener('submit', function (event) {
  event.preventDefault();

  var initials = initialsInput.value;
  var score = localStorage.getItem('quizScore');

  highscores.push({ initials, score });

  localStorage.setItem('highscores', JSON.stringify(highscores));
  initialsInput.value = '';
  updateHighscores();
  highScoreInput.classList.remove('d-flex');
  highScoreInput.classList.add('hide');
  clearHighscoresBtn.classList.remove('hide');
  restartBtn.classList.remove('hide');
  finalScore.classList.add('hide');
  questionEl.innerText = 'Highscores:'
});

function clearHighScores () {
  highscores = [];
  localStorage.removeItem('highscores');
  localStorage.removeItem('quizScore');
  highscoresList.innerHTML = '';
  clearHighscoresBtn.classList.add('hide');
  questionEl.innerText = 'Try again?'
}

clearHighscoresBtn.addEventListener('click', clearHighScores);

function viewHighscores() {
  questionEl.innerText = 'Highscores:';
  updateHighscores();
  viewHighscoresBtn.classList.add('hide');
  if (!finalScore.classList.contains('hide')) {
    finalScore.classList.add('hide');
  };

  if (clearHighscoresBtn.classList.contains('hide')){
    clearHighscoresBtn.classList.remove('hide');
  };

  if (highscoresList.classList.contains('hide')) {
    highscoresList.classList.remove('hide');
  };

  if (!nextButton.classList.contains('hide')) {
    nextButton.classList.add('hide');
  };

  if (!startButton.classList.contains('hide')) {
    startButton.classList.add('hide');
  };

  if (!answerButtonsEl.classList.contains('hide')) {
    answerButtonsEl.classList.add('hide');
  };

  if (restartBtn.classList.contains('hide')) {
    restartBtn.classList.remove('hide');
  };
}

viewHighscoresBtn.addEventListener('click', viewHighscores);


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