function newCraft(resources, result) {
	let craftObject = new Object(); craftObject.resources=resources; craftObject.result=result; return craftObject;
}
var craft=[[
	newCraft([{type:4,id:0,need:1},{type:4,id:1,need:3}], {type:5, id:0, count:1}),
	newCraft([{type:4,id:0,need:3},{type:4,id:2,need:5}], {type:1, id:0, count:1}),
	newCraft([{type:4,id:0,need:5},{type:4,id:2,need:10}], {type:1, id:1, count:1}),
	newCraft([{type:4,id:2,need:2},{type:4,id:3,need:1}], {type:2, id:0, count:5}),
	newCraft([{type:4,id:2,need:3},{type:4,id:3,need:2}], {type:2, id:1, count:8}),
	newCraft([{type:4,id:0,need:1},{type:4,id:2,need:1}], {type:0, id:0, count:1}),
	newCraft([{type:4,id:0,need:2},{type:4,id:2,need:1}], {type:0, id:1, count:1}),
],[
	newCraft([{type:3,id:0,need:2},{type:4,id:2,need:1}], {type:3, id:3, count:2}),
	newCraft([{type:4,id:5,need:1},{type:3,id:6,need:1}], {type:3, id:4, count:1}),
	newCraft([{type:4,id:5,need:1},{type:3,id:5,need:1}], {type:3, id:6, count:1}),
	newCraft([{type:3,id:1,need:1},{type:4,id:0,need:1}], {type:3, id:2, count:5}),
	newCraft([{type:3,id:6,need:1},{type:3,id:2,need:2}], {type:3, id:7, count:1}),
],[
	newCraft([{type:4,id:4,need:5},{type:4,id:5,need:3}], {type:-1, name:"+1 ячейка на поясе",
		command: function() {
			if (player.beltLen<9) {
				++player.beltLen;
				player.belt[player.beltLen-1]={id:null,type:null,count:0};
				if (player.beltLen==9) craft[1][0].result.name="Максимум ячеек";
				for (var b=0; b<player.bag.length;++b) {
					if (player.bag[b].type==4&&player.bag[b].id==4) {
						player.bag[b].count-=5;
					}
					if (player.bag[b].type==4&&player.bag[b].id==5) {
						player.bag[b].count-=3;
					}
				}
			}
		}}),
	newCraft([{type:4,id:4,need:3},{type:4,id:5,need:5}], {type:-1, name:"+5 кг. макс. веса",
		command: function() {
			if (player.maxWeight<55) {
				player.maxWeight+=5;
				if (player.maxWeight==55) craft[1][1].result.name="Максимальный вес";
				for (var b=0; b<player.bag.length;++b) {
					if (player.bag[b].type==4&&player.bag[b].id==4) {
						player.bag[b].count-=3;
					}
					if (player.bag[b].type==4&&player.bag[b].id==5) {
						player.bag[b].count-=5;
					}
				}
			}
		}}),
]];
