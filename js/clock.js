/*
 *	All credit to W3Schools for clock design and code
 *	Personal modifications where noted
 *  Begin W3Schools material
 */

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
drawClock();

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  
  //drawTime(ctx, radius, date);
  
  // Function drawTicks() is a personal addition and not from W3
  drawTicks(ctx, radius);
}

function drawFace(ctx, radius) {

  // Draw white inner circle
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  
  // Draw outer ring
  ctx.lineWidth = radius*0.05;
  ctx.stroke();
  
  // Draw center dot
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.075, 0, 2*Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius, now){
	
    //var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
	
    // hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    
    // minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

/*
 *  End W3Schools material
 *  Begin personal work
 */
 
 // Draws a new clock using time from a date object
 function drawNewClock(date) {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius, date);
  drawTicks(ctx, radius);
}

// Draws 60 ticks around the clock
function drawTicks(ctx, radius){
  var tick;
  var ang;
  
  for(tick = 0; tick <= 60; tick++){
    ang = tick * Math.PI / (30);
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.97);
    ctx.rotate(-ang);
    
    ctx.beginPath();
    ctx.lineWidth = radius*0.03;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.lineTo(findXPos(tick), findYPos(tick));
    ctx.stroke();
    
    ctx.rotate(ang);
    ctx.translate(0, radius*0.97);
    ctx.rotate(-ang);
  }
}

// Information on findXPos and findYPos:
//   Both functions are being used to determine to what point to draw the line
//   Since each line has a different angle, the coordinates need to be calculated separately
//   12 hour tick is 0, 5
//   3 hour tick is -5, 0
//   6 hour tick is 0, -5
//   9 hour tick is 5, 0
//   Each tick in between the 12, 3, 6, 9 ticks change by 5 * 1/15, since the line is 5 long

function findXPos(tick){
  var ret = 0;
  
  if(tick <= 15){ ret = 0 - (tick * (5/15)); }
  else if(tick <= 45){ ret = -5 + ((tick - 15) * (5/15)); }
  else { ret = 5 - ((tick - 45) * (5/15)); }
  
  return ret;
}

function findYPos(tick){
  var ret = 0;
  
  if(tick <= 30){ ret = 5 - (tick * (5/15)); }
  else { ret = -5 + ((tick - 30) * (5/15)); }
  
  return ret;
}










