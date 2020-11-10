import regularFont from '../../../assets/fonts/BebasNeue-Regular.ttf'

function aimTrainerSketch(p) {
  /// Gameplay variables
  let totalTargets = 0
  let posX, posY
  let diameter = 25
  let targetHit = false
  let totalHits = 0
  let userHitsRecord = 0

  /// Status of the game variables
  let gameRunning = false
  let countDownInterval
  let targetsInterval
  let countDownDone = false

  // HUD and canvas
  let buttonStart, buttonStop, buttonQuit, showScore
  let cnv

  /// Resource variables
  let fontRegular
  const textBig = (p.windowWidth + p.windowHeight) / 5
  const textMedium = (p.windowWidth + p.windowHeight) / 9
  const textSmall = 35
  const mapPosX = 0
  const mapPosY = 100
  let mapWidth = p.windowWidth
  let mapHeight = p.windowHeight - 250

  p.windowResized = () => {
    centerCanvas()
    p.resizeCanvas(p.windowWidth - 100, p.windowHeight - 150)
    mapWidth = p.windowWidth //130
    mapHeight = p.windowHeight - 250
    buttonStart.position(p.width - 170, 130)
    buttonStop.position(p.width - 50, 130)
    showScore.position(p.width - 290, 133)
    loadMap()
  }
  p.preload = () => {
    fontRegular = p.loadFont(regularFont)
  }
  p.setup = () => {
    cnv = p.createCanvas(p.windowWidth - 100, p.windowHeight - 150)
    cnv.style('display', 'block')
    centerCanvas()
    p.cursor(p.CROSS)
    loadHUD()
    loadMap()
    p.frameRate(32)
    p.noLoop()
    msgDelivery({
      msg: 'Ready',
      size: responsiveText,
      hexColor: '#FFFF6D',
      posX: p.width / 2,
      posY: p.height / 2,
    })
  }
  const centerCanvas = () => {
    let x = (p.windowWidth - p.width) / 2
    let y = (p.windowHeight - p.height) / 2
    cnv.position(x, y)
  }
  const loadMap = () => {
    p.noStroke()
    p.fill('#212121')
    p.rect(mapPosX, mapPosY, mapWidth, mapHeight)
  }

  const responsiveText = () => {
    if (mapWidth >= 675) {
      return textBig
    } else if (mapWidth <= 675 && mapWidth >= 350) {
      return textMedium
    } else {
      return textSmall
    }
  }

  const loadHUD = () => {
    buttonStart = p.createButton('Play')
    buttonStart.style('backgroundColor', '#FFFF6D')
    buttonStart.style('color', '#212121')
    buttonStart.style('border', 'none')
    buttonStart.style('fontWeight', 'bold')
    buttonStart.style('fontFamily', 'inherit')
    buttonStart.style('fontSize', 'large')
    buttonStart.style('width', '100px')
    buttonStart.position(p.width - 170, 130)
    buttonStart.mousePressed(countDown)

    buttonStop = p.createButton('Stop')
    buttonStop.style('backgroundColor', '#212121')
    buttonStop.style('color', '#FCF8E3')
    buttonStop.style('border', 'none')
    buttonStop.style('fontWeight', 'bold')
    buttonStop.style('fontFamily', 'inherit')
    buttonStop.style('fontSize', 'large')
    buttonStop.style('width', '100px')
    buttonStop.position(p.width - 50, 130)
    buttonStop.mousePressed(stopGame)

    showScore = p.createSpan(`Your Best: ${bestScore(totalHits)}`)
    showScore.style('color', '#FFFF6D')
    showScore.style('fontFamily', 'inherit')
    showScore.style('fontWeight', 'bold')
    showScore.style('fontSize', 'large')
    showScore.position(p.width - 70, 190)
  }

  const countDown = () => {
    if (p.mouseButton === p.LEFT) {
      countDownDone = false
      gameRunning = false
      clearInterval(targetsInterval)
      clearInterval(countDownInterval)
      resetScore()
      loadMap()
      while (gameRunning == false) {
        let count = 4
        countDownInterval = setInterval(() => {
          count -= 1
          // show countdown
          if (count != 0) {
            p.fill('#212121')
            p.noStroke()
            p.rect(mapPosX, mapPosY, mapWidth, mapHeight)
            msgDelivery({
              msg: count,
              size: responsiveText,
              hexColor: '#FFFF6D',
              posX: p.width / 2,
              posY: p.height / 2,
            })
          }
          if (count <= 0) {
            // stop interval and start the game after 3 seconds countdown
            clearInterval(countDownInterval)
            gameRunning = true
            startGame()
            countDownDone = true
          }
        }, 500)
        gameRunning = true
      }
    }
  }

  ///
  /// Stops current game
  ///
  const stopGame = () => {
    if (p.mouseButton === p.LEFT) {
      gameRunning = false
      clearInterval(countDownInterval)
      clearInterval(targetsInterval)
      resetScore()
      loadMap()
      msgDelivery({
        msg: 'Ready',
        size: responsiveText,
        hexColor: '#FFFF6D',
        posX: p.width / 2,
        posY: p.height / 2,
      })
    }
  }

  ///
  /// Sets the total of targets to play
  ///
  const setTargetsToPlay = (amount) => {
    totalTargets = amount
  }
  ///
  /// Prepare the game to start. Retuns true if the game started
  ///
  const startGame = () => {
    if (gameRunning == true) {
      setTargetsToPlay(25)
      gamePlayManager()
      loadMap()
      return true
    } else {
      loadMap()
    }
  }

  const gamePlayManager = () => {
    // interval for total gameplay
    targetsInterval = setInterval(() => {
      if (totalTargets >= 1) {
        targetManager()
      } else {
        loadMap()
        p.select('span').elt.textContent = `Your Best: ${bestScore(totalHits)}`
        msgDelivery({
          msg: `Hits: ${totalHits}`,
          size: responsiveText,
          hexColor: '#FFFF6D',
          leading: 230,
          posX: p.width / 2,
          posY: p.height / 2,
        })
        gameRunning = false
        resetScore()
        clearInterval(targetsInterval)
      }
    }, 900) // velocity of each target to appear
  }

  ///
  /// Define the best score the user done
  ///
  const bestScore = (hits) => {
    if (hits >= userHitsRecord) {
      userHitsRecord = hits
      return hits
    } else return userHitsRecord
  }

  ///
  /// Reset score
  ///
  const resetScore = () => {
    totalHits = 0
  }

  ///
  /// Draw a target and manage if the target was hited
  ///
  const targetManager = () => {
    p.redraw()
    hitInterval()
    if (totalTargets <= 0) {
      gameRunning = false
      resetScore()
    }
    totalTargets -= 1
  }

  ///
  /// Time for user to try a hit between each target
  ///
  const hitInterval = () => {
    setInterval(() => {
      if (targetHit) {
        p.redraw()
        totalHits += 1
        targetHit = false
      }
    }, 100)
  }
  ///
  /// Show a message in the game map
  ///
  const msgDelivery = ({ msg, size, hexColor, leading, posX, posY }) => {
    p.noStroke()
    p.textAlign(p.CENTER, p.CENTER)
    p.fill(hexColor)
    p.textSize(size())
    p.textFont(fontRegular)
    p.textLeading(leading)
    p.text(msg, posX, posY)
  }

  ///
  /// Checks if the pointer hits a target
  ///
  p.mousePressed = () => {
    if (gameRunning == true) {
      if (
        p.mouseX >= posX - diameter &&
        p.mouseX <= posX + diameter &&
        p.mouseY >= posY - diameter &&
        p.mouseY <= posY + diameter
      ) {
        targetHit = true
      }
    }
  }

  ///
  /// Draw a target
  ///
  p.draw = () => {
    if (totalTargets >= 0 && gameRunning == true) {
      if (!targetHit) {
        loadMap()
        posX = p.random(mapPosX + diameter / 2, mapWidth - diameter / 2)
        posY = p.random(mapPosY + diameter / 2, mapHeight - diameter / 2)
        p.strokeWeight(3)
        p.stroke('#FF7272')
        p.circle(posX, posY, diameter)
      } else {
        loadMap()
        p.noStroke()
        p.fill('#FF7272')
        p.circle(posX, posY, diameter)
      }
    }
  }
}

export default aimTrainerSketch
