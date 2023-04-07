'use strict'


class Stack {
    constructor(marbles) {
        this.marbles = marbles
        this.length = marbles.length
        this.rect = {}
        this.initTopIndex()
    }

    initTopIndex() {
        for (let i = 0; i < this.marbles.length; i++) {
            if (!this.marbles[i].isEmpty()) {
                this.topIndex = i
                return
            }
        }
        this.topIndex = this.marbles.length
    }

    forEach(callback) {
        this.marbles.forEach((marble, i) => { callback(marble, i) })
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

    equalsTopMarble(other) {
        return this.topMarble().equals(other.topMarble())
    }
}