
class Platforms {
    static forThroneRoom(game) {
        return {
            preload: () => {
                game.load.spritesheet('small-platform', 'assets/platforms/small.png');
                game.load.spritesheet('medium-platform', 'assets/platforms/medium.png');
                game.load.spritesheet('large-platform', 'assets/platforms/large.png');
            },

            create: () => {
                this.platforms = game.add.group(null, 'platforms', true, true, 0);

                let ground = game.add.sprite(0, CANVAS_HEIGHT-40, 'large-platform', 0, this.platforms);
                ground.scale.setTo(4.5, 1);

                let large = game.add.sprite(CANVAS_WIDTH/2, 200, 'large-platform', 0, this.platforms);
                large.anchor.setTo(0.5);
                large.scale.setTo(2, 0.8);

                let medium1 = game.add.sprite(20, 290, 'small-platform', 0, this.platforms);
                medium1.scale.setTo(1, 0.7);

                let medium2 = game.add.sprite(CANVAS_WIDTH-20-60, 290, 'small-platform', 0, this.platforms);
                medium2.scale.setTo(1, 0.7);



                this.platforms.forEach(platform => {
                    platform.body.immovable = true;
                    platform.body.allowGravity = false;
                }, this, false);
            },

            update: () => {}
        }
    }

}