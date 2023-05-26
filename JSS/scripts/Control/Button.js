class Button {
	imgText;
	x;
	y;
	w;
	h;
	text;
	align=1;
	cX;
	cY;
	func;
	context;//окошечко
	mdown=false;
	ctx=null;
	active=false;
	tag={};
	docX;
	docY;
	targetWindow=null;
	constructor(text,x,y,width,height) { //text - это объект {text, size, dist}
		// this.text=text;
		this.x=x;
		this.y=y;
		this.docX=x;
		this.docY=y;
		this.w=width;
		this.h=height;
		this.cY=this.h/2-5*text.size;
		this.text=text;
		this.setAlign(1);
		if (this.ctx==null) this.ctx=ctxInterface;
		document.addEventListener("mousedown", this.mouseDown, false);
	}
	mouseDown=(e)=>{
		if (e.which==1 && this.hover() && this.mdown==false) {
			this.mdown=true;
		} else this.mdown=false;
	}
	setAlign(align) {
		this.align=align;
		switch(align) {
			case 0:
			this.cX=10;
			break;
			case 1:
			this.cX=this.w/2-this.text.text.length/2*8*this.text.size;
			break;
			case 2:
			this.cX=this.w-this.text.text.length/2*8*this.text.size-10;
			break;
		}
		this.imgText=createText(this.w, this.h, this.cX, this.cY, this.text.text, this.text.size, this.text.dist);
	}
	setText(obj) {
		this.text=obj;
		this.imgText=createText(this.w, this.h, this.cX, this.cY, obj.text, obj.size, obj.dist);
		this.setAlign(this.align);
	}
	setFunc(func) {
		document.removeEventListener("click",this.func,false);
		this.func=()=> {
			if (this.hover() && this.mdown) {
				this.mdown=false;
				func(); //console.log(1);
			}
		}
		document.addEventListener("click",this.func,false);
	}
	getFunc() {
		return this.func;
	}
	hover() {
		if (this.targetWindow!=null) {
			if (this.targetWindow.hover()) {
				if (this.targetWindow.deltaY!=undefined) {
					if ((cursor.x>this.docX) && (cursor.x<this.docX+this.w) && (cursor.y+this.targetWindow.deltaY>this.docY) && (cursor.y+this.targetWindow.deltaY<this.docY+this.h)) {
						cursor.pointer(); return true;
					}
				} else {
					if ((cursor.x>this.docX) && (cursor.x<this.docX+this.w) && (cursor.y>this.docY) && (cursor.y<this.docY+this.h)) {
						cursor.pointer(); return true;
					}
				}
				return false;
			}
		}
	}
	draw() {
		// if (inRect(this.x, this.y, this.w, this.h, gamewindow.getPos().x, gamewindow.getPos().y, gamewindow.getSize().w, gamewindow.getSize().h)) {
			this.ctx.beginPath();
			this.ctx.fillStyle=(this.hover()||this.active)?"rgb(150,150,150)":"rgb(100,100,100)";
			this.ctx.fillRect(this.x, this.y, this.w, this.h);
			// let cX=this.x+this.w/2-this.text.text.length/2*8*this.text.size;
			// let cY=this.y+this.h/2-5*this.text.size;
			// drawText(cX,cY,this.text.text,this.text.size,this.text.dist);
			this.ctx.drawImage(this.imgText, this.x, this.y);
			this.ctx.closePath();
			if (this.context!=undefined) {
				if (this.hover()) this.context.draw();
			}
		// }
	}
}