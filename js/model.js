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
        this.stacks = GenerateStacks(mode)
        this.stackSelected = NO_SELECTION
        this.notify('resize')
    }

    forStack(callback) {
        for (let i = 0; i < this.stacks.length; i++) {
            callback(this.stacks[i], i)
        }
    }

    moveMarbles(from, to) {
        const mtype = this.stacks[from].topMarbleType()
        this.stacks[from].setTopEmpty()
        this.stacks[to].setTopMarbleType(mtype)
    }

    removeStack(index) {
        this.stacks.splice(index, 1)
        this.numberStacks--
        this.notify('resize')
    }

    /* Getters */

    NumberOfMarblesPerStack() {
        return this.stacks[0].length
    }

    NumberOfStacks() {
        return this.stacks.length
    }

    /* Booleans */

    isGameCompleted() {
        return this.stacks.every((stack) => {
            return stack.isEmpty()
        })
    }

    isStackCompleted(index) {
        return this.stacks[index].isCompleted()
    }

    isStackFull(index) {
        return this.stacks[index].isFull()
    }

    isStackEmpty(index) {
        return this.stacks[index].isEmpty()
    }

    isStackSelected() {
        return this.stackSelected !== NO_SELECTION
    }

    compareTopMarbleStacks(s1, s2) {
        return this.stacks[s1].equalsTopMarble(this.stacks[s2])
    }

    /* Setters */

    setRects(rects) {
        this.stacks.forEach((stack, i) => {
            stack.setRect(rects[i])
        })
    }

    setState(state) {
        this.state = state
        this.notify('state')
    }

    setSelection(stackID) {
        this.stackSelected = stackID
    }

    deselectStack() {
        this.stackSelected = NO_SELECTION
    }
}