
import Rock from './Rock.js'
import Group from './Group.js'

class Landslide extends Group {
  constructor (game, spawnPoints, name) {
    super(game, name)

    this.spawnPoints = spawnPoints

    for (let spawnPoint of this.spawnPoints) {
      this.add(new Rock(this.game, spawnPoint.x, spawnPoint.y))
    }

    // for (var i = 0; i < this.spawnPoints; i++) {
    this.game.time.events.repeat(Phaser.Timer.SECOND * 1, 100, () => {
      this.children[0].reset(this.spawnPoints[0].x, this.spawnPoints[0].y)
      this.children[0].body.allowGravity = true
    }, this)
  }
}

export default Landslide
