var ImageManager = {
  dataSet: {
    rover_front: 'svg/rover/rover-front.svg',
    rover_back: 'svg/rover/rover-back.svg',
    rover_right: 'svg/rover/rover-right.svg',
    rover_left: 'svg/rover/rover-left.svg',
    tile_0: 'png32/sand/sand.png',
    tile_1: 'png32/cliff/cliff-top.png',
    tile_2: 'png32/cliff/cliff-bottom.png',
    tile_3: 'png32/cliff/cliff-right.png',
    tile_4: 'png32/cliff/cliff-left.png',
    tile_5: 'png32/cliff/cliff-top-right.png',
    tile_6: 'png32/cliff/cliff-top-left.png',
    tile_7: 'png32/cliff/cliff-bottom-right.png',
    tile_8: 'png32/cliff/cliff-bottom-left.png',
    tile_9: 'png32/cliff/cliff-end-top-right.png',
    tile_10: 'png32/cliff/cliff-end-top-left.png',
    tile_11: 'png32/cliff/cliff-end-bottom-right.png',
    tile_12: 'png32/cliff/cliff-end-bottom-left.png',
  },
  
  loadedImages: {},
  loadImages: (dataset) => {
    let response = {};
    for(let key in dataset){
      response[key] = new Image();
      response[key].src = Config.IMAGE_DIR + dataset[key];
    }
    return response;
  },
};