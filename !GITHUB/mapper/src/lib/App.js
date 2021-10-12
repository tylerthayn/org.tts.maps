let _ = require('lodash-tts')
const {BrowserWindow, dialog, ipcMain, screen, session} = require('electron')
const Fs = require('fs')
const Path = require('path')

let app = require('electron').app
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

app.whenReady().then(CreateWindows)
app.on('window-all-closed', function () {if (process.platform !== 'darwin') {app.quit()}})
app.on('activate', function () {if (BrowserWindow.getAllWindows().length === 0) {CreateWindows()}})

module.exports = app

ipcMain.handle('OpenRoute', (event) => {
	return new Promise((resolve, reject) => {
		dialog.showOpenDialog({
			title: 'Select Route File',
			filters: [{name: 'Route', extensions: ['gpx', 'kml']}],
			properties: ['openFile']
		}).then(result => {
			if (result.canceled == false) {
				Fs.readFile(result.filePaths[0], 'utf-8', (err, data) => {
					if (err) {
						return reject(err)
					}
					return resolve(data)
				})
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

