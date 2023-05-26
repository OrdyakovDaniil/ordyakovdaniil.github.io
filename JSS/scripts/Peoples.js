class People {
	#img;
	#man;
	#name;
	#fam;
	#status="Свободен";
	#hp=100;
	#eatTime={breakfast: true, lunch: true, dinner: true};
	#thirst=20;
	#hunger=20;
	#happy=100;
	#stats={};
	#sickness = null; //болезнь
	#equipments = equipments;
	#inventory=[]; //размер инвентаря зависит от рюкзака (9, 12, 16, 3 - если его нет)
	constructor() {
		if (randomInt(0,100)<50) {
			this.#man=true;
			this.#name=LText.man_name[randomInt(0, LText.man_name.length-1)];
			this.#fam=LText.famili[randomInt(0, LText.famili.length-1)];
		} else {
			this.#man=false;
			this.#name=LText.woman_name[randomInt(0, LText.woman_name.length-1)];
			this.#fam=LText.famili[randomInt(0, LText.famili.length-1)]+"а";
		}
		this.#stats.strength=randomInt(0,50); //будет зависеть урон от оружия
		this.#stats.agility=randomInt(0,10); //ловкость влияет на шанс уклонения от атак зомби
		this.#stats.accuracy=randomInt(0,50); //точность будет влиять на шанс попадания из огнестрела

		this.#img={
			head: {x:(this.#man)?0:32, y:0},
			eyes: {x:(this.#man)?0:14, y:7*randomInt(0,4)},
			hair: {x:(this.#man)?0:32, y:32*randomInt(0,2)},
			mouth: {x:0, y:32*randomInt(0,0)}, //рот
		};
		if (this.#man) {
			this.#img.facehair = {x:0, y:12*randomInt(0,2)};
		}
		
		this.#thirst=randomInt(0,20);
		this.#hunger=randomInt(0,20);
		this.#happy=randomInt(0,100);
		this.#hp=randomInt(50,100);
	}
	getImage() {
		let canvas = document.createElement('canvas');
		let myctx = canvas.getContext('2d');
		canvas.width=32;
		canvas.height=32;
		pixelOn(canvas);
		myctx.drawImage(imgPeople.head, this.#img.head.x, this.#img.head.y, 32, 32, 0, 0, 32, 32);
		myctx.drawImage(imgPeople.eyes, this.#img.eyes.x, this.#img.eyes.y, 14, 7, 9, 15, 14, 7);
		if (this.#man) {
			myctx.drawImage(imgPeople.facehair, this.#img.facehair.x, this.#img.facehair.y, 18, 12, 7, 19, 18, 12);
		}
		myctx.drawImage(imgPeople.mouth, this.#img.mouth.x, this.#img.mouth.y, 32, 32, 0, 0, 32, 32);
		myctx.drawImage(imgPeople.hair, this.#img.hair.x, this.#img.hair.y, 32, 32, 0, 0, 32, 32);
		return canvas;
	}
	getFullName() {
		return this.#fam+" "+this.#name;
	}
	getStatus() {
		return this.#status;
	}
	setStatus(st) {
		this.#status=st;
	}
	eat(e) {
		if (this.#eatTime[e]) {
			this.#hunger=0;
			return true;
		}
		return false;
	}
	drink(i) {
		if (this.#eatTime[i]) {
			this.#thirst=0;
			return true;
		}
		return false;
	}
	update() {
		this.#thirst+=2;
		this.#hunger+=1;
		if (this.#thirst>=20) {
			this.#thirst=20;
			this.#happy-=1;
			this.#hp-=1;
		} else {
			this.#happy+=1;
		}
		if (this.#hunger>=20) {
			this.#hunger=20;
			this.#happy-=1;
			this.#hp-=1;
		} else {
			this.#happy+=1;
		}
		if (this.#happy>100) this.#happy=100;
		if (this.#happy<0) this.#happy=0;
	}
	draw(x, y) {
		// ctxInterface.drawImage(imgPeople.head, this.#img.head.x, this.#img.head.y, 32, 32, 0, 0, 128, 128);
		ctxInterface.drawImage(this.getImage(), x, y, 256, 256);
	}
}