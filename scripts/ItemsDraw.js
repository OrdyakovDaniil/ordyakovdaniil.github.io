var gunX; var gunY; var barrelX; var barrelY;

function drawItemOnHands(item) {
	switch (item.type) {
		case 0: //холодное оружие
			switch (item.id) {
				case 0: //нож
				ctx.beginPath(); ctx.lineWidth=1; ctx.strokeStyle="#555"; ctx.fillStyle="cornsilk";
				ctx.arc(player.x+(player.radius+2)*Math.cos((player.angle-90+player.handA)*ToRadian), player.y+(player.radius+2)*Math.sin((player.angle-90+player.handA)*ToRadian), player.radius/3, 0, Circle);
				ctxDraw(); ctx.beginPath();
				ctx.arc(player.x+(player.radius+11-player.handA/5)*Math.cos((player.angle+player.handA)*ToRadian), player.y+(player.radius+11-player.handA/5)*Math.sin((player.angle+player.handA)*ToRadian), player.radius/3, 0, Circle);
				ctxDraw(); ctx.beginPath(); ctx.strokeStyle = "#fff"; ctx.fillStyle = "#666"; ctx.lineCap = "butt"; ctx.lineWidth = 1;
				var dots = [[],[],[],[]];
				dots[0][0]=player.x+(player.radius+9-player.handA/5)*Math.cos((player.angle+player.handA)*ToRadian);
				dots[0][1]=player.y+(player.radius+9-player.handA/5)*Math.sin((player.angle+player.handA)*ToRadian);
				dots[1][0]=dots[0][0]+20*Math.cos((player.angle-20)*ToRadian);
				dots[1][1]=dots[0][1]+20*Math.sin((player.angle-20)*ToRadian);
				dots[2][0]=dots[1][0]+5*Math.cos((player.angle+120)*ToRadian);
				dots[2][1]=dots[1][1]+5*Math.sin((player.angle+120)*ToRadian);
				dots[3][0]=dots[2][0]+15*Math.cos((player.angle+160)*ToRadian);
				dots[3][1]=dots[2][1]+15*Math.sin((player.angle+160)*ToRadian);
				ctx.moveTo(dots[0][0],dots[0][1]); ctx.lineTo(dots[1][0],dots[1][1]);
				ctx.lineTo(dots[2][0],dots[2][1]); ctx.lineTo(dots[3][0],dots[3][1]);
				ctxDraw(); player.dotsHit.x=dots[1][0]; player.dotsHit.y=dots[1][1];
				break;
				case 1: //топор
				ctx.beginPath(); ctx.lineWidth=1; ctx.strokeStyle="#555"; ctx.fillStyle="cornsilk";
				ctx.arc(player.x+(player.radius+2)*Math.cos((player.angle+25+player.handA)*ToRadian), player.y+(player.radius+2)*Math.sin((player.angle+25+player.handA)*ToRadian), player.radius/3, 0, Circle);
				ctxDraw(); ctx.beginPath(); ctx.strokeStyle="#631"; ctx.lineWidth=3;
				ctx.moveTo(player.x+(player.radius+2)*Math.cos((player.angle+25+player.handA)*ToRadian), player.y+(player.radius+2)*Math.sin((player.angle+25+player.handA)*ToRadian));
				ctx.lineTo(player.x+player.radius*2*Math.cos((player.angle+95+player.handA)*ToRadian), player.y+player.radius*2*Math.sin((player.angle+95+player.handA)*ToRadian));
				ctxStroke(); ctx.beginPath(); ctx.lineWidth=1; ctx.strokeStyle="#555"; ctx.fillStyle="cornsilk";
				ctx.arc(player.x+(player.radius+2)*Math.cos((player.angle+45+player.handA)*ToRadian), player.y+(player.radius+2)*Math.sin((player.angle+45+player.handA)*ToRadian), player.radius/3, 0, Circle);
				ctxDraw(); ctx.beginPath(); ctx.strokeStyle = "#fff"; ctx.fillStyle = "#666"; ctx.lineCap = "butt"; ctx.lineWidth = 1;
				var dots = [[],[],[],[]];
				dots[0][0]=player.x+player.radius*2*Math.cos((player.angle+100+player.handA)*ToRadian);
				dots[0][1]=player.y+player.radius*2*Math.sin((player.angle+100+player.handA)*ToRadian);
				dots[1][0]=dots[0][0]+10*Math.cos((player.angle+player.handA+45)*ToRadian);
				dots[1][1]=dots[0][1]+10*Math.sin((player.angle+player.handA+45)*ToRadian);
				player.dotsHit.x=dots[1][0]; player.dotsHit.y=dots[1][1];
				dots[2][0]=dots[1][0]+10*Math.cos((player.angle+player.handA-50)*ToRadian);
				dots[2][1]=dots[1][1]+10*Math.sin((player.angle+player.handA-50)*ToRadian);
				dots[3][0]=dots[2][0]+10*Math.cos((player.angle+player.handA-150)*ToRadian);
				dots[3][1]=dots[2][1]+10*Math.sin((player.angle+player.handA-150)*ToRadian);
				ctx.moveTo(dots[0][0], dots[0][1]); ctx.lineTo(dots[1][0],dots[1][1]);
				ctx.lineTo(dots[2][0], dots[2][1]); ctx.lineTo(dots[3][0], dots[3][1]); ctxDraw();
				break;
			}
		break;
		case 1: //огнестрельное оружие
			switch (item.id) {
				case 0: //ружьё
				gunX = player.x-player.radius*Math.cos(player.radian-1.57);
				gunY = player.y-player.radius*Math.sin(player.radian-1.57);
				var radToCursor = Math.atan2(cursor.y-gunY, cursor.x-gunX);
				var sinAngle = Math.sin(radToCursor); var cosAngle = Math.cos(radToCursor);
				barrelX = gunX+40*cosAngle; barrelY = gunY+40*sinAngle;
				var dots=[[gunX+25*cosAngle, gunY+25*sinAngle],
					[gunX+15*Math.cos(radToCursor-3.14), gunY+15*Math.sin(radToCursor-3.14)]];
				ctx.beginPath(); ctx.strokeStyle = "#333"; ctx.lineWidth = 6;
				ctx.moveTo(player.x-10*Math.cos(player.radian+1.57), player.y-10*Math.sin(player.radian+1.57));
				ctx.lineTo(gunX+22*cosAngle,gunY+22*sinAngle);
				ctxStroke(); ctx.beginPath(); ctx.fillStyle = "cornsilk";
				ctx.arc(gunX+22*cosAngle,gunY+22*sinAngle, 4, 0, Circle);
				ctxFill(); ctx.beginPath();
				ctx.arc(gunX+3*cosAngle, gunY+3*sinAngle, 4, 0, Circle);
				ctxFill(); ctx.beginPath(); ctx.lineWidth = 4; ctx.lineCap = "round"; ctx.strokeStyle = "#500";
				ctx.moveTo(gunX, gunY); ctx.lineTo(dots[1][0],dots[1][1]);
				ctx.moveTo(gunX, gunY); ctx.lineTo(dots[0][0],dots[0][1]);
				ctxStroke(); ctx.beginPath(); ctx.lineWidth = 2; ctx.strokeStyle = "#111";
				ctx.moveTo(gunX, gunY); ctx.lineTo(barrelX, barrelY); ctxStroke();
				break;
				case 1: //дробовик
				gunX = player.x-player.radius*Math.cos((player.angle-90)*ToRadian);
				gunY = player.y-player.radius*Math.sin((player.angle-90)*ToRadian);
				var radToCursor = Math.atan2(cursor.y-gunY, cursor.x-gunX);
				var sinAngle = Math.sin(radToCursor); var cosAngle = Math.cos(radToCursor);
				barrelX = gunX+40*cosAngle; barrelY = gunY+40*sinAngle;
				var dots = [[gunX+20*cosAngle, gunY+20*sinAngle],
					[gunX+15*Math.cos(radToCursor-3.14), gunY+15*Math.sin(radToCursor-3.14)],
					[gunX+25*cosAngle, gunY+25*sinAngle]];
				ctx.beginPath(); ctx.strokeStyle = "#333"; ctx.lineWidth = 6;
				ctx.moveTo(player.x-10*Math.cos(player.radian+1.57), player.y-10*Math.sin(player.radian+1.57));
				ctx.lineTo(gunX+22*cosAngle, gunY+22*sinAngle);
				ctxStroke(); ctx.beginPath(); ctx.fillStyle = "cornsilk";
				ctx.arc(gunX+22*cosAngle, gunY+22*sinAngle,4,0,Circle);
				ctxFill(); ctx.beginPath();
				ctx.arc(gunX+3*cosAngle, gunY+3*sinAngle,4,0,Circle);
				ctxFill(); ctx.beginPath(); ctx.lineCap = "round"; ctx.strokeStyle = "#500"; ctx.lineWidth = 6;
				ctx.moveTo(dots[0][0], dots[0][1]); ctx.lineTo(dots[2][0], dots[2][1]);
				ctxStroke(); ctx.beginPath(); ctx.lineWidth = 3; ctx.strokeStyle = "#888";
				ctx.moveTo(gunX,gunY); ctx.lineTo(barrelX,barrelY);
				ctxStroke(); ctx.beginPath(); ctx.strokeStyle = "#500";
				ctx.moveTo(gunX,gunY); ctx.lineTo(dots[1][0], dots[1][1]); ctxStroke(); 
				break;
			}
		break;
		case 2: case 3: case 4:
			ctx.beginPath(); ctx.lineWidth=1; ctx.strokeStyle="#555"; ctx.fillStyle="cornsilk";
			ctx.arc(player.x+(player.radius+2)*Math.cos((player.angle-45)*ToRadian), player.y+(player.radius+2)*Math.sin((player.angle-45)*ToRadian), player.radius/3, 0, Circle);
			ctxDraw(); ctx.beginPath();
			ctx.arc(player.x+(player.radius+2)*Math.cos((player.angle+45)*ToRadian), player.y+(player.radius+2)*Math.sin((player.angle+45)*ToRadian), player.radius/3, 0, Circle);
			ctxDraw();
		break;
		case 5:
			ctx.beginPath(); ctx.lineWidth=1; ctx.strokeStyle="#555"; ctx.fillStyle="cornsilk";
			ctx.arc(player.x+(player.radius+2)*Math.cos((player.angle-45)*ToRadian), player.y+(player.radius+2)*Math.sin((player.angle-45)*ToRadian), player.radius/3, 0, Circle);
			ctxDraw(); ctx.beginPath();
			ctx.arc(player.x+(player.radius+2)*Math.cos((player.angle+45)*ToRadian), player.y+(player.radius+2)*Math.sin((player.angle+45)*ToRadian), player.radius/3, 0, Circle);
			ctxDraw();
			if (!control.tab)
			switch (item.id) {
				case 0:
				ctx.beginPath(); ctx.strokeStyle="#420"; ctx.fillStyle="#333"; ctx.lineCap="round"; ctx.lineWidth=6;
				var kx=player.x+player.radius*3*Math.cos(player.radian); var ky=player.y+player.radius*3*Math.sin(player.radian);
				ctx.moveTo(kx,ky); ctx.lineTo(kx+15*Math.cos(player.radian), ky+15*Math.sin(player.radian)); ctxStroke(); ctx.strokeStyle="#530";
				ctx.beginPath(); ctx.moveTo(kx,ky); ctx.lineTo(kx+15*Math.cos(player.radian-2.09), ky+15*Math.sin(player.radian-2.09)); ctxStroke(); ctx.strokeStyle="#640";
				ctx.beginPath(); ctx.moveTo(kx,ky); ctx.lineTo(kx+15*Math.cos(player.radian+2.09), ky+15*Math.sin(player.radian+2.09)); ctxStroke();
				ctx.beginPath(); ctx.arc(kx+10*Math.cos(player.radian+1.04), ky+10*Math.sin(player.radian+1.04), 5, 0, Circle); ctxFill();
				ctx.beginPath(); ctx.arc(kx+10*Math.cos(player.radian-1.04), ky+10*Math.sin(player.radian-1.04), 5, 0, Circle); ctxFill();
				ctx.beginPath(); ctx.arc(kx+10*Math.cos(player.radian+3.14), ky+10*Math.sin(player.radian+3.14), 5, 0, Circle); ctxFill();
				break;
			}
		break;
		default:
		ctx.beginPath(); ctx.lineWidth=1; ctx.strokeStyle="#555"; ctx.fillStyle="cornsilk";
		ctx.arc(player.x+(player.radius+2)*Math.cos((player.angle-90+player.handA)*ToRadian), player.y+(player.radius+2)*Math.sin((player.angle-90+player.handA)*ToRadian), player.radius/3, 0, Circle);
		ctxDraw(); ctx.beginPath(); ctx.arc(player.dotsHit.x, player.dotsHit.y, player.radius/3, 0, Circle); ctxDraw();
		break;
	}
}
function drawItemsOnGrave(item) {
	switch (item.type) {
		case 0: //холодное оружие
			switch (item.id) {
				case 0: //нож
				ctx.beginPath(); ctx.strokeStyle="#fff"; ctx.fillStyle="#666"; ctx.lineCap="butt"; ctx.lineWidth=1;
				ctx.moveTo(item.x, item.y);	ctx.lineTo(item.x+15, item.y);
				ctx.lineTo(item.x+12, item.y+2); ctx.lineTo(item.x, item.y+2);
				ctxDraw(); ctx.beginPath(); ctx.strokeStyle="brown"; ctx.lineWidth=3;
				ctx.moveTo(item.x, item.y+1); ctx.lineTo(item.x-10, item.y+1);
				ctxStroke(); ctx.beginPath();	ctx.strokeStyle="#fff"; ctx.lineWidth=1;
				ctx.moveTo(item.x, item.y-3); ctx.lineTo(item.x, item.y+5); ctxStroke();
				break;
				case 1: //топор
				ctx.beginPath(); ctx.strokeStyle="#631"; ctx.lineCap="round"; ctx.lineWidth=4;
				ctx.moveTo(item.x+15, item.y); ctx.lineTo(item.x-15, item.y); ctxStroke(); ctx.beginPath();
				ctx.strokeStyle="#fff"; ctx.fillStyle="#666"; ctx.lineCap="butt"; ctx.lineWidth=1;
				ctx.moveTo(item.x+14, item.y-3); ctx.lineTo(item.x+19, item.y-3);
				ctx.lineTo(item.x+20, item.y+8); ctx.lineTo(item.x+13, item.y+8);
				ctx.lineTo(item.x+14, item.y-3); ctxDraw();
				break; 
			}
		break;
		case 1: //огнестрельное оружие
			switch (item.id) {
				case 0: //ружьё
				ctx.beginPath(); ctx.lineCap="round"; ctx.strokeStyle = "#500"; ctx.lineWidth = 4;
				ctx.moveTo(item.x, item.y); ctx.lineTo(item.x+30, item.y); ctxStroke(); ctx.beginPath();
				ctx.lineCap="butt"; ctx.fillStyle = "#500"; ctx.lineWidth = 2;
				ctx.moveTo(item.x, item.y+2); ctx.lineTo(item.x-15, item.y+2);
				ctx.lineTo(item.x-15, item.y+10); ctx.lineTo(item.x, item.y+3);
				ctxDraw(); ctx.beginPath(); ctx.lineWidth = 2;
				ctx.moveTo(item.x, item.y+3); ctx.lineTo(item.x+30, item.y);
				ctxStroke(); ctx.beginPath(); ctx.strokeStyle = "#222";
				ctx.moveTo(item.x+5, item.y-1); ctx.lineTo(item.x+50, item.y-1); ctxStroke();
				break;
				case 1:
				ctx.beginPath(); ctx.lineCap="butt"; ctx.strokeStyle = "#888"; ctx.lineWidth = 2;
				ctx.moveTo(item.x+6, item.y); ctx.lineTo(item.x+50, item.y); ctxStroke(); ctx.beginPath();
				ctx.moveTo(item.x+20, item.y+3); ctx.lineTo(item.x+50, item.y+3);
				ctxStroke(); ctx.beginPath(); ctx.lineWidth=5; ctx.strokeStyle="#666";
				ctx.moveTo(item.x+5, item.y+2); ctx.lineTo(item.x+20, item.y+2);
				ctxStroke(); ctx.beginPath(); ctx.lineWidth=4; ctx.strokeStyle="#500"; ctx.lineCap="round";
				ctx.moveTo(item.x+30, item.y+3); ctx.lineTo(item.x+40, item.y+3);
				ctxStroke(); ctx.beginPath(); ctx.lineWidth=1; ctx.fillStyle="#500"; ctx.lineCap="butt";
				ctx.moveTo(item.x+5, item.y+2); ctx.lineTo(item.x-15,item.y+2);
				ctx.lineTo(item.x-15,item.y+10); ctx.lineTo(item.x+6,item.y+5); ctxDraw();
				break;
			}
		break;
		case 2: //патроны
			switch (item.id) {
				case 0: //на ружьё
				ctx.beginPath(); ctx.lineWidth=1; ctx.fillStyle="#000";
				ctx.rect(item.x, item.y,4,6); ctxFill(); ctx.beginPath();
				ctx.fillStyle="#322"; ctx.rect(item.x-6,item.y,6,6); ctx.fill();
				ctx.closePath(); ctx.fillStyle="#fa4";
				for (var i=0; i<3; ++i) {
					ctx.beginPath(); ctx.arc(item.x+1,item.y+(i*2+1),0.5,0,Circle); ctxFill();
					ctx.beginPath(); ctx.arc(item.x+3,item.y+(i*2+1),0.5,0,Circle); ctxFill();
				}
				break;
				case 1: //на дробовик
				ctx.beginPath(); ctx.lineWidth=1; ctx.fillStyle="#000";
				ctx.rect(item.x, item.y,4,6); ctxFill(); ctx.beginPath();
				ctx.fillStyle="#700"; ctx.rect(item.x-6,item.y,6,6); ctx.fill();
				ctx.closePath(); ctx.fillStyle="#f00";
				for (var i=0; i<3; ++i) {
					ctx.beginPath(); ctx.arc(item.x+1,item.y+(i*2+1),0.5,0,Circle); ctxFill();
					ctx.beginPath(); ctx.arc(item.x+3,item.y+(i*2+1),0.5,0,Circle); ctxFill();
				}
				break;
			}
		break;
		case 3: //используемое
			switch (item.id) {
				case 0: //сырое мясо
				ctx.beginPath(); ctx.lineWidth=1; ctx.fillStyle="#a55"; ctx.strokeStyle="#a33";
				ctx.arc(item.x, item.y, 5, 1.57, -1.57); ctx.arc(item.x+5, item.y, 3, -1.57, 1.57);
				ctxDraw(); ctx.beginPath();
				ctx.moveTo(item.x,item.y+5); ctx.lineTo(item.x+5, item.y+3);
				ctxDraw(); ctx.beginPath();
				ctx.fillStyle="#faa"; ctx.arc(item.x,item.y,1,0,Circle); ctxFill();
				break;
				case 1: //жареное мясо
				ctx.beginPath(); ctx.lineWidth=1; ctx.fillStyle="#600"; ctx.strokeStyle="#500";
				ctx.arc(item.x, item.y, 5, 1.57, -1.57); ctx.arc(item.x+5, item.y, 3, -1.57, 1.57);
				ctxDraw(); ctx.beginPath();
				ctx.moveTo(item.x,item.y+5); ctx.lineTo(item.x+5, item.y+3);
				ctxDraw(); ctx.beginPath();
				ctx.fillStyle="#a99"; ctx.arc(item.x,item.y,1,0,Circle); ctxFill();
				break;
				case 2: //батончик
				ctx.beginPath(); ctx.lineWidth=4; ctx.strokeStyle="#990"; ctx.lineCap="butt";
				ctx.moveTo(item.x-5, item.y); ctx.lineTo(item.x+5,item.y);
				ctxStroke(); ctx.beginPath(); ctx.strokeStyle="#ff0";
				ctx.moveTo(item.x-5, item.y-2); ctx.lineTo(item.x+5,item.y-2);
				ctxStroke(); ctx.beginPath(); ctx.strokeStyle="#006";
				ctx.moveTo(item.x-3, item.y); ctx.lineTo(item.x+3, item.y);
				ctxStroke(); ctx.beginPath(); ctx.strokeStyle="#00f";
				ctx.moveTo(item.x-3, item.y-2); ctx.lineTo(item.x+3, item.y-2); ctxStroke();
				break;
				case 3: //консервы
				ctx.beginPath(); ctx.lineWidth=10; ctx.lineCap="round"; ctx.strokeStyle="#333";
				ctx.moveTo(item.x, item.y); ctx.lineTo(item.x, item.y+6); ctxStroke();
				ctx.beginPath(); ctx.lineWidth=1; ctx.strokeStyle="#444"; ctx.fillStyle="#666";
				ctx.arc(item.x,item.y,5,0,Circle); ctxDraw();
				ctx.beginPath(); ctx.arc(item.x+3,item.y,1,0,Circle); ctxStroke();
				break;
				case 4: //аптечка
				ctx.beginPath(); ctx.lineWidth=1; ctx.strokeStyle="#500"; ctx.fillStyle="#700";
				ctx.rect(item.x, item.y, 15, 10); ctxDraw();
				ctx.beginPath(); ctx.strokeStyle="#fff";
				ctx.moveTo(item.x+5, item.y+5); ctx.lineTo(item.x+10,item.y+5);
				ctx.moveTo(item.x+7.5, item.y+2); ctx.lineTo(item.x+7.5, item.y+8);
				ctxStroke();
				break;
				case 5: //грязная вода
				ctx.beginPath(); ctx.lineCap="round"; ctx.lineWidth=6; ctx.strokeStyle="rgba(100,100,70,0.9)";
				ctx.moveTo(item.x, item.y); ctx.lineTo(item.x, item.y+15);
				ctxStroke(); ctx.beginPath(); ctx.strokeStyle="#888"; ctx.lineCap="butt";
				ctx.moveTo(item.x, item.y+4); ctx.lineTo(item.x, item.y+12);
				ctxStroke(); ctx.beginPath(); ctx.lineWidth=3; ctx.strokeStyle="#888"; ctx.lineCap="round";
				ctx.moveTo(item.x, item.y-4); ctx.lineTo(item.x, item.y-3); ctxStroke();
				break;
				case 6: //чистая вода
				ctx.beginPath(); ctx.lineCap="round"; ctx.lineWidth=6; ctx.strokeStyle="rgba(70,70,100,0.9)";
				ctx.moveTo(item.x, item.y); ctx.lineTo(item.x, item.y+15);
				ctxStroke(); ctx.beginPath(); ctx.strokeStyle="#888"; ctx.lineCap="butt";
				ctx.moveTo(item.x, item.y+4); ctx.lineTo(item.x, item.y+12);
				ctxStroke(); ctx.beginPath(); ctx.lineWidth=3; ctx.strokeStyle="#888"; ctx.lineCap="round";
				ctx.moveTo(item.x, item.y-4); ctx.lineTo(item.x, item.y-3); ctxStroke();
				break;
				case 7: //энергетик
				ctx.beginPath(); ctx.lineCap="round"; ctx.lineWidth=6; ctx.strokeStyle="rgba(255,255,0,0.5)";
				ctx.moveTo(item.x, item.y); ctx.lineTo(item.x, item.y+15);
				ctxStroke(); ctx.beginPath(); ctx.strokeStyle="#00f"; ctx.lineCap="butt";
				ctx.moveTo(item.x, item.y+4); ctx.lineTo(item.x, item.y+12);
				ctxStroke(); ctx.beginPath(); ctx.lineWidth=3; ctx.strokeStyle="#00f"; ctx.lineCap="round";
				ctx.moveTo(item.x, item.y-4); ctx.lineTo(item.x, item.y-3); ctxStroke();
				break;
			}
		break;
		case 4: //материалы
			switch (item.id) {
				case 0: //полено
				var gradient = ctxGUI.createLinearGradient(item.x, item.y-5, item.x, item.y+5);
				gradient.addColorStop(0, "#310"); gradient.addColorStop(0.5, "#520"); gradient.addColorStop(1, "#310");
				ctx.beginPath(); ctx.lineWidth=10; ctx.lineCap="butt"; ctx.strokeStyle=gradient;
				ctx.moveTo(item.x-15, item.y); ctx.lineTo(item.x+15, item.y); ctxStroke();
				ctx.beginPath(); ctx.fillStyle="#960"; ctx.lineWidth=1;
				ctx.moveTo(item.x-15, item.y-3); ctx.lineTo(item.x-10, item.y-2);
				ctx.lineTo(item.x-15, item.y-1); ctxFill();
				ctx.moveTo(item.x+15, item.y); ctx.lineTo(item.x+10, item.y+1);
				ctx.lineTo(item.x+15, item.y+2); ctxFill();
				break;
				case 1: //камень
				ctx.beginPath(); ctx.lineWidth=1; ctx.fillStyle="#555"; ctx.strokeStyle="#333";
				ctx.moveTo(item.x, item.y-5); ctx.lineTo(item.x-5, item.y);
				ctx.lineTo(item.x-3, item.y+5); ctxDraw(); ctx.beginPath(); ctx.fillStyle="#333";
				ctx.moveTo(item.x+3, item.y+5); ctx.lineTo(item.x+5, item.y);
				ctx.lineTo(item.x, item.y-5); ctxDraw(); ctx.beginPath(); ctx.fillStyle="#444";
				ctx.moveTo(item.x-3, item.y+5); ctx.lineTo(item.x+3, item.y+5);
				ctx.lineTo(item.x, item.y-5); ctxDraw();
				break;
				case 2: //металлолом
				var gradient = ctx.createLinearGradient(item.x-20, 0, item.x+20, 0);
				gradient.addColorStop(0, "#aab"); gradient.addColorStop(1, "#001");
				ctx.beginPath(); ctx.lineWidth=1; ctx.fillStyle=gradient; ctx.strokeStyle="#222";
				ctx.moveTo(item.x-10, item.y-10); ctx.lineTo(item.x+15, item.y-10);
				ctx.lineTo(item.x+10, item.y+10); ctx.lineTo(item.x-15, item.y+10);
				ctx.lineTo(item.x-10, item.y-10); ctxDraw(); ctx.beginPath();
				ctx.strokeStyle="#222"; ctx.lineWidth=3; ctx.lineCap="butt";
				ctx.moveTo(item.x+15, item.y+10); ctx.lineTo(item.x-5, item.y+3);
				ctxStroke(); ctx.beginPath(); ctx.lineWidth=2;
				ctx.arc(item.x-8, item.y+2, 3, -1.395, 2.267); ctxStroke();
				break;
				case 3: //порох
				var gradient = ctx.createLinearGradient(0, item.y-10, 0, item.y+5);
				gradient.addColorStop(0, "#545"); gradient.addColorStop(1, "#011");
				ctx.beginPath(); ctx.lineWidth=1; ctx.fillStyle=gradient; ctx.strokeStyle="#222";
				ctx.arc(item.x, item.y-10, 16, 0.872, 2.267);
				ctx.moveTo(item.x-10, item.y+3); ctx.lineTo(item.x, item.y-10);
				ctx.lineTo(item.x+10, item.y+3); ctxDraw();
				break;
				case 4: //кожа
				ctx.beginPath(); ctx.lineWidth=1; ctx.fillStyle="#4D220E"; ctx.strokeStyle="#310";
				ctx.moveTo(item.x-15, item.y-10); ctx.bezierCurveTo(item.x-15,item.y-10, item.x,item.y-7, item.x+15,item.y-10);
				ctx.bezierCurveTo(item.x+15,item.y-10, item.x+12,item.y, item.x+15,item.y+10);
				ctx.bezierCurveTo(item.x+15,item.y+10, item.x,item.y+7, item.x-15,item.y+10);
				ctx.bezierCurveTo(item.x-15,item.y+10, item.x-12,item.y, item.x-15,item.y-10);
				ctxDraw();
				break;
				case 5: //ткань
				ctx.beginPath(); ctx.lineWidth=1; ctx.fillStyle="#885"; ctx.strokeStyle="#774";
				ctx.moveTo(item.x-10, item.y-10); ctx.bezierCurveTo(item.x-3,item.y-13, item.x+3,item.y-7, item.x+10,item.y-10);
				ctx.lineTo(item.x+5, item.y+10); ctx.bezierCurveTo(item.x-2,item.y+13, item.x-8,item.y+7, item.x-15,item.y+10);
				ctxDraw();
				break;
			}
		break;
		case 5: //станции
			switch(item.id) {
				case 0: //набор для костра
				ctx.beginPath(); ctx.strokeStyle="#520"; ctx.lineWidth=5; ctx.lineCap="butt";
				ctx.moveTo(item.x-8,item.y+5); ctx.lineTo(item.x+8,item.y+5); ctxStroke();
				var grad = ctx.createLinearGradient(0,item.y-8,0,item.y+5);
				grad.addColorStop(0,"#880"); grad.addColorStop(1,"#830");
				ctx.beginPath(); ctx.fillStyle=grad; ctx.strokeStyle="#860"; ctx.lineWidth=1;
				ctx.moveTo(item.x,item.y+5); ctx.bezierCurveTo(item.x-5, item.y-3, item.x+3, item.y-6, item.x, item.y-10);
				ctx.bezierCurveTo(item.x+3,item.y-6, item.x+3,item.y-2, item.x, item.y+5);
				ctxDraw();
				break;
			}
		break;
	}
}
function drawItemOnBelt(item, posx, posy) {
	switch (item.type) {
		case 0: //холодное оружие
			switch (item.id) {
				case 0: //нож
				ctxGUI.beginPath(); ctxGUI.lineWidth=1; ctxGUI.strokeStyle="#777"; ctxGUI.fillStyle="#444"; ctxGUI.lineCap="butt";
				ctxGUI.moveTo(posx+40, posy+5); ctxGUI.lineTo(posx+40, posy+13);
				ctxGUI.lineTo(posx+13, posy+40); ctxGUI.lineTo(posx+40, posy+5);
				guiDraw(); ctxGUI.beginPath(); ctxGUI.lineWidth=5; ctxGUI.strokeStyle="brown";
				ctxGUI.moveTo(posx+13, posy+40); ctxGUI.lineTo(posx+22, posy+30);
				guiStroke(); ctxGUI.beginPath(); ctxGUI.lineWidth=2; ctxGUI.strokeStyle="#666"; ctxGUI.lineCap="round";
				ctxGUI.moveTo(posx+16, posy+25); ctxGUI.lineTo(posx+26, posy+35); guiStroke();
				break;
				case 1: //топор
				ctxGUI.beginPath(); ctxGUI.lineWidth=5; ctxGUI.lineCap="round"; ctxGUI.strokeStyle="#631";
				ctxGUI.moveTo(posx+30, posy+5); ctxGUI.lineTo(posx+7, posy+43);
				guiStroke(); ctxGUI.beginPath(); ctxGUI.lineCap="butt"; ctxGUI.strokeStyle="#777"; ctxGUI.fillStyle="#444"; ctxGUI.lineWidth=1;
				ctxGUI.moveTo(posx+27, posy+5); ctxGUI.lineTo(posx+45, posy+10);
				ctxGUI.lineTo(posx+35, posy+25); ctxGUI.lineTo(posx+22, posy+13); guiDraw();
				break;
			}
		break;
		case 1: //огнестрельное оружие
			switch (item.id) {
				case 0: //ружьё
				ctxGUI.beginPath(); ctxGUI.lineWidth=2; ctxGUI.strokeStyle="#444";
				ctxGUI.moveTo(posx+40, posy+10); ctxGUI.lineTo(posx+20, posy+30);
				guiStroke(); ctxGUI.beginPath(); ctxGUI.fillStyle="#500"; ctxGUI.strokeStyle="#500";
				ctxGUI.moveTo(posx+32, posy+20); ctxGUI.lineTo(posx+12, posy+40);
				ctxGUI.lineTo(posx+16, posy+42); ctxGUI.lineTo(posx+20, posy+30); guiDraw();
				break;
				case 1: //дробовик
				ctxGUI.beginPath(); ctxGUI.lineWidth=2; ctxGUI.strokeStyle="#888";
				ctxGUI.moveTo(posx+40, posy+10); ctxGUI.lineTo(posx+20, posy+30);
				guiStroke(); ctxGUI.beginPath();
				ctxGUI.moveTo(posx+42, posy+12); ctxGUI.lineTo(posx+22, posy+32);
				guiStroke(); ctxGUI.beginPath();
				ctxGUI.lineWidth=4; ctxGUI.lineCap="round"; ctxGUI.fillStyle="#500"; ctxGUI.strokeStyle="#500";
				ctxGUI.moveTo(posx+37, posy+17); ctxGUI.lineTo(posx+32, posy+22);
				guiStroke(); ctxGUI.beginPath(); ctxGUI.lineCap="butt"; ctxGUI.lineWidth=5; ctxGUI.strokeStyle="#555";
				ctxGUI.moveTo(posx+28, posy+24); ctxGUI.lineTo(posx+21, posy+31);
				guiStroke(); ctxGUI.beginPath(); ctxGUI.fillStyle="#500"; ctxGUI.strokeStyle="#500";
				ctxGUI.moveTo(posx+12, posy+40); ctxGUI.lineTo(posx+16, posy+42);
				ctxGUI.lineTo(posx+20, posy+30); guiDraw();
				break;
			}
		break;
		case 2: //патроны
			switch (item.id) {
				case 0: //на ружьё
				ctxGUI.beginPath(); ctxGUI.lineCap="round"; ctxGUI.lineWidth=7; ctxGUI.strokeStyle="#fa4";
				ctxGUI.moveTo(posx+25, posy+16); ctxGUI.lineTo(posx+25, posy+40); guiStroke();
				ctxGUI.beginPath(); ctxGUI.lineWidth=3; ctxGUI.strokeStyle="#ff4";
				ctxGUI.moveTo(posx+25, posy+10); ctxGUI.lineTo(posx+25, posy+16); guiStroke();
				break;
				case 1: //на дробовик
				ctxGUI.beginPath(); ctxGUI.lineCap="butt"; ctxGUI.lineWidth=7; ctxGUI.strokeStyle="#a00";
				ctxGUI.moveTo(posx+25, posy+10); ctxGUI.lineTo(posx+25, posy+40);
				guiStroke(); ctxGUI.beginPath(); ctxGUI.strokeStyle="#aa0";
				ctxGUI.moveTo(posx+25, posy+40); ctxGUI.lineTo(posx+25, posy+30);
				guiStroke(); ctxGUI.beginPath();
				break;
			}
		break;
		case 3: //используемое
			switch (item.id) {
				case 0: //сырое мясо
				ctxGUI.beginPath(); ctxGUI.lineWidth=2; ctxGUI.fillStyle="#a55"; ctxGUI.strokeStyle="#a33";
				ctxGUI.arc(posx+15, posy+25, 10, 1.57, -1.57); ctxGUI.arc(posx+40, posy+25, 5, -1.57, 1.57);
				guiDraw(); ctxGUI.beginPath();
				ctxGUI.moveTo(posx+15, posy+35); ctxGUI.lineTo(posx+40, posy+30);
				guiDraw(); ctxGUI.beginPath();
				ctxGUI.fillStyle="#faa"; ctxGUI.arc(posx+15, posy+25, 3, 0, Circle); guiFill();
				break;
				case 1: //жареное мясо
				ctxGUI.beginPath(); ctxGUI.lineWidth=2; ctxGUI.fillStyle="#600"; ctxGUI.strokeStyle="#500";
				ctxGUI.arc(posx+15, posy+25, 10, 1.57, -1.57); ctxGUI.arc(posx+40, posy+25, 5, -1.57, 1.57);
				guiDraw(); ctxGUI.beginPath();
				ctxGUI.moveTo(posx+15, posy+35); ctxGUI.lineTo(posx+40, posy+30);
				guiDraw(); ctxGUI.beginPath();
				ctxGUI.fillStyle="#a99"; ctxGUI.arc(posx+15, posy+25, 3, 0, Circle); guiFill();
				break;
				case 2: //батончик
				ctxGUI.beginPath(); ctxGUI.strokeStyle="#ff0"; ctxGUI.lineCap="butt"; ctxGUI.lineWidth=10;
				ctxGUI.moveTo(posx+10, posy+25); ctxGUI.lineTo(posx+40, posy+25);
				guiStroke(); ctxGUI.beginPath(); ctxGUI.strokeStyle="#00f";
				ctxGUI.moveTo(posx+15, posy+25); ctxGUI.lineTo(posx+35, posy+25);
				guiStroke(); ctxGUI.beginPath(); ctxGUI.fillStyle="#ff0";
				ctxGUI.arc(posx+25, posy+25, 3, 0, Circle); guiFill();
				break;
				case 3: //консервы
				ctxGUI.beginPath(); ctxGUI.lineCap="round"; ctxGUI.lineWidth=16; ctxGUI.strokeStyle="#666";
				ctxGUI.moveTo(posx+25, posy+33); ctxGUI.lineTo(posx+25, posy+19);
				guiStroke(); ctxGUI.beginPath(); ctxGUI.fillStyle="#888";
				ctxGUI.arc(posx+25, posy+19, 8, 0, Circle); guiFill();
				ctxGUI.beginPath(); ctxGUI.lineWidth=1; ctxGUI.strokeStyle="#333";
				ctxGUI.arc(posx+30, posy+19, 2, 0, Circle); guiStroke();
				break;
				case 4: //аптечка
				ctxGUI.beginPath(); ctxGUI.strokeStyle="#500"; ctxGUI.fillStyle="#700";
				ctxGUI.rect(posx+10, posy+15, 30, 20); guiDraw();
				ctxGUI.beginPath(); ctxGUI.lineCap="butt"; ctxGUI.lineWidth=2; ctxGUI.strokeStyle="#fff";
				ctxGUI.moveTo(posx+20, posy+25); ctxGUI.lineTo(posx+30, posy+25); guiStroke(); ctxGUI.beginPath();
				ctxGUI.lineTo(posx+25, posy+20); ctxGUI.lineTo(posx+25, posy+30); guiStroke();
				break;
				case 5: //грязная вода
				ctxGUI.beginPath(); ctxGUI.lineCap="round"; ctxGUI.lineWidth=10; ctxGUI.strokeStyle="rgba(100,100,70,0.7)";
				ctxGUI.moveTo(posx+25, posy+40); ctxGUI.lineTo(posx+25, posy+15);
				guiStroke(); ctxGUI.beginPath(); ctxGUI.strokeStyle="#666"; ctxGUI.lineCap="butt";
				ctxGUI.moveTo(posx+25, posy+35); ctxGUI.lineTo(posx+25, posy+20);
				guiStroke(); ctxGUI.beginPath(); ctxGUI.lineWidth=4; ctxGUI.strokeStyle="#888"; ctxGUI.lineCap="round";
				ctxGUI.moveTo(posx+25, posy+11); ctxGUI.lineTo(posx+25, posy+9); guiStroke();
				break;
				case 6: //чистая вода
				ctxGUI.beginPath(); ctxGUI.lineCap="round"; ctxGUI.lineWidth=10; ctxGUI.strokeStyle="rgba(100,100,120,0.7)";
				ctxGUI.moveTo(posx+25, posy+40); ctxGUI.lineTo(posx+25, posy+15);
				guiStroke(); ctxGUI.beginPath(); ctxGUI.strokeStyle="#666"; ctxGUI.lineCap="butt";
				ctxGUI.moveTo(posx+25, posy+35); ctxGUI.lineTo(posx+25, posy+20);
				guiStroke(); ctxGUI.beginPath(); ctxGUI.lineWidth=4; ctxGUI.strokeStyle="#888"; ctxGUI.lineCap="round";
				ctxGUI.moveTo(posx+25, posy+11); ctxGUI.lineTo(posx+25, posy+9); guiStroke();
				break;
				case 7: //энергетик
				ctxGUI.beginPath(); ctxGUI.lineCap="round"; ctxGUI.lineWidth=10; ctxGUI.strokeStyle="rgba(255,255,0,0.5)";
				ctxGUI.moveTo(posx+25, posy+40); ctxGUI.lineTo(posx+25, posy+15);
				guiStroke(); ctxGUI.beginPath(); ctxGUI.strokeStyle="#00f"; ctxGUI.lineCap="butt";
				ctxGUI.moveTo(posx+25, posy+35); ctxGUI.lineTo(posx+25, posy+20);
				guiStroke(); ctxGUI.beginPath(); ctxGUI.lineWidth=7; ctxGUI.strokeStyle="#00f"; ctxGUI.lineCap="round";
				ctxGUI.moveTo(posx+25, posy+10); ctxGUI.lineTo(posx+25, posy+9); guiStroke();
				break;
			}
		break;
		case 4:
			switch (item.id) {
				case 0: //полено
				ctxGUI.beginPath(); ctxGUI.lineCap="round"; ctxGUI.lineWidth=15; ctxGUI.strokeStyle="#520";
				ctxGUI.moveTo(posx+15, posy+35); ctxGUI.lineTo(posx+35, posy+15);
				guiStroke(); ctxGUI.beginPath(); ctxGUI.strokeStyle="#960";
				ctxGUI.moveTo(posx+15, posy+35); ctxGUI.lineTo(posx+15, posy+35);
				guiStroke(); ctxGUI.beginPath(); ctxGUI.strokeStyle="#431"; ctxGUI.lineWidth=5;
				ctxGUI.moveTo(posx+15, posy+35); ctxGUI.lineTo(posx+15, posy+35); guiStroke();
				break;
				case 1: //камень
				ctxGUI.beginPath(); ctxGUI.lineWidth=1; ctxGUI.fillStyle="#555"; ctxGUI.strokeStyle="#333";
				ctxGUI.moveTo(posx+15, posy+30); ctxGUI.lineTo(posx+25, posy+15);
				ctxGUI.lineTo(posx+40, posy+15); guiDraw(); ctxGUI.beginPath();
				ctxGUI.fillStyle="#333"; ctxGUI.strokeStyle="#555";
				ctxGUI.moveTo(posx+40, posy+15); ctxGUI.lineTo(posx+25, posy+40);
				ctxGUI.lineTo(posx+15, posy+30); guiDraw(); ctxGUI.beginPath();
				ctxGUI.fillStyle="#222"; ctxGUI.strokeStyle="#333";
				ctxGUI.moveTo(posx+40, posy+15); ctxGUI.lineTo(posx+40, posy+25);
				ctxGUI.lineTo(posx+25, posy+40); guiDraw();
				break;
				case 2: //металлолом
				var gradient = ctxGUI.createLinearGradient(posx, 0, posx+50, 0);
				gradient.addColorStop(0, "#aab"); gradient.addColorStop(1, "#001");
				ctxGUI.beginPath(); ctxGUI.lineWidth=1; ctxGUI.fillStyle=gradient; ctxGUI.strokeStyle="#222";
				ctxGUI.moveTo(posx+15, posy+15); ctxGUI.lineTo(posx+40, posy+15);
				ctxGUI.lineTo(posx+35, posy+40); ctxGUI.lineTo(posx+10, posy+40);
				ctxGUI.lineTo(posx+15, posy+15); guiDraw(); ctxGUI.beginPath();
				ctxGUI.strokeStyle="#222"; ctxGUI.lineWidth=3; ctxGUI.lineCap="butt";
				ctxGUI.moveTo(posx+40, posy+40); ctxGUI.lineTo(posx+20, posy+35);
				guiStroke(); ctxGUI.beginPath(); ctxGUI.lineWidth=2;
				ctxGUI.arc(posx+17, posy+33, 3, -1.395, 2.267); guiStroke();
				break;
				case 3: //порох
				var gradient = ctxGUI.createLinearGradient(0, posy, 0, posy+50);
				gradient.addColorStop(0, "#545"); gradient.addColorStop(1, "#011");
				ctxGUI.beginPath(); ctxGUI.lineWidth=1; ctxGUI.fillStyle=gradient; ctxGUI.strokeStyle="#222";
				ctxGUI.arc(posx+25, posy+10, 25, 0.872, 2.267);
				ctxGUI.moveTo(posx+10, posy+30); ctxGUI.lineTo(posx+25, posy+10);
				ctxGUI.lineTo(posx+40, posy+30); guiDraw();
				break;
				case 4: //кожа
				ctxGUI.beginPath(); ctxGUI.lineWidth=1; ctxGUI.fillStyle="#4D220E"; ctxGUI.strokeStyle="#310";
				ctxGUI.moveTo(posx+15, posy+15); ctxGUI.bezierCurveTo(posx+15,posy+10, posx+25,posy+15, posx+35,posy+10);
				ctxGUI.bezierCurveTo(posx+35,posy+10, posx+30,posy+25, posx+35,posy+40);
				ctxGUI.bezierCurveTo(posx+35,posy+40, posx+25,posy+35, posx+15,posy+40);
				ctxGUI.bezierCurveTo(posx+15,posy+40, posx+20,posy+25, posx+15,posy+15);
				guiDraw();
				break;
				case 5: //ткань
				ctxGUI.beginPath(); ctxGUI.lineWidth=1; ctxGUI.fillStyle="#885"; ctxGUI.strokeStyle="#774";
				ctxGUI.moveTo(posx+15, posy+15); ctxGUI.bezierCurveTo(posx+22,posy+12, posx+28,posy+18, posx+40,posy+15);
				ctxGUI.lineTo(posx+35, posy+35); ctxGUI.bezierCurveTo(posx+23,posy+38, posx+17,posy+32, posx+10,posy+35);
				guiDraw();
				break;
			}
		break;
		case 5: //станции
			switch(item.id) {
				case 0: //набор для костра
				ctxGUI.beginPath(); ctxGUI.strokeStyle="#520"; ctxGUI.lineWidth=8; ctxGUI.lineCap="butt";
				ctxGUI.moveTo(posx+10,posy+35); ctxGUI.lineTo(posx+40,posy+35); guiStroke();
				var grad = ctxGUI.createLinearGradient(0,posy,0,posy+50);
				grad.addColorStop(0,"#880"); grad.addColorStop(1,"#830");
				ctxGUI.beginPath(); ctxGUI.fillStyle=grad; ctxGUI.strokeStyle="#860"; ctxGUI.lineWidth=1;
				ctxGUI.moveTo(posx+25,posy+35); ctxGUI.bezierCurveTo(posx+18,posy+30, posx+28, posy+25, posx+25, posy+10);
				ctxGUI.bezierCurveTo(posx+30, posy+25, posx+25, posy+30, posx+28, posy+35);
				guiDraw();
				break;
			}
		break;
	}
}