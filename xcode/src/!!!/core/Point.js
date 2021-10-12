(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define('Maps/Point', ['org.tts.js.lodash', 'Maps/Point/XY', 'Maps/Point/Pixel'], factory)
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('org.tts.js.lodash'))
	} else {
		factory(_)
	}
}(function (_, XY, Pixel) {

	_.Define(XY, 'XY', XY, true)
	_.Define(XY, 'Pixel', Pixel, true)
	return XY

}))
