let _ = require('org.tts.js.lodash')
//let Wrap = require('./Wrap')

let defaults = {
	methods: ['Delete', 'Get', 'Head', 'Options', 'Post', 'Put'],
	path: 'D:/Maps/db'
}

function Db () {
	let args = _.toArray(arguments)
	this.options = new _.Options(defaults, args.length > 0 && _.Type(args[0], 'object') ? args.shift() : {})
	this.folders = []
	this.files = []

	_.flatten(args).forEach(item => {
		if (_.Type(item, 'Folder')) {
			this.folders.push(item)
		} else if (_.Type(item, 'File')) {
			this.files.push(item)
		}
	})

	this.options.methods.forEach(method => {
		_.Define(this, method, function (uri, options, data, cb) {
			let result = this.GetFolder(uri)
			let parent = result == null ? this : result.folder
			if (result != null && result.uri == '') {
				return parent[method](options, cb)
			}

			if (method == 'Put' || method == 'Post') {
				return parent[method][options.type](result.uri, options, data, cb)
			} else {
				for (let i=0; i<parent.files.length; i++) {
					if (parent.files[i].name == result.uri) {
						return file[method](options, cb)
					}
				}
			}

			//let handlers = []
			//this.options.handlers.forEach(handler => {
			//	if (handler.Match(req)) {
			//		handlers.push(handler)
			//	}
			//})
			//this.Route(handlers, req, cb)
		}, true)
	})

	return this
}

Db.prototype.GetFolder = function (uri) {
	function _GetFolder (folders, uri) {
		let _uri = uri.split('/')
		for (let i = 0; i < folders.length; i++) {
			if (folders[i].name == _uri[0]) {
				let folder = _GetFolder(folders[i].folders, _uri.slice(1).join('/'))
				return folder != null ? {folder: folder, uri: _uri.slice(1).join('/')} : {folder: folders[i], uri}
			}
		}
		return null
	}
	return _GetFolder(this.folders, uri)
}

/*
Db.prototype.Route = function (routes, req, cb) {
	let handlers = _.clone(routes)
	let res = {}

	function Next () {
		if (arguments[0] instanceof Error) {
			cb(arguments[0]
		} else if (typeof arguments[0] === 'boolean' && arguments[0]) {
			cb.apply(null, _.Tail(arguments))
		} else {
			if (handlers.length > 0) {
				handlers.pop()(req, res, Next)
			} else {
				Next(true, res)null, res)
			}
		}
	}

	Next()
}
*/

module.exports = Db
