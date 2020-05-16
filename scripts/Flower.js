function newFlower(x,y) {
	var flower = new Object();
	flower.x=x; flower.y=y;
	var colorsL = ["#990", "#999", "#669", "#966"];
	var colorsC = ["#fff", "#ff0", "#006", "#633"];
	var r = randomInt(0,colorsL.length-1);
	flower.colorL=colorsL[r]; //цвет лепестков
	flower.colorC=colorsC[r]; //цвет сердцевины
	flower.countL=randomInt(5,10); //кол-во лепестков
	return flower;
}
function drawFlower(flower) {
	ctx.fillStyle=flower.colorL;
	for (var l=0;l<flower.countL;++l) {
		ctx.beginPath(); var rad = l*(Circle/flower.countL);
		ctx.moveTo(flower.x, flower.y);
		ctx.bezierCurveTo(flower.x+5*Math.cos(rad+0.5),flower.y+5*Math.sin(rad+0.5), flower.x+10*Math.cos(rad),flower.y+10*Math.sin(rad), flower.x+5*Math.cos(rad-0.5),flower.y+5*Math.sin(rad-0.5));
		ctxFill();
	}
	ctx.beginPath(); ctx.fillStyle=flower.colorC;
	ctx.arc(flower.x, flower.y, 2, 0, Circle);
	ctxFill();
}
var flowers = [];
var gFlowers = [];