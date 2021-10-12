module.exports = [`(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(factory)
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory()
	} else {
		(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this)['Maps'] = factory()
	}
}(function () {

`,
`
	return {
		Bounds: Bounds,
		Coordinate: Coordinate,
		GlobalMercator: GlobalMercator,
		Point: Point,
		Range: Range,
		Tile: Tile
	}
}))
`
]
