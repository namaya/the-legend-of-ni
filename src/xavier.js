
let x_conf = {
    'walk_speed': 200,
    'jump_speed': 200,
    'origin': {x: 10, y: 5},
    'animation_speed': 12
};

class Xavier {

    constructor(game) {
        this.game = game;
    }

    preload() {
        this.game.load.spritesheet('xavier', 'assets/xavier.png', 66, 71);
    }

    create() {
        this.sprite = this.game.add.sprite(x_conf.origin.x, x_conf.origin.y, 'xavier');

        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

        this.sprite.animations.add('walk-right', [1, 2, 1, 3], 10);
        this.sprite.animations.add('walk-left', [6, 7, 6, 8], 10);

        _global.keyboard.W.onDown.add(this._jump, this)

        this.isFacingRight = true;
    }

    update() {
        if (_global.keyboard.D.isDown) {
            this._walk_right();
        } else if (_global.keyboard.A.isDown) {
            this._walk_left();
        } else {
            this._stand();
        }
    }

    _walk_right() {
        this.sprite.animations.play('walk-right', x_conf.animation_speed, true);
        this.sprite.body.velocity.x = x_conf.walk_speed;
        this.isFacingRight = true;
    }

    _walk_left() {
        this.sprite.animations.play('walk-left', x_conf.animation_speed, true);
        this.sprite.body.velocity.x = -x_conf.walk_speed;
        this.isFacingRight = false;
    }

    _stand() {
        this.sprite.animations.stop();
        this.sprite.body.velocity.x = 0;
        this.sprite.animations.frame = this.isFacingRight ? 0 : 5;
    }

    _jump() {
        if (this.sprite.body.touching.down) {
            this.sprite.body.velocity.y = -x_conf.jump_speed;
        }
    }
}