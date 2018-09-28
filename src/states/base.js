
/**
 * The base that all other states inherit from. 
 * It predefine the constuctor and asJson() method
 * so we don't have to later.
 */
class BaseState {
    constructor(game) {
        this.game = game;
    }

    preload() {}
    create() {}
    update() {}

    asJson() {
        return {
            preload: this.preload,
            create: this.create,
            update: this.update
        }
    }
}