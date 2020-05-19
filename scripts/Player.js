let trigger1 = false; let trigger2 = false; //для движения рук
let ammoitem = null; //ячейка с нужными для перезарядки патронами
let curIntervalShoot = 0;
var timeReload = 0; //должен быть var для курсора
var IDnearFire=-1; //айди ближайшего костра. нужен чтобы отрисовывать красиво
var nearPond = false; //если игрок рядом с прудом

var player=new Object();
player.x=1850; player.y=1850;
player.dx=0; player.dy=0;
player.health=100; player.maxHealth=100;
player.energy=200; player.maxEnergy=200;
player.hunger=randomInt(0,50); player.maxHunger=100;
player.thirst=randomInt(0,50); player.maxThirst=100;
player.curBagType=0; player.curBagId=0;
player.bag=[{type:4,id:0,count:1},{type:4,id:1,count:3},{type:3,id:3,count:3},{type:3,id:4,count:1},{type:3,id:6,count:1}];
player.belt=[{id:0,type:1,count:5},{id:0,type:2,count:10},{id:0,type:0,count:1},{id:2,type:3,count:2},{id:6,type:3,count:1}]; player.beltLen = 5;
player.countRes=[[0,0],[0,0],[0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0],[0]];
player.radius=15; player.speed=2;
player.angle=0; player.radian=0;
player.itemBelt = 0; //номер ячейки на поясе
player.handA=45; player.dotsHit={x:player.x,y:player.y}; player.damage=10;
player.maxWeight=30; player.weight=0;
calcWeight();

function putInBag() {
		if (control.up&&(player.belt[player.itemBelt].type!=null&&player.belt[player.itemBelt].id!=null)) { //перекладывание из пояса в рюкзак
			var countMax=ITEMS[player.belt[player.itemBelt].type][player.belt[player.itemBelt].id].max;
			if (countMax!=0) { //если предмет стакается, стакаем
				for (var b=0; b<player.bag.length; ++b) {
					if (player.bag[b].type==player.belt[player.itemBelt].type&&player.bag[b].id==player.belt[player.itemBelt].id) {
						player.bag[b].count+=player.belt[player.itemBelt].count; control.up=false;
						player.belt[player.itemBelt]={type:null,id:null,count:0}; break;
					}
				}
				if (control.up) { //если не нашли такой же предмет в рюкзаке, создаём его
					player.bag.push({type:player.belt[player.itemBelt].type, id:player.belt[player.itemBelt].id, count:player.belt[player.itemBelt].count});
					player.belt[player.itemBelt]={type:null,id:null,count:0};
				}
			} else { //если предмет не стакается, добавляем новый
				player.bag.push({type:player.belt[player.itemBelt].type, id:player.belt[player.itemBelt].id, count:player.belt[player.itemBelt].count});
				player.belt[player.itemBelt]={type:null,id:null,count:0};
			}
		}
		control.up=false; calcRes();
	}
function calcRes() {
		for (var a=0; a<ITEMS.length; ++a) {
			for (var c=0; c<ITEMS[a].length; ++c) {
				player.countRes[a][c]=0;
			}
		}
		for (var b=0; b<player.bag.length; ++b) {
			player.countRes[player.bag[b].type][player.bag[b].id]+=player.bag[b].count;
		}
	}
