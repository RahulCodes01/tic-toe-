const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'Rahul'; // Changed Player X to Rahul
let isGameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function createBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.dataset.index = index;
    cellElement.textContent = cell;
    cellElement.addEventListener('click', handleCellClick);
    boardElement.appendChild(cellElement);
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (board[index] || !isGameActive) return;

  board[index] = currentPlayer === 'Rahul' ? 'X' : 'O';
  e.target.textContent = board[index];
  e.target.classList.add('taken', board[index].toLowerCase());

  if (checkWinner()) {
    showWinnerPopup(currentPlayer);
    changeBackgroundColor(currentPlayer);
    isGameActive = false;
  } else if (board.every(cell => cell)) {
    showWinnerPopup('draw');
    isGameActive = false;
  } else {
    currentPlayer = currentPlayer === 'Rahul' ? 'You' : 'Rahul';
    messageElement.textContent = `${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === (currentPlayer === 'Rahul' ? 'X' : 'O'));
  });
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'Rahul'; // Reset to Rahul's turn
  isGameActive = true;
  messageElement.textContent = `${currentPlayer}'s turn`;
  document.body.style.backgroundColor = ''; // Reset background color
  closePopup();
  createBoard();
}

function showWinnerPopup(winner) {
  const popup = document.createElement('div');
  popup.id = 'winner-popup';
  popup.classList.add('popup');

  if (winner === 'draw') {
    popup.innerHTML = `
      <h2>It's a Draw!</h2>
      <button onclick="resetGame()">Play Again</button>
    `;
  } else {
    popup.innerHTML = `
      <h2>${winner} Wins!</h2>
      <button onclick="resetGame()">Play Again</button>
    `;
  }

  document.body.appendChild(popup);
}

function closePopup() {
  const popup = document.getElementById('winner-popup');
  if (popup) popup.remove();
}

function changeBackgroundColor(winner) {
  if (winner === 'Rahul') {
    document.body.style.backgroundColor = '#ffe4e1'; // Light pink for Rahul
  } else if (winner === 'You') {
    document.body.style.backgroundColor = '#e0ffff'; // Light cyan for You
  }
}

// Initialize the game
resetGame();
