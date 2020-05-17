var camera = {x:1000, y:1000, scale:1.5, zoom:15};
var time = 0.0; var alpha = 0;
function updateGame() {
	time+=0.0001;
	camera.x = lerp(camera.x, (player.x-canvas.width/camera.scale/2)+camera.zoom*Math.cos(player.angle*ToRadian), 0.3);
	camera.y = lerp(camera.y, (player.y-canvas.height/camera.scale/2)+camera.zoom*Math.sin(player.angle*ToRadian), 0.3);	
	cursor.x = camera.x+cursor.wX/camera.scale;
	cursor.y = camera.y+cursor.wY/camera.scale;
	updatePlayer();
	updatesectors();
	for (var w=0; w<wolfs.length; ++w) {
		updateWolf(wolfs[w], w);
	}
	curWalkSound=0;
	for (var r=0; r<pRocks.length; ++r) {
		if (getDistance(player,pRocks[r])<pRocks[r].radius) {
			curWalkSound=1;
		}
	}
	for (var f=0; f<pFloors.length; ++f) {
		if (player.x>=pFloors[f].x&&player.x<=pFloors[f].x+pFloors[f].width&&player.y>=pFloors[f].y&&player.y<=pFloors[f].y+pFloors[f].height) {
			curWalkSound=2;
		}
	}
	nearDoorID=-1;
	for (var d=0; d<pDoors.length; ++d) {
		if (getDistance(player,pDoors[d].handle)<=player.radius*3) {
			nearDoorID=d; break;
		}
	}
	for (var b=0; b<bullet.length; ++b) {
		updateBullet(bullet[b]);
		for (var w=0; w<windows.length; ++w) {
			if (windows[w].whole) {
				if (bullet[b].x>=windows[w].x&&bullet[b].x<=windows[w].x+windows[w].width&&
					bullet[b].y>=windows[w].y&&bullet[b].y<=windows[w].y+windows[w].height) {
						windows[w].whole=false;
						var vol=100/getDistance(player,windows[w]);
						PlaySound("sounds/glass.mp3",vol<0?0:vol>1?1:vol);
					}
			}
		}
		for (var w=0; w<walls.length; ++w) {
			if (bullet[b].x>=walls[w].x&&bullet[b].x<=walls[w].x+walls[w].width&&
				bullet[b].y>=walls[w].y&&bullet[b].y<=walls[w].y+walls[w].height)
				bullet[b].timeToLive=0;
		}
		for (var w=0; w<wolfs.length; ++w) {
			if (wolfs[w].health>0) {
				if (getDistance(bullet[b], wolfs[w])<30) {
					wolfs[w].health-=bullet[b].damage;
					bullet[b].timeToLive=0;
					wolfs[w].sound_h.play();
				}
				if (getDistance(bullet[b], {x:wolfs[w].headX, y:wolfs[w].headY})<20) {
					wolfs[w].health-=bullet[b].damage*1.5;
					bullet[b].timeToLive=0;
					wolfs[w].sound_h.play();
				}
			}
		}
		bullet[b].timeToLive-=1;
		if (bullet[b].timeToLive<=0) bullet.splice(b,1);
	}
	var dist=3000; IDnearFire=-1;
	for (var f=0; f<fireOnGrave.length; ++f) {
		if (fireOnGrave[f].life>0) {
			fireOnGrave[f].life-=0.01;
			if (fireOnGrave[f].sound_fire.ended) fireOnGrave[f].sound_fire.play();
		} else {
			fireOnGrave[f].sound_fire.pause();
			fireOnGrave[f].sound_boiling.pause();
			fireOnGrave[f].sound_frying.pause();
		}
		playerArcCollision(fireOnGrave[f]);
		var fdist = getDistance(player, fireOnGrave[f]);
		if (fdist<dist) {
			dist=fdist; IDnearFire=f;
		}
		var vol = (fireOnGrave[f].life/100)*(100/getDistance(player, fireOnGrave[f]));
		fireOnGrave[f].sound_fire.volume=(vol>1)?1:(vol<0)?0:vol;
		for (var i=0; i<itemsOnGrave.length; ++i) { 
			//Готовка еды
			if (getDistance(fireOnGrave[f], itemsOnGrave[i])<=fireOnGrave[f].radius) {
				switch (itemsOnGrave[i].type) {
					case 3:
					if (fireOnGrave[f].life<=0) {
						var ang = getRadianBetween(fireOnGrave[f], player);
						itemsOnGrave[i].x=fireOnGrave[f].x+25*Math.cos(ang);
						itemsOnGrave[i].y=fireOnGrave[f].y+25*Math.sin(ang);
					}
					switch (itemsOnGrave[i].id) {
						case 0://готовка еды
						if (itemsOnGrave[i].readiness==null||itemsOnGrave[i].readiness==undefined) {
							itemsOnGrave[i].readiness=1000;
							fireOnGrave[f].sound_frying.play();
						}
						if (fireOnGrave[f].sound_frying.ended) fireOnGrave[f].sound_frying.play();
						var vol1=50/getDistance(player,fireOnGrave[f]);
						fireOnGrave[f].sound_frying.volume=(vol1>1)?1:(vol1<0)?0:vol1;
						--itemsOnGrave[i].readiness;
						if (itemsOnGrave[i].readiness<=0) {
							var ang = getRadianBetween(fireOnGrave[f], player);
							fireOnGrave[f].sound_frying.pause();
							itemsOnGrave.splice(i,1);
							itemsOnGrave.push(newItem(3,1,1,fireOnGrave[f].x+25*Math.cos(ang),fireOnGrave[f].y+25*Math.sin(ang),fireOnGrave[f].stage));
						}
						break;
						case 5://кипячение воды
						if (itemsOnGrave[i].readiness==null||itemsOnGrave[i].readiness==undefined) {
							itemsOnGrave[i].readiness=500;
							fireOnGrave[f].sound_boiling.play();
						}
						if (fireOnGrave[f].sound_boiling.ended) fireOnGrave[f].sound_boiling.play();
						var vol1=50/getDistance(player,fireOnGrave[f]);
						fireOnGrave[f].sound_boiling.volume=(vol1>1)?1:(vol1<0)?0:vol1;
						--itemsOnGrave[i].readiness;
						if (itemsOnGrave[i].readiness<=0) {
							var ang = getRadianBetween(fireOnGrave[f], player);
							fireOnGrave[f].sound_boiling.pause();
							itemsOnGrave.splice(i,1);
							itemsOnGrave.push(newItem(3,6,1,fireOnGrave[f].x+25*Math.cos(ang),fireOnGrave[f].y+25*Math.sin(ang),fireOnGrave[f].stage));
						}
						break;
						default: itemsOnGrave[i].x=player.x; itemsOnGrave[i].y=player.y; break;
					}
					break;
					case 4:
					if (itemsOnGrave[i].id==0) { //сжигание полена
						fireOnGrave[f].life=100;
						itemsOnGrave.splice(i,1);
						PlaySound("sounds/flame.mp3", 1); fireOnGrave[f].sound_fire.play();
					} else {itemsOnGrave[i].x=player.x; itemsOnGrave[i].y=player.y;}
					break;
					default: itemsOnGrave[i].x=player.x; itemsOnGrave[i].y=player.y; break;
				}
			}
		}
	}
}
function drawGame() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctxGUI.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();
	ctx.translate(-camera.x*camera.scale, -camera.y*camera.scale);
	ctx.scale(camera.scale, camera.scale);
	for (var f=0; f<flowers.length; ++f) {
		drawFlower(flowers[f]);
	}
	for (var r=0; r<rocks.length; ++r) {
		drawRock(rocks[r]);
	}
	for (var f=0; f<pFloors.length; ++f) {
		drawFloor(pFloors[f]);
	}
	for (var d=0; d<pDivans.length; ++d) {
		drawDivan(pDivans[d]);
	}
	for (var b=0; b<pBeds.length; ++b) {
		drawBed(pBeds[b]);
	}
	for (var t=0; t<pTables.length; ++t) {
		drawTable(pTables[t]);
	}
	for (var w=0; w<pWindows.length; ++w) {
		drawWindow(pWindows[w]);
	}
	for (var f=0; f<fplaces.length; ++f) {
		drawFireplace(fplaces[f],0);
	}
	for (var f=0; f<fireOnGrave.length; ++f) {
		drawFire(fireOnGrave[f]);
	}
	for (var r=0; r<pRacks.length; ++r) {
		drawRack(pRacks[r],0);
	}
	for (var i=0; i<itemsOnGrave.length; ++i) {
		drawItemsOnGrave(itemsOnGrave[i]);
	}
	for (var p=0; p<ponds.length; ++p) {
		drawPond(ponds[p]);
	}
	for (var w=0; w<wolfs.length; ++w) {
		drawWolf(wolfs[w]);
	}
	drawPlayer();
	for (var b=0; b<bullet.length; ++b) {
		drawBullet(bullet[b]);
	}
	for (var c=0; c<pChests.length; ++c) {
		drawChest(pChests[c]);
	}
	for (var r=0; r<pRacks.length; ++r) {
		drawRack(pRacks[r],1);
	}
	for (var t=0; t<trees.length; ++t) {
		drawShadowArc(trees[t]);
	}
	for (var w=0; w<walls.length; ++w) {
		drawShadowRect(walls[w]);
	}
	for (var d=0; d<doors.length; ++d) {
		drawShadowPoly(doors[d]);
	}
	for (var w=0; w<walls.length; ++w) {
		drawWall(walls[w]);
	}
	for (var d=0; d<doors.length; ++d) {
		drawDoor(doors[d]);
	}
	idRoof=-1;
	for (var r=0; r<roofs.length; ++r) {
		if (!(player.x>roofs[r].x-30&&player.x<roofs[r].x+roofs[r].width+30&&player.y>roofs[r].y-30&&player.y<roofs[r].y+roofs[r].height+30)) {
			drawRoof(roofs[r]);
		} else idRoof=r;
	}
	for (var f=0; f<fplaces.length; ++f) {
		if (f!=idRoof) drawFireplace(fplaces[f],1);
	}
	for (var t=0; t<trees.length; ++t) {
		drawTree(trees[t]);
	}
	drawInterface();
	if (gameState==1) {
		cursor.draw();
	}
	ctx.restore();
}
var endGame=0;
function drawEndGame() {
	endGame=lerp(endGame,1,0.02);
	ctxGUI.beginPath(); ctxGUI.fillStyle="rgba(0,0,0,"+endGame+")";
	ctxGUI.rect(0,0,canvasGUI.width,canvasGUI.height);
	guiFill();
	if (endGame>0.95) {endGame=0; location.reload();}
}
