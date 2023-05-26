class World {
	#time={d:1,h:12,m:50,mod:0};
	#stars=[];
	weather={
		cloud:true,
		rain:false,
		wind: true
	};
	#imgGrass = new Image();
	#imgCloud = new Image();
	canvasCloud = document.createElement('canvas');
	#cloud=[];
	#rain=[];
	#realTime;
	#k=[];
	#l=0;
	ms=0;
	poleGrad;
	magicNum;
	#moonOtkl=0;
	getContext() {
		return this.ctxShadow;
	}
	constructor() {
		this.#imgGrass.src="./resources/textures/grass.png";
		this.#imgCloud.src="./resources/textures/cloud.png";
		this.canvasCloud.width=64;
		this.canvasCloud.height=32;
		pixelOn(this.canvasCloud);
		for (let i=0;i<20;++i) this.#stars[i]={x:randomInt(0,Game.width), y:randomInt(40,190)};
		let k=0;
		for (let i=0;i<4;++i) {
			for (let j=0;j<4;++j) {
				this.#k[k]=j;
				k++;
			}
		}
	}
	update() {
		let magicNum3=0.2616*(this.#time.h) + 0.0043*this.#time.m;
		this.poleGrad=(155+200*Math.cos(magicNum3))/255;
		if (this.poleGrad>0.8) this.poleGrad=0.8;
		if (this.poleGrad<0) this.poleGrad=0;


		this.#moonOtkl+=(this.#moonOtkl<=32)?0.003:-32;
		for (let i=0;i<this.#stars.length;++i)
			this.#stars[i].x = (this.#stars[i].x>Game.width)?0:this.#stars[i].x+1;
		if (this.weather.cloud && this.#cloud.length<60) {
			let h=randomInt(16,64);
			let w=(h+randomInt(0,32))*2;
			this.#cloud.push({
				x: -128,
				y: randomInt(0,130),
				speed: 100/(h+w)+randomFloat(0,0.5),
				h: h,
				w: w,
			});
		}
		if (!this.weather.rain && this.#rain.length>0) {
			this.#rain=this.#rain.filter((r)=>{
				return ((r.y>0) && (r.y<Game.height));
			})
		}
		if (this.#cloud.length>0) {
			if (!this.weather.cloud) {
				this.#cloud=this.#cloud.filter((c)=>{
					return ((c.x>-c.w) && (c.x<Game.width));
				})
			}
			let shadowSky=this.canvasCloud.getContext('2d');
			shadowSky.beginPath();
			shadowSky.clearRect(0,0,64,32);
			shadowSky.drawImage(this.#imgCloud, 0, 0, 64,32);
			shadowSky.globalCompositeOperation="source-in";
			shadowSky.fillStyle=`rgba(${255*(1-this.poleGrad)},${255*(1-this.poleGrad)},${255*(1-this.poleGrad)},0.8`;
			shadowSky.fillRect(0, 0, 64, 32);
			shadowSky.closePath();
			shadowSky.globalCompositeOperation="source-over";
		}
	}
	updateWeather() {
		let chance=randomInt(0,100);
		this.weather.cloud=(chance<50)? true: false;
		this.weather.wind=(chance<80)? true: false;
		this.weather.rain=(this.weather.cloud && chance<30)? true: false;
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
		this.magicNum=0.2616*(this.#time.h+6) + 0.0043*this.#time.m;
		let magicNum2=0.2616*(this.#time.h-6) + 0.0043*this.#time.m;
		let gradX = 100 + 120*Math.cos(this.magicNum);
		let gradY = 100 + 105*Math.sin(this.magicNum);
		let gradient = sky.createRadialGradient(gradX,gradY+230,200+150*Math.sin(magicNum2),gradX,gradY,3);
		gradient.addColorStop(0, "rgb(0,0,0)");
		gradient.addColorStop(0.99, "rgb(240,240,240)");
		gradient.addColorStop(1, "white");
		sky.fillStyle = gradient;
		sky.fillRect(0, 0, ctx2.width, ctx2.height);
		ctx.drawImage(ctx2,0,40,Game.width,150);
		ctx.closePath();
		//Луна и звезды
		if (this.#time.h>14 || this.#time.h<8) {
			let ctx2 = document.createElement('canvas');
			let moon=ctx2.getContext('2d');
			ctx2.width=16;
			ctx2.height=16;
			ctx2.globalAlpha=0;
			let moonX=Game.width/2 + Game.width/2*Math.cos(this.magicNum-3.14);
			let moonY=Game.height/3 + Game.width/4*Math.sin(this.magicNum-3.14);
			moon.beginPath();
			moon.fillStyle = "white";
			moon.arc(8, 8, 8, 0, PI2);
			moon.fill();
			moon.globalCompositeOperation = 'destination-out';
			moon.beginPath();
			moon.arc(-8+this.#moonOtkl, 8, 8.5, 0, PI2);
			moon.fill();
			moon.closePath();

			ctx.beginPath();
			ctx.drawImage(ctx2,moonX,moonY,32,32);
			for (let i=0;i<this.#stars.length;++i) {
				ctx.fillStyle=`rgba(255,255,255,${randomFloat(0.2, 0.5)})`;
				ctx.fillRect(this.#stars[i].x, this.#stars[i].y, 2, 1);
			}
		}
		//Облака
		if (this.#cloud.length>0) {
			for (let c of this.#cloud) {
				c.x+=(this.weather.wind)?c.speed:0.1;
				if (c.x>Game.width) {
					c.y=randomInt(0,130);
					c.x=-c.w;
				}
				ctx.drawImage(this.canvasCloud, c.x, c.y, c.w,c.h);
			}
		}
		//Поле
		ctxShadow.globalCompositeOperation="source-over";
		ctxShadow.fillRect(0,190,Layer1.width,Layer1.height-190);
		for (var i=0;i<20;i++) {
			for (var j=0;j<20;j++){
				// ctx.drawImage(this.#img, this.#k[j]*32,0, 32,32, 64*j,190+64*i, 64,64);
				ctx.drawImage(this.#imgGrass, 0,0, 32,32, 64*j,190+64*i, 64,64);
			}
		}
	}

	drawRain() {
		//Дождик
		if (this.weather.rain && this.#rain.length<256) {
			let rx = randomInt(0,Game.width);
			let ry = randomInt(0,Game.height);
			let rspeed = randomInt(10,15);
			let rw = randomInt(1,3);
			let rvector = {
				x: rspeed*Math.cos(-randomFloat(4.9,5.1)),
				y: rspeed*Math.sin(-randomFloat(4.9,5.1))
			}
			this.#rain.push({
				x: rx,
				y: 0,
				speed: rspeed,
				w: rw,
				vector: rvector 
			});
			this.#rain.push({
				x: 0,
				y: ry,
				speed: rspeed,
				w: rw,
				vector: rvector 
			});
		}
		for (let r of this.#rain) {
			if (r.y>Game.height && this.weather.rain) {
				r.y=0;
				// r.speed= randomInt(5,10);
				r.w= randomInt(1,3);
			}
			if (r.x>Game.width) {
				r.x=0;
				// r.speed= randomInt(5,10);
				r.w= randomInt(1,3);
			}
			r.x+=r.vector.x;
			r.y+=r.vector.y; 
			if (r.y<190) {
				ctxShadow.beginPath();
				ctxShadow.lineWidth=r.w+1;
				ctxShadow.moveTo(r.x,r.y);
				ctxShadow.lineTo(r.x+r.vector.x*2, r.y+r.vector.y*2);
				ctxShadow.stroke();
				ctxShadow.closePath();
			}
			ctx.beginPath();
			ctx.strokeStyle="white";
			ctx.lineWidth=r.w;
			ctx.moveTo(r.x,r.y);
			ctx.lineTo(r.x+r.vector.x*2, r.y+r.vector.y*2);
			ctx.stroke();
			ctx.closePath();
		}
	}
	drawShadow() {
		let n=5; //Пикселизация
		let ctx2 = document.createElement('canvas');
		let shadow=ctx2.getContext('2d');
		ctx2.width=Math.floor(Layer1.width/n);
		ctx2.height=Math.floor(Layer1.height/n);
		pixelOn(shadow);
		let radius = 50/n+cursor.y/4/n;
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
		if (gamewindow==null) {
			shadow.arc(cursor.x/n, cursor.y/n, radius, 0, PI2);
			shadow.fill();
		}
		shadow.globalCompositeOperation="source-over";
		
		ctxShadow.globalCompositeOperation="source-in";
		ctxShadow.drawImage(ctx2,0,0,Layer1.width,Layer1.height);
	}
}