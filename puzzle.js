var rows = 3;
var columns = 3;

var currTile = null;
var otherTile = null;
var turns = 0;

var imgOrderOriginal = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];
var currentImgSet = imgOrderOriginal.slice();

window.onload = function () {
    document.getElementById("reset-btn").addEventListener("click", resetGame);
    startGame();
};

function startGame() {
    turns = 0;
    document.getElementById("turns").innerText = turns;

    let board = document.getElementById("board");
    board.innerHTML = "";

    let imgOrder = currentImgSet.slice();

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = `${r}-${c}`;
            tile.src = `./shinchan/${imgOrder.shift()}.jpg`;
            tile.draggable = true;

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            board.appendChild(tile);
        }
    }
}

function resetGame() {
    turns = 0;
    document.getElementById("turns").innerText = turns;
    currentImgSet = shuffleArray(imgOrderOriginal);
    startGame();
}

function shuffleArray(arr) {
    let array = arr.slice();
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// DRAG FUNCTIONS
function dragStart(e) {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave(e) {}

function dragDrop(e) {
    otherTile = this;
}

function dragEnd(e) {
    if (!otherTile || !otherTile.src.includes("3.jpg")) return;

    let [r1, c1] = currTile.id.split("-").map(Number);
    let [r2, c2] = otherTile.id.split("-").map(Number);

    let adjacent =
        (r1 === r2 && Math.abs(c1 - c2) === 1) ||
        (c1 === c2 && Math.abs(r1 - r2) === 1);

    if (adjacent) {
        [currTile.src, otherTile.src] = [otherTile.src, currTile.src];
        turns++;
        document.getElementById("turns").innerText = turns;
    }

    currTile = null;
    otherTile = null;
}
