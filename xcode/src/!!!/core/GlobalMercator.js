(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define('Maps/GlobalMercator', factory)
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory()
	} else {
		factory()
	}
}(function () {

	/* https://github.com/datalyze-solutions/globalmaptiles */
	//return new ((function () {const pi_div_360=Math.PI/360;const pi_div_180=Math.PI/180;const pi_div_2=Math.PI/2;const pi_4=4*Math.PI;const pi_2=2*Math.PI;const pi=Math.PI;const _180_div_pi=180/Math.PI;class GlobalMercator{constructor(){this.tileSize=256;this.initialResolution=6378137*pi_2/this.tileSize;this.originShift=6378137*pi_2/2}LatLonToMeters(lat,lon){let mx=lon*this.originShift/180;let my=Math.log(Math.tan((90+lat)*pi_div_360))/pi_div_180;return{mx:mx,my:my=my*this.originShift/180}}MetersToLatLon(mx,my){let lon=mx/this.originShift*180;let lat=my/this.originShift*180;return{lat:lat=_180_div_pi*(2*Math.atan(Math.exp(lat*pi_div_180))-pi_div_2),lon:lon}}MetersToPixels(mx,my,zoom){var res=this.Resolution(zoom);return{px:(mx+this.originShift)/res,py:(my+this.originShift)/res}}Resolution(zoom){return this.initialResolution/Math.pow(2,zoom)}TileBounds(tx,ty,zoom){let minx,miny,maxx,maxy;return{minx:minx=this.PixelsToMeters(tx*this.tileSize,ty*this.tileSize,zoom).mx,miny:miny=this.PixelsToMeters(tx*this.tileSize,ty*this.tileSize,zoom).my,maxx:maxx=this.PixelsToMeters((tx+1)*this.tileSize,(ty+1)*this.tileSize,zoom).mx,maxy:maxy=this.PixelsToMeters((tx+1)*this.tileSize,(ty+1)*this.tileSize,zoom).my}}PixelsToMeters(px,py,zoom){var res;return{mx:px*(res=this.Resolution(zoom))-this.originShift,my:py*res-this.originShift}}PixelsToTile(px,py){return{tx:Math.round(Math.ceil(px/this.tileSize)-1),ty:Math.round(Math.ceil(py/this.tileSize)-1)}}PixelsToRaster(px,py,zoom){return{x:px,y:(this.tileSize<<zoom)-py}}LatLonToTile(lat,lon,zoom){var meters=this.LatLonToMeters(lat,lon);var pixels=this.MetersToPixels(meters.mx,meters.my,zoom);return this.PixelsToTile(pixels.px,pixels.py)}MetersToTile(mx,my,zoom){var pixels=this.MetersToPixels(mx,my,zoom);return this.PixelsToTile(pixels.px,pixels.py)}GoogleTile(tx,ty,zoom){return{tx:tx,ty:Math.pow(2,zoom)-1-ty}}QuadKey(tx,ty,zoom){let quadKey='';ty=2**zoom-1-ty;for(let i=zoom;i>0;i--){let digit=0;let mask=1<<i-1;0!=(tx&mask)&&(digit+=1);0!=(ty&mask)&&(digit+=2);quadKey+=digit.toString()}return quadKey}QuadKeyToTile(quadKey){let tx=0;let ty=0;let zoom=quadKey.length;for(let i=0;i<zoom;i++){let bit=zoom-i;let mask=1<<bit-1;'1'===quadKey[zoom-bit]&&(tx|=mask);'2'==quadKey[zoom-bit]&&(ty|=mask);if('3'==quadKey[zoom-bit]){tx|=mask;ty|=mask}}return{tx:tx,ty:ty=2**zoom-1-ty,zoom:zoom}}};return GlobalMercator})())()
	const pi_div_360 = Math.PI / 360.0;
	const pi_div_180 = Math.PI / 180.0;
	const pi_div_2 = Math.PI / 2.0;
	const pi_4 = Math.PI * 4;
	const pi_2 = Math.PI * 2;
	const pi = Math.PI;
	const _180_div_pi = 180 / Math.PI;

	class GlobalMercator {
		constructor() {
			this.tileSize = 256;
			this.initialResolution = pi_2 * 6378137 / this.tileSize;
			this.originShift = pi_2 * 6378137 / 2.0;
		}

		LatLonToMeters(lat, lon) {
			// Converts given lat/lon in WGS84 Datum to XY in Spherical Mercator EPSG:900913
			let mx = lon * this.originShift / 180.0;
			let my = Math.log(Math.tan((90 + lat) * pi_div_360)) / pi_div_180;

			my = my * this.originShift / 180.0;
			return { mx: mx, my: my };
		}

		MetersToLatLon(mx, my) {
			// Converts XY point from Spherical Mercator EPSG:900913 to lat/lon in WGS84 Datum
			let lon = mx / this.originShift * 180.0;
			let lat = my / this.originShift * 180.0;
			lat =
				_180_div_pi *
				(2 * Math.atan(Math.exp(lat * pi_div_180)) - pi_div_2);
			return { lat: lat, lon: lon };
		}

		MetersToPixels(mx, my, zoom) {
			// Converts EPSG:900913 to pyramid pixel coordinates in given zoom level
			var res = this.Resolution(zoom);
			var px = (mx + this.originShift) / res;
			var py = (my + this.originShift) / res;
			return { px: px, py: py };
		}

		Resolution(zoom) {
			// Resolution (meters/pixel) for given zoom level (measured at Equator)
			return this.initialResolution / Math.pow(2, zoom);
		}

		TileBounds(tx, ty, zoom) {
			// Returns bounds of the given tile in EPSG:900913 coordinates
			let minx, miny, maxx, maxy;
			minx = this.PixelsToMeters(
				tx * this.tileSize,
				ty * this.tileSize,
				zoom
			)["mx"];
			miny = this.PixelsToMeters(
				tx * this.tileSize,
				ty * this.tileSize,
				zoom
			)["my"];
			maxx = this.PixelsToMeters(
				(tx + 1) * this.tileSize,
				(ty + 1) * this.tileSize,
				zoom
			)["mx"];
			maxy = this.PixelsToMeters(
				(tx + 1) * this.tileSize,
				(ty + 1) * this.tileSize,
				zoom
			)["my"];
			return { minx: minx, miny: miny, maxx: maxx, maxy: maxy };
		}

		PixelsToMeters(px, py, zoom) {
			// Converts pixel coordinates in given zoom level of pyramid to EPSG:900913
			var res, mx, my;
			res = this.Resolution(zoom);
			mx = px * res - this.originShift;
			my = py * res - this.originShift;
			return { mx: mx, my: my };
		}

		PixelsToTile(px, py) {
			// Returns a tile covering region in given pixel coordinates
			var tx, ty;
			tx = Math.round(Math.ceil(px / this.tileSize) - 1);
			ty = Math.round(Math.ceil(py / this.tileSize) - 1);
			return { tx: tx, ty: ty };
		}

		PixelsToRaster(px, py, zoom) {
			// Move the origin of pixel coordinates to top-left corner
			var mapSize;
			mapSize = this.tileSize << zoom;
			return { x: px, y: mapSize - py };
		}

		LatLonToTile(lat, lon, zoom) {
			var meters = this.LatLonToMeters(lat, lon);
			var pixels = this.MetersToPixels(meters.mx, meters.my, zoom);
			return this.PixelsToTile(pixels.px, pixels.py);
		}

		MetersToTile(mx, my, zoom) {
			var pixels = this.MetersToPixels(mx, my, zoom);
			return this.PixelsToTile(pixels.px, pixels.py);
		}

		GoogleTile(tx, ty, zoom) {
			// Converts TMS tile coordinates to Google Tile coordinates
			// coordinate origin is moved from bottom-left to top-left corner of the extent
			return { tx: tx, ty: Math.pow(2, zoom) - 1 - ty };
		}

		QuadKey(tx, ty, zoom) {
			// Converts TMS tile coordinates to Microsoft QuadTree
			let quadKey = "";
			ty = 2 ** zoom - 1 - ty;
			for (let i = zoom; i > 0; i--) {
				let digit = 0;
				let mask = 1 << (i - 1);
				if ((tx & mask) != 0) {
					digit += 1;
				}
				if ((ty & mask) != 0) {
					digit += 2;
				}
				quadKey += digit.toString();
			}
			return quadKey;
		}

		QuadKeyToTile(quadKey) {
			// Transform quadkey to tile coordinates
			let tx = 0;
			let ty = 0;
			let zoom = quadKey.length;
			for (let i = 0; i < zoom; i++) {
				let bit = zoom - i;
				let mask = 1 << (bit - 1);
				if (quadKey[zoom - bit] === "1") {
					tx |= mask;
				}
				if (quadKey[zoom - bit] == "2") {
					ty |= mask;
				}
				if (quadKey[zoom - bit] == "3") {
					tx |= mask;
					ty |= mask;
				}
			}
			ty = 2 ** zoom - 1 - ty;
			return { tx: tx, ty: ty, zoom: zoom };
		}
	}

	module.exports = new GlobalMercator();

}))
