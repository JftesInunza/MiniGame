'ues strict'


function main() {
    let canvas = document.querySelector('#canvas')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let ctx = canvas.getContext("2d")

    let model = new Model()
    let view = new View(model)

    let controller = new Controller(model)
    window.addEventListener('click', mouse => {
        controller.onClick(mouse)
    })

    model.setViewState(STATE_MENU)
    let loop = () => {
        view.render(ctx)
        window.requestAnimationFrame(loop)
    }
    window.requestAnimationFrame(loop)
}

window.addEventListener('load', main)
