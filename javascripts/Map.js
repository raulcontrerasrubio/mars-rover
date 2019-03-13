var Map = function(layout){
  this.grid = layout ? layout : this.createEmptyMap(Config.DEFAULT_MAP_ROWS, Config.DEFAULT_MAP_COLS);
  this.actors = [];
};

Map.prototype.createEmptyMap = function(rows, cols){
  var map = [];
  for(var i = 0; i < rows; i += 1){
    map.push([]);
    for(var j = 0; j < cols; j += 1){
      map[i].push(0);
    }
  }
  return map;
};

Map.prototype.isAnyTileAvailable = function(){
  let listOfAvailableTilesId = Tile.getAccesibleToDirectionTilesId();
  return listOfAvailableTilesId.filter(id => {
    for(var r of this.grid){
      if(r.indexOf(id) !== -1){
        return true;
      }
    }
    return false;
  }).length !== 0;
};

Map.prototype.getRandomPosition = function(){
  if(this.isAnyTileAvailable()){
    let validId = Tile.getAccesibleToDirectionTilesId();
    var valid = false;
    while(!valid){
      var {row, col} = this.getRandomCoord();
      valid = validId.includes(this.grid[row][col]);
    }
    return {row,col};
  }
  return false;
};

Map.prototype.getRandomCoord = function(){
  let row = Math.floor(Math.random() * this.grid.length);
  let col = Math.floor(Math.random() * this.grid[row].length);
  return {row,col};
};

Map.prototype.isValidRow = function(y){
  return y >= 0 && this.grid[y];
};

Map.prototype.canAccessFrom = function(x, y, direction){
  if(y < 0){return false;}
  if(y > this.grid.length - 1){ return false;}
  if(x < 0){return false;}
  if(x > this.grid[y].length - 1){return false;}

  return Tile.getAccesibleFromDirectionTilesId(direction).includes(this.grid[y][x]);
};

Map.prototype.canAccessTo = function(x, y, direction){
  if(y < 0){return false;}
  if(y > this.grid.length - 1){ return false;}
  if(x < 0){return false;}
  if(x > this.grid[y].length - 1){return false;}

  return Tile.getAccesibleToDirectionTilesId(direction).includes(this.grid[y][x]);
};

Map.prototype.isAnyObstacleActor = function(x, y){
  let obstacles = this.actors.filter(actor => actor.isObstacle);
  for(let obstacle of obstacles){
    if(obstacle.position.x === x && obstacle.position.y === y){
      return true;
    }
  }
  return false;
};

Map.prototype.isFreeCell = function(x, y, direction){
  return this.isValidRow(y) && this.isAnyObstacleActor(x, y) && this.canAccessTo(x, y, direction);
};

Map.prototype.addRover = function(id, controls){
  if(this.isAnyTileAvailable()){
      let newRover = new Rover(id);
      newRover.setControls(controls);
      this.actors.push(newRover);
      Game.createCamera(newRover);
      return true;
  }else{
    console.log("¡No hay más espacio!");
  }
  return false;
};

Map.prototype.printTilesOnScreen = function(){
  for(let i = Game.selectedCamera.view.top, rows = Game.selectedCamera.view.bottom; i < rows; i+= 1){
    for(let j = Game.selectedCamera.view.left, cols = Game.selectedCamera.view.right; j < cols; j += 1){
      this.printTile(j, i);
    }
  }
};

Map.prototype.tileExists = function(x, y){
  try{
    this.grid[y][x];
    return true;
  }catch(e){
    return false;
  }
};

Map.prototype.getTileType = function(x, y){
  if(this.tileExists(x, y)){
    var response = false;
    var currentTile = this.grid[y][x];
    var foundTile = Tile.getTileById(currentTile);
    
    if(foundTile){
      response = foundTile;
    }

    return response;
  }
};

Map.prototype.printTile = function(x, y){
  var tile = this.getTileType(x, y);
  if(tile && tile.image){
    var posY = y * Config.TILE_HEIGHT + Config.TILE_HEIGHT/2;
    var posX = x * Config.TILE_WIDTH + Config.TILE_WIDTH/2;
    
    Common.drawBitMap(tile.image, posX, posY);
  }        
};