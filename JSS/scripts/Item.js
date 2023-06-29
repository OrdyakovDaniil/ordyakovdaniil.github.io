class Item {
	#params={};
	constructor(params, count) {
		let p={};
		Object.assign(p, params);
		this.#params=p;
		if (count!=null) this.#params.count=count;
	}
	drawImage(context, x, y, w, h) {
		context.drawImage(imgItemsIco, this.#params.sx, this.#params.sy, this.#params.sw, this.#params.sh, x, y, w, h);
	}
	getDamage() {
		return this.#params.damage;
	}
	getType() {
		return this.#params.type;
	}
	getLocate() {
		return this.#params.position;
	}
	getName() {
		return this.#params.name;
	}
	getCapacity() {
		return this.#params.capacity;
	}
	getWeight() {
		return floor(this.#params.weight*this.getCount()*100)/100;
	}
	getWidth() {
		return this.#params.sw;
	}
	getHeight() {
		return this.#params.sh;
	}
	getAmmo() {
		return this.#params.ammo;
	}
	getAmmoType() {
		return this.#params.ammotype;
	}
	getMaxAmmo() {
		return this.#params.maxammo;
	}
	getAccuracy() {
		return this.#params.accuracy;
	}
	getCount() {
		if ("count" in this.#params) return this.#params.count
			else return 1;
	}
	addCount(val) {
		if (val+this.#params.count<=this.#params.max_count) {
			this.#params.count+=val;
			return 0;
		}
		else {
			var c=this.#params.count;
			this.#params.count=this.#params.max_count;
			return val+c-this.#params.max_count;
		}

	}
	getShotRange() {
		return this.#params.shot_range;
	}
	getInfo() {
		var info = LText[this.getName()];
		// if ("count" in this.#params) info+=`(${this.#params.count})`;
		info+=`\n${LText.weight} ${this.getWeight()}\n`;
		switch (this.#params.type) {
			case "gun":
			info+=`${LText.damage} ${this.getDamage()}\n`;
			info+=`${LText[this.#params.ammotype]} ${this.getAmmo()}/${this.getMaxAmmo()}\n`;
			info+=`${LText.accuracy} ${this.getAccuracy()*100}%\n`;
			info+=`${LText.shot_range} ${this.getShotRange()}`
			break;
			case "ammo":
			
			break;
			case "clothing":
			if (this.#params.position == "bag") {
				info+=`${LText.capacity} ${this.#params.capacity}`;
			}
			break;
		}
		return info;
	}
	isTwoHands() {
		if ("two_hands" in this.#params) return this.#params.two_hands;
		else return false;
	}
}

var Items = {
	//clothing
	backpack_small: {
		name: "backpack_small",
		position: "bag",
		type: "clothing",
		capacity: 20,
		weight: 1,
		sx:0,
		sy:0,
		sw:32,
		sh:32,
	},
	backpack_medium: {
		name: "backpack_medium",
		position: "bag",
		type: "clothing",
		capacity: 30,
		weight: 1.5,
		sx:32,
		sy:0,
		sw:32,
		sh:32,
	},
	backpack_large: {
		name: "backpack_large",
		position: "bag",
		type: "clothing",
		capacity: 40,
		weight: 2,
		sx:64,
		sy:0,
		sw:32,
		sh:32,
	},
	//guns
	revolver: {
		name: "revolver",
		position: "rightHand",
		type: "gun",
		weight: 1,
		ammo: 0,
		maxammo: 6,
		damage: 15,
		accuracy: 0.75, //процент от точности персонажа. То есть, если у персонажа точность 100, то с этим оружием всё равно будет максимум 75.
		noise: 15, //клеток
		shot_range: 10, //дальность стрельбы при котором точность не будет уменьшаться
		shot_per_step: 1, //количество выстрелов за ход
		ammotype: "revolver_ammo",
		sx: 0,
		sy: 32,
		sw:32,
		sh:32,
	},
	pistol: { //ПМ
		name: "pistol",
		position: "rightHand",
		type: "gun",
		weight: 1.2,
		ammo: 0,
		maxammo: 8,
		damage: 10,
		accuracy: 0.8,
		noise: 20,
		shot_range: 15,
		shot_per_step: 2,
		ammotype: "pistol_ammo",
		// magazine: false,
		// magazinetype: "pistol_magazine",
		sx: 0,//
		sy: 32,//
		sw:32,
		sh:32,
	},
	pistol_silence: { //ПБ
		name: "pistol_silence",
		position: "rightHand",
		type: "gun",
		weight: 1.4,
		ammo: 0,
		maxammo: 8,
		damage: 10,
		accuracy: 0.75,
		noise: 10,
		shot_range: 15,
		shot_per_step: 2,
		ammotype: "pistol_ammo",
		// magazine: false,
		// magazinetype: "pistol_magazine",
		sx: 0,//
		sy: 32,//
		sw:32,
		sh:32,
	},
	rifle: {
		name: "rifle",
		position: "rightHand",
		two_hands: true,
		type: "gun",
		weight: 3,
		ammo: 0,
		maxammo: 5,
		damage: 50,
		accuracy: 0.95,
		noise: 30,
		shot_range: 50,
		shot_per_step: 1,
		ammotype: "rifle_ammo",
		sx: 32,
		sy: 32,
		sw:64,
		sh:32,
	},
	//ammo
	revolver_ammo: {
		name: "revolver_ammo",
		type: "ammo",
		position: "ammo",
		weight: 0.03,
		count: 1,
		max_count: 30,
		sx: 0,
		sy: 64,
		sw:32,
		sh:32,
	},
	pistol_ammo: {
		name: "pistol_ammo",
		type: "ammo",
		weight: 0.02,
		count:1,
		max_count: 50,
		sx: 0, //
		sy: 64, //
		sw:32,
		sh:32,
	},
	// pistol_magazine: {
	// 	name: "pistol_magazine",
	// 	type: "ammo",
	// 	weight: 0.2,
	// 	sx: 0, //
	// 	sy: 64, //
	// 	sw:32,
	// 	sh:32,
	// },
	rifle_ammo: {
		name: "rifle_ammo",
		type: "ammo",
		weight: 0.05,
		count:1,
		max_count: 25,
		sx: 0, //
		sy: 64, //
		sw:32,
		sh:32,
	}
};
// var it=new Item(Items.backpack_small); // пример создания предмета