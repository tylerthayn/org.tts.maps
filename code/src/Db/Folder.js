let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')
let File = require('./File')
let Uuid = require('./Uuid')

function Folder (folder, name, namer = Uuid, fetcher) {
	this.folder = folder
	this.name = name
	this.Namer = namer
	this.Fetcher = fetcher

	_.Define(this, 'Path', {get: () => {
		return Path.resolve(this.folder, this.name)
	}}, true)

	_.Define(this, 'Get', (name, ext, version, cb) => {

	}, true)

	_.Define(this, 'Files', (cb) => {
		Fs.readdir(this.Path, {withFileTypes), (error, entries) => {
			if (error) {cb(error)}
			//...
		})

	}, true)

	_.Define(this, 'New', (name, ext = '', cb) => {
		let file = new File(this.Path, typeof name === 'undefined' ? this.Namer() : name, ext, 0)
		if (typeof cb === 'function' && typeof this.Fetcher === 'function') {
			file.Save(this.Fetcher(), cb)
		}
		return file
	}, true)

	return this
}


module.exports = Folder

