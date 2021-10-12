let _ = require('org.tts.js.lodash')
let UUIDv4 = require('uuid').v4
let ns = UUIDv4('maps.tts')

module.exports = () => {
	return UUIDv4(ns)
}

_.Define(module.exports, 'ns', ns, true)
