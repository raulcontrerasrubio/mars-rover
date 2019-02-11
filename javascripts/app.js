'use strict'

window.onload = () => {
  Game.init(Layouts.xl);
  Game.canvas = document.querySelector('#canvas');
  Game.context = Game.canvas.getContext('2d');
  
  Game.resizeCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  window.setInterval(Game.gameLoop, 1000/FRAMES_PER_SECOND);
  Controls.setup();

};