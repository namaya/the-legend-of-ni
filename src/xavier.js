
let x_conf = {
    'walk_speed': 200,
    'jump_speed': 650,
    'bounce_speed': 1200,
    'origin': {x: 10, y: 5},
    'arrow_speed': {x: 400, y: 100},
    'max_power': 60,
    'animation': {speed: 12, hack: 75},
    'spritesheet': {x: 64, y: 64}
};

class Xavier {

    constructor(game) {
        this.game = game;
        this.numLives = 3;
        this.ammo = 1000;
        this.power = 0;
        this.isFacingRight = true;

        this.game.onShoot = new Phaser.Signal();
        this.game.onPlayerDamaged = new Phaser.Signal();
    }

    preload() {
        this.game.load.spritesheet('xavier', 'assets/characters/xavier-w-bow.png', 64, 64);
        this.game.load.image('arrow', 'assets/items/arrow.png');
        this.game.load.image('quiver', 'assets/items/quiver.png');
        this.game.load.audio('swoosh', 'assets/sounds/arrowSwoosh.mp3');
        this.game.load.audio('jump', 'assets/sounds/jump.mp3');
    }

    create() {
        _global.keyboard.W.onDown.add(this._jump, this);
        _global.keyboard.K.onDown.add(this._shoot, this);
        
        this.sprite = this.game.add.sprite(x_conf.origin.x, x_conf.origin.y, 'xavier');
        this.sprite.scale.setTo(0.75);
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.animations.add('walk-right', [0, 1]);
        this.sprite.animations.add('walk-left', [2, 3])
        this.swoosh = this.game.add.audio("swoosh");
        this.jump = this.game.add.audio("jump");

        this.weapon = this.game.add.weapon(20, 'arrow');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
        this.weapon.bulletRotateToVelocity = true;
        this.weapon.bulletGravity = 1400;
        this.weapon.trackSprite(this.sprite);
        this.weapon.trackOffset.setTo(32, 32);

        this.weapon.onFire.add(arrow => arrow.scale.setTo(0.5));

        this.ammo = 20;
        this.power = 0;
        this.numLives = 3;
        this.isFacingRight = true;
        this.damaged = false;

        this.game.onShoot.dispatch(this.ammo);
        this.game.onPlayerDamaged.dispatch(this.numLives);
        this.game.onPlayerDamaged.add(() => setTimeout(() => this.damaged = false, 1000));
    }

    update() {
        if (_global.keyboard.D.isDown) {
            this._walk_right();
        } else if (_global.keyboard.A.isDown) {
            this._walk_left();
        } else {
            this._stand();
        }

        if (_global.keyboard.SPACE.isDown) {
            if (this.power < x_conf.max_power) {
                this.power += 1;
            }
        } else {
            this.power = 0;
        }
    }

    damage() {
        if (!this.damaged) {
            this.damaged = true;
            this.numLives -= 1;
            if (this.numLives == 0) {
                this.game.state.start('loseGame');
            } else {
                this.game.onPlayerDamaged.dispatch(this.numLives);
            }
        }
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
            this.jump.play();
        }
    }

    _shoot() {
        if (this.ammo > 0) {
            this.weapon.bulletSpeed = 250 + 10*this.power;

            if (this.isFacingRight) {
                this.weapon.fire(null, this.sprite.x + 100, this.sprite.y - 2*this.power);
            } else {
                this.weapon.fire(null, this.sprite.x - 100, this.sprite.y - 2*this.power);
            }

            this.swoosh.play();
            this.ammo -= 1;
            this.power = 0;
            this.game.onShoot.dispatch(this.ammo);
        }
    }

    addArrows(){
        this.arrow1.kill();
        this.ammo += 1;
        this.game.onShoot.dispatch(this.ammo);
    }
    
    bounceSpring(){    
        this.sprite.body.velocity.y = -x_conf.bounce_speed;
        this.jump.play();
    }

  spawnArrows(){
        this.arrow1 = this.game.add.sprite(Math.floor(Math.random()*CANVAS_WIDTH), 100, 'quiver',0);
        this.game.physics.enable(this.arrow1);
        this.arrow1.scale.setTo(.5,.5);
        this.arrow1.enableBody = true;
        this.arrow1.body.collideWorldBounds = true;
    }
}
