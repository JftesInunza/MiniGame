'use strict'

// cloud color: #1359a9
const RAD = 1 / (2 * Math.PI)

function cloud_small(index) {
    return {
        x: index * 175,
        y: 0,
        width: 175,
        height: 40,
        speedX: 0.8,
        speedY: 0.1,
    }
}

function cloud_medium(index) {
    return {
        x: index * 260,
        y: 0,
        width: 260,
        height: 80,
        speedX: 0.35,
        speedY: 0.05,
    }
}

function cloud_large(index) {
    return {
        x: index * 315,
        y: 0,
        width: 315,
        height: 90,
        speedX: 0.15,
        speedY: 0.025,
    }
}

class Cloud {
    constructor({ x, y, width, height, speedX, speedY }, posY, sprite) {
        this.spriteX = x
        this.spriteY = y
        this.width = width
        this.height = height
        this.time = 0
        this.x = Math.round(Math.random() * window.innerWidth)
        this.y = 0
        this.posY = posY
        this.sprite = sprite
        const speeds = [-1, 1]
        this.speedX = speedX * speeds[Math.round(Math.random())]
        this.speedY = speedY * RAD
    }

    move() {
        this.x += this.speedX
        this.y = this.posY + 10 * Math.sin(this.time * this.speedY)
        this.time++
        if (this.x > window.innerWidth + this.width) {
            this.x = -this.width
        }
        if (this.x < -1 * this.width) {
            this.x = window.innerWidth + this.width
        }
    }

    draw(ctx) {
        ctx.drawImage(
            this.sprite,
            this.spriteX,
            this.spriteY,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}

class Background {
    constructor() {
        this.sky = document.getElementById('sky-bg')
        this.small_clouds = document.getElementById('small-clouds')
        this.medium_clouds = document.getElementById('medium-clouds')
        this.large_clouds = document.getElementById('large-clouds')
        this.initClouds()
    }

    initClouds() {
        this.clouds = []
        for (let i = 0; i < 5; i++) {
            let posY = 90 + i * ((window.innerHeight) * 2 / 3) / 5
            this.clouds.push(new Cloud(cloud_large(i), posY, this.large_clouds))
        }
        for (let i = 0; i < 7; i++) {
            let posY = (window.innerHeight - 100) / 3 + i * ((window.innerHeight - 100) * 2 / 3) / 7
            this.clouds.push(new Cloud(cloud_medium(i), posY, this.medium_clouds))
        }
        for (let i = 0; i < 8; i++) {
            let posY = 40 + i * (window.innerHeight - 80) / 8
            this.clouds.push(new Cloud(cloud_small(i), posY, this.small_clouds))
        }
    }

    update() {
        this.clouds.forEach((cloud) => {
            cloud.move()
        })
    }

    render(ctx) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        ctx.drawImage(this.sky, 0, 0, window.innerWidth, window.innerHeight)
        this.clouds.forEach((cloud) => {
            cloud.draw(ctx)
        })
    }
}