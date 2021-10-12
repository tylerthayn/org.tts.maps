(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define('Maps/Coordinate/LatLon', ['org.tts.js.lodash'], factory)
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('org.tts.js.lodash'))
	} else {
		factory(_)
	}
}(function (_) {

	return function Coordinate (lat, lon, ele = 0) {
		let coordinate = [lon, lat, ele]
		_.Define(coordinate, 'lon', {get: () => {return coordinate[0]}}, true)
		_.Define(coordinate, 'lat', {get: () => {return coordinate[1]}}, true)
		_.Define(coordinate, 'ele', {get: () => {return coordinate[2]}}, true)
		return coordinate
	}

}))
