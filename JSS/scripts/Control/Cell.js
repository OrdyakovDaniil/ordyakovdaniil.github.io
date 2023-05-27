class Cell {
	x;
	y;
	w=64;
	h=64;
	inner=null;
	offset=0;
	active=false;
	func;
	constructor(x,y) {
		this.x=x;
		this.y=y;
	}
	hover() {
		return ((cursor.x>this.x) && (cursor.x<this.x+this.w) && (cursor.y>this.y) && (cursor.y<this.y+this.h));
	}
	setFunc(func) {
		document.removeEventListener("mouseup",this.func,false);
		this.func=()=> {
			if (this.hover()) {
				func();
			}
		}
		document.addEventListener("mouseup",this.func,false);
	}
	
	draw() {
		ctxInterface.save();
		ctxInterface.beginPath();
		ctxInterface.fillStyle="rgb(100,100,100)";
		if (this.hover() || this.active) {
			cursor.pointer();
			this.offset++;
			if (this.offset >= 16) {
				this.offset = 0;
			}
			ctxInterface.setLineDash([8, 8]);
			ctxInterface.lineDashOffset = -this.offset;
			ctxInterface.strokeStyle="rgb(200,200,200)";
		} else {
			ctxInterface.strokeStyle="rgb(0,0,0)";
		}
		ctxInterface.lineWidth=4;
		ctxInterface.fillRect(this.x,this.y,this.w,this.h);
		if (this.inner) this.inner.draw(this.x,this.y,this.w,this.h);
		ctxInterface.strokeRect(this.x,this.y,this.w,this.h);
		ctxInterface.closePath();
		ctxInterface.restore();
	}
}