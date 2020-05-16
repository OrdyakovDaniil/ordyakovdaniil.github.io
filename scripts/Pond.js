function newPond(x,y) {
	var pond=new Object();
	pond.x=x; pond.y=y;
	pond.radius=randomInt(sectorSize/2-100, sectorSize/2-50);
	pond.radwave=pond.radius;
	pond.waves=[];
	pond.circleWaves=[];
	pond.innerSqr=Math.floor(pond.radius*0.707); //длина катета по гипотенузе(радиусу) k=R*sin(45grad)
	return pond;
}
function drawPond(pond) {
	if (pond.waves.length<10) {
		pond.waves.push({rad:randomInt(pond.radius-100,pond.radius-50),dir:randomFloat(0,Circle),alpha:0});
	}
	for (var w=0;w<pond.waves.length;++w) {
		pond.waves[w].rad=lerp(pond.waves[w].rad,pond.radius+10,0.01);
		if (pond.waves[w].rad>pond.radius+5) pond.waves.splice(w,1);
	}
	if (pond.circleWaves.length<3) {
		pond.circleWaves.push({x:randomInt(pond.x-pond.innerSqr,pond.x+pond.innerSqr),y:randomInt(pond.y-pond.innerSqr,pond.y+pond.innerSqr),radius:0,maxradius:randomInt(50,70),alpha:0.1});
	}
	for (var w=0;w<pond.circleWaves.length;++w) {
		pond.circleWaves[w].radius=lerp(pond.circleWaves[w].radius,pond.circleWaves[w].maxradius,0.01);
		if (pond.circleWaves[w].radius>pond.circleWaves[w].maxradius-5) pond.circleWaves.splice(w,1);
	}
	ctx.beginPath();
	grad = ctx.createRadialGradient(pond.x,pond.y,pond.radius-50, pond.x,pond.y,pond.radius+10);
	grad.addColorStop(0,"rgba(100,120,120,0.7)"); grad.addColorStop(1,"rgba(100,120,120,0.05)");
	ctx.fillStyle=grad;
	if (pond.trig&&pond.radwave>pond.radius-5) pond.radwave=lerp(pond.radwave,pond.radius-10,0.01);
	else {
		pond.trig=false;
		if (pond.radwave<pond.radius+5) pond.radwave=lerp(pond.radwave,pond.radius+10,0.02);
		else pond.trig=true;
	}
	ctx.arc(pond.x, pond.y, pond.radwave, 0, Circle);
	ctxFill(); ctx.lineCap="round"; ctx.lineWidth=20;
	for (var w=0; w<pond.waves.length; ++w) {
		pond.waves[w].alpha=lerp(pond.waves[w].alpha,0.1,0.005);
		ctx.strokeStyle="rgba(200,255,255,"+pond.waves[w].alpha+")";
		ctx.beginPath(); ctx.arc(pond.x, pond.y, pond.waves[w].rad, pond.waves[w].dir-0.3, pond.waves[w].dir+0.3);
		ctxStroke();
	} ctx.lineWidth=1;
	for (var w=0; w<pond.circleWaves.length; ++w) {
		pond.circleWaves[w].alpha=lerp(pond.circleWaves[w].alpha,0,0.01);
		ctx.strokeStyle="rgba(200,255,255,"+pond.circleWaves[w].alpha+")";
		ctx.beginPath(); ctx.arc(pond.circleWaves[w].x, pond.circleWaves[w].y, pond.circleWaves[w].radius, 0, Circle);
		ctxStroke();
	}
}
var ponds = [];
var gPonds = [];
var pPonds = [];