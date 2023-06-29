class gameWindow{
	x;
	y;
	w;
	h;
	#buttons={};
	#obj;
	#lists={};
	#textBoxs={};
	#equipments={};
	#cells={};
	#listsItems={};
	constructor(x, y, width, height, obj) {
		this.x=x;
		this.y=y;
		this.w=width;
		this.h=height;
		this.#buttons.close=new Button(this.x+this.w-37,this.y+3,32,32);
		this.#buttons.close.setImage(imgButton,0,0,10,9,30,27);
		this.#buttons.close.targetWindow=this;
		this.#obj=obj;
		this.#buttons.close.setFunc(()=>{
			for (let b in this.#buttons) {
				this.deleteButton(b);
			}
			for (let l in this.#lists) {
				this.deleteList(l);
			}
			for (let l in this.#listsItems) {
				this.deleteListItems(l);
			}
			for (let t in this.#textBoxs) {
				this.deleteTextBox(t);
			}
			for (let e in this.#equipments) {
				this.deleteEquip(e);
			}
			for (let b in this.#cells) {
				this.deleteCell(b);
			}
			gamewindow=null;
		});
	}
	hover() {
		if ((cursor.x>this.x) && (cursor.x<this.x+this.w) && (cursor.y>this.y) && (cursor.y<this.y+this.h)) {
			return true;
		} return false;
	}
	setObject(obj) {
		this.#obj=obj;
	}
	getObjectID() {
		return this.#obj.ID;
	}
	createList(index, x, y, w, h) {
		this.#lists[index]=new List(this.x+x,this.y+y,w, h);
		return this.#lists[index];
	}
	getList(index) {
		return this.#lists[index];
	}
	deleteList(index) {
		if (index in this.#lists) {
			order=false;
			document.removeEventListener("mousedown", this.#lists[index].mouseDown, false);
			document.removeEventListener("mouseup", this.#lists[index].mouseUp, false);
			document.removeEventListener("mousemove", this.#lists[index].mouseMove, false);
			document.removeEventListener("mousewheel", this.#lists[index].mouseWheel, false);
			for (let b in this.#lists[index].buttons) {
				document.removeEventListener("mouseup",this.#lists[index].buttons[b].func);
				document.removeEventListener("mousedown",this.#lists[index].buttons[b].mouseDown);
			}
			delete this.#lists[index];
		}
	}
	checkList(index) {
		return (index in this.#lists);
	}
	createListItems(index, x, y, w, h) {
		this.#listsItems[index]=new ListItems(x, y, w, h);
		return this.#listsItems[index];
	}
	getListItems(index) {
		return this.#listsItems[index];
	}
	deleteListItems(index) {
		if (index in this.#listsItems) {
			document.removeEventListener("mousedown", this.#listsItems[index].mouseDown, false);
			document.removeEventListener("mouseup", this.#listsItems[index].mouseUp, false);
			document.removeEventListener("mousemove", this.#listsItems[index].mouseMove, false);
			document.removeEventListener("mousewheel", this.#listsItems[index].mouseWheel, false);
			for (let e in this.#listsItems[index].equipments) {
				document.removeEventListener("mouseup",this.#listsItems[index].equipments[e].onmouseup);
				document.removeEventListener("mousedown",this.#listsItems[index].equipments[e].onmousedown);
			}
			delete this.#listsItems[index];
		}
	}
	checkListItems(index) {
		return (index in this.#listsItems);
	}
	createButton(index,x,y,width,height) {
		this.#buttons[index]=new Button(this.x+x,this.y+y,width,height);
		this.#buttons[index].targetWindow=this;
		return this.#buttons[index];
	}
	getButton(index) {
		return this.#buttons[index];
	}
	deleteButton(index) {
		if (index in this.#buttons) {
			document.removeEventListener("mouseup",this.#buttons[index].func);
			document.removeEventListener("mousedown",this.#buttons[index].mouseDown);
			delete this.#buttons[index];
		}
	}
	checkButton(index) {
		return (index in this.#buttons);
	}
	createTextBox(index, x, y, w, h) {
		this.#textBoxs[index] = new TextBox(x, y, w, h);
		return this.#textBoxs[index];
	}
	getTextBox(index) {
		return this.#textBoxs[index];
	}
	deleteTextBox(index) {
		if (index in this.#textBoxs) {
			document.removeEventListener("mousedown",this.#textBoxs[index].onmousedown);
			document.removeEventListener("keydown",this.#textBoxs[index].onkeydown);
			delete this.#textBoxs[index];
		}
	}
	createEquip(x, y, type) {
		this.#equipments[type] = new Equipment(x, y, type);
		return this.#equipments[type];
	}
	getEquip(index) {
		return this.#equipments[index];
	}
	deleteEquip(index) {
		if (index in this.#equipments) {
			document.removeEventListener("mousedown", this.#equipments[index].onmousedown);
			document.removeEventListener("mouseup", this.#equipments[index].onmouseup);
			delete this.#equipments[index];
		}
		document.removeEventListener("mouseup", Equipment.nullItem, false);
	}
	createCell(index, x, y, status, func) {
		this.#cells[index] = new Cell(x, y, this.#obj, status, func);
		return this.#cells[index];
	}
	getCell(index) {
		return this.#cells[index];
	}
	checkCell(index) {
		return (index in this.#cells);
	}
	deleteCell(index) {
		document.removeEventListener("mouseup",this.#cells[index].onclick);
		delete this.#cells[index];
	}
	hiddenCells() {
		for (let c in this.#cells) this.#cells[c].hidden();
	}
	showCells() {
		for (let c in this.#cells) this.#cells[c].show();
	}
	draw() {
		ctxInterface.beginPath();
		ctxInterface.globalCompositeOperation="source-over";
		ctxInterface.fillStyle="rgb(50,50,50)";
		ctxInterface.strokeStyle="rgb(100,100,100)";
		ctxInterface.lineWidth=5;
		ctxInterface.fillRect(this.x, this.y, this.w, this.h);
		ctxInterface.strokeRect(this.x, this.y, this.w, this.h);
		ctxInterface.closePath();
		ctxInterface.beginPath();
		ctxInterface.fillStyle="rgb(100,100,100)";
		ctxInterface.fillRect(this.x, this.y, this.w, 40);
		ctxInterface.closePath();
		let txt = LText[this.#obj.name];
		drawText(this.x+this.w/2-txt.length*8,this.y+10,txt,2,0);
		this.#obj.drawWindow();
		// ctxInterface.globalCompositeOperation="source-atop";
		for (let l in this.#lists) {
			this.#lists[l].draw();
		}
		for (let b in this.#buttons) {
			this.#buttons[b].draw();
		}
		for (let e in this.#equipments) {
			this.#equipments[e].draw();
		}
		for (let c in this.#cells) {
			this.#cells[c].draw();
		}
		for (let l in this.#listsItems) {
			this.#listsItems[l].draw();
		}
		for (let e in this.#equipments) {
			this.#equipments[e].drawItem();
		}
		for (let l in this.#listsItems) {
			this.#listsItems[l].drawItems();
		}
		for (let b in this.#buttons) {
			this.#buttons[b].drawContext();
		}
		for (let e in this.#equipments) {
			this.#equipments[e].drawContext();
		}
		if ("contextWindow" in this.#lists) this.#lists.contextWindow.draw();
		if (Equipment.moveItem!=null) {
			console.log(1)
			Equipment.moveItem.item.drawImage(ctxInterface, Equipment.moveItem.ix, Equipment.moveItem.iy, Equipment.moveItem.w, Equipment.moveItem.h);
		}
		// ctxInterface.globalCompositeOperation="source-over";
		
	}
}
var gamewindow=null;