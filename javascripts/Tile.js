var Tile = {
  // self: this,
  tiles: [
    {
      id: 0,
      source: 'images/png32/sand/sand.png',
      isVisible: true, // ¿Es necesario?
      isObstacle: false,
      accesibleFrom: {
        up: true,
        down: true,
        left: false,
        right: true
      },
      activation: () => {} // Sirve para otorgarle funcionalidad a la baldosa.
    },
    {
      id: 1,
      source: 'images/png32/sand/sand.png',
      isVisible: true, // ¿Es necesario?
      isObstacle: false,
      accesibleFrom: {
        up: false,
        down: true,
        left: true,
        right: true
      },
      activation: () => {} // Sirve para otorgarle funcionalidad a la baldosa.
    }
  ],
  getTileById: id => Tile.tiles.filter(tile => tile.id === id)[0],
  getAccesibleTilesId: (fromDirection = null) => {
    let accesibleTiles = Tile.tiles.filter(tile => {
      if(fromDirection){
        let response;
        switch(fromDirection){
          case 'up':
            response = tile.accesibleFrom.up;
          break;
          case 'down':
            response = tile.accesibleFrom.down;
          break;
          case 'left':
            response = tile.accesibleFrom.left;
          break;
          case 'right':
            response = tile.accesibleFrom.right;
          break;
        }
        return response;
      }else{
        for(let direction in tile.accesibleFrom){
          if(tile.accesibleFrom[direction]){
            return true;
          }
        }
        return false;
      }
    });
    return accesibleTiles.map(tile => tile.id);
  }

}