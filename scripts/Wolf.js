function newWolf(x,y) {
	var wolf = new Object();
	wolf.x=x; wolf.y=y; wolf.dx=0; wolf.dy=0; wolf.radian=0; wolf.radius=50; wolf.run=true;
	wolf.health=100; wolf.damage=10; wolf.tail=3.14; wolf.trig1=false; //tail - хвост
	wolf.headX=x+40*Math.cos(0); wolf.headY=y+40*Math.sin(0);
	wolf.paw=[25,25,15,15]; wolf.trig2=true; wolf.speed=6; wolf.state = 0;
	wolf.sound_a = new Audio("sounds/wolf_attack.mp3");
	wolf.sound_h = new Audio("sounds/wolf_hit.mp3");
	wolf.sound_d = new Audio("sounds/wolf_dead.mp3");
	wolf.sound_a.volume = 0.5;
	wolf.sound_h.volume = 0.5;
	wolf.sound_d.volume = 0.5;
	return wolf;
}
function updateWolf(wolf, id) {
	if (wolf.health>0) {
		if (getDistance(player.dotsHit, wolf)<30) { //атака по волку
			if (!trigger1) {
				trigger1=true;
				wolf.sound_h.play();
				wolf.health-=(player.belt[player.itemBelt].type==0)?ITEMS[player.belt[player.itemBelt].type][player.belt[player.itemBelt].id].damage:player.damage;
			}
		}
		//виляние хвоста
		wolf.tail=lerp(wolf.tail, wolf.trig1 ? 0 : 1.57, 0.15);
		if (!wolf.trig1&&wolf.tail>=1.52) wolf.trig1=true;
		if (wolf.trig1&&wolf.tail<=0.05) wolf.trig1=false;
		if (wolf.run) {
			var wX=wolf.x+50*Math.cos(wolf.radian);
			var wY=wolf.y+50*Math.sin(wolf.radian);
			//перемещение лап
			if (wolf.trig2) {
				wolf.paw[0]=lerp(wolf.paw[0],65,(wolf.paw[0]<50)?0.15:0.1);
				wolf.paw[1]=lerp(wolf.paw[1],75,0.1);
				wolf.paw[2]=lerp(wolf.paw[2],55,(wolf.paw[2]<40)?0.15:0.1);
				wolf.paw[3]=lerp(wolf.paw[3],65,0.1);
				if (wolf.paw[0]>60) wolf.trig2=false;
			} else {
				wolf.paw[0]=lerp(wolf.paw[0],10,(wolf.paw[0]>25)?0.15:0.1);
				wolf.paw[1]=lerp(wolf.paw[1],0,0.1);
				wolf.paw[2]=lerp(wolf.paw[2],5,(wolf.paw[2]>20)?0.15:0.1);
				wolf.paw[3]=lerp(wolf.paw[3],0,0.1);
				if (wolf.paw[0]<15) wolf.trig2=true;
			}
			wolf.x=wolf.x+wolf.speed*Math.cos(wolf.radian);
			wolf.y=wolf.y+wolf.speed*Math.sin(wolf.radian);
			for (var w=0; w<wolfs.length; ++w) { //коллизия с другими волками
				if (id!=w) {
					if (getDistance(wolf, wolfs[w])<wolf.radius*2) {
						var radToWolf = getRadianBetween(wolfs[w], wolf);
						wolf.x = wolfs[w].x+wolf.radius*2*Math.cos(radToWolf);
						wolf.y = wolfs[w].y+wolf.radius*2*Math.sin(radToWolf);
					}
				}
			}
			for (var w=0; w<walls.length; ++w) {
				if (wX>walls[w].x&&wX<walls[w].x+walls[w].width&&wX>walls[w].x&&wX<walls[w].x+walls[w].width) {
					wolf.state=2; wolf.radian+=3.14;
				}
			}
			for (var w=0; w<windows.length; ++w) {
				if (wX>windows[w].x&&wX<windows[w].x+windows[w].width&&wX>windows[w].x&&wX<windows[w].x+windows[w].width) {
					wolf.state=2; wolf.radian+=3.14;
				}
			}
			for (var t=0; t<trees.length; ++t) { //коллизия с деревьями
				if (getDistance(wolf, trees[t])<wolf.radius+trees[t].radius) {
					var radToTree = getRadianBetween(trees[t], wolf);
					wolf.x = trees[t].x+(trees[t].radius+wolf.radius)*Math.cos(radToTree);
					wolf.y = trees[t].y+(trees[t].radius+wolf.radius)*Math.sin(radToTree);
				}
			}
			for (var p=0; p<ponds.length; ++p) { //коллизия с прудами
				if (getDistance(wolf, ponds[p])<wolf.radius+ponds[p].radius) {
					var radToPond = getRadianBetween(ponds[p], wolf);
					wolf.x = ponds[p].x+(ponds[p].radius+wolf.radius)*Math.cos(radToPond);
					wolf.y = ponds[p].y+(ponds[p].radius+wolf.radius)*Math.sin(radToPond);
				}
			}
		}
		var radToWolf = getRadianBetween(player, wolf);
		var distToWolf = Math.round(getDistance(player,wolf));
		switch (wolf.state) {
			case 0:
			if (distToWolf>300) {
				var vector={x:player.x+distToWolf*Math.cos(radToWolf-1.2), y:player.y+distToWolf*Math.sin(radToWolf-1.2)};
				wolf.radian=getRadianBetween(wolf, vector);
			} else wolf.state=1;
			break;
			case 1:
			if (distToWolf>wolf.radius) wolf.radian=getRadianBetween(wolf, player); else {
				wolf.state=2;
				player.health-=wolf.damage;
				wolf.radian=wolf.radian-3.14;
				wolf.sound_a.play();
			}
			break;
			case 2:
			if (distToWolf>1000) wolf.state=0;
			break;
		}
	} else {
		for (var w=0;w<4;++w) {wolf.paw[w]=lerp(wolf.paw[w],55,0.05);}
		if (!wolf.sound_d.ended) {wolf.sound_d.play();}
		if (wolf.run) {
			itemsOnGrave.push(newItem(3,0,randomInt(2,3),wolf.x,wolf.y));
			itemsOnGrave.push(newItem(4,4,randomInt(2,3),wolf.x,wolf.y));
			wolf.run=false;
		}
		wolf.run=false;
	}
}
function drawWolf(wolf) {
	var cos = Math.cos(wolf.radian); var sin = Math.sin(wolf.radian); var dot=[];
	wolf.headX=wolf.x+40*cos; wolf.headY=wolf.y+40*sin;
	//лапы
	ctx.beginPath(); ctx.lineWidth=1; ctx.strokeStyle="#222"; ctx.fillStyle="#333";
	dot[0]=wolf.x+10*Math.cos(wolf.radian-1.57);
	dot[1]=wolf.y+10*Math.sin(wolf.radian-1.57);
	dot[2]=wolf.x+10*Math.cos(wolf.radian+1.57);
	dot[3]=wolf.y+10*Math.sin(wolf.radian+1.57);
	ctx.arc(dot[0]+wolf.paw[0]*cos, dot[1]+wolf.paw[0]*sin, 5, 0, Circle); ctxDraw(); ctx.beginPath();
	ctx.arc(dot[2]+wolf.paw[1]*cos, dot[3]+wolf.paw[1]*sin, 5, 0, Circle); ctxDraw(); ctx.beginPath();
	ctx.arc(dot[0]+wolf.paw[2]*-cos, dot[1]+wolf.paw[2]*-sin, 5, 0, Circle); ctxDraw(); ctx.beginPath();
	ctx.arc(dot[2]+wolf.paw[3]*-cos, dot[3]+wolf.paw[3]*-sin, 5, 0, Circle); ctxDraw();
	//туловище
	ctx.beginPath(); ctx.lineWidth=1; ctx.strokeStyle="#222"; ctx.lineCap="butt";
	var grad=ctx.createLinearGradient(wolf.x+20*Math.cos(wolf.radian-1.57), wolf.y+20*Math.sin(wolf.radian-1.57), wolf.x+20*Math.cos(wolf.radian+1.57), wolf.y+20*Math.sin(wolf.radian+1.57));
	grad.addColorStop(0,"#111"); grad.addColorStop(0.5,"#444"); grad.addColorStop(1,"#111"); ctx.fillStyle=grad;
	ctx.moveTo(wolf.x-30*cos, wolf.y-30*sin);
	dot[0]=wolf.x+30*Math.cos(wolf.radian-2.35);
	dot[1]=wolf.y+30*Math.sin(wolf.radian-2.35);
	dot[2]=wolf.x+5*Math.cos(wolf.radian-1.57);
	dot[3]=wolf.y+5*Math.sin(wolf.radian-1.57);
	dot[4]=wolf.x+30*Math.cos(wolf.radian-0.52);
	dot[5]=wolf.y+30*Math.sin(wolf.radian-0.52);
	ctx.bezierCurveTo(dot[0], dot[1], dot[2], dot[3], dot[4], dot[5]);
	ctx.arc(wolf.x+30*cos, wolf.y+30*sin, 15, wolf.radian-1.57, wolf.radian+1.57);
	dot[0]=wolf.x+5*Math.cos(wolf.radian+1.57);
	dot[1]=wolf.y+5*Math.sin(wolf.radian+1.57);
	dot[2]=wolf.x+30*Math.cos(wolf.radian+2.35);
	dot[3]=wolf.y+30*Math.sin(wolf.radian+2.35);
	dot[4]=wolf.x-30*cos; dot[5]=wolf.y-30*sin;
	ctx.bezierCurveTo(dot[0], dot[1], dot[2], dot[3], dot[4], dot[5]);
	ctxDraw(); ctx.beginPath();
	//хвост
	var TailRad = wolf.radian-3.92+wolf.tail;
	dot[0]=wolf.x-28*cos; dot[1]=wolf.y-28*sin;
	dot[2]=dot[0]+25*Math.cos(TailRad+0.8);
	dot[3]=dot[1]+25*Math.sin(TailRad+0.8);
	dot[4]=dot[0]+30*Math.cos(TailRad);
	dot[5]=dot[1]+30*Math.sin(TailRad);
	dot[6]=dot[0]+35*Math.cos(TailRad+0.2);
	dot[7]=dot[1]+35*Math.sin(TailRad+0.2);
	grad=ctx.createLinearGradient(dot[0], dot[1], dot[0]+30*Math.cos(TailRad), dot[1]+30*Math.sin(TailRad));
	grad.addColorStop(0,"#222"); grad.addColorStop(0.3,"#333"); grad.addColorStop(0.8,"#333"); grad.addColorStop(1,"#222");
	ctx.fillStyle=grad;
	ctx.arc(dot[0], dot[1], 3, TailRad+1.57, TailRad-1.57);
	ctx.moveTo(dot[0]+3*Math.cos(TailRad+1.57), dot[1]+3*Math.sin(TailRad+1.57));
	ctx.bezierCurveTo(dot[2], dot[3], dot[4], dot[5], dot[6], dot[7]);
	dot[2]=dot[0]+35*Math.cos(TailRad-0.3);
	dot[3]=dot[1]+35*Math.sin(TailRad-0.3);
	dot[4]=dot[0]+15*Math.cos(TailRad-0.3);
	dot[5]=dot[1]+15*Math.sin(TailRad-0.3);
	dot[6]=dot[0]+3*Math.cos(TailRad-1.57);
	dot[7]=dot[1]+3*Math.sin(TailRad-1.57);
	ctx.bezierCurveTo(dot[2], dot[3], dot[4], dot[5], dot[6], dot[7]);
	ctxDraw(); ctx.beginPath();
	//голова
	grad=ctx.createRadialGradient(wolf.headX, wolf.headY, 5, wolf.headX, wolf.headY, 15);
	grad.addColorStop(0,"#333"); grad.addColorStop(1,"#222"); ctx.fillStyle=grad;
	ctx.arc(wolf.headX, wolf.headY, 12, wolf.radian+1.57, wolf.radian-1.57);
	ctx.moveTo(wolf.headX+12*Math.cos(wolf.radian-1.57),wolf.headY+12*Math.sin(wolf.radian-1.57));
	ctx.lineTo(wolf.headX+25*cos, wolf.headY+25*sin);
	ctx.lineTo(wolf.headX+12*Math.cos(wolf.radian+1.57),wolf.headY+12*Math.sin(wolf.radian+1.57));
	ctxDraw(); ctx.beginPath(); ctx.fillStyle="#111";
	ctx.arc(wolf.headX+22*cos, wolf.headY+22*sin, 3, 0, Circle);
	ctxDraw(); ctx.beginPath(); if (wolf.health>0) ctx.fillStyle="#880"; else ctx.fillStyle="#111";
	ctx.arc(wolf.headX+5*Math.cos(wolf.radian-1.1),wolf.headY+5*Math.sin(wolf.radian-1.1), 3, wolf.radian-1.74, wolf.radian+1.39);
	ctxDraw(); ctx.beginPath();
	ctx.arc(wolf.headX+5*Math.cos(wolf.radian+1.1),wolf.headY+5*Math.sin(wolf.radian+1.1), 3, wolf.radian-1.39, wolf.radian+1.74);
	ctxDraw(); ctx.beginPath(); ctx.lineWidth=2; ctx.lineCap="round"; ctx.strokeStyle="#333"; ctx.fillStyle="#444";
	ctx.moveTo(wolf.headX+12*Math.cos(wolf.radian-1.7), wolf.headY+12*Math.sin(wolf.radian-1.7));
	ctx.lineTo(wolf.headX+20*Math.cos(wolf.radian-2.09), wolf.headY+20*Math.sin(wolf.radian-2.09));
	ctx.lineTo(wolf.headX+8*Math.cos(wolf.radian-2.79), wolf.headY+8*Math.sin(wolf.radian-2.79));
	ctxDraw(); ctx.beginPath();
	ctx.moveTo(wolf.headX+12*Math.cos(wolf.radian+1.7), wolf.headY+12*Math.sin(wolf.radian+1.7));
	ctx.lineTo(wolf.headX+20*Math.cos(wolf.radian+2.09), wolf.headY+20*Math.sin(wolf.radian+2.09));
	ctx.lineTo(wolf.headX+8*Math.cos(wolf.radian+2.79), wolf.headY+8*Math.sin(wolf.radian+2.79));
	ctxDraw();
}
var wolfs=[];