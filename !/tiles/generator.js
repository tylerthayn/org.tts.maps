let _ = require('org.tts.js.lodash')
let Tile = require('./Tile')
let Point = require('./Point')
let accessToken = 'pk.eyJ1IjoidHRzZGVzaWduIiwiYSI6ImNrc2lnd2k4aTA3MXkybnFtZGdrYnV1b2cifQ.Mo1cEgeaPgrP22w24rsBcA'

let center = new Point(38.1213006, -110.8146614)
let zoom = 13
let bearing = 0
let img = {w: 1024, h: 1024}

let tile = Tile.LatLon(center.lat, center.lon, zoom)
//log(tile)
//log(tile.bounds.AsLatLon)

//let url = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/${center[0]},${center[1]},${zoom},${bearing}/${img.w}x${img.h}?access_token=${accessToken}`
//let url = `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/[${tile.bounds.AsLatLon.s},${tile.bounds.AsLatLon.w},${tile.bounds.AsLatLon.n},${tile.bounds.AsLatLon.e}]/${tile.size}x${tile.size}?access_token=${accessToken}`
//log(url)
//log(tile.GetPixel(point.x, point.y, 1024, 1024))
//tile.Download('./'+tile.key+'.jpg', img.w, img.h, () => {
	log(tile.OverlayFeature('D:\\Maps\\db\\way\\335413437.json', img.w, img.h))
//})
//paths
//let cmd = `magick convert ${tile.key}.jpg -fill red -stroke- purple -draw "polyline ''" ${tile.key}.jpg\nPAUSE`



