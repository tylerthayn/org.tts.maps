let _ = require('org.tts.js.lodash')
let Fs = require('fs')
let Path = require('path')
let https = require('https')
let Maps = require('../../code/src/')
let Deasync = require('deasync')

let data = JSON.parse(Fs.readFileSync('data.json', 'utf-8'))
let list = []

Object.keys(data).forEach(zoom => {
	Object.keys(data[zoom]).forEach(key => {
		list.push(`./data/${zoom}/${key}.json`)
	})
})
Fs.writeFileSync('./list.json', JSON.stringify(list, null, 4), 'utf-8')




