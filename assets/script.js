
//store questions in array
const myQuestions = [
    {
        question: 'this is a question0',
        answers: {
            0: 'answer1',
            1: 'answer2',
            2: 'answer3',
            3: 'answer4'
        },
        correctAnswer: 0
    },
    {
        question: 'this is a question1',
        answers: {
            0: 'answer1',
            1: 'answer2',
            2: 'answer3',
            3: 'answer4'
        },
        correctAnswer: 1
    }
]

//document selectors
const intro = document.querySelector('.intro');
const questionBlock = document.querySelector('#question-block');
const startBtn = document.querySelector('#startBtn');
const questionTitle = document.querySelector('.question');
const answerOptions = document.querySelector('.answer-options');
const resultContainer = document.querySelector('.result');

let questionContainer = document.querySelector('#question-container');
let currentQuestion = 0;

//generate question from array
const startQuiz = () => {
    intro.style.display = 'none';
    questionBlock.style.display = 'block'
    //pass index of question
   getQuestion();
}

const getQuestion = () =>{
    if(currentQuestion>=myQuestions.length){
        endGame();
        return false;
    }
    index = currentQuestion;
   //add question
   questionTitle.textContent = myQuestions[index].question;

   //add answers
    for(i=0;i<4;i++){
        let answerItem = document.createElement('li');
        answerItem.className = 'answer';
        answerItem.textContent = myQuestions[index].answers[i];
        answerItem.setAttribute('data-answer-index',i,);
        answerItem.setAttribute('data-question-index',index);
        answerOptions.appendChild(answerItem);
    }
   currentQuestion++;
    //listen for answer click
    answerOptions.addEventListener('click',checkAnswer);
}

const checkAnswer = (event) => {
    let userAnswer = event.target.getAttribute('data-answer-index');
    let questionIndex = event.target.getAttribute('data-question-index');
    let correctAnswer = myQuestions[questionIndex].correctAnswer;
    
   userAnswer = parseInt(userAnswer);
    if(userAnswer === correctAnswer){
        showResult(true);
    } else {
        showResult(false);
    }
    
}

// after answer is made
const showResult = (answer) => {
    if(answer){
        resultContainer.textContent = 'Correct';
    } else {
        resultContainer.textContent = 'Wrong';
    }
    clearListItems();
    getQuestion();
}

const clearListItems = () => {
  answerOptions.innerHTML = ''

}

const endGame = () => {
    questionBlock.style.display = 'none';
    alert('game over');
    //show score

}

//show first question when start button is clicked
startBtn.addEventListener('click',startQuiz);

