let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')
let Deasync = require('deasync')
let Parser = Deasync(require('xml2js').parseString)
let Builder = require('xml2js').Builder
let uuid = require('uuid').v4


function Kml (file) {
	let kml = Parser(Fs.readFileSync(Path.resolve(file), 'utf-8'))

	let features = {
		type: 'FeatureCollection',
		Features: []
	}

	_.get(kml, 'kml.Document[0].Placemark', []).forEach(placemark => {
		let id = uuid()
		let obj = {
			type: 'Feature',
			id: 'way/'+id,
			properties: {
				type: 'way',
				id: id,
				tags: {},
				relations: [],
				meta: {}
			},
			geometry: {
				type: 'LineString',
				coordinates: placemark.LineString[0].coordinates[0].trim().split(' ').map(c=>{return c.split(',').map(p=>{return parseFloat(p)})})
			}
		}
		features.Features.push(obj)
	})

	return features
}

if (require.main !== module) {
	module.exports = Kml
} else {
	log(Kml('D:/Maps/db/kml/1.kml'))
	//log(kml)
}


