const lienzo = document.getElementById("juego")

const ctx = lienzo.getContext("2d")
console.log(ctx)

const balls = []

const enemies = []

const gravity = 7

class Player {
    constructor(x, y, w, h){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.speed = 20
        }


draw(){
    ctx.fillRect(this.x, this.y += gravity,  this.w, this.h)
   
}

shoot() {
    console.log("shoot")
    const ball = new Ball(this.x + this.w, this.y + (this.h / 2))
    balls.push(ball)
    console.log(balls)
}

right() {
    if (this.x < 950) {
        this.x += this.speed
    }
}

left() {
    if (this.x > 0) {
        this.x -= this.speed
    }
}

jump() {
    if (this.y > 0) {
        this.y -= this.speed
    }
}

down() {
    if (this.y < 540) {
        this.y += this.speed
    }
}
}



const player = new Player(0, 530, 30 , 60)
console.log(player)

document.addEventListener("keydown", (event) => {
    // console.log(evento.key)
    switch (event.key) {
        case "ArrowRight":
            player.right()
            console.log("right")
            break;
        case "ArrowLeft":
            player.left()
            break;
        case "ArrowUp":
            player.jump()
            break;
        case "ArrowDown":
            player.down()
            break;
        case " ":
            player.shoot()
            break
    }
})
class Ball {
    constructor(x,y,) {
        this.x = x;
        this.y = y;

    }

    draw(){
        ctx.fillRect(this.x, this.y, 15, 15)
        this.x += 5
        if(this.x > 1000){
            balls.shift()
        }
    }

    
}

class Enemy {
    constructor(x,y,w,h){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

    draw(){
        ctx.fillRect(this.x, this.y, 15, 15)
        this.x -= 20
    }
}

ctx.fillStyle = "white"

    function startGame(){
    setInterval(() => {
        console.log("playing")
       ctx.clearRect(0, 0, 1000, 600)
        player.draw()
        enemies.forEach((enemy) => {
            enemy.draw()
        })
    

        balls.forEach((ball) => {
            ball.draw()

        })

    }, 1000 / 60)
}

let btn = document.getElementById("play")

btn.addEventListener("click", () => {
    startGame()

    const a = new Enemy(1000,570)
    enemies.push(a)
    btn.classList.add("none")
})
let timer = (Math.random + 1) 
setInterval(() => {
    const random = (min,max) => {
        min = 5
        max = 10
        return Math.floor(Math.random()*(max - min + 1000)) + min}
    const a = new Enemy(1000,570)
    enemies.push(a)
}, );