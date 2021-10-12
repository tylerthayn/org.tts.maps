let _ = require('org.tts.js.lodash')
let configs = require('../../config')
let util = require('./util')
let GlobalMercator = require('./GlobalMercator')
let Point = require('./Point')

function Coordinate (lon, lat, ele = 0) {
	let coordinate = [util.Round(lon, configs.db.resolution.coordinate), util.Round(lat, configs.db.resolution.coordinate), util.Round(ele, configs.db.resolution.coordinate)]
	_.Define(coordinate, 'lon', {get: () => {return coordinate[0]}}, true)
	_.Define(coordinate, 'lat', {get: () => {return coordinate[1]}}, true)
	_.Define(coordinate, 'ele', {get: () => {return coordinate[2]}}, true)

	_.Define(coordinate, 'ToMeters', {get: () => {
		let m = GlobalMercator.LatLonToMeters(coordinate.lat, coordinate.lon)
		return new Point.Meters(m.mx, m.my, coordinate.ele)
	}}, true)

	return coordinate
}

exports.LatLon = function (lat, lon) {return new Coordinate(lon, lat)}
exports.LonLat = function (lon, lat) {return new Coordinate(lon, lat)}
