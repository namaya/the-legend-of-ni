
import settings from '../../conf/legend-of-ni.conf.js';

import BaseEnemy from './BaseEnemy.js';

export default class SmallKnight extends BaseEnemy {

    constructor(game, x, y) {
        let stats = settings.characters.enemies["knight-small"];
        stats.sprite.origin.x = x;
        stats.sprite.origin.y = y;

        super(game, stats);
    }

    create(group) {
        super.create(group);
        this.sprite.scale.setTo(0.4);

        // Initial Game State
        this.sprite.animations.play('walk-left', 6, true);
        this.isFacingRight = true;

        // // this.sprite = this.game.add.sprite(knights_stats.x, knights_stats.y, 'megaknight');
        // this.sprite.scale.setTo(0.5);
        // this.weapon = this.game.add.sprite(knights_stats.x, knights_stats.y + knights_stats.weapon.adj.y, 'axe');
        // this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
        // this.game.physics.enable(this.weapon, Phaser.Physics.ARCADE);
        // this.weapon.body.allowGravity = false;
        // this.sprite.animations.add('walk-left', [5, 6, 7, 8]);
        // this.sprite.animations.add('walk-right', [0, 1, 2, 3]);
        // this.weapon.animations.add('swing-right', [0, 1, 2, 3]);
        // this.weapon.animations.add('swing-left', [4, 5, 6, 7]);
        // this.sprite.body.collideWorldBounds = true;
        // this.ouch = this.game.add.audio('ouch');
        // this.sprite.animations.play('walk-right', knights_stats.animation.speed, true);
        // this.weapon.animations.play('swing-right', knights_stats.animation.speed, true);
        // this.sprite.body.velocity.x = knights_stats.walk_speed;

        
        // let group = this.game.add.group();
        // let healthbarGraphics = this.game.add.graphics();
        // healthbarGraphics.fixedToCamera = true;

        // healthbarGraphics.beginFill(0xFFFF33,1);
        // healthbarGraphics.drawRect(240,65,(CANVAS_WIDTH - 300) * this.health / 10, 20);
        // healthbarGraphics.endFill();
        // group.add(healthbarGraphics);
    }

    // update() {
    //     //if the boss hits the right boundary, switch direction
    //     if (this.sprite.body.onWall() && this.isFacingRight) {
    //         this.sprite.animations.play('walk-left', knights_stats.animation.speed, true);
    //         this.weapon.animations.play('swing-left', knights_stats.animation.speed, true);
    //         this.sprite.body.velocity.x = -knights_stats.walk_speed;
    //         this.isFacingRight = false;
    //     }

    //     //if the boss hits the left boundary, switch direction
    //     else if (this.sprite.body.onWall() && !this.isFacingRight) {
    //         this.sprite.animations.play('walk-right', knights_stats.animation.speed, true);
    //         this.weapon.animations.play('swing-right', knights_stats.animation.speed, true);
    //         this.sprite.body.velocity.x = knights_stats.walk_speed;
    //         this.isFacingRight = true;
    //     }

    //     if (this.isFacingRight) {
    //         this.weapon.body.x = this.sprite.body.x + knights_stats.weapon.adj.x;
    //     } else {
    //         this.weapon.body.x = this.sprite.body.x - knights_stats.weapon.adj.x;
    //     }
    // }

    damage() {
        this.health -= 1;
        // this.ouch.play();
        
        if (this.health == 0) {
            this.sprite.kill();
        }

        // let group = this.game.add.group();
        // let healthbarGraphics = this.game.add.graphics();
        // let healthbarGraphicsB = this.game.add.graphics();
        // healthbarGraphicsB.fixedToCamera = true;
        // healthbarGraphics.fixedToCamera = true;

        // healthbarGraphics.beginFill(0xFFFF33,1);
        // healthbarGraphics.drawRect(240,65,(CANVAS_WIDTH - 300) * this.health / 10, 20);

        // healthbarGraphicsB.beginFill(0xFF700B,1);
        // healthbarGraphicsB.drawRect(240,65,(CANVAS_WIDTH - 300), 20);
        // healthbarGraphicsB.endFill();

        // group.add(healthbarGraphicsB)
        // group.add(healthbarGraphics);
    }

}
