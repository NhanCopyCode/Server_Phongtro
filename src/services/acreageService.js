import db from "../models";

const getAllAcreagesService = async () => {
	try {
		const response = await db.Area.findAll({
			attributes: ["code", "value"],
			order: [["order", "ASC"]],
			raw: true,
		});

		return response;
	} catch (error) {
		return {
			errorCode: -1,
			message: "Error at acreage service file: " + error,
		};
	}
};

export { getAllAcreagesService };
