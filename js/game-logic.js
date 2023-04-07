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

    onStackSelected(stackID) {
        if (!this.model.isStackSelected()) {
            this.model.stackSelected = stackID
            console.log(`stack selected ${stackID}`)

        } else if (this.model.stackSelected === stackID) {
            this.model.unselectStack()
            console.log(`stack unselected ${stackID}`)

        } else {
            this.moveMarbles(this.model.stackSelected, stackID)
            this.model.unselectStack()
            this.onStackCompleted(stackID)
        }
    }

    moveMarbles(from, to) {
        console.log(`trying to move from ${from} to ${to}...`)
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
            console.log('target full: not valid.')
            return false
        }

        if (this.model.isStackEmpty(from)) {
            console.log('origin empty: not valid.')
            return false
        }

        if (this.model.isStackEmpty(to)) {
            console.log('target empty: valid.')
            return true
        }

        let result = this.model.compareTypes(from, to)
        if (result) {
            console.log('same top type: valid.')
        } else {
            console.log('different top types: not valid.')
        }
        return result
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

        if (this.model.isGameCompleted()) {
            console.log('Juego Terminado')
            this.model.setState(STATE_VICTORY)
        }
    }
}