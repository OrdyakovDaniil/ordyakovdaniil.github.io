class gameWindow{
	x;
	y;
	w;
	h;
	#buttons={};
	#obj;
	#lists={};
	constructor(x, y, width, height, obj) {
		this.x=x;
		this.y=y;
		this.w=width;
		this.h=height;
		this.#buttons.close=new Button({text:"~",size:3,dist:0}, this.x+this.w-35,this.y+3,32,32);
		this.#buttons.close.targetWindow=this;
		this.#obj=obj;
		this.#buttons.close.setFunc(()=>{
			for (let b in this.#buttons) {
				document.removeEventListener("click",this.#buttons[b].getFunc());
				document.removeEventListener("mousedown",this.#buttons[b].mouseDown);
			}
			for (let l in this.#lists) {
				document.removeEventListener("mousedown", this.#lists[l].mouseDown, false);
				document.removeEventListener("mouseup", this.#lists[l].mouseUp, false);
				document.removeEventListener("mousemove", this.#lists[l].mouseMove, false);
				document.removeEventListener("mousewheel", this.#lists[l].mouseWheel, false);
				for (let b in this.#lists[l].buttons) {
					document.removeEventListener("click",this.#lists[l].buttons[b].getFunc());
				}
			}
			gamewindow=null;
		});
	}
	hover() {
		if ((cursor.x>this.x) && (cursor.x<this.x+this.w) && (cursor.y>this.y) && (cursor.y<this.y+this.h)) {
			return true;
		} return false;
	}
	createList(index, x, y, w, h) {
		this.#lists[index]=new List(this.x+x,this.y+y,w, h);
	}
	getList(index) {
		return this.#lists[index];
	}
	createButton(index, text,x,y,width,height) {
		this.#buttons[index]=new Button(text,this.x+x,this.y+y,width,height);
	}
	getButton(index) {
		return this.#buttons[index];
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
		ctxInterface.globalCompositeOperation="source-atop";
		for (let l in this.#lists) {
			this.#lists[l].draw();
		}
		for (let b in this.#buttons) {
			this.#buttons[b].draw();
		}
		ctxInterface.globalCompositeOperation="source-over";
		this.#obj.drawWindow();
	}
}
var gamewindow=null;