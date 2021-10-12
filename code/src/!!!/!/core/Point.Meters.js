//let _ = require('org.tts.js.lodash')
let configs = require('../../config')
let GlobalMercator = require('./GlobalMercator')
let Coordinate = require('./Coordinate')
let util = require('./util')

function Point (x, y, z = 0) {
	let point = [util.Round(x, configs.db.resolution.point), util.Round(y, configs.db.resolution.point), util.Round(z, configs.db.resolution.point)]
	_.Define(point, 'x', {get: () => {return point[0]}}, true)
	_.Define(point, 'y', {get: () => {return point[1]}}, true)
	_.Define(point, 'z', {get: () => {return point[2]}}, true)

	_.Define(point, 'ToLatLon', {get: () => {
		let ll = GlobalMercator.MetersToLatLon(point.x, point.y)
		return new Coordinate.LatLon(ll.lat, ll.lon, point.z)
	}}, true)
	_.Define(point, 'ToLonLat', {get: () => {
		let ll = GlobalMercator.MetersToLatLon(point.x, point.y)
		return new Coordinate.LonLat(ll.lon, ll.lat, point.z)
	}}, true)

	return point
}

module.exports = Point

/*

module.exports = function (x, y) {
	let point = new Point(x, y)

	_.Define(point, 'ToLatLon', () => {
		let ll = GlobalMercator.MetersToLatLon(point.x, point.y)
		return new Coordinate.LatLon(ll.lat, ll.lon)
	}, true)
	_.Define(point, 'ToLonLat', () => {}, true)
	_.Define(point, 'ToPixels', (zoom) => {}, true)

	return point
}
*/
