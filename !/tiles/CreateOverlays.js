let _ = require('org.tts.js.lodash')
let Deasync = require('deasync')
let Fs = require('fs'), https = require('https')
let Tile = require('./lib/Tile')
let Feature = require('./lib/Feature')
let Turf = require('@turf/turf')
let overpass = require('query-overpass')
let Renderer = require('./lib/Renderer')
/*

function StyleLookup (feature) {
	if (feature.geometry.type == 'Point') {
		if ((_.get(feature, 'properties.tags.intermittent', 'no') == 'yes') || (!!_.get(feature,'properties.tags.natural', 'none').match(/(spring|water|stream)/i)) || (_.get(featrue, 'properties.tags.water', undefined) !== 'undefined')) {
			return _.get(feature, 'properties.tags.Inactive', false) != false ? 'Spring.Inactive' : _.get(feature, 'properties.tags.Capped', false) != false ? 'Spring.Capped' : 'Spring'
		}
		return 'Label'
	}

	if (feature.geometry.type == 'LineString') {
		if (_.get(feature, 'properties.tags.highway', undefined) !== 'undefined') {
			if (!!_.get(feature, 'properties.tags.surface', 'none').match(/(asphalt|paved|concrete)/i) || _.get(feature, 'properties.tags.tracktype', 'none') == 'grade1') {
				return 'Road.Paved'
			}
			if (!!_.get(feature, 'properties.tags.surface', 'none').match(/(dirt|gravel|ground|rock)/i) || !!_.get(feature, 'properties.tags.tracktype', 'none').match(/grade(2|3|4)/i)) {
				return 'Road.Dirt"
			}
			if (_.get(feature, 'properties.tags.tracktype', 'none') == 'trail') {
				return 'Road.Trail'
			}
			if (_.get(feature, 'properties.tags.neon', 'no') == 'yes') {
				return 'Road.Neon'
			}
			return 'Road.ATV'
		}

		if ((_.get(feature, 'properties.tags.intermittent', 'no') == 'yes') || (!!_.get(feature,'properties.tags.natural', 'none').match(/(spring|water|stream)/i)) || (_.get(featrue, 'properties.tags.water', undefined) !== 'undefined')) {
			return _.get(feature, 'properties.tags.Inactive', false) ? 'Water.Inactive' : _.get(feature, 'properties.tags.waterway', 'none') == 'stream' ? 'Creek' : 'Stream'
		}
	}

	log('Unkonw Style Type' + feature.id)
	return 'unknown'
}
*/

let tiles = JSON.parse(Fs.readFileSync('data/z13.keys.json', 'utf-8')).map(t=>{return new Tile(t)})
tiles.forEach(tile => {
	//if (tile.key != '0231002120310') {return}
	log(tile.key)

	let Render = new Renderer({
		folder: './tiles/'+tile.key,
		bounds: tile.bounds,
		width: 1024,
		height: 1024
	})

	//log(Render.Get())

	let features = JSON.parse(Fs.readFileSync('data/'+tile.key+'.json')).features.map(feature => {return Feature(feature)})
	features.forEach(feature => {
		Render(feature)
		log('\t'+feature.properties.id)
	})
	log('\n')
})

log(Renderer.Renderers)

//tiles.forEach(tile => {
//	let features = JSON.parse(Fs.readFileSync('data/'+tile.key+'.json'))
//	log(features)
//})

