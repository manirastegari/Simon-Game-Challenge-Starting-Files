var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function(){

    //2. Inside the handler, a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");

    //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);

    //5. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
    playSound(randomChosenColour);
});

function nextSequence() {

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
var audio = new Audio("sounds/" + name +".mp3");
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