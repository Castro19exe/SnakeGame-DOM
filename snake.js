//game
let menu;
let game;
let board;
let output;

let gameInterval;

let gameOver = false;

//food
let foodX;
let foodY;

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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0]
];

// Tamanho de cada célula
const SIZE = 32;
// Número de linhas e colunas do mapa
const ROWS = easyMap.length;
const COLUMNS = easyMap[0].length;

//Buttons
let btnEasy;
let btnMedium;
let btnHard;
let btnAsian;

const snake = {
    row: 6,
    col: 6,
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
    btnEasy.addEventListener("click", render);
    btnMedium.addEventListener("click", render);
    btnHard.addEventListener("click", render);
    btnAsian.addEventListener("click", render);

    window.addEventListener("keydown", keydownHandler, false);
}

//-----------------------------------------------------------------------------

function render() {
    game.style.display = "block";
    menu.style.display = "none";

    for(let row = 0; row < ROWS; row++)
    {
        for(let column = 0; column < COLUMNS; column++) {

            let cel = document.createElement("div");
            cel.setAttribute("class", "cell");
            
            board.appendChild(cel);
            
            if(easyMap[row][column] === 1) {
                cel.style.backgroundImage = "url('images/snakeHead.png')";
                cel.style.backgroundSize = "cover";
            }   
            else if(easyMap[row][column] === 2)
                cel.style.backgroundColor = "red";
            else
                console.log("oi");

            cel.style.top = row * (45 + 0) + "px";
            cel.style.left = column * (45 + 0) + "px";
        }
    }

    output.innerHTML = "Score: ";
}

function startGame() {
    render();
    gameInterval = setInterval(updateGame, 1500); // Atualiza o jogo a cada 100ms
}

function updateGame() {
    snake.move(); // Atualiza a posição da cobra
    eatFood(); // Verifica se a cobra comeu a comida
    render(); // Redesenha o tabuleiro
}

function stopGame() {
    clearInterval(gameInterval); // Para o temporizador do jogo
    gameOver = true;
    alert("Game Over!"); // Exibe uma mensagem de game over
}

function checkCollision() {
    if (snake.row < 0 || snake.row >= ROWS || snake.col < 0 || snake.col >= COLUMNS) {
        stopGame(); // Se a cobra atingir a borda, o jogo termina
    }

    // Aqui você pode adicionar lógica para verificar se a cobra atingiu a si mesma
}

//-----------------------------------------------------------------------------

function keydownHandler(e) {
    switch (e.code) {
        case 'ArrowUp':
            snake.direction = 'up'; // Define a direção da cobra como para cima
            break;
        case 'ArrowDown':
            snake.direction = 'down'; // Define a direção da cobra como para baixo
            break;
        case 'ArrowLeft':
            snake.direction = 'left'; // Define a direção da cobra como para esquerda
            break;
        case 'ArrowRight':
            snake.direction = 'right'; // Define a direção da cobra como para direita
            break;
        default:
            return;
    }
}

//-----------------------------------------------------------------------------

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

    checkCollision(); // Verifica se houve colisão
};

function placeFood() {
    foodX = Math.floor(Math.random() * COLUMNS);
    foodY = Math.floor(Math.random() * ROWS);
    easyMap[foodY][foodX] = 2; // Definir a posição da comida no mapa
}

function eatFood() {
    if (snake.row === foodY && snake.col === foodX) {
        // A cobra comeu a comida
        placeFood(); // Posiciona nova comida
        // Aqui você pode adicionar lógica para aumentar o tamanho da cobra
    }
}