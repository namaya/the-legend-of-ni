
import {global} from "../../legend-of-ni.js";
import stats from '../../../conf/states/throne.conf.js';

import BaseState from "../base.js";

/**
 * The main title screen.
 */
export default class WinGame extends BaseState {

    preload() {
        this.game.load.bitmapFont('alagard', 'assets/fonts/alagard.png', 'assets/fonts/alagard.fnt');
        this.game.load.audio('bossmusic','assets/sounds/bossmusic.mp3');
    }

    create() {
        this._create_bg();

        let title = this.game.add.bitmapText(global.canvas.width/2, global.canvas.height/2, 'alagard', 'You won!', 50);
        title.anchor.setTo(0.5);

        this.boss_music = this.game.add.audio('bossmusic');
        this.boss_music.play();
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
}
