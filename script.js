const gameBoard = document.getElementById("gameBoard");
const cells = document.querySelectorAll("[data-cell]");
const message = document.getElementById("message");
const winnerMessage = document.getElementById("winnerMessage");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Start game
function startGame() {
  cells.forEach((cell, index) => {
    cell.textContent = "";
    cell.classList.remove("taken");
    cell.addEventListener("click", () => handleCellClick(index, cell), { once: true });
  });
  boardState.fill("");
  currentPlayer = "X";
  message.style.display = "none";
}

// Handle cell click
function handleCellClick(index, cell) {
  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");
  if (checkWin()) {
    endGame(false);
  } else if (boardState.every((cell) => cell !== "")) {
    endGame(true);
  } else {
    switchPlayer();
  }
}

// Switch player
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Check for win
function checkWin() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => boardState[index] === currentPlayer);
  });
}

// End game
function endGame(draw) {
  if (draw) {
    winnerMessage.textContent = "It's a Draw!";
  } else {
    winnerMessage.textContent = `${currentPlayer} Wins!`;
  }
  message.style.display = "block";
}

// Restart game
restartButton.addEventListener("click", startGame);

// Initialize game
startGame();
