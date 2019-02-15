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
      up: null,
      down: null,
      right: null,
      left: null
    }
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

  this.turnLeft = () => {
    switch(self.direction){
      case 'N':
      if(!(self.moving.up || self.moving.down || self.moving.left || self.moving.right)){
        self.direction = 'W';
        self.image.obj = ImageManager.loadedImages.rover_left;
      }
      break;
      case 'W':
      if(!(self.moving.up || self.moving.down || self.moving.left || self.moving.right)){
        self.direction = 'S';
        self.image.obj = ImageManager.loadedImages.rover_front;
      }
      break;
      case 'S':
      if(!(self.moving.up || self.moving.down || self.moving.left || self.moving.right)){
        self.direction = 'E';
        self.image.obj = ImageManager.loadedImages.rover_right;
      }
      break;
      case 'E':
      if(!(self.moving.up || self.moving.down || self.moving.left || self.moving.right)){
        self.direction = 'N';
        self.image.obj = ImageManager.loadedImages.rover_back;
      }
      break;
      default:
        console.log("Rover direction is broken!!");
      break;
    }
  };

  this.turnRight = () => {
    switch(self.direction){
      case 'N':
        if(!(self.moving.up || self.moving.down || self.moving.right || self.moving.left)){
          self.direction = 'E';
          self.image.obj = ImageManager.loadedImages.rover_right;
        }
      break;
      case 'W':
        if(!(self.moving.up || self.moving.down || self.moving.right || self.moving.left)){
          self.direction = 'N';
          self.image.obj = ImageManager.loadedImages.rover_back;
        }
      break;
      case 'S':
        if(!(self.moving.up || self.moving.down || self.moving.right || self.moving.left)){
          self.direction = 'W';
          self.image.obj = ImageManager.loadedImages.rover_left;
        }
      break;
      case 'E':
        if(!(self.moving.up || self.moving.down || self.moving.right || self.moving.left)){
          self.direction = 'S';
          self.image.obj = ImageManager.loadedImages.rover_front;
        }
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
        if(!Game.map.isFreeCell(self.position.x, nextMove, 'up')){
          self.obstacleReached();
        }else{
          if(!self.moving.up){
            self.position.y = nextMove;
            self.moving.up = true;
            self.addToLog({x:self.position.x, y:self.position.y});
          }
        }
      break;
      case 'W':
        nextMove = self.position.x - 1;
        if(!Game.map.isFreeCell(nextMove, self.position.y, 'left')){
          self.obstacleReached();
        }else{
          if(!self.moving.left){
            self.position.x = nextMove;
            self.moving.left = true;
            self.addToLog({x:self.position.x, y:self.position.y});
          }
        }
      break;
      case 'S':
        nextMove = self.position.y + 1;
        if(!Game.map.isFreeCell(self.position.x, nextMove, 'down')){
          self.obstacleReached();
        }else{
          if(!self.moving.down){
            self.position.y = nextMove;
            self.moving.down = true; 
            self.addToLog({x:self.position.x, y:self.position.y}); 
          }
        }
      break;
      case 'E':
        nextMove = self.position.x + 1;
        if(!Game.map.isFreeCell(nextMove, self.position.y, 'right')){
          self.obstacleReached();
        }else{
          if(!self.moving.right){
            self.position.x = nextMove;
            self.moving.right = true;
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
        if(!Game.map.isFreeCell(self.position.x, nextMove, 'down')){
          self.obstacleReached();
        }else{
          if(!self.moving.down){
            self.position.y = nextMove;
            self.moving.down = true;
            self.addToLog({x:self.position.x, y:self.position.y});
          }
        }
      break;
      case 'W':
        nextMove = self.position.x + 1;
        if(!Game.map.isFreeCell(nextMove, self.position.y, 'right')){
          self.obstacleReached();
        }else{
          if(!self.moving.right){
            self.position.x = nextMove;
            self.moving.right = true;
            self.addToLog({x:self.position.x, y:self.position.y});
          }
        }
      break;
      case 'S':
        nextMove = self.position.y - 1;
        if(!Game.map.isFreeCell(self.position.x, nextMove, 'up')){
          self.obstacleReached();
        }else{
          if(!self.moving.up){
            self.position.y = nextMove;
            self.moving.up = true;
            self.addToLog({x:self.position.x, y:self.position.y});
          }
        }
      break;
      case 'E':
        nextMove = self.position.x - 1;
        if(!Game.map.isFreeCell(nextMove, self.position.y, 'left')){
          self.obstacleReached();
        }else{
          if(!self.moving.left){
            self.position.x = nextMove;
            self.moving.left = true;
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
      console.error("Some of the movements are not valid. The Rover stays at the same position.");
    }

    return self.travelLog;
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