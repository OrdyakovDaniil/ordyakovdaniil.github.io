/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class House extends Structures{
	maxPeoples=30;
	storage_resources={//ресурсы, хранящиеся на складе
		wood:10,
		metal:10,
		food:10,
		donat_ammo: 0
	};
	storage_items=[
		new Item(Items.revolver_ammo)
	];//предметы, хранящиеся на складе
	capacity=500;
	resources={
		wood:5,
		metal:5,
		timeToBuild: 1000
	};
	page=0;
	timeToNewPeople=0;
	constructor() {
		super();
		this.pos={x:404, y:232};
		this.size = {w: 128, h: 128};
		this.name="Home";
		console.log(this.storage_items[0].addCount(100));
	}
	minusResource(res, count) {
		this.storage_resources[res]-=count;
	}
	draw() {
		ctx.drawImage(this.getImage(64,0,64,64),this.pos.x,this.pos.y,this.size.w,this.size.h);
	}
	createControl() {
		this.page=0;
		var lider = gamewindow.createCell("lider", 300,225, LText.status_lider);
		for (let p of main.getPeoples()) {
			if (p.getStatus()==LText.status_lider) {
				lider.people=p;
			}
		}
		lider.setActive(false);
		var func=()=>{
			this.workers[1]=gamewindow.getCell("worker1").people;
			if (main.getPeoples().length>=this.maxPeoples) {
				animText.attention1 = createAnimText(200,100,LText.attention1,2,0,0.5);
			}
		};
		var radist = gamewindow.createCell("worker1", 725,220, LText.status_radist, func);
		radist.people=this.workers[1];
		var getPeoples = gamewindow.createButton("getPeoples", 370,200,64,64);
		getPeoples.setFunc(()=>{ //создание страницы отображения персонажа
			this.page=1;
			radist.setActive(false);
			gamewindow.getButton("levelUp"+this.ID).hidden();
			gamewindow.getButton("getPeoples").hidden();
			gamewindow.hiddenCells();
			var curPeople = main.getPeoples()[Current_People];
			var pw = curPeople.getName().length;
			var pName = gamewindow.createTextBox("peopleName", 500-pw*8-10, 100, pw*16+20, 30);
			pName.value=curPeople.getName();
			var equip=[
				gamewindow.createEquip(246,274,"leftHand"),
				gamewindow.createEquip(110,138,"head"),
				gamewindow.createEquip(110,206,"torso"),
				gamewindow.createEquip(178,274,"rightHand"),
				gamewindow.createEquip(314,138,"pants"),
				gamewindow.createEquip(314,206,"shoes"),
				gamewindow.createEquip(314,274,"bag"),
				gamewindow.createEquip(110,274,"ammo"),
			];
			for (let e of equip) {
				e.context=new ContextWindow(e,200,{text:LText[e.type], size:2, dist:0});
				e.context.setAlign(1);
				e.item=curPeople.getEquipments()[e.type];
				e.alltypes=false;
			}
			var button_filter_guns = gamewindow.createButton("filter_gun", 384, 341, 32,32);
			var button_filter_weapon = gamewindow.createButton("filter_weapon", 384, 373, 32,32);
			var button_filter_ammo = gamewindow.createButton("filter_ammo", 384, 405, 32,32);
			var button_filter_cloth = gamewindow.createButton("filter_cloth", 384, 437, 32,32);
			var button_filter_meds = gamewindow.createButton("filter_meds", 384, 469, 32,32);
			var button_filter_food = gamewindow.createButton("filter_food", 384, 501, 32,32);
			var button_filter_materials = gamewindow.createButton("filter_materials", 384, 533, 32,32);
			var button_filter_other = gamewindow.createButton("filter_other", 384, 565, 32,32);
			var button_move_all = gamewindow.createButton("move_all", 384, 597, 32,32); //перемещение предметов из инвентаря на склад (если фильтр включен, то только этот тип)

			var listInv = gamewindow.createListItems("inv",110,390,374,350);
				listInv.setStore(curPeople.getInventory());
				listInv.capacity=curPeople.getCapacity();
			var listSklad = gamewindow.createListItems("inv2",517,390,373,350);
				listSklad.setStore(this.storage_items);
				listSklad.capacity=this.capacity;
				button_move_all.setFunc(()=>{
					var otkl=0;
					for (let e in listInv.equipments) {
						this.storage_items.push(listInv.equipments[e].item);
						curPeople.getInventory().splice(listInv.equipments[e].id-otkl,1);
						otkl++;
					}
					listInv.setStore(listInv.store);
					listSklad.setStore(listSklad.store);
					curPeople.updateInventoryWeight();
				})
				var btnsSetActive=(btn)=>{
					if (btn.active) {
						listInv.filter=null;
						listSklad.filter=null;
					}
					button_filter_guns.active=false;
					button_filter_weapon.active=false;
					button_filter_ammo.active=false;
					button_filter_cloth.active=false;
					button_filter_meds.active=false;
					button_filter_food.active=false;
					button_filter_materials.active=false;
					button_filter_other.active=false;
					if (listInv.filter!=null) btn.active=true;
					listInv.setStore(curPeople.getInventory());
					listSklad.setStore(this.storage_items);
				}
				button_filter_guns.setImage(imgButton, 24,25, 16,16, 32, 32);
				button_filter_guns.context=new ContextWindow(button_filter_guns,250,{text:LText.guns, size:1, dist:0});
				button_filter_guns.context.setAlign(1);
				button_filter_guns.setFunc(()=>{
					listInv.filter="gun";
					listSklad.filter="gun";
					btnsSetActive(button_filter_guns);
				})
				button_filter_weapon.setImage(imgButton, 40,32, 16,16, 32, 32);
				button_filter_weapon.context=new ContextWindow(button_filter_weapon,250,{text:LText.weapons, size:1, dist:0});
				button_filter_weapon.context.setAlign(1);
				button_filter_weapon.setFunc(()=>{
					listInv.filter="weapon";
					listSklad.filter="weapon";
					btnsSetActive(button_filter_weapon);
				})
				button_filter_ammo.setImage(imgButton, 40,0, 16,16, 32, 32);
				button_filter_ammo.context=new ContextWindow(button_filter_ammo,250,{text:LText.ammo, size:1, dist:0});
				button_filter_ammo.context.setAlign(1);
				button_filter_ammo.setFunc(()=>{
					listInv.filter="ammo";
					listSklad.filter="ammo";
					btnsSetActive(button_filter_ammo);
				})
				button_filter_cloth.setImage(imgButton, 40,16, 16,16, 32, 32);
				button_filter_cloth.context=new ContextWindow(button_filter_cloth,250,{text:LText.clothes, size:1, dist:0});
				button_filter_cloth.context.setAlign(1);
				button_filter_cloth.setFunc(()=>{
					listInv.filter="clothing";
					listSklad.filter="clothing";
					btnsSetActive(button_filter_cloth);
				})
				button_filter_meds.setImage(imgButton, 0,33, 16,16, 32, 32);
				button_filter_meds.context=new ContextWindow(button_filter_meds,250,{text:LText.med, size:1, dist:0});
				button_filter_meds.context.setAlign(1);
				button_filter_meds.setFunc(()=>{
					listInv.filter="med";
					listSklad.filter="med";
					btnsSetActive(button_filter_meds);
				})
				button_filter_food.setImage(imgButton, 40,48, 16,16, 32, 32);
				button_filter_food.context=new ContextWindow(button_filter_food,250,{text:LText.food, size:1, dist:0});
				button_filter_food.context.setAlign(1);
				button_filter_food.setFunc(()=>{
					listInv.filter="food";
					listSklad.filter="food";
					btnsSetActive(button_filter_food);
				})
				button_filter_materials.setImage(imgButton, 24,40, 16,16, 32, 32);
				button_filter_materials.context=new ContextWindow(button_filter_materials,250,{text:LText.materials, size:1, dist:0});
				button_filter_materials.context.setAlign(1);
				button_filter_materials.setFunc(()=>{
					listInv.filter="material";
					listSklad.filter="material";
					btnsSetActive(button_filter_materials);
				})
				button_filter_other.setImage(imgButton, 8,48, 16,16, 32, 32);
				button_filter_other.context=new ContextWindow(button_filter_other,250,{text:LText.other, size:1, dist:0});
				button_filter_other.context.setAlign(1);
				button_filter_other.setFunc(()=>{
					listInv.filter="material";
					listSklad.filter="material";
					btnsSetActive(button_filter_other);
				})

				button_move_all.setImage(imgButton, 24,9, 16,16, 32, 32);
				button_move_all.context=new ContextWindow(button_move_all,250,{text:LText.move_all, size:1, dist:0});
				button_move_all.context.setAlign(1);

			let pX=0;
			for (let sk in profStats.carpenter) {
				let stat = gamewindow.createButton("stat_"+sk, 288+pX*32,208, 32,30);
				stat.setImage(imgStats, pX*30, 0, 30, 30, 30, 30);
				stat.context = new ContextWindow(stat,220,{text:LText[sk], size:2, dist:0});
				stat.context.setAlign(1);
				stat.setFunc(()=>{
					//Написать функцию открытия окошечка (справки) для навыка
				});
				pX++;
			}
			
			var barr={changeEat:[], changeDrink:[]};
			var tim =["breakfast","lunch","dinner"];
			for (let i in barr) {
				for (let j=0; j<3; ++j) {
					barr[i][j] = gamewindow.createButton(i+j, 460+25*j, (i=="changeEat")?145:175, 25,25);
					barr[i][j].setFunc(()=>{
						curPeople[i](tim[j]);
						if (i=="changeEat") barr[i][j].setImage(imgButton, (curPeople.getEat()[tim[j]])?0:12, 9, 12, 12, 24,24);
						else barr[i][j].setImage(imgButton, (curPeople.getDrink()[tim[j]])?0:12, 21, 12, 12, 24,24);
					});
					if (i=="changeEat") {
						barr[i][j].setImage(imgButton, (curPeople.getEat()[tim[j]])?0:12, 9, 12, 12, 24,24);
						barr[i][j].context=new ContextWindow(barr[i][j], 150, {text: LText[tim[j]], size:2, dist:0});
						barr[i][j].context.setAlign(1);
					}
					else barr[i][j].setImage(imgButton, (curPeople.getDrink()[tim[j]])?0:12, 21, 12, 12, 24,24);
				}
			}

			var peopleIcon = gamewindow.createButton("peopleIcon",78,88,132,132);
			peopleIcon.setImage(curPeople.getImage(),0,0,32,32,128,128);
			peopleIcon.context = new ContextWindow(peopleIcon,150,{text: LText.history, size:2, dist:0});
			peopleIcon.context.setAlign(1);
			peopleIcon.tag.trigger=true;
			peopleIcon.setFunc(()=>{
				if (peopleIcon.tag.trigger) {
					peopleIcon.context.setText({text: LText.state, size:2, dist:0});
					animText["history"]=createAnimText(388, 138, curPeople.getHistory(), 1, 0, 0.1);
					for (let i in barr) {
						for (let j=0; j<3; ++j) {
							barr[i][j].hidden();
						}
					}
					for (let sk in profStats.carpenter) {gamewindow.getButton("stat_"+sk).hidden()}
				} else {
					peopleIcon.context.setText({text: LText.history, size:2, dist:0});
					delete animText["history"];
					for (let i in barr) {
						for (let j=0; j<3; ++j) {
							barr[i][j].show();
						}
					}
					for (let sk in profStats.carpenter) {gamewindow.getButton("stat_"+sk).show()}
				}
				peopleIcon.tag.trigger=!peopleIcon.tag.trigger;
			})

			var funcChangePName = ()=>{
				curPeople = main.getPeoples()[Current_People];
				var ptext=curPeople.getName();
				pName.value=ptext;
				pName.x=500-ptext.length*8-10;
				pName.w=ptext.length*16+20;
			}
			var funcChangeP=()=> {
				curPeople = main.getPeoples()[Current_People];
				peopleIcon.setImage(curPeople.getImage(),0,0,32,32,128,128);
				for (let i in barr) {
					for (let j=0; j<3; ++j) {
						if (i=="changeEat") barr[i][j].setImage(imgButton, (curPeople.getEat()[tim[j]])?0:12, 9, 12, 12, 24,24);
						else barr[i][j].setImage(imgButton, (curPeople.getDrink()[tim[j]])?0:12, 21, 12, 12, 24,24);
					}
				}
				for (let e of equip) {
					e.item=curPeople.getEquipments()[e.type];
				}
				listInv.setStore(curPeople.getInventory());
			}
			pName.onChange=()=>{
				if (pName.value!="") {
					curPeople.setName(pName.value);
					funcChangePName();
				} else {
					curPeople.setName(LText.noname);
					funcChangePName();
				}
			}
			var prevP = gamewindow.createButton("prevPeople", 731, 41, 32,32);
			prevP.setImage(imgButton,11,0,7,9,21,27);
			prevP.setFunc(()=>{
				Current_People--;
				if (Current_People<0) Current_People = main.getPeoples().length-1;
				funcChangePName();
				funcChangeP();
				animText["history"]=createAnimText(388, 138, curPeople.getHistory(), 1, 0, 0.1);
			});

			var nextP = gamewindow.createButton("nextPeople", 763, 41, 32,32);
			nextP.setImage(imgButton,19,0,7,9,21,27);
			nextP.setFunc(()=>{
				Current_People++;
				if (Current_People>=main.getPeoples().length) Current_People=0;
				funcChangePName();
				funcChangeP();
				animText["history"]=createAnimText(388, 138, curPeople.getHistory(), 1, 0, 0.1);
			});

			var _return = gamewindow.createButton("return", 3, 3, 32,32);
			_return.setImage(imgButton,26,0,7,9,21,27);
			_return.setFunc(()=>{
				this.page=0;
				radist.setActive(true);
				gamewindow.getButton("levelUp"+this.ID).show();
				gamewindow.getButton("getPeoples").show();
				gamewindow.showCells();
				gamewindow.deleteButton("prevPeople");
				gamewindow.deleteButton("nextPeople");
				gamewindow.deleteButton("return");
				gamewindow.deleteButton("peopleIcon");
				for (let i in barr) {
					for (let j=0; j<3; ++j) {
						gamewindow.deleteButton(i+j);
					}
				}
				for (let sk in profStats.carpenter) {gamewindow.deleteButton("stat_"+sk)}
				gamewindow.deleteTextBox("peopleName");
				gamewindow.deleteEquip("leftHand");
				gamewindow.deleteEquip("head");
				gamewindow.deleteEquip("torso");
				gamewindow.deleteEquip("rightHand");
				gamewindow.deleteEquip("pants");
				gamewindow.deleteEquip("shoes");
				gamewindow.deleteEquip("bag");
				gamewindow.deleteEquip("ammo");
				gamewindow.deleteListItems("inv");
				gamewindow.deleteListItems("inv2");
				gamewindow.deleteButton("filter_other");
				gamewindow.deleteButton("filter_materials");
				gamewindow.deleteButton("filter_meds");
				gamewindow.deleteButton("filter_weapon");
				gamewindow.deleteButton("filter_food");
				gamewindow.deleteButton("filter_cloth");
				gamewindow.deleteButton("filter_ammo");
				gamewindow.deleteButton("filter_gun");
				gamewindow.deleteButton("move_all");
			});

		});
	}
	drawWindow() {
		switch (this.page) {
			case 0:
				ctxInterface.beginPath();
				ctxInterface.lineWidth=5;
				ctxInterface.strokeStyle="rgb(100,100,100)";
				ctxInterface.fillStyle="rgb(120,120,120)";
				ctxInterface.fillRect(111, 100, 778, 256);
				ctxInterface.strokeRect(111, 100, 778, 256);
				ctxInterface.closePath();
				drawText(110,370,`${LText.level}: ${this.lvl}`,2,0);
				drawText(110,400,`${LText.peoples1}: ${main.getPeoples().length}/${this.maxPeoples}`,2,0);
				drawText(332-LText.status_lider.length*8, 299, LText.status_lider,2,0);
				drawText(757-LText.status_radist.length*8, 294, LText.status_radist,2,0);
				let radist=gamewindow.getCell("worker1");
				if ((radist.people!=null) && (main.getPeoples().length<this.maxPeoples)) {
					drawText(110,430,`${LText.attracting_people}: 1/${112-radist.people.getStat("intellect")}${LText.hour}`,2,0);
				}
				if ("attention1" in animText) {
					ctxInterface.fillStyle="rgb(0,0,0,0.5)";
					ctxInterface.fillRect(190,90,305,100);
					ctxInterface.moveTo(332, 225);
					ctxInterface.lineTo(300, 190);
					ctxInterface.lineTo(364, 190);
					ctxInterface.lineTo(332, 225);
					ctxInterface.fill();
					drawAnimText(animText.attention1);
					if (animText.attention1.t>=100) {
						delete animText.attention1;
					}
				}
			break;
			case 1:
				let p = main.getPeoples()[Current_People];
				gamewindow.getTextBox("peopleName").draw();
				drawText(110, 355, LText.inventory, 2, 0);
				let w=gamewindow.getListItems("inv").curweight;
				let mw=p.getCapacity();
				let strW = w+"/"+mw;
				drawText(485-strW.length*16, 355, strW, 2, -2);
				drawText(516, 355, LText.storage, 2, 0);
				w=gamewindow.getListItems("inv2").curweight;
				mw=this.capacity;
				strW = w+"/"+mw;

				drawText(880-strW.length*16, 355, strW, 2, -2);
				if (gamewindow.getButton("peopleIcon").tag.trigger) {
					drawText(388, 138, `${LText.status}: ${p.getStatus()}`, 2, 0);
					drawText(388, 168, `${LText.health}: ${p.getHP()}`, 2, 0);
					drawText(388, 198, `${LText.hunger}: ${p.getHunger()}`, 2, 0);
					drawText(388, 228, `${LText.thirst}: ${p.getThirst()}`, 2, 0);
					let posX=0;
					ctxInterface.beginPath();
					ctxInterface.strokeStyle="rgb(0,0,0)";
					ctxInterface.lineWidth=1;
					ctxInterface.moveTo(389, 288);
					ctxInterface.lineTo(389, 310);
					ctxInterface.stroke();
					ctxInterface.closePath();
					for (let s in profStats.carpenter) {
						drawText(390+32*posX + (12-p.getStat(s).toString().length*8/2), 295, p.getStat(s), 1, 0);
						posX++;
						ctxInterface.beginPath();
						ctxInterface.strokeStyle="rgb(0,0,0)";
						ctxInterface.lineWidth=1;
						ctxInterface.moveTo(388+32*posX, 290);
						ctxInterface.lineTo(388+32*posX, 310);
						ctxInterface.stroke();
						ctxInterface.closePath();
					}
					ctxInterface.beginPath();
					ctxInterface.strokeStyle="rgb(0,0,0)";
					ctxInterface.lineWidth=1;
					ctxInterface.moveTo(388, 311);
					ctxInterface.lineTo(741, 311);
					ctxInterface.stroke();
					ctxInterface.closePath();

				} else {
					drawAnimText(animText["history"]);
				}
				
			break;
		}
	}
	levelChange() {
		this.maxPeoples+=5;
	}
}