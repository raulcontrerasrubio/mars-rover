'use strict';

window.onload = function(){  
  ImageManager.loadedImages = ImageManager.loadImages(ImageManager.dataSet);
  Tile.loadTileImage();
  Controls.setup();
  
  Game.init(Layouts.xxl);
};