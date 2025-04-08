import db from "../models";

const getAllPricesService = async () => {
	try {
		const response = await db.Price.findAll({
			attributes: ["code", "value"],
			order: [["order", "ASC"]],
			raw: true,
		});

		return response;
	} catch (error) {
		return {
			errorCode: -1,
			message: "Error at priceService file!" + error,
		};
	}
};


export { getAllPricesService };
