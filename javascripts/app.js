'use strict'

window.onload = () => {
  
  Game.canvas = document.querySelector('#canvas');
  Game.context = Game.canvas.getContext('2d');
  Game.resizeCanvas(Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT);
  
  ImageManager.loadedImages = ImageManager.loadImages(ImageManager.dataSet);
  Tile.loadTileImage();

  Controls.setup();
  
  Game.init(Layouts.xxl);

  requestAnimationFrame(Game.gameLoop);
};