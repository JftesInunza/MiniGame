'use strict'


class GameMenu {
    constructor(model) {
        this.model = model
        this.modes = document.getElementsByName('mode')
        this.startBtn = document.querySelector('#start-btn')
        this.startBtn.addEventListener('click', () => { this.onStart() })
        this.currentMode = undefined
    }

    onStart() {
        this.modes.forEach((mode) => {
            if (!mode.checked) {
                return
            }
            this.currentMode = mode.value
            this.model.init(mode.value)
            this.model.setState(STATE_GAME)
        })
    }
}