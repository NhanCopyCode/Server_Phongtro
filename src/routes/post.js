import express from "express";
import * as postController from "../controllers/postController";
import multer from "multer";

const postRouter = express.Router();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, uniqueSuffix + "-" + file.originalname);
	},
});

const upload = multer({ storage: storage });

postRouter.get("/", postController.getAllPost);
postRouter.get("/filter/:id", postController.getPostById);
postRouter.get("/limit", postController.getPostLimit);
postRouter.get("/newPost", postController.getNewPost);
postRouter.post("/create", upload.array("images", 10) , postController.createPost);
postRouter.get("/getPostByUserId/:userId", postController.getPostByUserId)
postRouter.get("/findPostByTitle/:userId/:title", postController.findPostByTitle)

export default postRouter;
