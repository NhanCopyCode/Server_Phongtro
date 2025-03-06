import db from "../models";
import bcrypt from "bcryptjs";
import { response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
require("dotenv").config();
import generateCode from "../utils/generateCode";
// import chothuecanho from "../../data/chothuecanho.json";
// import chothuematbang from "../../data/chothuematbang.json";
// import nhachothue from '../../data/nhachothue.json';
import chothuephongtro from '../../data/chothuephongtro.json';
const dataBody = chothuephongtro.body;

const insertDataService = async () => {
	try {
		for (const data of dataBody) {
			const postId = uuidv4();
			const attributesId = uuidv4();
			const labelCode = generateCode(4);
			const userId = uuidv4();
			const imagesId = uuidv4();
			const overviewId = uuidv4();

			await db.Post.create({
				id: postId,
				title: data?.header?.title,
				star: data?.header?.start,
				labelCode,
				address: data?.header?.address,
				attributesId,
				categoryCode: "CTPT",
				description: JSON.stringify(data?.mainContent?.content),
				userId,
				overviewId,
				imagesId,
			});

			await db.Attribute.create({
				id: attributesId,
				price: data?.header?.attributes?.price,
				acreage: data?.header?.attributes?.acreage,
				published: data?.header?.attributes?.published,
				hashtag: data?.header?.attributes?.hashtag,
			});

			await db.Image.create({
				id: imagesId,
				image: JSON.stringify(data?.images),
			});

			await db.Label.create({
				code: labelCode,
				value: data?.header?.class?.classType,
			});

			await db.Overview.create({
				id: overviewId,
				code: data?.overview?.content.find((i) => i?.name === "Mã tin:")
					.content,
				area: data?.overview?.content.find((i) => i?.name === "Khu vực")
					.content,
				type: data?.overview?.content.find(
					(i) => i?.name === "Loại tin rao:"
				).content,
				target: data?.overview?.content.find(
					(i) => i?.name === "Đối tượng thuê:"
				).content,
				bonus: data?.overview?.content.find(
					(i) => i?.name === "Gói tin:"
				).content,
				created: data?.overview?.content.find(
					(i) => i?.name === "Ngày đăng:"
				).content,
				expired: data?.overview?.content.find(
					(i) => i?.name === "Ngày hết hạn:"
				).content,
			});

			await db.User.create({
				id: userId,
				name: data?.contact?.content.find((i) => i.name === "Liên hệ:")
					.content,
				phone: data?.contact?.content.find(
					(i) => i.name === "Điện thoại:"
				).content,
				zalo: data?.contact?.content.find((i) => i.name === "Zalo")
					.content,
				password: bcrypt.hashSync("123", 10),
			});
		}

		// ✅ Return message after loop completes
		return { message: "Done" };
	} catch (error) {
		return {
			errorCode: -1,
			message: "Something went wrong in insertService file! " + error,
		};
	}
};

export { insertDataService };
