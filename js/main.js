function generateBox(outGrid, gridClass, gridNum) {
  const square = document.createElement("div");
  square.className = gridClass;
  outGrid.append(square);
  square.innerText = gridNum;
  colorBox(square, "paint_grid_azure")
}

function colorBox(box, color){
  box.addEventListener("click", function () {
    this.classList.add(color);
  });

}

function difficultyGame(selection) {
  generateGrid();
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
    });
  }
}

function generateGrid() {
  grid.innerHTML = "";
  for (let i = 1; i <= gridNumBox; i++) {
    generateBox(grid, gameBoxClass, i);
  }
}

function removeActiveClass() {
  const activeBtn = document.querySelector("button.active");
  activeBtn.classList.remove("active");
}

const grid = document.getElementById("grid");
const choiseGame = document.getElementById("choise_difficulty");
let gridNumBox = 100;
let gameBoxClass = "box_normal_100";

difficultyGame(choiseGame);
