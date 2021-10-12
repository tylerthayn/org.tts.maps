let _ = require('org.tts.js.lodash')
let configs = require('../../config')
let util = require('./util')

function Bounds (minx, miny, maxx, maxy) {
	let bounds = [
		util.Round(minx, configs.db.resolution.point),
		util.Round(miny, configs.db.resolution.point),
		util.Round(maxx, configs.db.resolution.point),
		util.Round(maxy, configs.db.resolution.point)
	]

	_.Define(bounds, 'minx', {get: () => {return bounds[0]}}, true)
	_.Define(bounds, 'miny', {get: () => {return bounds[1]}}, true)
	_.Define(bounds, 'maxx', {get: () => {return bounds[2]}}, true)
	_.Define(bounds, 'maxy', {get: () => {return bounds[3]}}, true)

	_.Define(bounds, 'center', {get: () => {return new Point.XY(
		bounds.minx + (bounds.maxx - bounds.minx) / 2,
		bounds.miny + (bounds.maxy - bounds.miny) / 2
	)}}, true)

	_.Define(bounds, 'min', {get: () => {return new Point.XY(bounds.minx, bounds.miny)}}, true)
	_.Define(bounds, 'max', {get: () => {return new Point.XY(bounds.maxx, bounds.maxy)}}, true)

	_.Define(bounds, 'x', {get: () => {return new Range(bounds.minx, bounds.maxx)}}, true)
	_.Define(bounds, 'y', {get: () => {return new Range(bounds.miny, bounds.maxy)}}, true)

	return bounds
}

module.exports = Bounds
