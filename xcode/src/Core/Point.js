function Point (x, y, z = 0) {
	let point = [x, y, z]
	Object.defineProperty(point, 'x', {get: () => {return point[0]}, enumerable: true})
	Object.defineProperty(point, 'y', {get: () => {return point[1]}, enumerable: true})
	Object.defineProperty(point, 'z', {get: () => {return point[2]}, enumerable: true})

	Object.defineProperty(point, 'ToCoordinate', {enumerable: true, value: function () {
		let coordinate = GlobalMercator.MetersToLatLon(this.x, this.y)
		return new Coordinate(coordinate.lon, coordinate.lat, this.z)
	}})

	return point
}
