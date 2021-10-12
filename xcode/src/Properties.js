(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['org.tts.js.lodash'], factory)
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('org.tts.js.lodash'))
	} else {
		factory(_)
	}
}(function (_) {

	function Properties () {


	}

	return Properties

}))