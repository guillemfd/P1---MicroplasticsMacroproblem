const canvas = document.getElementById('main')
const ctx = canvas.getContext('2d')
canvas.width = 800;
canvas.height = 500;

let score = 100;



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
    this.y = 600; 
    this.width = 50;
    this.height = 50;
    this.speed = Math.random() * 5;  //no funciona velocidad random
  }

  drawBubble(){
    ctx.drawImage(loadedImages.bubble, this.x, this.y, this.width, this.height)
  }

  checkForEatenBubbles(){

   const bothInX = (this.x - 50) < fish.x && this.x > fish.x
   const bothInY = (this.y - 50) < fish.y && this.y > fish.y
  
    if( bothInX && bothInY ){ 
      console.log('colision') //////////////////////////
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
    bubble.checkForEatenBubblee()
  })
}

const drawBubbles = ()=>{
  bubblesArray.forEach((bubble)=>{
    ctx.drawImage(loadedImages.bubble, bubble.x, bubble.y, bubble.width, bubble.height)
  })
}

const deleteBubble = ()=>{
  bubblesArray = bubblesArray.filter((bubble)=>{
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
  if(fish.x > 700){
    fish.x = 700
  }

  if(fish.x < 0){
    fish.x = 0
  }

  if(fish.y < 0){
    fish.y = 0
  }

  if(fish.y > 400){
    fish.y = 400
  }
}

const updateFish = ()=>{
  fish.x += fish.speedX
  fish.y += fish.speedY
  checkIfInBounds()
}

const clearCanvas = ()=>{
  ctx.clearRect(0, 0, 900, 600)
}

// --------------------- WORK IN PROGREES AREA -----------------------

// const updateBubbles = ()=>{
//   deleteBubble()
//   checkForEatenBubbles()
// }
// --------------------- WORK IN PROGREES AREA -----------------------


//RUNNING GAME
const updateCanvas = ()=>{ 
  if(imageLinks.length === counterForLoadedImages){
    clearCanvas()

    updateFish()
    updateBubbles()

    drawFish()
    drawBubbles()
  }
  requestAnimationFrame(updateCanvas) //Activa un loop infinito. Este loop va a la velocidad de la tasa de refresco de la pantalla en la que se está viendo el juego. Le vamos a pasar como argumento la función donde estamos llamando al requestAnimationFrame (en este caso, updateCanvas)
}

updateCanvas()