import p5 from 'p5'

function sketch(p) {
  let rotation = 0

  let value = 1

  p.setup = function () {
    // p.createCanvas(800, 600, p.WEBGL)
    // p.createCanvas(800, 600)
    const cnv = p.createCanvas(p.windowWidth, p.windowHeight)
    cnv.style('display', 'block')
  }

  //   p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
  //     if (props.rotation !== null) {
  //       rotation = (props.rotation * Math.PI) / 180
  //     }
  //   }

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
  }

  p.mousePressed = function () {
    value += 50
  }
  p.mouseReleased = function () {}

  p.draw = function () {
    // p.noFill()
    // p.strokeWeight(value)
    // p.ellipse(p.mouseX, p.mouseY, p.mouseX / 15, p.mouseX / 15)

    p.translate(value, 0)
    // p.translate(p5.Vector.fromAngle(p.millis() / 500, value))
    // p.translate(p5.Vector.fromAngle(value + 1000))

    p.textSize((p.windowWidth + p.windowHeight) / 4)
    p.textAlign(p.CENTER, p.CENTER)
    p.fill(43, 43, 43, 0.68)
    p.text('k', p.windowWidth / 2, p.windowHeight / 2)

    // p.background(100)
    // p.normalMaterial()
    // p.noStroke()
    // p.push()
    // p.rotateY(rotation)
    // p.box(100)
    // p.ellipse(50, 50, 80, 80)
    // p.pop()
  }
}

export default sketch
