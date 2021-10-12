let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')


srcFolder = './src'
function XtractDependencies (file) {
	let deps = []
	try {
		deps = Fs.readFileSync(file, 'utf8').match(/define\((.+)\)/)[0].match(/\[(.+)]/)[1].split(',').map(s=>{return s.replace(/'/g, '').trim()}).filter(s=>{return s.startsWith('Maps/')}).map(s=>{return Path.resolve(srcFolder, s.replace('Maps/', './')+'.js')})
	} catch (e) {}
	return deps
}


function Dependencies (file, list = []) {
	let deps = XtractDependencies(Path.resolve(srcFolder, file))
	deps.forEach(dep => {
		if (!list.includes(dep)) {
			list = Dependencies(dep, list)
		}
	})
	list.push(Path.resolve(srcFolder, file))
	return list
}

_.Define(Dependencies, 'SrcFolder', {get: () => {return srcFolder}, set: (v) => {srcFolder=v}}, true)
module.exports = Dependencies



/*
let deps = {}, files = [], dir = ''



function GetDependencies (file) {
	let src = Fs.readFileSync(Path.resolve(dir, file), 'utf8')
	if ((m = src.match(/(?:define\((.+)\))/)) != null) {
		return m[1].split(']')[0].replace('[', '').split(',').map(x=>{return x.replace(/'/g, '').trim()}).filter(x=>{return x.startsWith('Maps/')}).map(x=>{return x.replace('Maps/', '')+'.js'})
	}
	return []
}

function ProcessFiles () {
	let file = files.shift()
	deps[file] = GetDependencies(file)
	deps[file].forEach(dep => {
		if (!Object.keys(deps).includes(dep)) {
			//deps[dep].push(dep)
			files.push(dep)
		}
	})
	return files.length > 0 ? ProcessFiles() : deps
}


function Sort (deps) {
	let _sorted = []

	function Process (dep) {
		if (_sorted.includes(dep)) {
			return
		}
		if (deps[dep].length > 0) {
			deps[dep].forEach(_dep => {
				Process(_dep)
			})
		}
		_sorted.push(dep)
	}

	Object.keys(deps).forEach(dep => {
		Process(dep)
	})

	return _sorted
}


module.exports = (main, folder) => {
	if (typeof folder !== 'undefined') {
		dir = folder
	}
	files.push(main)
	return Sort(ProcessFiles())
}
*/