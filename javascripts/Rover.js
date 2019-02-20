var Rover = function(id = 0){

  var self = this;

  this.id;
  this.image;
  this.position;
  this.direction;
  this.travelLog;
  this.controls;
  this.speed;
  this.moving;
  this.nextMoves;

  this.init = function(){
    self.id = id;
    self.position = {x: null, y:null};
    self.getInitialPosition();
    self.speed = 5;
    self.image = {
      obj: ImageManager.loadedImages.rover_back,
      position: {
        x: self.getPositionX() * Config.TILE_WIDTH,
        y: self.getPositionY() * Config.TILE_HEIGHT
      }
    }
    self.direction = "N";
    self.travelLog = [{x: self.getPositionX(), y: self.getPositionY()}];
    self.controls = Controls.presets.getPrimary();

    self.moving = {
      up: false,
      down: false,
      right: false,
      left: false
    }

    self.nextMoves = [];
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
        self.controls = Controls.presets.getPrimary();
      break;
      case 'secondary':
        self.controls = Controls.presets.getSecondary();
      break;
    }
  }  

  this.addToLog = (obj) => {
    self.travelLog.push(obj);
  }

  this.isMoving = (direction) => {
    if(direction){
      let response;
      switch(direction){
        case 'up':
          response = self.moving.up;
        break;
        case 'down':
          response = self.moving.up;
        break;
        case 'right':
          response = self.moving.up;
        break;
        case 'left':
          response = self.moving.up;
        break;
      }
      return response;
    }

    return self.moving.up || self.moving.down || self.moving.left || self.moving.right;
  };

  this.setMoving = (direction) => {
    for(let dir in self.moving){
      if(dir === direction){
        self.moving[dir] = true;
      }else{
        self.moving[dir] = false;
      }
    }
  }

  this.turnLeft = () => {
    if(!self.isMoving()){
      switch(self.direction){
        case 'N':
          self.direction = 'W';
          self.image.obj = ImageManager.loadedImages.rover_left;
        break;
        case 'W':
          self.direction = 'S';
          self.image.obj = ImageManager.loadedImages.rover_front;
        break;
        case 'S':
          self.direction = 'E';
          self.image.obj = ImageManager.loadedImages.rover_right;
        break;
        case 'E':
          self.direction = 'N';
          self.image.obj = ImageManager.loadedImages.rover_back;
        break;
        default:
          console.log("Rover direction is broken!!");
        break;
      }
    }
  };

  this.turnRight = () => {
    if(!self.isMoving()){
      switch(self.direction){
        case 'N':
            self.direction = 'E';
            self.image.obj = ImageManager.loadedImages.rover_right;
        break;
        case 'W':
            self.direction = 'N';
            self.image.obj = ImageManager.loadedImages.rover_back;
        break;
        case 'S':
            self.direction = 'W';
            self.image.obj = ImageManager.loadedImages.rover_left;
        break;
        case 'E':
            self.direction = 'S';
            self.image.obj = ImageManager.loadedImages.rover_front;
        break;
        default:
          console.log("Rover direction is broken!!");
        break;
      }
    }
  };

  this.moveForward = () => {
    let nextMove;
    switch(self.direction){
      case 'N':
        nextMove = self.position.y - 1;
        if(!(Game.map.canAccessTo(self.position.x, self.position.y, 'up') && Game.map.canAccessFrom(self.position.x,  nextMove, 'down'))){
          self.obstacleReached();
        }else{
          if(!self.isMoving('up')){
            self.position.y = nextMove;
            self.setMoving('up');
            self.addToLog({x:self.position.x, y:self.position.y});
          }
        }
      break;
      case 'W':
        nextMove = self.position.x - 1;
        if(!(Game.map.canAccessTo(self.position.x, self.position.y, 'left') && Game.map.canAccessFrom(nextMove,  self.position.y, 'right'))){
          self.obstacleReached();
        }else{
          if(!self.isMoving('left')){
            self.position.x = nextMove;
            self.setMoving('left');
            self.addToLog({x:self.position.x, y:self.position.y});
          }
        }
      break;
      case 'S':
        nextMove = self.position.y + 1;
        if(!(Game.map.canAccessTo(self.position.x, self.position.y, 'down') && Game.map.canAccessFrom(self.position.x,  nextMove, 'up'))){
          self.obstacleReached();
        }else{
          if(!self.isMoving('down')){
            self.position.y = nextMove;
            self.setMoving('down'); 
            self.addToLog({x:self.position.x, y:self.position.y}); 
          }
        }
      break;
      case 'E':
        nextMove = self.position.x + 1;
        if(!(Game.map.canAccessTo(self.position.x, self.position.y, 'right') && Game.map.canAccessFrom(nextMove,  self.position.y, 'left'))){
          self.obstacleReached();
        }else{
          if(!self.isMoving('right')){
            self.position.x = nextMove;
            self.setMoving('right');
            self.addToLog({x:self.position.x, y:self.position.y});
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
        if(!(Game.map.canAccessTo(self.position.x, self.position.y, 'down') && Game.map.canAccessFrom(self.position.x,  nextMove, 'up'))){
          self.obstacleReached();
        }else{
          if(!self.isMoving('down')){
            self.position.y = nextMove;
            self.setMoving('down');
            self.addToLog({x:self.position.x, y:self.position.y});
          }
        }
      break;
      case 'W':
        nextMove = self.position.x + 1;
        if(!(Game.map.canAccessTo(self.position.x, self.position.y, 'right') && Game.map.canAccessFrom(nextMove,  self.position.y, 'left'))){
          self.obstacleReached();
        }else{
          if(!self.isMoving('right')){
            self.position.x = nextMove;
            self.setMoving('right');
            self.addToLog({x:self.position.x, y:self.position.y});
          }
        }
      break;
      case 'S':
        nextMove = self.position.y - 1;
        if(!(Game.map.canAccessTo(self.position.x, self.position.y, 'up') && Game.map.canAccessFrom(self.position.x,  nextMove, 'down'))){
          self.obstacleReached();
        }else{
          if(!self.isMoving('up')){
            self.position.y = nextMove;
            self.setMoving('up');
            self.addToLog({x:self.position.x, y:self.position.y});
          }
        }
      break;
      case 'E':
        nextMove = self.position.x - 1;
        if(!(Game.map.canAccessTo(self.position.x, self.position.y, 'left') && Game.map.canAccessFrom(nextMove,  self.position.y, 'right'))){
          self.obstacleReached();
        }else{
          if(!self.isMoving('left')){
            self.position.x = nextMove;
            self.setMoving('left');
            self.addToLog({x:self.position.x, y:self.position.y});
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
    var movements;

    if(!self.nextMoves){
      movements = list.slice().split('');
    }else{
      movements = self.nextMoves.concat(list.slice().split(''));
    }

    for(var letter of movements){
      if(!validMoves.includes(letter)){
        console.error("Some of the movements are not valid. The Rover stays at the same position.");
        return;
      }
    }

    self.nextMoves = movements;
    return self.travelLog;
  }

  this.makeMoves = () => {
    if(!self.nextMoves){ return; }
      
      if(!self.isMoving()){
        switch(self.nextMoves[0]){
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
        self.nextMoves.shift();
      }
    }

  this.updateImageUp = () => {
    self.image.position.y -= self.speed * (Config.TILE_HEIGHT/Config.FRAMES_PER_SECOND);
  }

  this.updateImageDown = () => {
    self.image.position.y += self.speed * (Config.TILE_HEIGHT/Config.FRAMES_PER_SECOND);
  }

  this.updateImageRight = () => {
    self.image.position.x += self.speed * (Config.TILE_WIDTH/Config.FRAMES_PER_SECOND);
  }

  this.updateImageLeft = () => {
    self.image.position.x -= self.speed * (Config.TILE_WIDTH/Config.FRAMES_PER_SECOND);
  }


  this.animateMovement = () => {
    if(self.moving.up){
      if(self.getPositionY() < self.image.position.y/Config.TILE_HEIGHT){
        self.updateImageUp();
        self.moving.up = self.getPositionY() < self.image.position.y/Config.TILE_HEIGHT;
        if(!self.moving.up){
          self.image.position.y = self.getPositionY() * Config.TILE_HEIGHT;
        }
      }else{
        self.moving.up = false;
      } 
    }else if(self.moving.down){
      if(self.getPositionY() > self.image.position.y/Config.TILE_HEIGHT){
        self.updateImageDown();
        self.moving.down = self.getPositionY() > self.image.position.y/Config.TILE_HEIGHT;
        if(!self.moving.down){
          self.image.position.y = self.getPositionY() * Config.TILE_HEIGHT;
        }
      }else{
        self.moving.down = false;
      }
    }else if(self.moving.right){
      if(self.getPositionX() > self.image.position.x/Config.TILE_WIDTH){
        self.updateImageRight();
        self.moving.right = self.getPositionX() > self.image.position.x/Config.TILE_WIDTH;
        if(!self.moving.right){
          self.image.position.x = self.getPositionX() * Config.TILE_WIDTH;
        }
      }else{
        self.moving.right = false;
      }
    }else if(self.moving.left){
      if(self.getPositionX() < self.image.position.x/Config.TILE_WIDTH){
        self.updateImageLeft();
        self.moving.left = self.getPositionX() < self.image.position.x/Config.TILE_WIDTH;
        if(!self.moving.left){
          self.image.position.x = self.getPositionX() * Config.TILE_WIDTH;
        }
      }else{
        self.moving.left = false;
      }
    }
  }

  this.print = () => {
      self.animateMovement(); 
      Common.drawBitMap(self.image.obj ,self.image.position.x + Config.TILE_WIDTH/2 , self.image.position.y + Config.TILE_HEIGHT/2);
  }

  // Execution
  this.init();
}