let _ = require('org.tts.js.lodash')
let Deasync = require('deasync')
let Fs = require('fs'), https = require('https')
let Tile = require('./lib/Tile')
let Turf = require('@turf/turf')
let overpass = require('query-overpass')

let zoom = {
	min: 5,
	max: 20,
	level: 5
}

let keys = JSON.parse(Fs.readFileSync('data/z13.keys.json', 'utf-8'))
let tiles = keys.map(k => {return new Tile(k)})
tiles.forEach(tile => {
	log('\t'+tile.key)
	Fs.writeFileSync('data/'+tile.key+'.json', JSON.stringify(tile.Children(1024, 1024), null, 4), 'utf-8')
})


/*

for (zoom.level = zoom.min; zoom.level <= zoom.max; zoom.level++) {
	let tiles = JSON.parse(Fs.readFileSync('data/'+zoom.level+'/tiles.json', 'utf-8')).map(t=>{return new Tile(t)})
	tiles.forEach(tile => {
		Fs.writeFileSync('data/'+tile.key+'.json', JSON.stringify(tile.Children(1024, 1024), null, 4), 'utf-8')
	})
}
*/
