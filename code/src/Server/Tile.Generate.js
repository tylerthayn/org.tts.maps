let _ = require('org.tts.js.lodash')
const { exec } = require('child_process')
let Fs = require('fs')
let Path = require('path')
let Os = require('os')
let https = require('https')
let Maps = require('../../dist/org.tts.js.Maps')
let configs = require('../../../config')
let QueryOverpass = require('query-overpass')
let Renderers = require('../Renderers')
let Turf = require('@turf/turf')

let directory = Path.join(Os.tmpdir(),'org.tts.js.Maps')
try {Fs.mkdirSync(directory)} catch (e) {}

let Magick = (cmd, cb) => {
	let im = exec('magick '+cmd, cb)
}

let Query = (tile, cb) => {

	let _Query = (tile, cb) => {
		let q = `[out:json];nwr(poly: "${tile.bounds[1]} ${tile.bounds[0]} ${tile.bounds[3]} ${tile.bounds[0]} ${tile.bounds[3]} ${tile.bounds[2]} ${tile.bounds[1]} ${tile.bounds[2]} ${tile.bounds[1]} ${tile.bounds[0]}");out geom;`
		QueryOverpass(q, (error, data) => {
			cb(null, data)
		})
	}

	_Query(tile, (error, data) => {
		if (error) {
			_Query(tile, (error, data) => {
				if (error) {
					_Query(tile, cb)
				} else {
					cb(error, data)
				}
			})
		} else {
			cb(error, data)
		}
	})

}

let Sort = (a, b) => {
	if (a.properties.type == b.properties.type) {return 0}
	if (a.properties.type == 'way' && b.properties.type == 'node') {return -1}
	if (a.properties.type == 'node' && b.properties.type == 'way') {return 1}
	return 0
}

let Download = (url, path, cb) => {
	let out = Fs.createWriteStream(path)
	out.on('error', cb)
	out.on('finish', () => {cb(null)})
	https.get(url, res => {
		res.pipe(out)
		res.on('error', cb)
	})
}

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
			return 'Road.Atv'
		}

		if ((_.get(feature, 'properties.tags.intermittent', 'no') == 'yes') || (!!_.get(feature,'properties.tags.natural', 'none').match(/(spring|water|stream)/i)) || (_.get(feature, 'properties.tags.water', undefined) !== 'undefined')) {
			return _.get(feature, 'properties.tags.Inactive', false) ? 'Water.Inactive' : _.get(feature, 'properties.tags.waterway', 'none') == 'stream' ? 'Water.Stream' : 'Water'
		}
	}

	//log('Unkonw Style Type' + feature.id)
	return 'unknown'
}

let Render = (tile, feature, cb) => {
	let path = Path.resolve(directory, tile.key + '.jpg')
	let style = StyleLookup(feature)
	if (feature.properties.type == 'way') {
		let data = Turf.bboxClip(feature, tile.bounds)
		feature.geometry.coordinates = _.flatten([data.geometry.coordinates])
		if (feature.geometry.coordinates.length < 1) {
			return cb(null)
		}
	}
	if (style != 'unknown' && style != 'Label') {
		log(feature.id+ '::'+style)
		return Renderers[style](
			path,
			1024,
			1024,
			feature.geometry.type == 'Point' ? tile.bounds.position(feature.geometry.coordinates) : feature.geometry.coordinates.map(c=>{return tile.bounds.position(c)}).map(c=>{return [Math.round(c[0]*1024), Math.round(c[1]*1024)]}),
			feature,
			cb
		)
	}
	cb(null)
	//Renderers[StyleLookup(feature)](
	//log(feature.id)
}

module.exports = (style, key, cb) => {
	let tile = new Maps.Tile(key)
	Download(`https://api.mapbox.com/styles/v1/mapbox/${style}/static/[${tile.bounds[0]},${tile.bounds[1]},${tile.bounds[2]},${tile.bounds[3]}]/1024x1024?access_token=${process.env.MapboxApiToken}`, Path.resolve(directory, tile.key + '.jpg'), error => {
		if (error) {return cb(error)}
		let bounds = new Maps.Bounds.Coordinate(tile.bounds[0], tile.bounds.center[1] - (tile.bounds[3] - tile.bounds[1]), tile.bounds[2], tile.bounds.center[1])
		Download(`https://api.mapbox.com/styles/v1/mapbox/${style}/static/[${bounds[0]},${bounds[1]},${bounds[2]},${bounds[3]}]/1024x1024?access_token=${process.env.MapboxApiToken}`, Path.resolve(directory, tile.key + '-1.jpg'), error => {
			if (error) {return cb(error)}
			Magick(`convert -size 1024x1536 xc:none -page +0+0 "${Path.resolve(directory, tile.key + '.jpg')}" -page 1024x1024+0+512 "${Path.resolve(directory, tile.key + '-1.jpg')}" -layers merge -crop 1024x1024+0+0 +repage "${Path.resolve(directory, tile.key + '.jpg')}"`, (error, stdout, sterr) => {
				if (error) {return cb(error)}
				Query(tile, (error, data) => {
					Fs.writeFile(Path.resolve(configs.tiles.folder, tile.key+'.json'), JSON.stringify(data, null, 4), 'utf8', error => {
						let features = data.features.sort(Sort)
						let fn = () => {
							if (features.length == 0) {
								Fs.copyFile(Path.resolve(directory, tile.key + '.jpg'), Path.resolve(configs.tiles.folder, style, tile.key+'.jpg'), cb)
							} else {
								Render(tile, features.shift(), error => {
									if (error) {return cb(error)}
									fn()
								})
							}
						}
						fn()
					})
				})
			})
		})
	})
}

//module.exports('satellite-v9', '0231002120313', error => {
//	log('done ('+error+')')
//})
