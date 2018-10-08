
let x_conf = {
    'walk_speed': 200,
    'jump_speed': 650,
    'origin': {x: 10, y: 5},
    'arrow_speed': {x: 400, y: 100},
    'max_power': 200,
    'animation': {speed: 12, hack: 75},
    'spritesheet': {x: 64, y: 64}
};

class Xavier {

    constructor(game) {
        this.game = game;
        this.ammo = 5;
    }

    preload() {
        this.game.load.spritesheet('xavier', 'assets/characters/xavier-w-bow.png', 64, 64);
        this.game.load.image('arrow', 'assets/items/arrow.png');
    }

    create() {
        this.sprite = this.game.add.sprite(x_conf.origin.x, x_conf.origin.y, 'xavier');
        this.arrows = this.game.add.group(null, 'arrows', true, true, 0);

        this.sprite.scale.setTo(0.75);

        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.collideWorldBounds = true;

        this.sprite.animations.add('walk-right', [0, 1]);
        this.sprite.animations.add('walk-left', [2, 3])

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

        this.arrows.forEachAlive(arrow => {
            arrow.angle = Math.atan2(arrow.body.velocity.y, arrow.body.velocity.x) * 180 / Math.PI;
        }, this);

        this.arrows.forEachAlive(arrow => {
          if (arrow.body.y > CANVAS_HEIGHT) {
            arrow.kill();
          }
        }, this);

    }

    _walk_right() {
        this.sprite.animations.play('walk-right', x_conf.animation.speed, true);
        this.sprite.body.velocity.x = x_conf.walk_speed;
        this.isFacingRight = true;
    }

    _walk_left() {
        this.sprite.animations.play('walk-left', x_conf.animation.speed, true);
        this.sprite.body.velocity.x = -x_conf.walk_speed;
        this.isFacingRight = false;
    }

    _stand() {
        this.sprite.animations.stop();
        this.sprite.body.velocity.x = 0;
        this.sprite.animations.frame = this.isFacingRight ? 0 : 2;
    }

    _jump() {
        if (this.sprite.body.onFloor()) {
            this.sprite.body.velocity.y = -x_conf.jump_speed;
        }
    }

    _shoot() {
        if (this.ammo > 0) {
            let arrow = this.game.add.sprite(this.sprite.body.x, this.sprite.body.y, 'arrow', 0, this.arrows);
            arrow.anchor.setTo(0.5);
            arrow.scale.setTo(0.5);
            arrow.angle = this.isFacingRight ? 45 : -45;

            this.game.physics.enable(arrow, Phaser.Physics.ARCADE);

            arrow.body.velocity.x =Math.cos(toRadians(toUnitCircle(arrow.angle))) * x_conf.arrow_speed.x;
            arrow.body.velocity.y = -Math.sin(toRadians(toUnitCircle(arrow.angle))) * x_conf.arrow_speed.x;


            this.ammo -= 1;
            this.ammoText.text = 'Ammo: ' + this.ammo;
        }
    }
    addArrows(){
        this.arrow1.kill();
        this.ammo += 1;
        this.ammoText.text = 'Ammo: ' + this.ammo;
    }

  spawnArrows(){
      this.arrow1 = this.game.add.sprite(Math.floor(Math.random()*CANVAS_WIDTH), 100, 'arrow',0,this.arrows);
      this.arrow1.scale.setTo(.5,.5);
      this.arrow1.enableBody = true;
      this.arrow1.body.collideWorldBounds = true;
    }
}

function toUnitCircle(angle) {
    return -angle + 90;
}

function toPhaserAngle(angle) {
    return -angle + 90;
}

function toDegrees (angle) {
    return angle * (180 / Math.PI);
}

function toRadians (angle) {
    return angle * (Math.PI / 180);
}
