const getPriceCodeByPrice = (price) => {
    const priceRanges = [
        { code: "OU1N", min: 0, max: 1000000 },
        { code: "1U2N", min: 1000000, max: 2000000 },
        { code: "2U3N", min: 2000000, max: 3000000 },
        { code: "3U5N", min: 3000000, max: 5000000 },
        { code: "5U7N", min: 5000000, max: 7000000 },
        { code: "7U0N", min: 7000000, max: 10000000 },
        { code: "1E1N", min: 10000000, max: 15000000 },
        { code: "EU5N", min: 15000000, max: Infinity },
    ];

    const foundRange = priceRanges.find(range => price >= range.min && price < range.max);
    return foundRange ? foundRange.code : null;
};


export default getPriceCodeByPrice;
