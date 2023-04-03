'use strict'


class StateController {
    constructor(model) {
        this.model = model
        this.attrCB = document.getElementById("attr-btn")
        this.attr = document.getElementById("attr")
        this.attrContainer = document.getElementById("attr-container")

        this.attrCB.addEventListener('click', () => {
            this.onAttrClick()
        })
    }

    onAttrClick() {
        if (this.attrCB.checked) {
            this.attr.style.display = "block"
            this.attrContainer.style.height = "100%"
        } else {
            this.attrContainer.style.height = "0%"
            this.attr.style.display = "none"
        }
    }

    onStateChanged() {
        switch (this.model.state) {
            case STATE_MENU:
                return this.showDifficultyMenu()
            case STATE_GAME:
                return this.showGame()
            case STATE_VICTORY:
                return this.showVictory()
            default:
                console.log(`Unknown State ${this.model.state}`)
        }
    }

    showGame() {
        document.querySelector('#menu-view').style.display = 'none'
        document.querySelector('.menu').style.display = 'block'
    }

    showDifficultyMenu() {
        document.querySelector('#menu-view').style.display = 'block'
        document.querySelector('.menu').style.display = 'none'
    }

    showVictory() {
        return
    }
}