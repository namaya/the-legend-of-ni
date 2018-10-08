

class Preload extends BaseState {

    preload() {
        this.game.load.bitmapFont('alagard', 'assets/fonts/alagard.png', 'assets/fonts/alagard.fnt');
        this.game.load.audio('bossmusic','assets/sounds/bossmusic.mp3');
        this.game.load.audio('ouch','assets/sounds/ouch.mp3');
        //this.game.load.image('rock', 'assets/rock.png');
        this.game.load.tilemap('room', 'assets/tilemaps/castle.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('castle', 'assets/tilemaps/castle.png');

        _global.sprites.xavier.preload();
        _global.sprites.megaknight.preload();
    }

    create() {
        _global.keyboard.A = this.game.input.keyboard.addKey(Phaser.KeyCode.A);
        _global.keyboard.D = this.game.input.keyboard.addKey(Phaser.KeyCode.D);
        _global.keyboard.W = this.game.input.keyboard.addKey(Phaser.KeyCode.W);
        _global.keyboard.K = this.game.input.keyboard.addKey(Phaser.KeyCode.K);
        _global.keyboard.SPACE = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

        _global.sprites.xavier = new Xavier(this.game);
        _global.sprites.megaknight = new MegaKnight(this.game);

        // _global.maps.throneRoom = this.game.add.tilemap('room', 64, 64);
        // _global.maps.throneRoom.addTilesetImage('castle');
        // _global.maps.throneRoom.createLayer('bg');
        // _global.maps.throneRoom.platforms = _global.maps.throneRoom.createLayer('platforms');
        // _global.maps.throneRoom.setCollisionBetween(2, 2, true, _global.maps.throneRoom.platforms)

        this.game.state.start('title');
    }

}