(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define('Maps/Range', ['org.tts.js.lodash'], factory)
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('org.tts.js.lodash'))
	} else {
		factory(_)
	}
}(function (_) {

	/***
	* Number range
	* @memberof Maps
	* @class
	*/
	return function Range (min, max) {
		let range = [ min < max ? min : max, min < max ? max : min ]

		_.Define(range, 'min', {
			get: () => range[0]
		}, true)

		_.Define(range, 'max', {
			get: () => range[1]
		}, true)

		return range
	}

}))
