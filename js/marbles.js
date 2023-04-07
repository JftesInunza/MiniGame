'use strict'


const MARBLES_SPRITES = document.getElementById('marbles')
const NO_MARBLES = -1
const MARBLES_SWIDTH = 64
const MARBLES_SHEIGHT = 64


class Marbles {
    constructor(mtype) {
        this.mtype = mtype
        this.x = 0
        this.y = 0
        this.width = 64
        this.height = 64
        this.sx = mtype * MARBLES_SWIDTH
        this.sy = 0
    }

    isEmpty() {
        return this.mtype === NO_MARBLES
    }

    setEmpty() {
        this.mtype = NO_MARBLES
    }

    setType(mtype) {
        this.mtype = mtype
        this.sx = mtype * MARBLES_SWIDTH
    }

    setSize(width, height) {
        this.width = width
        this.height = height
    }

    equals(other) {
        return this.mtype === other.mtype
    }

    update() {

    }

    draw(ctx) {
        if (this.isEmpty()) {
            return
        }

        ctx.drawImage(
            MARBLES_SPRITES,
            this.sx,
            this.sy,
            MARBLES_SWIDTH,
            MARBLES_SHEIGHT,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}