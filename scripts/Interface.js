let hx = 2.98*player.health; let ex = 1.49*player.energy;
let hungx = 1.49*player.hunger; let thirx = 1.49*player.thirst;
var selectedCraft = -1; var trigger_select = false;
var selectedBag = 0; var pageCraft = 0;
var mapColor =["#070","#5f5","#55f","#999","#f55"];
function drawInterface() {
	let w = canvasGUI.width; let h=canvasGUI.height;
	let startpoint = w/2-25-(50*Math.floor(player.beltLen/2));
	//время
	alpha = trunc(Math.sin(time), 4);
	alpha=(alpha<0)?0:(alpha>0.8)?0.8:alpha;
	if (IDnearFire!=-1&&fireOnGrave[IDnearFire].life>1) {
		var x=fireOnGrave[IDnearFire].x;
		var y=fireOnGrave[IDnearFire].y;
		var grad=ctx.createRadialGradient(x, y, 1, x, y, fireOnGrave[IDnearFire].life*3);
		grad.addColorStop(0,"rgba(0,0,10,0)"); grad.addColorStop(1,"rgba(0,0,10,"+alpha+")");
		ctx.fillStyle=grad;
	} else {
		ctx.fillStyle="rgba(0,0,10,"+alpha+")";
	}
	ctx.beginPath(); 
	ctx.rect(camera.x,camera.y,w,h); ctxFill();

	//карта
	/*var sqX=0; var sqY=0;
	for (var my=sy-1; my<=sy+1; ++my) {
		for (var mx=sx-1; mx<=sx+1; ++mx) {
			ctxGUI.beginPath();	ctxGUI.fillStyle=mapColor[map[my][mx]];
			ctxGUI.rect(sqX*30,sqY*30,30,30); guiFill(); ++sqX;
		} sqX=0; ++sqY;
	}*/

	if (control.tab) {
		//рюкзак
		ctxGUI.beginPath(); ctxGUI.fillStyle="#642"; ctxGUI.strokeStyle="#531"; ctxGUI.lineWidth=10; ctxGUI.lineCap="round";
		ctxGUI.arc(w-450, 250, 50, 3.14, 4.71); ctxGUI.arc(w-100, 250, 50, 4.71, 0);
		ctxGUI.arc(w-100, h-250, 50, 0, 1.57); ctxGUI.arc(w-450, h-250, 50, 1.57, 3.14);
		ctxGUI.lineTo(w-500, 250); guiDraw();
		if (player.bag.length>0) {
			ctxGUI.beginPath(); ctxGUI.lineWidth=2; ctxGUI.strokeStyle="black"; ctxGUI.fillStyle="rgba(0,0,0,0.6)";
			ctxGUI.rect(w-295, 250, 50, 50); guiDraw();
			drawItemOnBelt(player.bag[selectedBag], w-295, 250);
			ctxGUI.fillStyle="#fff"; ctxGUI.font="20px Segoe Print"; ctxGUI.textAlign="left";
			ctxGUI.beginPath(); wrapText(ctxGUI, ITEMS[player.bag[selectedBag].type][player.bag[selectedBag].id].info+(player.bag[selectedBag].type==1?" > патронов в оружии ":" > кол-во ")+player.bag[selectedBag].count+" шт.", w-470, 350, 400,25); guiFill();
			ctxGUI.beginPath(); multilineText(ctxGUI, "W - переложить с пояса в рюкзак[n]S - повесить на пояс"+(player.bag[selectedBag].type==1&&player.bag[selectedBag].count>0?"[n]R - разрядить":""), w-470, h-280, 25); guiFill();
			ctxGUI.beginPath(); ctxGUI.textAlign="center";
			ctxGUI.fillText("Общий вес: "+trunc(player.weight,2)+"/"+player.maxWeight+" кг.", w-275, h-330); guiFill();
			ctxGUI.beginPath(); ctxGUI.fillText("A <- "+(selectedBag+1)+"/"+player.bag.length+" -> D", w-275, 230); guiFill();
		} else {
			ctxGUI.fillStyle="#fff"; ctxGUI.font="30px Segoe Print"; ctxGUI.textAlign="center";
			ctxGUI.beginPath(); ctxGUI.fillText("Нет предметов", w-275, 300); guiFill();
		}
		//крафт
		ctxGUI.beginPath(); ctxGUI.fillStyle="rgba(0,0,0,0.5)";
		ctxGUI.rect(0, 0, 320, h); guiFill();
		ctxGUI.beginPath(); ctxGUI.fillStyle="#fff"; ctxGUI.font = "25px Segoe Print"; ctxGUI.textAlign = "center";
		ctxGUI.fillText("Создание предметов", 160, 30); guiFill(); ctxGUI.beginPath();
		ctxGUI.fillText("Q <- "+(pageCraft+1)+"/"+craft.length+" -> E", 160, h-60); guiFill();
		selectedCraft=-1;
		for (var c=0; c<craft[pageCraft].length; ++c) {
			var itemCraft = craft[pageCraft][c];
			ctxGUI.beginPath();
			if (cursor.wX>=10&&cursor.wX<=310&&cursor.wY>=50+110*c&&cursor.wY<=150+110*c) {
				ctxGUI.fillStyle="#444";
				selectedCraft = c;
			} else {
				ctxGUI.fillStyle="#555";
			}
			ctxGUI.rect(10, 50+110*c, 300, 100); guiFill();
			ctxGUI.beginPath(); ctxGUI.font="20px Segoe Print"; ctxGUI.fillStyle="#fff";
			if (itemCraft.result.type==-1) {
				ctxGUI.fillText(itemCraft.result.name, 160, 70+110*c); guiFill();
			} else {
				ctxGUI.fillText(ITEMS[itemCraft.result.type][itemCraft.result.id].name, 160, 70+110*c); guiFill();
			}
			for (var r=0;r<itemCraft.resources.length; ++r) {
				drawItemOnBelt(itemCraft.resources[r], 10+50*r, 80+110*c);
				ctxGUI.beginPath(); ctxGUI.font = "16px Segoe Print";
				if (player.countRes[itemCraft.resources[r].type][itemCraft.resources[r].id] < itemCraft.resources[r].need) {
					ctxGUI.fillStyle="#f00";
				} else ctxGUI.fillStyle="#0f0";
				ctxGUI.fillText(itemCraft.resources[r].need, 35+50*r, 145+110*c); guiFill();
				if (r==itemCraft.resources.length-1&&itemCraft.result.type!=-1) {
					ctxGUI.beginPath(); ctxGUI.font = "40px Segoe Print"; ctxGUI.fillStyle="#fff";
					ctxGUI.fillText("=", 35+50*(r+1), 120+110*c); guiFill();
					drawItemOnBelt(itemCraft.result, 10+50*(r+2), 80+110*c);
					ctxGUI.beginPath(); ctxGUI.font = "16px Segoe Print"; ctxGUI.fillStyle="#fff";
					ctxGUI.fillText(itemCraft.result.count, 35+50*(r+2), 145+110*c); guiFill();
				}
			}
		}
	}
	ctxGUI.beginPath(); ctxGUI.fillStyle = "rgba(100,100,100,0.2)";	ctxGUI.strokeStyle = "#000"; ctxGUI.lineWidth = 2;
	ctxGUI.rect(10, h-20, 300, 15); guiDraw();
	ctxGUI.beginPath(); ctxGUI.fillStyle = "rgba(100,100,100,0.2)"; ctxGUI.strokeStyle = "#000"; ctxGUI.lineWidth = 2;
	ctxGUI.rect(10, h-40, 300, 15); guiDraw();

	if (hx<2.98*player.health) ++hx;
	if (hx>2.98*player.health) --hx;
	ex = 1.49*player.energy; hungx = 1.49*player.hunger; thirx = 1.49*player.thirst;

	ctxGUI.beginPath(); ctxGUI.fillStyle = "#7F180D";
	ctxGUI.rect(11, h-19, hx, 13); guiFill();
	ctxGUI.beginPath(); ctxGUI.fillStyle = "#44944A";
	ctxGUI.rect(11, h-39, ex, 13); guiFill();
	ctxGUI.beginPath(); ctxGUI.fillStyle = "#5F9EA0";
	ctxGUI.rect(309-thirx, h-39, thirx, 13); guiFill();
	ctxGUI.beginPath(); ctxGUI.fillStyle = "#79553D";
	ctxGUI.rect(309-thirx-hungx, h-39, hungx, 13); guiFill();
	//Пояс
	for (var bx=0; bx<player.beltLen; ++bx) {
		ctxGUI.beginPath(); ctxGUI.lineWidth=2; ctxGUI.strokeStyle="black";
		ctxGUI.fillStyle=(bx==player.itemBelt)?"rgba(30,30,30,0.8)":"rgba(0,0,0,0.3)";
		ctxGUI.rect(startpoint+bx*50, h-55, 50, 50); guiDraw();
		ctxGUI.beginPath(); ctxGUI.fillStyle = "white"; ctxGUI.font = "10px Segoe Print"; ctxGUI.textAlign = "left";
		ctxGUI.fillText(bx+1, startpoint+bx*50+3, h-43); guiFill();
		drawItemOnBelt(player.belt[bx], startpoint+bx*50, h-55);
		if (player.belt[bx].id!=null) {
			ctxGUI.beginPath(); ctxGUI.fillStyle="white"; ctxGUI.textAlign = "right";
			ctxGUI.fillText(player.belt[bx].count, startpoint+bx*50+45, h-7); guiFill();
		}
	}
	if (cursor.wX>=11&&cursor.wX<=309&&cursor.wY>=h-42&&cursor.wY<=h-25) {
		ctxGUI.beginPath(); ctxGUI.fillStyle="rgba(0,0,0,0.8)"; ctxGUI.strokeStyle="black"; ctxGUI.lineWidth=2;
		guiDraw(); ctxGUI.beginPath();
		ctxGUI.moveTo(cursor.wX-10, h-55); ctxGUI.lineTo(cursor.wX, h-42);
		ctxGUI.lineTo(cursor.wX+10, h-55); ctxGUI.lineTo(cursor.wX+55, h-55);
		ctxGUI.lineTo(cursor.wX+55, h-85); ctxGUI.lineTo(cursor.wX-55, h-85);
		ctxGUI.lineTo(cursor.wX-55, h-55); ctxGUI.lineTo(cursor.wX-10, h-55); guiDraw();
	}
	if (cursor.wX>=309-thirx&&cursor.wX<=309&&cursor.wY>=h-42&&cursor.wY<=h-25) {
		ctxGUI.beginPath(); ctxGUI.fillStyle = "white"; ctxGUI.font = "14px Segoe Print"; ctxGUI.textAlign = "center";
		ctxGUI.fillText("Жажда: "+trunc(player.thirst,0), cursor.wX, h-65); guiFill();
	}
	if (cursor.wX>=309-thirx-hungx&&cursor.wX<=309-thirx&&cursor.wY>=h-42&&cursor.wY<=h-25) {
		ctxGUI.beginPath(); ctxGUI.fillStyle = "white"; ctxGUI.font = "14px Segoe Print"; ctxGUI.textAlign = "center";
		ctxGUI.fillText("Голод: "+trunc(player.hunger,0), cursor.wX, h-65); guiFill();
	}
	if (cursor.wX>=11&&cursor.wX<=309-thirx-hungx&&cursor.wY>=h-42&&cursor.wY<=h-25) {
		ctxGUI.beginPath(); ctxGUI.fillStyle = "white"; ctxGUI.font = "14px Segoe Print"; ctxGUI.textAlign = "center";
		ctxGUI.fillText("Энергия: "+trunc(player.energy,0), cursor.wX, h-65); guiFill();
	}
	if (cursor.wX>=11&&cursor.wX<=309&&cursor.wY>=h-25&&cursor.wY<=h-5) {
		ctxGUI.beginPath(); ctxGUI.fillStyle="rgba(0,0,0,0.8)"; ctxGUI.strokeStyle="black"; ctxGUI.lineWidth=2;
		guiDraw(); ctxGUI.beginPath();
		ctxGUI.moveTo(cursor.wX-10, h-30); ctxGUI.lineTo(cursor.wX, h-20);
		ctxGUI.lineTo(cursor.wX+10, h-30); ctxGUI.lineTo(cursor.wX+55, h-30);
		ctxGUI.lineTo(cursor.wX+55, h-60); ctxGUI.lineTo(cursor.wX-55, h-60);
		ctxGUI.lineTo(cursor.wX-55, h-30); ctxGUI.lineTo(cursor.wX-10, h-30);
		guiDraw();
		ctxGUI.beginPath(); ctxGUI.fillStyle = "white"; ctxGUI.font = "14px Segoe Print"; ctxGUI.textAlign = "center";
		ctxGUI.fillText("Здоровье: "+trunc(player.health,0), cursor.wX, h-40); guiFill();
	}
	if (cursor.wX>=startpoint&&cursor.wY>=h-50-5&&cursor.wX<=startpoint+50*player.beltLen) {
		let adr=Math.floor(cursor.wX/50-startpoint/50);
		if (adr>=player.beltLen) adr=player.beltLen-1; if (adr<0) adr=0;
		if (player.belt[adr].id!=null) {
			ctxGUI.beginPath(); ctxGUI.strokeStyle="#000"; ctxGUI.lineWidth=2; ctxGUI.fillStyle="rgba(0,0,0,0.3)";
			ctxGUI.rect(startpoint, h-50*1.5-5, 50*player.beltLen, 50/2); guiDraw(); ctxGUI.beginPath();
			ctxGUI.fillStyle="#fff"; ctxGUI.font="14px Segoe Print"; ctxGUI.textAlign="center";
			multilineText(ctxGUI, ITEMS[player.belt[adr].type][player.belt[adr].id].name, w/2, h-65, 0);
			guiFill();
		}
	}
	if (player.weight>player.maxWeight) {
		ctx.beginPath(); ctx.fillStyle="#fff"; ctx.strokeStyle="#000"; ctx.lineWidth=5;
		ctx.textAlign = "center"; ctx.font="20px Segoe Print";
		ctx.strokeText("Я перегружен и не могу идти", player.x, player.y-30);
		ctx.fillText("Я перегружен и не могу идти", player.x, player.y-30); ctxDraw();
	}
	for (var i=0; i<itemsOnGrave.length; ++i) {
		if (getDistance(player,itemsOnGrave[i]) <= player.radius*2 && !control.tab) {
			var name = ITEMS[itemsOnGrave[i].type][itemsOnGrave[i].id].name;
			ctxGUI.beginPath(); ctxGUI.fillStyle="#fff"; ctxGUI.strokeStyle="#000"; ctxGUI.lineWidth=5;
			ctxGUI.textAlign="center"; ctxGUI.font="20px Segoe Print";
			ctxGUI.strokeText("(E) Взять "+name, w/2, h-100); ctxGUI.fillText("(E) Взять "+name, w/2, h-100); guiDraw(); break;
		}
	}
	if (nearPond) {
		ctxGUI.beginPath(); ctxGUI.fillStyle="#fff"; ctxGUI.strokeStyle="#000"; ctxGUI.lineWidth=5;
		ctxGUI.textAlign="center"; ctxGUI.font="20px Segoe Print";
		ctxGUI.strokeText("(E) Набрать воды", w/2, h-150); ctxGUI.fillText("(E) Набрать воды", w/2, h-150); guiDraw();
	}
	if (nearDoorID>-1) {
		ctxGUI.beginPath(); ctxGUI.fillStyle="#fff"; ctxGUI.strokeStyle="#000"; ctxGUI.lineWidth=5;
		ctxGUI.textAlign="center"; ctxGUI.font="20px Segoe Print";
		ctxGUI.strokeText(pDoors[nearDoorID].open?"(E) Закрыть дверь":"(E) Открыть дверь", w/2, h-150); ctxGUI.fillText(pDoors[nearDoorID].open?"(E) Закрыть дверь":"(E) Открыть дверь", w/2, h-150); guiDraw();
	}
}