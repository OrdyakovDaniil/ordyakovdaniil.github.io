let second=0;
let fps=0;
let showfps=0;
function FPS() {
	drawText(965,880,showfps, 2,0);
	let realTime = new Date();
	fps++;
	if (second!=realTime.getSeconds()) {
		second=realTime.getSeconds();
		showfps=fps;
		fps=0;
	}
}

const PI2 = Math.PI*2;
const randomInt=(min, max)=> {
	return Math.floor(Math.random() * (max - min + 1)) + min;
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
let order=false;
const sortBy=(tag, field)=> {
	if (order) {
		return (a, b) => a[tag][field] > b[tag][field] ? 1 : -1;
	} else {
		return (a, b) => a[tag][field] < b[tag][field] ? 1 : -1;
	}
}