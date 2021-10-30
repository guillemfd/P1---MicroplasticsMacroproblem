//CANVAS SETUP
const canvas = document.getElementById('main')
const ctx = canvas.getContext('2d')

canvas.width = 800;
canvas.height = 500;
ctx.font = '50px Raleway';


const loadedImages = {}

const imageLinks = [ //Array de objetos con los enlaces (y los nombres para identificarlos) de todas mis imagenes
  {link: "./img/peix_transp_dreta.png", name: 'fish_right'},
]

let counterForLoadedImages = 0; //Contador de imagenes cargadas

imageLinks.forEach((imagen)=>{ //Itero sobre todos los enlaces dentro del array de imageLinks. Cada enlace lo voy a recibir dentro del loop en el parámetro de url
  const img = new Image() //Creo un objeto de una imagen (paso 1 para crear una imagen en canvas)
  img.src = imagen.link //Le asigno el url (paso 2 para crear una imagen en canvas)
  img.onload = ()=>{ //Ejecuto el callback function cuando la imagen haya cargado (paso 3)
    counterForLoadedImages++ //Le sumo uno a el contador de imagenes cargadas. Esta linea solo se va a ejecutar cuando la imagen haya cargado
    // loadedImages[imageLinks.name] = imagen.url
    loadedImages[imagen.name] = img
    if(imageLinks.length === counterForLoadedImages){ //reviso si el contador es igual a el numero de urls que tengo en el array de imageLinks. Si es igual, significa que todas mis imagenes han cargado, y por lo tanto, veré el console.log() de que todas mis imagenes han cargado
    }
  }
})



// PLAYER'S MOVEMENT
class Fish {
    constructor(){
      this.x = canvas.width/2;
      this.y = canvas.height/2;
      this.speedX = 0;
      this.speedY = 0;
      this.width = 100;
      this.height = 130;
    }
  }
  
  const fish = new Fish()

  document.addEventListener('keydown', (event)=>{
    if(event.key === "ArrowRight"){
        fish.speedX = 3
    } else if(event.key === "ArrowLeft"){
        fish.speedX = -3
    } else if(event.key === "ArrowUp"){
        fish.speedY = -3
    } else if(event.key === "ArrowDown"){
        fish.speedY = 3
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
    ctx.drawImage(loadedImages.fish_right, fish_right.x, fish_right.y, fish_right.width, fish_right.height)
  }

const updateFish = ()=>{
  fish.x += fish.speedX
  fish.y += fish.speedY
  // checkIfInBounds()
}


  const updateCanvas = ()=>{ 
    if(imageLinks.length === counterForLoadedImages){
    //   clearCanvas()
  
      updateFish()
    //   updateApples()
  
    //   drawApples()
      drawFish()
    }
    requestAnimationFrame(updateCanvas) //Activa un loop infinito. 
  }