let _ = require('org.tts.js.lodash')
var globalMercator = require('global-mercator')
let accessToken = 'pk.eyJ1IjoidHRzZGVzaWduIiwiYSI6ImNrc2lnd2k4aTA3MXkybnFtZGdrYnV1b2cifQ.Mo1cEgeaPgrP22w24rsBcA'
function Swap () {
	let point = _.flatten([_.toArray(arguments)])
	return [point[1], point[0]]
}

let point = [-110.8146614, 38.1213006]


let tile = globalMercator.lngLatToTile([-110.8146614, 38.1213006], 13)
let box = globalMercator.tileToBBox(tile)

let url = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/[${box[0]},${box[1]},${box[2]},${box[3]}]/1024x1024?access_token=${accessToken}`
log(url)
let bounds = globalMercator.tileToBBox(tile, 1024)
log(bounds)

log((point[0] - bounds[0])/(bounds[2]-bounds[0])*1024)
log((point[1] - bounds[1])/(bounds[3]-bounds[1])*1024)

/*let m = globalMercator.lngLatToMeters(point)
log(globalMercator.resolution(13))
log(bounds[1] - bounds[0])
let pixels = globalMercator.metersToPixels(m, 13)
let pixels2 = globalMercator.metersToPixels([bounds[0], bounds[1]], 13)
log(bounds)
log(pixels2)
log((pixels[0]/(bounds[2] - bounds[0]))*1024)

log(pixels[0]/bounds[0]*1024)
log(pixels[1]/bounds[1]*1024)

*/

