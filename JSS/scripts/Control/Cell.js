class Cell {
	x;
	y;
	w=64;
	h=64;
	people=null;
	offset=0;
	active=false;
	trigger=true;
	_hidden=false;
	change;
	constructor(x,y, target, status, changeFunc) {
		this.x=x;
		this.y=y;
		this.target=target;
		this.statusForPeople=status;
		this.change=changeFunc;
		document.addEventListener("mouseup",this.onclick,false);
	}
	hover() {
		return ((cursor.x>this.x) && (cursor.x<this.x+this.w) && (cursor.y>this.y) && (cursor.y<this.y+this.h));
	}
	hidden() {
		this._hidden=true;
	}
	show() {
		this._hidden=false;
	}
	setActive(bool) {
		this.trigger=bool;
	}
	onclick=(e)=> {
		if (this.hover() && e.which==1 && gamewindow!=null && this.trigger && !this._hidden) {
			if (this.target.ID==gamewindow.getObjectID()) {
				if (gamewindow.checkList("peoples")) gamewindow.getList("peoples").closeFunc();
				if (this.people==null) {
					this.active=true;
					let sort_fio = gamewindow.createButton("sort_fio", 10,400, 196,30);
					sort_fio.setText(LText.sort_fio, 2, 0);
					sort_fio.setAlign(0);
					let pX=0;
					for (let sk in profStats.carpenter) {
						let sort_skill = gamewindow.createButton("sort_skill_"+sk, 206+pX*32,400, 32,30);
						sort_skill.setImage(imgStats, pX*30, 0, 30, 30, 30, 30);
						sort_skill.context = new ContextWindow(sort_skill,220,{text:LText[sk], size:2, dist:0});
						sort_skill.context.setAlign(1);
						pX++;
					}

					let sort_status = gamewindow.createButton("sort_status", 558,400, 230,30);
					sort_status.setText(LText.status, 2, 0);
					sort_status.setAlign(1);

					let list_peoples = gamewindow.createList("peoples", 10,430,780,190);
					list_peoples.closeFunc=()=>{
						gamewindow.deleteList("peoples");
						gamewindow.deleteButton("sort_fio");
						for (let sk in profStats.carpenter) gamewindow.deleteButton("sort_skill_"+sk);
						gamewindow.deleteButton("sort_status");
						this.active=false;
					}
					for (let l=0; l<main.getPeoples().length; ++l) {
						let p=main.getPeoples()[l];
						if ((p.getStatus() != LText.status_lider) && (p.getStatus()!=this.statusForPeople)) {
							let txt=p.getName();
							let space="", pr=0;
							for (let sk in profStats.carpenter) {
								for (let k=0;k<=22+pr-txt.length; k++) space+=" ";
								txt+=space+p.getStat(sk);
								space=""; pr+=4;
							}
							for (let k=0;k<=66-txt.length; k++) space+=" ";
							txt+=space+p.getStatus();

							list_peoples.createButton({text: txt, size:1, dist: 0}, 30);
							let last=list_peoples.buttons.length-1;
							list_peoples.buttons[last].tag.fam = p.getName();

							for (let sk in profStats.carpenter)
								list_peoples.buttons[last].tag[sk] = p.getStat(sk);

							list_peoples.buttons[last].tag.status = p.getStatus();
							list_peoples.buttons[last].tag.index = l;
							let func1 = () => {
								main.removePeopleOfStuctures(p);
								p.setStatus(this.statusForPeople);
								this.people=p;
								this.change();
								list_peoples.closeFunc();
							}
							list_peoples.buttons[last].setFunc(func1);
						}
					}
					const sort=()=> {
						for (let j=0; j < list_peoples.buttons.length; ++j) {
							let b=list_peoples.buttons[j];
							b.y = 5 + j * b.h;
							b.docY = list_peoples.y + 5 + j * b.h;
						}
					}
					sort_fio.setFunc(()=>{
						if (gamewindow!=null) {
							order = !order;
							list_peoples.buttons.sort(sortBy("tag","fam"));
							sort();
						}
					});
					for (let sk in profStats.carpenter) {
						gamewindow.getButton("sort_skill_"+sk).setFunc(()=>{
							if (gamewindow!=null) {
								order = !order;
								list_peoples.buttons.sort(sortBy("tag",sk));
								sort();
							}
						});
					}
					sort_status.setFunc(()=>{
						if (gamewindow!=null) {
							order = !order;
							list_peoples.buttons.sort(sortBy("tag","status"));
							sort();
						}
					});
				}
				else {
					this.people.setStatus(LText.status_free);
					this.people=null;
				}
			}
		}
	}
	draw() {
		if (!this._hidden) {
			ctxInterface.save();
			ctxInterface.beginPath();
			
			if (this.hover()) {
				if (this.trigger) cursor.pointer();
				if (this.people!=null) {
					ctxInterface.fillStyle="rgb(150,150,150)";
					let x=this.x;
					if (x-150<0) x=150;
					ctxInterface.fillRect(x-150,this.y-105,358,100);
					let text=this.people.getName();
					drawText(x+32-text.length*8, this.y-100, text, 2, 0);
					let count=0;
					for (let st in profStats.carpenter) {
						ctxInterface.drawImage(imgStats, 30*count, 0, 30, 30, x-144+32*count, this.y-70, 30, 30);
						drawText(x-140+count*32, this.y-30, this.people.getStat(st),1,0);
						count++;
					}
				}
			}
			ctxInterface.fillStyle="rgb(150,150,150)";
			if ((this.hover() || this.active) && this.trigger) {
				this.offset++;
				if (this.offset >= 16) {
					this.offset = 0;
				}
				ctxInterface.setLineDash([8, 8]);
				ctxInterface.lineDashOffset = -this.offset;
				ctxInterface.strokeStyle="rgb(200,200,200)";
			} else {
				ctxInterface.strokeStyle="rgb(100,100,100)";
			}
			ctxInterface.lineWidth=4;
			ctxInterface.fillRect(this.x,this.y,this.w,this.h);
			ctxInterface.strokeRect(this.x,this.y,this.w,this.h);
			if (this.people) {
				this.people.drawIcon(this.x,this.y,this.w,this.h);
				if (this.hover() && this.trigger) {
					ctxInterface.restore();
					ctxInterface.strokeStyle="rgb(200,200,200)";
					ctxInterface.fillStyle="rgba(0,0,0,0.5)";
					ctxInterface.fillRect(this.x+2,this.y+2,this.w-4,this.h-4);
					ctxInterface.moveTo(this.x+10,this.y+10);
					ctxInterface.lineTo(this.x+this.w-10, this.y+this.h-10);
					ctxInterface.stroke();
					ctxInterface.moveTo(this.x+this.w-10,this.y+10);
					ctxInterface.lineTo(this.x+10, this.y+this.h-10);
					ctxInterface.stroke();
				}
			}
			else {
				ctxInterface.drawImage(imgPeople.head, 0, 32, 32, 32, this.x, this.y, 64,64);
			}
			ctxInterface.closePath();
			ctxInterface.restore();
		}
	}
}