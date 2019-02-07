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
    if(Game.selectedCamera){
      Game.selectedCamera.use();
    }
  }

  function printElements(){
    printBackground();

    if(Game.selectedCamera){
      printCameraView(printObjects);
    }

  }

  function printBackground(){
    Game.context.fillStyle = BACKGROUND_COLOR;
    Game.context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  function printObjects(){
    if(!Game.selectedCamera){
      Game.map.print();
    }else{
      Game.map.printTilesOnScreen();
    }
    
    Game.rovers.map(rover => rover.print());

    if(DEBUG_CAMERA && Game.selectedCamera){
      Game.selectedCamera.showPosition();
    }
    
  }

  function printCameraView(callback){
    Game.context.save();
    var translateX = -Game.selectedCamera.position.x * TILE_WIDTH + CANVAS_WIDTH/2;
    var translateY = -Game.selectedCamera.position.y * TILE_HEIGHT + CANVAS_HEIGHT/2;
    if(translateX > TILE_WIDTH){
      translateX = TILE_WIDTH;
    }

    if(translateY > TILE_HEIGHT){
      translateY = TILE_HEIGHT;
    }


    TX = translateX;
    TY = translateY;
    Game.context.translate(translateX, translateY);   
    callback();
    Game.context.restore();
  }

};

var TX;
var TY;
