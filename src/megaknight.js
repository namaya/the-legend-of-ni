
let knights_stats = {
    'walk_speed': 200,
    x: 200, y: 340,
    'animation': {speed: 6, hack: 75},
    'health_bar': 10,
    'spritesheet': {x: 128, y: 128},
    'weapon': {adj: {x: 49, y: 25}}
};

class MegaKnight {

    constructor(game) {
        this.game = game;
    }

    preload() {
        this.game.load.spritesheet('megaknight', 'assets/characters/megaknight-w-axe.png',
            knights_stats.spritesheet.x, knights_stats.spritesheet.y);
        this.game.load.spritesheet('axe','assets/items/axe.png', 64, 64);
    }

    create() {
        this.health = 7;
        this.isFacingRight = true;

        this.sprite = this.game.add.sprite(knights_stats.x, knights_stats.y, 'megaknight');
        this.sprite.scale.setTo(0.5);
        this.weapon = this.game.add.sprite(knights_stats.x, knights_stats.y + knights_stats.weapon.adj.y, 'axe');
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.game.physics.enable(this.weapon, Phaser.Physics.ARCADE);
        this.weapon.body.allowGravity = false;
        this.sprite.animations.add('walk-left', [5, 6, 7, 8]);
        this.sprite.animations.add('walk-right', [0, 1, 2, 3]);
        this.weapon.animations.add('swing-right', [0, 1, 2, 3]);
        this.weapon.animations.add('swing-left', [4, 5, 6, 7]);
        this.sprite.body.collideWorldBounds = true;
        this.ouch = this.game.add.audio('ouch');
        this.sprite.animations.play('walk-right', knights_stats.animation.speed, true);
        this.weapon.animations.play('swing-right', knights_stats.animation.speed, true);
        this.sprite.body.velocity.x = knights_stats.walk_speed;
        this.healthText = this.game.add.text(20, 60, 'Health: ' + this.health);
    }

    update() {

        //if the boss hits the right boundary, switch direction
        if (this.sprite.body.onWall() && this.isFacingRight) {
            this.sprite.animations.play('walk-left', knights_stats.animation.speed, true);
            this.weapon.animations.play('swing-left', knights_stats.animation.speed, true);
            this.sprite.body.velocity.x = -knights_stats.walk_speed;
            this.isFacingRight = false;
        }

        //if the boss hits the left boundary, switch direction
        else if (this.sprite.body.onWall() && !this.isFacingRight) {
            this.sprite.animations.play('walk-right', knights_stats.animation.speed, true);
            this.weapon.animations.play('swing-right', knights_stats.animation.speed, true);
            this.sprite.body.velocity.x = knights_stats.walk_speed;
            this.isFacingRight = true;
        }

        if (this.isFacingRight) {
            this.weapon.body.x = this.sprite.body.x + knights_stats.weapon.adj.x;
        } else {
            this.weapon.body.x = this.sprite.body.x - knights_stats.weapon.adj.x;
        }
    }

    damage() {
        this.health -= 1;
        this.healthText.text = 'Health: ' + this.health;
        this.ouch.play();
    }

    isDead() {
        return this.health == 0;
    }

}
