let axios = require('axios')
let _ = require('org.tts.js.lodash')
let Elevation = require('./Elevation')
let Query = require('query-overpass')

module.exports.ToKml = (data, name = '') => {
	let kml = `<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">\n<Document>\n\t<name>${name}</name>\n`

	data.features.forEach(feature => {
		let _kml = `
		<Placemark>
			<name>${feature.properties.tags.name || feature.properties.id}</name>
			<styleUrl></styleUrl>
			<ExtendedData>
				<Data name="@id">
					<value>${feature.id}</value>
				</Data>
		`
		Object.keys(feature.properties.tags).forEach(tag => {
			_kml += `
				<Data name="${tag}">
					<value>${feature.properties.tags[tag]}</value>
				</Data>
			`
		})

		_kml += `
			</ExtendedData>
			<${feature.geometry.type}>
				<coordinates>${Elevation(feature.geometry.coordinates.map(coordinate => {return coordinate[1].toString() + ',' + coordinate[0].toString()}).join('|')).map(c => {return c[0].toString()+','+c[1].toString()+','+c[2].toString()}).join(' ')}</coordinates>
			</${feature.geometry.type}>
		</Placemark>
		`

		//let coordinates = feature.geometry.coordinates.map(coordinate => {return coordinate[1].toString() + ',' + coordinate[0].toString()}).join('|')
		//log(Elevation(coordinates).map(c => {return c[0].toString()+','+c[1].toString()+','+c[2].toString()}).join(' '))

		kml += _kml

	})

	kml += `</Document>\n</kml>\n`

	return kml

}

module.exports.Query = (q) => {
	return new Promise((resolve, reject) => {
		Query(q, (error, data) => {
			if (error) return reject(error)
			resolve(data)
		}, {})
	})
}

module.exports.Node = (id) => {
	return module.exports.Query('node('+id+');out geom;')
}


module.exports.Way = (id) => {
	return module.exports.Query('way('+id+');out geom;')
}

module.exports.Relation = (id) => {
	return module.exports.Query('relation('+id+');out geom;')
}

function GetElevations (coordinates) {
	let c = []
	return Elevation(coordinates.map(coordinate => {
		return coordinate[1].toString() + ',' + coordinate[0].toString()
	}).join('|'))
}

