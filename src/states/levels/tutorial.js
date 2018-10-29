
import {global} from '../../legend-of-ni.js';
import stats from '../../../conf/states/tutorial.conf.js';

import BaseState from "../base.js";

import SmallKnight from '../../enemies/small-knight.js';

/**
 * Level 0: The Tutorial.
 */
export default class TutorialRoom extends BaseState {

    constructor(game) {
        super(game);

        this.xavier = global.sprites.xavier;
        this.user_interface = global.misc.user_interface;

        this.enemies = [];
        for (let enemy of stats.enemies) {
            if (enemy.type === 'knight-small') {
                this.enemies.push(new SmallKnight(this.game, enemy.origin.x, enemy.origin.y));
            }
        }
   }

    globalPreload() {
        this.game.load.tilemap(stats.world.key, stats.world.map.path, null, Phaser.Tilemap.TILED_JSON);
        for (let asset of stats.world.assets) {
            this.game.load.image(asset.key, asset.path);
        }
    }

    create() {
        this.game.world.setBounds(0, 0, 
                                  global.canvas.width * stats.world.bounds.x,
                                  global.canvas.height * stats.world.bounds.y);
 
        this._create_bg();
        this._create_enemies();

        let text1 = this.game.add.bitmapText(global.canvas.width/2, 200, 'alagard', 'Press A/D to move.', 30);
        text1.anchor.setTo(0.5);

        let text2 = this.game.add.bitmapText(1000, 200, 'alagard', 'Press W to jump.', 30);
        text2.anchor.setTo(0.5);

        let text3 = this.game.add.bitmapText(2000, 200, 'alagard', '          Press K to shoot.\n\n Hold SPACEBAR to adjust power.', 30);
        text3.anchor.setTo(0.5);

        let text4 = this.game.add.bitmapText(2900, 200, 'alagard', 'Avoid enemies or shoot them.', 30);
        text4.anchor.setTo(0.5);

        let text5 = this.game.add.bitmapText(3500, 200, 'alagard', 'Good luck.');

        let text6 = this.game.add.bitmapText(global.canvas.width/2, 250, 'alagard', 'Press Enter to skip tutorial.', 30);
        text6.anchor.setTo(0.5);

        this.user_interface.create();
        this.xavier.create();

        this.game.camera.follow(this.xavier.sprite);

        global.keyboard.ENTER.onDown.add(() => {
            this.game.state.start("entranceLevel");
            global.keyboard.ENTER.onDown = null;
        });
    }

    _create_bg() {
        let map = this.game.add.tilemap(stats.world.key, 32, 32);

        for (let asset of stats.world.assets) {
            map.addTilesetImage(asset.key);
        }

        this.collidableGroups = [];

        for (let layer of stats.world.map.layers) {
            let layerGroup = map.createLayer(layer.name);

            if (layer.collidable) {
                map.setCollisionBetween(layer.collidableTileRange.first, 
                                        layer.collidableTileRange.last,
                                        true,
                                        layerGroup);

                this.collidableGroups.push(layerGroup)
            }
        }
    }

    _create_enemies() {
        this.enemyGroup = this.game.add.group();
        var i = 0;
        for (let enemy of this.enemies) {
            enemy.create(this.enemyGroup);
            enemy.sprite.index = i;
            i++;
        }
    }

    update() {
        for (let collidableGroup of this.collidableGroups) {
            this.game.physics.arcade.collide(this.xavier.sprite, collidableGroup);
            this.game.physics.arcade.collide(this.enemyGroup, this.collidableGroups);
        }

        this.game.physics.arcade.overlap(this.xavier.sprite, this.enemyGroup, () => this.xavier.damage());

        this.game.physics.arcade.overlap(this.xavier.weapon.bullets, this.enemyGroup, (arrow, enemy) => {
            arrow.kill();
            this.enemies[enemy.index].damage();
        });

        this.xavier.update();

        if (this.xavier.sprite.x > 3850) {
            this.game.state.start('entranceLevel');
        }
    }
}
