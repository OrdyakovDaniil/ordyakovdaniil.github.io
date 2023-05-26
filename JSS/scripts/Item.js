class Item {
	#params={};
	constructor(params) {
		this.#params=params;
	}
	draw(img, x, y) {
		ctx.drawImage(img, this.#params.sx, this.#params.sy, 32, 32, x, y, 64, 64);
	}
	create() {
		return this;
	}
	getDamage() {
		return this.#params.damage;
	}
	getType() {
		return this.#params.type;
	}
	getName() {
		console.log(this.#params.name);
		console.log(text);
		return text[this.#params.name];
	}
	
	// isEquip(item) { //можно ли вставить этот предмет в ячейку
	// 	return this.#whiteList.includes(item.id);
	// }
}

var items = {
	//clothing
	backpack_small: new Item({
		name: "backpack_small",
		position: "back",
		type: "clothing",
		capacity: 9,
		sx:0,
		sy:0
	}),
	backpack_medium: new Item({
		name: "backpack_medium",
		position: "back",
		type: "clothing",
		capacity: 12,
		sx:32,
		sy:0
	}),
	backpack_large: new Item({
		name: "backpack_large",
		position: "back",
		type: "clothing",
		capacity: 16,
		sx:64,
		sy:0
	}),
	//guns
	revolver: new Item({
		name: "revolver",
		position: "rightHand",
		type: "gun",
		ammo: 0,
		maxammo: 6,
		damage: 10,
		ammotype: "pistol_ammo",
		sx: 0,
		sy: 32
	}),
	pistol_ammo: new Item({
		name: "pistol_ammo",
		// position: null,
		type: "ammo",
		sx: 0,
		sy: 64
	})
};
// var it=items.backpack_small.create(); // пример создания предмета
