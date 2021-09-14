let _ = require('org.tts.js.lodash')
let Deasync = require('deasync')
let Fs = require('fs'), https = require('https')
let Tile = require('./lib/Tile')
let Magick = require('./lib/Magick')
let Feature = require('./lib/Feature')
let Turf = require('@turf/turf')
let overpass = require('query-overpass')


let tiles = JSON.parse(Fs.readFileSync('data/z13.keys.json', 'utf-8')).map(t=>{return new Tile(t)})
//let tiles = [new Tile('0231002120310')]
tiles.forEach(tile => {
	try {
		let overlays = Fs.readdirSync('tiles/'+tile.key)
		log(overlays)
		let cmd = 'convert -size 1024x1024 xc:none -page +0+0 images/outdoors-v11/13/'+tile.key+'.jpg'
		overlays.forEach(overlay => {
			cmd += ' -page +0+0 tiles/'+tile.key+'/'+overlay
		})
		cmd += ' -layers flatten'
		cmd += ' "D:/Maps/db/tiles/outdoors-v11/13/'+tile.key+'.jpg"'
		Magick(cmd)
	} catch (e) {}
})

/*
let tiles = Fs.readdirSync('images/satellite-v9').map(tile => {return tile.split('.')[0]}).
tiles.forEach(tile => {
	try {
	let overlays = Fs.readdirSync('overlays/'+tile)
	let cmd = 'convert -size 1024x1024 xc:none -page +0+0 images/satellite-v9/'+tile+'.jpg'
	overlays.forEach(overlay => {
		cmd += ' -page +0+0 overlays/'+tile+'/'+overlay
	})
	cmd += ' -layers flatten'
	cmd += ' tiles/'+tile+'_.jpg'
	Magick(cmd)
	} catch (e) {}
})
*/

/*
let tiles = JSON.parse(Fs.readFileSync('data/tiles.json', 'utf-8')).map(t=>{return new Tile(t)})
let tile = tiles[process.argv[2]]
let features = JSON.parse(Fs.readFileSync('data/'+tile.key+'.json')).map(feature => {return Feature(feature)})

features.forEach(feature => {
	try {Fs.mkdirSync('overlays/'+tile.key)} catch (e) {}
	feature.geometry.Draw('overlays/'+tile.key+'/'+feature.properties.id+'.png', 1024, 1024, tile.bounds)
})

//tiles.forEach(tile => {
//	let features = JSON.parse(Fs.readFileSync('data/'+tile.key+'.json'))
//	log(features)
//})

*/
