'use strict'


class GameLogic {
    constructor(model) {
        this.model = model
        this.memory = new Memory()
        this.menu = new GameMenu(model)
        this.connectButtons()
    }

    connectButtons() {
        const menu = document.querySelector('#menu-btn')
        const restart = document.querySelector('#restart-btn')
        const undo = document.querySelector('#undo-btn')

        menu.addEventListener('click', () => { this.onMenu() })
        restart.addEventListener('click', () => { this.onRestart() })
        undo.addEventListener('click', () => { this.onUndo() })
    }

    onMenu() {
        this.model.setState(STATE_MENU)
    }

    onRestart() {
        this.memory.clean()
        this.model.init(this.menu.currentMode)
        this.model.setState(STATE_GAME)
    }

    onUndo() {
        this.undoMovement()
    }

    onClick(mouse) {
        if (this.model.state != STATE_GAME) {
            return
        }

        const x = mouse.clientX
        const y = mouse.clientY
        this.model.forStack((stack, i) => {
            if (this.isStackCliked(x, y, stack.rect)) {
                this.onStackSelected(i)
            }
            return
        })
    }

    isStackCliked(x, y, rect) {
        const inX = rect.x < x && x < (rect.x + rect.width)
        const inY = rect.y < y && y < (rect.y + rect.height)
        return inX && inY
    }

    onStackSelected(stackID) {
        if (!this.model.isStackSelected()) {
            this.model.setSelection(stackID)

        } else if (this.model.stackSelected === stackID) {
            this.model.deselectStack()

        } else {
            this.moveMarbles(this.model.stackSelected, stackID)
            this.model.deselectStack()
            this.onStackCompleted(stackID)
        }
    }

    moveMarbles(from, to) {
        while (this.isValidMovement(from, to)) {
            this.model.moveMarbles(from, to)
            this.memory.addMovement(from, to)
        }
    }

    undoMovement() {
        if (!this.memory.hasMovement()) {
            return
        }
        const lm = this.memory.lastMovement()
        this.model.moveMarbles(lm.to, lm.from)
    }

    isValidMovement(from, to) {
        if (this.model.isStackFull(to)) {
            return false
        }

        if (this.model.isStackEmpty(from)) {
            return false
        }

        if (this.model.isStackEmpty(to)) {
            return true
        }

        return this.model.compareTopMarbleStacks(from, to)
    }

    onStackCompleted(stackID) {
        if (!this.model.isStackFull(stackID)) {
            return
        }
        if (!this.model.isStackCompleted(stackID)) {
            return
        }
        this.memory.clean()
        this.model.removeStack(stackID)

        if (this.model.isGameCompleted()) {
            this.model.setState(STATE_VICTORY)
        }
    }
}