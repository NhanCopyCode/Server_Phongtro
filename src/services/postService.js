import db from "../models";

const getPostService = async () => {
	try {
		const response = await db.Post.findAll();
		console.log("all post: ", response);
		return {
			message: "Successful all post",
			data: response,
		};
	} catch (error) {
		return {
			message: "Error at: " + error,
		};
	}
};

export { getPostService };
