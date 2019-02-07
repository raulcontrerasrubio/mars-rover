var Controls = {
  presets: {
    primary: {
      up: 38,
      down: 40,
      left: 37,
      right: 39
    },
    secondary: {
      up: 87,
      down: 83,
      left: 65,
      right: 68
    }
  },
  setup: () => {
    document.addEventListener('keydown', Controls.keyHandler);
  },
  keyHandler: (evt) => {
    for(let rover of Game.rovers){
      Controls.useControls(evt, rover);
    }

    
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
  }
}