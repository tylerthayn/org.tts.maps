let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')
let data = ''
process.stdin.on('data', chunk => {data+=chunk.toString()})
process.stdin.on('end', () => {
	let Features = JSON.parse(data)
	Features.features.forEach(feature => {
		Fs.writeFileSync(Path.resolve('D:/Maps/db', feature.id+'.json'), JSON.stringify(feature, null, 4), 'utf-8')

	})
	log(data)
})


