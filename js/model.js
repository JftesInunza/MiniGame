'use strict'

const NO_SELECTION = -1
const STACK_EMPTY = -1
const STACK_FULL = 0
const TOP_FORWARD = 1
const TOP_BACKWARD = -1
const SCORE_BASE = 100
const BOX = {
    margin: 5,
    sWidth: 88,         // Sprite Width
    sHeight: 82,        // Sprite Height
    width: 65,          // pixel widt h
    height: 62,         // pixel height
}

class Model {
    constructor() {
        this.listeners = { init: [] }
        this.stackLength = 5
        this.stackTypes = 12
        this.init()
        window.addEventListener('resize', () => { this.calcSizes() })
    }

    addEventListener(event, callback) {
        this.listeners[event].push(callback)
    }

    notify(event) {
        this.listeners[event].forEach(callback => {
            callback()
        });
    }

    init() {
        this.stacks = ExtremeModeStacks()
        this.topIndices = this.initTopIndices()
        this.stackSelected = NO_SELECTION
        this.score = 0
        this.calcSizes()
        this.notify('init')
    }

    calcSizes() {
        this.stackLength = this.stacks[0].length
        this.stackTypes = this.stacks.length
        this.size = {
            width: (this.stackTypes) * BOX.width + 2 * (this.stackTypes - 1) * BOX.margin,
            height: (BOX.height + 2 * BOX.margin) * this.stackLength,
        }
        this.margin = {
            top: (window.innerHeight - this.size.height) / 2,
            left: (window.innerWidth - this.size.width) / 2,
        }
    }

    forStack(callback) {
        for (let i = 0; i < this.stacks.length; i++) {
            callback(this.stacks[i], i)
        }
    }

    initTopIndices() {
        return this.stacks.map(stack => {
            for (let i = 0; i < stack.length; i++) {
                if (stack[i] != STACK_EMPTY) {
                    return i
                }
            }
            return stack.length
        })
    }

    stackRect(id) {
        return {
            x: this.margin.left + id * (BOX.width + 2 * BOX.margin),
            y: this.margin.top,
            width: BOX.width,
            height: (BOX.height + 2 * BOX.margin) * this.stacks[id].length
        }
    }

    compareTypes(s1, s2) {
        return this.topMarbles(s1) == this.topMarbles(s2)
    }

    isStackFull(stack_id) {
        return this.topIndices[stack_id] == STACK_FULL
    }

    isStackEmpty(stack_id) {
        return this.topIndices[stack_id] == this.stackLength
    }

    topMarbles(stack_id) {
        return this.stacks[stack_id][this.topIndices[stack_id]]
    }

    setTopEmpty(stack_id) {
        this.stacks[stack_id][this.topIndices[stack_id]] = STACK_EMPTY
        this.topIndices[stack_id] += TOP_FORWARD
    }

    setTopBackward(stack_id, mtype) {
        this.topIndices[stack_id] += TOP_BACKWARD
        this.stacks[stack_id][this.topIndices[stack_id]] = mtype
    }

    moveMarbles(from, to) {
        const mtype = this.topMarbles(from)
        this.setTopEmpty(from)
        this.setTopBackward(to, mtype)
    }

    isStackCompleted(stack_id) {
        const stack = this.stacks[stack_id]
        return stack.every(mtype => {
            return mtype == stack[0]
        })
    }

    sumScore() {
        this.score += SCORE_BASE
    }

    removeStack(stack_id) {
        this.stacks.splice(stack_id, 1)
        this.topIndices.splice(stack_id, 1)
        this.calcSizes()
    }
}