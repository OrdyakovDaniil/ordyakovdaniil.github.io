class Structures {
	lvl = 1;
	name;
	peoples = [];
	timeToBuild = {h:0, m:0}; //m для запоминания, чтобы постройки не улучшались в ровное время
	resources = {}; //ресурсы необходимые для постройки
	pos={x:0, y:0};
	size={w:0, h:0};
	toBuild=false;
	constructor() {
		for (let i=0;i<5;++i) {
			this.peoples[i]=new Cell(115+70*i, 675);
			this.peoples[i].setFunc(()=>{
				if (this.name==gamewindow.getObjectName()) {
					if (gamewindow.getList("peoples")) {
						gamewindow.deleteList("peoples");
						gamewindow.deleteButton("sort_fio");
						gamewindow.deleteButton("sort_status");
					}
					for (let c of this.peoples) c.active=false;
					this.peoples[i].active=true;
					gamewindow.createButton("sort_fio",{text: LText.sort_fio, size:2, dist: 0}, 10,320, 550,30);
					gamewindow.getButton("sort_fio").targetWindow = gamewindow;
					gamewindow.getButton("sort_fio").setAlign(0);
					gamewindow.createButton("sort_status",{text: LText.status, size:2, dist: 0}, 561,320, 229,30);
					gamewindow.getButton("sort_status").targetWindow = gamewindow;
					gamewindow.getButton("sort_status").setAlign(0);
					gamewindow.createList("peoples", 10,350,780,250);
					for (let l=0; l<main.getPeoples().length; ++l) {
						let p=main.getPeoples()[l];
						if (p.getStatus() == LText.status_free) {
							console.log(1);
							let txtm=p.getFullName()+p.getStatus();
							let space="";
							for (let k=0;k<=45-txtm.length; k++) space+=" ";
							let txt=p.getFullName() + space + p.getStatus();
							gamewindow.getList("peoples").createButton({text: txt, size:2, dist: 0}, 30);
							let last=gamewindow.getList("peoples").buttons.length-1;
							gamewindow.getList("peoples").buttons[last].tag.fam = p.getFullName();
							gamewindow.getList("peoples").buttons[last].tag.status = p.getStatus();
							gamewindow.getList("peoples").buttons[last].tag.index = l;
							gamewindow.getList("peoples").buttons[last].targetWindow = gamewindow.getList("peoples");
							let func1 = () => {
								this.peoples[i].inner=p;
								p.setStatus(LText.status_build+' "'+this.name+'"');
								gamewindow.deleteList("peoples");
								gamewindow.deleteButton("sort_fio");
								gamewindow.deleteButton("sort_status");
								this.peoples[i].active=false;
							}
							gamewindow.getList("peoples").buttons[last].setFunc(func1);
						}
					}
					const sort=()=> {
						for (let j=0; j < gamewindow.getList("peoples").buttons.length; ++j) {
							let b=gamewindow.getList("peoples").buttons[j];
							b.y = 5 + j * b.h;
							b.docY = gamewindow.getList("peoples").y + 5 + j * b.h;
						}
					}
					gamewindow.getButton("sort_fio").setFunc(()=>{
						if (gamewindow!=null) {
							order = !order;
							gamewindow.getList("peoples").buttons.sort(sortBy("tag","fam"));
							sort();
						}
					});
					gamewindow.getButton("sort_status").setFunc(()=>{
						if (gamewindow!=null) {
							order = !order;
							gamewindow.getList("peoples").buttons.sort(sortBy("tag","status"));
							sort();
						}
					});
				}
			});
		}
		document.addEventListener("click",this.onclick,false);
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
	update() {
		if (this.toBuild && this.timeToBuild.m==main.getTime().m) {
			/*if (this.peoples.length>0)*/ this.timeToBuild.h--;
			console.log(this.name+" "+this.timeToBuild.h);
			if (gamewindow!=null) {
				if (gamewindow.getObjectName()==this.name) {
					let text=`${LText.timeToBuild}: ${this.timeToBuild.h} ${LText.hour}`;
					gamewindow.getButton("levelUp"+this.name).context = new ContextWindow(320,50,{text:text, size:1.5, dist:0});
				}
			}
			if (this.timeToBuild.h<=0) {
				this.timeToBuild.h=0;
				this.toBuild=false;
				this.setlvl(this.lvl+1);
				if (gamewindow!=null && gamewindow.getButton("levelUp"+this.name)!=undefined)
					gamewindow.getButton("levelUp"+this.name).setText({text: LText.levelUp, size:2, dist:0});
				if (this.products) this.products+=1;
				if (this.capacity) this.capacity+=5;
			}
		}
	}
	onclick=()=> {
		if (this.hover() && gamewindow==null) {
			gamewindow = new gameWindow(Game.width/10,50,Game.width-Game.width/5, Game.height-100, this);
			gamewindow.createButton("levelUp"+this.name,{text: (this.toBuild)?LText.levelRises:LText.levelUp, size:2, dist: 0}, 620,640, 170,50); //улучшить
			gamewindow.getButton("levelUp"+this.name).targetWindow=gamewindow;
			gamewindow.getButton("levelUp"+this.name).setFunc(()=>{
				if (!this.toBuild) {
					this.toBuild=true;
					this.timeToBuild.h=this.resources.timeToBuild;
					this.timeToBuild.m=main.getTime().m;
					gamewindow.getButton("levelUp"+this.name).setText({text: LText.levelRises, size:2, dist:0});
					gamewindow.getButton("levelUp"+this.name).active=true;
					let text=`${LText.timeToBuild}: ${this.timeToBuild.h} ${LText.hour}`;
					gamewindow.getButton("levelUp"+this.name).context = new ContextWindow(320,50,{text:text, size:1.5, dist:0});
				}
			});
			if (this.toBuild) {
				gamewindow.getButton("levelUp"+this.name).active=true;
				let text=`${LText.timeToBuild}: ${this.timeToBuild.h} ${LText.hour}`;
				gamewindow.getButton("levelUp"+this.name).context = new ContextWindow(320,50,{text:text, size:1.5, dist:0});
				for (let c of this.peoples) c.active=false;
			} else {
				let text=`${LText.need}`;
				for (let i in this.resources) {
					text+=`\n${LText[i]}: ${this.resources[i]}`;
				}
				text+=LText.hour;
				gamewindow.getButton("levelUp"+this.name).context = new ContextWindow(320,100,{text:text, size:1.5, dist:0});
			}
			
			this.createControl();
		}
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class WaterExtract extends Structures { //Добыча воды
	products = 1; //кол-во добываемой воды в день
	energy = 0; //расход электричества в день
	alpha = 0; //для анимации
	angleRotate = 0; //Для вращения
	constructor() {
		super();
		this.pos={x:100, y:264};
		this.size = {w: 64, h: 64};
		this.name="WaterExtract1";
		this.resources={
			wood: 10,
			metal: 10,
			timeToBuild: 10
		};
		this.setlvl(9);
	}
	setlvl(val) {
		this.lvl=val;
		if (this.lvl>=9) {
			this.pos.y=200;
			this.size.h=128;
			this.name="WaterExtract2";
		}
	}
	draw() {
		if (this.lvl < 9) {
			//Ручной насос
			if (this.peoples.length == 0 || this.toBuild) { //если человек не назначен
				ctx.drawImage(((this.hover())?imgBaseHover:imgBase), 0, 64, 32, 32, this.pos.x, this.pos.y, 64, 64);
			} else {
				this.alpha = (this.alpha < 60)? (this.alpha + 1) : 0;
				ctx.drawImage(((this.hover())?imgBaseHover:imgBase), 32 * ((this.alpha < 30) ? 1 : 2), 64, 32, 32, this.pos.x, this.pos.y, 64, 64);
			}
		} else {
			//Ветряной насос
			ctxShadow.drawImage(((this.hover())?imgBaseHover:imgBase), 0, 0, 32, 64, this.pos.x, this.pos.y, 64, 128);//Башня
			ctx.drawImage(((this.hover())?imgBaseHover:imgBase), 0, 0, 32, 64, this.pos.x, this.pos.y, 64, 128);//Башня
			if (main) this.angleRotate+=(main.getWeather("wind"))?0.05:0.01;
			let m=0;
			for (var i = 0; i <= 6; ++i) {
				m+=1.046;
				ctxShadow.save(); 
				ctxShadow.translate(this.pos.x + 32, this.pos.y);
				ctxShadow.rotate(this.angleRotate + m);
				ctxShadow.translate(-this.pos.x - 32, -this.pos.y);
				ctxShadow.drawImage(((this.hover())?imgBaseHover:imgBase), 32, 0, 32, 32, this.pos.x + 32, this.pos.y, 64, 64);//Лопасть башни
				ctxShadow.restore();

				ctx.save();
				ctx.translate(this.pos.x + 32, this.pos.y);
				ctx.rotate(this.angleRotate + m);
				ctx.translate(-this.pos.x - 32, -this.pos.y);
				ctx.drawImage(((this.hover())?imgBaseHover:imgBase), 32, 0, 32, 32, this.pos.x + 32, this.pos.y, 64, 64);//Лопасть башни
				ctx.restore();
			}
		}
	}
	drawWindow() {
		let centrX = Game.width/2;
		ctxInterface.beginPath();
		ctxInterface.lineWidth=5;
		ctxInterface.strokeStyle="rgb(100,100,100)";
		ctxInterface.fillStyle="rgb(120,120,120)";
		ctxInterface.fillRect(Game.width/9, 100, Game.width-Game.width/4.5, 256);
		ctxInterface.strokeRect(Game.width/9, 100, Game.width-Game.width/4.5, 256);
		ctxInterface.closePath();
		if (this.lvl < 9) {
			//Ручной насос
			ctxInterface.drawImage(imgBase, 0, 64, 32, 32, centrX-64, 200, 128, 128);
		} else {
			//Ветряной насос
			ctxInterface.drawImage(imgBase, 0, 0, 32, 64, centrX-32, 200, 64, 128);//Башня
			let m=0;
			for (var i = 0; i <= 6; ++i) {
				ctxInterface.save(); m+=1.046;
				ctxInterface.translate(centrX, 200);
				ctxInterface.rotate(m);
				ctxInterface.translate(-centrX, -200);
				ctxInterface.drawImage(imgBase, 32, 0, 32, 32, centrX, 200, 64, 64);//Лопасть башни
				ctxInterface.restore();
			}
		}
		drawText(110,370,`${LText.level}: ${this.lvl}`,2,0);
		drawText(110,400,`${LText.products}: ${this.products}/${LText.hour}`,2,0);
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class WaterStorage extends Structures {
	capacity=30;
	water=30;
	resources={
		timeToBuild:10
	};
	constructor() {
		super();
		this.pos={x:164, y:264};
		this.size = {w: 64, h: 64};
		this.name="WaterStorage1";
	}
	setlvl(val) {
		console.log(val);
		this.lvl=val;
		if (this.lvl>=2) {
			this.name="WaterStorage2";
		}
	}
	draw() {
		ctx.drawImage(this.getImage(32 * (this.lvl-1), 96, 32, 32), this.pos.x, this.pos.y, this.size.w, this.size.h);
		// ctx.drawImage(((this.hover())?imgBaseHover:imgBase),32 * (this.lvl-1), 96, 32, 32, this.pos.x, this.pos.y, 64, 64);//Бочка воды
	}
	drawWindow() {
		ctxInterface.beginPath();
		ctxInterface.lineWidth=5;
		ctxInterface.strokeStyle="rgb(100,100,100)";
		ctxInterface.fillStyle="rgb(120,120,120)";
		ctxInterface.fillRect(Game.width/9, 100, Game.width-Game.width/4.5, 256);
		ctxInterface.strokeRect(Game.width/9, 100, Game.width-Game.width/4.5, 256);
		ctxInterface.closePath();
		ctxInterface.drawImage(imgBase,32 * (this.lvl-1), 96, 32, 32, Game.width/2-64, 200, 128, 128);//Бочка воды
		drawText(110,370,`${LText.level}: ${this.lvl}`,2,0);
		drawText(110,400,`${LText.capacity}: ${this.capacity}`,2,0);
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class House extends Structures{
	#maxPeoples=30;
	storage_resources={//ресурсы, хранящиеся на складе
		wood:10,
		metal:10,
		food:10,
		donat_ammo: 0
	};
	resources={
		wood:5,
		metal:5,
		timeToBuild:10
	};
	#cur_p=0;
	constructor() {
		super();
		this.pos={x:Game.width/2-64, y:264};
		this.size = {w: 128, h: 128};
		this.name="Home";
	}
	minusResource(res, count) {
		this.storage_resources[res]-=count;
	}
	draw() {
		ctx.drawImage(this.getImage(32,32,32,32),this.pos.x,this.pos.y,this.size.w,this.size.h);
	}
	createControl() { 
		
	}
	drawWindow() {
		drawText(110,100,`${LText.level}: ${this.lvl}`,2,0);
		drawText(110,130,`${LText.peoples1}: ${main.getPeoples().length}/${this.#maxPeoples}`,2,0);
		// main.getPeoples()[0].draw(115,200);
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Clinic extends Structures {
	resources={
		timeToBuild:10
	}
	constructor() {
		super();
		this.pos={x:Game.width/2+64, y:264};
		this.size = {w: 128, h: 128};
		this.name="Сlinic";
	}
	draw() {
		ctx.drawImage(this.getImage(64,32,64,32),this.pos.x-128,this.pos.y,this.size.w*2,this.size.h);
	}
	drawWindow() {
		
	}
}