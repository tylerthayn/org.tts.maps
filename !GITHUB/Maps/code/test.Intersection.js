let _ = require('org.tts.js.lodash')
let Maps = require('./')
let Turf = require('@turf/turf')


let Convert = {
	Mercator: Turf.toMercator,
	WGS84: Turf.toWgs84
}

/*
log(Convert.WGS84([38.1286,-110.8010]))
log(Convert.Mercator(Convert.WGS84([38.1286,-110.8010])))

process.exit()
let pt = Turf.point([38.1286,-110.8010])
let pt2 = Turf.point([ 0.0003425150414207958, -0.0009953423179127683 ])
log(pt)
log(pt2)
log(Turf.toMercator(pt2))
log(Turf.toWgs84([38.1286,-110.8010]))
//log(Turf.toMercator(Turf.toWgs84(pt)))

//log(Convert.ToXYZ([38.1286,-110.8010]))

Maps.Overpass.Way('32004586').then(data1 => {
	Maps.Overpass.Relation('2308411').then(data2 => {
		log(data1.features[0].geometry.coordinates.map(p => {return [p[1], p[0]]}))
		log(data2.features[0].geometry.coordinates.map(p => {return [p[1], p[0]]}))
		let intersects = Turf.lineIntersect(
			Turf.lineString(data1.features[0].geometry.coordinates.map(p => {return [p[1], p[0]]})),
			Turf.lineString(data2.features[0].geometry.coordinates.map(p => {return [p[1], p[0]]}))
		)
		_.logj(intersects)
	})
})
*/
//let path1 = '762295044', path2 = '630174617'
//let path1 = '32004586', path2 = '2308411'
let path1 = '10084849', path2 = '784925565'
Maps.Overpass.Way(path1).then(data1 => {
	Maps.Overpass.Way(path2).then(data2 => {

		_.logj(Turf.lineSplit(
			Turf.lineString(data1.features[0].geometry.coordinates.map(p => {return [p[1], p[0]]})),
			Turf.lineString(data2.features[0].geometry.coordinates.map(p => {return [p[1], p[0]]}))
		))
/*
		let intersect = Turf.lineIntersect(
			Turf.lineString(data1.features[0].geometry.coordinates.map(p => {return [p[1], p[0]]})),
			Turf.lineString(data2.features[0].geometry.coordinates.map(p => {return [p[1], p[0]]}))
		)

		if (intersect.features.length > 0) {
			log(intersect.features[0].geometry.coordinates)
		}
*/
	})


}).catch(log)


function IsBetween (p1, p2, p3) {
	return p3[0] >= Math.min(p1[0], p2[0]) && p3[0] <= Math.max(p1[0], p2[0])
}

function IsSafePoint (p) {
	return Number.isSafeInteger(p[0]) && Number.isSafeInteger(p[1])
}

function Intersections (path1, path2) {
	let intersections = []
	for (let i = 1; i<path1.length; i++) {
		for (let j = 1; j<path2.length; j++) {
			let p = Intersect([path1[i-1], path1[i]], [path2[j-1], path2[j]])
			IsSafePoint(p) && IsBetween(path1[i-1], path1[i], p) && intersections.push(p)
		}
	}
	return intersections
}



function Intersect (l1, l2) {
	function FnData (p1, p2) {
		let m = (p2[1] - p1[1])/(p2[0] - p1[0])
		let b = p1[1] - m * p1[0]
		return {m: m, b: b}
	}

	function LineIntersect (fn1, fn2) {
		let x = (fn2.b - fn1.b) / (fn1.m - fn2.m)
		let y = fn1.m * x + fn1.b
		return [x, y]
	}

	return LineIntersect(FnData(l1[0], l1[1]), FnData(l2[0], l2[1]))
}


