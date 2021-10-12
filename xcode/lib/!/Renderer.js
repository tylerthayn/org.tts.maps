let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')
let Bounds = require('./Bounds')
let Point = require('./Point')
let Magick = require('./Magick')
let Turf = require('@turf/turf')

let Renderers = require('./Renderers')

let defaults = {
	type: 'geoJSON',
	bounds: new Bounds(0, 0, 0, 9),
	width: 1024,
	height: 1024,
	folder: Path.resolve('./renderer/')
}

function Depth (value) {return Array.isArray(value) ? 1 + Math.max(...value.map(Depth)) : 0}

function StyleLookup (feature) {
	if (feature.geometry.type == 'Point') {
		if ((_.get(feature, 'properties.tags.intermittent', 'no') == 'yes') || (_.get(feature,'properties.tags.natural', 'none').match(/(spring|water|stream)/i) != null) || (_.get(feature, 'properties.tags.water', null) != null)) {
			return _.get(feature, 'properties.tags.Inactive', false) != false ? 'Spring.Inactive' : _.get(feature, 'properties.tags.Capped', false) != false ? 'Spring.Capped' : 'Spring'
		}
		return 'Label'
	}

	if (feature.geometry.type == 'LineString') {
		if (_.get(feature, 'properties.tags.highway', null) != null) {
			if (_.get(feature, 'properties.tags.road', null) != null) {
				return 'Road.'+_.capitalize(_.get(feature, 'properties.tags.road', null))
			}
			if (!!_.get(feature, 'properties.tags.surface', 'none').match(/(asphalt|paved|concrete)/i) || _.get(feature, 'properties.tags.tracktype', 'none') == 'grade1') {
				return 'Road.Paved'
			}
			if (!!_.get(feature, 'properties.tags.surface', 'none').match(/(dirt|gravel|ground|rock)/i) || !!_.get(feature, 'properties.tags.tracktype', 'none').match(/grade(2|3|4)/i)) {
				return 'Road.Dirt'
			}
			if (_.get(feature, 'properties.tags.tracktype', 'none') == 'trail') {
				return 'Road.Trail'
			}
			if (_.get(feature, 'properties.tags.neon', 'no') == 'yes') {
				return 'Road.Neon'
			}
			return 'Road.ATV'
		}

		if ((_.get(feature, 'properties.tags.intermittent', 'no') == 'yes') || (!!_.get(feature,'properties.tags.natural', 'none').match(/(spring|water|stream)/i)) || (_.get(feature, 'properties.tags.water', undefined) !== 'undefined')) {
			return _.get(feature, 'properties.tags.Inactive', false) ? 'Water.Inactive' : _.get(feature, 'properties.tags.waterway', 'none') == 'stream' ? 'Water.Stream' : 'Water'
		}
	}

	log('Unkonw Style Type' + feature.id)
	return 'unknown'
}

function Renderer () {
	let options = new _.Options(defaults, arguments[0] || {})
	try {Fs.mkdirSync(options.folder)} catch (e) {}

	let Render = (feature, style) => {
		if (typeof style === 'undefined') {
			style = StyleLookup(feature)
		}
		log(style)
		let coordinates = feature.geometry.type == 'Point' ? [feature.geometry.coordinates] : feature.geometry.type == 'LineString' ? Turf.bboxClip(Turf.lineString(feature.geometry.coordinates), [options.bounds[1], options.bounds[0], options.bounds[3], options.bounds[2]]).geometry.coordinates : feature.geometry.coordinates
		coordinates = Depth(coordinates) > 2 ? _.flatten(coordinates) : coordinates
		let pixels = options.bounds.Pixels(coordinates.map(c=>{return [c[1], c[0]]})).map(p => {return [Math.round(p[0]*options.width), Math.round(p[1]*options.height)]})
		return _.get(Renderers, style, () => {})(Path.resolve(options.folder, feature.properties.id + '.png'), options.width, options.height, pixels, feature)
	}

	_.Define(Render, 'Get', (k, _default = undefined) => {
		return typeof k === 'undefined' ? options : _.get(options, k, _default)
	})

	_.Define(Render, 'Set', (k, v) => {
		_.set(options, k, v)
		return Render
	})

	return Render

}

_.Define(Renderer, 'StyleLookup', StyleLookup)
_.Define(Renderer, 'Renderers', {get: () => {return Renderers}}, true)

module.exports = Renderer

