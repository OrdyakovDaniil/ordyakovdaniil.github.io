class Main {
	#ctx = Game.getContext("2d");
	#gamestate = 0;
	#tutor=1;
	#imgHumans = new Image();
	#imgBase = new Image();
	#angleRotate=0;
	start = () => {
		switch (this.#gamestate) {
			case 0: //наша база
			this.updateBase();
			this.drawBase();
			break;
			case 1:
			break;
		}
		requestAnimationFrame(this.start);
	}
	constructor() {
		this.#ctx.mozImageSmoothingEnabled = false;
		this.#ctx.webkitImageSmoothingEnabled = false;
		this.#ctx.msImageSmoothingEnabled = false;
		this.#ctx.imageSmoothingEnabled = false;
		this.#imgHumans.src = "./resources/peoples/man1.png";
		this.#imgBase.src = "./resources/base.png";
		if (true) { //если есть сохранение
			//загрузить сохранение
		}

		this.start();
	}
	updateBase = () => {console.log(1);}
	drawBase = () => {
		this.clearCanvas();
		var ctx = this.#ctx;
		ctx.fillStyle = "gray";
		ctx.fillRect(0,0,Game.width,40);//Рисование верхней области
		// ctx.fillRect(0,500,Game.width,550);
		ctx.drawImage(this.#imgBase,0,0,32,64,100,200,64,128);//Башня
		ctx.drawImage(this.#imgBase,32,32,32,32,164,264,64,64);//Бочка башни
		this.#angleRotate+=0.01; let m=0;
		for (var i = 0; i <= 6; ++i) {
			ctx.save(); m+=1.046
			ctx.translate(132, 200);
			ctx.rotate(this.#angleRotate+m);
			ctx.translate(-132, -200);
			ctx.drawImage(this.#imgBase,32,0,32,32,132,200,64,64);//Лопасть башни
			ctx.restore();
		}
		// ctx.drawImage(this.#imgHumans,100,100,128,128);
	}
	clearCanvas = () => {
		this.#ctx.clearRect(0, 0, Game.width, Game.height);
	}
}

var main = new Main();