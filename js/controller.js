'use strict'


class Controller {
    constructor(model) {
        this.model = model
    }

    onClick(event) {
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
            this.checkForStackCompleted(stack_id)
        }
    }

    moveMarbles(from, to) {
        while (this.isValidMovement(from, to)) {
            this.model.moveMarbles(from, to)
        }
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

    checkForStackCompleted(stack_id) {
        if (!this.model.isStackFull(stack_id)) {
            return
        }
        if (!this.model.isStackCompleted(stack_id)) {
            return
        }
        this.model.sumScore()
        this.model.removeStack(stack_id)
    }
}