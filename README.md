# mars-rover
This is a solution for the [Mars Rover Kata](http://kata-log.rocks/mars-rover-kata).

## How to test the project
1. Go to the [demo page](https://raulcontrerasrubio.github.io/mars-rover/).
2. See the next section to know the available controls.

Default rover's preset is primary.

## Keyboard Controls

Rover:<br>
Primary preset:
* Move Up: ARROW UP
* Move Left: ARROW LEFT
* Move Down: ARROW DOWN
* Move Right: ARROW RIGHT

Secondary preset:
* Move Up: W
* Move Left: A
* Move Down: S
* Move Right: D

Camera: <br>
* Move Up: I
* Move Left: J
* Move Down: K
* Move Right: L
* Previous Camera: U
* Next Camera: O
* Focus on the rover: P
* Zoom-in: Y
* Zoom-out: H
* Restore zoom: B

## What you can do with the Rover using the console
First, open your browser's developer tools. Go to the console.
You can access to the map using the command `Game.map`.<br>
You can access to the current Actors (it includes Rovers) using the command `Game.map.actors`.<br>
You can access to the cameras using the command `Game.cameras`.<br>
You can perform the next actions:<br>

- Create a new Rover: `Game.map.addRover(id, preset)` where id is a number different of 0 and 1 (because the default Rover has an id of 1), and preset is a string (`'primary'` to use the arrow keys to move the rover and `'secondary'` to use WASD keys).
- Move forward: `Game.map.actors[id].moveForward();`
- Move backward: `Game.map.actors[id].moveBackward();`
- Turn right: `Game.map.actors[id].turnRight();`
- Turn left: `Game.map.actors[id].turnLeft();`
- Prepare movements: `Game.map.actors[id].prepareMoves(list)` Where list is a string with the next valid movements: `f b r l`

Example: To prepare your rover to go forward, forward, right, backward, left, left you enter into console: `Game.map.actors[id].prepareMoves('ffrbll')`

If you put an invalid movement, the rover will stay on the same site. 

Change 'id' with the index of the Rover you want to move.<br>
If you go beyond the limits of the map, or there is another obstacle, you will get an error.<br>

## Another options

- Add a free camera: `Game.createCamera()`
- Change a free camera speed: `Game.selectedCamera.setSpeed(number)`(*)
- Change the zoom of the camera: `Game.selectedCamera.setZoom(number)`(**)
- Restore camera zoom: `Game.selectedCamera.restoreZoom()`
- Add a camera attached to a rover: `Game.createCamera(Game.map.actors[id])`

A free camera can move within the limits of the map.<br><br>
(*): If you try to do it with a camera attached to a rover, it will return false and the speed will be the same. It also happens when you do not enter a number or that number is below the default camera min speed or above the default camera max speed (See config.js file).<br>
(**): You must enter a number between the min and the max camera zoom (see javascripts/Config.js file). The speed of the zoom is related with the speed of the camera. The default parameters are `-150 <= number <= 150`.

## Change layout
To choose another map write in the browser's console: `Game.init(Layouts.layout)` where `layout` is one valid layout (see javascripts/Layouts.js). The available layouts are (separated by commas): `test, l0, l, xl, xxl, lvl1`.<br>
To change the default map change the `Game.init(Layouts.xxl)` line on javascripts/app.js file.
