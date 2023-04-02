var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//12.You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;
//14.Create a new variable called level and start at level 0.
var level = 0;

//13.Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
    if (!started) {

    //15.The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

    //2. Inside the handler, a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");

    //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);

    //5. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
    playSound(userChosenColour);

    //19. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
});

//18. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //20. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        
        console.log("success");
    
        //21. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            //211. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);
            
        }    
    } else {

        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
    
        $("#level-title").text("Game Over, Press Any Key To Restart");
        
        startOver();
    }
}

function nextSequence() {
    //22. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    //16.Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;

    //17,Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);

var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

//8. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
playSound(randomChosenColour);
}
//6. Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {

//3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//9. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {

//10. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
    $("#" + currentColor).addClass("pressed");

//11use Javascript to remove the pressed class after a 100 milliseconds.
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}