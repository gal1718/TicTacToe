// html elements
const statusDiv = document.querySelector(".status");
const resetDiv = document.querySelector(".reset");
const cellDivs = document.querySelectorAll(".game-cell");

// game variables
let gameIsLive = true;
let xIsNext = true;
let winner = null;

//game constans
const xSymbol = '×';
const oSymbol = 'O'


//functions

const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;

const declareWinner = (letter) => {
    gameIsLive = false;
    winner = letter;
    statusDiv.innerHTML = `${letterToSymbol(letter)} has won`;
}

const checkEquivalent = (x ,y, z) => {
  if(x && x===y && x===z){
    return true;
  }
}


const checkGameStatus = () => {
  const topLeft = cellDivs[0].classList[1];
  const topMiddle = cellDivs[1].classList[1];
  const topRight = cellDivs[2].classList[1];
  const middleLeft = cellDivs[3].classList[1];
  const middleMiddle = cellDivs[4].classList[1];
  const middleRight = cellDivs[5].classList[1];
  const bottomLeft = cellDivs[6].classList[1];
  const bottomMiddle = cellDivs[7].classList[1];
  const bottomRight = cellDivs[8].classList[1];

  if(checkEquivalent(topLeft, topMiddle, topRight)){
    declareWinner(topLeft);
    cellDivs[0].classList.add('won');
    cellDivs[1].classList.add('won');
    cellDivs[2].classList.add('won');
  }else if(checkEquivalent(middleLeft, middleMiddle, middleRight)){
    declareWinner(middleLeft);
    cellDivs[3].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[5].classList.add('won');
  }else if(checkEquivalent(bottomLeft, bottomMiddle, bottomRight)){
    declareWinner(bottomLeft);
    cellDivs[6].classList.add('won');
    cellDivs[7].classList.add('won');
    cellDivs[8].classList.add('won');
  }else if(checkEquivalent(topLeft, middleLeft, bottomLeft)){
    declareWinner(topLeft);
    cellDivs[0].classList.add('won');
    cellDivs[3].classList.add('won');
    cellDivs[6].classList.add('won');
  }else if(checkEquivalent(topMiddle, middleMiddle, bottomMiddle)){
    declareWinner(topMiddle);
    cellDivs[1].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[7].classList.add('won');
  }else if(checkEquivalent(topRight, middleRight, bottomRight)){
    declareWinner(topRight);
    cellDivs[2].classList.add('won');
    cellDivs[5].classList.add('won');
    cellDivs[8].classList.add('won');
  }else if(checkEquivalent(topLeft, middleMiddle, bottomRight)){
    declareWinner(topLeft);
    cellDivs[0].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[8].classList.add('won');
  }else if(checkEquivalent(topRight, middleMiddle, bottomLeft)){
    declareWinner(topRight);
    cellDivs[2].classList.add('won');
    cellDivs[4].classList.add('won');
    cellDivs[6].classList.add('won');
  }else if(topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight){
    gameIsLive = false;
    statusDiv.innerHTML = 'Game Is Tied';
  }
  else{
    xIsNext = !xIsNext;
    if(xIsNext){
      statusDiv.innerHTML = `${xSymbol} turn`
    }
    else{
      statusDiv.innerHTML = `<span> ${oSymbol} turn </span>`
    }
  }

}

// event Handlers
const handleReset = (e) => {
  xIsNext = true;
  statusDiv.innerHTML = `${xSymbol} is next!`;
  for(const cell of cellDivs){
    cell.classList.remove('x');
    cell.classList.remove('o');
  }
  gameIsLive = true;
  winner = null;
};

const handleCellClick = (e) => {
  var classList = e.target.classList;
  console.log(classList);

  if (!classList.contains("x") && !classList.contains("o")) {
    if (xIsNext) {
      classList.add("x");
    } else {
      classList.add("o");
    }
    checkGameStatus();
  }
};

// event listeners
resetDiv.addEventListener("click", handleReset);

for (cell of cellDivs) {
  cell.addEventListener("click", handleCellClick);
}
