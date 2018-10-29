export default {
    "world": {
        "bounds": {"x": 8, "y": 1},
        "key": "tutorial",
        "map": {
            "path": "assets/tilemaps/tutorial-room.json",
            "layers": [
                {"name": "bg", "collidable": false},
                {"name": "chandeliers", "collidable": false},
                {"name": "door", "collidable": false},
                {"name": "platforms", "collidable": true, "collidableTileRange": {"first": 2, "last": 2}},
            ]
        },
        "assets": [
            {"key": "castle", "path": "assets/tilemaps/castle.png"}
        ]
    },

    "enemies": [
        {
            "origin": {"x": 3000, "y": 300},
            "type": "knight-small"
        }
    ]
}