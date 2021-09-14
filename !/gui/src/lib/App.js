let _ = require('lodash-tts')
const {BrowserWindow, dialog, ipcMain, screen, session} = require('electron')
const Fs = require('fs')
const Path = require('path')

let app = require('electron').app
let w = undefined

app.windows = {}

function CreateWindows () {
	app.windows.map = CreateMapWindow()
	app.windows.route = CreateRouteWindow()
}

function CreateMapWindow () {
	const primaryDisplay = screen.getPrimaryDisplay()
	const { width, height } = primaryDisplay.workAreaSize

	mapWindow = new BrowserWindow({
		autoHideMenuBar: true,
		width: 800,
		height: height,
		x: 0,
		y: 0,
		title: 'Map',
		webPreferences: {
			nodeIntegration: true,
			preload: Path.resolve(__dirname, 'preload.Map.js'),
			contextIsolation: true
		}
	})
	mapWindow.loadFile('./src/static/Map.html')
	mapWindow.webContents.openDevTools()

	return mapWindow
}

function CreateRouteWindow () {
	const primaryDisplay = screen.getPrimaryDisplay()
	const { width, height } = primaryDisplay.workAreaSize


	routeWindow = new BrowserWindow({
		autoHideMenuBar: true,
		width: width - 800,
		height: height,
		x: 800,
		y: 0,
		title: 'Route/Track Manager',
		webPreferences: {
			nodeIntegration: true,
			preload: Path.resolve(__dirname, 'preload.Route.js'),
			contextIsolation: true
		}
	})
	routeWindow.loadFile('./src/static/Route.html')
	//routeWindow.webContents.openDevTools()
	return routeWindow
}

function CreateWindow () {
	const primaryDisplay = screen.getPrimaryDisplay()
	const { width, height } = primaryDisplay.workAreaSize


	w = new BrowserWindow({
		autoHideMenuBar: true,
		width: width,
		height: height,
		x: 0,
		y: 0,
		title: 'ui',
		webPreferences: {
			nodeIntegration: true,
			preload: Path.resolve(__dirname, 'preload.ui.js'),
			contextIsolation: true
		}
	})
	w.loadFile('./src/static/ui.html')
	//w.webContents.openDevTools()
	return w
}

app.whenReady().then(CreateWindow)
app.on('window-all-closed', function () {if (process.platform !== 'darwin') {app.quit()}})
app.on('activate', function () {if (BrowserWindow.getAllWindows().length === 0) {CreateWindow()}})

module.exports = app

let Kml = require('./Kml')
ipcMain.handle('OpenFeature', (event) => {
	return new Promise((resolve, reject) => {
		dialog.showOpenDialog({
			title: 'Select Feature File',
			filters: [{name: 'Feature', extensions: ['json', 'gpx', 'kml']}],
			properties: ['openFile', 'multiSelections']
		}).then(result => {
			if (result.canceled == false) {
				let files = []
				result.filePaths.forEach(file => {
					if (file.endsWith('json')) {
						files.push(JSON.parse(Fs.readFileSync(file, 'utf-8')))
					}
					if (file.endsWith('.kml')) {
						files.push(Kml(file))
					}
				})
				return resolve(files)
			} else {
				reject('Uknown')
			}
		})
	})
})

ipcMain.handle('OpenFile', (event, path) => {
	return new Promise((resolve, reject) => {
		Fs.readFile(path, 'utf-8', (err, data) => {
			if (err) {return reject(err)}
			resolve(data)
		})
	})
})


ipcMain.handle('Map', function (event, action, data) {
	app.windows.map.webContents.send(action, data)
})

