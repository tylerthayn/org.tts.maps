let _ = require('org.tts.js.lodash')
let Bounds = require('./Bounds')
let configs = require('../../config')
let GlobalMercator = require('./GlobalMercator')

function Tile () {
	let tile = null
	if (arguments.length == 1) {
		tile = GlobalMercator.QuadKeyToTile(arguments[0])
	}
	if (arguments.length == 2) {
		tile = GlobalMercator.LatLonToTile(arguments[0].lat, arguments[0].lon, arguments[1])
		tile.zoom = arguments[1]
	}

	this.x = tile.tx
	this.y = tile.ty
	this.zoom = tile.zoom
	this.key = GlobalMercator.QuadKey(this.x, this,y, this.zoom)

	let bounds = GlobalMercator.TileBounds(this.x, this.y, this.zoom)
	let min = GlobalMercator.MetersToLatLon(bounds.minx, bounds.miny)
	let max = GlobalMercator.MetersToLatLon(bounds.maxx, bounds.maxy)
	this.bounds = new Bounds.LonLat(min.lon, min.lat, max.lon, max.lat)

	return this
}
