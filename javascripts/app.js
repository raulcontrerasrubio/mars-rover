'use strict'

window.onload = () => {
  
  Game.canvas = document.querySelector('#canvas');
  Game.context = Game.canvas.getContext('2d');
  Game.resizeCanvas(Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT);
  
  ImageManager.loadedImages = ImageManager.loadImages(ImageManager.dataSet);
  Tile.loadTileImage();

  Game.init(Layouts.xl);
  
  Controls.setup();
  window.setInterval(Game.gameLoop, 1000/Config.FRAMES_PER_SECOND);

};