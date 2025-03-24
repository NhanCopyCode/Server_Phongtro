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
	const { offset, ...query } = req.query;
	try {
		const response = await postService.getPostLimit(offset, query);

		return res.status(200).json(response);
	} catch (error) {
		return {
			message: "Error at postController file: " + error,
		};
	}
};

const getPostById = async (req, res) => {
	const { id } = req.params;
	try {
		const response = await postService.getPostByIdService(id);

		return res.status(200).json(response);
	} catch (error) {
		return {
			message: "Error at postController file: " + error,
		};
	}
};

export { getAllPost, getPostLimit, getPostById };
