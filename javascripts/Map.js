var Map = function(layout){
  var self = this;

  this.grid;
  this.limits;

  this.init = () => {
    self.grid = layout ? layout : self.createEmptyMap(Config.DEFAULT_MAP_ROWS, Config.DEFAULT_MAP_COLS);
    self.limits = self.getMapLimits();
  };

  Map.prototype.createEmptyMap = (rows, cols) => {
    var map = [];
    for(var i = 0; i < rows; i += 1){
      map.push([]);
      for(var j = 0; j < cols; j += 1){
        map[i].push(0);
      }
    }
    return map;
  };

  this.isAnyTileAvailable = () => {
    for(var r of self.grid){
      if(r.indexOf(0) !== -1){
        return true;
      }
    }
    return false;
  };

  this.getRandomPosition = () => {
    if(self.isAnyTileAvailable()){
      var valid = false;
      while(!valid){
        var {row, col} = self.getRandomCoord();
        valid = self.grid[row][col] === 0;
      }

      return {row,col};
    }
      
    return false;
  };

  this.getRandomCoord = () => {
    let row = Math.floor(Math.random() * self.grid.length);
    let col = Math.floor(Math.random() * self.grid[row].length);
    return {row,col};
  } 

  this.getMapLimits = () => {
    return {minX: 0, maxX: self.grid[0].length - 1, minY: 0, maxY: self.grid.length - 1}
  };
  
  this.isInMapBounds = (x, y) => {
    return (x >= self.limits.minX && x <= self.limits.maxX && y >= self.limits.minY && y <= self.limits.maxY);
  };
  
  this.isFreeCell = (x, y) => {
    return self.isInMapBounds(x, y) && self.grid[y][x] === 0;
  };

  this.addRover = (id, controls) => {
    if(self.isAnyTileAvailable()){
        let newRover = new Rover(id);
        newRover.setControls(controls);
        Game.rovers.push(newRover);
        Game.createCamera(newRover);
        return true;
    }else{
      console.log("¡No hay más espacio!");
    }
    return false;
  };

  this.print = () => {
    var sand = new Image();
    sand.src = 'images/png32/sand/sand.png';

    for(let i = 0, rows = Game.canvas.height/Config.TILE_HEIGHT; i < rows; i += 1){
      for(let j = 0, cols = Game.canvas.width/Config.TILE_WIDTH; j < cols; j += 1){
        if(this.grid[i] && (this.grid[i][j] || this.grid[i][j] === 0)){
          Common.drawBitMap(sand, Config.TILE_WIDTH * j + Config.TILE_WIDTH/2, Config.TILE_HEIGHT * i + Config.TILE_HEIGHT/2);
        }
      }
    }
  };

  this.printTilesOnScreen = () => {
    for(let i = Game.selectedCamera.view.top, rows = Game.selectedCamera.view.bottom; i < rows; i+= 1){
      for(let j = Game.selectedCamera.view.left, cols = Game.selectedCamera.view.right; j < cols; j += 1){
        self.printTile(j, i);
      }
    }
  };

  this.tileExists = (x, y) => {
    try{
      this.grid[y][x];
      return true;
    }catch(e){
      return false;
    }
  }; 

  this.getTileType = (x, y) => {
    if(self.tileExists(x, y)){
      var response = false;
      var currentTile = this.grid[y][x];
      var foundTile = Tile.getTileById(currentTile);
      
      if(foundTile){
        response = foundTile;
      }

      return response;
    }
  };

  this.printTile = (x, y) => {
    var image = new Image();
    var tile = self.getTileType(x, y);
    if(tile){
      image.src = tile.source;
      var posY = y * Config.TILE_HEIGHT + Config.TILE_HEIGHT/2;
      var posX = x * Config.TILE_WIDTH + Config.TILE_WIDTH/2;

      Common.drawBitMap(image, posX, posY);
    }      
      
  };

  // Execution
  this.init();
  
}