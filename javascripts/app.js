'use strict'

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
  }
};

window.onload = () => {
  Game.init(Layouts.l);
  Game.canvas = document.querySelector('#canvas');
  Game.context = Game.canvas.getContext('2d');
  Game.resizeCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  window.setInterval(gameLoop, 1000/FRAMES_PER_SECOND);
  Controls.setup();

  function gameLoop(){
    // Game.context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Game.context.save();
    // Game.context.translate(TILE_WIDTH * Game.selectedCamera.position.x, TILE_HEIGHT * Game.selectedCamera.position.y);
    
    Game.map.print();
    Game.rovers.map(rover => rover.print());
    Game.selectedCamera.use();
    //Game.context.restore();
    
  }
  
  cam = Game.selectedCamera;
  pl = Game.rovers[0];
};

var cam,pl;