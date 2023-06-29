class TextBox {
	active=false;
	value="";
	pos=0;
	time=0;
	max=20;
	onChange=()=>{};
	constructor(x, y, width, height) {
		this.x=x;
		this.y=y;
		this.w=width;
		this.h=height;
		document.addEventListener("mousedown", this.onmousedown, false);
		document.addEventListener("keydown", this.onkeydown, false);
	}
	hover() {
		if ((cursor.x>this.x) && (cursor.x<this.x+this.w) && (cursor.y>this.y) && (cursor.y<this.y+this.h)) {
			cursor.text(); return true;
		}
	}
	onmousedown=()=>{
		this.time=0;
		if (this.hover()) {
			this.active=true;
			let num=(cursor.x-(this.x+this.w/2-this.value.length*8))/16;
			this.pos=Math.trunc(num);
			if (this.pos>=this.value.length) this.pos=this.value.length-1;
			if (num<0) this.pos=-1;
		} else {
			this.active=false;
			this.onChange();
		}
	}
	onkeydown=(e)=>{
		if (this.active) {
			if (e.key==="Backspace" && this.pos>=0) {
				this.value=this.value.slice(0,this.pos)+this.value.slice(this.pos+1,this.value.length);
				this.pos--;
			}
			if (e.key==="Delete" && this.pos<this.value.length) {
				this.value=this.value.slice(0,this.pos+1)+this.value.slice(this.pos+2,this.value.length);
			}
			if ((e.key.charCodeAt(0) in symbolCor) && (this.value.length<=this.max)) {
				this.pos++;
				this.value=this.value.slice(0,this.pos)+e.key+this.value.slice(this.pos,this.value.length);
			}
			if ((e.key==" ") && (this.value.length<=this.max)) {
				this.pos++;
				this.value=this.value.slice(0,this.pos)+" "+this.value.slice(this.pos,this.value.length);
			}
			if (e.key==="ArrowLeft") {
				this.pos--;
				this.time=0;
			}
			if (e.key==="ArrowRight") {
				this.pos++;
				this.time=0;
			}
			if (this.pos<0) this.pos=-1;
			if (this.pos>=this.value.length) this.pos=this.value.length-1;
			this.onChange();
		}
	}
	draw() {
		if (this.hover() || this.active) {
			ctxInterface.strokeStyle="white";
			ctxInterface.lineWidth=2;
			ctxInterface.strokeRect(this.x, this.y, this.w, this.h);
		}
		drawText((this.x+this.w/2)-this.value.length*8, (this.y+this.h/2)-10, this.value, 2, 0);
		if (this.active) {
			this.time++;
			if (this.time<30) {
				let posX=(this.x+this.w/2)-this.value.length*8 + this.pos*16+8;
				let posY=(this.y+this.h/2)-10;
				ctxInterface.drawImage(imgCursor,0,0,8,10,posX, posY, 16,20);
			}
			if (this.time>60) this.time=0;
		}
	}
}