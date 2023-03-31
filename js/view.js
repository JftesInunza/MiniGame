'use strict'

// color palette: https://colorhunt.co/palette/f6f1f119a7ce146c94000000
const COLOR_NO_SELECTED = '#146C94'
const COLOR_SELECTED = '#19A7CE'

class View {
    constructor(model) {
        this.model = model
        this.viewState = {
            menu: this.showMenuView,
            game: this.showGameView,
            victory: this.showVictoryView,
        }
        this.marblesImgs = document.querySelector('#marbles')
        this.model.addEventListener('viewState', () => { this.viewState[this.model.viewState]() })
    }

    showGameView() {
        console.log('game view')
        document.querySelector('#menu-view').style.display = 'none'
        document.querySelector('.menu').style.display = 'block'
    }

    showMenuView() {
        console.log('menu view')
        document.querySelector('#menu-view').style.display = 'block'
        document.querySelector('.menu').style.display = 'none'
    }

    showVictoryView() {
        console.log('victory view')
    }

    render(ctx) {
        if (this.model.viewState != STATE_GAME) {
            return
        }

        this.model.forStack((stack, stack_id) => {
            const stackRect = this.model.stackRect(stack_id)
            this.selectStackColorFill(ctx, stack_id)
            this.drawStack(ctx, stackRect)

            stack.forEach((mtype, marbles_id) => {
                if (mtype === STACK_EMPTY) {
                    return
                }
                this.drawMarbles(ctx, mtype, marbles_id, stackRect)
            })
        });
    }

    selectStackColorFill(ctx, stack_id) {
        if (this.model.stackSelected == stack_id) {
            ctx.fillStyle = COLOR_SELECTED
        } else {
            ctx.fillStyle = COLOR_NO_SELECTED
        }
    }

    drawStack(ctx, stackRect) {
        ctx.fillRect(
            stackRect.x,
            stackRect.y,
            stackRect.width,
            stackRect.height
        )
    }

    drawMarbles(ctx, mtype, id, stackRect) {
        const sx = mtype * BOX.sWidth                                           //The x coordinate where to start clipping
        const sy = 0                                                            //The y coordinate where to start clipping
        const swidth = BOX.sWidth                                               //The width of the clipped image
        const sheight = BOX.sHeight                                             //The height of the clipped image
        const x = stackRect.x                                                   //The x coordinate where to place the image on the canvas
        const y = stackRect.y + id * (BOX.height + BOX.margin * 2)              //The y coordinate where to place the image on the canvas
        const width = BOX.width                                                 //The width of the image to use (stretch or reduce the image)
        const height = BOX.height                                               //The height of the image to use (stretch or reduce the image)
        ctx.drawImage(
            this.marblesImgs, sx, sy, swidth, sheight, x, y, width, height
        )
    }

}