'use strict'

var Map = function(row = 10, cols = 10){
  var self = this;

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

  this.grid = this.createEmptyMap(row, cols);

  this.isAnyTileAvailable = () => {
    for(var r of self.grid){
      if(r.indexOf(0) !== -1){
        return true;
      }
    }
    return false;
  }

  this.getRandomPosition = (rover = null) => {
    if(self.isAnyTileAvailable()){
      var valid = false;
      while(!valid){
        var row = Math.floor(Math.random() * self.grid.length);
        var col = Math.floor(Math.random() * self.grid[row].length);
        valid = self.grid[row][col] === 0;
      }
      
      if(rover){
        rover.printPosition(col, row);
      }

      return {row,col};
    }else{
      return false;
    }
  }

  this.getMapLimits = () => {
    return {minX: 0, maxX: self.grid[0].length - 1, minY: 0, maxY: self.grid.length - 1}
  };

  this.limits = this.getMapLimits();
  
  this.isInMapBounds = (x, y) => {
    return (x >= self.limits.minX && x <= self.limits.maxX && y >= self.limits.minY && y <= self.limits.maxY);
  };
  
  this.isFreeCell = (x, y) => {
    return self.isInMapBounds(x, y) && self.grid[y][x] === 0;
  };

  
  
}

var Rover = function(map, id = 0){

  var self = this;

  this.id = id;

  Rover.prototype.obstacleReached = () => {
    console.log("There is an obstacle in front of you!");
  }
  this.clearPosition = (x, y) => {
    map.grid[y][x] = 0;
  }
  this.printPosition = (x, y) => {
    map.grid[y][x] = self.id;
  }

  var initialPosition = map.getRandomPosition(this);

  if(!initialPosition){
    console.log("No hay ningún espacio disponible en el mapa");
    delete window[this];
    return;
  }

  this.x = initialPosition.col;
  this.y = initialPosition.row;
  this.direction = "N";

  this.getPositionX = () => self.x;
  this.getPositionY = () => self.y;
  this.travelLog = [{x: this.getPositionX(), y: this.getPositionY()}];

  // Motion
  this.turnLeft = () => {
    switch(self.direction){
      case 'N':
        self.direction = 'W';
      break;
      case 'W':
        self.direction = 'S';
      break;
      case 'S':
        self.direction = 'E';
      break;
      case 'E':
        self.direction = 'N';
      break;
      default:
        console.log("Rover direction is broken!!");
      break;
    }
  };

  this.turnRight = () => {
    switch(self.direction){
      case 'N':
        self.direction = 'E';
      break;
      case 'W':
        self.direction = 'N';
      break;
      case 'S':
        self.direction = 'W';
      break;
      case 'E':
        self.direction = 'S';
      break;
      default:
        console.log("Rover direction is broken!!");
      break;
    }
  };

  this.moveForward = () => {
    let nextMove;
    switch(self.direction){
      case 'N':
        nextMove = self.y - 1;
        if(!map.isFreeCell(self.x, nextMove)){
          self.obstacleReached();
        }else{
          self.clearPosition(self.x, self.y);
          self.y = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          self.printPosition(self.x, self.y);
        }
      break;
      case 'W':
        nextMove = self.x - 1;
        if(!map.isFreeCell(nextMove, self.y)){
          self.obstacleReached();
        }else{
          self.clearPosition(self.x, self.y);
          self.x = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          self.printPosition(self.x, self.y);
        }
      break;
      case 'S':
        nextMove = self.y + 1;
        if(!map.isFreeCell(self.x, nextMove)){
          self.obstacleReached();
        }else{
          self.clearPosition(self.x, self.y);
          self.y = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          self.printPosition(self.x, self.y);
        }
      break;
      case 'E':
        nextMove = self.x + 1;
        if(!map.isFreeCell(nextMove, self.y)){
          self.obstacleReached();
        }else{
          self.clearPosition(self.x, self.y);
          self.x = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          self.printPosition(self.x, self.y);
        }
      break;
      default:
        console.log("Rover engine is broken!!");
      break;
    }
  };

  this.moveBackward = () => {
    let nextMove;
    switch(self.direction){
      case 'N':
        nextMove = self.y + 1;
        if(!map.isFreeCell(self.x, nextMove)){
          self.obstacleReached();
        }else{
          self.clearPosition(self.x, self.y);
          self.y = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          self.printPosition(self.x, self.y);
        }
      break;
      case 'W':
        nextMove = self.x + 1;
        if(!map.isFreeCell(nextMove, self.y)){
          self.obstacleReached();
        }else{
          self.clearPosition(self.x, self.y);
          self.x = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          self.printPosition(self.x, self.y);
        }
      break;
      case 'S':
        nextMove = self.y - 1;
        if(!map.isFreeCell(self.x, nextMove)){
          self.obstacleReached();
        }else{
          self.clearPosition(self.x, self.y);
          self.y = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          self.printPosition(self.x, self.y);
        }
      break;
      case 'E':
        nextMove = self.x - 1;
        if(!map.isFreeCell(nextMove, self.y)){
          self.obstacleReached();
        }else{
          self.clearPosition(self.x, self.y);
          self.x = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          self.printPosition(self.x, self.y);
        }
      break;
      default:
        console.log("Rover engine is broken!!");
      break;
    }
  };

  this.prepareMoves = (list) => {
    var validMoves = ['f', 'l', 'r', 'b'];
    var movements = list.slice().split('');
    var fails = 0;

    for(var letter of movements){
      if(!validMoves.includes(letter)){
        fails += 1;
      }
    }
    
    if(fails <= 0){
      movements.forEach(move => {
        switch(move){
          case 'f':
            self.moveForward();
          break;
          case 'l':
            self.turnLeft();
          break;
          case 'r':
            self.turnRight();
          break;
          case 'b':
            self.moveBackward();
          break;
        }
      });
    }else{
      console.error("Some of the movements are not valid. The Rover stays in the same position.");
    }

    return self.travelLog;
  }

}

var map = new Map();
var rover = new Rover(map, 1);