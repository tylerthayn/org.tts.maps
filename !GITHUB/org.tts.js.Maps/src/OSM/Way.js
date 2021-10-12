let _ = require('lodash-tts')

function Way (data) {
	_.Define(this, '_data', data)
	_.Define(this, 'Bounds', {get: () => {return data.bounds}}, true)
	_.Define(this, 'Distance', {get: () => {
		//for (i=1; i < way.Points.length; i++) {
		//	way.Distance += Math.abs(distance(way.Points[i].lat, way.Points[i].lon, way.Points[i-1].lat, way.Points[i-1].lon))
		//}
	}}, true)
	_.Define(this, 'Id', {get: () => {return data.$.id}}, true)
	_.Define(this, 'Tags', {get: () => {
		let tags = {}
		data.tag.forEach(tag => {tags[tag.$.k] = tag.$.v})
		return tags
	}, true)


	return this
}



module.exports = Way

