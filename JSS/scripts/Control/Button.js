class Button {
	imgText;
	img;
	ix; iy; iw; ih; isx; isy;
	x; y; w; h;
	text={text:"",size:1,dist:0};
	align=1;
	cX; cY;
	func;
	context;//окошечко
	mdown=false;
	ctx=null;
	active=false;
	_hidden=false;
	tag={};
	docX;
	docY;
	targetWindow=null;
	constructor(x,y,width,height) {
		this.x=x;
		this.y=y;
		this.docX=x;
		this.docY=y;
		this.w=width;
		this.h=height;
		this.ctx=ctxInterface;
		document.addEventListener("mousedown", this.mouseDown, false);
	}
	mouseDown=(e)=>{
		if (e.which==1 && this.hover() && this.mdown==false && !this._hidden) {
			this.mdown=true;
		} else this.mdown=false;
	}
	hidden() {this._hidden=true}
	show() {this._hidden=false}
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
		this.cY=this.h/2-5*this.text.size;
		this.imgText=createText(this.w, this.h, this.cX, this.cY, this.text.text, this.text.size, this.text.dist);
	}
	setText(text, size, dist) {
		this.text={text:text, size:size, dist:dist};
		this.setAlign(this.align);
		this.img=null;
	}
	setImage(img, sx, sy, sw, sh, width, height) {
		this.img=img;
		this.iw=width;
		this.ih=height;
		this.ix=this.x + this.w/2 - width/2;
		this.iy=this.y + this.h/2 - height/2;
		this.isx=sx;
		this.isy=sy;
		this.ish=sh;
		this.isw=sw;
		this.text=null;
	}
	setFunc(func) {
		document.removeEventListener("mouseup",this.func,false);
		this.func=()=> {
			if (this.hover() && this.mdown) {
				this.mdown=false;
				func();
			}
		}
		document.addEventListener("mouseup",this.func,false);
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
				this.mdown=false;
				return false;
			}
		}
	}
	draw() {
		if (!this._hidden) {
			this.ctx.beginPath();
			this.ctx.fillStyle="rgba(0,0,0,0.5)";
			this.ctx.fillRect(this.x+2, this.y+2, this.w, this.h);
			this.ctx.closePath();
			this.ctx.beginPath();

			this.ctx.fillStyle=(this.hover()||this.active)?"rgb(150,150,150)":"rgb(110,110,110)";
			if (this.mdown)	{
				this.ctx.fillRect(this.x+2, this.y+2, this.w, this.h);
				if (this.imgText) this.ctx.drawImage(this.imgText, this.x+2, this.y+2);
				if (this.img) this.ctx.drawImage(this.img, this.isx, this.isy, this.isw, this.ish, this.ix+2, this.iy+2, this.iw, this.ih);
			} else {
				this.ctx.fillRect(this.x, this.y, this.w, this.h);
				if (this.imgText) this.ctx.drawImage(this.imgText, this.x, this.y);
				if (this.img) this.ctx.drawImage(this.img, this.isx, this.isy, this.isw, this.ish, this.ix, this.iy, this.iw, this.ih);
			}
			this.ctx.closePath();
		}
	}
	drawContext() {
		if (this.context!=undefined && !this._hidden) {
			if (this.hover()) this.context.draw();
		}
	}
}