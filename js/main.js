const getRandom = (min, max) => Math.round(Math.random() * (max - min)) + min;
const grid = document.getElementById("grid");
const choiseGame = document.getElementById("choise_difficulty");
let gridNumBox = 100;
let gameBoxClass = "box_normal_100";
const qtyBomb = 16;

function nBomb (){
  const numbers = [];
  while(numbers.length < qtyBomb){
      const randomNum = getRandom(1,gridNumBox)
      if(!numbers.includes(randomNum)){
          numbers.push(randomNum);
      }
  }
  numbers.forEach(n => {
      console.log(n);
      
  });
}

function generateBox(outGrid, gridClass, gridNum, paint) {
  const square = document.createElement("div");
  square.className = gridClass;
  outGrid.append(square);
  square.innerText = gridNum;
  paint(square, "paint_grid_azure")
}

function colorBox(box, color){
  box.addEventListener("click", function () {
    this.classList.add(color);
  });

}

function difficultyGame(selection, displayGrid,toggleActive) {
  displayGrid(generateBox);
  for (let i = 0; i < selection.childElementCount; i++) {
    selection.children.item(i).addEventListener("click", function () {
      toggleActive("button.active","active");
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
      displayGrid(generateBox);
    });
  }
}

function generateGrid(gridElement) {
  grid.innerHTML = "";
  for (let i = 1; i <= gridNumBox; i++) {
    gridElement(grid, gameBoxClass, i, colorBox);
  }
}

function removeActiveClass(btnActive, activeClass) {
  const activeBtn = document.querySelector(btnActive);
  activeBtn.classList.remove(activeClass);
}

difficultyGame(choiseGame, generateGrid, removeActiveClass);
