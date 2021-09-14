let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')
let uuid = require('uuid').v4
const { program } = require('commander')

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
		Fs.writeFileSync(Path.resolve('D:/data.json'), JSON.stringify(o, null, 4), 'utf-8')
	})
program.parse()
