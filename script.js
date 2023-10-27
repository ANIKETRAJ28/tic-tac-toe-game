const boxes = document.querySelectorAll(".box");
let Player = document.querySelector(".playerChance");
let gamechange = document.querySelector(".gameStart");
let gameGrid;
let currPlayer;

const winningState = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function strtGame() {
  currPlayer = "X";
  Player.innerText = `Current player - ${currPlayer}`;
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box) => {
    box.classList.remove("win");
    box.innerText = "";
    box.style.pointerEvents = "all";
  });
  gamechange.classList.add("active");
}

strtGame();

function clicked(index) {
  if (gameGrid[index] === "") {
    gameGrid[index] = currPlayer;
    boxes[index].innerText = currPlayer;
    gameGrid[index] = currPlayer;
    if (currPlayer === "X") {
      currPlayer = "0";
      Player.innerText = `Current player - ${currPlayer}`;
      boxes[index].style.pointerEvents = "none";
    } else {
      currPlayer = "X";
      Player.innerText = `Current player - ${currPlayer}`;
      boxes[index].style.pointerEvents = "none";
    }
    gameOver();
  }
}

function gameOver() {
  let ans = "";
  winningState.forEach((state) => {
    if (
      gameGrid[state[0]] !== "" &&
      gameGrid[state[1]] !== "" &&
      gameGrid[state[2]] !== "" &&
      gameGrid[state[0]] === gameGrid[state[1]] &&
      gameGrid[state[1]] === gameGrid[state[2]]
    ) {
      if (gameGrid[state[0]] === "X") ans = "X";
      else ans = "0";
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      boxes[state[0]].classList.add("win");
      boxes[state[1]].classList.add("win");
      boxes[state[2]].classList.add("win");
    }
  });
  if (ans !== "") {
    Player.innerText = `Winner player - ${ans}`;
    gamechange.classList.remove("active");
    return;
  }
  let fillcnt = 0;
  gameGrid.forEach((box) => {
    if (box !== "") fillcnt++;
  });
  if (fillcnt == 9) {
    Player.innerText = `Game Tie`;
    gamechange.classList.remove("active");
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    clicked(index);
  });
});
gamechange.addEventListener("click", strtGame);
