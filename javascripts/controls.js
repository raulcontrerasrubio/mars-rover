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
  KEY_P: 80,

  presets: {
    getPrimary: () => {
      return {
        up: Controls.ARROW_UP,
        down: Controls.ARROW_DOWN,
        left: Controls.ARROW_LEFT,
        right: Controls.ARROW_RIGHT
      }
    },
    getSecondary: () => {
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
    if(Game.selectedCamera.target){
      Controls.targetControls(evt, Game.selectedCamera.target);
    }
    Controls.cameraControls(evt);
  },
  targetControls: (evt, target) => {
    var action = target.controls;

    evt.preventDefault();
    switch(evt.keyCode){
      case action.up:
        switch(target.direction){
          case 'N':
            target.moveForward();
          break;
          case 'E':
            target.turnLeft();
          break;
          case 'S':
            target.moveBackward();
          break;
          case 'W':
            target.turnRight();
          break;
        }
        
      break;
      case action.down:
        switch(target.direction){
          case 'N':
            target.moveBackward();
          break;
          case 'E':
            target.turnRight();
          break;
          case 'S':
            target.moveForward();
          break;
          case 'W':
            target.turnLeft();
          break;
        }
        
      break;
      case action.right:
        switch(target.direction){
          case 'N':
            target.turnRight();
          break;
          case 'E':
            target.moveForward();
          break;
          case 'S':
            target.turnLeft();
          break;
          case 'W':
            target.moveBackward();
          break;
        }

      break;
      case action.left:
        switch(target.direction){
          case 'N':
            target.turnLeft();
          break;
          case 'E':
            target.moveBackward();
          break;
          case 'S':
            target.turnRight();
          break;
          case 'W':
            target.moveForward();
          break;
        }

      break;
      case Controls.KEY_P:
        Game.selectedCamera.focus();
      break;
    }
  },
  cameraControls: (evt) => {
    evt.preventDefault();
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