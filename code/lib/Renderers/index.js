let _ = require('org.tts.js.lodash')
let Fs = require('fs')
let Path = require('path')

Fs.readdirSync(Path.resolve(__dirname), {withFileTypes: true}).forEach(entry => {
	if (entry.isFile() && entry.name.endsWith('.js') && entry.name != 'index.js') {
		let style = entry.name.replace(/\.js$/, '')
		exports[style] = require('./'+entry.name)
	}
})
