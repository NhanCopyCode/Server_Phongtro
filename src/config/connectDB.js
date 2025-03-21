import { query } from "express";
import { raw } from "mysql2";

const { Sequelize } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("phongtro123", "root", null, {
	host: "localhost",
	port: "3308",
	dialect: "mysql",
	logging: false,
	query: {
		raw: true,
	},
});

const connectDB = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};
export default connectDB;
