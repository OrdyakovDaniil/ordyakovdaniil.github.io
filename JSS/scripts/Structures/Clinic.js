//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Clinic extends Structures {
	resources={
		timeToBuild: 10000
	}
	constructor() {
		super();
		this.pos={x:564, y:264};
		this.size = {w: 128, h: 128};
		this.name="Сlinic";
	}
	draw() {
		// ctx.drawImage(this.getImage(64,32,64,32),this.pos.x-128,this.pos.y,this.size.w*2,this.size.h);
	}
	drawWindow() {
		
	}
}