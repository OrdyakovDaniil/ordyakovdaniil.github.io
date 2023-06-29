class ContextWindow {
	x; y; w; h;
	text;
	align;
	cX; cY;
	imgText;
	
	constructor(object, width, text) {
		this.x=object.docX + object.w/2 - width/2;
		let otkl=10*text.size;
		for (let i=0; i<text.text.length; ++i) {
			if (text.text[i]=="\n") otkl+=(10*text.size);
		}
		this.y=object.docY-otkl-15;
		this.w=width;
		this.h=otkl+10;
		this.text=text;
		this.setAlign(0);
	}
	setAlign(align) {
		this.align=align;
		switch(align) {
			case 0:
			this.cX=5;
			break;
			case 1:
			this.cX=this.w/2-this.text.text.length/2*8*this.text.size;
			break;
			case 2:
			this.cX=this.w-this.text.text.length*4*this.text.size-5;
			break;
		}
		this.cY=5;
		this.imgText=createText(this.w, this.h, this.cX, this.cY, this.text.text, this.text.size, this.text.dist);
	}
	setText(text) {
		this.text=text;
		this.setAlign(this.align);
	}
	draw() {
		ctxInterface.beginPath();
		ctxInterface.globalCompositeOperation="source-over";
		ctxInterface.fillStyle="rgb(0,0,0)";
		ctxInterface.fillRect(this.x, this.y, this.w, this.h);
		ctxInterface.closePath();
		ctxInterface.drawImage(this.imgText, this.x, this.y);
	}
}