var Tile = {
  self: this,
  tiles: [
    {
      id: 0,
      source: 'images/png32/sand/sand.png',
      isVisible: true,
      isObstacle: false,
    }
  ],
  getTileById: id => Tile.tiles.filter(tile => tile.id === id)[0],

}