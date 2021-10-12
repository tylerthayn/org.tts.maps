let _ = require('org.tts.js.lodash')
let browserify = require('browserify')
let Fs = require('fs')
let Path = require('path')
let UglifyJS = require("uglify-es")
let minifyOptions={compress:true,output:{quote_style:1}}

let pkg = require('../package.json')
//let distFolder = '.Dist' + (pkg.name.includes('/') ? '/'+pkg.name.split('/')[0] : '')
//try {fs.mkdirSync(distFolder, {recursive: true})} catch (e) {}

let name = pkg.name.split('/').pop()
let out = Fs.createWriteStream(Path.resolve('./out/Point.js'), 'utf-8')

let b = browserify()
b.require('./src/Point.js', {expose: 'Point'})
//b.require('./'+pkg.main)
//file.on('finish', () => {
//	fs.readFile(distFolder+'/'+name+'.js', 'utf-8', (err, data) => {
//		let result = UglifyJS.minify(data, minifyOptions)
//		fs.writeFile(distFolder+'/'+name+'.min.js', '/* '+pkg.name+' */\n'+result.code, 'utf-8', (err) => {})
//	})
//})
b.bundle().pipe(out)
