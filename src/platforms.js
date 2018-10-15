
class Platforms {

    static preload(game) {
        game.load.tileset()
    }

    static forThroneRoom(game) {
        return {
            preload: () => {
                game.load.tilemap('throne-room', 'assets/platforms/small.png');
            },

            create: () => {
                let map = this.game.add.tilemap('throne-room', 32, 32);
                map.addTilesetImage('castle');
                map.createLayer('bg');
                this.platforms = map.createLayer('platforms');
                map.setCollisionBetween(2, 2, true, this.platforms)
                map.createLayer('chandeliers');
            },

            update: () => {}
        }
    }

}
