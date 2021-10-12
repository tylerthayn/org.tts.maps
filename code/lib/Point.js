let _ = require('org.tts.js.lodash')


function Point (x, y) {
	let point = [x, y]
	_.Define(point, 'x', {get: () => {return point[0]}}, true)
	_.Define(point, 'y', {get: () => {return point[1]}}, true)
	_.Define(point, 'lat', {get: () => {return point[0]}}, true)
	_.Define(point, 'lon', {get: () => {return point[1]}}, true)
	return point
}


module.exports = Point

