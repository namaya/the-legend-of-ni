
class Group extends Phaser.Group {

  constructor (game, name) {
    super(game)
    this.enableBody = true
    this.dropped = false
  }

  update () {
    this.forEach(child => child.update())
  }

  render () {
    this.forEach(child => child.render())
  }

  drop () {
    this.forEach(child => child.drop())
    this.dropped = true
  }

  // isOpened () {
  //   this.forEach(child => child.render())
  // }
}

export default Group
