let _ = require('org.tts.js.lodash')
const { program } = require('commander')
let Fs = require('fs'), Path = require('path')
program
  .version('0.1.0')
  .arguments('<features...>')
	.action((features, program) => {
		let featureCollection = {
			type: 'FeatureCollection',
			features: []
		}
		features.forEach(feature => {
			featureCollection.features.push(JSON.parse(Fs.readFileSync(Path.resolve('D:/Maps/db', feature+'.json'), 'utf-8')))
		})
		Fs.writeFileSync(Path.resolve('D:/data.json'), JSON.stringify(featureCollection, null, 4), 'utf-8')
	})


program.parse(process.argv);
