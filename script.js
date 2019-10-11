const map2 = [
  "  WWWWW ",
  "WWW   W ",
  "WOSB  W ",
  "WWW BOW ",
  "WOWWB W ",
  "W W O WW",
  "WB XBBOW",
  "W   O  W",
  "WWWWWWWW"
];
const map = [];

for (let newRow = 0; newRow < map2.length; newRow++) {
  let newArray = [];
  for (let newCell = 0; newCell < map2[newRow].length; newCell++) {
    newArray.push(map2[newRow][newCell]);
  }
  map.push(newArray);
}

let currentX = 2;
let currentY = 2;

const main = document.getElementById("maze");
const winMesssage = document.getElementById("winMessage");
let gameOver = false;
function checkWin() {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "B") {
        return;
      }
    }
  }
  gameOver = true;
  winMesssage.innerHTML = "You Did It! Drogo's Bones are in his Bowls!";
}

function renderMaze() {
  let rowcontainer = document.createElement("div");
  for (let rowAbsolute = 0; rowAbsolute < map.length; rowAbsolute++) {
    let row = map[rowAbsolute];
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("mazeRow");
    for (
      let columnAbsolute = 0;
      columnAbsolute < row.length;
      columnAbsolute++
    ) {
      let wall = document.createElement("div");
      rowDiv.appendChild(wall);

      switch (row[columnAbsolute]) {
        case "C":
          wall.setAttribute("id", "manOnContainer");
          break;

        case "W":
          wall.classList.add("wall");
          break;

        case "S":
          wall.setAttribute("id", "start");
          break;

        case " ":
          wall.classList.add("walkway");
          break;

        case "B":
          wall.setAttribute("id", "box");
          break;

        case "O":
          wall.setAttribute("id", "emptyStorage");
          break;

        case "X":
          wall.setAttribute("id", "boxOnStart");
          break;
      }
    }
    rowcontainer.appendChild(rowDiv);
  }

  while (main.firstChild) {
    main.removeChild(main.childNodes[0]);
  }
  main.appendChild(rowcontainer);
}
renderMaze();

let start = document.getElementById("start");
let currentPosition = start;

document.addEventListener("keydown", handleMove);

function makeMoveTwo(x, y) {
  let nextX = currentX + x;
  let nextY = currentY + y;
  let nextPosition = map[nextY][nextX];
  let nextnextX = currentX + 2 * x;
  let nextnextY = currentY + 2 * y;
  let nextNextPosition = map[nextnextY][nextnextX];
  if (nextPosition === "B") {
    map[nextY][nextX] = "S";
    if (nextNextPosition === "O") {
      map[nextnextY][nextnextX] = "X";
    } else {
      map[nextnextY][nextnextX] = "B";
    }
  }
  if (nextPosition === "X") {
    map[nextY][nextX] = "O";
    map[nextnextY][nextnextX] = "B";
  }

  if (map[currentY][currentX] === "S") {
    map[currentY][currentX] = " ";
  }
  if (map[currentY][currentX] === "C") {
    map[currentY][currentX] = "O";
  }
  if (nextPosition === " ") {
    map[nextY][nextX] = "S";
  }
  if (nextPosition === "O") {
    map[nextY][nextX] = "C";
  }
  currentX = nextX;
  currentY = nextY;
  //   return [currentX, currentY];
}

function handleMove(event) {
  let xyArray;
  if (gameOver === false) {
    switch (event.key) {
      case "ArrowUp":
        if (legalMove(0, -1)) {
          makeMoveTwo(0, -1);
          renderMaze();

          //   makeMove(0, -1);
        }
        break;

      case "ArrowDown":
        if (legalMove(0, +1)) {
          makeMoveTwo(0, +1);
          renderMaze();
        }
        break;

      case "ArrowLeft":
        if (legalMove(-1, 0)) {
          makeMoveTwo(-1, 0);
          renderMaze();
        }
        break;

      case "ArrowRight":
        if (legalMove(+1, 0)) {
          makeMoveTwo(+1, 0);
          renderMaze();
        }
        break;
    }
  }
  checkWin();
}

function makeMove(x, y) {
  let nextPositionUp = Number(currentPosition.dataset.rowIndex) + y;
  let nextPositionLeft = Number(currentPosition.dataset.cellIndex) + x;
  let nextMoveUp = document.querySelector(
    "[data-row-index = '" +
      nextPositionUp +
      "'][data-cell-index = '" +
      nextPositionLeft +
      "']"
  );
  if (
    nextMoveUp.dataset.cellType === "floor" ||
    nextMoveUp.dataset.cellType === "box"
  ) {
    nextMoveUp.appendChild(player);
    currentPosition = nextMoveUp;
    if (nextMoveUp.dataset.cellType === "end") {
    }
  }
}

function legalMove(x, y) {
  let nextX = currentX + x;
  let nextY = currentY + y;
  let nextPosition = map[nextY][nextX];
  let nextnextX = currentX + 2 * x;
  let nextnextY = currentY + 2 * y;
  if (nextPosition === "W") {
    return false;
  }
  let nextNextPosition = map[nextnextY][nextnextX];
  if (nextPosition === " " || nextPosition === "O") {
    return true;
  }
  if (
    nextPosition === "B" &&
    (nextNextPosition === " " || nextNextPosition === "O")
  ) {
    return true;
  }
  if (
    nextPosition === "X" &&
    (nextNextPosition == " " || nextNextPosition === "O")
  ) {
    return true;
  }
  return false;
}
