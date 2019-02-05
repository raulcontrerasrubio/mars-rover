var Common = {
  drawBitMap: (useBitmap, atX, atY) => {
    Game.context.save();
    Game.context.translate(atX, atY);
    Game.context.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
    Game.context.restore();
  }
};