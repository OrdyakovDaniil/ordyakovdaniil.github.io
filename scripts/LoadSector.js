var sectorSize = 1000;
var sx = Math.floor(player.x/sectorSize);
var sy = Math.floor(player.y/sectorSize);
var lastX = 1; var lastY = 2;
var map=[[],[],[]];
for (var ny=0; ny<3; ++ny) {
	for (var nx=0; nx<3; ++nx) {
		setSectorType(nx, ny);
		createSector(map[ny][nx], nx, ny);
	}
}
function SAU(arr,gArr,pArr) {
	StoreAndUpload(arr,gArr);
	pArr.splice(0);
	for (var i=0; i<arr.length; ++i) {
		var ox = Math.floor(arr[i].x/sectorSize);
		var oy = Math.floor(arr[i].y/sectorSize);
		if (ox==sx&&oy==sy) {
			pArr.push(arr[i]);
		}
	}
}
function StoreAndUpload(arr, globarr) {
	for (var i=arr.length-1; i>=0; --i) { //если объект далеко от игрока, он сохраняется в глобальный массив
		var ox = Math.floor(arr[i].x/sectorSize);
		var oy = Math.floor(arr[i].y/sectorSize);
		if ((ox<sx-1)||(ox>sx+1)||(oy<sy-1)||(oy>sy+1)) {
			globarr.push(arr[i]);
			arr.splice(i,1);
		}
	}
	for (var i=globarr.length-1; i>=0; --i) { //если объект рядом с игроком, он выгружается из глобавльного массива
		var ox = Math.floor(globarr[i].x/sectorSize);
		var oy = Math.floor(globarr[i].y/sectorSize);
		if ((ox>=sx-1)&&(ox<=sx+1)&&(oy>=sy-1)&&(oy<=sy+1)) {
			arr.push(globarr[i]);
			globarr.splice(i,1);
		}
	}
}
function createSector(type,x,y) {
	var sX=x*sectorSize; var sY=y*sectorSize;
	switch (type) {
		case 0: //создание леса
		for (var cy=0; cy<5; ++cy) {
			for (var cx=0; cx<5; ++cx) {
				gTrees.push(newTree(sX+randomInt(0,100)+200*cx, sY+randomInt(0,100)+200*cy, randomInt(10,20)));
				var chance=randomInt(0,100);
				if (chance<10) {
					var randomRadian=randomFloat(0,Circle);
					var ix=gTrees[gTrees.length-1].x+gTrees[gTrees.length-1].radius*2*Math.cos(randomRadian);
					var iy=gTrees[gTrees.length-1].y+gTrees[gTrees.length-1].radius*2*Math.sin(randomRadian);
					gItemsOnGrave.push(newItem(4,randomInt(0,1),1,ix,iy));
				}
			}
		}
		var chance=randomInt(1,100);
		if (chance<=5) {
			wolfs.push(newWolf(sX+sectorSize/2, sY+sectorSize/2));
		}
		break;
		case 1: //цветочное поле
		for (var k=0; k<50; ++k) {
			gFlowers.push(newFlower(sX+randomInt(0,sectorSize), sY+randomInt(0,sectorSize)));
		}
		break;
		case 2: //пруд
		gPonds.push(newPond(sX+sectorSize/2, sY+sectorSize/2));
		break;
		case 3: //камни
		for (var r=0; r<randomInt(2,4); ++r) {
			gRocks.push(newRock(sX+randomInt(150,sectorSize-150), sY+randomInt(150,sectorSize-150), randomInt(0,5)));
		}
		break;
		case 4: //дом
		gFloors.push(newFloor(sX+200,sY+200,600,600));
		gRoofs.push(newRoof(sX+200,sY+200,600,600));
		gWalls.push(newWall(sX+200,sY+200,20,100,0));
			gWindows.push(newWindow(sX+200,sY+300,20,100));
		gWalls.push(newWall(sX+200,sY+400,20,200,0));
			gWindows.push(newWindow(sX+200,sY+600,20,100));
		gWalls.push(newWall(sX+200,sY+700,20,100,0));
		gWalls.push(newWall(sX+200,sY+500,100,20,0));
		gWalls.push(newWall(sX+370,sY+500,300,20,0));
		gWalls.push(newWall(sX+740,sY+500,40,20,0));
		gWalls.push(newWall(sX+200,sY+780,100,20,0));
	gDoors.push(newDoor(sX+300,sY+795,70,10,0,1.57));
		gWalls.push(newWall(sX+370,sY+780,150,20,0));
		gFplaces.push(newFireplace(sX+520,sY+740,80,80));
		gWalls.push(newWall(sX+520,sY+760,20,60,1));
		gWalls.push(newWall(sX+580,sY+760,20,60,1));
		gWalls.push(newWall(sX+540,sY+800,40,20,1));
		gWalls.push(newWall(sX+600,sY+780,180,20,0));
		gWalls.push(newWall(sX+200,sY+200,450,20,0));
			gWindows.push(newWindow(sX+650,sY+200,100,20));
		gWalls.push(newWall(sX+750,sY+200,50,20,0));
		gWalls.push(newWall(sX+780,sY+200,20,400,0));
			gWindows.push(newWindow(sX+780,sY+600,20,100));
		gWalls.push(newWall(sX+780,sY+700,20,100,0));
	gDoors.push(newDoor(sX+670,sY+515,70,10,0,1.57));
		gWalls.push(newWall(sX+600,sY+200,20,50,0));
	gDoors.push(newDoor(sX+605,sY+250,70,10,1.57,3.14));
		gWalls.push(newWall(sX+600,sY+320,20,200,0));
		gWalls.push(newWall(sX+400,sY+200,20,180,0));
	gDoors.push(newDoor(sX+405,sY+380,70,10,1.57,3.14));
		gWalls.push(newWall(sX+400,sY+450,20,60,0));
		gWalls.push(newWall(sX+400,sY+340,210,20,0));
		gDivans.push(newDivan(sX+500,sY+525));
		gTables.push(newTable(sX+490,sY+620,140,50));
		gChests.push(newChest(sX+680,sY+750));
		gFireOnGrave.push(newFire(sX+560,sY+780,1.57));
		gFireOnGrave[gFireOnGrave.length-1].life=0;
		for (var f=0; f<randomInt(2,3); ++f) {
			gItemsOnGrave.push(newItem(4,0,1,sX+665,sY+775-(f*10)));
		}
		var chance=randomInt(1,100);
		if (chance<=25) {
			gItemsOnGrave.push(newItem(1,0,randomInt(0,5),sX+530, sY+555));
			gItemsOnGrave.push(newItem(2,0,randomInt(5,20),sX+510, sY+630));
		}
		if (chance>25&&chance<=50) {
			gItemsOnGrave.push(newItem(1,1,randomInt(0,8),sX+530, sY+555));
			gItemsOnGrave.push(newItem(2,1,randomInt(8,32),sX+510, sY+630));
		}
		gItemsOnGrave.push(newItem(4,5,randomInt(1,5),sX+725,sY+759)); //ткань в шкафу
		gRacks.push(newRack(sX+510,sY+470,88,30));
		gItemsOnGrave.push(newItem(4,2,randomInt(1,5),sX+530, sY+485));
		gItemsOnGrave.push(newItem(4,3,randomInt(1,2),sX+570, sY+485));
		gRacks.push(newRack(sX+420,sY+470,88,30));
		gRacks.push(newRack(sX+510,sY+360,88,30));
		gItemsOnGrave.push(newItem(3,3,1,sX+530, sY+375)); gItemsOnGrave.push(newItem(3,3,1,sX+540, sY+375));
		gItemsOnGrave.push(newItem(3,3,1,sX+550, sY+375)); gItemsOnGrave.push(newItem(4,4,randomInt(2,5),sX+450, sY+485));
		gBeds.push(newBed(sX+680,sY+300));
		break;
	}
}
function setSectorType(x,y) { //выбор типа сектора с определённым шансом
	var chance = randomInt(0,100);
	if (chance<100) map[y][x]=0;
	if (chance<20) map[y][x]=1;
	if (chance<15) map[y][x]=2;
	if (chance<10) map[y][x]=3;
	if (chance<5) map[y][x]=4;
	//map[y][x]=1;
}
function updatesectors() {
	sx = Math.floor(player.x/sectorSize);
	sy = Math.floor(player.y/sectorSize);
	if ((sx!=lastX)||(sy!=lastY)) { //если игрок перешёл в другой сектор
		sound_environment[map[lastY][lastX]].pause();
		var objects=[wolfs,bullet,itemsOnGrave,gItemsOnGrave,fireOnGrave,gFireOnGrave,flowers,gFlowers,ponds,gPonds,walls,gWalls,floors,gFloors,roofs,gRoofs,
			windows,gWindows,divans,gDivans,tables,gTables,chests,gChests,racks,gRacks,fplaces,gFplaces,beds,gBeds]; //просто добавлять сюда новые объекты
		if (sx==0) { //если игрок в крайнем левом секторе, перемещаем его и все объекты вправо на sectorSize, а в начало добавляем новые сектора
			player.x+=sectorSize; sx = 1; camera.x+=sectorSize;
			for (var ob=0;ob<objects.length;++ob) {
				for (var el=0;el<objects[ob].length;++el) {objects[ob][el].x+=sectorSize;}
			}
			for (var t=0;t<trees.length;++t) {trees[t].x+=sectorSize;
				for (var c=0;c<trees[t].coordsX.length;++c) {trees[t].coordsX[c]+=sectorSize;}
			}
			for (var t=0;t<gTrees.length;++t) {gTrees[t].x+=sectorSize;
				for (var c=0;c<gTrees[t].coordsX.length;++c) {gTrees[t].coordsX[c]+=sectorSize;}
			}
			for (var r=0;r<rocks.length;++r) {rocks[r].x+=sectorSize;
				for (var d=0;d<rocks[r].dots.length;++d) {rocks[r].dots[d].x+=sectorSize; rocks[r].dots[d].x1+=sectorSize;}
			}
			for (var r=0;r<gRocks.length;++r) {gRocks[r].x+=sectorSize;
				for (var d=0;d<gRocks[r].dots.length;++d) {gRocks[r].dots[d].x+=sectorSize; gRocks[r].dots[d].x1+=sectorSize;}
			}
			for (var d=0;d<doors.length;++d) {doors[d].x+=sectorSize;doors[d].handle.x+=sectorSize;
				for (var p=0;p<doors[d].points.length;++p) {doors[d].points[p].x+=sectorSize;}
			}
			for (var d=0;d<gDoors.length;++d) {gDoors[d].x+=sectorSize;gDoors[d].handle.x+=sectorSize;
				for (var p=0;p<gDoors[d].points.length;++p) {gDoors[d].points[p].x+=sectorSize;}
			}
			for (var nullY=0; nullY<map.length; ++nullY) {map[nullY].unshift(-1);}
		}
		if (sy==0) { //если игрок в крайнем верхнем секторе, перемещаем его и все объекты вниз на sectorSize, а в начало добавляем новые сектора
			player.y+=sectorSize; sy = Math.floor(player.y/sectorSize); camera.y+=sectorSize;
			for (var ob=0;ob<objects.length;++ob) {
				for (var el=0;el<objects[ob].length;++el) {objects[ob][el].y+=sectorSize;}
			}
			for (var t=0;t<trees.length;++t) {trees[t].y+=sectorSize;
				for (var c=0;c<trees[t].coordsY.length;++c) {trees[t].coordsY[c]+=sectorSize;}
			}
			for (var t=0;t<gTrees.length;++t) {gTrees[t].y+=sectorSize;
				for (var c=0;c<gTrees[t].coordsY.length;++c) {gTrees[t].coordsY[c]+=sectorSize;}
			}
			for (var r=0;r<rocks.length;++r) {rocks[r].y+=sectorSize;
				for (var d=0;d<rocks[r].dots.length;++d) {rocks[r].dots[d].y+=sectorSize;rocks[r].dots[d].y1+=sectorSize;}
			}
			for (var r=0;r<gRocks.length;++r) {gRocks[r].y+=sectorSize;
				for (var d=0;d<gRocks[r].dots.length;++d) {gRocks[r].dots[d].y+=sectorSize;gRocks[r].dots[d].y1+=sectorSize;}
			}
			for (var d=0;d<doors.length;++d) {doors[d].y+=sectorSize;doors[d].handle.y+=sectorSize;
				for (var p=0;p<doors[d].points.length;++p) {doors[d].points[p].y+=sectorSize;}
			}
			for (var d=0;d<gDoors.length;++d) {gDoors[d].y+=sectorSize;gDoors[d].handle.y+=sectorSize;
				for (var p=0;p<gDoors[d].points.length;++p) {gDoors[d].points[p].y+=sectorSize;}
			}
			map.unshift([]);
			for (var nullX=0; nullX<map[1].length; ++nullX) {map[0][nullX]=-1;}
		}
		if (sx==map[sy].length-1) { //если игрок в крайнем правом секторе
			for (var nullY=0; nullY<map.length; ++nullY) {map[nullY].push(-1);}
		}
		if (sy==map.length-1) { //если игрок в крайнем нижнем секторе
			map.push([]);
			for (var nullX=0; nullX<map[sy].length; ++nullX) {map[sy+1][nullX]=-1;}
		}
		for (var ny=sy-1; ny<=sy+1; ++ny) { //обновление секторов вокруг игрока. если сектор пустой, он создаётся
			for (var nx=sx-1; nx<=sx+1; ++nx) {
				if (/*(ny>0&&nx>0&&ny<map.length&&nx<map[sy].length)&&*/map[ny][nx]==-1) {
					setSectorType(nx, ny);
					createSector(map[ny][nx], nx, ny);
				}
			}
		}
		SAU(trees, gTrees, pTrees);
		StoreAndUpload(itemsOnGrave, gItemsOnGrave);
		StoreAndUpload(fireOnGrave, gFireOnGrave);
		StoreAndUpload(flowers, gFlowers);
		SAU(ponds, gPonds, pPonds);
		SAU(rocks, gRocks, pRocks);
		SAU(walls, gWalls, pWalls);
		SAU(floors, gFloors, pFloors);
		SAU(windows, gWindows, pWindows);
		SAU(doors, gDoors, pDoors);
		SAU(divans, gDivans, pDivans);
		SAU(roofs, gRoofs, pRoofs);
		SAU(tables, gTables, pTables);
		SAU(chests, gChests, pChests);
		SAU(racks, gRacks, pRacks);
		StoreAndUpload(fplaces, gFplaces);
		SAU(beds, gBeds, pBeds);
	}
	if (map[sy][sx]!=-1) sound_environment[map[sy][sx]].play();
	lastX = sx; lastY = sy;
}
/*
0-лес
1-поле
2-пруд
3-камни
4-дом */