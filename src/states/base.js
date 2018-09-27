

class BaseState {
    constructor(game) {
        this.game = game;
    }

    preload() {}
    create() {}
    update() {}

    asObject() {
        return {
            preload: this.preload,
            create: this.create,
            update: this.update
        }
    }
}