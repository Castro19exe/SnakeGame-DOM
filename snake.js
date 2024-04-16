// Game Variables
let menu;
let game;
let board;
let output;
let scoreOutput;

let overlayCredits;
let overlayGameOver;

let score = 0;

let foodX;
let foodY;

let gameOver = false;

// Maps
const easyMap =
[
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// Cel Size
const SIZE = 32;

// Number of ROWS AND COLUMNS
const ROWS = easyMap.length;
const COLUMNS = easyMap[0].length;

// Buttons
let btnEasy;
let btnMedium;
let btnHard;
let btnAsian;
let btnCredits;
let exitBtn;

const sounds = {
    menuSound: "",
    gameSound: ""
}

const snake = {
    row: 6,
    col: 6,
    direction: 'down',
    body: [],
    moveRight: function() {
        if (this.col < COLUMNS - 1) {
            this.body.unshift({ row: this.row, col: this.col });
            if (this.body.length > score) {
                const tail = this.body.pop();
                easyMap[tail.row][tail.col] = 0;
            }
            this.col++;
            easyMap[this.row][this.col] = 1;
        }
    },
    moveLeft: function() {
        if (this.col > 0) {
            this.body.unshift({ row: this.row, col: this.col });
            if (this.body.length > score) {
                const tail = this.body.pop();
                easyMap[tail.row][tail.col] = 0;
            }
            this.col--;
            easyMap[this.row][this.col] = 1;
        }
    },
    moveUp: function() {
        if (this.row > 0) {
            this.body.unshift({ row: this.row, col: this.col });
            if (this.body.length > score) {
                const tail = this.body.pop();
                easyMap[tail.row][tail.col] = 0;
            }
            this.row--;
            easyMap[this.row][this.col] = 1;
        }
    },
    moveDown: function() {
        if (this.row < ROWS - 1) {
            this.body.unshift({ row: this.row, col: this.col });
            if (this.body.length > score) {
                const tail = this.body.pop();
                easyMap[tail.row][tail.col] = 0;
            }
            this.row++;
            easyMap[this.row][this.col] = 1;
        }
    },
    move: function() {
        switch (this.direction) {
            case 'up':
                this.moveUp();
                break;
            case 'down':
                this.moveDown();
                break;
            case 'left':
                this.moveLeft();
                break;
            case 'right':
                this.moveRight();
                break;
        }
    }
}

//--------------------------------------------------------------------------------------

snake.moveRight = function() {
    if (this.col < COLUMNS - 1) {
        easyMap[this.row][this.col] = 0;
        this.col++;
        easyMap[this.row][this.col] = 1;
    }
};
snake.moveLeft = function() {
    if (this.col > 0) {
        easyMap[this.row][this.col] = 0;
        this.col--;
        easyMap[this.row][this.col] = 1;
    }
};
snake.moveUp = function() {
    if (this.row > 0) {
        easyMap[this.row][this.col] = 0;
        this.row--;
        easyMap[this.row][this.col] = 1;
    }
};
snake.moveDown = function() {
    if (this.row < ROWS - 1) {
        easyMap[this.row][this.col] = 0;
        this.row++;
        easyMap[this.row][this.col] = 1;
    }
};

//--------------------------------------------------------------------------------------

//Load script
window.addEventListener("load", init, false);

function init(e) {
    //Inicialize Sounds
    sounds.menuSound = document.getElementById("menuSound");
	sounds.menuSound.volume = 0.05;

    //Snake spawn in a random position
    snake.col = Math.floor(Math.random() * COLUMNS);
    snake.row = Math.floor(Math.random() * ROWS);

    //Variables
    menu = document.getElementById("menuStructure");
    game = document.getElementById("game");
    board = document.getElementById("board");
    output = document.getElementById("output");
    scoreOutput = document.getElementById("score");
    overlayCredits = document.getElementById("overlayCredits");
    overlayGameOver = document.getElementById("overlayGameOver");

    btnEasy = document.getElementById("btnEasy");
    btnMedium = document.getElementById("btnMedium");
    btnHard = document.getElementById("btnHard");
    btnAsian = document.getElementById("btnAsian");
    btnCredits = document.getElementById("creditsBtn");
    exitBtn = document.getElementById("exitBtn");

    //Events
    btnEasy.addEventListener("click", startGameEasy);
    btnMedium.addEventListener("click", startGameMedium);
    btnHard.addEventListener("click", startGameHard);
    btnAsian.addEventListener("click", startGameVeryHard);
    btnCredits.addEventListener("click", function() {
        overlayCredits.style.display = "flex";
        overlayCredits.style.justifyContent = "center";
        overlayCredits.style.alignItems = "center";
    });
    exitBtn.addEventListener("click", function() {
        overlayCredits.style.display = "none";
    });

    window.addEventListener("keydown", keydownHandler, false);
}

//-----------------------------------------------------------------------------

function startGameEasy() {
    render();
    placeFood();

    snake.body.push({ row: snake.row - 1, col: snake.col });
    
    gameInterval = setInterval(updateGame, 300);
}

//-----------------------------------------------------------------------------

function startGameMedium() {
    render();
    placeFood();

    snake.body.push({ row: snake.row - 1, col: snake.col });
    
    gameInterval = setInterval(updateGame, 200);
}

//-----------------------------------------------------------------------------

function startGameHard() {
    render();
    placeFood();

    snake.body.push({ row: snake.row - 1, col: snake.col });
    snake.body.push({ row: snake.row - 2, col: snake.col });
    
    gameInterval = setInterval(updateGame, 150);
}

//-----------------------------------------------------------------------------

function startGameVeryHard() {
    render();
    placeFood();
    
    snake.body.push({ row: snake.row - 1, col: snake.col });
    snake.body.push({ row: snake.row - 2, col: snake.col });
    snake.body.push({ row: snake.row - 3, col: snake.col });
    
    gameInterval = setInterval(updateGame, 50);
}

//-----------------------------------------------------------------------------

function updateGame() {
    if(snake.direction !== 'stop') {
        updateSnakeBody();
    }
    snake.move();
    checkCollision();
    eatFood();
    render();
}

//-----------------------------------------------------------------------------

function stopGame() {
    clearInterval(gameInterval);
    gameOver = true;
    overlayGameOver.style.display = "flex";
    overlayGameOver.style.justifyContent = "center";
    overlayGameOver.style.alignItems = "center";
    scoreOutput.innerHTML += "Your Score: " + score;
    document.getElementById("exitBtnGameOver").addEventListener("click", function(){
        location.href = "index.html";
    });
}

//-----------------------------------------------------------------------------

function renderSnake() {
    easyMap[snake.row][snake.col] = 1;
    snake.body.forEach(part => {
        easyMap[part.row][part.col] = 1;
    });
}

//-----------------------------------------------------------------------------

function checkCollision() {
    if (snake.row < 0 || snake.row == ROWS || snake.col < 0 || snake.col == COLUMNS || checkBodyCollision() && snake.direction !== 'stop') {
        stopGame();
    }
}

//-----------------------------------------------------------------------------

function checkBodyCollision() {
    return snake.body.some(part => part.row === snake.row && part.col === snake.col);
}

//-----------------------------------------------------------------------------

function render() {
    game.style.display = "flex";
    game.style.alignItems = "center";
    menu.style.display = "none";

    board.innerHTML = "";

    for (let row = 0; row < ROWS; row++) {
        for (let column = 0; column < COLUMNS; column++) {
            let cel = document.createElement("div");
            cel.setAttribute("class", "cell");
            board.appendChild(cel);

            if (easyMap[row][column] === 1) {
                
                cel.style.backgroundColor = "Lime";

            } else if (easyMap[row][column] === 2) {

                cel.style.backgroundColor = "red";
            } else {
                cel.style.backgroundColor = "transparent";
            }

            cel.style.top = row * (45 + 0) + "px";
            cel.style.left = column * (45 + 0) + "px";
        }
    }

    snake.body.forEach(part => {
        let cel = document.createElement("div");
        cel.setAttribute("class", "cell");
        cel.style.backgroundColor = "Lime";
        cel.style.top = part.row * (45 + 0) + "px";
        cel.style.left = part.col * (45 + 0) + "px";
        board.appendChild(cel);
    });

    output.innerHTML = "Score: " + score;
}

//-----------------------------------------------------------------------------

function updateSnakeBody() {
    for (let i = snake.body.length - 1; i > 0; i--) {
        snake.body[i].row = snake.body[i - 1].row;
        snake.body[i].col = snake.body[i - 1].col;
    }
    if (snake.body.length > 0) {
        snake.body[0].row = snake.row;
        snake.body[0].col = snake.col;
    }
}

//-----------------------------------------------------------------------------

function keydownHandler(e) {
    switch (e.code) {
        case 'ArrowUp':
            if (snake.direction !== 'down') snake.direction = 'up';
            break;
        case 'ArrowDown':
            if (snake.direction !== 'up') snake.direction = 'down';
            break;
        case 'ArrowLeft':
            if (snake.direction !== 'right') snake.direction = 'left';
            break;
        case 'ArrowRight':
            if (snake.direction !== 'left') snake.direction = 'right';
            break;
        default:
            return;
    }
}

//-----------------------------------------------------------------------------

function placeFood() {
    let validLocation = false;

    while (!validLocation) {
        foodX = Math.floor(Math.random() * COLUMNS);
        foodY = Math.floor(Math.random() * ROWS);

        if (easyMap[foodY][foodX] !== 1 && !snake.body.some(part => part.row === foodY && part.col === foodX)) {
            validLocation = true;
        }
    }

    easyMap[foodY][foodX] = 2;
}

//-----------------------------------------------------------------------------

function eatFood() {
    if (snake.row === foodY && snake.col === foodX) {
        score += 5;
        placeFood();
        snake.body.push({ row: snake.row, col: snake.col });
    }
}

//-----------------------------------------------------------------------------