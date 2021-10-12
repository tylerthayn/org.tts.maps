#!/usr/bin/env node

let _ = require('org.tts.js.lodash')
let Maps = require('../src')
const { Command, Option } = require('commander')
const program = new Command()


program
	.version('1.0.0')
	.arguments('<lon>', 'longitude coordinate of point in tile')
	.arguments('<lat>', 'latitude coordinate of point in tile')
	.option('-k, --key <key>', 'quadkey of tile')
	.option('-t, --type <type>', 'image style type', 'satellite-v9')
	.option('-z, --zoom <zoom>', 'zoom level', 13)
	.option('--no-local', 'use original tile rather than local (modified)')
	.description('Maps :: Tile')
	.action((lon, lat, command) => {
		let point = Maps.Coordinate.LonLat(parseFloat(lon.replace(`'`, '', 'g')), parseFloat(lat))
		log(command.zoom)
		log(command.type)
		log(command.local)
		log(point)
	})

program.on('option:keys', function (operands) {

	log(operands)
})

program.parse(process.argv)



