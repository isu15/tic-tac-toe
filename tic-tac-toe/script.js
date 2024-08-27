const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameOver = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', cellClicked);
});

restartButton.addEventListener('click', restartGame);

function cellClicked() {
    const cellIndex = this.getAttribute('data-index');

    if (board[cellIndex] !== "" || isGameOver) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.textContent = `${board[a]} Wins!`;
            isGameOver = true;
            return;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw!";
        isGameOver = true;
    }
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameOver = false;
    currentPlayer = "X";
    statusText.textContent = "";
    cells.forEach(cell => cell.textContent = "");
}
