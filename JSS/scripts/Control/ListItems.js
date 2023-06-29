class ListItems {
	x;
	y;
	w;
	h;
	store; //объект хранилища (инвентарь игрока или склад)
	capacity; //вместимость склада или другого хранилища
	canvas;
	ctx;
	equipments={};
	curweight=0;
	curRealWeight=0;
	lX=0; lY=0; strc=0;
	slider={x:0,y:0,w:10,h:20};
	deltaY=0;
	ost=0;
	realH=0;
	filter=null;
	closeFunc=()=>{};
	mouse_Down=false;
	mouse_Slide=false;
	constructor(x,y,w,h) {
		this.x=x;
		this.y=y;
		this.w=w;
		this.h=h;
		this.realH=h;
		this.ost=this.realH-h;
		this.slider.x=x+w-10;
		this.slider.y=y + 15;
		this.canvas=document.createElement('canvas');
		this.canvas.width=floor(w/2);
		this.canvas.height=floor(h/2);
		pixelOn(this.canvas);
		this.ctx=this.canvas.getContext('2d');
		document.addEventListener("mousedown", this.mouseDown, false);
		document.addEventListener("mouseup", this.mouseUp, false);
		document.addEventListener("mousemove", this.mouseMove, false);
		document.addEventListener("mousewheel", this.mouseWheel, false);
	}
	sliderHover() {
		if ((cursor.x>this.slider.x-this.slider.w/2) && (cursor.x<this.slider.x+this.slider.w/2) && (cursor.y>this.slider.y-this.slider.h/2) && (cursor.y<this.slider.y+this.slider.h/2)) {
			return true;
		}
		return false;
	}
	slide() {
		if (this.slider.y<this.y+15) this.slider.y=this.y+15;
		if (this.slider.y>this.y+this.h-15) this.slider.y=this.y+this.h-15;
		this.deltaY=round(((this.slider.y-this.y-15)/(this.h-30)).toFixed(2) * this.ost);
		if (this.deltaY<0) this.deltaY=0;
	}
	mouseWheel=(e)=> {
		if (this.ost>0 && this.hover()) {
			var delta = 0;
			if (event.wheelDelta) { // IE, Opera, safari, chrome - кратность дельта равна 120
				delta = event.wheelDelta/120;
			} else if (event.detail) { // Mozilla, кратность дельта равна 3
				delta = -event.detail/3;
			}
			this.slider.y-=delta* (30/(this.ost/this.h));
			this.slide();
		}
	}
	mouseMove=(e)=> {
		if (this.ost>0) {
			if (this.mouse_Down && this.sliderHover()) {
				this.mouse_Slide=true;
			}
			if (this.mouse_Slide) {
				this.slider.y=cursor.y;
				this.slide();
			}
		}
	}
	mouseDown=(e)=> {
		if (!((cursor.x>this.x) && (cursor.x<this.x+this.w) && (cursor.y>this.y-30) && (cursor.y<this.y+this.h))) {
			this.closeFunc();
		}
		if (this.ost>0 && this.sliderHover()) {
			this.mouse_Down=false;
			if (e.which==1) { //если зажата левая кнопка мыши
				this.mouse_Down=true;
			}
		}
	}
	mouseUp=(e)=> {
		if (Equipment.moveItem!=null && this.hover() && Equipment.moveItem.targetWindow!=this) {
			if (this.curRealWeight+Equipment.moveItem.item.getWeight()<=this.capacity) {
				let sstore;
				if (Equipment.moveItem.targetWindow!=null) sstore = Equipment.moveItem.targetWindow.store;
				this.store.push(Equipment.moveItem.item);
				if (sstore!=undefined) {
					sstore.splice(Equipment.moveItem.id, 1);
					Equipment.moveItem.targetWindow.setStore(sstore);
				} else {
					main.getPeoples()[Current_People].getEquipments()[Equipment.moveItem.type]=null;
					Equipment.moveItem.item=null;
				}
				this.setStore(this.store);
				main.getPeoples()[Current_People].updateInventoryWeight();

				if (Equipment.moveItem.type=="rightHand") {
					gamewindow.getEquip("leftHand").active=true;
					gamewindow.getEquip("rightHand").dw=64;
					gamewindow.getEquip("rightHand").w=64;
					gamewindow.getEquip("rightHand").context = new ContextWindow(gamewindow.getEquip("rightHand"),200,{text:LText["rightHand"], size:2, dist:0});
					gamewindow.getEquip("rightHand").context.setAlign(1);
				}
				
			}
			Equipment.moveItem=null;
		}
		if (this.ost>0) {
			if (e.which==1) {
				this.mouse_Slide=false;
				this.mouse_Down=false;
			}
		}
	}
	hover() {
		if ((cursor.x>this.x) && (cursor.x<this.x+this.w) && (cursor.y>this.y) && (cursor.y<this.y+this.h)) {
			return true;
		} return false;
	}
	changeCurWeight() {
		this.curweight=0;
		this.curRealWeight=0;
		for (let e in this.equipments) {
			this.curweight+=this.equipments[e].item.getWeight();
		}
		for (let i of this.store) {
			this.curRealWeight+=i.getWeight();
		}
		this.curweight=floor(this.curweight*100)/100;
	}
	setStore(obj) {
		obj.sort(sortItemsByType());
		this.store=obj;
		this.lX=0;
		this.lY=0;
		this.strc=1;
		this.realH=this.h;
		for (let e in this.equipments) {
			this.deleteEquipment(e);
		}
		var id=0;
		if (this.filter!=null) {
			for (let i of this.store) {
				if (i.getType()==this.filter) {
					this.createEquipment(i,id);
				}
				id++;
			}
		} else {
			for (let i of this.store) {
				this.createEquipment(i,id);
				id++;
			}
		}
		this.changeCurWeight();
		Equipment.reorderNullItem();
	}
	createEquipment(item,id) {
		if (this.lX+item.getWidth() >= this.w/2) {
			this.lX=0;
			this.lY+=32;
			this.strc++;
			if (this.strc*64>this.realH) {
				this.realH=this.strc*64;
				this.ost=(this.realH-this.h)/2;
				this.slide();
			}
		}
		this.equipments[item.getName()+id] = new Equipment(this.lX, this.lY, item.getName()+id);
		var eq = this.equipments[item.getName()+id];
		eq.ctx=this.ctx;
		eq.docX = this.x+this.lX*2;
		eq.docY = this.y+this.lY*2;
		eq.item = item;
		eq.ix = this.x+this.lX;
		eq.iy = this.y+this.lY;
		eq.targetWindow=this;
		eq.dw=item.getWidth();
		eq.dh=item.getHeight();
		eq.w=item.getWidth()*2;
		eq.id=id;
		this.lX+=item.getWidth();
	}
	deleteEquipment(e) {
		document.removeEventListener("mousedown", this.equipments[e].onmousedown, false);
		document.removeEventListener("mouseup", this.equipments[e].onmouseup, false);
		delete this.equipments[e];
	}
	draw() {
		ctxInterface.strokeStyle="rgb(0,0,0)";
		ctxInterface.lineWidth=2;
		ctxInterface.strokeRect(this.x,this.y,this.w,this.h);
		ctxInterface.fillStyle="rgb(200,200,200)";
		if (this.ost>0) {
			if (this.sliderHover()) {
				this.slider.w=15;
				this.slider.h=30;
				cursor.pointer();
			} else {
				this.slider.w=10;
				this.slider.h=20;
			}
			ctxInterface.fillRect(this.slider.x-this.slider.w/2,this.slider.y-this.slider.h/2,this.slider.w,this.slider.h);
		}
	}
	drawItems() {
		this.ctx.clearRect(0,0,this.w, this.h);
		this.ctx.save();

		this.ctx.translate(0,-this.deltaY);
		for (let e in this.equipments) {
			this.equipments[e].drawItem();
		}
		ctxInterface.drawImage(this.canvas, this.x, this.y, this.w, this.h);
		this.ctx.restore();
		for (let e in this.equipments) {
			this.equipments[e].drawContext();
		}
	}
}