window.addEventListener("load", init);

//Available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2
};

// //To change level - start with easy
const currentLevel = levels.hard;

// Global Variables
let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const bestScore = document.querySelector("#best-score");

bestScore.innerHTML = localStorage.getItem("score");

seconds.innerHTML = time;

const words = [
  "building",
  "river",
  "lake",
  "face",
  "sky",
  "shelf",
  "cocktail",
  "runaway",
  "joke",
  "developer",
  "establishment",
  "hero",
  "python",
  "dog",
  "cat",
  "animal",
  "plant",
  "plane",
  "human",
  "church",
  "castle",
  "camp",
  "iceberg",
  "forest",
  "mountains",
  "wood",
  "office",
  "moon",
  "dessert",
  "book",
  "game",
  "school"
];

//Initialize game
function init() {
  //Load word from arrray
  showWord(words);

  //Start matching on word input
  wordInput.addEventListener("input", startMatch);

  const currentBestScore = parseInt(localStorage.getItem("score"));

  //Call countdown every second
  setInterval(countdown, 1000);

  //Check game status
  setInterval(checkStatus, 50);
}

//Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    //Reset time
    time = currentLevel + 1;
    //Clear input
    wordInput.value = "";
    //Generate new word
    showWord(words);
    //Set best score to the LocalStorage
    //Increment score
    score++;
    setBestScoreToLs(score);
    console.log(score);

    message.classList.add("correct");
  }

  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

//Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correct";
    message.style.visibility = "visible";
    wordInput.classList.remove("border-error");
    wordInput.classList.add("border-success");
    return true;
  } else {
    message.style.visibility = "hidden";
    message.innerHTML = "...";
    wordInput.classList.remove("border-error");
    wordInput.classList.remove("border-success");

    return false;
  }
}

//Pick & show random word
function showWord(words) {
  //Generate random array index (from 0 to words.length - 1)
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

function countdown() {
  //Make sure tame isn't run out
  if (time > 0) {
    //Decrement time
    time--;
  } else if (time === 0) {
    //Game is over

    message.classList.remove("correct");
    isPlaying = false;
  }

  //Show time
  timeDisplay.innerHTML = time;
}

//Check game status
function checkStatus() {
  const timeLeft = parseInt(timeDisplay.innerHTML);
  if (!isPlaying && time === 0) {
    score = -1;
    message.classList.add("incorrect");
    message.style.visibility = "visible";
    message.innerHTML = "Game Over!!!";
    wordInput.classList.remove("border-success");
    wordInput.classList.add("border-error");

    //Set the best score to LocalStorage
  }
}

//Set the best score to LocalStorage
function setBestScoreToLs(score) {
  alert(score);
}

function setBestScoreToLs(score) {
  const currentBest = localStorage.getItem("score");

  if (score >= currentBest) {
    localStorage.setItem("score", score);
  }
  bestScore.innerHTML = localStorage.getItem("score");
}
