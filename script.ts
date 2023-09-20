let animationInterval: number;
let triesLeft = 10;
let clickedBalloons = 0;

function createBalloon() {
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");
  document.body.appendChild(balloon);

  const randomX = Math.floor(Math.random() * (window.innerWidth - 60));
  balloon.style.left = `${randomX}px`;
  balloon.style.bottom = "0";

  const animationDuration = 5;
  balloon.style.animation = `float ${animationDuration}s ease-in-out forwards`;

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
  const triesLeftCounter = document.getElementById("triesLeftCounter");

  if (triesLeftCounter) {
    triesLeftCounter.textContent = triesLeft.toString();
  }

  if (triesLeft <= 0) {
    clearInterval(animationInterval); // Stop the animation
    const ballons = document.querySelectorAll(".ballon");
    alert("Game Over");
  }
}

function updateScoreCounter() {
  const scoreCounter = document.getElementById("scoreCounter");

  if (scoreCounter) {
    scoreCounter.textContent = clickedBalloons.toString();
  }
}

animationInterval = setInterval(createBalloon, 1000);
createBalloon();
