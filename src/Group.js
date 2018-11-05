
class Group extends Phaser.Group {

  constructor(game, name) {
    super(game)
    this.enableBody = true
  }

  update () {
    this.forEach(child => child.update())
  }
}

export default Group
