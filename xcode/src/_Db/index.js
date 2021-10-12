let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')
let Methods = require('./Methods')

let defaults = {
	dbPath: Path.resolve('D:\\Maps\\db')
}
function Db (opts = {}) {
	let options = new _.Options(opts, defaults)

	Object.keys(Methods).forEach(method => {
		_.Define(this, method, Methods[method](options), true)
	}, this)


	_.Define(this, 'Hi', (name) => {log('Hi '+name)})


	return this
}

_.Define(Db, 'methods', {get: () => {return Object.keys(Methods)}}, true)

module.exports = Db

