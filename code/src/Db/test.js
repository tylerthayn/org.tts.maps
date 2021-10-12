let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')

let Db = require('./')

let db = new Db()

db['Get']('tiles/satellite-v9/1234567890', {}, (error, tile) => {
	//do something with {tile}
})
//db['Put']('gpx/hikes', {options}, {data}, (error, result) => {
	//notify result status
//})

//db['Options']('geo/way[/id]', (error, options) => {
	//
//})
/*
...

Backend
=======
Handler
	/method/
	/uri/
	fn
Db.protoype.Use = function ([method[s],] [matcher,] (req, res, next) => {
	if (methods) {
	this.handlers.push({handler})
})

Db.prototype.ReqHandler = function (method, uri, options, [data,] cb) {
	let handlers = []
	this.handlers.forEach(handler => {
		if (Match(handler, req)) {
			handlers.push(handler)
		}
	})
	Wrap(handlers)(req, cb)
}

	handler = (req, res, next) => {}
*/
