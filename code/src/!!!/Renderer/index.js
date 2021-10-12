let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')
let Magick = require('./Magick')

/*

function Renderer (path, w, h) {


	_.Define(this, 'Render', (name, points) => {
		let geometry = '"polyline '+points.map(p=>{return p[0]*w + ',' + p[1]*h}).join(' ')+'"'

		let cmd = `convert -size ${w}x${h} xc:none -fill transparent`
			+ ` -stroke "#fbfbfbaa" -strokewidth 12 -draw ${geometry}`
			+ ` -stroke "#fffffbaa" -strokewidth 9 -draw ${geometry}`
			+ `	-stroke "#964B0088" -strokewidth 6 -draw ${geometry}`
			+ ` "${Path.resolve(path, name+'.png')}"`
		log(cmd)
		Magick(cmd)
	})

	return this
}
module.exports = Renderer
*/

exports.Polyline = require('./Polyline')