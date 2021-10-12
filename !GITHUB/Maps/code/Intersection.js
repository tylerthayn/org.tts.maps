
function IsSafePoint (p) {
	return Number.isSafeInteger(p[0]) && Number.isSafeInteger(p[1])
}

function Intersections (path1, path2) {
	let intersections = []
	for (let i = 1; i<path1.length; i++) {
		for (let j = 1; j<path2.length; j++) {
			log([i-1, i, j-1, j])
			let p = Intersect([path1[i-1], path1[i-1]], [path2[j-1], path2[j]])
			IsSafePoint(p) && intersections.push(p)
		}
	}
}



function Intersect (l1, l2) {
	function FnData (p1, p2) {
		let m = (p2[1] - p1[1])/(p2[0] - p1[0])
		let b = p1[1] - m * p1[0]
		return {m: m, b: b}
	}

	function LineIntersect (fn1, fn2) {
		let x = (fn2.b - fn1.b) / (fn1.m - fn2.m)
		let y = fn1.m * x + fn1.b
		return [x, y]
	}

	return LineIntersect(FnData(l1[0], l1[1]), FnData(l2[0], l2[1]))
}

function LineIntersectLine(l1p1, l1p2, l2p1, l2p2) {
	let result;

	const ua_t = (l2p2[0] - l2p1[0]) * (l1p1[1] - l2p1[1]) - (l2p2[1] - l2p1[1]) * (l1p1[0] - l2p1[0]);
	const ub_t = (l1p2[0] - l1p1[0]) * (l1p1[1] - l2p1[1]) - (l1p2[1] - l1p1[1]) * (l1p1[0] - l2p1[0]);
	const u_b = (l2p2[1] - l2p1[1]) * (l1p2[0] - l1p1[0]) - (l2p2[0] - l2p1[0]) * (l1p2[1] - l
	if (u_b !== 0) {
		const ua = ua_t / u_b;
		const ub = ub_t / u_b;

		if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
			result = new Intersection("Intersection");
			result.points.push(
				new Point2D(
					l1p1[0] + ua * (l1p2[0] - l1p1[0]),
					l1p1[1] + ua * (l1p2[1] - l1p1[1])
				)
			)
		} else {
			result = new Intersection("No Intersection");
		}
	} else if (ua_t === 0 || ub_t === 0) {
		result = new Intersection("Coincident");
	} else {
		result = new Intersection("Parallel");
	}

	return result
}

/*
function LineIntersectLine(a1, a2, b1, b2) {
        let result;

        const ua_t = (l2p2[0] - l2p1[0]) * (l1p1[1] - l2p1[1]) - (l2p2[1] - l2p1[1]) * (l1p1[0] - l2p1[0]);
        const ub_t = (l1p2[0] - l1p1[0]) * (l1p1[1] - l2p1[1]) - (l1p2[1] - l1p1[1]) * (l1p1[0] - l2p1[0]);
        const u_b = (l2p2[1] - l2p1[1]) * (l1p2[0] - l1p1[0]) - (l2p2[0] - l2p1[0]) * (l1p2[1] - l1p1[1]);

        if (u_b !== 0) {
            const ua = ua_t / u_b;
            const ub = ub_t / u_b;

            if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
                result = new Intersection("Intersection");
                result.points.push(
                    new Point2D(
                        l1p1[0] + ua * (l1p2[0] - l1p1[0]),
                        l1p1[1] + ua * (l1p2[1] - l1p1[1])
                    )
                );
            }
            else {
                result = new Intersection("No Intersection");
            }
        }
        else if (ua_t === 0 || ub_t === 0) {
            result = new Intersection("Coincident");
        }
        else {
            result = new Intersection("Parallel");
        }

        return result;
    }
*/

