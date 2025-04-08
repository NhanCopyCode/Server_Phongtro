const areaRanges = [
	{ code: "ON2E", from: null, to: 20 }, // Dưới 20m
	{ code: "2UMD", from: 20, to: 30 }, // Từ 20m - 30m
	{ code: "3UMD", from: 30, to: 50 }, // Từ 30m - 50m
	{ code: "5UMD", from: 50, to: 70 }, // Từ 50m - 70m
	{ code: "7UMD", from: 70, to: 90 }, // Từ 70m - 90m
	{ code: "EN9E", from: 90, to: null }, // Trên 90m
];

const getAreaCodeByArea = (area) => {
	for (const range of areaRanges) {
		const { from, to, code } = range;

		if (from === null && area < to) return code;
		if (to === null && area >= from) return code;
		if (from !== null && to !== null && area >= from && area < to)
			return code;
	}

	return null;
};

export default getAreaCodeByArea;
