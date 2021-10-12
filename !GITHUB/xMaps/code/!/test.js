let _ = require('org.tts.js.lodash')
let Maps = require('./')

//let Overpass = require('./overpass')
//require('./Elevation')

//Maps.Elevation.ApiKey = 'ttt'

Maps.Overpass.Way('762295044').then(data => {

	log(JSON.stringify(data.features[0].geometry.coordinates))


	Maps.Overpass.Way('630174617').then(data => {

		log(JSON.stringify(data.features[0].geometry.coordinates))

	})


}).catch(log)

