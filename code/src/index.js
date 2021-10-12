;(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['org.tts.js.lodash', 'Maps/GlobalMercator', 'Maps/Range', 'Maps/Point', 'Maps/Coordinate', 'Maps/Bounds', 'Maps/Tile'], factory)
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('org.tts.js.lodash'), require('./GlobalMercator'), require('./Range'), require('./Point'), require('./Coordinate'), require('./Bounds'), require('./Tile'))
	} else {
		factory(_, Range, Point, Coordinate, Tile)
	}
}(function (_, GlobalMercator, Range, Point, Coordinate, Bounds, Tile) {
	return {
		Bounds: Bounds,
		Coordinate: Coordinate,
		GLobalMercator: GlobalMercator,
		Point: Point,
		Range: Range,
		Tile: Tile
	}
	//_.Define(Core, 'Coordinate', Coordinate, true)
	//_.Define(Core, 'Point', Point, true)
	//_.Define(Core, 'Range', Range, true)
	//return Core

}))
