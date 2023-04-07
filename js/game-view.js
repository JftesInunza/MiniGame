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

        this.model.forStack((stack, stack_id) => {
            const rect = this.model.stackRect(stack_id)
            this.selectStackColorFill(ctx, stack_id)
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

    drawStack(ctx, stackRect) {
        ctx.fillRect(
            stackRect.x,
            stackRect.y,
            stackRect.width,
            stackRect.height
        )
    }

}