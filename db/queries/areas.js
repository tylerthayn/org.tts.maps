let areaOptions = {steps: 10, units: 'miles', properties: {foo: 'bar'}}

function Swap (p) {
	return [p[1], p[0]]
}

function Area (p, r = 2, options = areaOptions) {
	return Turf.circle(p, r, options)
}

function Combine (...areas) {
	//let areas = TTS._.flatten(arguments)
	let a = areas[0]
	for (i=1; i < areas.length; i++) {
		a = Turf.union(a, areas[i])
	}
	return a
}

placemarks = {
	'Table Mountain': Swap([38.161980242926276, -110.83678299316591]),
	'Mt Ellen': Swap([38.122530463141736, -110.81519516857566]),
	'South Summit Ridge': Swap([38.07356312423072, -110.79487721499744]),
	'Mt Pennell': Swap([37.957543697411225, -110.79138889616634]),
	'Cave Flat': Swap([37.91970784654442, -110.90423593579104])
}


let collection = {
	type: 'FeatureCollection',
	features: []
}

let areas = {}
Object.keys(placemarks).forEach(placemark => {
	areas[placemark] = Area(placemarks[placemark], 5)
	collection.features.push(areas[placemark])
})



JSON.stringify(Combine(Object.keys(areas).map(k=>{return areas[k]})),null,4)

JSON.stringify(collection)
