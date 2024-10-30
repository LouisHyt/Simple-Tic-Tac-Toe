const cells = document.querySelectorAll(".cell");
const cellContainer = document.querySelector("#cellContainer");
const infos = document.querySelector("#infos");
const restartButton = document.querySelector("#restart");


const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let playersChoices = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameRunning = true;
cellContainer.setAttribute("game-running", true);
cellContainer.setAttribute("current-player", "X");


initGame();



function initGame(){
    for(const cell of cells){
        cell.addEventListener("click", cellClicked);
    }
    restartButton.addEventListener("click", restartGame);
    infos.textContent = `${currentPlayer}'s turn`;
}

function cellClicked(){
    const cellIndex = this.dataset.index;
    if(playersChoices[cellIndex] !== "" || !isGameRunning){
        return
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    playersChoices[index] = currentPlayer;
    cell.textContent = currentPlayer;
    if(currentPlayer == "X"){
        cell.classList.add("playerX");
    } else {
        cell.classList.add("playerO");
    }
}

function switchPlayer(){
    if(currentPlayer == "X"){
        cellContainer.setAttribute("current-player", "O");
        currentPlayer = "O";
    } else {
        cellContainer.setAttribute("current-player", "X");
        currentPlayer = "X";
    }
    infos.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let isRoundWon = false;
    for(const condition of winConditions){
        const cellA = playersChoices[condition[0]];
        const cellB = playersChoices[condition[1]];
        const cellC = playersChoices[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }

        if(cellA === cellB && cellB === cellC){
            isRoundWon = true;
            break;
        }
    }

    if(isRoundWon){
        infos.textContent = `${currentPlayer} has won!`;
        isGameRunning = false;
        cellContainer.setAttribute("game-running", false);
    }
    else if(!playersChoices.includes("")){
        infos.textContent = `It's a tie!`;
        isGameRunning = false;
        cellContainer.setAttribute("game-running", false);
    } else {
        switchPlayer();
    }

}

function restartGame(){
    currentPlayer = "X";
    infos.textContent = `${currentPlayer}'s turn`;
    isGameRunning = true;
    cellContainer.setAttribute("game-running", true);
    cellContainer.setAttribute("current-player", "X");
    playersChoices = ["", "", "", "", "", "", "", "", ""];
    for(const cell of cells){
        cell.textContent = "";
        if(cell.classList.contains("playerX")){
            cell.classList.remove("playerX");
        }
        else if(cell.classList.contains("playerO")){
            cell.classList.remove("playerO");
        }
    }
}
