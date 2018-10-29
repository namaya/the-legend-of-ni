
import settings from '../../../conf/legend-of-ni.conf.js';
import {global} from '../../legend-of-ni.js';

import BaseState from "../base.js";

export default class Preload extends BaseState {

    preload() {
        this.game.load.bitmapFont('alagard', 'assets/fonts/alagard.png', 'assets/fonts/alagard.fnt');

        this.game.load.audio('bossmusic','assets/sounds/bossmusic.mp3');
        this.game.load.audio('ouch','assets/sounds/ouch.mp3');

        global.states.tutorial.globalPreload();
        global.states.entrance.globalPreload();
        // this.game.load.tilemap('throne-room', 'assets/tilemaps/castle.json', null, Phaser.Tilemap.TILED_JSON);

        // this.game.load.tilemap('entrance', 'assets/tilemaps/BossEntranceTileMap3.json', null, Phaser.Tilemap.TILED_JSON);
        // this.game.load.image('bossentrancebackground', 'assets/tilemaps/bosslevelentrancebackground.png');
        // this.game.load.image('brickwall', 'assets/tilemaps/brickwall.png');
        // this.game.load.image('spike32x64', 'assets/tilemaps/spike32x64.png');

        // this.game.load.tilemap('throneroomtilemap', 'assets/tilemaps/throne-room/ThroneRoomBg.json', null, Phaser.Tilemap.TILED_JSON);
        // this.game.load.image('window-w-sunset', 'assets/tilemaps/throne-room/window-w-sunset.png');
        // this.game.load.image('throneroombg', 'assets/tilemaps/throne-room/throneroombg.png');
        // this.game.load.image('ceiling', 'assets/tilemaps/throne-room/ceiling.png');
        // this.game.load.image('column', 'assets/tilemaps/throne-room/column.png');
        // this.game.load.image('floor', 'assets/tilemaps/throne-room/floor.png');
        // this.game.load.image('lightin', 'assets/tilemaps/throne-room/lightin.png');
        // this.game.load.image('throne', 'assets/tilemaps/throne-room/throne.png');

        for (var key in settings.characters.enemies) {
            if (settings.characters.enemies.hasOwnProperty(key)) {
                let enemy = settings.characters.enemies[key];
                this.game.load.spritesheet(enemy.spritesheet.key, 
                                           enemy.spritesheet.path, 
                                           enemy.spritesheet.tileWidth,
                                           enemy.spritesheet.tileHeight);
            }
        }

        global.sprites.xavier.preload();
        // global.sprites.megaknight.preload();
        global.sprites.spring.preload();
        global.sprites.gate.preload();
        global.sprites.switchButton.preload();
    }

    create() {
        global.keyboard.A = this.game.input.keyboard.addKey(Phaser.KeyCode.A);
        global.keyboard.D = this.game.input.keyboard.addKey(Phaser.KeyCode.D);
        global.keyboard.W = this.game.input.keyboard.addKey(Phaser.KeyCode.W);
        global.keyboard.K = this.game.input.keyboard.addKey(Phaser.KeyCode.K);
        global.keyboard.SPACE = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        global.keyboard.ENTER = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1400;

        this.game.state.start('title');
    }

}