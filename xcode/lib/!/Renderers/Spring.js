let _ = require('org.tts.js.lodash')
let Magick = require('../Magick')

module.exports = (path, width, height, pixels, feature) => {
	let geometry = '"circle '+Math.round(pixels[0][0])+','+Math.round(pixels[0][1])+' '+(Math.round(pixels[0][0])-10).toString()+','+(Math.round(pixels[0][1])-10).toString()+'"'
	let cmd = `convert -size ${width}x${height} xc:none -fill "#0000ffaa" -strokewidth 10 -stroke "#41AEE4aa" -draw ${geometry} "${path}"`
	Magick(cmd)
}
