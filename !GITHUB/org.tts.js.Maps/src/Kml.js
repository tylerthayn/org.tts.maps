let Parser = require('xml2js').parseString
let Builder = require('xml2js').Builder

module.exports.Load = (path) => {
	return new Promise((resolve, reject) => {
			Fs.readFile(Path.resolve(path), 'utf-8', (err, contents) => {
				Parser(contents, (err, kml) => {
					//kml.contents = contents
					resolve(kml)
				})
			})
		})
}

module.exports.Save = (path, kml) => {
	let builder = new Builder()
	let xml = builder.buildObject(kml.kml)
	Fs.writeFile(Path.resolve(path), xml.replace('<root ', '<kml ').replace('</root>', '</kml>'), 'utf-8', (err) => {})
}

module.exports.MergeStyles = function () {
	let styles = [], styleMaps = []
	_.flatten(_.toArray(arguments)).forEach(kml => {
		if (typeof _.get(kml, 'kml.Document[0].Style') !== 'undefined') {
			styles.push(kml.kml.Document[0].Style)
		}
		if (typeof _.get(kml, 'kml.Document[0].StyleMap') !== 'undefined') {
			styleMaps.push(kml.kml.Document[0].StyleMap)
		}
	})
	_.flatten(_.toArray(arguments))[0].kml.Document[0].Style = _.uniq(_.flatten(styles).map(s=>{return JSON.stringify(s)})).map(s=>{return JSON.parse(s)})
	_.flatten(_.toArray(arguments))[0].kml.Document[0].StyleMap = _.uniq(_.flatten(styleMaps).map(s=>{return JSON.stringify(s)})).map(s=>{return JSON.parse(s)})
}


module.exports.MergePlacemarks = function () {
	let _placemarks = []
	_.flatten(_.toArray(arguments)).forEach(placemark => {
		_placemarks.push(placemark.LineString[0].coordinates[0].trim().split(' '))
	})
	return _.uniq(_.flatten(_placemarks)).join(' ')
}
