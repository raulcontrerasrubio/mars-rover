'use strict'

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
    Game.context.fillRect(0, 0, Game.canvas.width, Game.canvas.height);
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
    var translateX = -Game.selectedCamera.position.x * TILE_WIDTH + Game.canvas.width/2;
    var translateY = -Game.selectedCamera.position.y * TILE_HEIGHT + Game.canvas.height/2;
    if(translateX > TILE_WIDTH){
      translateX = TILE_WIDTH;
    }

    if(translateX < -1 * (Game.canvas.width + TILE_WIDTH)){
      translateX = -1 * (Game.canvas.width + TILE_WIDTH);
    }

    if(translateY > TILE_HEIGHT){
      translateY = TILE_HEIGHT;
    }

    // if(translateY < -1 * (Game.canvas.height + TILE_HEIGHT)){
    //   translateY = -1 * (Game.canvas.height + TILE_HEIGHT);
    // }


    TX = translateX;
    TY = translateY;
    Game.context.translate(translateX, translateY);   
    callback();
    Game.context.restore();
  }

};

var TX;
var TY;
