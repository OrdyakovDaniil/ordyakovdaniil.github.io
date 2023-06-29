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
const imgEquipments = new Image();
const imgStats = new Image();
const imgButton = new Image();
const imgCursor = new Image();
const imgItemsIco = new Image();

let gameWidth;
let gameHeight;
let Current_People=0;
class Main {
	#peopleID=0;
	#gamestate = 0;
	#settings = {tutor:true, language:"RU"};
	#world;
	#base={};
	#time;
	#every_hour;
	#every_min;
	#peoples=[];
	#time_to_eat={breakfast: 8, lunch:14, dinner: 18};
	#update=[];
	#draw=[];
	#cicle;
	#cicle2;
	#dh;
	#dm;
	#showtime;
	constructor() {
		// Game.setAttribute("width",window.innerWidth);
		// Game.setAttribute("height",window.innerHeight);
		ctx = Game.getContext("2d");
		ctxShadow = Layer1.getContext("2d");
		ctxInterface = Layer2.getContext("2d");
		Layer2.style.cursor="none";
		gameWidth=Game.width;
		gameHeight=Game.height;
		pixelOn(ctx);
		pixelOn(ctxShadow);
		pixelOn(ctxInterface);
		for (let s in imgPeople) {
			imgPeople[s].src = `./resources/textures/people/${s}.png`;
		}
		imgBase.src = "./resources/textures/base.png";
		imgBaseHover.src = "./resources/textures/base_hover.png";
		imgStats.src = "./resources/textures/stats.png";
		imgButton.src = `./resources/textures/buttons.png`;
		imgCursor.src = `./resources/textures/cursor.png`;
		imgEquipments.src = `./resources/textures/equipments.png`;
		imgItemsIco.src = `./resources/textures/items.png`;
		switchLang(this.#settings.language);
		this.#world = new World();
		for (let i=0; i<30; ++i) {
			this.#peoples.push(new People());
		};
		this.#base.waterExtract = new WaterExtract();
		this.#base.waterStorage = new WaterStorage();
		this.#base.clinic = new Clinic();
		this.#base.home = new House();
		///////////////////////////////Пример установки лидера
		let mLid=0; let lidID;
		for (let p of this.#peoples) {
			if (p.getLider()>mLid) {
				mLid=p.getLider();
				lidID=p;
			}
		}
		this.#base.home.workers[0]=lidID;
		lidID.setStatus(LText.status_lider);
		///////////////////////////////
		if (true) { //если есть сохранение
			//загрузить сохранение
		}
		Layer2.oncontextmenu = function () {return false;}
		this.#update[0]=this.#updateBase.bind(this);
		this.#draw[0]=this.#drawBase.bind(this);
		this.#start();
	}
	#start=()=> {
		this.#update[this.#gamestate]();
		// this.#cicle = setTimeout(this.#update[this.#gamestate]);
		this.#draw[this.#gamestate]();
	}

