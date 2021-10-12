let TileSizes = [40075017, 20037508, 10018754, 5009377.1, 2504688.5, 1252344.3, 626172.1, 313086.1, 156543, 78271.5, 39135.8, 19567.9, 9783.94, 4891.97, 2445.98, 1222.99, 611.496, 305.748, 152.874, 76.437, 38.2185, 19.10926, 9.55463, 4.777315, 2.3886575]
function lon2tile(lon,zoom){return Math.floor((lon+180)/360*Math.pow(2,zoom))}
function lat2tile(lat,zoom){return Math.floor((1-Math.log(Math.tan(lat*Math.PI/180)+1/Math.cos(lat*Math.PI/180))/Math.PI)/2*Math.pow(2,zoom))}
function tile2lon(x,z){return x/Math.pow(2,z)*360-180}
function tile2lat(y,z){var n=Math.PI-2*Math.PI*y/Math.pow(2,z);return 180/Math.PI*Math.atan(.5*(Math.exp(n)-Math.exp(-n)))}

function SlippyToQuadKey (z, x, y) {
	return GlobalMercator.QuadKey(x, Math.pow(2, z) - y - 1, z)
}
function QuadKeyToSlippy (key) {
	let tile = GlobalMercator.QuadKeyToTile(key)
	let _bounds = GlobalMercator.TileBounds(tile.tx, tile.ty, tile.zoom)
	let sw = GlobalMercator.MetersToLatLon(_bounds.minx, _bounds.miny)
	let ne = GlobalMercator.MetersToLatLon(_bounds.maxx, _bounds.maxy)
	let bounds = [sw.lon, sw.lat, ne.lon, ne.lat]
	let center = [(bounds[2] - bounds[0]) / 2 + bounds[0], (bounds[3] - bounds[1]) / 2 + bounds[1]]
	return [tile.zoom, lon2tile(center[0],tile.zoom), lat2tile(center[1], tile.zoom)]
}

function Tile () {
	let tile = null
	if (arguments.length == 1) {
		tile = GlobalMercator.QuadKeyToTile(arguments[0])
	}
	if (arguments.length == 2) {
		if (Reflect.has(arguments[0], 'lon') && Reflect.has(arguments[0], 'lat')) {
			tile = GlobalMercator.LatLonToTile(arguments[0].lat, arguments[0].lon, arguments[1])
		} else if (Array.isArray(arguments[0])) {
			tile = GlobalMercator.LatLonToTile(arguments[0][1], arguments[0][0], arguments[1])
		}
		tile.zoom = arguments[1]
	}
	if (arguments.length == 3) {
		tile = GlobalMercator.QuadKeyToTile(SlippyToQuadKey.apply(null, arguments))
	}

	this.x = tile.tx
	this.y = tile.ty
	this.zoom = tile.zoom
	this.key = GlobalMercator.QuadKey(this.x, this.y, this.zoom)
	this.slippy = QuadKeyToSlippy(this.key)

	let bounds = GlobalMercator.TileBounds(this.x, this.y, this.zoom)
	let min = GlobalMercator.MetersToLatLon(bounds.minx, bounds.miny)
	let max = GlobalMercator.MetersToLatLon(bounds.maxx, bounds.maxy)
	this.bounds = Bounds.Coordinate(min.lon, min.lat, max.lon, max.lat)

	Object.defineProperty(this, 'subTiles', {enumerable: true, get: function (zoom = 20) {
		let subTiles = []
		let SubTiles = (key) => {
			if (key.length > zoom - 1) {
				subTiles.push(key+'0')
				subTiles.push(key+'1')
				subTiles.push(key+'2')
				subTiles.push(key+'3')
			} else {
				SubTiles(key+'0')
				SubTiles(key+'1')
				SubTiles(key+'2')
				SubTiles(key+'3')
			}
		}
		SubTiles(this.key)
		return subTiles
	}})

	return this
}

Object.defineProperty(Tile, 'Sizes', {enumerable: true, value: TileSizes})

Object.defineProperty(Tile, 'TileFromBounds', {enumerable: true, value: function (bounds, zoomMax = 20, zoomMin = 0) {
	let coordinates = [[bounds[0], bounds[1]], [bounds[0], bounds[3]], [bounds[2], bounds[3]], [bounds[2], bounds[1]]]
	let tile = null, zoom = zoomMax

	while ((zoom >= zoomMin) && tile == null) {
		let tiles = [...new Set(coordinates.map(coordinate => {
			let _tile = GlobalMercator.LatLonToTile(coordinate[1], coordinate[0], zoom)
			return GlobalMercator.QuadKey(_tile.tx, _tile.ty, zoom)
		}))]
		if (tiles.length == 1) {
			tile = tiles[0]
		} else {
			zoom--
		}
	}
	return tile
}})

