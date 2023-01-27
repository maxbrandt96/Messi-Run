const canvas = document.getElementById("juego")

const ctx = canvas.getContext("2d")


const menu = document.querySelector(".botones")
const gameOver = document.querySelector(".gameOver")
canvas.width = 800
canvas.height = 460

const balls = []

const enemies = []

const gravity = 0.5

const cups = []

const ballImg = new Image()
ballImg.src = "/assets/img/ball.png"

const mbappe = new Image()
mbappe.src = "/assets/img/cr7pixl.png"

const messiImg = new Image()
messiImg.src = "/assets/img/Icon.png"

const huntelaarImg = new Image()
huntelaarImg.src = "/assets/img/huntelaar4.png"

const worldCupImg = new Image()
worldCupImg.src = "/assets/img/worldcup.png"

const shoot = new Audio("/assets/audio/kick1.wav")
const bobo = new Audio("/assets/audio/AndaPaLla.mp3")
const sui = new Audio("/assets/audio/SUIII.mp3")
const uefa = new Audio("/assets/audio/champions.mp3")
uefa.volume = 0.1

class Player {
    constructor(){
        this.position = {
            x: 0,
            y:0
        }
        this.velocity = {
            x:0,
            y:0
        }
        this.w = 50,
        this.h = 80,
        this.img = messiImg
        this.elims = 0
        this.lives = 3
        this.worldCups = 0
        }


draw(){
    ctx.drawImage(this.img, this.position.x, this.position.y,  this.w, this.h)
}

update(){
    this.draw()
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x
   
    if(this.position.y + this.h + 
        this.velocity.y <= 460)
        this.velocity.y += gravity
        else this.velocity.y = 0
    
  
}

shoot() {
    const ball = new Ball(this.position.x + this.w, this.position.y + (this.h / 1.5))
    balls.push(ball)
    shoot.play()
}


}



const player = new Player()
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }

}


document.addEventListener("keydown", (event) => {
   
    switch (event.key) {
        case "ArrowRight":
            keys.right.pressed = true
            break;

        case "ArrowLeft":
            keys.left.pressed = true
            break;

        case "ArrowUp":
            if (player.position.y >=360){
            player.velocity.y -=11}
            else if (player.position.y < 360){
                player.velocity.y = 0
            }
            break;

        case "ArrowDown":
            break;

        case " ":
            player.shoot()
            break
    }
   
})
document.addEventListener("keyup", (event) => {
    
    switch (event.key) {
        case "ArrowRight":
            keys.right.pressed = false
            break;
        case "ArrowLeft":
           keys.left.pressed = false
            break;
        case "ArrowUp":
          
            
            break;
        case "ArrowDown":
            
            break;
        case " ":
            
            break
    }
   

})


class Ball {
    constructor(x,y,) {
        this.x = x;
        this.y = y;
        this.img = ballImg
    }

    draw(){
        ctx.drawImage(this.img, this.x, this.y, 20, 20)
        this.x += 5
        if(this.x > 800){
            balls.shift()
        }
    }

    
}

class Enemy {
    constructor(x,y,w,h,img,){
        this.x = x
        this.y = y
        this.w = w  
        this.h = h
        this.img = img
        
    }

    draw(){
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
        this.x -= 7
    }
}

class WordlCup{
    constructor(x,){
        this.x = x
        this.y = 0
        this.img = worldCupImg
    }

    draw(){
        this.y++
        ctx.drawImage(worldCupImg, this.x, this.y, 70, 70)
    }
}


ctx.fillStyle = "white"
let time = 0
    function startGame(){
    setInterval(() => {
    
       ctx.clearRect(0, 0, 800, 460)
        player.update()

        if (player.position.x < 760 && keys.right.pressed) {
            player.velocity.x = 5}
            else if (player.position.x > 0 && keys.left.pressed) {
                player.velocity.x = -5
            }
            else player.velocity.x = 0
        
        balls.forEach((ball,indexBall) => {
           ball.x += 2
            ball.draw()

            enemies.forEach((enemy,indexEnemy) =>{
                if (enemy.x <= ball.x + 10 && ball.y + 20 >= enemy.y && ball.x <= enemy.x && ball.y <= enemy.y + enemy.h){
                enemies.splice(indexEnemy, 1)
                balls.splice(indexBall, 1)
                player.elims++
                }
            })
            
        })
        enemies.forEach((enemy, indexEnemy) => {
            enemy.draw()
            if (enemy.x <= player.position.x + 10 && player.position.y + 90 >= enemy.y && player.position.x <= enemy.x && player.position.y <= enemy.y + 80){
                enemies.splice(indexEnemy, 1)
                player.lives--
                bobo.play()
                if (player.lives <= 0){
                    setGameOver()
                    bobo.pause()
                }
                if (player.lives < 0)
                sui.pause()
                
            }

        })
            
        cups.forEach((cup, indexCup) => {
            cup.draw()
            if(cup.y >= 560){
                
                cups.splice(indexCup, 1)
            }
            if(cup.x <= player.position.x + 10 && player.position.y + 50 >= cup.y && player.position.x <= cup.x && player.position.y <= cup.y + 80){
                player.worldCups++
                cups.splice(indexCup, 1)
            } 
            })
        ctx.fillText(`${player.elims} ELIMINACIONES`, 500, 50, 150)
        ctx.font = "25px Arial Black"
        ctx.fillStyle = "Black"

        mostrarVidas()
        
        ctx.fillText(`${player.worldCups} COPAS `, 100, 50)     
    }, 1000 / 60) 
}
let btn = document.getElementById("play")
btn.addEventListener("click", () => {
    startGame()
    createWorldCup()
    uefa.play()
    btn.style.display = 'none';
})

setInterval(() => {
    const a= new Enemy(800,375,90,100)
    a.img = mbappe
    enemies.push(a)
    
}, 2500)



setInterval(() => {
   
    const huntelaar = new Enemy(800, 285,80,76)
    huntelaar.img = huntelaarImg
    enemies.push(huntelaar)

}, 3000)

function mostrarVidas() {
    if(player.lives ===3){
        ctx.drawImage(messiImg, 680, 20, 30, 50) 
        ctx.drawImage(messiImg, 720, 20, 30, 50)  
        ctx.drawImage(messiImg, 760, 20, 30, 50)  

    }

    if(player.lives === 2){
        ctx.drawImage(messiImg, 720, 20, 30, 50)  
        ctx.drawImage(messiImg, 760, 20, 30, 50)  
        
    }

    if(player.lives ===1){  
        ctx.drawImage(messiImg, 760, 20, 30, 50)  
       
    }
}


function createWorldCup(){
    setInterval(() => {
        const randomPosition = Math.floor(Math.random()*750)
        const cup = new WordlCup(randomPosition)
            cups.push(cup)
    }, 5000)
    
}

function setGameOver(){     
    sui.play()
    canvas.classList.add("none")
    menu.classList.add("none")
    gameOver.classList.remove("none")
    let perdiste = document.getElementById("perdiste")
    perdiste.innerHTML = `RECOLECTASTE ${player.worldCups} COPAS DEL MUNDO`
}
