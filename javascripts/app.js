var map = createMap(10, 10);

// Rover Object Goes Here
// ======================
var rover = {
  x: getRandomPosition(map).col,
  y: getRandomPosition(map).row,
  direction: "N",
  travelLog: []
};
// ======================
function turnLeft(rover){
  switch(rover.direction){
    case 'N':
      rover.direction = 'W';
    break;
    case 'W':
      rover.direction = 'S';
    break;
    case 'S':
      rover.direction = 'E';
    break;
    case 'E':
      rover.direction = 'N';
    break;
    default:
      console.log("Rover direction is broken!!");
    break;
  }
}

function turnRight(rover){
  switch(rover.direction){
    case 'N':
      rover.direction = 'E';
    break;
    case 'W':
      rover.direction = 'N';
    break;
    case 'S':
      rover.direction = 'W';
    break;
    case 'E':
      rover.direction = 'S';
    break;
    default:
      console.log("Rover direction is broken!!");
    break;
  }
}

function moveForward(rover){
  switch(rover.direction){
    case 'N':
      rover.y -= 1; // El sistema de coordenadas es, hacia arriba, menos y. Hacia la derecha, más x
      rover.travelLog.push({x:rover.x, y: rover.y});
    break;
    case 'W':
      rover.x -= 1;
      rover.travelLog.push({x:rover.x, y: rover.y});
    break;
    case 'S':
      rover.y += 1;
      rover.travelLog.push({x:rover.x, y: rover.y});
    break;
    case 'E':
      rover.x += 1;
      rover.travelLog.push({x:rover.x, y: rover.y});
    break;
    default:
      console.log("Rover engine is broken!!");
    break;
  }
}

function moveBackward(rover){
  switch(rover.direction){
    case 'N':
      rover.y += 1;
      rover.travelLog.push({x:rover.x, y: rover.y});
    break;
    case 'W':
      rover.x += 1;
      rover.travelLog.push({x:rover.x, y: rover.y});
    break;
    case 'S':
      rover.y -= 1;
      rover.travelLog.push({x:rover.x, y: rover.y});
    break;
    case 'E':
      rover.x -= 1;
      rover.travelLog.push({x:rover.x, y: rover.y});
    break;
    default:
      console.log("Rover engine is broken!!");
    break;
  }
}

function createMap(rows, cols){
  var map = [];
  for(var i = 0; i < rows; i += 1){
    map.push([]);
    for(var j = 0; j < cols; j += 1){
      map[i].push(0);
    }
  }

  return map;
}

function getRandomPosition(grid){
  var row = Math.floor(Math.random() * grid.length);
  var col = Math.floor(Math.random() * grid[row].length);
  return {row,col};
}

function prepareMoves(rover, list){
  list.split('').forEach(move => {
    switch(move){
      case 'f':
        moveForward(rover);
      break;
      case 'l':
        turnLeft(rover);
      break;
      case 'r':
        turnRight(rover);
      break;
      case 'b':
        moveBackward(rover);
      break;
    }
  });
  return rover.travelLog;
}