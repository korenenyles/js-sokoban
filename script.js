const container = document.getElementById("container");

//map w= wall s= start and f=finish
const map = [
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

function createMaze() {
  for (let rowIndex = 0; rowIndex < map.length; rowIndex += 1) {
    let rowView = document.createElement("div");
    rowView.classList.add("row");
    container.appendChild(rowView);
    for (let columnIndex = 0; columnIndex < map[0].length; columnIndex += 1) {
      let cellView = document.createElement("div");
      cellView.classList.add("cell");
      if (map[rowIndex][columnIndex] === "W") {
        cellView.classList.add("wallCell");
      } else if (map[rowIndex][columnIndex] === "S") {
        cellView.classList.add("startCell");
      } else if (map[rowIndex][columnIndex] === " ") {
        cellView.classList.add("floorCell");
      } else if (map[rowIndex][columnIndex] === "B") {
        cellView.classList.add("boxCell");
      } else if (map[rowIndex][columnIndex] === "O") {
        cellView.classList.add("storageSpot");
      } else if (map[rowIndex][columnIndex] === "X") {
        cellView.classList.add("storageBoxHereAtStart");
      }

      rowView.appendChild(cellView);
    }
  }
}
createMaze();

//CREATE MOVEMENT FOR PLAYER DIV

let player = document.createElement("div");
let starterCell = document.getElementsByClassName("startCell");
let rowPosition = 9;
let columnPosition = 0;
player.id = "player";
player.classList.add("player");
starterCell[0].appendChild(player);

let playerTop = 0;
let playerLeft = 0;

let playerbox = document.getElementById("playerbox");
document.addEventListener("keydown", movePlayer);
function movePlayer(e) {
  if (e.keyCode == 40) {
    playerTop += 50;
    console.log(e.code);
    player.style.top = playerTop + "px";
  }

  if (e.keyCode == 39) {
    playerLeft += 50;
    console.log(e.code);
    player.style.left = playerLeft + "px";
  }
  if (e.keyCode == 38) {
    playerTop -= 50;
    console.log(e.code);
    player.style.top = playerTop + "px";
  }

  if (e.keyCode == 37) {
    playerLeft -= 50;
    console.log(e.code);
    player.style.left = playerLeft + "px";
  }
}

//Moving Crates

console.log(map[rowPosition][columnPosition]);
