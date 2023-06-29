/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class WaterExtract extends Structures { //Добыча воды
	products = 1; //кол-во добываемой воды в час
	energy = 0; //расход электричества в час
	alpha = 0; //для анимации
	angleRotate = 0; //Для вращения
	speed = 0;
	constructor() {
		super();
		this.pos={x:100, y:264};
		this.size = {w: 64, h: 64};
		this.name="WaterExtract1";
		this.resources={
			wood: 10,
			metal: 10,
			timeToBuild: 10000
		};
		this.lvl=9;
		this.levelChange()
	}
	levelChange() {
		if (this.lvl>=9) {
			this.workers=[];
			this.pos.y=200;
			this.size.h=128;
			this.name="WaterExtract2";
		}
		this.products+=1;
	}
	createControl() {
		if (this.lvl<9) {
			let wtrext = gamewindow.createCell("worker0",400,260,LText.status_waterExtract,()=>{
				this.workers[0]=gamewindow.getCell("worker0").people;
			});
			wtrext.people=this.workers[0];
		}
	}
	draw() {
		if (this.lvl < 9) {
			//Ручной насос
			if (this.workers[0] == null || this.toBuild) { //если человек не назначен
				ctx.drawImage(((this.hover())?imgBaseHover:imgBase), 0, 64, 32, 32, this.pos.x, this.pos.y, 64, 64);
			} else {
				this.alpha = (this.alpha < 60)? (this.alpha + 1) : 0;
				ctx.drawImage(((this.hover())?imgBaseHover:imgBase), 32 * ((this.alpha < 30) ? 1 : 2), 64, 32, 32, this.pos.x, this.pos.y, 64, 64);
			}
		} else {
			//Ветряной насос
			ctxShadow.drawImage(((this.hover())?imgBaseHover:imgBase), 0, 0, 32, 64, this.pos.x, this.pos.y, 64, 128);//Башня
			ctx.drawImage(((this.hover())?imgBaseHover:imgBase), 0, 0, 32, 64, this.pos.x, this.pos.y, 64, 128);//Башня
			if (main) {
				this.speed=(main.getWeather("wind"))?lerp(this.speed, 0.05, 0.01) : lerp(this.speed, 0.01, 0.005);
				this.angleRotate+=this.speed;
			}
			let m=0;
			for (var i = 0; i < 3; ++i) {
				
				ctxShadow.save(); 
				ctxShadow.translate(this.pos.x + 33, this.pos.y);
				ctxShadow.rotate(this.angleRotate + m);
				ctxShadow.translate(-this.pos.x - 33, -this.pos.y);
				ctxShadow.drawImage(((this.hover())?imgBaseHover:imgBase), 32, 0, 32, 32, this.pos.x-15, this.pos.y-48, 96, 96);//Лопасть башни
				ctxShadow.restore();

				ctx.save();
				ctx.translate(this.pos.x+33, this.pos.y);
				ctx.rotate(this.angleRotate + m);
				ctx.translate(-this.pos.x-33, -this.pos.y);
				ctx.drawImage(((this.hover())?imgBaseHover:imgBase), 32, 0, 32, 32, this.pos.x-15, this.pos.y-48, 96, 96);//Лопасть башни
				ctx.restore();

				m+=0.52;
			}
		}
	}
	drawWindow() {
		ctxInterface.beginPath();
		ctxInterface.lineWidth=5;
		ctxInterface.strokeStyle="rgb(100,100,100)";
		ctxInterface.fillStyle="rgb(120,120,120)";
		ctxInterface.fillRect(111, 100, 778, 256);
		ctxInterface.strokeRect(111, 100, 778, 256);
		ctxInterface.closePath();
		if (this.lvl < 9) {
			//Ручной насос
			ctxInterface.drawImage(imgBase, 0, 64, 32, 32, 436, 200, 128, 128);
			if (this.toBuild) {
				drawText(110,400,`${LText[this.name]} ${LText.levelRises}`,2,0);
			} else {
				drawText(110,400,`${LText.extract}: ${(this.workers[0]!=null && !this.toBuild)?ceil(this.workers[0].getStat("strength")/10)+this.products:0}/${LText.hour}`,2,0);
			}
		} else {
			//Ветряной насос
			ctxInterface.drawImage(imgBase, 0, 0, 32, 64, 468, 200, 64, 128);//Башня
			let m=0;
			for (var i = 0; i < 3; ++i) {
				ctxInterface.save(); m+=0.52;
				ctxInterface.translate(500, 200);
				ctxInterface.rotate(m);
				ctxInterface.translate(-500, -200);
				ctxInterface.drawImage(imgBase, 32, 0, 32, 32, 500-48, 200-48, 96, 96);//Лопасть башни
				ctxInterface.restore();
			}
			drawText(110,400,`${LText.extract}: ${this.products}/${LText.hour}`,2,0);
		}
		drawText(110,370,`${LText.level}: ${this.lvl}`,2,0);
	}
}