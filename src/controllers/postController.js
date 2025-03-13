import * as postService from "../services/postService";

const getAllPost = async (req, res) => {
	try {
		const response = await postService.getPostService();

		return res.status(200).json(response);
	} catch (error) {
		return {
			message: "Error at postController file: " + error,
		};
	}
};

const getPostLimit = async (req, res) => {
	const { page } = req.query;
	try {

		console.log("page: ", typeof +page);
		const response = await postService.getPostLimit(+page);

		return res.status(200).json(response);
	} catch (error) {
		return {
			message: "Error at postController file: " + error,
		}
	}
}

export { getAllPost, getPostLimit };
