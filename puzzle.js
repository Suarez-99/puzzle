var rows = 5;
var columns = 5;

var currTile;
var otherTile;

var turns = 0;
var timer;
var seconds = 0;

window.onload = function() {
    // Initialize the 5x5 board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.src = "./images/blank.jpg";

            // DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }

    // Pieces
    let pieces = [];
    for (let i = 1; i <= rows * columns; i++) {
        pieces.push(i.toString());
    }
    pieces.reverse();
    for (let i = 0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./images/" + pieces[i] + ".jpg";

        // DRAG FUNCTIONALITY
        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragover", dragOver);
        tile.addEventListener("dragenter", dragEnter);
        tile.addEventListener("dragleave", dragLeave);
        tile.addEventListener("drop", dragDrop);
        tile.addEventListener("dragend", dragEnd);

        document.getElementById("pieces").append(tile);
    }

    // Start timer
    startTimer();
}

function startTimer() {
    timer = setInterval(function() {
        seconds += 1;
        document.getElementById("timer").innerText = seconds;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function resetGame() {
    location.reload();
}

// DRAG TILES
function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;

    // Check if the puzzle is complete
    checkCompletion();
}

function checkCompletion() {
    let isComplete = true;
    let tiles = document.getElementById("board").getElementsByTagName("img");
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].src.includes((i + 1).toString() + ".jpg") === false) {
            isComplete = false;
            break;
        }
    }
    if (isComplete) {
        stopTimer();
        document.getElementById("message").innerText = "Congratulations! You completed the puzzle.";
    }
}
