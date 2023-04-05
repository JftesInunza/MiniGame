'use strict'

const STATE_MENU = 'menu'
const STATE_GAME = 'game'
const STATE_VICTORY = 'victory'
const NO_SELECTION = -1
const NO_MARBLES = -1
const TOP_FORWARD = 1
const TOP_BACKWARD = -1
const BOX = {
    margin: 5,
    sWidth: 64,         // Sprite Width
    sHeight: 64,        // Sprite Height
    width: 64,          // pixel width
    height: 64,         // pixel height
}

class Model {
    constructor() {
        this.listeners = {
            state: [],
            resize: [],
        }
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
        this.notify('resize')
    }

    forStack(callback) {
        for (let i = 0; i < this.stacks.length; i++) {
            callback(this.stacks[i], i)
        }
    }

    initTopIndices() {
        return this.stacks.map(stack => {
            for (let i = 0; i < stack.length; i++) {
                if (stack[i] != NO_MARBLES) {
                    return i
                }
            }
            return stack.length
        })
    }

    stackRect(id) {
        return this.rects[id]
    }

    compareTypes(s1, s2) {
        return this.topMarbles(s1) == this.topMarbles(s2)
    }

    topMarbles(stack_id) {
        return this.stacks[stack_id][this.topIndices[stack_id]]
    }

    setTopEmpty(stack_id) {
        this.stacks[stack_id][this.topIndices[stack_id]] = NO_MARBLES
        this.topIndices[stack_id] += TOP_FORWARD
    }

    setTopBackward(stack_id, mtype) {
        this.topIndices[stack_id] += TOP_BACKWARD
        this.stacks[stack_id][this.topIndices[stack_id]] = mtype
    }

    setState(state) {
        this.state = state
        this.notify('state')
    }

    setRects(rects) {
        this.rects = rects
    }

    moveMarbles(from, to) {
        const mtype = this.topMarbles(from)
        this.setTopEmpty(from)
        this.setTopBackward(to, mtype)
    }

    isGameCompleted() {
        return this.stacks.every((stack, id) => {
            return this.isStackEmpty(id)
        })
    }

    isStackCompleted(stack_id) {
        const stack = this.stacks[stack_id]
        return stack.every(mtype => {
            return mtype == stack[0]
        })
    }

    isStackFull(stack_id) {
        return this.topIndices[stack_id] == 0
    }

    isStackEmpty(stack_id) {
        return this.topIndices[stack_id] == this.stackLength
    }

    removeStack(stack_id) {
        this.stacks.splice(stack_id, 1)
        this.topIndices.splice(stack_id, 1)
        this.numberStacks--
        this.notify('resize')
    }
}