(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['org.tts.js.lodash', 'Maps/Range', 'Maps/Point', 'Maps/Coordinate'], factory)
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('org.tts.js.lodash'), require('./Maps/Range'), require('./Maps/Point'), require('./Maps/Coordinate'))
	} else {
		factory(_, Range, Point, Coordinate)
	}
}(function (_, Range, Point, Coordinate) {
	let Maps = {}
	_.Define(Maps, 'Coordinate', Coordinate, true)
	_.Define(Maps, 'Point', Point, true)
	_.Define(Maps, 'Range', Range, true)
	return Maps

}))
