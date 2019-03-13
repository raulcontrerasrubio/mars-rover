var Rover = function(id = 0){
  
  this.position = {};
  this.getInitialPosition();
  
  this.id = id;
  this.image = {
    obj: ImageManager.loadedImages.rover_back,
    position: {
      x: this.getPositionX() * Config.TILE_WIDTH,
      y: this.getPositionY() * Config.TILE_HEIGHT
    }
  }
  this.direction = "N";
  this.travelLog = [{x: this.getPositionX(), y: this.getPositionY()}];
  this.controls = Controls.presets.getPrimary();
  this.speed = 5;
  this.moving = {
    up: false,
    down: false,
    right: false,
    left: false
  }
  this.nextMoves = [];
  this.isObstacle = true;
  
  return this;
};

Rover.prototype.obstacleReached = function(){
  console.log("There is an obstacle in front of you!");
};

Rover.prototype.getInitialPosition = function(){
  var position = Game.map.getRandomPosition();
  if(position){
    this.position.x = position.col;
    this.position.y = position.row;
  }
};

Rover.prototype.getPositionX = function(){
  return this.position.x;
};

Rover.prototype.getPositionY = function(){
  return this.position.y;
};

Rover.prototype.setControls = function(preset){
  switch(preset){
    case 'primary':
      this.controls = Controls.presets.getPrimary();
    break;
    case 'secondary':
      this.controls = Controls.presets.getSecondary();
    break;
  }
};

Rover.prototype.addToLog = function(obj){
  this.travelLog.push(obj);
};

Rover.prototype.isMoving = function(direction){
  if(direction){
    let response;
    switch(direction){
      case 'up':
        response = this.moving.up;
      break;
      case 'down':
        response = this.moving.up;
      break;
      case 'right':
        response = this.moving.up;
      break;
      case 'left':
        response = this.moving.up;
      break;
    }
    return response;
  }

  return this.moving.up || this.moving.down || this.moving.left || this.moving.right;
};

Rover.prototype.setMoving = function(direction){
  for(let dir in this.moving){
    if(dir === direction){
      this.moving[dir] = true;
    }else{
      this.moving[dir] = false;
    }
  }
};

Rover.prototype.turnLeft = function(){
  if(!this.isMoving()){
    switch(this.direction){
      case 'N':
        this.direction = 'W';
        this.image.obj = ImageManager.loadedImages.rover_left;
      break;
      case 'W':
        this.direction = 'S';
        this.image.obj = ImageManager.loadedImages.rover_front;
      break;
      case 'S':
        this.direction = 'E';
        this.image.obj = ImageManager.loadedImages.rover_right;
      break;
      case 'E':
        this.direction = 'N';
        this.image.obj = ImageManager.loadedImages.rover_back;
      break;
      default:
        console.log("Rover direction is broken!!");
      break;
    }
  }
};

Rover.prototype.turnRight = function(){
  if(!this.isMoving()){
    switch(this.direction){
      case 'N':
          this.direction = 'E';
          this.image.obj = ImageManager.loadedImages.rover_right;
      break;
      case 'W':
          this.direction = 'N';
          this.image.obj = ImageManager.loadedImages.rover_back;
      break;
      case 'S':
          this.direction = 'W';
          this.image.obj = ImageManager.loadedImages.rover_left;
      break;
      case 'E':
          this.direction = 'S';
          this.image.obj = ImageManager.loadedImages.rover_front;
      break;
      default:
        console.log("Rover direction is broken!!");
      break;
    }
  }
};

Rover.prototype.moveForward = function(){
  let nextMove;
  switch(this.direction){
    case 'N':
      nextMove = this.position.y - 1;
      if(!(Game.map.canAccessTo(this.position.x, this.position.y, 'up') && Game.map.canAccessFrom(this.position.x,  nextMove, 'down')) || Game.map.isAnyObstacleActor(this.position.x, nextMove)){
        this.obstacleReached();
      }else{
        if(!this.isMoving('up')){
          this.position.y = nextMove;
          this.setMoving('up');
          this.addToLog({x:this.position.x, y:this.position.y});
        }
      }
    break;
    case 'W':
      nextMove = this.position.x - 1;
      if(!(Game.map.canAccessTo(this.position.x, this.position.y, 'left') && Game.map.canAccessFrom(nextMove,  this.position.y, 'right')) || Game.map.isAnyObstacleActor(nextMove, this.position.y)){
        this.obstacleReached();
      }else{
        if(!this.isMoving('left')){
          this.position.x = nextMove;
          this.setMoving('left');
          this.addToLog({x:this.position.x, y:this.position.y});
        }
      }
    break;
    case 'S':
      nextMove = this.position.y + 1;
      if(!(Game.map.canAccessTo(this.position.x, this.position.y, 'down') && Game.map.canAccessFrom(this.position.x,  nextMove, 'up')) || Game.map.isAnyObstacleActor(this.position.x, nextMove)){
        this.obstacleReached();
      }else{
        if(!this.isMoving('down')){
          this.position.y = nextMove;
          this.setMoving('down'); 
          this.addToLog({x:this.position.x, y:this.position.y}); 
        }
      }
    break;
    case 'E':
      nextMove = this.position.x + 1;
      if(!(Game.map.canAccessTo(this.position.x, this.position.y, 'right') && Game.map.canAccessFrom(nextMove,  this.position.y, 'left')) || Game.map.isAnyObstacleActor(nextMove, this.position.y)){
        this.obstacleReached();
      }else{
        if(!this.isMoving('right')){
          this.position.x = nextMove;
          this.setMoving('right');
          this.addToLog({x:this.position.x, y:this.position.y});
        }
      }
    break;
    default:
      console.log("Rover engine is broken!!");
    break;
  }
};

