
//store questions in array
const myQuestions = [
    {
        question: 'What does HTML stand for?',
        answers: {
            0: 'Hyper Text Markup Language',
            1: 'Hyper Text Makeup Language',
            2: 'Home Tool Markup Language',
            3: 'Hungry Tummies Mark Lunch'
        },
        correctAnswer: 0
    },
    {
        question: 'What is the correct tag for the largest HTML tag?',
        answers: {
            0: '<heading>',
            1: '<head>',
            2: '<h1>',
            3: '<h6>'
        },
        correctAnswer: 2
    },
    {
        question: 'Which is the correct CSS syntax?',
        answers: {
            0: '{body;color:black;}',
            1: 'body:color=black',
            2: 'body{color:black}',
            3: '{body:color=black;}'
        },
        correctAnswer: 2
    },
    {
        question: 'Which CSS property controls the text size?',
        answers: {
            0: 'text-size',
            1: 'font-style',
            2: 'text-style',
            3: 'font-size'
        },
        correctAnswer: 3
    },
    {
        question: 'Where is the correct place to insert JavaScript?',
        answers: {
            0: 'The <body> section',
            1: 'The <head> section',
            2: 'Both the <body> and <head> sections',
            3: 'The <footer> section'
        },
        correctAnswer: 0
    },

    {
        question: 'How do you write "Hello World" in and alert box?',
        answers: {
            0: 'msgBox("Hello World");',
            1: 'alert("Hello World");',
            2: 'alertBox("Hello World");',
            3: 'msg("Hello World");'
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
const main = document.querySelector('main');
const highScoresBtn = document.querySelector('.high-score');
const timeLeft = document.querySelector('#time-left');
const questionContainer = document.querySelector('.question-container');

// global variables
let currentQuestion = 0;
let currentScore = 0;
let highScores = [];
let time = 60;
let clock;

const loadScores = () => {
    highScores = localStorage.getItem('scores');
    if (!highScores) {
        highScores = [];
    } else {
        highScores = JSON.parse(highScores);
    }
}

//start the quiz
const startQuiz = () => {
    intro.style.display = 'none';
    questionBlock.style.display = 'block'
    //start timer
    clock = setInterval(timer, 1000);
    //get questions
    getQuestion();
}

//runs through array of questions
const getQuestion = () => {
    if (currentQuestion >= myQuestions.length) {
        endGame();
        return false;
    }
    index = currentQuestion;
    //add question
    questionTitle.textContent = myQuestions[index].question;

    //add answers
    for (i = 0; i < 4; i++) {
        let answerItem = document.createElement('li');
        answerItem.className = 'answer';
        answerItem.textContent = myQuestions[index].answers[i];
        answerItem.setAttribute('data-answer-index', i,);
        answerItem.setAttribute('data-question-index', index);
        answerOptions.appendChild(answerItem);
    }
    currentQuestion++;
    //listen for answer click
    answerOptions.addEventListener('click', checkAnswer);
}

//check if selected answer is correct
const checkAnswer = (event) => {
    let userAnswer = event.target.getAttribute('data-answer-index');
    let questionIndex = event.target.getAttribute('data-question-index');
    let correctAnswer = myQuestions[questionIndex].correctAnswer;

    userAnswer = parseInt(userAnswer);
    if (userAnswer === correctAnswer) {
        currentScore++;
        showResult(true);
    } else {
        showResult(false);
        if (time >= 5) {
            time -= 5;
        }
        else {
            time = 0;
        }
    }
}

// show result of previous answer
const showResult = (answer) => {
    resultContainer.style.display = 'block';
    if (answer) {
        resultContainer.textContent = 'Correct';
    } else {
        resultContainer.textContent = 'Wrong';

    }
    clearListItems();
    getQuestion();
}

//remove previous answers
const clearListItems = () => {
    answerOptions.innerHTML = ''
}

//when all questions have been answered or timer reaches 0. end the game and stop the clock
const endGame = () => {
    clearInterval(clock);

    questionContainer.style.display = 'none';
    let endGameContainer = document.createElement('div');

    let gameOver = document.createElement('h2');
    gameOver.textContent = 'Game Over';
    endGameContainer.appendChild(gameOver);

    let yourScore = document.createElement('h3');
    yourScore.textContent = `Your Score: ${currentScore}`;
    endGameContainer.appendChild(yourScore);

    const initialsForm = document.createElement('form');

    let initialsLabel = document.createElement('label');
    initialsLabel.className = 'form-label';
    initialsLabel.setAttribute('for', 'initials');
    initialsLabel.textContent = 'Enter Initials: ';
    initialsForm.appendChild(initialsLabel);

    let initialsInput = document.createElement('input');
    initialsInput.setAttribute('type', 'text');
    initialsInput.setAttribute('id', 'initials');
    initialsInput.setAttribute('name', 'initials');
    initialsForm.appendChild(initialsInput);

    let initialsSubmit = document.createElement('button');
    initialsSubmit.className = 'btn';
    initialsSubmit.setAttribute('id', 'submit');
    initialsSubmit.setAttribute('type', 'submit');
    initialsSubmit.textContent = 'Submit';
    initialsForm.appendChild(initialsSubmit);

    endGameContainer.appendChild(initialsForm);


    questionBlock.appendChild(endGameContainer);

    //listen for submit of initials and save to highScores array
    initialsSubmit.addEventListener('click', function () {
        event.preventDefault();
        initialsValue = initialsInput.value;
        initialsValue = initialsValue.toUpperCase();
        if (!validateInitials(initialsValue)) {
            alert('Enter two letter initials');
            initialsForm.reset();
            return false;
        }
        highScores.push({ name: initialsValue, score: currentScore });
        saveScores();
        viewHighScores();
    });
}

//validate initials input to 2 characters
const validateInitials = (string) => {
    let stringArr = string.split('');
    if (stringArr.length !== 2) {
        return false
    } else {
        return true;
    }
}

//save scores to local
const saveScores = () => {
    localStorage.setItem('scores', JSON.stringify(highScores));
}

//generate high scores list
const viewHighScores = () => {
    main.innerHTML = '';
    clearInterval(clock);
    timeLeft.textContent = '';

    let scoresTitle = document.createElement('h2');
    scoresTitle.textContent = 'High Scores';
    main.appendChild(scoresTitle);

    highScores.sort(compare);

    //list scores
    for (i = highScores.length - 1; i >= 0; i--) {
        let score = document.createElement('h4');
        score.innerText = `${highScores[i].name}: ${highScores[i].score}`;
        main.appendChild(score);
    }

    //start quiz button
    let startOver = document.createElement('button');
    startOver.className = 'btn';
    startOver.textContent = 'Take Quiz';
    startOver.setAttribute('id', 'start-over');
    main.appendChild(startOver);

    //reload page to start quiz
    startOver.addEventListener('click', function () {
        location.reload();
    });
}

//sort high scores by score value
const compare = (a, b) => {
    return a.score - b.score;
}

//set quiz timer
const timer = () => {
    if (time <= 10) {
        timeLeft.style.color = 'red';
    }
    if (time <= 0) {
        clearInterval(clock);
        endGame();
    } else {
        time--;
    }
    timeLeft.textContent = time;
}

//load previous scores if any
loadScores();
//start the quiz listener
startBtn.addEventListener('click', startQuiz);
//see high scores listener
highScoresBtn.addEventListener('click', viewHighScores);

