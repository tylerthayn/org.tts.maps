let _ = require('org.tts.js.lodash')
let Fs = require('fs'), https = require('https'), Path = require('path')
let Maps = require('../../dist/org.tts.js.Maps')
let Deasync = require('deasync')


let configs = {
	mapbox: {
		//tileUrl: 'https://api.mapbox.com/styles/v1/mapbox/<style>/tiles/512/<z>/<x>/<y>@2x?access_token=<access_token>',
		//tileUrl: 'https://api.mapbox.com/v4/<style>/<z>/<x>/<y>@2x.jpg70?access_token=<access_token>',
		tileUrl: 'https://api.mapbox.com/styles/v1/mapbox/<style>/static/[<bounds>]/<w>x<h>?access_token=<access_token>',
		accessToken: process.env.mapboxAccessToken
	},
	db: {
		path: 'D:/Maps/db/tiles'
	}
}
Object.defineProperty(exports, 'configs', {enumerable: true, get: () => {return configs}})

function Template (tmpl, data) {
	Object.keys(data).forEach(p => {
		tmpl = tmpl.replace(new RegExp(`<${p}>`, 'g'), data[p])
	})
	return tmpl
}

exports.Download = (key, style, cb) => {
	try {Fs.mkdirSync(Path.resolve(configs.db.path, style), {encoding: 'utf-8', recursive: true})} catch (e) {log(e)}
	let out = Fs.createWriteStream(Path.resolve(configs.db.path, style, key + ',jpg'))
	out.on('error', cb)
	out.on('finish', () => {cb(null)})
	let bounds = new Maps.Tile(key).bounds.map(b=>{return b.toFixed(3)}).join(',')
	let url = Template(configs.mapbox.tileUrl, {style: style, access_token: configs.mapbox.accessToken, w: 1024, h: 1024, bounds: bounds})
	log(url)
	https.get(url, (res) => {
		//res.setEncoding('utf8')
		console.log(res.headers)
		console.log(res.readableEncoding)
		res.on('error', cb)
		res.pipe(out)
	})
}

//https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/1/1/0?access_token=pk.eyJ1IjoidHRzZGVzaWduIiwiYSI6ImNrc2lnd2k4aTA3MXkybnFtZGdrYnV1b2cifQ.Mo1cEgeaPgrP22w24rsBcA

exports.Download('0231002120', 'satellite-v9', log)


