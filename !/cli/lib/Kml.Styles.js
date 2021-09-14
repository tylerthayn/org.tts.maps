let _ = require('org.tts.js.lodash')

function Clear () {
	delete this.kml.Document[0].Style
	delete this.kml.Document[0].StyleMap
	return this
}

function Apply (style) {
	this.kml.Document[0].Style = style.kml.Document[0].Style
	this.kml.Document[0].StyleMap = style.kml.Document[0].StyleMap
	return this
}

module.exports = function () {
	_.Define(this, 'Styles', {
		Apply: Apply.bind(this),
		Clear: Clear.bind(this)
	})
}
