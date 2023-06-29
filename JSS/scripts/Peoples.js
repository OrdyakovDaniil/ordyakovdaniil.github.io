const professions=[
"carpenter", //плотник/строитель
"doctor",
"farmer",
"firefighter",
"hunter",
"mechanic",
"polisman",
"soldier",
"sportsman",
"teacher",
"unemployed" //безработный
];

class People {
	static #cur_id=0;
	static #max_weight=10;
	#id;
	#img;
	#man;
	#name;
	#status=LText.status_free;
	#hp=100;
	#eatTime={breakfast: true, lunch: true, dinner: true};
	#drinkTime={breakfast: true, lunch: true, dinner: true};
	#thirst=20;
	#hunger=20;
	#happy=100;
	#history;
	#profession;
	#stats={};
	#sickness = null; //болезнь
	#equipments = { //назначенные предметы
		leftHand: null,
		head: null,
		torso: null,
		rightHand: null,
		pants: null,
		shoes: null,
		bag: null,
		ammo: null,
	};
	#inventory=[];
	#inventoryWeight=0;
	constructor() {
		this.#id=People.#cur_id;
		People.#cur_id++;

		if (randomInt(0,100)<50) {
			this.#man=true;
			this.#name=LText.man_name[randomInt(0, LText.man_name.length-1)] + " " + LText.famili[randomInt(0, LText.famili.length-1)];
		} else {
			this.#man=false;
			this.#name=LText.woman_name[randomInt(0, LText.woman_name.length-1)] + " " + LText.famili[randomInt(0, LText.famili.length-1)]+"а";
		}
		this.#profession=professions[randomInt(0,professions.length-1)];
		switch (this.#profession) {
			case "carpenter":
			this.#stats={
				accuracy: 	randomInt(1,10),
				agility: 	randomInt(15,20),
				carpentry: 	randomInt(40,50),
				farming: 	randomInt(1,10),
				firstAid: 	randomInt(10,20),
				hunting: 	randomInt(1,10),
				mechanics: 	randomInt(20,30),
				sneaking: 	randomInt(20,30),
				strength: 	randomInt(40,50),
				intellect: 	randomInt(20,40),
				observation:randomInt(20,30),
			}
			break;
			case "doctor":
			this.#stats={
				accuracy: 	randomInt(1,10),
				agility: 	randomInt(10,20),
				carpentry: 	randomInt(1,10),
				farming: 	randomInt(1,10),
				firstAid: 	randomInt(40,50),
				hunting: 	randomInt(1,10),
				mechanics: 	randomInt(1,10),
				sneaking: 	randomInt(20,30),
				strength: 	randomInt(30,40),
				intellect: 	randomInt(40,50),
				observation:randomInt(30,40),
			}
			break;
			case "farmer":
			this.#stats={
				accuracy: 	randomInt(20,30),
				agility: 	randomInt(15,20),
				carpentry: 	randomInt(20,30),
				farming: 	randomInt(40,50),
				firstAid: 	randomInt(10,20),
				hunting: 	randomInt(20,30),
				mechanics: 	randomInt(20,30),
				sneaking: 	randomInt(10,20),
				strength: 	randomInt(30,40),
				intellect: 	randomInt(20,30),
				observation:randomInt(20,30),
			}
			break;
			case "firefighter":
			this.#stats={
				accuracy: 	randomInt(1,10),
				agility: 	randomInt(20,30),
				carpentry: 	randomInt(10,20),
				farming: 	randomInt(1,10),
				firstAid: 	randomInt(20,30),
				hunting: 	randomInt(1,10),
				mechanics: 	randomInt(10,20),
				sneaking: 	randomInt(10,20),
				strength: 	randomInt(40,50),
				intellect: 	randomInt(30,40),
				observation:randomInt(20,30),
			}
			break;
			case "hunter":
			this.#stats={
				accuracy: 	randomInt(40,50),
				agility: 	randomInt(30,40),
				carpentry: 	randomInt(20,30),
				farming: 	randomInt(1,10),
				firstAid: 	randomInt(20,30),
				hunting: 	randomInt(40,50),
				mechanics: 	randomInt(20,30),
				sneaking: 	randomInt(40,50),
				strength: 	randomInt(40,50),
				intellect: 	randomInt(20,30),
				observation:randomInt(40,50),
			}
			break;
			case "mechanic":
			this.#stats={
				accuracy: 	randomInt(10,20),
				agility: 	randomInt(10,20),
				carpentry: 	randomInt(10,20),
				farming: 	randomInt(1,10),
				firstAid: 	randomInt(10,20),
				hunting: 	randomInt(1,10),
				mechanics: 	randomInt(40,50),
				sneaking: 	randomInt(10,20),
				strength: 	randomInt(40,50),
				intellect: 	randomInt(30,40),
				observation:randomInt(10,20),
			}
			break;
			case "polisman":
			this.#stats={
				accuracy: 	randomInt(30,40),
				agility: 	randomInt(30,40),
				carpentry: 	randomInt(10,20),
				farming: 	randomInt(1,10),
				firstAid: 	randomInt(30,40),
				hunting: 	randomInt(1,10),
				mechanics: 	randomInt(20,30),
				sneaking: 	randomInt(20,30),
				strength: 	randomInt(30,40),
				intellect: 	randomInt(30,40),
				observation:randomInt(30,40),
			}
			break;
			case "soldier":
			this.#stats={
				accuracy: 	randomInt(40,50),
				agility: 	randomInt(40,50),
				carpentry: 	randomInt(20,30),
				farming: 	randomInt(1,10),
				firstAid: 	randomInt(40,50),
				hunting: 	randomInt(20,30),
				mechanics: 	randomInt(20,30),
				sneaking: 	randomInt(40,50),
				strength: 	randomInt(40,50),
				intellect: 	randomInt(20,30),
				observation:randomInt(40,50),
			}
			break;
			case "sportsman":
			this.#stats={
				accuracy: 	randomInt(1,10),
				agility: 	randomInt(40,50),
				carpentry: 	randomInt(1,10),
				farming: 	randomInt(1,10),
				firstAid: 	randomInt(10,20),
				hunting: 	randomInt(1,10),
				mechanics: 	randomInt(1,10),
				sneaking: 	randomInt(20,30),
				strength: 	randomInt(40,50),
				intellect: 	randomInt(10,20),
				observation:randomInt(10,20),
			}
			break;
			case "teacher":
			this.#stats={
				accuracy: 	randomInt(10,20),
				agility: 	randomInt(10,20),
				carpentry: 	randomInt(10,20),
				farming: 	randomInt(10,20),
				firstAid: 	randomInt(10,20),
				hunting: 	randomInt(10,20),
				mechanics: 	randomInt(10,20),
				sneaking: 	randomInt(10,20),
				strength: 	randomInt(20,30),
				intellect: 	randomInt(40,50),
				observation:randomInt(20,30),
			}
			break;
			case "unemployed":
			this.#stats={
				accuracy: 	randomInt(1,20),
				agility: 	randomInt(1,20),
				carpentry: 	randomInt(1,20),
				farming: 	randomInt(1,20),
				firstAid: 	randomInt(1,20),
				hunting: 	randomInt(1,20),
				mechanics: 	randomInt(1,20),
				sneaking: 	randomInt(1,20),
				strength: 	randomInt(1,20),
				intellect: 	randomInt(1,20),
				observation:randomInt(1,20),
			}
			break;
		}


		// for (let s in this.#stats) this.#stats[s]=100;
		



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
		this.#hp=randomInt(80,100);
		this.#history="Здесь будет рандомно генерируемая история персонажа,\nисходя из его параметров"+this.#id;

		////////////Инвентарь////////////////
		this.#equipments.rightHand=new Item(Items.revolver);
		// let bags = [
		// 	null,
		// 	new Item(Items.backpack_small),
		// 	new Item(Items.backpack_medium),
		// 	new Item(Items.backpack_large)
		// ]
		// this.#equipments.bag=bags[randomInt(0,3)];
		this.#inventory[0] = new Item(Items.revolver);
		this.#inventory[1] = new Item(Items.backpack_small);
		this.#inventory[2] = new Item(Items.backpack_medium);
		this.#inventory[3] = new Item(Items.backpack_large);
		this.#inventory[4] = new Item(Items.rifle);
		this.updateInventoryWeight();
		
	}
	getCapacity() {
		if (this.#equipments["bag"]!=null) return this.#equipments["bag"].getCapacity();
		else return People.#max_weight;
	}
	updateInventoryWeight() {
		this.#inventoryWeight=0;
		for (let i of this.#inventory) {
			this.#inventoryWeight+=i.getWeight();
		}
	}
	getInventoryWeight() {
		return this.#inventoryWeight;
	}
	getID() {
		return this.#id;
	}
	getLider() {
		let sum=0;
		for (let st in this.#stats) sum+=this.#stats[st];
		return sum;
	}
	getHP() {return this.#hp}
	getHunger() {return this.#hunger}
	getThirst() {return this.#thirst}
	getHistory() {return this.#history}
	getEat() {return this.#eatTime};
	getDrink() {return this.#drinkTime};
	changeEat(key) {this.#eatTime[key]=!this.#eatTime[key];}
	changeDrink(key) {this.#drinkTime[key]=!this.#drinkTime[key];}
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
	getName() {
		return this.#name;
	}
	setName(name) {
		this.#name = name;
	}

	getStat(skill) {
		return this.#stats[skill];
	}
	addStat(skill, xp) {
		this.#stats[skill] += xp * profStats[this.#profession][skill];
		if (this.#stats[skill]>100) this.#stats[skill]=100;
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
		if (this.#drinkTime[i]) {
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
	drawIcon(x, y, w, h) {
		// ctxInterface.drawImage(imgPeople.head, this.#img.head.x, this.#img.head.y, 32, 32, 0, 0, 128, 128);
		ctxInterface.drawImage(this.getImage(), x, y, w, h);
	}
	getEquipments() {
		return this.#equipments;
	}
	getInventory() {
		return this.#inventory;
	}
}

const profStats = {
	carpenter: {
		accuracy: 	0.5, 	//точность огнестрельного оружия
		agility: 	1.5, 	//ловкость для уклонения от ударов зомби
		carpentry: 	2, 		//строительство
		farming: 	0.5,	//фермерство
		firstAid: 	0.5,	//первая помощь
		hunting: 	0.5,	//охота
		mechanics: 	1,		//механика
		sneaking: 	0.5,	//скрытнсоть
		strength: 	1.5,	//сила для урона от подручного оружия
		intellect: 	1,
		observation: 1,
	},
	doctor: {
		accuracy: 	0.5,
		agility: 	1,
		carpentry: 	0.5,
		farming: 	0.5,
		firstAid: 	2,
		hunting: 	0.5,
		mechanics: 	0.5,
		sneaking: 	1,
		strength: 	1.5,
		intellect: 	2,
		observation: 1.5,
	},
	farmer: {
		accuracy: 	1,
		agility: 	1,
		carpentry: 	1,
		farming: 	2,
		firstAid: 	1,
		hunting: 	1.5,
		mechanics: 	1,
		sneaking: 	0.5,
		strength: 	1.5,
		intellect: 	1,
		observation: 1.5,
	},
	firefighter: {
		accuracy: 	0.5,
		agility: 	1.5,
		carpentry: 	0.5,
		farming: 	0.5,
		firstAid: 	1.5,
		hunting: 	0.5,
		mechanics: 	1,
		sneaking: 	0.5,
		strength: 	2,
		intellect: 	1,
		observation: 1,
	},
	hunter: {
		accuracy: 	1.5,
		agility: 	1.5,
		carpentry: 	0.5,
		farming: 	0.5,
		firstAid: 	1.5,
		hunting: 	2,
		mechanics: 	0.5,
		sneaking: 	2,
		strength: 	1,
		intellect: 	1,
		observation: 2,
	},
	mechanic: {
		accuracy: 	0.5,
		agility: 	0.5,
		carpentry: 	0.5,
		farming: 	0.5,
		firstAid: 	1,
		hunting: 	0.5,
		mechanics: 	2,
		sneaking: 	0.5,
		strength: 	2,
		intellect: 	1,
		observation: 0.5,
	},
	polisman: {
		accuracy: 	1.5,
		agility: 	1.5,
		carpentry: 	0.5,
		farming: 	0.5,
		firstAid: 	1.5,
		hunting: 	0.5,
		mechanics: 	1,
		sneaking: 	1,
		strength: 	1.5,
		intellect: 	2,
		observation: 2,
	},
	soldier: {
		accuracy: 	2,
		agility: 	2,
		carpentry: 	1,
		farming: 	0.5,
		firstAid: 	2,
		hunting: 	1,
		mechanics: 	1,
		sneaking: 	1.5,
		strength: 	2,
		intellect: 	1.5,
		observation: 1.5,
	},
	sportsman: {
		accuracy: 	0.5,
		agility: 	2,
		carpentry: 	0.5,
		farming: 	0.5,
		firstAid: 	1,
		hunting: 	0.5,
		mechanics: 	0.5,
		sneaking: 	1,
		strength: 	2,
		intellect: 	0.5,
		observation: 0.5,
	},
	teacher: {
		accuracy: 	1.5,
		agility: 	0.5,
		carpentry: 	1.5,
		farming: 	1.5,
		firstAid: 	1.5,
		hunting: 	1.5,
		mechanics: 	1.5,
		sneaking: 	1.5,
		strength: 	0.5,
		intellect: 	2,
		observation: 1,
	},
	unemployed: {
		accuracy: 	0.5,
		agility: 	0.5,
		carpentry: 	0.5,
		farming: 	0.5,
		firstAid: 	0.5,
		hunting: 	0.5,
		mechanics: 	0.5,
		sneaking: 	0.5,
		strength: 	0.5,
		intellect: 	0.5,
		observation: 0.5,
	}
}