# mars-rover
This is a project from Ironhack's prework Javascript module

## How to test the project
1. Go to the [Demo page](https://raulcontrerasrubio.github.io/mars-rover/).
2. Use the arrow keys to move the rover.

## What you can do with the Rover using the console
First, open your browser's developer tools. Go to the console.
You can access to the current Rovers using the command `rovers`.<br>
You can access to the map using the command `map`.<br>
You can perform the next actions:<br>

- Create a new Rover: `map.addRover(id)` where id is a number different of 0 and 1 (because de default Rover has an id of 1).
- Move forward: `rover[id].moveForward();`
- Move backward: `rover[id].moveBackward();`
- Turn right: `rover[id].turnRight();`
- Turn left: `rover[id].turnLeft();`
- Prepare movements: `rover[id].prepareMoves(list)` Where list is a string with the next valid movements: `f b r l`

Example: To prepare your rover to go forward, forward, right, backward, left, left you enter into console: `rover[0].prepareMoves('ffrbll')`

If you put an invalid movement, the rover will stay on the same site. 

Change 'id' with the index of the Rover you want to move.
If you go beyond the limits of the map, or there is another obstacle, you will get an error.