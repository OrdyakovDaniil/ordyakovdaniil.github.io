function newRock(x,y,countStones) {
	var rock = new Object();
	rock.x=x; rock.y=y;
	rock.radius=randomInt(100,150);
	rock.dots=[];
	var countDot=randomInt(5,7);
	for (var d=0; d<countDot; ++d) {
		var prom=Circle/countDot;
		var radian=d*prom+randomFloat(-0.2,0.2);
		var radian1=d*prom+randomFloat(-0.1,0.1);
		var radius=randomInt(100,150);
		rock.dots.push({x: rock.x+radius*Math.cos(radian), y: rock.y+radius*Math.sin(radian),
			x1: rock.x+(radius-30)*Math.cos(radian1), y1: rock.y+(radius-30)*Math.sin(radian1)});
	}
	for (var s=0; s<countStones; ++s) {
		gItemsOnGrave.push(newItem(4,1,1,randomInt(x-rock.radius/2,x+rock.radius/2),randomInt(y-rock.radius/2,y+rock.radius/2)));
	}
	return rock;
}
function drawRock(rock) {
	var style="";
	for (var d=0; d<rock.dots.length; ++d) {
		style="rgb("+(50+d*10)+","+(50+d*10)+","+(50+d*10)+")"
		ctx.beginPath(); ctx.fillStyle=style;
		ctx.moveTo(rock.dots[d].x, rock.dots[d].y);
		ctx.lineTo(rock.dots[d].x1, rock.dots[d].y1);
		if (d<rock.dots.length-1) {
			ctx.lineTo(rock.dots[d+1].x1, rock.dots[d+1].y1);
			ctx.lineTo(rock.dots[d+1].x, rock.dots[d+1].y);
		} else {
			ctx.lineTo(rock.dots[0].x1, rock.dots[0].y1);
			ctx.lineTo(rock.dots[0].x, rock.dots[0].y);
		}
		ctxFill();
	}
	ctx.beginPath(); ctx.fillStyle=style;
	ctx.moveTo(rock.dots[0].x1, rock.dots[0].y1);
	for (var d=1; d<rock.dots.length; ++d) {
		ctx.lineTo(rock.dots[d].x1, rock.dots[d].y1);
	}
	ctxFill();
}
var rocks=[];
var gRocks=[];
var pRocks=[];