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
        this.computeSize()
        this.computeRects()
    }

    computeSize() {
        this.size = {
            width: this.model.NumberOfStacks() * (this.mwidth + 2 * this.smargin) / this.rows - 2 * this.smargin,
            height: this.mheight * this.model.NumberOfMarblesPerStack() * this.rows,
        }
        this.margin = {
            left: (this.canvas.width - this.size.width) / 2,
            top: (this.canvas.height - this.size.height) / 2,
        }
    }

    computeRects() {
        let rects = []
        const columns = Math.ceil(this.model.NumberOfStacks() / this.rows)
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < columns; j++) {
                const rect = {
                    x: this.margin.left + j * (this.mwidth + 2 * this.smargin),
                    y: this.margin.top + (this.mheight + this.smargin) * this.model.NumberOfMarblesPerStack() * i,
                    width: this.mwidth,
                    height: this.mheight * this.model.NumberOfMarblesPerStack(),
                    mwidth: this.mwidth,
                    mheight: this.mheight,
                }
                rects.push(rect)
            }
        }
        this.model.setRects(rects)
    }


    setMobileViewport() {
        this.mwidth = 32
        this.mheight = 32
        this.rows = 2
    }

    setHQViewPort() {
        this.mwidth = 32
        this.mheight = 32
        this.rows = 1
    }

    setHDViewport() {
        this.mwidth = 48
        this.mheight = 48
        this.rows = 1
    }

    setFullHDViewport() {
        this.mwidth = 64
        this.mheight = 64
        this.rows = 1
    }

    setResolution() {
        if (window.innerWidth <= 580) {
            this.setMobileViewport()
        }

        if (580 < window.innerWidth && window.innerWidth <= 800) {
            this.setHQViewPort()
        }

        if (800 < window.innerWidth && window.innerWidth <= 1030) {
            this.setHDViewport()
        }

        if (window.innerWidth > 1030) {
            this.setFullHDViewport()
        }
    }

}