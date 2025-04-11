import * as postService from "../services/postService";
import { v4 as uuidv4 } from "uuid";

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

const getNewPost = async (req, res) => {
	try {
		const response = await postService.getNewPostService();
		return res.status(200).json(response);
	} catch (error) {
		return {
			message: "Error at postController file: " + error,
		};
	}
};

const createPost = async (req, res) => {
	try {
		const response = await postService.createPostService(
			req.body,
			req.files
		);
		return res.status(200).json(response);
	} catch (error) {
		return {
			message: "Error at postController file: " + error,
		};
	}
};

const getPostByUserId = async (req, res) => {
	const { userId } = req.params;
	console.log('userId:', userId)

	try {
		const response = await postService.getPostByUserIdService(userId);

		return res.status(200).json(response);
	} catch (error) {
		return {
			message: "Error at post controller file: " + error,
		}
	}
}

const findPostByTitle = async (req, res) => {
	const { userId, title} = req.params;

	try {
		const response = await postService.findPostByTitle(title, userId);

		return res.status(200).json(response);
	} catch (error) {
		return {
			message: "Error at post controller file: " + error,
		};
	}
}

export {
	getAllPost,
	getPostLimit,
	getPostById,
	getNewPost,
	createPost,
	getPostByUserId,
	findPostByTitle,
};
