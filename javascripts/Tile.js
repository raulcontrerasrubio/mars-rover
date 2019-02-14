var Tile = {
  // self: this,
  tiles: [
    {
      id: 0,
      source: 'images/png32/sand/sand.png',
      isVisible: true, // ¿Es necesario?
      isObstacle: false,
      accessTo: {
        up: true,
        down: true,
        left: true,
        right: true
      },
      activation: () => {} // Sirve para otorgarle funcionalidad a la baldosa.
    },
    {
      id: 1,
      source: 'images/png32/sand/sand.png',
      isVisible: true, // ¿Es necesario?
      isObstacle: false,
      accessTo: {
        up: false,
        down: false,
        left: false,
        right: false
      },
      activation: () => {} // Sirve para otorgarle funcionalidad a la baldosa.
    }
  ],
  getTileById: id => Tile.tiles.filter(tile => tile.id === id)[0],
  getAccesibleTilesId: (toDirection = null) => {
    let accesibleTiles = Tile.tiles.filter(tile => {
      if(toDirection){
        let response;
        switch(toDirection){
          case 'up':
            response = tile.accessTo.up;
          break;
          case 'down':
            response = tile.accessTo.down;
          break;
          case 'left':
            response = tile.accessTo.left;
          break;
          case 'right':
            response = tile.accessTo.right;
          break;
        }
        return response;
      }else{
        for(let direction in tile.accessTo){
          if(tile.accessTo[direction]){
            return true;
          }
        }
        return false;
      }
    });
    return accesibleTiles.map(tile => tile.id);
  }

}