'use strict'


class Viewport {
    constructor(model, canvas) {
        this.model = model
        this.canvas = canvas
    }

    onInit() {
        this.computeSizes()
        this.computeRects()
        this.model.setRects(this.rects)
    }

    onResize() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        if (this.model.state == STATE_MENU) {
            return
        }
        this.onInit()
    }

    computeSizes() {
        this.size = {
            width: this.model.numberStacks * BOX.width + 2 * (this.model.numberStacks - 1) * BOX.margin,
            height: (BOX.height + 2 * BOX.margin) * this.model.stackLength,
        }
        this.margin = {
            left: (this.canvas.width - this.size.width) / 2,
            top: (this.canvas.height - this.size.height) / 2,
        }
    }

    computeRects() {
        this.rects = this.model.stacks.map((stack, i) => {
            return {
                x: this.margin.left + i * (BOX.width + 2 * BOX.margin),
                y: this.margin.top,
                width: BOX.width,
                height: (BOX.height + 2 * BOX.margin) * stack.length,
            }
        })
    }
}