let _ = require('org.tts.js.lodash')
let Magick = require('../Magick')

module.exports = function (path, width, height, pixels, feature, cb) {
	let geometry = '"polyline '+pixels.map(p=>{return p[0].toString() + ',' + p[1].toString()})+'"'

	let cmd = `mogrify ${path} -size ${width}x${height} -background transparent -fill transparent`
		+ ` -stroke "#fbfbfbaa" -strokewidth 20 -draw ${geometry}`
		+ ` -stroke "#fffffbaa" -strokewidth 16 -draw ${geometry}`
		+ ` -stroke "#964B00aa" -strokewidth 13 -draw ${geometry}`
		+ ` "${path}"`

	Magick(cmd, cb)
}
