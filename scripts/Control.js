var control = {
	up:false, down:false, left:false, right:false,
	shift:false, use:false, Lbtn:false, reload:false,
	tab:false, q:false
}
function keyDownHandler(e) {
	switch (gameState) {
		case 1: //игра
			if (player.weight<=player.maxWeight||control.tab) {
				switch (e.code) {
					case "KeyW": control.up=true; break;
					case "KeyS": control.down=true; break;
					case "KeyA": control.left=true; break;
					case "KeyD": control.right=true; break;
					case "ShiftLeft": control.shift=true; break;
				break;
				}
			} else {
				control.up=false; control.down=false; control.left=false; control.right=false; control.shift=false;
			}
		break;
	}
}
function keyUpHandler(e) {
	switch (gameState) {
		case 1: //игра
			switch (e.code) {
				case "Escape":
				pauseGame();
				break;
				case "KeyQ": control.q=true; break;
				case "Tab":
				if (control.tab) {
					control.tab=false;
					sound_bagClose.play();
				} else {
					control.tab=true;
					sound_bagOpen.play();
					camera.zoom=15;
				}
				break;
				case "KeyW": control.up = false; break;
				case "KeyS": control.down = false; break;
				case "KeyA": control.left = false; break;
				case "KeyD": control.right = false; break;
				case "KeyR": control.reload = true; break;
				case "KeyE": control.use = true; break;
				case "ShiftLeft": control.shift = false; break;
				case "Digit1": if (player.beltLen>0&&player.itemBelt!=0) {player.itemBelt=0; stophit();} break;
				case "Digit2": if (player.beltLen>1&&player.itemBelt!=1) {player.itemBelt=1; stophit();} break;
				case "Digit3": if (player.beltLen>2&&player.itemBelt!=2) {player.itemBelt=2; stophit();} break;
				case "Digit4": if (player.beltLen>3&&player.itemBelt!=3) {player.itemBelt=3; stophit();} break;
				case "Digit5": if (player.beltLen>4&&player.itemBelt!=4) {player.itemBelt=4; stophit();} break;
				case "Digit6": if (player.beltLen>5&&player.itemBelt!=5) {player.itemBelt=5; stophit();} break;
				case "Digit7": if (player.beltLen>6&&player.itemBelt!=6) {player.itemBelt=6; stophit();} break;
				case "Digit8": if (player.beltLen>7&&player.itemBelt!=7) {player.itemBelt=7; stophit();} break;
				case "Digit9": if (player.beltLen>8&&player.itemBelt!=8) {player.itemBelt=8; stophit();} break;
			}
		break;
		case 2: //пауза
			switch (e.code) {
				case "Escape":
				gameState=1; //выход из паузы
				menu.style.display='none';
				canvasGUI.style.cursor="none";
				break;
			}
		break;
	}
}

function mouseMove(e) {
	cursor.wX=e.clientX;
	cursor.wY=e.clientY;
}
function mouseDown(e) {
	switch (gameState) {
		case 1: //игра
			switch (e.which) {
				case 1: control.Lbtn = true; break;
				case 3:
				if (!control.tab) camera.zoom = canvas.height/4;
				break;
			}
		break;
	}
}
function mouseUp(e) {
	switch (gameState) {
		case 1: //игра
			switch (e.which) {
				case 1: control.Lbtn = false; break;
				case 3:
				if (!control.tab) camera.zoom = 15;
				break;
			}
		break;
	}
}
function mouseWheel(event) {
	var delta = 0;
	if (event.wheelDelta) { // IE, Opera, safari, chrome - кратность дельта равна 120
		delta = event.wheelDelta/120;
	} else if (event.detail) { // Mozilla, кратность дельта равна 3
		delta = -event.detail/3;
	}
	switch (gameState) {
		case 1:
			stophit();
			player.itemBelt+=(delta>0)?-1:1;
			if (player.itemBelt<0) player.itemBelt=player.beltLen-1;
			if (player.itemBelt>=player.beltLen) player.itemBelt=0;
			return;
		break;
	}
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMove, false);
document.addEventListener("mousedown", mouseDown, false);
document.addEventListener("mouseup", mouseUp, false);
document.addEventListener("mousewheel", mouseWheel, false);
window.oncontextmenu = function () {return false;}
