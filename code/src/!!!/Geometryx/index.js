let _ = require('org.tts.js.lodash')
let configs = require('../../../config')

let types = ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon', 'GeometryCollection']

let Geometries = {
	//Point: require('./Point'),
	//MultiPoint: require('./MultiPoint')
	//LineString: require('./LineString'),
	//MultiLineString: require('./MultiLineString')
	//Polygon: require('./Polygon')
	//MultiPolygon: require('./MultiPolygon')
	//GeometryCollection: require('./GeometryCollection')
}

function Geometry () {
	//if (arguments.length > 1) {
	//	if (!Object.keys(Geometries).includes(arguments[0]) {
	//		throw new Error('Invalid geometry type: '+arguments[0])
	//	}
	//
	//} else
	let type = '', coordinates = []
	if (typeof arguments[0] === 'object') {
		if (Reflect.has(arguments[0], 'type')) {
			type = arguments[0].type
		}
		if (Reflect.has(arguments[0], 'coordinates')) {
			coordinates = arguments[0].coordinates
		}
	} else if (typeof arguments[0] === 'string') {
		let o = JSON.parse(arguments[0])
		if (Reflect.has(o, 'type')) {
			type = o.type
		}
		if (Reflect.has(o, 'coordinates')) {
			coordinates = o.coordinates
		}
	}

	if (Object.keys(Geometries).includes(type)) {
		return new Geometries[type](coordinates)
	} else {
		throw new Error('Unknown Geometry Input')
	}
}

//_.Define(Geometry, 'Base', require('./Base'), true)
Object.keys(Geometries).forEach(type => {
	_.Define(Geometry, type, Geometries[type], true)
})

module.exports = Geometry
