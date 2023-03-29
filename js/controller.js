'use strict'


class Controller {
    constructor(model) {
        this.model = model
        this.memory = new Memory()
        this.menu = new Menu(model)
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
        this.model.setViewState(STATE_MENU)
    }

    onRestart() {
        this.memory.clean()
        this.model.init(this.menu.currentMode)
    }

    onUndo() {
        this.undoMovement()
    }

    onClick(event) {
        if (this.model.viewState != STATE_GAME) {
            return
        }

        const x = event.clientX
        const y = event.clientY
        this.model.forStack((stack, id) => {
            const rect = this.model.stackRect(id)
            if (!this.isStackCliked(x, y, rect)) {
                return
            }

            this.onStackSelected(id)
        })
    }

    isStackCliked(x, y, rect) {
        const inX = rect.x < x && x < (rect.x + rect.width)
        const inY = rect.y < y && y < (rect.y + rect.height)
        return inX && inY
    }

    onStackSelected(stack_id) {
        if (this.model.stackSelected === NO_SELECTION) {
            this.model.stackSelected = stack_id

        } else if (this.model.stackSelected === stack_id) {
            this.model.stackSelected = NO_SELECTION

        } else {
            this.moveMarbles(this.model.stackSelected, stack_id)
            this.model.stackSelected = NO_SELECTION
            this.onStackCompleted(stack_id)
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

        return this.model.compareTypes(from, to)
    }

    onStackCompleted(stack_id) {
        if (!this.model.isStackFull(stack_id)) {
            return
        }
        if (!this.model.isStackCompleted(stack_id)) {
            return
        }
        this.memory.clean()
        this.model.removeStack(stack_id)
    }
}