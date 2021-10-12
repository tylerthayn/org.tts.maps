function Range (min, max) {
	let range = [ min < max ? min : max, min < max ? max : min ]
	Object.defineProperty(range, 'min', {enumerable: true, get: () => {range[0]}})
	Object.defineProperty(range, 'max', {enumerable: true, get: () => {range[1]}})
	Object.defineProperty(range, 'center', {enumerable: true, get: () => {(range[1] - range[0]) / 2 + range[0]}})
	Object.defineProperty(range, 'span', {enumerable: true, get: () => {range[1] - range[0]}})
	return range
}
