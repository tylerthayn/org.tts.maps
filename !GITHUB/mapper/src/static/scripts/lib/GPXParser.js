let gpxParser=function(){this.xmlSource="",this.metadata={},this.waypoints=[],this.tracks=[],this.routes=[]};gpxParser.prototype.parse=function(e){let t=this,l=new window.DOMParser;this.xmlSource=l.parseFromString(e,"text/xml");let r=this.xmlSource.querySelector("metadata");if(null!=r){this.metadata.name=this.getElementValue(r,"name"),this.metadata.desc=this.getElementValue(r,"desc"),this.metadata.time=this.getElementValue(r,"time");let e={},t=r.querySelector("author");if(null!=t){e.name=this.getElementValue(t,"name"),e.email={};let l=t.querySelector("email");null!=l&&(e.email.id=l.getAttribute("id"),e.email.domain=l.getAttribute("domain"));let r={},a=t.querySelector("link");null!=a&&(r.href=a.getAttribute("href"),r.text=this.getElementValue(a,"text"),r.type=this.getElementValue(a,"type")),e.link=r}this.metadata.author=e;let l={},a=this.queryDirectSelector(r,"link");null!=a&&(l.href=a.getAttribute("href"),l.text=this.getElementValue(a,"text"),l.type=this.getElementValue(a,"type"),this.metadata.link=l)}var a=[].slice.call(this.xmlSource.querySelectorAll("wpt"));for(let e in a){var n=a[e];let l={};l.name=t.getElementValue(n,"name"),l.sym=t.getElementValue(n,"sym"),l.lat=parseFloat(n.getAttribute("lat")),l.lon=parseFloat(n.getAttribute("lon"));let r=parseFloat(t.getElementValue(n,"ele"));l.ele=isNaN(r)?null:r,l.cmt=t.getElementValue(n,"cmt"),l.desc=t.getElementValue(n,"desc");let i=t.getElementValue(n,"time");l.time=null==i?null:new Date(i),t.waypoints.push(l)}var i=[].slice.call(this.xmlSource.querySelectorAll("rte"));for(let e in i){let l=i[e],r={};r.name=t.getElementValue(l,"name"),r.cmt=t.getElementValue(l,"cmt"),r.desc=t.getElementValue(l,"desc"),r.src=t.getElementValue(l,"src"),r.number=t.getElementValue(l,"number");let a=t.queryDirectSelector(l,"type");r.type=null!=a?a.innerHTML:null;let n={},o=l.querySelector("link");null!=o&&(n.href=o.getAttribute("href"),n.text=t.getElementValue(o,"text"),n.type=t.getElementValue(o,"type")),r.link=n;let u=[];var s=[].slice.call(l.querySelectorAll("rtept"));for(let e in s){let l=s[e],r={};r.lat=parseFloat(l.getAttribute("lat")),r.lon=parseFloat(l.getAttribute("lon"));let a=parseFloat(t.getElementValue(l,"ele"));r.ele=isNaN(a)?null:a;let n=t.getElementValue(l,"time");r.time=null==n?null:new Date(n),u.push(r)}r.distance=t.calculDistance(u),r.elevation=t.calcElevation(u),r.slopes=t.calculSlope(u,r.distance.cumul),r.points=u,t.routes.push(r)}var o=[].slice.call(this.xmlSource.querySelectorAll("trk"));for(let e in o){let l=o[e],r={};r.name=t.getElementValue(l,"name"),r.cmt=t.getElementValue(l,"cmt"),r.desc=t.getElementValue(l,"desc"),r.src=t.getElementValue(l,"src"),r.number=t.getElementValue(l,"number");let a=t.queryDirectSelector(l,"type");r.type=null!=a?a.innerHTML:null;let n={},i=l.querySelector("link");null!=i&&(n.href=i.getAttribute("href"),n.text=t.getElementValue(i,"text"),n.type=t.getElementValue(i,"type")),r.link=n;let s=[],p=[].slice.call(l.querySelectorAll("trkpt"));for(let e in p){var u=p[e];let l={};l.lat=parseFloat(u.getAttribute("lat")),l.lon=parseFloat(u.getAttribute("lon"));let r=parseFloat(t.getElementValue(u,"ele"));l.ele=isNaN(r)?null:r;let a=t.getElementValue(u,"time");l.time=null==a?null:new Date(a),s.push(l)}r.distance=t.calculDistance(s),r.elevation=t.calcElevation(s),r.slopes=t.calculSlope(s,r.distance.cumul),r.points=s,t.tracks.push(r)}},gpxParser.prototype.getElementValue=function(e,t){let l=e.querySelector(t);return null!=l?null!=l.innerHTML?l.innerHTML:l.childNodes[0].data:l},gpxParser.prototype.queryDirectSelector=function(e,t){let l=e.querySelectorAll(t),r=l[0];if(l.length>1){let l=e.childNodes;for(idx in l)elem=l[idx],elem.tagName===t&&(r=elem)}return r},gpxParser.prototype.calculDistance=function(e){let t={},l=0,r=[];for(var a=0;a<e.length-1;a++)l+=this.calcDistanceBetween(e[a],e[a+1]),r[a]=l;return r[e.length-1]=l,t.total=l,t.cumul=r,t},gpxParser.prototype.calcDistanceBetween=function(e,t){let l={};l.lat=e.lat,l.lon=e.lon;let r={};r.lat=t.lat,r.lon=t.lon;var a=Math.PI/180,n=l.lat*a,i=r.lat*a,s=Math.sin((r.lat-l.lat)*a/2),o=Math.sin((r.lon-l.lon)*a/2),u=s*s+Math.cos(n)*Math.cos(i)*o*o;return 6371e3*(2*Math.atan2(Math.sqrt(u),Math.sqrt(1-u)))},gpxParser.prototype.calcElevation=function(e){for(var t=0,l=0,r={},a=0;a<e.length-1;a++){let r=e[a+1].ele,n=e[a].ele;if(null!==r&&null!==n){let e=parseFloat(r)-parseFloat(n);e<0?l+=e:e>0&&(t+=e)}}for(var n=[],i=0,s=(a=0,e.length);a<s;a++){if(null!==e[a].ele){var o=parseFloat(e[a].ele);n.push(o),i+=o}}return r.max=Math.max.apply(null,n)||null,r.min=Math.min.apply(null,n)||null,r.pos=Math.abs(t)||null,r.neg=Math.abs(l)||null,r.avg=i/n.length||null,r},gpxParser.prototype.calculSlope=function(e,t){let l=[];for(var r=0;r<e.length-1;r++){let a=e[r],n=100*(e[r+1].ele-a.ele)/(t[r+1]-t[r]);l.push(n)}return l},gpxParser.prototype.toGeoJSON=function(){var e={type:"FeatureCollection",features:[],properties:{name:this.metadata.name,desc:this.metadata.desc,time:this.metadata.time,author:this.metadata.author,link:this.metadata.link}};for(idx in this.tracks){let r=this.tracks[idx];var t={type:"Feature",geometry:{type:"LineString",coordinates:[]},properties:{}};for(idx in t.properties.name=r.name,t.properties.cmt=r.cmt,t.properties.desc=r.desc,t.properties.src=r.src,t.properties.number=r.number,t.properties.link=r.link,t.properties.type=r.type,r.points){let e=r.points[idx];(l=[]).push(e.lon),l.push(e.lat),l.push(e.ele),t.geometry.coordinates.push(l)}e.features.push(t)}for(idx in this.routes){let r=this.routes[idx];t={type:"Feature",geometry:{type:"LineString",coordinates:[]},properties:{}};for(idx in t.properties.name=r.name,t.properties.cmt=r.cmt,t.properties.desc=r.desc,t.properties.src=r.src,t.properties.number=r.number,t.properties.link=r.link,t.properties.type=r.type,r.points){let e=r.points[idx];var l;(l=[]).push(e.lon),l.push(e.lat),l.push(e.ele),t.geometry.coordinates.push(l)}e.features.push(t)}for(idx in this.waypoints){let l=this.waypoints[idx];(t={type:"Feature",geometry:{type:"Point",coordinates:[]},properties:{}}).properties.name=l.name,t.properties.sym=l.sym,t.properties.cmt=l.cmt,t.properties.desc=l.desc,t.geometry.coordinates=[l.lon,l.lat,l.ele],e.features.push(t)}return e},"undefined"!=typeof module&&(require("jsdom-global")(),module.exports=gpxParser);