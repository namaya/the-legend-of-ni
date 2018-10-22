
let knights_stats = {
    'walk_speed': 200,
    x: 200, y: 532,
    'animation': {speed: 6, hack: 75},
    'health': {x: 485, y: 25, width: 10, height: 50},
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
        this.health = 10;
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

        
        let group = this.game.add.group();
        let healthbarGraphics = this.game.add.graphics();
        healthbarGraphics.fixedToCamera = true;
        // healthbarGraphics.cameraOffset.setTo(20, 60);

        healthbarGraphics.beginFill(0xFFFF33,1);
        healthbarGraphics.drawRect(240,65,(CANVAS_WIDTH - 300) * this.health / 10, 20);
        healthbarGraphics.endFill();
        group.add(healthbarGraphics);
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
        this.ouch.play();

        let group = this.game.add.group();
        let healthbarGraphics = this.game.add.graphics();
        let healthbarGraphicsB = this.game.add.graphics();
        healthbarGraphicsB.fixedToCamera = true;
        healthbarGraphics.fixedToCamera = true;

        healthbarGraphics.beginFill(0xFFFF33,1);
        healthbarGraphics.drawRect(240,65,(CANVAS_WIDTH - 300) * this.health / 10, 20);

        healthbarGraphicsB.beginFill(0xFF700B,1);
        healthbarGraphicsB.drawRect(240,65,(CANVAS_WIDTH - 300), 20);
        healthbarGraphicsB.endFill();

        group.add(healthbarGraphicsB)
        group.add(healthbarGraphics);
    }

    isDead() {
        return this.health == 0;
    }

}
