class Cursor {
	constructor() { this.x = 0; this.y = 0; this.k1 = 0; this.k2 = 0; this.wX = 0; this.wY = 0; }
	draw() {
		ctxGUI.strokeStyle="#fff"; ctxGUI.fillStyle="#fff"; ctxGUI.lineWidth=2;
		if (control.reload) {
			ctxGUI.beginPath();
			ctxGUI.arc(this.wX, this.wY, 5, (timeReload*12-90)*ToRadian, (timeReload*12+180)*ToRadian);
			ctxGUI.stroke(); ctxGUI.closePath();
		} else {
			switch (player.belt[player.itemBelt].type) {
				default:
					ctxGUI.beginPath();
					ctxGUI.arc(this.wX, this.wY, 3, 0, Circle);
					ctxGUI.fill(); ctxGUI.closePath();
				break;
				case 1:
					switch (player.belt[player.itemBelt].id) {
						case 0:
						this.k1 = 5+curIntervalShoot/4;
						this.k2 = 10+curIntervalShoot/4;
						ctxGUI.beginPath();
						ctxGUI.moveTo(this.wX-this.k1, this.wY); ctxGUI.lineTo(this.wX-this.k2, this.wY);
						ctxGUI.moveTo(this.wX+this.k1, this.wY); ctxGUI.lineTo(this.wX+this.k2, this.wY);
						ctxGUI.moveTo(this.wX, this.wY-this.k1); ctxGUI.lineTo(this.wX, this.wY-this.k2);
						ctxGUI.moveTo(this.wX, this.wY+this.k1); ctxGUI.lineTo(this.wX, this.wY+this.k2);
						ctxGUI.stroke(); ctxGUI.closePath();
						break;
						case 1:
						ctxGUI.beginPath();
						var radius = 10+curIntervalShoot/4;
						ctxGUI.arc(this.wX, this.wY, radius, 60*ToRadian, 120*ToRadian);
						ctxGUI.stroke(); ctxGUI.closePath(); ctxGUI.beginPath();
						ctxGUI.arc(this.wX, this.wY, radius, -30*ToRadian, 30*ToRadian);
						ctxGUI.stroke(); ctxGUI.closePath(); ctxGUI.beginPath();
						ctxGUI.arc(this.wX, this.wY, radius, -120*ToRadian, -60*ToRadian);
						ctxGUI.stroke(); ctxGUI.closePath(); ctxGUI.beginPath();
						ctxGUI.arc(this.wX, this.wY, radius, 150*ToRadian, -150*ToRadian);
						ctxGUI.stroke(); ctxGUI.closePath();
						break;
					}
				break;
			}
		}
	}
}
var cursor = new Cursor();