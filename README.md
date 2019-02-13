# mars-rover
This is a project from Ironhack's prework Javascript module

## How to test the project
1. Go to the [demo page](https://raulcontrerasrubio.github.io/mars-rover/).
2. See the next section to know the available controls.

Default rover's preset is primary.

## Keyboard Controls

Rover:<br><br>

Primary preset:<br>
* Move Up: ARROW UP
* Move Left: ARROW LEFT
* Move Down: ARROW DOWN
* Move Right: ARROW RIGHT

Secondary preset:<br>
* Move Up: W
* Move Left: A
* Move Down: S
* Move Right: D

Camera: <br><br>

* Move Up: I
* Move Left: J
* Move Down: K
* Move Right: L
* Previous Camera: U
* Next Camera: O
* Focus on the rover: P

## What you can do with the Rover using the console
First, open your browser's developer tools. Go to the console.
You can access to the current Rovers using the command `Game.rovers`.<br>
You can access to the map using the command `Game.map`.<br>
You can access to the cameras using the command `Game.cameras`.<br>
You can perform the next actions:<br>

- Create a new Rover: `Game.map.addRover(id, preset)` where id is a number different of 0 and 1 (because de default Rover has an id of 1), and preset is a string (`'primary'` to use the arrow keys to move the rover and `'secondary'` to use WASD keys).
- Move forward: `Game.rovers[id].moveForward();`
- Move backward: `Game.rovers[id].moveBackward();`
- Turn right: `Game.rovers[id].turnRight();`
- Turn left: `Game.rovers[id].turnLeft();`
- Prepare movements: `Game.rovers[id].prepareMoves(list)` Where list is a string with the next valid movements: `f b r l`

Example: To prepare your rover to go forward, forward, right, backward, left, left you enter into console: `Game.rovers[0].prepareMoves('ffrbll')`

If you put an invalid movement, the rover will stay on the same site. 

Change 'id' with the index of the Rover you want to move.<br>
If you go beyond the limits of the map, or there is another obstacle, you will get an error.<br>

## Other options

- Add a free camera: `Game.createCamera()`
- Change a free camera speed: `Game.selectedCamera.setSpeed(number)`(*)
- Add a camera attached to a rover: `Game.createCamera(Game.rovers[id])`

A free camera can move within the limits of the map.<br>
(*): If you try to do it with a camera attached to a rover, it will return false and the speed will stay the same. It also happens when you do not enter a number or that number is below the default camera min speed or above the default camera max speed (See config.js file).