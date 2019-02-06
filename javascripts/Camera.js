var Camera = function(target){
  var self = this;

  this.position = {x: null, y: null};
  this.targetPosition = {x: null, y: null};
  this.view = {top: null, bottom: null, left: null, right: null}

  this.init = () => {
    this.position = {
      x: target.x,
      y: target.y
    }

    this.targetPosition = {
      x: target.getPositionX(),
      y: target.getPositionY()
    }

    this.updateView();
  }  

  this.moveIfNeeded = () => {
    if(self.isTargetBeyondTopLimit()){
      while(self.isTargetBeyondTopLimit()){
        self.moveUp();
        console.log("Arriba")
      }
    }

    if(self.isTargetBeyondBottomLimit()){
      while(self.isTargetBeyondBottomLimit()){
        self.moveDown();
        console.log("Abajo")
      }
    }

    if(self.isTargetBeyondRightLimit()){
      while(self.isTargetBeyondRightLimit()){
        self.moveRight();
        console.log("Derecha")
      }
    }

    if(self.isTargetBeyondLeftLimit()){
      while(self.isTargetBeyondLeftLimit()){
        self.moveLeft();
        console.log("Izquierda") 
      }
    }
  }

  this.moveLeft = () => { self.position.x -= 1; self.updateView();}
  this.moveRight = () => { self.position.x += 1; self.updateView();}
  this.moveUp = () => { self.position.y -= 1; self.updateView();}
  this.moveDown = () => { self.position.y += 1; self.updateView();}

  this.isTargetBeyondTopLimit = () => self.targetPosition.y < self.position.y - TARGET_TOP_LIMIT_TO_MOVE_CAMERA;
  this.isTargetBeyondBottomLimit = () => self.targetPosition.y > self.position.y + TARGET_BOTTOM_LIMIT_TO_MOVE_CAMERA;
  this.isTargetBeyondRightLimit = () => self.targetPosition.x > self.position.x + TARGET_RIGHT_LIMIT_TO_MOVE_CAMERA;
  this.isTargetBeyondLeftLimit = () => self.targetPosition.x < self.position.x - TARGET_LEFT_LIMIT_TO_MOVE_CAMERA;

  this.updateView = () => {
    self.view = {
      top: self.position.y - CAMERA_TILES_SIDES_UP_BOTTOM,
      bottom: self.position.y + CAMERA_TILES_SIDES_UP_BOTTOM,
      left: self.position.x - CAMERA_TILES_SIDES_RIGHT_LEFT,
      right: self.position.x + CAMERA_TILES_SIDES_RIGHT_LEFT
    }
  }

  this.printCamera = () => {
    Game.context.beginPath()
    Game.context.fillStyle = "blue";
    Game.context.arc(self.position.x * TILE_WIDTH + TILE_WIDTH/2, self.position.y * TILE_HEIGHT + TILE_HEIGHT/2, 10, 0, Math.PI * 2);
    Game.context.fill();
    Game.context.closePath();
  }

  this.use = () => {
    self.targetPosition.x = target.getPositionX();
    self.targetPosition.y = target.getPositionY();

    this.moveIfNeeded();
    this.printCamera();
  }

  this.init();
}