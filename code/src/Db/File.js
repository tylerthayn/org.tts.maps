let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')
let Uuid = require('./Uuid')
let Mime = require('mime-types')

function File (folder = './', name = Uuid(), type = 'json', version = 0) {
	this.folder = folder
	this.name = name
	this.version = version
	this.ext = (Mime.extension(type) == false ? type : Mime.extension(type)).replace(/^\./, '')

	_.Define(this, 'Path', {get: () => {
		return Path.resolve(this.folder, this.name + '.' + this.version.toString() + '.' + this.ext
	}}, true)

	_.Define(this, 'Read', (encoding = 'utf8') => {
		return Fs.createReadStream(this.Path, {encoding: encoding})
	}, true)

	_.Define(this, 'Save', (data, cb) => {
		let output = Fs.createWriteStream(this.Path, {encoding: data instanceof stream ? data.readableEncoding : 'utf8', mode: 777})
		output.on('finish', () => {cb(null)})
		output.on('error', cb)
		if (data instanceof stream) {data.pipe(output)}
		else {output.end(data)}
		return this
	}, true)

	_.Define(this, 'Update', (data, cb) => {
		let file = new File(this.folder, this.name, this.version+1, this.ext)
		file.Save(data, (error) => {
			cb(error, file)
		})
		return file
	}, true)

	return this
}

module.exports = File
