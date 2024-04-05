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
const easyMap = [
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

const mediumMap = [
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

    moveRight: function() {
        if (this.col < COLUMNS - 1) {
            easyMap[this.row][this.col] = 0;
            this.col++;
            easyMap[this.row][this.col] = 1;
        }
    },
    moveLeft: function() {
        if (this.col > 0) {
            easyMap[this.row][this.col] = 0;
            this.col--;
            easyMap[this.row][this.col] = 1;
        }
    },
    moveUp: function() {
        if (this.row > 0) {
            easyMap[this.row][this.col] = 0;
            this.row--;
            easyMap[this.row][this.col] = 1;
        }
    },
    moveDown: function() {
        if (this.row < ROWS - 1) {
            easyMap[this.row][this.col] = 0;
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

// Load script
window.addEventListener("load", init, false);

function init(e) {
    // Variables
    menu = document.getElementById("menuStructure");
    game = document.getElementById("game");
    board = document.getElementById("board");
    output = document.getElementById("output");

    btnEasy = document.getElementById("btnEasy");
    btnMedium = document.getElementById("btnMedium");
    btnHard = document.getElementById("btnHard");
    btnAsian = document.getElementById("btnAsian");

    // Events
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

    gameInterval = setInterval(updateGame, 200); // Define o intervalo de atualização do jogo
}

//-----------------------------------------------------------------------------

function updateGame() {
    snake.move();
    checkCollision(); // Verifica colisões após cada movimento da cobra
    eatFood();
    render();
}

//-----------------------------------------------------------------------------

function stopGame() {
    clearInterval(gameInterval); // Limpa o intervalo de atualização do jogo
    gameOver = true;
    alert("Game Over!");
    location.href = "index.html";
}

//-----------------------------------------------------------------------------

function render() {
    game.style.display = "block";
    menu.style.display = "none";

    board.innerHTML = "";

    for (let row = 0; row < ROWS; row++) {
        for (let column = 0; column < COLUMNS; column++) {

            let cel = document.createElement("div");
            cel.setAttribute("class", "cell");

            board.appendChild(cel);

            if (easyMap[row][column] === 1) {
                cel.style.backgroundColor = "Lime"; // Cor da cabeça da cobra
            } else if (easyMap[row][column] === 2) {
                cel.style.backgroundColor = "red"; // Cor da comida
            } else {
                console.log("nada");
            }

            cel.style.top = row * (45 + 0) + "px";
            cel.style.left = column * (45 + 0) + "px";
        }
    }

    output.innerHTML = "Score: " + score;
}

//-----------------------------------------------------------------------------

function checkCollision() {
    if (snake.row < 0 || snake.row >= ROWS || snake.col < 0 || snake.col >= COLUMNS) {
        stopGame(); // Para o jogo se a cobra atingir a borda
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

function placeFood() {
    foodX = Math.floor(Math.random() * COLUMNS);
    foodY = Math.floor(Math.random() * ROWS);
    easyMap[foodY][foodX] = 2; // Posição da comida no mapa
}

function eatFood() {
    if (snake.row === foodY && snake.col === foodX) {
        score += 5; // Aumenta a pontuação
        placeFood(); // Coloca a comida em uma nova posição
        // Você pode adicionar lógica para aumentar o tamanho da cobra aqui
    }
}

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