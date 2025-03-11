import authRouter from "./auth";
import insertRouter from "./insert";
import categoryRouter from "./category";
import postRouter from "./post";

const initRoutes = (app) => {
	app.use("/api/v1/auth", authRouter);
	app.use("/api/v1/insert", insertRouter);
	app.use("/api/v1/categories", categoryRouter);
	app.use("/api/v1/posts", postRouter);

	return app.use("/", (req, res) => {
		return res.send("Server is running...");
	});
};

export default initRoutes;
