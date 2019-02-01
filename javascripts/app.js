'use strict'

var map = createEmptyMap(10, 10);
var limits = getMapLimits(map);

function getRandomPosition(grid){
  var row = Math.floor(Math.random() * grid.length);
  var col = Math.floor(Math.random() * grid[row].length);
  return {row,col};
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

  Rover.prototype.getPositionX = () => self.x;
  Rover.prototype.getPositionY = () => self.y;
  Rover.prototype.clearPosition = (x, y) => {
    map[y][x] = 0;
  }
  Rover.prototype.printPosition = (x, y) => {
    map[y][x] = self.id;
  }

  Rover.prototype.obstacleReached = () => {
    console.log("There is an obstacle in front of you!");
  }

  this.id = id;
  this.x = getRandomPosition(map).col;
  this.y = getRandomPosition(map).row;
  this.direction = "N";
  this.travelLog = [{x: this.getPositionX(), y: this.getPositionY()}];

  Rover.prototype.turnLeft = () => {
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

  Rover.prototype.turnRight = () => {
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

  Rover.prototype.moveForward = () => {
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

  Rover.prototype.moveBackward = () => {
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

  Rover.prototype.prepareMoves = (list) => {
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