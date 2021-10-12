

module.exports = function (n, resolution) {
	let x = Math.pow(10, resolution)
	return Math.round(n * x)/x
}

