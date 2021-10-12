let _ = require('lodash-tts')
let Box = require('./Box')


function Track () {
	this.id = ''
	this.bounds = new Box()
	this.distance = Number.NaN
	this.points = []
	this.tags = {}
	this.type = 'ROAD'

	return this
}

_.Define(Track, 'Types', {get: () => {return types}, set: (v) => {types = v}})
_.Define(Track.prototype, 'Distance', {get: function () {return Number.NaN}})
_.Define(Track.prototype, 'Time', {get: function () {return {type: 'Time'}}})

Track.prototype.Is = function (type) {
	return _.Match(this.type, type)
}





module.exports = Track

