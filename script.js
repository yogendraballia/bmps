let score = 0;
let timeLeft = 70;
let timer;
let currentQuestion;

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('show');
}

// Generates a random math question
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let question;
    let answer;

    switch (operator) {
        case '+':
            question = `${num1} + ${num2}`;
            answer = num1 + num2;
            break;
        case '-':
            question = `${num1} - ${num2}`;
            answer = num1 - num2;
            break;
        case '*':
            question = `${num1} * ${num2}`;
            answer = num1 * num2;
            break;
        case '/':
            question = `${num1 * num2} / ${num2}`; // Ensure division without remainder
            answer = num1;
            break;
    }

    currentQuestion = { question, answer };
    document.getElementById('question').innerText = `What is ${question}?`;
}

// Checks the answer and updates the score
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    const feedback = document.getElementById('feedback');

    if (userAnswer === currentQuestion.answer) {
        score++;
        feedback.innerText = 'Correct!';
    } else {
        feedback.innerText = 'Try again!';
    }

    document.getElementById('score').innerText = score;
    document.getElementById('answer').value = '';
    generateQuestion();
}

// Starts the game
function startGame() {
    score = 0;
    timeLeft = 70;
    document.getElementById('score').innerText = score;
    document.getElementById('timeLeft').innerText = timeLeft;
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('feedback').innerText = '';
    generateQuestion();

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timeLeft').innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById('feedback').innerText = `Time's up! Your final score is ${score}.`;
            document.getElementById('quiz').style.display = 'none';
        }
    }, 1000);
}



// Event listeners
document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('submitAnswer').addEventListener('click', checkAnswer);
document.getElementById('answer').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkAnswer();
});


