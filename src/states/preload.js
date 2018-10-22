

class Preload extends BaseState {

    preload() {

        this.game.load.bitmapFont('alagard', 'assets/fonts/alagard.png', 'assets/fonts/alagard.fnt');

        this.game.load.audio('bossmusic','assets/sounds/bossmusic.mp3');
        this.game.load.audio('ouch','assets/sounds/ouch.mp3');

        this.game.load.tilemap('throne-room', 'assets/tilemaps/castle.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('tutorial-room', 'assets/tilemaps/tutorial-room.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('castle', 'assets/tilemaps/castle.png');

        this.game.load.tilemap('entrance', 'assets/tilemaps/BossEntranceTileMap3.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('bossentrancebackground', 'assets/tilemaps/bosslevelentrancebackground.png');
        this.game.load.image('brickwall', 'assets/tilemaps/brickwall.png');
        this.game.load.image('spike32x64', 'assets/tilemaps/spike32x64.png');

        _global.sprites.xavier.preload();
        _global.sprites.megaknight.preload();
        _global.sprites.spring.preload();
        _global.sprites.gate.preload();
        _global.sprites.switchButton.preload();
        
        
    }

    create() {
        _global.keyboard.A = this.game.input.keyboard.addKey(Phaser.KeyCode.A);
        _global.keyboard.D = this.game.input.keyboard.addKey(Phaser.KeyCode.D);
        _global.keyboard.W = this.game.input.keyboard.addKey(Phaser.KeyCode.W);
        _global.keyboard.K = this.game.input.keyboard.addKey(Phaser.KeyCode.K);
        _global.keyboard.SPACE = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        _global.keyboard.ENTER = this.game.input.keyboard.addKey(Phaser.KeyCode.ENTER);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1400;

        this.game.state.start('title');
    }

}