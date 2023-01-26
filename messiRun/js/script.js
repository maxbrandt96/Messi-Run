const canvas = document.getElementById("juego")

const ctx = canvas.getContext("2d")
console.log(ctx)

canvas.width = 800
canvas.height = 460

const balls = []

const enemies = []

const gravity = 0.5

const ballImg = new Image()
ballImg.src = "/assets/ball.png"

const mbappe = new Image()
mbappe.src = "/assets/cr7pixl.png"

const messiImg = new Image()
messiImg.src = "/assets/Icon.png"

const huntelaarImg = new Image()
huntelaarImg.src = "/assets/hunt1.png"

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
    console.log("shoot")
    const ball = new Ball(this.position.x + this.w, this.position.y + (this.h / 1.5))
    balls.push(ball)
    console.log(balls)
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
console.log(player)

document.addEventListener("keydown", (event) => {
    // console.log(evento.key)
    switch (event.key) {
        case "ArrowRight":
            keys.right.pressed = true
            break;

        case "ArrowLeft":
            keys.left.pressed = true
            break;

        case "ArrowUp":
            player.velocity.y -=10
            break;

        case "ArrowDown":
            break;

        case " ":
            player.shoot()
            break
    }
    console.log(keys.right.pressed)
    console.log(keys.left.pressed)
})
document.addEventListener("keyup", (event) => {
    // console.log(evento.key)
    switch (event.key) {
        case "ArrowRight":
            keys.right.pressed = false
            break;
        case "ArrowLeft":
           keys.left.pressed = false
            break;
        case "ArrowUp":
            console.log("up")
            
            break;
        case "ArrowDown":
            
            break;
        case " ":
            
            break
    }
    console.log(keys.right.pressed)
    console.log(keys.left.pressed)

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
        this.x -= 2
    }
}



ctx.fillStyle = "white"
let time = 0
    function startGame(){
    setInterval(() => {
        console.log("playing")
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
                if (enemy.x <= ball.x + 10 && ball.y + 20 >= enemy.y && ball.x <= enemy.x && ball.y <= enemy.y + 90){
                enemies.splice(indexEnemy, 1)
                balls.splice(indexBall, 1)
                player.elims++
                }
            })
            
        })
        enemies.forEach((enemy, indexEnemy) => {
            enemy.draw()
            if (enemy.x <= player.position.x + 10 && player.position.y + 50 >= enemy.y && player.position.x <= enemy.x && player.position.y <= enemy.y + 80){
                enemies.splice(indexEnemy, 1)
                player.lives--
            }

        })
        
        ctx.fillText(`${player.elims} Eliminations`, 150, 150)

        mostrarVidas()

    }, 1000 / 60)
    
}

let btn = document.getElementById("play")

btn.addEventListener("click", () => {
    startGame()

    btn.classList.add("none")
})

setInterval(() => {
    const a= new Enemy(800,375,90,100)
    a.img = mbappe
    enemies.push(a)
    
}, 3500)

setInterval(() => {
   
    const huntelaar = new Enemy(800, 275,200,150)
    huntelaar.img = huntelaarImg
    huntelaar.x -= 100
    enemies.push(huntelaar)

}, 1000)

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