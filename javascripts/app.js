'use strict'

var map = createEmptyMap(10, 10);
var limits = getMapLimits(map);

function createEmptyMap(rows, cols){
  var map = [];
  for(var i = 0; i < rows; i += 1){
    map.push([]);
    for(var j = 0; j < cols; j += 1){
      map[i].push(0);
    }
  }
  return map;
}

function getRandomPosition(grid, rover = null){
  // Check if there is any position available
  var anyAvailable = false;
  for(var r of grid){
    if(r.indexOf(0) !== -1){
      anyAvailable = true;
      break;
    }
  }

  if(anyAvailable){
    var valid = false;
    while(!valid){
      var row = Math.floor(Math.random() * grid.length);
      var col = Math.floor(Math.random() * grid[row].length);
      valid = grid[row][col] === 0;
    }
    
    if(rover){
      rover.printPosition(col, row);
    }

    return {row,col};
  }else{
    return false;
  }
  
}

function getMapLimits(grid){
  return {minX: 0, maxX: grid[0].length - 1, minY: 0, maxY: grid.length - 1}
}

function isInMapBounds(x, y){
  return (x >= limits.minX && x <= limits.maxX && y >= limits.minY && y <= limits.maxY);
}

function isFreeCell(x, y){
  return isInMapBounds(x, y) && map[y][x] === 0;
}

var Rover = function(id = 0){

  var self = this;

  this.id = id;

  Rover.prototype.obstacleReached = () => {
    console.log("There is an obstacle in front of you!");
  }
  this.clearPosition = (x, y) => {
    map[y][x] = 0;
  }
  this.printPosition = (x, y) => {
    map[y][x] = self.id;
  }

  var initialPosition = getRandomPosition(map, this);

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
        if(!isFreeCell(self.x, nextMove)){
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
        if(!isFreeCell(nextMove, self.y)){
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
        if(!isFreeCell(self.x, nextMove)){
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
        if(!isFreeCell(nextMove, self.y)){
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
        if(!isFreeCell(self.x, nextMove)){
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
        if(!isFreeCell(nextMove, self.y)){
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
        if(!isFreeCell(self.x, nextMove)){
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
        if(!isFreeCell(nextMove, self.y)){
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