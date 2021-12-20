const getRandom = (min, max) => Math.round(Math.random() * (max - min)) + min;
const grid = document.getElementById("grid");
const choiseGame = document.getElementById("choise_difficulty");
const score = document.getElementById("score");
let gridNumBox = 100;
let gameBoxClass = "box_normal_100";
const qtyBomb = 16;
let bombs;
let color;
let loseGame;
let myFun = function(){ };

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
  colorBox(square, color, gridNum);
}

function colorBox(box, color, num) {
  let safeclick=0;
  box.addEventListener("click", function () {
    if (bombs.includes(num)) {
      loseGame=true;
      showBomb(grid);
    } else {
      color = "paint_grid_azure";
      safeclick++;
      if (safeclick===gridNumBox) 
        winnerPage();
    }
    this.classList.add(color);
    console.log(num); //DEBUG
  });
}

function showBomb(parent){
    for (let i = 1; i <= parent.childElementCount; i++){
      // parent.children.item(i).removeEventListener("click", false);
      if (bombs.includes(i)){
        parent.children.item(i).classList.add("paint_grid_red");
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
  loseGame=false;
  for (let i = 1; i <= gridNumBox; i++) {
    generateBox(grid, gameBoxClass, i);
  }
}

function removeActiveClass() {
  const activeBtn = document.querySelector("button.active");
  activeBtn.classList.remove("active");
}

difficultyGame(choiseGame);
