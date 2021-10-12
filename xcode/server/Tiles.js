let _ = require('org.tts.js.lodash')
let Fs = require('fs')
let Path = require('path')
let https = require('https')
let Maps = require('../dist/org.tts.js.Maps')
let express = require('express')
let configs = require('../../config')
let router = express.Router()

let TileGenerator = require('../src/server/Tile.Generate.js')

function DownloadImage (url, path) {
	let out = Fs.createWriteStream(path)
	https.get(url, (res) => {
		res.pipe(out)
	})
}

function DownloadTile (style, key, cb) {
	let tile = new Maps.Tile(key)
	let url = `https://api.mapbox.com/styles/v1/mapbox/${style}/static/[${tile.bounds[0]},${tile.bounds[1]},${tile.bounds[2]},${tile.bounds[3]}]/1024x1024?access_token=${process.env.MapboxApiToken}`
	let out = Fs.createWriteStream(Path.resolve(configs.tiles.folder, style, tile.key + '.0.jpg'))
	out.on('error', cb)
	out.on('finish', () => {
		Fs.copyFile(Path.resolve(configs.tiles.folder, style, tile.key + '.0.jpg'), Path.resolve(configs.tiles.folder, style, tile.key + '.jpg'), error => {
			if (error) {
				return cb(error)
			}
			cb(null)
		})
	})
	https.get(url, res => {
		res.pipe(out)
		res.on('error', cb)
	})
}

router.post('/download', (req, res) => {
	let urls = []
	req.body.keys.forEach(key => {
		let tile = new Maps.Tile(key)
		let url = `https://api.mapbox.com/styles/v1/mapbox/${req.body.type}/static/[${tile.bounds[0]},${tile.bounds[1]},${tile.bounds[2]},${tile.bounds[3]}]/${req.body.width}x${req.body.height}?access_token=${process.env.MapboxApiToken}`
		let path = Path.resolve(configs.tiles.folder, req.body.type, 'original', key + '.jpg')
		DownloadImage(url, path)
	})
	res.send('ok')
})

/* Slippy Tile Server */
router.get('/:style/:z/:x/:y', (req, res, next) => {
	let tile = new Maps.Tile(req.params.z, req.params.x, req.params.y)
	let path = Path.resolve(configs.tiles.folder, req.params.style, tile.key + '.jpg')
	Fs.access(path, (err) => {
		if (err) {
			DownloadTile(req.params.style, tile.key, error => {
				if (error) {return next(error)}
				res.sendFile(path)
			})
		} else {
			res.sendFile(path)
		}
	})
})

router.get('/:type/:zoom/:key/grid/:x/:y', (req, res) => {
	let tile = new Maps.Tile(req.params.key)
	res.send(tile.GetTile(parseInt(req.params.x), parseFloat(req.params.y)))
})

router.get('/:type/:zoom/:key', (req, res) => {
	if (req.params.key.endsWith('.json')) {
		let tile = new Maps.Tile(req.params.key.replace('.json', ''))
		res.send(tile)
	} else if (req.params.key.endsWith('.jpg')) {
		req.params.key = req.params.key.replace('.jpg', '')
		Fs.access(Path.resolve(configs.tiles.folder, req.params.type, req.params.zoom.toString() + (_.get(req, 'query.original', null) != null ? '/original' : ''), req.params.key+'.jpg'), (error) => {
			if (error) {
				log('Doesnt exist')
				Fs.access(Path.resolve(configs.tiles.folder, req.params.type, req.params.zoom.toString(), 'original', req.params.key + '.jpg'), (error) => {
					if (error) {
						log('Original Doesnt exist')
						let tile = new Tile(req.params.key)
						tile.Download(Path.resolve(configs.tiles.folder, req.params.type, req.params.zoom.toString(), 'original'), 1024, 1024, req.params.type)
						res.sendFile(Path.resolve(configs.tiles.folder, req.params.type, req.params.zoom.toString(), 'original', req.params.key + '.jpg'))
						Fs.copyFileSync(Path.resolve(configs.tiles.folder, req.params.type, req.params.zoom.toString(), 'original', req.params.key + '.jpg'), Path.resolve(configs.tiles.folder, req.params.type, req.params.zoom.toString(), req.params.key + '.jpg'))
					} else {
						log('Original exists')
						res.sendFile(Path.resolve(configs.tiles.folder, req.params.type, req.params.zoom.toString(), 'original', req.params.key + '.jpg'))
					}
				})
			} else {
				res.sendFile(Path.resolve(configs.tiles.folder, req.params.type, req.params.zoom.toString() + (_.get(req, 'query.original', null) != null ? '/original' : ''), req.params.key + '.jpg'))
			}
		})
	} else {
		Fs.readFile(Path.resolve(__dirname, '../../www/Tile.html'), 'utf-8', (err, data) => {
			//let script = `<script>window.LoadTile('${req.params.type}', ${req.params.zoom}, '${req.params.key}')</script>`
			res.send(data)//.replace('<!-- END -->', script))
		})
	}
})

router.get('/:id/view', (req, res) => {
	res.send(req.query)
})

router.get('/', (req, res) => {
	Fs.readFile(Path.resolve(__dirname, '../../www/Tiles.html'), 'utf-8', (err, data) => {
		res.send(data)
	})
})

module.exports = router
