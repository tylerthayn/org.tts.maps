let _ = require('org.tts.js.lodash')
let Magick = require('../Magick')

module.exports = (path, width, height, pixels, feature) => {
	let geometry = '"polyline '+pixels.map(p=>{return p[0].toString() + ',' + p[1].toString()})+'"'

	let cmd = `convert -size ${width}x${height} xc:none -fill transparent`
		+ ` -stroke "#41AEE4ff" -strokewidth 13 -draw ${geometry}`
		+ ` -stroke "#0000ffcc" -strokewidth 4 -draw ${geometry}`
		+ ` "${path}"`

	Magick(cmd)
}
