
let Bounds = {
	Coordinate: function (minlon, minlat, maxlon, maxlat) {
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

		Object.defineProperty(bounds, 'position', {enumerable: true, value: function (coordinate) {
			if (Array.isArray(coordinate) && Array.isArray(coordinate[0])) {
				let positions = []
				coordinate.forEach(c => {
					positions.push(bounds.position(c))
				})
				return positions
			}

			if (Reflect.has(coordinate, 'lon') && Reflect.has(coordinate, 'lat')) {
				return [
					(coordinate.lon - bounds.minlon) / (bounds.maxlon - bounds.minlon),
					(coordinate.lat - bounds.minlat) / (bounds.maxlat - bounds.minlat)
				]
			}
			if (Array.isArray(coordinate)) {
				return [
					(coordinate[0] - bounds.minlon) / (bounds.maxlon - bounds.minlon),
					(coordinate[1] - bounds.minlat) / (bounds.maxlat - bounds.minlat)
				]
			}
		}})

		return bounds
	},
	Point: function (minx, miny, maxx, maxy) {
		let bounds = [
			minx < maxx ? minx : maxx,
			miny < maxy ? miny : maxy,
			maxx > minx ? maxx : minx,
			maxy > miny ? maxy : miny
		]

		Object.defineProperty(bounds, 'minx', {enummerable: true, get: () => {return bounds[0]}})
		Object.defineProperty(bounds, 'miny', {enummerable: true, get: () => {return bounds[1]}})
		Object.defineProperty(bounds, 'maxx', {enummerable: true, get: () => {return bounds[2]}})
		Object.defineProperty(bounds, 'maxy', {enummerable: true, get: () => {return bounds[3]}})

		Object.defineProperty(bounds, 'center', {enumerable: true, get: () => {
			return new Coordinate(
				bounds.minx + (bounds.maxx - bounds.minx)/2,
				bounds.miny + (bounds.maxy - bounds.miny)/2
			)
		}})

		Object.defineProperty(bounds, 'min', {enumerable: true, get: () => {return new Point(bounds.minx, bounds.miny)}})
		Object.defineProperty(bounds, 'max', {enumerable: true, get: () => {return new Point(bounds.maxx, bounds.maxy)}})
		Object.defineProperty(bounds, 'x', {enumerable: true, get: () => {return new Range(bounds.minx, bounds.maxy)}})
		Object.defineProperty(bounds, 'y', {enumerable: true, get: () => {return new Range(bounds.miny, bounds.maxy)}})

		Object.defineProperty(bounds, 'position', {enumerable: true, value: function (point) {
			if (Array.isArray(point) && Array.isArray(point[0])) {
				let positions = []
				point.forEach(p => {
					positions.push(bounds.position(p))
				})
				return positions
			}

			if (Reflect.has(point, 'c') && Reflect.has(point, 'y')) {
				return [
					(point.x - bounds.minx) / (bounds.maxx - bounds.minx),
					(point.y - bounds.miny) / (bounds.maxy - bounds.miny)
				]
			}
			if (Array.isArray(point)) {
				return [
					(point[0] - bounds.minx) / (bounds.maxx - bounds.minx),
					(point[1] - bounds.miny) / (bounds.maxy - bounds.miny)
				]
			}
		}})

		return bounds
	}
}

