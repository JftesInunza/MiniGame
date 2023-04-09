'use strict'


class Viewport {
    constructor(model, canvas) {
        this.model = model
        this.canvas = canvas
        this.smargin = 5
    }

    onResize() {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        if (this.model.state == STATE_MENU) {
            return
        }
        this.onInit()
    }

    onInit() {
        this.setResolution()
        this.computeSizes()
        this.computeRects()
        this.model.setRects(this.rects)
    }

    computeSizes() {
        this.size = {
            width: this.model.NumberOfStacks() * this.mwidth + 2 * (this.model.NumberOfStacks() - 1) * this.smargin,
            height: this.mheight * this.model.NumberOfMarblesPerStack(),
        }
        this.margin = {
            left: (this.canvas.width - this.size.width) / 2,
            top: (this.canvas.height - this.size.height) / 2,
        }
    }

    computeRects() {
        this.rects = this.model.stacks.map((stack, i) => {
            return {
                x: this.margin.left + i * (this.mwidth + 2 * this.smargin),
                y: this.margin.top,
                width: this.mwidth,
                height: this.mheight * this.model.NumberOfMarblesPerStack(),
                mwidth: this.mwidth,
                mheight: this.mheight,
            }
        })
    }


    setMobileViewport() {
        this.mwidth = 32
        this.mheight = 32
    }

    setHDViewport() {
        this.mwidth = 48
        this.mheight = 48
    }

    setFullHDViewport() {
        this.mwidth = 64
        this.mheight = 64
    }

    setResolution() {
        if (window.innerWidth <= 800) {
            this.setMobileViewport()
        }

        if (800 < window.innerWidth && window.innerWidth <= 1030) {
            this.setHDViewport()
        }

        if (window.innerWidth > 1030) {
            this.setFullHDViewport()
        }
    }

}