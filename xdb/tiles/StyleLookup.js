let _ = require('org.tts.js.lodash')

module.exports = function StyleLookup (feature) {
	if (feature.geometry.type == 'Point') {
		if ((_.get(feature, 'properties.tags.intermittent', 'no') == 'yes') || (_.get(feature,'properties.tags.natural', 'none').match(/(spring|water|stream)/i) != null) || (_.get(feature, 'properties.tags.water', null) != null)) {
			return _.get(feature, 'properties.tags.Inactive', false) != false ? 'Spring.Inactive' : _.get(feature, 'properties.tags.Capped', false) != false ? 'Spring.Capped' : 'Spring'
		}
		return 'Label'
	}

	if (feature.geometry.type == 'LineString') {
		if (_.get(feature, 'properties.tags.highway', null) != null) {
			if (_.get(feature, 'properties.tags.road', null) != null) {
				return 'Road.'+_.capitalize(_.get(feature, 'properties.tags.road', null))
			}
			if (!!_.get(feature, 'properties.tags.surface', 'none').match(/(asphalt|paved|concrete)/i) || _.get(feature, 'properties.tags.tracktype', 'none') == 'grade1') {
				return 'Road.Paved'
			}
			if (!!_.get(feature, 'properties.tags.surface', 'none').match(/(dirt|gravel|ground|rock)/i) || !!_.get(feature, 'properties.tags.tracktype', 'none').match(/grade(2|3|4)/i)) {
				return 'Road.Dirt'
			}
			if (_.get(feature, 'properties.tags.tracktype', 'none') == 'trail') {
				return 'Road.Trail'
			}
			if (_.get(feature, 'properties.tags.neon', 'no') == 'yes') {
				return 'Road.Neon'
			}
			return 'Road.ATV'
		}

		if ((_.get(feature, 'properties.tags.intermittent', 'no') == 'yes') || (!!_.get(feature,'properties.tags.natural', 'none').match(/(spring|water|stream)/i)) || (_.get(feature, 'properties.tags.water', undefined) !== 'undefined')) {
			return _.get(feature, 'properties.tags.Inactive', false) ? 'Water.Inactive' : _.get(feature, 'properties.tags.waterway', 'none') == 'stream' ? 'Water.Stream' : 'Water'
		}
	}

	log('Unkonw Style Type' + feature.id)
	return 'unknown'
}