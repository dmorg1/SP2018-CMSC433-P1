// Constants
const lvl1req = 5;
const lvl2req = 5;
const lvl3req = 10;
const lvl4req = 10;

// Global variables
var level;
var ansCorrectInLvl;
var ansWrongInLvl;

var currDate;
var currHr;
var currMin;

var currUser;


var userCount = sessionStorage.getItem("userCount");
if(!userCount){
	userCount = 0;
}

// Begin game
init();

/*
 *  init()
 *  Description: Initializes the game. Also called once a game is lost or completed. Starts with
 *				 login screen.
 *	Params: none
 *	Return: none
 */
function init(){
	level = 1;
	ansCorrectInLvl = 0;
	ansWrongInLvl = 0;

	currHr = 0;
	currMin = 0;
	
	// lvl1 - lvl4 values represent the number wrong in that level
	currUser = {
		fname: "",
		lname: "",
		lvl1: 0,
		lvl2: 0,
		lvl3: 0,
		lvl4: 0
	};
	
	sessionStorage.setItem("userCount", userCount);
	
	currDate = generateTime(1);
	currHr = currDate.getHours();
	currMin = currDate.getMinutes();

	drawNewClock(currDate);
	
	generateOverlayLogin();
}

/*
 *  login()
 *  Description: Stores the first name and last name of the student to be associated with their
 *				 statistics. Closes the overlay window.
 *	Params: none
 *  Return: none
 */
function login(){
	fnameElem = document.getElementById("fname");
	lnameElem = document.getElementById("lname");

	currUser.fname = fnameElem.value;
	currUser.lname = lnameElem.value;

	closeOverlay();
	
	fnameElem.value = "";
	lnameElem.value = "";
}

/*
 *  generateNewProblem()
 *  Description: 
 *	Params: none
 *  Return: none
 */
function generateNewProblem(){
	document.getElementById("conf").style.display = "none";
	
	currDate = generateTime(level);
	currHr = currDate.getHours();
	currMin = currDate.getMinutes();

	drawNewClock(currDate);
	
	document.getElementById("set").disabled = false;
	var hourField = document.getElementById("hour");
	hourField.disabled = false;
	hourField.value = "12";
	var minuteField = document.getElementById("minute");
	minuteField.disabled = false;
	minuteField.value = "0";
	
	//updateStatusBar();
}

/*
 *  endGame()
 *  Description: Ends the game. Writes the user's info to sessionStorage. Creates a new
 *				 instance of the game, starting at the login screen, by calling init(). Also
 *				 increments the user count.
 *	Params: none
 *  Return: none
 */
function endGame(){
	
	saveData(userCount, currUser);
	userCount++;
	
	init();
	updateStatusBar();
	
	document.getElementById("conf").style.display = "none";
	document.getElementById("set").disabled = false;
	
	var hourField = document.getElementById("hour");
	hourField.disabled = false;
	hourField.value = "12";
	var minuteField = document.getElementById("minute");
	minuteField.disabled = false;
	minuteField.value = "0";
}

/*
 *  generateTime()
 *  Description: Generates a new time appropriate for the current level.
 *	Params: level - the current player's level
 *  Return: date - the generated time
 */
function generateTime(level){
	var date = new Date();
	
	if(level == 1){
		date.setHours(randInt(1,12));
		date.setMinutes(0);
		date.setSeconds(0);
	}
	else if(level == 2){
		date.setHours(randInt(1,13));
		date.setMinutes(randInt(0,2) * 30);
		date.setSeconds(0);
	}
	else if(level == 3){
		date.setHours(randInt(1,13));
		date.setMinutes(randInt(0,4) * 15);
		date.setSeconds(0);
	}
	else if(level == 4){
		date.setHours(randInt(1,13));
		date.setMinutes(randInt(0,13) * 5);
		date.setSeconds(0);
	}
	
	return date;
}

/*
 *  checkAnswer()
 *  Description: Checks the current player's answer for correctness. Updates ansCorrectInLvl,
 *				 totCorrect, ansWrongInLvl, totWrong. Calls updateLevel() if the answer was
 *				 correct. Informs the player if they were correct, if they were wrong, and if
 *				 their level was incremented (if updateLevel() returned true).
 *	Params: none
 *  Return: none
 */
function checkAnswer(){
	var hourElem = document.getElementById("hour");
	var minuteElem = document.getElementById("minute");
	var guessedHr = hourElem.options[hourElem.selectedIndex].value;
	var guessedMin = minuteElem.options[minuteElem.selectedIndex].value;
	
	//console.log("Guessed: " + guessedHr + ":" + guessedMin);
	//console.log("Current: " + currHr + ":" + currMin);
	
	document.getElementById("set").disabled = true;
	document.getElementById("hour").disabled = true;
	document.getElementById("minute").disabled = true;
	
	if(guessedHr == currHr && guessedMin == currMin){
		ansCorrectInLvl++;
		generateConfBox(true);
		updateStatusBar();
		
		updateLevel();
	}
	else {
		ansWrongInLvl++;
		generateConfBox(false);
	}
	
}

