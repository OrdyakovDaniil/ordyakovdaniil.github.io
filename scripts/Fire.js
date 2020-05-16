function drawFire(fire) {
	if (fire.life>0) {
		var rand
		var grad=ctx.createRadialGradient(fire.x,fire.y,fire.life*1.2,fire.x,fire.y,10);
		grad.addColorStop(0,"rgba(200,100,50,0)"); grad.addColorStop(1,"rgba(200,100,50,0.2)");
		ctx.beginPath(); ctx.fillStyle=grad;
		ctx.arc(fire.x, fire.y, randomInt(fire.life,fire.life+30), 0, Circle); ctxFill();
	}
	ctx.beginPath(); ctx.strokeStyle="#420"; ctx.fillStyle="#333"; ctx.lineCap="round"; ctx.lineWidth=6;
	ctx.moveTo(fire.x, fire.y); ctx.lineTo(fire.x+15*Math.cos(fire.radian), fire.y+15*Math.sin(fire.radian)); ctxStroke(); ctx.strokeStyle="#530";
	ctx.beginPath(); ctx.moveTo(fire.x,fire.y); ctx.lineTo(fire.x+15*Math.cos(fire.radian-2.09), fire.y+15*Math.sin(fire.radian-2.09)); ctxStroke(); ctx.strokeStyle="#640";
	ctx.beginPath(); ctx.moveTo(fire.x,fire.y); ctx.lineTo(fire.x+15*Math.cos(fire.radian+2.09), fire.y+15*Math.sin(fire.radian+2.09)); ctxStroke();
	ctx.beginPath(); ctx.arc(fire.x+10*Math.cos(fire.radian+1.04), fire.y+10*Math.sin(fire.radian+1.04), 5, 0, Circle); ctxFill();
	ctx.beginPath(); ctx.arc(fire.x+10*Math.cos(fire.radian-1.04), fire.y+10*Math.sin(fire.radian-1.04), 5, 0, Circle); ctxFill();
	ctx.beginPath(); ctx.arc(fire.x+10*Math.cos(fire.radian+3.14), fire.y+10*Math.sin(fire.radian+3.14), 5, 0, Circle); ctxFill();
	if (fire.life>0) {
		ctx.beginPath(); ctx.fillStyle="rgba(255,255,0,0.2)"; ctx.arc(fire.x, fire.y, randomInt(fire.life/10,fire.life/5), 0, Circle); ctxFill();
	}
}
function newFire(x,y,radian) {
	var fire = new Object();
	fire.x=x; fire.y=y; fire.radian=radian; fire.life=100; fire.radius=20;
	fire.sound_fire = new Audio("sounds/fire.mp3");
	fire.sound_fire.play();
	fire.sound_frying = new Audio("sounds/meat_frying.mp3");
	fire.sound_boiling = new Audio("sounds/boiling.mp3");
	return fire;
}
var fireOnGrave = [];
var gFireOnGrave = [];