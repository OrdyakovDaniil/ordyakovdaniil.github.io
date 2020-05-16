const ToRadian = Math.PI/180;
const ToAngle = 180/Math.PI;
const Circle = Math.PI*2;

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

function AngleDiff(angle1, angle2)
{
    return ((((angle1 - angle2) % Circle) + 9.42) % Circle) - 3.14;
}

function View(x0,y0,rayAngle, alpha, x, y)
{
    var rq0 = Math.abs((x0-x) + (y0-y));
	var pointAngle = Math.atan2(y-y0,x-x0)*ToAngle;
    return (rq0<=500 && (AngleDiff(pointAngle, rayAngle - alpha) > 0 && AngleDiff(pointAngle, rayAngle + alpha) < 0));
}
function lerp (start, end, amt){
	return (1-amt)*start+amt*end;
}
function wrapText(context, text, x, y, maxWidth, lineHeight) { //функия отрисовки многострочного текста
	var words = text.split(" ");
	var countWords = words.length;
	var line = "";
	for (var n = 0; n < countWords; n++) {
		var testLine = line + words[n] + " ";
		var testWidth = context.measureText(testLine).width;
		if (testWidth > maxWidth || words[n]==">") {
			context.fillText(line, x, y);
			line = words[n] + " ";
			y += lineHeight;
		}
		else {
			line = testLine;
		}
	}
	context.fillText(line, x, y);
}
function multilineText(context, text, x, y, height) {
	var strings = text.split("[n]");
	for (var i = 0; i < strings.length; ++i) {
		context.fillText(strings[i], x, y+(i*height));
	}
}
function secondsToTime(seconds) {
	var h = seconds/3600 ^ 0;
	var m = (seconds-h*3600)/60 ^ 0;
	var s = seconds-h*3600-m*60;
	return (h==0?"":h+" ч. ")+(m==0?"":m+" мин. ")+(s==0?"":s+" сек.");
}
function trunc(num, count) {
	var str = String(num);
	var arr = str.split(".");
	return (arr[1]==undefined) ? num : parseFloat(arr[0].concat(".",arr[1].slice(0, count)));
}
function getRadianBetween(object1, object2) {
	return Math.atan2(object2.y-object1.y, object2.x-object1.x);
}
function getDistance(object1, object2) {
	return Math.floor(Math.sqrt(Math.floor((object2.x-object1.x)*(object2.x-object1.x)+(object2.y-object1.y)*(object2.y-object1.y))));
}
function dotInPoly(polyCords, dot)
{
	var i, j, c = false;
	for (i=0, j=polyCords.length-1; i<polyCords.length; j=i++)
	{
		if (((polyCords[i].y>dot.y)!=(polyCords[j].y>dot.y))&&(dot.x<(polyCords[j].x-polyCords[i].x)*(dot.y-polyCords[i].y)/(polyCords[j].y-polyCords[i].y)+polyCords[i].x))
		{
			c = !c;
		}
	}
	return c;
}
function sqrt(x) {
	var b;
	var m = 0x4000;
	var y = 0;
	while (m != 0){
		b = y | m;
		y = y >> 1;
		if (x >= b) {
			x = x - b;
			y = y | m;
		}
		m = m >> 2;
	}
	return y;
}
function ctxStroke() {ctx.stroke(); ctx.closePath();}
function ctxFill() {ctx.fill(); ctx.closePath();}
function ctxDraw() {ctx.fill(); ctx.stroke(); ctx.closePath();}
function guiStroke() {ctxGUI.stroke(); ctxGUI.closePath();}
function guiFill() {ctxGUI.fill(); ctxGUI.closePath();}
function guiDraw() {ctxGUI.fill(); ctxGUI.stroke(); ctxGUI.closePath();}