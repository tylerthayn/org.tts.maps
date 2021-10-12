let _ = require('org.tts.js.lodash')
let Magick = require('../Magick')

module.exports = (path, width, height, pixels, feature) => {
	let geometry = '"circle '+pixels[0]+','+pixels[1]+' '+(pixels[0]-10).toString()+','+(pixels[1]-10).toString()+'"'
	let cmd = `convert -size ${width}x${height} xc:none -fill "#000000aa" strokewidth 10 -stroke "#41AEE4aa" -draw ${geometry} "${path}"`
	Magick(cmd)
}
