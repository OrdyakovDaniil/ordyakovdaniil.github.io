function newDivan(x,y) { //диван
	var divan=new Object();
	divan.x=x; divan.y=y;
	divan.width=121; divan.height=40;
	return divan;
}
function drawDivan(divan) {
	ctx.beginPath(); ctx.fillStyle="#543";
	ctx.rect(divan.x,divan.y,121,40);
	ctxFill();
	ctx.beginPath();ctx.strokeStyle="#765"; ctx.lineWidth=10; ctx.lineCap="round";
	ctx.moveTo(divan.x+2,divan.y); ctx.lineTo(divan.x+2,divan.y+40);
	ctxStroke(); ctx.beginPath();
	ctx.moveTo(divan.x+119,divan.y); ctx.lineTo(divan.x+119,divan.y+40);
	ctxStroke(); ctx.beginPath(); ctx.strokeStyle="#876";
	ctx.moveTo(divan.x,divan.y); ctx.lineTo(divan.x+121,divan.y);
	ctxStroke();
	for (var c=0; c<3; ++c) {
		var smx=c*35;
		ctx.beginPath(); ctx.fillStyle="#654"; ctx.lineWidth=1; ctx.strokeStyle="#543";
		ctx.arc(smx+divan.x+13,divan.y+11,5,3.14,4.71);
		ctx.lineTo(smx+divan.x+38,divan.y+6);
		ctx.arc(smx+divan.x+38,divan.y+11,5,4.71,0);
		ctx.lineTo(smx+divan.x+43,divan.y+36);
		ctx.arc(smx+divan.x+38,divan.y+36,5,0,1.57);
		ctx.lineTo(smx+divan.x+13,divan.y+41);
		ctx.arc(smx+divan.x+13,divan.y+36,5,1.57,3.14);
		ctx.lineTo(smx+divan.x+8,divan.y+11);
		ctxDraw(); ctx.beginPath(); ctx.fillStyle="#543";
		ctx.arc(smx+divan.x+18,divan.y+16,2,0,Circle); ctxFill(); ctx.beginPath();
		ctx.arc(smx+divan.x+33,divan.y+16,2,0,Circle); ctxFill(); ctx.beginPath();
		ctx.arc(smx+divan.x+18,divan.y+31,2,0,Circle); ctxFill(); ctx.beginPath();
		ctx.arc(smx+divan.x+33,divan.y+31,2,0,Circle); ctxFill();
	}
}
function newTable(x,y,width,height) {
	var table = new Object(); //стол
	table.x=x; table.y=y;
	table.width=width;
	table.height=height;
	return table;
}
function drawTable(table) {
	ctx.beginPath(); ctx.lineWidth=1; ctx.strokeStyle="#420"; ctx.fillStyle="#530"; ctx.lineCap="butt";
	ctx.moveTo(table.x, table.y); ctx.lineTo(table.x+table.width/5,table.y);
	ctx.bezierCurveTo(table.x+table.width/5,table.y, table.x+table.width/2,table.y+10, table.x+table.width-table.width/5, table.y);
	ctx.lineTo(table.x+table.width,table.y); ctx.lineTo(table.x+table.width, table.y+table.height/5);
	ctx.bezierCurveTo(table.x+table.width, table.y+table.height/5, table.x+table.width-10, table.y+table.height/2, table.x+table.width, table.y+table.height-table.height/5);
	ctx.lineTo(table.x+table.width, table.y+table.height); ctx.lineTo(table.x+table.width-table.width/5, table.y+table.height);
	ctx.bezierCurveTo(table.x+table.width-table.width/5, table.y+table.height, table.x+table.width/2, table.y+table.height-10, table.x+table.width/5,table.y+table.height);
	ctx.lineTo(table.x, table.y+table.height); ctx.lineTo(table.x, table.y+table.height-table.height/5);
	ctx.bezierCurveTo(table.x, table.y+table.height-table.height/5, table.x+10,table.y+table.height/2, table.x,table.y+table.height/5);
	ctx.lineTo(table.x, table.y); ctxDraw();
}
function newChest(x,y) { //шкаф
	var chest=new Object();
	chest.x=x; chest.y=y;
	chest.width=100; chest.height=30;
	return chest;
}
function drawChest(ch) {
	ctx.beginPath(); ctx.fillStyle="#734222"; ctx.strokeStyle="#593315"; ctx.lineWidth=1;
	ctx.rect(ch.x, ch.y, 100,30); ctxDraw(); ctx.beginPath(); ctx.fillStyle="#555";
	ctx.arc(ch.x+45, ch.y-6, 2, 0, Circle); ctx.arc(ch.x+53, ch.y-3, 2, 0, Circle);
	ctxFill(); ctx.beginPath(); ctx.lineWidth=3; ctx.lineCap="round"; ctx.strokeStyle="#420";
	ctx.moveTo(ch.x, ch.y-2); ctx.lineTo(ch.x+47, ch.y-5); ctxStroke(); ctx.beginPath();
	ctx.moveTo(ch.x+52, ch.y-2); ctx.lineTo(ch.x+100, ch.y-2); ctxStroke();
}
function newRack(x,y,width,height) { //стеллаж
	var rack = new Object();
	rack.x=x; rack.y=y;
	rack.width=width; rack.height=height;
	return rack;
}
function drawRack(rack, layer) {
	switch (layer) {
		case 0:
		ctx.beginPath(); ctx.fillStyle="#555";
		ctx.rect(rack.x, rack.y, rack.width, rack.height);
		ctxFill();
		break;
		case 1:
		var radiusD=3; //радиус дырки
		var cX=Math.round(rack.width/10); var cY=Math.round(rack.height/10); //количество дырок по икс и игрик
		var wp=rack.width/(cX+1); //ширина кусочка
		var hp=rack.height/(cY+1);
		ctx.beginPath(); ctx.fillStyle="#666"; ctx.strokeStyle=ctx.fillStyle; ctx.lineWidth=1; ctx.lineCap="butt";
		ctx.moveTo(rack.x,rack.y); ctx.lineTo(rack.x,rack.y+rack.height);
		ctx.lineTo(rack.x+wp,rack.y+rack.height);
		for (var eY=1; eY<=cY; ++eY) {
			ctx.arc(rack.x+wp,rack.y+rack.height-hp*eY,radiusD,1.57,4.71);
		}
		ctx.lineTo(rack.x+wp,rack.y); ctxDraw();
		ctx.beginPath(); ctx.moveTo(rack.x+wp,rack.y);
		ctx.lineTo(rack.x+wp,rack.y+hp-radiusD);
		for (var eX=1; eX<cX; ++eX) {
			ctx.arc(rack.x+wp*eX,rack.y+hp,radiusD,4.71,Circle);
			ctx.arc(rack.x+wp*(eX+1),rack.y+hp,radiusD,3.14,4.71);
		}
		ctx.lineTo(rack.x+rack.width-wp,rack.y); ctxDraw();
		if (cY>1&&cX>1) {
			for (var eY=1; eY<cY; ++eY) {
				var stY=rack.y+hp*eY;
				ctx.beginPath(); ctx.arc(rack.x+wp,stY,radiusD,0,1.57);
				ctx.arc(rack.x+wp,stY+hp,radiusD,4.71,Circle);
				for (var eX=2;eX<cX;++eX) {
					ctx.arc(rack.x+wp*eX,stY+hp,radiusD,3.14,Circle);
				}
				ctx.arc(rack.x+wp*cX,stY+hp,radiusD,3.14,4.71);
				ctx.arc(rack.x+wp*cX,stY,radiusD,1.57,3.14);
				for (var eX=cX-1;eX>1;--eX) {
					ctx.arc(rack.x+wp*eX,stY,radiusD,0,3.14);
				}
				ctxDraw();
			}
		}
		ctx.beginPath(); ctx.arc(rack.x+wp,rack.y+rack.height-hp,radiusD,0,1.57);
		ctx.lineTo(rack.x+wp,rack.y+rack.height); ctx.lineTo(rack.x+rack.width-wp,rack.y+rack.height);
		ctx.arc(rack.x+rack.width-wp,rack.y+rack.height-hp,radiusD,1.57,3.14);
		for (var eX=cX-1;eX>1;--eX) {
			ctx.arc(rack.x+wp*eX,rack.y+rack.height-hp,radiusD,0,3.14);
		}
		ctxDraw(); ctx.beginPath();
		ctx.moveTo(rack.x+rack.width-wp,rack.y);
		for (var eY=1; eY<=cY; ++eY) {
			ctx.arc(rack.x+rack.width-wp,rack.y+hp*eY,radiusD,4.71,1.57);
		}
		ctx.lineTo(rack.x+rack.width-wp,rack.y+rack.height); ctx.lineTo(rack.x+rack.width, rack.y+rack.height);
		ctx.lineTo(rack.x+rack.width,rack.y); ctxDraw(); ctx.beginPath(); ctx.fillStyle="#444";
		ctx.rect(rack.x+2,rack.y+2,3,3); ctx.rect(rack.x+rack.width-5,rack.y+rack.height-5,3,3);
		ctx.rect(rack.x+2,rack.y+rack.height-5,3,3); ctx.rect(rack.x+rack.width-5,rack.y+2,3,3); ctxFill();
		break;
	}
}
function newFireplace(x,y,width,height) {
	var fp=new Object();
	fp.x=x; fp.y=y;
	fp.width=width; fp.height=height;
	return fp;
}
function drawFireplace(fp,layer) {
	switch (layer) {
		case 0:
		ctx.beginPath(); ctx.fillStyle="#555"; ctx.strokeStyle="#444"; ctx.lineWidth=3;
		ctx.arc(fp.x+fp.width/2,fp.y+fp.height/2,(fp.width+fp.height)/5,0,Circle);
		ctxDraw();
		break;
		case 1:
		ctx.beginPath(); ctx.fillStyle="#722"; ctx.rect(fp.x,fp.y,fp.width,fp.height);
		ctxFill(); ctx.beginPath(); ctx.lineWidth=1; ctx.strokeStyle="#444"; ctx.lineCap="butt";
		var hBrick=5; //высота кирпича
		var wBrick=10; //ширина кирпича
		var h=Math.floor(fp.height/hBrick);
		var w=Math.floor(fp.width/wBrick);
		for (var l=0; l<h; ++l) {
			ctx.beginPath(); ctx.moveTo(fp.x, fp.y+l*hBrick);
			ctx.lineTo(fp.x+fp.width, fp.y+l*hBrick);
			ctxStroke();
			for (var v=0; v<w; ++v) {
				ctx.beginPath(); ctx.moveTo((l%2==0?wBrick/2:1)+fp.x+v*wBrick, fp.y+l*hBrick);
				ctx.lineTo((l%2==0?wBrick/2:1)+fp.x+v*wBrick, fp.y+l*hBrick+hBrick);
				ctxStroke();
			}
		}
		ctx.beginPath(); ctx.fillStyle="#000";
		ctx.rect(fp.x+fp.width/4,fp.y+fp.height/4,fp.width/2,fp.height/2);
		ctxFill();
		break;
	}
}
function newBed(x,y) {
	var bed=new Object();
	bed.x=x; bed.y=y;
	bed.width=100;bed.height=60;
	return bed;
}
function drawBed(bed) {
	ctx.beginPath(); ctx.fillStyle="#888";
	ctx.arc(bed.x+97,bed.y+3,3,4.71,Circle); ctx.arc(bed.x+97,bed.y+57,3,0,1.57);
	ctx.lineTo(bed.x+50,bed.y+60); ctx.lineTo(bed.x+50,bed.y);
	ctxFill(); ctx.beginPath(); ctx.fillStyle="#822";
	ctx.arc(bed.x,bed.y+57,4,1.57,3.14); ctx.arc(bed.x,bed.y+3,4,3.14,4.71);
	ctx.lineTo(bed.x+71,bed.y-1); ctx.lineTo(bed.x+60,bed.y+61);
	ctxFill(); ctx.beginPath(); ctx.fillStyle="#833"; ctx.moveTo(bed.x+60,bed.y+61);
	ctx.lineTo(bed.x+50,bed.y+50); ctx.lineTo(bed.x+71,bed.y-1);
	ctxFill(); ctx.beginPath(); ctx.fillStyle="#aaa";
	ctx.rect(bed.x+75,bed.y+5,20,23);
	ctx.rect(bed.x+75,bed.y+32,20,23);
	ctxFill();
}
var divans=[];
var gDivans=[];
var pDivans=[];

var tables=[];
var gTables=[];
var pTables=[];

var chests=[];
var gChests=[];
var pChests=[];

var racks=[];
var gRacks=[];
var pRacks=[];

var fplaces=[];
var gFplaces=[];

var beds=[];
var gBeds=[];
var pBeds=[];