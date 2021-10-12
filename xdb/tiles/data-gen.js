let _ = require('org.tts.js.lodash')
let Fs = require('fs')
let Path = require('path')
let https = require('https')
let Maps = require('../../code/src/')
let Deasync = require('deasync')
let Query = require('query-overpass')

let QueryTile = Deasync(function _QueryTile (tile, cb) {
	let q = `[out:json];nwr(poly: "${tile.bounds[1]} ${tile.bounds[0]} ${tile.bounds[1]} ${tile.bounds[2]} ${tile.bounds[3]} ${tile.bounds[2]} ${tile.bounds[3]} ${tile.bounds[0]}");(._;<;>;);out;`
	//log(q)
	Query(q, (error, data) => {
		if (error || data == '') {return cb(null)}
		try {Fs.mkdirSync(Path.resolve('./data', tile.key.length.toString()))} catch (e) {}
		Fs.writeFileSync(Path.resolve('./data', tile.key.length.toString(), tile.key + '.json'), JSON.stringify(data, null, 4), 'utf-8')
		cb(null)
	}, {overpassUrl: 'https://overpass.kumi.systems/api/interpreter'})
})


let data = JSON.parse(Fs.readFileSync('data.json', 'utf-8'))
Object.keys(data).forEach(zoom => {
	log(zoom.toString() + ':' + Object.keys(data[zoom]).length.toString())
	Object.keys(data[zoom]).forEach(key => {
		log('\t'+key)
		QueryTile(data[zoom][key])
	})
})




