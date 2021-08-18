const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')


const Canvas = {
    createBanner (text) {
        const width = 1200
        const height = 630
        
        const canvas = createCanvas(width, height)
        const context = canvas.getContext('2d')
        
        context.fillStyle = '#000'
        context.fillRect(0, 0, width, height)
        
        context.font = 'bold 70pt Menlo'
        context.textAlign = 'center'
        context.textBaseline = 'top'
        context.fillStyle = '#3574d4'
        
        const textWidth = context.measureText(text).width
        context.fillRect(600 - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120)
        context.fillStyle = '#fff'
        context.fillText(text, 600, 170)
        return canvas.toBuffer('image/png')
    }
}

module.exports = Canvas
