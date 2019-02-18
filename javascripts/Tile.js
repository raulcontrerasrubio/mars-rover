var Tile = {
  tiles: [
    {
      id: 0,
      image: 'tile_0',
      isVisible: true,
      isObstacle: false,
      accessTo: {
        up: true,
        down: true,
        left: true,
        right: true
      },
      accessFrom: {
        up: true,
        down: true,
        left: true,
        right: true
      },
      activation: () => {}
    },
    {
      id: 1,
      image: 'tile_1',
      isVisible: true,
      isObstacle: false,
      accessTo: {
        up: false,
        down: true,
        left: true,
        right: true
      },
      accessFrom: {
        up: false,
        down: true,
        left: true,
        right: true
      },
      activation: () => {}
    },
    {
      id: 2,
      image: 'tile_2',
      isVisible: true,
      isObstacle: false,
      accessTo: {
        up: true,
        down: false,
        left: true,
        right: true
      },
      accessFrom: {
        up: true,
        down: false,
        left: true,
        right: true
      },
      activation: () => {}
    },
    {
      id: 3,
      image: 'tile_3',
      isVisible: true,
      isObstacle: false,
      accessTo: {
        up: true,
        down: true,
        left: true,
        right: false
      },
      accessFrom: {
        up: true,
        down: true,
        left: true,
        right: false
      },
      activation: () => {}
    },
    {
      id: 4,
      image: 'tile_4',
      isVisible: true,
      isObstacle: false,
      accessTo: {
        up: true,
        down: true,
        left: false,
        right: true
      },
      accessFrom: {
        up: true,
        down: true,
        left: false,
        right: true
      },
      activation: () => {}
    },
    {
      id: 5,
      image: 'tile_5',
      isVisible: true,
      isObstacle: false,
      accessTo: {
        up: false,
        down: true,
        left: true,
        right: false
      },
      accessFrom: {
        up: false,
        down: true,
        left: true,
        right: false
      },
      activation: () => {}
    },
    {
      id: 6,
      image: 'tile_6',
      isVisible: true,
      isObstacle: false,
      accessTo: {
        up: false,
        down: true,
        left: false,
        right: true
      },
      accessFrom: {
        up: false,
        down: true,
        left: false,
        right: true
      },
      activation: () => {}
    },
    {
      id: 7,
      image: 'tile_7',
      isVisible: true,
      isObstacle: false,
      accessTo: {
        up: true,
        down: false,
        left: true,
        right: false
      },
      accessFrom: {
        up: true,
        down: false,
        left: true,
        right: false
      },
      activation: () => {}
    },
    {
      id: 8,
      image: 'tile_8',
      isVisible: true,
      isObstacle: false,
      accessTo: {
        up: true,
        down: false,
        left: false,
        right: true
      },
      accessFrom: {
        up: true,
        down: false,
        left: false,
        right: true
      },
      activation: () => {}
    },
    {
      id: 9,
      image: 'tile_9',
      isVisible: true,
      isObstacle: false,
      accessTo: {
        up: false,
        down: true,
        left: true,
        right: true
      },
      accessFrom: {
        up: false,
        down: true,
        left: true,
        right: true
      },
      activation: () => {}
    },
    {
      id: 10,
      image: 'tile_10',
      isVisible: true,
      isObstacle: false,
      accessTo: {
        up: true,
        down: true,
        left: false,
        right: true
      },
      accessFrom: {
        up: true,
        down: true,
        left: false,
        right: true
      },
      activation: () => {}
    },
    {
      id: 11,
      image: 'tile_11',
      isVisible: true,
      isObstacle: false,
      accessTo: {
        up: true,
        down: true,
        left: false,
        right: true
      },
      accessFrom: {
        up: true,
        down: true,
        left: false,
        right: true
      },
      activation: () => {}
    },
    {
      id: 12,
      image: 'tile_12',
      isVisible: true,
      isObstacle: false,
      accessTo: {
        up: true,
        down: false,
        left: true,
        right: true
      },
      accessFrom: {
        up: true,
        down: false,
        left: true,
        right: true
      },
      activation: () => {}
    },
  ],
  getTileById: id => Tile.tiles.filter(tile => tile.id === id)[0],
  getAccesibleToDirectionTilesId: (toDirection = null) => {
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
  },
  getAccesibleFromDirectionTilesId: (fromDirection = null) => {
    let accesibleTiles = Tile.tiles.filter(tile => {
      if(fromDirection){
        let response;
        switch(fromDirection){
          case 'up':
            response = tile.accessFrom.up;
          break;
          case 'down':
            response = tile.accessFrom.down;
          break;
          case 'left':
            response = tile.accessFrom.left;
          break;
          case 'right':
            response = tile.accessFrom.right;
          break;
        }
        return response;
      }else{
        for(let direction in tile.accessFrom){
          if(tile.accessFrom[direction]){
            return true;
          }
        }
        return false;
      }
    });
    return accesibleTiles.map(tile => tile.id);
  },
  loadTileImage: () => {
    for(let tile of Tile.tiles){
      let key = tile.image;
      tile.image = ImageManager.loadedImages[key];
    }
  }

}