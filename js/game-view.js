'use strict'

// color palette: https://colorhunt.co/palette/f6f1f119a7ce146c94000000
const COLOR_NO_SELECTED = '#146C94'
const COLOR_SELECTED = '#19A7CE'

class GameView {
    constructor(model) {
        this.model = model
        this.marblesImgs = document.querySelector('#marbles')
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
                if (mtype === NO_MARBLES) {
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