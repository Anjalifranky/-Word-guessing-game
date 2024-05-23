var word = "";
var wordGuess = [];
var wrongGuess = [];
var guessBomb = 0;
var winCount = 1;
var guess = "";
var dif = 0;
var score = 0;

var wordHints = {
  "human": "Relating to people",
  "fact": "A thing that is known to be true",
  "risk": "A situation involving exposure to danger",
  "beautiful": "Pleasing the senses or mind aesthetically",
  "holiday": "A day of celebration or relaxation",
  "pretty": "Attractive in a delicate way",
  "grin": "A broad smile",
  "misty": "Full of or covered with mist",
  "true": "In accordance with fact or reality",
  "love": "An intense feeling of deep affection",
  "pillow": "A soft support for the head",
  "Lamp": "A device that produces light",
  "brake": "A device for slowing or stopping a vehicle",
  "mobile": "Able to move or be moved freely",
  "glorious": "Having great beauty and splendor",
  "observe": "Notice or perceive something",
  "action": "The fact or process of doing something",
  "want": "Have a desire to possess or do something",
  "serve": "Perform duties or services for another person",
  "teddy": "A soft toy bear",
  "creature": "An animal, as distinct from a human being",
  "creepy": "Causing an unpleasant feeling of fear or unease",
  "lumpy": "Full of or covered with lumps",
  "window": "An opening in the wall or roof of a building",
  "bite-sized": "Small enough to be eaten in one mouthful",
  "observation": "The action or process of observing something",
  "direful": "Extremely bad; dreadful",
  "scarecrow": "An object made to resemble a human figure",
  "quizzical": "Indicating mild or amused puzzlement",
  "consist": "Be composed or made up of"
};

function updateScoreDisplay() {
  var previousScore = localStorage.getItem("previousScore");
  if (previousScore !== null) {
    document.getElementById("scoreDisplay").innerText = "Score: " + previousScore;
  }
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    enter();
  }
}

function chooseDif(difficulty) {
  dif = difficulty;
  document.getElementById("startButton").style.display = "block";
  document.getElementById("chooseDifficulty").style.display = "none";
}

function wordw() {
  var easyWords = ["human", "fact", "risk", "beautiful", "holiday", "pretty", "grin", "misty", "true", "love"];
  var normalWords = ["pillow", "Lamp", "brake", "mobile", "glorious", "observe", "action", "want", "serve", "teddy"];
  var hardWords = ["creature", "creepy", "lumpy", "window", "bite-sized", "observation", "direful", "scarecrow", "quizzical", "consist"];

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
    if (!lettUsed.includes(word[count - 1])) {
      num += 1;
      lettUsed += word[count - 1];
    }
    count -= 1;
  }

  return num;
}

function showHint() {
  document.getElementById("hint").innerText = "Hint: " + wordHints[word];
}

function start() {
  word = wordw();
  winCount = winCountFunc();

  if (dif == 1) {
    guessBomb = word.length + 5;
  } else if (dif == 2) {
    guessBomb = word.length;
  } else if (dif == 3) {
    guessBomb = word.length % 2 == 0 ? word.length / 2 : (word.length - 1) / 2;
  }

  console.log(word);
  document.getElementById("mainGame").style.display = "block";
  document.getElementById("startButton").style.display = "none";

  showHint();

  document.getElementById("question").innerHTML = "<strong>Enter your first guess</strong>";

  wordStart();

  document.getElementById("RRguess").style.display = "block";
  document.getElementById("rightGuess").innerHTML = "word progress: " + wordGuess;
  document.getElementById("wrongGuess").innerHTML = "Wrong guesses: " + wrongGuess;
  document.getElementById("guessesLeft").innerHTML = "Guesses remaining: " + guessBomb;
}

function enter() {
  var lett = document.getElementById("guess").value;
  document.getElementById("guess").value = "";

  if (lett.length === 1) {
    var rightOnot = isRightOnot(lett);
    if (rightOnot) {
      NewCW(lett);
    } else {
      if (!wrongGuess.includes(lett)) {
        wrongGuess.push(lett);
      }
      guessBomb -= 1;
    }
  } else {
    guessBomb -= 1;
  }

  if (guessBomb <= 0) {
    gameLose();
  }

  if (winCount <= 0) {
    gameWin();
  }
  document.getElementById("rightGuess").innerHTML = "word progress: " + wordGuess;
  document.getElementById("wrongGuess").innerHTML = "Wrong guesses: " + wrongGuess;
  document.getElementById("guessesLeft").innerHTML = "Guesses remaining: " + guessBomb;
}

function isRightOnot(lett) {
  var right = false;
  for (var i = 0; i < word.length; i++) {
    if (word[i] === lett && wordGuess[i] !== lett) {
      right = true;
      break;
    }
  }
  return right;
}

function NewCW(lett) {
  for (var i = 0; i < word.length; i++) {
    if (word[i] === lett) {
      wordGuess[i] = lett;
    }
  }
  winCount--;
}

function gameLose() {
  document.getElementById("youLose").style.display = "block";
  document.getElementById("mainGame").style.display = "none";
  document.getElementById("RRguess").style.display = "none";
  document.getElementById("correctWordWas").innerHTML = "The correct word was: " + word;
}

function gameWin() {
  document.getElementById("youWin").style.display = "block";
  document.getElementById("mainGame").style.display = "none";
  document.getElementById("RRguess").style.display = "none";
  score += 10; // Increment score by 10 for a win
  localStorage.setItem("previousScore", score); // Save the score in local storage
  updateScoreDisplay(); // Update the score display
}

function restart() {
  word = "";
  wordGuess = [];
  wrongGuess = [];
  guessBomb = 0;
  winCount = 1;
  guess = "";
  dif = 0;
  document.getElementById("chooseDifficulty").style.display = "block";
  document.getElementById("startButton").style.display = "none";
  document.getElementById("mainGame").style.display = "none";
  document.getElementById("youLose").style.display = "none";
  document.getElementById("youWin").style.display = "none";
  document.getElementById("RRguess").style.display = "none";
  document.getElementById("hint").innerText = "";
  updateScoreDisplay();
}

// Initialize score display on page load
updateScoreDisplay();

