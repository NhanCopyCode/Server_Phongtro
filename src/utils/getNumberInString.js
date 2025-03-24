const getNumberInString = (string) => {
	return string.match(/\d+/)[0]; // "3"
};

export default getNumberInString;
