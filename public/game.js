const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const spinner = document.getElementsByClassName('spinner')[0];
const game = document.getElementById('game');


let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let link="";
var category = localStorage.getItem('category');
const difficulty = localStorage.getItem('type');
//console.log(typeof category);
if(category==="any"){  
    link= "https://opentdb.com/api.php?amount=20&type=multiple";
}
else{
link = "https://opentdb.com/api.php?amount=20&category="+category+"&difficulty="+difficulty+"&type=multiple";}
// // https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple
//console.log(link);
fetch(link).then((res) => {
    return res.json();
})
.then((loadedQuestions) => {
    questions = loadedQuestions.results.map((loadedQuestion) => {
        const formattedQuestion = {
            question: loadedQuestion.question,
        };

        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
        answerChoices.splice(
            formattedQuestion.answer - 1,
            0,
            loadedQuestion.correct_answer
        );

        answerChoices.forEach((choice, index) => {
            formattedQuestion['choice' + (index + 1)] = choice;
        });

        return formattedQuestion;
    });
    spinner.setAttribute("style","display: none;");
    game.removeAttribute('style');
    
    startGame();
})
.catch((err) => {
    console.error(err);
});
// let questions = [
//     {
//         question: '',
//         choice1: '',
//         choice2: '',
//         choice3: '',
//         choice4: '',
//         answer: 1,
//     },
// ];

const BONUS = 10;
const neg= -2;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('recentScore',score);
        return window.location.assign('/end.html');
    }
    //updating question counter text
    questionCounter++;
    questionCounterText.innerHTML = `<h2>${questionCounter}/${MAX_QUESTIONS}</h2>`;

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        if(classToApply==="correct")
            updateScore(BONUS);
        else
            updateScore(neg);
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000);
    });
});

updateScore = (num) => {
    score += num;
    scoreText.innerHTML = `<h2>${score}</h2>`;
}
//startGame();
