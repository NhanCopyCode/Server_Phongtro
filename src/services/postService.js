import { Op } from "sequelize";
import db from "../models";
import { v4 as uuidv4 } from "uuid";
import getPriceCodeByPrice from "../utils/getPriceCodeByPrice";
import getAreaCodeByArea from "../utils/getAreaCodeByArea";

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

const getPostLimit = async (offset = 0, query) => {
	offset = parseInt(offset) || 0;
	try {
		const response = await db.Post.findAndCountAll({
			raw: true,
			nest: true,
			where: query,
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

const getPostByIdService = async (postId) => {
	try {
		const response = await db.Post.findOne({
			raw: true,
			where: { id: postId },
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
					attributes: ["id", "name", "phone", "zalo", "createdAt"],
				},
			],
			attributes: [
				"id",
				"title",
				"star",
				"address",
				"description",
				"createdAt",
				"updatedAt",
			],
		});

		if (!response) {
			return {
				message: "Post not found!",
				data: null,
			};
		}

		const postCount = await db.Post.count({
			where: {
				userId: response.user.id,
			},
		});

		response.user.postCount = postCount;

		return {
			message: "Get post successfully!",
			data: response,
		};
	} catch (error) {
		return {
			message: "Error at get post by id service file: " + error,
		};
	}
};

const filterPost = async (codeFilter) => {
	try {
		const response = await db.Post.findAndCountAll({
			where: {
				[Op.or]: [{ priceCode: codeFilter }, { areaCode: codeFilter }],
			},
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
		});

		return response;
	} catch (error) {
		return {
			message: "Error at filter post service file: " + error,
		};
	}
};

const getNewPostService = async () => {
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
			attributes: [
				"id",
				"title",
				"star",
				"address",
				"description",
				"createdAt",
			],
			order: [["createdAt", "DESC"]],
			limit: 5,
		});

		return {
			message: "Get new post successfully!",
			data: response,
		};
	} catch (error) {
		return {
			message: "Error at post service file: " + error,
		};
	}
};

const createPostService = async (data, files) => {
	try {
		const {
			title,
			description,
			name,
			phone,
			priceCode,
			categoryCode,
			areaCode,
			provinceCode,
			address,
			priceNumber,
			areaNumber,
		} = data;

		// Multer adds `files` array

		if (
			!title ||
			!description ||
			!name ||
			!phone ||
			!files ||
			files.length < 6 ||
			!priceCode ||
			!categoryCode ||
			!areaCode ||
			!provinceCode ||
			!address
		) {
			return {
				errorCode: 1,
				message: "Thiếu thông tin bắt buộc hoặc không đủ hình ảnh",
			};
		}

		const imagePaths = files.map((file) => file.path.replace(/\\/g, "/"));
		const resolvedPriceCode = getPriceCodeByPrice(priceCode);
		const resolvedAreaCode = getAreaCodeByArea(areaCode);
		// Sample create (adjust to your DB/model)
		const newPost = await db.Post.create({
			id: uuidv4(),
			userId: uuidv4(),
			title,
			description,
			name,
			phone,
			priceCode: resolvedPriceCode,
			categoryCode,
			areaCode: resolvedAreaCode,
			provinceCode,
			address,
			images: JSON.stringify(imagePaths),
			priceNumber,
			areaNumber,
		});

		return {
			errorCode: 0,
			message: "Đăng bài thành công!",
			data: newPost,
		};
	} catch (error) {
		console.log("Error in createPost:", error);
		return {
			errorCode: -1,
			message: "Lỗi server khi tạo bài đăng: " + error,
		};
	}
};

export {
	getPostService,
	getPostLimit,
	filterPost,
	getPostByIdService,
	getNewPostService,
	createPostService,
};
