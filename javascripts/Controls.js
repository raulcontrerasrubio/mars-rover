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
    keyH: {
      code: 72,
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
    keyB: {
      code: 66,
      pressed: false
    },
    keyY: {
      code: 89,
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
    getPrimary: function(){
      return {
        up: Controls.validKeys.arrowUp.code,
        down: Controls.validKeys.arrowDown.code,
        left: Controls.validKeys.arrowLeft.code,
        right: Controls.validKeys.arrowRight.code
      }
    },
    getSecondary: function(){
      return {
        up: Controls.validKeys.keyW.code,
        down: Controls.validKeys.keyS.code,
        left: Controls.validKeys.keyA.code,
        right: Controls.validKeys.keyD.code
      }
    }
  },
  setup: function(){
    document.addEventListener('keydown', this.keyPress.bind(this));
    document.addEventListener('keyup', this.keyRelease.bind(this));
  },
  keyPress: function(evt){
    evt.preventDefault();
 
    for(let key in this.validKeys){
      if(this.validKeys[key].code === evt.keyCode){
        this.validKeys[key].pressed = true;
      }
    }
    
  },
  keyRelease: function(evt){
    evt.preventDefault();
    
    for(let key in this.validKeys){
      if(this.validKeys[key].code === evt.keyCode){
        this.validKeys[key].pressed = false;
      }
    }
  },

  keyController: function(){
    if(Game.selectedCamera.target){
      this.targetControls(Game.selectedCamera.target);
    }
    this.cameraControls();
  },

  targetControls: function(target){
    var action = target.controls;

    for(let key in this.validKeys){
      if(!target.isMoving() && this.validKeys[key].pressed){
        switch(this.validKeys[key].code){
          case action.up:
            switch(target.direction){
              case 'N':
                target.moveForward();
              break;
              case 'S':
                target.moveBackward();
              break;
              case 'W':
                this.validKeys[key].pressed = false;
                target.turnRight();
              break;
              case 'E':
                this.validKeys[key].pressed = false;
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
                this.validKeys[key].pressed = false;
                target.turnRight();
              break;
              case 'W':
                this.validKeys[key].pressed = false;
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
                this.validKeys[key].pressed = false;
                target.turnRight();
              break;
              case 'S':
                this.validKeys[key].pressed = false;
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
                this.validKeys[key].pressed = false;
                target.turnRight();
              break;
              case 'N':
                this.validKeys[key].pressed = false;
                target.turnLeft();
              break;
            }
    
          break;
          case this.validKeys.keyP.code:
            Game.selectedCamera.focus();
          break;
        }
      }
    }

  },
  cameraControls: function(){
    let nextZoom;
    for(let key in this.validKeys){
      if(this.validKeys[key].pressed){
        switch(this.validKeys[key].code){
          case this.validKeys.keyI.code:
            Game.selectedCamera.moveUp();
          break;
          case this.validKeys.keyK.code:
            Game.selectedCamera.moveDown();
          break;
          case this.validKeys.keyL.code:
            Game.selectedCamera.moveRight();
          break;
          case this.validKeys.keyJ.code:
            Game.selectedCamera.moveLeft();
          break;
          case this.validKeys.keyO.code:
            this.validKeys[key].pressed = false;
            Game.nextCamera();
          break;
          case this.validKeys.keyU.code:
            this.validKeys[key].pressed = false;
            Game.prevCamera();
          break;
          case this.validKeys.keyY.code:
            nextZoom = Game.selectedCamera.zoom + Game.selectedCamera.speed;
            this.validKeys[key].pressed = false;
            Game.selectedCamera.setZoom(nextZoom);
          break;
          case this.validKeys.keyH.code:
            nextZoom = Game.selectedCamera.zoom - Game.selectedCamera.speed;
            this.validKeys[key].pressed = false;
            Game.selectedCamera.setZoom(nextZoom);
          break;
          case this.validKeys.keyB.code:
            this.validKeys[key].pressed = false;
            Game.selectedCamera.restoreZoom();
          break;
        }
      }
    }
  }
}