'use strict'

// color palette: https://colorhunt.co/palette/f6f1f119a7ce146c94000000
const COLOR_NO_SELECTED = '#146C94'
const COLOR_SELECTED = '#19A7CE'

class GameView {
    constructor(model) {
        this.model = model
    }

    render(ctx) {
        if (this.model.state != STATE_GAME) {
            return
        }

        this.model.forStack((stack, i) => {
            this.selectStackColorFill(ctx, i)
            this.drawStack(ctx, stack.rect)
            stack.draw(ctx)
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