let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')
let Mime = require('mime-types')

function Handler (method, uri, fn) {
	let args = _.toArray(arguments)
	let fn = args.pop()
	let method = args.length > 0 ? args.shift() : /.*/
	let uri = args.length > 0 ? args.shift() : /.*/

	_.Define(fn, 'Match', req => {
		if (req.method.match(method) == null) {return false}
		if (req.uri.match(uri) == null) {return false}
		return true
	})
	return fn
}

module.exports = Handler
