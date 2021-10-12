let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')
let express = require('express')
const { spawn } = require('child_process')
let configs = require('../../config')

Fs.writeFileSync(Path.resolve(__dirname, 'pid'), process.pid.toString(), 'utf-8')

let app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/tiles', require('./Tiles'))
//app.use('/features', require('./Features'))
//app.use('/places', require('./Places'))
app.use(express.static(Path.join(__dirname, '../../www')))
app.use('/', (req, res) => {
	res.sendFile(Path.join(__dirname, '../../www', 'App.html'))
})

app.listen(configs.server.port, () => {
	spawn("C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe", ['--profile-directory=Default', '--allow-file-access-from-files', 'http://localhost:'+configs.server.port], {detached: true})
	console.log(`Example app listening at http://localhost:${configs.server.port}`)
})



