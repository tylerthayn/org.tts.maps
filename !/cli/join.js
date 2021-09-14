let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')

//let data = JSON.parse(Fs.readFileSync(Path.resolve('D:/data.json'), 'utf-8'))
let data = JSON.parse(Fs.readFileSync(Path.resolve('DATA.json'), 'utf-8'))

let _coordinates = []
if (data.type == 'FeatureCollection') {
	data.features.forEach(feature => {
		if (_coordinates.length == 0) {
			_coordinates = _.flatten([feature.geometry.coordinates])
		} else {
			let differences = [
				Difference(_.First(_coordinates), _.First(feature.geometry.coordinates)),
				Difference(_.First(_coordinates), _.Last(feature.geometry.coordinates)),
				Difference(_.Last(_coordinates), _.First(feature.geometry.coordinates)),
				Difference(_.Last(_coordinates), _.Last(feature.geometry.coordinates))
			]
			if (Math.min.apply(null, differences) == differences[0]) {
				_coordinates = _.flatten([feature.geometry.coordinates.reverse(), _coordinates])
			}
			if (Math.min.apply(null, differences) == differences[1]) {
				_coordinates = _.flatten([feature.geometry.coordinates, _coordinates])
			}
			if (Math.min.apply(null, differences) == differences[2]) {
				_coordinates = _.flatten([_coordinates, feature.geometry.coordinates])
			}
			if (Math.min.apply(null, differences) == differences[3]) {
				_coordinates = _.flatten([_coordinates, feature.geometry.coordinates.reverse()])
			}
		}

//		Fs.writeFileSync(Path.resolve('D:/Maps/db', feature.id+'.json'), JSON.stringify(feature, null, 4), 'utf-8')
	})
log(_coordinates.map(c=>{return c.join(',')}).join(' '))
}


function Difference(p1, p2) {
	return Math.abs(p1[0]-p2[0]) + Math.abs(p1[1]-p2[1])
}

