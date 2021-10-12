
FeatureCollection = {
	Tags: (collection) => {
		let tags = {}
		collection.features.forEach(feature => {
			Object.keys(_.get(feature, 'properties', {})).forEach(prop => {
				if (prop != 'tags') {
					if (!Object.keys(tags).includes(prop)) {
						tags[prop] = []
					}
					tags[prop].push(_.get(feature, 'properties.'+prop))
				} else {
					Object.keys(_.get(feature, 'properties.tags', {})).forEach(tag => {
						if (!Object.keys(tags).includes('tags.'+tag)) {
							tags['tags.'+tag] = []
						}
						tags['tags.'+tag].push(_.get(feature, 'properties.tags.'+tag, ''))
					})
				}
			})
		})
		Object.keys(tags).forEach(k => {
			tags[k] = _.uniq(tags[k])
		})

		return tags
	}
}

FeatureCollection.Tags(HenryMountains.Main)

