const { Platform, Dimensions } = require("react-native");

module.exports = {
    titles: [],
    numberOfTilesAcross: 3,
    numberOfTilesDown: 3,
    screenUsableWidth: Dimensions.get('screen').width,
    screenUsableHeight: Dimensions.get('screen').height - controlAreaHeight,
    refs : {},
    virtualTile: null,
    tileWidth: null,
    tileHeight:null,
    controlAreaHeight: this.controlAreaHeight,
    controlMenuWidth:Dimensions.get('screen').width,
    controlMenuHeight: 500,
    wonVisible:false,
    moveCount: 0,
    startTime: new Date().getTime(),
}