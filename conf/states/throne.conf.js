export default {
    "world": {
        "bounds": {"x": 2, "y": 1.3333},
        "key": "throneroomtilemap",
        "map": {
            "path": "/assets/tilemaps/throne-room/ThroneRoomBg.json",
            "layers": [
                {"name": "wall", "collidable": false},
                {"name": "windows", "collidable": false},
                {"name": "columns", "collidable": false},
                {"name": "platforms", "collidable": true, "collidableTileRange": {"first": 1, "last": 1000}},
            ]
    // _create_bg() {
    //     let map = this.game.add.tilemap('throneroomtilemap', 32, 32);
    //     map.addTilesetImage('window-w-sunset');
    //     map.addTilesetImage('throneroombg');
    //     map.addTilesetImage('ceiling');
    //     map.addTilesetImage('column');
    //     map.addTilesetImage('floor');
    //     map.addTilesetImage('lightin');
    //     map.addTilesetImage('throne');
    //     map.createLayer('wall');
    //     map.createLayer('windows');
    //     map.createLayer('columns');
    //     this.platforms = map.createLayer('platforms');
    //     map.setCollisionBetween(1, 1000, true, this.platforms);
    // }
        // this.game.load.tilemap('throneroomtilemap', 'assets/tilemaps/throne-room/ThroneRoomBg.json', null, Phaser.Tilemap.TILED_JSON);
        // this.game.load.image('window-w-sunset', 'assets/tilemaps/throne-room/window-w-sunset.png');
        // this.game.load.image('throneroombg', 'assets/tilemaps/throne-room/throneroombg.png');
        // this.game.load.image('ceiling', 'assets/tilemaps/throne-room/ceiling.png');
        // this.game.load.image('column', 'assets/tilemaps/throne-room/column.png');
        // this.game.load.image('floor', 'assets/tilemaps/throne-room/floor.png');
        // this.game.load.image('lightin', 'assets/tilemaps/throne-room/lightin.png');
        // this.game.load.image('throne', 'assets/tilemaps/throne-room/throne.png');


        },
        "assets": [
            {"key": "window-w-sunset", "path": "assets/tilemaps/throne-room/window-w-sunset.png"},
            {"key": "throneroombg", "path": "assets/tilemaps/throne-room/throneroombg.png"},
            {"key": "ceiling", "path": "assets/tilemaps/throne-room/ceiling.png"},
            {"key": "column", "path": "assets/tilemaps/throne-room/column.png"},
            {"key": "floor", "path": "assets/tilemaps/throne-room/floor.png"},
            {"key": "lightin", "path": "assets/tilemaps/throne-room/lightin.png"},
            {"key": "throne", "path": "assets/tilemaps/throne-room/throne.png"},
        ]
    },

    "enemies": [
        {
            "origin": {"x": 3000, "y": 300},
            "type": "knight-small"
        }
    ]
}