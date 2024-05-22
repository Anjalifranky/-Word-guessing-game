var word = "";
var wordGuess = [];
var wrongGuess = [];
var guessBomb = 0;
var winCount = 1;
var guess = "";
var dif = 0;
var score = 0;


function updateScoreDisplay() {
  var previousScore = localStorage.getItem("previousScore");
  if (previousScore !== null) {
    document.getElementById("scoreDisplay").innerText =
      "Score: " + previousScore;
  }
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    enter();
  }
}

function chooseDif1() {
  dif = 1;
  document.getElementById("startButton").style.display = "block";
  document.getElementById("chooseDifficulty").style.display = "none";
}

function chooseDif2() {
  dif = 2;
  document.getElementById("startButton").style.display = "block";
  document.getElementById("chooseDifficulty").style.display = "none";
}

function chooseDif3() {
  dif = 3;
  document.getElementById("startButton").style.display = "block";
  document.getElementById("chooseDifficulty").style.display = "none";
}

function chooseDif(difficulty) {
  dif = difficulty;
  document.getElementById("startButton").style.display = "block";
  document.getElementById("chooseDifficulty").style.display = "none";
}

function wordw() {
  var easyWords = [
    "human", "fact", "risk", "beautiful", "holiday", "pretty", "grin", "misty", "true", "love"
  ];
  var normalWords = [
    "pillow", "Lamp", "brake", "mobile", "glorious", "observe", "action", "want", "serve", "teddy"
  ];
  var hardWords = [
    "creature", "creepy", "lumpy", "window", "bite-sized", "observation", "direful", "scarecrow", "quizzical", "consist"
  ];

  var randomWord;

  if (dif === 1) {
    randomWord = easyWords[Math.floor(Math.random() * easyWords.length)];
  } else if (dif === 2) {
    randomWord = normalWords[Math.floor(Math.random() * normalWords.length)];
  } else if (dif === 3) {
    randomWord = hardWords[Math.floor(Math.random() * hardWords.length)];
  }

  return randomWord;
}

function wordStart() {
  var wordLength = word.length;
  var wordL_ = "";
  var count = wordLength;

  while (count > 0) {
    wordGuess.push(" _ ");
    count -= 1;
  }
}

function winCountFunc() {
  var num = 0;
  var lettUsed = "";
  var count = word.length;

  while (count > 0) {
    if (lettUsed.includes(word[count - 1])) {
    } else {
      num += 1;
      lettUsed += word[count - 1];
    }

    count -= 1;
  }

  return num;
}

function start() {
  word = wordw();
  winCount = winCountFunc();

  if (dif == 1) {
    guessBomb = word.length + 5;
  } else if (dif == 2) {
    guessBomb = word.length;
  } else if (dif == 3) {
    if (word.length % 2 == 0) {
      guessBomb = word.length / 2;
    } else {
      guessBomb = (word.length - 1) / 2;
    }
  }

  console.log(word);
  document.getElementById("mainGame").style.display = "block";
  document.getElementById("startButton").style.display = "none";

  document.getElementById("question").innerHTML =
    "<strong>Enter your first guess</strong>";

  wordStart();

  document.getElementById("RRguess").style.display = "block";
  document.getElementById("rightGuess").innerHTML =
    "word progress: " + wordGuess;
  document.getElementById("wrongGuess").innerHTML =
    "Wrong guesses: " + wrongGuess;
  document.getElementById("guessesLeft").innerHTML =
    "Guesses remaining: " + guessBomb;

  var x = document.getElementById("guess").maxLength;
}

function enter() {
  var lett = document.getElementById("guess").value;
  document.getElementById("guess").value = "";

  if (lett.length === 1) {
    var rightOnot = isRightOnot(lett);
    if (rightOnot == true) {
      NewCW(lett);
    } else {
      if (!wrongGuess.includes(lett)) {
        console.log("Better try again!");
        wrongGuess.push(lett);
      }
      guessBomb -= 1;
    }
  } else if (lett.length < 1) {
  } else {
    guessBomb -= 1;
  }

  if (guessBomb <= 0) {
    gameLose();
  }

  if (winCount <= 0) {
    gameWin();
  }
  document.getElementById("rightGuess").innerHTML =
    "word progress: " + wordGuess;
  document.getElementById("wrongGuess").innerHTML =
    "Wrong guesses: " + wrongGuess;
  document.getElementById("guessesLeft").innerHTML =
    "Guesses remaining: " + guessBomb;
}

function isRightOnot(a) {
  var n = word.includes(a);
  return n;
}

function NewCW(letter) {
  var count = 0;
  winCount -= 1;

  while (count <= word.length - 1) {
    if (letter === word[count]) {
      if (wordGuess[count] === letter) {
      } else {
      }

      wordGuess[count] = letter;
      count += 1;
    } else {
      count += 1;
    }
  }
}

function gameLose() {
  document.getElementById("mainGame").style.display = "none";
  document.getElementById("RRguess").style.display = "none";
  document.getElementById("youLose").style.display = "block";
  document.getElementById("correctWordWas").innerHTML =
    "The correct word was " + word;
}

// function gameWin() {
//   document.getElementById("mainGame").style.display = "none";
//   document.getElementById("RRguess").style.display = "none";
//   document.getElementById("youWin").style.display = "block";
// }

function gameWin() {
  score += 10; // Increase score by 10 when the player wins
  updateScoreDisplay(); // Update the score display
  // Store the updated score in localStorage
  localStorage.setItem("previousScore", score);
  // Display the score in the "youWin" section
  document.getElementById("scoreDisplay").innerText = "Score: " + score;
  // Show the "youWin" section
  document.getElementById("mainGame").style.display = "none";
  document.getElementById("RRguess").style.display = "none";
  document.getElementById("youWin").style.display = "block";
}

function restart() {
  // Retrieve the previous score from localStorage
  var previousScore = localStorage.getItem("previousScore");

  // Display the previous score if it exists
  if (previousScore !== null) {
    document.getElementById("previousScoreDisplay").innerText =
      "Previous Score: " + previousScore;
  }

  // Other code in the function remains the same
  document.getElementById("mainGame").style.display = "none";
  document.getElementById("RRguess").style.display = "none";
  document.getElementById("youLose").style.display = "none";
  document.getElementById("youWin").style.display = "none";
  document.getElementById("chooseDifficulty").style.display = "block";

  word = "";
  wordGuess = [];
  wrongGuess = [];
  guessBomb = 0;
  winCount = 1;
  guess = "";
  dif = 0;
}


