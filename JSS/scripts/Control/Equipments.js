class Equipment {
	type=""; //тип предметов, которые может принять ячейка
	alltypes=true;
	myitem=null;
	set item(i) {//объект класса Item
		if (i==null) {
			this.myitem=null;
			this.context = new ContextWindow(this,200,{text:LText[this.type], size:2, dist:0});
			this.context.setAlign(1);
		} else {
			this.w=i.getWidth()*2;
			this.context = new ContextWindow(this,250,{text:i.getInfo(), size:1, dist:-1});
			if (this.type=="rightHand") {
				var lHand = gamewindow.getEquip("leftHand");
				if (i.isTwoHands()) {
					if (lHand.item!=null) {
						main.getPeoples()[Current_People].getInventory().push(gamewindow.getEquip("leftHand").item);
					}
					lHand.active=false;
					this.dw=i.getWidth()*2+4;
					this.w=this.dw;
					this.context = new ContextWindow(this,250,{text:i.getInfo(), size:1, dist:-1});				
				} else {
					lHand.active=true;
					this.dw=64;
					this.w=64;
					this.context = new ContextWindow(this,250,{text:i.getInfo(), size:1, dist:-1});
				}
			}
			this.myitem=i;
		}
	}
	get item() {
		return this.myitem;
	}
	static moveItem;
	static mDown;
	x; y; w=64; h=64;
	dw=64; dh=64;
	sx=-100; sy=-100;
	ix; iy;
	context=null;
	targetWindow=null;
	ctx;
	active=true;
	constructor(x, y, type) {
		if (type!=undefined) {
			this.type=type;
			switch (type) {
				case "rightHand":
				this.sx=32;
				this.sy=0;
				break;
				case "leftHand":
				this.sx=0;
				this.sy=0;
				break;
				case "head":
				this.sx=64;
				this.sy=0;
				break;
				case "torso":
				this.sx=0;
				this.sy=32;
				break;
				case "pants":
				this.sx=32;
				this.sy=32;
				break;
				case "shoes":
				this.sx=64;
				this.sy=32;
				break;
				case "bag":
				this.sx=0;
				this.sy=64;
				break;
				case "ammo":
				this.sx=32;
				this.sy=64;
				break;
			}
		}
		this.x=x; //для отрисовки ячейки
		this.y=y;
		this.ix=x;
		this.iy=y;
		this.docX=x;
		this.docY=y;
		this.ctx=ctxInterface;
		document.addEventListener("mousedown", this.onmousedown, false);
		document.addEventListener("mouseup", this.onmouseup, false);
		return this;
	}
	static nullItem() {console.log(true);Equipment.moveItem=null}
	static reorderNullItem() {
		document.removeEventListener("mouseup", Equipment.nullItem, false);
		document.addEventListener("mouseup", Equipment.nullItem, false);
	}
	hover() {
		if (this.active) {
			if (this.mDown) cursor.pointer();
			if (this.targetWindow!=null) {
				if (this.targetWindow.hover()) {
					// if (this.targetWindow.deltaY!=undefined) {
						if ((cursor.x>this.docX) && (cursor.x<this.docX+this.w) && (cursor.y+this.targetWindow.deltaY*2>this.docY) && (cursor.y+this.targetWindow.deltaY*2<this.docY+this.h)) {
							cursor.pointer(); return true;
						}
						return false;
					// }
				}
			} else {
				if ((cursor.x>this.docX) && (cursor.x<this.docX+this.dw) && (cursor.y>this.docY) && (cursor.y<this.docY+this.dh)) {
					cursor.pointer(); return true;
				}
				return false;
			}
		} else return false;
	}
	onmousedown=(e)=>{
		if (e.which==1 && this.hover() && this.item!=null ) {
			this.mDown=true;
			Equipment.moveItem=this;
		}
	}
	onmouseup=(e)=>{
		if (this.mDown) {
			this.ix=this.docX;
			this.iy=this.docY;
			this.mDown=false;
		}
		if (Equipment.moveItem!=null) {
			if (this.hover() && this.targetWindow==null) {
				if (this.isEquip(Equipment.moveItem.item)) {
					if (this.item!=null && Equipment.moveItem.targetWindow != null) {
						Equipment.moveItem.targetWindow.store.push(this.item);
					}
					this.item=Equipment.moveItem.item;
					main.getPeoples()[Current_People].getEquipments()[this.type]=this.item;
					if (Equipment.moveItem.targetWindow != null) {
						Equipment.moveItem.targetWindow.store.splice(Equipment.moveItem.id, 1);
						Equipment.moveItem.targetWindow.setStore(Equipment.moveItem.targetWindow.store);
						main.getPeoples()[Current_People].updateInventoryWeight();
					}
				}
				Equipment.moveItem=null;
			}
		}
		//Контекстное меню
		if (e.which==3) {
			if (this.hover() && this.item!=null) {
				var ctList = gamewindow.createList("contextWindow",cursor.x-gamewindow.x,cursor.y-gamewindow.y,200,100);
				ctList.closeFunc=()=>{
					gamewindow.deleteList("contextWindow");
				};
				if (this.item.getType()=="gun") {
					//Поиск патронов
					let store = gamewindow.getListItems("inv").store;
					let ammo = false;
					for (let i of store) {
						if (i.getName()==this.item.getAmmoType()) {
							ammo=true;
							break;
						}
					}
					if (gamewindow.getListItems("inv2")!=null) {

					}
					if (this.item.getAmmo() < this.item.getMaxAmmo() && ammo) {
						ctList.createButton({text:LText.reload, size:1, dist:0}, 30);
					}
					if (this.item.getAmmo() > 0) {
						ctList.createButton({text:LText.unload, size:1, dist:0}, 30);
					}
				}
				
			}
		}
	}
	draw() {
		if (this.active) {
			this.ctx.fillStyle="rgb(150,150,150)";
			this.ctx.fillRect(this.x, this.y, this.dw, this.dh);
			
			if (this.item==null) {
				this.ctx.drawImage(imgEquipments, this.sx, this.sy, 32, 32, this.x, this.y, this.dw, this.dh);
			}
		}
	}
	drawItem() {
		if (this.item!=null) {
			if (this.mDown) {
				this.ctx.drawImage(imgEquipments, this.sx, this.sy, 32, 32, this.x, this.y, 64, 64);
				if (this.type=="rightHand" && this.item.isTwoHands()) this.ctx.drawImage(imgEquipments, 0, 0, 32, 32, this.x+68, this.y, 64, 64);
				// this.ix=lerp(this.ix, cursor.x-32, 0.2); происходит какой-то баг. Разберись потом
				// this.iy=lerp(this.iy, cursor.y-32, 0.2);
				this.ix=cursor.x-32;
				this.iy=cursor.y-32;
				// this.item.drawImage(ctxInterface, this.ix, this.iy, this.w, this.h);
			} else {
				this.item.drawImage(this.ctx, this.x, this.y, this.dw, this.dh);
			}
			var count=this.item.getCount();
			if (count>1) {
				var tw = count.toString().length*8;
				var tx=this.ix+this.w-tw-2;
				ctxInterface.beginPath();
				ctxInterface.fillStyle="rgba(0,0,0,0.5)";
				ctxInterface.fillRect(tx-2,this.iy+50,tw+4, 14);
				ctxInterface.closePath();
				drawText(tx, this.iy+52, count, 1,0);
			}
		}
	}
	drawContext() {
		if (this.hover() && this.context!=null) this.context.draw();
	}
	isEquip(item) {
		return (item.getLocate()==this.type || this.alltypes)
	}
}