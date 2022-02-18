function randomNum(num){
	return Math.floor(Math.random() * num);
}

function randomFreeNum(num, arr){
	var val = Math.floor(Math.random() * num);
	for (let i = 0; i < arr.length; i++){
		if (val == arr[i]){
			i = 0;
			val = Math.floor(Math.random() * num);
		}
	}
	return val;
}


var kleuren = [
	["red"],
	["blue"],
	["green"],
	["yellow"],
	["pink"],
	["orange"],
	["purple"],
	["lightblue"],
	["black"],
	["brown"],
	["grey"]
]

var colorSum = kleuren.length;
var timerElement = document.getElementById("game-time");
var currentRunTimeMax;


function addScore(){
var scoreCounter = document.getElementById("game-score").innerHTML;
scoreCounter++;
document.getElementById("game-score").innerHTML = scoreCounter;
console.log(scoreCounter);
}

function checkColor(val){
	var field = document.getElementById('colorFrame').dataset.colorid;

	if (val.dataset.colorid == field){
		fillGame(kleuren);
		addScore();
	}
}




function fillGame(arr){
var buttons = document.getElementsByClassName('gameName');
var field = document.getElementById('colorFrame');
var frameId = randomNum(colorSum);
var correctBTN = randomNum(3);
var bannenNums = [frameId];

field.style.backgroundColor = kleuren[frameId][0];
field.dataset.colorid = frameId;

	for (let i = 0; i < buttons.length; i++){
		var colorId = randomFreeNum(colorSum, bannenNums);
		bannenNums.push(colorId);
		buttons[i].dataset.colorid = colorId;
		buttons[i].innerHTML = kleuren[colorId][0];
	}

buttons[correctBTN].dataset.colorid = frameId;
buttons[correctBTN].innerHTML = kleuren[frameId][0];
}


var gameTimer;
function startTimer(duration, display) {
	clearInterval(gameTimer);
    var timer = duration, minutes, seconds;
    	gameTimer = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(gameTimer);
			endGame();
        }
    }, 1000);
}



function resetGame(){
	var userTimeInput = document.getElementById("vol").value;
	currentRunTimeMax = userTimeInput;
	document.getElementById("game-score").innerHTML = 0;
	startTimer(userTimeInput, timerElement);
}

function endGame() {
	if(confirm("your score was \n" + 	document.getElementById("game-score").innerHTML + "in " + currentRunTimeMax + " seconds")){
		 resetGame();
} else {
	clearInterval(gameTimer);
	location.reload();
}
}

clearInterval(gameTimer);


fillGame(kleuren);
