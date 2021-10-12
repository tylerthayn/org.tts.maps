(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define('Maps/Core', ['org.tts.js.lodash', 'Maps/Range', 'Maps/Point', 'Maps/Coordinate'], factory)
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('org.tts.js.lodash'), require('@turf/turf'))
	} else {
		factory(_, Range, Point, Coordinate)
	}
}(function (_, Range, Point, Coordinate) {

	let Core = {}
	_.Define(Core, 'Coordinate', Coordinate, true)
	_.Define(Core, 'Point', Point, true)
	_.Define(Core, 'Range', Range, true)
	return Core

}))
