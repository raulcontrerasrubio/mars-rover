var Camera = function(target){

  this.TARGET_TOP_LIMIT_TO_MOVE_CAMERA;
  this.TARGET_BOTTOM_LIMIT_TO_MOVE_CAMERA;
  this.TARGET_LEFT_LIMIT_TO_MOVE_CAMERA;
  this.TARGET_RIGHT_LIMIT_TO_MOVE_CAMERA;
  this.CAMERA_TILES_SIDES_UP_BOTTOM;
  this.CAMERA_TILES_SIDES_RIGHT_LEFT;

  this.movingUp = false;
  this.movingDown = false;
  this.movingLeft = false;
  this.movingRight = false;

  this.position = {x: null, y: null};
  this.target = target;
  this.targetPosition = {x: null, y: null};
  this.view = {top: null, bottom: null, left: null, right: null};

  this.zoom = 0;

  if(this.target){
    this.focus();
    this.speed = target.speed;
  }else{
    let {row, col} = Game.map.getRandomCoord();
    this.position = {
      x: col * Config.TILE_WIDTH,
      y: row * Config.TILE_HEIGHT
    }

    this.speed = Config.DEFAULT_CAMERA_SPEED;
  }

  this.updateView();

};

Camera.prototype.setSpeed = function(speed){
  if(!this.target && /\d/.test(speed) && speed >= Config.CAMERA_MIN_SPEED && speed <= Config.CAMERA_MAX_SPEED){
    this.speed = speed;
    return true;
  }
  return false;
};

Camera.prototype.setZoom = function(zoom){
  if(isNaN(zoom) || zoom < Config.CAMERA_MIN_ZOOM || zoom > Config.CAMERA_MAX_ZOOM){
    return false;
  }
  this.zoom = zoom;
  this.updateView();

  if(this.target){
    this.focus();
  }

  return true;
};

Camera.prototype.restoreZoom = function(){
  this.setZoom(Config.DEFAULT_CAMERA_ZOOM);
};

Camera.prototype.focus = function(){
  this.position = {
    x: this.target.image.position.x + Config.TILE_WIDTH/2,
    y: this.target.image.position.y + Config.TILE_HEIGHT/2
  }

  this.targetPosition = {
    x: this.target.image.position.x,
    y: this.target.image.position.y
  }
};

Camera.prototype.moveIfNeeded = function(){
  if(this.isTargetBeyondTopLimit()){
    while(this.isTargetBeyondTopLimit()){
      this.moveUp();
    }
  }

  if(this.isTargetBeyondBottomLimit()){
    while(this.isTargetBeyondBottomLimit()){
      this.moveDown();
    }
  }

  if(this.isTargetBeyondRightLimit()){
    while(this.isTargetBeyondRightLimit()){
      this.moveRight();
    }
  }

  if(this.isTargetBeyondLeftLimit()){
    while(this.isTargetBeyondLeftLimit()){
      this.moveLeft();
    }
  }
};

Camera.prototype.moveLeft = function(){ 
  let nextX = Math.floor(this.position.x/Config.TILE_WIDTH);
  if(nextX <= 0 || nextX > Game.map.grid[Math.floor(this.position.y/Config.TILE_HEIGHT)].length - 1){return;}
  this.position.x -= this.speed * (Config.TILE_WIDTH/60); 
  this.updateView();
};

Camera.prototype.moveRight = function(){ 
  let nextX = Math.floor(this.position.x/Config.TILE_WIDTH);
  if(nextX < 0 || nextX >= Game.map.grid[Math.floor(this.position.y/Config.TILE_HEIGHT)].length - 1){return;}
  this.position.x += this.speed * (Config.TILE_WIDTH/60); 
  this.updateView();
};

Camera.prototype.moveUp = function(){ 
  let nextY = Math.floor(this.position.y/Config.TILE_HEIGHT);
  if(nextY <= 0 || nextY > Game.map.grid.length - 1){return;}
  this.position.y -= this.speed * (Config.TILE_HEIGHT/60); 
  this.updateView();
};

Camera.prototype.moveDown = function(){ 
  let nextY = Math.floor(this.position.y/Config.TILE_HEIGHT);
  if(nextY < 0 || nextY >= Game.map.grid.length - 1){return;}
  this.position.y += this.speed * (Config.TILE_HEIGHT/60); 
  this.updateView();
};

