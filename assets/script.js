var startButton = document.querySelector("#start-btn")
var answersContainerEl = document.querySelector('#answer-buttons')
var questionEl = document.querySelector('#question')
var answerButtonsEl = document.querySelector('#answer-buttons')

startButton.addEventListener('click', startQuiz)

let shuffledQuestions, currentQuestionIndex

function startQuiz() {
  console.log("started");
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  answersContainerEl.classList.add('d-grid');
  answersContainerEl.classList.remove('hide');
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

function selectAnswer() {

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
