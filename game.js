let mario = document.getElementById("mario");
let coin = document.getElementById("coin");
let scoreDisplay = document.getElementById("score");
let jumpSound = document.getElementById("jump-sound");
let coinSound = document.getElementById("coin-sound");
let score = 0;

let isJumping = false;
let isMovingLeft = false;
let isMovingRight = false;

// Mario movement speed
let marioSpeed = 5;
let marioJumpSpeed = 15;
let gravity = 0.8;
let velocity = 0;

// Initialize Mario's position if not already set
if (!mario.style.left) mario.style.left = "50px";
if (!mario.style.bottom) mario.style.bottom = "20px"; // Set to the ground level

// Set up the event listeners for key presses
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") {
        isMovingRight = true;
    }
    if (event.key === "ArrowLeft") {
        isMovingLeft = true;
    }
    if (event.key === " " && !isJumping) {
        jump();
    }
    console.log("Mario's position: ", mario.style.left);
});

document.addEventListener("keyup", function(event) {
    if (event.key === "ArrowRight") {
        isMovingRight = false;
    }
    if (event.key === "ArrowLeft") {
        isMovingLeft = false;
    }
});

// Function to make Mario jump
function jump() {
    isJumping = true;
    velocity = marioJumpSpeed;
    jumpSound.play();
}

// Update game logic every frame
function update() {
    // Move Mario based on key inputs
    if (isMovingRight) {
        let currentLeft = parseInt(mario.style.left);
        if (currentLeft < 750) { // Prevent Mario from going off the screen
            mario.style.left = (currentLeft + marioSpeed) + "px";
        }
    }
    if (isMovingLeft) {
        let currentLeft = parseInt(mario.style.left);
        if (currentLeft > 0) { // Prevent Mario from going off the screen
            mario.style.left = (currentLeft - marioSpeed) + "px";
        }
    }

    // Apply gravity
    if (isJumping) {
        velocity -= gravity;
        let newBottom = parseInt(mario.style.bottom) + velocity;

        // Ensure Mario lands on the ground at a minimum bottom of 20px
        if (newBottom <= 20) {
            mario.style.bottom = "20px";
            isJumping = false;
        } else {
            mario.style.bottom = newBottom + "px";
        }
    }

    // Check for coin collection
    let marioRect = mario.getBoundingClientRect();
    let coinRect = coin.getBoundingClientRect();

    if (
        marioRect.right > coinRect.left &&
        marioRect.left < coinRect.right &&
        marioRect.bottom > coinRect.top &&
        marioRect.top < coinRect.bottom
    ) {
        // Collect the coin
        coin.style.left = `${Math.random() * (gameContainer.offsetWidth - 30)}px`; // Random horizontal position
        coin.style.bottom = `${Math.random() * (gameContainer.offsetHeight - 30)}px`; // Random vertical position
        coinSound.play();
        score++;
        scoreDisplay.textContent = "Score: " + score;
    }

    requestAnimationFrame(update);
}

update();
