let ctx;
let ctxShadow;
let ctxInterface;
const imgBase = new Image();
const imgBaseHover = new Image();
const imgPeople={
	head: new Image(),
	eyes: new Image(),
	hair: new Image(),
	mouth: new Image(), //рот
	facehair: new Image()
}
class Main {
	#gamestate = 0;
	#settings = {tutor:true, language:"RU"};
	#world;
	#base={};
	#time;
	#every_hour;
	#every_min;
	#peoples=[];
	#time_to_eat={breakfast: 8, lunch:14, dinner: 18};
	#start=()=> {
		switch (this.#gamestate) {
			case 0: //наша база
			this.#updateBase();
			this.#drawBase();
			break;
			case 1:
			break;
		}
		FPS();
		requestAnimationFrame(this.#start);
	}
	getPeoples() {
		return this.#peoples;
	}
	getWeather(name) {
		return this.#world.weather[name];
	}
	constructor() {
		// Game.setAttribute("width",window.innerWidth);
		// Game.setAttribute("height",window.innerHeight);
		ctx = Game.getContext("2d");
		ctxShadow = Layer1.getContext("2d");
		ctxInterface = Layer2.getContext("2d");
		pixelOn(ctx);
		pixelOn(ctxShadow);
		pixelOn(ctxInterface);
		for (let s in imgPeople) {
			imgPeople[s].src = `./resources/textures/people/${s}.png`;
		}
		imgBase.src = "./resources/textures/base.png";
		imgBaseHover.src = "./resources/textures/base_hover.png";
		switchLang(this.#settings.language);
		this.#world = new World();
		for (let i=0; i<30; ++i) {
			this.#peoples.push(new People());
		};
		this.#peoples[0].setStatus(LText.status_lider);
		this.#base.waterExtract = new WaterExtract();
		this.#base.waterStorage = new WaterStorage();
		this.#base.clinic = new Clinic();
		this.#base.home = new House();
		// this.#base[0].setlvl(9);

		if (true) { //если есть сохранение
			//загрузить сохранение
		}
		Layer2.oncontextmenu = function () {return false;}
		
		this.#start();
	}
	getTime() {
		return this.#time
	}
	#updateBase() {
		this.#time = this.#world.updateTime();

		if (this.#every_min!=this.#time.m) { //каждую минуту
			for (let i in this.#base) {
				this.#base[i].update();
			}
			this.#world.update();
		}
		this.#every_min=this.#time.m;

		// console.log(this.#every_hour);
		if (this.#every_hour!=this.#time.h) {  //каждый час
			this.#world.updateWeather();
			for (let p of this.#peoples) {
				p.update();
				if (this.#base.home.storage_resources.food>0) //ОЧЕНЬ ЗАПУТАННО КУШАЕТ
				for (let e in this.#time_to_eat) {
					if (this.#time.h==this.#time_to_eat[e]) {
						if (p.eat(e)) this.#base.home.storage_resources.food--;
					}
				}
				if (this.#base.waterStorage.water>0) //ОЧЕНЬ ЗАПУТАННО ПЬЁТ
				for (let e in this.#time_to_eat) {
					if (this.#time.h==this.#time_to_eat[e]) {
						if (p.drink(e)) this.#base.waterStorage.water--;
					}
				}
			}
		}
		this.#every_hour=this.#time.h;
	}
	#drawBase() {
		ctx.clearRect(0, 0, Game.width, Game.height);
		ctxShadow.clearRect(0,0,Layer1.width, Layer1.height);
		ctxInterface.clearRect(0,0,Layer2.width, Layer2.height);
		cursor.default();
		this.#world.drawLayer();
		for (let b in this.#base) {
			this.#base[b].draw();
		}
		this.#world.drawRain();
		this.#world.drawShadow();
		
		if (gamewindow!=null) gamewindow.draw();
	//Рисование верхней области
		ctxInterface.beginPath();
		ctxInterface.fillStyle = "gray";
		ctxInterface.fillRect(0,0,Game.width,40);
		ctxInterface.closePath();
		let dh=(this.#time.h<10)?"0"+this.#time.h:this.#time.h;
		let dm=(this.#time.m<10)?"0"+this.#time.m:this.#time.m;
		let txt = this.#time.d+"д. "+dh+":"+dm;
		ctxInterface.beginPath();
		ctxInterface.fillStyle = "rgb(90,90,90)";
		ctxInterface.strokeStyle = "rgb(70,70,70)";
		ctxInterface.lineWidth = 1;
		ctxInterface.fillRect(5,5,10+txt.length*16,30);
		ctxInterface.strokeRect(5,5,10+txt.length*16,30);
		ctxInterface.closePath();
		drawText(10,10,txt, 2,0);
	}
}