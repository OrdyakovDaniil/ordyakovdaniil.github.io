document.getElementById("window").innerHTML = '<canvas id="Game" width=1280 height=720></canvas><canvas id="Interface" width=1280 height=720></canvas>';
var menu = document.getElementById('menu');
var canvas = document.getElementById("Game");
var ctx = canvas.getContext("2d");
var canvasGUI = document.getElementById("Interface");
var ctxGUI = canvasGUI.getContext("2d");
var gameState=0;
var menuState = [
'<div id="head">Just Survive Somehow</div><input id="btnStart" type="button" value="Загрузить игру" onclick="loadGame()"><input id="btnNewGame" type="button" value="Начать новую игру" onclick="newGame()"><div id="bottom">made by Ordyakov</div>',
'<div id="head">Just Survive Somehow</div><input id="btnStart" type="button" value="Начать игру" onclick="newGame()"><div id="bottom">made by Ordyakov</div>',
'<input id="btnStart" type="button" value="Продолжить" onclick="continueGame()"><input id="btnSave" type="button" value="Сохранить" onclick="saveGame()">'
];
if (localStorage.getItem("JSS")!=null) {
	menu.innerHTML=menuState[0];
} else {
	menu.innerHTML=menuState[1];
}
main();
//setInterval(main,1000/45);
function main() {
	switch (gameState) {
		case 1:
		updateGame();
		drawGame();
		break;
		case 2: //пауза
		drawGame();
		break;
		case 3: //смерть
		drawGame();
		drawEndGame();
		break;
	}
	requestAnimationFrame(main);
}
function newGame() {
	gameState=1;
	menu.style.display='none';
	canvasGUI.style.cursor='none';
	localStorage.removeItem("JSS");
}
function saveGame() {
	gameState=1;
	menu.style.display='none';
	canvasGUI.style.cursor='none';
	saveObjects();
}
function loadGame() {
	gameState=1;
	menu.style.display='none';
	canvasGUI.style.cursor='none';
	loadObjects();
}
function continueGame() {
	gameState=1;
	menu.style.display='none';
	canvasGUI.style.cursor='none';
}
function pauseGame() {
	gameState=2; //переход на паузу во время игры при нажатии Esc
	menu.style.display='block';
	canvasGUI.style.cursor="default";
	menu.innerHTML=menuState[2];
}
