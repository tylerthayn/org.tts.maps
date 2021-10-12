const { contextBridge, ipcRenderer } = require('electron')

//contextBridge.exposeInMainWorld(
//  'electron', require('electron'),
//)

contextBridge.exposeInMainWorld(
	'App', {
		'Route': {
			'Open': function () {
				return ipcRenderer.invoke('OpenRoute')
			},
			'Save': function () {

			}
		},
		'Map': {
			'Route': {
				'Clear': (points) => {
					ipcRenderer.invoke('Map', 'Route.Clear')
				}
			},
			'Point': {
				'Add': (point) => {
					ipcRenderer.invoke('Map', 'Point.Add', point)
				},
				'Deleted': (id) => {
					ipcRenderer.invoke('Map', 'Point.Deleted', id)
				},
				'Selected': (id) => {
					ipcRenderer.invoke('Map', 'Point.Selected', id)
				},
				'Selecting': (id) => {
					ipcRenderer.invoke('Map', 'Point.Selecting', id)
				}
			},
			'Selection': {
				'Start': () => {
					ipcRenderer.invoke('Map', 'Selection.Start')
				},
				'Stop': () => {
					ipcRenderer.invoke('Map', 'Selection.Stop')
				}
			}
		}
	}
)
