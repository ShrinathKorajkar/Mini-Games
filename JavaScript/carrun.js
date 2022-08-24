let position = 1,
    currenttop = 65,
    carPosLeft = 1,
    score = 0;
let car = document.querySelector('.car');
let enemyCars = document.getElementsByClassName('enemy-car');
let carhighscore = localStorage.getItem('highscore');
if (carhighscore == null) {
    localStorage.setItem('highscore', 0);
}
document.getElementById('highscore').innerText = `HIGH SCORE : ${carhighscore}`;

let playbtn = document.getElementById('play');
playbtn.addEventListener('click', () => {
    form.submit();
});

addEventListener('keyup', updatePosition);

function updatePosition(e) {
    switch (e.key.toLocaleLowerCase()) {
        case 'arrowup':
            if (currenttop > 5) {
                car.style.top = currenttop - 5 + 'vh';
                currenttop -= 5;
            }
            break;
        case 'arrowdown':
            if (currenttop < 85) {
                car.style.top = currenttop + 5 + 'vh';
                currenttop += 5;
            }
            break;
        case 'arrowleft':
            if (position === 2) {
                car.style.left = '46.2vw';
                carPosLeft = 1;
                position--;
            } else if (position === 1) {
                car.style.left = '35.2vw';
                carPosLeft = 0;
                position--;
            }
            break;
        case 'arrowright':
            if (position === 0) {
                car.style.left = '46.2vw';
                carPosLeft = 1;
                position++;
            } else if (position === 1) {
                car.style.left = '57.2vw';
                carPosLeft = 3;
                position++;
            }
            break;
    }
}

function stopGame() {
    Array.from(enemyCars).forEach(enemy => {
        enemy.style.animationPlayState = 'paused';
    })
    clearInterval(timer);
    clearInterval(scoretimer);
    if (score > carhighscore) {
        document.getElementById('highscore').innerText = `HIGH SCORE : ${score}`;
        localStorage.setItem('highscore', score);
        document.querySelector('#congrats').style.visibility = 'visible';
    }
    window.removeEventListener('keyup', updatePosition);
    gameover();
}

function gameover() {
    document.querySelector('.gameOver').style.visibility = 'visible';
    document.querySelector('.startstop').style.zIndex = 1;
    playbtn.innerText = 'START AGAIN';
}

let timer = setInterval(() => {
    let carPosTop = parseFloat(window.getComputedStyle(car).getPropertyValue('top'));
    Array.from(enemyCars).forEach((enemy, pos) => {
        let enemyPosTop = parseFloat(window.getComputedStyle(enemy).getPropertyValue('top'));
        if (pos == carPosLeft || (pos == 2 && carPosLeft == 1)) {
            let backdisp = 75;
            let frontdisp = 85;
            if (pos == 2) {
                backdisp = -10;
                frontdisp = 165;
            }
            if (enemyPosTop > carPosTop - frontdisp && enemyPosTop < carPosTop + backdisp) {
                stopGame();
            }
        }
    })
}, 100);

let scoretimer = setInterval(() => {
    score++;
    document.getElementById('currentscore').innerText = `YOUR SCORE : ${score}`;
}, 2000);