let _ = require('org.tts.js.lodash');

let Fs = require('fs'), Path = require('path');

let Deasync = require('deasync');

let Parser = Deasync(require('xml2js').parseString);

let Builder = require('xml2js').Builder;

let emptyKml = Parser('<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom"><Document><name></name></Document></kml>');

let plugins = [ require('./Kml.Styles'), require('./Kml.Placemarks') ];

module.exports = function(s) {
    let kml = {};
    kml = 'string' == typeof s ? Parser(s.match(/\<.+\>/) ? s : Fs.readFileSync(Path.resolve(s), 'utf-8')) : 'object' == typeof s && 'FeatureCollection' == _.get(s, 'type') ? BuildKml(s) : 'object' == typeof s && 'Feature' == _.get(s, 'type') ? BuildKml({
        features: [ s ]
    }) : 'object' == typeof s && Reflect.has(s, 'kml') ? _.cloneDeep(s) : _.cloneDeep(emptyKml);
    _.Define(kml, 'Export', function() {
        let builder = new Builder();
        _.logj(this.kml);
        return builder.buildObject(this.kml).replace('<root ', '<kml ').replace('</root>', '</kml>');
    });
    _.Define(kml, 'Save', function(path) {
        try {
            Fs.mkdirSync(Path.dirname(Path.resolve(path)), {
                recursive: true
            });
        } catch (e) {}
        Fs.writeFileSync(Path.resolve(path), this.Export(), 'utf-8');
        return this;
    });
    plugins.forEach(plugin => {
        plugin.call(kml);
    });
    _.Define(kml, 'Tree', {
        get: function() {
            function ParseFolder(obj, name = '') {
                let tree = {};
                _.get(obj, 'Folder', []).forEach(folder => {
                    _.merge(tree, ParseFolder(folder, ('' == name ? '' : name + '.') + obj.name));
                });
                _.get(obj, 'Placemark', []).forEach(placemark => {
                    let _name = ('' == name ? '' : name + '.') + obj.name + '.' + _.get(placemark, 'name[0]', _.get(placemark, 'Tags[@id]', '...')).split('/').pop();
                    tree[_name] = placemark;
                });
                return tree;
            }
            let tree = {};
            _.get(this, 'kml.Document[0].Folder', []).forEach(folder => {
                _.merge(tree, ParseFolder(folder));
            });
            return tree;
        }
    });
    return kml;
};

_.Define(module.exports, 'Use', plugin => {
    plugins.push(require(plugin));
});

function CreatePlacemark(feature) {
    let xml = `\n\t\t<Placemark>\n\t\t\t<name>${_.get(feature, 'properties.tags.name', _.get(feature, 'properties.id', ''))}</name>\n\t\t\t<styleUrl></styleUrl>\n\t\t\t<ExtendedData>\n\t\t\t\t<Data name="@id">\n\t\t\t\t\t<value>${_.get(feature, 'id', '')}</value>\n\t\t\t\t</Data>\n\t\t`;
    Object.keys(feature.properties.tags).forEach(tag => {
        xml += `\n\t\t\t\t<Data name="${tag}">\n\t\t\t\t\t<value>${feature.properties.tags[tag]}</value>\n\t\t\t\t</Data>\n\t\t\t`;
    });
    xml += `\n\t\t\t</ExtendedData>\n`
	if (_.get(feature, 'geometry', '') != '') {
		try {
			xml += `\t\t\t<${feature.geometry.type}>\n\t\t\t\t<coordinates>${feature.geometry.coordinates.map(coordinate => coordinate[0].toString() + ',' + coordinate[1].toString()).join(' ')}</coordinates>\n\t\t\t</${feature.geometry.type}>\n`
		} catch (e) {}
	}
	xml += `\t\t</Placemark>\n\t\t`;
    return Parser(xml);
}

function BuildKml(data) {
    let kml = _.cloneDeep(emptyKml);
    _.get(data, 'features', []).forEach(feature => {
        _.merge(kml.kml.Document[0], {
            Placemark: [ CreatePlacemark(feature).Placemark ]
        });
    });
    return kml;
}