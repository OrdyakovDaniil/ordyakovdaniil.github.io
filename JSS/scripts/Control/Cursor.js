
class Cursor {
	x=0; y=0;
	sx=10; sy=0;
	ox=0; oy=0;
	constructor() {
		document.addEventListener("mousemove", this.move);

	}
	draw() {
		ctxInterface.drawImage(imgCursor, this.sx, this.sy, 16, 16, this.x-this.ox, this.y-this.oy, 16,16);
	}
	pointer() {
		//Подумать над оптимизацией. НЕ ОБРАЩАТЬСЯ К DOM ЭЛЕМЕНТАМ
		// Layer2.style.cursor="pointer";
		this.sx=42;
		this.sy=0;
		this.ox=5;
		this.oy=0;
	}
	text() {
		// Layer2.style.cursor="text";
		this.sx=10;
		this.sy=0;
		this.ox=8;
		this.oy=8;
	}
	default() {
		this.sx=26;
		this.sy=0;
		this.ox=0;
		this.oy=0;
		// Layer2.style.cursor="auto";
	}
	move=(e)=> {
		this.x=e.clientX-Layer2.offsetLeft;
		this.y=e.clientY-Layer2.offsetTop;
		// console.log("x: "+this.x+" y: "+this.y);
	}
}
var cursor = new Cursor();