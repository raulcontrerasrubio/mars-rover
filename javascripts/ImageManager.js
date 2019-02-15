var ImageManager = {
  dataSet: {
    rover_front: 'svg/rover/rover-front.svg',
    rover_back: 'svg/rover/rover-back.svg',
    rover_right: 'svg/rover/rover-right.svg',
    rover_left: 'svg/rover/rover-left.svg',
    tile_0: 'png32/sand/sand.png',
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