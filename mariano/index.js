const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const gameContainer = document.getElementById("gameContainer");


let posX1 = 150, posY1 = 280;
let posX2 = 300, posY2 = 280;
let velocityX1 = 0, velocityY1 = 0;
let velocityX2 = 0, velocityY2 = 0;
let isJumping1 = false, isJumping2 = false;
let onGround1 = false, onGround2 = false;let gameRunning = true;
const gravity = 10;  // Gravidade aumentada
const jumpHeight = 20;
const speed = 5;

// Definindo as plataformas
const platforms = [
    { x: 1, y: 140, width: 5000, height: 0 }
];

// Função para desenhar as plataformas no DOM
function createPlatforms() {
    platforms.forEach(platform => {
        const platformElement = document.createElement("div");
        platformElement.classList.add("platform");
        platformElement.style.left = `${platform.x}px`;
        platformElement.style.bottom = `${platform.y}px`;
        platformElement.style.width = `${platform.width}px`;
        platformElement.style.height = `${platform.height}px`;

        gameContainer.appendChild(platformElement);
    });
}

// Função para mover os jogadores
function movePlayers() {
    // Mover Jogador 1
    movePlayer(1);
    // Mover Jogador 2
    movePlayer(2);

    requestAnimationFrame(movePlayers);
}

function movePlayer(playerNumber) {
    let posX, posY, velocityX, velocityY, isJumping, onGround;

    if (playerNumber === 1) {
        posX = posX1;
        posY = posY1;
        velocityX = velocityX1;
        velocityY = velocityY1;
        isJumping = isJumping1;
        onGround = onGround1;

        // Verificando colisão entre Player 1 e Player 2
        if (posX + player1.offsetWidth > posX2 && posX < posX2 + player2.offsetWidth &&
            posY + player1.offsetHeight > posY2 && posY < posY2 + player2.offsetHeight) {
            // Se houver colisão, parar o jogo e exibir quem venceu
            gameRunning = false;
            alert('Player 2 venceu');
            return;  // Interrompe o movimento de Player 1
        }

        posX1 = posX + velocityX;
        posY1 = posY + velocityY;
        player1.style.left = `${posX1}px`;
        player1.style.bottom = `${posY1}px`;
    } else {
        posX = posX2;
        posY = posY2;
        velocityX = velocityX2;
        velocityY = velocityY2;
        isJumping = isJumping2;
        onGround = onGround2;

        // Verificando colisão entre Player 2 e Player 1
        if (posX + player2.offsetWidth > posX1 && posX < posX1 + player1.offsetWidth &&
            posY + player2.offsetHeight > posY1 && posY < posY1 + player1.offsetHeight) {
            // Se houver colisão, parar o jogo e exibir quem venceu
            gameRunning = false;
            alert('Player 1 venceu');
            return;  // Interrompe o movimento de Player 2
        }

        posX2 = posX + velocityX;
        posY2 = posY + velocityY;
        player2.style.left = `${posX2}px`;
        player2.style.bottom = `${posY2}px`;
    }

    // Limita o movimento na tela
    if (posX < 0) posX = 0;
    if (posX > gameContainer.offsetWidth - player1.offsetWidth) {
        posX = gameContainer.offsetWidth - player1.offsetWidth;
    }
}

// Modifique a função movePlayers para parar o loop de animação quando o jogo for interrompido
function movePlayers() {
    if (!gameRunning) return;  // Se o jogo não estiver em execução, não faz nada

    // Mover Jogador 1
    movePlayer(1);
    // Mover Jogador 2
    movePlayer(2);

    // Solicita o próximo frame apenas se o jogo estiver em execução
    requestAnimationFrame(movePlayers);
}

// Função de controle de teclas para os dois jogadores
function handleKeyPress(event) {
    // Jogador 1: teclas de seta
    if (event.key === "ArrowRight") {
        velocityX1 = speed;
    } else if (event.key === "ArrowLeft") {
        velocityX1 = -speed;
    } else if (event.key === "ArrowUp" && !isJumping1) {
        isJumping1 = true;
        velocityY1 = jumpHeight;
    }

    // Jogador 2: teclas A, D, W
    if (event.key === "d") {
        velocityX2 = speed;
    } else if (event.key === "a") {
        velocityX2 = -speed;
    } else if (event.key === "w" && !isJumping2) {
        isJumping2 = true;
        velocityY2 = jumpHeight;
    }
}

function handleKeyRelease(event) {
    // Jogador 1
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        velocityX1 = 0;
    }

    // Jogador 2
    if (event.key === "d" || event.key === "a") {
        velocityX2 = 0;
    }
}

window.addEventListener("keydown", handleKeyPress);
window.addEventListener("keyup", handleKeyRelease);

// Inicializa o jogo e cria as plataformas
createPlatforms();

// Inicia o movimento dos jogadores
movePlayers();
