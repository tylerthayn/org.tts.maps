let _ = require('org.tts.js.lodash')
let Point = require('./Point')
let GlobalMercator = require('./GlobalMercator')

function Bounds (s, w, n, e) {
	let bounds = [s, w, n, e]

	_.Define(bounds, 's', {get: () => {return bounds[0]}}, true)
	_.Define(bounds, 'w', {get: () => {return bounds[1]}}, true)
	_.Define(bounds, 'n', {get: () => {return bounds[2]}}, true)
	_.Define(bounds, 'e', {get: () => {return bounds[3]}}, true)
	_.Define(bounds, 'sw', {get: () => {return new Point(bounds[1], bounds[0])}}, true)
	_.Define(bounds, 'se', {get: () => {return new Point(bounds[3], bounds[0])}}, true)
	_.Define(bounds, 'ne', {get: () => {return new Point(bounds[3], bounds[2])}}, true)
	_.Define(bounds, 'nw', {get: () => {return new Point(bounds[1], bounds[2])}}, true)

	_.Define(bounds, 'center', {get: () => {
		return [
			(s + (n - s)/2),
			(w + (e - w)/2)
		]
	}}, true)

	_.Define(bounds, 'range', {get: () => {
		let range = [n - s, e - w]
		_.Define(range, 'x', {get: () => {return range[0].toFixed(5)}}, true)
		_.Define(range, 'y', {get: () => {return range[1].toFixed(5)}}, true)
		return range
	}}, true)

	_.Define(bounds, 'Pixel', function (lat, lon) {
		let sw = GlobalMercator.LatLonToMeters(bounds[0], bounds[1])
		let ne = GlobalMercator.LatLonToMeters(bounds[2], bounds[3])
		let m = GlobalMercator.LatLonToMeters(lat, lon)

		return [
			((m.mx - sw.mx) / (ne.mx - sw.mx)).toFixed(5),
			(1 - (m.my - sw.my) / (ne.my - sw.my).toFixed(5))
		]
	})

	_.Define(bounds, 'Pixels', (coordinates) => {
		return coordinates.map(c => {
			return bounds.Pixel(c[0], c[1]).map(p=>{return [Math.round(p[0]), Math.round(p[1])]})
		})
	}, true)

	return bounds
}


module.exports = Bounds


