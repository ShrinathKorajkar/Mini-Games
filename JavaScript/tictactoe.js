
let turn = "X";
let squares = document.querySelectorAll('.square');
let player = document.getElementsByClassName('player');
let reset = document.getElementById('reset');
let img = document.querySelector('img');
let winline = document.querySelector('.winline');
let somewin = false;

function checkWin(){
    const win = [
        [0, 1, 2, -4.5, -4.5, 90],
        [3, 4, 5, -4.5, 2, 90],
        [6, 7, 8, -4.5, 8, 90],
        [0, 3, 6, -11, 2, 0],
        [1, 4, 7, -5, 2, 0],
        [2, 5, 8, 1.5, 2, 0],
        [0, 4, 8, -4.5, 2, 135],
        [2, 4, 6, -5, 2, 45] 
    ];

    for(let e of win){
        if(squares[e[0]].innerText == squares[e[1]].innerText && squares[e[2]].innerText == squares[e[1]].innerText && squares[e[2]].innerText != ''){
            player[0].innerText = `Player ${turn === "X" ? "O" : "X"} Won`;
            player[0].style.color = 'red';
            img.style.width = '7.5rem';
            winline.style.height = '15rem';
            winline.style.transform = `translateX(${e[3]}rem) translateY(${e[4]}rem) rotate(${e[5]}deg)`;
            somewin = true;
            return;
        }
    }
}

Array.from(squares).forEach(element => {
    element.addEventListener('click',() => {
        if(element.innerText === '') {
            element.innerText = turn;         
            turn = turn === "X" ? "O" : "X";
            if(!somewin){
                player[0].innerText = `Player ${turn} turn`;
                checkWin();
            }
        }
    });
})

reset.addEventListener('click',() => {
    Array.from(squares).forEach(element =>{
        element.innerText = '';
    })
    turn = "X";
    player[0].innerText = `Player X turn`;
    player[0].style.color = 'green';
    img.style.width = '0';
    winline.style.height = '0';
    somewin = false;
});