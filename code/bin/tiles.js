let _ = require('org.tts.js.lodash')
let Deasync = require('deasync')
let Fs = require('fs'), https = require('https'), Path = require('path')
let Tile = require('../lib/Tile')
let Turf = require('@turf/turf')
let Overpass = require('query-overpass')
let GlobalMercator = require('../lib/GlobalMercator')
const { spawn } = require('child_process')

let configs = require('../config')

const { Command, Option } = require('commander')
let program = new Command()

program
	.version('0.0.1')

let options = {
	key: new Option('--key <key>', 'Tile QuadKey'),
	lat: new Option('--lat <lat>', 'Latitude Coordinate'),
	lon: new Option('--lon <lon>', 'Longitude Coordinate'),
	type: new Option('--type <type>', 'Map type').default(configs.tiles.type).choices(configs.tiles.types),
	zoom: new Option('--zoom <zoom>', 'Zoom level [5-10]').default(configs.tiles.zoom.level)
}

program
	.command('download <keys...>')
	.option('--width <width>', 'Image width', 1024)
	.option('--height <height>', 'Image height', 1024)
	.addOption(options.type)
	.action(function () {
		let _arguments = _.toArray(arguments)
		let cmd = _arguments.pop()
		let opts = _arguments.pop()
		let keys = _arguments.shift()

		keys.forEach(key => {
			let tile = new Tile(key)
			tile.Download(Path.resolve(configs.tiles.folder, opts.type, tile.zoom.toString(), 'original'), opts.width, opts.height, opts.type)
			Fs.access(Path.resolve(configs.tiles.folder, opts.type, tile.zoom.toString(), tile.key + '.jpg'), (error) => {
				if (error.code == 'ENOENT') {
					Fs.copyFileSync(Path.resolve(configs.tiles.folder, opts.type, tile.zoom.toString(), 'original', tile.key + '.jpg'), Path.resolve(configs.tiles.folder, opts.type, tile.zoom.toString(), tile.key + '.jpg'))
				}
			})
		})

	})


program
	.command('view')
	.option('--original', 'Original non-altered image')
	.addOption(options.key)
	.addOption(options.lat)
	.addOption(options.lon)
	.addOption(options.zoom)
	.addOption(options.type)
	.action(function () {
		let _arguments = _.toArray(arguments)
		let cmd = _arguments.pop()
		let opts = _arguments.pop()

		let tile = Reflect.has(opts, 'key') ? new Tile(opts.key) : new Tile(parseFloat(opts.lat), parseFloat(opts.lon), opts.zoom)
		let path = Path.resolve(configs.tiles.folder, opts.type, opts.zoom.toString(), (opts.original ? 'original/' : '') + tile.key+'.jpg')
		let img = spawn(configs.ImageViewer.path, configs.ImageViewer.args.concat([path]), {detached: true})
	})


program
	.command('grid')
	.option('--up <up>', '# tiles up', configs.tiles.up)
	.option('--down <down>', '# tiles down', configs.tiles.down)
	.option('--left <left>', '# tiles left', configs.tiles.left)
	.option('--right <right>', '# tiles right', configs.tiles.right)
	.option('--json', 'Output in JSON format', false)
	.addOption(options.key)
	.addOption(options.lat)
	.addOption(options.lon)
	.addOption(options.zoom)
	.action(function () {
		let _arguments = _.toArray(arguments)
		let cmd = _arguments.pop()
		let opts = _arguments.pop()
		let tile = Reflect.has(opts, 'key') ? new Tile(opts.key) : new Tile(parseFloat(opts.lat), parseFloat(opts.lon), opts.zoom)

		let grid = []
		for (let y = opts.up; y >= -1*opts.down; y--) {
			let row = []
			for (let x = -1*opts.left; x <= opts.right; x++) {
				row.push(tile.GetTile(x, y).key)
			}
			grid.push(row)
		}
		if (opts.json) {
			logj(grid)
		} else {
			grid.forEach(row => {
				row.forEach(cell => {
					log(cell)
				})
				log('')
			})
		}
	})

program.parse(process.argv)




