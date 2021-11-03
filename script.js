const canvas = document.getElementById('main')

let ctx;
if(canvas !== null){
  ctx = canvas.getContext('2d')
  canvas.width = 1000;
  canvas.height = 600;
}


let score = 0

//------- CARGANDO IMÁGENES -----------------------------
const loadedImages = {}

const imageLinks = [ //Array de objetos con los enlaces (y los nombres para identificarlos) de todas mis imagenes
  {link: "../img/peix_transp_dreta.png", name: 'fish_right'},
  {link: "../img/peix_transp_esquerra.png", name: 'fish_left'},
  {link: "../img/bubble.png", name: 'bubble'},
  {link: "../img/sand_BG.png", name: 'sorra'},
]

let counterForLoadedImages = 0;

imageLinks.forEach((imagen)=>{ 
  const img = new Image() 
  img.src = imagen.link 
  img.onload = ()=>{ 
    counterForLoadedImages++ 
    loadedImages[imagen.name] = img
    if(imageLinks.length === counterForLoadedImages){ 
    }
  }
})
//------- CARGANDO IMÁGENES -----------------------------




// -------------------------------- BACKGROUND MICROPLÁSTICOS ------------------------------
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
    ctx.fillStyle = this.color;
    ctx.fill();
}


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
    for (let i = 0; i < 4000; i++) {
        let size = Math.random() * 2.5;
        let x = Math.random() * (innerWidth - size * 2);
        let y =Math.random() * (innerHeight - size * 2);
        let directionX = (Math.random() * .4) - .2;
        let directionY = (Math.random() * .4) - .2;
        let color = '#5a0101';

        microplasticosArray.push(new Microplastico(x, y, directionX, directionY, size, color));
    }
}
// -------------------------------- BACKGROUND MICROPLÁSTICOS ------------------------------



//--------------- FISH ---------------------------
class Fish {
  constructor(){
    this.x = (canvas.width/2) -50;
    this.y = (canvas.height/2) -50;
    this.speedX = 0;
    this.speedY = 0;
    this.width = 100;
    this.height = 100;
    this.direction = "left";
  }
}

const fish = new Fish()
//--------------- FISH ---------------------------




//BUBBLES---------------------------BUBBLES
class Bubble {
  constructor(){
    this.eaten = false;
    this.x = Math.random() * canvas.width -50;
    this.y = 700; 
    this.width = 90;
    this.height = 80;
    this.speed = Math.floor(Math.random() * 5 +1);  //no funciona velocidad random
  }

  drawBubble(){
    ctx.drawImage(loadedImages.bubble, this.x, this.y, this.width, this.height)
  }


  //---------------------------------------- COLISIÓN ------------
  checkForEatenBubbles(){
   const bothInX = (this.x - 90) < fish.x && this.x +50 > fish.x
   const bothInY = (this.y - 70) < fish.y && this.y > fish.y
  
    if( bothInX && bothInY ){ 
      this.eaten = true
      score++;
      bubbleSound.play()
      document.getElementById('score').innerText = score
    }
  }
}
  //---------------------------------------- COLISIÓN ------------
//BUBBLES---------------------------BUBBLES




//-------------------------- SONIDOS --------------------------
let bubbleSound = new Audio('../sounds/bubble_sound.wav')
    bubbleSound.volume = 1
    bubbleSound.preload = 'auto'
    bubbleSound.load()


const audio = document.getElementById('audio');
const playPauseBTN = document.getElementById('pPButton')

function playPause(){
  if(!audio.paused){
    audio.pause();
    playPauseBTN.style.backgroundImage = 'url(../sounds/sound_off.png)';
  } else {
    audio.play();
    playPauseBTN.style.backgroundImage = 'url(../sounds/sound_on.png)';
  }
}
//-------------------------- SONIDOS --------------------------



//----------------------- PINTANDO Y ACTUALIZANDO BUBBLES -----------------
let bubblesArray = []

const createBubbles = setInterval(()=>{
  bubblesArray.push(new Bubble())
}, 750)


const updateBubbles = ()=>{
  bubblesArray.forEach((bubble)=>{
    bubble.speed = 3
    bubble.y -= bubble.speed
  })
}

const checkForEatenBubbles = ()=>{
  bubblesArray.forEach((bubble)=>{
    bubble.checkForEatenBubbles()
  })
}

