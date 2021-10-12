let _ = require('org.tts.js.lodash')
let Fs = require('fs')
let Path = require('path')
let Maps = require('../src/')
let express = require('express')

let configs = require('../../config')
let router = express.Router()

router.get('/', (req, res) => {
	res.send(JSON.parse(Fs.readFileSync(Path.resolve(configs.db.folder, 'places.json'), 'utf-8')))
})

router.get('/:name/:lon/:lat', (req, res) => {
	let places = JSON.parse(Fs.readFileSync(Path.resolve(configs.db.folder, 'places.json'), 'utf-8'))
	places[req.params.name] = {
		lon: req.params.lon,
		lat: req.params.lat
	}
	Fs.writeFileSync(Path.resolve(configs.db.folder, 'places.json'), JSON.stringify(places, null, 4), 'utf-8')
	res.send('ok')
})

module.exports = router
