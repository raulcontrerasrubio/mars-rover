'use strict'

var Game = {
  canvas: null,
  context:  null,
  map:  null,
  rovers: [],
  resizeCanvas: (width, height) => {
    Game.canvas.width = width;
    Game.canvas.height = height;
  },
  init: () => {
    Game.map = new Map(Layouts.l0);
    Game.rovers = [new Rover(1)];
  }
};

window.onload = () => {
  Game.init();
  Game.canvas = document.querySelector('#canvas');
  Game.context = Game.canvas.getContext('2d');
  Game.resizeCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  window.setInterval(gameLoop, 1000/FRAMES_PER_SECOND);
  Controls.setup();

  function gameLoop(){
    drawTiles();
    drawRovers();
  }
  
  function drawTiles(){
    Game.map.print();
  }
  
  function drawRovers(){
    Game.rovers.map(rover => rover.print());
  }
  
};