let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')
let Strip = require('strip-comments'), UglifyJS = require("uglify-es")
let minifyOptions={compress:true,output:{quote_style:1}}

let requireMatch = /require\('(.+)'\)/g
let lodashRemove = /const lodash\s*=.*(\r\n)+/g

//process.chdir('src')
//log(process.cwd())

let files = ['src/index.require.js']
let dependencies = []

while (files.length > 0) {
	let file = files.shift()
	//dependencies.push(file)
	ExtractDependencies(file).forEach(dep => {
		if (!dependencies.includes(dep)) {
			if (Path.isAbsolute(dep)) {
				files.push(dep)
			}
			dependencies.push(dep)
		}
	})
}

log(dependencies)


function ExtractDependencies (path) {
	let deps = []
	let data = Fs.readFileSync(Path.resolve(path), 'utf-8')
	let requires = Strip(data).trim().replace(/(\r\n)+\t*(\r\n)+/g, '\r\n').match(requireMatch)
	if (requires != null) {
		requires.forEach(match => {
			let dep = match.replace(/require\('/, '').replace(/'\)/, '')
			if (dep.startsWith('.')) {
				deps.push(require.resolve(Path.resolve(Path.dirname(path), dep)))
			} else {
				deps.push(dep)
			}
		})
	}
	//deps.local.forEach(dep => {
	//	let _deps = ExtractDependencies(dep)
	//	deps.local.push(_deps.local)
	//	deps.modules.push(_deps.modules)
	//})
	return deps //{modules: _.flatten(deps.modules), local: _.flatten(deps.local)}
}


/*
let code = []
let index = Fs.readFileSync(Path.resolve(__dirname, '../src/index.js'), 'utf-8').trim().replace(/(\r\n)+\t*(\r\n)+/g, '\r\n'), source = ''

Strip(index).match(requireMatch).forEach((match) => {

	let req = match.replace(/require\('/, '').replace(/'\)/, '').replace('./', '../src/'), src = ''

	if (req == 'lodash') {
		src = `let lodash = null\r\n!(function () {\r\n\t` + Fs.readFileSync(require.resolve('lodash').replace(/\.js$/, '.min.js'), 'utf8') + `\r\n\tlodash = typeof module === 'object' ? module.exports : this._\r\n}())\r\n\r\n`
	} else {
		req = Path.resolve(__dirname, req.endsWith('.js') ? req : req + '.js')
		src = Fs.readFileSync(req, 'utf-8')
		src = src.replace(requireMatch, '').trim().replace(/(\r\n)+\t*(\r\n)+/g, '\r\n')
	}
	source += src + '\r\n\r\n'
	//index = index.replace(match, src)
})

source = source.replace(lodashRemove, '')

try {Fs.mkdirSync(Path.resolve(__dirname, '../dist'), {recursive: true})} catch (e) {}

Fs.writeFileSync(Path.resolve(__dirname, '../dist/org.tts.js.core.js'), '(function () {\r\n\r\n'+source+'\r\n\r\n}())\r\n', 'utf-8')
Fs.writeFileSync(Path.resolve(__dirname, '../dist/org.tts.js.core.min.js'), UglifyJS.minify(source, minifyOptions).code, 'utf-8')
*/
