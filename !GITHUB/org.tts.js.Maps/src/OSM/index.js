let _ = require('lodash-tts')
let Fs = require('fs'), Path = require('path')
let parseString = require('xml2js').parseString

//$, note, meta, node, way, relation

let Track = require('../Track')

function TypeCheck (item, type) {

	if (type.match(/(ROAD)/g)) {
		if (Object.keys(item.Tags).includes('highway')) {
			return true
		}
	}
	if (type.match(/(WATER)/g)) {
		if (Object.keys(item.Tags).includes('waterway')) {
			return true
		}

		if (Object.keys(item.Tags).includes('intermittent')) {
			return true
		}

		if (Object.keys(item.Tags).includes('natural') && item.Tags.natural == 'water') {
			return true
		}

		if (Object.keys(item.Tags).includes('natural') && item.Tags.natural == 'spring') {
			return true
		}

	}

	return false
}

function Node (e, i) {
	e.Tags = {}
	typeof e.tag !== 'undefined' && e.tag.forEach(tag => {e.Tags[tag.$.k] = tag.$.v})
	_.Define(e, 'Id', {get: () => {return e.$.id}}, true)
	_.Define(e, 'Is', (type) => {return TypeCheck(e, type)}, true)
}

function Way (e, i) {
	e.Tags = {}
	e.tag.forEach(tag => {e.Tags[tag.$.k] = tag.$.v})
	_.Define(e, 'Id', {get: () => {return e.$.id}}, true)
	_.Define(e, 'Is', (type) => {return TypeCheck(e, type)}, true)
	_.Define(e, 'Distance', () => {}, true)
}


module.exports = (s) => {
	return new Promise((resolve, reject) => {
		let xmlData = ''
		if (typeof s !== 'string') {return reject(new Error('Invalid input'))}
		parseString(_.Match(s, /\<.+\>/) ? s : Fs.readFileSync(Path.resolve(s), 'utf-8'), (err, osm) => {
			osm = osm.osm

			osm.node.forEach(Node)
			osm.way.forEach(Way)

			//osm.Tracks = []
			//osm.way.forEach(way => {
			//	let track = new Track(way)
			//	osm.Tracks.push(track)
			//})
			resolve(osm)

		})


	})
}

