let _ = require('org.tts.js.lodash')

function Range (min, max) {
	let range = [min, max]

	_.Define(range, 'min', {get: () => {return min}}, true)
	_.Define(range, 'max', {get: () => {return max}}, true)

	return range
}

module.exports = Range
