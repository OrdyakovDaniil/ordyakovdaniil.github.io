class Equipments {
	#img=new Image();
	#type="";
	#item=null; //объект класса Item
	#x; #y;
	constuctor(img, x, y, type) {
		this.#img=img;
		this.#type=type; //тип ячейки
		this.#x=x; //для отрисовки ячейки
		this.#y=y;
	}
	draw() {
		ctx.beginPath();
		ctx.strokeStyle="rgb(0,0,0)";
		ctx.lineWidth=4;
		ctx.strokeRect(this.#x-4, this.#y-4, 72,72);
		if (this.#item!=null) {
			ctx.drawImage(this.#item.getImg(), this.#x, this.#y, 64, 64);
		}
	}
	setItem(item) {
		this.#item=item;
	}
}
var equipments = [];
equipments.push(new Equipments("путь к изображению",100,100, "back"));
equipments.push(new Equipments("путь к изображению",100,100, "leftHand"));
equipments.push(new Equipments("путь к изображению",100,100, "rightHand"));
