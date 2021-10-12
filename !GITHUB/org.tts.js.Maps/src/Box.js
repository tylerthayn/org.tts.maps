
function Box (s = Number.NaN, w = Number.NaN, n = Number.NaN, e = Number.NaN) {
	this.s = s
	this.w = w
	this.n = n
	this.e = e
	return this
}

Box.prototype.toString = function () {
	return this.s + ', ' + this.w + ', ' + this.n + ', ' + this.e
}
Box.prototype.toJSON = Box.prototype.toString

module.exports = Box
