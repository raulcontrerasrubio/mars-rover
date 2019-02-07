var Map = function(layout){
  var self = this;

  this.grid;
  this.limits;

  this.init = () => {
    self.grid = layout ? layout : self.createEmptyMap(DEFAULT_MAP_ROWS, DEFAULT_MAP_COLS);
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

  this.getRandomPosition = (rover = null) => {
    if(self.isAnyTileAvailable()){
      var valid = false;
      while(!valid){
        var row = Math.floor(Math.random() * self.grid.length);
        var col = Math.floor(Math.random() * self.grid[row].length);
        valid = self.grid[row][col] === 0;
      }
      
      // if(rover){
      //   rover.printPosition(col, row);
      // }

      return {row,col};
    }
      
    return false;
  };

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
        return true;
    }else{
      console.log("¡No hay más espacio!");
    }
    return false;
  };

  this.print = () => {
    var sand = new Image();
    sand.src = 'images/png32/sand/sand.png';

    for(let i = 0, rows = CANVAS_HEIGHT/TILE_HEIGHT; i < rows; i += 1){
      for(let j = 0, cols = CANVAS_WIDTH/TILE_WIDTH; j < cols; j += 1){
        if(this.grid[i] && (this.grid[i][j] || this.grid[i][j] === 0)){
          Common.drawBitMap(sand, TILE_WIDTH * j + TILE_WIDTH/2, TILE_HEIGHT * i + TILE_HEIGHT/2);
        }
      }
    }
  };

  this.printTilesOnScreen = () => {
    var sand = new Image();
    sand.src = 'images/png32/sand/sand.png';

    for(let i = Game.selectedCamera.view.top, rows = Game.selectedCamera.view.bottom; i < rows; i+= 1){
      for(let j = Game.selectedCamera.view.left, cols = Game.selectedCamera.view.right; j < cols; j += 1){
        self.printTile(i, j);
      }
    }
  };

  this.tileExists = (y, x) => {
    try{
      this.grid[y][x];
      return true;
    }catch(e){
      return false;
    }
  }; 

  this.checkTileType = (y, x) => {
    if(self.tileExists(y, x)){
      var image = new Image();
      var response = false;
      switch(this.grid[y][x]){
        case 0:
          response = {obj: image, source: 'images/png32/sand/sand.png'};
      }
      return response;
    }
  };

  this.printTile = (y, x) => {
    var image = self.checkTileType(y, x);
    if(image){
      image.obj.src = image.source;
      var posY = y * TILE_HEIGHT + TILE_HEIGHT/2;
      var posX = x * TILE_WIDTH + TILE_WIDTH/2;

      Common.drawBitMap(image.obj, posX, posY);
    }      
      
  };

  // Execution
  this.init();
  
}