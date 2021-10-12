
function Bounds (minlon, minlat, maxlon, maxlat) {
	let bounds = [
		minlon < maxlon ? minlon : maxlon,
		minlat < maxlat ? minlat : maxlat,
		maxlon > minlon ? maxlon : minlon,
		maxlat > minlat ? maxlat : minlat
	]

	Object.defineProperty(bounds, 'minlon', {enummerable: true, get: () => {return bounds[0]}})
	Object.defineProperty(bounds, 'minlat', {enummerable: true, get: () => {return bounds[1]}})
	Object.defineProperty(bounds, 'maxlon', {enummerable: true, get: () => {return bounds[2]}})
	Object.defineProperty(bounds, 'maxlat', {enummerable: true, get: () => {return bounds[3]}})

	Object.defineProperty(bounds, 'center', {enumerable: true, get: () => {
		return new Coordinate(
			bounds.minlon + (bounds.maxlon - bounds.minlon)/2,
			bounds.minlat + (bounds.maxlat - bounds.minlat)/2
		)
	}})

	Object.defineProperty(bounds, 'min', {enumerable: true, get: () => {return new Coordinate(bounds.minlon, bounds.minlat)}})
	Object.defineProperty(bounds, 'max', {enumerable: true, get: () => {return new Coordinate(bounds.maxlon, bounds.maxlat)}})
	Object.defineProperty(bounds, 'lon', {enumerable: true, get: () => {return new Range(bounds.minlon, bounds.maxlon)}})
	Object.defineProperty(bounds, 'lat', {enumerable: true, get: () => {return new Range(bounds.minlat, bounds.maxlat)}})

	Object.defineProperty(bounds, 'position', {enumerable: true, value: function (point) {
		if (Array.isArray(point) && Array.isArray(point[0])) {
			let positions = []
			point.forEach(p => {
				positions.push(bounds.position(p))
			})
			return positions
		}

		if (Reflect.has(point, 'lon') && Reflect.has(point, 'lat')) {
			return [
				(point.lon - bounds.minlon) / (bounds.maxlon - bounds.minlon),
				(point.lat - bounds.minlat) / (bounds.maxlat - bounds.minlat)
			]
		}
		if (Array.isArray(point)) {
			return [
				(point[0] - bounds.minlon) / (bounds.maxlon - bounds.minlon),
				(point[1] - bounds.minlat) / (bounds.maxlat - bounds.minlat)
			]
		}
	}})

	return bounds
}

