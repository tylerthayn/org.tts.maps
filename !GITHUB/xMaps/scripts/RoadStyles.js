
let configs = require('../configs/roads')

module.exports = function () {
	this.kml.Document.forEach(doc => {
		doc.Placemark.forEach(placemark => {
			placemark.styleUrl = '#Road_ATV'
			placemark.ExtendedData[0].Data.forEach(d => {
				if (d.$.name == '@id' && configs.vehicle.includes(d.value.toString().split('/').pop())) {
					placemark.styleUrl = '#Road_Vehicle'
				}
				if (d.$.name == '@id' && configs.hike.includes(d.value.toString().split('/').pop())) {
					placemark.styleUrl = '#Road_Trail'
				}
			})
		})
	})
}
if (Object.keys(item.Tags).includes('highway')) {
			return true
		}