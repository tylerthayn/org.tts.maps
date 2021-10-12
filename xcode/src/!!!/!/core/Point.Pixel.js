let _ = require('org.tts.js.lodash')
let configs = require('../../config')

let Point = require('./Point')

module.exports = function (x, y) {
	let point = new Point(x, y)

	_.Define(point, 'ToLatLon', () => {}, true)
	_.Define(point, 'ToLonLat', () => {}, true)
	_.Define(point, 'ToMeters', (zoom) => {}, true)

	return point
}
