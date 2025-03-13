import db from "../models";


const getPostService = async () => {
	try {
		const response = await db.Post.findAll({
			raw: true,
			nest: true,
			include: [
				{ model: db.Image, as: "images", attributes: ["image"] },
				{
					model: db.Attribute,
					as: "attributes",
					attributes: ["price", "acreage", "published", "hashtag"],
				},
				{
					model: db.User,
					as: "user",
					attributes: ["name", "phone", "zalo"],
				},
			],
			attributes: ["id", "title", "star", "address", "description"],
			offset: 0,
			limit: 10,
		});
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

const getPostLimit = async (offset = 0) => {
	try {
		const response = await db.Post.findAndCountAll({
			raw: true,
			nest: true,
			include: [
				{ model: db.Image, as: "images", attributes: ["image"] },
				{
					model: db.Attribute,
					as: "attributes",
					attributes: ["price", "acreage", "published", "hashtag"],
				},
				{
					model: db.User,
					as: "user",
					attributes: ["name", "phone", "zalo"],
				},
			],
			attributes: ["id", "title", "star", "address", "description"],
			offset: offset * +process.env.LIMIT,
			limit: +process.env.LIMIT,
		});
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


export { getPostService, getPostLimit };
 