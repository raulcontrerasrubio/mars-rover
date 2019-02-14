var ImageManager = {
  dataSet: {
    rover: {
      front: Config.IMAGE_DIR + 'svg/rover/rover-front.svg',
      back: Config.IMAGE_DIR + 'svg/rover/rover-back.svg',
      left: Config.IMAGE_DIR + 'svg/rover/rover-left.svg',
      right: Config.IMAGE_DIR + 'svg/rover/rover-right.svg',
      other: {new: {}}
    },
    tiles: {
      '0': Config.IMAGE_DIR + 'png32/sand/sand.png',
    },
  },
  
  currentKey: 'ImageManager.dataSet',
  findImageSource: (dataset) => {
    let response = [];

    for(let key in dataset){
      if(typeof dataset[key] === 'object'){
        console.log('Depth object', dataset[key], key)
        ImageManager.findImageSource(dataset[key]);
      }
      if(typeof dataset[key] === 'string'){
        response.push({key: key, source: dataset[key]});
      }
    }
    return response;
  },
  loadedImages: [],
  loadImages: () => {

  }
};