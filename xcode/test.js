let _ = require('org.tts.js.lodash')
let Maps = require('./')

let MtEllenTile = '2031202302130'
let MtEllen = new Maps.Point.LatLon(38.1089,-110.8136)
let MtEllenPeak = new Maps.Point.LatLon(38.1213006,-110.8148)

let tile = new Maps.Tile(MtEllenTile)
log(tile)



