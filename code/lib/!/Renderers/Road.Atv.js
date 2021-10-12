let _ = require('org.tts.js.lodash')
let Magick = require('../Magick')

module.exports = (path, width, height, pixels, feature) => {
	let geometry = '"polyline '+pixels.map(p=>{return Math.round(p[0]) + ',' + Math.round(p[1])}).join(' ')+'"'

	let cmd = `convert -size ${width}x${height} xc:none -fill transparent`
		+ ` -stroke "#fbfbfbaa" -strokewidth 12 -draw ${geometry}`
		+ ` -stroke "#fffffbaa" -strokewidth 9 -draw ${geometry}`
		+ ` -stroke "#964B0088" -strokewidth 6 -draw ${geometry}`
		+ ` "${path}"`

	Magick(cmd)
}
