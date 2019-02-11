var Game = {
  canvas: null,
  context:  null,
  map:  null,
  rovers: null,
  cameras: null,
  selectedCamera: null,
  resizeCanvas: (width, height) => {
    Game.canvas.width = width;
    Game.canvas.height = height;
  },
  init: (layout) => {
    Game.map = new Map(layout);
    Game.rovers = [new Rover(1)];
    Game.cameras = [new Camera(Game.rovers[0])];
    Game.selectedCamera = Game.cameras[0];
  },
  gameLoop: () => {
    Game.moveElements();
    Game.printElements();  
  },
  moveElements: () => {
    if(Game.selectedCamera){
      Game.selectedCamera.use();
    }
  },
  printElements: () => {
    Game.printBackground();

    if(Game.selectedCamera){
      Game.printCameraView(Game.printObjects);
    }

  },
  printBackground: () => {
    Game.context.fillStyle = BACKGROUND_COLOR;
    Game.context.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
  },
  printObjects: () => {
    if(!Game.selectedCamera){
      Game.map.print();
    }else{
      Game.map.printTilesOnScreen();
    }
    
    Game.rovers.map(rover => rover.print());

    if(DEBUG_CAMERA && Game.selectedCamera){
      Game.selectedCamera.showPosition();
    }
    
  },
  printCameraView: (callback) => {
    Game.context.save();
    
    var translateX = -Game.selectedCamera.position.x * TILE_WIDTH + Game.canvas.width/2;
    var translateY = -Game.selectedCamera.position.y * TILE_HEIGHT + Game.canvas.height/2;
    
    if(translateX > TILE_WIDTH){
      translateX = TILE_WIDTH;
    }

    if(translateX < -1 * ((Game.map.grid[0].length) - (Game.canvas.width/TILE_WIDTH) + 1) * TILE_WIDTH){
      translateX = -1 * ((Game.map.grid[0].length) - (Game.canvas.width/TILE_WIDTH) + 1) * TILE_WIDTH;
    }

    if(translateY > TILE_HEIGHT){
      translateY = TILE_HEIGHT;
    }

    if(translateY < -1 * ((Game.map.grid.length) - (Game.canvas.height/TILE_HEIGHT) + 1) * TILE_HEIGHT){
      translateY = -1 * ((Game.map.grid.length) - (Game.canvas.height/TILE_HEIGHT) + 1) * TILE_HEIGHT;
    }

    Game.context.translate(translateX, translateY);   
    callback();
    Game.context.restore();
  }
};