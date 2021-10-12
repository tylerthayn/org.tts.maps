let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')

Fs.readdirSync(Path.resolve(__dirname)).forEach(entry => {
	if (entry.endsWith('.js') && entry != 'index.js') {
		exports[entry.replace(/\.js$/, '')] = require('./'+entry)
	}
})