/*

let features=[{type:'Feature',properties:{},geometry:{type:'Polygon',coordinates:[[[-110.75557708740234,38.150487485877754],[-110.76278686523438,38.201496974020806],[-110.8688735961914,38.19906876048024],[-110.88672637939453,38.147787576668506],[-110.86372375488281,38.05620155353395],[-110.85582733154297,38.00454944167447],[-110.77136993408203,37.99995036840875],[-110.71025848388672,38.023754217706944],[-110.72776794433592,38.09241741843045],[-110.75557708740234,38.150487485877754]]]}}]
let area = Turf.featureCollection(features)
let _bounds = Turf.bbox(area)
let span = [0.03463936576197568/3, 0.0439453125/3]

let tiles = []
let bounds = {}
for (let i = _bounds[1]; i<_bounds[3]; i+=span[0]) {
	for (let j = _bounds[0]; j<_bounds[2]; j+=span[1]) {
		//console.log(i + ' :: ' + j)
		let tile = GlobalMercator.LatLonToTile(i, j, zoom.level)
		let key = GlobalMercator.QuadKey(tile.tx, tile.ty, zoom.level)
		//console.log(key)
		tiles.push(key)

		let _tile = new Tile(key)
		bounds[key] = _tile.bounds

	}
}

Fs.writeFileSync('data/z13.keys.json', JSON.stringify(_.uniq(tiles).sort(), null, 4), 'utf-8')
Fs.writeFileSync('data/z13.bounds.json', JSON.stringify(bounds, null, 4), 'utf-8')


/*
let GetFeatures = Deasync((query, cb) => {Overpass(query, (error, data) => {cb(error, data)})})
let features = GetFeatures(Fs.readFileSync('all.query', 'utf-8'))

let GetTiles = (features, zoom) => {
	let tiles = {}
	features.features.forEach(feature => {
		_.flatten(feature.geometry.coordinates).forEach(coordinate => {
			let tile = Tile.LatLon(coordinate[1], coordinate[0], zoom)
			tiles[tile.key] = tile
		})
	})
	delete tiles['0000000000000']
	return tiles
}


let data = {}, bounds = {}

for (zoom.level = zoom.min; zoom.level <= zoom.max; zoom.level++) {
	data[zoom.level] = Object.keys(GetTiles(features, zoom.level))

	bounds[zoom.level] = {}
	Object.keys(GetTiles(features, zoom.level)).forEach(id => {
		bounds[zoom.level][id] = new Tile(id).bounds
	})
}

Fs.writeFileSync('data/tiles.json', JSON.stringify(data, null, 4), 'utf-8')
Fs.writeFileSync('data/bounds.json', JSON.stringify(bounds, null, 4), 'utf-8')

/*
Object.keys(tiles).forEach(key => {
	log(tiles[key].Children(1024, 1024))
})


let tile = new Tile('0231002122123')
log(tile.CreateOverlays(1024, 1024))




/*
let start = [-110.8146614, 38.1213006]
let tile = Tile.LatLon(start[1], start[0], 13)
log(tile.bounds)

let t2 = Tile.LatLon(start[1] + tile.bounds.range[0]/2, start[0], 13)
log(t2.bounds)
*/

