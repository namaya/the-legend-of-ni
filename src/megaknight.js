
let knights_stats = {
    'walk_speed': 200,
    x: 200, y: 340,
    'animation': {speed: 6, hack: 75},
    'health_bar': 10,
    'spritesheet': {x: 128, y: 128}
};

class MegaKnight {

    constructor(game) {
        this.game = game;
        this.health = 7;
        this.isFacingRight = true;
    }

    preload() {
        this.game.load.spritesheet('megaknight', 'assets/characters/megaknight-w-axe.png',
            knights_stats.spritesheet.x, knights_stats.spritesheet.y);
    }

    create() {
        this.sprite = this.game.add.sprite(knights_stats.x, knights_stats.y, 'megaknight');
        this.sprite.scale.setTo(0.5);
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.animations.add('walk-left', [5, 6, 7, 8]);
        this.sprite.animations.add('walk-right', [0, 1, 2, 3]);
        this.sprite.body.collideWorldBounds = true;
        this.ouch = this.game.add.audio('ouch');
        this.sprite.animations.play('walk-right', knights_stats.animation.speed, true);
        this.sprite.body.velocity.x = knights_stats.walk_speed;
        this.healthText = this.game.add.text(20, 60, 'Health: ' + this.health);
    }

    update() {

        //if the boss hits the right boundary, switch direction
        if (this.sprite.body.onWall() && this.isFacingRight) {
            this.sprite.animations.play('walk-left', knights_stats.animation.speed, true);
            this.sprite.body.velocity.x = -knights_stats.walk_speed;
            this.isFacingRight = false;
        }

        //if the boss hits the left boundary, switch direction
        else if (this.sprite.body.onWall() && !this.isFacingRight) {
            this.sprite.animations.play('walk-right', knights_stats.animation.speed, true);
            this.sprite.body.velocity.x = knights_stats.walk_speed;
            this.isFacingRight = true;
        }

    }

    damage() {
        this.health -= 1;
        this.healthText.text = 'Health: ' + this.health;
        this.ouch.play();
    }

}
