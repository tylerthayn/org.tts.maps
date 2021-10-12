let _ = require('org.tts.js.lodash')
let Bounds = require('./Bounds.LonLat')
let Turf = require('@turf/turf')
let configs = require('../../config')
let Coordinate = require('./Coordinate')

module.exports = (geometry) => {

	_.Define(geometry, 'Bounds', {get: () => {
		if (geometry.type == 'LineString') {
			let bounds = Turf.bbox(Turf.lineString(geometry.coordinates))
			return new Bounds(bounds[0], bounds[1], bounds[2], bounds[3])
		}
	}}, true)
	_.Define(geometry.coordinates, 'ToPoints', {get: () => {
		return geometry.coordinates.map(c => {
			return new Coordinate.LonLat(c[0], c[1])
		})
	}}, true)

	return geometry
}

