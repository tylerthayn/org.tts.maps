let _ = require('org.tts.js.lodash')
let Deasync = require('deasync')
let Fs = require('fs'), https = require('https')
let Tile = require('./Tile')
let Turf = require('@turf/turf')
let overpass = require('query-overpass')

let GetFeatures = Deasync((query, cb) => {overpass(query, (error, data) => {cb(error, data)})})
let GetTiles = (features) => {
	let tiles = {}
	features.features.forEach(feature => {
		_.flatten(feature.geometry.coordinates).forEach(coordinate => {
			let tile = Tile.LatLon(coordinate[1], coordinate[0], 13)
			tiles[tile.key] = tile
		})
	})
	delete tiles['0000000000000']
	return tiles
}


/*
let features = GetFeatures(Fs.readFileSync('all.query', 'utf-8'))
let tiles = GetTiles(features)

Object.keys(tiles).forEach(key => {
	log(tiles[key].Children(1024, 1024))
})
*/


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
