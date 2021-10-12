(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define('Maps/Coordinate', ['org.tts.js.lodash', 'Maps/Coordinate/XY', 'Maps/Coordinate/LonLat', 'Maps/Coordinate/LatLon'], factory)
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('org.tts.js.lodash'))
	} else {
		factory(_)
	}
}(function (_, XY, LonLat, LatLon) {

	_.Define(LonLat, 'LonLat', LonLat, true)
	_.Define(LonLat, 'LatLon', LatLon, true)
	_.Define(LonLat, 'XY', XY, true)
	return LonLat

}))
