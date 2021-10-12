#!/usr/bin/env node

let _ = require('org.tts.js.lodash')
let Fs = require('fs')
const { Command } = require('commander')
const program = new Command()


program
	.version('0.0.1')
	.description('Maps :: Kml :: Export')

program
	.command('geoJSON [input] [output]')
	.option('--stdin', 'kml input from stdin rather than file')
	.option('--stdout', 'output to stdout rather than file')
	.description('export as geoJSON')
	.action(function (input, output, command) {
		/*
		let inStream = command.stdin ? process.stdin : Fs.createReadStream(input, 'utf-8')

		let data = ''
		inStream.on('data', (chunk) => {
			data += chunk.toString()
		})
		inStream.on('end', () => {
			log(data)
			process.exit()
		})
		*/
	})

program
	.command('gpx <path>')
	.description('export as gpx')
	.action(() => {
		log('gpx')
	})

program.parse(process.argv);



