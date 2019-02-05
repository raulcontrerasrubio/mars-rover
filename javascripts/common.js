function drawBitMap(context, useBitmap, atX, atY){
  context.save();
  context.translate(atX, atY);
  context.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
  context.restore();
}