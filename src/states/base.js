
/**
 * The base that all other states inherit from.
 * It predefine the constuctor and asJson() method
 * so we don't have to later.
 */
export default class BaseState {
  constructor (game) {
    this.game = game
  }

  preload () {}
  create () {}
  update () {}
  render () {}

  asJson () {
    return {
      preload: this.preload.bind(this),
      create: this.create.bind(this),
      update: this.update.bind(this),
      render: this.render.bind(this)
    }
  }
}
