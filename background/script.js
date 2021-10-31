const canvas = document.getElementById('microplastics')
const ctx = canvas.getContext('2d')
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let microplasticosArray;


//CREADOR DE MICROPLÁSTICOS
function Microplastico (x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
}


//PINTANDO MICROPLÁSTICOS
Microplastico.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillstyle = this.color;
    ctx.fill();
}


// const microplastico1 = new Microplastico(100, 100, 1, 1, 20, 'white');
// microplastico1.draw();


//UPDATING MICROPLASTICOS
Microplastico.prototype.update = function () {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
        this.directionX = -this.directionX;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
        this.directionY = -this.directionY;
    }
    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
}


//ARRAY DE MICROPLÁSTICOS
function inint() {
    microplasticosArray = [];
    for (let i = 0; i < 3000; i++) {
        let size = Math.random() * 4;
        let x = Math.random() * (innerWidth - size * 2);
        let y =Math.random() * (innerHeight - size * 2);
        let directionX = (Math.random() * .4) - .2;
        let directionY = (Math.random() * .4) - .2;
        let color = 'white'; //xq no me les pinta blanques????????????????????

        microplasticosArray.push(new Microplastico(x, y, directionX, directionY, size, color));
    }
}


//ANIMACIÓN
function animate () {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < microplasticosArray.length; i++) {
        microplasticosArray[i].update()
    }
}
 inint()
 animate()







// ------------  PROVA FONS TV -------------------------  PROVA FONS TV -------------
// const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

// function randomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// for (let i = 0; i < imgData.data.length; i += 4) {
//   imgData.data[i] = randomInt(0, 25); // red
//   imgData.data[i+1] = randomInt(0, 125); // green
//   imgData.data[i+2] = randomInt(0, 255); // blue
//   imgData.data[i+3] = 255; // alpha
// }

// ctx.putImageData(imgData, 0, 0);
// document.body.appendChild(canvas);
// ------------  PROVA FONS TV -------------------------  PROVA FONS TV -------------