'use strict'

const STATE_MENU = 'menu'
const STATE_GAME = 'game'
const STATE_VICTORY = 'victory'
const NO_SELECTION = -1
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
                if (!stack[i].isEmpty()) {
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
        let result = this.topMarbles(s1).equals(this.topMarbles(s2))
        console.log(result)
        return result
    }

    topMarbles(stackID) {
        return this.stacks[stackID][this.topIndices[stackID]]
    }

    setTopEmpty(stackID) {
        this.topMarbles(stackID).setEmpty()
        this.topIndices[stackID] += TOP_FORWARD
    }

    setTopBackward(stackID, mtype) {
        this.topIndices[stackID] += TOP_BACKWARD
        this.topMarbles(stackID).setType(mtype)
    }

    setState(state) {
        this.state = state
        this.notify('state')
    }

    unselectStack() {
        this.stackSelected = NO_SELECTION
    }

    moveMarbles(from, to) {
        const aux = this.topMarbles(from).mtype
        this.setTopEmpty(from)
        this.setTopBackward(to, aux)
        console.log(aux)
        console.log(this.stacks, this.topIndices)
    }

    isGameCompleted() {
        return this.stacks.every((stack, id) => {
            return this.isStackEmpty(id)
        })
    }

    isStackCompleted(stack_id) {
        const stack = this.stacks[stack_id]
        const topMarbles = stack[0]
        return stack.every(marbles => {
            return marbles.equals(topMarbles)
        })
    }

    isStackFull(stackID) {
        return this.topIndices[stackID] == 0
    }

    isStackEmpty(stackID) {
        return this.topIndices[stackID] == this.stackLength
    }

    isStackSelected() {
        return this.stackSelected !== NO_SELECTION
    }

    removeStack(stack_id) {
        this.stacks.splice(stack_id, 1)
        this.topIndices.splice(stack_id, 1)
        this.numberStacks--
        this.notify('resize')
    }
}