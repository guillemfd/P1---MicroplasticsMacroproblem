const canvas = document.getElementById('main')
const ctx = canvas.getContext('2d')
canvas.width = 1000;
canvas.height = 600;



const loadedImages = {}

const imageLinks = [ //Array de objetos con los enlaces (y los nombres para identificarlos) de todas mis imagenes
  {link: "./img/peix_transp_dreta.png", name: 'fish_right'},
  {link: "./img/bubble.png", name: 'bubble'},
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


// const pumpkinButton = document.getElementById('pumpkin')
// const zenitsuButton = document.getElementById('zenitsu')

// pumpkin.onclick = ()=>{
//   ctx.drawImage(loadedImages.pumpkin, 200, 100, 100, 130)
// }

// zenitsu.onclick = ()=>{
//   ctx.drawImage(loadedImages.zenitsu, 100, 50, 100, 130)
// }





// -------------------------------- MICROPLÁSTICOS ------------------------------

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

// -------------------------------- MICROPLÁSTICOS ------------------------------





//CLASSES
class Fish {
  constructor(){
    this.x = (canvas.width/2) -50;
    this.y = (canvas.height/2) -50;
    this.speedX = 0;
    this.speedY = 0;
    this.width = 100;
    this.height = 100;
  }
}

const fish = new Fish()



//BUBBLES

class Bubble {
  constructor(){
    this.eaten = false;
    this.x = Math.random() * canvas.width;
    this.y = 700; 
    this.width = 90;
    this.height = 80;
    this.speed = Math.floor(Math.random() * 5 +1);  //no funciona velocidad random
  }

  drawBubble(){
    ctx.drawImage(loadedImages.bubble, this.x, this.y, this.width, this.height)
  }


  //---------------------------------------- COLISIÓN OPCIÓN JJ ------------
  checkForEatenBubbles(){
    console.log('kkk')
   const bothInX = (this.x - 90) < fish.x && this.x +30 > fish.x
   const bothInY = (this.y - 70) < fish.y && this.y > fish.y
  
    if( bothInX && bothInY ){ 
      console.log('colision') //////////////////////////------------------------
      // appleSound.play()
      this.eaten = true
      score++;
      document.getElementById('score').innerText = score
    }
  }
}



let bubblesArray = []

const createBubbles = setInterval(()=>{
  bubblesArray.push(new Bubble())
}, 2000)


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



// --------------------- WORK IN PROGREES AREA -----------------------

//EVENT LISTENERS

// let appleSound = ''

// window.addEventListener('load', ()=>{
//   appleSound = new Audio('./sounds/apple-bite.mp3')
//   appleSound.preload = 'auto'
//   appleSound.load()
// })
// 

// let arrayOfApples = []

// const createApples = ()=>{
//   for(let i = 0; i < 5; i++){
//     const apple = new Apple()
//     arrayOfApples.push(apple)
//   }
// }

// createApples()---------------------------------------------------------------------------------------------------------------





//FISH MOVEMENTS
document.addEventListener('keydown', (event)=>{
  if(event.key === "ArrowRight"){
    fish.speedX = 5
  } else if(event.key === "ArrowLeft"){
    fish.speedX = -5
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

//FUNCTIONS
const drawFish = ()=>{
  ctx.drawImage(loadedImages.fish_right, fish.x, fish.y, fish.width, fish.height)
}

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

const clearCanvas = ()=>{
  ctx.clearRect(0, 0, 1100, 700)
}

// --------------------- WORK IN PROGREES AREA -----------------------

// const updateBubbles = ()=>{
//   deleteBubble()
//   checkForEatenBubbles()
// }
// --------------------- WORK IN PROGREES AREA -----------------------



  // ------------------------------ TIME -----------------------------------------
  let time = 3000
  const interval = setInterval(() => {
    if(time > 0){
      time --;
    }else{
      clearInterval(interval);
      //alert(`You have been polluted! \nYou catch ${score} bubbles`)
      window.location.href = `../html/polluted.html?score=${score}`
    }
  }, 1000)

  const drawtime = (number) =>{
    ctx.font = "25px arial"; 
    ctx.fillStyle = "blue"
    ctx.fillText(`Remaining life time :${number}`, 25, 30)
  }
  // ------------------------------ TIME -----------------------------------------



  // ------------------------------ Score -----------------------------------------
  let score = 0
  const drawscore = (number) =>{
    ctx.font = "25 arial"
    ctx.fillStyle = "blue"
    ctx.fillText(`Eaten bubbles:${number}`, 350, 30)
  }
  // ------------------------------ Score -----------------------------------------





//BACKGROUND 
function animate () {
  requestAnimationFrame(animate);
  
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  
}
animate()
inint()


//RUNNING GAME
const updateCanvas = ()=>{ 
  if(imageLinks.length === counterForLoadedImages){
    clearCanvas()

    updateFish()
    updateBubbles()

    deleteBubble()
    checkForEatenBubbles()



    drawFish()
    drawBubbles()

    drawtime(time)
    drawscore(score)
  }
  requestAnimationFrame(updateCanvas) //Activa un loop infinito. Este loop va a la velocidad de la tasa de refresco de la pantalla en la que se está viendo el juego. Le vamos a pasar como argumento la función donde estamos llamando al requestAnimationFrame (en este caso, updateCanvas)
  for (let i = 0; i < microplasticosArray.length; i++) {
    microplasticosArray[i].update()
  }
}
updateCanvas()