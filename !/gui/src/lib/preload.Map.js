const { contextBridge, ipcRenderer } = require('electron')
const Fs = require('fs'), Path = require('path')
let Parser = require('xml2js').parseString
let Builder = require('xml2js').Builder

//contextBridge.exposeInMainWorld(
//  'electron', require('electron'),
//)

contextBridge.exposeInMainWorld(
	'App', {
		'On': (channel, listener) => {
			ipcRenderer.on(channel, listener)
		}
	}
)

contextBridge.exposeInMainWorld('Kml', {
	Build: (kml) => {
		let builder = new Builder()
		let xml = builder.buildObject(kml.kml)
		return xml.replace('<root ', '<kml ').replace('</root>', '</kml>')
	},
	Load: (path) => {
		return new Promise((resolve, reject) => {
			Fs.readFile(Path.resolve(path), 'utf-8', (err, contents) => {
				Parser(contents, (err, kml) => {
					kml.contents = contents
					resolve(kml)
				})
			})
		})
	},
	Save: (path, kml) => {
		let builder = new Builder()
		let xml = builder.buildObject(kml.kml)
		Fs.writeFile(Path.resolve(path), xml.replace('<root ', '<kml ').replace('</root>', '</kml>'), 'utf-8', (err) => {
	})
}
})

let x = {
	_: 'lodash-tts',
	Fs: 'fs',
	Path: 'path',
	xml2js: 'xml2js'
}
Object.keys(x).forEach(l => {contextBridge.exposeInMainWorld(l, require(x[l]))})

