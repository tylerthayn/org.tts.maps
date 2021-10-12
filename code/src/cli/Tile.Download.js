let _ = require('org.tts.js.lodash')
let Deasync = require('deasync')
let Fs = require('fs'), https = require('https'), Path = require('path')
const { spawn } = require('child_process')
let Maps = require('../../dist/org.tts.js.Maps')
let im = require('imagemagick')

let tile = new Maps.Tile(process.argv[2])
let style = process.argv[3]
let path = Path.resolve('D:/Maps/db/tiles', style, tile.key + '.jpg')

let url = `https://api.mapbox.com/styles/v1/mapbox/${style}/static/[${tile.bounds[0]},${tile.bounds[1]},${tile.bounds[2]},${tile.bounds[3]}]/1024x1024?access_token=${process.env.MapboxApiToken}`
let out = Fs.createWriteStream(path)
https.get(url, (res) => {
	res.on('error', (error) => {throw error})
	res.on('end', () => {log('Done')})
	res.pipe(out)
}).on('error', (error) => {throw error})

