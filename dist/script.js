var animationInterval;
var triesLeft = 10;
var clickedBalloons = 0;
var username = null;
var maxScore = 0;
var player = {
    playerName: "playerName",
    playerMaxScore: 0
};
// Load user data from localStorage or initialize an empty array
// let userData: { username: string; maxScore: number }[] = JSON.parse(
//   localStorage.getItem("userData") || "[]"
// );
function askForUsernameAndInitializeGame() {
    userNameFromInput = prompt("Please enter your name:");
    console.log("" + userNameFromInput, userNameFromInput);
    if (userNameFromInput === null || userNameFromInput === "") {
        askForUsernameAndInitializeGame();
    }
    if (!localStorage.getItem("" + userNameFromInput)) {
        localStorage.setItem("" + userNameFromInput, "" + userNameFromInput);
        alert("Welcome, " + userNameFromInput + "! Let's start the game.");
    }
    else
        alert("Welcome back " + userNameFromInput + "!");
    // if (userNameFromInput)
    //   if (!username) {
    //     // If it doesn't exist, prompt the user for their name
    //     username = prompt("Please enter your name:");
    //     if (username) {
    //       // Save the username to localStorage
    //       localStorage.setItem("username", username);
    //       // Initialize or find the user's maxScore
    //       const existingUser = userData.find(
    //         (user) => user.username === username
    //       );
    //       if (existingUser) {
    //         maxScore = existingUser.maxScore;
    //       } else {
    //         userData.push({ username, maxScore });
    //         localStorage.setItem("userData", JSON.stringify(userData));
    //       }
    //     }
    //   } else {
    //     // If the name already exists, set the maxScore
    //     const existingUser = userData.find((user) => user.username === username);
    //     if (existingUser) {
    //       maxScore = existingUser.maxScore;
    //     }
    //     alert(`Welcome back, ${username}! Let's continue the game.`);
    //   }
    // Start the game
    initializeGame();
}
function initializeGame() {
    createBalloon();
}
function createBalloon() {
    var balloon = document.createElement("div");
    balloon.classList.add("balloon");
    document.body.appendChild(balloon);
    var randomX = Math.floor(Math.random() * (window.innerWidth - 60));
    balloon.style.left = randomX + "px";
    balloon.style.bottom = "0";
    var animationDuration = 5;
    balloon.style.animation = "float " + animationDuration + "s ease-in-out forwards";
    balloon.addEventListener("animationend", function () {
        if (this.parentElement) {
            this.parentElement.removeChild(this);
            if (triesLeft > 0) {
                triesLeft -= 1;
            }
            updateTriesLeft();
        }
    });
    balloon.addEventListener("click", function () {
        this.style.animation = "none";
        this.remove();
        clickedBalloons += 1;
        updateScoreCounter();
    });
}
function updateTriesLeft() {
    var triesLeftCounter = document.getElementById("triesLeftCounter");
    if (triesLeftCounter) {
        triesLeftCounter.textContent = triesLeft.toString();
    }
    if (triesLeft <= 0) {
        // Save the result of the last game to localStorage
        localStorage.setItem(username + "_lastGameScore", clickedBalloons.toString());
        // Check if the user's score exceeded the maximum
        if (clickedBalloons > maxScore) {
            maxScore = clickedBalloons;
            localStorage.setItem("maxScore", maxScore.toString());
            alert("New high score! Your maximum score is now " + maxScore);
        }
        clearInterval(animationInterval); // Stop the animation
        var ballons = document.querySelectorAll(".balloon");
        alert("Game Over. Your score: " + clickedBalloons);
    }
}
function updateScoreCounter() {
    var scoreCounter = document.getElementById("scoreCounter");
    if (scoreCounter) {
        scoreCounter.textContent = clickedBalloons.toString();
    }
}
animationInterval = setInterval(initializeGame, 1000);
askForUsernameAndInitializeGame();
