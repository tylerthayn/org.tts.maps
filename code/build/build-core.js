let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')
let Strip = require('strip-comments'), UglifyJS = require("uglify-es")
let minifyOptions={compress:true,output:{quote_style:1}}

let files = ['GlobalMercator', 'Point', 'Coordinate', 'Range', 'Bounds', 'Tile']


//let index = Fs.readFileSync('./src/Core/index.js').toString().replace(/\r\n/g, '\n').replace(/\n/g, '\r\n').split('/*SOURCE*/')
let index = require('../src/Core/index.js')

let out = Fs.createWriteStream(Path.resolve('./dist', 'org.tts.js.Maps.js'), 'utf8')
out.write(index[0].replace(/\n/g, '\r\n'))
files.forEach(file => {
	out.write(`\t/* ${file} */\r\n`)
	out.write('\t'+UglifyJS.minify(Fs.readFileSync(Path.resolve('./src/Core', file+'.js'), 'utf8'), minifyOptions).code.replace(/\n/g, '\r\n')+'\r\n')
})
out.write(index[1].replace(/\n/g, '\r\n'))


