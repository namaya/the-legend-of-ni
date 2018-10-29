

import {global} from "../../legend-of-ni.js";

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
        let map = this.game.add.tilemap('throneroomtilemap', 32, 32);
        map.addTilesetImage('window-w-sunset')
        map.addTilesetImage('throneroombg')
        map.addTilesetImage('ceiling')
        map.addTilesetImage('column')
        map.addTilesetImage('floor')
        map.addTilesetImage('lightin')
        map.addTilesetImage('throne')
        map.createLayer('wall');
        map.createLayer('windows');
        map.createLayer('columns');
        this.platforms = map.createLayer('platforms');
        map.setCollisionBetween(1, 1000, true, this.platforms);
    }

}
