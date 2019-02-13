var Camera = function(target){
  
  var self = this;

  this.TARGET_TOP_LIMIT_TO_MOVE_CAMERA;
  this.TARGET_BOTTOM_LIMIT_TO_MOVE_CAMERA;
  this.TARGET_LEFT_LIMIT_TO_MOVE_CAMERA;
  this.TARGET_RIGHT_LIMIT_TO_MOVE_CAMERA;
  this.CAMERA_TILES_SIDES_UP_BOTTOM;
  this.CAMERA_TILES_SIDES_RIGHT_LEFT;

  this.speed;
  this.movingUp;
  this.movingDown;
  this.movingLeft;
  this.movingRight;

  this.position = {x: null, y: null};
  this.target = target;
  this.targetPosition = {x: null, y: null};
  this.view = {top: null, bottom: null, left: null, right: null}

  this.init = () => {
    if(target){
      self.focus();
      self.speed = target.speed;
    }else{
      let {row, col} = Game.map.getRandomCoord();
      self.position = {
        x: col * Config.TILE_WIDTH,
        y: row * Config.TILE_HEIGHT
      }

      self.speed = Config.DEFAULT_CAMERA_SPEED;
    }

    self.movingUp = false;
    self.movingDown = false;
    self.movingLeft = false;
    self.movingRight = false;

    self.updateView();
  }

  this.setSpeed = (speed) => {
    if(!target && /\d/.test(speed) && speed >= Config.CAMERA_MIN_SPEED && speed <= Config.CAMERA_MAX_SPEED){
      self.speed = speed;
      return true;
    }
    return false;
  }

  this.focus = () => {
    self.position = {
      x: target.image.position.x + Config.TILE_WIDTH/2,
      y: target.image.position.y + Config.TILE_HEIGHT/2
    }

    self.targetPosition = {
      x: target.image.position.x,
      y: target.image.position.y
    }
  }

  this.moveIfNeeded = () => {
    if(self.isTargetBeyondTopLimit()){
      while(self.isTargetBeyondTopLimit()){
        self.moveUp();
      }
    }

    if(self.isTargetBeyondBottomLimit()){
      while(self.isTargetBeyondBottomLimit()){
        self.moveDown();
      }
    }

    if(self.isTargetBeyondRightLimit()){
      while(self.isTargetBeyondRightLimit()){
        self.moveRight();
      }
    }

    if(self.isTargetBeyondLeftLimit()){
      while(self.isTargetBeyondLeftLimit()){
        self.moveLeft();
      }
    }
  }

  this.moveLeft = () => { 
    self.position.x -= self.speed * (Config.TILE_WIDTH/Config.FRAMES_PER_SECOND); 
    self.updateView();
  }
  this.moveRight = () => { 
    self.position.x += self.speed * (Config.TILE_WIDTH/Config.FRAMES_PER_SECOND); 
    self.updateView();
  }
  this.moveUp = () => { 
    self.position.y -= self.speed * (Config.TILE_HEIGHT/Config.FRAMES_PER_SECOND); 
    self.updateView();
  }
  this.moveDown = () => { 
    self.position.y += self.speed * (Config.TILE_HEIGHT/Config.FRAMES_PER_SECOND); 
    self.updateView();
  }

  this.isTargetBeyondTopLimit = () => self.targetPosition.y < self.position.y - self.TARGET_TOP_LIMIT_TO_MOVE_CAMERA * Config.TILE_HEIGHT;
  this.isTargetBeyondBottomLimit = () => self.targetPosition.y > self.position.y + self.TARGET_BOTTOM_LIMIT_TO_MOVE_CAMERA * Config.TILE_HEIGHT;
  this.isTargetBeyondRightLimit = () => self.targetPosition.x > self.position.x + self.TARGET_RIGHT_LIMIT_TO_MOVE_CAMERA * Config.TILE_WIDTH;
  this.isTargetBeyondLeftLimit = () => self.targetPosition.x < self.position.x - self.TARGET_LEFT_LIMIT_TO_MOVE_CAMERA * Config.TILE_WIDTH;

  this.updateView = () => {

    self.TARGET_TOP_LIMIT_TO_MOVE_CAMERA = Math.floor((Game.canvas.height/4) / Config.TILE_HEIGHT);
    self.TARGET_BOTTOM_LIMIT_TO_MOVE_CAMERA = Math.floor((Game.canvas.height/4) / Config.TILE_HEIGHT);
    self.TARGET_LEFT_LIMIT_TO_MOVE_CAMERA = Math.floor((Game.canvas.width/6) / Config.TILE_WIDTH);
    self.TARGET_RIGHT_LIMIT_TO_MOVE_CAMERA = Math.floor((Game.canvas.width/6) / Config.TILE_WIDTH);
    self.CAMERA_TILES_SIDES_UP_BOTTOM = 2 * Math.floor((Game.canvas.height/Config.TILE_HEIGHT)/2);
    self.CAMERA_TILES_SIDES_RIGHT_LEFT = 2 * Math.floor((Game.canvas.width/Config.TILE_WIDTH)/2);

    self.view = {
      top: Math.floor(self.position.y/Config.TILE_HEIGHT) - self.CAMERA_TILES_SIDES_UP_BOTTOM < 0 ? 0 : Math.floor(self.position.y/Config.TILE_HEIGHT) - self.CAMERA_TILES_SIDES_UP_BOTTOM,
      bottom: Math.floor(self.position.y/Config.TILE_HEIGHT) + self.CAMERA_TILES_SIDES_UP_BOTTOM > Game.map.grid.length ? Game.map.grid.length : Math.floor(self.position.y/Config.TILE_HEIGHT) + self.CAMERA_TILES_SIDES_UP_BOTTOM,
      left: Math.floor(self.position.x/Config.TILE_WIDTH) - self.CAMERA_TILES_SIDES_RIGHT_LEFT < 0 ? 0 : Math.floor(self.position.x/Config.TILE_WIDTH) - self.CAMERA_TILES_SIDES_RIGHT_LEFT,
      right: Math.floor(self.position.x/Config.TILE_WIDTH) + self.CAMERA_TILES_SIDES_RIGHT_LEFT > Game.map.grid[Math.floor(self.position.y/Config.TILE_HEIGHT)].length ? Game.map.grid[Math.floor(self.position.y/Config.TILE_HEIGHT)].length : Math.round(self.position.x/Config.TILE_WIDTH) + self.CAMERA_TILES_SIDES_RIGHT_LEFT
    }
    
  }

  this.showPosition = () => {
    Game.context.beginPath()
    Game.context.fillStyle = "blue";
    Game.context.arc(self.position.x, self.position.y, 10, 0, Math.PI * 2);
    Game.context.fill();
    Game.context.closePath();
  }

  this.use = () => {
    if(target){
      self.targetPosition.x = target.image.position.x + Config.TILE_WIDTH/2;
      self.targetPosition.y = target.image.position.y + Config.TILE_HEIGHT/2;
  
      this.moveIfNeeded();
    }
  }

  this.init();
}