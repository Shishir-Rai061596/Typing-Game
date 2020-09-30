const SETTINGSBUTTON = document.querySelector('#settings-btn');
const SETTING = document.querySelector('#settings');
const WORD = document.querySelector('#word');
const INPUT = document.querySelector('#text');
const TIME = document.querySelector('#time');
const SCORE = document.querySelector('#score');
const ENDGAME = document.querySelector('#end-game-container');
const FORM = document.querySelector('#settings-from');
const DIFFICULTY = document.querySelector('#difficulty')

INPUT.focus();

const words = ['sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'];

let difficulty;
if (localStorage.getItem("difficulty") === null) {
    difficulty = "medium";
} else {
    difficulty = localStorage.getItem("difficulty")
}
DIFFICULTY.value = difficulty;

let score = 0;

let time = 10;

const getRandomWord = () => words[Math.floor(Math.random() * words.length)]

const addWordToDOM = () => {
    WORD.innerText = getRandomWord();
}
addWordToDOM();

const gameOver = () => {
    ENDGAME.innerHTML = `
    <h2>Time ran out</h2>
    <p>Your final score is:${score}</p>
    <button onclick="window.location.reload()">Play Again</button>`
    ENDGAME.style.display = 'flex';
}

const updateScore = () => {
    score++;
    SCORE.innerHTML = score;
    switch (difficulty) {
        case "easy":
            time += 5;
            break;
        case "medium":
            time += 3;
            break;
        default:
            time += 1;
    }
}

const updateTime = () => {
    time--;
    TIME.innerText = `${time}s`;
    if (time < 1) {
        clearInterval(timeInterval)
        gameOver();
    } else {

    }
}

const timeInterval = setInterval(updateTime, 1000)

const handleUserInput = e => {
    const text = e.target.value;
    const word = WORD.innerText;
    if (text === word) {
        addWordToDOM();
        INPUT.value = '';
        updateScore();

    }
}
handleLevelChange = (e) => {
    difficulty = e.target.value;
    localStorage.setItem("difficulty", difficulty)
}



INPUT.addEventListener('input', handleUserInput)
SETTINGSBUTTON.addEventListener('click', () => SETTING.classList.toggle('hide'));
SETTING.addEventListener('change', handleLevelChange)