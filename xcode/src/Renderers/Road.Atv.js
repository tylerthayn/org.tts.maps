let _ = require('org.tts.js.lodash')
let Magick = require('../Magick')

module.exports = function (path, width, height, pixels, feature, cb) {
	let geometry = '"polyline '+pixels.map(p=>{return Math.round(p[0]) + ',' + Math.round(p[1])}).join(' ')+'"'

	let cmd = `mogrify ${path} -size ${width}x${height} -background transparent -fill transparent`
		+ ` -stroke "#fbfbfbaa" -strokewidth 12 -draw ${geometry}`
		+ ` -stroke "#fffffbaa" -strokewidth 9 -draw ${geometry}`
		+ ` -stroke "#964B0088" -strokewidth 6 -draw ${geometry}`
		+ ` "${path}"`

	Magick(cmd, cb)
}
