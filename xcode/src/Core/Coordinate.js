function Coordinate (lon, lat, ele = 0) {
	let coordinate = [lon, lat, ele]
	Object.defineProperty(coordinate, 'lon', {get: () => {return coordinate[0]}, enumerable: true})
	Object.defineProperty(coordinate, 'lat', {get: () => {return coordinate[1]}, enumerable: true})
	Object.defineProperty(coordinate, 'ele', {get: () => {return coordinate[2]}, enumerable: true})

	Object.defineProperty(coordinate, 'ToPoint', {enumerable: true, value: function () {
		let point = GlobalMercator.LatLonToMeters(this.lat, this.lon)
		return new Point(point.mx, point.my, this.ele)
	}})

	return coordinate
}

Object.defineProperty(Coordinate, 'LonLat', {enumerable: true, value: Coordinate})
Object.defineProperty(Coordinate, 'LatLon', {enumerable: true, value: (lat, lon, ele) => {
	return new Coordinate(lon, lat, ele)
}})


