import db from "../models";
require("dotenv").config();

const getCategoriesService = async () => {
	try {
		const navigates = await db.Category.findAll({
			raw: true,
		});

		return navigates;
	} catch (error) {
		return {
			errorCode: -1,
			message: "Something went wrong!" + error,
		};
	}
};

export { getCategoriesService };
