let _ = require('org.tts.js.lodash')

let configs = {
	roads: require('../../configs/roads')
}

module.exports = function () {
	log('Styler.js')

	_.get(this, 'kml.Document', []).forEach(doc => {
		_.get(doc, 'Placemark', []).forEach(placemark => {
			if (placemark.IsRoad) {
				placemark.styleUrl = '#Road_ATV'
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
