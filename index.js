
const buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

var gamePattern = [];
var userClickedPattern = [];

//Mouse click event listener that generates and records clicks

$(document).keypress(function() {
    if (!started){
        
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound (userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
    
    
});

//Check Answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
    
}

//Predetermined sequence to follow with button clicks
function nextSequence() {
    userClickedPattern = [];

    level++
    $("#level-title").text("Level " + level);
    
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); 
    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

//Button response behavior
function playSound(name) {

    //Instructor Code that could replace the Switch-Case statement
    // $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    // var audio = new Audio("sounds/" + userChosenColour + ".mp3");
    // audio.play();

    switch (name) {
        case buttonColours[0]:
            $(".red").fadeIn(100).fadeOut(100).fadeIn(100);
            var red = new Audio("sounds/red.mp3");
            red.play();
            break;

        case buttonColours[1]:
            $(".blue").fadeIn(100).fadeOut(100).fadeIn(100);
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;

        case buttonColours[2]:
            $(".green").fadeIn(100).fadeOut(100).fadeIn(100);
            var green = new Audio("sounds/green.mp3");
            green.play();
            break;

        case buttonColours[3]:
            $(".yellow").fadeIn(100).fadeOut(100).fadeIn(100);
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;

        default:
            console.log("Choose color Again");
            var wrong = new Audio("sounds/wrong.mp3");
            wrong.play();
            break;
    }
}

function animatePress(currentColour) {
    //# currentColour is used to specify each button based on its id in HTML
    $("#" + currentColour).addClass("pressed");

    //This is how you remove something after an amount of time. The delay doesn't work. 
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};

//Start Over
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
