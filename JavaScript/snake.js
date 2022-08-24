let gameContainer = document.querySelector(".gameContainer");
let speed = 4;
let nextframe = 0;
let nextXPos = 0;
let nextYPos = 0;
let myScore = 0;
const eatMusic = new Audio("./Assets/music/eatMusic.mp3");
const gameOver = new Audio("./Assets/music/gameOver.mp3");
let myHighScore = localStorage.getItem("snakeHighScore");
if (myHighScore == null) {
    localStorage.setItem("snakeHighScore", 0);
    myHighScore = 0;
}
let snakePos = [
    { x: 9, y: 17 },
    { x: 8, y: 17 },
];
let foodPos = { x: 17, y: 8, };

function keyPressed(e) {
    switch (e.key) {
        case "ArrowDown":
            nextXPos = 0;
            nextYPos = 1;
            break;

        case "ArrowUp":
            nextXPos = 0;
            nextYPos = -1;
            break;

        case "ArrowRight":
            nextXPos = 1;
            nextYPos = 0;
            break;

        case "ArrowLeft":
            nextXPos = -1;
            nextYPos = 0;
            break;

        default:
            break;
    }
}

function displaySnakeAndFood() {
    gameContainer.innerHTML = "";
    snakePos.forEach((position, index) => {
        let snakeBody = document.createElement("div");
        if (index === 0) {
            snakeBody.classList.add("snakehead");
        } else {
            snakeBody.classList.add("snakebody");
        }
        snakeBody.style.gridRowStart = `${position.y}`;
        snakeBody.style.gridRowEnd = `${position.y} + 1`;
        snakeBody.style.gridColumnStart = `${position.x}`;
        snakeBody.style.gridColumnEnd = `${position.x} + 1`;
        gameContainer.appendChild(snakeBody);
    });
    let foodPlace = document.createElement("div");
    foodPlace.classList.add("food");
    foodPlace.style.gridRowStart = `${foodPos.y}`;
    foodPlace.style.gridRowEnd = `${foodPos.y} + 1`;
    foodPlace.style.gridColumnStart = `${foodPos.x}`;
    foodPlace.style.gridColumnEnd = `${foodPos.x} + 1`;
    gameContainer.appendChild(foodPlace);
}

function increaseSnake() {
    let newhead = {
        x: snakePos[0].x + nextXPos,
        y: snakePos[0].y + nextYPos,
    };
    snakePos.unshift(newhead);
    foodPos.x = 2 + Math.round((23 - 2) * Math.random());
    foodPos.y = 2 + Math.round((23 - 2) * Math.random());
}

function moveSnake() {
    for (let i = snakePos.length - 1; i > 0; i--) {
        snakePos[i].x = snakePos[i - 1].x;
        snakePos[i].y = snakePos[i - 1].y;
    }
    snakePos[0].x = snakePos[0].x + nextXPos;
    snakePos[0].y = snakePos[0].y + nextYPos;
}

function checkGameOver() {
    for (let i = 1; i < snakePos.length; i++) {
        if (snakePos[0].x == snakePos[i].x && snakePos[0].y == snakePos[i].y) {
            return true;
        }
    }
    if (
        snakePos[0].x > 25 ||
        snakePos[0].x < 0 ||
        snakePos[0].y > 25 ||
        snakePos[0].y < 0
    ) {
        return true;
    }
    return false;
}

function main(ctime) {
    window.requestAnimationFrame(main)
    if ((ctime - nextframe) / 1000 < 1 / speed) return;
    nextframe = ctime;
    if (checkGameOver()) {
        gameOver.play();
        if (myScore > myHighScore) {
            myHighScore = myScore;
            highScore.innerText = `HIGH SCORE : ${myHighScore}`;
            localStorage.setItem('snakeHighScore', myHighScore);
        }
        removeEventListener("keydown", keyPressed);
        alert("GAME OVER !!! \nPress Any Key To Restart ?");
        addEventListener("keydown", keyPressed);
        nextframe = 0;
        nextXPos = 0;
        nextYPos = 0;
        myScore = 0;
        snakePos = [
            { x: 9, y: 17 },
            { x: 8, y: 17 },
        ];
        foodPos = { x: 17, y: 8 };
        Score.innerText = `SCORE : ${myScore}`;
    }
    displaySnakeAndFood();
    if (nextXPos != nextYPos) {
        moveSnake();
    }
    if (snakePos[0].x == foodPos.x && snakePos[0].y == foodPos.y) {
        myScore += 5;
        eatMusic.play();
        increaseSnake();
        Score.innerText = `SCORE : ${myScore}`;
    }
}

addEventListener("keydown", keyPressed);
highScore.innerText = `HIGH SCORE : ${myHighScore}`;
Score.innerText = `SCORE : ${myScore}`;
window.requestAnimationFrame(main);
