let second=0;
let fps=0;
let showfps=0;
let minfps=60;
let fpstrigger=false;
function FPS() {
	drawText(965,750,minfps, 2,0);
	drawText(965,780,showfps, 2,0);
	drawText(900,780,cursor.y, 2,0);
	drawText(830,780,cursor.x, 2,0);
	if (gamewindow!=null) {
		drawText(10,780,cursor.y-gamewindow.y, 2,0);
		drawText(100,780,cursor.x-gamewindow.x, 2,0);
	}
	
	let realTime = new Date();
	fps++;
	if (second!=realTime.getSeconds()) {
		second=realTime.getSeconds();
		if (showfps==60) fpstrigger=true;
		if (fpstrigger && minfps>=showfps) minfps=showfps;
		showfps=fps;
		fps=0;
	}
}

const PI2 = Math.PI*2;
const randomInt=(min, max)=> {
	return floor(Math.random() * (max - min + 1)) + min;
}
const randomFloat=(min, max)=> {
	return Math.random() * (max - min) + min;
}
const pixelOn=(canvas)=> {
	canvas.mozImageSmoothingEnabled = false;
	canvas.webkitImageSmoothingEnabled = false;
	canvas.msImageSmoothingEnabled = false;
	canvas.imageSmoothingEnabled = false;
}
const inRect=(x1, y1, w1, h1,   x2, y2, w2, h2)=> {
	return (x1>x2) && (x1+w1<x2+w2) && (y1>y2) && (y1+h1<y2+h2);
}
const objectIn=(obj1, obj2)=> {
	return (obj1.x>obj2.x) && (obj1.x+obj1.w<obj2.x+obj2.w) && (obj1.y>obj2.y) && (obj1.y+obj1.h<obj2.y+obj2.h);
}
let order=true;
const sortBy=(tag, field)=> {
	if (order) {
		return (a, b) => a[tag][field] > b[tag][field] ? 1 : -1;
	} else {
		return (a, b) => a[tag][field] < b[tag][field] ? 1 : -1;
	}
}
const sortItemsByType=()=>{
	return (a, b) => a.getType() >= b.getType() ? 1 : -1;
}
const sort=(field)=> {
	return (a, b) => a[field] > b[field] ? 1 : -1;
}
const minToFormat=(min)=> {
	let hour=Math.trunc(min/60);
	let minutes=min % 60;
	return {
		h: (hour<10)?"0"+hour:hour,
		m: (minutes<10)?"0"+minutes:minutes
	}
}
const lerp=(start, end, amt)=> {
	return (1-amt)*start+amt*end;
}

const floor=(num)=>{
	return num>>0
}
const ceil=(num)=>{
	return (num+1)>>0
}
const round=(num)=>{
	return (num%1 > 0.5)? ceil(num): floor(num)
}
// const trunc=(num, count)=>{
// 	var st=Math.pow(10,count);
// 	console.log(st);
// 	return floor(num*100)/100;
// }