Rover.prototype.moveBackward = function(){
  let nextMove;
  switch(this.direction){
    case 'N':
      nextMove = this.position.y + 1;
      if(!(Game.map.canAccessTo(this.position.x, this.position.y, 'down') && Game.map.canAccessFrom(this.position.x,  nextMove, 'up')) || Game.map.isAnyObstacleActor(this.position.x, nextMove)){
        this.obstacleReached();
      }else{
        if(!this.isMoving('down')){
          this.position.y = nextMove;
          this.setMoving('down');
          this.addToLog({x:this.position.x, y:this.position.y});
        }
      }
    break;
    case 'W':
      nextMove = this.position.x + 1;
      if(!(Game.map.canAccessTo(this.position.x, this.position.y, 'right') && Game.map.canAccessFrom(nextMove,  this.position.y, 'left')) || Game.map.isAnyObstacleActor(nextMove, this.position.y)){
        this.obstacleReached();
      }else{
        if(!this.isMoving('right')){
          this.position.x = nextMove;
          this.setMoving('right');
          this.addToLog({x:this.position.x, y:this.position.y});
        }
      }
    break;
    case 'S':
      nextMove = this.position.y - 1;
      if(!(Game.map.canAccessTo(this.position.x, this.position.y, 'up') && Game.map.canAccessFrom(this.position.x,  nextMove, 'down')) || Game.map.isAnyObstacleActor(this.position.x, nextMove)){
        this.obstacleReached();
      }else{
        if(!this.isMoving('up')){
          this.position.y = nextMove;
          this.setMoving('up');
          this.addToLog({x:this.position.x, y:this.position.y});
        }
      }
    break;
    case 'E':
      nextMove = this.position.x - 1;
      if(!(Game.map.canAccessTo(this.position.x, this.position.y, 'left') && Game.map.canAccessFrom(nextMove,  this.position.y, 'right')) || Game.map.isAnyObstacleActor(nextMove, this.position.y)){
        this.obstacleReached();
      }else{
        if(!this.isMoving('left')){
          this.position.x = nextMove;
          this.setMoving('left');
          this.addToLog({x:this.position.x, y:this.position.y});
        }
      }
    break;
    default:
      console.log("Rover engine is broken!!");
    break;
  }
};

Rover.prototype.prepareMoves = function(list){
  var validMoves = ['f', 'l', 'r', 'b'];
  var movements = list.slice().split('');;

  if(this.nextMoves){
    movements = this.nextMoves.concat(movements);
  }

  for(var letter of movements){
    if(!validMoves.includes(letter)){
      console.error("Some of the movements are not valid. The Rover stays at the same position.");
      return;
    }
  }

  this.nextMoves = movements;
  return this.travelLog;
};

Rover.prototype.makeMoves = function(){
  if(!this.nextMoves){ return; }
    
  if(!this.isMoving()){
    switch(this.nextMoves[0]){
      case 'f':
        this.moveForward();
      break;
      case 'l':
        this.turnLeft();
      break;
      case 'r':
        this.turnRight();
      break;
      case 'b':
        this.moveBackward();
      break;
    }
    this.nextMoves.shift();
  }
};

Rover.prototype.updateImageUp = function(){
  this.image.position.y -= this.speed * (Config.TILE_HEIGHT/60);
};

Rover.prototype.updateImageDown = function(){
  this.image.position.y += this.speed * (Config.TILE_HEIGHT/60);
};

Rover.prototype.updateImageRight = function(){
  this.image.position.x += this.speed * (Config.TILE_WIDTH/60);
};

Rover.prototype.updateImageLeft = function(){
  this.image.position.x -= this.speed * (Config.TILE_WIDTH/60);
};

Rover.prototype.animateMovement = function(){
  if(this.moving.up){
    if(this.getPositionY() < this.image.position.y/Config.TILE_HEIGHT){
      this.updateImageUp();
      this.moving.up = this.getPositionY() < this.image.position.y/Config.TILE_HEIGHT;
      if(!this.moving.up){
        this.image.position.y = this.getPositionY() * Config.TILE_HEIGHT;
      }
    }else{
      this.moving.up = false;
    } 
  }else if(this.moving.down){
    if(this.getPositionY() > this.image.position.y/Config.TILE_HEIGHT){
      this.updateImageDown();
      this.moving.down = this.getPositionY() > this.image.position.y/Config.TILE_HEIGHT;
      if(!this.moving.down){
        this.image.position.y = this.getPositionY() * Config.TILE_HEIGHT;
      }
    }else{
      this.moving.down = false;
    }
  }else if(this.moving.right){
    if(this.getPositionX() > this.image.position.x/Config.TILE_WIDTH){
      this.updateImageRight();
      this.moving.right = this.getPositionX() > this.image.position.x/Config.TILE_WIDTH;
      if(!this.moving.right){
        this.image.position.x = this.getPositionX() * Config.TILE_WIDTH;
      }
    }else{
      this.moving.right = false;
    }
  }else if(this.moving.left){
    if(this.getPositionX() < this.image.position.x/Config.TILE_WIDTH){
      this.updateImageLeft();
      this.moving.left = this.getPositionX() < this.image.position.x/Config.TILE_WIDTH;
      if(!this.moving.left){
        this.image.position.x = this.getPositionX() * Config.TILE_WIDTH;
      }
    }else{
      this.moving.left = false;
    }
  }
};

Rover.prototype.print = function(){
  this.animateMovement(); 
  Common.drawBitMap(this.image.obj ,this.image.position.x + Config.TILE_WIDTH/2 , this.image.position.y + Config.TILE_HEIGHT/2);
};