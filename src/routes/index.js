import authRouter from "./auth";
import insertRouter from "./insert";
import categoryRouter from "./category";
import postRouter from "./post";
import priceRouter from "./price";
import acreageRouter from "./acreage";
import provinceRouter from "./province";

const initRoutes = (app) => {
	app.use("/api/v1/auth", authRouter);
	app.use("/api/v1/insert", insertRouter);
	app.use("/api/v1/categories", categoryRouter);
	app.use("/api/v1/posts", postRouter);
	app.use("/api/v1/price", priceRouter);
	app.use("/api/v1/acreage", acreageRouter);
	app.use("/api/v1/provinces", provinceRouter);

	return app.use("/", (req, res) => {
		return res.send("Server is running...");
	});
};

export default initRoutes;
