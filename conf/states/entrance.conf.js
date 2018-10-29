export default {
    "world": {
        "bounds": {"x": 3, "y": 2},
        "key": "entrance",
        "map": {
            "path": "/assets/tilemaps/BossEntranceTileMap3.json",
            "layers": [
                {"name": "sunset", "collidable": false},
                {"name": "bricks", "collidable": true, "collidableTileRange": {"first": 1351, "last": 1352}},
                {"name": "spikes", "collidable": true, "collidableTileRange": {"first": 1353, "last": 1354}},
            ]
        },
        "assets": [
            {"key": "bossentrancebackground", "path": "/assets/tilemaps/bosslevelentrancebackground.png"},
            {"key": "brickwall", "path": "/assets/tilemaps/brickwall.png"},
            {"key": "spike32x64", "path": "/assets/tilemaps/spike32x64.png"},
        ]
    },

    "enemies": [
        {
            "origin": {"x": 3000, "y": 300},
            "type": "knight-small"
        }
    ]
}