/*

let tiles = {}

let features = JSON.parse(Fs.readFileSync('export.geojson', 'utf-8'))

features.features.forEach(feature => {
	_.flatten(feature.geometry.coordinates).forEach(coordinate => {
		let tile = Tile.LatLon(coordinate[1], coordinate[0], 13)
		tiles[tile.key] = tile
	})
})
delete tiles['0000000000000']
log(Object.keys(tiles))

Object.keys(tiles).forEach(tile => {
	tiles[tile].Download('images/'+tile+'.jpg', 1024, 1024, () => {})
})


//let bounds1 = tiles[Object.keys(tiles)[0]].bounds
//let bounds2 = tiles[Object.keys(tiles)[1]].bounds
//log([bounds1.se, bounds1.ne, bounds1.nw, bounds1.sw])
//let p1 = Turf.polygon([[bounds1.se, bounds1.ne, bounds1.nw, bounds1.sw, bounds1.se]])
//let p2 = Turf.polygon([[bounds2.se, bounds2.ne, bounds2.nw, bounds2.sw, bounds2.se]])
//log(Turf.booleanIntersects(
//	Turf.polygon([[bounds1.se, bounds1.ne, bounds1.nw, bounds1.sw, bounds1.se]]),
//	Turf.polygon([[bounds2.se, bounds2.ne, bounds2.nw, bounds2.sw, bounds2.se]])
//))


/*

let matrix = []
let sortedTiles = Object.keys(tiles).sort((a, b) => {
	if (tiles[b].bounds.center[0] > tiles[a].bounds.center[0]) {
		return -1
	}
	if (tiles[b].bounds.center[0] < tiles[a].bounds.center[0]) {
		return 1
	}
	if (tiles[b].bounds.center[1] > tiles[a].bounds.center[1]) {
		return -1
	}
	if (tiles[b].bounds.center[1] < tiles[a].bounds.center[1]) {
		return 1
	}
	return 0
})

tiles[sortedTiles[0]].Download(sortedTiles[0]+'.jpg', 1024, 1024, () => {})
tiles[sortedTiles[1]].Download(sortedTiles[1]+'.jpg', 1024, 1024, () => {})
tiles[sortedTiles[2]].Download(sortedTiles[2]+'.jpg', 1024, 1024, () => {})


/*
while (sortedTiles.length > 0) {
	let row = [sortedTiles.pop()]
	while(sortedTiles.length > 0 && tiles[_.last(sortedTiles)].bounds[1] == tiles[row[0]].bounds[1]) {
		row.push(sortedTiles.pop())
	}
	matrix.push(row)
}

logj(matrix)

/*
Object.keys(tiles).sort((a, b) => {
	if (tiles[b].bounds[0] < tiles[a].bounds[0] && tiles[b].bounds[1] < tiles[a].bounds[1]) {
		return 1
	}
	if (tiles[b].bounds[0] == tiles[a].bounds[0] && tiles[b].bounds[1] == tiles[a].bounds[1]) {
		return 0
	}
	return -1
}).forEach(key => {
	log(tiles[key].bounds)
})


//Object.keys(tiles).sort().forEach(key => {log(`${key}: ${tiles[key].bounds}`)})
//log('\n')


/*
let lats = [], lons = []
Object.keys(tiles).sort().forEach(key => {
	lons.push(tiles[key].bounds[0])
	lons.push(tiles[key].bounds[2])
	lats.push(tiles[key].bounds[1])
	lats.push(tiles[key].bounds[3])
})

log(Math.min.apply(null, lons).toString() + ' :: ' + Math.max.apply(null, lons).toString())
log(Math.min.apply(null, lats).toString() + ' :: ' + Math.max.apply(null, lats).toString())
log((Math.max.apply(null, lons) - Math.min.apply(null, lons)).toString() + (Math.max.apply(null, lats) - Math.min.apply(null, lats)).toString())
log('\n')
log(tiles[Object.keys(tiles)[5]].bounds.range)
log((Math.max.apply(null, lons) - Math.min.apply(null, lons))/tiles[Object.keys(tiles)[5]].bounds.range[0])
log((Math.max.apply(null, lats) - Math.min.apply(null, lats))/tiles[Object.keys(tiles)[5]].bounds.range[1])

//log(tiles)

Object.keys(tiles).sort((a, b) => {
	return tiles[a].bounds[0] < tiles[b].bounds[0] ? -1 : tiles[a].bounds[0] = tiles[b].bounds[0] ? 0 : 1
}).forEach(key => {
	log(tiles[key].bounds)
})

/*

let keys = Object.keys(tiles)
let unique = [keys.shift()]
for (let i = 0; i<=keys.length; i++) {
	for (let j = keys.length-1; j>i; j--) {
		//log(i.toString() + ' :: ' + j.toString())
		if (Overlap(tiles[keys[i]].bounds, tiles[keys[j]].bounds)) {
			keys.pop()
		}
	}
}
log(keys.length)

keys.sort((a, b) => {
	return tiles[a].bounds[0] < tiles[b].bounds[0] ? 1 : tiles[a].bounds[0] = tiles[b].bounds[0] ? 0 : -1
}).forEach(key => {
	log(tiles[key].bounds)
})

keys.forEach(key => {
	log(tiles[key].bounds)
})

function Overlap (bounds1, bounds2) {
	//log((bounds2[0] > bounds1[2] || bounds2[2] < bounds1[0]).toString() + (bounds2[1] > bounds1[3] || bounds2[3] < bounds1[1]).toString())
	return !(
		(bounds2[0] > bounds1[2] || bounds2[2] < bounds1[0])
		&&
		(bounds2[1] > bounds1[3] || bounds2[3] < bounds1[1])
	)
}
*/
