var Controls = {

  validKeys: {
    arrowLeft: {
      code: 37,
      pressed: false
    },
    arrowUp: {
      code: 38,
      pressed: false
    },
    arrowDown: {
      code: 40,
      pressed: false
    },
    arrowRight: {
      code: 39,
      pressed: false
    },
    keyA: {
      code: 65,
      pressed: false
    },
    keyW: {
      code: 87,
      pressed: false
    },
    keyS: {
      code: 83,
      pressed: false
    },
    keyD: {
      code: 68,
      pressed: false
    },
    keyJ: {
      code: 74,
      pressed: false
    },
    keyI: {
      code: 73,
      pressed: false
    },
    keyK: {
      code: 75,
      pressed: false
    },
    keyL: {
      code: 76,
      pressed: false
    },
    keyU: {
      code: 85,
      pressed: false
    },
    keyO: {
      code: 79,
      pressed: false
    },
    keyP: {
      code: 80,
      pressed: false
    },
  },

  presets: {
    getPrimary: () => {
      return {
        up: Controls.validKeys.arrowUp.code,
        down: Controls.validKeys.arrowDown.code,
        left: Controls.validKeys.arrowLeft.code,
        right: Controls.validKeys.arrowRight.code
      }
    },
    getSecondary: () => {
      return {
        up: Controls.validKeys.keyW.code,
        down: Controls.validKeys.keyS.code,
        left: Controls.validKeys.keyA.code,
        right: Controls.validKeys.keyD.code
      }
    }
  },
  setup: () => {
    document.addEventListener('keydown', Controls.keyPress);
    document.addEventListener('keyup', Controls.keyRelease);
  },
  keyPress: (evt) => {
    evt.preventDefault();
 
    for(let key in Controls.validKeys){
      if(Controls.validKeys[key].code === evt.keyCode){
        Controls.validKeys[key].pressed = true;
      }
    }
    
  },
  keyRelease: (evt) => {
    evt.preventDefault();
    
    for(let key in Controls.validKeys){
      if(Controls.validKeys[key].code === evt.keyCode){
        Controls.validKeys[key].pressed = false;
      }
    }
  },

  keyController: () => {
    if(Game.selectedCamera.target){
      Controls.targetControls(Game.selectedCamera.target);
    }
    Controls.cameraControls();
  },

  targetControls: (target) => {
    var action = target.controls;

    for(let key in Controls.validKeys){
      if(!target.isMoving() && Controls.validKeys[key].pressed){
        switch(Controls.validKeys[key].code){
          case action.up:
            switch(target.direction){
              case 'N':
                target.moveForward();
              break;
              case 'S':
                target.moveBackward();
              break;
              case 'W':
                Controls.validKeys[key].pressed = false;
                target.turnRight();
              break;
              case 'E':
                Controls.validKeys[key].pressed = false;
                target.turnLeft();
              break;
            }
            
          break;
          case action.down:
            switch(target.direction){
              case 'S':
                target.moveForward();
              break;
              case 'N':
                target.moveBackward();
              break;
              case 'E':
                Controls.validKeys[key].pressed = false;
                target.turnRight();
              break;
              case 'W':
                Controls.validKeys[key].pressed = false;
                target.turnLeft();
              break;
            }
            
          break;
          case action.right:
            switch(target.direction){
              case 'E':
                target.moveForward();
              break;
              case 'W':
                target.moveBackward();
              break;
              case 'N':
                Controls.validKeys[key].pressed = false;
                target.turnRight();
              break;
              case 'S':
                Controls.validKeys[key].pressed = false;
                target.turnLeft();
              break;
            }
    
          break;
          case action.left:
            switch(target.direction){
              case 'W':
                target.moveForward();
              break;
              case 'E':
                target.moveBackward();
              break;
              case 'S':
                Controls.validKeys[key].pressed = false;
                target.turnRight();
              break;
              case 'N':
                Controls.validKeys[key].pressed = false;
                target.turnLeft();
              break;
            }
    
          break;
          case Controls.validKeys.keyP.code:
            Game.selectedCamera.focus();
          break;
        }
      }
    }

  },
  cameraControls: () => {
    for(let key in Controls.validKeys){
      if(Controls.validKeys[key].pressed){
        switch(Controls.validKeys[key].code){
          case Controls.validKeys.keyI.code:
            Game.selectedCamera.moveUp();
          break;
          case Controls.validKeys.keyK.code:
            Game.selectedCamera.moveDown();
          break;
          case Controls.validKeys.keyL.code:
            Game.selectedCamera.moveRight();
          break;
          case Controls.validKeys.keyJ.code:
            Game.selectedCamera.moveLeft();
          break;
          case Controls.validKeys.keyO.code:
            Controls.validKeys[key].pressed = false;
            Game.nextCamera();
          break;
          case Controls.validKeys.keyU.code:
            Controls.validKeys[key].pressed = false;
            Game.prevCamera();
          break;
        }
      }
    }
  }
}