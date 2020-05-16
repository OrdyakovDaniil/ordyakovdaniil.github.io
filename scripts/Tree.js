function newTree(x,y,radius) {
	var tree = new Object();
	tree.x=x; tree.y=y;
	tree.radius=radius;
	tree.radian = []; //угол ветки
	tree.lengthT = []; //длина ветки
	tree.width = []; //ширина ветки
	tree.coordsX=[];
	tree.coordsY=[];
	for (var i = 0; i <= randomInt(3,5); ++i) {
		tree.radian[i] = randomFloat(0,Circle);
		tree.lengthT[i] = randomInt(40,tree.radius*6);
		tree.width[i] = Math.floor(tree.lengthT[i]/7);
	}
	for (var i = tree.radian.length - 1; i >= 0; i--) {
		tree.coordsX[i]=Math.floor(tree.x+tree.lengthT[i]*Math.cos(tree.radian[i]));
		tree.coordsY[i]=Math.floor(tree.y+tree.lengthT[i]*Math.sin(tree.radian[i]));
	}
	return tree;
}
function drawTree(tree) {
	ctx.beginPath(); ctx.lineCap="round"; ctx.strokeStyle="#693823";
	for (var i = 0; i < tree.radian.length; ++i) {	
		ctx.lineWidth = tree.width[i];
		ctx.moveTo(tree.x,tree.y);
		ctx.lineTo(tree.coordsX[i], tree.coordsY[i]);
		ctx.stroke(); ctx.closePath(); ctx.beginPath();
		/*var grad = ctx.createRadialGradient(tree.coordsX[i], tree.coordsY[i], Math.floor(tree.lengthT[i]/3), tree.coordsX[i], tree.coordsY[i], 1);
		grad.addColorStop(1, "rgb(53,104,45)"); grad.addColorStop(0, "rgb(40,80,25)");
		ctx.fillStyle=grad;*/
		ctx.fillStyle="rgb(53,104,45)";
		ctx.arc(tree.coordsX[i], tree.coordsY[i], Math.floor(tree.lengthT[i]/3), 0, Circle);
		ctxFill(); ctx.beginPath();
	}
	ctx.fillStyle="#422316";
	ctx.arc(tree.x,tree.y,tree.radius,0,Circle);
	ctxFill(); ctx.beginPath();
	ctx.fillStyle="rgba(53,104,45,0.6)";
	ctx.arc(tree.x, tree.y, Math.floor(tree.radius*7), 0, Circle);
	ctxFill();
}

var trees = []; //деревья вокруг игрока
var gTrees = []; //хранилище деревьев
var pTrees = []; //массив деревьев для коллизии с игроком