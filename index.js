var started = false;
var levelNumber = 0;

var userClicks = [];
var computerClicks = [];
var btns = ["green", "red", "yellow", "blue"];

$(document).keypress(function () {
  if (!started) {
    $("h1").text("Level " + levelNumber);
    started = true;
    startRound();
  }
});

$(".btn").click(function (event) {
  var color = $(this).attr("id");
  userClicks.push(color);
  playSound(color);
  animatePress(color);
  check(userClicks.length - 1);
});

function check(index) {
  if (userClicks[index] === computerClicks[index]) {
    // do nothing
    if (userClicks.length === computerClicks.length) {
      setTimeout(function () {
        startRound();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over! Press any key to play again!");
    setTimeout(function () {
      $("body").removeClass("game-over");
      startOver();
    }, 2000);
  }
}

function startRound() {
  userClicks = [];
  levelNumber++;
  $("h1").text("Level " + levelNumber);
  var randomColor = btns[Math.floor(Math.random() * 4)];
  console.log(randomColor);
  computerClicks.push(randomColor);
  animatePress(randomColor);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
