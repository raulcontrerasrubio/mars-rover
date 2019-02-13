var Controls = {
  
  // Primary controls
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
  ARROW_RIGHT: 39,

  // Secondary controls
  KEY_A: 65,
  KEY_W: 87,
  KEY_S: 83,
  KEY_D: 68,

  // Camera controls
  KEY_J: 74,
  KEY_I: 73,
  KEY_K: 75,
  KEY_L: 76,
  // Extended actions
  KEY_U: 85,
  KEY_O: 79,

  presets: {
    primary: () => {
      return {
        up: Controls.ARROW_UP,
        down: Controls.ARROW_DOWN,
        left: Controls.ARROW_LEFT,
        right: Controls.ARROW_RIGHT
      }
    },
    secondary: () => {
      return {
        up: Controls.KEY_W,
        down: Controls.KEY_S,
        left: Controls.KEY_A,
        right: Controls.KEY_D
      }
    }
  },
  setup: () => {
    document.addEventListener('keydown', Controls.keyHandler);
  },
  keyHandler: (evt) => {
    Controls.useControls(evt, Game.selectedCamera.target);
    Controls.cameraControls(evt);
  },
  useControls: (evt, rover) => {
    var action = rover.controls;

    evt.preventDefault();
    switch(evt.keyCode){
      case action.up:
        switch(rover.direction){
          case 'N':
            rover.moveForward();
          break;
          case 'E':
            rover.turnLeft();
          break;
          case 'S':
            rover.moveBackward();
          break;
          case 'W':
            rover.turnRight();
          break;
        }
        
      break;
      case action.down:
        switch(rover.direction){
          case 'N':
            rover.moveBackward();
          break;
          case 'E':
            rover.turnRight();
          break;
          case 'S':
            rover.moveForward();
          break;
          case 'W':
            rover.turnLeft();
          break;
        }
        
      break;
      case action.right:
        switch(rover.direction){
          case 'N':
            rover.turnRight();
          break;
          case 'E':
            rover.moveForward();
          break;
          case 'S':
            rover.turnLeft();
          break;
          case 'W':
            rover.moveBackward();
          break;
        }

      break;
      case action.left:
        switch(rover.direction){
          case 'N':
            rover.turnLeft();
          break;
          case 'E':
            rover.moveBackward();
          break;
          case 'S':
            rover.turnRight();
          break;
          case 'W':
            rover.moveForward();
          break;
        }

      break;
    }
  },
  cameraControls: (evt) => {
    switch(evt.keyCode){
      case Controls.KEY_J:
        Game.selectedCamera.moveLeft();
      break;
      case Controls.KEY_I:
        Game.selectedCamera.moveUp();
      break;
      case Controls.KEY_K:
        Game.selectedCamera.moveDown();
      break;
      case Controls.KEY_L:
        Game.selectedCamera.moveRight();
      break;
      case Controls.KEY_U:
        Game.prevCamera();
      break;
      case Controls.KEY_O:
        Game.nextCamera();
      break;
    }
  }
}