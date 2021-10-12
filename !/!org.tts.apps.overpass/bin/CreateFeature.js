let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')
const { program } = require('commander');
let uuid = require('uuid').v4

program
	.option('-t, --type <type>', 'Type', 'way')
	.option('-i, --id <id>', 'Id', uuid())
	.arguments('<coordinates...>')
	.action((coordinates, program) => {
		let o = {
			type: 'Feature',
			id: program.type + '/' +program.id,
			properties: {
				type: program.type,
				id: program.id,
				tags: {
					highway: 'track',
					source: 'TTT',
					surface: 'dirt'
				},
				relations: [],
				meta: {}
			},
			geometry: {
				type: 'LineString',
				coordinates: coordinates.map(c=>{return c.split(',')})
			}
		}
		log(JSON.stringify(o, null, 4))
	})
program.parse()

/*
let data = ''
process.stdin.on('data', chunk => {data+=chunk.toString()})
process.stdin.on('end', () => {
	let Features = JSON.parse(data)
	Features.features.forEach(feature => {
		Fs.writeFileSync(Path.resolve('D:/Maps/db', feature.id+'.json'), JSON.stringify(feature, null, 4), 'utf-8')

	})
	log(data)
})


*/
