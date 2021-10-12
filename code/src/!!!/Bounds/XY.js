(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define('Maps/Bounds/XY', ['org.tts.js.lodash', 'Maps/Coordinate/XY', 'Maps/Range'], factory)
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('org.tts.js.lodash'), require('./Coordinate/XY'), require('./Range'))
	} else {
		factory(_)
	}
}(function (_, Coordinate, Range) {

	function Bounds (minx, miny, maxx, maxy) {
		let bounds = [
			minx < maxx ? minx : maxx,
			miny < maxy ? miny : maxy,
			maxx > minx ? maxx : minx,
			maxy > miny ? maxy : miny
		]

		_.Define(bounds, 'minx', {get: () => {return bounds[0]}}, true)
		_.Define(bounds, 'miny', {get: () => {return bounds[1]}}, true)
		_.Define(bounds, 'maxx', {get: () => {return bounds[2]}}, true)
		_.Define(bounds, 'maxy', {get: () => {return bounds[3]}}, true)

		_.Define(bounds, 'center', {get: () => {return new Coordinate(
			bounds.minx + (bounds.maxx - bounds.minx) / 2,
			bounds.miny + (bounds.maxy - bounds.miny) / 2
		)}}, true)

		_.Define(bounds, 'min', {get: () => {return new Coordinate(bounds.minx, bounds.miny)}}, true)
		_.Define(bounds, 'max', {get: () => {return new Coordinate(bounds.maxx, bounds.maxy)}}, true)

		_.Define(bounds, 'x', {get: () => {return new Range(bounds.minx, bounds.maxx)}}, true)
		_.Define(bounds, 'y', {get: () => {return new Range(bounds.miny, bounds.maxy)}}, true)

		return bounds
	}

	return Bounds
}))