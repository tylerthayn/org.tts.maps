let _ = require('org.tts.js.lodash')
let Path = require('path')
let Bounds = require('./Bounds')
let Point = require('./Point')
let GlobalMercator = require('./GlobalMercator')
let Magick = require('./Magick')
let Turf = require('@turf/turf')


function DrawLineString (path, coordinates, w, h, bounds, style) {
	if (coordinates.length > 750) {
		for (let i = 0; i < Math.floor(coordinates.length/750); i++) {
			DrawLineString (path.replace('.png', '-'+i+'.png'), coordinates.slice(i*750, i*750+750), w, h, bounds)
		}
	} else {
		let pixels = coordinates.map(c => {
			return bounds.Pixel(c[0], c[1])
		}).map(p => {return (w*p[0]).toFixed().toString() + ',' + (h*p[1]).toFixed().toString()}).join(' ')
		Magick(`convert -size ${w}x${h} xc:none -strokewidth 10 -fill transparent -stroke blue -draw "polyline ${pixels}" ${path}`)
	}
}

function DrawPoint (path, coordinates, w, h, bounds) {
log(coordinates)
	let pixel = bounds.Pixel(coordinates[0], coordinates[1])
	pixel[0] = pixel[0] * w
	pixel[1] = pixel[1] * h
	log(pixel)
	Magick(`convert -size ${w}x${h} xc:none -strokewidth 10 -fill red -stroke blue -draw "circle ${pixel.join(',')}, ${pixel[0] - 10},${pixel[1]-10}" ${path}`)
}

module.exports = (geometry) => {
	let bounds = []
	if (geometry.type == 'Point') {
		let point = Turf.point([geometry.coordinates[1], geometry.coordinates[0]])
		bounds = Turf.bbox(point)
	}
	if (geometry.type == 'LineString') {
		let line = Turf.lineString(geometry.coordinates.map(c => {return [c[1], c[0]]}))
		bounds = Turf.bbox(line)
	}

	geometry.bounds = new Bounds(bounds[0], bounds[1], bounds[2], bounds[3])


	_.Define(geometry, 'Draw', (path, w, h, bounds = geometry.bounds) => {
		if (geometry.type == 'LineString') {
			DrawLineString(path, geometry.coordinates.map(c => {return [c[1], c[0]]}), w, h, bounds)
		}
		if (geometry.type == 'Point') {
			log(geometry.type + ' :: '+path)
			DrawPoint(path, [geometry.coordinates[1], geometry.coordinates[0]], w, h, bounds)
		}

	})

	return geometry
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

