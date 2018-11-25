
export default class Gate {
  constructor (game) {
    this.game = game
  }

  preload () {
    this.game.load.spritesheet('gate', 'assets/items/Gate Entrance.png', 320, 448);
  }

  create () {
    this.sprite = this.game.add.sprite(750, 630, 'gate')
    this.sprite.scale.setTo(0.45)
    this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE)

    this.sprite.animations.add('closed', [0])
    this.sprite.animations.add('open', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
    this.sprite.body.collideWorldBounds = true
    this.sprite.immovable = true
    this.sprite.body.moves = false

    this.opened = false
  }

  update () {
    // if(!gate_Stats.open){
    //     this.sprite.animations.play('closed', 10, true);    
    // }
    // else{
    //     this.sprite.animations.play('open', 10, false);        
    // }
  }

  open () {
    this.opened = true
    this.sprite.animations.play('open', 10, false)
    this.sprite.immovable = false
  }
}
