
export let defaults = {
  fonts: {
    'alagard': 'alagard'
  },

  audio: {
    'bossMusic': 'boss_music'
  },

  image: {

  }
}

class AssetManager {
  constructor (game) {
    this.game = game
  }

  preload () {
    this.game.load.bitmapFont('alagard', 'assets/fonts/alagard.png', 'assets/fonts/alagard.fnt')

    this.game.load.audio('bossmusic', 'assets/sounds/bossmusic.mp3')
    this.game.load.audio('ouch', 'assets/sounds/ouch.mp3')

    this.game.load.image('door', '/assets/maps/door.png')
    this.game.load.image('spike-1', '/assets/maps/spike.png')
    this.game.load.image('spike-2', '/assets/maps/level1/tallspikefloor.png')
    this.game.load.image('ladder', '/assets/maps/level1/ladder.png')
    this.game.load.image('rock', '/assets/items/rock.png')

    this.game.load.spritesheet('spring', '/assets/items/spring64x64.png', 64, 64)
    this.game.load.spritesheet('switch', '/assets/items/Switch96x32.png', 96, 32)

    this.game.load.spritesheet('ranger', '/assets/characters/ranger.png', 70, 68)
  }
}

export default AssetManager
