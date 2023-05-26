var imgText=new Image();
var symbolCor={};
var animText={};
function loadAlphabet(lang) {
	symbolCor={};
	imgText.src="./resources/textures/text.png";
	switch (lang) {
		case "RU":
			let cx=0; let cy=0;
			for (let i=1040; i<=1103; ++i) {
				if (cx>=48) {
					cx=0; cy+=10;
				}
				if (i==1046 || i==1078) cx+=8;
				symbolCor[i]={x:cx, y: cy};
				cx+=8;
			}
			symbolCor["1025"]={x:0, y: 10};
			symbolCor["1105"]={x:24, y: 60};
		break;
		case "EN":

		break;
	}
	let cy=0;
	for (let i=48; i<=57; ++i) { //цифры
		symbolCor[i]={x:48, y:cy}
		cy+=10;
	}
	symbolCor[".".charCodeAt(0)]={x:56, y: 60}; //.
	symbolCor[",".charCodeAt(0)]={x:56, y: 70}; //,
	symbolCor["!".charCodeAt(0)]={x:48, y: 100}; //!
	symbolCor["?".charCodeAt(0)]={x:56, y: 0}; //?
	symbolCor["+".charCodeAt(0)]={x:56, y: 10}; //+
	symbolCor["-".charCodeAt(0)]={x:56, y: 20}; //-
	symbolCor["=".charCodeAt(0)]={x:56, y: 30}; //=
	symbolCor["(".charCodeAt(0)]={x:56, y: 40}; //(
	symbolCor[")".charCodeAt(0)]={x:56, y: 50}; //)
	symbolCor[":".charCodeAt(0)]={x:56, y: 80}; //:
	symbolCor["/".charCodeAt(0)]={x:56, y: 90};
	symbolCor["~".charCodeAt(0)]={x:56, y: 100}; //close
}
function createText(w,h, x,y, text, size, dist) {
	let ctx2 = document.createElement('canvas')
	let context=ctx2.getContext('2d');
	ctx2.width=w;
	ctx2.height=h;
	pixelOn(context);
	text=text.toString();
	let arr = text.split("");
	let dy = y;
	let dx = x;
	for (let i=0;i<arr.length;++i) {
		let symbol=arr[i];
		let code=symbol.charCodeAt(0);
		let source=symbolCor[code];
		if (source!=undefined) context.drawImage(imgText, source.x, source.y, 8, 10, dx, dy, 8*size, 10*size);
		dx+=(8*size+dist);
		if (symbol=="\n") {
			dy+=10*size;
			dx=x;
		}
	}
	return ctx2;
}
function drawText(x,y, text, size, dist) {
	text=text.toString();
	let arr = text.split("");
	let dy = y;
	let dx = x;
	for (let i=0;i<arr.length;++i) {
		let symbol=arr[i];
		let code=symbol.charCodeAt(0);
		let source=symbolCor[code];
		if (source!=undefined) ctxInterface.drawImage(imgText, source.x, source.y, 8, 10, dx, dy, 8*size, 10*size);
		dx+=(8*size+dist);
		if (symbol=="\n") {
			dy+=10*size;
			dx=x;
		}
	}
}
function createAnimText(x,y,text,size,dist, ms) {
	return {
		x: x,
		y: y,
		text: text.toString().split(""),
		size: size,
		dist: dist,
		animStop: false,
		cadr:0,
		t:0,
		cadrToTime: ms
	}
}
function drawAnimText(obj) {
	if (obj.t>obj.cadrToTime&&obj.cadr<obj.text.length) {
		obj.t=0;
		obj.cadr++;
	}
	obj.t++;
	for (let i=0;i<obj.cadr;++i) {
		let code=obj.text[i].charCodeAt(0);
		let source=symbolCor[code];
		if (source!=undefined) ctxInterface.drawImage(imgText, source.x, source.y, 8, 10, obj.x+i*(8*obj.size+obj.dist), obj.y, 8*obj.size, 10*obj.size);
	}
}

//Пример использования анимациоонных текстов:
//Один раз создаёшь объект (например в конструкторе класса)
// let txt="()+=-,.!?АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЫЪЬЭЮЯ";
// animText["text1"]=createAnimText(this.#x+this.#w/2-txt.length*8, this.#y+200, txt, 2, 0, 10);
//Отрисовываешь где надо
//drawAnimText(animText["text1"]);