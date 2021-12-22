const getRandom = (min, max) => Math.round(Math.random() * (max - min)) + min;
const grid = document.getElementById("grid");
const choiseGame = document.getElementById("choise_difficulty");
const score = document.getElementById("score");
const reset = document.querySelector("button.hide");
const safeColor = "paint_grid_azure";
let gridNumBox = 100;
let gameBoxClass = "box_normal_100";
const qtyBomb = 16;
let bombs;
let color;
let gameOver;
const clickable = [];
let safeClick = 0;

function nBomb() {
  const numbers = [];
  while (numbers.length < qtyBomb) {
    const randomNum = getRandom(1, gridNumBox);
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }
  console.log(numbers); //DEBUG
  return numbers;
}

function generateBox(outGrid, gridClass, gridNum, color) {
  const square = document.createElement("div");
  square.className = gridClass;
  outGrid.append(square);
  square.innerText = gridNum;
  square.id = gridNum;
  checkBox(square, gridNum, safeColor);
}

function checkBox(box, num, color) {
  box.addEventListener(
    "click",
    function () {
      if (bombs.includes(num)) {
        gameOver = true;
        showBomb(grid);
        printGameOverType(safeClick);
      }
      if (safeClick < gridNumBox - qtyBomb && !clickable.includes(this.id)) {
        this.classList.add(color);
        safeClick++;
        clickable.push(this.id);
        console.log(clickable, safeClick);
        if (safeClick === gridNumBox - qtyBomb) {
          gameOver = true;
          printGameOverType(safeClick);
        }
      } else {
        console.log("già cliccato");
      }
      printScore(calculateScore(safeClick));
      console.log(num); //DEBUG
    },
    false
  );
}

function calculateScore(playerClick) {
  const changeoverScore = Math.round(100 / (gridNumBox - qtyBomb));
  // console.log("punteggio massimo;" + changeoverScore*(gridNumBox-qtyBomb));//DEBUG
  // console.log(changeoverScore*playerClick);//DEBUG
  return changeoverScore * playerClick;
}
function printScore(x) {
  score.innerText = x;
}
function printGameOverType(click) {
  const gameOverBox = document.createElement("div");
  gameOverBox.className = "game_over_type";
  if (grid.childElementCount === gridNumBox) grid.append(gameOverBox);
  else return;
  if (gameOver) {
    if (click === gridNumBox - qtyBomb) {
      gameOverBox.innerText = "YOU WIN!";
      gameOverBox.className = "win";
    } else if (click === 0) {
      gameOverBox.innerText = "EPIC FAIL!!!";
      gameOverBox.className = "epic_fail";
    } else {
      gameOverBox.innerText = "YOU LOSE!";
      gameOverBox.className = "lose";
    }
  }
  reset.classList.remove("hide");
  reset.addEventListener("click", () => {
    generateGrid();
  });
}
function showBomb(parent) {
  for (let i = 1; i <= parent.childElementCount; i++) {
    if (bombs.includes(i)) {
      parent.children.item(i - 1).classList.add("paint_grid_red");
    }
  }
}

function clickedBox(clickable, index, color) {
  const clicked = [];
  while (clickable.length <= gridNumBox - qtyBomb) {
    let clickedBox = index;
    if (!clicked.includes(clickedBox)) {
      clicked.push(clickedBox);
      clickable.classList.add(color);
    }
  }
}
function difficultyGame(selection) {
  generateGrid();
  bombs = nBomb();
  for (let i = 0; i < selection.childElementCount; i++) {
    selection.children.item(i).addEventListener("click", function () {
      removeActiveClass();
      console.log(this.id); //DEBUG
      switch (this.id) {
        case "hard_difficulty":
          console.log("hard"); //DEBUG
          gridNumBox = 49;
          gameBoxClass = "box_hard_49";
          this.className = "active";
          break;
        case "medium_difficulty":
          console.log("medium"); //DEBUG
          gridNumBox = 81;
          gameBoxClass = "box_medium_81";
          this.className = "active";
          break;
        case "normal_difficulty":
          console.log("normal"); //DEBUG
          gridNumBox = 100;
          gameBoxClass = "box_normal_100";
          this.className = "active";
          break;
        default:
      }
      generateGrid();
      bombs = nBomb();
    });
  }
}

function generateGrid() {
  grid.innerHTML = "";
  gameOver = false;
  const clickable = [];
  safeClick = 0;
  score.innerText = "";
  reset.classList.add("hide");
  for (let i = 1; i <= gridNumBox; i++) {
    generateBox(grid, gameBoxClass, i);
  }
}

function removeActiveClass() {
  const activeBtn = document.querySelector("button.active");
  activeBtn.classList.remove("active");
}

difficultyGame(choiseGame);
