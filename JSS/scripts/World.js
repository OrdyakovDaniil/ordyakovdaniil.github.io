class World {
	#time={d:1,h:23,m:0,mod:0};
	#stars=[];
	weather={
		cloud:	false,
		rain:	false,
		wind:	false
	};
	#imgGrass = new Image();
	#imgCloud = new Image();
	canvasCloud = document.createElement('canvas');
	canvasGround = document.createElement('canvas');
	#cloud=[];
	#cloudColor=0;
	#modCC=0;
	#rain=[];
	#realTime;
	#l=0;
	poleGrad=0;
	magicNum=0;
	magicNum2=0;
	sunX=0;
	sunY=0;
	sunRadius=0;
	#moonOtkl=0;
	constructor() {
		this.#imgGrass.src="./resources/textures/grass.png";
		this.#imgCloud.src="./resources/textures/cloud.png";
		this.canvasCloud.width=64;
		this.canvasCloud.height=32;
		// pixelOn(this.canvasCloud);
		for (let i=0;i<20;++i) this.#stars[i]={x:randomInt(0,gameWidth), y:randomInt(40,190)};

		//Поле
		this.canvasGround.width=640;
		this.canvasGround.height=320;

		this.#imgGrass.onload=()=>{
			var ctxGround = this.canvasGround.getContext("2d");
			for (var i=0;i<10;i++) {
				for (var j=0;j<20;j++) {
					ctxGround.drawImage(this.#imgGrass, 0,0, 32,32, 32*j,32*i, 32,32);
				}
			}
			pixelOn(this.canvasGround);
		}
	}
	update() {
		if ((this.weather.cloud && this.weather.rain) && this.#rain.length<128) {
			let rx = randomInt(0,gameWidth);
			let ry = randomInt(0,gameHeight);
			let rw = randomInt(1,3);
			let rspeed = rw;
			let rangle=-randomFloat(4.9,5.1);
			let rvector = {
				x: 10+rw*10*Math.cos(rangle),
				y: 10+rw*10*Math.sin(rangle)
			}
			this.#rain.push({
				x: rx,
				y: 0,
				speed: rspeed,
				w: rw,
				angle: rangle,
				vector: rvector 
			});
			this.#rain.push({
				x: 0,
				y: ry,
				speed: rspeed,
				w: rw,
				angle: rangle,
				vector: rvector 
			});
		}

		if (this.weather.rain) {
			this.#modCC--;
		} else {
			this.#modCC++;
		}
		if (this.#modCC>0) this.#modCC=0;
		if (this.#modCC<-155) this.#modCC=-155;
		this.#cloudColor=ceil(255*(1-this.poleGrad)+this.#modCC);
		if (this.#cloudColor<0) this.#cloudColor=0;
		if (this.#cloudColor>255) this.#cloudColor=255;

		let shadowSky=this.canvasCloud.getContext('2d');
		shadowSky.beginPath();
		shadowSky.clearRect(0,0,64,32);
		shadowSky.drawImage(this.#imgCloud, 0, 0, 64,32);
		shadowSky.globalCompositeOperation="source-in";
		shadowSky.fillStyle=`rgb(${this.#cloudColor},${this.#cloudColor},${this.#cloudColor}`;
		shadowSky.fillRect(0, 0, 64, 32);
		shadowSky.closePath();
		shadowSky.globalCompositeOperation="source-over";

		if (this.#cloud.length>0) {
			for (let c of this.#cloud) {
				c.speed=(this.weather.wind)? lerp(c.speed, c.fixspeed, 0.01) : lerp(c.speed, 0.1, 0.01);
				c.x+=c.speed;
				if (c.x>gameWidth && this.weather.cloud) {
					if (!this.weather.rain) {
						c.h=randomInt(1,4)*16;
						c.w=c.h*2;
						c.fixspeed=64/c.h;
					}
					c.y=randomFloat(0,150);
					c.x=-c.w;
				}
			}
		}
		for (let r of this.#rain) {
			if (r.y>gameHeight) {
				r.y=0;
				r.x=randomInt(0,gameWidth);
				r.w= randomInt(1,3);
			}
			if (r.x>gameWidth) {
				r.x=0;
				r.w= randomInt(1,3);
			}
			r.x+=floor(r.vector.x);
			r.y+=floor(r.vector.y);
		}
	}
	updateEverySec() {
		let magicNum3=0.2616*(this.#time.h) + 0.0043*this.#time.m;
		this.poleGrad=(155+200*Math.cos(magicNum3))/255;
		if (this.poleGrad>0.8) this.poleGrad=0.8;
		if (this.poleGrad<0) this.poleGrad=0;

		this.#moonOtkl+=(this.#moonOtkl<=32)?0.003:-32;
		for (let i=0;i<this.#stars.length;++i)
			this.#stars[i].x = (this.#stars[i].x>gameWidth)?0:this.#stars[i].x+1;

		let maxCloud=(this.weather.rain)?64:32;
		if (this.weather.cloud && this.#cloud.length<maxCloud) {
			let h=randomInt(1,4)*16;
			let w=h*2;
			if (this.weather.rain) {
				h*=2;
				w*=2;
			}
			this.#cloud.push({
				x: -w,
				y: randomFloat(0,150),
				speed: 0,
				fixspeed: 64/h,
				h: h,
				w: w,
			});
		}

		this.#cloud.sort(sort("y"));
		for (let r of this.#rain) if (!this.weather.wind) r.vector.x=lerp(r.vector.x,0,0.1); else r.vector.x=lerp(r.vector.x, 10+r.w*10*Math.cos(r.angle), 0.1);
		if (!this.weather.rain && this.#rain.length>0) this.#rain.splice(0,16);

		if (this.#cloud.length>0) {
			if (!this.weather.cloud) {
				this.#cloud=this.#cloud.filter((c)=>{
					return ((c.x>-c.w) && (c.x<gameWidth));
				})
			}
		}


		this.magicNum=0.2616*(this.#time.h+6) + 0.0043*this.#time.m;
		this.magicNum2=0.2616*(this.#time.h-6) + 0.0043*this.#time.m;

		this.sunX = 100 + 120*Math.cos(this.magicNum);
		this.sunY = 100 + 105*Math.sin(this.magicNum);
		this.sunRadius=200+150*Math.sin(this.magicNum2);
		if (this.#time.h>14 || this.#time.h<8) {
			this.moonX=gameWidth/2 + gameWidth/2*Math.cos(this.magicNum-3.14);
			this.moonY=gameHeight/3 + gameWidth/4*Math.sin(this.magicNum-3.14);
		}

	}
	updateEveryMin() {
		let chance=randomInt(0,100);
		this.weather.cloud=(chance<50)? true: false;
		if (chance<30 && !this.weather.wind) {
			this.weather.wind=true;
		} else {
			if (chance>90) this.weather.wind=false;
		}
		if (chance<20 && !this.weather.rain && this.weather.cloud) {
			this.weather.rain=true;
		} else {
			if (chance>70) this.weather.rain=false;
		}
	}
	updateTime = () => { //Игровое время
		this.#realTime = new Date();
		if (this.#time.mod!=this.#realTime.getSeconds()) {
			this.#time.mod=this.#realTime.getSeconds(); //модификатор для отслеживания изменения времени
			this.#time.m+=1;
			
			if (this.#time.m>=60) {
				this.#time.m=0;
				this.#time.h++;
			}
			if (this.#time.h>=24) {
				this.#time.h=0;
				this.#time.d++;
			}
		}
		return this.#time;
	}
	drawLayer() {
		//Небо
		ctx.beginPath();
		let ctx2 = document.createElement('canvas');
		let sky=ctx2.getContext('2d');
		ctx2.width=200;
		ctx2.height=30;
		let gradient = sky.createRadialGradient(100+this.sunX, this.sunY, this.sunRadius, this.sunX, this.sunY,3);
		gradient.addColorStop(0, "rgb(0,0,0)");
		gradient.addColorStop(0.996, "rgb(240,240,240)");
		gradient.addColorStop(1, "white");
		sky.fillStyle = gradient;
		sky.fillRect(0, 0, ctx2.width, ctx2.height);
		ctx.drawImage(ctx2,0,40,gameWidth,150);
		ctx.closePath();
		//Луна и звезды
		if (this.#time.h>14 || this.#time.h<8) {
			let ctx2 = document.createElement('canvas');
			let moon=ctx2.getContext('2d');
			ctx2.width=16;
			ctx2.height=16;
			ctx2.globalAlpha=0;
			moon.beginPath();
			moon.fillStyle = "white";
			moon.arc(8, 8, 8, 0, PI2);
			moon.fill();
			moon.globalCompositeOperation = 'destination-out';
			moon.beginPath();
			moon.arc(-8+this.#moonOtkl, 7, 8.5, 0, PI2);
			moon.fill();
			moon.closePath();

			ctx.beginPath();
			for (let i=0;i<this.#stars.length;++i) {
				ctx.fillStyle=`rgba(255,255,255,${randomFloat(0.2, 0.5)})`;
				ctx.fillRect(this.#stars[i].x, this.#stars[i].y, 2, 2);
			}
			ctx.drawImage(ctx2,this.moonX,this.moonY,32,32);
		}
		//Облака
		for (let c of this.#cloud) {
			ctx.drawImage(this.#imgCloud, c.x, c.y, c.w,c.h);
			ctx.drawImage(this.canvasCloud, c.x, c.y, c.w,c.h);
		}
		
		//Поле
		ctx.drawImage(this.canvasGround, 0, 190, 1280, 640);
	}

	drawRain() {
		//Дождик
		for (let r of this.#rain) {
			ctx.beginPath();
			ctx.strokeStyle="white";
			ctx.lineWidth=r.w;
			ctx.moveTo(r.x,r.y);
			ctx.lineTo(r.x+r.vector.x, r.y+r.vector.y);
			ctx.stroke();
			ctx.closePath();
		}
	}
	drawShadow() {
		ctxShadow.fillRect(0,190,Layer1.width,Layer1.height-190);
		let ctx2 = document.createElement('canvas');
		let shadow=ctx2.getContext('2d');
		ctx2.width=200;
		ctx2.height=160;
		pixelOn(shadow);
		let radius = 10+cursor.y/20;
		shadow.fillStyle=`rgba(0,0,0,${this.poleGrad})`;
		shadow.fillRect(0, 0,ctx2.width, ctx2.height);
		shadow.globalCompositeOperation="destination-out";
		/*shadow.moveTo(ctx2.width, ctx2.height);
		let radian=Math.atan2(ctx2.height-(cursor.y/n-190/n), ctx2.width-cursor.x/n);
		let x1=cursor.x/n+radius*Math.cos(radian+1.57);
		let y1=cursor.y/n-190/n+radius*Math.sin(radian+1.57);
		shadow.lineTo(x1, y1);
		radian=Math.atan2(y1-(cursor.y/n-190/n), x1-cursor.x/n);
		shadow.arc(cursor.x/n, cursor.y/n-190/n, radius, radian, radian+Math.PI+0.3);
		shadow.lineTo(ctx2.width, ctx2.height);
		shadow.fill();
		ctx.closePath();*/
		if ((gamewindow==null) && ((this.#time.h>=17) || (this.#time.h<=4))) {
			shadow.arc(cursor.x/5, cursor.y/5, radius, 0, PI2);
			shadow.fill();
		}
		shadow.globalCompositeOperation="source-over";
		
		
		for (let r of this.#rain) {
			if (r.y<190) {
				ctxShadow.beginPath();
				ctxShadow.lineWidth=r.w+1;
				ctxShadow.lineCap="square";
				ctxShadow.moveTo(r.x,r.y);
				ctxShadow.lineTo(r.x+r.vector.x, r.y+r.vector.y);
				ctxShadow.stroke();
				ctxShadow.closePath();
			}
		}
		ctxShadow.globalCompositeOperation="source-in";
		ctxShadow.drawImage(ctx2,0,0,gameWidth,gameHeight);
		ctxShadow.globalCompositeOperation="source-over";
	}
}