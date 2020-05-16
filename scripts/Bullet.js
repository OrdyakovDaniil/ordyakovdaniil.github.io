function newBullet(x, y, radian, damage, length, width, speed) {
	var bullet=new Object();
	bullet.x = x;
	bullet.y = y;
	bullet.timeToLive = 100;
	bullet.radian = radian;
	bullet.width = width;
	bullet.lX = bullet.x-length*Math.cos(bullet.radian);
	bullet.lY = bullet.y-length*Math.sin(bullet.radian);
	bullet.dx = (x-bullet.lX)*speed;
	bullet.dy = (y-bullet.lY)*speed;
	bullet.damage = damage;
	return bullet;
}
function updateBullet(bullet) {
	bullet.x+=bullet.dx; bullet.y+=bullet.dy;
	bullet.lX+=bullet.dx; bullet.lY+=bullet.dy;
}
function drawBullet(bullet) {
	ctx.beginPath(); ctx.strokeStyle="#fff"; ctx.lineWidth=bullet.width; ctx.lineCap="round";
	ctx.moveTo(bullet.x, bullet.y); ctx.lineTo(bullet.lX,bullet.lY);
	ctx.stroke(); ctx.closePath();
}
var bullet = [];