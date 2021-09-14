let _ = require('org.tts.js.lodash')
let Fs = require('fs'), https = require('https'), Path = require('path')
let Tile = require('./lib/Tile')
const { spawn } = require('child_process')

let tiles = JSON.parse(Fs.readFileSync('data/tiles.json', 'utf-8')).map(t=>{return new Tile(t)})
tiles.forEach(tile => {
	log(tile.key)
	log('\t'+tile.bounds)
})
