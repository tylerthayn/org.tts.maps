let _ = require('org.tts.js.lodash')
let configs = require('../../config')

let Point = require('./Point')
let Range = require('./Range')
let util = require('./util')

function Bounds (minlon, minlat, maxlon, maxlat) {
	let bounds = [
		 util.Round(minlon, configs.db.resolution.coordinate),
		 util.Round(minlat, configs.db.resolution.coordinate),
		 util.Round(maxlon, configs.db.resolution.coordinate),
		 util.Round(maxlat, configs.db.resolution.coordinate)
	]

	_.Define(bounds, 'minlon', {get: () => {return bounds[0]}}, true)
	_.Define(bounds, 'minlat', {get: () => {return bounds[1]}}, true)
	_.Define(bounds, 'maxlon', {get: () => {return bounds[2]}}, true)
	_.Define(bounds, 'maxlat', {get: () => {return bounds[3]}}, true)

	_.Define(bounds, 'center', {get: () => {return new Point.LonLat(
		bounds.minlon + (bounds.maxlon - bounds.minlon)/2,
		bounds.minlat + (bounds.maxlat - bounds.minlat)/2
	)}}, true)

	_.Define(bounds, 'min', {get: () => {return new Point.LonLat(bounds.minlon, bounds.minlat)}}, true)
	_.Define(bounds, 'max', {get: () => {return new Point.LonLat(bounds.maxlon, bounds.maxlat)}}, true)

	_.Define(bounds, 'lon', {get: () => {return new Range(bounds.minlon, bounds.maxlon)}}, true)
	_.Define(bounds, 'lat', {get: () => {return new Range(bounds.minlat, bounds.maxlat)}}, true)

	_.Define(bounds, 'Point', (point) => {
		return [
			(point.lon - bounds.minlon) / (bounds.maxlon - bounds.minlon),
			(point.lat - bounds.minlat) / (bounds.maxlat - bounds.minlat)
		]
	})
	_.Define(bounds, 'Points', (points) => {
		let _points = []
		points.forEach(point => {
			_points.push(bounds.Point(point))
		})
		return _points
	})

	return bounds
}

module.exports = Bounds
