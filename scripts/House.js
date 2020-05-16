function newWall(x,y,width,height,type) {
	var wall = new Object();
	wall.type=type;
	wall.x=x; wall.y=y;
	wall.width=width;
	wall.height=height;
	return wall;
}
function newFloor(x,y,width,height) {
	var floor=new Object();
	floor.x=x; floor.y=y;
	floor.width=width;
	floor.height=height;
	return floor;
}
function newWindow(x,y,width,height) {
	var okno=new Object();
	okno.x=x; okno.y=y;
	okno.width=width;
	okno.height=height;
	okno.whole=true; //целое окно
	return okno;
}
function newDoor(x,y,width,height,closeradian,openradian) {
	var door=new Object();
	door.width=width; //ширина двери
	door.height=height; //толщина двери
	door.x=x; door.y=y;
	door.points=[{x:x,y:y},{x:x,y:y},{x:x,y:y},{x:x,y:y}]; //для колизии и отрисовки тени
	door.closeradian=closeradian;
	door.openradian=openradian;
	door.open=false;
	door.radian=closeradian;
	door.handle={x:x+width/2*Math.cos(closeradian),y:y+width/2*Math.sin(closeradian)};
	return door;
}
function newRoof(x,y,width,height) {
	var roof=new Object();
	roof.x=x; roof.y=y;
	roof.width=width; roof.height=height;
	return roof;
}
function drawWall(wall) {
	var style=["#531","#722"]
	ctx.beginPath(); ctx.fillStyle=style[wall.type];
	ctx.rect(wall.x,wall.y,wall.width,wall.height);
	ctxFill();
	if (wall.type==1) {
		ctx.beginPath(); ctx.lineWidth=1; ctx.strokeStyle="#444"; ctx.lineCap="butt";
		var hBrick=5; //высота кирпича
		var wBrick=10; //ширина кирпича
		var h=Math.floor(wall.height/hBrick);
		var w=Math.floor(wall.width/wBrick);
		for (var l=0; l<h; ++l) {
			ctx.beginPath(); ctx.moveTo(wall.x, wall.y+l*hBrick);
			ctx.lineTo(wall.x+wall.width, wall.y+l*hBrick);
			ctxStroke();
			for (var v=0; v<w; ++v) {
				ctx.beginPath(); ctx.moveTo((l%2==0?wBrick/2:1)+wall.x+v*wBrick, wall.y+l*hBrick);
				ctx.lineTo((l%2==0?wBrick/2:1)+wall.x+v*wBrick, wall.y+l*hBrick+hBrick);
				ctxStroke();
			}
		}
	}
}
function drawFloor(floor) {
	ctx.beginPath(); ctx.fillStyle="#642"; ctx.strokeStyle="#531";
	ctx.rect(floor.x,floor.y,floor.width,floor.height);
	ctxFill(); ctx.beginPath(); ctx.lineWidth=1; ctx.lineCap="butt";
	var hBoard=10; //высота доски
	var wBoard=100; //ширина доски
	var h=Math.floor(floor.height/hBoard);
	var w=Math.floor(floor.width/wBoard);
	for (var l=0; l<h; ++l) {
		ctx.beginPath(); ctx.moveTo(floor.x, floor.y+l*hBoard);
		ctx.lineTo(floor.x+floor.width, floor.y+l*hBoard);
		ctxStroke();
		for (var v=0; v<w; ++v) {
			ctx.beginPath(); ctx.moveTo((l%2==0?wBoard/2:1)+floor.x+v*wBoard, floor.y+l*hBoard);
			ctx.lineTo((l%2==0?wBoard/2:1)+floor.x+v*wBoard, floor.y+l*hBoard+hBoard);
			ctxStroke();
		}
	}
}
function drawWindow(wd) {
	ctx.beginPath(); ctx.fillStyle="#6a4a2a";
	ctx.rect(wd.x,wd.y,wd.width,wd.height);
	ctxFill(); ctx.beginPath();
	ctx.strokeStyle="rgba(150,250,250,0.2)";
	ctx.lineWidth=5; ctx.lineCap="butt";
	if (wd.whole) {
		if (wd.width>wd.height) {
			ctx.moveTo(wd.x,wd.y+wd.height/2);
			ctx.lineTo(wd.x+wd.width,wd.y+wd.height/2);
		} else {
			ctx.moveTo(wd.x+wd.width/2,wd.y);
			ctx.lineTo(wd.x+wd.width/2,wd.y+wd.height);
		}
	} else {
		if (wd.width>wd.height) {
			ctx.moveTo(wd.x,wd.y+wd.height/2);
			ctx.lineTo(wd.x+10,wd.y+wd.height/2);
			ctxStroke(); ctx.beginPath();
			ctx.moveTo(wd.x+wd.width,wd.y+wd.height/2);
			ctx.lineTo(wd.x+wd.width-10,wd.y+wd.height/2);
		} else {
			ctx.moveTo(wd.x+wd.width/2,wd.y);
			ctx.lineTo(wd.x+wd.width/2,wd.y+10);
			ctxStroke(); ctx.beginPath();
			ctx.moveTo(wd.x+wd.width/2,wd.y+wd.height);
			ctx.lineTo(wd.x+wd.width/2,wd.y+wd.height-10);
		}
	}
	ctxStroke();
}
function drawDoor(door) {
	door.radian=door.open?lerp(door.radian,door.openradian,0.05):lerp(door.radian,door.closeradian,0.1);
	door.points[1].x=door.x+door.width*Math.cos(door.radian);
	door.points[1].y=door.y+door.width*Math.sin(door.radian);
	door.points[2].x=door.points[1].x+door.height*Math.cos(door.radian-1.57);
	door.points[2].y=door.points[1].y+door.height*Math.sin(door.radian-1.57);
	door.points[3].x=door.points[2].x+door.width*Math.cos(door.radian-3.14);
	door.points[3].y=door.points[2].y+door.width*Math.sin(door.radian-3.14);
	ctx.beginPath(); ctx.fillStyle="#420";
	ctx.moveTo(door.x,door.y); ctx.lineTo(door.points[1].x,door.points[1].y);
	ctx.lineTo(door.points[2].x,door.points[2].y); ctx.lineTo(door.points[3].x,door.points[3].y);
	ctxFill();
}
function drawRoof(roof) {
	var fill=["rgb(80,80,80)","rgb(100,100,100)","rgb(120,120,120)"]; var f=0;
	var wCh=50; hCh=30; //ширина и высота черепицы
	var countX=Math.floor(roof.width/wCh);
	var countY=Math.floor(roof.height/hCh);
	ctx.strokeStyle="#444"; ctx.lineWidth=1; ctx.lineCap="butt";
	for (var y=0; y<countY;++y) {
		if (y%2==0) {
			ctx.beginPath(); ctx.fillStyle=fill[f]; f=(f==fill.length-1)?0:f+1;
			ctx.rect(roof.x,roof.y+hCh*y,wCh/2,hCh);
			ctxDraw();
		}
		for (var x=0; x<countX;++x) {
			ctx.beginPath(); ctx.fillStyle=fill[f]; f=(f==fill.length-1)?0:f+1;
			ctx.rect(roof.x+(y%2==0?wCh/2:0)+wCh*x,roof.y+hCh*y,(y%2==0&&x==countX-1?wCh/2:wCh),hCh);
			ctxDraw();
		}
	}
	ctx.beginPath(); ctx.fillStyle="rgba(0,0,0,0.4)";
	ctx.rect(roof.x,roof.y,roof.width,roof.height/2);
	ctxFill();
}
var walls=[];
var gWalls=[];
var pWalls=[];

var floors=[];
var gFloors=[];
var pFloors=[];

var windows=[];
var gWindows=[];
var pWindows=[];

var doors=[];
var gDoors=[];
var pDoors=[];
var nearDoorID=0;

var roofs=[];
var gRoofs=[];
var pRoofs=[];

var idRoof=-1;