var canvas = document.getElementById("score-template");
var ctx = canvas.getContext("");
var score = 0


var p1Btn = document.getElementById("p1");
var p2Btn = document.getElementById("p2");
var resetBtn = document.getElementById("reset");
var p1Display = document.getElementById("p1Display");
var p2Display = document.getElementById("p2Display");
var numInput = document.querySelector("input[type=number]");
var winningScoreDisplay = document.querySelector("p span");

var p1Score = 0;
var p2Score = 0;
var gameOver = false;
var winningScore = 5;

function reset() {
    p1Score = p1Display.textContent = p2Score = p2Display.textContent = 0;
    p1Display.classList.remove("winner");
    p2Display.classList.remove("winner");
    gameOver = false;
}

p1Btn.addEventListener("click", function(){
    if(!gameOver) {
        p1Score++;
        if(p1Score === winningScore) {
            gameOver = true;
            p1Display.classList.add("winner");
        }
        p1Display.textContent = p1Score;
    }
});
p2Btn.addEventListener("click", function(){
    if(!gameOver) {
        p2Score++;
        if(p2Score === winningScore) {
            gameOver = true;
            p2Display.classList.add("winner");
        }
        p2Display.textContent = p2Score;
    }
});
resetBtn.addEventListener("click", function() {
    reset();
});
numInput.addEventListener("change", function() {
    winningScore = winningScoreDisplay.textContent = Number(this.value);
    reset();
});

//Displays wining message
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score === brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
          }
        }
      }
    }
  }
}

