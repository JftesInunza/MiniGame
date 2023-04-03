'ues strict'


function main() {
    let canvas = document.querySelector('#canvas')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const ctx = canvas.getContext("2d")

    const model = new Model()
    const view = new GameView(model)
    const bg = new Background()
    const sc = new StateController(model)
    const controller = new GameLogic(model)

    model.addEventListener('viewState', () => {
        sc.onStateChanged()
    })

    window.addEventListener('click', mouse => {
        controller.onClick(mouse)
    })

    model.setState(STATE_MENU)

    let loop = () => {
        bg.update()
        bg.render(ctx)
        view.render(ctx)
        window.requestAnimationFrame(loop)
    }
    window.requestAnimationFrame(loop)
}

window.addEventListener('load', main)
