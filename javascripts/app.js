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
  Game.init(Layouts.xl);
  Game.canvas = document.querySelector('#canvas');
  Game.context = Game.canvas.getContext('2d');
  Game.resizeCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  window.setInterval(gameLoop, 1000/FRAMES_PER_SECOND);
  Controls.setup();

  function gameLoop(){
    moveElements();
    printElements();  
  }

  function moveElements(){
    Game.selectedCamera.use();
  }

  function printElements(){
    printBackground();

    printCameraView(printObjects);

  }

  function printBackground(){
    Game.context.fillStyle = 'hsl(0, 20%, 15%)';
    Game.context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  function printObjects(){
    Game.map.printTilesOnScreen();
    Game.rovers.map(rover => rover.print());
    //Game.selectedCamera.showPosition();
  }

  function printCameraView(callback){
    Game.context.save();
    Game.context.translate(-Game.selectedCamera.position.x * TILE_WIDTH + CANVAS_WIDTH/2, -Game.selectedCamera.position.y * TILE_HEIGHT + CANVAS_HEIGHT/2)   
    callback();
    Game.context.restore();
  }

};
