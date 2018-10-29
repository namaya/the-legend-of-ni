

import {global} from "../../legend-of-ni.js";
import stats from '../../../conf/states/throne.conf.js';

import BaseState from "../base.js";

/**
 * The main title screen.
 */
export default class LoseGame extends BaseState {

    create() {
        this._create_bg();

        let title = this.game.add.bitmapText(global.canvas.width/2, global.canvas.height/2, 'alagard', 'You were captured!', 50);
        title.anchor.setTo(0.5);

        let subtitle = this.game.add.bitmapText(global.canvas.width/2, 350, 'alagard', 'Press ENTER\n  to restart.', 30);
        subtitle.anchor.setTo(0.5);

        global.keyboard.ENTER.onDown.add(() => {
            this.game.state.start("entrance");
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
}