Camera.prototype.isTargetBeyondTopLimit = function(){
  return this.targetPosition.y < this.position.y - this.TARGET_TOP_LIMIT_TO_MOVE_CAMERA * Config.TILE_HEIGHT;
};

Camera.prototype.isTargetBeyondBottomLimit = function(){
  return this.targetPosition.y > this.position.y + this.TARGET_BOTTOM_LIMIT_TO_MOVE_CAMERA * Config.TILE_HEIGHT;
};

Camera.prototype.isTargetBeyondRightLimit = function(){
  return this.targetPosition.x > this.position.x + this.TARGET_RIGHT_LIMIT_TO_MOVE_CAMERA * Config.TILE_WIDTH;
};

Camera.prototype.isTargetBeyondLeftLimit = function(){
  return this.targetPosition.x < this.position.x - this.TARGET_LEFT_LIMIT_TO_MOVE_CAMERA * Config.TILE_WIDTH;
};

Camera.prototype.updateView = function(){

  let scale = this.zoom/100 >= 0 ? this.zoom/100 : this.zoom/(100*2); 
  
  this.TARGET_TOP_LIMIT_TO_MOVE_CAMERA = Math.floor(( (Game.canvas.height/(1+scale))/4) / Config.TILE_HEIGHT);
  this.TARGET_BOTTOM_LIMIT_TO_MOVE_CAMERA = Math.floor(( (Game.canvas.height/(1+scale))/4) / Config.TILE_HEIGHT);
  this.TARGET_LEFT_LIMIT_TO_MOVE_CAMERA = Math.floor(( (Game.canvas.width/(1+scale))/4) / Config.TILE_WIDTH);
  this.TARGET_RIGHT_LIMIT_TO_MOVE_CAMERA = Math.floor(( (Game.canvas.width/(1+scale))/4) / Config.TILE_WIDTH);
  this.CAMERA_TILES_SIDES_UP_BOTTOM = 2 * Math.floor(( (Game.canvas.height/(1+scale))/Config.TILE_HEIGHT)/2);
  this.CAMERA_TILES_SIDES_RIGHT_LEFT = 2 * Math.floor(( (Game.canvas.width/(1+scale))/Config.TILE_WIDTH)/2);
  
  this.view = {
    top: Math.floor(this.position.y/Config.TILE_HEIGHT) - this.CAMERA_TILES_SIDES_UP_BOTTOM < 0 ? 
      0 : 
      Math.floor(this.position.y/Config.TILE_HEIGHT) - this.CAMERA_TILES_SIDES_UP_BOTTOM,
    bottom: Math.floor(this.position.y/Config.TILE_HEIGHT) + this.CAMERA_TILES_SIDES_UP_BOTTOM > Game.map.grid.length ? Game.map.grid.length : Math.floor(this.position.y/Config.TILE_HEIGHT) + this.CAMERA_TILES_SIDES_UP_BOTTOM,
    left: Math.floor(this.position.x/Config.TILE_WIDTH) - this.CAMERA_TILES_SIDES_RIGHT_LEFT < 0 ? 0 : Math.floor(this.position.x/Config.TILE_WIDTH) - this.CAMERA_TILES_SIDES_RIGHT_LEFT,
    right: Math.floor(this.position.x/Config.TILE_WIDTH) + this.CAMERA_TILES_SIDES_RIGHT_LEFT > Game.map.grid[Math.floor(this.position.y/Config.TILE_HEIGHT)].length ? Game.map.grid[Math.floor(this.position.y/Config.TILE_HEIGHT)].length : Math.round(this.position.x/Config.TILE_WIDTH) + this.CAMERA_TILES_SIDES_RIGHT_LEFT
  }
};

Camera.prototype.showPosition = function(){
  Game.context.beginPath()
  Game.context.fillStyle = "blue";
  Game.context.arc(this.position.x, this.position.y, 10, 0, Math.PI * 2);
  Game.context.fill();
  Game.context.closePath();
};

Camera.prototype.use = function(){
  if(this.target){
    this.targetPosition.x = this.target.image.position.x + Config.TILE_WIDTH/2;
    this.targetPosition.y = this.target.image.position.y + Config.TILE_HEIGHT/2;

    this.moveIfNeeded();
  }
};