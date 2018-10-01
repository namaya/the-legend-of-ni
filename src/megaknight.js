

let knights_stats = {
    'walk_speed': 200,
    x: 200, y: 280,
    'animation_speed': 6,
    'health_bar': 10,
    'spritesheet': {x: 61, y: 68}
};
// 280, 368

class MegaKnight {

    constructor(game) {
        this.game = game;
        this.health = 10;
        this.isFacingRight = true;
    }

    ///leaving in a temporary sprite (santa clause)
    preload() {
        this.game.load.spritesheet('megaknight', 'assets/characters/megaknight.png',
            knights_stats.spritesheet.x, knights_stats.spritesheet.y);

        //this.game.load.audio('ouch', 'assets/sounds/ouch.mp3');
    }

    create() {
        this.sprite = this.game.add.sprite(knights_stats.x, knights_stats.y, 'megaknight');
        // this.sprite.scale.setTo(1.5);
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        // this.sprite.body.immovable = true;
        this.sprite.animations.add('walk', [0, 1, 2, 3]);
        this.sprite.body.collideWorldBounds = true;
        //let ouch = this.game.add.audio('ouch');
        this.sprite.animations.play('walk', knights_stats.animation_speed, true);
        this.sprite.body.velocity.x = knights_stats.walk_speed;
        this.healthText = this.game.add.text(CANVAS_WIDTH-200, 20, 'Health: ' + this.health);
    }

    update() {

        //if the boss hits the right boundary, switch direction
        if (this.sprite.body.onWall() && this.isFacingRight) {
          this.sprite.body.velocity.x = -knights_stats.walk_speed;
          this.sprite.scale.setTo(-1, 1);
          this.isFacingRight = false;
        }

        //if the boss hits the left boundary, switch direction
        else if (this.sprite.body.onWall() && !this.isFacingRight) {
          this.sprite.body.velocity.x = knights_stats.walk_speed;
          this.sprite.scale.setTo(1, 1);
          this.isFacingRight = true;
        }

        //if hit
        //game.physics.arcade.overlap(this.sprite,  arrow, bossDamaged, null, this);

    }

    damage() {
        this.health -= 1;
        this.healthText.text = 'Health: ' + this.health;

    }

}
