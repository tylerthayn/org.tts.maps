let _ = require('org.tts.js.lodash')
let Db = require('../lib/Db')
let Fs = require('fs')
let Path = require('path')
let Tile = require('../src/Tile')
let express = require('express')
let https = require('https')
let Parser = require('xml2js').parseString

let configs = require('../../config')
let router = express.Router()

function DownloadFeature () {
	let cb = _.Last(arguments) instanceof Function ? _.Last(arguments) : _.Noop

	let options = {
		headers: {
			accept: 'application/json'
		},
		host: configs.overpass.host[configs.overpass.mode],
		method: 'GET',
		path: '/api/'+configs.overpass.version+'/'+_.First(arguments),
		protocol: 'https:'
	}

	let out = Fs.createWriteStream(configs.db.folder+_.First(arguments), 'utf-8')
	let request = https.request(options, (response) => {
		let data = ''
		response.on('data', (chunk) => {data += chunk.toString()})
		response.on('end', () => {
			if (response.headers['content-type'].includes('json')) {
				Fs.writeFile(configs.db.folder+_.First(arguments), data, 'utf-8', (error) => {
					cb(null, data)
				})
			} else if (response.headers['content-type'].includes('xml')) {
				Parser(data, function (err, result) {
					if (err) {return cb(err)}
					Fs.writeFile(configs.db.folder+_.First(arguments), result, 'utf-8', (error) => {
						cb(null, result)
					})
				})
			} else {
				log(data)
				throw new Error('Invalid http content type')
			}
		})
	})

	request.on('error', (error) => {cb(error)})
	request.end()
}


router.get('/:type/:zoom/:key/grid/:x/:y', (req, res) => {
	let tile = new Tile(req.params.key)
	res.send(tile.GetTile(parseInt(req.params.x), parseFloat(req.params.y)))
})

router.get('/:type/:id', (req, res) => {
	if (req.params.id.endsWith('.json')) {
		Db.Feature(req.params.type, req.params.id.replace('.json', ''), (error, feature) => {
			res.send(feature)
		})
	} else {
		res.sendFile(Path.resolve(__dirname, '../www', 'Features.html'))
	}
})

router.get('/:type/:id/public', (req, res) => {
	if (req.params.id.endsWith('.json')) {
		Db.Feature(true, req.params.type, req.params.id, (error, feature) => {
			res.send(feature)
		})
	} else {
		res.sendFile(Path.resolve(__dirname, '../www', Features.html))
	}
})

module.exports = router
