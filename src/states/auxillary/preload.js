
import settings from '../../../conf/legend-of-ni.conf.js'
import { global } from '../../legend-of-ni.js'

import BaseState from '../base.js'
import AssetManager from '../../AssetManager.js'

class Preload extends BaseState {
  constructor (game) {
    super(game)

    this.assets = new AssetManager(game)
  }

  preload () {
    this.assets.preload()

    for (var level in global.states.levels) {
      global.states.levels[level].globalPreload()
    }

    this.game.load.tilemap('throneroomtilemap', 'assets/tilemaps/throne-room/ThroneRoomBg.json', null, Phaser.Tilemap.TILED_JSON)
    this.game.load.image('window-w-sunset', 'assets/tilemaps/throne-room/window-w-sunset.png')
    this.game.load.image('throneroombg', 'assets/tilemaps/throne-room/throneroombg.png')
    this.game.load.image('ceiling', 'assets/tilemaps/throne-room/ceiling.png')
    this.game.load.image('column', 'assets/tilemaps/throne-room/column.png')
    this.game.load.image('floor', 'assets/tilemaps/throne-room/floor.png')
    this.game.load.image('lightin', 'assets/tilemaps/throne-room/lightin.png')
    this.game.load.image('throne', 'assets/tilemaps/throne-room/throne.png')
    this.game.load.image('heart', 'assets/items/heart.png')

    for (var key in settings.characters.enemies) {
      if (settings.characters.enemies.hasOwnProperty(key)) {
        let enemy = settings.characters.enemies[key]
        this.game.load.spritesheet(enemy.spritesheet.key,
          enemy.spritesheet.path,
          enemy.spritesheet.tileWidth,
          enemy.spritesheet.tileHeight)
      }
    }

    global.sprites.xavier.preload()
    global.sprites.megaknight.preload()
    global.sprites.gate.preload()
    global.sprites.switchButton.preload()
  }

  create () {
    global.keyboard.A = this.game.input.keyboard.addKey(Phaser.KeyCode.A)
    global.keyboard.W = this.game.input.keyboard.addKey(Phaser.KeyCode.W)
    global.keyboard.S = this.game.input.keyboard.addKey(Phaser.KeyCode.S)
    global.keyboard.D = this.game.input.keyboard.addKey(Phaser.KeyCode.D)
    global.keyboard.K = this.game.input.keyboard.addKey(Phaser.KeyCode.K)
    global.keyboard.SPACE = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
    global.keyboard.ENTER = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER)

    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.physics.arcade.gravity.y = 1400

    this.game.state.start('title')
  }
}

export default Preload
