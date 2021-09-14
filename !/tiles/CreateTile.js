let _ = require('org.tts.js.lodash')
let Fs = require('fs'), https = require('https'), Path = require('path')
let Tile = require('./lib/Tile')
const { spawn } = require('child_process')

let options = (() => {
	let options = {}
	process.argv.slice(2).forEach(arg => {
		if (arg.startsWith('--')) {
			let name = arg.split('=')[0].replace(/^--/, '')
			let val = arg.split('=')[1]
			options[name] = val
		}
	})
	return options
})()

log(options)

let tile = {}

if (Reflect.has(options, 'key')) {
	tile = new Tile(options.key)
}
if (Refkect.has(options, 'lat') && Reflect.has(options, 'lon')) {
	tile = Tile.LatLon(options.lat, options.lon)
}



