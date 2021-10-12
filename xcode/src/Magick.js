const { exec } = require('child_process')

module.exports = (cmd, cb) => {
	//console.log(cmd)
	let im = exec('magick '+cmd, cb)
}
