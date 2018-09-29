
class Platforms {
    static forThroneRoom(game) {
        return {
            preload: () => game.load.spritesheet('platform', 'assets/platform.png'),
            create: () => {
                this.platforms = game.add.group(null, 'platforms', true, true, 0);
                this.platform = game.add.sprite(0, 420, 'platform', 0, this.platforms);
                this.platforms.forEach(platform => {
                    platform.body.immovable = true;
                    platform.body.allowGravity = false;
                }, this, false);
            },
            update: () => {}
        }
    }

}