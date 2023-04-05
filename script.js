'ues strict'


function main() {
    const canvas = document.querySelector('#canvas')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ctx = canvas.getContext("2d")

    const model = new Model()
    const game_view = new GameView(model)
    const background = new Background()
    const state_ctrl = new StateController(model)
    const game_logic = new GameLogic(model)
    const viewport = new Viewport(model, canvas)

    model.addEventListener('state', () => {
        state_ctrl.onStateChanged()
    })

    model.addEventListener('resize', () => {
        viewport.onInit()
    })

    window.addEventListener('click', mouse => {
        game_logic.onClick(mouse)
    })

    window.addEventListener('resize', () => {
        viewport.onResize()
    })

    model.setState(STATE_MENU)

    let loop = () => {
        background.update()
        background.render(ctx)
        game_view.render(ctx)
        window.requestAnimationFrame(loop)
    }
    window.requestAnimationFrame(loop)
}

window.addEventListener('load', main)
