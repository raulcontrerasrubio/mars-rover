'use strict'
var canvas, ctx;

var test = [[null, 0,0],
            [null, 0,0],];
            
var l0 = [[null, null, 0, 0, 0, 0, 0, 0, 0, 0],
          [null, null, null, 0, 0, 0, 0, 0, 0, 0],
          [null, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [null, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [null, 0, 0, 0, null, null, 0, null, null, 0],
          [null, 0, 0, 0, null, null, 0, 0, 0, 0],
          [null, 0, 0, 0, null, null, null, null, null, 0],
          [null, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, null, null, null, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];


var map = new Map(l0);
var rovers = [new Rover(1)];

window.onload = () => {
  canvas = document.querySelector('#canvas');
  ctx = canvas.getContext('2d');
  
  canvas.height = CANVAS_HEIGHT;
  canvas.width = CANVAS_WIDTH;

  window.setInterval(gameLoop, 1000/FRAMES_PER_SECOND);
  Controls.setup();

  function gameLoop(){
    drawTiles();
    drawRovers();
  }
  
  function drawTiles(){
    map.print();
  }
  
  function drawRovers(){
    rovers.map(r => r.print());
  }
  
};

