var Rover = function(id = 0){

  var self = this;

  this.id;
  this.image;
  this.x;
  this.y;
  this.direction;
  this.travelLog;
  this.controls;

  this.init = function(){
    self.id = id;
    self.getInitialPosition();
    // self.x = 0;
    // self.y = 0;
    self.image = new Image();
    self.image.src = 'images/svg/rover/rover-back.svg';
    self.direction = "N";
    self.travelLog = [{x: self.getPositionX(), y: self.getPositionY()}];
    self.controls = Controls.presets.primary;
  }

  Rover.prototype.obstacleReached = () => {
    console.log("There is an obstacle in front of you!");
  }

  this.getInitialPosition = () => {
    var position = Game.map.getRandomPosition(this);

    if(position){
      this.x = position.col;
      this.y = position.row;
    }

  }

  this.getPositionX = () => self.x;

  this.getPositionY = () => self.y;

  // this.clearPosition = (x, y) => {
  //   Game.map.grid[y][x] = 0;
  // }

  // this.printPosition = (x, y) => {
  //   Game.map.grid[y][x] = -self.id;
  // }

  this.setControls = (preset) => {
    switch(preset){
      case 'primary':
        self.controls = Controls.presets.primary;
      break;
      case 'secondary':
        self.controls = Controls.presets.secondary;
      break;
    }
  }  

  this.turnLeft = () => {
    switch(self.direction){
      case 'N':
        self.direction = 'W';
        this.image.src = 'images/svg/rover/rover-left.svg';
      break;
      case 'W':
        self.direction = 'S';
        this.image.src = 'images/svg/rover/rover-front.svg';
      break;
      case 'S':
        self.direction = 'E';
        this.image.src = 'images/svg/rover/rover-right.svg';
      break;
      case 'E':
        self.direction = 'N';
        this.image.src = 'images/svg/rover/rover-back.svg';
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
        this.image.src = 'images/svg/rover/rover-right.svg';
      break;
      case 'W':
        self.direction = 'N';
        this.image.src = 'images/svg/rover/rover-back.svg';
      break;
      case 'S':
        self.direction = 'W';
        this.image.src = 'images/svg/rover/rover-left.svg';
      break;
      case 'E':
        self.direction = 'S';
        this.image.src = 'images/svg/rover/rover-front.svg';
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
        if(!Game.map.isFreeCell(self.x, nextMove)){
          self.obstacleReached();
        }else{
          // self.clearPosition(self.x, self.y);
          self.y = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          // self.printPosition(self.x, self.y);
        }
      break;
      case 'W':
        nextMove = self.x - 1;
        if(!Game.map.isFreeCell(nextMove, self.y)){
          self.obstacleReached();
        }else{
          // self.clearPosition(self.x, self.y);
          self.x = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          // self.printPosition(self.x, self.y);
        }
      break;
      case 'S':
        nextMove = self.y + 1;
        if(!Game.map.isFreeCell(self.x, nextMove)){
          self.obstacleReached();
        }else{
          // self.clearPosition(self.x, self.y);
          self.y = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          // self.printPosition(self.x, self.y);
        }
      break;
      case 'E':
        nextMove = self.x + 1;
        if(!Game.map.isFreeCell(nextMove, self.y)){
          self.obstacleReached();
        }else{
          // self.clearPosition(self.x, self.y);
          self.x = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          // self.printPosition(self.x, self.y);
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
        if(!Game.map.isFreeCell(self.x, nextMove)){
          self.obstacleReached();
        }else{
          // self.clearPosition(self.x, self.y);
          self.y = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          // self.printPosition(self.x, self.y);
        }
      break;
      case 'W':
        nextMove = self.x + 1;
        if(!Game.map.isFreeCell(nextMove, self.y)){
          self.obstacleReached();
        }else{
          // self.clearPosition(self.x, self.y);
          self.x = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          // self.printPosition(self.x, self.y);
        }
      break;
      case 'S':
        nextMove = self.y - 1;
        if(!Game.map.isFreeCell(self.x, nextMove)){
          self.obstacleReached();
        }else{
          // self.clearPosition(self.x, self.y);
          self.y = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          // self.printPosition(self.x, self.y);
        }
      break;
      case 'E':
        nextMove = self.x - 1;
        if(!Game.map.isFreeCell(nextMove, self.y)){
          self.obstacleReached();
        }else{
          // self.clearPosition(self.x, self.y);
          self.x = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          // self.printPosition(self.x, self.y);
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

  this.print = () => {
    if((this.x || this.y) || (this.x === 0 && this.y === 0)){
      Common.drawBitMap(this.image , (this.x * TILE_WIDTH) + TILE_WIDTH/2 ,(this.y * TILE_HEIGHT) + TILE_HEIGHT/2);
    } 
  }

  // Execution
  this.init();
}