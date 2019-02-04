'use strict'

// Constantes
const CANVAS_HEIGHT = 320;
const CANVAS_WIDTH = 320;
const FRAMES_PER_SECOND = 60;
const TILE_HEIGHT = 32;
const TILE_WIDTH = 32;
const TILE_STROKE = 1;

const DEFAULT_MAP_ROWS = 10;
const DEFAULT_MAP_COLS = 10;

var Map = function(layout){
  var self = this;

  Map.prototype.createEmptyMap = (rows, cols) => {
    var map = [];
    for(var i = 0; i < rows; i += 1){
      map.push([]);
      for(var j = 0; j < cols; j += 1){
        map[i].push(0);
      }
    }
    return map;
  };

  if(layout){
    this.grid = layout;
  }else{
    this.grid = this.createEmptyMap(DEFAULT_MAP_ROWS, DEFAULT_MAP_COLS);
  }

  this.isAnyTileAvailable = () => {
    for(var r of self.grid){
      if(r.indexOf(0) !== -1){
        return true;
      }
    }
    return false;
  }

  this.getRandomPosition = (rover = null) => {
    if(self.isAnyTileAvailable()){
      var valid = false;
      while(!valid){
        var row = Math.floor(Math.random() * self.grid.length);
        var col = Math.floor(Math.random() * self.grid[row].length);
        valid = self.grid[row][col] === 0;
      }
      
      if(rover){
        rover.printPosition(col, row);
      }

      return {row,col};
    }else{
      return false;
    }
  }

  this.getMapLimits = () => {
    return {minX: 0, maxX: self.grid[0].length - 1, minY: 0, maxY: self.grid.length - 1}
  };

  this.limits = this.getMapLimits();
  
  this.isInMapBounds = (x, y) => {
    return (x >= self.limits.minX && x <= self.limits.maxX && y >= self.limits.minY && y <= self.limits.maxY);
  };
  
  this.isFreeCell = (x, y) => {
    return self.isInMapBounds(x, y) && self.grid[y][x] === 0;
  };

  this.addRover = function(id){
    if(self.isAnyTileAvailable()){
      if(!rover.filter((r) => r.id == id).includes(true)){ // No funciona
        rover.push(new Rover(self, id));
        return true;
      }else{
        console.log("Ya existe otro Rover con ese id");
      }
    }else{
      console.log("¡No hay más espacio!");
    }
    return false;
  }

  this.print = function(context){
    for(let i = 0, rows = this.grid.length; i < rows; i += 1){
      for(let j = 0, cols = this.grid[i].length; j < cols; j += 1){
        if(this.grid[i][j] || this.grid[i][j] === 0){
          context.fillStyle = 'hsl(30, 50%, 50%)';
          context.fillRect(TILE_WIDTH * j, TILE_HEIGHT * i, TILE_WIDTH - TILE_STROKE, TILE_HEIGHT - TILE_STROKE);
        }
      }
    }
  }
  
}