const drawBubbles = ()=>{
  bubblesArray.forEach((bubble)=>{
    ctx.drawImage(loadedImages.bubble, bubble.x, bubble.y, bubble.width, bubble.height)
  })
}

const deleteBubble = ()=>{
  bubblesArray = bubblesArray.filter((bubble)=>{
    // console.log('DELETE', bubble.eaten)
    return !bubble.eaten
  })
}
//----------------------- PINTANDO Y ACTUALIZANDO BUBBLES -----------------



//----------------------- FISH MOVEMENTS ---------------------------
document.addEventListener('keydown', (event)=>{
  if(event.key === "ArrowRight"){
    fish.speedX = 5
    fish.direction = 'right'
  } else if(event.key === "ArrowLeft"){
    fish.speedX = -5
    fish.direction = 'left'
  } else if(event.key === "ArrowUp"){
    fish.speedY = -5
  } else if(event.key === "ArrowDown"){
    fish.speedY = 5
  }
})

document.addEventListener('keyup', (event)=>{
  if(event.key === "ArrowRight" || event.key === "ArrowLeft"){
    fish.speedX = 0
  }
  if(event.key === "ArrowUp" || event.key === "ArrowDown"){
    fish.speedY = 0
  }
})
//----------------------- FISH MOVEMENTS ---------------------------




//----------------------- PINTANDO PECES ---------------------------
const drawRightFish = ()=>{
  ctx.drawImage(loadedImages.fish_right, fish.x, fish.y, fish.width, fish.height)
}

const drawLeftFish = ()=>{
  ctx.drawImage(loadedImages.fish_left, fish.x, fish.y, fish.width, fish.height)
}
//----------------------- PINTANDO PECES ---------------------------


//----------------------- ESTABLECIENDO LÍMITES DE JUEGO ---------------------------
const checkIfInBounds = ()=>{
  if(fish.x > 900){
    fish.x = 900
  }

  if(fish.x < 0){
    fish.x = 0
  }

  if(fish.y < 0){
    fish.y = 0
  }

  if(fish.y > 500){
    fish.y = 500
  }
}

const updateFish = ()=>{
  fish.x += fish.speedX
  fish.y += fish.speedY
  checkIfInBounds()
}
//----------------------- ESTABLECIENDO LÍMITES DE JUEGO ---------------------------


const clearCanvas = ()=>{
  ctx.clearRect(0, 0, 1100, 700)
}


// ------------------------------ TIME -----------------------------------------
let time = 30
const interval = setInterval(() => {
  if(time > 0){
    time --;
  }else{
    clearInterval(interval);
    window.location.href = `./polluted.html?score=${score}`
  }
}, 1000)

const drawtime = (number) => {
  ctx.font = "25px Montserrat";
  ctx.fillStyle = "#960000"
  ctx.fillText(`Remaining life time :${number}`, 25, 40)
}
// ------------------------------ TIME -----------------------------------------



// ------------------------------ CANVAS SCORE -----------------------------------------
const drawscore = (number) =>{
  ctx.font = "25 arial"
  ctx.fillStyle = "#000096"
  ctx.fillText(`Eaten bubbles:${number}`, 25, 70)
}
// ------------------------------ CANVAS SCORE -----------------------------------------





//------------------- FUNCIÓN BACKGROUND MICROPLÁSTICOS -------------------
function animate () {
  requestAnimationFrame(animate);
  
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  
}
animate()
inint()
//------------------- FUNCIÓN BACKGROUND MICROPLÁSTICOS -------------------



//------------------- FUNCIÓN BACKGROUND ARENA -------------------
const drawSand = ()=>{
  ctx.drawImage(loadedImages.sorra,  0, 210, canvas.width, 400)
}
//------------------- FUNCIÓN BACKGROUND ARENA -------------------




//------------------ RUNNING GAME ------------------ RUNNING GAME -------------------- RUNNING GAME -------------
const updateCanvas = ()=>{ 
  if(imageLinks.length === counterForLoadedImages){
    clearCanvas()

    updateFish()
    updateBubbles()

    deleteBubble()
    checkForEatenBubbles()

    if (fish.direction == "left") {
      drawLeftFish();
    } else {
      drawRightFish();
    }
    
    drawBubbles()
    drawSand()

    drawtime(time)
    drawscore(score)
  }
  requestAnimationFrame(updateCanvas)
  for (let i = 0; i < microplasticosArray.length; i++) {
    microplasticosArray[i].update()
  }
}
updateCanvas()
