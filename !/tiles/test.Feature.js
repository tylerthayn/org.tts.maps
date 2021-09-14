let _ = require('org.tts.js.lodash')
let Deasync = require('deasync')
let Fs = require('fs'), https = require('https')
let Tile = require('./lib/Tile')
let Turf = require('@turf/turf')
let overpass = require('query-overpass')
let Feature = require('./lib/Feature')

//let feature = Feature(JSON.parse(Fs.readFileSync('D:/Maps/db/way/Mt Ellen Spring Trail.json', 'utf-8')))
let feature = Feature(JSON.parse(Fs.readFileSync('D:/Maps/db/node/3303395538.json', 'utf-8')))
log(feature)
let tile = Tile.LatLon(feature.geometry.coordinates[1], feature.geometry.coordinates[0], 13)
feature.geometry.Draw(feature.properties.id+'.png', 1024, 1024, tile.bounds)