var Rover = function(map, id = 0){

  var self = this;

  this.id = id;
  this.image = new Image();
  this.image.src = this.image.src = 'images/rover-back.svg';

  Rover.prototype.obstacleReached = () => {
    console.log("There is an obstacle in front of you!");
  }
  this.clearPosition = (x, y) => {
    map.grid[y][x] = 0;
  }
  this.printPosition = (x, y) => {
    map.grid[y][x] = self.id;
  }

  var initialPosition = map.getRandomPosition(this);

  if(!initialPosition){
    console.log("No hay ningún espacio disponible en el mapa");
    delete window[this];
    return;
  }

  this.x = initialPosition.col;
  this.y = initialPosition.row;
  this.direction = "N";

  this.getPositionX = () => self.x;
  this.getPositionY = () => self.y;
  this.travelLog = [{x: this.getPositionX(), y: this.getPositionY()}];

  // Motion
  this.turnLeft = () => {
    switch(self.direction){
      case 'N':
        self.direction = 'W';
        this.image.src = 'images/rover-left.svg';
      break;
      case 'W':
        self.direction = 'S';
        this.image.src = 'images/rover-front.svg';
      break;
      case 'S':
        self.direction = 'E';
        this.image.src = 'images/rover-right.svg';
      break;
      case 'E':
        self.direction = 'N';
        this.image.src = 'images/rover-back.svg';
      break;
      default:
        console.log("Rover direction is broken!!");
      break;
    }
  };

  this.turnRight = () => {
    switch(self.direction){
      case 'N':
        self.direction = 'E';
        this.image.src = 'images/rover-right.svg';
      break;
      case 'W':
        self.direction = 'N';
        this.image.src = 'images/rover-back.svg';
      break;
      case 'S':
        self.direction = 'W';
        this.image.src = 'images/rover-left.svg';
      break;
      case 'E':
        self.direction = 'S';
        this.image.src = 'images/rover-front.svg';
      break;
      default:
        console.log("Rover direction is broken!!");
      break;
    }
  };

  this.moveForward = () => {
    let nextMove;
    switch(self.direction){
      case 'N':
        nextMove = self.y - 1;
        if(!map.isFreeCell(self.x, nextMove)){
          self.obstacleReached();
        }else{
          self.clearPosition(self.x, self.y);
          self.y = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          self.printPosition(self.x, self.y);
        }
      break;
      case 'W':
        nextMove = self.x - 1;
        if(!map.isFreeCell(nextMove, self.y)){
          self.obstacleReached();
        }else{
          self.clearPosition(self.x, self.y);
          self.x = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          self.printPosition(self.x, self.y);
        }
      break;
      case 'S':
        nextMove = self.y + 1;
        if(!map.isFreeCell(self.x, nextMove)){
          self.obstacleReached();
        }else{
          self.clearPosition(self.x, self.y);
          self.y = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          self.printPosition(self.x, self.y);
        }
      break;
      case 'E':
        nextMove = self.x + 1;
        if(!map.isFreeCell(nextMove, self.y)){
          self.obstacleReached();
        }else{
          self.clearPosition(self.x, self.y);
          self.x = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          self.printPosition(self.x, self.y);
        }
      break;
      default:
        console.log("Rover engine is broken!!");
      break;
    }
  };

  this.moveBackward = () => {
    let nextMove;
    switch(self.direction){
      case 'N':
        nextMove = self.y + 1;
        if(!map.isFreeCell(self.x, nextMove)){
          self.obstacleReached();
        }else{
          self.clearPosition(self.x, self.y);
          self.y = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          self.printPosition(self.x, self.y);
        }
      break;
      case 'W':
        nextMove = self.x + 1;
        if(!map.isFreeCell(nextMove, self.y)){
          self.obstacleReached();
        }else{
          self.clearPosition(self.x, self.y);
          self.x = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          self.printPosition(self.x, self.y);
        }
      break;
      case 'S':
        nextMove = self.y - 1;
        if(!map.isFreeCell(self.x, nextMove)){
          self.obstacleReached();
        }else{
          self.clearPosition(self.x, self.y);
          self.y = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          self.printPosition(self.x, self.y);
        }
      break;
      case 'E':
        nextMove = self.x - 1;
        if(!map.isFreeCell(nextMove, self.y)){
          self.obstacleReached();
        }else{
          self.clearPosition(self.x, self.y);
          self.x = nextMove;
          self.travelLog.push({x:self.x, y: self.y});
          self.printPosition(self.x, self.y);
        }
      break;
      default:
        console.log("Rover engine is broken!!");
      break;
    }
  };

  this.prepareMoves = (list) => {
    var validMoves = ['f', 'l', 'r', 'b'];
    var movements = list.slice().split('');
    var fails = 0;

    for(var letter of movements){
      if(!validMoves.includes(letter)){
        fails += 1;
      }
    }
    
    if(fails <= 0){
      movements.forEach(move => {
        switch(move){
          case 'f':
            self.moveForward();
          break;
          case 'l':
            self.turnLeft();
          break;
          case 'r':
            self.turnRight();
          break;
          case 'b':
            self.moveBackward();
          break;
        }
      });
    }else{
      console.error("Some of the movements are not valid. The Rover stays in the same position.");
    }

    return self.travelLog;
  }

  this.print = function(context){
    drawBitMapWithRotation(context, this.image , (this.x * TILE_WIDTH) + TILE_WIDTH/2 ,(this.y * TILE_HEIGHT) + TILE_HEIGHT/2);
  }

}

function drawBitMapWithRotation(context, useBitmap, atX, atY){
  context.save();
  context.translate(atX, atY);
  context.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
  context.restore();
}

window.onload = () => {
  var canvas = document.querySelector('#canvas');
  var ctx = canvas.getContext('2d');
  
  canvas.height = CANVAS_HEIGHT;
  canvas.width = CANVAS_WIDTH;

  window.setInterval(gameLoop, 1000/FRAMES_PER_SECOND);

  function gameLoop(){
    drawTiles();
    drawRover();
  }
  
  function drawTiles(){
    map.print(ctx);
  }
  
  function drawRover(){
    rover.map(r => r.print(ctx));
  }
  
};

var test = [[null, 0,0],
            [null, 0,0],]
var l0 = [[null, null, 0, 0, 0, 0, 0, 0, 0, 0],
          [null, null, null, 0, 0, 0, 0, 0, 0, 0],
          [null, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [null, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [null, 0, 0, 0, null, null, 0, null, null, 0],
          [null, 0, 0, 0, null, null, 0, 0, 0, 0],
          [null, 0, 0, 0, null, null, null, null, null, 0],
          [null, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, null, null, null, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]


var map = new Map(l0);
var rover = [new Rover(map, 1)];

document.addEventListener('keydown', (evt) => {
    evt.preventDefault();
    switch(evt.keyCode){
      case 38:
        switch(rover[0].direction){
          case 'N':
            rover[0].moveForward();
          break;
          case 'E':
            rover[0].turnLeft();
          break;
          case 'S':
            rover[0].moveBackward();
          break;
          case 'W':
            rover[0].turnRight();
          break;
        }
        
      break;
      case 40:
        switch(rover[0].direction){
          case 'N':
            rover[0].moveBackward();
          break;
          case 'E':
            rover[0].turnRight();
          break;
          case 'S':
            rover[0].moveForward();
          break;
          case 'W':
            rover[0].turnLeft();
          break;
        }
        
      break;
      case 39:
        switch(rover[0].direction){
          case 'N':
            rover[0].turnRight();
          break;
          case 'E':
            rover[0].moveForward();
          break;
          case 'S':
            rover[0].turnLeft();
          break;
          case 'W':
            rover[0].moveBackward();
          break;
        }

      break;
      case 37:
        switch(rover[0].direction){
          case 'N':
            rover[0].turnLeft();
          break;
          case 'E':
            rover[0].moveBackward();
          break;
          case 'S':
            rover[0].turnRight();
          break;
          case 'W':
            rover[0].moveForward();
          break;
        }

      break;
    }
  });