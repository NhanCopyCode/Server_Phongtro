const formatRentPrice = (value) => {
	const number = Number(value);
	if (isNaN(number)) return "";

	if (number < 1_000_000) {
		// Dưới 1 triệu
		return number.toLocaleString("vi-VN") + " đồng/tháng";
	} else if (number < 10_000_000) {
		// Từ 1 triệu đến < 10 triệu
		const million = number / 1_000_000;
		return million.toFixed(1) + " triệu/tháng";
	} else if (number < 100_000_000) {
		// Từ 10 triệu đến < 100 triệu
		const dozen = number / 10_000_000;
		return dozen.toFixed(1) + " chục triệu/tháng";
	} else {
		// Từ 100 triệu trở lên
		const hundred = number / 100_000_000;
		return hundred.toFixed(1) + " trăm triệu/tháng";
	}
};

export default formatRentPrice;