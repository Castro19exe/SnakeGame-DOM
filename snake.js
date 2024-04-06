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
    body: [],
    moveRight: function() {
        if (this.col < COLUMNS - 1) {
            this.body.unshift({ row: this.row, col: this.col }); // Adiciona a posição atual da cabeça ao corpo
            if (this.body.length > score) { // Se o corpo for maior do que a pontuação, remova a cauda
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
    updateSnakeBody(); // Atualiza a posição do corpo da cobra
    snake.move(); // Move a cabeça da cobra
    checkCollision();
    eatFood();
    render();
}

//-----------------------------------------------------------------------------

function stopGame() {
    clearInterval(gameInterval);
    gameOver = true;
    document.getElementById("overlay").style.display = "block";
    document.getElementById("btnOK").addEventListener("click", function(event){
        location.href = "index.html";
    });
}

//-----------------------------------------------------------------------------

function checkCollision() {
    if (snake.row < 0 || snake.row == ROWS || snake.col < 0 || snake.col == COLUMNS || checkBodyCollision()) {
        stopGame();
    }
}

//-----------------------------------------------------------------------------

function checkBodyCollision() {
    // Verifica se a cabeça da cobra está em alguma parte do corpo
    return snake.body.some(part => part.row === snake.row && part.col === snake.col);
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
                cel.style.backgroundColor = "Lime"; // Cabeça da cobra
                //cel.style.backgroundImage = "url('images/snakeHead.png')";
                //cel.style.backgroundSize = "cover";
            } else if (easyMap[row][column] === 2) {
                cel.style.backgroundColor = "red"; // Comida
            } else {
                cel.style.backgroundColor = "transparent"; // Espaço vazio
            }

            cel.style.top = row * (45 + 0) + "px";
            cel.style.left = column * (45 + 0) + "px";
        }
    }

    // Desenhar o corpo da cobra
    snake.body.forEach(part => {
        let cel = document.createElement("div");
        cel.setAttribute("class", "cell");
        cel.style.backgroundColor = "Lime"; // Cor do corpo da cobra
        cel.style.top = part.row * (45 + 0) + "px";
        cel.style.left = part.col * (45 + 0) + "px";
        board.appendChild(cel);
    });

    output.innerHTML = "Score: " + score;
}

function renderSnake() {
    // Desenha a cabeça da cobra
    easyMap[snake.row][snake.col] = 1;
    // Desenha o corpo da cobra
    snake.body.forEach(part => {
        easyMap[part.row][part.col] = 1;
    });
}

function updateSnakeBody() {
    // Move cada parte do corpo para a posição da parte seguinte
    for (let i = snake.body.length - 1; i > 0; i--) {
        snake.body[i].row = snake.body[i - 1].row;
        snake.body[i].col = snake.body[i - 1].col;
    }
    // A primeira parte do corpo segue a cabeça
    if (snake.body.length > 0) {
        snake.body[0].row = snake.row;
        snake.body[0].col = snake.col;
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
    let validLocation = false;
    while (!validLocation) {
        // Gera coordenadas aleatórias para a comida
        foodX = Math.floor(Math.random() * COLUMNS);
        foodY = Math.floor(Math.random() * ROWS);

        // Verifica se as coordenadas geradas não correspondem à posição da cabeça ou do corpo da cobra
        if (easyMap[foodY][foodX] !== 1 && !snake.body.some(part => part.row === foodY && part.col === foodX)) {
            validLocation = true;
        }
    }

    easyMap[foodY][foodX] = 2;
}

function eatFood() {
    if (snake.row === foodY && snake.col === foodX) {
        score += 5;
        placeFood();
        // Adiciona um segmento de corpo à cobra
        snake.body.push({ row: snake.row, col: snake.col });
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