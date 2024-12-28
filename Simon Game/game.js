var userClickedPattern = [];//includes user selected pattern of colors 
var gamePattern = [];//includes randomly selected pattern of colors
var buttonColors = ["red", "blue", "green", "yellow"];

var level = 0;
var firstKey = true;

$(document).keydown(function() {
    if(firstKey) {
        nextSequence();
        firstKey = false;
    }    
});//detect keydown for the first time and call nextSequence function

function nextSequence() {
    var randomNumber = Math.floor(4 * Math.random());//Create a random number from{0,1,2,3}
    $("#level-title").html("Level " + level);//replace heading with level number
    level++;//level up

    var randomChosenColor = buttonColors[randomNumber];//pick a color based on its position in buttonColors array
    gamePattern.push(randomChosenColor);//add this color to the end of game pattern
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);//flash the button having this color
    playSound(randomChosenColor);//call function playSound
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");//get id of user clicked color
    userClickedPattern.push(userChosenColor);//add this color to end of user selected pattern
    playSound(userChosenColor);//call function playSound
    animatePress(userChosenColor);//call function animatePres
    
    if(gamePattern.length == userClickedPattern.length) {
        checkAnswer(gamePattern);
    }         
});//

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
};//play the sound corresponding to the color

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");//add css property to clicked button
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");//remove the css property after 100ms delay
    } , 100);    
}


function checkAnswer(currentLevel) {
    for(var i = 0; i < currentLevel.length; i++) {
        if(currentLevel.pop() == userClickedPattern.pop()) {
            setTimeout(function() {
                nextSequence();
            }, 1000);        
        }else {
            userClickedPattern = [];
            gamePattern = [];
            firstKey = true;
            level = 0;
            playSound("wrong");
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
            $("#level-title").html("Game Over, Press Any Key to Restart");
        }
    }    
}





