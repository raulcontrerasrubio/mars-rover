'use strict'

window.onload = () => {
  Game.canvas = document.querySelector('#canvas');
  Game.context = Game.canvas.getContext('2d');
  Game.resizeCanvas(Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT);
  
  Game.init(Layouts.xxl);
  
  window.setInterval(Game.gameLoop, 1000/Config.FRAMES_PER_SECOND);
  Controls.setup();

};