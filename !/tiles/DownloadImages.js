let _ = require('org.tts.js.lodash')
let Deasync = require('deasync')
let Fs = require('fs'), https = require('https')
let Tile = require('./lib/Tile')
let Turf = require('@turf/turf')
let overpass = require('query-overpass')

let types = ['satellite-v9', 'outdoors-v11']

let keys = JSON.parse(Fs.readFileSync('data/z13.keys.json', 'utf-8'))
log('13')
types.forEach(type => {
	log('\t'+type)
	keys.forEach(key => {
		let tile = new Tile(key)
		try {Fs.mkdirSync('images/'+type)} catch (e) {}
		try {Fs.mkdirSync('images/'+type+'/13')} catch (e) {}
		tile.Download('images/'+type+'/13', 1024, 1024, type)
		log('\t\t'+tile.key)
	})
})

/*	tiles.forEach(tile => {
		types.forEach(type => {
			try {Fs.mkdirSync('images/'+type)} catch (e) {}
			tile.Download('images/'+type, 1024, 1024, type, () => {
				log(tile.key+' downloaded')
			})
		})
	})
}
*/