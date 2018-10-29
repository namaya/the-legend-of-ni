
import {global} from '../../legend-of-ni.js';

import BaseState from '../base.js';

/**
 * The main title screen.
 */
export default class Title extends BaseState {

    create() {
        this.game.stage.backgroundColor = 0xf4ebca;

        let title = this.game.add.bitmapText(global.canvas.width/2, 180, 'alagard', 'The Legend of Ni', 50);
        title.anchor.setTo(0.5);

        let subtitle = this.game.add.bitmapText(global.canvas.width/2, 300, 'alagard', 'Press any button\n   to continue.', 30);
        subtitle.anchor.setTo(0.5);

        this.boss_music = this.game.add.audio('bossmusic');
        this.boss_music.play();

        this.game.input.keyboard.onDownCallback = () => {
            this.game.input.keyboard.onDownCallback = null;
            this.game.state.start('throneRoom');
        }
    }
}