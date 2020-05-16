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