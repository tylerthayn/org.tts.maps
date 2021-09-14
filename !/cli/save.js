let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')

let data = JSON.parse(Fs.readFileSync(Path.resolve('D:/data.json'), 'utf-8'))

if (data.type == 'FeatureCollection') {
	data.features.forEach(feature => {
		Fs.writeFileSync(Path.resolve('D:/Maps/db', feature.id+'.json'), JSON.stringify(feature, null, 4), 'utf-8')
	})
} else if (data.type == 'Feature') {
	Fs.writeFileSync(Path.resolve('D:/Maps/db', data.id+'.json'), JSON.stringify(data, null, 4), 'utf-8')
}

