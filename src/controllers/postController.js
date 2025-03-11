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

export { getAllPost };
