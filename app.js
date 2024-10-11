// html elements
const statusDiv = document.querySelector(".status");
const resetDiv = document.querySelector(".reset");
const cellDivs = document.querySelectorAll(".game-cell");

// game variables
let gameIsLive = true;
let xIsNext = true;
let currentBoard = ['','','','','','','','',''];
let winner = null;

//game constans
const xSymbol = '×';
const oSymbol = 'O'


//functions

const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const checkAllEqual = (values, player) => {
  return values.every((val) => val === player);
};

const checkGameStatus = (currentMoveIndex, player) => {
  const row = Math.floor(currentMoveIndex / 3);
  const column = currentMoveIndex % 3;

  //check Row values
  const rowValues = [
    currentBoard[row * 3],
    currentBoard[row * 3 + 1],
    currentBoard[row * 3 + 2],
  ];
  const rowWin = checkAllEqual(rowValues, player);

  //check column values
  const colValues = [
    currentBoard[column],
    currentBoard[column + 3],
    currentBoard[column + 6],
  ];
  const colWin = checkAllEqual(colValues, player);

  //if diagnosal 1 needed check it
  let diagonal1Win = false;
  if ([0, 4, 8].some((pos) => pos === currentMoveIndex)) {
    const diagonal1Values = [currentBoard[0], currentBoard[4], currentBoard[8]];
    diagonal1Win = checkAllEqual(diagonal1Values, player);
  }

  //if diagnosal 2 needed check it
  let diagonal2Win = false;
  if ([2, 4, 6].some((pos) => pos === currentMoveIndex)) {
    const diagonal2Values = [currentBoard[2], currentBoard[4], currentBoard[6]];
    diagonal2Win = checkAllEqual(diagonal2Values, player);
  }

  if (rowWin || colWin || diagonal1Win || diagonal2Win) {
    winner = player;
    gameIsLive = false;
    statusDiv.innerHTML = `${letterToSymbol(player)} has won!`;
  }
  //tie
  else if(currentBoard.every(el => el != '')){
    gameIsLive = false;
  }
};

// event Handlers
const handleReset = (e) => {
  console.log(e);
};

const handleCellClick = (e) => {
  var classList = e.target.classList;
  console.log(classList);
  //location
  //const location = e.target.classList[1];
  const currentMoveIndex = parseInt(e.target.classList[0]);
  if (!classList.contains("x") && !classList.contains("o")) {
    if (xIsNext) {
      currentBoard[currentMoveIndex] = "x";
      classList.add("x");
    } else {
      classList.add("o");
      currentBoard[currentMoveIndex] = "o";
    }
    checkGameStatus(currentMoveIndex, xIsNext ? "x" : "o");
    xIsNext = !xIsNext;
  }
};

// event listeners
resetDiv.addEventListener("click", handleReset);

// const res = Array.from(cellDivs).map((cell) => {
//     console.log(cell);
// });

for (cell of cellDivs) {
  cell.addEventListener("click", handleCellClick);
}
