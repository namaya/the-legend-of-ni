

import { global } from "../../legend-of-ni.js";
import stats from "../../../conf/states/throne.conf.js";

import BaseState from "../base.js";

/**
 * The final boss map.
 */
export default class ThroneRoom extends BaseState {
    constructor(game) {
        super(game);
        this.xavier = global.sprites.xavier;
        this.megaknight = global.sprites.megaknight;
        this.user_interface = global.misc.user_interface;
    }

    globalPreload() {
        this.game.load.tilemap(stats.world.key, stats.world.map.path, null, Phaser.Tilemap.TILED_JSON);
        for (let asset of stats.world.assets) {
            this.game.load.image(asset.key, asset.path);
        }
        this.game.load.image('rock', 'assets/items/rock32x32.png');
    }


    create() {
        this.game.world.setBounds(0, 0, 1024, 640);

        this._create_bg();
        this.user_interface.create();

        this.ouch = this.game.add.audio("ouch");

        this.xavier.create();
        this.megaknight.create();

        this.xavier.spawnArrows();

        this.game.camera.follow(this.xavier.sprite);

        this.rocks = this.game.add.group();
        this.rocks.enableBody = true;
        this.game.time.events.repeat(Phaser.Timer.SECOND * 2, 100, addFallingRocks, this);
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

    update() {
        for (let collidableGroup of this.collidableGroups) {
            this.game.physics.arcade.collide(this.xavier.sprite, collidableGroup);
            this.game.physics.arcade.collide(this.megaknight.sprite, collidableGroup);
            this.game.physics.arcade.collide(this.xavier.arrow1, collidableGroup);
            // this.game.physics.arcade.collide(this.enemyGroup, this.collidableGroups);
        }

        this.game.physics.arcade.overlap(this.xavier.weapon.bullets, this.megaknight.sprite, (mk, arrow) => {
            arrow.kill();
            this.megaknight.damage();
            this.ouch.play();
        });

        this.xavier.update();
        this.megaknight.update();

        if (this.megaknight.isDead()) {
            this.game.state.start("winGame");
        }

        this.game.physics.arcade.overlap(this.xavier.sprite, this.megaknight.sprite, this._xavierDown, null, this);
        this.game.physics.arcade.overlap(this.megaknight.weapon, this.xavier.sprite, this._xavierDown, null, this);
        this.game.physics.arcade.overlap(this.xavier.arrow1, this.xavier.sprite, collectArrow, null, this);
        this.game.physics.arcade.overlap(this.xavier.sprite,  this.rocks, () => this.xavier.damage(), null, this);
    }

    _xavierDown(xavier, opponent) {
        // if (xavier.body.blocked.top) {
        //     console.log('top');
        // } else if (xavier.body.blocked.) {
        //     console.log('bottom');
        // } else if (xav)
        this.xavier.damage();
    }

}

function addFallingRocks(){
    var rock = this.rocks.create(Math.random() * global.canvas.width, 0, 'rock');
    rock.body.gravity.y = 300;
}

function collectArrow(){
  this.xavier.addArrows();
  this.xavier.spawnArrows();
}
