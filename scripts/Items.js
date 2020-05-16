function newItem(type, id, count, x, y) {
	let item = new Object();
	item.id=id; item.type=type; item.count=count; item.x=x; item.y=y;
	return item;
}
function createAmmo(name, weight, max, info) {
	let ammo = new Object();
	ammo.name=name; ammo.weight=weight; ammo.info=info; ammo.max=max;
	return ammo;
}
function createCraft(name, weight, max, info) {
	let craft = new Object();
	craft.name=name; craft.weight=weight; craft.info=info; craft.max=max;
	return craft;
}
function createUsed(name, hun, thir, heal, ener, weight, max, info) {
	let used = new Object();
	used.name=name; used.hunger=hun; used.thirst=thir; used.health=heal;
	used.energy=ener; used.weight=weight; used.info=info; used.max=max;
	return used;
}
function createGun(name,damage,capacity,intervalShoot,timeToReload,weight,max,info) {
	let gun = new Object();
	gun.name=name; gun.damage=damage; gun.capacity=capacity; gun.intervalShoot=intervalShoot;
	gun.timeToReload=timeToReload; gun.weight=weight; gun.info=info; gun.max=max;
	return gun;
}
function createMelee(name,damage,weight,max,info) {
	let melee = new Object();
	melee.name=name; melee.damage=damage; melee.weight=weight; melee.info=info; melee.max=max;
	return melee;
}
function createStation(name,weight,max,info) {
	let station = new Object();
	station.name=name; station.weight=weight; station.info=info; station.max=max;
	return station;
}
var melee = [ //константный массив
	createMelee("Нож", 30, 0.3, 0, "Обычный нож. Подходит для разделки туш и защиты от диких животных. > урон 30 > вес 0.3 кг."),
	createMelee("Топор", 40, 1, 0, "Топор для рубки деревьев. Хорошее средство защиты > урон 40 > вес 1 кг."),
];
var guns = [ //константный массив
	createGun("Ружьё",50,5,70,50,5,0,"Охотничье ружьё калибра 7.62х54 мм. > урон 50 > ёмкость 5 патрон > вес без патронов 5 кг."),
	createGun("Дробовик",20,8,50,50,4,0,"Дробовик 12-го калибра. > урон 20*5 > ёмкость 8 патрон > вес без патронов 4 кг."),
	//createGun("Револьвер",50,6,30,50,1.5,0,""),
];
var ammo = [
	createAmmo("Патроны на ружьё", 0.05, 20, "Патрон 7.62х54 мм. Используется для охотничьего ружья. > вес 0.05 кг."),
	createAmmo("Патроны на дробовик", 0.04,32, "Патрон 12-го калибра (картечь). Крупная дробь, способная завалить даже медведя. > вес 0.04 кг."),
	//createAmmo("Патроны на револьвер", 0.03, 24,"")
];
var used = [
	createUsed("Сырое мясо", -30, 0, -10, 0, 1, 1,"Сырое мясо > голод -30 > здоровье -10 > вес 1 кг."),
	createUsed("Жареное мясо", -80, 20, 10, 0, 0.8, 1,"Жареное мясо > голод -80 > жажда +20 > здоровье +10 > вес 0.8 кг."),
	createUsed("Энергитический батончик", -10, 10, 0, 50, 0.1, 5,"Энергитический батончик > голод -10 > жажда +10 > энергия +50 > вес 0.1 кг."),
	createUsed("Консервы", -50, 10, 0, 0, 0.5, 2,"Консервированное мясо > голод -50 > жажда +10 > вес 0.5 кг."),
	createUsed("Аптечка", 0, 0, 100, 0, 1, 1,"Аптечка первой помощи > здоровье +100 > вес 1 кг."),
	createUsed("Грязная вода", 0, -50, -10, 0, 1.1, 1,"Грязная вода > жажда -50 > здоровье -10 > вес 1.1 кг."),
	createUsed("Чистая вода", 0, -50, 5, 0, 1, 1,"Чистая вода > жажда -50 > здоровье +5 > вес 1 кг."),
	createUsed("Энергитический напиток", 0, -30, 0, 100, 0.5, 2,"Энергитический напиток > жажда -30 > энергия +100 > вес 0.5 кг."),
];
var materials = [
	createCraft("Полено", 2, 1,"Полено для розжига костра > вес 2 кг."),
	createCraft("Камень", 0.5, 3,"Камень > вес 0.5 кг."),
	createCraft("Металлолом", 1, 1,"Металлолом > вес 1 кг."),
	createCraft("Порох", 0.2, 5,"Порох > вес 0.2 кг."),
	createCraft("Кожа", 0.5, 3,"Кожа > вес 0.5 кг."),
	createCraft("Ткань", 0.1, 5,"Ткань > вес 0.1 кг."),
];
var stations = [
	createStation("Набор для костра", 2, 0, "Набор для разведения костра > вес 2 кг.")
];
var itemsOnGrave = [];
var gItemsOnGrave = [];
//var pItemsOnGrave = [];
var ITEMS = [melee,guns,ammo,used,materials,stations];