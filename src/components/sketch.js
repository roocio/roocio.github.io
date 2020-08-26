function sketch(p) {
  let rotation = 0

  const click = false

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

  p.draw = function () {
    if (p.mousePressed) {
      p.fill(0)
      click = true
    } else {
      p.fill(255)
    }

    p.ellipse(p.mouseX, p.mouseY, 40, 40)

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
