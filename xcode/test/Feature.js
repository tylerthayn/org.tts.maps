
let Maps = require('../')

let renderer = new Maps.Renderer.Polyline('./', 1024, 1024, [
	'-fill transparent -stroke "#ff0000bb" -strokeWidth 30',
	'-fill transparent -stroke "#00ff00bb" -strokeWidth 20',
	'-fill transparent -stroke "#0000ffbb" -strokeWidth 10'
])

let feature = new Maps.Feature('D:/Maps/db/way/146467149.json')

let bounds = feature.geometry.Bounds
let points = bounds.Points(feature.geometry.coordinates.ToPoints)
log(points)
//bounds.Points(feature.geometry)

renderer.Render('1', points)
