
/**
 * Display stats on the screen.
 */
class UserInterface {
  constructor (game) {
    this.game = game
  }

  create () {
    this.healthText = this.game.add.text(20, 20, '')
    this.healthText.fixedToCamera = true
    this.healthText.cameraOffset.setTo(20, 20)

    this.ammoText = this.game.add.text(20, 60, '')
    this.ammoText.fixedToCamera = true
    this.ammoText.cameraOffset.setTo(20, 60)

    this.powerText = this.game.add.text(20, 100, '')
    this.powerText.fixedToCamera = true
    this.powerText.cameraOffset.setTo(20, 100)

    this.game.onShoot.add(ammo => { this.ammoText.text = 'Ammo: ' + ammo }, this)
    this.game.onPlayerDamaged.add(numLives => { this.healthText.text = 'Lives: ' + numLives }, this)
    this.game.onPowerDelta.add(powerLevel => { this.powerText.text = 'Power: ' + powerLevel }, this)
  }
}

export default UserInterface
