let _ = require('org.tts.js.lodash')
let Fs = require('fs')
let https = require('https')
let Parser = require('xml2js').parseString
let Path = require('path')

let defaults = {
	backup: true,
	db: Path.resolve(__dirname, '../../../db'),
	mode: 'live',
	host: {
		live: 'api.openstreetmap.org',
		test: 'master.apis.dev.openstreetmap.org'
	},
	version: '0.6'
}

function Overpass (options = {}) {
	this.options = new _.Options(defaults, options)

}

Overpass.prototype.Node = function (id, cb) {this.Query('node/'+id, cb)}
Overpass.prototype.Nodes = function (ids, cb) {this.Query('nodes?nodes='+ids.join(','), cb)}
Overpass.prototype.Relation = function (id, cb) {this.Query('relation/'+id, cb)}
Overpass.prototype.Relations = function (ids, cb) {this.Query('relations?relations='+ids.join(','), cb)}
Overpass.prototype.Way = function (id, cb) {this.Query('way/'+id, cb)}
Overpass.prototype.Ways = function (ids, cb) {this.Query('ways?ways='+ids.join(','), cb)}

Overpass.prototype.Backup = function (data, cb) {
	if (this.options.backup) {
		data.elements.forEach(element => {
			Fs.writeFile(Path.resolve(this.options.db, element.type, element.id + '.json'), JSON.stringify(element, null, 4), 'utf-8', error => {
				log(error)
			})
		})
	}

	cb(null, data)
}

Overpass.prototype.Query = function () {
	let cb = _.Last(arguments) instanceof Function ? _.Last(arguments) : _.Noop

	let options = {
		headers: {
			accept: 'application/json'
		},
		host: this.options.host[this.options.mode],
		method: 'GET',
		path: '/api/'+this.options.version+'/'+_.First(arguments)+'.json',
		protocol: 'https:'
	}

	let request = https.request(options, (response) => {
		let data = ''
		response.on('data', (chunk) => {data += chunk.toString()})
		response.on('end', () => {
			if (response.headers['content-type'].includes('json')) {
				this.Backup(JSON.parse(data), cb)
			} else if (response.headers['content-type'].includes('xml')) {
				Parser(data, function (err, result) {
					if (err) {return cb(err)}
					cb(null, result)
				})
			} else {
				log(data)
				throw new Error('Invalid http content type')
			}
		})
	})

	request.on('error', (error) => {cb(error)})
	request.end()
}


module.exports = Overpass
