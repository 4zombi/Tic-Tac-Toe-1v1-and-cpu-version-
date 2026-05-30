let playerO = "O";
let playerX = "X";
let currPlayer = playerO;

let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameCells;  

let winningConditions = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6]            
];

let restartGameButton;
let gameOver = false;

window.onload = function() {
    gameCells = document.getElementsByClassName("game-cell");
    for (let cell of gameCells) {
        cell.addEventListener("click", placeCell);
    }
    restartGameButton = this.document.getElementById("game-restart-button");
    restartGameButton.addEventListener("click", restartGame);
}

function placeCell() {
     //////////prevent if its cpus turn tr game overe
    if (gameOver || currPlayer === playerX) {
        return;
    }

    const index = parseInt(this.getAttribute("data-cell-index"));
    if (gameBoard[index] !== "") {
        return;
    }

    ////// my move betchh
    makeMove(index);

   ////////////if the game isnt over cpu delAYS
    if (!gameOver) {
        setTimeout(cpuTurn, 500); ////////  ждет 500 милисекундд прежде чеми делать новый ход, это ващще гениально 
    }
}

/////////// тут базовая логика и дл чела и компа, прям элементарная 
function makeMove(index) {
    gameBoard[index] = currPlayer; 
    gameCells[index].innerText = currPlayer;   

    checkWinner();

    if (!gameOver) {
        currPlayer = (currPlayer == playerO) ? playerX : playerO;
    }
}

///////// логика компа дела ь ход  спот
function cpuTurn() {
    if (gameOver) return;

    // пуст,,, ящикики
    let availableCells = [];
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === "") {
            availableCells.push(i);
        }
    }

    //  если есть пусто й ящик то выбираем рндомно
    if (availableCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const cpuMoveIndex = availableCells[randomIndex];
        
        // очередь компа
        makeMove(cpuMoveIndex);
    }
}

function checkWinner() {
    for (let winCondition of winningConditions) {
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];

        if (a == b && b == c && a != "") {
            for (let i = 0; i < gameBoard.length; i++) {
                if (winCondition.includes(i)) {
                    gameCells[i].classList.add("winning-game-cell");
                }
            }
            gameOver = true;   ////////////жожож утылмаймыз
            return;
        }
    }

    ///////// если драу болса автоматом геймовер? тут надо с алертом поработать ну уведки и тд
    if (!gameBoard.includes("")) {
        gameOver = true;
    }
}

function restartGame() {
    gameOver = false;
    currPlayer = playerO; //рест бэк
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    for (let cell of gameCells) {
        cell.innerText = "";
        cell.classList.remove("winning-game-cell");
    }
}