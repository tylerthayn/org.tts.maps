let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')
let Magick = require('../Magick')
let SizeOf = require('image-size')

let border = 'black'
let borderSize = 3
let bgColor = 'white'
let textColor = 'black'
let textStroke = 1
let textPadding = 4
let pointSize = 30

module.exports = (path, width, height, pixels, feature) => {
	let dir = Path.dirname(Path.resolve(path))
	try {Fs.mkdirSync(dir, {recursive: true})} catch (e) {}

	let labelFile = path.replace(Path.extname(path), '$'+Path.extname(path))
	let text = feature.properties.tags.name

	Magick(`convert -size ${width}x${height} xc:none -gravity center -pointsize ${pointSize} -stroke none -strokewidth 0 -annotate +0+0 "${text}" -trim +repage ${labelFile}`)
	let size = SizeOf(labelFile)
	let x = Math.round(pixels[0][0]) - size.width/2
	let y = Math.round(pixels[0][1]) - size.height

//	Magick(`convert -size 1024x1024 xc:none -page +${Math.round(pixels[0][0]) - size.width/2}+${Math.round(pixels[0][1]) - size.height/2} "${labelFile}" ${path}`)
	Magick(`convert -size ${width}x${height} xc:none -stroke ${border} -strokewidth ${borderSize} -fill ${bgColor} -draw "rectangle ${x-borderSize-textPadding},${y-borderSize-textPadding} ${x+size.width+borderSize+textPadding},${y+size.height+borderSize+textPadding}" -pointsize ${pointSize} -stroke ${textColor} -strokewidth ${textStroke} -fill ${textColor} -draw "text ${x},${y+size.height} '${text}'" +repage "${path}"`)
// -pointsize ${pointSize} -undercolor white -stroke none -strokewidth 6 -fill none -annotate +${Math.round(pixels[0][0]) - size.width/2}+${Math.round(pixels[0][1]) - size.height/2} "${text}" +repage -shave 1x1 ${path}`)
	Fs.unlinkSync(labelFile)

}
