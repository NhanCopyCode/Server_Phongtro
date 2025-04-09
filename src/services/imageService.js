import db from "../models";
import { v4 as uuidv4 } from "uuid";

const insertImageService = async (images, id) => {
	try {
		const response = await db.Image.create({
			id,
			image: images,
		});

		return {
			message: "Successful insert images",
			data: response,
		};
	} catch (error) {
		return {
			message: "Error at imageService: " + error,
		};
	}
};

export { insertImageService };
