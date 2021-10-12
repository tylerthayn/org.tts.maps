(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['org.tts.js.lodash'], factory)
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('org.tts.js.lodash'))
	} else {
		factory(_)
	}
}(function (_) {

	return function Point (x, y, z = 0) {
		let point = [x, y, z]
		_.Define(point, 'x', {get: () => {return point[0]}}, true)
		_.Define(point, 'y', {get: () => {return point[1]}}, true)
		_.Define(point, 'z', {get: () => {return point[2]}}, true)
		return point
	}

}))

