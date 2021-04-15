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
	blankpic.src = "dragon-puzzle-01-2_00.jpg";
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
	var pickgames = [[00,06,05,01,04,08,02,07,09],[04,01,05,06,08,07,09,02,00],[01,08,02,04,09,07,05,06,00],[00,06,07,01,04,02,05,09,08],[05,09,04,07,00,08,06,02,01],[00,01,06,07,02,04,08,09,05],[05,09,07,01,02,06,00,04,08],[07,06,05,02,04,09,00,01,08],[01,05,02,04,08,07,00,09,06],[05,01,06,02,00,04,08,07,09]];

function right(str,chr){return newstr=str.substr(str.length-chr,str.length)}

function StartGame(gameoption) {
	if (gameoption != "X"){
		gamenotstarted = false;
		numtry = 0;
		document.getElementById("fw").classList.remove('fireworks-show');
		for (var img=0; img < 9; img++) {document.getElementById("i" + img).src = picsrc[img]}
		document.getElementById("i2").src = blankpic.src;
		document.getElementById("movenum").innerHTML = "&nbsp;";
		blank = 2;
	}
	if (gameoption == 99) {
		for (var sloop=0; sloop < 100; sloop++) {
			index = Math.floor(Math.random() * adjoin[blank].length);
			movepic = adjoin[blank].charAt(index);
			document.getElementById("i" + blank).src = document.getElementById("i" + movepic).src;
			document.getElementById("i" + movepic).src = blankpic.src;
			blank = movepic;
			}
		} else {
			gameboard = pickgames[gameoption];
			for (var img=0; img < 9; img++) {
				document.getElementById("i" + img).src = "dragon-puzzle-01-2_0" + gameboard[img] + ".jpg";
				if (gameboard[img] == 0) {blank = img}
			}
		}

	
//	var picgame = new Array();
//	for (var oimg=0; oimg < 9; oimg++) {picgame.push(right(pics[oimg].src,6))}
//	document.getElementById("tiles").value = picgame.join();
	}	// end function StartGame

function MoveCard(imgnum) {
	if (gamenotstarted) {alert("Game over!")}
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
			document.getElementById("fw").classList.add('fireworks-show');
			}
		}
	}	// end function MoveCard

gamenotstarted = true;
