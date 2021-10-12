let _ = require('org.tts.js.lodash')
let Fs = require('fs')
let Path = require('path')
let https = require('https')
let Maps = require('../../code/src/')
let Deasync = require('deasync')
let Turf = require('@turf/turf')
let StyleLookup = require('./StyleLookup')
let count = 5
let list = JSON.parse(Fs.readFileSync('list.json', 'utf-8'))

const { exec } = require('child_process')

let Magick = Deasync((cmd, cb) => {
	//log('magick '+cmd)
	log(cmd.length)
	let im = exec('magick '+cmd, (error, stdout, stderr) => {
		//log(error)
		//log(stdout)
		//log(stderr)
		cb(error)
	})
})

let Draw = {
	Point: (path, style, pixels) => {

	},
	LineString: (path, style, pixels) => {
		if (pixels != '') {
			Magick(`convert -size 1024x1024 xc:none -stroke red -fill transparent -strokewidth 20 -draw "polyline ${pixels}" ${path}`)
		}
		//log(path)
		//log(style)
		//log(pixels)
	}
}

while (count > 0 && list.length > 0) {
	let current = list.shift()
	let tile = new Maps.Tile(current.split('/').pop().replace('.json', ''))
	log(tile.key)
	let featureCollection = JSON.parse(Fs.readFileSync(current, 'utf-8'))
	featureCollection.features.forEach(feature => {
		log('\t'+feature.id)
		//log(feature.id + " :: " + feature.geometry.type + ' :: ' + style)
		if (feature.geometry.type == 'LineString') {
			try {Fs.mkdirSync(Path.resolve('./data', tile.key))} catch (e) {}
			let _feature = Turf.bboxClip(feature, [tile.bounds[0], tile.bounds[1], tile.bounds[2], tile.bounds[3]])
			Draw.LineString(Path.resolve('./data', tile.key, feature.properties.id + '.png'), StyleLookup(feature), tile.bounds.Points(_feature.geometry.coordinates.map(c=>{return Maps.Coordinate.LonLat(c[0], c[1])})).map(c=>{return (c[0]*1024).toFixed(0) + ',' + (c[1]*1024).toFixed(0)}).join(' '))
		}
	})

	count--
}
//Fs.writeFileSync('./list.json', JSON.stringify(list, null, 4), 'utf-8')





