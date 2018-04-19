// Constants
const masterPass = 1686777033;

// Global variables

var data = [];

// Begin website functions
init();

function init(){
	generateOverlayLogin();
	
	var i = 0;
	while(loadData(i)){ i++; }
	
	drawTable();
}

function checkPassword(){
	var passwrd = document.getElementById("password").value;
	if(passwrd.hashCode() == masterPass){
		closeOverlay();
	}
	else {
		var textElem = document.getElementById("overlayText");
		textElem.style.color = "red";
		textElem.innerHTML = "Incorrect password. Try again.";
	}
}

/*
 *  generateOverlayLogin()
 *  Description: Displays the login screen.
 *	Params: none
 *  Return: none
 */
function generateOverlayLogin(){
	document.getElementById("overlayClose").innerHTML = "";
	document.getElementById("overlayTitle").innerHTML = "Statistics Login";
	document.getElementById("overlayText").innerHTML = 
		"Please enter the correct password.";
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
	document.getElementById("statsBody").style.display = "block";
}

function showGraphs(){
	
}

function showTable(){
	
}

function drawGraphs(){
	
}

function drawTable(){
	var html = "<tr><th>Firstname</th><th>Lastname</th>";
	html += "<th>Level 1</th><th>%</th><th>Level 2</th><th>%</th><th>Level 3</th><th>%</th>";
	html += "<th>Level 4</th><th>%</th><th>Total</th><th>%</th></tr>";
	
	var i;
	for(i = 0; i < data.length; i++){
		html += "<tr><td>" + data[i].fname + "</td><td>" + data[i].lname + "</td><td>";
		html += "5/" + (5 + data[i].lvl1) + "</td><td>" + Number(100 * (5/(5 + data[i].lvl1))).toFixed(2) + "%" + "</td><td>";
		html += "5/" + (5 + data[i].lvl2) + "</td><td>" + Number(100 * (5/(5 + data[i].lvl2))).toFixed(2) + "%" + "</td><td>";
		html += "10/" + (10 + data[i].lvl3) + "</td><td>" + Number(100 * (10/(10 + data[i].lvl3))).toFixed(2) + "%" + "</td><td>";
		html += "10/" + (10 + data[i].lvl4) + "</td><td>" + Number(100 * (10/(10 + data[i].lvl4))).toFixed(2) + "%" + "</td><td>";
		html += "30/" + (30 + data[i].lvl1 + data[i].lvl2 + data[i].lvl3 + data[i].lvl4) + "</td><td>";
		html += Number(100 * (30 / (30 + data[i].lvl1 + data[i].lvl2 + data[i].lvl3 + data[i].lvl4))).toFixed(2) + "%" + "</td></tr>";
	}
	
	document.getElementById("dataTable").innerHTML = html;
}

/* Javascript implementation of Java's hash function */
/* Credit: http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery/7616484#7616484 */
String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function loadData(num) {
	var name = "user" + num;
	var user = sessionStorage.getItem(name);
	if (!user) return false;
	//localStorage.removeItem(name);
	//decodes a string data encoded using base-64
	user = atob(user);
	//parses to Object the JSON string
	user = JSON.parse(user);
	//do what you need with the Object
	data.push(user);
	return true;
}