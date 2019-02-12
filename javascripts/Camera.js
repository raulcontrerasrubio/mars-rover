var Camera = function(target){
  
  var self = this;

  this.TARGET_TOP_LIMIT_TO_MOVE_CAMERA;
  this.TARGET_BOTTOM_LIMIT_TO_MOVE_CAMERA;
  this.TARGET_LEFT_LIMIT_TO_MOVE_CAMERA;
  this.TARGET_RIGHT_LIMIT_TO_MOVE_CAMERA;
  this.CAMERA_TILES_SIDES_UP_BOTTOM;
  this.CAMERA_TILES_SIDES_RIGHT_LEFT;

  this.position = {x: null, y: null};
  this.targetPosition = {x: null, y: null};
  this.view = {top: null, bottom: null, left: null, right: null}

  this.init = () => {
    self.position = {
      x: target.getPositionX(),
      y: target.getPositionY()
    }

    self.targetPosition = {
      x: target.getPositionX(),
      y: target.getPositionY()
    }

    self.updateView();
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

  this.moveLeft = () => { self.position.x -= 1; self.updateView();}
  this.moveRight = () => { self.position.x += 1; self.updateView();}
  this.moveUp = () => { self.position.y -= 1; self.updateView();}
  this.moveDown = () => { self.position.y += 1; self.updateView();}

  this.isTargetBeyondTopLimit = () => self.targetPosition.y < self.position.y - self.TARGET_TOP_LIMIT_TO_MOVE_CAMERA;
  this.isTargetBeyondBottomLimit = () => self.targetPosition.y > self.position.y + self.TARGET_BOTTOM_LIMIT_TO_MOVE_CAMERA;
  this.isTargetBeyondRightLimit = () => self.targetPosition.x > self.position.x + self.TARGET_RIGHT_LIMIT_TO_MOVE_CAMERA;
  this.isTargetBeyondLeftLimit = () => self.targetPosition.x < self.position.x - self.TARGET_LEFT_LIMIT_TO_MOVE_CAMERA;

  this.updateView = () => {

    self.TARGET_TOP_LIMIT_TO_MOVE_CAMERA = Math.floor((Game.canvas.height/12) / Config.TILE_HEIGHT);
    self.TARGET_BOTTOM_LIMIT_TO_MOVE_CAMERA = Math.floor((Game.canvas.height/12) / Config.TILE_HEIGHT);
    self.TARGET_LEFT_LIMIT_TO_MOVE_CAMERA = Math.floor((Game.canvas.width/12) / Config.TILE_WIDTH);
    self.TARGET_RIGHT_LIMIT_TO_MOVE_CAMERA = Math.floor((Game.canvas.width/12) / Config.TILE_WIDTH);
    self.CAMERA_TILES_SIDES_UP_BOTTOM = 2 * Math.floor((Game.canvas.height/Config.TILE_HEIGHT)/2);
    self.CAMERA_TILES_SIDES_RIGHT_LEFT = 2 * Math.floor((Game.canvas.width/Config.TILE_WIDTH)/2);

    self.view = {
      top: self.position.y - self.CAMERA_TILES_SIDES_UP_BOTTOM < 0 ? 0 : self.position.y - self.CAMERA_TILES_SIDES_UP_BOTTOM,
      bottom: self.position.y + self.CAMERA_TILES_SIDES_UP_BOTTOM > Game.map.grid.length ? Game.map.grid.length : self.position.y + self.CAMERA_TILES_SIDES_UP_BOTTOM,
      left: self.position.x - self.CAMERA_TILES_SIDES_RIGHT_LEFT < 0 ? 0 : self.position.x - self.CAMERA_TILES_SIDES_RIGHT_LEFT,
      right: self.position.x + self.CAMERA_TILES_SIDES_RIGHT_LEFT > Game.map.grid[self.position.y].length ? Game.map.grid[self.position.y].length : self.position.x + self.CAMERA_TILES_SIDES_RIGHT_LEFT
    }
    
  }

  this.showPosition = () => {
    Game.context.beginPath()
    Game.context.fillStyle = "blue";
    Game.context.arc(self.position.x * Config.TILE_WIDTH + Config.TILE_WIDTH/2, self.position.y * Config.TILE_HEIGHT + Config.TILE_HEIGHT/2, 10, 0, Math.PI * 2);
    Game.context.fill();
    Game.context.closePath();
  }

  this.use = () => {
    self.targetPosition.x = target.getPositionX();
    self.targetPosition.y = target.getPositionY();

    this.moveIfNeeded();
  }

  this.init();
}