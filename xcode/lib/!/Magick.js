let _ = require('org.tts.js.lodash')
let Deasync = require('deasync')
let Fs = require('fs'), https = require('https'), Path = require('path')
const { exec } = require('child_process')

module.exports = Deasync((cmd, cb) => {
	//log('magick '+cmd)
	//log(cmd.length)

	let im = exec('magick '+cmd, (error, stdout, stderr) => {
		//log(error)
		//log(stdout)
		//log(stderr)
		cb(error)
	})

})

