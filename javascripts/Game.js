var Game = {
  canvas: null,
  context:  null,
  frameCount: null,
  map:  null,
  cameras: null,
  selectedCamera: null,
  selectedCameraIndex: null,
  createCamera: (target = null) => {
    if(target){
      Game.cameras.push(new Camera(target));
    }else{
      Game.cameras.push(new Camera());
    }
    
    Game.selectedCameraIndex = Game.cameras.length - 1;
  },
  prevCamera: () => {
    let lastCamera = Game.cameras.length - 1;
    if(Game.selectedCameraIndex - 1 < 0){
      Game.selectedCameraIndex = lastCamera;
      return;
    }
    Game.selectedCameraIndex -= 1;
  },
  nextCamera: () => {
    let lastCamera = Game.cameras.length - 1;
    if(Game.selectedCameraIndex + 1 > lastCamera){
      Game.selectedCameraIndex = 0;
      return;
    }
    Game.selectedCameraIndex += 1;
  },
  resizeCanvas: (width, height) => {
    Game.canvas.width = width;
    Game.canvas.height = height;

    if(Game.cameras){
      for(let camera of Game.cameras){
        camera.updateView();
      }
    }
  },
  init: (layout) => {
    Game.frameCount = 0;
    Game.map = new Map(layout);
    Game.cameras = [];
    Game.map.addRover(1, 'primary');
    Game.selectedCameraIndex = Game.cameras.length - 1;
    Game.selectedCamera = Game.cameras[Game.selectedCameraIndex];
  },
  gameLoop: () => {
    Game.frameCount += 1;
    if(Game.frameCount >= 60){
      Game.frameCount = 0;
    }

    Controls.keyController();
    Game.moveElements();
    Game.printElements();

    requestAnimationFrame(Game.gameLoop);
  },
  moveElements: () => {
    Game.selectedCamera = Game.cameras[Game.selectedCameraIndex];
    if(Game.selectedCamera){
      Game.selectedCamera.use();
      if(Game.selectedCamera.target && Game.selectedCamera.target.nextMoves){
        Game.selectedCamera.target.makeMoves();
      }
    }
  },
  printElements: () => {
    Game.printBackground();

    if(Game.selectedCamera){
      Game.printCameraView(Game.printObjects);
    }

  },
  printBackground: () => {
    Game.context.fillStyle = Config.BACKGROUND_COLOR;
    Game.context.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
  },
  printObjects: () => {
    if(Game.selectedCamera){
      Game.map.printTilesOnScreen();
    }
    
    Game.map.actors.filter(a => a instanceof Rover).map(rover => rover.print());

    if(Config.DEBUG_CAMERA && Game.selectedCamera){
      Game.selectedCamera.showPosition();
    }
    
  },
  checkContextBounds: () => {
    let zoom = Game.selectedCamera.zoom/100;
    var translateX = -Game.selectedCamera.position.x + (Game.canvas.width/2) / (zoom);
    var translateY = -Game.selectedCamera.position.y + (Game.canvas.height/2) / (zoom);

    
    if(translateX > Config.TILE_WIDTH){
      translateX = Config.TILE_WIDTH;
    }

    if(translateX < -1 * (((Game.map.grid[0].length*zoom) - (Game.canvas.width/(Config.TILE_WIDTH/(zoom))) + (1*(zoom))) * (Config.TILE_WIDTH/(zoom))) * ((zoom))){
      translateX = -1 * (((Game.map.grid[0].length*zoom) - (Game.canvas.width/(Config.TILE_WIDTH/(zoom))) + (1*(zoom))) * (Config.TILE_WIDTH/(zoom))) * ((zoom));
    }

    if(translateY > Config.TILE_HEIGHT){
      translateY = Config.TILE_HEIGHT;
    }

    if(translateY < -1 * (((Game.map.grid.length*zoom) - (Game.canvas.height/(Config.TILE_HEIGHT/(zoom))) + (1*(zoom))) * (Config.TILE_HEIGHT/(zoom))) * ((zoom))){
      translateY = -1 * (((Game.map.grid.length*zoom) - (Game.canvas.height/(Config.TILE_HEIGHT/(zoom))) + (1*(zoom))) * (Config.TILE_HEIGHT/(zoom))) * ((zoom));
    }
    
    return {translateX, translateY, zoom};
  },
  printCameraView: (callback) => {
    Game.context.save();
    let {translateX, translateY, zoom} = Game.checkContextBounds();

    TX = translateX;
    TY = translateY;

    Game.context.scale(zoom, zoom);
    Game.context.translate(translateX, translateY);   
    //if(Game.selectedCamera.target && Game.selectedCamera.zoom !== 100){Game.selectedCamera.focus();}

    callback();
    Game.context.restore();
  }
};

var TX;
var TY;