// CANVAS
const CANVAS_HEIGHT = 320;
const CANVAS_WIDTH = 480;

const FRAMES_PER_SECOND = 30;

// TILES
const TILE_HEIGHT = 32;
const TILE_WIDTH = 32;
const TILE_STROKE = 0;

// MAP
const DEFAULT_MAP_ROWS = 9;
const DEFAULT_MAP_COLS = 11;

// CAMERA 
const TARGET_TOP_LIMIT_TO_MOVE_CAMERA = Math.floor((CANVAS_HEIGHT/6) / TILE_HEIGHT);
const TARGET_BOTTOM_LIMIT_TO_MOVE_CAMERA = Math.floor((CANVAS_HEIGHT/6) / TILE_HEIGHT);
const TARGET_LEFT_LIMIT_TO_MOVE_CAMERA = Math.floor((CANVAS_WIDTH/6) / TILE_WIDTH);
const TARGET_RIGHT_LIMIT_TO_MOVE_CAMERA = Math.floor((CANVAS_WIDTH/6) / TILE_WIDTH);

const CAMERA_TILES_SIDES_UP_BOTTOM = Math.floor((CANVAS_HEIGHT/TILE_HEIGHT)/2) + 3;
const CAMERA_TILES_SIDES_RIGHT_LEFT = Math.floor((CANVAS_WIDTH/TILE_WIDTH)/2) + 3;