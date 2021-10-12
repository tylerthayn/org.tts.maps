let _ = require('org.tts.js.lodash')
let Path = require('path')
let Geometry = require('./Geometry')
let Bounds = require('./Bounds')
let Point = require('./Point')
let Magick = require('./Magick')
let Turf = require('@turf/turf')

function DrawLineString (path, coordinates, w, h, bounds, style) {
	//if (coordinates.length > 750) {
	//	for (let i = 0; i < Math.floor(coordinates.length/750); i++) {
	//		DrawLineString (path.replace('.png', '-'+i+'.png'), coordinates.slice(i*750, i*750+750), w, h, bounds)
	//	}
	//} else {
		let pixels = coordinates.map(c => {
			return bounds.Pixel(c[0], c[1])
		}).map(p => {return (w*p[0]).toFixed().toString() + ',' + (h*p[1]).toFixed().toString()}).join(' ')
		Magick(`convert -size ${w}x${h} xc:none -strokewidth 10 -fill transparent -stroke blue -draw "polyline ${pixels}" ${path}`)
	//}
}

module.exports = (feature) => {
	Geometry(feature.geometry)

	_.Define(feature, 'IsWater', {get: () => {
		if (feature.properties.tags.intermittent == 'yes') {
			return true
		}
		return false
	}}, true)
	_.Define(feature, 'IsRoad', {get: () => {
		if (Reflect.has(feature.properties.tags, 'highway')) {
			return true
		}
		return false
	}}, true)

	_.Define(feature, 'IsTrail', {get: () => {
		if (Reflect.has(feature.properties.tags, 'trail')) {
			return true
		}
		return false
	}}, true)



	_.Define(feature, 'Draw', function (path, w, h, bounds = geometry.bounds) {
		if (this.geometry.type == 'LineString') {
			let coordinates = Turf.bboxClip(Turf.lineString(this.geometry.coordinates), [bounds[1], bounds[0], bounds[3], bounds[2]]).geometry.coordinates
			//log(this.geometry.coordinates.length + ' >> '+coordinates.length)
			let pixels = coordinates.map(c => {
				return bounds.Pixel(c[1], c[0])
			}).map(p => {return (w*p[0]).toFixed().toString() + ',' + (h*p[1]).toFixed().toString()}).join(' ')

			let width = 10
			let stroke = 'purple'
			if (this.IsRoad) {
				stroke = 'white'
			}
			if (this.IsWater) {
				stroke = 'blue'
			}
			if (this.IsTrail) {
				stroke = 'yellow'
			}

			Magick(`convert -size ${w}x${h} xc:none -strokewidth ${(width*2).toFixed()} -fill transparent -stroke red -draw "polyline ${pixels}" ${path.replace('.png', '-0.png')}`)
// magick convert -size 1024x1024 xc:none -strokewidth 15 -fill transparent -stroke red -draw "polyline 191,1024 184,1017 156,1002 137,997 120,992 113,987 85,981 61,981 30,967 16,955 10,954 6,954" PNG32:${path.replace('.png', '-0.png')}`)
			Magick(`convert -size ${w}x${h} xc:none -strokewidth ${width} -fill transparent -stroke ${stroke} -draw "polyline ${pixels}" PNG32:${path.replace('.png', '-1.png')}`)
		}
		if (this.geometry.type == 'Point') {
			let pixel = bounds.Pixel(this.geometry.coordinates[1], this.geometry.coordinates[0])
			pixel[0] = pixel[0] * w
			pixel[1] = pixel[1] * h

			//Magick(`convert -size ${w}x${h} xc:none "label:${this.properties.tags.name}" -pointsize 50 -strokewidth 10 -fill red -stroke yellow PNG32:${path.replace('.png', '-0.png')}`)

/*
			Magick(`convert -background lightblue -fill blue \


          -font Candice -pointsize 72 label:Anthony \
          label.gif

			let pixel = bounds.Pixel(this.geometry.coordinates[1], this.geometry.coordinates[0])
			pixel[0] = pixel[0] * w
			pixel[1] = pixel[1] * h
*/
			if (this.properties.tags.natural == 'spring') {
				Magick(`convert -size ${w}x${h} xc:none -strokewidth 10 -fill red -stroke blue -draw "circle ${pixel.join(',')}, ${pixel[0] - 10},${pixel[1]-10}" PNG32:${path}`)
			}
		}
		if (this.geometry.type == 'Polygon') {

		}

	})

	return feature
}


/*
exports.CreateOverlay = (feature, Pixels, w, h, path) => {
	log(feature.geometry.type)
	if (feature.geometry.type == 'Point') {
		CreateOverlay_Point(feature, Pixels, w, h, path)
	}
	if (feature.geometry.type == 'LineString') {
		CreateOverlay_LineString(feature, Pixels, w, h, path)
	}
}

function CreateOverlay_LineString (feature, tile, w, h, path) {
	let _path = Path.resolve(path, feature.id.replace('/', '-')+'.png')
	log('LineString: '+_path)
	log(feature.geometry.coordinates.map(point => {return new Point(point[1], point[0])}), w, h)

	let coordinates = tile.Pixels(feature.geometry.coordinates.map(point => {return new Point(point[1], point[0])}), w, h).map(point => {return `${point[1].toFixed()},${point[0].toFixed()}`}).join(' ')
	log(coordinates)
	Magick(`convert -size ${w}x${h} xc:white -strokewidth 10 -fill transparent -stroke blue -draw "polyline ${coordinates}" ${_path}`)

}

function CreateOverlay_Point (node, Pixels, w, h, path) {
	let _path = Path.resolve(path, node.id.replace('/', '-')+'.gif')
	log('Point: '+_path)
	//Magick(`convert -size ${w}x${h} xc:transparent -strokewidth 10 -fill transparent -stroke blue -draw "point ${feature.geometry.coordinates}" ${path}`)

}
*/

