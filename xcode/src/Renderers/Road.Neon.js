let _ = require('org.tts.js.lodash')
let Magick = require('../Magick')

module.exports = (path, width, height, pixels, feature) => {
	let geometry = '"polyline '+pixels.map(p=>{return p[0].toString() + ',' + p[1].toString()})+'"'

	let cmd = `mogrify ${path} -size ${width}x${height} -background transparent -fill transparent`
		+ ` -stroke "#ff00ffaa" -strokewidth 12 -draw ${geometry}`
		+ ` -stroke "#fffffbaa" -strokewidth 9 -draw ${geometry}`
		+ ` -stroke "#964B0044" -strokewidth 6 -draw ${geometry}`
		+ ` "${path}"`

	Magick(cmd)
}
