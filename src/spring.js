class Spring{

    constructor(game) {
        this.game = game;
    }

    preload() {
        this.game.load.spritesheet('spring', 'assets/items/spring64x64.png',
            64, 64);
    }

    create() {
        this.sprite = this.game.add.sprite(1300, 300, 'spring');
        this.sprite.scale.setTo(0.5);
        
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        
        this.sprite.animations.add('bounce', [0, 1, 2, 3]);
        this.sprite.body.collideWorldBounds = true;
    }

    update() {
        this.sprite.animations.play('bounce', 10, true);
    }
}
