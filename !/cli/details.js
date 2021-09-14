let _ = require('org.tts.js.lodash')
let Fs = require('fs')

if (process.argv[2] == 'data.json') {
	let data = JSON.parse(Fs.readFileSync('D:/data.json'))
	_.logj(data)
}
if (process.argv[2] == 'data.kml') {
	let Kml = require('./lib/Kml')
	Kml.Use(require.resolve('./plugins/Styler'))
	let kml = new Kml('D:/data.kml')
	_.logj(kml.kml.Document[0])
}
