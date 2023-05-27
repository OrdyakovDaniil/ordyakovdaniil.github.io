class List {
	x;
	y;
	w;
	h;
	buttons=[];
	canvas;
	ctx;
	slider={x:0,y:0,w:10,h:20};
	deltaY=0;
	ost=0;
	mouse_Down=false;
	mouse_Slide=false;
	constructor(x,y,w,h) {
		this.x=x;
		this.y=y;
		this.w=w;
		this.h=h;
		this.slider.x=x+w-10;
		this.slider.y=y + 15;
		this.canvas=document.createElement('canvas');
		this.ctx=this.canvas.getContext('2d');
		this.canvas.width=w;
		this.canvas.height=h;
		pixelOn(this.canvas);
		document.addEventListener("mousedown", this.mouseDown, false);
		document.addEventListener("mouseup", this.mouseUp, false);
		document.addEventListener("mousemove", this.mouseMove, false);
		document.addEventListener("mousewheel", this.mouseWheel, false);
	}
	sliderHover() {
		if ((cursor.x>this.slider.x-this.slider.w/2) && (cursor.x<this.slider.x+this.slider.w/2) && (cursor.y>this.slider.y-this.slider.h/2) && (cursor.y<this.slider.y+this.slider.h/2)) {
			return true;
		}
		return false;
	}
	slide() {
		if (this.slider.y<this.y+15) this.slider.y=this.y+15;
		if (this.slider.y>this.y+this.h-15) this.slider.y=this.y+this.h-15;
		this.deltaY=(((this.slider.y-this.y-15)/(this.h-30)).toFixed(2) * this.ost);
		if (this.deltaY<0) this.deltaY=0;
	}
	mouseWheel=(e)=> {
		if (this.ost>0 && this.hover()) {
			var delta = 0;
			if (event.wheelDelta) { // IE, Opera, safari, chrome - кратность дельта равна 120
				delta = event.wheelDelta/120;
			} else if (event.detail) { // Mozilla, кратность дельта равна 3
				delta = -event.detail/3;
			}
			this.slider.y-=delta* (30/(this.ost/this.h));
			this.slide();
		}
	}
	mouseMove=(e)=> {
		if (this.ost>0) {
			if (this.mouse_Down && this.sliderHover()) {
				this.mouse_Slide=true;
			}
			if (this.mouse_Slide) {
				this.slider.y=cursor.y;
				this.slide();
			}
		}
	}
	mouseDown=(e)=> {
		if (this.ost>0 && this.hover()) {
			this.mouse_Down=false;
			if (e.which==1) { //если зажата левая кнопка мыши
				this.mouse_Down=true;
			}
		}
	}
	mouseUp=(e)=> {
		if (this.ost>0) {
			if (e.which==1) {
				this.mouse_Slide=false;
				this.mouse_Down=false;
			}
		}
	}
	hover() {
		if ((cursor.x>this.x) && (cursor.x<this.x+this.w) && (cursor.y>this.y) && (cursor.y<this.y+this.h)) {
			return true;
		} return false;
	}
	createButton(text, height) {
		this.buttons.push(new Button(text,5,5+this.buttons.length*height, this.w-20, height));
		let i=this.buttons.length-1;
		this.buttons[i].ctx = this.ctx;
		this.buttons[i].docX = this.x+5;
		this.buttons[i].docY = this.y+5+i*height;
		this.ost=this.buttons.length * height - this.h + 10;
		this.buttons[i].setFunc(()=>{
			for (let b of this.buttons) b.active=false;
			this.buttons[i].active=true;
		});
	}

	draw() {
		this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
		this.ctx.save();
		this.ctx.translate(0,-this.deltaY);
		for (let b of this.buttons) {
			b.draw();
		}
		this.ctx.restore();
		this.ctx.strokeStyle="rgb(0,0,0)";
		this.ctx.lineWidth=5;
		this.ctx.strokeRect(0,0,this.w,this.h);
		
		ctxInterface.drawImage(this.canvas, this.x, this.y, this.w, this.h);
		ctxInterface.fillStyle="rgb(200,200,200)";
		if (this.ost>0)
		if (this.sliderHover()) {
			this.slider.w=15;
			this.slider.h=30;
			cursor.pointer();
		} else {
			this.slider.w=10;
			this.slider.h=20;
		}
		if (this.ost>0)	ctxInterface.fillRect(this.slider.x-this.slider.w/2,this.slider.y-this.slider.h/2,this.slider.w,this.slider.h);
	}
}