var playAgainBtn = document.getElementById("playAgain");
var numInput = document.querySelector("input[type=number]");
var winningScoreDisplay = document.querySelector("p span");

var p1Score = 0;
var p2Score = 0;
var gameOver = false;
var winningScore = 5;


var userid = document.getElementById("userid").value;
document.write( userid + p1Score);

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
playAgainBtn.addEventListener("click", function() {
    reset();
});
numInput.addEventListener("change", function() {
    winningScore = winningScoreDisplay.textContent = Number(this.value);
    reset();
});

