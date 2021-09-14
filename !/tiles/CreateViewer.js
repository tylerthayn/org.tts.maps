let _ = require('org.tts.js.lodash')
let Deasync = require('deasync')
let Fs = require('fs'), https = require('https')
let Bounds = require('./lib/Bounds')
let Tile = require('./lib/Tile')
let Turf = require('@turf/turf')
let overpass = require('query-overpass')

let zoom = {
	min: 5,
	max: 20,
	level: 14
}

let types = ['satellite-v9', 'outdoors-v11']
let type = 'satellite-v9'

//for (zoom.level = zoom.min; zoom.level <= zoom.max; zoom.level++) {
	let data = {}
	let lats = [], lons = []
	//viewerHtml = viewerHtml.replace('${zoom}', zoom.level)
	let html = []
	let tiles = JSON.parse(Fs.readFileSync('data/'+zoom.level+'/tiles.json', 'utf-8')).map(tile => {return new Tile(tile)})
	tiles.forEach(tile => {
		lons.push(tile.bounds[0])
		lons.push(tile.bounds[2])
		lats.push(tile.bounds[1])
		lats.push(tile.bounds[3])

	})
	let bounds = new Bounds(Math.min.apply(null, lats), Math.min.apply(null, lons), Math.max.apply(null, lats), Math.max.apply(null, lons))
	data.bounds = bounds
	data.tiles = tiles

	//let grid = [Math.ceil(x/xx), Math.ceil(y/yy)]
	//let gridImages = {}


	//tiles.forEach(tile => {
	//	let x = Math.floor((tile.bounds.center[0] - bounds[0])/xx)
	//	let y = Math.floor((tile.bounds.center[1] - bounds[1])/yy)
	//	log(x.toString() + ',' + y.toString())
	//	gridImages[x.toString() + ',' + y.toString()] = tile.key
	//})

	logj(data)

/*
	tiles = tiles.sort((a, b) => {
		if (a.bounds.center[1] > b.bounds.center[1]) {
			return -1
		}
		if (a.bounds.center[1] < b.bounds.center[1]) {
			return 1
		}
		if (a.bounds.center[0] > b.bounds.center[0]) {
			return -1
		}
		if (a.bounds.center[1] < b.bounds.center[1]) {
			return 1
		}
		return 0
	}).reverse()


	html.push('<div class="Tiles Zoom'+zoom.level+'">')
	log(tiles.length)
	for (let i = 0; i<grid[0]; i++) {
		html.push('	<div class="Row">')
		for (let j = 0; j<grid[1]; j++) {
			html.push('		<div class="Cell"><img src="../images/'+type+'/'+gridImages[i+','+j]+'.jpg" /></div>')
		}
		html.push('	</div>')
	}
	html.push('</div>')
	log(viewerHtml.split('<!-- BODY -->')[0] + html.join('\n') + viewerHtml.split('<!-- BODY -->')[1])
	//let bounds = new Bounds(Math.min.apply(null, lats), Math.min.apply(null, lons), Math.max.apply(null, lats), Math.max.apply(null, lons))

	Fs.writeFileSync('Viewer/'+type+'-'+zoom.level+'.html', viewerHtml.split('<!-- BODY -->')[0] + html.join('\n') + viewerHtml.split('<!-- BODY -->')[1], 'utf-8')

//	log(bounds)
//}


*/

