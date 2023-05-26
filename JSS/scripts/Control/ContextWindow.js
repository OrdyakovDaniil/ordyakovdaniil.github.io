class ContextWindow {
	pos={x:0,y:0};
	size={w:0, h:0};
	text;
	constructor(width, height, text) {
		this.size={w:width,h:height};
		this.text=text;
	}
	draw() {
		this.pos.x=cursor.x-this.size.w/2;
		this.pos.y=cursor.y-this.size.h-10;
		if (this.pos.x+this.size.w>Game.width) this.pos.x=Game.width-this.size.w;
		ctxInterface.beginPath();
		ctxInterface.globalCompositeOperation="source-over";
		ctxInterface.fillStyle="rgba(0,0,0,0.5)";
		ctxInterface.fillRect(this.pos.x-10, this.pos.y-10, this.size.w+10, this.size.h+10);
		ctxInterface.closePath();
		// console.log(this.text.text);
		drawText(this.pos.x,this.pos.y,this.text.text,this.text.size,this.text.dist);
	}
}