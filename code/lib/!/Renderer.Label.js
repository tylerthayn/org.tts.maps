let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')
let Magick = require('./Magick')
let SizeOf = require('image-size')

let pointSize = 30

function Label (text, x, y, path) {
	let dir = Path.dirname(Path.resolve(path))
	try {Fs.mkdirSync(dir, {recursive: true})} catch (e) {}

	Magick(`convert -size 1024x1024 xc:none -pointsize ${pointSize} -gravity center -undercolor white -stroke none -strokewidth 3 -annotate +0+0 "${text}" -trim +repage -shave 1x1 ${Path.resolve(dir, '$label$.png')}`)
	let size = SizeOf(Path.resolve(dir, '$label$.png'))
	Magick(`convert -size 1024x1024 xc:none -page +${x - size.width/2}+${y - size.height/2} "${Path.resolve(dir, '$label$.png')}" -layers flatten ${path}`)
	//Fs.unlinkSync(Path.resolve(dir, '$label$.png'))
}


Label('Tyler Drulz!', 0, 0, './tyler.png')
