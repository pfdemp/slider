function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}
	var blank;
	var numtry = 0;
	var slidesound = new sound("goodtile.mp3");
	var errorsound = new sound("badtile.mp3");
	var winsound = new sound("win.mp3");
	var pics = document.getElementsByClassName("tiles");
	var picsrc = new Array();
	for (var oimg=0; oimg < 9; oimg++) {picsrc.push(pics[oimg].src)}
	blankpic = new Image();
	blankpic.src = "blank.jpg";
	var finalpiece = picsrc[2];
	picsrc[2] = blankpic.src;
	adjoin = new Array(9);
	adjoin[0]="13";
	adjoin[1]="024";
	adjoin[2]="15";
	adjoin[3]="046";
	adjoin[4]="1357";
	adjoin[5]="248";
	adjoin[6]="37";
	adjoin[7]="468";
	adjoin[8]="57";

function StartGame() {
	gamenotstarted = false;
	numtry = 0;
	for (var img=0; img < 9; img++) {document.getElementById("i" + img).src = picsrc[img]}
	document.getElementById("i2").src = blankpic.src;
	document.getElementById("movenum").innerHTML = "&nbsp;";
	blank = 2;
	for (var sloop=0; sloop < 100; sloop++) {
		index = Math.floor(Math.random() * adjoin[blank].length);
		movepic = adjoin[blank].charAt(index);
		document.getElementById("i" + blank).src = document.getElementById("i" + movepic).src;
		document.getElementById("i" + movepic).src = blankpic.src;
		blank = movepic;
		}
	document.game.numtry.value = "";
	document.game.message.value = "Good luck!";
	}	// end function StartGame

function MoveCard(imgnum) {
	if (gamenotstarted) {StartGame()}
	else {
		if (adjoin[blank].indexOf(imgnum) > -1) {
			numtry++;
			slidesound.play();
			document.getElementById("movenum").innerHTML = numtry;
			document.getElementById("i" + blank).src = document.getElementById("i" + imgnum).src;
			document.getElementById("i" + imgnum).src = blankpic.src;
			blank = imgnum;
			}
		else {errorsound.play()}
		complete = true;
		for (var img=1; img < 9; img++) {
			if (document.getElementById("i" + img).src != picsrc[img]) {complete = false}
			}
		if (complete) {
			gamenotstarted = true;
			document.getElementById("i2").src = finalpiece;
			winsound.play();
			}
		}
	}	// end function MoveCard

gamenotstarted = true;
