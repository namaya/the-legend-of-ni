
import BaseState from '../base.js'
import { global } from '../../legend-of-ni.js'

import Group from '../../Group.js'
import SmallKnight from '../../enemies/small-knight.js'
import SmallRanger from '../../enemies/SmallRanger.js'
import Door from '../../Door.js'
import Spike from '../../Spike.js'
import Treasure from '../../Treasure.js'
import Bridge from '../../Bridge.js'
import Ladder from '../../Ladder.js'
import Spring from '../../spring.js'
import Switch from '../../switchbutton.js'

class BaseLevel extends BaseState {
  constructor (game, conf) {
    super(game)

    this.xavier = global.sprites.xavier
    this.userInterface = global.misc.userInterface

    this.conf = conf
  }

  /**
   * The global preload is only called once at the beginning of the game.
   */
  globalPreload () {
    this._loadTileMap()
  }

  _loadTileMap () {
    this.game.load.tilemap(this.conf.world.key,
      this.conf.world.map.path, null, Phaser.Tilemap.TILED_JSON)

    for (let asset of this.conf.world.map.assets) {
      this.game.load.image(asset.key, asset.path)
    }
  }

  /**
   * Create the level.
   */
  create (backgroundLoader) {
    super.create()

    this.game.world.setBounds(0, 0,
      this.conf.world.bounds.x,
      this.conf.world.bounds.y)

    this._initializeState()
    this._renderBackground()
    this._renderObjects()

    if (backgroundLoader) {
      backgroundLoader()
    }

    this._renderUser()

    this.game.camera.follow(this.xavier.sprite)
    // this.game.camera.deadzone = new Phaser.Rectangle(200 - this.xavier.sprite.width / 2, 200 - this.xavier.sprite.height, global.canvas.width - 400, global.canvas.height - 400)
  }

  /**
   * Initialize the state of the level.
   */
  _initializeState () {

  }

  /**
   * Create the level's background from a tile map specified by the level's
   * configuration file.
   */
  _renderBackground () {
    this.map = this.game.add.tilemap(this.conf.world.key, 32, 32)
    this._addTileMapAssets(this.map)
    this._addLayers(this.map)
  }

  _addTileMapAssets (map) {
    for (let asset of this.conf.world.map.assets) {
      map.addTilesetImage(asset.key)
    }
  }

  _addLayers (map) {
    for (let layer of this.conf.world.map.layers) {
      let layerGroup = map.createLayer(layer.name)

      if (layer.collidable) {
        map.setCollisionBetween(layer.collidableTileRange.first,
          layer.collidableTileRange.last,
          true,
          layerGroup)

        this.floor = layerGroup
      }
    }
  }

  /**
   * Create objects on the tile map.
   *
   * Objects include ladders, spikes, treasure chests, etc...
   */
  _renderObjects () {
    this.door = new Group(this.game)
    this.spikes = new Group(this.game)
    this.springs = new Group(this.game)
    this.switches = new Group(this.game)
    this.ladders = new Group(this.game)
    this.treasure = new Group(this.game)
    this.bridge = new Group(this.game)
    this.rocks = new Group(this.game)
    this.enemies = new Group(this.game)

    // let objects = new Set(this.conf.world.map.objects.map(obj => obj.name))
    let objects = new Set(Object.keys(this.conf.world.map.objects))
    let objConfig = this.conf.world.map.objects

    if (objects.has('door')) {
      this.map.createFromObjects('door', objConfig['door'].gid, 'door', 0, true, false, this.door, Door)
      this.door = this.door.children[0]
    }

    if (objects.has('spikes')) {
      this.map.createFromObjects('spikes', objConfig['spikes'].gid, objConfig['spikes'].image, 0, true, false, this.spikes, Spike)
    }

    if (objects.has('spikes-upside-down')) {
      this.map.createFromObjects('spikes-upside-down', objConfig['spikes-upside-down'].gid, objConfig['spikes-upside-down'].image, 0, true, false, this.spikes, Spike)
    }

    if (objects.has('ladders')) {
      this.map.createFromObjects('ladders', objConfig['ladders'].gid, objConfig['ladders'].image, 0, true, false, this.ladders, Ladder)
    }

    if (objects.has('treasure')) {
      this.map.createFromObjects('treasure', objConfig['treasure'].gid, objConfig['treasure'].image, 0, true, false, this.treasure, Treasure)
      this.treasure = this.treasure.children[0]
    }

    if (objects.has('bridge')) {
      this.map.createFromObjects('bridge', objConfig['bridge'].gid, objConfig['bridge'].image, 0, true, false, this.bridge, Bridge)
    }

    // if (objects.has('rocks')) {
    //   this.map.createFromObjects('rocks', objConfig['rocks'].gid, objConfig['rocks'].image, 0, true, false, this.bridge, Rock)
    // }

    if (objects.has('springs')) {
      this.map.createFromObjects('springs', objConfig['springs'].gid, 'spring', 0, true, false, this.springs, Spring)
    }

    if (objects.has('switches')) {
      this.map.createFromObjects('switches', objConfig['switches'].gid, 'switch', 0, true, false, this.switches, Switch)
    }

    if (objects.has('knights-small')) {
      this.map.createFromObjects('knights-small', objConfig['knights-small'].gid, 'knight', 0, true, false, this.enemies, SmallKnight)
    }

    if (objects.has('rangers-small')) {
      this.map.createFromObjects('rangers-small', objConfig['rangers-small'].gid, 'ranger', 0, true, false, this.enemies, SmallRanger)
    }
  }

  /**
   * Render Xavier and Xavier's user interface.
   */
  _renderUser () {
    this.userInterface.create()
    this.xavier.create(this.conf.origin.x, this.conf.origin.y)
  }

  /**
   * Create update() lifecycle hook.
   */
  update () {
    super.update()

    this.game.physics.arcade.collide(this.xavier.sprite, this.floor)
    this.game.physics.arcade.collide(this.enemies, this.floor)

    this.game.physics.arcade.overlap(this.xavier.sprite, this.enemies, () => this.xavier.damage())
    this.game.physics.arcade.overlap(this.xavier.sprite, this.spikes, () => this.xavier.kill())
    this.game.physics.arcade.overlap(this.xavier.sprite, this.ladders, () => this.xavier.climb())
    this.game.physics.arcade.overlap(this.xavier.sprite, this.springs, () => this.xavier.bounceSpring())
    this.game.physics.arcade.overlap(this.xavier.weapon.bullets, this.enemies, (arrow, enemy) => {
      arrow.kill()
      enemy.damage()
    })

    this.xavier.update()
    this.enemies.update()
  }
}

export default BaseLevel
