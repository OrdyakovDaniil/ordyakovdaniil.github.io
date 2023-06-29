class Structures {
	static #id=0;
	ID;
	lvl = 1;
	name;
	builders = [];
	workers = [];
	timeToBuild = 0; //минут до постройки
	resources = {}; //ресурсы необходимые для постройки
	pos={x:0, y:0};
	size={w:0, h:0};
	toBuild=false;
	constructor() {
		document.addEventListener("click",this.onclick,false);
		this.ID=Structures.#id;
		Structures.#id++;
		for (let i=0;i<5;++i) this.builders[i]=null;
	}
	createControl() {}
	getImage(sx,sy,sw,sh) {
		let ctx2 = document.createElement('canvas');
		let can=ctx2.getContext('2d');
		ctx2.width=this.size.w;
		ctx2.height=this.size.h;
		pixelOn(can);
		can.drawImage(((this.hover())?imgBaseHover:imgBase),sx, sy, sw, sh, 0, 0, this.size.w, this.size.h);
		return ctx2;
	}
	hover() {
		if (gamewindow==null) {
			if ((cursor.x>this.pos.x) && (cursor.x<this.pos.x+this.size.w) && (cursor.y>this.pos.y) && (cursor.y<this.pos.y+this.size.h)) {
				cursor.pointer(); return true;
			} return false;
		}
	}
	getTimeToBuild() {
		let sum=0;
		for (let p of this.builders) {
			if (p!=null) sum+=ceil(p.getStat("carpentry")/10);
		}
		let showtime = 0;
		let psTTB = this.timeToBuild;
		if (sum>0)
		while (psTTB>0) {
			showtime++;
			psTTB-=sum;
		}
		return showtime;
	}
	update() {
		if (this.toBuild) {
			let sum=0;
			for (let p of this.builders) {
				if (p!=null) sum+=ceil(p.getStat("carpentry")/10);
			}
			this.timeToBuild-=sum;
			let showtime = this.getTimeToBuild();
			if (gamewindow!=null) {
				if (gamewindow.getObjectID()==this.ID) {
					let text=`${minToFormat(showtime).h}:${minToFormat(showtime).m}`;
					let sz=1;
					if (text=="00:00") text=LText.appoint_people; else sz=2;
					if (gamewindow.checkButton("levelUp"+this.ID)) gamewindow.getButton("levelUp"+this.ID).setText(text, sz, 0);
				}
			}
			if (this.timeToBuild<=0) {
				this.timeToBuild=0;
				this.toBuild=false;
				this.lvl++;
				if (gamewindow!=null && gamewindow.checkButton("levelUp"+this.ID))
					gamewindow.getButton("levelUp"+this.ID).setText(LText.levelUp, 2, 0);
				this.levelChange();
				this.resources.timeToBuild+=10000;
				for (let p of this.builders) {
					if (p.inner!=null) {
						p.inner.addStat("carpentry", 1);
						p.inner.setStatus(LText.status_free);
						p.inner=null;
					}
				}
			}
		}
	}
	onclick=()=> {
		if (this.hover() && gamewindow==null) {
			gamewindow = new gameWindow(100,50,800, 700, this);

			let showtime = this.getTimeToBuild();
			let text_b=`${minToFormat(showtime).h}:${minToFormat(showtime).m}`;
			let sz=1;
			if (text_b=="00:00") text_b=LText.appoint_people; else sz=2;
			let levelUp = gamewindow.createButton("levelUp"+this.ID, 620,640, 170,50);

			if (this.toBuild) {
				levelUp.setText(text_b, sz, 0);
				levelUp.active=true;
				for (let i=0;i<5;++i) {
					let func=()=>{
						this.builders[i]=gamewindow.getCell("builder"+i).people;
					};
					let builder = gamewindow.createCell("builder"+i,115+70*i, 675, LText.status_build+'('+LText[this.name]+')', func);
					builder.people=this.builders[i];
				}

				// for (let c of this.builders) c.active=false;
			} else {
				levelUp.setText(LText.levelUp, 2, 0);
				let text_c=`${LText.need}`;
				for (let i in this.resources) {
					if (i!="timeToBuild") text_c+=`\n${LText[i]}: ${this.resources[i]}`;
				}
				levelUp.context = new ContextWindow(levelUp, 170,{text:text_c, size:1.5, dist:0});
			}
			levelUp.setFunc(()=>{
				if (!this.toBuild) {
					this.toBuild=true;
					this.timeToBuild=this.resources.timeToBuild;
					levelUp.setText(text_b, 1, 0);
					levelUp.active=true;
					levelUp.context = null;
					for (let i=0;i<5;++i) {
						let func=()=>{
							this.builders[i]=gamewindow.getCell("builder"+i).people;
						};
						gamewindow.createCell("builder"+i,115+70*i, 675, LText.status_build+'('+LText[this.name]+')', func);
					}
				}
			});
			this.createControl();
		}
	}
	drawBuilders() {
		if (this.toBuild) {
			for (let c of this.builders) c.draw();
		}
	}
}