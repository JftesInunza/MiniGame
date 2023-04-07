'use strict'

// color palette: https://colorhunt.co/palette/f6f1f119a7ce146c94000000
const COLOR_NO_SELECTED = '#146C94'
const COLOR_SELECTED = '#19A7CE'

class GameView {
    constructor(model, viewport) {
        this.model = model
        this.viewport = viewport
    }

    render(ctx) {
        if (this.model.state != STATE_GAME) {
            return
        }

        this.model.forStack((stack, i) => {
            const rect = this.model.stackRect(i)
            this.selectStackColorFill(ctx, i)
            this.drawStack(ctx, rect)

            stack.forEach((marbles, i) => {
                marbles.x = rect.x
                marbles.y = rect.y + i * (BOX.height + BOX.margin * 2)
                marbles.draw(ctx)
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

    drawStack(ctx, rect) {
        ctx.fillRect(
            rect.x,
            rect.y,
            rect.width,
            rect.height
        )
    }

}