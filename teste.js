// Game Variables
let menu;
let game;
let board;
let output;

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
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
const mediumMap =
[
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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

const snake = {
    row: 6,
    col: 6,
    direction: 'stop',
    moveRight: function () {
        if (this.col < COLUMNS - 1) {
            easyMap[this.row][this.col] = 0;
            this.col++;
            easyMap[this.row][this.col] = 1;
        }
    },
    moveLeft: function () {
        if (this.col > 0) {
            easyMap[this.row][this.col] = 0;
            this.col--;
            easyMap[this.row][this.col] = 1;
        }
    },
    moveUp: function () {
        if (this.row > 0) {
            easyMap[this.row][this.col] = 0;
            this.row--;
            easyMap[this.row][this.col] = 1;
        }
    },
    moveDown: function () {
        if (this.row < ROWS - 1) {
            easyMap[this.row][this.col] = 0;
            this.row++;
            easyMap[this.row][this.col] = 1;
        }
    },
    move: function () {
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

const snakeBody = [];

//--------------------------------------------------------------------------------------

//Load script
window.addEventListener("load", init, false);

function init(e) {
    //Variables
    menu = document.getElementById("menuStructure");
    game = document.getElementById("game");
    board = document.getElementById("board");
    output = document.getElementById("output");

    btnEasy = document.getElementById("btnEasy");
    btnMedium = document.getElementById("btnMedium");
    btnHard = document.getElementById("btnHard");
    btnAsian = document.getElementById("btnAsian");

    //Events
    btnEasy.addEventListener("click", startGame);
    btnMedium.addEventListener("click", startGame);
    btnHard.addEventListener("click", startGame);
    btnAsian.addEventListener("click", startGame);

    window.addEventListener("keydown", keydownHandler, false);
}

//-----------------------------------------------------------------------------

function startGame() {
    render();
    placeFood();

    gameInterval = setInterval(updateGame, 200);
}

//-----------------------------------------------------------------------------

function updateGame() {
    snake.move();
    checkCollision();
    eatFood();
    // Verifica se a cobra comeu a comida
    render();
}

//-----------------------------------------------------------------------------

function stopGame() {
    clearInterval(gameInterval);
    gameOver = true;
    alert("Game Over!");
    location.href = "index.html";
}

//-----------------------------------------------------------------------------

function render() {
    game.style.display = "block";
    menu.style.display = "none";

    board.innerHTML = "";

    for(let row = 0; row < ROWS; row++)
    {
        for(let column = 0; column < COLUMNS; column++) {

            let cel = document.createElement("div");
            cel.setAttribute("class", "cell");
            
            board.appendChild(cel);
            
            if(easyMap[row][column] === 1) {
                // cel.style.backgroundImage = "url('images/snakeHead.png')";
                cel.style.backgroundColor = "Lime";
                cel.style.backgroundSize = "cover";
            }   
            else if(easyMap[row][column] === 2)
                cel.style.backgroundColor = "red";
            else
                console.log("nada");

            cel.style.top = row * (45 + 0) + "px";
            cel.style.left = column * (45 + 0) + "px";
        }
    }

    output.innerHTML = "Score: " + score;
}

//-----------------------------------------------------------------------------

function checkCollision() {
    if (snake.row < 0 || snake.row == ROWS || snake.col < 0 || snake.col == COLUMNS) {
        stopGame();
    }
}

//-----------------------------------------------------------------------------

function keydownHandler(e) {
    switch (e.code) {
        case 'ArrowUp':
            snake.direction = 'up';
            break;
        case 'ArrowDown':
            snake.direction = 'down';
            break;
        case 'ArrowLeft':
            snake.direction = 'left';
            break;
        case 'ArrowRight':
            snake.direction = 'right';
            break;
        default:
            return;
    }
}

snake.move = function() {
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

    checkCollision();
};

function placeFood() {
    foodX = Math.floor(Math.random() * COLUMNS);
    foodY = Math.floor(Math.random() * ROWS);
    easyMap[foodY][foodX] = 2;
}

function eatFood() {
    if (snake.row === foodY && snake.col === foodX) {
        score = score + 5;
        placeFood();

        // Aqui você pode adicionar lógica para aumentar o tamanho da cobra
    }
}

// Modifique as funções moveUp, moveDown, moveLeft, e moveRight para apenas atualizar a posição da cobra sem renderizar o jogo

// Funções de movimento da cobra
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