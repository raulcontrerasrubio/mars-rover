# mars-rover
This is a project from Ironhack's prework Javascript module

## How to test the project
1. Go to the [Demo page](https://raulcontrerasrubio.github.io/mars-rover/).
2. Open your browser's developer tools. Go to the Console.
3. Now you can access to the Rover's properties and methods. These are explained in the next section.

## What you can do with the Rover
Once you have created the Rover, you can access to different properties.<br>
Write in the command line the next sentences:<br>

- Create a new Rover: `rover.push(new Rover(map, id));` where id is a number different of 0 and 1 (because de default Rover has an id of 1).
- Move forward: `rover[id].moveForward();`
- Move backward: `rover[id].moveBackward();`
- Turn right: `rover[id].turnRight();`
- Turn left: `rover[id].turnLeft();`

Change 'id' with the index of the Rover you want to move.
If you go beyond the limits of the map (10x10), or there is another obstacle, you will get an error.

## Access to the map
The map is an array of 10x10 by default. You can view where your Rover(s) is/are typing in console the next command: `map`. <br>
The map is a two-dimensional array, so maybe you have to click on the console output to see the complete array.