'use strict'

const STATE_MENU = 'menu'
const STATE_GAME = 'game'
const STATE_VICTORY = 'victory'
const NO_SELECTION = -1
const STACK_EMPTY = -1
const STACK_FULL = 0
const TOP_FORWARD = 1
const TOP_BACKWARD = -1
const BOX = {
    margin: 5,
    sWidth: 88,         // Sprite Width
    sHeight: 82,        // Sprite Height
    width: 65,          // pixel widt h
    height: 62,         // pixel height
}

class Model {
    constructor() {
        this.listeners = { viewState: [] }
    }

    setViewState(state) {
        this.viewState = state
        this.notify('viewState')
    }

    addEventListener(event, callback) {
        this.listeners[event].push(callback)
    }

    notify(event) {
        this.listeners[event].forEach(callback => {
            callback()
        });
    }

    init(mode) {
        const generator = GenerateStacks(mode)
        this.stacks = generator.stacks
        this.numberStacks = generator.numberStacks
        this.stackLength = generator.stackLength
        this.topIndices = this.initTopIndices()
        this.stackSelected = NO_SELECTION
        this.calcRects()
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

    calcSizes() {
        this.size = {
            width: this.numberStacks * BOX.width + 2 * (this.numberStacks - 1) * BOX.margin,
            height: (BOX.height + 2 * BOX.margin) * this.stackLength,
        }
        this.margin = {
            left: (window.innerWidth - this.size.width) / 2,
            top: (window.innerHeight - this.size.height) / 2,
        }
    }

    calcRects() {
        this.calcSizes()
        this.rects = this.stacks.map((stack, id) => {
            return {
                x: this.margin.left + id * (BOX.width + 2 * BOX.margin),
                y: this.margin.top,
                width: BOX.width,
                height: (BOX.height + 2 * BOX.margin) * stack.length,
            }
        })
    }

    stackRect(id) {
        return this.rects[id]
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

    removeStack(stack_id) {
        this.stacks.splice(stack_id, 1)
        this.topIndices.splice(stack_id, 1)
        this.numberStacks--
        this.calcRects()
    }
}