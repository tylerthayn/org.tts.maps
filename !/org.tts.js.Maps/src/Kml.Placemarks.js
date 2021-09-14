let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')
let Deasync = require('deasync')
let Parser = Deasync(require('xml2js').parseString)
let Builder = require('xml2js').Builder

module.exports = function () {
	function _Placemark (placemark) {

		Object.defineProperty(placemark, 'Tags', {value: {}})
		_.get(placemark, 'ExtendedData[0].Data', []).forEach(data => {
			placemark.Tags[data.$.name] = data.value[0]
		})
		_.Define(placemark, 'IsRoad', {get: function () {
			return Reflect.has(this.Tags, 'highway')
		}})
		_.Define(placemark, 'IsWater', {get: function () {
			throw Error('IsWater()')
			return Reflect.has(this.Tags, 'highway')
		}})

		_.Define(placemark, 'ToFeature', function () {
			throw Error('ToFeature')
			return {}
		})

		_.Define(placemark, 'toGeoJSON', function () {
			let geoObject = {
				type: 'Feature',
				id: this.Tags.id
			}
/*
    "type": "Feature",
    "id": "way/$ID$",
    "properties": {
        "type": "way",
        "id": $ID$,
        "tags": {
            "highway": "track",
            "source": "TTT",
            "surface": "dirt",
            "tracktype": "grade5"
        },
        "relations": [],
        "meta": {}
    },
    "geometry": {
        "type": "LineString",
        "coordinates": [
            [
*/
			return geoObject
		})

		Object.defineProperty(placemark, 'Coordinates', {value: function () {return this.LineString[0].coordinates[0].trim().split(' ').map(c => {
			return [parseFloat(c.split(',')[0]), parseFloat(c.split(',')[1])]
		})}})


	}

	function _Placemarks (placemarks) {
		placemarks.forEach(_Placemark)
	}

	function _Folders (folders) {
		folders.forEach(folder => {
			_Folders(_.get(folder, 'Folder', []))
			_Placemarks(_.get(folder, 'Placemark', []))
		})
	}

	_Placemarks(_.get(this, 'kml.Document[0].Placemark', []))
	_Folders(_.get(this, 'kml.Document[0].Folder', []))

/*
	.forEach(placemark => {
		Object.defineProperty(placemark, 'Tags', {enumerable: false, value: {}})
		_.get(placemark, 'ExtendedData[0].Data').forEach(data => {
			placemark.Tags[data.$.name] = data.value[0]
		})

		_.Define(placemark, 'IsRoad', {get: function () {
			return Reflect.has(this.Tags, 'highway')
		}})
		_.Define(placemark, 'IsWater', {get: function () {
			throw Error('IsWater()')
			return Reflect.has(this.Tags, 'highway')
		}})

		_.Define(placemark, 'ToFeature', function () {
			throw Error('ToFeature')
			return {}
		})

	})
*/
}
