let _ = require('lodash-tts')
let Fs = require('fs'), Path = require('path')
let parseString = require('xml2js').parseString
let Builder = require('xml2js').Builder

let kmlFile = Path.resolve('./data/roads.kml')
let stylesFile = Path.resolve(__dirname, './Styles.kml')
let outputFile = Path.resolve('./data/roads_.kml')

let configs = require('./roads_config.js')

Fs.readFile(stylesFile, 'utf-8', (err, _styles) => {
	parseString(_styles, (err, styles) => {
		styles.kml.Document[0].name = ['Roads']
		styles.kml.Document[0].description = ['']
		Fs.readFile(kmlFile, 'utf-8', (err, _kml) => {
			parseString(_kml.replace(/^\uFEFF/gm, "").replace(/^\u00BB\u00BF/gm,""), (err, kml) => {
				_.merge(kml, styles)
				kml.kml.Document.forEach(k => {
					k.Placemark.forEach(p => {
						p.styleUrl = '#Road_ATV'
						p.ExtendedData[0].Data.forEach(d => {

							if (d.$.name == '@id' && configs.vehicle.includes(d.value.toString().split('/').pop())) {
								_.log('Vehicle:'+d.value.toString().split('/').pop())
								p.styleUrl = '#Road_Vehicle'
							}
							if (d.$.name == '@id' && configs.hike.includes(d.value.toString().split('/').pop())) {
								_.log('Hike:'+d.value.toString().split('/').pop())
								p.styleUrl = '#Road_Hike'
							}
						})
					})
				})

				let builder = new Builder()
				let xml = builder.buildObject(kml.kml)
				xml = xml.replace('<root ', '<kml ').replace('</root>', '</kml>')
				Fs.writeFile(outputFile, xml, 'utf-8', (err) => {

				})
				//_.log(xml)
			})
		})
	})
})


