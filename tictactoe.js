let playerO = "O";
let playerX = "X";
let currPlayer = playerO;

/////////        0   1   2   3   4   5   6   7   8
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
    if (gameOver) {
        return;
    }

    const index = parseInt(this.getAttribute("data-cell-index"));
    if (gameBoard[index] !== "") {
        return;
    }

    gameBoard[index] = currPlayer; 
    this.innerText = currPlayer;     


    currPlayer = (currPlayer == playerO) ? playerX : playerO;

    checkWinner();
}

function checkWinner() {
    for (let winCondition of winningConditions) {
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];

        if (a == b && b == c && a != "") {
    /////////////////cells updateew
            for (let i = 0; i < gameBoard.length; i++) {
                if (winCondition.includes(i)) {
                    gameCells[i].classList.add("winning-game-cell");
                }
            }
            gameOver = true;
            return;
        }
    }
}

function restartGame() {
    gameOver = false;
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    for (let cell of gameCells) {
        cell.innerText = "";
        cell.classList.remove("winning-game-cell");
    }
}    