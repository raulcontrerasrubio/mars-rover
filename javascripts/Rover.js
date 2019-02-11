var Rover = function(id = 0){

  var self = this;

  this.id;
  this.image;
  this.position;
  // this.x;
  // this.y;
  this.direction;
  this.travelLog;
  this.controls;

  this.init = function(){
    self.id = id;
    self.position = {x: null, y:null};
    self.getInitialPosition();
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
      this.position.x = position.col;
      this.position.y = position.row;
    }

  }

  this.getPositionX = () => self.position.x;

  this.getPositionY = () => self.position.y;

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
        nextMove = self.position.y - 1;
        if(!Game.map.isFreeCell(self.position.x, nextMove)){
          self.obstacleReached();
        }else{
          self.position.y = nextMove;
          self.travelLog.push({x:self.position.x, y: self.position.y});
        }
      break;
      case 'W':
        nextMove = self.position.x - 1;
        if(!Game.map.isFreeCell(nextMove, self.position.y)){
          self.obstacleReached();
        }else{
          self.position.x = nextMove;
          self.travelLog.push({x:self.position.x, y: self.position.y});
        }
      break;
      case 'S':
        nextMove = self.position.y + 1;
        if(!Game.map.isFreeCell(self.position.x, nextMove)){
          self.obstacleReached();
        }else{
          self.position.y = nextMove;
          self.travelLog.push({x:self.position.x, y: self.position.y});
        }
      break;
      case 'E':
        nextMove = self.position.x + 1;
        if(!Game.map.isFreeCell(nextMove, self.position.y)){
          self.obstacleReached();
        }else{
          self.position.x = nextMove;
          self.travelLog.push({x:self.position.x, y: self.position.y});
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
        nextMove = self.position.y + 1;
        if(!Game.map.isFreeCell(self.position.x, nextMove)){
          self.obstacleReached();
        }else{
          self.position.y = nextMove;
          self.travelLog.push({x:self.position.x, y: self.position.y});
        }
      break;
      case 'W':
        nextMove = self.position.x + 1;
        if(!Game.map.isFreeCell(nextMove, self.position.y)){
          self.obstacleReached();
        }else{
          self.position.x = nextMove;
          self.travelLog.push({x:self.position.x, y: self.position.y});
        }
      break;
      case 'S':
        nextMove = self.position.y - 1;
        if(!Game.map.isFreeCell(self.position.x, nextMove)){
          self.obstacleReached();
        }else{
          self.position.y = nextMove;
          self.travelLog.push({x:self.position.x, y: self.position.y});
        }
      break;
      case 'E':
        nextMove = self.position.x - 1;
        if(!Game.map.isFreeCell(nextMove, self.position.y)){
          self.obstacleReached();
        }else{
          self.position.x = nextMove;
          self.travelLog.push({x:self.position.x, y: self.position.y});
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
    if((this.position.x || this.position.y) || (this.position.x === 0 && this.position.y === 0)){
      Common.drawBitMap(this.image , (this.position.x * TILE_WIDTH) + TILE_WIDTH/2 ,(this.position.y * TILE_HEIGHT) + TILE_HEIGHT/2);
    } 
  }

  // Execution
  this.init();
}