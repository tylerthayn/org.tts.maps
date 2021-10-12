let _ = require('org.tts.js.lodash')
let Deasync = require('deasync')
let Fs = require('fs'), Path = require('path')
let Parser = Deasync(require('xml2js').parseString);
let Builder = require('xml2js').Builder;
let emptyKml = Parser('<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom"><Document><name></name></Document></kml>');


let file = 'C:\\Users\\TTS Design\\Desktop\\Buffalo Hunt\\GPX\\GPX Tracks.kml'


let kml = Parser(Fs.readFileSync(Path.resolve(file), 'utf-8'))

let _coordinates = []
kml.kml.Document[0].Folder[0].Placemark.forEach(placemark => {
	_coordinates.push(ExtractCoordinates(placemark))
})
log(GenerateKml(_coordinates))


function ExtractCoordinates (placemark) {
	let coordinates = []
	placemark['gx:Track'].forEach(track => {
		track['gx:coord'].forEach(coordinate => {
			coordinates.push(coordinate.split(' ').map(c=>{return parseFloat(c)}))
		})
	})
	return coordinates
}


function GenerateKml (coordinates) {
	let kml = '<?xml version="1.0" encoding="UTF-8"?>\n<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">\n<Document>\n'
	kml += `<Style id="Road_Hike_"><LineStyle><color>bbff00ff</color><width>3</width></LineStyle></Style><Style id="road_hl"><IconStyle><scale>1.2</scale></IconStyle><LineStyle><color>ff0000ff</color><width>5</width></LineStyle></Style><StyleMap id="Road_Hike"><Pair><key>normal</key><styleUrl>#Road_Hike_</styleUrl></Pair><Pair><key>highlight</key><styleUrl>#road_hl</styleUrl></Pair></StyleMap>`
	coordinates.forEach(c => {
		kml += '\t\t<Placemark>\n'
		kml += '\t\t<styleUrl>#Road_Hike</styleUrl>\n'
		kml += '\t\t\t<LineString>\n\t\t\t\t<coordinates>\n\t\t\t\t\t'
		kml += c.map(p => {return p[0].toString() + ',' + p[1].toString() + ',' + p[2].toString()}).join(' ')
		kml += '\n\t\t\t\t</coordinates>\n\t\t\t</LineString>\n\t\t</Placemark>\n'
	})
	kml += '</Document>\n</kml>'
	return kml
}