/*
 *  updateLevel()
 *  Description: Checks if the player's level needs incremented. Returns true if so, false otherwise
 *				 Ends the game (calls endGame()) if done with level 4. Also writes level statistics
 *				 to currUser object. If level is -1 upon returning, the game is over.
 *	Params: none
 *  Return: boolean - whether or not the player advanced in level
 */
function updateLevel(){
	if(level == 1 && ansCorrectInLvl >= lvl1req){ 
		level = 2; 
		generateOverlay("Awesome!!!",
			"You leveled up! You are now on level 2!");
			
		currUser.lvl1 = ansWrongInLvl;
			
		ansCorrectInLvl = 0;
		ansWrongInLvl = 0;
		return true; 
	}
	else if(level == 2 && ansCorrectInLvl >= lvl2req){ 
		level = 3; 
		generateOverlay("Great Job!!!",
			"You leveled up! You are now on level 3!");
			
		currUser.lvl2 = ansWrongInLvl;
		
		ansCorrectInLvl = 0;
		ansWrongInLvl = 0;
		return true; 
	}
	else if(level == 3 && ansCorrectInLvl >= lvl3req){ 
		level = 4; 
		generateOverlay("Good Work!!!",
			"You leveled up! You are now on level 4! Only one level left!");
			
		currUser.lvl3 = ansWrongInLvl;
		
		ansCorrectInLvl = 0;
		ansWrongInLvl = 0;
		return true; 
	}
	else if(level == 4 && ansCorrectInLvl >= lvl4req){ 
		level = -1;
		generateOverlay("Congratulations!!!",
			"You beat the game!");
			
		currUser.lvl4 = ansWrongInLvl;
		
		ansCorrectInLvl = 0;
		ansWrongInLvl = 0;
		return true; 
	}
	return false;
}

/*
 *  updateStatusBar()
 *  Description: Updates the progress of the level.
 *	Params: none
 *  Return: none
 */
function updateStatusBar(){
	var statusBarElem = document.getElementById("prgrssBar");
	var percent;
	
	if(level == 1 || level == 2){
		percent = Math.ceil((ansCorrectInLvl/lvl1req) * 100);
	}
	else if(level == 3 || level == 4){
		percent = Math.ceil((ansCorrectInLvl/lvl3req) * 100);
	}
	else{
		percent = 100;
	}
	
	statusBarElem.style.width =  percent + "%";
	
	if(percent == 0){
		statusBarElem.innerHTML = "";
	}
	else {
		statusBarElem.innerHTML = percent + "%";
	}
}

/*
 *  generateConfBox()
 *  Description: Notifies the user of whether their answer was correct or incorrect.
 *	Params: isCorrect - whether the answer was correct
 *  Return: none
 */
function generateConfBox(isCorrect){
	var confElem = document.getElementById("conf");
	var confTextElem = document.getElementById("confText");
	
	if(isCorrect){
		confTextElem.innerHTML = "Correct!!!";
		confElem.style.border = "5px solid green";
		confElem.style.backgroundColor = "green";
		confElem.style.display = "block";
		return;
	}
	confTextElem.innerHTML = "Try again.";
	confElem.style.border = "5px solid red";
	confElem.style.backgroundColor = "red";
	confElem.style.display = "block";
}

/*
 *  generateOverlay()
 *  Description: Generates a message for the overlay box.
 *	Params: title - the title of the message
 *			text - the body of the message
 *  Return: none
 */
function generateOverlay(title, text){
	document.getElementById("overlayClose").innerHTML = "X";
	document.getElementById("login").style.display = "none";
	document.getElementById("overlayTitle").innerHTML = title;
	document.getElementById("overlayText").innerHTML = text;
	document.getElementById("overlay").style.width = "100%";
}

/*
 *  generateOverlayLogin()
 *  Description: Displays the login screen.
 *	Params: none
 *  Return: none
 */
function generateOverlayLogin(){
	document.getElementById("overlayClose").innerHTML = "";
	document.getElementById("overlayTitle").innerHTML = "Welcome!";
	document.getElementById("overlayText").innerHTML = 
		"Please enter your first and last name.";
	document.getElementById("login").style.display = "block";
	document.getElementById("overlay").style.width = "100%";
}

/*
 *  closeOverlay()
 *  Description: Closes the overlay
 *	Params: none
 *  Return: none
 */
function closeOverlay(){
	document.getElementById("overlay").style.width = 0;
	
	// A sneaky way to check if we leveled up
	if(level > 1){
		updateStatusBar();
	}
	else if(level == -1){
		endGame();
	}
}

/*
 *  isOverlayClosed()
 *  Description: Checks if the overlay is closed.
 *	Params: none
 *  Return: boolean - whether the overlay is closed
 */
function isOverlayClosed(){
	if(document.getElementById("overlay").style.width == 0){ return true; }
	return false;
}

/*
 *  randInt()
 *  Description: Returns a random integer within the specified range.
 *	Params: min - the low bound, inclusive
 *			max - the high bound, exclusive
 *  Return: integer - the generated value
 */
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function saveData(num, object) {
	var name = "user" + num;
	//converts to JSON string the Object
	object = JSON.stringify(object);
	//creates a base-64 encoded ASCII string
	object = btoa(object);
	//save the encoded accout to web storage
	sessionStorage.setItem(name, object);
}