function calcWeight() { //расчёт веса предметов
	calcRes();
	player.weight=0;
	for (var b=0; b<player.bag.length; ++b) {
		if (player.bag[b].type!=null) {
			if (player.bag[b].type==1) player.weight += player.bag[b].count * ITEMS[2][player.bag[b].id].weight + ITEMS[1][player.bag[b].id].weight;
			else player.weight+=player.bag[b].count*ITEMS[player.bag[b].type][player.bag[b].id].weight;	
		}
	}
	for (var b=0; b<player.belt.length; ++b) {
		if (player.belt[b].type!=null) {
			if (player.belt[b].type==1) player.weight += player.belt[b].count * ITEMS[2][player.belt[b].id].weight + ITEMS[1][player.belt[b].id].weight;
			else player.weight+=player.belt[b].count*ITEMS[player.belt[b].type][player.belt[b].id].weight;
		}
	}
}
function stophit() {
	player.handA=45; trigger1=false; trigger2=false; player.dotsHit={x:player.x,y:player.y};
}
function updatePlayer() {
	player.hunger+=0.003;
	player.thirst+=0.008;
	if (player.hunger>100) { player.hunger=100; player.health-=0.002; }
	if (player.thirst>100) { player.thirst=100; player.health-=0.003; }
	if (player.hunger<0) player.hunger=0;
	if (player.thirst<0) player.thirst=0;
	player.maxEnergy=200-(player.hunger+player.thirst);
	if (player.health<=0) { player.health=0; gameState=3; }
	if ((!control.up&&!control.down&&!control.left&&!control.right)||
		(!control.shift&&(control.up||control.down||control.left||control.right))) player.energy+=0.1;
	if (player.energy>player.maxEnergy) player.energy=player.maxEnergy;
	if (control.tab) { //если рюкзак открыт
		if (control.left) {
			if (selectedBag>0) --selectedBag;
			else selectedBag=player.bag.length-1;
			control.left=false;
		}
		if (control.right) {
			if (selectedBag<player.bag.length-1) ++selectedBag;
			else selectedBag=0;
			control.right=false;
		}
		if (control.q) {
			if (pageCraft>0) --pageCraft;
			else pageCraft=craft.length-1;
			control.q=false;
		}
		if (control.use) {
			if (pageCraft<craft.length-1) ++pageCraft;
			else pageCraft=0;
			control.use=0;
		}
		if (control.reload) { //разрядка оружия
			if (player.bag[selectedBag].type==1&&player.bag[selectedBag].count>0) { control.up=true;
				for (var b=0; b<player.bag.length; ++b) {
					if (player.bag[b].type==2&&player.bag[b].id==player.bag[selectedBag].id) {
						player.bag[b].count+=player.bag[selectedBag].count; control.up=false;
						player.bag[selectedBag].count=0; break;
					}
				}
				if (control.up) { //если не нашли такой же предмет в рюкзаке, создаём его
					player.bag.push({type:2, id:player.bag[selectedBag].id, count:player.bag[selectedBag].count});
					player.bag[selectedBag].count=0;
				}
				switch (player.bag[selectedBag].id) {
					case 0:
					var s_rifle_rel1=sound_rifle_reload1;
					s_rifle_rel1.play();
					break;
					case 1:
					var s_shotgun_rel1=sound_shotgun_reload1;
					s_shotgun_rel1.play();
					break;
				}
				control.up=false; calcWeight();
			}
			control.reload=false; 
		}
		putInBag();
		if (control.down&&player.bag.length>0) { //перекладывание на пояс
			var max = ITEMS[player.bag[selectedBag].type][player.bag[selectedBag].id].max;
			if (max!=0) {
				var ostInBag = player.bag[selectedBag].count-max;
				if (ostInBag>0) {
					control.up=true; putInBag();
					player.bag[selectedBag].count=ostInBag;
					player.belt[player.itemBelt]={type:player.bag[selectedBag].type, id:player.bag[selectedBag].id, count:max};
				} else {
					if (player.belt[player.itemBelt].type!=player.bag[selectedBag].type||player.belt[player.itemBelt].id!=player.bag[selectedBag].id) {
						control.up=true; putInBag();
						player.belt[player.itemBelt]={type:player.bag[selectedBag].type, id:player.bag[selectedBag].id, count:player.bag[selectedBag].count};
						player.bag.splice(selectedBag,1);
					}
				}
			} else {
				control.up=true; putInBag();
				player.belt[player.itemBelt]={type:player.bag[selectedBag].type, id:player.bag[selectedBag].id, count:player.bag[selectedBag].count};
				player.bag.splice(selectedBag,1);
			}
			control.down=false; calcRes();
			if (selectedBag==player.bag.length&&selectedBag>0) --selectedBag;
		}
		if (control.Lbtn) {
			if (selectedCraft!=-1) { //крафт предмета
				var okey=true;
				for (var r=0; r<craft[pageCraft][selectedCraft].resources.length; ++r) {
					var l=0; var curCraft=craft[pageCraft][selectedCraft];
					if (!okey) break;
					for (var b=0; b<player.bag.length; ++b) { //поиск нужных предметов
						if ((player.bag[b].type==curCraft.resources[r].type)&&(player.bag[b].id==curCraft.resources[r].id)) {
							if (player.bag[b].count<curCraft.resources[r].need) {
								okey=false; break;
							}
						} else ++l;
						if (l==player.bag.length) {okey=false; break;}
					}
				}
				if (okey) { //если есть все нужные предметы
					if (curCraft.result.type==-1) {
						curCraft.result.command();
					} else {
						for (var r=0; r<curCraft.resources.length; ++r) {
							for (var b=0; b<player.bag.length; ++b) {
								if ((player.bag[b].type==curCraft.resources[r].type)&&(player.bag[b].id==curCraft.resources[r].id)) {
									player.bag[b].count-=curCraft.resources[r].need;
									if (player.bag[b].count==0) {
										player.bag.splice(b,1);
									}
								}
							}
						} var triggerBag = false;
						for (var b=0; b<player.bag.length; ++b) {
							if ((player.bag[b].type==curCraft.result.type)&&
								(player.bag[b].id==curCraft.result.id)) {
								triggerBag=true;
								player.bag[b].count+=curCraft.result.count;
							}
						}
						if (!triggerBag) {
							player.bag.push({type:curCraft.result.type,id:curCraft.result.id,count:curCraft.result.count});
						}
					}
				}
			}
			if (selectedBag>=player.bag.length) selectedBag=player.bag.length-1;
			control.Lbtn=false;
		}
	} else { //если рюкзак закрыт

///////////////////////////

		if ((control.up&&control.right)||(control.up&&control.left)||(control.down&&control.right)||(control.down&&control.left)) {
			if (control.shift&&player.energy>0) { player.speed=3.4; sound_walk[curWalkSound].playbackRate = 1.5; player.energy-=0.6;
			} else { player.speed=1.4; sound_walk[curWalkSound].playbackRate = 1;}
		} else {
			if (control.shift&&(control.up||control.down||control.left||control.right)&&player.energy>0) {
				player.speed=4; sound_walk[curWalkSound].playbackRate = 1.5;
				if (player.dx!=0||player.dy!=0) { player.energy-=0.6; }
			} else { player.speed=2; sound_walk[curWalkSound].playbackRate = 1;}
		}
		if (player.energy<0) player.energy=0;
		if (control.up) player.dy = -player.speed;
		if (control.down) player.dy = player.speed;
		if ((control.up && control.down)||(!control.up && !control.down)) player.dy=0;
		if (control.left) player.dx = -player.speed;
		if (control.right) player.dx = player.speed;
		if ((control.left && control.right)||(!control.left && !control.right)) player.dx=0;
			for (var d=0; d<pDoors.length; ++d) {
				var dot1={x:player.x+player.radius*Math.cos(pDoors[d].radian-1.57), y:player.y+player.radius*Math.sin(pDoors[d].radian-1.57)};
				if (dotInPoly(pDoors[d].points, dot1)) {
					player.x=player.x+player.speed*Math.cos(pDoors[d].radian+1.57);
					player.y=player.y+player.speed*Math.sin(pDoors[d].radian+1.57);
				}
				dot1={x:player.x+player.radius*Math.cos(pDoors[d].radian+1.57), y:player.y+player.radius*Math.sin(pDoors[d].radian+1.57)};
				if (dotInPoly(pDoors[d].points, dot1)) {
					player.x=player.x+player.speed*Math.cos(pDoors[d].radian-1.57);
					player.y=player.y+player.speed*Math.sin(pDoors[d].radian-1.57);
				}
				for (var p=0; p<4; ++p) {
					playerArcCollision({x:pDoors[d].points[p].x, y:pDoors[d].points[p].y,radius:1})
				}
			}
		if (control.up||control.down||control.left||control.right) { //если игрок ходит, только тогда проверяется коллизия с объектами
			sound_walk[curWalkSound].play();
			for (var t=0; t<pTables.length; ++t) {
				playerRectCollision(pTables[t]);
			}
			for (var d=0; d<pDivans.length; ++d) {
				playerRectCollision(pDivans[d]);
			}
			for (var b=0; b<pBeds.length; ++b) {
				playerRectCollision(pBeds[b]);
			}
			for (var r=0; r<pRacks.length; ++r) {
				playerRectCollision(pRacks[r]);
			}
			for (var c=0; c<pChests.length; ++c) {
				playerRectCollision(pChests[c]);
			}
			for (var w=0; w<pWindows.length; ++w) {
				if (pWindows[w].whole) playerRectCollision(pWindows[w]); //если стекло не разбито, через окно пройти не может
				if (player.x>pWindows[w].x-player.radius&&player.x<pWindows[w].x+pWindows[w].width+player.radius&&
					player.y>pWindows[w].y-player.radius&&player.y<pWindows[w].y+pWindows[w].height+player.radius)
				{
					player.dx=player.dx/3;player.dy=player.dy/3;
				}
			}
			for (var w=0; w<pWalls.length; ++w) {
				playerRectCollision(pWalls[w]);
			}
			for (var t=0; t<pTrees.length; ++t) {
				playerArcCollision(pTrees[t]);
			}
			nearPond=false;
			for (var p=0; p<pPonds.length; ++p) {
				playerArcCollision(pPonds[p]);
				if (getDistance(player, ponds[p])<ponds[p].radius+50) nearPond=true;
			}
			player.x+=player.dx; player.y+=player.dy;
		}
		
		if (control.Lbtn&&player.belt[player.itemBelt].type==3) { //поедание предмета
			var id = player.belt[player.itemBelt].id;
			if (id<=3) {
				var s_eating=sound_eating;
				s_eating.play();
			} else {
				var s_drinking=sound_drinking;
				s_drinking.play();
			}
			player.hunger+=used[id].hunger;
			player.thirst+=used[id].thirst;
			player.energy+=used[id].energy;
			player.health+=used[id].health;
			if (player.hunger<0) player.hunger=0; if (player.thirst<0) player.thirst=0;
			if (player.health<0) player.health=0; if (player.energy<0) player.energy=0;
			if (player.hunger>player.maxHunger) player.hunger=player.maxHunger; if (player.thirst>player.maxThirst) player.thirst=player.maxThirst;
			if (player.health>player.maxHealth) player.health=player.maxHealth; if (player.energy>player.maxEnergy) player.energy=player.maxEnergy;
			--player.belt[player.itemBelt].count;
			if (player.belt[player.itemBelt].count<=0) {
				player.belt[player.itemBelt]={type:null,id:null,count:0};
			}
			control.Lbtn=false; calcWeight();
		}
		if (control.Lbtn&&player.belt[player.itemBelt].type==5) {
			switch (player.belt[player.itemBelt].id) {
				case 0:
				var s_flame=sound_flame;
				s_flame.play();
				fireOnGrave.push(newFire(player.x+player.radius*3*Math.cos(player.radian), player.y+player.radius*3*Math.sin(player.radian),
					player.radian));
				break;
			}
			player.belt[player.itemBelt]={type:null,id:null,count:0};
			control.Lbtn=false; calcWeight();
		}
		if (control.Lbtn||trigger2) { //удар холодным оружием
			for (var w=0; w<pWindows.length; ++w) {
				if (pWindows[w].whole) {
					if (player.dotsHit.x>=pWindows[w].x&&player.dotsHit.x<=pWindows[w].x+pWindows[w].width&&
						player.dotsHit.y>=pWindows[w].y&&player.dotsHit.y<=pWindows[w].y+pWindows[w].height) {
							pWindows[w].whole=false;
							var s_glass=sound_glass;
							s_glass.play();
						}
				}
			}
			if (player.belt[player.itemBelt].type==0) {
				if (player.belt[player.itemBelt].id==0) {
					if (!trigger2) { trigger2=true; var s_punch=sound_punch; s_punch.play();}
					player.energy-=0.3;
					if (!trigger1) {
						if (player.handA>0) player.handA-=(player.energy>0)?4:2;
						else trigger1=true;
					} else {
						if (player.handA<45) player.handA+=(player.energy>0)?2:1;
						else { stophit(); }
					}
				}
				if (player.belt[player.itemBelt].id==1) {
					if (!trigger2) { trigger2=true; var s_punch=sound_punch; s_punch.play();}
					player.energy-=0.5;
					if (!trigger1) {
						if (player.handA>-150) player.handA-=(player.energy>0)?10:5;
						else trigger1=true;
					} else {
						if (player.handA<45) player.handA+=(player.energy>0)?4:2;
						else { stophit(); }
					}
				}
			} else {
				if (player.belt[player.itemBelt].type==null) {
					if (!trigger2) { trigger2=true; var s_punch=sound_punch; s_punch.play();}
					player.energy-=0.3;
					if (!trigger1) {
						if (player.handA>0) player.handA-=(player.energy>0)?4:2;
						else trigger1=true;
					} else {
						if (player.handA<45) player.handA+=(player.energy>0)?2:1;
						else { stophit(); }
					}
				}
			}
		}
		if (player.belt[player.itemBelt].type==1) { //выстрел из огнестрельного оружия
			let gun = player.belt[player.itemBelt];
			if (((control.Lbtn)||(curIntervalShoot>0))&&(gun.count>0)) {
				if (curIntervalShoot <= 0) {
					control.reload=false;
					curIntervalShoot = guns[gun.id].intervalShoot;
					var angleToShoot = Math.atan2(cursor.y-gunY, cursor.x-gunX);
					switch (gun.id) {
						case 0: //пули ружья
						bullet.push(newBullet(barrelX, barrelY, angleToShoot, guns[gun.id].damage, 10, 2, 1.5));
						var s_rifle_fire=sound_rifle_fire;
						s_rifle_fire.play();
						var s_rifle_rel1=sound_rifle_reload1;
						s_rifle_rel1.play();
						break;
						case 1:
						var s_shotgun_fire=sound_shotgun_fire;
						s_shotgun_fire.play();
						var s_shotgun_rel1=sound_shotgun_reload1;
						s_shotgun_rel1.play();
						bullet.push(newBullet(barrelX, barrelY, angleToShoot-0.03, guns[gun.id].damage, 4, 1, 3));
						bullet.push(newBullet(barrelX, barrelY, angleToShoot-0.06, guns[gun.id].damage, 4, 1, 3));
						bullet.push(newBullet(barrelX, barrelY, angleToShoot,   guns[gun.id].damage, 4, 1, 3));
						bullet.push(newBullet(barrelX, barrelY, angleToShoot+0.03, guns[gun.id].damage, 4, 1, 3));
						bullet.push(newBullet(barrelX, barrelY, angleToShoot+0.06, guns[gun.id].damage, 4, 1, 3));
						break;
					} --gun.count;
					calcWeight();
				} --curIntervalShoot;
			} else { curIntervalShoot-=(curIntervalShoot>0)?1:0; }
		}
		if (control.reload&&player.belt[player.itemBelt].type==1&&player.belt[player.itemBelt].count<guns[player.belt[player.itemBelt].id].capacity) {
			let gun = guns[player.belt[player.itemBelt].id];
			if (ammoitem==null) {
				for (var c=0; c<player.beltLen; ++c) { //находим патроны на поясе
					if (player.belt[c].type==2&&player.belt[c].id==player.belt[player.itemBelt].id) { ammoitem=c; break; }
				}	
			}
			if (ammoitem!=null) {
				let need = gun.capacity-player.belt[player.itemBelt].count;
				++timeReload;
				if (timeReload>gun.timeToReload) {
					if (need>0&&player.belt[ammoitem].count>0) {
						switch (player.belt[player.itemBelt].id) {
							case 0: var s_rifle_rel0=sound_rifle_reload0; s_rifle_rel0.play(); break;
							case 1: var s_shotgun_rel0=sound_shotgun_reload0; s_shotgun_rel0.play(); break;
						}
						++player.belt[player.itemBelt].count;
						--player.belt[ammoitem].count;
						if (player.belt[ammoitem].count<=0) {
							player.belt[ammoitem]={type:null,id:null,count:0};
						}
						timeReload=0;
					} else {
						control.reload=false;
					}
				}	
			} else control.reload=false;
			ammoitem=null;
		} else control.reload=false;
		if (control.q) { //выброс предмета
			if (player.belt[player.itemBelt].type==1||player.belt[player.itemBelt].type==2) { //если выкидываю оружие или патроны, то целиком
				itemsOnGrave.push(newItem(player.belt[player.itemBelt].type, player.belt[player.itemBelt].id, player.belt[player.itemBelt].count, 
					player.x+player.radius*2*Math.cos(player.radian), player.y+player.radius*2*Math.sin(player.radian)));
				player.belt[player.itemBelt]={type:null,id:null,count:0};
			} else {
				if (player.belt[player.itemBelt].id!=null) {
					itemsOnGrave.push(newItem(player.belt[player.itemBelt].type, player.belt[player.itemBelt].id, 1, 
						player.x+player.radius*2*Math.cos(player.radian), player.y+player.radius*2*Math.sin(player.radian)));
					player.belt[player.itemBelt].count-=1;
					if (player.belt[player.itemBelt].count<=0) { player.belt[player.itemBelt]={type:null,id:null,count:0}; }
				}
			}
			control.q=false; calcWeight();
			//если предмет "застревает" там, где нельзя пройти, то он появится под игроком
			for (var t=0; t<trees.length; ++t) {
				if (getDistance(itemsOnGrave[itemsOnGrave.length-1],trees[t])<=trees[t].radius+5) {
					itemsOnGrave[itemsOnGrave.length-1].x=player.x;
					itemsOnGrave[itemsOnGrave.length-1].y=player.y;
					break;
				}
			}
			for (var w=0; w<walls.length; ++w) {
				var xi=itemsOnGrave[itemsOnGrave.length-1].x;
				var yi=itemsOnGrave[itemsOnGrave.length-1].y;
				if (xi>=walls[w].x&&xi<=walls[w].x+walls[w].width&&yi>=walls[w].y&&yi<=walls[w].y+walls[w].height) {
					itemsOnGrave[itemsOnGrave.length-1].x=player.x;
					itemsOnGrave[itemsOnGrave.length-1].y=player.y;
				}
			}
			for (var p=0; p<ponds.length; ++p) {
				if (getDistance(itemsOnGrave[itemsOnGrave.length-1],ponds[p])<=ponds[p].radius+5) {
					itemsOnGrave[itemsOnGrave.length-1].x=player.x;
					itemsOnGrave[itemsOnGrave.length-1].y=player.y;
					break;
				}
			}
		}
		if (control.use) {//поднятие предмета
			var end=false;
			if (nearPond) {//поднятие грязной воды если стою рядом с прудом
				for (var b=0; b<player.beltLen; ++b) {
					if (player.belt[b].id==null) {
						player.belt[b].id=5;
						player.belt[b].type=3;
						player.belt[b].count+=1;
						break;
					}
				}
			}
			if (nearDoorID>-1) {
				if (pDoors[nearDoorID].open) {
					pDoors[nearDoorID].open=false;
					var s_door_close=sound_door_close;
					s_door_close.play();
				} else {
					pDoors[nearDoorID].open=true;
					var s_door_open=sound_door_open;
					s_door_open.play();
				}
			}
			for (var i=0; i<itemsOnGrave.length; ++i) { if (end) break;
				var countMax=ITEMS[itemsOnGrave[i].type][itemsOnGrave[i].id].max;
				if (getDistance(player, itemsOnGrave[i]) <= player.radius*2) {
					for (var b=0; b<player.beltLen; ++b) {
						if (countMax!=0) {
							if (player.belt[b].id==null||(player.belt[b].id==itemsOnGrave[i].id&&player.belt[b].type==itemsOnGrave[i].type)) {
								player.belt[b].id=itemsOnGrave[i].id;
								player.belt[b].type=itemsOnGrave[i].type;
								player.belt[b].count+=itemsOnGrave[i].count;
								if (player.belt[b].count>countMax) {
									itemsOnGrave[i].count=player.belt[b].count-countMax;
									player.belt[b].count=countMax;
								} else {
									itemsOnGrave.splice(i,1);
									end=true; break;
								}
							}
						} else {
							if (player.belt[b].id==null) {
								player.belt[b]={type:itemsOnGrave[i].type, id:itemsOnGrave[i].id, count:itemsOnGrave[i].count};
								itemsOnGrave.splice(i,1); end=true; break;
							}
						}
					}
				}
			}
			control.use=false; calcWeight();
		}
	}
	player.radian = getRadianBetween(player, cursor);
	player.angle = Math.floor(player.radian*ToAngle);
}
function playerArcCollision(object) {
	if (getDistance(player, object) < player.radius+object.radius) {
		var radToObject = getRadianBetween(object,player);
		player.x=object.x+(player.radius+object.radius)*Math.cos(radToObject);
		player.y=object.y+(player.radius+object.radius)*Math.sin(radToObject);
	} 
}
function playerRectCollision(obj) {
	if (player.x+player.radius>=obj.x&&player.x+player.radius<obj.x+obj.width&&player.y>=obj.y&&player.y<=obj.y+obj.height) {
		player.x=obj.x-player.radius-1; //слева
	}
	if (player.x-player.radius>obj.x&&player.x-player.radius<=obj.x+obj.width&&player.y>=obj.y&&player.y<=obj.y+obj.height) {
		player.x=obj.x+obj.width+player.radius+1; //справа
	}
	if (player.x>=obj.x&&player.x<=obj.x+obj.width&&player.y+player.radius>=obj.y&&player.y+player.radius<obj.y+obj.height) {
		player.y=obj.y-player.radius-1; //сверху
	}
	if (player.x>=obj.x&&player.x<=obj.x+obj.width&&player.y-player.radius<=obj.y+obj.height&&player.y-player.radius>obj.y) {
		player.y=obj.y+obj.height+player.radius+1; //снизу
	}
	playerArcCollision({x:obj.x,y:obj.y,radius:0});
	playerArcCollision({x:obj.x+obj.width, y:obj.y,radius:0});
	playerArcCollision({x:obj.x,y:obj.y+obj.height,radius:0});
	playerArcCollision({x:obj.x+obj.width,y:obj.y+obj.height,radius:0});
}
function drawPlayer() {
	player.dotsHit.x=player.x+(player.radius+11-player.handA/5)*Math.cos((player.angle+player.handA)*ToRadian);
	player.dotsHit.y=player.y+(player.radius+11-player.handA/5)*Math.sin((player.angle+player.handA)*ToRadian);
	drawItemOnHands(player.belt[player.itemBelt]);
	ctx.beginPath(); ctx.fillStyle = "#79553D"; ctx.strokeStyle = "#593315"; ctx.lineWidth=1;//рюкзак
	ctx.arc(player.x-(player.radius-5)*Math.cos(player.radian), player.y-(player.radius-5)*Math.sin(player.radian), player.radius-2, 0, Circle);
	ctx.fill(); ctx.stroke(); ctx.closePath(); ctx.beginPath(); ctx.fillStyle = "cornsilk"; ctx.strokeStyle="#555";//тело
	ctx.arc(player.x, player.y, player.radius, 0, Circle);
	ctx.fill(); ctx.stroke(); ctx.closePath(); ctx.beginPath(); ctx.fillStyle = "#333";//шапка
	ctx.arc(player.x, player.y, player.radius+1, (player.angle+90)*ToRadian, (player.angle-90)*ToRadian);
	ctx.fill();	ctx.closePath(); ctx.beginPath(); ctx.fillStyle = "black";//глаза
	ctx.arc(player.x-(player.radius-5)*Math.cos(player.radian-9), player.y-(player.radius-5)*Math.sin(player.radian-9), 2, 0, Circle);
	ctx.arc(player.x-(player.radius-5)*Math.cos(player.radian+9), player.y-(player.radius-5)*Math.sin(player.radian+9), 2, 0, Circle);
	ctx.fill();	ctx.closePath();
	if (player.belt[player.itemBelt].type==1&&curIntervalShoot>guns[player.belt[player.itemBelt].id].intervalShoot-5) {
		var grad = ctx.createLinearGradient(barrelX, barrelY, barrelX+20*Math.cos(player.radian), barrelY+20*Math.sin(player.radian));
		grad.addColorStop(0,"#ff0"); grad.addColorStop(1,"rgba(255,255,0,0)");
		ctx.beginPath(); ctx.fillStyle=grad;
		ctx.moveTo(barrelX,barrelY); ctx.lineTo(barrelX+20*Math.cos(player.radian-0.5), barrelY+20*Math.sin(player.radian-0.5));
		ctx.lineTo(barrelX+20*Math.cos(player.radian+0.5), barrelY+20*Math.sin(player.radian+0.5));
		ctxFill();
	}
}
