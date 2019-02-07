var Game = {
  canvas: null,
  context:  null,
  map:  null,
  rovers: null,
  cameras: null,
  selectedCamera: null,
  resizeCanvas: (width, height) => {
    Game.canvas.width = width;
    Game.canvas.height = height;
  },
  init: (layout) => {
    Game.map = new Map(layout);
    Game.rovers = [new Rover(1)];
    Game.cameras = [new Camera(Game.rovers[0])];
    Game.selectedCamera = Game.cameras[0];
  }
};