	removePeopleOfStuctures(people) {
		for (let b in this.#base) {
			for (let p=0; p<5; ++p) {
				if (this.#base[b].builders[p]!=null) {
					if (this.#base[b].builders[p].getID()==people.getID()) this.#base[b].builders[p]=null;
				}
				if (gamewindow.checkCell("builder"+p))
				if (gamewindow.getCell("builder"+p).people!=null) {
					if (gamewindow.getCell("builder"+p).people.getID()==people.getID()) {
						gamewindow.getCell("builder"+p).people=null;
					}
				}
			}
			for (let w=0; w<this.#base[b].workers.length; ++w) {
				if (this.#base[b].workers[w]!=null) {
					if (this.#base[b].workers[w].getID()==people.getID()) this.#base[b].workers[w]=null;
				}
				if (gamewindow.checkCell("worker"+w))
				if (gamewindow.getCell("worker"+w).people!=null) {
					if (gamewindow.getCell("worker"+w).people.getID()==people.getID()) {
						gamewindow.getCell("worker"+w).people=null;
					}
				}
			}
			// for (let c=0; c<5; ++c) {
			// 	if (gamewindow.getCell("builder"+c).people!=null) {
			// 		if (gamewindow.getCell("builder"+c).people.getID()==this.workers[1].getID()) {
			// 			gamewindow.getCell("builder"+c).people=null;
			// 		}
			// 	}
			// }
		}
	}
	getPeoples() {
		return this.#peoples;
	}
	getWeather(w) {
		return this.#world.weather[w];
	}
	setWeather(w) {
		this.#world.weather[w]=!this.#world.weather[w];
		return w+" "+this.#world.weather[w];
	}
	#updateBase() {
		this.#time = this.#world.updateTime();

		this.#dh=(this.#time.h<10)?"0"+this.#time.h:this.#time.h;
		this.#dm=(this.#time.m<10)?"0"+this.#time.m:this.#time.m;
		this.#showtime = this.#time.d+"д. "+this.#dh+":"+this.#dm;
		this.#world.update();
		if (this.#every_min!=this.#time.m) { //каждую минуту
			for (let i in this.#base) {
				this.#base[i].update();
			}
			if (this.#base.home.workers[1]==null) this.#base.home.timeToNewPeople=0;
			this.#world.updateEverySec();
		}
		this.#every_min=this.#time.m;

		// console.log(this.#every_hour);
		if (this.#every_hour!=this.#time.h) {  //каждый час
			this.#world.updateEveryMin();
			//------------Добыча воды------------//
			if (this.#base.waterExtract.workers[0]!=undefined) {
				if (this.#base.waterExtract.workers[0]!=null && !this.toBuild) {
					this.#base.waterStorage.water+= (this.#base.waterExtract.products + ceil(this.#base.waterExtract.workers[0].getStat("strength")/10));
				}
			} else {
				this.#base.waterStorage.water+=this.#base.waterExtract.products;
			}
			if (this.#base.waterStorage.water>this.#base.waterStorage.capacity) {
				this.#base.waterStorage.water=this.#base.waterStorage.capacity;
			}
			///////////////////////////////////////
			//------------Привлечение людей------------//
			if (this.#base.home.workers[1]!=null && (this.#peoples.length < this.#base.home.maxPeoples)) {
				this.#base.home.timeToNewPeople++;
				if (this.#base.home.timeToNewPeople>=112-this.#base.home.workers[1].getStat("intellect")) {
					this.#base.home.timeToNewPeople=0;
					//сделать вывод окошечка для подтверждения принятия человека с выводом инфомации о нём
					this.#peoples.push(new People(this.getNewID()));
				}
			}
			/////////////////////////////////////////////
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
		this.#cicle=setTimeout(this.#update[this.#gamestate],33);
	}
	#drawBase() {
		ctx.clearRect(0, 0, gameWidth, gameHeight);
		ctxShadow.clearRect(0,0,gameWidth, gameHeight);
		ctxInterface.clearRect(0,0,gameWidth, gameHeight);
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
		ctxInterface.fillRect(0,0,gameWidth,40);
		ctxInterface.closePath();
		ctxInterface.beginPath();
		ctxInterface.fillStyle = "rgb(90,90,90)";
		ctxInterface.strokeStyle = "rgb(70,70,70)";
		ctxInterface.lineWidth = 1;
		ctxInterface.fillRect(5,5,10+this.#showtime.length*16,30);
		ctxInterface.strokeRect(5,5,10+this.#showtime.length*16,30);
		ctxInterface.closePath();
		// Направляющая центральная
		// ctxInterface.beginPath();
		// ctxInterface.lineWidth=1;
		// ctxInterface.strokeStyle="rgb(0,0,0)";
		// ctxInterface.moveTo(500,0);
		// ctxInterface.lineTo(500,800);
		// ctxInterface.stroke();
		// ctxInterface.closePath();
		drawText(10,10,this.#showtime, 2,0);
		FPS();
		cursor.draw();
		requestAnimationFrame(this.#draw[this.#gamestate]);
	}
}