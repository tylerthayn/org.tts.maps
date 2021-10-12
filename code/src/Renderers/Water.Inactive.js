let _ = require('org.tts.js.lodash')
let Magick = require('../Magick')

module.exports = (path, width, height, pixels, feature, cb) => {
	let geometry = '"polyline '+pixels.map(p=>{return p[0].toString() + ',' + p[1].toString()})+'"'

	let cmd = `mogrify ${path} -size ${width}x${height} -background transparent -fill transparent`
		+ ` -stroke "#ff0000bb" -strokewidth 15 -draw ${geometry}`
		+ ` -stroke "#41AEE4ff" -strokewidth 11 -draw ${geometry}`
		+ ` "${path}"`

	Magick(cmd, cb)
}
