var map = createMap(10, 10);
var limits = getMapLimits(map);

// Rover Object Goes Here
// ======================
var Rover = function(){

  var self = this;

  Rover.prototype.getPositionX = () => self.x;
  Rover.prototype.getPositionY = () => self.y;
  
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
    switch(self.direction){
      case 'N':
        if(self.y - 1 < limits.minY){
          console.log("You reached the north limit of the map!")
        }else{
          self.y -= 1;
          self.travelLog.push({x:self.x, y: self.y});
        }
      break;
      case 'W':
        if(self.x - 1 < limits.minX){
          console.log("You reached the west limit of the map!")
        }else{
          self.x -= 1;
          self.travelLog.push({x:self.x, y: self.y});
        }
      break;
      case 'S':
        if(self.y + 1 > limits.maxY){
          console.log("You reached the south limit of the map!")
        }else{
          self.y += 1;
          self.travelLog.push({x:self.x, y: self.y});
        }
      break;
      case 'E':
        if(self.x + 1 > limits.maxX){
          console.log("You reached the east limit of the map!")
        }else{
          self.x += 1;
          self.travelLog.push({x:self.x, y: self.y});
        }
      break;
      default:
        console.log("Rover engine is broken!!");
      break;
    }
  };

  Rover.prototype.moveBackward = () => {
    switch(self.direction){
      case 'N':
        if(self.y + 1 > limits.maxY){
          console.log("You reached the north limit of the map!")
        }else{
          self.y += 1;
          self.travelLog.push({x:self.x, y: self.y});
        }
      break;
      case 'W':
        if(self.x + 1 > limits.maxX){
          console.log("You reached the west limit of the map!")
        }else{
          self.x += 1;
          self.travelLog.push({x:self.x, y: self.y});
        }
      break;
      case 'S':
        if(self.y - 1 < limits.minY){
          console.log("You reached the south limit of the map!")
        }else{
          self.y -= 1;
          self.travelLog.push({x:self.x, y: self.y});
        }
      break;
      case 'E':
        if(self.x - 1 < limits.minX){
          console.log("You reached the east limit of the map!")
        }else{
          self.x -= 1;
          self.travelLog.push({x:self.x, y: self.y});
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
// ======================

function createMap(rows, cols){
  var map = [];
  for(var i = 0; i < rows; i += 1){
    map.push([]);
    for(var j = 0; j < cols; j += 1){
      map[i].push(0);
    }
  }

  return map;
}

function getRandomPosition(grid){
  var row = Math.floor(Math.random() * grid.length);
  var col = Math.floor(Math.random() * grid[row].length);
  return {row,col};
}

function getMapLimits(grid){
  return {minX: 0, maxX: grid[0].length - 1, minY: 0, maxY: grid.length - 1}
}