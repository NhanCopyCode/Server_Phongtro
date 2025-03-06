import express from "express";
require("dotenv").config();
import cors from "cors";
import initRoutes from "./src/routes";
import connectDB from "./src/config/connectDB";

const app = express();
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		methods: ["GET", "POST", "PUT", "DELETE"],
	})
);

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

initRoutes(app);
connectDB();

const PORT = process.env.APP_PORT || 8888;
app.listen(PORT, () => {
	console.log(`Server is listening on PORT: http://localhost:${PORT}`);
});
