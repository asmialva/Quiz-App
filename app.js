const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "What is the capital city of France?",
        answers: [
            {text: "London", correct: false},
            {text: "Paris", correct: true},
            {text: "Rome", correct: false},
            {text: "Madrid", correct: false},
        ]
    },
    {
        question: "Which planet is known as the 'Red Planet' ?",
        answers: [
            {text: "Jupiter", correct: false},
            {text: "Venus", correct: false},
            {text: "Mars", correct: true},
            {text: "Mercury", correct: false},
        ]
    },
    {
        question: "Who painted the famous artwork 'Mona Lisa'?",
        answers: [
            {text: "Vincent van Gogh", correct: false},
            {text: " Leonardo da Vinci", correct: true},
            {text: "Pablo Picasso", correct: false},
            {text: "Michelangelo", correct: false},
        ]
    },
    {
        question: "What is the tallest mountain in the world?",
        answers: [
            {text: " Mount Everest", correct: true},
            {text: " Mount Kilimanjaro", correct: false},
            {text: "Mount Fuji", correct: false},
            {text: "Mount McKinley", correct: false},
        ]
    }
];

const qs = document.getElementById("question");
const ans = document.getElementById("answer-button");
const nxtButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nxtButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    qs.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ans.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nxtButton.style.display = "none";
    while(ans.firstChild){
        ans.removeChild(ans.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(ans.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nxtButton.style.display = "block";
}

function showScore(){
    resetState();
    qs.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nxtButton.innerHTML = "Play Again";
    nxtButton.style.display = "block";

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nxtButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();


