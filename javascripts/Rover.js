var Rover = function(id = 0){

  var self = this;

  this.id;
  this.image;
  this.position;
  this.direction;
  this.travelLog;
  this.controls;
  this.speed;

  this.movingUp;
  this.movingDown;
  this.movingLeft;
  this.movingRight;

  this.init = function(){
    self.id = id;
    self.position = {x: null, y:null};
    self.getInitialPosition();
    self.speed = 5;
    self.image = {
      obj: new Image(),
      position: {
        x: self.getPositionX() * TILE_WIDTH,
        y: self.getPositionY() * TILE_HEIGHT
      }
    }
    self.image.obj.src = 'images/svg/rover/rover-back.svg';
    self.direction = "N";
    self.travelLog = [{x: self.getPositionX(), y: self.getPositionY()}];
    self.controls = Controls.presets.primary;

    self.movingUp = false;
    self.movingDown = false;
    self.movingLeft = false;
    self.movingRight = false;
  }

  Rover.prototype.obstacleReached = () => {
    console.log("There is an obstacle in front of you!");
  }

  this.getInitialPosition = () => {
    var position = Game.map.getRandomPosition();

    if(position){
      self.position.x = position.col;
      self.position.y = position.row;
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
        self.image.obj.src = 'images/svg/rover/rover-left.svg';
      break;
      case 'W':
        self.direction = 'S';
        self.image.obj.src = 'images/svg/rover/rover-front.svg';
      break;
      case 'S':
        self.direction = 'E';
        self.image.obj.src = 'images/svg/rover/rover-right.svg';
      break;
      case 'E':
        self.direction = 'N';
        self.image.obj.src = 'images/svg/rover/rover-back.svg';
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
        self.image.obj.src = 'images/svg/rover/rover-right.svg';
      break;
      case 'W':
        self.direction = 'N';
        self.image.obj.src = 'images/svg/rover/rover-back.svg';
      break;
      case 'S':
        self.direction = 'W';
        self.image.obj.src = 'images/svg/rover/rover-left.svg';
      break;
      case 'E':
        self.direction = 'S';
        self.image.obj.src = 'images/svg/rover/rover-front.svg';
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
          if(!self.movingUp){
            self.position.y = nextMove;
            self.updateImageUp();
            self.movingUp = true;
            self.travelLog.push({x:self.position.x, y: self.position.y});
          }
        }
      break;
      case 'W':
        nextMove = self.position.x - 1;
        if(!Game.map.isFreeCell(nextMove, self.position.y)){
          self.obstacleReached();
        }else{
          if(!self.movingLeft){
            self.position.x = nextMove;
            self.updateImageLeft();
            self.movingLeft = true;
            self.travelLog.push({x:self.position.x, y: self.position.y});
          }
        }
      break;
      case 'S':
        nextMove = self.position.y + 1;
        if(!Game.map.isFreeCell(self.position.x, nextMove)){
          self.obstacleReached();
        }else{
          if(!self.movingDown){
            self.position.y = nextMove;
            self.updateImageDown(); 
            self.movingDown = true; 
            self.travelLog.push({x:self.position.x, y: self.position.y}); 
          }
        }
      break;
      case 'E':
        nextMove = self.position.x + 1;
        if(!Game.map.isFreeCell(nextMove, self.position.y)){
          self.obstacleReached();
        }else{
          if(!self.movingRight){
            self.position.x = nextMove;
            self.updateImageRight();
            self.movingRight = true;
            self.travelLog.push({x:self.position.x, y: self.position.y});
          }
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
          if(!self.movingDown){
            self.position.y = nextMove;
            self.updateImageDown();
            self.movingDown = true;
            self.travelLog.push({x:self.position.x, y: self.position.y});
          }
        }
      break;
      case 'W':
        nextMove = self.position.x + 1;
        if(!Game.map.isFreeCell(nextMove, self.position.y)){
          self.obstacleReached();
        }else{
          if(!self.movingRight){
            self.position.x = nextMove;
            self.updateImageRight();
            self.movingRight = true;
            self.travelLog.push({x:self.position.x, y: self.position.y});
          }
        }
      break;
      case 'S':
        nextMove = self.position.y - 1;
        if(!Game.map.isFreeCell(self.position.x, nextMove)){
          self.obstacleReached();
        }else{
          if(!self.movingUp){
            self.position.y = nextMove;
            self.updateImageUp();
            self.movingUp = true;
            self.travelLog.push({x:self.position.x, y: self.position.y});
          }
        }
      break;
      case 'E':
        nextMove = self.position.x - 1;
        if(!Game.map.isFreeCell(nextMove, self.position.y)){
          self.obstacleReached();
        }else{
          if(!self.movingLeft){
            self.position.x = nextMove;
            self.updateImageLeft();
            self.movingLeft = true;
            self.travelLog.push({x:self.position.x, y: self.position.y});
          }
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

  this.updateImageUp = () => {
    self.image.position.y -= self.speed * (TILE_HEIGHT/FRAMES_PER_SECOND);
  }

  this.updateImageDown = () => {
    self.image.position.y += self.speed * (TILE_HEIGHT/FRAMES_PER_SECOND);
  }

  this.updateImageRight = () => {
    self.image.position.x += self.speed * (TILE_WIDTH/FRAMES_PER_SECOND);
  }

  this.updateImageLeft = () => {
    self.image.position.x -= self.speed * (TILE_WIDTH/FRAMES_PER_SECOND);
  }

  this.print = () => {
      if(self.movingUp && self.getPositionY() < self.image.position.y/TILE_HEIGHT){
        self.updateImageUp();
        self.movingUp = self.getPositionY() < self.image.position.y/TILE_HEIGHT;
        if(!self.movingUp){
          self.image.position.y = self.getPositionY() * TILE_HEIGHT;
        }
      }else if(self.movingDown && self.getPositionY() > self.image.position.y/TILE_HEIGHT){
        self.updateImageDown();
        self.movingDown = self.getPositionY() > self.image.position.y/TILE_HEIGHT;
        if(!self.movingDown){
          self.image.position.y = self.getPositionY() * TILE_HEIGHT;
        }
      }else if(self.movingRight && self.getPositionX() > self.image.position.x/TILE_WIDTH){
        self.updateImageRight();
        self.movingRight = self.getPositionX() > self.image.position.x/TILE_WIDTH;
        if(!self.movingRight){
          self.image.position.x = self.getPositionX() * TILE_WIDTH;
        }
      }else if(self.movingLeft && self.getPositionX() < self.image.position.x/TILE_WIDTH){
        self.updateImageLeft();
        self.movingLeft = self.getPositionX() < self.image.position.x/TILE_WIDTH;
        if(!self.movingLeft){
          self.image.position.x = self.getPositionX() * TILE_WIDTH;
        }
      }
      Common.drawBitMap(self.image.obj ,self.image.position.x + TILE_WIDTH/2 , self.image.position.y + TILE_HEIGHT/2);
  }

  // Execution
  this.init();
}