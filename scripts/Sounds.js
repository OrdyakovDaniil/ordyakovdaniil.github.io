function PlaySound(src, volume) {
	var sound = new Audio(src);
	sound.volume=(volume>1?1:(volume<0?0:volume));
	sound.play();
}
var curWalkSound=0;
var sound_walk = [
	new Audio("sounds/walk_wood.mp3"),
	new Audio("sounds/walk_rock.mp3"),
	new Audio("sounds/walk_home.mp3"),
	];
sound_walk[1].volume=0.6;
var sound_bagOpen = new Audio("sounds/bagopen.mp3");
sound_bagOpen.volume=0.3;
var sound_bagClose = new Audio("sounds/bagclose.mp3");
sound_bagClose.volume=0.3;
var sound_wolf = new Audio("sounds/wolf_wooo.mp3");
sound_wolf.volume=0.5;
var sound_environment = [
new Audio("sounds/forest.mp3"),
new Audio("sounds/field.mp3"),
new Audio("sounds/pond.mp3"),
new Audio("sounds/field.mp3"),
new Audio("sounds/field.mp3"),
// new Audio("sounds/pond.mp3"),
// new Audio("sounds/rocks.mp3"),
// new Audio("sounds/house.mp3"),
];
for (var s=0; s<sound_environment.length; ++s) {
	sound_environment[s].volume=0.4;
}
var sound_glass=new Audio("sounds/glass.mp3");
var sound_flame=new Audio("sounds/flame.mp3");
var sound_rifle_reload1=new Audio("sounds/rifle_reload1.mp3");
var sound_shotgun_reload1=new Audio("sounds/shotgun_reload1.mp3");
var sound_eating=new Audio("sounds/eating.mp3");
var sound_drinking=new Audio("sounds/drinking.mp3");
var sound_punch=new Audio("sounds/punch0.mp3");
var sound_rifle_fire=new Audio("sounds/rifle_fire.mp3");
var sound_shotgun_fire=new Audio("sounds/shotgun_fire.mp3");
var sound_rifle_reload0=new Audio("sounds/rifle_reload0.mp3");
var sound_shotgun_reload0=new Audio("sounds/shotgun_reload0.mp3");
var sound_door_close=new Audio("sounds/door_close.mp3");
var sound_door_open=new Audio("sounds/door_open.mp3");
