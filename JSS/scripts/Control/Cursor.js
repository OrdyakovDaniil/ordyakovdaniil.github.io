class Cursor {
	x=0; y=0;
	constructor() {
		document.addEventListener("mousemove", this.move);
	}
	draw() {
		
	}
	pointer() {
		Layer2.style.cursor="pointer";
	}
	default() {
		Layer2.style.cursor="auto";
	}
	move=(e)=> {
		this.x=e.clientX;
		this.y=e.clientY;
		// console.log("x: "+this.x+" y: "+this.y);
	}
}
var cursor = new Cursor();