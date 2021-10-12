let _ = require('org.tts.js.lodash')
let Fs = require('fs')
let https = require('https')
let Parser = require('xml2js').parseString
let Path = require('path')
let Overpass = require('./src/Overpass')


let dbFolder = Path.resolve('D:/Maps/db')
let overpass = new Overpass({
	db: dbFolder,
	backup: true
})

let db = {
	node: Fs.readdirSync(Path.resolve(dbFolder, 'node')).map(e=>{return e.split('.')[0]}),
	way: Fs.readdirSync(Path.resolve(dbFolder, 'way')).map(e=>{return e.split('.')[0]}),
	relation: Fs.readdirSync(Path.resolve(dbFolder, 'relation')).map(e=>{return e.split('.')[0]})
}

let request = {node: [], way: [], relation: []}
let download = {node: [], way: [], relation: []}

process.argv.slice(2).forEach(item => {
	if (!!item.match(/^(node|way|relation)\/\d+$/i)) {
		request[item.split('/')[0]].push(item.split('/')[1])
	}
})

Object.keys(request).forEach(type => {
	request[type].forEach(id => {
		if (!db[type].includes(id)) {
			download[type].push(id)
		}
	})
})

function Downloads (download, cb) {

	function Nodes (ids, cb) {
		if (ids.length > 0) {
			log('Downlaoding Nodes:'+ids.join(', '))
			return overpass.Nodes(ids, cb)
		}
		cb(null)
	}

	function Ways (ids, cb) {
		if (ids.length > 0) {
			log('Downlaoding Ways:'+ids.join(', '))
			return overpass.Ways(ids, cb)
		}
		cb(null)
	}

	function Relations (ids, cb) {
		if (ids.length > 0) {
			log('Downlaoding Relations:'+ids.join(', '))
			return overpass.Relations(ids, cb)
		}
		cb(null)
	}

	Nodes(download.node, (error, data) => {
		Ways(download.way, (error, data) => {
			Relations(download.relation, (error, data) => {
				cb()
			})
		})
	})
}

Downloads(download, () => {
	let elements = []

	let paths = []
	Object.keys(request).forEach(type => {
		request[type].forEach(id => {
			paths.push(Path.resolve(dbFolder, type, id+'.json'))
		})
	})

	let data = []
	paths.forEach(path => {
		data.push(Fs.readFileSync(path, 'utf-8'))
	})
	log(JSON.stringify(data, null, 4))
})



