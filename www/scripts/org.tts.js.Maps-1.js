(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['org.tts.js.lodash', 'turf'], factory)
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('org.tts.js.lodash'), require('@turf/turf'))
	} else {
		factory(_, turf)
	}
}(function (_, turf) {
	let configs={db:{folder:'D:/Maps/db',backup:true,resolution:{coordinate:6,point:0}},overpass:{mode:'live',host:{live:'api.openstreetmap.org',test:'master.apis.dev.openstreetmap.org'},version:'0.6'},server:{port:2100},tiles:{folder:'D:/Maps/db/tiles/',type:'satellite-v9',types:['satellite-v9','outdoors-v11'],zoom:{level:13,min:5,max:20},up:3,down:3,left:3,right:3},ImageViewer:{path:'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',args:['--profile-directory=Default','--allow-file-access-from-files']}}
	let TileSizes = [40075017, 20037508, 10018754, 5009377.1, 2504688.5, 1252344.3, 626172.1, 313086.1, 156543, 78271.5, 39135.8, 19567.9, 9783.94, 4891.97, 2445.98, 1222.99, 611.496, 305.748, 152.874, 76.437, 38.2185, 19.10926, 9.55463, 4.777315, 2.3886575]

	/* https://github.com/datalyze-solutions/globalmaptiles */
	let GlobalMercator = new ((function () {const pi_div_360=Math.PI/360;const pi_div_180=Math.PI/180;const pi_div_2=Math.PI/2;const pi_4=4*Math.PI;const pi_2=2*Math.PI;const pi=Math.PI;const _180_div_pi=180/Math.PI;class GlobalMercator{constructor(){this.tileSize=256;this.initialResolution=6378137*pi_2/this.tileSize;this.originShift=6378137*pi_2/2}LatLonToMeters(lat,lon){let mx=lon*this.originShift/180;let my=Math.log(Math.tan((90+lat)*pi_div_360))/pi_div_180;return{mx:mx,my:my=my*this.originShift/180}}MetersToLatLon(mx,my){let lon=mx/this.originShift*180;let lat=my/this.originShift*180;return{lat:lat=_180_div_pi*(2*Math.atan(Math.exp(lat*pi_div_180))-pi_div_2),lon:lon}}MetersToPixels(mx,my,zoom){var res=this.Resolution(zoom);return{px:(mx+this.originShift)/res,py:(my+this.originShift)/res}}Resolution(zoom){return this.initialResolution/Math.pow(2,zoom)}TileBounds(tx,ty,zoom){let minx,miny,maxx,maxy;return{minx:minx=this.PixelsToMeters(tx*this.tileSize,ty*this.tileSize,zoom).mx,miny:miny=this.PixelsToMeters(tx*this.tileSize,ty*this.tileSize,zoom).my,maxx:maxx=this.PixelsToMeters((tx+1)*this.tileSize,(ty+1)*this.tileSize,zoom).mx,maxy:maxy=this.PixelsToMeters((tx+1)*this.tileSize,(ty+1)*this.tileSize,zoom).my}}PixelsToMeters(px,py,zoom){var res;return{mx:px*(res=this.Resolution(zoom))-this.originShift,my:py*res-this.originShift}}PixelsToTile(px,py){return{tx:Math.round(Math.ceil(px/this.tileSize)-1),ty:Math.round(Math.ceil(py/this.tileSize)-1)}}PixelsToRaster(px,py,zoom){return{x:px,y:(this.tileSize<<zoom)-py}}LatLonToTile(lat,lon,zoom){var meters=this.LatLonToMeters(lat,lon);var pixels=this.MetersToPixels(meters.mx,meters.my,zoom);return this.PixelsToTile(pixels.px,pixels.py)}MetersToTile(mx,my,zoom){var pixels=this.MetersToPixels(mx,my,zoom);return this.PixelsToTile(pixels.px,pixels.py)}GoogleTile(tx,ty,zoom){return{tx:tx,ty:Math.pow(2,zoom)-1-ty}}QuadKey(tx,ty,zoom){let quadKey='';ty=2**zoom-1-ty;for(let i=zoom;i>0;i--){let digit=0;let mask=1<<i-1;0!=(tx&mask)&&(digit+=1);0!=(ty&mask)&&(digit+=2);quadKey+=digit.toString()}return quadKey}QuadKeyToTile(quadKey){let tx=0;let ty=0;let zoom=quadKey.length;for(let i=0;i<zoom;i++){let bit=zoom-i;let mask=1<<bit-1;'1'===quadKey[zoom-bit]&&(tx|=mask);'2'==quadKey[zoom-bit]&&(ty|=mask);if('3'==quadKey[zoom-bit]){tx|=mask;ty|=mask}}return{tx:tx,ty:ty=2**zoom-1-ty,zoom:zoom}}};return GlobalMercator})())()


	let Range=function(min,max){let range=[min,max];_.Define(range,'min',{get:()=>min},true);_.Define(range,'max',{get:()=>max},true);return range}
	let util={
		Round: (n,resolution) => {let x=Math.pow(10,resolution);return Math.round(n*x)/x}
	}

	let Coordinate={
		LonLat: (lon,lat,ele=0) => {let coordinate=[util.Round(lon,configs.db.resolution.coordinate),util.Round(lat,configs.db.resolution.coordinate),util.Round(ele,configs.db.resolution.coordinate)];_.Define(coordinate,'lon',{get:()=>coordinate[0]},true);_.Define(coordinate,'lat',{get:()=>coordinate[1]},true);_.Define(coordinate,'ele',{get:()=>coordinate[2]},true);_.Define(coordinate,'ToMeters',{get:()=>{let m=GlobalMercator.LatLonToMeters(coordinate.lat,coordinate.lon);return new Point.Meters(m.mx,m.my,coordinate.ele)}},true);return coordinate},
		LatLon: (lat,lon,ele=0) => {return Coordinate.LonLat(lon,lat,ele)}
	}

	let Point={
		Meters: (x,y,z=0) => {let point=[util.Round(x,configs.db.resolution.point),util.Round(y,configs.db.resolution.point),util.Round(z,configs.db.resolution.point)];_.Define(point,'x',{get:()=>point[0]},true);_.Define(point,'y',{get:()=>point[1]},true);_.Define(point,'z',{get:()=>point[2]},true);_.Define(point,'ToLatLon',{get:()=>{let ll=GlobalMercator.MetersToLatLon(point.x,point.y);return new Coordinate.LatLon(ll.lat,ll.lon,point.z)}},true);_.Define(point,'ToLonLat',{get:()=>{let ll=GlobalMercator.MetersToLatLon(point.x,point.y);return new Coordinate.LonLat(ll.lon,ll.lat,point.z)}},true);return point},
		XY: (x,y,z=0) => {let point=[util.Round(x,configs.db.resolution.point),util.Round(y,configs.db.resolution.point),util.Round(z,configs.db.resolution.point)];_.Define(point,'x',{get:()=>point[0]},true);_.Define(point,'y',{get:()=>point[1]},true);_.Define(point,'z',{get:()=>point[2]},true);return point}
	}

	let Bounds = {
		LonLat: (minlon, minlat, maxlon, maxlat) => {
			let bounds = [
				 util.Round(minlon, configs.db.resolution.coordinate),
				 util.Round(minlat, configs.db.resolution.coordinate),
				 util.Round(maxlon, configs.db.resolution.coordinate),
				 util.Round(maxlat, configs.db.resolution.coordinate)
			]

			_.Define(bounds, 'minlon', {get: () => {return bounds[0]}}, true)
			_.Define(bounds, 'minlat', {get: () => {return bounds[1]}}, true)
			_.Define(bounds, 'maxlon', {get: () => {return bounds[2]}}, true)
			_.Define(bounds, 'maxlat', {get: () => {return bounds[3]}}, true)

			_.Define(bounds, 'center', {get: () => {return Coordinate.LonLat(
				bounds.minlon + (bounds.maxlon - bounds.minlon)/2,
				bounds.minlat + (bounds.maxlat - bounds.minlat)/2
			)}}, true)

			_.Define(bounds, 'min', {get: () => {return Coordinate.LonLat(bounds.minlon, bounds.minlat)}}, true)
			_.Define(bounds, 'max', {get: () => {return Coordinate.LonLat(bounds.maxlon, bounds.maxlat)}}, true)

			_.Define(bounds, 'lon', {get: () => {return new Range(bounds.minlon, bounds.maxlon)}}, true)
			_.Define(bounds, 'lat', {get: () => {return new Range(bounds.minlat, bounds.maxlat)}}, true)

			_.Define(bounds, 'Point', (point) => {
				return [
					(point.lon - bounds.minlon) / (bounds.maxlon - bounds.minlon),
					(point.lat - bounds.minlat) / (bounds.maxlat - bounds.minlat)
				]
			})
			_.Define(bounds, 'Points', (points) => {
				let _points = []
				points.forEach(point => {
					_points.push(bounds.Point(point))
				})
				return _points
			})

			return bounds
		},
		XY: (minx, miny, maxx, maxy) => {
			let bounds = [
				util.Round(minx, configs.db.resolution.point),
				util.Round(miny, configs.db.resolution.point),
				util.Round(maxx, configs.db.resolution.point),
				util.Round(maxy, configs.db.resolution.point)
			]

			_.Define(bounds, 'minx', {get: () => {return bounds[0]}}, true)
			_.Define(bounds, 'miny', {get: () => {return bounds[1]}}, true)
			_.Define(bounds, 'maxx', {get: () => {return bounds[2]}}, true)
			_.Define(bounds, 'maxy', {get: () => {return bounds[3]}}, true)

			_.Define(bounds, 'center', {get: () => {return new Point.XY(
				bounds.minx + (bounds.maxx - bounds.minx) / 2,
				bounds.miny + (bounds.maxy - bounds.miny) / 2
			)}}, true)

			_.Define(bounds, 'min', {get: () => {return new Point.XY(bounds.minx, bounds.miny)}}, true)
			_.Define(bounds, 'max', {get: () => {return new Point.XY(bounds.maxx, bounds.maxy)}}, true)

			_.Define(bounds, 'x', {get: () => {return new Range(bounds.minx, bounds.maxx)}}, true)
			_.Define(bounds, 'y', {get: () => {return new Range(bounds.miny, bounds.maxy)}}, true)

			return bounds
		}
	}

	function Tile () {
		let tile = null
		if (arguments.length == 1) {
			tile = GlobalMercator.QuadKeyToTile(arguments[0])
		}
		if (arguments.length == 2) {
			tile = GlobalMercator.LatLonToTile(arguments[0].lat, arguments[0].lon, arguments[1])
			tile.zoom = arguments[1]
		}

		this.x = tile.tx
		this.y = tile.ty
		this.zoom = tile.zoom
		this.key = GlobalMercator.QuadKey(this.x, this.y, this.zoom)

		let bounds = GlobalMercator.TileBounds(this.x, this.y, this.zoom)
		let min = GlobalMercator.MetersToLatLon(bounds.minx, bounds.miny)
		let max = GlobalMercator.MetersToLatLon(bounds.maxx, bounds.maxy)
		this.bounds = Bounds.LonLat(min.lon, min.lat, max.lon, max.lat)

		return this
	}

	return {
		Bounds: Bounds,
		Coordinate: Coordinate,
		GlobalMercator: GlobalMercator,
		Point: Point,
		Range: Range,
		Tile: Tile,
		TileSizes: TileSizes
	}

}))

//exports.Coordinate = require('./Coordinate')

//exports.Range = require('./Range')
//exports.Bounds = require('./Bounds')
//exports.Tile = require('./Tile')

//exports.Geometry = require('./Geometry')
//exports.properties = require('./Properties')
//exports.Tags = require('./Tags')
//exports.Style = require('./Style')

//exports.Feature = require('./Feature')
//exports.FeatureCollection = require('./FeatureCollection')

//exports.GlobalMercator = require('./GlobalMercator')

//exports.Renderer = require('./Renderer')
