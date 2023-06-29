/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class WaterStorage extends Structures {
	capacity=30;
	water=30;
	resources={
		timeToBuild: 1000
	};
	constructor() {
		super();
		this.pos={x:164, y:264};
		this.size = {w: 64, h: 64};
		this.name="WaterStorage1";
	}
	levelChange() {
		switch (this.lvl) {
			case 2: this.name="WaterStorage2"; break;
			case 3: this.name="WaterStorage3"; break;
			default: this.name="WaterStorage4"; break; 
		}
		this.capacity+=5;
	}
	draw() {
		ctx.drawImage(this.getImage(32 * (this.lvl-1), 96, 32, 32), this.pos.x, this.pos.y, this.size.w, this.size.h);
		// ctx.drawImage(((this.hover())?imgBaseHover:imgBase),32 * (this.lvl-1), 96, 32, 32, this.pos.x, this.pos.y, 64, 64);//Бочка воды
	}
	drawWindow() {
		ctxInterface.beginPath();
		ctxInterface.lineWidth=5;
		ctxInterface.strokeStyle="rgb(100,100,100)";
		ctxInterface.fillStyle="rgb(120,120,120)";
		ctxInterface.fillRect(111, 100, 778, 256);
		ctxInterface.strokeRect(111, 100, 778, 256);
		ctxInterface.closePath();
		ctxInterface.drawImage(imgBase,32 * (this.lvl-1), 96, 32, 32, 436, 200, 128, 128);
		drawText(110,370,`${LText.level}: ${this.lvl}`,2,0);
		drawText(110,400,`${LText.capacity}: ${this.capacity}`,2,0);
	}
}