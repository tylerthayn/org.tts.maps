let _ = require('org.tts.js.lodash')
let Deasync = require('deasync')
let Fs = require('fs'), https = require('https'), Path = require('path')
const { spawn } = require('child_process')

let Point = require('./Point')
let Bounds = require('./Bounds')
let GlobalMercator = require('./GlobalMercator')
let Overpass = require('query-overpass')
let im = require('imagemagick')

let Query = Deasync((query, cb) => {
	Overpass(query, (error, data) => {
		cb(error, data)
	})
})

let Magick = Deasync((cmd, cb) => {
	log('magick '+cmd)
	cb(null)
	/*
	let im = spawn('magick', cmd.split(' '))
	let data = ''

	im.stdout.on('data', (chunk) => {
		data += chunk.toString()
	})
	im.stdout.on('close', () => {
		cb(null, data)
	})
	im.on('error', cb)
	*/
})

function CreateOverlay (feature, path, w, h, cb) {
	let coordinates = this.Pixels(feature.geometry.coordinates.map(point => {return new Point(point[1], point[0])}), w, h).map(point => {return `${point[0].toFixed()},${point[1].toFixed()}`}).join(' ')

	log(Magick(`magick convert -size ${w}x${h} xc:transparent -strokewidth 10 -fill transparent -stroke blue -draw "polyline ${coordinates}" ${path}`))
}

function Tile (key) {
	this.key = key
	this.x = GlobalMercator.QuadKeyToTile(key).tx
	this.y = GlobalMercator.QuadKeyToTile(key).ty
	this.zoom = GlobalMercator.QuadKeyToTile(key).zoom
	this.size = GlobalMercator.tileSize

	let bounds = GlobalMercator.TileBounds(this.x, this.y, this.zoom)
	let sw = GlobalMercator.MetersToLatLon(bounds.minx, bounds.miny)
	let ne = GlobalMercator.MetersToLatLon(bounds.maxx, bounds.maxy)
	this.bounds = new Bounds(sw.lat, sw.lon, ne.lat, ne.lon)

	return this
}

Tile.prototype.CreateOverlays = function (w, h) {
	let features = this.Children(w, h)
	features.forEach(feature => {
		log(feature)
		let path = 'overlays/'+this.key+'-'+feature.id.replace('/', '-')+'.gif'
		if (feature.properties.type == 'way') {
			let coordinates = this.Pixels(feature.geometry.coordinates.map(point => {return new Point(point[1], point[0])}), w, h).map(point => {return `${point[0].toFixed()},${point[1].toFixed()}`}).join(' ')
			Magick(`convert -size ${w}x${h} xc:transparent -strokewidth 10 -fill transparent -stroke blue -draw "polyline ${coordinates}" ${path}`)
		}
		if (feature.properties.type == 'node') {
			Magick(`convert -size ${w}x${h} xc:transparent -strokewidth 10 -fill transparent -stroke blue -draw "point ${feature.geometry.coordinates}" ${path}`)
		}
	})
}

Tile.prototype.Children = function (w, h) {
	let coordinates = [this.bounds.sw, this.bounds.nw, this.bounds.ne, this.bounds.se].map(c => {
		return c[1] + ' ' + c[0]
	}).join(' ')
	let query = `[out:json];\nnwr(poly: "${coordinates}")-> .all;`
		+ `(node.all[natural];);(._;>;);out;`
		+ `(node.all[highway];way.all[highway];);(._;>;);out;`
		+ `(node.all[intermittent];node.all[natural=spring];node.all[natural=water];node.all[natural=stream];node.all[water];way.all[intermittent];way.all[natural=spring];way.all[natural=water];way.all[natural=stream];way.all[water];relation.all[intermittent];relation.all[natural=spring];relation.all[natural=water];relation.all[natural=stream];relation.all[water];);(._;>;);out;`
	log(this.key+'\n'+query)
	return Query(query)
}

Tile.prototype.Download = function (path, w = 1024, h = 1024, type = 'satellite-v9') {
	let $this = this
	Deasync(function (cb) {
		let url = `https://api.mapbox.com/styles/v1/mapbox/${type}/static/[${$this.bounds.w},${$this.bounds.s},${$this.bounds.e},${$this.bounds.n}]/${w}x${h}?access_token=${process.env.MapboxApiToken}`
		let out = Fs.createWriteStream(Path.resolve(path, $this.key + '.jpg'))
		https.get(url, (res) => {
			res.on('error', cb)
			res.on('end', () => {cb(null)})
			res.pipe(out)
		}).on('error', cb)
	})()
}

Tile.prototype.Pixel = function (lat, lon, w, h) {
	return new Point((lon - this.bounds[0]) / (this.bounds[2] - this.bounds[0]) * w, h - (lat - this.bounds[1]) / (this.bounds[3] - this.bounds[1]) * h)
}
Tile.prototype.Pixels = function (points, w, h) {
	let pixels = []
	points.forEach(point => {
		pixels.push(this.Pixel(point.lat, point.lon, w, h))
	})
	return pixels
}

Tile.prototype.OverlayFeature = function (path, w, h) {
	let feature = JSON.parse(Fs.readFileSync(path, 'utf-8'))
	let coordinates = this.Pixels(feature.geometry.coordinates.map(point => {return new Point(point[1], point[0])}), w, h).map(point => {return `${point[0].toFixed()},${point[1].toFixed()}`}).join(' ')

	//let cmd = `magick convert -size ${w}x${h} -fill red -stroke purple -draw "polyline ${coordinates}" -set filename:base "%f" "%[filename:base]"\nPAUSE`
	let cmd = `magick convert ${this.key}.jpg -strokewidth 10 -fill transparent -stroke blue -draw "polyline ${coordinates}" ${this.key}.jpg\nPAUSE`
	return cmd
}

_.Define(Tile, 'LatLon', (lat, lon, zoom) => {
	let tile = GlobalMercator.LatLonToTile(lat, lon, zoom)
	return new Tile(GlobalMercator.QuadKey(tile.tx, tile.ty, zoom))
})



module.exports = Tile

/*
//let tile = new Tile('0231002120310')
//log(tile)
let tile = Tile.LatLon(38.1213006, -110.8146614, 0)
logj(tile)
log(tile.x)
log(tile.bounds.AsLatLon)
log(tile.GetPixel(38.1213006, -110.8146614))
log(tile.GetPixel(0, 0))
log(tile.GetLoc(38.1213006, -110.8146614))
/*
log(tile.y)
log(tile.Key)
log(tile.Bounds)
log(tile.Bounds.minx, tile.Bounds.miny)
log(tile.Bounds.maxx, tile.Bounds.maxy)
log(tile.Bounds.maxx - tile.Bounds.minx)
log(tile.Bounds.maxy - tile.Bounds.miny)


log(tile.Size)
log(tile.Pixel)
log(tile.RasterPixel)

*/
