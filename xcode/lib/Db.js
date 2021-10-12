let _ = require('org.tts.js.lodash')
let Fs = require('fs')
let https = require('https')
let Parser = require('xml2js').parseString
let Path = require('path')
let Query = require('query-overpass')

let configs = require('../../config')

let PathGenerator = (type, id, original = false) => {
	return Path.resolve(configs.db.folder, type, id+(original ? '' : '$')+'.json')
}

function Db () {


	return this
}

Db.prototype.Feature = function () {
	let _arguments = _.toArray(arguments)
	let local = _.Type(_.First(_arguments), 'boolean') ? !_arguments.shift() : true
	let cb = _arguments.pop()
	let type = _arguments.shift()
	let id = _arguments.shift()

	log(PathGenerator(type, id, !local))
	Fs.access(PathGenerator(type, id), (error) => {
		if (!local || error) {
			Fs.access(PathGenerator(type, id, true), (error) => {
				if (error) {
					if (configs.db.backup) {
						DownloadFeature(type+'/'+id, cb)
					}
				} else {
					Fs.readFile(PathGenerator(type, id, true), (error, data) => {
						cb(null, JSON.parse(data))
					})
				}
			})
		} else {
			Fs.readFile(PathGenerator(type, id), 'utf-8', (error, data) => {
				cb(null, JSON.parse(data))
			})
		}
	})
}


module.exports = new Db()

function DownloadFeature () {
	log(arguments)
	let cb = _.Last(arguments) instanceof Function ? _.Last(arguments) : _.Noop
	log(_.First(arguments).split('/').join('(')+');out geom;')
	Query(_.First(arguments).split('/').join('(')+');out geom;', (error, data) => {
		data.features.forEach(feature => {
			Fs.writeFile(PathGenerator(feature.id.split('/')[0], feature.id.split('/')[1], true), JSON.stringify(feature, null, 4), 'utf-8', (error) => {
				cb(null, feature)
			})
		})
	})

/*
	let options = {
		headers: {
			accept: 'application/json'
		},
		host: configs.overpass.host[configs.overpass.mode],
		method: 'GET',
		path: '/api/'+configs.overpass.version+'/'+_.First(arguments),
		protocol: 'https:'
	}

	let request = https.request(options, (response) => {
		let data = ''
		response.on('data', (chunk) => {data += chunk.toString()})
		response.on('end', () => {
			if (response.headers['content-type'].includes('json')) {
				if (configs.db.backup) {
					Fs.writeFile(PathGenerator(_.First(arguments).split('/')[0], _.First(arguments).split('/')[1], true), data, 'utf-8', (error) => {
						cb(null, JSON.parse(data))
					})
				} else {
					cb(null, JSON.parse(data))
				}
			} else if (response.headers['content-type'].includes('xml')) {
				Parser(data, function (err, data) {
					if (err) {return cb(err)}
					if (configs.db.backup) {
					Fs.writeFile(PathGenerator(_.First(arguments).split('/')[0], _.First(arguments).split('/')[1], true), data, 'utf-8', (error) => {
							cb(null, JSON.parse(data))
						})
					} else {
						cb(null, JSON.parse(data))
					}

					Fs.writeFile(configs.db.folder+_.First(arguments), result, 'utf-8', (error) => {
						cb(null, result)
					})
				})
			} else {
				log(data)
				throw new Error('Invalid http content type')
			}
		})
	})

	request.on('error', cb)
	request.end()
*/
}
