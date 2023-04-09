'use strict'


const MARBLES_SPRITES = document.getElementById('marbles')
const MARBLES_SWIDTH = 64
const MARBLES_SHEIGHT = 64
const EMPTY_MARBLE = -1


class Marble {
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
        return this.mtype === EMPTY_MARBLE
    }

    setEmpty() {
        this.mtype = EMPTY_MARBLE
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

    draw(ctx, mwidth, mheight) {
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
            mwidth,
            mheight
        )
    }
}

function EmptyMarble() {
    return new Marble(EMPTY_MARBLE)
}