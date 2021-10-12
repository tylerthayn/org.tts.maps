!function(t){'function'==typeof define&&define.amd?define('Maps/GlobalMercator',t):'object'==typeof module&&module.exports?module.exports=t():t()}(function(){const t=Math.PI/360,i=Math.PI/180,e=Math.PI/2,s=(Math.PI,2*Math.PI),o=(Math.PI,180/Math.PI);return new class{constructor(){this.tileSize=256,this.initialResolution=6378137*s/this.tileSize,this.originShift=6378137*s/2}LatLonToMeters(e,s){let o=s*this.originShift/180,r=Math.log(Math.tan((90+e)*t))/i;return{mx:o,my:r=r*this.originShift/180}}MetersToLatLon(t,s){let r=t/this.originShift*180,h=s/this.originShift*180;return{lat:h=o*(2*Math.atan(Math.exp(h*i))-e),lon:r}}MetersToPixels(t,i,e){var s=this.Resolution(e);return{px:(t+this.originShift)/s,py:(i+this.originShift)/s}}Resolution(t){return this.initialResolution/Math.pow(2,t)}TileBounds(t,i,e){let s,o,r,h;return{minx:s=this.PixelsToMeters(t*this.tileSize,i*this.tileSize,e).mx,miny:o=this.PixelsToMeters(t*this.tileSize,i*this.tileSize,e).my,maxx:r=this.PixelsToMeters((t+1)*this.tileSize,(i+1)*this.tileSize,e).mx,maxy:h=this.PixelsToMeters((t+1)*this.tileSize,(i+1)*this.tileSize,e).my}}PixelsToMeters(t,i,e){var s;return{mx:t*(s=this.Resolution(e))-this.originShift,my:i*s-this.originShift}}PixelsToTile(t,i){return{tx:Math.round(Math.ceil(t/this.tileSize)-1),ty:Math.round(Math.ceil(i/this.tileSize)-1)}}PixelsToRaster(t,i,e){return{x:t,y:(this.tileSize<<e)-i}}LatLonToTile(t,i,e){var s=this.LatLonToMeters(t,i),o=this.MetersToPixels(s.mx,s.my,e);return this.PixelsToTile(o.px,o.py)}MetersToTile(t,i,e){var s=this.MetersToPixels(t,i,e);return this.PixelsToTile(s.px,s.py)}GoogleTile(t,i,e){return{tx:t,ty:Math.pow(2,e)-1-i}}QuadKey(t,i,e){let s='';i=2**e-1-i;for(let o=e;o>0;o--){let e=0,r=1<<o-1;0!=(t&r)&&(e+=1),0!=(i&r)&&(e+=2),s+=e.toString()}return s}QuadKeyToTile(t){let i=0,e=0,s=t.length;for(let o=0;o<s;o++){let r=s-o,h=1<<r-1;'1'===t[s-r]&&(i|=h),'2'==t[s-r]&&(e|=h),'3'==t[s-r]&&(i|=h,e|=h)}return{tx:i,ty:e=2**s-1-e,zoom:s}}}});
!function(e){'function'==typeof define&&define.amd?define('Maps/Range',['org.tts.js.lodash'],e):'object'==typeof module&&module.exports?module.exports=e(require('org.tts.js.lodash')):e(_)}(function(e){return function(t,n){let o=[t<n?t:n,t<n?n:t];return e.Define(o,'min',{get:()=>o[0]},!0),e.Define(o,'max',{get:()=>o[1]},!0),o}});
!function(e){'function'==typeof define&&define.amd?define('Maps/Point/XY',['org.tts.js.lodash'],e):'object'==typeof module&&module.exports?module.exports=e(require('org.tts.js.lodash')):e(_)}(function(e){return function(t,n,o=0){let f=[t,n,o];return e.Define(f,'x',{get:()=>f[0]},!0),e.Define(f,'y',{get:()=>f[1]},!0),e.Define(f,'z',{get:()=>f[2]},!0),f}});
!function(e){'function'==typeof define&&define.amd?define('Maps/Point/Pixel',['org.tts.js.lodash'],e):'object'==typeof module&&module.exports?module.exports=e(require('org.tts.js.lodash')):e(_)}(function(e){return function(t,n,o=0){let i=[t,n,o];return e.Define(i,'x',{get:()=>i[0]},!0),e.Define(i,'y',{get:()=>i[1]},!0),e.Define(i,'z',{get:()=>i[2]},!0),i}});
!function(e){'function'==typeof define&&define.amd?define('Maps/Point',['org.tts.js.lodash','Maps/Point/XY','Maps/Point/Pixel'],e):'object'==typeof module&&module.exports?module.exports=e(require('org.tts.js.lodash')):e(_)}(function(e,o,t){return e.Define(o,'XY',o,!0),e.Define(o,'Pixel',t,!0),o});
!function(e){'function'==typeof define&&define.amd?define('Maps/Coordinate/XY',['org.tts.js.lodash'],e):'object'==typeof module&&module.exports?module.exports=e(require('org.tts.js.lodash')):e(_)}(function(e){return function(t,o,n=0){let f=[t,o,n];return e.Define(f,'x',{get:()=>f[0]},!0),e.Define(f,'y',{get:()=>f[1]},!0),e.Define(f,'z',{get:()=>f[2]},!0),f}});
!function(e){'function'==typeof define&&define.amd?define('Maps/Coordinate/LonLat',['org.tts.js.lodash'],e):'object'==typeof module&&module.exports?module.exports=e(require('org.tts.js.lodash')):e(_)}(function(e){return function(t,o,n=0){let f=[t,o,n];return e.Define(f,'lon',{get:()=>f[0]},!0),e.Define(f,'lat',{get:()=>f[1]},!0),e.Define(f,'ele',{get:()=>f[2]},!0),f}});
!function(e){'function'==typeof define&&define.amd?define('Maps/Coordinate/LatLon',['org.tts.js.lodash'],e):'object'==typeof module&&module.exports?module.exports=e(require('org.tts.js.lodash')):e(_)}(function(e){return function(t,o,n=0){let f=[o,t,n];return e.Define(f,'lon',{get:()=>f[0]},!0),e.Define(f,'lat',{get:()=>f[1]},!0),e.Define(f,'ele',{get:()=>f[2]},!0),f}});
!function(e){'function'==typeof define&&define.amd?define('Maps/Coordinate',['org.tts.js.lodash','Maps/Coordinate/XY','Maps/Coordinate/LonLat','Maps/Coordinate/LatLon'],e):'object'==typeof module&&module.exports?module.exports=e(require('org.tts.js.lodash')):e(_)}(function(e,o,n,t){return e.Define(n,'LonLat',n,!0),e.Define(n,'LatLon',t,!0),e.Define(n,'XY',o,!0),n});
!function(e){'function'==typeof define&&define.amd?define('Maps/Bounds/XY',['org.tts.js.lodash','Maps/Coordinate/XY','Maps/Range'],e):'object'==typeof module&&module.exports?module.exports=e(require('org.tts.js.lodash'),require('./Coordinate/XY'),require('./Range')):e(_)}(function(e,n,i){return function(t,m,o,x){let a=[t<o?t:o,m<x?m:x,o>t?o:t,x>m?x:m];return e.Define(a,'minx',{get:()=>a[0]},!0),e.Define(a,'miny',{get:()=>a[1]},!0),e.Define(a,'maxx',{get:()=>a[2]},!0),e.Define(a,'maxy',{get:()=>a[3]},!0),e.Define(a,'center',{get:()=>new n(a.minx+(a.maxx-a.minx)/2,a.miny+(a.maxy-a.miny)/2)},!0),e.Define(a,'min',{get:()=>new n(a.minx,a.miny)},!0),e.Define(a,'max',{get:()=>new n(a.maxx,a.maxy)},!0),e.Define(a,'x',{get:()=>new i(a.minx,a.maxx)},!0),e.Define(a,'y',{get:()=>new i(a.miny,a.maxy)},!0),a}});
!function(n){'function'==typeof define&&define.amd?define('Maps/Bounds/LonLat',['org.tts.js.lodash','Maps/Coordinate/LonLat','Maps/Range'],n):'object'==typeof module&&module.exports?module.exports=n(require('org.tts.js.lodash'),require('./Coordinate/LonLat'),require('./Range')):n(_)}(function(n,e,t){return function(o,i,a,l){let m=[o<a?o:a,i<l?i:l,a>o?a:o,l>i?l:i];return n.Define(m,'minlon',{get:()=>m[0]},!0),n.Define(m,'minlat',{get:()=>m[1]},!0),n.Define(m,'maxlon',{get:()=>m[2]},!0),n.Define(m,'maxlat',{get:()=>m[3]},!0),n.Define(m,'center',{get:()=>new e(m.minlon+(m.maxlon-m.minlon)/2,m.minlat+(m.maxlat-m.minlat)/2)},!0),n.Define(m,'min',{get:()=>new e(m.minlon,m.minlat)},!0),n.Define(m,'max',{get:()=>new e(m.maxlon,m.maxlat)},!0),n.Define(m,'lon',{get:()=>new t(m.minlon,m.maxlon)},!0),n.Define(m,'lat',{get:()=>new t(m.minlat,m.maxlat)},!0),n.Define(m,'Point',n=>[(n.lon-m.minlon)/(m.maxlon-m.minlon),(n.lat-m.minlat)/(m.maxlat-m.minlat)]),n.Define(m,'Points',n=>{let e=[];return n.forEach(n=>{e.push(m.Point(n))}),e}),m}});
!function(o){'function'==typeof define&&define.amd?define('Maps/Bounds',['org.tts.js.lodash','Maps/Bounds/XY','Maps/Bounds/LonLat'],o):'object'==typeof module&&module.exports?module.exports=o(require('org.tts.js.lodash'),require('./Bounds/XY'),require('./Bounds/LonLat')):o(_)}(function(o,e,n){return{LonLat:n,XY:e}});
!function(t){'function'==typeof define&&define.amd?define(['org.tts.js.lodash','Maps/GlobalMercator','Maps/Bounds'],t):'object'==typeof module&&module.exports?module.exports=t(require('org.tts.js.lodash'),require('./GlobalMercator'),require('./Bounds')):t(_,GlobalMercator)}(function(t,o,e){function n(){let t=null;1==arguments.length&&(t=o.QuadKeyToTile(arguments[0])),2==arguments.length&&((t=o.LatLonToTile(arguments[0].lat,arguments[0].lon,arguments[1])).zoom=arguments[1]),this.x=t.tx,this.y=t.ty,this.zoom=t.zoom,this.key=o.QuadKey(this.x,this.y,this.zoom);let n=o.TileBounds(this.x,this.y,this.zoom),l=o.MetersToLatLon(n.minx,n.miny),i=o.MetersToLatLon(n.maxx,n.maxy);return this.bounds=e.LonLat(l.lon,l.lat,i.lon,i.lat),this}return t.Define(n,'TileFromBounds',(e,n=20,l=0)=>{let i=[[e[0],e[1]],[e[0],e[3]],[e[2],e[3]],[e[2],e[1]]],s=null,r=n;for(;r>=l&&null==s;){let e=t.uniq(i.map(t=>{let e=o.LatLonToTile(t[1],t[0],r);return o.QuadKey(e.tx,e.ty,r)}));1==e.length?s=e[0]:r--}return s}),n});
!function(e){'function'==typeof define&&define.amd?define(['org.tts.js.lodash','Maps/GlobalMercator','Maps/Range','Maps/Point','Maps/Coordinate','Maps/Bounds','Maps/Tile'],e):'object'==typeof module&&module.exports?module.exports=e(require('org.tts.js.lodash'),require('./GlobalMercator'),require('./Range'),require('./Point'),require('./Coordinate'),require('./Bounds'),require('./Tile')):e(_,Range,Point,Coordinate,Tile)}(function(e,o,r,i,n,t,a){return{Bounds:t,Coordinate:n,GLobalMercator:o,Point:i,Range:r,Tile:a}});
