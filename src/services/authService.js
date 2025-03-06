import db from "../models";
import bcrypt from "bcryptjs";
import { response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
require("dotenv").config();

const registerService = async ({ name, password, phone }) => {
	try {
		// Check phone exist
		const response = await db.User.findOrCreate({
			where: { phone: phone },
			defaults: {
				id: uuidv4(),
				phone,
				name,
				password: bcrypt.hashSync(password, 10),
			},
		});
		console.log(`response::${JSON.stringify(response)}`);
		const token =
			response[1] &&
			jwt.sign(
				{ id: response[0].id, phone: phone },
				process.env.SECRET_KEY,
				{ expiresIn: "2d" }
			);

		return {
			errorCode: token ? 0 : 2,
			message: token
				? "Register successfully!"
				: "Phone number already in use!!",
			token: token || null,
		};
	} catch (error) {
		return {
			errorCode: -1,
			message: "Something went wrong!" + error,
		};
	}
};

const loginService = async ({ phone, password }) => {
	try {
		// check phone number exist
		const isExistingUser = await db.User.findOne({
			where: { phone },
		});

		if (!isExistingUser) {
			return {
				errorCode: -1,
				message: "This phone number has not been register!",
			};
		}

		const checkPassword = bcrypt.compareSync(
			password,
			isExistingUser.password
		);

		if (!checkPassword) {
			return {
				errorCode: -1,
				message: "The password is incorrect!",
			};
		}
		const token = jwt.sign(
			{
				phone,
			},
			process.env.SECRET_KEY,
			{
				expiresIn: "2d",
			}
		);

		if (token) {
			return {
				errorCode: 0,
				message: "Login successfully",
				token: token,
			};
		}
	} catch (error) {
		return {
			errorCode: -1,
			message: "Something went wrong in authService: " + error,
		};
	}
};

export { registerService, loginService };
