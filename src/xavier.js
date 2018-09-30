
let x_conf = {
    'walk_speed': 200,
    'jump_speed': 500,
    'origin': {x: 10, y: 5},
    'arrow_speed': {x: 400, y: 100},
    'max_power': 200,
    'animation_speed': 12
};

class Xavier {

    constructor(game) {
        this.game = game;
        this.arrows = [];
        this.ammo = 10;
    }

    preload() {
        this.game.load.spritesheet('xavier', 'assets/characters/xavier.png', 66, 71);
        this.game.load.image('arrow', 'assets/arrow.png');
    }

    create() {
        this.sprite = this.game.add.sprite(x_conf.origin.x, x_conf.origin.y, 'xavier');
        this.sprite.scale.setTo(0.75);

        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.collideWorldBounds = true;

        this.sprite.animations.add('walk-right', [1, 2, 1, 3], 10);
        this.sprite.animations.add('walk-left', [6, 7, 6, 8], 10);

        _global.keyboard.W.onDown.add(this._jump, this);
        _global.keyboard.K.onDown.add(this._shoot, this);

        this.isFacingRight = true;

        this.ammoText = this.game.add.text(20, 20, 'Ammo: ' + this.ammo);
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

    _shoot() {
        if (this.ammo > 0) {
            let arrow = this.game.add.sprite(this.sprite.body.x, this.sprite.body.y, 'arrow');
            arrow.anchor.setTo(0.5);
            arrow.scale.setTo(0.05);
            arrow.angle = this.isFacingRight ? 90 : -90;

            this.game.physics.enable(arrow, Phaser.Physics.ARCADE);

            arrow.body.velocity.x = this.isFacingRight ? x_conf.arrow_speed.x : -x_conf.arrow_speed.x;
            arrow.body.velocity.y = -x_conf.arrow_speed.y;

            this.arrows.push(arrow);
            this.ammo -= 1;
            this.ammoText.text = 'Ammo: ' + this.ammo;
        }
    }
}