let _ = require('org.tts.js.lodash')

let configs = {
	roads: {
		'vehicle': ['314874905', '10203299', '323553678', '322971494', '147035905', '314874907', '10101613', '315061563', '10101780'],
		'atv': [],
		'trail': ['147229390', '323724733', '323603591', '323603599', '323603598', '323603597', '323603591', '323553673', '323553671']
	}
}

module.exports = function () {
	_.get(this, 'kml.Document', []).forEach(doc => {
		_.get(doc, 'Placemark', []).forEach(placemark => {
			if (placemark.IsRoad) {
				placemark.styleUrl = '#Road_Trail'
				let id = _.get(placemark, 'Tags.@id', '')
				if (configs.roads.vehicle.includes(id)) {
					placemark.styleUrl = '#Road_Vehicle'
				}
				if (configs.roads.trail.includes(id)) {
					placemark.styleUrl = '#Road_Trail'
				}
			}
		})
	})
}
