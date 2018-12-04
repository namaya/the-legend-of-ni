export default {
  'world': {
    'bounds': { 'x': 1536, 'y': 960 },
    'key': 'entrance',
    'map': {
      'path': 'assets/maps/entrance/map.json',
      'layers': [
        { 'name': 'sunset', 'collidable': false },
        { 'name': 'platforms', 'collidable': true, 'collidableTileRange': { 'first': 1351, 'last': 1352 } }
      ],
      'assets': [
        { 'key': 'bossentrancebackground', 'path': 'assets/maps/entrance/sunset-entrance.png' },
        { 'key': 'brickwall', 'path': 'assets/maps/brickwall.png' }
      ],
      'objects': {
        'door': { 'gid': 1355 },
        'spikes': { 'gid': 1126, 'image': 'spike-1' },
        'springs': { 'gid': 1355 },
        'switches': { 'gid': 1355, 'image': 'switch' }
      }
    }
  },
  'origin': { 'x': 5, 'y': 40 }
}
