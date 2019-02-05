var Rover = function(id = 0){

  var self = this;

  this.id = id;
  this.image = new Image();
  this.image.src = this.image.src = 'images/rover-back.svg';

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
        this.image.src = 'images/rover-left.svg';
      break;
      case 'W':
        self.direction = 'S';
        this.image.src = 'images/rover-front.svg';
      break;
      case 'S':
        self.direction = 'E';
        this.image.src = 'images/rover-right.svg';
      break;
      case 'E':
        self.direction = 'N';
        this.image.src = 'images/rover-back.svg';
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
        this.image.src = 'images/rover-right.svg';
      break;
      case 'W':
        self.direction = 'N';
        this.image.src = 'images/rover-back.svg';
      break;
      case 'S':
        self.direction = 'W';
        this.image.src = 'images/rover-left.svg';
      break;
      case 'E':
        self.direction = 'S';
        this.image.src = 'images/rover-front.svg';
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

  this.print = function(){
    drawBitMap(ctx, this.image , (this.x * TILE_WIDTH) + TILE_WIDTH/2 ,(this.y * TILE_HEIGHT) + TILE_HEIGHT/2);
  }

  this.controls = Controls.presets.primary;
  this.setControls = function(preset){
    switch(preset){
      case 'primary':
        self.controls = Controls.presets.primary;
      break;
      case 'secondary':
        self.controls = Controls.presets.secondary;
      break;
    }
  }

}