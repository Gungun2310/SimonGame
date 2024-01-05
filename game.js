var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];               //for keeping record of the colour flashed sequence
var userClickedPattern = [];          //for keeping record of the sequence in which buttons got pressed

var started = false;
var level = 0;



$(document).keypress(function() {            //starting the game with a keypress, this will run only one time 
  if (!started) {                              //during the game that is in the start only
    $("#level-title").text("Level " + level);     
    nextSequence();
    started = true;
  }
});


$(".btn").click(function(){                               //to track the button clicked using this keyword
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel) {                              //for checking the ans by comparing

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {        //we check for the last button and length
      if (userClickedPattern.length === gamePattern.length){                      //that is frequency of buttons using length, in that all buttons
        setTimeout(function () {                                        //will get checked
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence(){
    userClickedPattern = [];
    level++;                                                     //for generating random colours using random numbers
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed")
    setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed")},100)
    }



function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
