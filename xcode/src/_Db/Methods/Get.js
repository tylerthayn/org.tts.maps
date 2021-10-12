let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')

let defaults = {
	variant: null,
	version: 'latest'
}

module.exports = (configs) => {

	function Get () {
		let path = _.First(arguments)
		let cb = _.Last(arguments)
		let options = new _.Options(arguments.length > 2 ? arguments[1] : {}, defaults)

		let request = {
			method: 'get',
			path: path,
			format: options.format,
			variant: options.variant,
			version: options.version
		}

		if ((m = request.path.match(/\/v((?:\d+\.*)+(?:\d+)*)$/i)) != null) {
			let pieces = m[1].split('.')
			request.variant = pieces.length > 1 ? pieces.shift() : request.variant
			request.version = pieces.join('.')
			request.path = request.path.replace(/\/v((?:\d+\.*)+(?:\d+)*)$/i, '')
		}
		if ((m = request.path.match(/\.(\w+)$/)) != null) {
			request.format = m[1]
			request.path = request.path.replace(/\.(\w+)$/, '')
		}
		log(configs)
		log(request.path)
		Versioning(Path.resolve(configs.dbPath, request.path), (error, versionings) => {
			if (error) {return cb(error)}
			log(versionings)
			log(_.get(versionings, 'variants', null))
			log(_.get(versionings, 'versions', null))
			log(_.get(versionings, 'latest', null))
			cb(null, request)
		})
	}

	return Get

}

function Versioning (path, cb) {
	log(Path.basename(path))
	Fs.readdir(Path.dirname(path), (error, entries) => {
		if (error) {return cb(error)}
		let versionings = []
		entries.forEach(entry => {
			if (entry.match(new RegExp('^'+Path.basename(path))) != null) {
				let extra = entry.replace(new RegExp('^'+Path.basename(path)), '')
				if (extra.startsWith('.')) {
					let pieces = extra.replace(/^\./, '').split('.')
					versionings.push([pieces.shift(), pieces.join('.')])
				}
			}
		})

		if (_.get(versionings, '[0].length', 0) > 1) {
			_.Define(versionings, 'variants', {get: () => {
				let v = {}
				versionings.forEach(versioning => {
					if (versioning.length > 1) {
						if (!Reflect.has(v, versioning[0])) {
							v[versioning[0]] = []
						}
						v[versioning[0]].push(versioning[1])
					}
				})
				return v
			}}, true)

			_.Define(versionings, 'latest', {get: () => {
				let latestVariant = Object.keys(versionings.variants).map(n=>{return parseInt(n)}).sort().reverse().shift()
				let latestVersion = versionings.variants[latestVariant].sort((a, b) => {
					let _a = a.split('.').map(n=>{return parseInt(n)})
					let _b = b.split('.').map(n=>{return parseInt(n)})
					for (i=0;i<_a.length;i++) {
						if (_a[i] < _b[i]) {return -1}
						else if (_a[i] > _b[i]) {return 1}
					}
					return 0
				}).pop()
				return [latestVariant.toString(), latestVersion.toString()]
			}}, true)

		} else if (_.get(versionings, '[0].length', 0) > 0) {
			_.Define(versionings, 'versions', {get: () => {
				let v = []
				versionings.forEach(versioning => {
					if (versioning.length > 0) {
						v.push(versioning[0])
					}
				})
				return _.uniq(v)
			}}, true)
		}


		cb(null, versionings)
	})
}

