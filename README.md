# mars-rover
This is a project from Ironhack's prework Javascript module

## How to test the project
1. Go to the [Demo page](https://raulcontrerasrubio.github.io/mars-rover/).
2. Use the arrow keys to move the rover.

## What you can do with the Rover using the console
First, open your browser's developer tools. Go to the console.
You can access to the current Rovers using the command `Game.rovers`.<br>
You can access to the map using the command `Game.map`.<br>
You can perform the next actions:<br>

- Create a new Rover: `Game.map.addRover(id, preset)` where id is a number different of 0 and 1 (because de default Rover has an id of 1), and preset is a string ('primary' to use the arrow keys to move the rover and 'secondary' to use WASD keys).
- Move forward: `Game.rovers[id].moveForward();`
- Move backward: `Game.rovers[id].moveBackward();`
- Turn right: `Game.rovers[id].turnRight();`
- Turn left: `Game.rovers[id].turnLeft();`
- Prepare movements: `Game.rovers[id].prepareMoves(list)` Where list is a string with the next valid movements: `f b r l`

Example: To prepare your rover to go forward, forward, right, backward, left, left you enter into console: `Game.rovers[0].prepareMoves('ffrbll')`

If you put an invalid movement, the rover will stay on the same site. 

Change 'id' with the index of the Rover you want to move.
If you go beyond the limits of the map, or there is another obstacle, you will get an error.