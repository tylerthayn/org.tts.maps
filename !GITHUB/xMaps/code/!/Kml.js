let Fs = require('fs'), Path = require('path')
let Deasync = require('deasync')
let Parser = Deasync(require('xml2js').parseString)
let Builder = require('xml2js').Builder

function Kml (s) {
	let contents = s.match(/\<.+\>/) ? s : Fs.readFileSync(Path.resolve(s), 'utf-8')
	return Parser(contents)
}

_.Define(Kml, 'Save', (path, kml) => {
	let builder = new Builder()
	let xml = builder.buildObject(kml.kml)
	Fs.writeFile(Path.resolve(path), xml.replace('<root ', '<kml ').replace('</root>', '</kml>'), 'utf-8', (err) => {})
})

_.Define(Kml, 'MergeStyles', function () {
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
})

/*

module.exports.Load = (path) => {
	return new Promise((resolve, reject) => {
		if (path.match(/\<.+\>/)) {
			Parser(path, (err, kml) => {
				resolve(kml)
			})
		} else {
			Fs.readFile(Path.resolve(path), 'utf-8', (err, contents) => {
				Parser(contents, (err, kml) => {
					resolve(kml)
				})
			})
		})
}


module.exports.MergePlacemarks = function () {
	let _placemarks = []
	_.flatten(_.toArray(arguments)).forEach(placemark => {
		_placemarks.push(placemark.LineString[0].coordinates[0].trim().split(' '))
	})
	return _.uniq(_.flatten(_placemarks)).join(' ')
}
*/



module.exports = Kml
