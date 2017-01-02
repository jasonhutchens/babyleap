import BABY from 'babylonjs'
import LEAP from 'leapjs'

const FPS = 2

console.info('*** BABY LEAP ***')

class Game {
  constructor () {
    this.gametime = 0.0
    this.frequency = 1.0 / FPS
    this.viewport = document.getElementById('viewport')
    this.engine = new BABY.Engine(this.viewport, true)
    this.motion = new LEAP.Controller({
      enableGestures: false,
      background: true,
      loopWhileDisconnected: false
    })
  }

  run () {
    this.motion.connect()
    this.loadWorld()
    this.tick()
    this.engine.runRenderLoop(() => {
      this.render()
    })
    window.hideSpinner()
    this.engine.resize()
  }

  tick (timestamp = 0.0) {
    var dt = timestamp - this.gametime
    while (dt > this.frequency) {
      this.update(this.frequency)
      dt -= this.freqency
      this.gametime += this.frequency
    }
    window.requestAnimationFrame((timestamp) => {
      this.tick(timestamp)
    })
  }

  resize () {
    this.engine.resize()
  }

  loadWorld () {
    this.scene = new BABY.Scene(this.engine)
    var camera = new BABY.FreeCamera('camera1', new BABY.Vector3(0, 5, -10), this.scene)
    camera.setTarget(BABY.Vector3.Zero())
    camera.attachControl(this.viewport, false)
    var ground = BABY.Mesh.CreateGround('ground1', 15, 20, 80, this.scene)
    ground.position.y = -6
    ground.receiveShadows = true
    var sun = new BABY.HemisphericLight('light1', new BABY.Vector3(-3, -10, 4), this.scene)
    sun.intensity = 0.8
    this.light = new BABY.DirectionalLight('light2', new BABY.Vector3(10, -10, 5), this.scene)
    this.object = BABY.Mesh.CreateBox('object1', 3, this.scene)
    this.object.rotation.y = 0.8
    var shadowGenerator = new BABY.ShadowGenerator(1024, this.light)
    shadowGenerator.getShadowMap().renderList.push(this.object)
  }

  render () {
    this.scene.render()
  }

  getHeight (hand) {
    var percent = (hand.palmPosition[1] - 50.0) / 200.0
    percent = percent > 1.0 ? 1.0 : percent < 0.0 ? 0.0 : percent
    return 2 * percent - 1.0
  }

  update (dt) {
    var frame = this.motion.frame()
    var intensity = 0.5
    var position = 1
    if (frame.valid) {
      for (let hand of frame.hands) {
        var height = this.getHeight(hand)
        switch (hand.type) {
          case 'left':
            position = height * 3.0
            break
          case 'right':
            intensity = (1.0 - height) * 0.4 + 0.2
            break
        }
      }
    }
    this.light.intensity = intensity
    this.object.position.y = position
  }
}

window.game = new Game()
window.addEventListener('resize', function () {
  window.game.resize()
})
window.game.run()
