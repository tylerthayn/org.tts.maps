let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')
let Magick = require('./Magick')


function Renderer (path, w, h, drawStyles) {


	_.Define(this, 'Render', (name, points) => {
		let geometry = '"polyline '+points.map(p=>{return p[0]*w + ',' + p[1]*h}).join(' ')+'"'

		let cmd = []
		cmd.push(`convert -size ${w}x${h} xc:none`)
		drawStyles.forEach(drawStyle => {
			cmd.push(` ${drawStyle} -draw ${geometry}`)
		})
		cmd.push(` "${Path.resolve(path, name+'.png')}"`)
		log(cmd.join(''))
		Magick(cmd.join(''))
	})

	return this
}


module.exports = Renderer
