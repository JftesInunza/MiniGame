'use strict'


class Stack {
    constructor(marbles) {
        this.marbles = marbles
        this.length = marbles.length
        this.rect = {}
        this.initTopIndex()
    }

    draw(ctx) {
        this.marbles.forEach((marble) => {
            marble.draw(ctx, this.rect.mwidth, this.rect.mheight)
        })
    }

    initTopIndex() {
        /* for (let i = 0; i < this.marbles.length; i++) {
            if (!this.marbles[i].isEmpty()) {
                this.topIndex = i
                return
            }
        }
        this.topIndex = this.marbles.length */
        if (this.marbles[0].isEmpty()) {
            this.topIndex = this.marbles.length
        } else {
            this.topIndex = 0
        }
    }

    forEach(callback) {
        this.marbles.forEach((marble, i) => { callback(marble, i) })
    }

    topMarble() {
        return this.marbles[this.topIndex]
    }


    topMarbleType() {
        return this.topMarble().mtype
    }

    setTopEmpty() {
        this.topMarble().setEmpty()
        this.topIndex++
    }

    setTopMarbleType(mtype) {
        this.topIndex--
        this.topMarble().setType(mtype)
    }

    setRect(rect) {
        this.rect = rect
        this.marbles.forEach((marble, i) => {
            marble.x = rect.x
            marble.y = rect.y + i * rect.mheight
        })
    }

    equalsTopMarble(other) {
        return this.topMarble().equals(other.topMarble())
    }

    isCompleted() {
        const first = this.marbles[0]
        return this.marbles.every((marble) => {
            return marble.equals(first)
        })
    }

    isFull() {
        return this.topIndex == 0
    }

    isEmpty() {
        return this.topIndex == this.marbles.length
    }

}