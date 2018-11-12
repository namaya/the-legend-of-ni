
class Group extends Phaser.Group {

  constructor (game, name) {
    super(game)
    this.enableBody = true
  }

  update () {
    this.forEach(child => child.update())
  }

  render () {
    this.forEach(child => child.render())
  }
}

export default Group
