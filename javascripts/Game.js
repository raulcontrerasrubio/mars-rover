var Game = {
  canvas: null,
  context: null,
  started: false,
  frameCount: 0,
  map: null,
  cameras: [],
  selectedCamera: null,
  selectedCameraIndex: null,
  createCamera: function(target = null){
    if(target){
      this.cameras.push(new Camera(target));
    }else{
      this.cameras.push(new Camera());
    }
    
    this.selectedCameraIndex = this.cameras.length - 1;
  },
  prevCamera: function(){
    let lastCamera = this.cameras.length - 1;
    if(this.selectedCameraIndex - 1 < 0){
      this.selectedCameraIndex = lastCamera;
      return;
    }
    this.selectedCameraIndex -= 1;
  },
  nextCamera: function(){
    let lastCamera = this.cameras.length - 1;
    if(this.selectedCameraIndex + 1 > lastCamera){
      this.selectedCameraIndex = 0;
      return;
    }
    this.selectedCameraIndex += 1;
  },
  resizeCanvas: function(width, height){
    this.canvas.width = width;
    this.canvas.height = height;

    if(this.cameras){
      for(let camera of this.cameras){
        camera.updateView();
      }
    }
  },
  reset: function(){
    this.canvas = document.querySelector('#canvas');
    this.context = this.canvas.getContext('2d');
    this.resizeCanvas(Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT);
    this.frameCount = 0;
    this.map = null;
    this.cameras = [];
    this.selectedCamera = null;
    this.selectedCameraIndex = null;
    if(this.started){
      cancelAnimationFrame(this.animationID);
    }
    this.started = false;
  },
  init: function(layout){
    this.reset();
    this.map = new Map(layout);
    this.map.addRover(1, 'primary');
    this.selectedCameraIndex = this.cameras.length - 1;
    this.selectedCamera = this.cameras[this.selectedCameraIndex];
    
    if(!this.started){
      this.animationID = requestAnimationFrame(this.gameLoop.bind(this));
    }
    this.started = true;
  },
  gameLoop: function(){
    this.frameCount += 1;
    if(this.frameCount >= 60){
      this.frameCount = 0;
    }

    Controls.keyController();
    this.moveElements();
    this.printElements();

    this.animationID = requestAnimationFrame(this.gameLoop.bind(this));
  },
  moveElements: function(){
    this.selectedCamera = this.cameras[this.selectedCameraIndex];
    if(this.selectedCamera){
      this.selectedCamera.use();
      if(this.selectedCamera.target && this.selectedCamera.target.nextMoves){
        this.selectedCamera.target.makeMoves();
      }
    }
  },
  printElements: function(){
    this.printBackground();

    if(this.selectedCamera){
      this.printCameraView(this.printObjects);
    }

  },
  printBackground: function(){
    this.context.fillStyle = Config.BACKGROUND_COLOR;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  },
  printObjects: function(){
    if(Game.selectedCamera){
      Game.map.printTilesOnScreen();
    }
    
    Game.map.actors.filter(a => a instanceof Rover).map(rover => rover.print());

    if(Config.DEBUG_CAMERA && Game.selectedCamera){
      Game.selectedCamera.showPosition();
    }
    
  },
  checkContextBounds: function(){
    let zoom = this.selectedCamera.zoom/100;
    let scale = zoom >= 0 ? zoom : zoom/2;

    var translateX = -this.selectedCamera.position.x + this.canvas.width/(2+(scale*2));
    var translateY = -this.selectedCamera.position.y + this.canvas.height/(2+(scale*2));
    
    if(translateX > Config.TILE_WIDTH){
      translateX = Config.TILE_WIDTH;
    }
    
    if(translateX < -1 * (Config.TILE_WIDTH*(this.map.grid[0].length + 1) - (this.canvas.width/(1+scale)))){
      translateX = -1 * (Config.TILE_WIDTH*(this.map.grid[0].length + 1) - (this.canvas.width/(1+scale)));
    }
    
    if(translateY > Config.TILE_HEIGHT){
      translateY = Config.TILE_HEIGHT;
    }
    
    if(translateY < -1 * (Config.TILE_HEIGHT*(this.map.grid.length + 1) - (this.canvas.height/(1+scale)))){
      translateY = -1 * (Config.TILE_HEIGHT*(this.map.grid.length + 1) - (this.canvas.height/(1+scale)));
    }
    
    return {translateX, translateY, scale};
  },
  printCameraView: function(callback){
    
    this.context.save();
    let {translateX, translateY, scale} = this.checkContextBounds();
    
    this.context.scale(1+scale, 1+scale);
    this.context.translate(translateX, translateY);   
    
    callback();
    this.context.restore();
  }
};