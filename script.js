const playerCreator = (choice) => {
    return {choice}
}
let Player1;
let Player2;
let gameBoard = new Array(9);
let initialPhase = document.querySelector(".initial-phase");
let gamePhase = document.querySelector('.game-phase');
let container = document.querySelector('.container');
let currentPlayer = "p1";
let cells;
let winnerBanner = document.querySelector('.winner');
let over = false;
function choiceSelector(id) {
    Player1 = playerCreator(id);
    Player2 = Player1.choice == "x" ? playerCreator("o") : playerCreator("x");
    gameBoardCreator()
}
function gameBoardCreator() {
    initialPhase.style.display = "none";
    gamePhase.style.display = "block";
    for(i = 0; i < gameBoard.length; i++) {
        let cell = document.createElement("div");
        cell.setAttribute('class','cell');
        cell.setAttribute('id',i);
        container.appendChild(cell);
    }
    cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('click', () => play(cell.id)))
}
function currentPlayerSwitcher() {
    currentPlayer = currentPlayer == "p1" ? "p2" : "p1";
}
function play(id) {
    let clickedCell = document.getElementById(id);
    if(clickedCell.innerHTML == '' && !over) {
        if(currentPlayer == "p1") {
            clickedCell.innerHTML = Player1.choice;
            gameBoard[id] = Player1.choice;
        } else {
            clickedCell.innerHTML = Player2.choice;
            gameBoard[id] = Player2.choice;
        }
        Winner()
        if(winnerBanner.innerHTML == '') {
            currentPlayerSwitcher()
        }
    }
}
function Winner() {
    if(
        (gameBoard[0] == gameBoard[1] && gameBoard[0] == gameBoard[2] && (gameBoard[0] == "x" || gameBoard[0] == "o")) ||
        (gameBoard[3] == gameBoard[4] && gameBoard[3] == gameBoard[5] && (gameBoard[5] == "x" || gameBoard[5] == "o")) ||
        (gameBoard[6] == gameBoard[7] && gameBoard[6] == gameBoard[8] && (gameBoard[8] == "x" || gameBoard[8] == "o")) ||
        (gameBoard[0] == gameBoard[3] && gameBoard[0] == gameBoard[6] && (gameBoard[6] == "x" || gameBoard[6] == "o")) ||
        (gameBoard[1] == gameBoard[4] && gameBoard[1] == gameBoard[7] && (gameBoard[7] == "x" || gameBoard[7] == "o")) ||
        (gameBoard[2] == gameBoard[5] && gameBoard[2] == gameBoard[8] && (gameBoard[8] == "x" || gameBoard[8] == "o")) ||
        (gameBoard[0] == gameBoard[4] && gameBoard[0] == gameBoard[8] && (gameBoard[8] == "x" || gameBoard[8] == "o")) ||
        (gameBoard[2] == gameBoard[4] && gameBoard[2] == gameBoard[6] && (gameBoard[6] == "x" || gameBoard[6] == "o"))) {
        if(currentPlayer == "p1") {
            winnerBanner.innerHTML = "Player 1 wins 🎉 🥳";
            over = true;
        } else {
            winnerBanner.innerHTML = "Player 2 wins 🎉 🥳";
            over = true;
        }
    }
}
function Replay() {
    container.innerHTML = "";
    currentPlayer = "p1";
    winnerBanner.innerHTML = "";
    gameBoard = new Array(9);
    over = false;
    gamePhase.style.display = "none";
    initialPhase.style.display = "block";
}
let choices = document.querySelectorAll(".choice");
choices.forEach(choice => choice.addEventListener('click', () => choiceSelector(choice.id)));
let btn = document.querySelector('.btn');
btn.addEventListener('click' , () => Replay())
