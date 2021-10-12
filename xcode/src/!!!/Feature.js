let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')
let configs = require('../../config')
let Geometry = require('./Geometry')
//let Properties = require('./Properties')
//let Tags = require('./Tags')
//let Style = require('./Style')


function Feature () {
	let feature = {}
	if (typeof arguments[0] === 'object') {
		let feature = arguments[0]
	}
	if (typeof arguments[0] === 'string') {
		if (arguments[0].trim().startsWith('{') && arguments[0].trim().endsWith('}')) {
			feature = JSON.parse(arguments[0])
		} else {
			feature = JSON.parse(Fs.readFileSync(Path.resolve(arguments[0]), 'utf-8'))
		}
	}

	Geometry(feature.geometry)

	return feature
}

module.exports = Feature
