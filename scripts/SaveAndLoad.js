var sObjects=[];
function saveObjects() {
	var saveWolfs=[];
	for (var w=0; w<wolfs.length; ++w) {
		if (wolfs[w].health>0) saveWolfs.push(wolfs[w]);
	}
	sObjects=[player,map,camera,time,
	itemsOnGrave,gItemsOnGrave,
	trees,gTrees,pTrees,
	saveWolfs,bullet,
	fireOnGrave,gFireOnGrave,
	flowers,gFlowers,
	ponds,gPonds,pPonds,
	walls,gWalls,pWalls,
	floors,gFloors,pFloors,
	roofs,gRoofs,pRoofs,
	windows,gWindows,pWindows,
	divans,gDivans,pDivans,
	tables,gTables,pTables,
	chests,gChests,pChests,
	racks,gRacks,pRacks,
	fplaces,gFplaces,
	beds,gBeds,pBeds,
	rocks,gRocks,pRocks,
	doors,gDoors,pDoors];
	localStorage.setItem("JSS", JSON.stringify(sObjects));
}
function loadObjects() {
	var save = JSON.parse(localStorage.getItem("JSS"));
	if (save != null && save != undefined) {
		player=save[0]; map=save[1]; camera=save[2]; time=save[3];
		itemsOnGrave=save[4]; gItemsOnGrave=save[5];
		trees=save[6]; gTrees=save[7]; pTrees=save[8];
		wolfs=save[9]; bullet=save[10];
		fireOnGrave=save[11]; gFireOnGrave=save[12];
		flowers=save[13];gFlowers=save[14];
		ponds=save[15];gPonds=save[16];pPonds=save[17];
		walls=save[18];gWalls=save[19];pWalls=save[20];
		floors=save[21];gFloors=save[22];pFloors=save[23];
		roofs=save[24];gRoofs=save[25];pRoofs=save[26];
		windows=save[27];gWindows=save[28];pWindows=save[29];
		divans=save[30];gDivans=save[31];pDivans=save[32];
		tables=save[33];gTables=save[34];pTables=save[35];
		chests=save[36];gChests=save[37];pChests=save[38];
		racks=save[39];gRacks=save[40];pRacks=save[41];
		fplaces=save[42];gFplaces=save[43];
		beds=save[44];gBeds=save[45];pBeds=save[46];
		rocks=save[47];gRocks=save[48];pRocks=save[49];
		doors=save[50];gDoors=save[51];pDoors=save[52];
		for (var w=0; w<wolfs.length; ++w) {
			wolfs[w].sound_a = new Audio("sounds/wolf_attack.mp3");
			wolfs[w].sound_h = new Audio("sounds/wolf_hit.mp3");
			wolfs[w].sound_d = new Audio("sounds/wolf_dead.mp3");
			wolfs[w].sound_a.volume = 0.5;
			wolfs[w].sound_h.volume = 0.5;
			wolfs[w].sound_d.volume = 0.5;
		}
		for (var f=0; f<fireOnGrave.length; ++f) {
			fireOnGrave[f].sound_fire = new Audio("sounds/fire.mp3");
			if (fireOnGrave[f].life>0) fireOnGrave[f].sound_fire.play();
			fireOnGrave[f].sound_frying = new Audio("sounds/meat_frying.mp3");
			fireOnGrave[f].sound_boiling = new Audio("sounds/boiling.mp3");
		}
		for (var f=0; f<gFireOnGrave.length; ++f) {
			gFireOnGrave[f].sound_fire = new Audio("sounds/fire.mp3");
			if (fireOnGrave[f].life>0) gFireOnGrave[f].sound_fire.play();
			gFireOnGrave[f].sound_frying = new Audio("sounds/meat_frying.mp3");
			gFireOnGrave[f].sound_boiling = new Audio("sounds/boiling.mp3");
		}
	}
}