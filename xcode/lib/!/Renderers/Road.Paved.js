let _ = require('org.tts.js.lodash')
let Magick = require('../Magick')

module.exports = (path, width, height, pixels, feature) => {
	let geometry = '"polyline '+pixels.map(p=>{return p[0].toString() + ',' + p[1].toString()})+'"'

	let cmd = `convert -size ${width}x${height} xc:none -fill transparent`
		+ ` -stroke "#fbfbfbaa" -strokewidth 20 -draw ${geometry}`
		+ ` -stroke "#fffffbaa" -strokewidth 16 -draw ${geometry}`
		+ ` -stroke "#000000aa" -strokewidth 13 -draw ${geometry}`
		+ ` "${path}"`

	Magick(cmd)
}
