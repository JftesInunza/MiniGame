'use strict'

const MEMORY_FORWARD = 1
const MEMORY_BACKWARD = -1


class Memory {
    constructor() {
        this.clean()
    }

    clean() {
        this.movements = new Array(20)
        this.memIndex = -1
        this.movementCounter = 0
    }

    addMovement(from, to) {
        const movement = {
            from: from,
            to: to,
        }
        if (this.memIndex == this.movements.length - 1) {
            this.memIndex = -1
        }

        this.movements[++this.memIndex] = movement
        this.movementCounter++

        if (this.movementCounter > this.movements.length) {
            this.movementCounter = this.movements.length
        }
    }

    lastMovement() {
        const lm = this.movements[this.memIndex--]
        this.movementCounter--
        if (this.memIndex < 0) {
            this.memIndex = this.movements.length - 1
        }
        return lm
    }

    hasMovement() {
        return this.movementCounter > 0
    }
}