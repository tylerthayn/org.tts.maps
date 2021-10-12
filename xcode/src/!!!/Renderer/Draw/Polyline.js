let _ = require('org.tts.js.lodash')

module.exports = (fill, stroke, strokeWidth) => {

	_.Define(this, 'Draw', (geometry) => {
		return `-fill ${fill} -stroke ${stroke} -strokewidth ${strokeWidth} -draw ${geometry}`
	})

	return this
}
