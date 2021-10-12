let _ = require('org.tts.js.lodash')
let https = require('https')
let Deasync = require('deasync')

let apiKey = 'AIzaSyC3hZT_G0O6_ndNG7s4ww6eQYuNzZbxcls'
let apiUrl = 'https://maps.googleapis.com/maps/api/elevation'
let apiFormat = 'json'

if (typeof global.Elevation === 'undefined') {

	global.Elevation = Deasync((coordinates, cb) => {
		let url = apiUrl+'/'+apiFormat+'?key='+apiKey+'&locations='+coordinates
		//log(url)
		https.get(url, {}, (response) => {
			let data = ''
			response.on('data', chunk => {data += chunk.toString()})
			response.on('close', () => {
				try {
					cb(null, JSON.parse(data).results.map(c => {return [c.location.lng, c.location.lat, c.elevation]}))
				} catch (e) {cb(e)}
			})
		}).on('error', cb)
	})

	_.Define(global.Elevation, 'ApiFormat', {get: () => {return apiFormat}, set: (v) => {apiFormat = v}})
	_.Define(global.Elevation, 'ApiKey', {get: () => {return apiKey}, set: (v) => {apiKey = v}})
	_.Define(global.Elevation, 'ApiUrl', {get: () => {return apiUrl}, set: (v) => {apiUrl = v}})
}

module.exports = global.Elevation
