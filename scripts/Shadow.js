function drawShadowRect(obj) {
	var dots=[
	{rad:getRadianBetween(player,{x:obj.x, y:obj.y})+Circle, x:obj.x, y:obj.y},
	{rad:getRadianBetween(player,{x:obj.x+obj.width, y:obj.y})+Circle, x:obj.x+obj.width, y:obj.y},
	{rad:getRadianBetween(player,{x:obj.x+obj.width, y:obj.y+obj.height})+Circle, x:obj.x+obj.width, y:obj.y+obj.height},
	{rad:getRadianBetween(player,{x:obj.x, y:obj.y+obj.height})+Circle, x:obj.x, y:obj.y+obj.height}];
	var minR=1000; var idMin=-1;
	var maxR=-1000; var idMax=-1;
	if (player.y>=obj.y&&player.y<=obj.y+obj.height&&player.x>obj.x+obj.width) {
		idMin=1; idMax=2;
	} else {
		for (var r=0; r<dots.length; ++r) {
			if (dots[r].rad<minR) {
				minR=dots[r].rad; idMin=r;
			}
		}
		for (var r=0; r<dots.length; ++r) {
			if (dots[r].rad>maxR) {
				maxR=dots[r].rad; idMax=r;
			}
		}
	}
	ctx.beginPath(); ctx.fillStyle="#000";
	ctx.moveTo(dots[idMin].x+10000*Math.cos(dots[idMin].rad), dots[idMin].y+10000*Math.sin(dots[idMin].rad));
	ctx.lineTo(dots[idMin].x, dots[idMin].y);
	ctx.lineTo(dots[idMax].x, dots[idMax].y);
	ctx.lineTo(dots[idMax].x+10000*Math.cos(dots[idMax].rad), dots[idMax].y+10000*Math.sin(dots[idMax].rad));
	ctxFill();
}
function drawShadowPoly(obj) {
	var dots=[];
	for (var p=0; p<obj.points.length; ++p) {
		dots.push({rad:getRadianBetween(player,{x:obj.points[p].x, y:obj.points[p].y}), x:obj.points[p].x, y:obj.points[p].y});
		if (dots[p].rad<0) dots[p].rad+=Circle;
	};
	var minR=1000; var idMin=-1;
	for (var r=0; r<dots.length; ++r) {
		if (dots[r].rad<minR) {
			minR=dots[r].rad; idMin=r;
		}
	}
	var maxR=-1000; var idMax=-1;
	for (var r=0; r<dots.length; ++r) {
		if (dots[r].rad>maxR) {
			maxR=dots[r].rad; idMax=r;
		}
	}
	ctx.beginPath(); ctx.fillStyle="#000";
	ctx.moveTo(dots[idMin].x+5000*Math.cos(dots[idMin].rad), dots[idMin].y+5000*Math.sin(dots[idMin].rad));
	ctx.lineTo(dots[idMin].x, dots[idMin].y);
	ctx.lineTo(dots[idMax].x, dots[idMax].y);
	ctx.lineTo(dots[idMax].x+5000*Math.cos(dots[idMax].rad), dots[idMax].y+5000*Math.sin(dots[idMax].rad));
	ctxFill();
}
function drawShadowArc(obj) {
	ctx.beginPath(); ctx.fillStyle="#000";
	var radtoobj=getRadianBetween(player,obj);
	var dotl={x: obj.x+obj.radius*Math.cos(radtoobj+1.57), y: obj.y+obj.radius*Math.sin(radtoobj+1.57)};
	dotl.rad=getRadianBetween(player,dotl);
	var dotr={x: obj.x+obj.radius*Math.cos(radtoobj-1.57), y: obj.y+obj.radius*Math.sin(radtoobj-1.57)};
	dotr.rad=getRadianBetween(player,dotr);
	ctx.moveTo(dotl.x+1500*Math.cos(dotl.rad), dotl.y+1500*Math.sin(dotl.rad));
	ctx.lineTo(dotl.x, dotl.y); ctx.lineTo(dotr.x, dotr.y);
	ctx.lineTo(dotr.x+1500*Math.cos(dotr.rad), dotr.y+1500*Math.sin(dotr.rad));
	ctxFill();
}